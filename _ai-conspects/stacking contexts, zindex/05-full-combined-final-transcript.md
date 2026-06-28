# Full combined final transcript — stacking contexts, zindex

Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements: 16 / 16
unique screenshots: 12 / 12
screenshot uses: 12 / 12
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — z-index with static and positioned elements

`z-index` participates in painting order only within the relevant stacking context and under the rules for positioned or stacking-context-forming elements.

### Static positioning

- A normal element with `position: static` generally does not use integer `z-index` as a positioned stacking-order control.
- Modern layout items such as flex and grid items have additional `z-index` behavior even when not explicitly positioned.
- When debugging, inspect the computed position and determine whether the element itself creates or participates in a stacking context.

### Relative positioning

- `position: relative` with `z-index: auto` does not by itself create an isolated stacking context.
- A positioned element with a non-auto `z-index` creates a stacking context.
- Relative positioning can move the element visually without changing the stacking-context hierarchy when `z-index` remains auto.

### Local comparison

- A high `z-index` is compared only against siblings or descendants participating in the same parent stacking context.
- A descendant cannot escape a lower parent context simply by using an enormous number.
- First compare parent contexts, then compare descendants inside the winning parent.

### Caveats

- `z-index: 999999` is not a global layer.
- Browser developer tools that display stacking contexts are more useful than guessing larger numbers.

## R02 — Stacking-context creation triggers

A stacking context is an isolated painting group. Several CSS properties create one even when no explicit `z-index` is present.

### Common triggers

- The root element establishes the root stacking context.
- Positioned elements with a non-auto `z-index` create a context.
- `position: fixed` and `position: sticky` create stacking contexts.
- An opacity value below 1 creates a context.
- Transforms, filters, perspective and several compositing properties create contexts.
- `isolation: isolate` creates an explicit context.
- Certain containment, masking, clipping and blending configurations also create contexts.
- Flex/grid items with non-auto `z-index` create contexts.

### Why triggers matter

- A property added for animation or visual effects can unexpectedly change the layer hierarchy.
- A parent transform is a common reason a modal or pseudo-element no longer overlays content outside that parent.
- Removing a trigger or moving the overlay to a higher layer root can be more correct than increasing `z-index`.

### Debugging checklist

- Walk from the problem element to the root.
- Record every ancestor that creates a stacking context.
- At the first diverging sibling contexts, compare their painting order and `z-index`.
- Only after the parent context wins does the child's own `z-index` matter.

### Caveats

- The complete trigger list evolves with CSS features; inspect computed styles.
- A stacking context is not the same as a containing block, though one property can create both.

## R03 — Nested stacking-context ordering

Nested contexts are painted as atomic units relative to sibling contexts. Internal children cannot interleave with content outside their parent context.

### Atomic painting group

- The browser resolves the internal order of a stacking context, then treats the whole context as one unit in its parent.
- A child with `z-index: 1000` inside a parent at layer 1 remains behind a sibling parent at layer 2.
- The meaningful comparison is between the ancestor contexts that are siblings.

### Negative and auto layers

- Negative `z-index` descendants remain within their parent's context and can fall behind the parent's content/background according to painting rules.
- `z-index: auto` participates without establishing an integer layer unless another trigger creates the context.
- Pseudo-elements are painted as children of their originating element and obey the same context boundaries.

### Isolation pattern

- Use named layer tokens or a small documented scale within one application layer root.
- Create deliberate context boundaries rather than accidental ones.
- Portals are useful for modals, tooltips and overlays that must live near a top-level overlay root.

### Caveats

- Nested contexts prevent global numeric comparisons.
- DOM order still matters among items in the same painting category.

## R04 — Pseudo-elements, overflow and practical nested-container fixes

Pseudo-elements can extend outside an element's border box, but clipping and ancestor stacking contexts determine whether they remain visible and what they can cover.

### Crossing the border box

- A `::before` or `::after` pseudo-element can be positioned beyond its parent's border box.
- The border box alone does not clip descendants.
- `overflow: hidden`, clipping paths, masks or containment can clip the visual result.
- The pseudo-element still belongs to the originating element's stacking context.

### Covering parent content

- A positioned pseudo-element can overlay the parent's background/content when its local painting order permits it.
- It cannot jump above unrelated content in a higher ancestor stacking context.
- Negative layers can end up behind the parent's background, making the pseudo-element appear missing.

### Practical nested fix

- Introduce an outer layout wrapper when the middle container owns real visual content that must remain below an overlay.
- Assign stacking responsibility to the correct wrapper instead of forcing the inner pseudo-element to escape.
- Give intermediate sibling contexts explicit, small layer values when their relative order must be documented.
- Move globally floating UI to a shared overlay root when it should not be constrained by component contexts.

### Debugging overflow versus stacking

- Temporarily remove overflow/clipping to test whether visibility is a clipping problem.
- Temporarily remove transform/opacity/isolation to test whether hierarchy is a stacking-context problem.
- Use colored outlines and backgrounds to identify which box actually paints above the other.

### Caveats

- Adding `position: relative` alone is often harmless, but adding a non-auto `z-index` changes isolation.
- A visual fix should preserve focus order, pointer events and accessibility.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 2 | 2 | 2 | 0 | 0 |
| R02 | 1 | 1 | 1 | 0 | 0 |
| R03 | 1 | 2 | 2 | 0 | 0 |
| R04 | 12 | 7 | 7 | 0 | 0 |

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and extracted
screenshots remain authoritative for exact code, punctuation and source-version details.
