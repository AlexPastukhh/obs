# Regional transcript — R01: SVG element geometry with getBBox

Conspect: `svg`  
Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 0 / 0
unique screenshots represented: 0
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The source selects an SVG element, reads its geometry through `getBBox()`, and logs the returned `x`, `y`, `width`, and `height` values.

## What the snippet does

- `document.querySelector('.inner-search-container .link-primary svg')` searches for the first matching `<svg>` element.
- `s.getBBox()` asks the SVG geometry API for the smallest axis-aligned rectangle that contains the element's rendered SVG geometry in its current SVG user coordinate system.
- The returned object exposes `x`, `y`, `width`, and `height`, which can be used for positioning overlays, calculating centers, aligning labels, or measuring drawn content.

## Safe DOM handling

- `querySelector` may return `null`, so production code should check the result before calling SVG-specific methods.
- In TypeScript, narrow or assert the value to an appropriate SVG graphics element only after confirming it is the expected node.
- Run the measurement after the SVG is present and its relevant geometry has been created.

## getBBox versus getBoundingClientRect

- `getBBox()` reports geometry in SVG user coordinates and is useful for relationships inside the SVG.
- `getBoundingClientRect()` reports a viewport-relative CSS rectangle and is useful for positioning HTML UI against what the user sees on screen.
- CSS transforms, page scrolling, viewport scaling, and nested coordinate systems make these rectangles answer different questions.

## Geometry details

- The basic bounding box is driven by SVG geometry and fill; stroke, markers, clipping, filters, and browser support for optional bounding-box options require separate consideration.
- For groups, paths, text, or nested content, call the method on the graphics element whose combined geometry you actually need.
- A zero width or height can be valid for line-like or empty geometry and should not automatically be treated as an error.

## Representative patterns

```js
const node = document.querySelector(
  ".inner-search-container .link-primary svg"
);

if (node instanceof SVGGraphicsElement) {
  const { x, y, width, height } = node.getBBox();
  console.log({ x, y, width, height });
}
```

## Caveats

- Calling `getBBox()` on a null result throws before any geometry is measured.
- Hidden, detached, or not-yet-laid-out SVG content can produce results that do not match the final visible state.
- The bounding rectangle is axis-aligned in the relevant SVG coordinate system; it is not the exact outline of the shape.

## Covered source units

### Text elements

```text
T-001, T-002, T-003
```

### Screenshot uses

```text
(none)
```

The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
