# SSE event framing, retry, and reconnection

Knowledge ID: `http.sse-event-stream-reconnection`

Topic: `http`

## Event-stream fields and framing

An SSE record can contain:

```text
event: custom event type
id: event identifier
data: payload line
retry: reconnect delay in milliseconds
```

A blank line terminates and dispatches one event. `data:` is repeatable: multiple data lines are joined into one payload with newline characters. `event:` selects the named browser event; without it, the event is delivered as the ordinary message event. `id:` supplies the event identifier remembered for resumption.

## What `retry` controls

`retry:` updates the browser's delay for future reconnect attempts. It is not a sleep before each message, so normal streaming continues without that delay while the socket is healthy.

The server may send `retry` once near startup or change it dynamically—for example, increasing it during overload or unstable network conditions and reducing it after recovery.

## Disconnect and recovery timeline

```text
server emits id/event/data/retry records
-> browser dispatches events while the connection is healthy
-> deploy, proxy timeout, or network interruption closes the socket
-> browser raises error and enters CONNECTING
-> browser waits approximately the current retry delay
-> browser reconnects to the same URL with Last-Event-ID
-> successful connection raises open
-> server resumes and may update retry again
```

`Last-Event-ID` is the browser's remembered most recent `id:` value. It gives the server the event identifier needed to resume after the last delivered event.

Explicit `EventSource.close()` is different from a failed socket: it permanently closes that client instance and prevents the reconnect sequence.

## What should be recallable

- The meanings of `event`, `id`, repeatable `data`, and `retry`, including blank-line framing.
- Why `retry` affects only future reconnects and how the server can adjust it dynamically.
- The complete healthy-stream → interruption → wait → `Last-Event-ID` → reopen timeline.
- The distinction between unexpected disconnection and explicit client closure.

## Related knowledge

- `javascript.eventsource-client-lifecycle` covers the browser object, lifecycle handlers, ready states, named listeners, and `close()` API.

## Sources

- Workspace: `_ai-conspects/event source browser/`
- Processed source: `regions/final-coverage-transcript.md`, R02–R04 and final model
- Original SVG: `source/event source browser.svg`
