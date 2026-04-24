import type { Element } from "./globals.js";

export interface HTMLCollection {
  readonly length: number;
  item(index: number): Element | null;
  namedItem(name: string): Element | null;
}

export interface HTMLCollectionConstructor {
  readonly prototype: HTMLCollection;
}

export declare const HTMLCollection: HTMLCollectionConstructor;
