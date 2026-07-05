import type { GameObject } from "@/core/GameObject";

export interface TypeComponents {
	id: string;
	name: string;
	entity: GameObject | undefined;
	init(): void;
	update(dt: number): void;
	render(ctx: CanvasRenderingContext2D): void;
}
