import { Networking } from "@flamework/networking";
import { PlotParameters } from "./shared_modules/placement_client/objects/plot";
import { PlotType } from "./shared_modules/placement_client/objects/plot/plot_typeg";

interface ClientToServerEvents {}

interface ServerToClientEvents {}

interface ClientToServerFunctions {
	CreatePlot(Params: PlotParameters): PlotType;
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
