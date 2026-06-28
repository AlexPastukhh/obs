# Full combined final transcript — pseudoel, pseudo with parents stacking context, darp popup on full screen pseudo el

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 1 / 1
unique screenshots: 3 / 3
screenshot uses: 3 / 3
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Pseudo-element positioning and geometry

A `::before` or `::after` pseudo-element is generated as a child-like box of its originating element and can be positioned independently.

### Creation

- Set `content` for generated pseudo-elements that need a box.
- Use `position: absolute` with an intended containing block.
- Set the origin element or another ancestor to `position: relative` when that ancestor should provide the coordinates.

### Fullscreen geometry

- `position: fixed` plus `inset: 0` covers the viewport when no ancestor changes the fixed containing block.
- An absolute pseudo-element with `inset: 0` covers its containing block, not automatically the viewport.
- Viewport units can size the box but do not solve stacking or containing-block issues alone.

### Caveats

- Pseudo-elements cannot be moved to another DOM parent or portal root.
- Transforms can change containing-block behavior for fixed descendants.

## R02 — Parent stacking-context interaction

A pseudo-element cannot escape the stacking context created by its originating element or an ancestor.

### Local z-index

- The pseudo-element's `z-index` is compared inside its current stacking context.
- A very large value cannot outrank a sibling stacking context whose parent layer already wins.
- Opacity, transform, filter, isolation and positioned non-auto z-index values commonly create contexts.

### Diagnosis

- Walk from the pseudo-element's owner to the root and list every stacking-context ancestor.
- Compare the first ancestor contexts that are siblings.
- Remove accidental triggers or move the overlay responsibility higher in the DOM.

### Clipping

- Overflow, masks, clip paths and containment can clip the pseudo-element independently of z-index.
- Test clipping and stacking as separate causes.

### Caveats

- Negative z-index can place the pseudo-element behind its owner's background.
- Pointer-event behavior should be set intentionally.

## R03 — Fullscreen dark-popup overlay pattern

A robust modal uses a dedicated overlay element or portal rather than relying on a deeply nested component pseudo-element to cover the application.

### Overlay root

- Render the backdrop near the document root or into a portal container.
- Use `position: fixed; inset: 0` and a documented application layer token.
- Place the dialog above the backdrop within the same deliberate overlay context.

### Interaction

- Lock background scrolling.
- Trap focus inside the dialog.
- Restore focus to the opener after close.
- Mark background content inert or otherwise inaccessible while the modal is active.

### Pseudo-element use

- A pseudo-element can provide a local decorative dimming layer.
- Use it only when the owning component already sits in the correct top-level layer.
- Prefer a real backdrop node when click handling, transitions or accessibility state are needed.

### Caveats

- A dark rectangle alone is not a complete modal implementation.
- Test nested transforms and mobile viewport behavior.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 0 | 1 | 1 | 0 | 0 |
| R02 | 1 | 1 | 1 | 0 | 0 |
| R03 | 0 | 1 | 1 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
