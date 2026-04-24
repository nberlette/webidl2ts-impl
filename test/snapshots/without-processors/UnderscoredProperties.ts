export interface UnderscoredProperties {
  readonly const: 42;
  attribute: number;
  operation(sequence: Array<string>): void;
}

export interface UnderscoredPropertiesConstructor {
  readonly prototype: UnderscoredProperties;
  readonly const: 42;
  static(_void: string): void;
}

export declare const UnderscoredProperties: UnderscoredPropertiesConstructor;
