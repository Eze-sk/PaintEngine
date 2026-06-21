import { db } from "@/db";
import type { TypeCurrentTabs } from "@/types/Metadata";
import { create } from "zustand";

export interface TypeMetadata {
  currentTabs: TypeCurrentTabs[];
  lastTabs: string;
  currentProject: string;

  setCurrentTabs: (tabs: TypeCurrentTabs[]) => void;
  setLastTabs: ({ tab }: { tab: string }) => void;
  setCurrentProject: ({ project }: { project: string }) => void;
}

export const useMetadata = create<TypeMetadata>((set) => ({
  currentTabs: [
    {
      tabID: "",
      title: "",
    },
  ],
  lastTabs: "",
  currentProject: "",

  setCurrentTabs: (tabs) =>
    set((state) => {
      db.projectMetadata.update(state.currentProject, {
        currentTabs: tabs,
      });

      return {
        currentTabs: tabs,
      };
    }),

  setLastTabs: ({ tab }) =>
    set((state) => {
      db.projectMetadata.update(state.currentProject, {
        lastTab: tab,
      });

      return {
        lastTabs: tab,
      };
    }),

  setCurrentProject: ({ project }) => {
    set({ currentProject: project });
  },
}));
