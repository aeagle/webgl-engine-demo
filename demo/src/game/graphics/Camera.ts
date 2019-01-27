import { vec3 } from 'gl-matrix';

export class Camera {
	public position: vec3 = vec3.fromValues(0, 0, 0);
	public pitch: number;
	public yaw: number;
	public roll: number;

	constructor(position:vec3, pitch:number, yaw:number, roll:number) {
		this.position = position;
		this.pitch = pitch;
		this.yaw = yaw;
		this.roll = roll;
	}
}