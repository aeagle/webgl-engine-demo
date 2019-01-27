import { RawModelFromObj } from './RawModelFromObj';
import STANFORD_DRAGON from './Dragon.obj';
import { ShaderProgram } from '../shaders/ShaderProgram';

export class DragonModel extends RawModelFromObj {
	constructor(shader: ShaderProgram) {
		super(shader, STANFORD_DRAGON);
	}
}