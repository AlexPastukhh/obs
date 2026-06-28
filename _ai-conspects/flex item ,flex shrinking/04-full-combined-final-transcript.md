# Full combined final transcript — flex item ,flex shrinking

Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
meaningful text elements: 12 / 12
unique embedded screenshots: 7 / 7
screenshot uses: 7 / 7
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Default flex-item sizing and min-width auto

A flex item may refuse to shrink as expected because its default minimum main size is often content-based (`min-width: auto` in a row container).

### Default behavior

- `flex-shrink` defaults to 1, so shrinking is generally allowed.
- However, the automatic minimum size can stop the item at its min-content width.
- Long text, intrinsic images or unbreakable content can therefore overflow.

### Allowing shrink

- Set `min-width: 0` on the flex item that must become narrower than its content's intrinsic minimum.
- Use `overflow: hidden` when clipping/truncation is part of the design.
- Add wrapping rules such as `overflow-wrap: anywhere` for long text.

### Sizing constraints

- A width or flex-basis establishes the starting main size.
- Min/max sizes clamp the final flexed result.
- The browser distributes negative free space only within those constraints.

### Representative pattern

```css
.row {
  display: flex;
}

.content {
  flex: 1 1 auto;
  min-width: 0;
}

.content__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### Caveats

- `min-height: 0` is the analogous fix in a column-direction flex container.
- Do not hide overflow when the content must remain fully accessible.

## R02 — flex shorthand grow shrink and basis semantics

The `flex` shorthand combines `flex-grow`, `flex-shrink`, and `flex-basis`. Understanding the basis is essential because it determines the size from which positive or negative free space is distributed.

### Common forms

- `flex: 1` is commonly interpreted as `1 1 0%`.
- `flex: auto` means `1 1 auto`.
- `flex: none` means `0 0 auto`.
- `flex: 0 1 auto` is the initial value.

### Basis

- `0%` starts siblings from an equal zero basis before distributing free space.
- `auto` uses the item's main-size property or content-based size.
- A fixed basis such as `12rem` provides an explicit starting size.

### Shrinking

- Negative free space is distributed using shrink factors weighted by flex base sizes.
- Two items with the same shrink value can lose different pixel amounts when their bases differ.
- Minimum sizes can stop one item from shrinking and force more shrink onto others.

### Representative pattern

```css
.equal {
  flex: 1 1 0%;
}

.content-sized {
  flex: 1 1 auto;
}

.fixed {
  flex: 0 0 12rem;
}
```

### Caveats

- Browser shorthand serialization may display `0%` even when authors informally say zero.
- Flex sizing is still constrained by min/max dimensions.

## R03 — Practical equal-width buttons and flexible-center layouts

Equal-width controls require equal flex bases, not only equal grow factors. Layouts with fixed side regions and a flexible center should give each role an explicit flex contract.

### Equal buttons

- Give both buttons `flex: 1 1 0`.
- Set `min-width: 0` so a long label does not force one button wider.
- Choose wrapping, clipping or ellipsis intentionally.
- A shared container gap remains outside the distributed item widths.

### Fixed sides and flexible center

- Set side items to `flex: 0 0 <width>`.
- Set the center to `flex: 1 1 auto` and `min-width: 0`.
- The center consumes remaining space and shrinks before fixed sides.

### Overflow

- Text overflow belongs on the inner text box when icons or controls must stay visible.
- Use responsive media/container queries when the layout should stack at small widths.

### Representative pattern

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

### Caveats

- Equal outer widths do not guarantee equal visible text when labels wrap differently.
- Fixed side widths should still account for zoom and localization.

## Regional source map

### R01

- transcript: `01-transcript-R01-default-flex-item-sizing-and-min-width-auto.md`
- text elements: `4`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-flex-shorthand-grow-shrink-and-basis-semantics.md`
- text elements: `1`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-practical-equal-width-buttons-and-flexible-center-layouts.md`
- text elements: `7`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
runtime/library/database-version details and original examples.
