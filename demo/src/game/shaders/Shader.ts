import { gl } from '../GL';

export class Shader {

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
	private program: WebGLProgram;
	private vertexShader : WebGLShader;
	private fragmentShader : WebGLShader;

	constructor(name: string, vertexSource: string, fragmentSource: string) {
		this.name = name;

		this.vertexShader = Shader.loadShader(vertexSource, gl.VERTEX_SHADER);
		this.fragmentShader = Shader.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

		this.program = Shader.createProgram(this.vertexShader, this.fragmentShader);
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