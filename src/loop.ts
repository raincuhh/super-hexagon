import { canvasCenter, DIST_FROM_CIRCLE } from "./consts";
import { CenterHexagon } from "./hexagon";
import { input } from "./input";
import { drawMap } from "./map";
import { Player } from "./player";

let player = new Player(canvasCenter.x, canvasCenter.y, DIST_FROM_CIRCLE);
let centerHexagon = new CenterHexagon();

let rotateDirection = 0;
let rotateSpeed = 0;

const getRandomIntervalDuration = () => Math.floor(Math.random() * 4) + 1;
const getRandomRotationSpeed = () => 0.001 + Math.random() * (0.04 - 0.01);
const getRandomDir = () => (Math.random() < 0.5 ? 1 : -1);

const startHandleCanvas = () => {
	rotateDirection = getRandomDir();
	rotateSpeed = getRandomRotationSpeed();
	let intervalDuration = getRandomIntervalDuration();

	setInterval(() => {
		rotateDirection = getRandomDir();
		rotateSpeed = getRandomRotationSpeed();
		intervalDuration = getRandomIntervalDuration();

		// console.log({
		// 	duration: intervalDuration,
		// 	speed: rotateSpeed,
		// 	direction: rotateDirection,
		// });
	}, intervalDuration * 1000);
};

startHandleCanvas();

export const mainLoop = (deltaTime: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	if (isNaN(deltaTime) || deltaTime <= 0) return;

	player.update(deltaTime, input);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	render(ctx, canvas);
	cleanup(canvas);
};

const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	// rotate canvas
	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(rotateSpeed * rotateDirection);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);

	drawMap(ctx, canvas);
	// drawCenterHexagon(ctx, canvasCenter.x, canvasCenter.y, RADIUS);
	centerHexagon.draw(ctx, canvasCenter.x, canvasCenter.y);
	player.draw(ctx);

	// debug stuff
	handleDebug(ctx);

	// ctx.restore();
};

// @ts-ignore
const cleanup = (canvas: HTMLCanvasElement) => {};

const handleDebug = (ctx: CanvasRenderingContext2D) => {
	//draw player debug
	ctx.beginPath();
	ctx.arc(canvasCenter.x, canvasCenter.y, DIST_FROM_CIRCLE, 0, Math.PI * 2);
	ctx.strokeStyle = "rgb(155,155,155, 0.2)";
	ctx.stroke();
	ctx.closePath();
};
