export let gl:WebGL2RenderingContext;

export class GLUtilities {
	public static Initialise(elementId:string) {
		const canvas = (document.getElementById(elementId) as HTMLCanvasElement);
		gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
		return canvas;
	}
}