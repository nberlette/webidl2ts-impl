export interface StringifierOperation {
  toString(): string;
}

export interface StringifierOperationConstructor {
  readonly prototype: StringifierOperation;
}

export declare const StringifierOperation: StringifierOperationConstructor;
