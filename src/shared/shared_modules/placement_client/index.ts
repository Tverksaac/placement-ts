import { Players, ReplicatedStorage, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { placement_settings } from "./placement_settings";
import { placement_actions } from "./placement_actions";
import { placement_config } from "./placement_config";

const ACTIONS = placement_actions;
const settings = placement_settings;
const config = placement_config;
const mouse = Players.LocalPlayer.GetMouse();

function snap_value(pos: number): number {
	const snap = settings.snap_by;
	if (pos % snap <= snap / 2) {
		pos = pos - (pos % snap);
	} else {
		pos = pos - (pos % snap) + snap;
	}

	return pos;
}

function find_object_by_name(object_name: string): Instance | void {
	for (const instance of ReplicatedStorage.Assets.BuildingAssets.GetDescendants()) {
		if (instance.Name === object_name) {
			return instance;
		}
	}
}

function get_mouse_position_snapped(): Vector3 | void {
	const ray_params = new RaycastParams();
	ray_params.FilterType = Enum.RaycastFilterType.Include;
	ray_params.FilterDescendantsInstances = settings.filter;

	const result = Workspace.Raycast(mouse.UnitRay.Origin, mouse.UnitRay.Direction.mul(100), ray_params);

	if (!result) {
		return;
	}

	return new Vector3(snap_value(result.Position.X), math.ceil(result.Position.Y), snap_value(result.Position.Z));
}

function iterate_through_model(iter_object: Model, callback: Callback) {
	for (const descendant of iter_object.GetDescendants()) {
		if (config.allowed_parts.includes(descendant.ClassName)) {
			callback(descendant);
		}
	}
}

function glow_model(object: Model, color: Color3) {
	iterate_through_model(object, (des: Part) => {
		des.Transparency = 0.5;
		des.Color = color;
	});
}

export class Editor {
	constructor() {}
}
