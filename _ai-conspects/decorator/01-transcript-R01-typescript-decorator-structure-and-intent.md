# Regional transcript — R01: TypeScript decorator structure and intent

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

A TypeScript decorator is a function applied to a declaration so it can observe, annotate or replace aspects of that declaration.

## Where decorators apply

- Decorator forms exist for classes, methods, accessors, properties and parameters.
- Decorator expressions are evaluated when the class declaration is processed, not when each instance is created.
- The exact signature depends on the decorated declaration and on whether legacy or modern decorator semantics are used.

## Configuration

- Legacy TypeScript decorators require the relevant compiler option.
- Metadata emission is a separate option and commonly relies on a runtime metadata shim.
- Modern ECMAScript decorators have different signatures and capabilities; do not mix the two models casually.

## Caveats

- Decorator semantics depend on the compiler mode and TypeScript version used by the project.
- A decorator should not hide essential business flow behind surprising declaration-time side effects.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-001, IU-002
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
