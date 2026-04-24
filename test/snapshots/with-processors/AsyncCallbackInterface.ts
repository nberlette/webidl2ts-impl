// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
export const convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (!utils.isObject(value)) {
    throw new globalObject.TypeError(`${context} is not an object.`);
  }

  function callTheUserObjectsOperation() {
    let thisArg = utils.tryWrapperForImpl(this);
    let O = value;
    let X = O;

    try {
      if (typeof O !== "function") {
        X = O["asyncMethod"];
        if (typeof X !== "function") {
          throw new globalObject.TypeError(`${context} does not correctly implement AsyncCallbackInterface.`);
        }
        thisArg = O;
      }

      let callResult = Reflect.apply(X, thisArg, []);

      callResult = new globalObject.Promise(resolve => resolve(callResult));
      return callResult;
    } catch (err) {
      return globalObject.Promise.reject(err);
    }
  }

  callTheUserObjectsOperation[utils.wrapperSymbol] = value;
  callTheUserObjectsOperation.objectReference = value;

  return callTheUserObjectsOperation;
};

export const install = (globalObject, globalNames) => {};
