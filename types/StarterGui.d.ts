interface PlayerGui extends BasePlayerGui {
	Main: ScreenGui & {
		Frame: Frame & {
			TextButton: TextButton & {
				UICorner: UICorner;
				UIStroke: UIStroke;
			};
		};
	};
}
