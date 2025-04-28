import { Wall } from "./wall";

export interface IPattern {
	update(dt: number, walls: Wall[]): void;
	isFinished(): boolean;
}
