import { ShaderProgram } from '../shaders/ShaderProgram';
import { RawModel } from './RawModel';

interface IObjInfo {
	vertices: number[],
	normals: number[],
	indices: number[]
}

export class RawModelFromObj extends RawModel {

	private static loadObj(obj: string) : IObjInfo {
		const result : IObjInfo = {
			vertices: [],
			normals: [],
			indices: []
		};

		const lines = obj.split('\n');
		const unorderedNormals: number[] = [];

		let currentPos = 0;
		while (currentPos < lines.length) {
			const line = lines[currentPos++];
			const lineParts = line.split(" ");

			if (line.startsWith("v ")) {
				result.vertices.push(parseFloat(lineParts[1]));
				result.vertices.push(parseFloat(lineParts[2]));
				result.vertices.push(parseFloat(lineParts[3]));
			} else if (line.startsWith("vn ")) {
				unorderedNormals.push(parseFloat(lineParts[1]));
				unorderedNormals.push(parseFloat(lineParts[2]));
				unorderedNormals.push(parseFloat(lineParts[3]));
			} else if (line.startsWith("f ")) {
				const vertex1 = lineParts[1].split("/").map(v => parseInt(v, 10));
				const vertex2 = lineParts[2].split("/").map(v => parseInt(v, 10));
				const vertex3 = lineParts[3].split("/").map(v => parseInt(v, 10));
				this.processVertex(vertex1, result.indices, unorderedNormals, result.normals);
				this.processVertex(vertex2, result.indices, unorderedNormals, result.normals);
				this.processVertex(vertex3, result.indices, unorderedNormals, result.normals);
			}
		}

		console.log(result);
		return result;
	}

	private static processVertex(vertexData: number[], indices: number[], unorderedNormals: number[], normals: number[]) {
		const currentVertexPointer = vertexData[0] - 1;
		const currentNormalPointer = vertexData[2] - 1;
		indices.push(currentVertexPointer);

		normals[currentVertexPointer*3] = unorderedNormals[currentNormalPointer*3];
		normals[currentVertexPointer*3+1] = unorderedNormals[currentNormalPointer*3 + 1];
		normals[currentVertexPointer*3+2] = unorderedNormals[currentNormalPointer*3 + 2];
	}

	constructor(shader:ShaderProgram, obj: string) {
		const objInfo = RawModelFromObj.loadObj(obj);

		super(
			shader,
			objInfo.vertices,
			objInfo.indices,
			objInfo.normals
		);
	}
}