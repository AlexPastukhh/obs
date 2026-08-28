# flex,centering etc

Source SVG: `source/flex,centering etc.svg`

## Main point

An anchor such as `a.navLink` is inline by default. If you assign `height` to it, the visual box can still behave like a line box: the visible height comes from `line-height` / font metrics, not from the `height` declaration. In the source example the inspected link is about `21px` tall even though the intended header/link height is `3rem` when `1rem = 10px`.

Source code shown:

```css
.navLink {
    width: 8rem;
    height: calc(var(--header-height)-2rem);
    text-align: center;
}
```

Important correction for real CSS: binary `-` in `calc()` should be spaced.

```css
height: calc(var(--header-height) - 2rem);
```

But the larger issue remains: for an inline anchor, `height` does not create the desired visible box. Make the link a block/flex item or use flex alignment on the container/item.

## Practical fix for centering links

Use flex when the goal is to center text inside a clickable nav item:

```css
.navLink {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: calc(var(--header-height) - 2rem);
}
```

If the link should keep inline behavior in surrounding text, use `inline-flex` instead of `flex`.

## Flex Container Properties

- `display: flex | inline-flex` makes an element a flex container.
- `flex-direction: row | row-reverse | column | column-reverse` sets the main axis.
- `flex-wrap: nowrap | wrap | wrap-reverse` allows or prevents multiple flex lines.
- `justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly` aligns items along the main axis.
- `align-items: stretch | flex-start | center | flex-end | baseline` aligns items inside each flex line on the cross axis.
- `align-content: stretch | flex-start | center | flex-end | space-between | space-around` distributes multiple flex lines on the cross axis; it matters only when wrapping creates multiple lines.
- `gap`, `row-gap`, and `column-gap` set spacing between flex items.

## Flex Item Properties

- `order: <number>` changes visual order; lower numbers appear first.
- `flex-grow: <number>` controls how much free space an item takes; default is `0`.
- `flex-shrink: <number>` controls how much an item shrinks when space is tight; default is `1`.
- `flex-basis: auto | <length>` sets the initial main-axis size before grow/shrink.
- `flex: <grow> <shrink> <basis>` is the shorthand. Common examples are `flex: 1` and explicit forms like `flex: 1 1 0%`.
- `align-self: auto | stretch | flex-start | center | flex-end | baseline` overrides `align-items` for one item.

## `display: flex` Defaults

When `display: flex` is applied:

- the element becomes a block-level flex container;
- use `inline-flex` when inline-level outer behavior is needed;
- the main axis is horizontal by default: `flex-direction: row`;
- items stay in one line by default: `flex-wrap: nowrap`;
- `justify-content` defaults to `flex-start`;
- `align-items` defaults to `stretch`, so children can expand to the container cross-size;
- `align-content` defaults to `stretch`, but it matters only with multiple flex lines;
- `gap` defaults to `0`.

Compact default summary:

```css
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    gap: 0;
}

.item {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    order: 0;
    align-self: auto;
}
```

## Axes

The cross axis is perpendicular to the main axis. Since the default main axis is `row`, the default cross axis is vertical.

- Use `justify-content` for main-axis alignment.
- Use `align-items` for cross-axis alignment inside each line.
- Use `align-content` for spacing/alignment of the whole set of lines when there are multiple flex lines.

## Min-Size Caveat

Flex items have default min-size behavior: `min-width` / `min-height` default to `auto`, so items may refuse to shrink below their intrinsic content size. When a flex child should shrink or scroll inside a constrained layout, set `min-width: 0` or `min-height: 0` on the relevant child.

## Repeat Checklist

- Why did `height` not visibly apply to `a.navLink`?
- What is the difference between `flex` and `inline-flex`?
- Which axis does `justify-content` affect?
- Which axis does `align-items` affect?
- When does `align-content` matter?
- What are the defaults for `flex-grow`, `flex-shrink`, `flex-basis`, `order`, and `align-self`?
- Why can `min-width: auto` / `min-height: auto` break shrinking in flex layouts?

