import type { Dictionary } from "./Dictionary.js";

export interface DictionaryConvert {
  op(arg1?: string, arg2?: Dictionary): string;
}

export interface DictionaryConvertConstructor {
  readonly prototype: DictionaryConvert;
}

export declare const DictionaryConvert: DictionaryConvertConstructor;
