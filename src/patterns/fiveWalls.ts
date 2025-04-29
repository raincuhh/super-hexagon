import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class FiveWallsPattern implements IPattern {
	private timer = 0;
	private wavesLeft: number;
	private delayBetweenWaves: number;
	private finished = false;
	// private gapSide: number = -1;

	constructor(waves: number = 3, delay: number = 0.4) {
		this.wavesLeft = waves;
		this.delayBetweenWaves = delay;
	}

	update(dt: number): Wall[] {
		if (this.finished) return [];

		this.timer += dt;
		if (this.timer < this.delayBetweenWaves) return [];

		this.timer = 0;
		this.wavesLeft--;
		if (this.wavesLeft <= 0) this.finished = true;

		// this.gapSide = Math.floor(Math.random() * 6);

		const walls: Wall[] = [];

		let wallCount = 0;
		for (let i = 0; i < 5; i++) {
			// if (i === this.gapSide) continue;
			walls.push(new Wall(i, PATTERN_SPAWN_RADIUS));
			wallCount++;
			if (wallCount >= 5) break;
		}

		console.log(`New walls this frame: ${walls.length}`, walls);

		// if (walls.length !== 5) console.error("Error: Unexpected number of walls spawned:", walls.length);

		return walls;
	}

	isFinished() {
		return this.finished;
	}
}
