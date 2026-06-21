import type { TypeProjectMetadata } from "@/db";
import type { TypeMenusData } from "@/types/Metadata";

export const DEFAULT_CANVAS_SIZE = {
  W: 800,
  H: 400,
};

export const DEFAULT_MENUS = {
  SCENE: {
    bottomMenu: [
      { menuID: "menu-1", type: "hierarchy", size: 50 },
      { menuID: "menu-2", type: "hierarchy", size: 50 },
    ],
    sideMenu: [
      { menuID: "menu-3", type: "hierarchy", size: 50 },
      { menuID: "menu-4", type: "hierarchy", size: 50 },
    ],
  },
} satisfies Record<string, TypeMenusData>;

export const STARTUP_DATA: TypeProjectMetadata = {
  lastTab: "scene_0",
  currentTabs: [
    {
      tabID: "scene_0",
      title: "main scene",
      menusData: {
        ...DEFAULT_MENUS.SCENE,
      },
    },
  ],
};
