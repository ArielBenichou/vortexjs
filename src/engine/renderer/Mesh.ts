import { Program } from "./Program";

export class Mesh {
  vbo: WebGLBuffer;
  ebo: WebGLBuffer;
  indicesLength: number;
  vao: WebGLVertexArrayObject;
  program: Program;

  constructor(
    private gl: WebGL2RenderingContext,
    vertices: number[],
    indices: number[],
    program: Program,
    attributes: {
      name: string;
      size: number;
      type: GLenum;
      normalized?: boolean;
    }[]
  ) {
    this.vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    this.ebo = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
    this.indicesLength = indices.length;

    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);

    const stride = attributes.reduce(
      (acc, attribute) => acc + attribute.size,
      0
    ) * Float32Array.BYTES_PER_ELEMENT;
    let offset = 0;
    for (const attribute of attributes) {
      program.declareAttribute(
        attribute.name,
        attribute.size,
        attribute.type,
        attribute.normalized ?? false,
        stride,
        offset
      );
      offset += attribute.size * Float32Array.BYTES_PER_ELEMENT;
    }

    this.program = program;
  }

  bind() {
    this.gl.bindVertexArray(this.vao);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    this.program.bind();
  }

  unbind() {
    this.program.unbind();
    this.gl.bindVertexArray(null);
  }

  /** bind and unbind the mesh before and after drawing */
  draw() {
    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.indicesLength,
      this.gl.UNSIGNED_SHORT,
      0
    );
  }
}
