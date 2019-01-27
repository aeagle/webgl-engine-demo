import { TexturedModel } from './TexturedModel';
import { RawModel } from './RawModel';
import { BasicShader } from '../shaders/basic/BasicShader';

export class StanfordBunnyModel extends TexturedModel {
	constructor(shader:BasicShader) {
		super(
			shader,
			new RawModel(
				shader,
				// vertices
				[
					-0.8, 0.8, 0,
					-0.8, -0.8, 0,
					0.8, -0.8, 0,
					0.8, 0.8, 0
				],
				// indices
				[
					0, 1, 3,
					3, 1, 2
				],
				// normals
				[]
			),
			// texture coords
			[
				0, 0,
				0, 1,
				1, 1,
				1, 0
			],
			"/res/stanfordbunny.png"
		)
	}
}