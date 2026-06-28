# Full combined final transcript — uselocation

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 1 / 1
unique screenshots: 5 / 5
screenshot uses: 5 / 5
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — useLocation and the location object

`useLocation` returns the current React Router location and subscribes the component to location changes.

### Location fields

- `pathname` contains the path portion.
- `search` contains the query string including the leading question mark.
- `hash` contains the fragment including the leading hash.
- `state` contains navigation state that was passed without appearing in the URL.
- `key` identifies a history entry in router implementations that expose it.

### Router context

- The hook must run beneath a router provider.
- It describes the current rendered route location, not a mutable global browser object.
- Use navigation APIs to change location rather than mutating the returned object.

### Caveats

- Navigation state is not durable across every reload or direct URL entry.
- Do not place sensitive data in query strings or untrusted navigation state.

## R02 — pathname, search, hash and navigation state

Each location field serves a different routing concern and should be parsed with the corresponding API.

### Pathname

- Use route params for dynamic path segments.
- Normalize trailing slashes and basename behavior according to router configuration.

### Search

- Parse `location.search` with `URLSearchParams` for simple query values.
- Repeated keys, arrays and typed values need explicit conventions.
- Changing query parameters creates a new location and can trigger loaders or effects.

### Hash

- The hash is client-side fragment state and is not sent to the server in HTTP requests.
- It can identify an in-page anchor or application substate.

### State

- Navigation state is useful for transient context such as the origin page or a success notice.
- Always handle direct entry where state is absent.

### Caveats

- The location object identity can change even when only one field changes.
- Derive only the specific field a component needs.

## R03 — Rerenders, effects and testing patterns

A component using `useLocation` rerenders when the router publishes a new location.

### Effects

- Use an effect keyed by the relevant location fields for analytics or scroll restoration.
- Depending on the entire location object is appropriate only when every navigation change matters.
- Cleanup subscriptions or timers created by location-driven effects.

### Rendering

- Conditional UI can compare `pathname` or inspect route matches.
- Prefer route configuration for page-level branching rather than large manual pathname switches.

### Testing

- Render the component under `MemoryRouter` or a memory data router.
- Set `initialEntries` to the desired location.
- Assert user-visible behavior and, when necessary, expose a small test location display.

### Caveats

- Development Strict Mode can run effects more than once.
- Do not treat `useLocation` as a general replacement for route params or loader data.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 1 | 1 | 1 | 0 | 0 |
| R02 | 0 | 2 | 2 | 0 | 0 |
| R03 | 0 | 2 | 2 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
