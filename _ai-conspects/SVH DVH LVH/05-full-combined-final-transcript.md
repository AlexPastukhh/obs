# Full combined final transcript — SVH DVH LVH

Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
meaningful text elements: 12 / 12
unique embedded screenshots: 13 / 13
screenshot uses: 13 / 13
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — 100vh and the mobile viewport problem

Legacy `vh` units are tied to a browser-defined viewport size. On mobile, browser chrome such as the address bar and bottom toolbar can appear or disappear, so an element sized to `100vh` may extend behind visible controls or jump when the browser UI changes.

### Why 100vh can be wrong

- Desktop browsers usually have a stable viewport, so `100vh` often behaves as expected.
- Mobile browsers distinguish the layout viewport from the currently visible area.
- Historically, some browsers computed `100vh` from the largest possible viewport even while browser controls were visible.
- A full-height panel could therefore be taller than the visible page and hide its bottom content.

### Symptoms

- Buttons at the bottom are clipped behind browser chrome.
- A page gains an unexpected vertical scroll area.
- The layout changes when the address bar collapses or reappears.
- Fixed headers and footers can overlap content when height assumptions are inconsistent.

### Design rule

- Choose whether the design needs the smallest stable viewport, the largest stable viewport or the current dynamic viewport.
- Do not treat every full-screen layout as a `100vh` problem.
- Keep safe-area insets in mind for notches and home indicators.

### Representative pattern

```css
.hero {
  min-height: 100vh; /* legacy fallback */
}
```

### Caveats

- The exact legacy behavior differs between browser versions.
- A viewport-height unit fixes sizing only; it does not automatically handle safe-area padding.

## R02 — JavaScript custom --vh workaround

Before modern viewport units were broadly available, a common workaround measured `window.innerHeight`, stored one percent in a CSS custom property and used that value instead of native `vh`.

### Measurement

- Calculate `window.innerHeight * 0.01`.
- Write the result to `document.documentElement.style` as `--vh`.
- Use `calc(var(--vh, 1vh) * 100)` in CSS.
- The fallback keeps the layout usable before JavaScript runs.

### Keeping it current

- Recalculate on relevant resize and orientation changes.
- Debounce rapid resize events to reduce layout work.
- Remove listeners when the owning component or module is disposed.
- Avoid measuring in server-side rendering where `window` does not exist.

### Trade-offs

- The workaround performs JavaScript-driven layout measurement.
- It can cause a small initial layout shift.
- It requires lifecycle code and testing across mobile browsers.
- Modern `svh`, `lvh` and `dvh` usually make the workaround unnecessary.

### Representative pattern

```js
function updateViewportUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

updateViewportUnit();
window.addEventListener("resize", updateViewportUnit);
```

### Caveats

- `innerHeight` itself can change frequently while browser chrome animates.
- Prefer progressive CSS enhancement where modern viewport units satisfy the design.

## R03 — svh and lvh stable viewport units

`svh` and `lvh` represent stable extrema of the mobile viewport. `svh` uses the smallest viewport when browser controls occupy the most space; `lvh` uses the largest viewport when those controls are retracted.

### Small viewport

- `100svh` fits inside the smallest expected visible viewport.
- It is useful when bottom controls must never cover content.
- The size stays stable while browser chrome appears or disappears.
- The trade-off is unused space when the browser UI collapses.

### Large viewport

- `100lvh` targets the maximum available viewport.
- It is useful for immersive sections that may extend behind browser chrome.
- While controls are visible, some content can be outside the current visible area.
- Use it only when that overlap is acceptable.

### Choosing between them

- Use `svh` for guaranteed fit.
- Use `lvh` for guaranteed maximum canvas.
- Use `dvh` when the element should follow the current viewport.
- Combine with `min-height` rather than fixed `height` when content may grow.

### Representative pattern

```css
.safe-screen {
  min-height: 100svh;
}

.immersive-screen {
  min-height: 100lvh;
}
```

### Caveats

- Stable viewport units do not animate with browser UI changes.
- Content taller than the viewport still needs normal document scrolling.

## R04 — dvh dynamic viewport and transitions

`dvh` tracks the currently visible dynamic viewport. It solves clipping but the element can resize while browser controls animate.

### Dynamic behavior

- `100dvh` expands when browser chrome retracts.
- It contracts when browser chrome returns.
- The value updates during viewport changes instead of staying at an extreme.
- This is the closest CSS equivalent to repeatedly measuring `innerHeight`.

### Visual smoothness

- Frequent height changes can produce visible content movement.
- A transition can soften discrete size changes, though browser-driven continuous updates may still be noticeable.
- Avoid expensive descendants that make every viewport update costly.
- Test keyboard appearance and orientation changes separately.

### Progressive enhancement

- Declare a legacy fallback first.
- Override it with `dvh` in supporting browsers.
- Use safe-area padding when bottom controls or device cutouts matter.

### Representative pattern

```css
.full-screen {
  min-height: 100vh;
  min-height: 100dvh;
  transition: min-height 160ms ease;
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Caveats

- Animating viewport-sized properties can add layout work.
- A transition should not delay critical controls from becoming visible.

## Regional source map

### R01

- transcript: `01-transcript-R01-100vh-and-the-mobile-viewport-problem.md`
- text elements: `2`
- screenshot uses: `6`
- unique screenshots: `6`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-javascript-custom-vh-workaround.md`
- text elements: `4`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-svh-and-lvh-stable-viewport-units.md`
- text elements: `4`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-dvh-dynamic-viewport-and-transitions.md`
- text elements: `2`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
browser/runtime/library versions and original examples.
