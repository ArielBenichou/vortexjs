/**
 * This is here to abstract the "window" aka the canvas creation,
 * it will optionally get an element, and then it will create the canvas as a child of this element,
 */
export class Canvas {
  public canvas: HTMLCanvasElement;
  public gl: WebGL2RenderingContext;

  constructor(parent?: HTMLElement) {
    this.canvas = document.createElement("canvas");
    if (parent) {
      parent.appendChild(this.canvas);
    } else {
      document.body.appendChild(this.canvas);
    }
    // Initialize the GL context
    const gl = this.canvas.getContext("webgl2");

    window.addEventListener("resize", () => this.resizeCanvas());
    this.resizeCanvas();

    // Only continue if WebGL is available and working
    if (gl === null) {
      throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
    }
    this.gl = gl;
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
