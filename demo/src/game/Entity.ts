import { RawModel } from './graphics/RawModel';
import { TexturedModel } from './graphics/TexturedModel';
import { vec3, mat4, glMatrix } from 'gl-matrix';

export class Entity {
	public translation: vec3;
	public rotation: vec3;
	public scale: number;

	private model: RawModel | TexturedModel;

	constructor(model: RawModel | TexturedModel, position: vec3, rotation: vec3, scale: number) {
		this.model = model;
		this.translation = position;
		this.rotation = rotation;
		this.scale = scale;
	}

	public getModel() {
		return this.model;
	}

	public getTransformationMatrix() {
		const matrix = mat4.create();

		mat4.translate(matrix, matrix, this.translation);
		mat4.scale(matrix, matrix, vec3.fromValues(this.scale, this.scale, this.scale));
		mat4.rotateX(matrix, matrix, glMatrix.toRadian((this.rotation[0])));
		mat4.rotateY(matrix, matrix, glMatrix.toRadian(this.rotation[1]));
		mat4.rotateZ(matrix, matrix, glMatrix.toRadian(this.rotation[2]));
	}

	public animate(delta: number) {
		this.rotation[1] += 10 * delta;
	}
}