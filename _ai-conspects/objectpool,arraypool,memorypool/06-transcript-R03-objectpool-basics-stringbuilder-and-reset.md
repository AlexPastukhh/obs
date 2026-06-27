# Regional transcript — R03: ObjectPool basics, StringBuilder pooling and reset behavior

Conspect: `objectpool,arraypool,memorypool`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 11 / 11
unique screenshots represented: 11
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`ObjectPool<T>` offers `Get` and `Return`. The main correctness work is making the reset boundary explicit.

## Basic pattern

- Acquire with `Get`, use the instance, then return it in `finally`.
- The pool can create additional instances when empty; it is not a fixed-size semaphore.
- Only a bounded number of returned instances are retained.

## StringBuilder

- String builders are common pool candidates because repeated formatting can allocate internal character arrays.
- Clear the builder before reuse.
- Reject builders whose capacity exceeds a configured maximum to avoid retaining one very large buffer.

## Benefits

- Pooling can reduce allocation rate and GC pressure in measured hot paths.
- It can also preserve expensive initialized state.
- The benefit should be measured because pool synchronization and reset work are not free.

## Avoid messy arguments

- Wrap acquisition and return in a focused helper or service rather than passing pool internals through many layers.
- Keep object lifetime within a clear lexical scope.

## Caveats

- Never keep references to pooled state after return.
- Reset must remove secrets, references and request-specific data.

## Nearby source labels

- !!!
- AVOID MESSY ARGS
- what objects good for pooling
- what do you gain
- provider.create
- basics,
- OBJECTPOOL

## Covered screenshot uses

```text
IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-032, IU-033, IU-034, IU-035
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
