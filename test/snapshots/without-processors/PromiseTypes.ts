export interface PromiseTypes {
  voidPromiseConsumer(p: Promise<void>): void;
  promiseConsumer(p: Promise<number>): void;
  promiseOperation(): Promise<void>;
  readonly promiseAttribute: Promise<void>;
  unforgeablePromiseOperation(): Promise<void>;
  readonly unforgeablePromiseAttribute: Promise<void>;
}

export interface PromiseTypesConstructor {
  readonly prototype: PromiseTypes;
  staticPromiseOperation(): Promise<void>;
  readonly staticPromiseAttribute: Promise<void>;
}

export declare const PromiseTypes: PromiseTypesConstructor;
