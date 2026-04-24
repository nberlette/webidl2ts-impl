// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Unscopable";

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
  throw new globalObject.TypeError(`${context} is not of type 'Unscopable'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["Unscopable"].prototype;
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
  class Unscopable {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    get unscopableTest() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get unscopableTest' called on an object that is not a valid instance of Unscopable."
        );
      }

      return esValue[implSymbol]["unscopableTest"];
    }

    set unscopableTest(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set unscopableTest' called on an object that is not a valid instance of Unscopable."
        );
      }

      V = conversions["boolean"](V, {
        context: "Failed to set the 'unscopableTest' property on 'Unscopable': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["unscopableTest"] = V;
    }

    get unscopableMixin() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get unscopableMixin' called on an object that is not a valid instance of Unscopable."
        );
      }

      return esValue[implSymbol]["unscopableMixin"];
    }

    set unscopableMixin(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set unscopableMixin' called on an object that is not a valid instance of Unscopable."
        );
      }

      V = conversions["boolean"](V, {
        context: "Failed to set the 'unscopableMixin' property on 'Unscopable': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["unscopableMixin"] = V;
    }
  }
  Object.defineProperties(Unscopable.prototype, {
    unscopableTest: { enumerable: true },
    unscopableMixin: { enumerable: true },
    [Symbol.toStringTag]: { value: "Unscopable", configurable: true },
    [Symbol.unscopables]: {
      value: { unscopableTest: true, unscopableMixin: true, __proto__: null },
      configurable: true
    }
  });
  ctorRegistry[interfaceName] = Unscopable;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Unscopable
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
