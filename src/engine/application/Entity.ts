import { Mesh } from "@/engine/renderer/core/Mesh";
import { Vec3 } from "@/engine/renderer/core/types";

export class Entity {
  position: Vec3;
  name: string;
  mesh: Mesh;

  constructor(name: string, mesh: Mesh) {
    this.name = name;
    this.position = [0, 0, 0];
    this.mesh = mesh;
  }
}
