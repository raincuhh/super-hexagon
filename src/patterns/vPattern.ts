import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class VPattern implements IPattern {
	private timer = 0;
	private step = 0;
	private baseSide = Math.floor(Math.random() * 6);
	private finished = false;

	update(dt: number): Wall[] {
		if (this.finished) return [];

		this.timer += dt;
		if (this.step === 0 && this.timer >= 0) {
			this.step++;
			this.timer = 0;
			return [new Wall(this.baseSide, PATTERN_SPAWN_RADIUS)];
		}
		if (this.step === 1 && this.timer >= 0.25) {
			this.finished = true;
			return [
				new Wall((this.baseSide + 5) % 6, PATTERN_SPAWN_RADIUS),
				new Wall((this.baseSide + 1) % 6, PATTERN_SPAWN_RADIUS),
			];
		}
		return [];
	}

	isFinished() {
		return this.finished;
	}
}
