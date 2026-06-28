# Regional transcript — R02: Updating the current callback ref

Conspect: `useRef to avoid including into deps array, to avoid rerenders or bad recreations`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The callback ref must be refreshed as renders produce newer callback implementations.

## Render-time assignment

- Assigning `callbackRef.current = callback` during render keeps the reference current for later events.
- The assignment must be predictable and should not trigger external side effects.
- This pattern is common when the ref is read only from callbacks after rendering.

## Effect-based assignment

- An effect can update `.current` whenever the callback changes.
- This respects the effect lifecycle but leaves a small timing distinction before the effect runs.
- Use a layout effect only when synchronous post-DOM timing is genuinely required.

## Custom latest-value hook

- A small `useLatest(value)` hook can centralize the assignment pattern.
- The returned ref object remains stable while `.current` tracks the newest value.
- Keep the abstraction narrow so users understand that changes do not rerender consumers.

## Caveats

- Reading `.current` during render does not subscribe the component to future changes.
- Concurrent rendering requires avoiding mutations that influence the rendered output.

## Covered source units

### Text elements

```text
T-005, T-006, T-007, T-008, T-009
```

### Screenshot uses

```text
IU-003, IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
