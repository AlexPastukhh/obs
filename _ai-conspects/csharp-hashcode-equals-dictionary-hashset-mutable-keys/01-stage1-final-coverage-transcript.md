# Final coverage transcript - C# HashCode, Equals and mutable keys in Dictionary/HashSet

Generated: 2026-06-13 09:50:00 UTC

## Coverage statement

This pass closes all Stage0 sources: `24` image uses and `19` text labels. Stage0 inventory is used as a checklist only; wording below is based on visual/semantic boundary review of the preserved source images and labels.

## Big picture

Hash-based collections first choose a bucket from the hash code, then use equality inside that bucket. If an object used as a key mutates in a way that changes equality/hash code, the collection can no longer find it reliably.

## R01 - Mutable keys and hashtable bucket failure

Coverage: `3` image uses, `8` text labels.

Do not use objects with mutable equality/hash fields as `Dictionary` keys or `HashSet` elements. The object is inserted into a bucket based on the hash computed at insertion time.

The hashtable does not move the object when you mutate it. When you later search with the mutated object, a new hash may point to a different bucket, so lookup fails even though the same object reference is still inside the collection.

This is the bucket-failure road: compute hash once for placement, mutate, then search uses a different hash/bucket. The safe pattern is immutable keys or keys whose equality-relevant fields never change while stored.

Source labels closed in this region:

- `T001`: DONT MAKE OBJECTS WITH MUTABLE

- `T002`: PROPS - KEY OF DICT/EL OF HASHSET

- `T013`: compute hash once

- `T014`: place in bucket

- `T015`: dont recompute on mutation

- `T016`: hashtable gets different hash

- `T017`: when we pass mutated obj as key

- `T018`: searches different bucket

## R02 - Equals/GetHashCode considerations and HashCode.Combine

Coverage: `8` image uses, `5` text labels.

`Equals` and `GetHashCode` must agree: if two objects are equal, their hash codes must be equal. Unequal objects may collide, but high collision rates hurt performance.

`HashCode.Combine(...)` is the compact helper for a small fixed set of fields. Include only the fields that participate in equality, in the same conceptual identity model.

Avoid mutable fields in the hash/equality definition when the object can be used as a key. If mutability is unavoidable, remove the object from the collection before mutation and add it back after mutation.

Source labels closed in this region:

- `T003`: hashcode,hashcode

- `T004`: combine

- `T007`: some considerations

- `T008`: dont use mutable fields if obj

- `T009`: is dict key

## R03 - HashCode struct, incremental Add and null handling

Coverage: `8` image uses, `4` text labels.

`HashCode` struct supports incremental construction: create a local `HashCode`, call `Add` for each equality-relevant value, then call `ToHashCode()`.

This form is useful when the set of contributing values is conditional, long, or naturally produced by a sequence. The notes also mark that null values are handled fine by the helper/add path.

Conditional logic should be mirrored by equality. If a field sometimes contributes to hash code, the same condition must be reflected in `Equals`; otherwise equal objects may hash differently or unequal objects may compare incorrectly.

Source labels closed in this region:

- `T005`: hashcode struct

- `T006`: incr adding

- `T012`: handles null fine

- `T019`: conditional logic

## R04 - HashCode in a loop and conditional logic

Coverage: `5` image uses, `2` text labels.

For loops/sequences, do not manually combine with unstable ad-hoc formulas unless needed. Prefer the `HashCode` accumulator so each item can be added in order.

Sequence hashing is order-sensitive by default if you add elements in sequence. If order should not matter, equality and hashing need a different unordered strategy.

Source labels closed in this region:

- `T010`: hashcode in a loop

- `T011`: example

## Final audit

- Remaining unclosed image uses: `0`

- Remaining unclosed text labels: `0`

- Exact code punctuation should be corrected from the preserved screenshots/source if a verbatim study sheet is needed.
