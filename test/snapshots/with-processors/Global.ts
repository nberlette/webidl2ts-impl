export interface Global {
  op(): void;
  unforgeableOp(): void;
  attr: string;
  unforgeableAttr: string;
  [key: number]: string;
  length: number;
  [Symbol.iterator](): IterableIterator<string>;
  values(): IterableIterator<string>;
}

export interface GlobalConstructor {
  readonly prototype: Global;
  staticOp(): void;
  staticAttr: string;
}

export declare const Global: GlobalConstructor;
