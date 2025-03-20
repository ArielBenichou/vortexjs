import { Program } from "./Program";

export class Mesh {
    vbo: WebGLBuffer;
    ebo: WebGLBuffer;
    indicesLength: number;
    vao: WebGLVertexArrayObject;
    program: Program;

    constructor(private gl: WebGL2RenderingContext, vertices: number[], indices: number[], program: Program) {
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        this.ebo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.indicesLength = indices.length;

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.program = program;
    }

    private bind() {
        this.gl.bindVertexArray(this.vao);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        this.program.bind();
    }

    private unbind() {
        this.program.unbind();
        this.gl.bindVertexArray(null);
    }

    draw() {
        this.bind();
        // this.program.setUniformVec4("uColor", this.color);
        this.gl.drawElements(this.gl.TRIANGLES, this.indicesLength, this.gl.UNSIGNED_SHORT, 0);
        this.unbind();
    }
    
}
