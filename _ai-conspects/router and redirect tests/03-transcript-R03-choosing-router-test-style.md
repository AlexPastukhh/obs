# Regional transcript — R03: Choosing the router-test style

Conspect: `router and redirect tests`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Choose the test router that mirrors the production routing model and assert the smallest stable behavior that proves the redirect.

## Choose createMemoryRouter when

- The app uses `createBrowserRouter` and `RouterProvider`.
- The test needs loaders, actions, redirects, route errors or data-router state.
- You want direct access to the router state for an exact-path assertion.

## Choose MemoryRouter when

- The app uses declarative `BrowserRouter` and `<Routes>`.
- The component only needs routing context and a few test routes.
- A destination-content assertion or `useLocation` helper is sufficient.

## Preferred assertion order

- First prefer destination UI: the user ended up on the expected page.
- Add a path assertion when query strings, parameters or exact route identity are part of the contract.
- Avoid testing the implementation detail that a particular navigation function was called if real routing can be exercised.

## Test quality

- Keep one test focused on successful redirect behavior.
- Add separate tests for failed submission, validation and server errors.
- Use semantic queries and realistic interactions.

## Caveats

- Router APIs and recommended setup differ by React Router generation; preserve the app's actual router model.
- An integration-like test may require awaiting navigation-related updates.

## Covered source units

### Text elements

```text
T-036
```

### Screenshot uses

```text
IU-007
```

Exact code and original wording remain available in the SVG and closed ledgers.
