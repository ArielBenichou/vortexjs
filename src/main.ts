import { vec4 } from "gl-matrix";
import { Application } from "./engine/application/Application";
import { Mesh } from "./engine/renderer/Mesh";
import { Program } from "./engine/renderer/Program";
import { Camera } from "./engine/renderer/Camera";
import { Entity } from "./engine/application/Entity";

const app = new Application();
app.setClearColor(vec4.fromValues(0.0, 0.0, 0.0, 1.0));

const defaultVert = await fetch("shaders/default.vert.glsl").then((res) =>
  res.text()
);
const defaultFrag = await fetch("shaders/default.frag.glsl").then((res) =>
  res.text()
);
const program = new Program(app.canvas.gl, defaultVert, defaultFrag);
const rect = new Mesh(
  app.canvas.gl,
  [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0],
  [0, 1, 2, 0, 2, 3],
  program,
  [{ name: "coordinates", size: 3, type: app.canvas.gl.FLOAT }]
);

const camera = new Camera({
  type: "orthographic",
  aspect: app.canvas.gl.canvas.width / app.canvas.gl.canvas.height,
});

app.onResize(() => {
  camera.updateProjectionMatrix(
    app.canvas.gl.canvas.width / app.canvas.gl.canvas.height
  );
});

const entity = new Entity(rect, camera);

let color1 = vec4.fromValues(1, 0, 0, 1);
let color2 = vec4.fromValues(0.1, 0, 0, 1);

app.onUpdate((deltatime, time) => {
  const amount = Math.sin(time / 1000);
  entity.transform.rotateZ(amount, "degrees");

  let color = vec4.lerp(vec4.create(), color1, color2, amount / 2);
  program.setUniform("uColor", color, "vec4");
});

app.onDraw((deltatime) => {
  entity.draw();
});

app.run();
