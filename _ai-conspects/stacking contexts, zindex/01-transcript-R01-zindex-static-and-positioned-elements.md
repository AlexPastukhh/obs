# Regional transcript — R01: z-index with static and positioned elements

Conspect: `stacking contexts, zindex`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`z-index` participates in painting order only within the relevant stacking context and under the rules for positioned or stacking-context-forming elements.

## Static positioning

- A normal element with `position: static` generally does not use integer `z-index` as a positioned stacking-order control.
- Modern layout items such as flex and grid items have additional `z-index` behavior even when not explicitly positioned.
- When debugging, inspect the computed position and determine whether the element itself creates or participates in a stacking context.

## Relative positioning

- `position: relative` with `z-index: auto` does not by itself create an isolated stacking context.
- A positioned element with a non-auto `z-index` creates a stacking context.
- Relative positioning can move the element visually without changing the stacking-context hierarchy when `z-index` remains auto.

## Local comparison

- A high `z-index` is compared only against siblings or descendants participating in the same parent stacking context.
- A descendant cannot escape a lower parent context simply by using an enormous number.
- First compare parent contexts, then compare descendants inside the winning parent.

## Caveats

- `z-index: 999999` is not a global layer.
- Browser developer tools that display stacking contexts are more useful than guessing larger numbers.

## Covered source units

### Text elements

```text
T-001, T-002
```

### Screenshot uses

```text
IU-001, IU-002
```

Exact code and original wording remain available in the SVG and closed ledgers.
