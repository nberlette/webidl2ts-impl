import type { RequestDestination } from "./RequestDestination.js";

export interface Enum {
  op(destination: RequestDestination): void;
  attr: RequestDestination;
}

export interface EnumConstructor {
  readonly prototype: Enum;
}

export declare const Enum: EnumConstructor;
