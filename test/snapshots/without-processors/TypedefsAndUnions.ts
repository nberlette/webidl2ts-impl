import type { ArrayBufferView } from "./ArrayBufferView.js";
import type { AsyncCallbackFunction } from "./AsyncCallbackFunction.js";
import type { AsyncCallbackInterface } from "./AsyncCallbackInterface.js";
import type { BufferSource } from "./BufferSource.js";
import type { DOMTimeStamp } from "./DOMTimeStamp.js";
import type { NumOrStr } from "./NumOrStr.js";
import type { NumOrStrOrNull } from "./NumOrStrOrNull.js";
import type { NumOrStrOrURLOrNull } from "./NumOrStrOrURLOrNull.js";
import type { RequestDestination } from "./RequestDestination.js";
import type { URL } from "./URL.js";
import type { URLMap } from "./URLMap.js";
import type { URLMapInner } from "./URLMapInner.js";

export interface TypedefsAndUnions {
  numOrStrConsumer(a: NumOrStr): void;
  numOrEnumConsumer(a: number | RequestDestination | null): void;
  numOrStrOrNullConsumer(a: NumOrStrOrNull): void;
  numOrStrOrURLOrNullConsumer(a: NumOrStrOrURLOrNull | null): void;
  numOrObjConsumer(a: number | object): void;
  urlMapInnerConsumer(a: URLMapInner): void;
  urlMapConsumer(a: URLMap): void;
  bufferSourceOrURLConsumer(b: BufferSource | URL): void;
  arrayBufferViewOrURLMapConsumer(b: ArrayBufferView | URLMap): void;
  arrayBufferViewDupConsumer(b: ArrayBufferView | Uint8ClampedArray): void;
  arrayBufferOrSharedArrayBufferConsumer(b: ArrayBuffer | SharedArrayBuffer): void;
  callbackFunctionOrNumConsumer(cb: AsyncCallbackFunction | number): void;
  callbackInterfaceOrNumConsumer(cb: AsyncCallbackInterface | number): void;
  buf: ArrayBuffer | Uint8Array | Uint16Array;
  time: DOMTimeStamp;
}

export interface TypedefsAndUnionsConstructor {
  readonly prototype: TypedefsAndUnions;
}

export declare const TypedefsAndUnions: TypedefsAndUnionsConstructor;
