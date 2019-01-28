import { GLUtilities, gl } from './GL';
import { EntityRenderer } from './renderers/EntityRenderer';
import { RawModel } from './graphics/RawModel';
import { Entity } from './Entity';
import { BasicShader } from './shaders/basic/BasicShader';
import { TexturedModel } from './graphics/TexturedModel';
import { TextureShader } from './shaders/textureShader/TextureShader';
import { vec3 } from 'gl-matrix';
import { DragonModel } from './graphics/DragonModel';
import { Light } from './graphics/Light';
import { Camera } from './graphics/Camera';

export class Engine {
	private basicShader: BasicShader;
	private textureShader: TextureShader;
	private light = new Light(vec3.fromValues(0, 5, 5), vec3.fromValues(0.9, 0.6, 0.2));
	private camera = new Camera(vec3.fromValues(0, 0, 0), 0, 0, 0);
	private entityRenderer: EntityRenderer = new EntityRenderer();
	private entities: Map<RawModel | TexturedModel, Entity[]> = new Map<RawModel | TexturedModel, Entity[]>();
	private stopping: boolean = false;
	private stopped: boolean = true;
	private then: number = 0;
	private deltaTime : number = 0;

	public start() {
		console.log("Starting ...");
		GLUtilities.Initialise("glContainer");
		this.loadShaders();
		this.loadModels();

		gl.clearColor(0, 0, 0, 1);

		const moveSize = 0.1;
		window.addEventListener("keydown", (e) => {
			if (e.keyCode === 87) {
				this.camera.position[2] -= moveSize * this.deltaTime;
			} else if (e.keyCode === 83) {
				this.camera.position[2] += moveSize * this.deltaTime;
			} else if (e.keyCode === 65) {
				this.camera.position[0] -= moveSize / 10 * this.deltaTime;
			} else if (e.keyCode === 68) {
				this.camera.position[0] += moveSize / 10 * this.deltaTime;
			}
		});

		this.stopped = false;
		requestAnimationFrame(this.loop.bind(this));
	}

	public stop() {
		this.stopping = true;

		while (!this.stopped) {
			console.log("Stopping ...");
		}

		// Dispose of models
		Array.from(this.entities.keys()).forEach(
			(model:RawModel | TexturedModel) => {
				model.dispose();
			}
		)

		// Dispose of shaders
		if (this.basicShader) {
			this.basicShader.dispose();
		}

		if (this.textureShader) {
			this.textureShader.dispose();
		}
	}

	private loadModels() {
		const dragon = new DragonModel(this.basicShader);
		const dragonEntity = 
			new Entity(
				dragon,
				vec3.fromValues(0.03, -0.02, -0.5),
				vec3.fromValues(0, 0, 0),
				0.002);
				
		const dragonEntity1 = 
			new Entity(
				dragon,
				vec3.fromValues(-0.03, -0.02, -0.7),
				vec3.fromValues(0, 0, 0),
				0.002);

		this.entities.set(dragon, [ dragonEntity, dragonEntity1 ]);
	}

	private loadShaders() {
		this.basicShader = new BasicShader();
		this.textureShader = new TextureShader();
	}

	private renderEntities(delta:number) {

		Array.from(this.entities.keys()).forEach(
			(model:RawModel | TexturedModel) => {
				const entities = this.entities.get(model);
				if (entities) {
					this.entityRenderer.render(model, entities, this.light, this.camera);

					entities.forEach(e => {
						e.animate(delta);
					});
				}
			}
		)
	}

	private loop(now: number) {
		now *= 0.001;
		this.deltaTime = now - this.then;
		this.then = now;

		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.enable(gl.CULL_FACE);
		gl.enable(gl.DEPTH_TEST);
		gl.frontFace(gl.CCW);
		gl.cullFace(gl.BACK);

		this.renderEntities(this.deltaTime);

		if (!this.stopping) {
			requestAnimationFrame(this.loop.bind(this));
		}

		this.stopped = true;
	}
}