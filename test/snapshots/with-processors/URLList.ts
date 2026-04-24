import type { URL } from "./URL.js";

export interface URLList {
  item(index: number): URL | null;
  readonly length: number;
  [Symbol.iterator](): IterableIterator<URL>;
  values(): IterableIterator<URL>;
}

export interface URLListConstructor {
  readonly prototype: URLList;
}

export declare const URLList: URLListConstructor;
