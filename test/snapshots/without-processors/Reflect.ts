// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Reflect";

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
  throw new globalObject.TypeError(`${context} is not of type 'Reflect'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["Reflect"].prototype;
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
  class Reflect {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    get reflectedBoolean() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get reflectedBoolean' called on an object that is not a valid instance of Reflect."
        );
      }

      return esValue[implSymbol]["reflectedBoolean"];
    }

    set reflectedBoolean(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set reflectedBoolean' called on an object that is not a valid instance of Reflect."
        );
      }

      V = conversions["boolean"](V, {
        context: "Failed to set the 'reflectedBoolean' property on 'Reflect': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["reflectedBoolean"] = V;
    }

    get reflectedDOMString() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get reflectedDOMString' called on an object that is not a valid instance of Reflect."
        );
      }

      return esValue[implSymbol]["reflectedDOMString"];
    }

    set reflectedDOMString(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set reflectedDOMString' called on an object that is not a valid instance of Reflect."
        );
      }

      V = conversions["DOMString"](V, {
        context: "Failed to set the 'reflectedDOMString' property on 'Reflect': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["reflectedDOMString"] = V;
    }

    get reflectedLong() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get reflectedLong' called on an object that is not a valid instance of Reflect."
        );
      }

      return esValue[implSymbol]["reflectedLong"];
    }

    set reflectedLong(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set reflectedLong' called on an object that is not a valid instance of Reflect."
        );
      }

      V = conversions["long"](V, {
        context: "Failed to set the 'reflectedLong' property on 'Reflect': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["reflectedLong"] = V;
    }

    get reflectedUnsignedLong() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get reflectedUnsignedLong' called on an object that is not a valid instance of Reflect."
        );
      }

      return esValue[implSymbol]["reflectedUnsignedLong"];
    }

    set reflectedUnsignedLong(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set reflectedUnsignedLong' called on an object that is not a valid instance of Reflect."
        );
      }

      V = conversions["unsigned long"](V, {
        context: "Failed to set the 'reflectedUnsignedLong' property on 'Reflect': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["reflectedUnsignedLong"] = V;
    }

    get reflectedUSVStringURL() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get reflectedUSVStringURL' called on an object that is not a valid instance of Reflect."
        );
      }

      return esValue[implSymbol]["reflectedUSVStringURL"];
    }

    set reflectedUSVStringURL(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set reflectedUSVStringURL' called on an object that is not a valid instance of Reflect."
        );
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'reflectedUSVStringURL' property on 'Reflect': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["reflectedUSVStringURL"] = V;
    }

    get reflectionTest() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get reflectionTest' called on an object that is not a valid instance of Reflect."
        );
      }

      return esValue[implSymbol]["reflectionTest"];
    }

    set reflectionTest(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set reflectionTest' called on an object that is not a valid instance of Reflect."
        );
      }

      V = conversions["DOMString"](V, {
        context: "Failed to set the 'reflectionTest' property on 'Reflect': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["reflectionTest"] = V;
    }

    get withUnderscore() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'get withUnderscore' called on an object that is not a valid instance of Reflect."
        );
      }

      return esValue[implSymbol]["withUnderscore"];
    }

    set withUnderscore(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'set withUnderscore' called on an object that is not a valid instance of Reflect."
        );
      }

      V = conversions["DOMString"](V, {
        context: "Failed to set the 'withUnderscore' property on 'Reflect': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["withUnderscore"] = V;
    }
  }
  Object.defineProperties(Reflect.prototype, {
    reflectedBoolean: { enumerable: true },
    reflectedDOMString: { enumerable: true },
    reflectedLong: { enumerable: true },
    reflectedUnsignedLong: { enumerable: true },
    reflectedUSVStringURL: { enumerable: true },
    reflectionTest: { enumerable: true },
    withUnderscore: { enumerable: true },
    [Symbol.toStringTag]: { value: "Reflect", configurable: true }
  });
  ctorRegistry[interfaceName] = Reflect;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Reflect
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
