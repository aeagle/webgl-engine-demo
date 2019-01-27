import { vec3 } from 'gl-matrix';

export class Light {
	public position: vec3;
	public colour: vec3;

	constructor(position: vec3, colour: vec3) {
		this.position = position;
		this.colour = colour;
	}
}