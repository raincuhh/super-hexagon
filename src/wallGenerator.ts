import { FiveWallsPattern } from "./patterns/fiveWalls";
import { OppositePattern } from "./patterns/opposite";
import { SpiralPattern } from "./patterns/spiral";
import { SpreadPattern } from "./patterns/spread";
import { IPattern } from "./types";
import { Wall } from "./wall";

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
		let num = Math.floor(Math.random() * 4);
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
				let waves = Math.floor(Math.random() * 5) + 1;
				this.patterns.push(new FiveWallsPattern(waves, 1));
				break;
			default:
				this.patterns.push(new OppositePattern());
				break;
		}
	}
}
