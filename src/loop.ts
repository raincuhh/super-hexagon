import { canvasCenter } from "./consts";
import { drawHexagon, RADIUS } from "./hexagon";
import { drawSegmentedHexagon } from "./map";

export const mainLoop = (deltaTime: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	if (isNaN(deltaTime) || deltaTime <= 0) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	render(ctx, canvas);
	cleanup(canvas);
};

const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	drawSegmentedHexagon(ctx, canvas);
	drawHexagon(ctx, canvasCenter.x, canvasCenter.y, RADIUS);
};

const cleanup = (canvas: HTMLCanvasElement) => {};
