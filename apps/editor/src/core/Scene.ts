import { GameObject } from "./GameObject";

export class Scene {
	entities: GameObject[] = [];
	ctx!: CanvasRenderingContext2D;
	onUIUpdate?: () => void;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	createEntity(id: string, name: string): GameObject {
		const newEntity = new GameObject(id, name, this);
		this.entities.push(newEntity);
		this.notifyUIChange();
		return newEntity;
	}

	notifyUIChange() {
		if (this.onUIUpdate) this.onUIUpdate();
	}

	update(dt: number) {
		for (const entity of this.entities) {
			entity.update(dt);
		}
	}

	render() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		for (const entity of this.entities) {
			entity.render(ctx);
		}
	}
}
