# Regional transcript — R03: State snapshots, batching and functional updaters

Conspect: `react state and rerenders, store subscriptions`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Each render sees a fixed snapshot of state. Setting state requests a later render; it does not mutate the state variable already captured by the handler.

## Snapshots

- An event handler reads the state values from the render that created it.
- After calling a setter, subsequent lines in the same handler still see that snapshot.
- Asynchronous callbacks also capture a render's values unless dependencies or refs update the source they read.

## Batching

- React groups multiple state updates during a managed event or compatible async boundary.
- The batched updates produce fewer renders than committing each setter independently.
- Several `setCount(count + 1)` calls from the same snapshot request the same next value.

## Functional updater

- `setCount(previous => previous + 1)` queues a calculation from the latest pending value.
- Multiple functional updates compose in order.
- Use the updater form when the next state depends on previous state.
- The updater must be pure because React can evaluate it more than once in development.

## Object and array state

- Replace state with a new object or array rather than mutating the current snapshot.
- Use mapping, filtering and spread operations or a reducer for complex transitions.
- Keep derived values out of state when they can be computed from current props/state.

## Caveats

- A ref provides mutable current data but changing it does not request a render.
- State transitions that must be coordinated across many fields are often clearer in a reducer.

## Covered source units

### Text elements

```text
T-002, T-003
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
