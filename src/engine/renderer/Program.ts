import { Shader } from "./Shader";
import { assert } from "@/engine/utils/assert";
/** this will be a class that will handle the creation of programs
 *  it will be responsible for linking shaders together
 *  and for binding attributes and uniforms
 */
export class Program {
  program: WebGLProgram;

  constructor(private gl: WebGL2RenderingContext, vertCode: string, fragCode: string) {
    const vertShader = new Shader(gl, vertCode, gl.VERTEX_SHADER);
    const fragShader = new Shader(gl, fragCode, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    assert(program !== null, "Failed to create program");

    gl.attachShader(program!, vertShader.shader);
    gl.attachShader(program!, fragShader.shader);

    gl.linkProgram(program!);

    if (!gl.getProgramParameter(program!, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program!);
      throw new Error('Could not compile WebGL program: ' + info);
    }

    this.program = program!;
  }

  declareAttribute(name: string, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr) {
    this.bind();
    const location = this.gl.getAttribLocation(this.program, name);
    assert(location !== -1, `Attribute ${name} not found`);
    this.gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
    this.gl.enableVertexAttribArray(location);
    this.unbind();
  }

  setUniform(name: string, value: any, type: "vec4" | "vec3" | "vec2" | "mat4" | "float") {
    this.bind();
    const location = this.gl.getUniformLocation(this.program, name);
    assert(location !== -1, `Uniform ${name} not found`);
    switch (type) {
      case "vec4":
        this.gl.uniform4fv(location, value);
        break;
      case "vec3":
        this.gl.uniform3fv(location, value);
        break;
      case "vec2":
        this.gl.uniform2fv(location, value);
        break;
      case "mat4":
        this.gl.uniformMatrix4fv(location, false, value);
        break;
      case "float":
        this.gl.uniform1f(location, value);
        break;
    }
    this.unbind();
  }

  bind() {
    this.gl.useProgram(this.program);
  }

  unbind() {
    this.gl.useProgram(null);
  }
}

