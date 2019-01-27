import { RawModelFromObj } from './RawModelFromObj';
import CUBE from './Cube.obj';
import { ShaderProgram } from '../shaders/ShaderProgram';

export class CubeModel extends RawModelFromObj {
	constructor(shader: ShaderProgram) {
		super(shader, CUBE);
	}
}