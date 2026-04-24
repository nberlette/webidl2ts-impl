import type { URL } from "./URL.js";

export interface AsyncIterablePairNoArgs {
  [Symbol.asyncIterator](): AsyncIterableIterator<readonly [string, URL]>;
  entries(): AsyncIterableIterator<readonly [string, URL]>;
  keys(): AsyncIterableIterator<string>;
  values(): AsyncIterableIterator<URL>;
  forEach(callback: (value: URL, key: string, parent: AsyncIterablePairNoArgs) => void): void;
}

export interface AsyncIterablePairNoArgsConstructor {
  readonly prototype: AsyncIterablePairNoArgs;
}

export declare const AsyncIterablePairNoArgs: AsyncIterablePairNoArgsConstructor;
