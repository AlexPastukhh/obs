# Final semantic transcript — React `useRef`, effect-created objects and latest values

Authoritative source: `source/useref, when need to have ref from obj created in useeffect + when need to access someting inside effect without incl into dep array.svg`

## Mutable value without rerender

```tsx
const socketRef =
  useRef<WebSocket | null>(
    null
  );
```

A ref object survives renders. Updating `.current` does not schedule a rerender:

```tsx
socketRef.current =
  socket;
```

Use state when the UI must update. Use a ref for imperative mutable data that does not directly determine JSX.

## Object created in an effect, used elsewhere

```tsx
function Chat() {
  const socketRef =
    useRef<WebSocket | null>(
      null
    );

  useEffect(() => {
    const socket =
      new WebSocket(url);

    socketRef.current =
      socket;

    return () => {
      socketRef.current =
        null;

      socket.close();
    };
  }, [url]);

  const sendJson =
    (value: unknown) => {
      const socket =
        socketRef.current;

      if (
        socket?.readyState
        !== WebSocket.OPEN
      ) {
        return;
      }

      socket.send(
        JSON.stringify(value)
      );
    };

  ...
}
```

The effect owns setup and cleanup. Other handlers can access the current instance through the ref.

## Reading latest values without resubscribing

Sometimes a long-lived subscription needs the latest callback/data but should not reconnect whenever that value changes.

```tsx
const onMessageRef =
  useRef(onMessage);

useEffect(() => {
  onMessageRef.current =
    onMessage;
}, [onMessage]);

useEffect(() => {
  const socket =
    new WebSocket(url);

  socket.addEventListener(
    "message",
    event => {
      onMessageRef.current(
        event.data
      );
    },
  );

  return () => {
    socket.close();
  };
}, [url]);
```

This separates:

```text
subscription lifetime
    depends on url

latest callback used by subscription
    stored in ref
```

## Do not use refs to hide dependencies

A ref is appropriate when the latest value is intentionally read at callback execution time and should not control setup lifetime.

It is not a universal way to silence the dependency linter. If a value should recreate the external synchronization, include it in dependencies.

## Render rules

Do not read/write refs during render for observable behavior, except predictable initialization patterns:

```tsx
const objectRef =
  useRef<ExpensiveObject>();

if (!objectRef.current) {
  objectRef.current =
    new ExpensiveObject();
}
```

Prefer lazy state when the value affects rendering.

## Checklist

```text
[ ] state for UI-visible data
[ ] ref for imperative mutable instances
[ ] setup/cleanup external resources in effects
[ ] null the ref during cleanup when useful
[ ] use a latest-value ref only when subscription lifetime is intentionally separate
[ ] do not suppress real dependencies with refs
```


# Coverage

```text
unique embedded screenshots: 4
image uses: 4
native SVG labels: 5
duplicate extra placements: 0

processed image uses: 4
processed text labels: 5
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
