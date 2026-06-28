# Full combined final transcript — useRef to avoid including into deps array, to avoid rerenders or bad recreations

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 10 / 10
unique screenshots: 6 / 6
screenshot uses: 6 / 6
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Callback dependency problem and useRef motivation

A changing callback can force an effect to tear down and register again when the callback appears in the dependency list.

### Why the dependency changes

- Functions declared during render receive a new identity unless stabilized.
- A callback often closes over current props or state, so omitting it from dependencies can create stale behavior.
- Including it correctly may cause repeated subscription, timer or listener recreation.

### What a ref provides

- `useRef` returns a stable object whose `.current` field can change without requesting a render.
- A ref can store the latest callback while the external registration remains stable.
- The ref is an escape hatch for imperative integration, not a replacement for reactive state.

### Appropriate use

- The external API needs one long-lived handler.
- The handler must always execute the latest callback logic.
- Re-registering is expensive, lossy or semantically wrong.

### Caveats

- Do not silence dependency warnings by moving every reactive value into refs.
- Prefer ordinary dependencies when resubscription is cheap and accurately represents the effect.

## R02 — Updating the current callback ref

The callback ref must be refreshed as renders produce newer callback implementations.

### Render-time assignment

- Assigning `callbackRef.current = callback` during render keeps the reference current for later events.
- The assignment must be predictable and should not trigger external side effects.
- This pattern is common when the ref is read only from callbacks after rendering.

### Effect-based assignment

- An effect can update `.current` whenever the callback changes.
- This respects the effect lifecycle but leaves a small timing distinction before the effect runs.
- Use a layout effect only when synchronous post-DOM timing is genuinely required.

### Custom latest-value hook

- A small `useLatest(value)` hook can centralize the assignment pattern.
- The returned ref object remains stable while `.current` tracks the newest value.
- Keep the abstraction narrow so users understand that changes do not rerender consumers.

### Caveats

- Reading `.current` during render does not subscribe the component to future changes.
- Concurrent rendering requires avoiding mutations that influence the rendered output.

## R03 — Stable registered handler reading the latest ref value

The effect registers one stable wrapper; when invoked, that wrapper delegates to the newest callback stored in the ref.

### Registration pattern

- Inside the effect, create or use a stable handler that calls `callbackRef.current(...)`.
- Register the handler with the external source.
- Return cleanup that removes the exact same handler identity.
- The effect then depends only on the external source and other true registration inputs.

### Behavior

- Changing callback logic updates the ref but does not recreate the subscription.
- The next event observes the latest callback.
- State captured by an obsolete callback is avoided because delegation occurs at call time.

### Modern alternatives

- A framework-provided effect-event API can express non-reactive event logic more directly when available.
- Library hooks may already implement stable callback refs; prefer tested utilities over repeated custom code.

### Caveats

- The wrapper still needs correct cleanup.
- This pattern should not conceal a source identity that genuinely requires resubscription.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 4 | 2 | 2 | 0 | 0 |
| R02 | 5 | 2 | 2 | 0 | 0 |
| R03 | 1 | 2 | 2 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
