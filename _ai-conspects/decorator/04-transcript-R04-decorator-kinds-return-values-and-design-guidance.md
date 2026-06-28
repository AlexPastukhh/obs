# Regional transcript — R04: Decorator kinds, return values and design guidance

Conspect: `decorator`  
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

Different decorator kinds receive different inputs and have different powers to replace declarations.

## Class decorators

- Receive the constructor.
- Can return a replacement constructor in models that permit replacement.
- A replacement must preserve expected prototype and static behavior.

## Method and accessor decorators

- Receive a property descriptor.
- Can replace the descriptor or mutate its callable/get/set members.
- They are the natural fit for logging, validation, caching and authorization wrappers.

## Property and parameter decorators

- Legacy property decorators do not receive a descriptor and usually record metadata.
- Parameter decorators record metadata about a parameter index.
- Their return values are ignored under legacy behavior.

## Design guidance

- Use decorators for cross-cutting declaration concerns with a clear, testable contract.
- Keep business logic visible in ordinary functions and services.
- Test the decorated method through normal invocation and test ordering when decorators compose.

## Caveats

- Reflect-metadata-based frameworks create runtime coupling that should be explicit.
- Migrating between legacy and modern decorator semantics can require redesign, not just syntax changes.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-007
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
