# Regional transcript — R02: MemoryRouter, Routes and LocationDisplay tests

Conspect: `router and redirect tests`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 16 / 16
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A component-router test can mount `MemoryRouter` with a small test route tree and expose the current location through a helper component.

## Setup

- Render `<MemoryRouter initialEntries={['/register']}>`.
- Include the relevant `<Routes>` and `<Route>` elements.
- Place the component under test on the starting route and a simple destination element on `/login`.

## LocationDisplay helper

- A tiny helper calls `useLocation()` and renders `location.pathname` into a test id.
- This makes the current in-memory path observable without reaching into router internals.
- Assert the helper's text content after the user action.

## UI assertion

- The destination route can render a unique heading or marker.
- Assert the destination content when path details are not the primary contract.
- A page-content assertion works with either router style and is closest to user-observable behavior.

## When this style fits

- The production app uses `BrowserRouter` and declarative `<Routes>`.
- The test only needs a light router wrapper around one component.
- Loaders, actions and data-router-specific APIs are not part of the behavior.

## Caveats

- A helper component is test infrastructure and should stay tiny.
- Do not assert private history implementation details.

## Covered source units

### Text elements

```text
T-020, T-021, T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033, T-034
T-035
```

### Screenshot uses

```text
IU-004, IU-005, IU-006
```

Exact code and original wording remain available in the SVG and closed ledgers.
