import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class OppositePattern implements IPattern {
	private finished = false;

	update(dt: number, walls: Wall[]) {
		if (this.finished) return;

		const side = Math.floor(Math.random() * 6);

		walls.push(new Wall(side, PATTERN_SPAWN_RADIUS));
		walls.push(new Wall((side + 3) % 6, PATTERN_SPAWN_RADIUS)); // opposite side

		this.finished = true;
	}

	isFinished() {
		return this.finished;
	}
}
