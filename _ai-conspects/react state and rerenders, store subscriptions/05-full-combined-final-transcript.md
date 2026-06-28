# Full combined final transcript — react state and rerenders, store subscriptions

Generated: 2026-06-28 02:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 6 / 6
unique embedded screenshots: 37 / 37
screenshot uses on canvas: 37 / 37
repeated screenshot placements retained: 0
visual-semantic regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — useCallback and useMemo

`useCallback` memoizes a function identity; `useMemo` memoizes a computed value. Neither prevents the component that calls the hook from rendering.

### useCallback

- `useCallback(fn, deps)` returns the same function identity while dependencies remain equal.
- It matters when the function is passed to a memoized child or used as a dependency in another hook.
- The callback still closes over values from the render in which it was created.
- Use functional state updates when a callback only needs the previous state, allowing fewer dependencies.

### useMemo

- `useMemo(factory, deps)` caches the factory result between renders.
- Use it for an expensive pure computation or to stabilize an object/array passed to a memoized consumer.
- The factory runs during render and must not contain side effects.
- React may discard cached values in some situations, so memoization is an optimization rather than semantic storage.

### When not to use them

- A cheap calculation or inline callback often needs no memoization.
- Memoization adds dependency maintenance and comparison work.
- A new callback identity is harmless when no consumer compares it.
- Start with correct rendering, measure, then memoize the boundary that actually rerenders unnecessarily.

### Caveats

- An incomplete dependency list creates stale closures.
- Wrapping every function in `useCallback` does not automatically improve performance.

## R02 — Render execution, eager calls and memoization rules

A React function component executes again whenever React renders it. Every ordinary expression in the function body is evaluated during that render.

### Render execution

- Calling a helper in JSX such as `{buildRows()}` invokes it immediately during render.
- Writing `onClick={handleClick()}` also invokes the function during render; use `onClick={handleClick}` or an arrow when an event should invoke it later.
- Creating objects, arrays and functions in the body produces new identities on each execution.
- Render code must be pure: the same inputs should describe the same UI without external mutation.

### Parent and child renders

- When a parent renders, React normally evaluates its child elements again.
- `React.memo` can skip a child commit/render when its props are shallowly equal.
- A freshly created object or callback defeats shallow prop equality even when its contents look the same.
- Context updates and the child's own state can still rerender a memoized child.

### Memoization boundaries

- Memoize the expensive calculation or identity crossing the boundary, not unrelated code.
- Keep state close to the components that use it.
- Prefer component composition so unrelated children are not rebuilt from one broad state owner.
- Do not use memoization to hide side effects or broken data flow.

### Strict development behavior

- Development Strict Mode can invoke render calculations more than once to expose impurity.
- Production behavior differs, but render code must still remain pure.
- Logs from render are not a reliable measure of committed UI updates.

### Caveats

- A render is not the same as a DOM mutation; React may abandon or reuse work.
- Performance reasoning should distinguish component execution, reconciliation and browser painting.

## R03 — State snapshots, batching and functional updaters

Each render sees a fixed snapshot of state. Setting state requests a later render; it does not mutate the state variable already captured by the handler.

### Snapshots

- An event handler reads the state values from the render that created it.
- After calling a setter, subsequent lines in the same handler still see that snapshot.
- Asynchronous callbacks also capture a render's values unless dependencies or refs update the source they read.

### Batching

- React groups multiple state updates during a managed event or compatible async boundary.
- The batched updates produce fewer renders than committing each setter independently.
- Several `setCount(count + 1)` calls from the same snapshot request the same next value.

### Functional updater

- `setCount(previous => previous + 1)` queues a calculation from the latest pending value.
- Multiple functional updates compose in order.
- Use the updater form when the next state depends on previous state.
- The updater must be pure because React can evaluate it more than once in development.

### Object and array state

- Replace state with a new object or array rather than mutating the current snapshot.
- Use mapping, filtering and spread operations or a reducer for complex transitions.
- Keep derived values out of state when they can be computed from current props/state.

### Caveats

- A ref provides mutable current data but changing it does not request a render.
- State transitions that must be coordinated across many fields are often clearer in a reducer.

## R04 — External-store subscriptions and component rerenders

An external store lives outside React. A component must subscribe, read a snapshot and request consistent rerenders when the snapshot changes.

### Minimal store

- A store commonly exposes `getState`, `setState` and `subscribe`.
- `subscribe(listener)` records a listener and returns an unsubscribe function.
- After state changes, the store notifies its current listeners.
- A `Set` is a convenient listener collection because it avoids duplicate registrations.

### Naive subscription

- A component can subscribe in an effect and copy store data into React state.
- This pattern can miss changes between render and effect subscription and can tear under concurrent rendering.
- Manually coordinating initial reads, notifications and cleanup is easy to get wrong.
- React's `useSyncExternalStore` formalizes this bridge.

### Rerender scope

- Every notified subscriber rerenders when its selected snapshot is considered changed.
- Returning a new object for every read causes rerenders even if the underlying data is unchanged.
- Selectors and equality checks reduce irrelevant consumer work.
- Store notification and React rendering are separate stages: notification schedules work; React decides how to render it.

### Ownership

- The store owns external state and listener registration.
- React owns component rendering and subscription lifecycle.
- Do not mutate external state during a component render.
- Expose explicit store commands rather than letting components alter internal objects directly.

### Caveats

- Subscriptions must be removed when a component unmounts.
- A custom store should define whether updates are synchronous and how errors are handled.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 1 | 4 | 4 | 0 | 0 |
| R02 | 2 | 15 | 15 | 0 | 0 |
| R03 | 2 | 12 | 12 | 0 | 0 |
| R04 | 1 | 6 | 6 | 0 | 0 |

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots remain authoritative for exact source code, browser/runtime
version details and original spelling.
