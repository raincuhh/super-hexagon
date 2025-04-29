import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class OppositePattern implements IPattern {
	private finished = false;

	update(dt: number): Wall[] {
		if (this.finished) return [];

		const side = Math.floor(Math.random() * 6);
		const walls = [new Wall(side, PATTERN_SPAWN_RADIUS), new Wall((side + 3) % 6, PATTERN_SPAWN_RADIUS)];

		this.finished = true;
		return walls;
	}

	isFinished() {
		return this.finished;
	}
}
