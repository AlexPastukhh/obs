# Full combined final transcript — BEM

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 4 / 4
unique screenshots: 4 / 4
screenshot uses: 4 / 4
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — BEM block fundamentals

BEM names a standalone UI component as a block and uses class names that communicate component structure without depending on DOM nesting.

### Block

- A block represents an independent reusable component such as `card`, `menu` or `search-form`.
- The block class owns the component's base appearance.
- Choose names by responsibility rather than visual position, such as `header-left`.

### Flat selectors

- BEM favors direct class selectors over long descendant chains.
- Low specificity makes overrides and composition more predictable.
- Markup can change without rewriting selectors that were coupled to a deep hierarchy.

### Independence

- A block should remain usable in different containers.
- External layout is often handled by a parent layout class or mix rather than hidden inside the block.

### Caveats

- BEM is a naming methodology, not a runtime framework.
- Do not create a new block for every single HTML node.

## R02 — Element and modifier naming

Elements belong to a block; modifiers describe alternative state, appearance or behavior.

### Elements

- Use `block__element` for a meaningful part that has no standalone identity in this context.
- Keep element names relative to the block, not chained through every nesting level.
- Prefer `card__title` over `card__body__header__title`.

### Modifiers

- Use `block--modifier` or `block__element--modifier` according to the project's chosen convention.
- Modifiers complement the base class rather than replacing it.
- Use modifiers for variants such as size, theme or state that are part of the component API.

### State classes

- Short state classes such as `is-active` can be used when the team distinguishes transient state from BEM modifiers.
- Choose one convention and document it.

### Caveats

- Do not encode every data value into a class name.
- Avoid mixing incompatible BEM separator conventions in one codebase.

## R03 — BEM organization with Sass

Sass nesting can reduce repetition while still emitting flat BEM selectors.

### Ampersand pattern

- Inside `.block`, use `&__element` and `&--modifier` to generate BEM class names.
- Limit nesting to name construction rather than mirroring the entire DOM tree.
- Inspect compiled CSS to ensure selectors remain simple.

### File organization

- Keep a block's base, elements and modifiers close together.
- Split very large blocks into partials only when navigation improves.
- Shared design tokens and utilities should stay outside component-specific BEM names.

### Composition

- An HTML node may carry classes from two blocks when it participates in two responsibilities.
- Avoid Sass `@extend` chains that create large coupled selectors; mixins or utilities are often more predictable.

### Caveats

- Deep Sass nesting can recreate the specificity problems BEM was meant to avoid.
- Generated class names must still match the actual HTML contract.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 3 | 1 | 1 | 0 | 0 |
| R02 | 0 | 2 | 2 | 0 | 0 |
| R03 | 1 | 1 | 1 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
