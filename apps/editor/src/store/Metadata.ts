import { create } from "zustand";
import type { TypeTab } from "@/types/Metadata";

interface TypeMetadata {
	name: string
	tabs: TypeTab[]
	setName: (name: string) => void
	setTabs: (tabs: TypeTab[]) => void
}

export const useMetadataStore = create<TypeMetadata>((set) => ({
	name: "",
	tabs: [],
	setName: (name) => {
		set({name})
	},
	setTabs: (tabs) => {
		set({tabs})
	}
}));
