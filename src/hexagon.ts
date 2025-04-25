const SIDES = 6;
export const RADIUS = 50;
const ANGLE = (2 * Math.PI) / SIDES;

export class CenterHexagon {
	sides: number;
	angle: number;
	radius: number;
	color: string;

	constructor(color: string = "#fff") {
		this.sides = SIDES;
		this.angle = (2 * Math.PI) / SIDES;
		this.radius = RADIUS;
		this.color = color;
	}

	draw(ctx: CanvasRenderingContext2D, x: number, y: number, r: number = this.radius) {
		ctx.beginPath();

		for (let i = 0; i <= SIDES; i++) {
			const angle = i * ANGLE;
			const px = x + r * Math.cos(angle);
			const py = y + r * Math.sin(angle);
			ctx.fillStyle = "white";
			if (i === 0) ctx.moveTo(px, py);
			else ctx.lineTo(px, py);
		}

		ctx.fillStyle = "#fff";
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	}
}

// export const drawCenterHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
// 	ctx.beginPath();

// 	for (let i = 0; i <= SIDES; i++) {
// 		const angle = i * ANGLE;
// 		const px = x + r * Math.cos(angle);
// 		const py = y + r * Math.sin(angle);
// 		ctx.fillStyle = "white";
// 		if (i === 0) ctx.moveTo(px, py);
// 		else ctx.lineTo(px, py);
// 	}

// 	ctx.fillStyle = "#fff";
// 	ctx.fill();
// 	ctx.closePath();
// 	// ctx.strokeStyle = "#000";
// 	ctx.stroke();
// };
