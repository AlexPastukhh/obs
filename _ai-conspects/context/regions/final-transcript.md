# Final semantic transcript — React Context

Authoritative source: `source/context.svg`

---

# R01 — provider placement and session context

```tsx
const queryClient =
  new QueryClient();

createRoot(
  document.getElementById("root")!,
).render(
  <StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <SessionProvider>
        <RouterProvider
          router={router}
        />
      </SessionProvider>
    </QueryClientProvider>
  </StrictMode>,
);
```

Provider placement defines which descendants can read the value and how long the provider state lives.

A session provider can expose React Query data:

```tsx
const SessionContext =
  createContext<
    SessionState | null | undefined
  >(undefined);

function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } =
    useQuery({
      queryKey: ["session"],
      queryFn: getUser,
      staleTime: 5 * 60 * 1000,
    });

  return (
    <SessionContext.Provider
      value={data}
    >
      {children}
    </SessionContext.Provider>
  );
}
```

A context can expose data obtained from another state system, but avoid wrapping everything automatically: components can often call the original query hook directly.

---

# R02 — propagation and rerenders

A context consumer subscribes to the nearest provider value:

```tsx
const value =
  useContext(MyContext);
```

When the provider's `value` changes by `Object.is` comparison, React schedules consumers of that context to rerender.

```tsx
<MyContext.Provider
  value={{
    value,
    setValue,
  }}
>
```

The object literal is new on every provider render. Memoize when unrelated provider rerenders would otherwise create a new value:

```tsx
const contextValue =
  useMemo(
    () => ({
      value,
      setValue,
    }),
    [value],
  );
```

The state setter identity is stable and normally does not require `useCallback`.

## Split value and actions

When components need different parts, split contexts:

```tsx
const ValueContext =
  createContext<
    number | undefined
  >(undefined);

const SetValueContext =
  createContext<
    React.Dispatch<
      React.SetStateAction<number>
    > | undefined
  >(undefined);
```

```tsx
function ValueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    value,
    setValue,
  ] = useState(0);

  return (
    <ValueContext.Provider
      value={value}
    >
      <SetValueContext.Provider
        value={setValue}
      >
        {children}
      </SetValueContext.Provider>
    </ValueContext.Provider>
  );
}
```

Updating `value` rerenders consumers of `ValueContext`; components that only consume the stable setter context need not rerender for that update.

Splitting contexts is useful when read and write consumers have substantially different update needs. It is not mandatory for small trees.

---

# R03 — safe custom hooks

Use `undefined` as the missing-provider sentinel:

```tsx
const CountContext =
  createContext<
    CountContextValue | undefined
  >(undefined);
```

Guard in a custom hook:

```tsx
export function useCountContext() {
  const value =
    useContext(CountContext);

  if (value === undefined) {
    throw new Error(
      "useCountContext must be used " +
      "inside CountProvider"
    );
  }

  return value;
}
```

This provides:

```text
one import for consumers
centralized error message
non-optional return type after the guard
freedom to refactor the context internals
```

Provider:

```tsx
function CountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    count,
    setCount,
  ] = useState(0);

  const value =
    useMemo(
      () => ({
        count,
        setCount,
      }),
      [count],
    );

  return (
    <CountContext.Provider
      value={value}
    >
      {children}
    </CountContext.Provider>
  );
}
```

## Checklist

```text
[ ] place providers at the intended lifetime boundary
[ ] understand all consumers of one context value are notified together
[ ] memoize object values when provider rerenders can be unrelated
[ ] split read/action contexts only when it improves update isolation
[ ] use a custom hook with a missing-provider guard
[ ] do not memoize the raw setState setter unnecessarily
```

# Coverage

```text
unique embedded screenshots: 6
image uses: 6
native SVG labels: 8
duplicate extra placements: 0

processed image uses: 6
processed text labels: 8
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
