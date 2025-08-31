type plot_template = {
	[key: number]: {
		Furniture: {
			Name: string;
			CFrame: number[];
		}[];
	};
};
type invetory_template = string[];

export class Template {
	Plots: plot_template;
	Inventory: invetory_template;
	constructor() {
		this.Plots = [];
		this.Inventory = [];
		return this;
	}
}
