# Regional transcript — R02: JavaScript custom --vh workaround

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

Before modern viewport units were broadly available, a common workaround measured `window.innerHeight`, stored one percent in a CSS custom property and used that value instead of native `vh`.

## Measurement

- Calculate `window.innerHeight * 0.01`.
- Write the result to `document.documentElement.style` as `--vh`.
- Use `calc(var(--vh, 1vh) * 100)` in CSS.
- The fallback keeps the layout usable before JavaScript runs.

## Keeping it current

- Recalculate on relevant resize and orientation changes.
- Debounce rapid resize events to reduce layout work.
- Remove listeners when the owning component or module is disposed.
- Avoid measuring in server-side rendering where `window` does not exist.

## Trade-offs

- The workaround performs JavaScript-driven layout measurement.
- It can cause a small initial layout shift.
- It requires lifecycle code and testing across mobile browsers.
- Modern `svh`, `lvh` and `dvh` usually make the workaround unnecessary.

## Representative pattern

```js
function updateViewportUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

updateViewportUnit();
window.addEventListener("resize", updateViewportUnit);
```

## Caveats

- `innerHeight` itself can change frequently while browser chrome animates.
- Prefer progressive CSS enhancement where modern viewport units satisfy the design.

## Source labels

- `we can access variable set via js inline style`
- `can have fallbacks on vars`
- `we solved problem this problem before dynamic units with js, computing actual vh and`
- `added into variable via inline style`

## Covered text elements

```text
T-003, T-004, T-005, T-006
```

## Covered screenshot uses

```text
IU-004, IU-007, IU-009
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
