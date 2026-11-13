

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
- **Music: GAP.** Vault music is séance-ambient (MacLeod, CC-BY) + chiptunes (Junkala, CC0) — wrong idiom. Need guzheng/erhu/winds CC sources (OpenGameArt/Pixabay), or generative ambient v1.

### GAPS SPECIFIC TO THIS GAME (source or build)
1. **Chinese/Han-dynasty-themed unit + building art** — the theme gap. PD direction available: Three Kingdoms woodblock/warrior print archives (per web-game-art-direction topic); or commission anchor art later; Tiny Swords restyle carries the prototype.
2. **Mounted units** (core system: movement, own HP, flee-when-dismounted) — no mounted sprites anywhere in vault. Custom or commission.
3. **Siege equipment sprites** (4-man ram, crewed catapult) — custom.
4. **Chinese-instrument music** (above).
5. **Fire/terrain VFX** — partially covered: Pixel Art Spells (CC0, B&W tint-friendly — fire arrows/ignited tiles), Free VFX Pack (CC0), CodeManu 22 effects (CC0); burning-tile shader custom in Godot.
6. **Portraits for named officers** — options: PD woodblock direction (zero disclosure) or the cyf-portrait-vault AI pipeline (disclosure rules per web-game-art-direction verdict: disclose early, never the pitch).

### Scale rule enforced
Tiny Swords 192px ≠ Pixel Crawler 64px ≠ Dungeon Explorer 24px — one lane per scene. Prototype lane = Tiny Swords.
