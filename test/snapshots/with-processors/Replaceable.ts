// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Replaceable";

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
  throw new globalObject.TypeError(`${context} is not of type 'Replaceable'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["Replaceable"].prototype;
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
  class Replaceable {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    get replaceable() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get replaceable' called on an object that is not a valid instance of Replaceable."
        );
      }

      return esValue[implSymbol]["replaceable"];
    }

    set replaceable(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set replaceable' called on an object that is not a valid instance of Replaceable."
        );
      }

      Object.defineProperty(esValue, "replaceable", {
        configurable: true,
        enumerable: true,
        value: V,
        writable: true
      });
    }
  }
  Object.defineProperties(Replaceable.prototype, {
    replaceable: { enumerable: true },
    [Symbol.toStringTag]: { value: "Replaceable", configurable: true }
  });
  ctorRegistry[interfaceName] = Replaceable;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Replaceable
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
