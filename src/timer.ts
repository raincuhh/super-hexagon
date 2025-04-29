export class Timer {
	private timer: number;
	private lastTime: number;
	private timerEl: HTMLDivElement | null = document.getElementById("timer") as HTMLDivElement;

	constructor() {
		this.timer = 0;
		this.lastTime = Date.now();
	}

	update() {
		const currentTime = Date.now();
		const deltaTime = (currentTime - this.lastTime) / 1000;
		this.timer += deltaTime;
		this.lastTime = currentTime;
	}

	draw(_ctx: CanvasRenderingContext2D, _canvas: HTMLCanvasElement) {
		// ctx.fillStyle = "white";
		// ctx.font = "bold 48px sans-serif";
		// ctx.textAlign = "center";
		// ctx.fillText(this.timer.toFixed(2), canvas.width - 60, 50);

		if (this.timerEl) {
			this.timerEl.textContent = `Time: ${this.timer.toFixed(2)}`;
		}
	}

	reset() {
		this.timer = 0;
		this.lastTime = Date.now();
	}
}
