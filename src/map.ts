const SIDES = 6;

export class Map {
	sides: number;
	angle: number;
	backgroundColor: string;
	shadedColor: string;

	constructor() {
		this.sides = SIDES;
		this.angle = (2 * Math.PI) / SIDES;
		this.backgroundColor = this.calculateBackgroundColor(0).base;
		this.shadedColor = this.calculateBackgroundColor(0).shade;
	}

	draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) {
		const { base, shade } = this.calculateBackgroundColor(time);
		this.backgroundColor = base;
		this.shadedColor = shade;

		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const radius = Math.max(canvas.width, canvas.height);
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		for (let i = 0; i < this.sides; i++) {
			const angle1 = i * this.angle;
			const angle2 = (i + 1) * this.angle;

			const x1 = centerX + radius * Math.cos(angle1);
			const y1 = centerY + radius * Math.sin(angle1);
			const x2 = centerX + radius * Math.cos(angle2);
			const y2 = centerY + radius * Math.sin(angle2);

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.closePath();

			ctx.fillStyle = i % 2 === 0 ? this.backgroundColor : this.shadedColor;
			ctx.fill();

			ctx.strokeStyle = "transparent";
			ctx.stroke();
		}
	}

	private calculateBackgroundColor(time: number): { base: string; shade: string } {
		const hue1 = (time * 10) % 360;
		const hue2 = (hue1 + 60) % 360;
		const blend = (Math.sin(time * 0.5) + 1) / 2;

		const hue = hue1 * (1 - blend) + hue2 * blend;
		const saturation = 70;
		const lightness = 45;

		const base = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		const shade = `hsl(${hue}, ${saturation}%, ${Math.max(0, lightness - 10)}%)`;

		return { base, shade };
	}
}
