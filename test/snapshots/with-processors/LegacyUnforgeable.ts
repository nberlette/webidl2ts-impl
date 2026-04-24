export interface LegacyUnforgeable {
  href: string;
  readonly origin: string;
  protocol: string;
  assign(url: string): void;
}

export interface LegacyUnforgeableConstructor {
  readonly prototype: LegacyUnforgeable;
}

export declare const LegacyUnforgeable: LegacyUnforgeableConstructor;
