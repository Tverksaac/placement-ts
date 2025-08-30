interface ReplicatedStorage extends Instance {
	Assets: Folder & {
		BuildingAssets: Folder & {
			Furniture: Folder & {
				Chair: Model & {
					Seat: Seat;
					Union: UnionOperation;
				};
			};
		};
	};
}
