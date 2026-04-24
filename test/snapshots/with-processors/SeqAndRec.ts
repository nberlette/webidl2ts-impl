import type { URL } from "./URL.js";
import type { UnknownInterface } from "./globals.js";

export interface SeqAndRec {
  recordConsumer(rec: Record<string, number>): void;
  recordConsumer2(rec: Record<string, URL>): void;
  sequenceConsumer(seq: Array<string>): void;
  sequenceConsumer2(seq: Array<UnknownInterface>): void;
  asyncSequenceConsumer(async_seq: AsyncIterable<string>): void;
  asyncSequenceConsumer2(async_seq: AsyncIterable<UnknownInterface>): void;
  frozenArrayConsumer(arr: ReadonlyArray<number>): void;
  asyncSequencePassthrough(async_seq: AsyncIterable<number>): AsyncIterable<number>;
}

export interface SeqAndRecConstructor {
  readonly prototype: SeqAndRec;
  new (): SeqAndRec;
}

export declare const SeqAndRec: SeqAndRecConstructor;
