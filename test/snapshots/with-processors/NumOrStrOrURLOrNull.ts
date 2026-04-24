import type { NumOrStrOrNull } from "./NumOrStrOrNull.js";
import type { URL } from "./URL.js";

export type NumOrStrOrURLOrNull = NumOrStrOrNull | URL | null;
