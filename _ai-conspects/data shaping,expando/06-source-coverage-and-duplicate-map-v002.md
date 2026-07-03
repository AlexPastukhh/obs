# Data Shaping — source coverage and duplicate map v002

```text
physical placements: 72 / 72
unique raster contents: 67 / 67
non-empty SVG text nodes: 63 / 63
empty SVG text nodes recorded: 11 / 11
broken/external/dangling: 0
```

## Exact duplicate placements

- `S-037` -> `S-028`
- `S-038` -> `S-029`
- `S-039` -> `S-030`
- `S-040` -> `S-031`
- `S-064` -> `S-063`

Every physical placement remains in `data/source-placement-ledger-v002.*`. Duplicate records point to the first exact-byte placement and are not silently discarded.
