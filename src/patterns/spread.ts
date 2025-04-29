import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class SpreadPattern implements IPattern {
	private finished = false;

	update(dt: number): Wall[] {
		if (this.finished) return [];

		const mainSide = Math.floor(Math.random() * 6);
		const walls = [
			new Wall((mainSide + 5) % 6, PATTERN_SPAWN_RADIUS),
			new Wall(mainSide, PATTERN_SPAWN_RADIUS),
			new Wall((mainSide + 1) % 6, PATTERN_SPAWN_RADIUS),
		];

		this.finished = true;
		return walls;
	}

	isFinished() {
		return this.finished;
	}
}
