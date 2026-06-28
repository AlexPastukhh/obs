# Regional transcript — R01: Default flex-item sizing and min-width auto

Conspect: `flex item ,flex shrinking`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A flex item may refuse to shrink as expected because its default minimum main size is often content-based (`min-width: auto` in a row container).

## Default behavior

- `flex-shrink` defaults to 1, so shrinking is generally allowed.
- However, the automatic minimum size can stop the item at its min-content width.
- Long text, intrinsic images or unbreakable content can therefore overflow.

## Allowing shrink

- Set `min-width: 0` on the flex item that must become narrower than its content's intrinsic minimum.
- Use `overflow: hidden` when clipping/truncation is part of the design.
- Add wrapping rules such as `overflow-wrap: anywhere` for long text.

## Sizing constraints

- A width or flex-basis establishes the starting main size.
- Min/max sizes clamp the final flexed result.
- The browser distributes negative free space only within those constraints.

## Representative pattern

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

## Caveats

- `min-height: 0` is the analogous fix in a column-direction flex container.
- Do not hide overflow when the content must remain fully accessible.

## Source labels

- `started to shrink after spec minwidth`
- `default`
- `need to specify some size or minsize the element can shrink`
- `or maxsize in case u dont have basis (0%)`

## Covered text elements

```text
T-009, T-010, T-011, T-012
```

## Covered screenshot uses

```text
IU-006, IU-007
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
