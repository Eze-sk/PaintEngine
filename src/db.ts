import { Dexie, type EntityTable } from "dexie";
import type { TypeProjectMetadata } from "./types/Metadata";

const db = new Dexie("projectData") as Dexie & {
  projectMetadata: EntityTable<TypeProjectMetadata, "id">;
};

db.version(1).stores({
  projectMetadata: "id, data",
});

export type { TypeProjectMetadata };
export { db };
