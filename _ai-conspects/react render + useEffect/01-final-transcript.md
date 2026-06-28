# Final semantic transcript — React render + useEffect

Authoritative source: `source/react render + useEffect.svg`

---

# R01 — clearing state on actions and route changes

## Prefer direct event logic when the cause is an action

When a button click should clear a root error before continuing, perform the work in the handler:

```tsx
const onClick = () => {
  clearRootError();
  doSomething();
};
```

For navigation:

```tsx
const navigate = useNavigate();

const onNavigate = (to: string) => {
  clearRootError();
  navigate(to);
};
```

This is clearer than creating an effect whose only purpose is to react to a state change caused by the same click.

## Clear on route changes

When the requirement is “clear whenever the route changes,” an effect is appropriate because the component is synchronizing with an external routing value:

```tsx
const { pathname } = useLocation();
const { clearRootError } = useErrorContext();

useEffect(() => {
  clearRootError();
}, [pathname, clearRootError]);
```

The dependency represents the event source: a new location.

## `useEffect` versus `useLayoutEffect`

Typical timing:

```text
render
commit DOM changes
browser paint
useEffect
```

`useLayoutEffect` runs after React commits DOM changes but before the browser paints.

Use `useEffect` by default. Use `useLayoutEffect` only when a visible intermediate frame is unacceptable or layout must be read/measured synchronously before paint.

For a short-lived error banner:

```text
useEffect
    usually correct and non-blocking

useLayoutEffect
    justified only when one-frame flicker is a real UX problem
```

`useLayoutEffect` blocks painting, so unnecessary usage can hurt responsiveness.

---

# R02 — render, commit, paint and effect lifecycle

## What runs during render

A function component is called during render:

```tsx
function Counter() {
  console.log("render");

  const [count, setCount] =
    useState(0);

  return <p>{count}</p>;
}
```

Render must stay pure:

```text
same props/state/context
→ same JSX description
→ no external side effects
```

Do not start subscriptions, write storage, mutate the DOM or call APIs directly during render.

## Effect lifecycle

```tsx
useEffect(() => {
  console.log("effect");

  return () => {
    console.log("cleanup");
  };
}, [dependency]);
```

Initial mount:

```text
render
commit
paint
effect setup
```

Dependency change:

```text
render
commit
paint
previous cleanup
new effect setup
```

Unmount:

```text
cleanup
```

The cleanup belongs to the preceding effect instance.

## Valid effect use cases

Effects synchronize React with systems outside React:

```text
DOM/browser APIs
event listeners
timers
network subscriptions
observers
WebSocket connections
imperative third-party widgets
storage synchronization
data fetching when not handled elsewhere
```

Examples:

```tsx
useEffect(() => {
  document.title = title;
}, [title]);
```

```tsx
useEffect(() => {
  const onResize = () => {
    // synchronize state
  };

  window.addEventListener(
    "resize",
    onResize,
  );

  return () => {
    window.removeEventListener(
      "resize",
      onResize,
    );
  };
}, []);
```

## Effects are not for derived state

Avoid:

```tsx
const [fullName, setFullName] =
  useState("");

useEffect(() => {
  setFullName(
    `${firstName} ${lastName}`,
  );
}, [firstName, lastName]);
```

Prefer computing during render:

```tsx
const fullName =
  `${firstName} ${lastName}`;
```

This avoids an extra render and keeps one source of truth.

---

# R03 — context, stable identities and component lifetime

## Context provider shape

```tsx
type PageErrorContextValue = {
  pageError?: string;
  setPageError:
    React.Dispatch<
      React.SetStateAction<
        string | undefined
      >
    >;
  removePageError: () => void;
};
```

```tsx
const PageErrorContext =
  createContext<
    PageErrorContextValue | undefined
  >(undefined);

export function PageErrorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    pageError,
    setPageError,
  ] = useState<string>();

  const removePageError =
    useCallback(() => {
      setPageError(undefined);
    }, []);

  const value = useMemo(
    () => ({
      pageError,
      setPageError,
      removePageError,
    }),
    [pageError, removePageError],
  );

  return (
    <PageErrorContext.Provider
      value={value}
    >
      {children}
    </PageErrorContext.Provider>
  );
}
```

React state setter identity is stable. A callback that only calls the setter can use an empty dependency array.

Memoizing the provider value prevents consumers from seeing a new object solely because the provider rendered for an unrelated reason.

## Custom hook guard

```tsx
export function usePageError() {
  const value =
    useContext(PageErrorContext);

  if (!value) {
    throw new Error(
      "usePageError must be used " +
      "inside PageErrorProvider",
    );
  }

  return value;
}
```

## Route layout lifetime

State survives re-renders while the component instance remains mounted.

It resets when React removes that component instance from the tree, for example:

```text
different route branch replaces the layout
a changed key forces remount
conditional rendering removes the provider
the application root is recreated
```

Place a provider above the route boundary when its state must persist across child pages. Place it inside a route branch when navigation should naturally reset it.

---

# R04 — cleanup, StrictMode and stale closures

## Cleanup rules

Return cleanup for resources that must be undone:

```tsx
useEffect(() => {
  const id =
    setInterval(tick, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

```tsx
useEffect(() => {
  const unsubscribe =
    store.subscribe(listener);

  return unsubscribe;
}, [store]);
```

Common cleanup targets:

```text
event listeners
subscriptions
timers
observers
sockets
abortable requests
imperative widgets
```

Do not return arbitrary values from an effect. Return either nothing or a cleanup function.

## Stale closures

This captures the initial `count`:

```tsx
useEffect(() => {
  const id =
    setInterval(() => {
      console.log(count);
    }, 1000);

  return () => clearInterval(id);
}, []);
```

Possible fixes depend on intent:

```text
include count in dependencies
use a functional state update
store the latest mutable value in a ref
redesign so the effect does not need the value
```

Functional update:

```tsx
setCount(current => current + 1);
```

## StrictMode development behavior

In development, React StrictMode may intentionally perform:

```text
effect setup
cleanup
effect setup
```

This helps detect effects that:

```text
leak resources
depend on running once
lack cleanup
mutate shared state unsafely
```

Do not “fix” this by suppressing the second run. Make the effect idempotent and clean up correctly.

## Mental checklist

Before adding an effect, ask:

```text
Am I synchronizing with something outside React?
Does this require cleanup?
Could this be computed during render?
Could this happen directly in the event handler?
Are all reactive values represented in dependencies?
Can the setup safely run again after cleanup?
```

# Coverage

```text
unique embedded screenshots: 22
image uses: 22
native SVG labels: 22
duplicate extra placements: 0

processed image uses: 22
processed text labels: 22
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
