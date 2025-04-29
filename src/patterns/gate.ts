// patterns/gate.ts
import { Wall } from "../wall";
import { IPattern } from "../types";
import { PATTERN_SPAWN_RADIUS } from "../consts";

export class GatePattern implements IPattern {
	private finished = false;

	update(_dt: number): Wall[] {
		if (this.finished) return [];

		const gapSide = Math.floor(Math.random() * 6);
		const walls: Wall[] = [];

		for (let i = 0; i < 6; i++) {
			if (i === gapSide || i === (gapSide + 1) % 6) continue;
			walls.push(new Wall(i, PATTERN_SPAWN_RADIUS));
		}

		this.finished = true;
		return walls;
	}

	isFinished() {
		return this.finished;
	}
}
