import { Texture } from './Texture';
import { RawModel } from './RawModel';
import { gl } from '../GL';
import { ModelTypes } from './ModelTypes';
import { ShaderProgram } from '../shaders/ShaderProgram';

export class TexturedModel {
	public readonly type = ModelTypes.TexturedModel;

	private model: RawModel;
	private textureCoords: WebGLBuffer;
	private texture: Texture;

	constructor(shader: ShaderProgram, model: RawModel, textureCoords: number[], texturePath: string) {
		this.model = model;
		this.texture = new Texture(texturePath);

		gl.bindVertexArray(this.model.getVao());
		this.textureCoords = RawModel.createVerticesBuffer(new Float32Array(textureCoords), 2, gl.FLOAT, 2);
		gl.bindVertexArray(null);
	}

	public getModel() {
		return this.model;
	}

	public getTexture() {
		return this.texture;
	}

	public dispose() {
		if (this.model) {
			this.model.dispose();
		}

		if (this.texture) {
			this.texture.dispose();
		}

		if (this.textureCoords) {
			gl.deleteBuffer(this.textureCoords);
		}
	}
}