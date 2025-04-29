import { ChasePattern } from "./patterns/chase";
// import { FiveWallsPattern } from "./patterns/fiveWalls"; // buggy fuck
import { GatePattern } from "./patterns/gate";
import { OppositePattern } from "./patterns/opposite";
import { SpiralPattern } from "./patterns/spiral";
import { SpreadPattern } from "./patterns/spread";
import { VPattern } from "./patterns/vPattern";
import { IPattern } from "./types";
import { SingleGapPattern } from "./patterns/singleGap";
import { Wall } from "./wall";
import { CrossPattern } from "./patterns/cross";
import { WavePattern } from "./patterns/wave";
import { HexagonCollapsePattern } from "./patterns/hexagonCollapse";

const defaultPatternCooldown = 2;

export class WallGenerator {
	private walls: Wall[] = [];
	private patterns: IPattern[] = [];
	private spawnTimer: number = 0;
	private patternCooldownTimer: number = 0;

	// @ts-ignore
	update(dt: number, canvas: HTMLCanvasElement) {
		this.spawnTimer += dt;
		this.patternCooldownTimer += dt;

		this.walls.forEach((w) => w.update(dt));
		this.walls = this.walls.filter((w) => {
			// if (w.isDead) console.log("Wall removed: ", w);
			return !w.isDead;
		});

		const spawned: Wall[] = [];
		for (const pattern of this.patterns) {
			const newWalls = pattern.update(dt);
			if (newWalls.length) spawned.push(...newWalls);
		}

		this.patterns = this.patterns.filter((pattern) => !pattern.isFinished());

		if (spawned.length) {
			this.walls = this.walls.concat(spawned);
			// console.log("New walls this frame:", spawned.length, spawned);
			// console.log("Total walls now:", this.walls.length);
		}

		if (this.patterns.length === 0 && this.patternCooldownTimer > defaultPatternCooldown) {
			if (this.spawnTimer > 1.5) {
				// this.walls = [];
				this.spawnRandomPattern();
				this.spawnTimer = 0;
				this.patternCooldownTimer = 0;
			}
		}
	}

	getWalls() {
		return this.walls;
	}

	reset() {
		this.walls = [];
		this.patterns = [];
		this.spawnTimer = 0;
		this.patternCooldownTimer = 0;
	}

	draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
		this.walls.forEach((wall) => wall.draw(ctx, x, y));
	}

	private spawnRandomPattern() {
		let num = Math.floor(Math.random() * 9);
		switch (num) {
			case 0:
				console.log("new opposite pattern");
				this.patterns.push(new OppositePattern());
				break;
			case 1:
				console.log("new spread pattern");
				this.patterns.push(new SpreadPattern());
				break;
			case 2:
				console.log("new spiral pattern");
				this.patterns.push(new SpiralPattern(0.2));
				break;
			case 3:
				console.log("new single gap pattern");
				this.patterns.push(new SingleGapPattern());
				break;
			case 3:
				console.log("new V pattern");
				this.patterns.push(new VPattern());
				break;
			case 4:
				console.log("new gate pattern");
				this.patterns.push(new GatePattern());
				break;
			case 5:
				console.log("new chase pattern");
				this.patterns.push(new ChasePattern());
				break;

			case 6:
				console.log("new cross pattern");
				this.patterns.push(new CrossPattern());
				break;
			case 7:
				console.log("new wave pattern");
				this.patterns.push(new WavePattern());
				break;
			case 8:
				console.log("new hexagon collapse pattern");
				this.patterns.push(new HexagonCollapsePattern());
				break;
		}
	}
}
