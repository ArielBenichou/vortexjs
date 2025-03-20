import { mat4, vec3 } from "gl-matrix";
import { Transform } from "./Transform";
import { toRadians } from "../utils/math";
import { assert } from "../utils/assert";

export class Camera {
  public transform: Transform;
  public projectionMatrix: mat4;
  public viewMatrix: mat4;

  // Camera vectors
  private front: vec3;
  private up: vec3;
  private right: vec3;
  private worldUp: vec3;

  // Camera options
  private zoom: number;

  private options: CameraOptions;

  constructor(options: CameraOptions) {
    options.near ??= 0.1;
    options.far ??= 100;
    // Example assertions for your Camera class
    assert(options.near > 0, "Near plane must be positive");
    assert(
      options.far > options.near,
      "Far plane must be greater than near plane"
    );

    this.transform = new Transform(
      vec3.create(),
      vec3.create(),
      vec3.create()
    );

    // Initialize camera vectors
    this.front = vec3.fromValues(0, 0, -1);
    this.worldUp = vec3.fromValues(0, 1, 0);
    this.up = vec3.create();
    this.right = vec3.create();
    this.zoom = 45;

    // Update vectors based on initial transform
    this.updateCameraVectors();

    this.projectionMatrix = mat4.create();
    this.options = options;
    this.updateProjectionMatrix();

    this.viewMatrix = mat4.create();
    this.updateViewMatrix();
  }

  private updateCameraVectors() {
    // Calculate front vector based on Euler angles (yaw and pitch from transform's rotation)
    const yaw = this.transform._rotation[1]; // Y rotation
    const pitch = this.transform._rotation[0]; // X rotation

    this.front[0] = Math.cos(yaw) * Math.cos(pitch);
    this.front[1] = Math.sin(pitch);
    this.front[2] = Math.sin(yaw) * Math.cos(pitch);
    vec3.normalize(this.front, this.front);

    // Re-calculate Right and Up vector
    vec3.cross(this.right, this.front, this.worldUp);
    vec3.normalize(this.right, this.right);

    vec3.cross(this.up, this.right, this.front);
    vec3.normalize(this.up, this.up);
  }

  updateProjectionMatrix(aspect?: number) {
    const options = this.options;
    const _aspect = aspect ?? options.aspect;
    assert(_aspect > 0, "Aspect ratio must be positive");
    if (options.near != null && options.far != null) {
      assert(
        options.far > options.near,
        "Far plane must be greater than near plane"
      );
    }

    if (options.type === "orthographic") {
      // Calculate orthographic bounds based on zoom and aspect ratio
      const zoom = this.zoom / 45; // Normalize zoom (45 is max zoom)
      const height = 2.0 * zoom; // Base height
      const width = height * _aspect; // Width adjusted for aspect ratio

      mat4.orthoNO(
        this.projectionMatrix,
        -width / 2,
        width / 2, // left, right
        -height / 2,
        height / 2, // bottom, top
        -1,
        1
      );
    } else {
      mat4.perspectiveNO(
        this.projectionMatrix,
        toRadians(this.zoom),
        _aspect,
        options.near ?? 0.1,
        options.far ?? 100
      );
    }
  }

  setZoom(zoom: number) {
    this.zoom = Math.max(1, Math.min(zoom, 45));
    this.updateProjectionMatrix();
  }

  //   setPosition(position: vec3): void {
  //     vec3.copy(this.transform._position, position);
  //     this.updateViewMatrix();
  //   }

  //   lookAt(target: vec3, up: vec3): void {
  //     // Create lookAt matrix
  //     mat4.lookAt(
  //       this.viewMatrix,
  //       this.transform._position,  // camera position
  //       target,         // point to look at
  //       up             // up vector
  //     );
  //   }

  updateViewMatrix(): void {
    // mat4.multiply(
    //   this.viewMatrix,
    //   this.transform.modelMatrix,
    //   this.viewMatrix,
    // );
  }
}

type CameraType = "perspective" | "orthographic";
type CameraOptions = {
  type: CameraType;
  aspect: number;
  fov?: number;
  near?: number;
  far?: number;
};
