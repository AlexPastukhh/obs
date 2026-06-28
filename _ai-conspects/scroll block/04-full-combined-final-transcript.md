# Full combined final transcript — scroll block

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 0 / 0
unique screenshots: 6 / 6
screenshot uses: 6 / 6
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Scroll-container and overflow fundamentals

Scrolling is created by an element whose content is larger than its constrained box and whose overflow policy permits scrolling.

### Creating a scroll container

- Constrain the relevant axis with a fixed size, max size, grid/flex constraint or viewport-relative size.
- Use `overflow: auto` to show scrolling only when content overflows.
- Use `overflow-y: auto` or `overflow-x: auto` when only one axis should scroll.
- `overflow: scroll` reserves a scrolling mechanism even when the content currently fits.

### Layout interactions

- Flex and grid children may need `min-height: 0` or `min-width: 0` before they can shrink and become scroll containers.
- A parent with unconstrained height cannot produce an internal vertical scrollbar merely from `overflow-y: auto`.
- Nested scroll areas should be introduced deliberately because wheel, touch and keyboard input can become confusing.

### Accessibility

- Scrollable content must remain reachable with keyboard and assistive technology.
- Do not remove focus indicators from controls inside the scroll area.
- Prefer a visible indication that more content is available.

### Caveats

- Overflow clipping and scrollability are different concerns.
- Test touch, keyboard and reduced-motion behavior, not only mouse-wheel scrolling.

## R02 — Scrollbar hiding and cross-browser CSS

A scrollbar can be visually hidden while preserving scrolling, but browser-specific properties and accessibility tradeoffs must be considered.

### Cross-browser rules

- Firefox supports `scrollbar-width: none`.
- Legacy Microsoft engines used `-ms-overflow-style: none`.
- WebKit/Blink expose scrollbar pseudo-elements such as `::-webkit-scrollbar`.
- Keep `overflow: auto` or `scroll`; hiding the visual track must not accidentally disable scrolling.

### Styling instead of hiding

- `scrollbar-color` and `scrollbar-width` provide limited standardized styling in supporting browsers.
- WebKit scrollbar pseudo-elements allow deeper styling but are non-standard and should be progressive enhancement.
- A narrow, visible scrollbar often gives better discoverability than a completely hidden one.

### When hiding is appropriate

- Carousels and horizontally draggable chips can hide the bar when another strong affordance exists.
- Overlay panels may hide native chrome while retaining wheel, touch and keyboard movement.
- Document-style long content should usually keep a visible scrollbar.

### Caveats

- Hidden scrollbars can make content appear truncated.
- Operating-system overlay scrollbar settings can change the observed result.

## R03 — Scroll locking, body behavior and practical patterns

Scroll locking prevents the background document from moving while a modal or overlay owns interaction.

### Basic body lock

- Temporarily set the document body's overflow to hidden while the modal is open.
- Restore the previous inline style during cleanup rather than assuming it was empty.
- Reference-count or centralize locks when several overlays can be open at once.

### Preventing layout shift

- Removing the scrollbar can widen the viewport and shift centered content.
- Measure the scrollbar gap and compensate with padding when visual stability matters.
- `scrollbar-gutter: stable` can reserve space in supporting browsers.

### Mobile behavior

- iOS-style viewport scrolling can require preserving the current scroll position and fixing the body.
- Restore the previous position after unlocking.
- Keep the overlay itself scrollable when its content exceeds the viewport.

### Lifecycle

- Apply and remove the lock in the component/effect lifecycle.
- Always clean up on unmount and navigation.
- Trap focus and mark background content inert in addition to locking scroll.

### Caveats

- Scroll locking alone does not make a modal accessible.
- Avoid blanket wheel/touchmove prevention because it can also block the modal's own scrolling.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 0 | 2 | 2 | 0 | 0 |
| R02 | 0 | 2 | 2 | 0 | 0 |
| R03 | 0 | 2 | 2 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
