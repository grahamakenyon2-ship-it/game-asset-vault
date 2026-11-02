// Ghost Company — Grid Indicator shader (Godot 4.x, canvas_item)
// Draws move-range / attack-range / ghost-path tiles: rounded square with
// soft inner fill, pulsing border, mode-tintable. Deterministic (TIME only).
// CC0 (see LICENSE).
shader_type canvas_item;

uniform vec4 mode_color : source_color = vec4(0.35, 0.85, 0.45, 1.0); // move=green, attack=red, ghost=violet
uniform float pulse_speed = 2.0;
uniform float fill_alpha = 0.22;
uniform float border_alpha = 0.95;
uniform float border_width = 0.06;   // fraction of tile
uniform float corner_round = 0.18;   // fraction of tile
uniform float danger : hint_range(0.0, 1.0) = 0.0; // 1 = attack tile (harder pulse)

void fragment() {
    vec2 p = UV - 0.5;
    float r = corner_round;
    vec2 q = abs(p) - (0.5 - r);
    float dist = length(max(q, 0.0)) - r;
    float inside = 1.0 - smoothstep(-0.004, 0.004, dist);

    float border = 1.0 - smoothstep(border_width - 0.015, border_width + 0.005, abs(dist));
    float pulse = 0.75 + 0.25 * sin(TIME * pulse_speed * mix(1.0, 2.2, danger));
    float balpha = border_alpha * pulse * mix(1.0, 1.0 + danger * 0.35 * sin(TIME * 9.0), 1.0);

    float a = inside * (fill_alpha * pulse + border * balpha);
    if (a <= 0.001) discard;
    vec3 col = mix(mode_color.rgb, vec3(1.0), border * 0.35); // brighten border
    COLOR = vec4(col, a * mode_color.a);
}
