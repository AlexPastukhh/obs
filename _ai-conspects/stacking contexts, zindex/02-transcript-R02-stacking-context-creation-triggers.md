# Regional transcript — R02: Stacking-context creation triggers

Conspect: `stacking contexts, zindex`  
Generated: 2026-06-28 03:00:00 UTC

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

A stacking context is an isolated painting group. Several CSS properties create one even when no explicit `z-index` is present.

## Common triggers

- The root element establishes the root stacking context.
- Positioned elements with a non-auto `z-index` create a context.
- `position: fixed` and `position: sticky` create stacking contexts.
- An opacity value below 1 creates a context.
- Transforms, filters, perspective and several compositing properties create contexts.
- `isolation: isolate` creates an explicit context.
- Certain containment, masking, clipping and blending configurations also create contexts.
- Flex/grid items with non-auto `z-index` create contexts.

## Why triggers matter

- A property added for animation or visual effects can unexpectedly change the layer hierarchy.
- A parent transform is a common reason a modal or pseudo-element no longer overlays content outside that parent.
- Removing a trigger or moving the overlay to a higher layer root can be more correct than increasing `z-index`.

## Debugging checklist

- Walk from the problem element to the root.
- Record every ancestor that creates a stacking context.
- At the first diverging sibling contexts, compare their painting order and `z-index`.
- Only after the parent context wins does the child's own `z-index` matter.

## Caveats

- The complete trigger list evolves with CSS features; inspect computed styles.
- A stacking context is not the same as a containing block, though one property can create both.

## Covered source units

### Text elements

```text
T-003
```

### Screenshot uses

```text
IU-003
```

Exact code and original wording remain available in the SVG and closed ledgers.
