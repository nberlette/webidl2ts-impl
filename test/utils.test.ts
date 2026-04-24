// @ts-nocheck
import assert from "node:assert/strict";

import utils from "../lib/output/utils.ts";

Deno.test("utils.ts: isObject", () => {
  const primitives = [123, "string", Symbol.iterator, true, null, undefined, 123n];
  for (const primitive of primitives) {
    assert.strictEqual(utils.isObject(primitive), false);
  }
  assert.strictEqual(utils.isObject({}), true);
  assert.strictEqual(utils.isObject(() => {}), true);
});

Deno.test("utils.ts: newObjectInRealm", () => {
  const realm = { Object: function Object() {}, Array };
  const object = utils.newObjectInRealm(realm, { foo: 42 });
  assert(object instanceof realm.Object);
  assert.deepStrictEqual({ ...object }, { foo: 42 });
});

Deno.test("utils.ts: convertAsyncSequence", async () => {
  const iterable = ["a", "b"];
  const asyncSequence = utils.convertAsyncSequence(iterable, x => x);
  assert.strictEqual(asyncSequence.object, iterable);
  assert.strictEqual(asyncSequence.type, "sync");
  const iterator = asyncSequence[Symbol.asyncIterator]();
  assert.deepStrictEqual(await iterator.next(), { done: false, value: "a" });
  assert.deepStrictEqual(await iterator.next(), { done: false, value: "b" });
  assert.deepStrictEqual(await iterator.next(), { done: true, value: undefined });
});
