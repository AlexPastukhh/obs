# Regional transcript — R03: Rest parameters, spread calls and argument collection

Conspect: `default values of funcs, how to call, rest params in funcs`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A rest parameter gathers remaining arguments into a real array, while spread expands an iterable into individual call arguments.

## Rest parameter

- Declare one final parameter with `...args`.
- The rest parameter must be last and only one rest parameter is allowed.
- It receives a normal array and supports array methods directly.
- Earlier named parameters consume their positions before the remaining arguments are collected.

## Spread at call sites

- Use `fn(...values)` to pass array elements as separate arguments.
- Spread can be combined with explicit arguments before or after it.
- Very large spreads can exceed engine argument-count limits.

## Rest versus arguments

- Rest parameters are explicit, scoped and available in arrow functions.
- The legacy `arguments` object contains all arguments but is array-like rather than a true array.
- Prefer rest parameters in modern code.

## Caveats

- Rest parameter syntax and object rest syntax are related but operate in different contexts.
- Use an array parameter instead when the conceptual input is one collection rather than variadic arguments.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-001
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
