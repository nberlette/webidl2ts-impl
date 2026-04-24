export interface StringifierNamedOperation {
  operation(): string;
}

export interface StringifierNamedOperationConstructor {
  readonly prototype: StringifierNamedOperation;
}

export declare const StringifierNamedOperation: StringifierNamedOperationConstructor;
