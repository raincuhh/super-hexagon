// patterns/wavePattern.ts
import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class WavePattern implements IPattern {
	private timer = 0;
	private waveCount = 0;
	private finished = false;
	private delayPerWall = 0.6;
	private gapCount = 2;

	update(dt: number): Wall[] {
		if (this.finished) return [];

		this.timer += dt;
		let walls: Wall[] = [];

		if (this.timer >= this.delayPerWall) {
			this.timer = 0;

			walls = this.createWave(PATTERN_SPAWN_RADIUS + this.waveCount * 20);

			this.waveCount++;

			if (this.waveCount >= 4) this.finished = true;
		}

		return walls;
	}

	private createWave(radius: number): Wall[] {
		let walls: Wall[] = [];
		let availableGaps = this.gapCount;

		for (let i = 0; i < 5; i++) {
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
