# Stage 0 — Source Check / Materialization

Generated: 2026-06-20 08:40:16 UTC

## Repository precheck

No matching `CURRENT_SOURCE_OF_TRUTH.md` was found on
`ai-processed-conspects-text` under the plausible slugs checked for this source:

- `csharp-linq-join-groupjoin-groupby-selectmany`
- `csharp-linq-join-groupjoin-groupby-selectmany-second-callback`
- `linq-join-groupjoin-groupby-selectmany`
- `linq-join-groupjoin-groupby-selectmany-selectmany-second-callback`

The similarly named existing LINQ query-syntax conspect is a different source
and does not cover this Join / GroupJoin / GroupBy / SelectMany canvas.

## Source summary

```text
Original source: linq join groupjoin groupby selectmany,selectmany second callback.svg
ViewBox: 0 0 7155.245278600958 6731.465181355952
Image definitions: 29
Image uses: 29
Text labels: 10
Duplicate image-use groups: 0
```

## Text preview

```text
T-001: collection, can run linq
T-002: selectmany builds flattened collection in first
T-003: callback and it may return it without secodn
T-004: second callback allows to build result for each
T-005: of the item of first callbacks result + from the items
T-006: to which itmes from first callback belong
T-007: join
T-008: groupjoin
T-009: group by
T-010: selectmany
```

## Provisional regions

- `LJG01` — Join and GroupJoin semantics (**provisional only; Stage1 must verify visually**)
- `LJG02` — GroupBy grouping and result shape (**provisional only; Stage1 must verify visually**)
- `LJG03` — SelectMany flattening and result-selector callback (**provisional only; Stage1 must verify visually**)

## Current status

```text
Stage0 source materialization: completed
Stage1 visual boundary review: not started
Transcript: not started
Processed source images: 0/29
```

## Next

Stage1 boundary review must visually inspect every source image, verify or
change the provisional regions, create the image-review ledger and assign all
source/text items before transcript work.
