export interface ZeroArgConstructor {}

export interface ZeroArgConstructorConstructor {
  readonly prototype: ZeroArgConstructor;
  new (): ZeroArgConstructor;
}

export declare const ZeroArgConstructor: ZeroArgConstructorConstructor;
