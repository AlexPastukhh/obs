# Regional transcript — R04: External-store subscriptions and component rerenders

Conspect: `react state and rerenders, store subscriptions`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

An external store lives outside React. A component must subscribe, read a snapshot and request consistent rerenders when the snapshot changes.

## Minimal store

- A store commonly exposes `getState`, `setState` and `subscribe`.
- `subscribe(listener)` records a listener and returns an unsubscribe function.
- After state changes, the store notifies its current listeners.
- A `Set` is a convenient listener collection because it avoids duplicate registrations.

## Naive subscription

- A component can subscribe in an effect and copy store data into React state.
- This pattern can miss changes between render and effect subscription and can tear under concurrent rendering.
- Manually coordinating initial reads, notifications and cleanup is easy to get wrong.
- React's `useSyncExternalStore` formalizes this bridge.

## Rerender scope

- Every notified subscriber rerenders when its selected snapshot is considered changed.
- Returning a new object for every read causes rerenders even if the underlying data is unchanged.
- Selectors and equality checks reduce irrelevant consumer work.
- Store notification and React rendering are separate stages: notification schedules work; React decides how to render it.

## Ownership

- The store owns external state and listener registration.
- React owns component rendering and subscription lifecycle.
- Do not mutate external state during a component render.
- Expose explicit store commands rather than letting components alter internal objects directly.

## Caveats

- Subscriptions must be removed when a component unmounts.
- A custom store should define whether updates are synchronous and how errors are handled.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-013, IU-014, IU-015, IU-016, IU-017, IU-018
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
