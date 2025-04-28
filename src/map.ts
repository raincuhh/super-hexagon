const SIDES = 6;
const ANGLE = (2 * Math.PI) / SIDES;

export function drawMap(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
	const RADIUS = Math.min(canvas.width, canvas.height) / 1;
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;

	for (let i = 0; i < SIDES; i++) {
		const angle1 = i * ANGLE;
		const angle2 = (i + 1) * ANGLE;

		const x1 = centerX + RADIUS * Math.cos(angle1);
		const y1 = centerY + RADIUS * Math.sin(angle1);
		const x2 = centerX + RADIUS * Math.cos(angle2);
		const y2 = centerY + RADIUS * Math.sin(angle2);

		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.closePath();

		ctx.fillStyle = i % 2 === 0 ? "rgb(139,22,22)" : "rgb(96,16,16)";
		ctx.fill();

		ctx.strokeStyle = "transparent";
		ctx.stroke();
	}
}

export class Map {
	sides: number;
	angle: number;

	constructor() {
		this.sides = SIDES;
		this.angle = (2 * Math.PI) / SIDES;
	}

	draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		const radius = Math.min(canvas.width, canvas.height) / 1;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		for (let i = 0; i < SIDES; i++) {
			const angle1 = i * ANGLE;
			const angle2 = (i + 1) * ANGLE;

			const x1 = centerX + radius * Math.cos(angle1);
			const y1 = centerY + radius * Math.sin(angle1);
			const x2 = centerX + radius * Math.cos(angle2);
			const y2 = centerY + radius * Math.sin(angle2);

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.closePath();

			ctx.fillStyle = i % 2 === 0 ? "rgb(139,22,22)" : "rgb(96,16,16)";
			ctx.fill();

			ctx.strokeStyle = "transparent";
			ctx.stroke();
		}
	}
}
