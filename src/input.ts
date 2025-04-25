export const input = {
	left: false,
	right: false,
};

export const handleInput = () => {
	window.addEventListener("keydown", (e) => {
		if (e.code == "ArrowLeft" || e.code == "KeyA") input.left = true;
		if (e.code == "ArrowRight" || e.code == "KeyD") input.right = true;
		// console.log("KEY DOWN:", e.code, input);
	});

	window.addEventListener("keyup", (e) => {
		if (e.code === "ArrowLeft" || e.code === "KeyA") input.left = false;
		if (e.code === "ArrowRight" || e.code === "KeyD") input.right = false;
		// console.log("KEY UP:", e.code, input);
	});
};
