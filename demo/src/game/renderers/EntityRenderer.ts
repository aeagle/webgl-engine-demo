import { RawModel } from '../models/RawModel';
import { gl } from '../GL';
import { Entity } from '../Entity';

export interface IModelBuffer {
	buffer: WebGLBuffer;
	mode: number;
	size: number;
}

export class EntityRenderer {
	public render(buffer: IModelBuffer, entity:Entity) {
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
		gl.enableVertexAttribArray(RawModel.ATTRIB_VERTICES);

		gl.drawArrays(buffer.mode, 0, buffer.size);

		gl.disableVertexAttribArray(RawModel.ATTRIB_VERTICES);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
}