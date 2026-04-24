import type { AllowSharedBufferSource } from "./AllowSharedBufferSource.js";
import type { ArrayBufferView } from "./ArrayBufferView.js";
import type { BufferSource } from "./BufferSource.js";

export interface BufferSourceTypes {
  bs(source: BufferSource): void;
  ab(ab: ArrayBuffer): void;
  sab(sab: SharedArrayBuffer): void;
  abv(abv: ArrayBufferView): void;
  u8a(u8: Uint8Array): void;
  abUnion(ab: ArrayBuffer | string): void;
  sabUnion(ab: SharedArrayBuffer | string): void;
  u8aUnion(ab: Uint8Array | string): void;
  asbs(source: AllowSharedBufferSource): void;
  abvAllowShared(abv: ArrayBufferView): void;
  u8aAllowShared(u8: Uint8Array): void;
  bsAllowResizable(source: BufferSource): void;
  abAllowResizable(ab: ArrayBuffer): void;
  sabAllowResizable(sab: SharedArrayBuffer): void;
  abvAllowResizable(abv: ArrayBufferView): void;
  u8aAllowResizable(u8: Uint8Array): void;
  asbsAllowResizable(source: AllowSharedBufferSource): void;
  abvAllowResizableShared(abv: ArrayBufferView): void;
  u8aAllowResizableShared(u8: Uint8Array): void;
}

export interface BufferSourceTypesConstructor {
  readonly prototype: BufferSourceTypes;
}

export declare const BufferSourceTypes: BufferSourceTypesConstructor;
