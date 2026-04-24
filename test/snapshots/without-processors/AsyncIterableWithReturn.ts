import type { Dictionary } from "./Dictionary.js";

export interface AsyncIterableWithReturn {
  [Symbol.asyncIterator](dict?: Dictionary): AsyncIterableIterator<string>;
  values(dict?: Dictionary): AsyncIterableIterator<string>;
}

export interface AsyncIterableWithReturnConstructor {
  readonly prototype: AsyncIterableWithReturn;
}

export declare const AsyncIterableWithReturn: AsyncIterableWithReturnConstructor;
