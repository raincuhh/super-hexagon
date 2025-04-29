import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class ExtendedSpiralPattern implements IPattern {
	private timer = 0;
	private index = 0;
	private delayPerWall: number;
	private finished = false;

	constructor(delayPerWall: number = 0.25) {
		this.delayPerWall = delayPerWall;
	}

	update(dt: number): Wall[] {
		if (this.finished) return [];

		this.timer += dt;
		if (this.timer < this.delayPerWall) return [];

		this.timer = 0;
		const side = this.index % 6;
		const wall = new Wall(side, PATTERN_SPAWN_RADIUS);
		this.index++;
		if (this.index >= 12) this.finished = true;

		return [wall];
	}

	isFinished() {
		return this.finished;
	}
}
