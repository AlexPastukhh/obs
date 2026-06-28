# Regional transcript — R03: Flags, groups and practical matching examples

Conspect: `js regex`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Flags change how the engine interprets and iterates the pattern; groups capture structure from a match.

## Common flags

- `g` finds all matches and makes `exec`/`test` stateful.
- `i` enables case-insensitive matching.
- `m` changes line-anchor behavior.
- `s` lets dot match line terminators.
- `u` enables Unicode-aware parsing semantics.
- `y` requires matching exactly at `lastIndex`.
- `d` exposes match indices in supporting engines.

## Groups

- Parentheses capture by numeric index.
- Named groups provide stable semantic names.
- Non-capturing groups `(?:...)` group alternatives without storing a result.
- Backreferences require the captured text to repeat.

## Practical patterns

- Anchor complete-value validation with start and end boundaries.
- Prefer small readable expressions over one monolithic pattern.
- Keep parsing and validation separate when business rules exceed regex readability.

## Caveats

- Case-insensitive Unicode behavior can be surprising across languages.
- Regex is unsuitable for parsing deeply nested grammars.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-002
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
