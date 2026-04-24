import type { EventListener } from "./EventListener.js";

export interface EventTarget {
  addEventListener(type: string, callback: EventListener | null): void;
}

export interface EventTargetConstructor {
  readonly prototype: EventTarget;
  new (): EventTarget;
}

export declare const EventTarget: EventTargetConstructor;
