import { gl } from '../GL';

export class Texture {

	public static load(path:string): WebGLTexture {
		const texture = gl.createTexture();

		if (texture) {
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));

			const image = new Image();
			image.src = path;
			image.addEventListener('load', () => {
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
				gl.generateMipmap(gl.TEXTURE_2D);
			});
		}
		else {
			throw new Error (`Unable to create texture ${path}`);
		}

		return texture;
	}

	private texture: WebGLTexture;

	constructor(path: string) {
		this.texture = Texture.load(path);
	}

	public getTexture() {
		return this.texture;
	}

	public dispose() {
		if (this.texture) {
			gl.deleteTexture(this.texture);
		}
	}
}