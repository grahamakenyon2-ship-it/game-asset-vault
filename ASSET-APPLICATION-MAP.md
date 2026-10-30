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
