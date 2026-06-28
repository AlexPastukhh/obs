# Regional transcript — R01: 100vh and the mobile viewport problem

Conspect: `SVH DVH LVH`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Legacy `vh` units are tied to a browser-defined viewport size. On mobile, browser chrome such as the address bar and bottom toolbar can appear or disappear, so an element sized to `100vh` may extend behind visible controls or jump when the browser UI changes.

## Why 100vh can be wrong

- Desktop browsers usually have a stable viewport, so `100vh` often behaves as expected.
- Mobile browsers distinguish the layout viewport from the currently visible area.
- Historically, some browsers computed `100vh` from the largest possible viewport even while browser controls were visible.
- A full-height panel could therefore be taller than the visible page and hide its bottom content.

## Symptoms

- Buttons at the bottom are clipped behind browser chrome.
- A page gains an unexpected vertical scroll area.
- The layout changes when the address bar collapses or reappears.
- Fixed headers and footers can overlap content when height assumptions are inconsistent.

## Design rule

- Choose whether the design needs the smallest stable viewport, the largest stable viewport or the current dynamic viewport.
- Do not treat every full-screen layout as a `100vh` problem.
- Keep safe-area insets in mind for notches and home indicators.

## Representative pattern

```css
.hero {
  min-height: 100vh; /* legacy fallback */
}
```

## Caveats

- The exact legacy behavior differs between browser versions.
- A viewport-height unit fixes sizing only; it does not automatically handle safe-area padding.

## Source labels

- `safary, bottom end isnt visible, but we set 100vh, so`
- `vh computed incorrectly`

## Covered text elements

```text
T-001, T-002
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-005, IU-006, IU-008
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
