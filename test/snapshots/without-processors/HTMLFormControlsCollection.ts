import type { HTMLCollection } from "./HTMLCollection.js";
import type { Element, RadioNodeList } from "./globals.js";

export interface HTMLFormControlsCollection extends HTMLCollection {
  namedItem(name: string): RadioNodeList | Element | null;
}

export interface HTMLFormControlsCollectionConstructor {
  readonly prototype: HTMLFormControlsCollection;
}

export declare const HTMLFormControlsCollection: HTMLFormControlsCollectionConstructor;
