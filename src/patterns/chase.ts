import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class ChasePattern implements IPattern {
	private timer = 0;
	private index = 0;
	private max = 3 + Math.floor(Math.random() * 2); // 3 til 4
	private direction = Math.random() > 0.5 ? 1 : -1;
	private finished = false;
	private startSide = Math.floor(Math.random() * 6);

	update(dt: number): Wall[] {
		if (this.finished) return [];

		this.timer += dt;
		if (this.timer >= 0.3) {
			const side = (this.startSide + this.index * this.direction + 6) % 6;
			this.index++;
			this.timer = 0;
			if (this.index >= this.max) this.finished = true;
			return [new Wall(side, PATTERN_SPAWN_RADIUS)];
		}

		return [];
	}

	isFinished() {
		return this.finished;
	}
}
