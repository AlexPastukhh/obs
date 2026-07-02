# HashCode — repetition guide v002

## Core contract

```text
if a.Equals(b) is true
then a.GetHashCode() == b.GetHashCode() must be true
```

The reverse is not required:

```text
same hash does not prove equality
```

## Decision table

| Situation | Preferred approach |
|---|---|
| record with ordinary value equality | use generated equality/hash unless customization is required |
| few fixed fields | `HashCode.Combine(...)` |
| many or conditional fields | `HashCode` accumulator and `Add(...)` |
| collection/loop | accumulator |
| case-insensitive string equality | same comparer in equality and hashing |
| durable identifier | explicit ID, never GetHashCode |
| password/signature/security digest | cryptographic API, never GetHashCode |
| dictionary/hashset key | immutable equality-relevant state |

## High-value questions

1. Explain the bucket-then-equality lookup algorithm.
2. Why may unequal objects share a hash?
3. Why must equal objects never have different hashes?
4. Compare records with a custom IEquatable implementation.
5. Compare Combine with the accumulator.
6. Why must a comparer be shared by equality and hashing?
7. Why does a mutable key become “lost” without leaving the dictionary?
8. Compare sequence-, set-, and multiset-based collection identity.
9. Why is sorting used in an order-independent hash?
10. Why is repeated Combine of the previous int less expressive than HashCode.Add?
11. Why is `obj.GetHashCode()` not a durable ID?
12. Why is it not a cryptographic digest?
13. What role do collisions play?
14. How should null values be handled?
15. What must happen before mutating a key already stored in a hash collection?

## Coding prompts

1. Implement Person with case-insensitive email equality and matching hashing.
2. Implement a record whose equality excludes one property deliberately.
3. Repair an Equals/GetHashCode field mismatch.
4. Replace an old unchecked 17/23 formula with Combine.
5. Hash an ordered list of tags.
6. Hash a set-like collection with documented duplicate semantics.
7. Demonstrate a mutable-key lookup failure in a unit test.
8. Remove a key, mutate it, and safely reinsert it.
9. Write a custom `IEqualityComparer<Person>`.
10. Test that equal objects have equal hashes across many generated inputs.

## Testing checklist

```text
[ ] reflexive equality
[ ] symmetric equality
[ ] transitive equality
[ ] equal objects have equal hashes
[ ] null handling is defined
[ ] comparer semantics match
[ ] mutable key behavior is avoided/tested
[ ] ordered/unordered collection semantics are explicit
[ ] no security or persistence use of GetHashCode
```
