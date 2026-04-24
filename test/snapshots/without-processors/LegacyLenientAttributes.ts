export interface LegacyLenientAttributes {
  readonly lenientSetter: string;
  readonly lenientThisSetter: string;
  lenientThis: string;
  readonly readonlyLenientThis: string;
  readonly replaceableLenientThis: string;
}

export interface LegacyLenientAttributesConstructor {
  readonly prototype: LegacyLenientAttributes;
}

export declare const LegacyLenientAttributes: LegacyLenientAttributesConstructor;
