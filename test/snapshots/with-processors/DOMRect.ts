import type { Dictionary } from "./Dictionary.js";

export interface DOMRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DOMRectConstructor {
  readonly prototype: DOMRect;
  new (x?: number, y?: number, width?: number, height?: number): DOMRect;
  fromRect(other?: Dictionary): DOMRect;
}

export declare const DOMRect: DOMRectConstructor;
