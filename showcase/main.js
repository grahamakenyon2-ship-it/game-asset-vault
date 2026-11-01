/* ============================================================
   ASSET VAULT 3D — Showcase World  (v2: game-feel pass)
   v2 changes: real third-person controller (camera-relative move,
   accel/decel, coyote+buffer+variable jump), auto-align camera,
   procedural Mixamo-rig animation (idle/walk/run/jump/land),
   character palette + fixed material toggle (multi-material safe),
   dust puffs, coin magnet, FOV kick, landing squash.
   ============================================================ */
(function () {
  'use strict';

  // ---------- helpers ----------
  var $ = function (id) { return document.getElementById(id); };
  var log = function (m) { try { console.log('[showcase] ' + m); } catch (e) {} };
  var failCount = 0;
  function noteFail(name, err) { failCount++; log('ASSET FAIL ' + name + ': ' + (err && err.message || err)); }

  function b64ToBuf(uri) {
    var b64 = uri.split(',')[1];
    var bin = atob(b64), n = bin.length, buf = new ArrayBuffer(n), arr = new Uint8Array(buf);
    for (var i = 0; i < n; i++) arr[i] = bin.charCodeAt(i);
    return buf;
  }

  var gradData = new Uint8Array([70, 70, 70, 70, 140, 140, 140, 140, 200, 200, 200, 200, 255, 255, 255, 255]);
  var GRADIENT = new THREE.DataTexture(gradData, 4, 1, THREE.LuminanceFormat);
  GRADIENT.minFilter = THREE.NearestFilter; GRADIENT.magFilter = THREE.NearestFilter;
  GRADIENT.generateMipmaps = false; GRADIENT.needsUpdate = true;

  // ---------- renderer / scene ----------
  var canvas = $('c');
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xbfd9e8, 140, 380);

  var camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 600);
  camera.position.set(0, 6, 12);

  var composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  var bloom = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.35, 0.6, 0.85);
  composer.addPass(bloom);

  // ---------- lights ----------
  var hemi = new THREE.HemisphereLight(0xbfdfff, 0x557755, 0.55); scene.add(hemi);
  var sun = new THREE.DirectionalLight(0xffe0b0, 1.35);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -140; sun.shadow.camera.right = 140;
  sun.shadow.camera.top = 140; sun.shadow.camera.bottom = -140;
  sun.shadow.camera.far = 500; sun.shadow.bias = -0.0004;
  scene.add(sun); scene.add(sun.target);
  var sunOrb = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffd27a }));
  scene.add(sunOrb);
  var moonOrb = new THREE.Mesh(new THREE.SphereGeometry(3.4, 14, 14), new THREE.MeshBasicMaterial({ color: 0xcfd8ff }));
  scene.add(moonOrb);

  // ---------- sky ----------
  var skyUniforms = {
    topColor: { value: new THREE.Color(0x3f8fff) },
    bottomColor: { value: new THREE.Color(0xdff1ff) }
  };
  var sky = new THREE.Mesh(
    new THREE.SphereGeometry(450, 24, 16),
    new THREE.ShaderMaterial({
      uniforms: skyUniforms, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 topColor; uniform vec3 bottomColor; varying vec3 vP;' +
        'void main(){ float h = normalize(vP).y; gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h,0.0),0.5),0.0)), 1.0); }'
    })
  );
  scene.add(sky);

  var starGeo = new THREE.BufferGeometry();
  (function () {
    var pts = [];
    for (var i = 0; i < 400; i++) {
      var t = Math.random() * Math.PI * 2, p = Math.random() * Math.PI * 0.45;
      var r = 430;
      pts.push(r * Math.sin(p) * Math.cos(t), r * Math.cos(p) + 40, r * Math.sin(p) * Math.sin(t));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  })();
  var stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, transparent: true, opacity: 0, fog: false }));
  scene.add(stars);

  // ---------- ground / water / road ----------
  var groundCanvas = document.createElement('canvas');
  groundCanvas.width = groundCanvas.height = 256;
  (function () {
    var g = groundCanvas.getContext('2d');
    g.fillStyle = '#6db24f'; g.fillRect(0, 0, 256, 256);
    for (var i = 0; i < 1400; i++) {
      var s = Math.random();
      g.fillStyle = s < 0.5 ? '#79c25b' : (s < 0.8 ? '#61a746' : '#86ce6a');
      g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    var ring = g.createRadialGradient(128, 128, 80, 128, 128, 128);
    ring.addColorStop(0, 'rgba(0,0,0,0)'); ring.addColorStop(1, 'rgba(120,90,40,0.35)');
    g.fillStyle = ring; g.fillRect(0, 0, 256, 256);
  })();
  var groundTex = new THREE.CanvasTexture(groundCanvas);
  groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping; groundTex.repeat.set(24, 24);
  groundTex.encoding = THREE.sRGBEncoding;
  var ground = new THREE.Mesh(new THREE.CircleGeometry(120, 64), new THREE.MeshToonMaterial({ map: groundTex, gradientMap: GRADIENT }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
  scene.add(ground);

  var waterUniforms = { time: { value: 0 } };
  var water = new THREE.Mesh(
    new THREE.CircleGeometry(400, 48),
    new THREE.ShaderMaterial({
      uniforms: waterUniforms, transparent: false, fog: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'uniform float time; varying vec2 vUv;' +
        'void main(){ vec2 p = vUv*160.0; float w = sin(p.x*0.6+time*1.4)+sin(p.y*0.5+time*1.1)+sin((p.x+p.y)*0.3-time*0.7);' +
        'float b = 0.5 + 0.06*w; vec3 col = mix(vec3(0.09,0.32,0.55), vec3(0.25,0.55,0.75), (w+3.0)/6.0);' +
        'if ((vUv.x-0.5)*(vUv.x-0.5) + (vUv.y-0.5)*(vUv.y-0.5) > 0.24) discard; gl_FragColor = vec4(col*b, 1.0); }'
    })
  );
  water.rotation.x = -Math.PI / 2; water.position.y = -0.35;
  scene.add(water);

  var road = new THREE.Mesh(new THREE.RingGeometry(84, 96, 96), new THREE.MeshToonMaterial({ color: 0x4c4a52, gradientMap: GRADIENT }));
  road.rotation.x = -Math.PI / 2; road.position.y = 0.02; road.receiveShadow = true;
  scene.add(road);
  var roadLines = new THREE.Mesh(new THREE.RingGeometry(89.7, 90.3, 96, 1, 0, Math.PI * 2), new THREE.MeshBasicMaterial({ color: 0xf2e9c9 }));
  roadLines.rotation.x = -Math.PI / 2; roadLines.position.y = 0.03;
  scene.add(roadLines);

  // ---------- asset loading ----------
  var manager = new THREE.LoadingManager();
  var texCache = {};
  manager.setURLModifier(function (url) {
    // match by basename AND by substring (FBX stores absolute Windows paths with junk suffixes)
    var base = url.split('/').pop().split('\\').pop();
    if (base.indexOf('.png') > 0) base = base.slice(0, base.indexOf('.png') + 4);
    if (base.indexOf('.jpg') > 0) base = base.slice(0, base.indexOf('.jpg') + 4);
    if (ASSETS['tex_' + base]) return ASSETS['tex_' + base];
    for (var k in ASSETS) {
      if (k.indexOf('tex_') === 0 && url.indexOf(k.slice(4)) >= 0) return ASSETS[k];
    }
    return url;
  });
  function texFromAssets(key, repeat) {
    if (!ASSETS[key]) return null;
    if (texCache[key]) return texCache[key];
    var t = new THREE.TextureLoader(manager).load(ASSETS[key]);
    t.encoding = THREE.sRGBEncoding;
    if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
    texCache[key] = t;
    return t;
  }
  var objLoader = new THREE.OBJLoader();
  var gltfLoader = new THREE.GLTFLoader(manager);
  var fbxLoader = new THREE.FBXLoader(manager);

  function loadObjText(uri) {
    var b64 = uri.split(',')[1];
    return decodeURIComponent(escape(atob(b64)));
  }
  function loadOBJ(key, mat) {
    try {
      var group = objLoader.parse(loadObjText(ASSETS[key]));
      group.traverse(function (o) {
        if (o.isMesh) { o.material = mat; o.castShadow = true; o.receiveShadow = true; }
      });
      return group;
    } catch (e) { noteFail(key, e); return new THREE.Group(); }
  }
  function loadGLB(key, cb) {
    gltfLoader.parse(b64ToBuf(ASSETS[key]), '', function (g) { cb(g.scene); }, function (e) { noteFail(key, e); cb(new THREE.Group()); });
  }
  function loadFBX(key) {
    try { return fbxLoader.parse(b64ToBuf(ASSETS[key]), ''); }
    catch (e) { noteFail(key, e); return new THREE.Group(); }
  }
  function loadGLTFInline(gltfKey, binKey, cb) {
    try {
      var json = JSON.parse(loadObjText(ASSETS[gltfKey]));
      json.buffers.forEach(function (b) { if (b.uri && ASSETS[binKey]) b.uri = ASSETS[binKey]; });
      if (json.images) json.images.forEach(function (img) {
        var base = (img.uri || '').split('/').pop();
        if (ASSETS['tex_' + base]) img.uri = ASSETS['tex_' + base];
      });
      gltfLoader.parse(JSON.stringify(json), '', function (g) { cb(g.scene); }, function (e) { noteFail(gltfKey, e); cb(new THREE.Group()); });
    } catch (e) { noteFail(gltfKey, e); cb(new THREE.Group()); }
  }
  function fit(obj, targetH) {
    var box = new THREE.Box3().setFromObject(obj);
    if (box.isEmpty()) return obj;
    var h = Math.max(0.0001, box.max.y - box.min.y);
    obj.scale.multiplyScalar(targetH / h);
    obj.position.x -= (box.min.x + box.max.x) / 2 * obj.scale.x;
    obj.position.z -= (box.min.z + box.max.z) / 2 * obj.scale.z;
    return obj;
  }
  function eachMesh(root, fn) { root.traverse(function (o) { if (o.isMesh) fn(o); }); }

  // ---------- audio ----------
  var AC = null, musicOn = false, musicTimer = null, musicStep = 0;
  function audioCtx() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return AC; }
  var sfxCache = {};
  function sfx(key, vol) {
    try {
      var ctx = audioCtx(); if (!ctx || !ASSETS[key]) return;
      if (!sfxCache[key]) {
        ctx.decodeAudioData(b64ToBuf(ASSETS[key]), function (buf) { sfxCache[key] = buf; playBuf(buf, vol); });
      } else playBuf(sfxCache[key], vol);
    } catch (e) {}
  }
  function playBuf(buf, vol) {
    var ctx = audioCtx(); if (!ctx) return;
    var src = ctx.createBufferSource(); src.buffer = buf;
    var g = ctx.createGain(); g.gain.value = vol || 0.5;
    src.connect(g); g.connect(ctx.destination); src.start();
  }
  var SCALE = [0, 3, 5, 7, 10, 12, 15, 17];
  var MELODY = [0, 4, 2, 5, 1, 4, 3, 2, 0, 4, 2, 5, 7, 6, 5, 3];
  function musicTick() {
    var ctx = audioCtx(); if (!ctx) return;
    var t = ctx.currentTime;
    var m = MELODY[musicStep % MELODY.length];
    var f = 220 * Math.pow(2, SCALE[m % SCALE.length] / 12 + (musicStep % 16 < 8 ? 0 : 0.5));
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'square'; o.frequency.value = f;
    g.gain.setValueAtTime(0.045, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    var flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = 1800;
    o.connect(flt); flt.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + 0.25);
    if (musicStep % 2 === 0) {
      var b = ctx.createOscillator(), bg = ctx.createGain();
      b.type = 'triangle'; b.frequency.value = 55 * (musicStep % 8 === 6 ? 1.5 : 1);
      bg.gain.setValueAtTime(0.07, t); bg.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      b.connect(bg); bg.connect(ctx.destination); b.start(t); b.stop(t + 0.42);
    }
    musicStep++;
  }
  function toggleMusic() {
    musicOn = !musicOn;
    if (musicOn) { audioCtx(); musicTick(); musicTimer = setInterval(musicTick, 240); }
    else { clearInterval(musicTimer); }
    return musicOn;
  }

  // ---------- world state ----------
  var PLATFORMS = [];
  var COINS = [];
  var SPINNERS = [];
  var BOBBERS = [];
  var CARS = [];
  var FIREFLIES = null;
  var state = { coins: 0, toonMode: true, bloomOn: true, dayT: 0.32, char: 'human', zone: '' };

  function addPlatform(mesh) {
    mesh.updateMatrixWorld(true);
    var box = new THREE.Box3().setFromObject(mesh);
    PLATFORMS.push({ min: box.min.clone(), max: box.max.clone() });
  }

  // ---------- zone: TOON PLAZA ----------
  var PLAZA_LAMPS = null, ARC_MAT = null;
  function buildPlaza() {
    var plaza = new THREE.Group(); plaza.position.set(0, 0, -52);

    var builds = [
      ['toon_building1', 'tex_buildingFront1.png', -14, 0],
      ['toon_building2', 'tex_buildingFront2.png', -5, -7],
      ['toon_building3', 'tex_buildingFront3.png', 5, -7],
      ['toon_building4', 'tex_buildingFront4.png', 14, 0]
    ];
    builds.forEach(function (b) {
      var m = new THREE.MeshToonMaterial({ map: texFromAssets(b[1]), gradientMap: GRADIENT, side: THREE.DoubleSide });
      var g = loadOBJ(b[0], m);
      fit(g, 9);
      g.position.set(b[2], 0, b[3] - 2);
      g.lookAt(0, 0, 60);
      plaza.add(g);
    });

    var props = [
      ['toon_TV', 'tex_TV.png', -4, 2.2, 0.62],
      ['toon_ATM', 'tex_ATM.png', -7, 1.6, 0.7],
      ['toon_OldPhone', 'tex_OldPhone.png', 7, 1.4, 0.75],
      ['toon_bench', 'tex_bench.png', 3, 1.2, 0.55]
    ];
    props.forEach(function (p) {
      var m = new THREE.MeshToonMaterial({ map: texFromAssets(p[1]), gradientMap: GRADIENT });
      var g = loadOBJ(p[0], m); fit(g, p[3]);
      g.position.set(p[2], 0, p[4]);
      plaza.add(g);
    });

    var furn = [
      ['furn_Table_1.glb', 1.5, -2.5, 0.55, 0],
      ['furn_Chair_1.glb', 1.3, -2.5, 2.2, 0.35],
      ['furn_Chair_1.glb', 1.3, -2.5, -1.1, -0.5],
      ['furn_Cooker_1.glb', 1.9, 10.5, -1.5, 0.4],
      ['furn_Book_8.glb', 0.4, -2.2, 0.9, 0],
      ['furn_Joystick_1.glb', 0.5, -2.9, 0.9, 0.3],
      ['furn_Camera_2.glb', 0.5, -1.9, 0.75, -0.4]
    ];
    furn.forEach(function (f) {
      loadGLB(f[0], function (o) {
        fit(o, f[1]);
        o.position.set(f[2], 0, f[3]); o.rotation.y = f[4];
        eachMesh(o, function (mesh) { mesh.castShadow = mesh.receiveShadow = true; });
        plaza.add(o);
      });
    });

    var lampMat = new THREE.MeshToonMaterial({ color: 0x35414e, gradientMap: GRADIENT });
    var lampSpots = [[-8, 6], [8, 6]];
    var lampLights = [];
    lampSpots.forEach(function (s, i) {
      var post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 4.4, 10), lampMat);
      post.position.set(s[0], 2.2, s[1]); post.castShadow = true;
      var bulb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffe9a8 }));
      bulb.position.set(s[0], 4.5, s[1]);
      var l = new THREE.PointLight(0xffd98a, 0, 26, 2);
      l.position.set(s[0], 4.5, s[1]);
      plaza.add(post); plaza.add(bulb); plaza.add(l);
      lampLights.push({ light: l, bulb: bulb, phase: i * 2.1 });
    });
    PLAZA_LAMPS = lampLights;

    var arcCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8, 4.5, 6), new THREE.Vector3(-4, 5.2, 6.3),
      new THREE.Vector3(0, 4.6, 5.9), new THREE.Vector3(4, 5.3, 6.2), new THREE.Vector3(8, 4.5, 6)
    ]);
    var arcMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'uniform float time; varying vec2 vUv; void main(){' +
        'float flick = step(0.5, fract(sin(time*40.0+vUv.x*90.0)*43758.5));' +
        'float core = 1.0 - abs(vUv.y - 0.5 + 0.08*sin(vUv.x*40.0 + time*30.0)) * 2.0;' +
        'vec3 col = mix(vec3(0.2,0.4,1.0), vec3(0.8,0.9,1.0), core);' +
        'gl_FragColor = vec4(col, core * (0.25 + 0.6*flick)); }'
    });
    var arc = new THREE.Mesh(new THREE.TubeGeometry(arcCurve, 48, 0.05, 8, false), arcMat);
    plaza.add(arc);
    ARC_MAT = arcMat;

    var ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.55, 10, 32), new THREE.MeshToonMaterial({ color: 0x9aa7b5, gradientMap: GRADIENT }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.3;
    var pool = new THREE.Mesh(new THREE.CircleGeometry(2.35, 32), new THREE.MeshToonMaterial({ color: 0x54b3e8, gradientMap: GRADIENT }));
    pool.rotation.x = -Math.PI / 2; pool.position.y = 0.42;
    var jet = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.8, 10), new THREE.MeshToonMaterial({ color: 0x7fd0f5, gradientMap: GRADIENT, transparent: true, opacity: 0.75 }));
    jet.position.y = 1.1;
    plaza.add(ring); plaza.add(pool); plaza.add(jet);
    BOBBERS.push({ obj: jet, phase: 0, amp: 0.05, scaleY: true });

    scene.add(plaza);
  }

  // ---------- zone: JUMP RIDGE ----------
  function buildRidge() {
    var ridge = new THREE.Group(); ridge.position.set(56, 0, 40);

    var cubeMat = new THREE.MeshToonMaterial({ map: texFromAssets('tex_MyPalette.png'), gradientMap: GRADIENT });
    var pickMat = new THREE.MeshToonMaterial({ color: 0xffd24a, gradientMap: GRADIENT, emissive: 0x996600 });

    var steps = [
      [0, 0, 0, 2], [3, 1, 1.5, 2], [6.5, 2.2, 1, 2.6], [10, 3.6, -1, 3], [13.5, 5, -3.5, 3.6]
    ];
    steps.forEach(function (s) {
      var c = loadFBX('plat_BasicCube.fbx');
      eachMesh(c, function (m) { m.material = cubeMat; m.castShadow = m.receiveShadow = true; });
      fit(c, s[3]);
      c.position.set(s[0], s[1] + s[3] / 2, s[2]);
      ridge.add(c); addPlatform(c);
    });
    var crate = loadFBX('plat_Crate_Big.fbx');
    eachMesh(crate, function (m) { m.material = cubeMat; m.castShadow = m.receiveShadow = true; });
    fit(crate, 2.4); crate.position.set(-4, 1.2, 1);
    ridge.add(crate); addPlatform(crate);

    var cloudMat = new THREE.MeshToonMaterial({ color: 0xf4f9ff, gradientMap: GRADIENT });
    var cloudPos = [[-4, 3.4, 8], [-1, 4.8, 12], [3, 6.2, 14]];
    cloudPos.forEach(function (p) {
      var cl = loadOBJ('leap_cloud_1.obj', cloudMat); fit(cl, 0.9);
      cl.position.set(p[0], p[1], p[2]); ridge.add(cl); addPlatform(cl);
      BOBBERS.push({ obj: cl, phase: p[0], amp: 0.12 });
    });
    var bridgeMat = new THREE.MeshToonMaterial({ color: 0x9a6b3f, gradientMap: GRADIENT });
    var bridge = loadOBJ('leap_bridge_1.obj', bridgeMat); fit(bridge, 2.6);
    bridge.position.set(16, 4, 0); bridge.rotation.y = 0.4;
    ridge.add(bridge);

    var balloonCols = { 'leap_balloon_red.obj': 0xe4574d, 'leap_balloon_blue.obj': 0x4d9de0, 'leap_balloon_yellow.obj': 0xe8c14d };
    Object.keys(balloonCols).forEach(function (k, i) {
      var b = loadOBJ(k, new THREE.MeshToonMaterial({ color: balloonCols[k], gradientMap: GRADIENT }));
      fit(b, 1.4);
      b.position.set(-9 + i * 4, 5.5 + i, 3 + i * 2.5);
      ridge.add(b);
      BOBBERS.push({ obj: b, phase: i * 1.7, amp: 0.25 });
      var string = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 4, 5), new THREE.MeshBasicMaterial({ color: 0xcccccc }));
      string.position.set(b.position.x, b.position.y - 2, b.position.z);
      ridge.add(string);
    });

    var cannon = loadOBJ('leap_cannon.obj', new THREE.MeshToonMaterial({ color: 0x5a6472, gradientMap: GRADIENT }));
    fit(cannon, 1.6); cannon.position.set(-11, 0.8, -3); cannon.rotation.y = 2.4; ridge.add(cannon);
    var gem = loadOBJ('leap_gem.obj', new THREE.MeshToonMaterial({ color: 0x54e0c2, gradientMap: GRADIENT, emissive: 0x0a4f40 }));
    fit(gem, 0.9); gem.position.set(-11, 2.2, -3); ridge.add(gem); SPINNERS.push({ obj: gem, speed: 1.6 }); BOBBERS.push({ obj: gem, phase: 1, amp: 0.15 });
    var flower = loadOBJ('leap_flower.obj', new THREE.MeshToonMaterial({ color: 0xff8fb1, gradientMap: GRADIENT }));
    fit(flower, 0.8); flower.position.set(2, 0.4, 5); ridge.add(flower);
    var flag = loadOBJ('leap_flag.obj', new THREE.MeshToonMaterial({ color: 0x4d9de0, gradientMap: GRADIENT }));
    fit(flag, 2.6); flag.position.set(16, 4, -4); ridge.add(flag); SPINNERS.push({ obj: flag, speed: 0.4 });

    var coinMat = new THREE.MeshToonMaterial({ color: 0xffcf3f, gradientMap: GRADIENT, emissive: 0x8f6a00 });
    steps.forEach(function (s) {
      var coin = loadOBJ('leap_coin.obj', coinMat);
      fit(coin, 0.8);
      coin.position.set(s[0], s[1] + s[3] + 0.7, s[2]);
      ridge.add(coin);
      COINS.push({ mesh: coin, taken: false, base: coin.position.clone() });
    });
    [[-4, 4.6, 8], [-1, 6, 12], [3, 7.4, 14], [16, 6.2, 0]].forEach(function (p) {
      var pk = loadFBX('plat_Pickup.fbx');
      eachMesh(pk, function (m) { m.material = pickMat; m.castShadow = true; });
      fit(pk, 1);
      pk.position.set(p[0], p[1], p[2]);
      ridge.add(pk);
      COINS.push({ mesh: pk, taken: false, base: pk.position.clone() });
    });

    scene.add(ridge);
  }

  // ---------- zone: CARROT FARMS ----------
  function buildFarm() {
    var farm = new THREE.Group(); farm.position.set(-56, 0, 40);

    var fenceMat = new THREE.MeshToonMaterial({ color: 0xb0895a, gradientMap: GRADIENT });
    var R = 16;
    for (var a = 0; a < Math.PI * 2; a += Math.PI / 7) {
      var f = loadOBJ('leap_fence_1.obj', fenceMat);
      fit(f, 1.1);
      f.position.set(Math.cos(a) * R, 0.55, Math.sin(a) * R);
      f.rotation.y = -a + Math.PI / 2;
      farm.add(f);
    }

    loadGLTFInline('toy_horse.gltf', 'toy_horse.bin', function (o) {
      fit(o, 2.1);
      o.position.set(-5, 0, 2); o.rotation.y = 0.8;
      eachMesh(o, function (m) { m.castShadow = m.receiveShadow = true; });
      farm.add(o);
      BOBBERS.push({ obj: o, phase: 2, amp: 0.02 });
    });

    var kk = [
      ['kk_chicken_plushie_A.gltf', 'kk_chicken_plushie_A.bin', 0.9, 6, 2, 0.3],
      ['kk_chicken_plushie_B.gltf', 'kk_chicken_plushie_B.bin', 0.9, 7.5, 3.5, -0.6],
      ['kk_woodstove.gltf', 'kk_woodstove.bin', 1.5, -10, -6, 0.5],
      ['kk_waterbottle_B.gltf', 'kk_waterbottle_B.bin', 0.7, 8.5, -3, 0],
      ['kk_waterbottle_B.gltf', 'kk_waterbottle_B.bin', 0.7, 9.3, -2.2, 0.4],
      ['kk_circus_tent.gltf', 'kk_circus_tent.bin', 5.5, 0, -16, 0.2],
      ['kk_comicbox_open.gltf', 'kk_comicbox_open.bin', 0.9, 3, 6, -0.3],
      ['kk_guitar_A.gltf', 'kk_guitar_A.bin', 1.3, -3, 7, 1.1]
    ];
    kk.forEach(function (k) {
      loadGLTFInline(k[0], k[1], function (o) {
        fit(o, k[2]);
        o.position.set(k[3], 0, k[4]); o.rotation.y = k[5];
        eachMesh(o, function (m) { m.castShadow = m.receiveShadow = true; });
        farm.add(o);
      });
    });

    var grassMat = new THREE.MeshToonMaterial({ color: 0x4e9e3d, gradientMap: GRADIENT });
    for (var i = 0; i < 26; i++) {
      var g = loadOBJ('leap_grass_blades_1.obj', grassMat);
      fit(g, 0.6 + Math.random() * 0.4);
      var ang = Math.random() * Math.PI * 2, rr = Math.random() * (R - 3);
      g.position.set(Math.cos(ang) * rr, 0.3, Math.sin(ang) * rr);
      g.rotation.y = Math.random() * 6;
      farm.add(g);
    }

    loadGLB('furn_Carrot.glb', function (o) {
      fit(o, 2.6);
      var ped = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.7, 0.9, 14), new THREE.MeshToonMaterial({ color: 0x9aa7b5, gradientMap: GRADIENT }));
      ped.position.set(10, 0.45, 10); ped.castShadow = ped.receiveShadow = true;
      o.position.set(10, 1.0, 10);
      farm.add(ped); farm.add(o);
      SPINNERS.push({ obj: o, speed: 0.6 });
    });

    scene.add(farm);
  }

  // ---------- ring-road traffic ----------
  function buildCars() {
    var specs = [
      ['car_police.glb', 0, 0.16],
      ['car_van.glb', 0.33, 0.14],
      ['car_italia.glb', 0.66, 0.19]
    ];
    specs.forEach(function (s) {
      loadGLB(s[0], function (o) {
        fit(o, 1.9);
        eachMesh(o, function (m) { m.castShadow = true; });
        scene.add(o);
        CARS.push({ obj: o, t: s[1], speed: s[2], r: 90 });
      });
    });
  }

  // ---------- fireflies ----------
  function buildFireflies() {
    var geo = new THREE.BufferGeometry();
    var pts = [], seeds = [];
    for (var i = 0; i < 140; i++) {
      var zone = Math.random();
      var cx = zone < 0.5 ? 0 : (zone < 0.75 ? 56 : -56);
      var cz = zone < 0.5 ? -52 : 40;
      pts.push(cx + (Math.random() - 0.5) * 30, 0.8 + Math.random() * 3.5, cz + (Math.random() - 0.5) * 30);
      seeds.push(Math.random() * Math.PI * 2);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    FIREFLIES = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xd8ff9a, size: 0.5, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    FIREFLIES.userData.seeds = seeds;
    scene.add(FIREFLIES);
  }

  // ============================================================
  // PLAYER — character with palette + procedural Mixamo animation
  // ============================================================
  var player = new THREE.Group();
  player.position.set(0, 0, -8);
  scene.add(player);
  var human = null, carrot = null;
  var bones = {};   // mixamorig bone map
  var palette = {   // fallback outfit colors when the FBX texture map fails
    hair: 0x5a3a22, skin: 0xeab58a, top: 0x3e7bd0, pants: 0x31425f, shoe: 0x23262e, default: 0x9a7bbd
  };

  function dressHuman(obj) {
    eachMesh(obj, function (m) {
      m.castShadow = true;
      m.frustumCulled = false; // skinned meshes can get culled wrongly at our scale
      var mats = Array.isArray(m.material) ? m.material : [m.material];
      var fixed = mats.map(function (mat) {
        if (!mat) return new THREE.MeshToonMaterial({ color: palette.default, gradientMap: GRADIENT });
        var map = mat.map || null;
        var name = ((mat.name || '') + ' ' + (m.name || '')).toLowerCase();
        var col = null;
        if (name.indexOf('hair') >= 0) col = palette.hair;
        else if (name.indexOf('face') >= 0 || name.indexOf('skin') >= 0 || name.indexOf('head') >= 0) col = palette.skin;
        else if (name.indexOf('top') >= 0 || name.indexOf('shirt') >= 0 || name.indexOf('jacket') >= 0 || name.indexOf('body') >= 0) col = palette.top;
        else if (name.indexOf('bot') >= 0 || name.indexOf('pant') >= 0 || name.indexOf('jean') >= 0 || name.indexOf('leg') >= 0) col = palette.pants;
        else if (name.indexOf('shoe') >= 0 || name.indexOf('foot') >= 0) col = palette.shoe;
        else if (!map) col = palette.default;
        var p = {
          map: map, gradientMap: GRADIENT, transparent: !!mat.transparent, opacity: mat.opacity !== undefined ? mat.opacity : 1,
          side: mat.side !== undefined ? mat.side : THREE.FrontSide
        };
        if (col !== null) p.color = col;
        else if (mat.color) p.color = mat.color.clone();
        else p.color = new THREE.Color(palette.default);
        return new THREE.MeshToonMaterial(p);
      });
      m.material = fixed.length === 1 ? fixed[0] : fixed;
    });
  }

  function buildPlayer() {
    human = loadFBX('plat_Rigged_Character.fbx');
    fit(human, 1.75);
    dressHuman(human);
    // collect bones
    human.traverse(function (o) {
      if (o.isBone) {
        var n = o.name.toLowerCase();
        bones[o.name] = o;
        if (n.indexOf('hips') >= 0) bones.hips = o;
        else if (n.indexOf('spine2') >= 0) bones.spine2 = o;
        else if (n.indexOf('spine1') >= 0) bones.spine1 = o;
        else if (n.indexOf('spine') >= 0 && !bones.spine) bones.spine = o;
        else if (n.indexOf('neck') >= 0) bones.neck = o;
        else if (n.indexOf('head') >= 0 && n.indexOf('top') < 0 && n.indexOf('end') < 0) bones.head = o;
        else if (n.indexOf('leftupleg') >= 0) bones.Lupleg = o;
        else if (n.indexOf('leftleg') >= 0 && n.indexOf('up') < 0) bones.Lleg = o;
        else if (n.indexOf('rightupleg') >= 0) bones.Rupleg = o;
        else if (n.indexOf('rightleg') >= 0 && n.indexOf('up') < 0) bones.Rleg = o;
        else if (n.indexOf('leftarm') >= 0 && n.indexOf('fore') < 0) bones.Larm = o;
        else if (n.indexOf('leftforearm') >= 0) bones.Lfore = o;
        else if (n.indexOf('rightarm') >= 0 && n.indexOf('fore') < 0) bones.Rarm = o;
        else if (n.indexOf('rightforearm') >= 0) bones.Rfore = o;
        else if (n.indexOf('lefthand') >= 0) bones.Lhand = o;
        else if (n.indexOf('righthand') >= 0) bones.Rhand = o;
      }
    });
    var mapped = ['hips', 'spine', 'spine1', 'spine2', 'neck', 'head', 'Lupleg', 'Lleg', 'Rupleg', 'Rleg', 'Larm', 'Lfore', 'Rarm', 'Rfore'].filter(function (k) { return !!bones[k]; });
    log('bones mapped: ' + mapped.join(','));
    if (!bones.hips) log('WARNING: no mixamorig hips found — procedural anim disabled');
    player.add(human);

    loadGLB('furn_Carrot.glb', function (o) {
      carrot = o; fit(carrot, 1.5);
      eachMesh(carrot, function (m) { m.castShadow = true; });
      carrot.visible = false;
      player.add(carrot);
    });
  }

  // ---- procedural animation (idle / walk / run / air) ----
  var stridePhase = 0, squash = 0;
  var restPose = {}; // remember initial rotations
  function recordRest(b) { for (var k in b) { var o = b[k]; if (o && o.isBone && !restPose[k]) restPose[k] = { rx: o.rotation.x, ry: o.rotation.y, rz: o.rotation.z, py: o.position.y }; } }
  function animHuman(dt, speedNorm, airborne, elapsed) {
    if (!bones.hips) return;
    recordRest(bones);
    stridePhase += dt * (4 + 10 * speedNorm); // stride frequency follows speed
    var s = Math.sin(stridePhase), c = Math.cos(stridePhase);
    var walk = Math.min(1, speedNorm * 1.6);      // 0 idle -> 1 full run
    var air = airborne ? 1 : 0;
    var ease = function (t) { return t * t * (3 - 2 * t); };
    var w = ease(walk);
    function leg(Up, Lo, sign) {
      var UpKey = Up === bones.Lupleg ? 'Lupleg' : 'Rupleg';
      var LoKey = Up === bones.Lupleg ? 'Lleg' : 'Rleg';
      if (!Up || !Lo || !restPose[UpKey]) return;
      if (air) { Up.rotation.x = restPose[UpKey].rx + 0.45; Lo.rotation.x = restPose[LoKey].rx + 0.95; return; }
      Up.rotation.x = restPose[UpKey].rx + s * 0.75 * w * sign;
      Lo.rotation.x = restPose[LoKey].rx + Math.max(0, -s * sign) * 1.05 * w + 0.06;
    }
    leg(bones.Lupleg, bones.Lleg, 1);
    leg(bones.Rupleg, bones.Rleg, -1);
    function arm(A, F, sign) {
      var AKey = A === bones.Larm ? 'Larm' : 'Rarm';
      var FKey = A === bones.Larm ? 'Lfore' : 'Rfore';
      if (!A || !restPose[AKey]) return;
      var r = restPose[AKey];
      if (air) { A.rotation.x = r.rx - 1.9; if (F && restPose[FKey]) F.rotation.x = restPose[FKey].rx - 0.4; return; }
      A.rotation.x = r.rx - s * 0.65 * w * sign + Math.sin(elapsed * 1.7) * 0.03;
      A.rotation.z = r.rz + 0.12 * w * sign;
      if (F && restPose[FKey]) F.rotation.x = restPose[FKey].rx - 0.35 - 0.35 * w;
    }
    arm(bones.Larm, bones.Lfore, 1);
    arm(bones.Rarm, bones.Rfore, -1);
    if (bones.spine2 && restPose.spine2) bones.spine2.rotation.y = restPose.spine2.ry + c * 0.14 * w;
    if (bones.spine1 && restPose.spine1) bones.spine1.rotation.x = restPose.spine1.rx + 0.05 * w + (air ? 0.12 : 0) + Math.sin(elapsed * 1.9) * 0.015;
    if (bones.head && restPose.head) bones.head.rotation.x = restPose.head.rx + Math.sin(elapsed * 2.3) * 0.02 - 0.04 * w;
    if (restPose.hips) {
      var bob = air ? 0 : Math.abs(c) * 0.045 * w;
      var breath = air ? 0 : Math.sin(elapsed * 1.6) * 0.008 * (1 - w);
      bones.hips.position.y = restPose.hips.py + bob + breath;
      bones.hips.rotation.y = restPose.hips.ry + c * 0.08 * w;
    }
  }

  // ---------- third-person controller ----------
  var keys = {};
  var camYaw = 0, camPitch = 0.36, camDist = 6.5, camDistCur = 6.5;
  var lastDragT = -10;
  var vel = new THREE.Vector3();
  var velY = 0, onGround = true, coyote = 0, jumpBuf = 0, jumpHeld = false;
  var facing = 0, fovKick = 58;
  var dragging = false, lastX = 0, lastY = 0;

  window.addEventListener('keydown', function (e) {
    if (e.repeat) return;
    keys[e.code] = true;
    if (e.code === 'Space') { jumpBuf = 0.14; jumpHeld = true; e.preventDefault(); }
    if (e.code === 'KeyC') swapChar();
    if (e.code === 'KeyT') { state.toonMode = !state.toonMode; applyMaterialMode(); sfx('sfx_blip.wav', 0.35); updateHud(); }
    if (e.code === 'KeyB') { state.bloomOn = !state.bloomOn; bloom.enabled = state.bloomOn; sfx('sfx_blip.wav', 0.35); updateHud(); }
    if (e.code === 'KeyM') { toggleMusic(); updateHud(); }
  });
  window.addEventListener('keyup', function (e) {
    keys[e.code] = false;
    if (e.code === 'Space') jumpHeld = false;
  });

  canvas.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; audioCtx(); });
  window.addEventListener('pointerup', function () { dragging = false; });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    camYaw -= (e.clientX - lastX) * 0.005;
    camPitch = Math.max(0.08, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.004));
    lastDragT = clock.elapsedTime;
    lastX = e.clientX; lastY = e.clientY;
  });
  canvas.addEventListener('wheel', function (e) {
    camDist = Math.max(3.2, Math.min(16, camDist + e.deltaY * 0.01));
    e.preventDefault();
  }, { passive: false });

  function swapChar() {
    if (!human || !carrot) return;
    state.char = state.char === 'human' ? 'carrot' : 'human';
    human.visible = state.char === 'human';
    carrot.visible = state.char === 'carrot';
    sfx('sfx_blip.wav', 0.4);
  }

  // dust puffs
  var puffs = [];
  function dustPuff(pos, n) {
    var geo = new THREE.BufferGeometry();
    var arr = new Float32Array(n * 3), vels = [];
    for (var i = 0; i < n; i++) {
      arr[i * 3] = pos.x + (Math.random() - 0.5) * 0.4;
      arr[i * 3 + 1] = pos.y + 0.05;
      arr[i * 3 + 2] = pos.z + (Math.random() - 0.5) * 0.4;
      var a = Math.random() * Math.PI * 2;
      vels.push(new THREE.Vector3(Math.cos(a) * (0.6 + Math.random()), 0.6 + Math.random() * 0.9, Math.sin(a) * (0.6 + Math.random())));
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    var p = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xcbb694, size: 0.32, transparent: true, opacity: 0.9, depthWrite: false
    }));
    scene.add(p);
    puffs.push({ pts: p, vels: vels, life: 0.8 });
  }
  var sparkles = [];
  function burst(pos) {
    var n = 14;
    var geo = new THREE.BufferGeometry();
    var arr = new Float32Array(n * 3), vels = [];
    for (var i = 0; i < n; i++) {
      arr[i * 3] = pos.x; arr[i * 3 + 1] = pos.y; arr[i * 3 + 2] = pos.z;
      vels.push(new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 4 + 1, (Math.random() - 0.5) * 4));
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    var p = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xffd24a, size: 0.45, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    scene.add(p);
    sparkles.push({ pts: p, vels: vels, life: 1 });
  }

  // ---------- material mode (multi-material safe) ----------
  function convertMat(base) {
    var map = base.map || null;
    var p = {
      map: map, gradientMap: GRADIENT,
      transparent: base.transparent, opacity: base.opacity !== undefined ? base.opacity : 1,
      side: base.side !== undefined ? base.side : THREE.FrontSide
    };
    if (base.color) p.color = base.color.clone(); else p.color = new THREE.Color(0xffffff);
    if (base.emissive) p.emissive = base.emissive.clone();
    if (state.toonMode) return new THREE.MeshToonMaterial(p);
    delete p.gradientMap; p.roughness = 0.82; p.metalness = 0.05;
    return new THREE.MeshStandardMaterial(p);
  }
  function applyMaterialMode() {
    scene.traverse(function (o) {
      if (!o.isMesh) return;
      if (o.material && o.material.isShaderMaterial) return;
      if (!o.userData.baseMat) {
        o.userData.baseMat = Array.isArray(o.material) ? o.material.slice() : o.material;
      }
      var base = o.userData.baseMat;
      if (Array.isArray(base)) o.material = base.map(convertMat);
      else o.material = convertMat(base);
    });
  }

  // ---------- HUD ----------
  function updateHud() {
    $('hud-coins').textContent = state.coins;
    $('hud-mode').textContent = (state.toonMode ? 'TOON' : 'STANDARD') + ' shading';
    $('hud-bloom').textContent = state.bloomOn ? 'ON' : 'OFF';
    $('hud-music').textContent = musicOn ? 'ON' : 'OFF';
    $('chk-toon').checked = state.toonMode;
    $('chk-bloom').checked = state.bloomOn;
  }
  function popCoins() {
    var el = $('hud-coins').parentElement;
    el.style.transform = 'scale(1.25)';
    setTimeout(function () { el.style.transform = 'scale(1)'; }, 130);
  }
  var toastTimer = null;
  function toastZone(name) {
    var el = $('zone-toast');
    el.textContent = name;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  $('chk-toon').addEventListener('change', function (e) { state.toonMode = e.target.checked; applyMaterialMode(); updateHud(); });
  $('chk-bloom').addEventListener('change', function (e) { state.bloomOn = e.target.checked; bloom.enabled = state.bloomOn; updateHud(); });
  $('rng-day').addEventListener('input', function (e) { state.dayT = parseFloat(e.target.value); });
  $('btn-music').addEventListener('click', function () { toggleMusic(); updateHud(); });

  var ZONES = [
    { name: 'Toon Plaza — ToonStyleStuff + Cartoon Furniture', x: 0, z: -52, r: 26 },
    { name: 'Jump Ridge — 3D Platformer Pack + Leap Land', x: 56, z: 40, r: 26 },
    { name: 'Carrot Farms — Toyamon + KayKit + Carrot', x: -56, z: 40, r: 26 }
  ];
  function checkZone() {
    for (var i = 0; i < ZONES.length; i++) {
      var z = ZONES[i];
      var dx = player.position.x - z.x, dz = player.position.z - z.z;
      if (dx * dx + dz * dz < z.r * z.r) {
        if (state.zone !== z.name) { state.zone = z.name; toastZone(z.name); }
        return;
      }
    }
    state.zone = '';
  }

  // ---------- day/night ----------
  function applyDayNight(t, elapsed) {
    var ang = t * Math.PI * 2 - Math.PI / 2;
    var sy = Math.sin(ang), sx = Math.cos(ang);
    var dayF = Math.max(0, Math.min(1, (sy + 0.25) * 1.6));
    var nightF = 1 - dayF;
    sun.position.set(sx * 180, Math.max(-30, sy * 180), 80);
    sun.target.position.set(0, 0, 0);
    sun.intensity = 0.15 + dayF * 1.25;
    sun.color.setHSL(0.09 + dayF * 0.03, 0.7 - dayF * 0.35, 0.55 + dayF * 0.25);
    sunOrb.position.copy(sun.position);
    sunOrb.visible = sy > -0.1;
    moonOrb.position.set(-sx * 200, Math.max(-30, -sy * 200), -100);
    moonOrb.visible = sy < 0.1;
    hemi.intensity = 0.16 + dayF * 0.45;
    skyUniforms.topColor.value.setHSL(0.6, 0.75, 0.08 + dayF * 0.35);
    skyUniforms.bottomColor.value.setHSL(0.55 + dayF * 0.04, 0.6, 0.1 + dayF * 0.62);
    scene.fog.color.setHSL(0.58, 0.45, 0.08 + dayF * 0.6);
    stars.material.opacity = nightF * 0.9;
    if (FIREFLIES) FIREFLIES.material.opacity = nightF * 0.95;
    if (PLAZA_LAMPS) {
      PLAZA_LAMPS.forEach(function (L) {
        var flick = 0.85 + 0.15 * Math.sin(elapsed * 9 + L.phase) * Math.sin(elapsed * 23.7 + L.phase * 3);
        L.light.intensity = nightF * 1.6 * flick;
        L.bulb.material.color.setHSL(0.12, 0.8, 0.5 + 0.3 * nightF * flick);
      });
    }
    if (ARC_MAT) ARC_MAT.uniforms.time.value = elapsed;
  }

  // ---------- physics ----------
  var PLAYER_R = 0.42;
  function groundHeightAt(x, z, curY) {
    var h = 0;
    for (var i = 0; i < PLATFORMS.length; i++) {
      var b = PLATFORMS[i];
      if (x > b.min.x - PLAYER_R && x < b.max.x + PLAYER_R && z > b.min.z - PLAYER_R && z < b.max.z + PLAYER_R) {
        if (b.max.y > h && b.max.y <= curY + 0.5) h = b.max.y;
      }
    }
    return h;
  }

  var tmpV = new THREE.Vector3();
  var tmpV2 = new THREE.Vector3();
  function movePlayer(dt, elapsed) {
    // input dir, camera-relative (CORRECTED basis)
    var mx = 0, mz = 0;
    if (keys['KeyW'] || keys['ArrowUp']) mz += 1;       // forward = away from camera
    if (keys['KeyS'] || keys['ArrowDown']) mz -= 1;
    if (keys['KeyA'] || keys['ArrowLeft']) mx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) mx += 1;
    var run = keys['ShiftLeft'] || keys['ShiftRight'];
    var speedTarget = run ? 13 : 7.2;
    if (state.char === 'carrot') speedTarget *= 1.1;

    var fwd = tmpV.set(-Math.sin(camYaw), 0, -Math.cos(camYaw));     // camera -> forward
    var right = tmpV2.set(-fwd.z, 0, fwd.x);                          // screen-right
    var wish = new THREE.Vector3(fwd.x * mz + right.x * mx, 0, fwd.z * mz + right.z * mx);
    var wishLen = wish.length();
    if (wishLen > 0.0001) wish.multiplyScalar(1 / wishLen);

    // accel/decel
    var accel = wishLen > 0 ? (onGround ? 42 : 14) : (onGround ? 26 : 4);
    var target = wish.multiplyScalar(wishLen > 0 ? speedTarget : 0);
    vel.x += (target.x - vel.x) * Math.min(1, accel * dt / 6);
    vel.z += (target.z - vel.z) * Math.min(1, accel * dt / 6);
    var planarSpeed = Math.hypot(vel.x, vel.z);

    player.position.x += vel.x * dt;
    player.position.z += vel.z * dt;

    // jump: coyote + buffer + variable height
    var feet = player.position.y;
    var gh = groundHeightAt(player.position.x, player.position.z, feet);
    if (onGround) coyote = 0.12; else coyote = Math.max(0, coyote - dt);
    jumpBuf = Math.max(0, jumpBuf - dt);
    if (jumpBuf > 0 && coyote > 0) {
      velY = 10; onGround = false; coyote = 0; jumpBuf = 0;
      squash = -0.18;
      sfx('sfx_jump.wav', 0.3);
      dustPuff(player.position, 8);
    }
    velY -= 26 * dt;
    if (velY < 0 && !jumpHeld) velY -= 18 * dt;   // short hop when released
    player.position.y += velY * dt;

    if (player.position.y <= gh) {
      if (!onGround && velY < -4) {
        squash = 0.16;
        dustPuff(player.position, 10);
        sfx('sfx_hit.wav', 0.12);
      }
      player.position.y = gh; velY = 0; onGround = true;
    } else if (player.position.y > gh + 0.02) { onGround = false; }

    // fell off the island? respawn
    if (Math.hypot(player.position.x, player.position.z) > 118 || player.position.y < -20) {
      player.position.set(0, 3, -8); vel.set(0, 0, 0); velY = 0;
      toastZone('Back on the island — mind the edge!');
    }

    // face movement direction (smooth shortest-arc)
    if (planarSpeed > 0.6) {
      var want = Math.atan2(vel.x, vel.z);
      var diff = ((want - facing + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      facing += diff * Math.min(1, dt * 12);
      player.rotation.y = facing;
    }

    // run dust
    if (onGround && planarSpeed > 9 && Math.random() < dt * 14) dustPuff(player.position, 3);

    // character animation
    var speedNorm = Math.min(1.2, planarSpeed / 13);
    if (state.char === 'human') {
      animHuman(dt, speedNorm, !onGround, elapsed);
    } else if (carrot) {
      carrot.rotation.z = planarSpeed > 0.6 ? Math.sin(elapsed * 14) * 0.16 : 0;
      carrot.position.y = planarSpeed > 0.6 ? Math.abs(Math.sin(elapsed * 7)) * 0.22 : 0;
    }
    // landing squash (applies to whichever character is visible)
    squash = squash * (1 - Math.min(1, dt * 10));
    var sy2 = 1 - squash;
    player.scale.set(1 + (1 - sy2) * 0.6, sy2, 1 + (1 - sy2) * 0.6);

    // coin pickups (magnet)
    for (var i = 0; i < COINS.length; i++) {
      var cn = COINS[i];
      if (cn.taken) continue;
      cn.mesh.rotation.y += dt * 3.2;
      cn.mesh.getWorldPosition(tmpV);
      var dx2 = tmpV.x - player.position.x;
      var dz2 = tmpV.z - player.position.z;
      var dy2 = tmpV.y - (player.position.y + 0.9);
      var d2 = dx2 * dx2 + dz2 * dz2 + dy2 * dy2;
      if (d2 < 7 && onGround) { // magnet: drift toward player
        cn.mesh.position.x += (player.position.x - tmpV.x) * dt * 3;
        cn.mesh.position.z += (player.position.z - tmpV.z) * dt * 3;
        cn.mesh.position.y += ((player.position.y + 0.9) - tmpV.y) * dt * 3;
      }
      if (d2 < 1.6) {
        cn.taken = true; cn.mesh.visible = false;
        state.coins++;
        sfx('sfx_powerup.wav', 0.45);
        burst(tmpV.clone());
        popCoins(); updateHud();
        if (state.coins === COINS.length) toastZone('ALL ' + state.coins + ' COLLECTED! You cleaned out the vault!');
      }
    }
  }

  // ---------- camera ----------
  var camPos = new THREE.Vector3(0, 6, 6);
  var lookAt = new THREE.Vector3();
  function updateCamera(dt) {
    // auto-align behind the character while moving (unless user dragged recently)
    var moving = Math.hypot(vel.x, vel.z) > 1.5;
    var sinceDrag = clock.elapsedTime - lastDragT;
    if (moving && sinceDrag > 1.4) {
      var want = facing + Math.PI; // camera behind facing dir
      var diff = ((want - camYaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      camYaw += diff * Math.min(1, dt * 1.6);
    }
    camDistCur += (camDist - camDistCur) * Math.min(1, dt * 8);
    var tx = player.position.x, ty = player.position.y + 1.7, tz = player.position.z;
    var cx = tx + Math.sin(camYaw) * Math.cos(camPitch) * camDistCur;
    var cz = tz + Math.cos(camYaw) * Math.cos(camPitch) * camDistCur;
    var cy = ty + Math.sin(camPitch) * camDistCur;
    if (cy < 0.6) cy = 0.6;
    camPos.lerp(tmpV.set(cx, cy, cz), Math.min(1, dt * 9));
    camera.position.copy(camPos);
    lookAt.lerp(tmpV.set(tx, ty + 0.2, tz), Math.min(1, dt * 12));
    camera.lookAt(lookAt);
    // FOV kick while running
    var wantFov = 58 + (Math.hypot(vel.x, vel.z) > 9 ? 6 : 0);
    fovKick += (wantFov - fovKick) * Math.min(1, dt * 5);
    camera.fov = fovKick; camera.updateProjectionMatrix();
  }

  // ---------- traffic ----------
  function moveCars(dt) {
    CARS.forEach(function (c) {
      c.t = (c.t + dt * c.speed * 0.1) % 1;
      var a = c.t * Math.PI * 2;
      var x = Math.cos(a) * c.r, z = Math.sin(a) * c.r;
      var nx = -Math.sin(a), nz = Math.cos(a);
      c.obj.position.set(x, 0.05, z);
      c.obj.rotation.y = Math.atan2(nx, nz);
      c.obj.rotation.z = Math.sin(clock.elapsedTime * 0.004 + c.r) * 0.05;
    });
  }

  // ---------- build ----------
  var loadedSteps = 0, totalSteps = 5;
  function stepDone() { loadedSteps++; $('load-fill').style.width = Math.round((loadedSteps / totalSteps) * 100) + '%'; }

  buildPlaza(); stepDone();
  buildRidge(); stepDone();
  buildFarm(); stepDone();
  buildCars(); stepDone();
  buildFireflies(); buildPlayer(); stepDone();

  applyMaterialMode();
  applyDayNight(state.dayT, 0);
  updateHud();

  setTimeout(function () {
    $('loading').classList.add('hide');
    setTimeout(function () { $('loading').style.display = 'none'; }, 600);
    toastZone('Welcome to Vault Island — WASD move, SPACE jump, drag to look');
  }, 400);

  // ---------- loop ----------
  var clock = new THREE.Clock();
  var fpsT = 0, frames = 0;
  function tickParticles(sp, idx, dt, sparkle) {
    sp.life -= dt * (sparkle ? 1.4 : 1.2);
    var pos = sp.pts.geometry.attributes.position;
    for (var v = 0; v < sp.vels.length; v++) {
      sp.vels[v].y -= (sparkle ? 9 : 2.2) * dt;
      pos.array[v * 3] += sp.vels[v].x * dt;
      pos.array[v * 3 + 1] += sp.vels[v].y * dt;
      pos.array[v * 3 + 2] += sp.vels[v].z * dt;
    }
    pos.needsUpdate = true;
    sp.pts.material.opacity = Math.max(0, Math.min(1, sp.life));
    if (sp.life <= 0) { scene.remove(sp.pts); (sparkle ? sparkles : puffs).splice(idx, 1); }
  }
  function loop() {
    requestAnimationFrame(loop);
    var dt = Math.min(0.05, clock.getDelta());
    var elapsed = clock.elapsedTime;

    movePlayer(dt, elapsed);
    moveCars(dt);

    var i;
    for (i = 0; i < SPINNERS.length; i++) SPINNERS[i].obj.rotation.y += dt * SPINNERS[i].speed;
    for (i = 0; i < BOBBERS.length; i++) {
      var b = BOBBERS[i];
      if (b.scaleY) b.obj.scale.y = 1 + Math.sin(elapsed * 3 + b.phase) * 0.06;
      else b.obj.position.y += Math.sin(elapsed * 1.6 + b.phase) * b.amp * dt * 2;
    }
    for (i = sparkles.length - 1; i >= 0; i--) tickParticles(sparkles[i], i, dt, true);
    for (i = puffs.length - 1; i >= 0; i--) tickParticles(puffs[i], i, dt, false);
    if (FIREFLIES && FIREFLIES.material.opacity > 0.01) {
      var fp = FIREFLIES.geometry.attributes.position;
      var seeds = FIREFLIES.userData.seeds;
      for (var f = 0; f < seeds.length; f++) {
        fp.array[f * 3] += Math.sin(elapsed * 0.7 + seeds[f]) * 0.008;
        fp.array[f * 3 + 1] += Math.sin(elapsed * 1.3 + seeds[f] * 2) * 0.006;
      }
      fp.needsUpdate = true;
    }

    applyDayNight(state.dayT, elapsed);
    waterUniforms.time.value = elapsed;
    checkZone();
    updateCamera(dt);

    composer.render();

    frames++; fpsT += dt;
    if (fpsT >= 0.5) { $('hud-fps').textContent = Math.round(frames / fpsT) + ' fps'; frames = 0; fpsT = 0; }
  }
  loop();

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  if (failCount > 0) log('completed with ' + failCount + ' asset failures');
})();
