# Regional transcript — R02: RegExp constructor, escaping and dynamic patterns

Conspect: `js regex`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The `RegExp` constructor is required when the pattern or flags are assembled at runtime.

## Literal versus constructor

- A regex literal is parsed with the JavaScript source.
- `new RegExp(pattern, flags)` compiles a runtime string.
- Constructor strings pass through JavaScript string escaping before regex parsing.

## Double escaping

- A regex backslash often needs to be doubled inside an ordinary string.
- For example, a digit token written as a string requires `\d`.
- Raw string helpers can make large dynamic patterns easier to read.

## Escaping user input

- User-provided text must be escaped before embedding it as a literal fragment.
- Escape regex metacharacters instead of concatenating raw input.
- Do not confuse regex escaping with HTML, URL or shell escaping.

## Dynamic flags

- Flags are supplied as the constructor's second argument.
- Validate supported flags and avoid duplicates.

## Caveats

- Dynamic regexes can become denial-of-service risks when patterns permit catastrophic backtracking.
- Cache compiled expressions only when reuse is significant and stateful flags are handled safely.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-003, IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
