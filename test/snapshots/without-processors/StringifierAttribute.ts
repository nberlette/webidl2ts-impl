export interface StringifierAttribute {
  readonly attr: string;
}

export interface StringifierAttributeConstructor {
  readonly prototype: StringifierAttribute;
}

export declare const StringifierAttribute: StringifierAttributeConstructor;
