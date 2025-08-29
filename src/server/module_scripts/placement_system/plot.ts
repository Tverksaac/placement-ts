export interface PlotParameters {
	Size?: Vector2;
	Position?: Vector3;
	//OR
	Reference?: Part;
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

	return reference;
}

function create_from_vector2(size: Vector2, pos: Vector3) {
	const plot = new Instance("Part");

	plot.Size = new Vector3(size.X, 1, size.Y);
	plot.Position = pos;

	return plot;
}

export class Plot {
	constructor(Parameters: PlotParameters) {
		let plot = undefined;
		if (Parameters.Reference) {
			plot = create_from_reference(Parameters.Reference);
		} else if (Parameters.Position && Parameters.Size) {
			plot = create_from_vector2(Parameters.Size, Parameters.Position);
		} else {
			throw error("Plot Parameteres was wrongly defined!", 1);
		}
		return plot;
	}
}
