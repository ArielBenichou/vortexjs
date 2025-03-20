import { Vec4 } from "./vectors";

export function rgba(r: number, g: number, b: number, a?: number): Vec4 {
  return new Vec4(r / 255, g / 255, b / 255, a ?? 1);
}
