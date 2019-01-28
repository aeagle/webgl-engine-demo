import { RawModel } from './graphics/RawModel';
import { TexturedModel } from './graphics/TexturedModel';
import { vec3, mat4 } from 'gl-matrix';

export const radians = (degrees:number) => {
	return degrees * Math.PI / 180;
};

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
		mat4.rotateX(matrix, matrix, radians(this.rotation[0]));
		mat4.rotateY(matrix, matrix, radians(this.rotation[1]));
		mat4.rotateZ(matrix, matrix, radians(this.rotation[2]));

		this.rotation[0] += 3;
		this.rotation[1] += 3;
		this.rotation[2] += 3;

		return matrix;
	}
}