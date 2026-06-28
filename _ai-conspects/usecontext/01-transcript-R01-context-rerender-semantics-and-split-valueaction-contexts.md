# Regional transcript — R01: Context rerender semantics and split value/action contexts

Conspect: `usecontext`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A context consumer rerenders when the value supplied by its nearest Provider changes according to `Object.is`. React does not automatically subscribe a consumer to only the fields it reads.

## Value identity

- Creating a new provider object on every render changes context value identity.
- Every consumer of that context is eligible to rerender.
- `useMemo` can stabilize the object when its dependencies do not change.
- When state changes, consumers still receive the new context value as intended.

## Split contexts

- Put frequently changing state in one context.
- Put stable commands or dispatch in a second context.
- Components that use only commands avoid rerendering when state changes.
- State consumers still rerender whenever the subscribed state context changes.

## Limits

- Splitting every field into a context can create excessive provider complexity.
- Context is not a fine-grained state selector by default.
- External stores or selector-based context libraries are better for large frequently changing state graphs.

## Representative pattern

```tsx
const CounterStateContext = createContext<number | null>(null);
const CounterDispatchContext =
  createContext<React.Dispatch<CounterAction> | null>(null);
```

## Caveats

- Memoizing the provider value is not a substitute for correct state boundaries.
- Profile before optimizing small context trees.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-001, IU-002
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
