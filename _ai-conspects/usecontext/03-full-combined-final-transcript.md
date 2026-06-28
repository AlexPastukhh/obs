# Full combined final transcript — usecontext

Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
meaningful text elements: 1 / 1
unique embedded screenshots: 3 / 3
screenshot uses: 3 / 3
repeated placements retained: 0
regions: 2 / 2
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Context rerender semantics and split value/action contexts

A context consumer rerenders when the value supplied by its nearest Provider changes according to `Object.is`. React does not automatically subscribe a consumer to only the fields it reads.

### Value identity

- Creating a new provider object on every render changes context value identity.
- Every consumer of that context is eligible to rerender.
- `useMemo` can stabilize the object when its dependencies do not change.
- When state changes, consumers still receive the new context value as intended.

### Split contexts

- Put frequently changing state in one context.
- Put stable commands or dispatch in a second context.
- Components that use only commands avoid rerendering when state changes.
- State consumers still rerender whenever the subscribed state context changes.

### Limits

- Splitting every field into a context can create excessive provider complexity.
- Context is not a fine-grained state selector by default.
- External stores or selector-based context libraries are better for large frequently changing state graphs.

### Representative pattern

```tsx
const CounterStateContext = createContext<number | null>(null);
const CounterDispatchContext =
  createContext<React.Dispatch<CounterAction> | null>(null);
```

### Caveats

- Memoizing the provider value is not a substitute for correct state boundaries.
- Profile before optimizing small context trees.

## R02 — Provider implementation patterns

A robust Provider owns state, exposes narrow hooks, and keeps command identity stable. `useReducer` is particularly convenient because its dispatch function has stable identity.

### Reducer provider

- Keep state transition logic in a reducer.
- Provide state and dispatch through separate contexts.
- Nest the two Providers in one domain Provider component.
- Throw a clear error from custom hooks used outside the Provider.

### State plus callbacks

- When using `useState`, wrap action callbacks in `useCallback` if their identity is consumed by effects or memoized children.
- Memoize a combined context object only after stabilizing its function members.
- Avoid exposing the raw setter when domain-specific commands make invariants clearer.

### Provider placement

- Place the Provider at the lowest common ancestor that needs the state.
- Do not put page-local state in the application root without a sharing requirement.

### Representative pattern

```tsx
function CounterProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterDispatchContext.Provider value={dispatch}>
      <CounterStateContext.Provider value={state}>
        {children}
      </CounterStateContext.Provider>
    </CounterDispatchContext.Provider>
  );
}
```

### Caveats

- Context updates bypass `React.memo` when the component consumes the changed context.
- Server and client component boundaries may constrain where stateful Providers can be used.

## Regional source map

### R01

- transcript: `01-transcript-R01-context-rerender-semantics-and-split-valueaction-contexts.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-provider-implementation-patterns.md`
- text elements: `1`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
runtime/library/database-version details and original examples.
