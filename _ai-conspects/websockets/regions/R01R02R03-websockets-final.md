# R01/R02/R03 - ASP.NET Core and browser WebSockets final transcript v001

Conspect: `websockets`  
File type: **source-preserving final combined transcript**  
Generated: 2026-06-22 UTC

## 0.1 Area overview / reading quality

This sheet connects three layers of WebSocket work:

```text
1. protocol/message semantics
2. .NET and browser API/concurrency patterns
3. production browser auth/origin/backpressure behavior
```

The screenshots are readable enough for a high-confidence semantic transcript. Exact punctuation and full code listings remain preserved in `source/images/` and the final evidence map.

## 1. Core message model

A WebSocket connection is a long-lived, full-duplex connection after an HTTP upgrade handshake. Once upgraded, application data is sent as WebSocket frames rather than ordinary HTTP requests with per-message headers and content types.

The receiver must distinguish `Text`, `Binary`, and `Close` message types. Text payloads are decoded from UTF-8; binary payloads stay as bytes or are passed to a binary parser. A logical WebSocket message may arrive in multiple frames, so receive code must accumulate chunks until `EndOfMessage` is true before treating the payload as complete.

The practical mental model is:

```text
TCP gives a byte stream.
WebSocket adds frames and message boundaries.
The application adds its own envelope/type field and payload schema.
```

This means one application message can be JSON text, a binary document, a ping/ack envelope, or another domain-specific type. The code should dispatch by `WebSocketMessageType` and then by the application-level message type.

## 2. Receive loop and close handling

A normal receive loop repeatedly calls `ReceiveAsync`, appends the returned bytes, and stops accumulating when `EndOfMessage` is true. If `MessageType == Close`, it should not continue parsing the payload as ordinary data.

Close handling has two directions:

- the peer may initiate a close;
- the local side may initiate a close.

`CloseOutputAsync` sends the local close frame while still allowing the receive side to observe the peer's response and any in-flight receive behavior. `CloseAsync` performs the close handshake and waits for the peer's close response. `Abort` terminates immediately without a graceful WebSocket close handshake.

Use a graceful close when the connection is still healthy. Use abort only when the connection is broken, cancellation/timeout requires immediate termination, or the protocol state cannot be completed safely.

Close codes and reasons are protocol metadata. Browsers and servers should validate allowed close-code ranges and keep reason strings within protocol limits. Application code can inspect the close status/reason to choose reconnect, logout, retry, or final shutdown behavior.

## 3. Browser WebSocket processing

The browser `WebSocket` object exposes events such as `open`, `message`, `error`, and `close`, plus properties such as `readyState`, `protocol`, `extensions`, `binaryType`, and `bufferedAmount`.

`event.data` may be a string for text messages or `Blob`/`ArrayBuffer` for binary messages, depending on `binaryType`. The client must branch by runtime type and then parse the application envelope.

React code should install and clean up WebSocket event handlers in an effect. Handler identity and stale closures matter: use stable callbacks or a ref-backed event callback pattern when the effect should not restart every time a callback changes.

The browser `close` event exposes code, reason, and whether the close was clean. UI state should be updated from the close event rather than assuming a successful close immediately after calling `socket.close()`.

## 4. ClientWebSocket and ASP.NET Core server flow

On the .NET side, `ClientWebSocket` provides connect, send, receive, close-output, close and abort operations. On the ASP.NET Core server, the endpoint verifies `HttpContext.WebSockets.IsWebSocketRequest`, accepts the socket, and then runs receive/send processing until close or cancellation.

A typical server connection object keeps:

```text
- the accepted WebSocket
- a receive loop
- an outgoing channel/queue
- one send loop
- cancellation and close coordination
```

The endpoint should not return until the connection lifecycle is complete. Connection cleanup belongs in `finally`, including closing or aborting the socket and completing the outgoing queue.

## 5. Concurrency rule and channels

A key API rule is:

```text
one active send + one active receive are allowed in parallel;
multiple concurrent sends are not safe;
multiple concurrent receives are not safe.
```

Therefore, code with several producers should not call `SendAsync` directly from every producer. Instead, writers push outgoing messages into `Channel<T>` or another queue, and one dedicated send loop drains them sequentially.

The send loop is started as a separate task before the receive loop blocks. Later, shutdown cancels/completes the channel and waits for both loops in a controlled way. This design allows request handlers, timers, background services and broadcast code to share one connection without overlapping sends.

## 6. Subprotocols and frames

The WebSocket protocol is the transport protocol. A subprotocol is the application protocol negotiated during the upgrade handshake, for example a versioned chat or telemetry protocol.

The browser passes requested subprotocols when constructing `new WebSocket(url, protocols)`. The server selects one accepted subprotocol when calling `AcceptWebSocketAsync`. Both sides can inspect the negotiated protocol afterward (`socket.protocol` in the browser and `WebSocket.SubProtocol` in .NET).

A subprotocol does not create HTTP-style headers for each message. It is a connection-level agreement about how subsequent frames/messages will be interpreted.

## 7. Backpressure and `bufferedAmount`

Browser `bufferedAmount` reports bytes queued by the browser but not yet transmitted. Ignoring a continuously growing value can cause memory growth, lag, stale UI state, message bursts after network recovery and eventual connection instability.

Possible policies include:

- pause non-essential sends above a threshold;
- coalesce replaceable state updates;
- drop obsolete telemetry/UI messages;
- show a sending/reconnecting indicator;
- use application acknowledgements when the UI needs delivery confirmation.

`bufferedAmount` only tells that bytes are queued locally; it is not proof that the server processed the message. For processing confirmation, use an application-level ack with a message ID.

## 8. Authentication, cookies, JWT and Origin

The initial WebSocket connection starts as an HTTP upgrade request, so ASP.NET Core authentication can run before the socket is accepted.

Cookie authentication works naturally for same-site browser connections because the browser sends matching cookies during the upgrade. Cross-site cookie behavior still follows cookie rules such as SameSite, Secure and domain/path matching.

Browsers do not allow arbitrary Authorization headers in the native WebSocket constructor. JWT-based browser clients commonly pass a short-lived token in the query string during the secure `wss://` upgrade, then the server extracts it for authentication. Query tokens must be treated carefully because URLs can be logged; use TLS, short expiration, log redaction and preferably a dedicated one-time connection token.

`Origin` identifies the web page origin that initiated the browser connection. Browser JavaScript cannot normally forge it, so servers should validate allowed origins for browser clients. However, non-browser clients can send arbitrary headers, so Origin is an anti-cross-site-browser control, not a complete authentication mechanism.

WebSocket upgrade does not use the normal browser CORS preflight mechanism. The server must explicitly validate Origin/allowed origins and authenticate the upgrade request.

## 9. Final practical checklist

```text
- accumulate fragments until EndOfMessage
- branch Text/Binary/Close explicitly
- serialize all sends through one send loop
- allow one send and one receive in parallel
- coordinate close handshake and cancellation
- negotiate and verify subprotocols
- monitor bufferedAmount/backpressure
- authenticate before AcceptWebSocketAsync
- validate browser Origin independently of authentication
- use app-level message IDs and acknowledgements when delivery/processing matters
```

## 10. Coverage

```text
R01: 4 image uses + 27 labels
R02: 7 image uses + 16 labels
R03: 10 image uses + 10 labels
Total: 21 image uses + 53 labels
Remaining unclosed: 0
```
