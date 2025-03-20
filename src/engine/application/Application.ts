import { Canvas } from "./Canvas";

/** this is here to abstract the "window" aka the canvas,
 *  it will get options and initialize the canvas,
 *  and the gl context,
 *  and then it will run the game loop and manage the game loop, tracking lastFrame, and the deltaTime
 */
export class Application {
    public canvas: Canvas;
    private time: number = 0;
    private readonly TARGET_FPS: number = 120;
    private readonly FRAME_TIME: number = 1000 / this.TARGET_FPS;
    private updateCallbacks: ((deltatime: number) => void)[] = [];
    private drawCallbacks: ((deltatime: number) => void)[] = [];

    constructor(parent?: HTMLElement) {
        this.canvas = new Canvas(parent);
    }

    public onUpdate(callback: (deltatime: number) => void): void {
        this.updateCallbacks.push(callback);
    }

    public onDraw(callback: (deltatime: number) => void): void {
        this.drawCallbacks.push(callback);
    }

    private update(deltatime: number): void {
        this.updateCallbacks.forEach(callback => callback(deltatime));
    }

    private draw(deltatime: number): void {
        const gl = this.canvas.gl;
        
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);

        this.drawCallbacks.forEach(callback => callback(deltatime));
    }

    private loop = (timestamp: number): void => {
        const deltatime = timestamp - this.time;
        if (deltatime < this.FRAME_TIME) {
            requestAnimationFrame(this.loop);
            return;
        }
        this.time = timestamp;

        this.update(deltatime);
        this.draw(deltatime);

        requestAnimationFrame(this.loop);
    }

    public run(): void {
        requestAnimationFrame(this.loop);
    }
}