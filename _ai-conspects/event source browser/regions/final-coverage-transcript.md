# EventSource browser — final coverage transcript v001

## 0.1 Area understanding

This conspect explains browser Server-Sent Events through the `EventSource` API, including client event handlers, automatic reconnection, `Last-Event-ID`, server event fields and the `retry` directive.

Reading quality: high; the screenshots are compact but the browser/server flow is clear.

## R01 — EventSource client basics

- `new EventSource(url)` opens a long-lived HTTP connection for server-to-browser events.
- Standard client hooks include `onopen`, `onmessage` and `onerror`.
- `readyState` exposes `CONNECTING`, `OPEN` or `CLOSED`; `url` and `withCredentials` describe the configured connection.
- Unnamed server events arrive through `onmessage`.
- Named events use the server `event:` field and are consumed with `addEventListener("event-name", handler)`.
- Calling `close()` permanently closes that client instance and disables automatic reconnect.

## R02 — automatic browser reconnect

- If the connection drops unexpectedly, the browser normally moves to `CONNECTING`, waits for the reconnect delay and opens the same URL again.
- The browser remembers the most recent server `id:` value.
- On reconnect it sends that value as `Last-Event-ID`, allowing the server to resume after the last delivered event.
- Reconnect can trigger ordinary lifecycle handlers again, especially `open` and `error`.
- Explicit `close()` is the main client-side way to stop reconnection.

## R03 — fields controlled by the server

An SSE record may contain:

```text
event: custom event type
id: event identifier
data: payload line (repeatable)
retry: reconnect delay in milliseconds
```

- Blank line terminates and dispatches one event.
- Multiple `data:` lines are joined into one payload separated by newline characters.
- `retry:` changes the browser reconnect delay for future reconnect attempts; it is not a sleep before each message.
- The server can send `retry` once near startup or update it dynamically when overload/network conditions change.

## R04 — retry timeline

- Normal streaming continues while the socket is healthy; `retry` merely stores the next reconnect delay.
- A later server event can change the delay, for example from a fast reconnect to a slower backoff.
- When a deploy, proxy timeout or network interruption closes the socket, the browser raises an error, enters `CONNECTING`, waits approximately the current retry delay, reconnects, sends `Last-Event-ID`, and fires `open` on success.
- After recovery the server may reduce `retry` again for faster future reconnects.

## Final practical model

```text
server emits id/event/data/retry records
browser dispatches events
unexpected disconnect -> wait retry -> reconnect with Last-Event-ID
explicit EventSource.close() -> no reconnect
```

Coverage: 20 image uses + 8 labels processed; 0 unclosed.
