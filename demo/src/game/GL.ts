export let gl:WebGLRenderingContext;

export class GLUtilities {
	public static Initialise(elementId:string) {
		const canvas = (document.getElementById(elementId) as HTMLCanvasElement);
		gl = canvas.getContext("webgl2") as WebGLRenderingContext;
		return canvas;
	}
}