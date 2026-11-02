# Ghost Company — GridIndicators node (Godot 4.x)
# Usage: add as a child of your battle grid. Each frame (or on command):
#   grid_indicators.show_tiles(cells, GridIndicators.MODE_MOVE)
#   grid_indicators.show_tiles(cells, GridIndicators.MODE_ATTACK)
#   grid_indicators.show_tiles(cells, GridIndicators.MODE_GHOST)  # echo path
#   grid_indicators.clear()
# Tiles are pooled ColorRects with grid_indicator.gdshader — no textures needed.
# CC0 (see LICENSE). Battle grid reference: scenes/battle/battle.tscn (Battle→Grid→Units).
class_name GridIndicators
extends Node2D

enum Mode { MOVE, ATTACK, GHOST }

const MODE_COLORS := {
	Mode.MOVE: Color(0.35, 0.85, 0.45, 1.0),
	Mode.ATTACK: Color(0.95, 0.30, 0.30, 1.0),
	Mode.GHOST: Color(0.65, 0.55, 0.95, 1.0),
}

@export var tile_size: float = 32.0
@export var y_offset: float = -2.0  # sit just above the ground layer

var _pool: Array[ColorRect] = []
var _shader: Shader

func _ready() -> void:
	_shader = load("res://ghost-kit/grid_indicator.gdshader")

func _make_rect() -> ColorRect:
	var r := ColorRect.new()
	r.size = Vector2(tile_size, tile_size)
	r.mouse_filter = Control.MOUSE_FILTER_IGNORE
	var mat := ShaderMaterial.new()
	mat.shader = _shader
	r.material = mat
	add_child(r)
	return r

func show_tiles(cells: Array, mode: Mode) -> void:
	var color: Color = MODE_COLORS[mode]
	var i := 0
	for cell in cells:
		var r: ColorRect
		if i < _pool.size():
			r = _pool[i]
		else:
			r = _make_rect()
			_pool.push_back(r)
		r.position = Vector2(cell.x * tile_size, cell.y * tile_size + y_offset)
		r.visible = true
		var mat: ShaderMaterial = r.material
		mat.set_shader_parameter("mode_color", color)
		mat.set_shader_parameter("danger", 1.0 if mode == Mode.ATTACK else 0.0)
		i += 1
	for j in range(i, _pool.size()):
		_pool[j].visible = false

func clear() -> void:
	for r in _pool:
		r.visible = false
