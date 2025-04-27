const WALL_SPEED = 200;

export class Wall {
	side: number;
	radius: number;
	thickness: number;
	speed: number;
	color: string;
	isDead = false;

	constructor(side: number, startRadius: number, thickness: number = 40, color: string = "white") {
		this.side = side;
		this.radius = startRadius;
		this.thickness = thickness;
		this.speed = WALL_SPEED;
		this.color = color;
	}

	update(dt: number) {
		this.radius -= this.speed * dt;
		if (this.radius <= 0) {
			this.isDead = true;
		}
	}

	draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
		const anglePerSide = (2 * Math.PI) / 6;
		const angle1 = this.side * anglePerSide;
		const angle2 = (this.side + 1) * anglePerSide;

		ctx.beginPath();
		ctx.moveTo(centerX + this.radius * Math.cos(angle1), centerY + this.radius * Math.sin(angle1));
		ctx.lineTo(centerX + this.radius * Math.cos(angle2), centerY + this.radius * Math.sin(angle2));
		ctx.lineTo(
			centerX + (this.radius - this.thickness) * Math.cos(angle2),
			centerY + (this.radius - this.thickness) * Math.sin(angle2)
		);
		ctx.lineTo(
			centerX + (this.radius - this.thickness) * Math.cos(angle1),
			centerY + (this.radius - this.thickness) * Math.sin(angle1)
		);
		ctx.closePath();

		ctx.fillStyle = this.color;
		ctx.fill();
	}
}
