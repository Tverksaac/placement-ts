import { Networking } from "@flamework/networking";
import ProfileStore from "@rbxts/profile-store";

interface ClientToServerEvents {
	Building: {
		Place(): void;
	};
}

interface ServerToClientEvents {
	Data: {
		ProfileLoaded(player: Player): void;
	};
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
