import { Plot } from "server/module_scripts/placement_system/objects/plot";
import { Data } from "..";

const data_service = new Data();

export function SaveObjectToData(player: Player, plot: Plot, object: Model & { Area: Part }): Promise<boolean> {
	return data_service.LoadPlayerProfileGlobal(player).andThen(
		(profile) => {
			const data = profile.Data;
			const plot_data = data.Plots[plot.id];

			if (!plot_data) {
				warn(player.Name + " dont have plot with id: " + plot.id);
				return false;
			}

			const packed_cf = plot.plot.CFrame.ToObjectSpace(object.GetPivot()).GetComponents();

			const obj_data = {
				Name: object.Name,
				CFrame: packed_cf,
			};

			plot_data.Furniture.push(obj_data);

			return true;
		},
		(reason) => {
			throw error(reason);
		},
	);
}
