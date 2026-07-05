import type { TypeComponents } from "@/types/EngineComponents";
import type { GameObject } from "./GameObject";

export abstract class BaseComponent implements TypeComponents {
	id: string;
	name: string;
	entity: GameObject | undefined = undefined;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	init() {}
	update(_dt: number) {}
	render(_ctx: CanvasRenderingContext2D) {}
}
