# Regional transcript — R02: Method wrapping, validation and argument forwarding

Conspect: `decorator`  
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

A legacy method decorator receives the target, property key and property descriptor, then can wrap `descriptor.value`.

## Validation wrapper

- Read and validate that the descriptor value is a function.
- Store the original method before replacing it.
- Create a wrapper that checks arguments and throws a domain-appropriate error when validation fails.
- Call the original with `original.apply(this, args)` so both `this` and all arguments are preserved.

## Descriptor handling

- Assign the wrapper back to `descriptor.value`.
- Return the descriptor explicitly or mutate and return nothing according to the chosen pattern.
- Preserve relevant descriptor flags.

## Typing

- Type the wrapper's `this` when possible.
- Avoid broad `any` in reusable production decorators; model the expected method signature.

## Caveats

- Arrow wrappers capture lexical `this` and are often wrong for replacing instance methods.
- Runtime decorators cannot replace compile-time type checking.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-003, IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
