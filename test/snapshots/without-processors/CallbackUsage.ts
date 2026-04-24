import type { Function } from "./Function.js";
import type { URLCallback } from "./URLCallback.js";
import type { URLHandler } from "./URLHandler.js";
import type { URLHandlerNonNull } from "./URLHandlerNonNull.js";
import type { VoidFunction } from "./VoidFunction.js";

export interface CallbackUsage {
  function?: Function;
  voidFunction?: VoidFunction;
  urlCallback?: URLCallback;
  urlHandler?: URLHandler;
  urlHandlerNonNull?: URLHandlerNonNull;
}
