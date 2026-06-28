# Regional transcript — R02: useEffect versus useLayoutEffect and clear-before-navigation

Conspect: `react root error, trigger useeffect on route change`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`useEffect` runs after the browser paints; `useLayoutEffect` runs after React commits DOM changes but before paint. Most error cleanup should use `useEffect` or explicit event handling.

## Route-change effect

- Read the current location from the router.
- Run an effect when the location key or pathname changes.
- Call the stable clear function.
- This removes stale root errors after navigation.

## Visible flash

- An ordinary effect may allow the previous banner to appear for one frame.
- `useLayoutEffect` can remove it before paint.
- Because layout effects block painting, use them only when the flash is real and harmful.
- A one-line banner often does not justify the blocking hook.

## Clear before navigation

- When navigation is initiated by your handler, call `clearRootError()` first.
- Then call the router's navigate function.
- No effect is required for that controlled path.
- A route-change effect can remain as a fallback for links and browser navigation.

## Representative pattern

```tsx
const location = useLocation();
const { clearRootError } = useRootError();

useEffect(() => {
  clearRootError();
}, [location.key, clearRootError]);
```

## Caveats

- Effects run twice in some development StrictMode scenarios; clearing should be idempotent.
- Do not use layout effects during server rendering without an isomorphic strategy.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-006
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
