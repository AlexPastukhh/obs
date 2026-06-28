# Regional transcript — R02: flex shorthand grow shrink and basis semantics

Conspect: `flex item ,flex shrinking`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The `flex` shorthand combines `flex-grow`, `flex-shrink`, and `flex-basis`. Understanding the basis is essential because it determines the size from which positive or negative free space is distributed.

## Common forms

- `flex: 1` is commonly interpreted as `1 1 0%`.
- `flex: auto` means `1 1 auto`.
- `flex: none` means `0 0 auto`.
- `flex: 0 1 auto` is the initial value.

## Basis

- `0%` starts siblings from an equal zero basis before distributing free space.
- `auto` uses the item's main-size property or content-based size.
- A fixed basis such as `12rem` provides an explicit starting size.

## Shrinking

- Negative free space is distributed using shrink factors weighted by flex base sizes.
- Two items with the same shrink value can lose different pixel amounts when their bases differ.
- Minimum sizes can stop one item from shrinking and force more shrink onto others.

## Representative pattern

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

## Caveats

- Browser shorthand serialization may display `0%` even when authors informally say zero.
- Flex sizing is still constrained by min/max dimensions.

## Source labels

- `flex 1 0 (1 0 0%) and flex 1 1 (1 1 0%) and flex 1 1 auto + min width are basically the same`

## Covered text elements

```text
T-001
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
