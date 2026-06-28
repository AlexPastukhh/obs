# Regional transcript — R04: Pseudo-elements, overflow and practical nested-container fixes

Conspect: `stacking contexts, zindex`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 12 / 12
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Pseudo-elements can extend outside an element's border box, but clipping and ancestor stacking contexts determine whether they remain visible and what they can cover.

## Crossing the border box

- A `::before` or `::after` pseudo-element can be positioned beyond its parent's border box.
- The border box alone does not clip descendants.
- `overflow: hidden`, clipping paths, masks or containment can clip the visual result.
- The pseudo-element still belongs to the originating element's stacking context.

## Covering parent content

- A positioned pseudo-element can overlay the parent's background/content when its local painting order permits it.
- It cannot jump above unrelated content in a higher ancestor stacking context.
- Negative layers can end up behind the parent's background, making the pseudo-element appear missing.

## Practical nested fix

- Introduce an outer layout wrapper when the middle container owns real visual content that must remain below an overlay.
- Assign stacking responsibility to the correct wrapper instead of forcing the inner pseudo-element to escape.
- Give intermediate sibling contexts explicit, small layer values when their relative order must be documented.
- Move globally floating UI to a shared overlay root when it should not be constrained by component contexts.

## Debugging overflow versus stacking

- Temporarily remove overflow/clipping to test whether visibility is a clipping problem.
- Temporarily remove transform/opacity/isolation to test whether hierarchy is a stacking-context problem.
- Use colored outlines and backgrounds to identify which box actually paints above the other.

## Caveats

- Adding `position: relative` alone is often harmless, but adding a non-auto `z-index` changes isolation.
- A visual fix should preserve focus order, pointer events and accessibility.

## Covered source units

### Text elements

```text
T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016
```

### Screenshot uses

```text
IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012
```

Exact code and original wording remain available in the SVG and closed ledgers.
