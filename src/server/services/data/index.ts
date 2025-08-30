import { Service, OnStart, OnInit } from "@flamework/core";
import ProfileStore from "@rbxts/profile-store";
import { Template } from "./template";
import { Players } from "@rbxts/services";

type _Profiles = {
	[key: number]: ProfileStore.Profile<Template> | undefined;
};

const Profiles: _Profiles = {};

const data_key = "PlacementSystem v.0.1";
const profile_store = ProfileStore.New(data_key, new Template());

function PlayerAdded(player: Player) {
	const profile = profile_store.StartSessionAsync("player_" + player.UserId);

	if (profile) {
		profile.AddUserId(player.UserId);
		profile.Reconcile();

		profile.OnSessionEnd.Connect(() => {
			Profiles[player.UserId] = undefined;
			player.Kick("Session Ended");
		});

		if (player.IsDescendantOf(Players)) {
			Profiles[player.UserId] = profile;
		} else {
			profile.EndSession();
		}
	} else {
		player.Kick("Session Ended");
	}
}
function PlayerRemoved(player: Player) {
	const profile = Profiles[player.UserId];
	if (profile) {
		profile.EndSession();
	}
}

@Service({})
export class Data implements OnInit {
	onInit(): void | Promise<void> {
		for (const player of Players.GetPlayers()) {
			task.spawn(PlayerAdded, player);
		}

		Players.PlayerAdded.Connect(PlayerAdded);
		Players.PlayerRemoving.Connect(PlayerRemoved);
	}

	GetProfile(player: Player): Promise<ProfileStore.Profile<Template>> {
		return new Promise((resolve, reject) => {
			if (!player) {
				reject("player wasn's provided!");
			}
			const profile = Profiles[player.UserId];
			if (profile) {
				resolve(profile);
			} else {
				reject("can't get " + player.Name + "'s profile!");
			}
		});
	}

	GetData(player: Player): Promise<ProfileStore.Profile<Template>["Data"]> {
		return this.GetProfile(player).then(
			(profile) => {
				return profile.Data;
			},
			(reason) => {
				throw error(reason);
			},
		);
	}

	LoadPlayerProfileGlobal(player: Player): Promise<ProfileStore.Profile<Template>> {
		return new Promise((resolve, reject) => {
			const profile = profile_store.GetAsync("player_" + player.UserId);
			if (profile) {
				resolve(profile);
			} else {
				reject("no profile for " + player.Name);
			}
		});
	}
}
