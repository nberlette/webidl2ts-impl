export interface Reflect {
  reflectedBoolean: boolean;
  reflectedDOMString: string;
  reflectedLong: number;
  reflectedUnsignedLong: number;
  reflectedUSVStringURL: string;
  reflectionTest: string;
  withUnderscore: string;
}

export interface ReflectConstructor {
  readonly prototype: Reflect;
}

export declare const Reflect: ReflectConstructor;
