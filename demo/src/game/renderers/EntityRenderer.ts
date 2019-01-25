import { gl } from '../GL';
import { Entity } from '../Entity';

export class EntityRenderer {
	public render(entity:Entity) {
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
	}
}