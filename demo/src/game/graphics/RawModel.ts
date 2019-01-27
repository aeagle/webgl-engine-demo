import { gl } from '../GL';
import { ModelTypes } from './ModelTypes';
import { ShaderProgram } from '../shaders/ShaderProgram';

export class RawModel {
	public static createVerticesBuffer(data:ArrayBuffer, position: number, dataType: number, size: number) : WebGLBuffer {
		const vbo = gl.createBuffer();

		if (vbo) {
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
			gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
			gl.enableVertexAttribArray(position);
			gl.vertexAttribPointer(position, size, dataType, false, 0, 0);
		}
		else {
			throw new Error("Unable to create vertices buffer");
		}

		return vbo;
	}

	public static createIndicesBuffer(data:ArrayBuffer) : WebGLBuffer {
		const vbo = gl.createBuffer();
		
		if (vbo) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
		}
		else {
			throw new Error("Unable to create indices buffer");
		}

		return vbo;
	}
	
	public readonly type = ModelTypes.RawModel;

	private shader: ShaderProgram;
	private vao: WebGLVertexArrayObject;
	private vertices: WebGLBuffer;
	private normals: WebGLBuffer;
	private indices: WebGLBuffer;
	private vertexCount: number;

	constructor(shader: ShaderProgram, vertices: number[], indices: number[], normals: number[]) {

		this.shader = shader;
		this.vertexCount = indices.length;
		this.vao = this.createVao();
		gl.bindVertexArray(this.vao);

		this.vertices = RawModel.createVerticesBuffer(new Float32Array(vertices), 0, gl.FLOAT, 3);
		this.normals = RawModel.createVerticesBuffer(new Float32Array(normals), 1, gl.FLOAT, 3);
		this.indices = RawModel.createIndicesBuffer(new Uint32Array(indices));

		gl.bindVertexArray(null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

	}

	public getShader() {
		return this.shader;
	}

	public getVertexCount() {
		return this.vertexCount;
	}

	public getVao() {
		return this.vao;
	}

	public getVertices() {
		return this.vertices;
	}

	public getIndices() {
		return this.indices;
	}

	public dispose() {
		if (this.vertices) {
			gl.deleteBuffer(this.vertices);
		}

		if (this.normals) {
			gl.deleteBuffer(this.normals);
		}

		if (this.indices) {
			gl.deleteBuffer(this.indices);
		}

		if (this.vao) {
			gl.deleteVertexArray(this.vao);
		}
	}

	private createVao() {
		const vao = gl.createVertexArray();
		if (!vao) {
			throw new Error("Unable to create VAO");
		}
		return vao;
	}
}