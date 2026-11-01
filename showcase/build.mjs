// Build the single-file showcase HTML: shell + embedded three.js libs + base64 assets + main script.
import fs from 'fs';
import path from 'path';

const root = '/home/user/showcase';
const libs = [
  'fflate.min.js', 'three.min.js', 'GLTFLoader.js', 'FBXLoader.js', 'OBJLoader.js',
  'EffectComposer.js', 'RenderPass.js', 'ShaderPass.js', 'UnrealBloomPass.js',
  'CopyShader.js', 'LuminosityHighPassShader.js'
];
const shell = fs.readFileSync(path.join(root, 'shell.html'), 'utf8');
const main = fs.readFileSync(path.join(root, 'main.js'), 'utf8');

const libTags = libs.map(l => {
  const code = fs.readFileSync(path.join(root, 'libs', l), 'utf8');
  return '<script>\n' + code + '\n</script>';
}).join('\n');

// assets map
const assetDir = path.join(root, 'assets');
const files = fs.readdirSync(assetDir).sort();
const mime = { png: 'image/png', glb: 'model/gltf-binary', gltf: 'model/gltf+json', bin: 'application/octet-stream', fbx: 'application/octet-stream', obj: 'text/plain', wav: 'audio/wav' };
const assets = {};
for (const f of files) {
  const ext = f.split('.').pop();
  const buf = fs.readFileSync(path.join(assetDir, f));
  if (ext === 'obj') {
    // plain text base64 to keep single encoding path
    assets[f] = 'data:text/plain;base64,' + buf.toString('base64');
  } else {
    assets[ext === 'gltf' ? f : f] = 'data:' + (mime[ext] || 'application/octet-stream') + ';base64,' + buf.toString('base64');
  }
}
const assetsTag = '<script>\nvar ASSETS = ' + JSON.stringify(assets) + ';\n</script>';

let out = shell
  .replace('<!--LIBS-->', () => libTags)
  .replace('<!--ASSETS-->', () => assetsTag)
  .replace('<!--MAIN-->', () => '<script>\n' + main + '\n</script>');

// KayKit gltf bin URIs: gltf JSON refers to "xxx.bin"; our asset keys are kk_<model>.bin.
// The main.js loader matches by basename, so no rewrite needed here.

const outPath = process.argv[2] || path.join(root, 'showcase.html');
fs.writeFileSync(outPath, out);
console.log('built', outPath, (out.length / 1048576).toFixed(2) + 'MB', 'assets:', files.length);
