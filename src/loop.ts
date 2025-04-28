import { canvasCenter, DIST_FROM_CIRCLE } from "./consts";
import { CenterHexagon } from "./hexagon";
import { input } from "./input";
import { Map } from "./map";
import { Player } from "./player";
import { WallGenerator } from "./wallGenerator";

let player = new Player(canvasCenter.x, canvasCenter.y, DIST_FROM_CIRCLE);
let centerHexagon = new CenterHexagon();
const map = new Map();
const wallGenerator = new WallGenerator();

let rotateDirection = 0;
let rotateSpeed = 0;

const getRandomIntervalDuration = () => Math.floor(Math.random() * 3) + 1;
const getRandomRotationSpeed = () => 0.001 + Math.random() * (0.02 - 0.01);
const getRandomDir = () => (Math.random() < 0.5 ? 1 : -1);

export const mainLoop = (
	dt: number,
	ctx: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	running: boolean
) => {
	if (isNaN(dt) || dt <= 0 || !running) return;

	update(canvas, dt);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	render(ctx, canvas);

	cleanup(canvas);
};

const update = (canvas: HTMLCanvasElement, dt: number) => {
	player.update(dt, input);
	wallGenerator.update(dt, canvas);
};

const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(rotateSpeed * rotateDirection);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);

	map.draw(ctx, canvas);
	centerHexagon.draw(ctx, canvasCenter.x, canvasCenter.y);
	player.draw(ctx);
	wallGenerator.draw(ctx, canvasCenter.x, canvasCenter.y);

	// debug
	handleDebug(ctx);
};

// @ts-ignore
const cleanup = (canvas: HTMLCanvasElement) => {};

// @ts-ignore
const handleDebug = (ctx: CanvasRenderingContext2D) => {
	//draw player debug
	ctx.beginPath();
	ctx.arc(canvasCenter.x, canvasCenter.y, DIST_FROM_CIRCLE, 0, Math.PI * 2);
	ctx.strokeStyle = "rgb(155,155,155, 0.2)";
	ctx.stroke();
	ctx.closePath();
};

const startHandleCanvas = () => {
	// @ts-ignore
	let rotateTimeout: number | undefined;
	rotateDirection = getRandomDir();
	rotateSpeed = getRandomRotationSpeed();

	const updateRotation = () => {
		rotateDirection = getRandomDir();
		rotateSpeed = getRandomRotationSpeed();
		const intervalDuration = getRandomIntervalDuration();

		rotateTimeout = setTimeout(updateRotation, intervalDuration * 1000);
	};

	updateRotation();
};

startHandleCanvas();
