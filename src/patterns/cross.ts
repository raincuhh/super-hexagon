// patterns/crossPattern.ts
import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class CrossPattern implements IPattern {
	private timer = 0;
	private step = 0;
	private finished = false;

	update(dt: number): Wall[] {
		if (this.finished) return [];

		this.timer += dt;
		let walls: Wall[] = [];

		if (this.step === 0 && this.timer >= 0.2) {
			walls.push(new Wall(0, PATTERN_SPAWN_RADIUS));
			this.step++;
			this.timer = 0;
		}
		if (this.step === 1 && this.timer >= 0.2) {
			walls.push(new Wall(3, PATTERN_SPAWN_RADIUS));
			this.step++;
			this.timer = 0;
		}
		if (this.step === 2 && this.timer >= 0.2) {
			walls.push(new Wall(1, PATTERN_SPAWN_RADIUS));
			this.step++;
			this.timer = 0;
		}
		if (this.step === 3 && this.timer >= 0.2) {
			walls.push(new Wall(4, PATTERN_SPAWN_RADIUS));
			this.step++;
			this.timer = 0;
		}

		if (this.step >= 4) this.finished = true;

		return walls;
	}

	isFinished() {
		return this.finished;
	}
}
