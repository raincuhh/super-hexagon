import { canvasCenter, DIST_FROM_CIRCLE } from "./consts";
import { CenterHexagon } from "./hexagon";
import { input } from "./input";
import { Map } from "./map";
import { Player } from "./player";
import { drawGameOverScreen } from "./reset";
import { WallGenerator } from "./wallGenerator";
import { Timer } from "./timer";

let player: Player = new Player(canvasCenter.x, canvasCenter.y, DIST_FROM_CIRCLE);
const centerHexagon: CenterHexagon = new CenterHexagon();
const map: Map = new Map();
const wallGenerator: WallGenerator = new WallGenerator();
const timer: Timer = new Timer();

let hasLost: boolean = false;
let rotateDirection: number = 0;
let rotateSpeed: number = 0;
let time = 0;

const getRandomIntervalDuration = () => Math.floor(Math.random() * 3.5) + 1;
const getRandomRotationSpeed = () => 0.001 + Math.random() * (0.05 - 0.02);
const getRandomDir = () => (Math.random() < 0.5 ? 1 : -1);

export const mainLoop = (
	dt: number,
	ctx: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	running: boolean
) => {
	if (isNaN(dt) || dt <= 0 || !running || hasLost) return;

	time += dt;
	update(canvas, dt);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	render(ctx, canvas, time);

	if (hasLost) {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		drawGameOverScreen(ctx, canvas);
	}
};

const update = (canvas: HTMLCanvasElement, dt: number) => {
	player.update(dt, input);
	wallGenerator.update(dt, canvas);
	timer.update();
	checkWallCollisions();
};

const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => {
	const rotation = rotateSpeed * rotateDirection;

	// ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(rotation);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);

	map.draw(ctx, canvas, time);
	centerHexagon.draw(ctx, canvasCenter.x, canvasCenter.y);
	player.draw(ctx);
	wallGenerator.draw(ctx, canvasCenter.x, canvasCenter.y);

	// ctx.save();
	// ctx.setTransform(1, 0, 0, 1, 0, 0);
	timer.draw(ctx, canvas);
	// ctx.restore();

	// debug
	// handleDebug(ctx);
};

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

const checkWallCollisions = () => {
	const playerAngle = player.angle;
	const playerRadius = player.radius;

	const walls = wallGenerator.getWalls();
	const anglePerSide = (2 * Math.PI) / 6;

	for (const wall of walls) {
		if (wall.isDead) continue;

		const angle1 = wall.side * anglePerSide;
		const angle2 = (wall.side + 1) * anglePerSide;

		let normPlayerAngle = (playerAngle + Math.PI * 2) % (Math.PI * 2);

		const inAngularRange =
			angle1 < angle2
				? normPlayerAngle >= angle1 && normPlayerAngle <= angle2
				: normPlayerAngle >= angle1 || normPlayerAngle <= angle2;

		if (!inAngularRange) continue;

		if (playerRadius >= wall.radius - wall.thickness && playerRadius <= wall.radius) {
			hasLost = true;
			// console.log(hasLost);
			break;
		}
	}
};

window.addEventListener("keydown", (e) => {
	if (hasLost && e.key === "Enter") {
		restartGame();
	}
});

const restartGame = () => {
	hasLost = false;
	player = new Player(canvasCenter.x, canvasCenter.y, DIST_FROM_CIRCLE);
	wallGenerator.reset?.();
	timer.reset?.();

	rotateDirection = getRandomDir();
	rotateSpeed = getRandomRotationSpeed();
};
