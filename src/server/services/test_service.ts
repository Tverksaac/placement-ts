import { Service, OnStart } from "@flamework/core";
import { Data } from "./data";
import { Players } from "@rbxts/services";

@Service({})
export class TestService implements OnStart {
	constructor(private readonly data: Data) {}
	onStart() {
		this.data.GetProfile(Players.GetPlayers()[0]).then(
			(profile) => {
				print(profile);
			},
			(reason) => {
				print(reason);
			},
		);
	}
}
