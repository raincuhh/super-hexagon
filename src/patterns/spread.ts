import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class SpreadPattern implements IPattern {
	private finished = false;

	update(dt: number, walls: Wall[]) {
		if (this.finished) return;

		const mainSide = Math.floor(Math.random() * 6);

		walls.push(new Wall((mainSide + 5) % 6, PATTERN_SPAWN_RADIUS)); //left
		walls.push(new Wall(mainSide, PATTERN_SPAWN_RADIUS)); //  center
		walls.push(new Wall((mainSide + 1) % 6, PATTERN_SPAWN_RADIUS)); //right

		this.finished = true;
	}

	isFinished() {
		return this.finished;
	}
}
