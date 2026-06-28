# Regional transcript — R03: Practical equal-width buttons and flexible-center layouts

Conspect: `flex item ,flex shrinking`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Equal-width controls require equal flex bases, not only equal grow factors. Layouts with fixed side regions and a flexible center should give each role an explicit flex contract.

## Equal buttons

- Give both buttons `flex: 1 1 0`.
- Set `min-width: 0` so a long label does not force one button wider.
- Choose wrapping, clipping or ellipsis intentionally.
- A shared container gap remains outside the distributed item widths.

## Fixed sides and flexible center

- Set side items to `flex: 0 0 <width>`.
- Set the center to `flex: 1 1 auto` and `min-width: 0`.
- The center consumes remaining space and shrinks before fixed sides.

## Overflow

- Text overflow belongs on the inner text box when icons or controls must stay visible.
- Use responsive media/container queries when the layout should stack at small widths.

## Representative pattern

```css
.actions {
  display: flex;
  gap: .75rem;
}

.actions > button {
  flex: 1 1 0;
  min-width: 0;
}

.toolbar__side {
  flex: 0 0 3rem;
}

.toolbar__center {
  flex: 1 1 auto;
  min-width: 0;
}
```

## Caveats

- Equal outer widths do not guarantee equal visible text when labels wrap differently.
- Fixed side widths should still account for zoom and localization.

## Source labels

- `wanted to have 2 buttons with flex grow to have same space inside`
- `container`
- `but one buttons content overflows`
- `wanted container to grow, but how it can be possible if`
- `items flex?`
- `just full flex in the middle`
- `so need fixed width`

## Covered text elements

```text
T-002, T-003, T-004, T-005, T-006, T-007, T-008
```

## Covered screenshot uses

```text
IU-005
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
