import { ExtendedSpiralPattern } from "./patterns/extendedPattern";
import { FiveWallsPattern } from "./patterns/fiveWalls";
import { OppositePattern } from "./patterns/opposite";
import { SpiralPattern } from "./patterns/spiral";
import { SpreadPattern } from "./patterns/spread";
import { IPattern } from "./types";
import { Wall } from "./wall";

const defaultPatternCooldown = 1.5;

export class WallGenerator {
	private walls: Wall[];
	private patterns: IPattern[];
	private spawnTimer: number;
	private patternCooldownTimer: number;

	constructor() {
		this.spawnTimer = 0;
		this.patternCooldownTimer = 0;
		this.walls = [];
		this.patterns = [];
	}

	getWalls() {
		return this.walls;
	}

	init() {}

	// @ts-ignore
	update(dt: number, canvas: HTMLCanvasElement) {
		this.spawnTimer += dt;
		this.patternCooldownTimer += dt;

		console.log(this.patternCooldownTimer);
		// console.log(this.spawnTimer);

		this.patterns.forEach((pattern) => {
			pattern.update(dt, this.walls);
		});

		this.patterns = this.patterns.filter((pattern) => !pattern.isFinished());

		if (this.patterns.length === 0 && this.patternCooldownTimer > defaultPatternCooldown) {
			if (this.spawnTimer > 1.5) {
				this.spawnRandomPattern();
				this.spawnTimer = 0;
				this.patternCooldownTimer = 0;
			}
		}

		this.walls.forEach((wall) => wall.update(dt));
		this.walls = this.walls.filter((wall) => !wall.isDead);
	}

	draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
		this.walls.forEach((wall) => wall.draw(ctx, x, y));
	}

	private spawnRandomPattern() {
		let num = Math.floor(Math.random() * 5);
		switch (num) {
			case 0:
				this.patterns.push(new OppositePattern());
				break;
			case 1:
				this.patterns.push(new SpreadPattern());
				break;
			case 2:
				this.patterns.push(new SpiralPattern(0.2));
				break;
			case 3:
				this.patterns.push(new FiveWallsPattern(1, 0));
				break;
			case 4:
				let waves = Math.floor(Math.random() * 4) + 1;
				this.patterns.push(new FiveWallsPattern(waves, 1));

				break;
			default:
				this.patterns.push(new OppositePattern());
				break;
		}
	}
}
