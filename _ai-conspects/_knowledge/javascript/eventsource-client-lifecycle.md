# Browser EventSource client lifecycle

Knowledge ID: `javascript.eventsource-client-lifecycle`

Topic: `javascript`

## Opening and observing the connection

```js
const source = new EventSource("/events");

source.onopen = () => {
  // Connection is open.
};

source.onmessage = (event) => {
  // Unnamed SSE event.
  console.log(event.data);
};

source.onerror = () => {
  // The connection failed or was interrupted.
};
```

`new EventSource(url)` opens a long-lived HTTP connection for server-to-browser events. Its standard hooks are `onopen`, `onmessage`, and `onerror`.

`readyState` reports `CONNECTING`, `OPEN`, or `CLOSED`. `url` exposes the configured URL, and `withCredentials` describes whether the connection was configured to use credentials.

Unnamed server events are delivered to `onmessage`. A named SSE event uses the server's `event:` field and is handled by its name:

```js
source.addEventListener("inventory-changed", (event) => {
  console.log(event.data);
});
```

## Unexpected disconnect and reconnect

When the connection drops unexpectedly, the browser normally:

```text
enters CONNECTING
-> waits for the current reconnect delay
-> opens the same URL again
```

Ordinary lifecycle handlers may run again during this process: interruption can raise `error`, and a successful replacement connection raises `open`.

The browser remembers the latest server `id:` and sends it as `Last-Event-ID` when reconnecting. The server can use that value to resume after the last delivered event rather than blindly starting over.

## Permanent client close

```js
source.close();
```

`close()` permanently closes that `EventSource` instance and disables its automatic reconnect. An unexpected transport failure and an explicit close therefore have different lifecycle outcomes.

## What should be recallable

- How to create an `EventSource` and use `onopen`, `onmessage`, `onerror`, and named-event listeners.
- What `readyState`, `url`, and `withCredentials` describe.
- The browser's automatic reconnect lifecycle and repeated lifecycle callbacks.
- How remembered event IDs become `Last-Event-ID`, and why `close()` stops reconnection.

## Related knowledge

- `http.sse-event-stream-reconnection` defines the server fields, record framing, retry directive, and resume timeline consumed by this browser API.

## Sources

- Workspace: `_ai-conspects/event source browser/`
- Processed source: `regions/final-coverage-transcript.md`, R01–R02 and final model
- Original SVG: `source/event source browser.svg`
