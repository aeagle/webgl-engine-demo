import { gl } from '../GL';
import { vec3, mat4 } from 'gl-matrix';

interface IUniformAttributeHash {
	[name: string]: WebGLUniformLocation
}

export class ShaderProgram {

	private static createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
		const result = gl.createProgram();

		if (result) {
			gl.attachShader(result, vertexShader);
			gl.attachShader(result, fragmentShader);

			gl.linkProgram(result);

			const error = gl.getProgramInfoLog(result);
			if (error !== "") {
				throw new Error("Error linking shader " + this.name + ": " + error);
			}
		}
		else {
			throw new Error("Unable to create program " + this.name);
		}

		return result as WebGLProgram;
	}

	private static loadShader(source: string, shaderType: number) {
		const shader = gl.createShader(shaderType);

		if (shader) {
			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			const error = gl.getShaderInfoLog(shader);
			if (error !== "") {
				throw new Error("Error compiling shader " + this.name + ": " + error);
			}
		}

		return shader as WebGLShader;
	}

	public name: string;
	protected program: WebGLProgram;
	private vertexShader : WebGLShader;
	private fragmentShader : WebGLShader;
	private uniformAttributes : IUniformAttributeHash = {};

	constructor(name: string, vertexSource: string, fragmentSource: string) {
		this.name = name;

		this.vertexShader = ShaderProgram.loadShader(vertexSource, gl.VERTEX_SHADER);
		this.fragmentShader = ShaderProgram.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

		this.program = ShaderProgram.createProgram(this.vertexShader, this.fragmentShader);
	}

	public getAttributeId(name: string) {
		return gl.getAttribLocation(this.program, name);
	}

	public addUniformAttribute(name: string) {
		const location = gl.getUniformLocation(this.program, name);
		if (location) {
			this.uniformAttributes[name] = location;
		}
		else {
			throw new Error("Unable to create uniform variable " + name);
		}
	}

	public loadFloat(name: string, value: number) {
		gl.uniform1f(this.uniformAttributes[name], value);
	}

	public loadVector(name: string, vector: vec3) {
		gl.uniform3f(this.uniformAttributes[name], vector[0], vector[1], vector[2]);
	}

	public loadMatrix4(name: string, matrix: mat4) {
		gl.uniformMatrix4fv(this.uniformAttributes[name], false, matrix, 0, matrix.length);
	}

	public use() {
		gl.useProgram(this.program);
	}

	public dispose() {
		gl.detachShader(this.program, this.vertexShader);
		gl.detachShader(this.program, this.fragmentShader);
		gl.deleteShader(this.vertexShader);
		gl.deleteShader(this.fragmentShader);
		gl.deleteProgram(this.program);
	}
}