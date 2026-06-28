# Full combined final transcript — js regex

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 1 / 1
unique screenshots: 5 / 5
screenshot uses: 5 / 5
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — JavaScript regex operation comparison

JavaScript exposes matching operations on both strings and `RegExp` objects; each returns a different shape.

### String methods

- `match` returns match data and behaves differently with the global flag.
- `matchAll` returns an iterator of all matches and requires a global regex.
- `search` returns the first match index or `-1`.
- `replace` and `replaceAll` transform matched text.
- `split` can use a regex delimiter.

### RegExp methods

- `test` returns a boolean.
- `exec` returns one detailed match and can iterate with a global or sticky regex.
- Global/sticky expressions maintain `lastIndex`, so repeated calls are stateful.

### Choosing

- Use `test` for existence.
- Use `search` for an index.
- Use `matchAll` for all groups across all matches.
- Use `exec` when manual stateful iteration or sticky matching is needed.

### Caveats

- Reusing a global regex with `test` can alternate results because `lastIndex` changes.
- Reset or isolate stateful regex instances when shared.

## R02 — RegExp constructor, escaping and dynamic patterns

The `RegExp` constructor is required when the pattern or flags are assembled at runtime.

### Literal versus constructor

- A regex literal is parsed with the JavaScript source.
- `new RegExp(pattern, flags)` compiles a runtime string.
- Constructor strings pass through JavaScript string escaping before regex parsing.

### Double escaping

- A regex backslash often needs to be doubled inside an ordinary string.
- For example, a digit token written as a string requires `\d`.
- Raw string helpers can make large dynamic patterns easier to read.

### Escaping user input

- User-provided text must be escaped before embedding it as a literal fragment.
- Escape regex metacharacters instead of concatenating raw input.
- Do not confuse regex escaping with HTML, URL or shell escaping.

### Dynamic flags

- Flags are supplied as the constructor's second argument.
- Validate supported flags and avoid duplicates.

### Caveats

- Dynamic regexes can become denial-of-service risks when patterns permit catastrophic backtracking.
- Cache compiled expressions only when reuse is significant and stateful flags are handled safely.

## R03 — Flags, groups and practical matching examples

Flags change how the engine interprets and iterates the pattern; groups capture structure from a match.

### Common flags

- `g` finds all matches and makes `exec`/`test` stateful.
- `i` enables case-insensitive matching.
- `m` changes line-anchor behavior.
- `s` lets dot match line terminators.
- `u` enables Unicode-aware parsing semantics.
- `y` requires matching exactly at `lastIndex`.
- `d` exposes match indices in supporting engines.

### Groups

- Parentheses capture by numeric index.
- Named groups provide stable semantic names.
- Non-capturing groups `(?:...)` group alternatives without storing a result.
- Backreferences require the captured text to repeat.

### Practical patterns

- Anchor complete-value validation with start and end boundaries.
- Prefer small readable expressions over one monolithic pattern.
- Keep parsing and validation separate when business rules exceed regex readability.

### Caveats

- Case-insensitive Unicode behavior can be surprising across languages.
- Regex is unsuitable for parsing deeply nested grammars.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 0 | 2 | 2 | 0 | 0 |
| R02 | 1 | 2 | 2 | 0 | 0 |
| R03 | 0 | 1 | 1 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
