// @ts-ignore
import "./style.css";
import { mainLoop } from "./loop";
import { canvasH, canvasW } from "./consts";
import { handleInput } from "./input";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let lastTime = performance.now();
let running: boolean = false;

const main = () => {
	const canvasEl = document.getElementById("canvas") as HTMLCanvasElement | null;
	if (!canvasEl) {
		console.error("Canvas element not found");
		return;
	}

	canvasEl.width = canvasW;
	canvasEl.height = canvasH;
	canvas = canvasEl;

	const context = canvas.getContext("2d");
	if (!context) {
		console.error("Failed to get 2D context");
		return;
	}
	ctx = context;
	running = true;
	handleInput();

	requestAnimationFrame(loop);
};

const loop = (time: number) => {
	const deltaTime = (time - lastTime) / 1000;
	lastTime = time;

	mainLoop(deltaTime, ctx, canvas, running);
	requestAnimationFrame(loop);
};

document.addEventListener("DOMContentLoaded", main);
