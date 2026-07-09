export interface TypeTab {
	tabID: string
	title: string
	icon: string
}

export interface TypeProjectMetadata {
	id: string;
	name: string;
	slug: string;
	tabs: TypeTab[];
	createAt: Date;
	updatedAt: Date;
}
