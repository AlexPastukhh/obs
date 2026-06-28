# Full combined final transcript — react root error, trigger useeffect on route change

Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
meaningful text elements: 19 / 19
unique embedded screenshots: 10 / 10
screenshot uses: 10 / 10
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Root error state and clearing on route or action

A root error banner is useful for application-wide failures, but its lifetime must be explicit. Otherwise an error from one page can leak into the next route.

### Root error model

- Store the current root error in context or a top-level state owner.
- Expose `setRootError` and `clearRootError` functions.
- Render the banner in the root layout.
- Keep structured fields such as message, code and optional retry action.

### Clear triggers

- Clear when the user explicitly dismisses the banner.
- Clear before or after navigation according to the desired UX.
- Clear when the action that caused the error is retried successfully.
- Do not clear on every render; renders are not lifecycle events.

### Scope decision

- Use a root error only when multiple pages or global infrastructure need it.
- Keep validation and page-specific errors near the page or form.
- A clear ownership rule prevents unrelated errors from replacing one another.

### Representative pattern

```tsx
type RootErrorContextValue = {
  error: AppError | null;
  setRootError(error: AppError): void;
  clearRootError(): void;
};
```

### Caveats

- Avoid storing raw Error objects when state must be serialized or shown to users.
- Concurrent operations may need IDs so clearing one error does not clear a newer one.

## R02 — useEffect versus useLayoutEffect and clear-before-navigation

`useEffect` runs after the browser paints; `useLayoutEffect` runs after React commits DOM changes but before paint. Most error cleanup should use `useEffect` or explicit event handling.

### Route-change effect

- Read the current location from the router.
- Run an effect when the location key or pathname changes.
- Call the stable clear function.
- This removes stale root errors after navigation.

### Visible flash

- An ordinary effect may allow the previous banner to appear for one frame.
- `useLayoutEffect` can remove it before paint.
- Because layout effects block painting, use them only when the flash is real and harmful.
- A one-line banner often does not justify the blocking hook.

### Clear before navigation

- When navigation is initiated by your handler, call `clearRootError()` first.
- Then call the router's navigate function.
- No effect is required for that controlled path.
- A route-change effect can remain as a fallback for links and browser navigation.

### Representative pattern

```tsx
const location = useLocation();
const { clearRootError } = useRootError();

useEffect(() => {
  clearRootError();
}, [location.key, clearRootError]);
```

### Caveats

- Effects run twice in some development StrictMode scenarios; clearing should be idempotent.
- Do not use layout effects during server rendering without an isomorphic strategy.

## R03 — Context API, stable setters and dependency arrays

React state setters have stable identity. A wrapper function can also be stable when memoized or when it depends only on stable setters.

### Stable state functions

- The function returned by `useState` does not change identity between renders.
- Including it in a dependency array is safe but usually unnecessary.
- A `clearRootError` wrapper created inline changes identity every render unless wrapped in `useCallback`.
- An unstable context function can retrigger consumer effects.

### Context value identity

- A fresh `{ error, setRootError, clearRootError }` object is created on every provider render.
- Use `useMemo` when reducing unnecessary consumer rerenders matters.
- Memoize callback members with `useCallback` before memoizing the value.
- Split state and actions into separate contexts when update patterns differ substantially.

### Custom hook

- Return the actual context value, not an extra freshly allocated wrapper object.
- Throw a clear error when the hook is used outside its provider.
- Consumers can place stable action functions in dependency arrays.

### Representative pattern

```tsx
const clearRootError = useCallback(() => {
  setError(null);
}, []);

const value = useMemo(
  () => ({ error, setRootError: setError, clearRootError }),
  [error, clearRootError]
);
```

### Caveats

- Memoization is an optimization, not a correctness requirement unless identity drives effects.
- Do not omit real dependencies merely to stop an effect from running.

## R04 — Page-local errors and page-specific layout styles

Many errors belong to one route and should disappear naturally when that page unmounts. Keeping them local is simpler than global cleanup.

### Local state

- Store form, loading and page-fetch errors inside the page or its route loader.
- Unmounting the route removes the state automatically.
- A route-level error boundary is appropriate for rendering failures and loader errors.
- Promote an error to root context only when it must outlive or transcend the page.

### Layout ownership

- A route can render its own page container and styles.
- Nested layouts share common chrome while allowing page-specific content styling.
- Avoid one root error/layout component accumulating every page's state and CSS.

### Reset alternatives

- A route key can intentionally remount a subtree.
- Loader/action frameworks can scope errors to a route match.
- Explicit success actions can clear local errors without route observation.

### Representative pattern

```tsx
function UserPage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="user-page">
      {error && <PageError message={error} />}
      <UserContent onError={setError} />
    </main>
  );
}
```

### Caveats

- Do not force remounts only to hide incorrect state ownership.
- Global network/session errors and page validation errors usually need different UI.

## Regional source map

### R01

- transcript: `01-transcript-R01-root-error-state-and-clearing-on-route-or-action.md`
- text elements: `5`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-useeffect-versus-uselayouteffect-and-clear-before-navigation.md`
- text elements: `0`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-context-api-stable-setters-and-dependency-arrays.md`
- text elements: `13`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-page-local-errors-and-page-specific-layout-styles.md`
- text elements: `1`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
framework/language-version details and original examples.
