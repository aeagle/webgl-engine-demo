import { RawModel } from './RawModel';
import { ShaderProgram } from '../shaders/ShaderProgram';

export class QuadModel extends RawModel {
	constructor(shader:ShaderProgram) {
		super(
			shader,
			[
				-0.8, 0.8, 0,
				-0.8, -0.8, 0,
				0.8, -0.8, 0,
				0.8, 0.8, 0
			],
			[
				0, 1, 3,
				3, 1, 2
			],
			[]
		);
	}
}