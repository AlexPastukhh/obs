# Full combined final transcript — default values of funcs, how to call, rest params in funcs

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

## R01 — Default function parameters and invocation

JavaScript default parameters provide a value when the corresponding argument is omitted or explicitly `undefined`.

### Declaration

- Write a default expression in the parameter list, such as `function greet(name = 'Guest')`.
- Defaults are evaluated at call time, not once when the function is defined.
- A default can refer to earlier parameters.
- Later parameters are not safely available to earlier default expressions.

### Calling

- Calling with fewer arguments activates defaults for missing positions.
- Passing `undefined` also activates the default.
- Passing `null`, `false`, `0` or an empty string does not activate it.

### Evaluation

- Default expressions can call functions or create objects.
- Because evaluation happens per invocation, mutable default objects are not accidentally shared as in some other languages.

### Caveats

- Side effects in default expressions make calls harder to reason about.
- Function `.length` stops counting at the first parameter with a default.

## R02 — Omitted versus undefined arguments and parameter ordering

JavaScript binds arguments by position, so skipping an earlier optional parameter requires an explicit placeholder.

### Skipping a position

- To use a later argument while accepting an earlier default, pass `undefined` for the earlier position.
- Passing `null` is a real value and does not mean 'use the default'.
- Many optional positional parameters become difficult to read at call sites.

### Ordering

- Place required positional parameters before optional/defaulted parameters when practical.
- A required parameter can technically follow a defaulted one, but callers must pass `undefined` to reach it.
- Use an options object when several optional values exist or order is not naturally memorable.

### Options-object pattern

- Destructure defaults from an object parameter.
- The call site names each option, improving readability.
- Default the object itself when the whole argument may be omitted.

### Caveats

- Destructuring `undefined` without a default object throws.
- Changing positional parameter order is a breaking API change.

## R03 — Rest parameters, spread calls and argument collection

A rest parameter gathers remaining arguments into a real array, while spread expands an iterable into individual call arguments.

### Rest parameter

- Declare one final parameter with `...args`.
- The rest parameter must be last and only one rest parameter is allowed.
- It receives a normal array and supports array methods directly.
- Earlier named parameters consume their positions before the remaining arguments are collected.

### Spread at call sites

- Use `fn(...values)` to pass array elements as separate arguments.
- Spread can be combined with explicit arguments before or after it.
- Very large spreads can exceed engine argument-count limits.

### Rest versus arguments

- Rest parameters are explicit, scoped and available in arrow functions.
- The legacy `arguments` object contains all arguments but is array-like rather than a true array.
- Prefer rest parameters in modern code.

### Caveats

- Rest parameter syntax and object rest syntax are related but operate in different contexts.
- Use an array parameter instead when the conceptual input is one collection rather than variadic arguments.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 0 | 2 | 2 | 0 | 0 |
| R02 | 0 | 2 | 2 | 0 | 0 |
| R03 | 1 | 1 | 1 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
