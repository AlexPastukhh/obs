# Final semantic transcript — centered max-width headers with `sticky`, `fixed` and `absolute`

Authoritative source: `source/header max width, sticky,fixed.svg`  
Coverage: **19 unique screenshots / 19 placements + 23 native SVG labels**

---

# R01 — fixed header with a centered max-width content area

A `position: fixed` element is removed from normal document flow. Its automatic width often becomes content-sized unless left/right edges or a width are supplied.

## Recommended wrapper pattern

Use a full-width fixed outer header and a centered inner container:

```html
<header class="site-header">
  <div class="site-header__inner">
    <!-- navigation -->
  </div>
</header>
```

```css
.site-header {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 1000;

  background: white;
}

.site-header__inner {
  width: min(
    100% - 2rem,
    72rem
  );

  margin-inline: auto;
}
```

Benefits:

```text
background spans the viewport
content is capped by max width
responsive gutters are explicit
centering uses ordinary layout
```

Because the fixed element no longer reserves space, the page normally needs top padding or a spacer equal to the header height:

```css
main {
  padding-top: var(--header-height);
}
```

## Wrapper-free centering

A fixed box itself can be centered with:

```css
.site-header {
  position: fixed;
  top: 0;
  left: 50%;

  transform: translateX(-50%);

  width: min(
    calc(100% - 2rem),
    72rem
  );
}
```

Why both `left` and `transform` are needed:

```text
left: 50%
    puts the element's left edge at the center

translateX(-50%)
    moves it left by half of its own width
```

The width constraint matters. Without it, a fixed element with `width: auto` may shrink to its content.

## `margin: 0 auto` versus transform centering

`margin-inline: auto` works naturally for an in-flow block with a constrained width:

```css
.container {
  max-width: 72rem;
  margin-inline: auto;
}
```

For fixed/absolute positioning, automatic margins need a definite positioning equation, such as both inline edges and an appropriate width:

```css
.site-header {
  position: fixed;
  inset-inline: 0;

  width: min(
    calc(100% - 2rem),
    72rem
  );

  margin-inline: auto;
}
```

The wrapper pattern is usually easiest to reason about for page headers. Transform centering is useful for floating UI, overlays and elements whose own width is the centering reference.

---

# R02 — `position: sticky`

A sticky element participates in normal layout until it reaches a threshold, then behaves as stuck within its scroll container:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;

  max-width: 72rem;
  margin-inline: auto;

  background: white;
}
```

A threshold such as `top: 0` is required; without it, there is no point at which the element should stick.

## Why sticky works well with max width

Sticky remains in normal flow:

```text
it reserves layout space
margin-inline: auto can center it
max-width behaves like an ordinary block
content does not slide underneath merely because it became sticky
```

This allows a max-width sticky header without a separate full-width outer wrapper when a full-width background is not required.

## Scroll-container constraints

Sticky is constrained by its nearest relevant scrolling ancestor.

Common causes of “sticky does not work”:

```text
missing top/bottom/left/right threshold
an ancestor creates an unexpected scroll container
overflow hidden/auto/scroll on an ancestor
the containing block is too short
stacking or background makes the stuck state hard to see
```

Sticky stops when it reaches the bounds of its containing block. It does not detach permanently into viewport coordinates like fixed positioning.

## Flex layouts

In a flex column, a child may stretch along the cross axis by default.

```css
.page {
  display: flex;
  flex-direction: column;
}
```

A sticky header may therefore fill available inline width before `max-width` caps it. Centering can be expressed with:

```css
.site-header {
  align-self: center;
  width: min(
    calc(100% - 2rem),
    72rem
  );
}
```

or with `margin-inline: auto`, depending on the desired flex behavior.

---

# R03 — fixed versus absolute and choosing the pattern

## Absolute

```css
.site-header {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
```

Absolute positioning is relative to its containing block and scrolls with that content. It is appropriate for an element anchored inside a local component, not for a viewport-persistent header.

## Fixed

```css
.site-header {
  position: fixed;
  top: 0;
}
```

Fixed positioning is normally viewport-relative. It remains visible while the document scrolls and is removed from normal flow.

## Sticky

```css
.site-header {
  position: sticky;
  top: 0;
}
```

Sticky begins in normal flow, then sticks within its scroll-container limits.

Decision guide:

```text
normal page header that should remain and reserve its place
    sticky

viewport-persistent overlay/header
    fixed

local overlay inside a positioned component
    absolute
```

Centering guide:

```text
in-flow layout
    max-width + margin-inline:auto

full-width persistent header with centered content
    fixed outer + centered inner wrapper

floating box with independent width
    left:50% + translateX(-50%)

fixed box using auto margins
    constrain both inline edges and width explicitly
```

Remember to add:

```text
background
z-index
responsive inline gutters
content offset for fixed headers
```

when the visual design requires them.

---

# Coverage

```text
unique embedded screenshots: 19
image uses: 19
native SVG labels: 23
duplicate extra placements: 0

processed image uses: 19
processed text labels: 23
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
