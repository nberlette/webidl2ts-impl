import type { BufferSource } from "./BufferSource.js";
import type { URL } from "./URL.js";

export interface Overloads {
  compatible(arg1: string): string;
  compatible(arg1: string, arg2: string): number;
  compatible(arg1: string, arg2: string, arg3?: number): URL;
  incompatible1(arg1: string): string;
  incompatible1(arg1: number): number;
  incompatible2(arg1: string): string;
  incompatible2(arg1: string, arg2: string): number;
  incompatible3(arg1: string, arg2?: URL): string;
  incompatible3(arg1: string, arg2: string): number;
  incompatible3(arg1: string, arg2: BufferSource): number;
  incompatible3(arg1: string, arg2: number, arg3: BufferSource, arg4: BufferSource): number;
}

export interface OverloadsConstructor {
  readonly prototype: Overloads;
  new (): Overloads;
  new (arg1: string): Overloads;
  new (arg1: URL): Overloads;
}

export declare const Overloads: OverloadsConstructor;
