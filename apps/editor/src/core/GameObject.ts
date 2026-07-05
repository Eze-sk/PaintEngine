import type { TypeComponents } from "@/types/EngineComponents";
import type { Scene } from "./Scene";

export class GameObject {
	id!: string;
	name!: string;
	scene!: Scene;
	components: Map<string, TypeComponents> = new Map();

	constructor(id: string, name: string, scene: Scene) {
		this.id = id;
		this.name = name;
		this.scene = scene;
	}

	addComponent(component: TypeComponents) {
		component.entity = this;
		this.components.set(component.name, component);
		component.init();

		this.scene.notifyUIChange();
	}

	getComponente<T extends TypeComponents>(name: string): T | undefined {
		return this.components.get(name) as T;
	}

	update(dt: number) {
		for (const component of this.components.values()) {
			component.update(dt);
		}
	}

	render(ctx: CanvasRenderingContext2D) {
		for (const component of this.components.values()) {
			component.render(ctx);
		}
	}
}
