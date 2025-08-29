type Assets = Folder & {
	BuildingAssets: Folder & {
		Furniture: Folder & {
			Chair: Model & {
				Seat: Seat;
				Union: UnionOperation;
			};
		};
	};
}
