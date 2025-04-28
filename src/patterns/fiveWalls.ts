import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

let isPatternSpawning = false;

export class FiveWallsPattern implements IPattern {
	private timer = 0;
	private wavesLeft: number;
	private delayBetweenWaves: number;
	private finished = false;

	constructor(waves: number = 3, delay: number = 0.4) {
		this.wavesLeft = waves;
		this.delayBetweenWaves = delay;
	}

	update(dt: number, walls: Wall[]) {
		// console.log("Walls count before update:", walls.length);
		if (this.finished) return;

		this.timer += dt;

		if (this.timer >= this.delayBetweenWaves && !isPatternSpawning) {
			isPatternSpawning = true;
			this.timer = 0;
			const gapSide = Math.floor(Math.random() * 6);

			let wallsAdded = 0;
			for (let i = 0; i < 6; i++) {
				if (i !== gapSide) {
					walls.push(new Wall(i, PATTERN_SPAWN_RADIUS));
					wallsAdded++;
				}
			}
			// console.log("Walls added:", wallsAdded);
			this.wavesLeft--;
			if (this.wavesLeft <= 0) {
				this.finished = true;
			}

			isPatternSpawning = false;
		}
	}

	isFinished() {
		return this.finished;
	}
}
