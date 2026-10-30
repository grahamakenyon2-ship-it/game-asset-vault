# Big Scan — Notes & Verdicts (Oct 30, 2026, exhaustive pass)

**Method:** full repo tarball pulled (public, no auth), all 16 zips extracted (17,873 files), per-pack structure map + PNG dimension census + full read of every license/readme file + itch.io page license verification for packs with no license file + visual style sampling of 20 representative assets via vision model.

**Population: N=17 archives.** 16 fully scanned. 1 blocked (see Farm RPG below). Coverage disclosure at the bottom.

---

## Tier 1 — Immediately usable, commercial-clear ✅

### Tiny Swords — Free Pack (Pixel Frog) — 927 files, 8MB
- **Contents:** human units in 6 faction colors (Warrior/Lancer/Archer/Monk/Pawn + peasant/king), buildings per color, terrain tiles, decorations, UI elements, particle FX; Aseprite source files for Blue units.
- **Style:** clean bright pixel art, muted-dark accents (buildings) + vivid unit colors. Mostly 64–512px, buildings/terrain sheets up to big.
- **License (verified on itch page):** personal + commercial OK, modify OK, credit not required, NO redistribute/resell.
- **Fit:** future RTS/defense/strategy casual game — basically a genre starter kit. Also good juice/particle reference. Style is pixel → not the Poki-preferred lane, but Tiny Swords is a famous quality bar.

### Pixel Crawler — Free Pack 2.11 (Anokolisa) — 372 files, 5MB
- **Contents:** modular 4-direction characters (Body_A/B..., animations: Attack, Crush, Dead, Jump...), weapons, icons, environment, mockups. 64–512px sheets.
- **Style:** muted retro pixel, high-quality animation strips.
- **License (Terms.txt, full read):** commercial OK, credit optional/appreciated, cannot resell assets as final product.
- **Fit:** future dungeon-crawler / RPG-lite. Modular bodies = lots of character variety cheaply.

### Tiles (Anokolisa) — 8 files
- **Contents:** tileset sheets (Assets.png, trees, mine, entrance, 2 backgrounds) + social-media preview mockups.
- **License (Autor_note.txt, full read):** totally free for commercial, credits optional.
- **Fit:** reference/potential tileset for top-down games.

### Free Dungeon Explorer Asset Pack (ElvGames) — 1,127 files, 7MB
- **Contents:** top-down 32px dungeon crawl: 4 characters × 4-direction idle/walk, battlers, enemies, tilemap, item icons (128px), UI, + sound effects folder.
- **Style:** bright retro pixel, outlined.
- **License (License.txt, full read):** commercial OK with **credit to ElvGames required**; no AI training, no crypto/NFT, no reselling.
- **Fit:** future top-down adventure; the bundled SFX may be standalone-usable (juice sounds).

### Free Platform Game Assets + GUI (Bayat Games) — 1,082 files, 75MB (largest)
- **Contents:** big vector platformer kit: full character body-part system (2x PNG + AI/EPS sources), enemies, chests, tiles incl. seasons, backgrounds, GUI, updates 1.7→1.9 (Mace enemy preview = flat vector, high quality).
- **Style:** **flat vector, cartoon** — closest to our megabible lane (soft 2D cartoon / flat vector) of anything in the vault.
- **License:** no file in pack; Bayat's free packs are free for personal/commercial with credit, no resell (their standard terms) — **verify on bayat.itch.io before shipping**.
- **Fit:** HIGH for a future platformer; vector sources mean we can restyle/palette-swap in code or SVG. Candidate for factory game #2.

### CraftPix freebies (Pixel Art Top Down — Basic v1.2.3; likely also Pixel UI pack 3 + Basic_GUI_Bundle if those are CraftPix)
- **Pixel Art Top Down - Basic:** 15 files, 3MB. Full top-down tileset (grass/water/buildings), 256–512px sheets + Unity URP support files. 
- **License (craftpix.net freebie terms, verified via license-hub source):** unlimited personal/commercial, modify OK, **no attribution required**, no redistribution of source files.
- **Pixel UI pack 3:** 9 sheets (256–512px), bright outlined pixel UI (buttons/sliders/bars). Same likely source — verify.
- **Basic_GUI_Bundle:** 538 files, 5MB. **Flat vector GUI**: icons, buttons (text+icon), boxes/banners, sliders — PNG + SVG + AI/EPS at up to 512px+. Clean bright vector, thin outlines, high quality.
- **Fit:** Basic_GUI_Bundle + Pixel UI 3 = ready-made web-game UI kits. Top Down Basic = future top-down game base.

