# Regional transcript — R02: Element and modifier naming

Conspect: `BEM`  
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

Elements belong to a block; modifiers describe alternative state, appearance or behavior.

## Elements

- Use `block__element` for a meaningful part that has no standalone identity in this context.
- Keep element names relative to the block, not chained through every nesting level.
- Prefer `card__title` over `card__body__header__title`.

## Modifiers

- Use `block--modifier` or `block__element--modifier` according to the project's chosen convention.
- Modifiers complement the base class rather than replacing it.
- Use modifiers for variants such as size, theme or state that are part of the component API.

## State classes

- Short state classes such as `is-active` can be used when the team distinguishes transient state from BEM modifiers.
- Choose one convention and document it.

## Caveats

- Do not encode every data value into a class name.
- Avoid mixing incompatible BEM separator conventions in one codebase.

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
