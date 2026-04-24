import type { UnscopableMixin } from "./UnscopableMixin.js";

export interface Unscopable extends UnscopableMixin {
  unscopableTest: boolean;
}

export interface UnscopableConstructor {
  readonly prototype: Unscopable;
}

export declare const Unscopable: UnscopableConstructor;
