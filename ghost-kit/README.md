# Ghost Kit — Ghost Company custom assets (the gap-fillers no pack provides)

Created Nov 2, 2026 for Ghost Company (turn-based séance tactics, Godot 4.7).
Released under **CC0** by Alex Kenyon — use, modify, ship, no credit needed.

## What's here (and why)
1. **`echo_tint.gdshader`** — the signature echo-tint look, as a runtime shader:
   cold spectral tint + rim glow + hover-bob + flicker, plus a **dissolve_amount**
   uniform that gives you a death animation *without any death frames* (Tiny
   Swords units die beautifully with this). Apply to a duplicate Sprite2D of the
   unit. Deterministic: TIME-driven only, no RNG.
2. **`grid_indicator.gdshader`** — move/attack/ghost-path tile overlays: rounded
   pulsing squares, mode-tinted, no textures needed.
3. **`grid_indicators.gd`** — drop-in `GridIndicators` node (class_name) with a
   pooled-tile API: `show_tiles(cells, MODE_MOVE / MODE_ATTACK / MODE_GHOST)`.

## Hookup (click-by-click, Godot 4.7)
1. Copy the `ghost-kit/` folder into `res://ghost-kit/` in the ghost-company project.
2. Battle scene: select the `Grid` node → right-click → **Add Child Node** →
   search `GridIndicators` → Add. In the Inspector set **Tile Size** to your
   grid's cell size (Dungeon Explorer lane: 24–32).
3. Ghosts: on any ghost ally's Sprite2D, set **Material → New ShaderMaterial**,
   shader = `echo_tint.gdshader`. Tweak `echo_strength` (0.85–1.0) and
   `tint_color` per squad.
4. Deaths: animate `dissolve_amount` 0→1 over ~0.6s (or call
   `create_tween().tween_property(mat, "shader_parameter/dissolve_amount", 1.0, 0.6)`).
5. Indicators from your sim: after computing reachable cells, call
   `grid_indicators.show_tiles(cells, GridIndicators.MODE_MOVE)` etc.

## Pairing with the vault
- Units: Dungeon Explorer (primary) or Tiny Swords (premium) — see
  ASSET-APPLICATION-MAP.md § Ghost Company.
- Séance VFX base: DevWizard Pixel Art Spells (CC0, includes B&W assets meant
  for engine tinting — tint them the same `tint_color` for cohesion),
  Ansimuz Gothicvania Magic Pack 9 (CC0), CodeManu Free VFX Pack (CC0),
  Viktor Hahn spell animations (CC-BY, includes a ready Godot project).
- Music: Kevin MacLeod CC-BY (Ossuary series = séance-perfect) + Juhani CC0 chiptunes.
