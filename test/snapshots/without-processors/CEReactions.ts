export interface CEReactions {
  attr: string;
  method(): void;
  promiseOperation(): Promise<void>;
  readonly promiseAttribute: Promise<void>;
}

export interface CEReactionsConstructor {
  readonly prototype: CEReactions;
}

export declare const CEReactions: CEReactionsConstructor;
