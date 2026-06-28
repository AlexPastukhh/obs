# Regional transcript — R01: BEM block fundamentals

Conspect: `BEM`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

BEM names a standalone UI component as a block and uses class names that communicate component structure without depending on DOM nesting.

## Block

- A block represents an independent reusable component such as `card`, `menu` or `search-form`.
- The block class owns the component's base appearance.
- Choose names by responsibility rather than visual position, such as `header-left`.

## Flat selectors

- BEM favors direct class selectors over long descendant chains.
- Low specificity makes overrides and composition more predictable.
- Markup can change without rewriting selectors that were coupled to a deep hierarchy.

## Independence

- A block should remain usable in different containers.
- External layout is often handled by a parent layout class or mix rather than hidden inside the block.

## Caveats

- BEM is a naming methodology, not a runtime framework.
- Do not create a new block for every single HTML node.

## Covered source units

### Text elements

```text
T-001, T-002, T-003
```

### Screenshot uses

```text
IU-001
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
