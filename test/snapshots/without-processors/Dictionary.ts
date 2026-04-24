import type { URL } from "./URL.js";
import type { URLSearchParams } from "./URLSearchParams.js";

export interface Dictionary {
  boolWithDefault?: boolean;
  requiredInterface: URL;
  seq?: Array<URLSearchParams>;
  vanillaString?: string;
}
