// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
export const convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (!utils.isObject(value)) {
    throw new globalObject.TypeError(`${context} is not an object.`);
  }

  function callTheUserObjectsOperation(event) {
    let thisArg = utils.tryWrapperForImpl(this);
    let O = value;
    let X = O;

    if (typeof O !== "function") {
      X = O["handleEvent"];
      if (typeof X !== "function") {
        throw new globalObject.TypeError(`${context} does not correctly implement EventListener.`);
      }
      thisArg = O;
    }

    event = utils.tryWrapperForImpl(event);

    let callResult = Reflect.apply(X, thisArg, [event]);
  }

  callTheUserObjectsOperation[utils.wrapperSymbol] = value;
  callTheUserObjectsOperation.objectReference = value;

  return callTheUserObjectsOperation;
};

export const install = (globalObject, globalNames) => {};
