import { Plot } from "shared/shared_modules/placement_client/objects/plot";
import { Functions } from "./network";
import { Players } from "@rbxts/services";

Functions.CreatePlot.setCallback((player, params) => {
	return new Plot(player, params);
});
