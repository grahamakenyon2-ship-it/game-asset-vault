# Asset Vault 3D — Showcase World

Single-file three.js demo of every 3D asset family in the vault.

- `shell.html` — page shell + HUD
- `main.js` — game code (classic script, THREE global)
- `build.mjs` — packs shell + three r147 libs + base64 assets from extracted/ into one HTML
- `pngdown.mjs` — pure-node PNG downscaler used to slim textures

Build: `node showcase/build.mjs out.html` (expects showcase/libs/ with three@0.147 UMD files and curated assets — see build.mjs).
Published Nov 1 2026; playable build delivered via artifact download (6.5MB).