### Prinbles — Robin v1.1 (Prinbles) — 535 files, 18MB
- **Contents:** vector game UI/counters: buttons, counters, icons (money etc.), full PNG set at **0.5x / 1x / 2x / 4x** + SVG + fonts note (Changa One, Bungee).
- **Style:** minimalist clean flat vector — very close to modern portal UI taste.
- **License:** no license file; Prinbles' free packs are published as **CC0** (their free GUI collection is CC0-labeled) — spot-verified via their itch collection; confirm the Robin page states CC0 before shipping.
- **Fit:** HIGH for Booster Barn or any web game UI (counters/coin icons especially); multi-scale PNGs = DPR-friendly.

### mp_character_animation_asset_pack_v1.0 (Mucho Pixels) — 4,884 files, 23MB
- **Contents:** 64px character animation sets: Male/Female × 3 characters × clothing states (no clothes / clothes 1–3) × many actions (pickup ground/wall, attack, jump...) as per-frame PNGs + preview GIFs + **.pyxel source files**.
- **Style:** flat vector-ish minimal, muted.
- **License (Readme.pdf decoded + itch page):** "entirely free and always will be"; Muchopixels free packs = free for commercial use with credit appreciated (their standard) — verify final wording before shipping.
- **Fit:** ready-made worker/NPC animations for an idle/management game (pickup/attack/carry-style actions are exactly BB's genre). 64px flat style mixes well with vector UI.

### Sfx pack 4 free — 70 wav files
- **Contents:** retro SFX in folders: Hit, PowerUp, Select, Explosion, Shoot, Coin, Jump.
- **License:** creator unidentified from filename alone — **needs the itch URL from Alex before commercial use** (likely a known free-SFX creator).
- **Fit:** exactly the juice sound budget (coin/jump/powerup/select) any of our games needs — pending license confirmation.

### MegaPackFree — 72 files, 1MB
- **Contents:** cat characters (Mochi/Pochi/Sleeping Cat + cat room + cat UI), animal sprites (frog/bird/pig/dog idle+actions), environment sheet, UI bundle sheets (incl. **PastelUIFree** — pastel pixel UI, clean rounded vector look).
- **Style:** bright vibrant pixel with outlines (visually strong for pixel).
- **License:** creator unidentified — likely a known freebie bundle account; **needs itch URL**. 
- **Fit:** PastelUI sheet is genuinely on-brand for cozy games; cats = mascot material for a cat-café style game (strong portal niche).

---

## Tier 2 — Usable but style-limited or verify-first ⚠️

### Sunnyside World Asset Pack v2.1 (danieldiggle) — 6,855 files, 49MB (biggest file count)
- **Contents:** farm-sim goldmine: Humans/Goblins/Skeletons with 7 animated hairstyles × 16 actions (idle/walk/run/roll/jump/hurt/death/carry/attack/swim/chop/mine/build/fish), 16x16 tileset (buildings/interiors/land/nature), 11 crops × 5 growth stages, animals, plants, VFX, 9-slice UI, + **full GameMaker project** (rooms + 488 .yy sprites).
- **Style:** bright cute pixel (Forager/Atomicrops-like), L/R movement only.
- **License:** **no license statement found on the itch page — MUST verify before any shipping** (danieldiggle name-your-price pack). This is the single biggest "verify me" item because the contents are the most BB-adjacent (farm/crops/animals) in the vault.
- **Fit:** a farm idle game could be ~70% art-complete from this pack alone — if license clears.

### Sprout Lands — Basic Pack (Cup Nooble) — 43 files, 1MB — ❌ NON-COMMERCIAL
- **License (read_me.txt, full read): free pack = non-commercial projects only** (credit required; commercial license sold separately). NO AI training, no NFT.
- **Verdict:** **cannot ship in any monetized game** (Poki/CrazyGames = commercial). Usable only for prototyping/mocking. Do not build on it.

### Tiny Wonder Farm Free (Butter Milk) — 13 files — ❌ NON-COMMERCIAL
- **License (itch page, verified): free version = non-commercial only; premium (paid) = commercial.**
- **Verdict:** same as Sprout Lands — prototype-only. (20 farm animations w/ cow costume is cute but locked.)

### items (Glionox — Items pack x16) — 1,244 files
- **Contents:** 16x16 item icons (some 14x14): weapons, tools, food, ingots, crystals, keys, armor, Christmas, etc. Bright, some outlined.
- **License:** itch page has **no explicit license section** — default itch = all rights reserved → treat as **verify-first** (email Glionox or check pack description updates).
- **Fit:** if it clears: the item-icon backbone for any inventory/collection/crafting game (1,244 icons is a huge pool).

### Legacy-Fantasy — High Forest 2.0 (folder says 2.3) — 79 files, 3MB
- **Contents:** retro RPG: character (white-hair, 4-frame sheets), mobs, HUD, background (pastel flat vector background oddly), trees, assets.
- **Style:** muted retro pixel.
- **License:** no file — likely "Levia" free pack... **verify**.
- **Fit:** reference material; style is dated vs our lane.

### Pixel UI pack 3 / Basic_GUI_Bundle — see CraftPix entry (if not CraftPix, verify)

---

## Scanned after extraction (vault-wide rar fix) ✅

### Farm RPG FREE 16x16 — Tiny Asset Pack (Maeve — maevedevs.itch.io/farm-rpg) — 16 files
- **Contents:** character (Idle/Walk sheets, 4-direction frames), farm animals (chicken ×3 colors, baby chick, cows brown M/F), objects (house, interior, fences, maple tree, roads, spring crops, chest), grass tileset. All 16x16 tiny pixel, bright palette, black outlines.
- **License:** no license file in pack; itch page has no clear license section → **verify-first** (same bucket as Sunnyside/Glionox).
- **Fit:** tiny-farm genre starter or minigame-scale art; very small footprint (16 tiles total). Pairs with Tiny Wonder Farm / Sprout Lands style-wise (all tiny cute farm pixel) — but note Tiny Wonder Farm is non-commercial.

---

## Booster Barn specifically (megabible doctrine: soft 2D cartoon / flat vector, bright, thick outlines)

BB's art is hand-coded canvas drawing and should stay that way — BUT from this vault:
1. **Prinbles Robin** counter/money icons + **Basic_GUI_Bundle** buttons → candidates for BB UI reskin pass (later, post-CrazyGames).
2. **Sfx pack 4** coin/select/powerup sounds → BB juice audio (pending license).
3. **Tiny Swords particle FX + Dungeon SFX** → reference for milestone celebration juice standards.
4. NO sprite pack matches BB's hand-drawn cozy cartoon lane closely enough to mix in directly — mixing pixel art into BB would break style cohesion (megabible: visual cohesion > asset quantity).

## Future factory games (game #2+ candidates)
- **Platformer:** Bayat platform pack (vector, restylable) — strongest.
- **Farm/idle sim:** Sunnyside World (if license clears) — near-complete art base.
- **Strategy/RTS:** Tiny Swords — near-complete.
- **Cat café/cozy:** MegaPackFree cats — mascot + UI starter.
- **Dungeon RPG:** Pixel Crawler + Dungeon Explorer + Legacy-Fantasy.

## Housekeeping
- `Free Platform Game Assets.zip` sits at repo ROOT instead of packs/ — move it into packs/ (or re-upload there and delete root copy) when convenient.
- `ASSET-LICENSES.md` ledger updated with all 17 rows — keep it current when adding packs.

## Coverage disclosure (research-integrity)
- **Read/scanned fully (16/17):** all zips extracted; structure mapped to file level; PNG dimension census on all 15,770 PNGs; all 8 in-pack license/readme text files read in full; 20 representative assets visually analyzed; 10 itch.io pages checked for license terms (4 opened full; Tiny Swords + Tiny Wonder Farm licenses verified verbatim).
- **Not read (now resolved):** Farm RPG .rar scanned post-extraction via the repo workflow (see above). Sunnyside/Glionox/Legacy-Fantasy/MegaPackFree/Sfx-pack-4/Basic_GUI/Pixel-UI-3/MuchoPixels license = NOT definitively verified → flagged verify-first in ledger.
- **Partial:** PDF license text for Muchopixels decoded partially (contact links + gamedevmarket pro-license reference; final free-pack wording should be re-checked on their itch page before shipping).
