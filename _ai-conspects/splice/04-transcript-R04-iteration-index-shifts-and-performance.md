# Regional transcript — R04: Iteration index shifts, backward removal and performance

Conspect: `splice`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Removing elements while iterating changes later indices. Direction and data size determine whether a loop is correct and efficient.

## Forward-loop bug

- After removing index `i`, the next element shifts into index `i`.
- A normal `i++` then skips that shifted element.
- This is especially visible when adjacent elements both match the removal predicate.

## Correct approaches

- Iterate backward so removals only affect indices already processed.
- In a forward loop, decrement the index after removal.
- Use `filter` to build a new array when immutable semantics are preferred.
- For in-place compaction, use separate read and write indices and truncate once.

## Performance near the start

- Removing near the beginning shifts many later elements and is linear in array length.
- Repeated front removals can become quadratic.
- For queue behavior, prefer a deque/ring buffer or maintain a logical start index.
- For bulk deletion, filter or compact once instead of many separate splices.

## Choosing mutation

- Use splice when array identity must be preserved or an isolated local mutation is simplest.
- Use immutable operations for React/Redux state and memoized data flows.
- Document in-place behavior in shared utility functions.

## Caveats

- Benchmark the whole algorithm, not one splice call.
- Sparse arrays and holes have additional behavior that should be tested when relevant.

## Covered source units

### Text elements

```text
T-010, T-011
```

### Screenshot uses

```text
IU-014, IU-015, IU-016, IU-017, IU-018, IU-019
```

Exact code and original wording remain available in the SVG and closed ledgers.
