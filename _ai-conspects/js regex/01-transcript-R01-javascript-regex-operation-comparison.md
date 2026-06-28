# Regional transcript — R01: JavaScript regex operation comparison

Conspect: `js regex`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

JavaScript exposes matching operations on both strings and `RegExp` objects; each returns a different shape.

## String methods

- `match` returns match data and behaves differently with the global flag.
- `matchAll` returns an iterator of all matches and requires a global regex.
- `search` returns the first match index or `-1`.
- `replace` and `replaceAll` transform matched text.
- `split` can use a regex delimiter.

## RegExp methods

- `test` returns a boolean.
- `exec` returns one detailed match and can iterate with a global or sticky regex.
- Global/sticky expressions maintain `lastIndex`, so repeated calls are stateful.

## Choosing

- Use `test` for existence.
- Use `search` for an index.
- Use `matchAll` for all groups across all matches.
- Use `exec` when manual stateful iteration or sticky matching is needed.

## Caveats

- Reusing a global regex with `test` can alternate results because `lastIndex` changes.
- Reset or isolate stateful regex instances when shared.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-001, IU-005
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
