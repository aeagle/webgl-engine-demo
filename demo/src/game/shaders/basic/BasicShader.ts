import { ShaderProgram } from '../ShaderProgram';

import VERTEX_SHADER_SOURCE from './vertexshader.txt';
import FRAGMENT_SHADER_SOURCE from './fragmentshader.txt';

export class BasicShader extends ShaderProgram {
	constructor() {
		super("basic", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

		this.addUniformAttribute("transformationMatrix");
		this.addUniformAttribute("projectionMatrix");
		this.addUniformAttribute("viewMatrix");
		this.addUniformAttribute("lightPosition");
		this.addUniformAttribute("lightColour");
	}
}