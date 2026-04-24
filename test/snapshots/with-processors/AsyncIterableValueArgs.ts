import type { URL } from "./URL.js";

export interface AsyncIterableValueArgs {
  [Symbol.asyncIterator](url?: URL): AsyncIterableIterator<string>;
  values(url?: URL): AsyncIterableIterator<string>;
}

export interface AsyncIterableValueArgsConstructor {
  readonly prototype: AsyncIterableValueArgs;
}

export declare const AsyncIterableValueArgs: AsyncIterableValueArgsConstructor;
