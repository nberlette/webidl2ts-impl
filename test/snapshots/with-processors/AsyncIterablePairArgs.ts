import type { Dictionary } from "./Dictionary.js";
import type { URL } from "./URL.js";

export interface AsyncIterablePairArgs {
  [Symbol.asyncIterator](
    url?: boolean,
    string?: string,
    dict?: Dictionary,
  ): AsyncIterableIterator<readonly [URL, string]>;
  entries(url?: boolean, string?: string, dict?: Dictionary): AsyncIterableIterator<readonly [URL, string]>;
  keys(url?: boolean, string?: string, dict?: Dictionary): AsyncIterableIterator<URL>;
  values(url?: boolean, string?: string, dict?: Dictionary): AsyncIterableIterator<string>;
  forEach(callback: (value: string, key: URL, parent: AsyncIterablePairArgs) => void): void;
}

export interface AsyncIterablePairArgsConstructor {
  readonly prototype: AsyncIterablePairArgs;
}

export declare const AsyncIterablePairArgs: AsyncIterablePairArgsConstructor;
