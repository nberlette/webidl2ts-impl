import type { Event } from "./globals.js";

export interface EventListener {
  handleEvent(event: Event): void;
}
