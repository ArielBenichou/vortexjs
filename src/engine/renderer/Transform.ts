import { mat4, vec3 } from "gl-matrix";
import { toRadians } from "../utils/math";
export class Transform {
  constructor(
    public _position: vec3,
    public _rotation: vec3,
    public _scale: vec3
  ) {
    this._rotation = vec3.fromValues(0, 0, 0);
    this._scale = vec3.fromValues(1, 1, 1);
    this._position = vec3.fromValues(0, 0, 0);
  }

  translate(position: vec3) {
    this._position = vec3.add(this._position, this._position, position);
  }

  rotate(rotation: vec3, type: "radians" | "degrees" = "radians") {
    if (type === "radians") {
      this._rotation = vec3.add(this._rotation, this._rotation, rotation);
    } else {
      this._rotation = vec3.add(
        this._rotation,
        this._rotation,
        vec3.fromValues(
          toRadians(rotation[0]),
          toRadians(rotation[1]),
          toRadians(rotation[2])
        )
      );
    }
  }

  rotateX(x: number, type: "radians" | "degrees" = "radians") {
    if (type === "radians") {
      this._rotation[0] += x;
    } else {
      this._rotation[0] += toRadians(x);
    }
  }

  rotateY(y: number, type: "radians" | "degrees" = "radians") {
    if (type === "radians") {
      this._rotation[1] += y;
    } else {
      this._rotation[1] += toRadians(y);
    }
  }

  rotateZ(z: number, type: "radians" | "degrees" = "radians") {
    if (type === "radians") {
      this._rotation[2] += z;
    } else {
      this._rotation[2] += toRadians(z);
    }
  }

  scale(scale: vec3) {
    this._scale = vec3.add(this._scale, this._scale, scale);
  }

  get modelMatrix() {
    const model = mat4.create();
    mat4.translate(model, model, this._position);
    mat4.rotate(model, model, this._rotation[0], [1, 0, 0]);
    mat4.rotate(model, model, this._rotation[1], [0, 1, 0]);
    mat4.rotate(model, model, this._rotation[2], [0, 0, 1]);
    mat4.scale(model, model, this._scale);
    return model;
  }
}
