# Full combined final transcript — router and redirect tests

Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements: 36 / 36
unique screenshots: 8 / 8
screenshot uses: 8 / 8
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — createMemoryRouter and RouterProvider redirect tests

A data-router test can create a real in-memory router, render it through `RouterProvider`, perform the user action and assert the resulting route state or page.

### Router setup

- Define the relevant test routes, including both the starting route and redirect destination.
- Create the router with `createMemoryRouter(routes, { initialEntries: ['/register'] })`.
- Render `<RouterProvider router={router} />`.
- `initialEntries` represents the initial in-memory history entries; it is not an assertion.

### Act like a user

- Fill the form and submit through Testing Library interactions.
- Wait for asynchronous validation, network mocks and navigation to settle.
- Prefer behavior-driven actions over directly calling component internals.

### Assertions

- Assert `router.state.location.pathname` when the exact path is important.
- Assert the destination route's rendered content to verify what the user sees.
- The strongest integration-style test can assert both path and destination UI.
- Use asynchronous queries such as `findByText` when navigation causes an async render.

### Why this style

- The test exercises the actual router configuration and navigation behavior.
- Redirects, loaders, actions and route-level error handling can be represented in the route objects.
- It resembles production use when the application is built around a data router.

### Caveats

- Keep the test route tree minimal while preserving the behavior being tested.
- Mock external I/O, not the router transition itself.

## R02 — MemoryRouter, Routes and LocationDisplay tests

A component-router test can mount `MemoryRouter` with a small test route tree and expose the current location through a helper component.

### Setup

- Render `<MemoryRouter initialEntries={['/register']}>`.
- Include the relevant `<Routes>` and `<Route>` elements.
- Place the component under test on the starting route and a simple destination element on `/login`.

### LocationDisplay helper

- A tiny helper calls `useLocation()` and renders `location.pathname` into a test id.
- This makes the current in-memory path observable without reaching into router internals.
- Assert the helper's text content after the user action.

### UI assertion

- The destination route can render a unique heading or marker.
- Assert the destination content when path details are not the primary contract.
- A page-content assertion works with either router style and is closest to user-observable behavior.

### When this style fits

- The production app uses `BrowserRouter` and declarative `<Routes>`.
- The test only needs a light router wrapper around one component.
- Loaders, actions and data-router-specific APIs are not part of the behavior.

### Caveats

- A helper component is test infrastructure and should stay tiny.
- Do not assert private history implementation details.

## R03 — Choosing the router-test style

Choose the test router that mirrors the production routing model and assert the smallest stable behavior that proves the redirect.

### Choose createMemoryRouter when

- The app uses `createBrowserRouter` and `RouterProvider`.
- The test needs loaders, actions, redirects, route errors or data-router state.
- You want direct access to the router state for an exact-path assertion.

### Choose MemoryRouter when

- The app uses declarative `BrowserRouter` and `<Routes>`.
- The component only needs routing context and a few test routes.
- A destination-content assertion or `useLocation` helper is sufficient.

### Preferred assertion order

- First prefer destination UI: the user ended up on the expected page.
- Add a path assertion when query strings, parameters or exact route identity are part of the contract.
- Avoid testing the implementation detail that a particular navigation function was called if real routing can be exercised.

### Test quality

- Keep one test focused on successful redirect behavior.
- Add separate tests for failed submission, validation and server errors.
- Use semantic queries and realistic interactions.

### Caveats

- Router APIs and recommended setup differ by React Router generation; preserve the app's actual router model.
- An integration-like test may require awaiting navigation-related updates.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 19 | 4 | 4 | 0 | 0 |
| R02 | 16 | 3 | 3 | 0 | 0 |
| R03 | 1 | 1 | 1 | 0 | 0 |

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and extracted
screenshots remain authoritative for exact code, punctuation and source-version details.
