import { IModelBuffer } from '../renderers/EntityRenderer';
import { gl } from '../GL';

export class RawModel {
	public static readonly ATTRIB_VERTICES: number = 0;
	public static readonly ATTRIB_INDICES: number = 1;
	
	public static use(model: RawModel) : IModelBuffer {
		const buffer = gl.createBuffer();
		const vertices = model.getVertices();

		if (buffer) {
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			gl.vertexAttribPointer(RawModel.ATTRIB_VERTICES, 3, gl.FLOAT, false, 0, 0);
			gl.bindBuffer(gl.ARRAY_BUFFER, null);
		}
		else {
			throw new Error("Unable to create buffer");
		}

		return { buffer: buffer, mode: gl.TRIANGLES, size: vertices.length / 3 };
	}

	private vertices: number[];

	constructor(vertices: number[]) {
		this.vertices = vertices;
	}

	public getVertices() {
		return this.vertices;
	}
}