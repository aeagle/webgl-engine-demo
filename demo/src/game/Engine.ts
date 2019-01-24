import { GLUtilities, gl } from './GL';
import { Shader } from './shaders/Shader';
import { EntityRenderer } from './renderers/EntityRenderer';
import { RawModel } from './models/RawModel';
import { Entity } from './Entity';
import { QuadModel } from './models/QuadModel';

import VERTEX_SHADER_SOURCE from './shaders/basic/vertexshader.txt';
import FRAGMENT_SHADER_SOURCE from './shaders/basic/fragmentshader.txt';

export class Engine {
	private basicShader: Shader;
	private entityRender: EntityRenderer = new EntityRenderer();
	private entities: Map<RawModel, Entity[]> = new Map<RawModel, Entity[]>();

	public start() {
		GLUtilities.Initialise("glContainer");
		this.loadShaders();
		this.loadModels();

		gl.clearColor(0.5, 0, 0, 1);

		this.loop();
	}

	public stop() {
		console.log("Stopping ...");
	}

	private loadModels() {
		this.entities.set(new QuadModel(), [ new Entity() ]);
	}

	private loadShaders() {
		this.basicShader = new Shader("basic", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
	}

	private renderEntities() {
		Array.from(this.entities.keys()).forEach(
			(model:RawModel) => {
				const entities = this.entities.get(model);
				if (entities) {
					const modelBuffer = RawModel.use(model);
					entities.forEach(entity => {
						this.entityRender.render(modelBuffer, entity);
					});
				}
			}
		)
	}

	private loop() {
		gl.clear(gl.COLOR_BUFFER_BIT);

		this.basicShader.use();
		this.renderEntities();

		requestAnimationFrame(this.loop.bind(this));
	}
}