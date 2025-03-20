import { vec3 } from "gl-matrix";
import { Camera } from "../renderer/Camera";
import { Mesh } from "../renderer/Mesh";
import { Transform } from "../renderer/Transform";

export class Entity {
  public transform: Transform;
  private mesh: Mesh;
  private camera: Camera;

  constructor(mesh: Mesh, camera: Camera) {
    this.mesh = mesh;
    this.camera = camera;
    this.transform = new Transform(vec3.create(), vec3.create(), vec3.create());
  }

  draw() {
    this.mesh.program.setUniform("uProjectionMatrix", this.camera.projectionMatrix, "mat4");
    this.mesh.program.setUniform("uViewMatrix", this.camera.viewMatrix, "mat4");
    this.mesh.program.setUniform("uModelMatrix", this.transform.modelMatrix, "mat4");

    this.mesh.bind();
    this.mesh.draw();
    this.mesh.unbind();
  }
}
