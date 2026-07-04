# Technical corrections — EventSource / SSE

1. EventSource reconnect is automatic for normal connection loss.
2. `retry: <ms>` sets the future reconnect delay; it does not pause an already-open stream.
3. `id:` is remembered by the browser and sent back as `Last-Event-ID` on reconnect.
4. Multiple `data:` lines are joined with `\n` in `MessageEvent.data`.
5. Custom fields are not first-class `MessageEvent` properties; put extra data inside JSON in `data:`.
6. SSE frames end with a blank line.
7. The server should set `Content-Type: text/event-stream`, flush periodically, and stop when request cancellation is signaled.
8. EventSource is one-way server-to-client; use fetch/WebSocket if the client must send arbitrary messages back on the same channel.
