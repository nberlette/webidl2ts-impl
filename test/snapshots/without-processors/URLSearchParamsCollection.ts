import type { URLSearchParams } from "./URLSearchParams.js";

export interface URLSearchParamsCollection {
  readonly length: number;
  item(index: number): URLSearchParams | null;
  namedItem(name: string): URLSearchParams | null;
}

export interface URLSearchParamsCollectionConstructor {
  readonly prototype: URLSearchParamsCollection;
}

export declare const URLSearchParamsCollection: URLSearchParamsCollectionConstructor;
