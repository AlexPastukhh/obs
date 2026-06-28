# Regional transcript — R03: Stable registered handler reading the latest ref value

Conspect: `useRef to avoid including into deps array, to avoid rerenders or bad recreations`  
Generated: 2026-06-28 05:00:00 UTC

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

The effect registers one stable wrapper; when invoked, that wrapper delegates to the newest callback stored in the ref.

## Registration pattern

- Inside the effect, create or use a stable handler that calls `callbackRef.current(...)`.
- Register the handler with the external source.
- Return cleanup that removes the exact same handler identity.
- The effect then depends only on the external source and other true registration inputs.

## Behavior

- Changing callback logic updates the ref but does not recreate the subscription.
- The next event observes the latest callback.
- State captured by an obsolete callback is avoided because delegation occurs at call time.

## Modern alternatives

- A framework-provided effect-event API can express non-reactive event logic more directly when available.
- Library hooks may already implement stable callback refs; prefer tested utilities over repeated custom code.

## Caveats

- The wrapper still needs correct cleanup.
- This pattern should not conceal a source identity that genuinely requires resubscription.

## Covered source units

### Text elements

```text
T-010
```

### Screenshot uses

```text
IU-005, IU-006
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
