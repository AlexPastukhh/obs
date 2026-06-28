# Regional transcript — R01: createMemoryRouter and RouterProvider redirect tests

Conspect: `router and redirect tests`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 19 / 19
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A data-router test can create a real in-memory router, render it through `RouterProvider`, perform the user action and assert the resulting route state or page.

## Router setup

- Define the relevant test routes, including both the starting route and redirect destination.
- Create the router with `createMemoryRouter(routes, { initialEntries: ['/register'] })`.
- Render `<RouterProvider router={router} />`.
- `initialEntries` represents the initial in-memory history entries; it is not an assertion.

## Act like a user

- Fill the form and submit through Testing Library interactions.
- Wait for asynchronous validation, network mocks and navigation to settle.
- Prefer behavior-driven actions over directly calling component internals.

## Assertions

- Assert `router.state.location.pathname` when the exact path is important.
- Assert the destination route's rendered content to verify what the user sees.
- The strongest integration-style test can assert both path and destination UI.
- Use asynchronous queries such as `findByText` when navigation causes an async render.

## Why this style

- The test exercises the actual router configuration and navigation behavior.
- Redirects, loaders, actions and route-level error handling can be represented in the route objects.
- It resembles production use when the application is built around a data router.

## Caveats

- Keep the test route tree minimal while preserving the behavior being tested.
- Mock external I/O, not the router transition itself.

## Covered source units

### Text elements

```text
T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015
T-016, T-017, T-018, T-019
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-008
```

Exact code and original wording remain available in the SVG and closed ledgers.
