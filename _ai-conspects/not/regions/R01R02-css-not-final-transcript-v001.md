# Final source-reconstructed transcript - CSS :not()

Generated: 2026-07-07

Source: `source/not.svg`, `source/images/fd29842c0049.png`, `source/images/942c1db08183.png`, and Stage0 text/image ledgers.

## Coverage

```text
SVG text labels: 3 / 3 transcribed
Image uses: 2 / 2 visually checked
Status before this file: regional transcripts not started
```

This transcript is reconstructed from the local SVG/source images. The conspect is small and the two screenshots are readable in the complete canvas preview.

## Core idea

The CSS pseudo-class `:not()` selects elements that do **not** match the selector passed inside `:not(...)`.

The sheet question is:

```text
how to apply styles to element with class that does not have some class
```

Use `:not()` with the class or selector that must be excluded.

## Syntax

General syntax:

```css
element:not(selector) {
}
```

The argument can be a class selector, but it can also be another selector form. The sheet explicitly notes:

```text
can be any selector
```

## Excluding a class

Example from the source screenshot:

```css
button:not(.primary) {
  opacity: 0.6;
}
```

Meaning: select all `button` elements except buttons that have class `.primary`.

## Directly using `:not()` with a class selector

The source also shows that `:not()` can be used directly with a class selector:

```css
.card:not(.active) {
  opacity: 0.6;
}
```

Meaning: select elements that have class `.card` but do not have class `.active`.

## Practical rule

Use this pattern when the base selector must match, but a second selector/class must be absent:

```css
.base:not(.excluded) {
  /* styles for .base elements without .excluded */
}
```

For the concrete sheet wording, the answer is:

```css
.some-class:not(.class-to-exclude) {
  /* styles */
}
```

## Source text labels closed

```text
T-001: how to aply styles to el with
T-002: clas that doesnt have some class
T-003: can be any selector
```

Normalized meaning:

```text
how to apply styles to an element with a class that does not have another class
can be any selector
```
