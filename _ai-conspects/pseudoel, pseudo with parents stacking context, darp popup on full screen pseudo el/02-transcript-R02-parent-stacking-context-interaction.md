# Regional transcript — R02: Parent stacking-context interaction

Conspect: `pseudoel, pseudo with parents stacking context, darp popup on full screen pseudo el`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A pseudo-element cannot escape the stacking context created by its originating element or an ancestor.

## Local z-index

- The pseudo-element's `z-index` is compared inside its current stacking context.
- A very large value cannot outrank a sibling stacking context whose parent layer already wins.
- Opacity, transform, filter, isolation and positioned non-auto z-index values commonly create contexts.

## Diagnosis

- Walk from the pseudo-element's owner to the root and list every stacking-context ancestor.
- Compare the first ancestor contexts that are siblings.
- Remove accidental triggers or move the overlay responsibility higher in the DOM.

## Clipping

- Overflow, masks, clip paths and containment can clip the pseudo-element independently of z-index.
- Test clipping and stacking as separate causes.

## Caveats

- Negative z-index can place the pseudo-element behind its owner's background.
- Pointer-event behavior should be set intentionally.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-002
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
