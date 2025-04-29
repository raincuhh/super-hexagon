export const drawGameOverScreen = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "white";
	ctx.font = "bold 48px sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);

	ctx.font = "24px sans-serif";
	ctx.fillText("Press Enter to Restart", canvas.width / 2, canvas.height / 2 + 30);
};
