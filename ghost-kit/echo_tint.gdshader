// Ghost Company — Echo Tint spectral shader (Godot 4.x, canvas_item)
// Applies the "echo-tint" art direction: a dead unit replays as a cold-tinted
// spectral echo of its living sprite. No asset editing required — drop on any
// Sprite2D of a ghost copy. CC0 (see LICENSE).
shader_type canvas_item;

// Cold spectral tint toward these colors; 0.0 = original, 1.0 = full ghost.
uniform float echo_strength : hint_range(0.0, 1.0) = 1.0;
uniform vec4 tint_color : source_color = vec4(0.62, 0.72, 0.98, 1.0); // séance blue-white
uniform float dissolve_amount : hint_range(0.0, 1.0) = 0.0; // 0 solid → 1 gone (death anim w/o frames!)
uniform float float_amplitude = 1.5;  // px bob
uniform float float_speed = 1.2;
uniform float flicker_strength = 0.12;
uniform float edge_glow = 0.55; // rim additive glow

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

void vertex() {
    // gentle spectral hover-bob (keeps grid alignment: bob is visual only)
    VERTEX.y += sin(TIME * float_speed) * float_amplitude * echo_strength;
}

void fragment() {
    vec4 tex = texture(TEXTURE, UV);

    // Dissolve for death transitions without death animations:
    // thresholded noise eats the sprite from the edges inward.
    float n = noise(UV * 24.0 + vec2(TIME * 0.15, 0.0));
    float d = clamp((n - dissolve_amount * 1.15 + 0.05) * 6.0, 0.0, 1.0);
    if (d <= 0.0) discard;

    // Echo tint: pull toward tint_color in a slightly desaturating way
    vec3 ghost = mix(tex.rgb, tint_color.rgb * tex.rgb * 1.6, echo_strength * 0.85);
    ghost = mix(ghost, tint_color.rgb * 0.9, echo_strength * 0.25);

    // Rim glow: brighten pixels near the alpha edge for a spirit halo
    float a4 = texture(TEXTURE, UV + TEXTURE_PIXEL_SIZE * vec2( 2.0, 0.0)).a
             + texture(TEXTURE, UV + TEXTURE_PIXEL_SIZE * vec2(-2.0, 0.0)).a
             + texture(TEXTURE, UV + TEXTURE_PIXEL_SIZE * vec2(0.0,  2.0)).a
             + texture(TEXTURE, UV + TEXTURE_PIXEL_SIZE * vec2(0.0, -2.0)).a;
    float rim = (1.0 - clamp(a4 / 4.0, 0.0, 1.0)) * tex.a;
    ghost += tint_color.rgb * rim * edge_glow * echo_strength;

    // Spectral flicker (subtle, deterministic-safe: TIME-based, no RNG)
    float flick = 1.0 - flicker_strength * echo_strength * (0.5 + 0.5 * sin(TIME * 7.0 + UV.y * 40.0));

    COLOR = vec4(ghost * flick, tex.a * d * mix(1.0, 0.82, echo_strength));
}
