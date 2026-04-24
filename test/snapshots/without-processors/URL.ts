import type { URLSearchParams } from "./URLSearchParams.js";

export interface URL {
  href: string;
  readonly origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  readonly searchParams: URLSearchParams;
  hash: string;
  toJSON(): string;
}

export interface URLConstructor {
  readonly prototype: URL;
  new (url: string, base?: string): URL;
}

export declare const URL: URLConstructor;
