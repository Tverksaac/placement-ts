import { Networking } from "@flamework/networking";
import ProfileStore from "@rbxts/profile-store";
import { Template } from "./data/template";

interface ClientToServerEvents {
	Place(): void;
}

interface ServerToClientEvents {
	ProfileLoaded(player: Player): void;
}

interface ClientToServerFunctions {
	RequestData(player: Player): ProfileStore.Profile<Template>["Data"];
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
