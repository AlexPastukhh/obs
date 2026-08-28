# Authoritative technical corrections — utility types

Status: authoritative correction companion to `01-final-transcript.md`

## TC-001 — `DeepPartial` array branch order

Scope: R04, the category-aware `DeepPartial<T>` example.

The source-shaped definition tests `ReadonlyArray<infer U>` before `Array<infer U>`:

```ts
T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : /* remaining branches */
```

A mutable `Array<T>` is assignable to `ReadonlyArray<T>`, so it matches the first branch. The later mutable-array branch is unreachable for an ordinary `Array<T>`; as written, the result is readonly.

When the intended contract must preserve mutable arrays, test the narrower mutable case first:

```ts
T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : /* remaining branches */
```

This order correction does not by itself preserve tuple positions. Tuple behavior remains a separate application-specific design choice.

## Authority boundary

This file corrects the technical interpretation of one R04 type definition. It does not replace the screenshot inventory, semantic transcript, or final coverage audit, and it introduces no additional source topic.
