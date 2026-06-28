# Regional transcript — R03: BEM organization with Sass

Conspect: `BEM`  
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

Sass nesting can reduce repetition while still emitting flat BEM selectors.

## Ampersand pattern

- Inside `.block`, use `&__element` and `&--modifier` to generate BEM class names.
- Limit nesting to name construction rather than mirroring the entire DOM tree.
- Inspect compiled CSS to ensure selectors remain simple.

## File organization

- Keep a block's base, elements and modifiers close together.
- Split very large blocks into partials only when navigation improves.
- Shared design tokens and utilities should stay outside component-specific BEM names.

## Composition

- An HTML node may carry classes from two blocks when it participates in two responsibilities.
- Avoid Sass `@extend` chains that create large coupled selectors; mixins or utilities are often more predictable.

## Caveats

- Deep Sass nesting can recreate the specificity problems BEM was meant to avoid.
- Generated class names must still match the actual HTML contract.

## Covered source units

### Text elements

```text
T-004
```

### Screenshot uses

```text
IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
