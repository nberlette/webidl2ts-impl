export interface Storage {
  readonly length: number;
  key(index: number): string | null;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export interface StorageConstructor {
  readonly prototype: Storage;
}

export declare const Storage: StorageConstructor;
