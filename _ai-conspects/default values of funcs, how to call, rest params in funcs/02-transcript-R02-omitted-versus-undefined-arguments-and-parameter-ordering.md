# Regional transcript — R02: Omitted versus undefined arguments and parameter ordering

Conspect: `default values of funcs, how to call, rest params in funcs`  
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

JavaScript binds arguments by position, so skipping an earlier optional parameter requires an explicit placeholder.

## Skipping a position

- To use a later argument while accepting an earlier default, pass `undefined` for the earlier position.
- Passing `null` is a real value and does not mean 'use the default'.
- Many optional positional parameters become difficult to read at call sites.

## Ordering

- Place required positional parameters before optional/defaulted parameters when practical.
- A required parameter can technically follow a defaulted one, but callers must pass `undefined` to reach it.
- Use an options object when several optional values exist or order is not naturally memorable.

## Options-object pattern

- Destructure defaults from an object parameter.
- The call site names each option, improving readability.
- Default the object itself when the whole argument may be omitted.

## Caveats

- Destructuring `undefined` without a default object throws.
- Changing positional parameter order is a breaking API change.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-002, IU-003
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
