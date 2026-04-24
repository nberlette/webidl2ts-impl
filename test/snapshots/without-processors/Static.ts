export interface Static {
  abc: string;
  def(): string;
}

export interface StaticConstructor {
  readonly prototype: Static;
  abc: string;
  def(): string;
}

export declare const Static: StaticConstructor;
