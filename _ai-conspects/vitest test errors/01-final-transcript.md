# Final semantic transcript — common Vitest environment and rendering errors

Authoritative source: `source/vitest test errors.svg`  
Coverage: **7 unique screenshots / 7 placements + 20 native SVG labels**

---

# R01 — DOM environment and root configuration

Vitest uses a Node environment by default. React Testing Library requires a DOM implementation.

Global configuration:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [
      "./src/setupTests.ts",
    ],
  },
});
```

Per-file override:

```ts
/**
 * @vitest-environment jsdom
 */
```

The configuration file must be discoverable from the project root where Vitest is launched. A correct config in the wrong directory can look as though Vitest ignored `environment: "jsdom"`.

A setup file is the correct place for shared matchers and browser-like shims:

```ts
import "@testing-library/jest-dom/vitest";
```

---

# R02 — providers and asset imports

Components must receive the same providers they expect in the application.

React Query example:

```tsx
const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

render(
  <QueryClientProvider
    client={queryClient}
  >
    <RouterProvider
      router={router}
    />
  </QueryClientProvider>,
);
```

Create a fresh `QueryClient` per test or per render helper so cache state does not leak between tests.

## SVG import errors

A common error occurs when an SVG import resolves to a URL string but the test renders it as though it were a component:

```tsx
import Eye from "./eye.svg";

<Eye />
```

If `Eye` is a string such as `data:image/svg+xml,...`, React tries to create an element with that string as the tag name and throws a DOM error.

Configure an SVG-to-component plugin consistently:

```ts
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
});
```

Or import the SVG as a URL and render it through `<img src={eyeUrl} />`. The application and test build pipelines must agree on the import contract.

---

# R03 — router error boundaries in tests

Data routers create route-level error handling. Tests that omit an explicit `errorElement` may show the router’s default error boundary output instead of the intended assertion target.

```tsx
const router = createMemoryRouter([
  {
    path: "/register",
    element: <Register />,
    errorElement: <RouteError />,
  },
]);
```

A test-specific boundary can expose errors predictably:

```tsx
function RouteError() {
  const error = useRouteError();

  return (
    <div data-testid="route-error">
      {String(
        (error as { message?: string })
          ?.message
        ?? error
      )}
    </div>
  );
}
```

When testing navigation, loaders or actions, prefer `createMemoryRouter` plus `RouterProvider`. It reproduces data-router behavior more accurately than a plain memory wrapper.

## Diagnostic sequence

```text
1. read the first real stack frame in application code
2. confirm jsdom is active
3. confirm required providers are mounted
4. verify SVG/import plugins
5. add an explicit route errorElement
6. isolate cache and mocks between tests
```

---

# Coverage

```text
unique embedded screenshots: 7
image uses: 7
native SVG labels: 20
duplicate extra placements: 0

processed image uses: 7
processed text labels: 20
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
