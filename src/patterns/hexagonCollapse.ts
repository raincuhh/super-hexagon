// patterns/hexagonCollapsePattern.ts
import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class HexagonCollapsePattern implements IPattern {
	private timer = 0;
	private step = 0;
	private finished = false;
	private gapCount = 2; // consts

	update(dt: number): Wall[] {
		if (this.finished) return [];

		this.timer += dt;
		let walls: Wall[] = [];

		if (this.step === 0 && this.timer >= 0.2) {
			walls = this.createWave(PATTERN_SPAWN_RADIUS);
			this.step++;
			this.timer = 0;
		}
		if (this.step === 1 && this.timer >= 0.4) {
			walls = this.createWave(PATTERN_SPAWN_RADIUS - 20);
			this.step++;
			this.timer = 0;
		}
		if (this.step === 2 && this.timer >= 0.6) {
			walls = this.createWave(PATTERN_SPAWN_RADIUS - 40);
			this.step++;
			this.timer = 0;
		}
		if (this.step === 3 && this.timer >= 0.8) {
			walls = this.createWave(PATTERN_SPAWN_RADIUS - 60);
			this.step++;
			this.timer = 0;
		}

		if (this.step >= 4) this.finished = true;

		return walls;
	}

	private createWave(radius: number): Wall[] {
		let walls: Wall[] = [];
		let availableGaps = this.gapCount;

		for (let i = 0; i < 6; i++) {
			if (availableGaps > 0 && Math.random() > 0.5) {
				availableGaps--;
			} else {
				walls.push(new Wall(i, radius));
			}
		}

		return walls;
	}

	isFinished() {
		return this.finished;
	}
}
