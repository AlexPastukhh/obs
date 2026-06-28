# Regional transcript — R01: useCallback and useMemo

Conspect: `react state and rerenders, store subscriptions`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`useCallback` memoizes a function identity; `useMemo` memoizes a computed value. Neither prevents the component that calls the hook from rendering.

## useCallback

- `useCallback(fn, deps)` returns the same function identity while dependencies remain equal.
- It matters when the function is passed to a memoized child or used as a dependency in another hook.
- The callback still closes over values from the render in which it was created.
- Use functional state updates when a callback only needs the previous state, allowing fewer dependencies.

## useMemo

- `useMemo(factory, deps)` caches the factory result between renders.
- Use it for an expensive pure computation or to stabilize an object/array passed to a memoized consumer.
- The factory runs during render and must not contain side effects.
- React may discard cached values in some situations, so memoization is an optimization rather than semantic storage.

## When not to use them

- A cheap calculation or inline callback often needs no memoization.
- Memoization adds dependency maintenance and comparison work.
- A new callback identity is harmless when no consumer compares it.
- Start with correct rendering, measure, then memoize the boundary that actually rerenders unnecessarily.

## Caveats

- An incomplete dependency list creates stale closures.
- Wrapping every function in `useCallback` does not automatically improve performance.

## Covered source units

### Text elements

```text
T-004
```

### Screenshot uses

```text
IU-019, IU-020, IU-021, IU-022
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
