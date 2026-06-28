# Regional transcript — R03: Fullscreen dark-popup overlay pattern

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

A robust modal uses a dedicated overlay element or portal rather than relying on a deeply nested component pseudo-element to cover the application.

## Overlay root

- Render the backdrop near the document root or into a portal container.
- Use `position: fixed; inset: 0` and a documented application layer token.
- Place the dialog above the backdrop within the same deliberate overlay context.

## Interaction

- Lock background scrolling.
- Trap focus inside the dialog.
- Restore focus to the opener after close.
- Mark background content inert or otherwise inaccessible while the modal is active.

## Pseudo-element use

- A pseudo-element can provide a local decorative dimming layer.
- Use it only when the owning component already sits in the correct top-level layer.
- Prefer a real backdrop node when click handling, transitions or accessibility state are needed.

## Caveats

- A dark rectangle alone is not a complete modal implementation.
- Test nested transforms and mobile viewport behavior.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-001
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
