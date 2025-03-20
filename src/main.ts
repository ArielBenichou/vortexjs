import { Application } from "./engine/application/Application";
import { Mesh } from "./engine/renderer/Mesh";
import { Program } from "./engine/renderer/Program";

const app = new Application();

const defaultVert = await fetch("shaders/default.vert.glsl").then(res => res.text());
const defaultFrag = await fetch("shaders/default.frag.glsl").then(res => res.text());
const program = new Program(app.canvas.gl, defaultVert, defaultFrag);
// TODO: find a way that the mesh can declare the attributes, and know the stride
const RECT_VERTEX_SIZE = 3;
const rect = new Mesh(
    app.canvas.gl,
     [
  -0.5, -0.5, 0,
  0.5, -0.5, 0,
  0.5, 0.5, 0,
  -0.5, 0.5, 0,
],
 [0, 1, 2, 0, 2, 3],
  program,
);

program.declareAttribute("coordinates", RECT_VERTEX_SIZE, app.canvas.gl.FLOAT, false, RECT_VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT, 0);

app.onDraw(()=> {
    rect.draw();
})

app.run();