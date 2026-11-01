// Pure-node PNG downscaler (nearest neighbor). Usage: node pngdown.mjs <in> <out> <maxDim>
import fs from 'fs';
import zlib from 'zlib';

function readPNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG');
  let pos = 8, w, h, bitDepth, colorType, interlace, idat = [], plte = null, trns = null;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos); const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9];
      interlace = data[12];
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'PLTE') plte = Buffer.from(data);
    else if (type === 'tRNS') trns = Buffer.from(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  if (bitDepth !== 8) throw new Error('only 8-bit PNG supported (got bitDepth ' + bitDepth + ')');
  if (interlace) throw new Error('interlaced PNG not supported');
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error('colorType ' + colorType + ' unsupported');
  const raw = zlib.inflateSync(Buffer.concat(idat));
  // unfilter
  const stride = w * channels;
  const out = Buffer.alloc(h * stride);
  let p = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[p++];
    const row = raw.subarray(p, p + stride); p += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const x = row[i];
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev ? prev[i] : 0;
      const c = i >= channels && prev ? prev[i - channels] : 0;
      let v;
      switch (filter) {
        case 0: v = x; break;
        case 1: v = (x + a) & 255; break;
        case 2: v = (x + b) & 255; break;
        case 3: v = (x + ((a + b) >> 1)) & 255; break;
        case 4: {
          const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
          v = (x + (pa <= pb && pa <= pc ? a : (pb <= pc ? b : c))) & 255; break;
        }
        default: throw new Error('bad filter ' + filter);
      }
      cur[i] = v;
    }
  }
  return { w, h, channels, colorType, data: out, plte, trns };
}

function writePNG(img) {
  const { w, h, channels, data } = img;
  const stride = w * channels;
  const chunks = [];
  function chunk(type, body) {
    const len = Buffer.alloc(4); len.writeUInt32BE(body.length);
    const t = Buffer.from(type, 'ascii');
    const crcTable = PNGCRC();
    let c = 0xffffffff;
    for (const byte of Buffer.concat([t, body])) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8);
    c = (c ^ 0xffffffff) >>> 0;
    const crc = Buffer.alloc(4); crc.writeUInt32BE(c);
    chunks.push(Buffer.concat([len, t, body, crc]));
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8;
  ihdr[9] = channels === 4 ? 6 : channels === 3 ? 2 : channels === 1 ? 0 : 4;
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  chunk('IHDR', ihdr);
  const rawRows = [];
  for (let y = 0; y < h; y++) {
    const f = Buffer.alloc(1); // filter 0
    rawRows.push(f, data.subarray(y * stride, (y + 1) * stride));
  }
  chunk('IDAT', zlib.deflateSync(Buffer.concat(rawRows), { level: 9 }));
  chunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ...chunks]);
}

let CRC = null;
function PNGCRC() {
  if (CRC) return CRC;
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  CRC = t; return t;
}

function scale(img, nw, nh) {
  const { w, h, channels, data } = img;
  const out = Buffer.alloc(nw * nh * channels);
  for (let y = 0; y < nh; y++) {
    const sy = Math.min(h - 1, Math.floor((y * h) / nh));
    for (let x = 0; x < nw; x++) {
      const sx = Math.min(w - 1, Math.floor((x * w) / nw));
      const di = (y * nw + x) * channels, si = (sy * w + sx) * channels;
      for (let c = 0; c < channels; c++) out[di + c] = data[si + c];
    }
  }
  return { w: nw, h: nh, channels, data: out };
}

const [inp, outp, maxDimArg] = process.argv.slice(2);
const maxDim = parseInt(maxDimArg || '512', 10);
const img = readPNG(fs.readFileSync(inp));
if (img.colorType === 3) throw new Error('palette PNG: ' + inp);
if (Math.max(img.w, img.h) <= maxDim) { fs.copyFileSync(inp, outp); console.log(`${inp}: ${img.w}x${img.h} kept`); process.exit(0); }
const ratio = maxDim / Math.max(img.w, img.h);
const scaled = scale(img, Math.max(1, Math.round(img.w * ratio)), Math.max(1, Math.round(img.h * ratio)));
fs.writeFileSync(outp, writePNG(scaled));
console.log(`${inp}: ${img.w}x${img.h} -> ${scaled.w}x${scaled.h}`);
