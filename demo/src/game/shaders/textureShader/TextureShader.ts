import { ShaderProgram } from '../ShaderProgram';

import VERTEX_SHADER_SOURCE from './vertexshader.txt';
import FRAGMENT_SHADER_SOURCE from './fragmentshader.txt';

export class TextureShader extends ShaderProgram {
	constructor() {
		super("texture", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
	}
}