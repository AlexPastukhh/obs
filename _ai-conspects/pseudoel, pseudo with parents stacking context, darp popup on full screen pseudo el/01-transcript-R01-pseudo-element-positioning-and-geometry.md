# Regional transcript — R01: Pseudo-element positioning and geometry

Conspect: `pseudoel, pseudo with parents stacking context, darp popup on full screen pseudo el`  
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

A `::before` or `::after` pseudo-element is generated as a child-like box of its originating element and can be positioned independently.

## Creation

- Set `content` for generated pseudo-elements that need a box.
- Use `position: absolute` with an intended containing block.
- Set the origin element or another ancestor to `position: relative` when that ancestor should provide the coordinates.

## Fullscreen geometry

- `position: fixed` plus `inset: 0` covers the viewport when no ancestor changes the fixed containing block.
- An absolute pseudo-element with `inset: 0` covers its containing block, not automatically the viewport.
- Viewport units can size the box but do not solve stacking or containing-block issues alone.

## Caveats

- Pseudo-elements cannot be moved to another DOM parent or portal root.
- Transforms can change containing-block behavior for fixed descendants.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-003
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
