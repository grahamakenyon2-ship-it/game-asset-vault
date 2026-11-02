# VAULT GAP-FILL MANIFEST — Nov 2 2026

Mission: the vault should hold every asset type any of our games will ever need, all commercial-clear.

## Phase 1 — ACQUIRED Nov 2 2026 (Ghost Company gaps + universal staples)

**These binaries cannot be committed through the automation used today (text-only path) — they were downloaded, verified (all zips pass integrity test), checksummed, and delivered alongside this manifest. Every file has a stable public URL below, so this manifest alone can reconstruct the full set.**

### Fonts (was: ZERO in vault)
| Asset | License | URL |
|---|---|---|
| Press Start 2P | OFL | https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf |
| Silkscreen | OFL | https://raw.githubusercontent.com/google/fonts/main/ofl/silkscreen/Silkscreen-Regular.ttf |
| VT323 | OFL | https://raw.githubusercontent.com/google/fonts/main/ofl/vt323/VT323-Regular.ttf |
| Pixelify Sans | OFL | https://raw.githubusercontent.com/google/fonts/main/ofl/pixelifysans/PixelifySans%5Bwght%5D.ttf |

### Music (was: ZERO in vault)
| Asset | License | URL |
|---|---|---|
| Kevin MacLeod — Ossuary 1/4/5, Peaceful Desolation, Long Note One, Anguish, Relaxing Piano Music, Sardana, Deep Haze, Frost Waltz (séance/dark-ambient picks) | CC BY 4.0, credit ”Kevin MacLeod (incompetech.com)” | https://incompetech.com/music/royalty-free/mp3-royaltyfree/<Track Name>.mp3 |
| Juhani Junkala — 5 Chiptunes Action (Title/Level1-3/Ending, wav loops) | CC0 | https://opengameart.org/sites/default/files/5%20Action%20Chiptunes%20By%20Juhani%20Junkala.zip |
| Juhani Junkala — 4 Chiptunes Adventure (ogg loops) | CC0 | https://opengameart.org/sites/default/files/Juhani%20Junkala%20%5BChiptune%20Adventures%5D%20OGG.zip |

### SFX additions
| Asset | License | URL |
|---|---|---|
| 512 Retro SFX (8-bit style, Juhani Junkala) | CC0 | https://opengameart.org/sites/default/files/The%20Essential%20Retro%20Video%20Game%20Sound%20Effects%20Collection%20%5B512%20sounds%5D.zip |
| 51 UI SFX (buttons/switches/clicks) | CC0 | https://opengameart.org/sites/default/files/UI_SFX_Set.zip |

### VFX / spell effects (was: no magic/spectral effects in vault)
| Asset | License | URL |
|---|---|---|
| DevWizard Pixel Art Spells (PNG + Aseprite; B&W assets designed for engine tinting — perfect for echo-tint cohesion) | CC0 | https://opengameart.org/sites/default/files/pixelart_spells_1.zip |
| Ansimuz Gothicvania Magic Pack 9 (4 spells, 64px) | CC0 | https://opengameart.org/sites/default/files/magic_pack_9_files.zip |
| CodeManu Free VFX Pack (22 effects, 30+60fps, SpriteMancer sources) | CC0 | https://opengameart.org/sites/default/files/vfx_free_pack.zip |
| Viktor Hahn Spell Animations (hi-res sheets + ready-made Godot project) | CC BY 4.0, credit ”Viktor Hahn” | https://opengameart.org/sites/default/files/spell_animations.zip + godot_project.zip |

### Custom Godot kit — COMMITTED to this repo (folder: ghost-kit/)
Authored in-house, CC0: echo_tint.gdshader (spectral tint + dissolve death + rim glow — the signature look), grid_indicator.gdshader (move/attack/ghost-path tiles), grid_indicators.gd (drop-in pooled node), README with click-by-click hookup.

## Phase 2 — next acquisitions roadmap (the ”any game ever” matrix)

| Asset type | Target sources (all commercial-clear) | Priority |
|---|---|---|
| More music: chiptune/orchestral/ambient variety | OpenGameArt CC0 collections (Retro Game Music Pack series), Eric Skiff Resistor Anthems (CC-BY, github) | high |
| Kenney mega-bundles: UI audio, impact sounds, game icons, input prompts, particle pack, fonts | kenney.nl/assets (CC0; site downloads are JS-gated — grab manually via browser) | high |
| Portrait packs (dialogue/séance medium) | Kenney portrait pack (CC0); carrot-portraits already in vault | med |
| Character bases at 16/32/64px | OGA CC0 (”Just another RPG character base”, ”Simple 32x48 base”) | med |
| Tilesets: sci-fi + interior + dungeon variety | OGA CC0 (Dungeon Crawl 32x32 supplementals, partly in vault already) | med |
| Loading screens / transitions / shaders | OGA CC0 + Godot shader recipes | med |
| Weather/ambient loops (rain, wind, thunder) | OGA CC0 (”Rain (loopable)”) | med |
| Voice/taunt packs | OGA CC0 (”Voiceover Pack: Fighter (40+ taunts)”) | low |
| 3D: low-poly nature/character expansions | Kenney + KayKit (CC0) | low |

**Rule from this repo's doctrine stays: every acquisition lands in packs/ + an ASSET-LICENSES.md row in the same session, or it did not happen.**
