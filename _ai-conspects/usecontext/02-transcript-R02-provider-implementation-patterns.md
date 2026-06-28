# Regional transcript — R02: Provider implementation patterns

Conspect: `usecontext`  
Generated: 2026-06-28 14:30:00 UTC

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

A robust Provider owns state, exposes narrow hooks, and keeps command identity stable. `useReducer` is particularly convenient because its dispatch function has stable identity.

## Reducer provider

- Keep state transition logic in a reducer.
- Provide state and dispatch through separate contexts.
- Nest the two Providers in one domain Provider component.
- Throw a clear error from custom hooks used outside the Provider.

## State plus callbacks

- When using `useState`, wrap action callbacks in `useCallback` if their identity is consumed by effects or memoized children.
- Memoize a combined context object only after stabilizing its function members.
- Avoid exposing the raw setter when domain-specific commands make invariants clearer.

## Provider placement

- Place the Provider at the lowest common ancestor that needs the state.
- Do not put page-local state in the application root without a sharing requirement.

## Representative pattern

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

## Caveats

- Context updates bypass `React.memo` when the component consumes the changed context.
- Server and client component boundaries may constrain where stateful Providers can be used.

## Source labels

- `OR`

## Covered text elements

```text
T-001
```

## Covered screenshot uses

```text
IU-003
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
