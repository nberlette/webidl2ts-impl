// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "UnderscoredProperties";

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
  throw new globalObject.TypeError(`${context} is not of type 'UnderscoredProperties'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["UnderscoredProperties"].prototype;
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
  class UnderscoredProperties {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    operation(sequence) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'operation' called on an object that is not a valid instance of UnderscoredProperties."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'operation' on 'UnderscoredProperties': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (!utils.isObject(curArg)) {
          throw new globalObject.TypeError(
            "Failed to execute 'operation' on 'UnderscoredProperties': parameter 1" + " is not an iterable object."
          );
        } else {
          const V = [];
          const tmp = curArg;
          for (let nextItem of tmp) {
            nextItem = conversions["DOMString"](nextItem, {
              context: "Failed to execute 'operation' on 'UnderscoredProperties': parameter 1" + "'s element",
              globals: globalObject
            });

            V.push(nextItem);
          }
          curArg = V;
        }
        args.push(curArg);
      }
      return esValue[implSymbol].operation(...args);
    }

    get attribute() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get attribute' called on an object that is not a valid instance of UnderscoredProperties."
        );
      }

      return esValue[implSymbol]["attribute"];
    }

    set attribute(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set attribute' called on an object that is not a valid instance of UnderscoredProperties."
        );
      }

      V = conversions["byte"](V, {
        context: "Failed to set the 'attribute' property on 'UnderscoredProperties': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["attribute"] = V;
    }

    static static(void_) {
      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'static' on 'UnderscoredProperties': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["DOMString"](curArg, {
          context: "Failed to execute 'static' on 'UnderscoredProperties': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      return Impl.implementation.static(...args);
    }
  }
  Object.defineProperties(UnderscoredProperties.prototype, {
    operation: { enumerable: true },
    attribute: { enumerable: true },
    [Symbol.toStringTag]: { value: "UnderscoredProperties", configurable: true },
    const: { value: 42, enumerable: true }
  });
  Object.defineProperties(UnderscoredProperties, {
    static: { enumerable: true },
    const: { value: 42, enumerable: true }
  });
  ctorRegistry[interfaceName] = UnderscoredProperties;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: UnderscoredProperties
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
