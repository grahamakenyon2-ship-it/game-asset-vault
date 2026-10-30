# Game Asset Vault 🎮

Free-to-use game assets (sprites, animations, UI, effects, models, audio) collected from itch.io & elsewhere for the Casual Game Factory and Booster Barn.

## How to add assets

1. **Drop entire pack folders into `packs/` — do NOT unpack/rename.** Keeping each pack's folder intact preserves its license.txt/readme. One subfolder per pack: `packs/pixel-planets/`, `packs/kenney-ui-pack/`, etc.
2. **Add a row to `ASSET-LICENSES.md`** for each pack: name, source URL, license (CC0 / CC-BY / etc.), attribution required?
3. Commit + push (GitHub Desktop: drag into your local clone, commit, push).

## Layout

- `packs/` — raw downloaded packs, untouched (source of truth for licenses)
- `library/` — the organized, scanned, shortlist output (populated after the Big Scan)
  - `sprites/`, `ui/`, `animations/`, `effects/`, `models/`, `audio/`, `fonts/`
- `ASSET-LICENSES.md` — license ledger (one row per pack)
- `SCAN-NOTES.md` — results of the Big Scan: what's usable for BB, what fits future games, what's rejected and why

## Rules

- Only assets we are actually allowed to use commercially (CC0, CC-BY, OFL, MIT, or explicit free-commercial-use grants). If a pack's license is unclear, flag it in the ledger — do not assume.
- Files over 100MB need Git LFS — ask before committing them.
- No paid-store rips, no AI-scrape packs, no "inspired by" Nintendo/SEGA content.
