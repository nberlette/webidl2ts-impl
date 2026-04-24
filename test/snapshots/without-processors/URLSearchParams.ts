export interface URLSearchParams {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  getAll(name: string): Array<string>;
  has(name: string): boolean;
  set(name: string, value: string): void;
  sort(): void;
  [Symbol.iterator](): IterableIterator<readonly [string, string]>;
  entries(): IterableIterator<readonly [string, string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  forEach(callback: (value: string, key: string, parent: URLSearchParams) => void): void;
  toString(): void;
}

export interface URLSearchParamsConstructor {
  readonly prototype: URLSearchParams;
  new (init?: Array<Array<string>> | Record<string, string> | string): URLSearchParams;
}

export declare const URLSearchParams: URLSearchParamsConstructor;
