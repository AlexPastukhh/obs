# Regional transcript — R02: Authentication-store rerender flow

Conspect: `usesyncexternalstore`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

An authentication store can expose an immutable snapshot containing the user, token status and initialization state, then notify React consumers after login, logout or restoration.

## Store shape

- Keep one current snapshot object, for example `{ user, isAuthenticated, isLoading }`.
- Commands such as `login`, `logout` and `restoreSession` replace that snapshot.
- After replacement, notify the listeners.
- Do not let consumers mutate the snapshot directly.

## Component hook

- A hook calls `useSyncExternalStore(authStore.subscribe, authStore.getSnapshot, authStore.getServerSnapshot)`.
- Consumers render from the returned snapshot rather than reading global variables directly.
- Login creates a new snapshot and notifies; subscribed components rerender.
- Logout follows the same flow and removes sensitive in-memory data.

## Provider question

- An external-store hook does not require React Context merely to trigger updates.
- Context can still inject a store instance for testing, multi-tenant scopes or dependency ownership.
- Avoid placing a changing snapshot value into Context if every consumer can subscribe directly to the store.

## Initialization and hydration

- Model session restoration explicitly with an initialization/loading flag.
- Server snapshots must match the HTML hydration contract.
- Browser-only token storage should not be read unguarded during server rendering.

## Caveats

- Do not treat client authentication state as server authorization.
- Handle token expiry and cross-tab changes as store updates when the application requires them.

## Covered source units

### Text elements

```text
(none; this region is screenshot-only)
```

### Screenshot uses

```text
IU-007, IU-008, IU-009, IU-010, IU-011, IU-032, IU-033, IU-035, IU-036
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
