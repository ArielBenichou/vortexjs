import { assert } from "@/engine/utils/assert";

/** this will be a class that will handle the creation of shaders */
export class Shader {
  shader: WebGLShader;
    
  constructor(gl: WebGL2RenderingContext, code: string, type: GLenum) {
    const shader = gl.createShader(type);
    assert(shader !== null, "Failed to create shader");
    gl.shaderSource(shader!, code);
    gl.compileShader(shader!);

    this.shader = shader!;
  }
}
