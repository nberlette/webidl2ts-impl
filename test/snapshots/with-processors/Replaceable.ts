export interface Replaceable {
  readonly replaceable: string;
}

export interface ReplaceableConstructor {
  readonly prototype: Replaceable;
}

export declare const Replaceable: ReplaceableConstructor;
