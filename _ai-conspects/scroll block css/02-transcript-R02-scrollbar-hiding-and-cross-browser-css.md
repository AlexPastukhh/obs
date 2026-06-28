# Regional transcript — R02: Scrollbar hiding and cross-browser CSS

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

A scrollbar can be visually hidden while preserving scrolling, but browser-specific properties and accessibility tradeoffs must be considered.

## Cross-browser rules

- Firefox supports `scrollbar-width: none`.
- Legacy Microsoft engines used `-ms-overflow-style: none`.
- WebKit/Blink expose scrollbar pseudo-elements such as `::-webkit-scrollbar`.
- Keep `overflow: auto` or `scroll`; hiding the visual track must not accidentally disable scrolling.

## Styling instead of hiding

- `scrollbar-color` and `scrollbar-width` provide limited standardized styling in supporting browsers.
- WebKit scrollbar pseudo-elements allow deeper styling but are non-standard and should be progressive enhancement.
- A narrow, visible scrollbar often gives better discoverability than a completely hidden one.

## When hiding is appropriate

- Carousels and horizontally draggable chips can hide the bar when another strong affordance exists.
- Overlay panels may hide native chrome while retaining wheel, touch and keyboard movement.
- Document-style long content should usually keep a visible scrollbar.

## Caveats

- Hidden scrollbars can make content appear truncated.
- Operating-system overlay scrollbar settings can change the observed result.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-003, IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
