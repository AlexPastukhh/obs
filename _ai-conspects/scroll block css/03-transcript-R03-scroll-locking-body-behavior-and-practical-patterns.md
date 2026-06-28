# Regional transcript — R03: Scroll locking, body behavior and practical patterns

Conspect: `scroll block css`  
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

Scroll locking prevents the background document from moving while a modal or overlay owns interaction.

## Basic body lock

- Temporarily set the document body's overflow to hidden while the modal is open.
- Restore the previous inline style during cleanup rather than assuming it was empty.
- Reference-count or centralize locks when several overlays can be open at once.

## Preventing layout shift

- Removing the scrollbar can widen the viewport and shift centered content.
- Measure the scrollbar gap and compensate with padding when visual stability matters.
- `scrollbar-gutter: stable` can reserve space in supporting browsers.

## Mobile behavior

- iOS-style viewport scrolling can require preserving the current scroll position and fixing the body.
- Restore the previous position after unlocking.
- Keep the overlay itself scrollable when its content exceeds the viewport.

## Lifecycle

- Apply and remove the lock in the component/effect lifecycle.
- Always clean up on unmount and navigation.
- Trap focus and mark background content inert in addition to locking scroll.

## Caveats

- Scroll locking alone does not make a modal accessible.
- Avoid blanket wheel/touchmove prevention because it can also block the modal's own scrolling.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-005, IU-006
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
