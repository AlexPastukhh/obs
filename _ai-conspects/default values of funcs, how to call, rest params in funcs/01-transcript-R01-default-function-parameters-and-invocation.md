# Regional transcript — R01: Default function parameters and invocation

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

JavaScript default parameters provide a value when the corresponding argument is omitted or explicitly `undefined`.

## Declaration

- Write a default expression in the parameter list, such as `function greet(name = 'Guest')`.
- Defaults are evaluated at call time, not once when the function is defined.
- A default can refer to earlier parameters.
- Later parameters are not safely available to earlier default expressions.

## Calling

- Calling with fewer arguments activates defaults for missing positions.
- Passing `undefined` also activates the default.
- Passing `null`, `false`, `0` or an empty string does not activate it.

## Evaluation

- Default expressions can call functions or create objects.
- Because evaluation happens per invocation, mutable default objects are not accidentally shared as in some other languages.

## Caveats

- Side effects in default expressions make calls harder to reason about.
- Function `.length` stops counting at the first parameter with a default.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-004, IU-005
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
