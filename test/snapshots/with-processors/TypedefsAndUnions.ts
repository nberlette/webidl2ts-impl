// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
import * as RequestDestination from "./RequestDestination.ts";
import * as URL from "./URL.ts";
import * as AsyncCallbackFunction from "./AsyncCallbackFunction.ts";
import * as AsyncCallbackInterface from "./AsyncCallbackInterface.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "TypedefsAndUnions";

export const is = value => {
  return utils.isObject(value) && Object.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
export const isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
export const convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'TypedefsAndUnions'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["TypedefsAndUnions"].prototype;
  }

  return Object.create(proto);
}

export const create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return setup(wrapper, globalObject, constructorArgs, privateData);
};

export const createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

export const _internalSetup = (wrapper, globalObject) => {};

export const setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  _internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

const webidl2jsNew = (globalObject, newTarget) => {
  const wrapper = makeWrapper(globalObject, newTarget);

  _internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

export const install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class TypedefsAndUnions {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    numOrStrConsumer(a) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'numOrStrConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'numOrStrConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (typeof curArg === "number") {
          curArg = conversions["double"](curArg, {
            context: "Failed to execute 'numOrStrConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject,
            clamp: true
          });
        } else {
          curArg = conversions["DOMString"](curArg, {
            context: "Failed to execute 'numOrStrConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return esValue[implSymbol].numOrStrConsumer(...args);
    }

    numOrEnumConsumer(a) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'numOrEnumConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'numOrEnumConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          if (typeof curArg === "number") {
            curArg = conversions["double"](curArg, {
              context: "Failed to execute 'numOrEnumConsumer' on 'TypedefsAndUnions': parameter 1",
              globals: globalObject
            });
          } else {
            curArg = RequestDestination.convert(globalObject, curArg, {
              context: "Failed to execute 'numOrEnumConsumer' on 'TypedefsAndUnions': parameter 1"
            });
          }
        }
        args.push(curArg);
      }
      return esValue[implSymbol].numOrEnumConsumer(...args);
    }

    numOrStrOrNullConsumer(a) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'numOrStrOrNullConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'numOrStrOrNullConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          if (typeof curArg === "number") {
            curArg = conversions["double"](curArg, {
              context: "Failed to execute 'numOrStrOrNullConsumer' on 'TypedefsAndUnions': parameter 1",
              globals: globalObject,
              clamp: true,
              enforceRange: true
            });
          } else {
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'numOrStrOrNullConsumer' on 'TypedefsAndUnions': parameter 1",
              globals: globalObject,
              enforceRange: true
            });
          }
        }
        args.push(curArg);
      }
      return esValue[implSymbol].numOrStrOrNullConsumer(...args);
    }

    numOrStrOrURLOrNullConsumer(a) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'numOrStrOrURLOrNullConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'numOrStrOrURLOrNullConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          if (URL.is(curArg)) {
            curArg = utils.implForWrapper(curArg);
          } else if (typeof curArg === "number") {
            curArg = conversions["double"](curArg, {
              context: "Failed to execute 'numOrStrOrURLOrNullConsumer' on 'TypedefsAndUnions': parameter 1",
              globals: globalObject,
              clamp: true,
              enforceRange: true
            });
          } else {
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'numOrStrOrURLOrNullConsumer' on 'TypedefsAndUnions': parameter 1",
              globals: globalObject,
              enforceRange: true
            });
          }
        }
        args.push(curArg);
      }
      return esValue[implSymbol].numOrStrOrURLOrNullConsumer(...args);
    }

    numOrObjConsumer(a) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'numOrObjConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'numOrObjConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (utils.isObject(curArg)) {
          if (curArg[utils.implSymbol]) {
            curArg = utils.implForWrapper(curArg);
          }
        } else if (typeof curArg === "number") {
          curArg = conversions["double"](curArg, {
            context: "Failed to execute 'numOrObjConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else {
          curArg = conversions["double"](curArg, {
            context: "Failed to execute 'numOrObjConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return esValue[implSymbol].numOrObjConsumer(...args);
    }

    urlMapInnerConsumer(a) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'urlMapInnerConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'urlMapInnerConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (!utils.isObject(curArg)) {
          throw new globalObject.TypeError(
            "Failed to execute 'urlMapInnerConsumer' on 'TypedefsAndUnions': parameter 1" + " is not an object."
          );
        } else {
          const result = Object.create(null);
          for (const key of Reflect.ownKeys(curArg)) {
            const desc = Object.getOwnPropertyDescriptor(curArg, key);
            if (desc && desc.enumerable) {
              let typedKey = key;

              typedKey = conversions["USVString"](typedKey, {
                context: "Failed to execute 'urlMapInnerConsumer' on 'TypedefsAndUnions': parameter 1" + "'s key",
                globals: globalObject
              });

              let typedValue = curArg[key];

              typedValue = URL.convert(globalObject, typedValue, {
                context: "Failed to execute 'urlMapInnerConsumer' on 'TypedefsAndUnions': parameter 1" + "'s value"
              });

              result[typedKey] = typedValue;
            }
          }
          curArg = result;
        }
        args.push(curArg);
      }
      return esValue[implSymbol].urlMapInnerConsumer(...args);
    }

    urlMapConsumer(a) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'urlMapConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'urlMapConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          if (!utils.isObject(curArg)) {
            throw new globalObject.TypeError(
              "Failed to execute 'urlMapConsumer' on 'TypedefsAndUnions': parameter 1" + " is not an object."
            );
          } else {
            const result = Object.create(null);
            for (const key of Reflect.ownKeys(curArg)) {
              const desc = Object.getOwnPropertyDescriptor(curArg, key);
              if (desc && desc.enumerable) {
                let typedKey = key;

                typedKey = conversions["USVString"](typedKey, {
                  context: "Failed to execute 'urlMapConsumer' on 'TypedefsAndUnions': parameter 1" + "'s key",
                  globals: globalObject
                });

                let typedValue = curArg[key];

                typedValue = URL.convert(globalObject, typedValue, {
                  context: "Failed to execute 'urlMapConsumer' on 'TypedefsAndUnions': parameter 1" + "'s value"
                });

                result[typedKey] = typedValue;
              }
            }
            curArg = result;
          }
        }
        args.push(curArg);
      }
      return esValue[implSymbol].urlMapConsumer(...args);
    }

    bufferSourceOrURLConsumer(b) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'bufferSourceOrURLConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'bufferSourceOrURLConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (URL.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else if (utils.isArrayBuffer(curArg)) {
          curArg = conversions["ArrayBuffer"](curArg, {
            context: "Failed to execute 'bufferSourceOrURLConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else if (ArrayBuffer.isView(curArg)) {
          curArg = conversions["ArrayBufferView"](curArg, {
            context: "Failed to execute 'bufferSourceOrURLConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else {
          throw new globalObject.TypeError(
            "Failed to execute 'bufferSourceOrURLConsumer' on 'TypedefsAndUnions': parameter 1" +
              " is not of any supported type."
          );
        }
        args.push(curArg);
      }
      return esValue[implSymbol].bufferSourceOrURLConsumer(...args);
    }

    arrayBufferViewOrURLMapConsumer(b) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'arrayBufferViewOrURLMapConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'arrayBufferViewOrURLMapConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          if (ArrayBuffer.isView(curArg)) {
            curArg = conversions["ArrayBufferView"](curArg, {
              context: "Failed to execute 'arrayBufferViewOrURLMapConsumer' on 'TypedefsAndUnions': parameter 1",
              globals: globalObject
            });
          } else if (utils.isObject(curArg)) {
            if (!utils.isObject(curArg)) {
              throw new globalObject.TypeError(
                "Failed to execute 'arrayBufferViewOrURLMapConsumer' on 'TypedefsAndUnions': parameter 1" +
                  " record" +
                  " is not an object."
              );
            } else {
              const result = Object.create(null);
              for (const key of Reflect.ownKeys(curArg)) {
                const desc = Object.getOwnPropertyDescriptor(curArg, key);
                if (desc && desc.enumerable) {
                  let typedKey = key;

                  typedKey = conversions["USVString"](typedKey, {
                    context:
                      "Failed to execute 'arrayBufferViewOrURLMapConsumer' on 'TypedefsAndUnions': parameter 1" +
                      " record" +
                      "'s key",
                    globals: globalObject
                  });

                  let typedValue = curArg[key];

                  typedValue = URL.convert(globalObject, typedValue, {
                    context:
                      "Failed to execute 'arrayBufferViewOrURLMapConsumer' on 'TypedefsAndUnions': parameter 1" +
                      " record" +
                      "'s value"
                  });

                  result[typedKey] = typedValue;
                }
              }
              curArg = result;
            }
          } else {
            throw new globalObject.TypeError(
              "Failed to execute 'arrayBufferViewOrURLMapConsumer' on 'TypedefsAndUnions': parameter 1" +
                " is not of any supported type."
            );
          }
        }
        args.push(curArg);
      }
      return esValue[implSymbol].arrayBufferViewOrURLMapConsumer(...args);
    }

    arrayBufferViewDupConsumer(b) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'arrayBufferViewDupConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'arrayBufferViewDupConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (ArrayBuffer.isView(curArg)) {
          curArg = conversions["ArrayBufferView"](curArg, {
            context: "Failed to execute 'arrayBufferViewDupConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else {
          throw new globalObject.TypeError(
            "Failed to execute 'arrayBufferViewDupConsumer' on 'TypedefsAndUnions': parameter 1" +
              " is not of any supported type."
          );
        }
        args.push(curArg);
      }
      return esValue[implSymbol].arrayBufferViewDupConsumer(...args);
    }

    arrayBufferOrSharedArrayBufferConsumer(b) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'arrayBufferOrSharedArrayBufferConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'arrayBufferOrSharedArrayBufferConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (utils.isArrayBuffer(curArg)) {
          curArg = conversions["ArrayBuffer"](curArg, {
            context: "Failed to execute 'arrayBufferOrSharedArrayBufferConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else if (utils.isSharedArrayBuffer(curArg)) {
          curArg = conversions["SharedArrayBuffer"](curArg, {
            context: "Failed to execute 'arrayBufferOrSharedArrayBufferConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else {
          throw new globalObject.TypeError(
            "Failed to execute 'arrayBufferOrSharedArrayBufferConsumer' on 'TypedefsAndUnions': parameter 1" +
              " is not of any supported type."
          );
        }
        args.push(curArg);
      }
      return esValue[implSymbol].arrayBufferOrSharedArrayBufferConsumer(...args);
    }

    callbackFunctionOrNumConsumer(cb) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'callbackFunctionOrNumConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'callbackFunctionOrNumConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (typeof curArg === "function") {
          curArg = AsyncCallbackFunction.convert(globalObject, curArg, {
            context:
              "Failed to execute 'callbackFunctionOrNumConsumer' on 'TypedefsAndUnions': parameter 1" +
              " callback function"
          });
        } else if (typeof curArg === "number") {
          curArg = conversions["double"](curArg, {
            context: "Failed to execute 'callbackFunctionOrNumConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else {
          curArg = conversions["double"](curArg, {
            context: "Failed to execute 'callbackFunctionOrNumConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return esValue[implSymbol].callbackFunctionOrNumConsumer(...args);
    }

    callbackInterfaceOrNumConsumer(cb) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'callbackInterfaceOrNumConsumer' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'callbackInterfaceOrNumConsumer' on 'TypedefsAndUnions': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (utils.isObject(curArg)) {
          curArg = AsyncCallbackInterface.convert(globalObject, curArg, {
            context:
              "Failed to execute 'callbackInterfaceOrNumConsumer' on 'TypedefsAndUnions': parameter 1" +
              " callback interface"
          });
        } else if (typeof curArg === "number") {
          curArg = conversions["double"](curArg, {
            context: "Failed to execute 'callbackInterfaceOrNumConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        } else {
          curArg = conversions["double"](curArg, {
            context: "Failed to execute 'callbackInterfaceOrNumConsumer' on 'TypedefsAndUnions': parameter 1",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return esValue[implSymbol].callbackInterfaceOrNumConsumer(...args);
    }

    get buf() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get buf' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["buf"]);
    }

    set buf(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set buf' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      if (utils.isArrayBuffer(V)) {
        V = conversions["ArrayBuffer"](V, {
          context: "Failed to set the 'buf' property on 'TypedefsAndUnions': The provided value",
          globals: globalObject
        });
      } else if (ArrayBuffer.isView(V) && V.constructor.name === "Uint8Array") {
        V = utils.tryImplForWrapper(V);
      } else if (ArrayBuffer.isView(V) && V.constructor.name === "Uint16Array") {
        V = utils.tryImplForWrapper(V);
      } else {
        throw new globalObject.TypeError(
          "Failed to set the 'buf' property on 'TypedefsAndUnions': The provided value" +
            " is not of any supported type."
        );
      }
      esValue[implSymbol]["buf"] = V;
    }

    get time() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get time' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      return esValue[implSymbol]["time"];
    }

    set time(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set time' called on an object that is not a valid instance of TypedefsAndUnions."
        );
      }

      V = conversions["unsigned long long"](V, {
        context: "Failed to set the 'time' property on 'TypedefsAndUnions': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["time"] = V;
    }
  }
  Object.defineProperties(TypedefsAndUnions.prototype, {
    numOrStrConsumer: { enumerable: true },
    numOrEnumConsumer: { enumerable: true },
    numOrStrOrNullConsumer: { enumerable: true },
    numOrStrOrURLOrNullConsumer: { enumerable: true },
    numOrObjConsumer: { enumerable: true },
    urlMapInnerConsumer: { enumerable: true },
    urlMapConsumer: { enumerable: true },
    bufferSourceOrURLConsumer: { enumerable: true },
    arrayBufferViewOrURLMapConsumer: { enumerable: true },
    arrayBufferViewDupConsumer: { enumerable: true },
    arrayBufferOrSharedArrayBufferConsumer: { enumerable: true },
    callbackFunctionOrNumConsumer: { enumerable: true },
    callbackInterfaceOrNumConsumer: { enumerable: true },
    buf: { enumerable: true },
    time: { enumerable: true },
    [Symbol.toStringTag]: { value: "TypedefsAndUnions", configurable: true }
  });
  ctorRegistry[interfaceName] = TypedefsAndUnions;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: TypedefsAndUnions
  });
};

const Impl = {
  implementation: class {
    constructor(constructorArgs, privateData = {}) {
      void constructorArgs;
      Object.assign(this, privateData);
    }
  }
};
export { webidl2jsNew as new };
