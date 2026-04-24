# TypeScript Web IDL runtime generator

This package preserves the original `webidl2js` runtime-wrapper generator model, but ports the codebase and generated output to modern TypeScript modules.

Given Web IDL input and optional implementation files, it generates runtime wrapper modules that:

- perform Web IDL argument conversion and brand checks
- expose the same helper exports as the original wrapper generator
- use explicit `.ts` module specifiers throughout generated TypeScript
- fall back to generated stub implementations when an implementation file is not present

## Example

```webidl
[Exposed=Window]
interface SomeInterface {
  constructor();
  unsigned long long add(unsigned long x, unsigned long y);
};
```

```ts
export class SomeInterfaceImpl {
  add(x: number, y: number) {
    return x + y;
  }
}
```

```ts
import Transformer from "webidl2js";

const transformer = new Transformer({ implSuffix: "-impl" });
transformer.addSource("idl", "impls");
await transformer.generate("wrappers");
```

The generated output is TypeScript runtime code, not declarations-only output.

## Development

The repository is configured around Deno tasks:

```sh
deno task fmt
deno task lint
deno task check
deno task test
```

When you need to refresh the generated fixture snapshots, run:

```sh
UPDATE_SNAPSHOTS=1 deno task test
```
