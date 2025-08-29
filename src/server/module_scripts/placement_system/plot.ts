export interface PlotParameters {
	Size?: Vector2;
	Position?: Vector3;
	//OR
	Reference: Part;
}
function apply_texture(to: Part) {
	const texture = new Instance("Texture");

	texture.Parent = to;
	texture.Face = Enum.NormalId.Top;
	texture.Transparency = 0.5;
	texture.Texture = "rbxassetid://6372755229";
	texture.StudsPerTileU = 8;
	texture.StudsPerTileV = 8;
}

function create_from_reference(reference: Part) {
	apply_texture(reference);
}

function create_from_vector2(size: Vector2) {}

export class Plot {
	constructor(Parameteres: PlotParameters) {}
}
