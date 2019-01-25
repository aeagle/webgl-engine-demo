import { RawModel } from './RawModel';

export class QuadModel extends RawModel {
	constructor() {
		super(
			[
				-0.8, 0.8, 0,
				-0.8, -0.8, 0,
				0.8, -0.8, 0,
				0.8, 0.8, 0
			],
			[
				0, 1, 3,
				3, 1, 2
			]
		);
	}
}