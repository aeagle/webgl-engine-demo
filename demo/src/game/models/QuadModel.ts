import { RawModel } from './RawModel';

export class QuadModel extends RawModel {
	constructor() {
		super(
			[
				0.5, -0.5, 0,
				-0.5, -0.5, 0,
				0.5, 0.5, 0,
				-0.5, -0.5, 0,
				-0.5, 0.5, 0,
				0.5, 0.5, 0
			]
		);
	}
}