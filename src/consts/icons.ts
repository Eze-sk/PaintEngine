type TypeIconMap = Record<
	string,
	{
		src: string;
		totalWidth: number;
		totalHeight: number;
		icons: Record<
			string,
			{
				post: [number, number];
			}
		>;
	}
>;

const setPostX = (xPos: number): number => -48 * xPos;

export const ICON_MAP: TypeIconMap = {
	home: {
		src: "/assets/homeSpritesheet.webp",
		totalWidth: 240,
		totalHeight: 48,
		icons: {
			folderFiles: {
				post: [0, 0],
			},
			stackedDocuments: {
				post: [setPostX(1), 0],
			},
			gear: {
				post: [setPostX(2), 0],
			},
			controlPanel: {
				post: [setPostX(3), 0],
			},
			userGroup: {
				post: [setPostX(4), 0],
			},
		},
	},
	general: {
		src: "/assets/generalSpritesheet.webp",
		totalWidth: 48,
		totalHeight: 48,
		icons: {
			searchFolder: {
				post: [0, 0],
			},
		},
	},
	tab: {
		src: "/assets/tabSpritesheet.webp",
		totalWidth: 96,
		totalHeight: 48,
		icons: {
			audioEditor: {
				post: [0, 0],
			},
			codeEditor: {
				post: [setPostX(1), 0],
			},
		},
	},
} as const;
