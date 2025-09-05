import { Players } from "@rbxts/services";
import { Functions } from "./network";
import { Editor } from "shared/shared_modules/placement_client";
import { Plot } from "shared/shared_modules/placement_client/objects/plot";

const player = Players.LocalPlayer;
const player_gui = player.WaitForChild("PlayerGui") as PlayerGui;
