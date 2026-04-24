// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "LegacyLenientAttributes";

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
  throw new globalObject.TypeError(`${context} is not of type 'LegacyLenientAttributes'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["LegacyLenientAttributes"].prototype;
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
  class LegacyLenientAttributes {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    get lenientSetter() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get lenientSetter' called on an object that is not a valid instance of LegacyLenientAttributes."
        );
      }

      return esValue[implSymbol]["lenientSetter"];
    }

    set lenientSetter(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set lenientSetter' called on an object that is not a valid instance of LegacyLenientAttributes."
        );
      }
    }

    get lenientThisSetter() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        return;
      }

      return esValue[implSymbol]["lenientThisSetter"];
    }

    set lenientThisSetter(V) {}

    get lenientThis() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        return;
      }

      return esValue[implSymbol]["lenientThis"];
    }

    set lenientThis(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        return;
      }

      V = conversions["DOMString"](V, {
        context: "Failed to set the 'lenientThis' property on 'LegacyLenientAttributes': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["lenientThis"] = V;
    }

    get readonlyLenientThis() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        return;
      }

      return esValue[implSymbol]["readonlyLenientThis"];
    }

    get replaceableLenientThis() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        return;
      }

      return esValue[implSymbol]["replaceableLenientThis"];
    }

    set replaceableLenientThis(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      Object.defineProperty(esValue, "replaceableLenientThis", {
        configurable: true,
        enumerable: true,
        value: V,
        writable: true
      });
    }
  }
  Object.defineProperties(LegacyLenientAttributes.prototype, {
    lenientSetter: { enumerable: true },
    lenientThisSetter: { enumerable: true },
    lenientThis: { enumerable: true },
    readonlyLenientThis: { enumerable: true },
    replaceableLenientThis: { enumerable: true },
    [Symbol.toStringTag]: { value: "LegacyLenientAttributes", configurable: true }
  });
  ctorRegistry[interfaceName] = LegacyLenientAttributes;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: LegacyLenientAttributes
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
