import type { URL } from "./URL.js";

export interface Variadic {
  simple1(...strings: Array<string>): void;
  simple2(first: string, ...urls: Array<URL>): void;
  overloaded1(...strings: Array<string>): void;
  overloaded1(...numbers: Array<number>): void;
  overloaded2(first: string, ...strings: Array<string>): void;
  overloaded2(first: number, ...strings: Array<string>): void;
}

export interface VariadicConstructor {
  readonly prototype: Variadic;
}

export declare const Variadic: VariadicConstructor;
