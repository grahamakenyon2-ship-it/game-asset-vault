# ASSET APPLICATION MAP — Where Every Pack Gets Used
(Oct 30, 2026 · companion to SCAN-NOTES.md · doctrine source: THE MEGABIBLE)

## Doctrine filters (apply before ANY use)
1. **Portal style lane:** bright/colorful soft-2D-cartoon + flat vector wins on Poki; pixel works on CrazyGames but underperforms on Poki charts. Vector packs = Poki candidates; pixel packs = CrazyGames candidates.
2. **Cohesion > quantity:** never mix vector art with pixel art in one game; never mix two pixel styles with clashing palettes; never mix pixel scales (16/32/64) in one scene.
3. **Readability:** everything must read at DPR-1 on a Chromebook window (megabible technical reqs).
4. **License gate:** green rows in ASSET-LICENSES.md only. Sprout Lands + Tiny Wonder Farm free = quarantine (non-commercial, prototype-only, never ship).

---

## BOOSTER BARN (current title → CrazyGames)
| Asset | Application | Type |
|---|---|---|
| Sfx pack 4 free (CC0) | **The one directly-usable pack.** Coin/select/powerup/hit/explosion/jump WAVs → layer under BB's synthesized audio at: milestone celebrations (fanfare + sparkle), card pack opens, buy clicks. Post-v0.8 juice milestone. | immediate |
| Tiny Swords Particle FX | Visual reference for BB's particle language (megabible 12-particle burst standard) — study, don't paste | reference |
| Sunnyside VFX sprites | Same — sparkle/glint/impact framing reference | reference |
| Cozy UI / Basic GUI / Prinbles / MegaPack PastelUI | Design reference for BB's eventual UI panel restyle pass (layout + hover states). BB UI is hand-canvas-drawn; adopt IDEAS, not files, to protect cohesion | reference |
| Everything else | **Do not paste into BB.** BB's hand-coded cozy vector style is its identity; pixel assets would break cohesion | — |

## GAME #2 CANDIDATES (post-BB, ranked by art-readiness)
### A. "Sunnyside Farm" — cozy farm idle (strongest play)
- **Sunnyside World (✅ cleared, no credit needed):** ~70% of a farm game's art — humans/goblins × 7 hairstyles × 16 actions (idle/walk/run/roll/jump/hurt/death/carry/attack/swim/chop/mine/build/fish), **11 crops × 5 growth stages** (the exact crop-progression backbone an idle farm needs), animals, plants, buildings/interiors/land tileset (16px), 9-slice UI, VFX, emotes.
- Companions (same bright cute-pixel lane, adjacent scales): **MegaPackFree** animals + PastelUI (CC0) for variety/accents; **Maeve Farm RPG** 16x16 tiles/animals (⚠️ verify first) for filler props.
- Fit: the idle bible's farm-sim archetype (Monkey Mart/Forager lineage) with near-zero art cost. CrazyGames target (pixel lane).
### B. Vector platformer (Poki lane)
- **Bayat Free Platform Game Assets (⚠️ confirm terms):** 1,082 files, full vector platformer kit + **AI/EPS sources** = palette-swap/restyle freedom; character part system, enemies, seasonal tiles, GUI, updates through 1.9.
- Companions: **Basic GUI Bundle** (CC0, vector buttons/icons) for menus; **Sfx pack 4** (CC0) for jump/explosion/coin.
- Fit: megabible says bright colorful 2D > all on Poki — this is the only pack in the vault that IS that lane natively.
### C. Tiny Swords micro-RTS (CrazyGames)
- **Tiny Swords (✅ cleared, no credit):** 6 faction colors of units (warrior/lancer/archer/monk/pawn), buildings, terrain, UI, particles, Aseprite sources (re-editable).
- Fit: short-session "tiny war" arcade strategy; the idle bible's collection/completion loops map onto unit unlocks. Aseprite sources = we can recolor/extend.

## GAME #3+ / PROTOTYPE BIN
- **Dungeon crawler / micro-roguelite:** Pixel Crawler (modular 4-dir chars, ✅) + Free Dungeon Explorer (tilemap/enemies/battlers/item icons/128px UI + bundled SFX, ✅ credit required) + Legacy-Fantasy High Forest (Anokolisa forest env, ✅). All retro pixel, mutually compatible scale language — one coherent dungeon aesthetic from three packs.
- **Cat café idle:** MegaPackFree cats (Mochi/Pochi/sleeping cat/cat room/cat UI, CC0) — small niche title, fast to build, cozy branding.
- **Merge / inventory-management:** Cozy UI inventory + item slots + checkboxes (✅ demo subset, upgradeable) + Glionox 1,244 16x16 item icons (⚠️ the one unresolved license — if it clears, this is the merge-genre backbone; if not, substitute MegaPack environment items).
- **Any management/idle game, any time:** Mucho Pixels character animations (✅ essentially) — pickup/attack/carry/walk actions × male/female × 3 chars × clothing states at 64px flat. The "worker doing a job" animation library for every future idle title; mixes cleanly with vector UI.

