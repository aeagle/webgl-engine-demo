import { gl } from '../GL';

export class RawModel {
	public static readonly ATTRIB_VERTICES: number = 0;
	public static readonly ATTRIB_INDICES: number = 1;

	public static use(model: RawModel) {
		gl.bindBuffer(gl.ARRAY_BUFFER, model.getVertices());
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.getIndices());
	}

	public static dispose() {
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}

	private static createBuffer(type: number, data:ArrayBuffer) : WebGLBuffer {
		const vbo = gl.createBuffer();
		
		if (vbo) {
			gl.bindBuffer(type, vbo);
			gl.bufferData(type, data, gl.STATIC_DRAW);
		}
		else {
			throw new Error("Unable to create buffer");
		}

		return vbo;
	}

	private vertices: WebGLBuffer;
	private indices: WebGLBuffer;

	constructor(vertices: number[], indices: number[]) {
		this.vertices = RawModel.createBuffer(gl.ARRAY_BUFFER, new Float32Array(vertices));
		this.indices = RawModel.createBuffer(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices));
	}

	public getVertices() {
		return this.vertices;
	}

	public getIndices() {
		return this.indices;
	}
}