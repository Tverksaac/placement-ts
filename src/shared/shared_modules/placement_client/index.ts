import { Players, ReplicatedStorage, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { placement_settings } from "./placement_settings";
import { placement_actions } from "./placement_actions";
import { placement_config } from "./placement_config";
import { Plot } from "./objects/plot";

type PlacementObject = Model & { Area: Part };

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

function find_object_by_name(object_name: string): PlacementObject | void {
	let i = 0;
	for (const instance of ReplicatedStorage.Assets.BuildingAssets.GetDescendants() as [PlacementObject]) {
		i++;
		if (instance.Name === object_name) {
			print("Object found after " + i + " iterations");
			return instance;
		}
	}
}

function get_mouse_position_snapped(): Vector3 | void {
	const ray_params = new RaycastParams();
	ray_params.FilterType = Enum.RaycastFilterType.Include;
	ray_params.FilterDescendantsInstances = settings.filter;

	const result = Workspace.Raycast(
		mouse.UnitRay.Origin,
		mouse.UnitRay.Direction.mul(settings.max_placement_distance),
		ray_params,
	);

	if (!result) {
		return;
	}

	return new Vector3(snap_value(result.Position.X), math.ceil(result.Position.Y), snap_value(result.Position.Z));
}

function check_overlaps(check_in: Part, exclude: Instance[]) {
	const params = new OverlapParams();
	params.FilterDescendantsInstances = exclude;
	params.FilterType = Enum.RaycastFilterType.Exclude;

	return Workspace.GetPartsInPart(check_in, params);
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
	private observing_object: PlacementObject | undefined;
	plot: Plot;

	constructor(Plot: Plot) {
		this.observing_object = undefined;
		this.plot = Plot;

		const new_filter: Instance[] = [];
		new_filter.push(this.plot.plot);
		settings.filter = new_filter as Part[];
	}

	AddObj(object_name: string) {
		let object = find_object_by_name(object_name);

		if (!object) {
			warn("Cant find this object: " + object_name);
			return;
		}

		object = object.Clone();
		object.Parent = this.plot.plot;

		this.observing_object = object;

		if (settings.observe_new_object) {
			this.EditObj();
		}
	}

	EditObj() {
		task.spawn(() => {
			while (this.observing_object) {
				task.wait(0.05);
				const mouse_pos = get_mouse_position_snapped();
				print(this.observing_object.Area, [this.observing_object, this.plot.plot]);
				const overlaps = check_overlaps(this.observing_object.Area, [
					this.observing_object,
					this.plot.plot,
					this.plot.player.Character || this.plot.player.CharacterAdded.Wait()[0],
				]);

				if (overlaps.isEmpty()) {
					glow_model(this.observing_object, new Color3(0.37, 1, 0.22));
				} else {
					glow_model(this.observing_object, new Color3(1, 0.29, 0.29));
				}

				if (mouse_pos) {
					this.observing_object.PivotTo(new CFrame(mouse_pos));
				} else {
					continue;
				}
			}
		});
	}
	Stop() {
		this.observing_object = undefined;
	}
}
