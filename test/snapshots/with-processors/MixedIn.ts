import type { InterfaceMixin } from "./InterfaceMixin.js";

export interface MixedIn extends InterfaceMixin {
  mixedInAttr: string;
  mixedInOp(): string;
  readonly mixedInConst: 43;
}

export interface MixedInConstructor {
  readonly prototype: MixedIn;
  readonly mixedInConst: 43;
}

export declare const MixedIn: MixedInConstructor;
