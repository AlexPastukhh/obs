# Full combined final transcript — usesyncexternalstore

Generated: 2026-06-28 02:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 2 / 2
unique embedded screenshots: 37 / 37
screenshot uses on canvas: 37 / 37
repeated screenshot placements retained: 0
visual-semantic regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — External-store contract, snapshots and rendering

`useSyncExternalStore` is React's supported bridge to state owned outside React. It coordinates subscription timing and consistent snapshots.

### Hook contract

- `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` returns the current snapshot.
- `subscribe` receives a React callback and must return an unsubscribe function.
- `getSnapshot` must synchronously return the value representing the store's current state.
- `getServerSnapshot` supplies the server/hydration value when server rendering is involved.

### Snapshot stability

- When the store has not changed, `getSnapshot` must return a value equal to the previous snapshot under `Object.is`.
- For immutable stores, return the current immutable state object.
- For mutable stores, cache a derived immutable snapshot and create a new one only after a real change.
- Always returning a fresh object can create an infinite update loop or constant rerenders.

### Render flow

- The component reads the snapshot during render.
- React subscribes and verifies that the snapshot did not change during the transition.
- When the store notifies, React reads the snapshot again and rerenders only when it changed.
- This closes timing gaps that exist in a hand-written effect subscription.

### Stable functions

- Declare `subscribe` outside the component when possible.
- A newly created subscribe function causes React to resubscribe.
- Store methods that are stable by construction are ideal hook arguments.
- Wrap only genuinely dynamic subscriptions with `useCallback`.

### Caveats

- The store notification callback must run after the observable state has changed.
- Snapshot equality controls rerenders; notification alone does not force a changed result.

## R02 — Authentication-store rerender flow

An authentication store can expose an immutable snapshot containing the user, token status and initialization state, then notify React consumers after login, logout or restoration.

### Store shape

- Keep one current snapshot object, for example `{ user, isAuthenticated, isLoading }`.
- Commands such as `login`, `logout` and `restoreSession` replace that snapshot.
- After replacement, notify the listeners.
- Do not let consumers mutate the snapshot directly.

### Component hook

- A hook calls `useSyncExternalStore(authStore.subscribe, authStore.getSnapshot, authStore.getServerSnapshot)`.
- Consumers render from the returned snapshot rather than reading global variables directly.
- Login creates a new snapshot and notifies; subscribed components rerender.
- Logout follows the same flow and removes sensitive in-memory data.

### Provider question

- An external-store hook does not require React Context merely to trigger updates.
- Context can still inject a store instance for testing, multi-tenant scopes or dependency ownership.
- Avoid placing a changing snapshot value into Context if every consumer can subscribe directly to the store.

### Initialization and hydration

- Model session restoration explicitly with an initialization/loading flag.
- Server snapshots must match the HTML hydration contract.
- Browser-only token storage should not be read unguarded during server rendering.

### Caveats

- Do not treat client authentication state as server authorization.
- Handle token expiry and cross-tab changes as store updates when the application requires them.

## R03 — Selectors, equality and store consumers

A selector lets a component observe the smallest useful slice of a larger snapshot. Equality determines whether a changed store snapshot affects that slice.

### Why selectors

- A component displaying the user name does not need to rerender for an unrelated preference.
- Selecting one primitive often gives stable `Object.is` equality automatically.
- Selecting an object requires a stable cached value or a suitable equality comparison.

### Selector patterns

- Call `useSyncExternalStore` for the whole immutable snapshot and derive a cheap primitive locally.
- For expensive or object-shaped slices, use a selector-aware wrapper that caches the selected result.
- Keep selectors pure and free of component side effects.
- Parameterized selectors should avoid creating fresh aggregate objects on every call.

### Equality

- `Object.is` is the base snapshot comparison used by the core hook.
- A selector layer may use reference, shallow or custom equality.
- Custom equality must be cheaper than the rerender work it saves and must not hide meaningful changes.
- Immutable structural sharing makes equality decisions simpler.

### Consumer examples

- Header: select the current display name.
- Protected route: select authentication and initialization flags.
- Token refresh indicator: select only the refresh status.
- Debug panel: intentionally consume the complete snapshot.

### Caveats

- Returning a new array/object from a selector defeats reference equality unless it is cached.
- Overly broad consumers make external-store updates resemble a global Context rerender.

## R04 — Unsubscribe lifecycle and cleanup

The subscription function owns listener registration and must return an exact cleanup function so React can remove the listener during unmount or resubscription.

### Subscribe implementation

- Add the supplied callback to a listener collection.
- Return a function that removes that exact callback.
- The cleanup should be safe even if called more than once.
- Do not return the result of `delete` directly; return a callable cleanup function.

### When cleanup runs

- React unsubscribes when the component unmounts.
- React can unsubscribe and resubscribe when the `subscribe` function identity changes.
- Development Strict Mode can expose cleanup defects through additional lifecycle checks.
- Store replacement also requires old subscriptions to be released.

### Notification safety

- Iterate over a stable listener snapshot if listeners can unsubscribe during notification.
- A `Set` naturally avoids duplicate listener entries.
- One listener throwing should not silently prevent the store from reaching other listeners unless that is the documented policy.
- Avoid retaining component objects or closures after unsubscribe.

### Diagnostics

- Track listener count during development to detect leaks.
- Test repeated mount/unmount cycles.
- Verify that an unmounted component no longer rerenders after store updates.

### Caveats

- A leaked subscription retains component closures and creates updates after unmount.
- Keep subscription code synchronous and minimal.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 1 | 20 | 20 | 0 | 0 |
| R02 | 0 | 9 | 9 | 0 | 0 |
| R03 | 0 | 4 | 4 | 0 | 0 |
| R04 | 1 | 4 | 4 | 0 | 0 |

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots remain authoritative for exact source code, browser/runtime
version details and original spelling.
