// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
import * as URL from "./URL.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Overloads";

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
  throw new globalObject.TypeError(`${context} is not of type 'Overloads'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["Overloads"].prototype;
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
  class Overloads {
    constructor() {
      const args = [];
      switch (arguments.length) {
        case 0:
          break;
        default: {
          let curArg = arguments[0];
          if (URL.is(curArg)) {
            {
              let curArg = arguments[0];
              curArg = URL.convert(globalObject, curArg, { context: "Failed to construct 'Overloads': parameter 1" });
              args.push(curArg);
            }
          } else {
            {
              let curArg = arguments[0];
              curArg = conversions["DOMString"](curArg, {
                context: "Failed to construct 'Overloads': parameter 1",
                globals: globalObject
              });
              args.push(curArg);
            }
          }
        }
      }
      return setup(Object.create(new.target.prototype), globalObject, args);
    }

    compatible(arg1) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError("'compatible' called on an object that is not a valid instance of Overloads.");
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'compatible' on 'Overloads': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      switch (arguments.length) {
        case 1:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'compatible' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          break;
        case 2:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'compatible' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          {
            let curArg = arguments[1];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'compatible' on 'Overloads': parameter 2",
              globals: globalObject
            });
            args.push(curArg);
          }
          break;
        default:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'compatible' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          {
            let curArg = arguments[1];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'compatible' on 'Overloads': parameter 2",
              globals: globalObject
            });
            args.push(curArg);
          }
          {
            let curArg = arguments[2];
            if (curArg !== undefined) {
              curArg = conversions["long"](curArg, {
                context: "Failed to execute 'compatible' on 'Overloads': parameter 3",
                globals: globalObject
              });
            } else {
              curArg = 0;
            }
            args.push(curArg);
          }
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].compatible(...args));
    }

    incompatible1(arg1) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'incompatible1' called on an object that is not a valid instance of Overloads."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'incompatible1' on 'Overloads': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (typeof curArg === "number") {
          {
            let curArg = arguments[0];
            curArg = conversions["long"](curArg, {
              context: "Failed to execute 'incompatible1' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
        } else {
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'incompatible1' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
        }
      }
      return esValue[implSymbol].incompatible1(...args);
    }

    incompatible2(arg1) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'incompatible2' called on an object that is not a valid instance of Overloads."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'incompatible2' on 'Overloads': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      switch (arguments.length) {
        case 1:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'incompatible2' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          break;
        default:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'incompatible2' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          {
            let curArg = arguments[1];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'incompatible2' on 'Overloads': parameter 2",
              globals: globalObject
            });
            args.push(curArg);
          }
      }
      return esValue[implSymbol].incompatible2(...args);
    }

    incompatible3(arg1) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'incompatible3' called on an object that is not a valid instance of Overloads."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'incompatible3' on 'Overloads': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      switch (arguments.length) {
        case 1:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'incompatible3' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          break;
        case 2:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'incompatible3' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          {
            let curArg = arguments[1];
            if (curArg === undefined) {
              {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                  curArg = URL.convert(globalObject, curArg, {
                    context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2"
                  });
                }
                args.push(curArg);
              }
            } else if (URL.is(curArg)) {
              {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                  curArg = URL.convert(globalObject, curArg, {
                    context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2"
                  });
                }
                args.push(curArg);
              }
            } else if (utils.isArrayBuffer(curArg)) {
              {
                let curArg = arguments[1];
                if (utils.isArrayBuffer(curArg)) {
                  curArg = conversions["ArrayBuffer"](curArg, {
                    context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2",
                    globals: globalObject
                  });
                } else if (ArrayBuffer.isView(curArg)) {
                  curArg = conversions["ArrayBufferView"](curArg, {
                    context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2",
                    globals: globalObject
                  });
                } else {
                  throw new globalObject.TypeError(
                    "Failed to execute 'incompatible3' on 'Overloads': parameter 2" + " is not of any supported type."
                  );
                }
                args.push(curArg);
              }
            } else if (ArrayBuffer.isView(curArg)) {
              {
                let curArg = arguments[1];
                if (utils.isArrayBuffer(curArg)) {
                  curArg = conversions["ArrayBuffer"](curArg, {
                    context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2",
                    globals: globalObject
                  });
                } else if (ArrayBuffer.isView(curArg)) {
                  curArg = conversions["ArrayBufferView"](curArg, {
                    context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2",
                    globals: globalObject
                  });
                } else {
                  throw new globalObject.TypeError(
                    "Failed to execute 'incompatible3' on 'Overloads': parameter 2" + " is not of any supported type."
                  );
                }
                args.push(curArg);
              }
            } else {
              {
                let curArg = arguments[1];
                curArg = conversions["DOMString"](curArg, {
                  context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2",
                  globals: globalObject
                });
                args.push(curArg);
              }
            }
          }
          break;
        case 3:
          throw new globalObject.TypeError(
            `Failed to execute 'incompatible3' on 'Overloads': only ${arguments.length} arguments present.`
          );
          break;
        default:
          {
            let curArg = arguments[0];
            curArg = conversions["DOMString"](curArg, {
              context: "Failed to execute 'incompatible3' on 'Overloads': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          {
            let curArg = arguments[1];
            curArg = conversions["long"](curArg, {
              context: "Failed to execute 'incompatible3' on 'Overloads': parameter 2",
              globals: globalObject
            });
            args.push(curArg);
          }
          {
            let curArg = arguments[2];
            if (utils.isArrayBuffer(curArg)) {
              curArg = conversions["ArrayBuffer"](curArg, {
                context: "Failed to execute 'incompatible3' on 'Overloads': parameter 3",
                globals: globalObject
              });
            } else if (ArrayBuffer.isView(curArg)) {
              curArg = conversions["ArrayBufferView"](curArg, {
                context: "Failed to execute 'incompatible3' on 'Overloads': parameter 3",
                globals: globalObject
              });
            } else {
              throw new globalObject.TypeError(
                "Failed to execute 'incompatible3' on 'Overloads': parameter 3" + " is not of any supported type."
              );
            }
            args.push(curArg);
          }
          {
            let curArg = arguments[3];
            if (utils.isArrayBuffer(curArg)) {
              curArg = conversions["ArrayBuffer"](curArg, {
                context: "Failed to execute 'incompatible3' on 'Overloads': parameter 4",
                globals: globalObject
              });
            } else if (ArrayBuffer.isView(curArg)) {
              curArg = conversions["ArrayBufferView"](curArg, {
                context: "Failed to execute 'incompatible3' on 'Overloads': parameter 4",
                globals: globalObject
              });
            } else {
              throw new globalObject.TypeError(
                "Failed to execute 'incompatible3' on 'Overloads': parameter 4" + " is not of any supported type."
              );
            }
            args.push(curArg);
          }
      }
      return esValue[implSymbol].incompatible3(...args);
    }
  }
  Object.defineProperties(Overloads.prototype, {
    compatible: { enumerable: true },
    incompatible1: { enumerable: true },
    incompatible2: { enumerable: true },
    incompatible3: { enumerable: true },
    [Symbol.toStringTag]: { value: "Overloads", configurable: true }
  });
  ctorRegistry[interfaceName] = Overloads;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Overloads
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