## OTHER PROJECTS (honest verdicts)
- **CYF (Choose Your Fate):** N/A — CYF has its own portrait vault + card aesthetic; pixel icons would clash. Don't force it.
- **Fateblade:** N/A for art (own minted-art pipeline + vault); marginal: CC0 menu/click SFX could layer into the patcher UI someday. Low priority.
- **VibeForge / BB editor tools:** Cozy UI containers/buttons = optional reskin reference for the layout editor UI. Cosmetic.

## Style-mixing RULES (learn these once)
1. Pixel + vector in one game = never. Pick a lane per game.
2. Tiny Swords (muted-dark) ≠ Sprout Lands (bright) ≠ Sunnyside (bright) palettes — don't mix packs with different palettes in one scene even if both are pixel.
3. 16px tiles (Sunnyside/Maeve) vs 32px (Dungeon Explorer) vs 64px chars (Muchopixels): scale-locked per game; 16px chars pair with 16px tiles.
4. When in doubt: one pack per game + CC0 SFX + one UI kit. Cohesion is the cheapest quality multiplier we own.

## Inventory of high-leverage single assets
- 1,244 item icons (pending license) — biggest single-category pool in the vault
- 70 CC0 SFX — the vault's most universally-usable content
- Sunnyside's 11 crops × 5 stages — the exact spine of an idle farm
- Muchopixels pickup/attack frames — ready-made worker animations
- Cozy UI item-slot/inventory — drop-in for any inventory screen

## GHOST COMPANY (turn-based tactics, séance tone, echo-tint) — added Nov 2 2026 (full vault fit pass, 42 packs censused)

**Verdict: ~80% covered. Primary kit = Free Dungeon Explorer; premium alternate = Tiny Swords.**

