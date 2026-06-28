# Regional transcript — R03: svh and lvh stable viewport units

Conspect: `SVH DVH LVH`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`svh` and `lvh` represent stable extrema of the mobile viewport. `svh` uses the smallest viewport when browser controls occupy the most space; `lvh` uses the largest viewport when those controls are retracted.

## Small viewport

- `100svh` fits inside the smallest expected visible viewport.
- It is useful when bottom controls must never cover content.
- The size stays stable while browser chrome appears or disappears.
- The trade-off is unused space when the browser UI collapses.

## Large viewport

- `100lvh` targets the maximum available viewport.
- It is useful for immersive sections that may extend behind browser chrome.
- While controls are visible, some content can be outside the current visible area.
- Use it only when that overlap is acceptable.

## Choosing between them

- Use `svh` for guaranteed fit.
- Use `lvh` for guaranteed maximum canvas.
- Use `dvh` when the element should follow the current viewport.
- Combine with `min-height` rather than fixed `height` when content may grow.

## Representative pattern

```css
.safe-screen {
  min-height: 100svh;
}

.immersive-screen {
  min-height: 100lvh;
}
```

## Caveats

- Stable viewport units do not animate with browser UI changes.
- Content taller than the viewport still needs normal document scrolling.

## Source labels

- `svh`
- `min height, that is possible in this page`
- `because of some appearing shit like this panel`
- `lvh`

## Covered text elements

```text
T-007, T-008, T-009, T-010
```

## Covered screenshot uses

```text
IU-010, IU-011, IU-013
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
