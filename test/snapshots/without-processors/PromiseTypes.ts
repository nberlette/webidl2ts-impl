// @ts-nocheck
import * as conversions from "webidl-conversions";
import * as utils from "./utils.ts";
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "PromiseTypes";

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
  throw new globalObject.TypeError(`${context} is not of type 'PromiseTypes'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["PromiseTypes"].prototype;
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

function getUnforgeables(globalObject) {
  let unforgeables = unforgeablesMap.get(globalObject);
  if (unforgeables === undefined) {
    unforgeables = Object.create(null);
    utils.define(unforgeables, {
      unforgeablePromiseOperation() {
        try {
          const esValue = this !== null && this !== undefined ? this : globalObject;
          if (!is(esValue)) {
            throw new globalObject.TypeError(
              "'unforgeablePromiseOperation' called on an object that is not a valid instance of PromiseTypes."
            );
          }

          return utils.tryWrapperForImpl(esValue[implSymbol].unforgeablePromiseOperation());
        } catch (e) {
          return globalObject.Promise.reject(e);
        }
      },
      get unforgeablePromiseAttribute() {
        try {
          const esValue = this !== null && this !== undefined ? this : globalObject;

          if (!is(esValue)) {
            throw new globalObject.TypeError(
              "'get unforgeablePromiseAttribute' called on an object that is not a valid instance of PromiseTypes."
            );
          }

          return utils.tryWrapperForImpl(esValue[implSymbol]["unforgeablePromiseAttribute"]);
        } catch (e) {
          return globalObject.Promise.reject(e);
        }
      }
    });
    Object.defineProperties(unforgeables, {
      unforgeablePromiseOperation: { configurable: false, writable: false },
      unforgeablePromiseAttribute: { configurable: false }
    });
    unforgeablesMap.set(globalObject, unforgeables);
  }
  return unforgeables;
}

export const _internalSetup = (wrapper, globalObject) => {
  utils.define(wrapper, getUnforgeables(globalObject));
};

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

const unforgeablesMap = new WeakMap();
const exposed = new Set(["Window"]);

export const install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class PromiseTypes {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    voidPromiseConsumer(p) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'voidPromiseConsumer' called on an object that is not a valid instance of PromiseTypes."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'voidPromiseConsumer' on 'PromiseTypes': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = new globalObject.Promise(resolve => resolve(curArg));
        args.push(curArg);
      }
      return esValue[implSymbol].voidPromiseConsumer(...args);
    }

    promiseConsumer(p) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!is(esValue)) {
        throw new globalObject.TypeError(
          "'promiseConsumer' called on an object that is not a valid instance of PromiseTypes."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'promiseConsumer' on 'PromiseTypes': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = new globalObject.Promise(resolve => resolve(curArg));
        args.push(curArg);
      }
      return esValue[implSymbol].promiseConsumer(...args);
    }

    promiseOperation() {
      try {
        const esValue = this !== null && this !== undefined ? this : globalObject;
        if (!is(esValue)) {
          throw new globalObject.TypeError(
            "'promiseOperation' called on an object that is not a valid instance of PromiseTypes."
          );
        }

        return utils.tryWrapperForImpl(esValue[implSymbol].promiseOperation());
      } catch (e) {
        return globalObject.Promise.reject(e);
      }
    }

    get promiseAttribute() {
      try {
        const esValue = this !== null && this !== undefined ? this : globalObject;

        if (!is(esValue)) {
          throw new globalObject.TypeError(
            "'get promiseAttribute' called on an object that is not a valid instance of PromiseTypes."
          );
        }

        return utils.tryWrapperForImpl(esValue[implSymbol]["promiseAttribute"]);
      } catch (e) {
        return globalObject.Promise.reject(e);
      }
    }

    static staticPromiseOperation() {
      try {
        return utils.tryWrapperForImpl(Impl.implementation.staticPromiseOperation());
      } catch (e) {
        return globalObject.Promise.reject(e);
      }
    }

    static get staticPromiseAttribute() {
      try {
        const esValue = this !== null && this !== undefined ? this : globalObject;

        return Impl.implementation["staticPromiseAttribute"];
      } catch (e) {
        return globalObject.Promise.reject(e);
      }
    }
  }
  Object.defineProperties(PromiseTypes.prototype, {
    voidPromiseConsumer: { enumerable: true },
    promiseConsumer: { enumerable: true },
    promiseOperation: { enumerable: true },
    promiseAttribute: { enumerable: true },
    [Symbol.toStringTag]: { value: "PromiseTypes", configurable: true }
  });
  Object.defineProperties(PromiseTypes, {
    staticPromiseOperation: { enumerable: true },
    staticPromiseAttribute: { enumerable: true }
  });
  ctorRegistry[interfaceName] = PromiseTypes;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: PromiseTypes
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