- **PRIMARY (playtest lane, 32px-class): Dungeon Explorer** — 12 chars × Idle/Walk/Attack/**Dead** (4-dir) + slimes + tilemap + health-bar UI + enemy battlers + **bundled SFX (footsteps/hits/buttons/trap/treasure ×3 formats)**. Echo-tint = runtime Godot shader over living sprite (no asset edit needed). Credit ElvGames REQUIRED.
- **PREMIUM ALTERNATE (192px big-pixel): Tiny Swords** — 5 factions × 5 classes (squad color identity), full Aseprite sources (séance palette-darken + echo-tint = batch recolor), full UI kit incl. **cursors** + bars + wood table, particle FX + aseprite, 5-color tilemaps. Weaknesses: no death/hurt anims; bright cartoon tone needs darkening (vision-verified bright). Green license.
- **Enemies/flavor (64px muted lane, pair together): Pixel Crawler** (Skeleton Crew Warrior/Mage/Rogue w/ Idle/Run/Death — séance-perfect; hero body w/ Death/Hit/Slice/Pierce/Crush anims; Aseprite sources) + **Legacy-Fantasy High Forest** (Boar w/ Hit-Vanish, Bee w/ Attack, Snail; HUD; muted retro).
- **SFX:** DE bundled set (on-tone tactical) + Sfx pack 4 (70 CC0: Blip_Select=UI, Hit_Hurt=impacts, Explosion=death).
- **Icons:** Glionox 1,244 16×16 (now GREEN, credit) incl. ritual instruments + mob drops.
- **UI:** ship-lane = Tiny Swords UI; Cozy UI / Simple UI #3 / Pixel UI 3 / Basic GUI / Prinbles = prototype-only (vector lane clash). carrot-portraits (CC0) = dialogue mockups only.
- **Excluded:** Sprout Lands + Tiny Wonder Farm (red, non-commercial), MegaPack/mp_char/Farm RPG/Bayat (lane mismatch), all 3D packs (ElectricFX kept as spectral-shader REFERENCE only).
- **GAPS (must source externally/custom): 1) music — zero in vault; 2) fonts — zero; 3) grid move/target indicators — custom quads + Tiny Swords cursors; 4) spectral/echo VFX — custom Godot shader (signature look, worth the effort); 5) death anims at Tiny Swords scale (shader dissolve).**
- **Scale rule enforced: DE 24px ≠ Tiny Swords 192px ≠ PC/Legacy 64px — never mix lanes in one scene.**

## THREE KINGDOMS TACTICS (FFT-style tactics, Han-dynasty theme) — added Nov 13 2026 (fit pass)

**Verdict: prototype ~70% covered via the Tiny Swords lane (theme restyle needed); Ghost Company engine kit directly reusable; zero Chinese-themed art in vault — theme is the one real gap.**

### PRIMARY (192px big-pixel lane): Tiny Swords (Pixel Frog, ✅ green, Aseprite sources)
- Unit classes map 1:1 onto the game's weapon types: Warrior→jian/dao soldiers, Lancer→spearmen, Archer→archers, Monk→staff, Pawn→fodder soldiers, King→commander/officer base.
- **6 faction colors = the faction system for free:** Yellow Turbans (yellow), Shu (green), Wei (blue), Wu (red), Han loyalists, bandits/militia.
- Buildings, terrain tiles, full UI kit incl. cursors, particle FX — city/fortification battles get walls/gates/buildings from the same pack (cohesion rule satisfied).
- Caveat: European-medieval silhouettes, not Han-dynasty. Aseprite sources make a restyle pass possible, but real theme fit needs custom/commissioned art eventually. Prototype verdict: GOOD ENOUGH TO BUILD AND PLAYTEST NOW.
- Weaknesses (known from GC pass): no death/hurt anims (shader dissolve), no mounted units.

### DIRECTLY REUSABLE ENGINE KIT (in-house, CC0)
- **ghost-kit grid_indicator.gdshader + grid_indicators.gd** — move/attack/path tiles, built for exactly this genre (Ghost Company). Drop in day one.
- **ghost-kit echo_tint.gdshader** — runtime recolor/unify for the Tiny Swords restyle.

### SECONDARY (64px muted lane, reference/filler only — scale-locked, never mixed with Tiny Swords in-scene)
- Pixel Crawler (✅): hero bodies w/ Attack/Dead/Hit anims + weapons — named-officer kit if scale changes.
- Legacy-Fantasy High Forest (✅): foliage/boar/bee — map decoration reference.

### UI + icons + audio
- **Item icons: Glionox 1,244 16x16 (✅ green, give credit)** — weapons/armor icons for the 7-slot equipment grid + shop/inventory. Biggest single win for Jake's equipment system.
- **SFX:** Sfx pack 4 (70 CC0) + 512 Retro SFX (CC0) + 51 UI SFX (CC0) + Dungeon Explorer bundled set (credit ElvGames). Melee/UI/impact coverage complete.
- **UI:** Tiny Swords UI kit (matching lane); Cozy UI / Basic GUI / Pixel UI 3 = prototype-only (lane clash).
- **Fonts:** in-vault pixel fonts (Press Start 2P, Silkscreen, VT323, Pixelify Sans — OFL) for prototype; theme calligraphy needs a Chinese-styled OFL font (e.g. Google Fonts Ma Shan Zheng / ZCOOL series) — not in vault yet.

### GAPS SPECIFIC TO THIS GAME (source or build)
1. **Chinese/Han-dynasty-themed unit + building art** — the theme gap. PD direction available: Three Kingdoms woodblock/warrior print archives (per web-game-art-direction topic); or commission anchor art later; Tiny Swords restyle carries the prototype.
2. **Mounted units** (core system: movement, own HP, flee-when-dismounted) — no mounted sprites anywhere in vault. Custom or commission.
3. **Siege equipment sprites** (4-man ram, crewed catapult) — custom.
4. **Chinese-instrument music** — see addendum below; Serge Quadrado library (Nov 13) now carries game BGM.
5. **Fire/terrain VFX** — partially covered: Pixel Art Spells (CC0, B&W tint-friendly — fire arrows/ignited tiles), Free VFX Pack (CC0), CodeManu 22 effects (CC0); burning-tile shader custom in Godot.
6. **Portraits for named officers** — RESOLVED for prototype: ROTK XI placeholders (see addendum). Shippable alternative: PD woodblock direction.

### Scale rule enforced
Tiny Swords 192px ≠ Pixel Crawler 64px ≠ Dungeon Explorer 24px — one lane per scene. Prototype lane = Tiny Swords.

### ADDENDUM Nov 13 2026 (Jake's placeholder portraits + Serge Quadrado music)
- **Officer portraits (PLACEHOLDERS):** kongming.net/11/portraits/ — full ROTK XI portrait collection, A-Z pages, 256x256 px each, with stats/bios. Use as named-officer placeholders. LICENSE POLICY: Koei Tecmo game art = internal prototyping ONLY; never ship in any public/exported build; keep in a clearly-marked placeholders/ dir with source attribution; replace before release (PD woodblock direction is the shippable alternative).
- **Music: Serge Quadrado library added Nov 13 2026** (~45 tracks, loops + full pieces, mp3, loose in repo root + packs/). Attribution: all tracks by Serge Quadrado, open-source/free per Alex. Fills the game-BGM gap (menu/battle/ambient loops ready: e.g. "Intrigue", "Dungeon", "Invasion", "Menu Music", "Stone Workshop"). NOTE: still not Chinese-idiom (no guzheng/erhu) — Quadrado carries prototype and likely much of the game; Chinese-instrument tracks remain a nice-to-have, not a blocker.
