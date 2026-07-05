import type { TypesOfMenus } from "./MenuSelectors";

export type TypeMenusData = {
	bottomMenu: {
		menuID: string;
		type: TypesOfMenus;
		size: number;
	}[];
	sideMenu: {
		menuID: string;
		type: TypesOfMenus;
		size: number;
	}[];
};

export type TypeCurrentTabs = {
	tabID: string;
	title: string;
	menusData?: TypeMenusData;
};

export interface TypeProjectMetadata {
	id?: string;
	name?: string;
	lastTab: string;
	updatedAt?: Date;
	currentTabs: TypeCurrentTabs[];
}

export interface TypeTabs {
	id: string;
}
