# Regional transcript — R03: Nested stacking-context ordering

Conspect: `stacking contexts, zindex`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Nested contexts are painted as atomic units relative to sibling contexts. Internal children cannot interleave with content outside their parent context.

## Atomic painting group

- The browser resolves the internal order of a stacking context, then treats the whole context as one unit in its parent.
- A child with `z-index: 1000` inside a parent at layer 1 remains behind a sibling parent at layer 2.
- The meaningful comparison is between the ancestor contexts that are siblings.

## Negative and auto layers

- Negative `z-index` descendants remain within their parent's context and can fall behind the parent's content/background according to painting rules.
- `z-index: auto` participates without establishing an integer layer unless another trigger creates the context.
- Pseudo-elements are painted as children of their originating element and obey the same context boundaries.

## Isolation pattern

- Use named layer tokens or a small documented scale within one application layer root.
- Create deliberate context boundaries rather than accidental ones.
- Portals are useful for modals, tooltips and overlays that must live near a top-level overlay root.

## Caveats

- Nested contexts prevent global numeric comparisons.
- DOM order still matters among items in the same painting category.

## Covered source units

### Text elements

```text
T-004
```

### Screenshot uses

```text
IU-004, IU-005
```

Exact code and original wording remain available in the SVG and closed ledgers.
