# TypeScript bindings generator for Web IDL

This package parses Web IDL definitions and emits modern ESM-first TypeScript declaration modules.
Each generated file is a standalone `.ts` module that exports the declarations for a single IDL type,
plus an `index.ts` barrel and a `globals.ts` fallback module for unresolved external references.

## Example

Given the Web IDL definition:

```webidl
[Exposed=Window]
interface SomeInterface {
  constructor(unsigned long seed);
  readonly attribute DOMString label;
  unsigned long long add(unsigned long x, unsigned long y);
};
```

The generator emits TypeScript similar to:

```ts
export interface SomeInterface {
  readonly label: string;
  add(x: number, y: number): number;
}

export interface SomeInterfaceConstructor {
  readonly prototype: SomeInterface;
  new(seed: number): SomeInterface;
}

export declare const SomeInterface: SomeInterfaceConstructor;
```

## Usage

```js
import Transformer from "webidl2js";

const transformer = new Transformer();
transformer.addSource("idl", "impls");
await transformer.generate("types");
```

`addSource()` accepts either a single `.webidl` file or a directory containing `.webidl` files. The
second argument is retained for API compatibility, but it is not used by the declaration generator.

## Output

For every parsed IDL construct, the generator emits one `.ts` module:

- interfaces and callback interfaces become exported TypeScript interfaces
- dictionaries become exported TypeScript interfaces
- callbacks and typedefs become exported type aliases
- enums become exported string-literal unions
- iterable declarations become `IterableIterator`/`AsyncIterableIterator` members
- partial interfaces, partial dictionaries, and mixins are merged before emission
- `includes` statements are represented as TypeScript interface inheritance

The generator also emits:

- `globals.ts` for unresolved external references
- `index.ts` that re-exports every generated module

## Development

```sh
npm install
npm test
npm run lint
```

Use `npm run update-snapshots` to refresh the fixture snapshots after changing the emitted output.
