export interface StringifierDefaultOperation {
  toString(): void;
}

export interface StringifierDefaultOperationConstructor {
  readonly prototype: StringifierDefaultOperation;
}

export declare const StringifierDefaultOperation: StringifierDefaultOperationConstructor;
