# Regional transcript — R03: Deterministic alternatives to XOR

Conspect: `xor operator`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

When correctness matters more than a tiny order-independent combiner, normalize the collection and use a conventional ordered hash or explicit equality comparison.

## Sort then hash

- Sort elements by a deterministic comparer.
- Feed each normalized element into an ordinary order-sensitive hash combiner.
- Include separators, type information or structured serialization when concatenation could be ambiguous.
- This is straightforward but costs sorting time.

## Sort then compare

- For equality, normalize both sequences and compare element by element.
- When duplicates should be ignored, distinct the values before sorting.
- When duplicate counts matter, preserve them or compare grouped counts.

## Counting alternative

- Build a dictionary from value to frequency.
- Compare key sets and counts explicitly.
- This is order-independent without relying on collision-prone XOR cancellation.
- A frequency map often has linear expected time and does not require sorting.

## HashSet alternative

- Use `HashSet.SetEquals` when the intended semantics are mathematical set equality.
- A set deliberately ignores order and duplicates.
- Do not substitute set equality when the original data is a multiset or sequence.

## Decision guide

- Set semantics: use a set and `SetEquals`.
- Multiset semantics: compare frequency maps.
- Deterministic cache key: canonicalize and hash a stable representation.
- Security/integrity: use a cryptographic hash over canonical data.

## Caveats

- Sorting requires a stable total ordering for deterministic cross-process output.
- Framework hash functions may be randomized across processes and should not be persisted as stable IDs.

## Covered source units

### Text elements

```text
T-002
```

### Screenshot uses

```text
IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011
```

Exact code and original wording remain available in the SVG and closed ledgers.
