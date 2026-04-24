export interface AsyncIterableValueNoArgs {
  [Symbol.asyncIterator](): AsyncIterableIterator<string>;
  values(): AsyncIterableIterator<string>;
}

export interface AsyncIterableValueNoArgsConstructor {
  readonly prototype: AsyncIterableValueNoArgs;
}

export declare const AsyncIterableValueNoArgs: AsyncIterableValueNoArgsConstructor;
