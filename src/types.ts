import { Wall } from "./wall";

export interface IPattern {
	update(dt: number): Wall[];
	isFinished(): boolean;
}
