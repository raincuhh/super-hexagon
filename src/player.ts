const TILT_ACCEL = 0.9;
const FRICTION = 0.81;

const TIP_LENGTH = 9;
const BASE_WIDTH = 27;
const BASE_DEPTH = 8;

const BASE_SPEED = 8;
export class Player {
	x: number;
	y: number;
	radius: number;
	angle: number;
	angularSpeed: number;
	centerX: number;
	centerY: number;
	color: string;
	tilt: number;

	constructor(centerX: number, centerY: number, radius: number, color: string = "white") {
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.angle = 0;
		this.angularSpeed = BASE_SPEED;
		this.color = color;
		this.tilt = 0;

		this.x = this.centerX + this.radius * Math.cos(this.angle);
		this.y = this.centerY + this.radius * Math.sin(this.angle);
	}

	update(dt: number, input: { left: boolean; right: boolean }) {
		if (input.left) {
			this.angle -= this.angularSpeed * dt;
			this.tilt -= TILT_ACCEL;
		}
		if (input.right) {
			this.angle += this.angularSpeed * dt;
			this.tilt += TILT_ACCEL;
		}

		this.angle = (this.angle + Math.PI * 2) % (Math.PI * 2);

		if (!input.left && !input.right) {
			this.tilt *= FRICTION;
		}

		if (this.tilt > Math.PI / 12) this.tilt = Math.PI / 12;
		if (this.tilt < -Math.PI / 12) this.tilt = -Math.PI / 12;

		this.x = this.centerX + this.radius * Math.cos(this.angle);
		this.y = this.centerY + this.radius * Math.sin(this.angle);

		// console.log("Left:", input.left, "Right:", input.right, "Angle:", this.angle);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.x, this.y);

		ctx.rotate(this.tilt);

		ctx.rotate(this.angle + Math.PI / 2);

		ctx.fillStyle = this.color;
		ctx.beginPath();

		ctx.moveTo(0, -TIP_LENGTH);
		ctx.lineTo(BASE_WIDTH / 2, BASE_DEPTH);
		ctx.lineTo(-BASE_WIDTH / 2, BASE_DEPTH);

		ctx.closePath();
		ctx.fill();

		ctx.restore();
	}
}
