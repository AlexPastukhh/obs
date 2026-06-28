# Regional transcript — R01: External-store contract, snapshots and rendering

Conspect: `usesyncexternalstore`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 20 / 20
unique screenshots represented: 20
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`useSyncExternalStore` is React's supported bridge to state owned outside React. It coordinates subscription timing and consistent snapshots.

## Hook contract

- `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` returns the current snapshot.
- `subscribe` receives a React callback and must return an unsubscribe function.
- `getSnapshot` must synchronously return the value representing the store's current state.
- `getServerSnapshot` supplies the server/hydration value when server rendering is involved.

## Snapshot stability

- When the store has not changed, `getSnapshot` must return a value equal to the previous snapshot under `Object.is`.
- For immutable stores, return the current immutable state object.
- For mutable stores, cache a derived immutable snapshot and create a new one only after a real change.
- Always returning a fresh object can create an infinite update loop or constant rerenders.

## Render flow

- The component reads the snapshot during render.
- React subscribes and verifies that the snapshot did not change during the transition.
- When the store notifies, React reads the snapshot again and rerenders only when it changed.
- This closes timing gaps that exist in a hand-written effect subscription.

## Stable functions

- Declare `subscribe` outside the component when possible.
- A newly created subscribe function causes React to resubscribe.
- Store methods that are stable by construction are ideal hook arguments.
- Wrap only genuinely dynamic subscriptions with `useCallback`.

## Caveats

- The store notification callback must run after the observable state has changed.
- Snapshot equality controls rerenders; notification alone does not force a changed result.

## Covered source units

### Text elements

```text
T-002
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-016, IU-017, IU-018, IU-019, IU-020, IU-021, IU-022
IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-037
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
