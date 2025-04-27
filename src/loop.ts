import { canvasCenter, DIST_FROM_CIRCLE } from "./consts";
import { CenterHexagon } from "./hexagon";
import { input } from "./input";
import { drawMap } from "./map";
import { Player } from "./player";
import { Wall } from "./wall";

let walls: Wall[] = [];
let player = new Player(canvasCenter.x, canvasCenter.y, DIST_FROM_CIRCLE);
let centerHexagon = new CenterHexagon();

let rotateDirection = 0;
let rotateSpeed = 0;
let wallSpawnTimer = 0;

const getRandomIntervalDuration = () => Math.floor(Math.random() * 4) + 1;
const getRandomRotationSpeed = () => 0.001 + Math.random() * (0.01 - 0.001);
const getRandomDir = () => (Math.random() < 0.5 ? 1 : -1);

export const mainLoop = (deltaTime: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	if (isNaN(deltaTime) || deltaTime <= 0) return;

	wallSpawnTimer += deltaTime;
	if (wallSpawnTimer > 0.5) {
		const randomSide = Math.floor(Math.random() * 6);
		walls.push(new Wall(randomSide, Math.min(canvas.width, canvas.height) / 2 + 100)); // spawn just outside view
		wallSpawnTimer = 0;
		console.log(walls);
	}

	player.update(deltaTime, input);
	walls.forEach((wall) => wall.update(deltaTime));
	walls = walls.filter((w) => !w.isDead);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	render(ctx, canvas);

	walls.forEach((wall) => wall.draw(ctx, canvasCenter.x, canvasCenter.y));

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
