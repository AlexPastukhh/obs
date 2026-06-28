# Final semantic transcript — inset vs size, margins and formula

Authoritative source: `source/inset vs size,margins,formula.svg`

---

# R01 — containing blocks, flow, padding and margins

## Containing block

A positioned box is resolved against a containing block, which is the reference rectangle selected by CSS layout rules.

Typical cases:

```text
normal-flow element
    containing block usually comes from the parent formatting context

position: absolute
    nearest qualifying positioned ancestor, otherwise another defined ancestor/reference box

position: fixed
    usually the viewport, with exceptions created by transforms and related containing-block rules
```

“Parent” is a useful shortcut, but “containing block” is the precise term.

## Normal flow

```css
.box {
  margin: 20px;
  padding: 16px;
}
```

In normal flow:

```text
padding increases internal spacing
background extends through padding
margin creates external spacing
the box still occupies layout space
siblings respond to its size and margins
```

## `position: relative`

```css
.box {
  position: relative;
  top: 10px;
  margin: 20px;
  padding: 16px;
}
```

The box keeps its original place in normal flow. Insets visually shift the painted box, but the original layout slot remains.

Margins and padding keep their ordinary box-model meaning.

---

# R02 — positioning constraint equations

## Horizontal equation

For a non-replaced absolutely positioned element, the browser conceptually resolves one horizontal constraint:

```text
left
+ margin-left
+ border-left
+ padding-left
+ width
+ padding-right
+ border-right
+ margin-right
+ right
= containing-block width
```

A similar equation exists vertically:

```text
top
+ margin-top
+ border-top
+ padding-top
+ height
+ padding-bottom
+ border-bottom
+ margin-bottom
+ bottom
= containing-block height
```

This is why the browser does not merely “apply `left` and `right` independently.” All participating values must fit one constraint.

## `auto`

When one of `left`, `width`, or `right` is `auto`, the browser can solve for that value.

```css
.box {
  position: absolute;
  left: 10px;
  width: 100px;
  right: auto;
}
```

The used `right` value is derived.

```css
.box {
  position: absolute;
  left: 10px;
  width: auto;
  right: 20px;
}
```

The width fills the remaining available space after margins, borders and padding are considered.

## Over-constrained values

```css
.box {
  position: absolute;
  left: 0;
  width: 200px;
  right: 0;
}
```

All three are specified, so one inset becomes a derived value according to the writing direction and CSS rules.

Typical horizontal rule:

```text
LTR
    right is commonly the derived side

RTL
    left is commonly the derived side
```

The browser is solving the equation, not deleting margins, padding or width.

## Both insets with auto size

```css
.box {
  position: absolute;
  left: 0;
  right: 0;
  width: auto;
}
```

The used width is computed from the remaining space.

If all insets and size are `auto`, static-position and shrink-to-fit rules can participate.

---

# R03 — margins, padding and negative derived offsets

## Padding

Padding remains internal box spacing for positioned elements:

```css
.box {
  position: absolute;
  inset: 0;
  padding: 16px;
}
```

Padding contributes to the size equation according to the selected box-sizing model.

## Margins

Margins still participate in the positioning equation, but an absolutely positioned element is removed from normal flow, so its margins do not push siblings away.

```css
.box {
  position: absolute;
  left: 0;
  margin-left: 20px;
}
```

This commonly places the margin edge farther from the left reference edge.

## Fixed positioning

```css
.box {
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 12px;
}
```

The same box-model and constraint concepts apply, but the containing block is usually the viewport.

## `width: 100%` plus margins

```css
.box {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  margin-inline: 20px;
}
```

If `100%` already consumes the containing-block width, margins add more required space. To satisfy the equation, the derived inset can become negative.

Example with containing width `W`:

```text
0 + 20 + W + 20 + right = W
right = -40px
```

This does not mean margins were ignored. It means the remaining inset was solved from the full equation.

## Practical guidance

```text
[ ] identify the actual containing block
[ ] distinguish normal-flow spacing from positioned offsets
[ ] remember margins, borders, padding and size all participate
[ ] expect one inset to become derived in over-constrained cases
[ ] avoid width:100% plus horizontal margins when the desired result is “fill available space”
[ ] prefer left/right with width:auto, or use box-sizing and deliberate sizing
```

# Coverage

```text
unique embedded screenshots: 26
image uses: 26
native SVG labels: 10
duplicate extra placements: 0

processed image uses: 26
processed text labels: 10
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
