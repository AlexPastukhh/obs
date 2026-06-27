# R01/R02/R03 — WebSockets corrected final transcript v003

Conspect: `websockets`  
Authoritative source: `source/websockets.svg`  
Corrected source coverage: **207 screenshot uses + 53 canvas labels**  
Previous transcript: `regions/R01R02R03-websockets-final.md`

This document supersedes the earlier 21-screenshot semantic transcript while preserving it as historical evidence. The corrected SVG added 186 missing screenshots; every corrected screenshot now has a stable `S-###` identifier in `data/image-review-ledger-v003.json`.

---

## 1. Mental model: HTTP upgrade, then message-oriented full duplex

A browser or .NET client first performs an HTTP WebSocket upgrade handshake. Authentication, cookies, query-string token extraction, `Origin` checks and subprotocol negotiation all happen during this HTTP phase.

After a successful upgrade:

```text
HTTP request/response semantics stop.
The connection remains open.
Application data travels as WebSocket frames.
Frames are reassembled into logical WebSocket messages.
The application defines its own message envelope and payload schema.
```

A WebSocket is therefore not “HTTP requests over one connection.” Individual messages do not have ordinary HTTP headers, content types or status codes. If the application needs metadata such as a command name, correlation ID, version, content type or acknowledgement ID, that metadata belongs in the application message envelope.

Representative envelope:

```json
{
  "type": "chat.send",
  "id": "01J...",
  "payload": {
    "text": "hello"
  }
}
```

Binary protocols can encode the same logical fields using MessagePack, protobuf or a custom format.

---

# R01 — Core protocol, receive/send loops and close semantics

Coverage: **S-001–S-104**.

## 2. Message types and fragmentation

`ReceiveAsync` returns a chunk, not necessarily a complete logical message. The result exposes:

```text
Count
MessageType
EndOfMessage
CloseStatus
CloseStatusDescription
```

The receiver must continue collecting chunks until `EndOfMessage == true`. Parsing each receive result independently is incorrect because one logical text or binary message may be fragmented across several frames.

A safe receive helper:

```csharp
static async Task<(WebSocketMessageType Type, byte[] Payload)?> ReceiveMessageAsync(
    WebSocket socket,
    CancellationToken cancellationToken)
{
    var buffer = new byte[8 * 1024];
    using var message = new MemoryStream();

    while (true)
    {
        var result = await socket.ReceiveAsync(buffer, cancellationToken);

        if (result.MessageType == WebSocketMessageType.Close)
            return null;

        message.Write(buffer, 0, result.Count);

        if (result.EndOfMessage)
            return (result.MessageType, message.ToArray());
    }
}
```

Production code should enforce a maximum logical message size while accumulating. Without a limit, an attacker or buggy peer can make the process allocate an unbounded `MemoryStream`.

## 3. Text versus binary

For text messages:

```csharp
var text = Encoding.UTF8.GetString(payload);
```

Text must be decoded only after the complete logical message has been assembled. Splitting a multibyte UTF-8 character between frames is valid; decoding each fragment separately can corrupt the character.

For binary messages, preserve the bytes and dispatch to the selected binary protocol:

```csharp
switch (type)
{
    case WebSocketMessageType.Text:
        await HandleTextAsync(Encoding.UTF8.GetString(payload));
        break;

    case WebSocketMessageType.Binary:
        await HandleBinaryAsync(payload);
        break;
}
```

The screenshots cover JSON text, raw binary, file/chunk payloads, MessagePack/protobuf-style payloads and application-specific envelopes. The transport does not infer the payload format for the application.

## 4. Sending

`SendAsync` also works with a message type and an `endOfMessage` flag:

```csharp
static Task SendTextAsync(
    WebSocket socket,
    string text,
    CancellationToken cancellationToken)
{
    var bytes = Encoding.UTF8.GetBytes(text);

    return socket.SendAsync(
        bytes,
        WebSocketMessageType.Text,
        endOfMessage: true,
        cancellationToken);
}
```

Large messages may be deliberately split into several sends. Every intermediate fragment uses `endOfMessage: false`; the final fragment uses `true`.

For typical application messages, sending one complete encoded buffer with `endOfMessage: true` is simpler.

## 5. Browser receiving and sending

Browser client:

```javascript
const socket = new WebSocket("wss://api.example.com/ws", ["chat.v1"]);
socket.binaryType = "arraybuffer";

socket.onopen = () => {
  socket.send(JSON.stringify({ type: "hello" }));
};

socket.onmessage = event => {
  if (typeof event.data === "string") {
    const message = JSON.parse(event.data);
    handleJson(message);
    return;
  }

  if (event.data instanceof ArrayBuffer) {
    handleBinary(new Uint8Array(event.data));
  }
};

socket.onerror = event => {
  console.error("WebSocket transport error", event);
};

socket.onclose = event => {
  console.log(event.code, event.reason, event.wasClean);
};
```

`message` event boundaries correspond to complete logical messages. Browser code normally does not manually reassemble frames.

## 6. React lifecycle

A React component should create the socket inside an effect and close it during cleanup:

```javascript
useEffect(() => {
  const socket = new WebSocket(url);

  socket.onmessage = event => onMessageRef.current(event);
  socket.onclose = event => onCloseRef.current(event);

  return () => socket.close(1000, "component unmounted");
}, [url]);
```

Important points:

- avoid creating a new socket on every render;
- avoid stale closures in event handlers;
- use stable callbacks or refs when handler logic changes independently of connection lifetime;
- remove handlers and close the connection during unmount;
- guard reconnect loops so obsolete effects cannot create parallel connections.

## 7. Server endpoint lifecycle

Minimal ASP.NET Core flow:

```csharp
app.UseWebSockets();

app.Map("/ws", async context =>
{
    if (!context.WebSockets.IsWebSocketRequest)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        return;
    }

    using var socket = await context.WebSockets.AcceptWebSocketAsync("chat.v1");

    try
    {
        await RunConnectionAsync(socket, context.RequestAborted);
    }
    finally
    {
        if (socket.State is WebSocketState.Open or WebSocketState.CloseReceived)
        {
            await socket.CloseOutputAsync(
                WebSocketCloseStatus.NormalClosure,
                "server shutdown",
                CancellationToken.None);
        }
    }
});
```

The endpoint must remain alive for the complete connection lifetime. Returning immediately after `AcceptWebSocketAsync` abandons the connection scope and can dispose request-scoped resources too early.

## 8. Close handshake

Three operations have different meanings:

```text
CloseOutputAsync
    Sends this side's close frame.
    Receive processing can continue while waiting for the peer's close.

CloseAsync
    Performs the close handshake and waits for the peer's close response.

Abort
    Terminates immediately without completing a graceful close handshake.
```

When the peer sends a close frame, inspect `CloseStatus` and `CloseStatusDescription`, stop treating subsequent data as normal application messages and respond with a close frame when the connection is still usable.

Typical close statuses:

```text
1000 Normal Closure
1001 Endpoint Going Away
1002 Protocol Error
1003 Invalid/Unsupported Message Type
1008 Policy Violation
1009 Message Too Big
1011 Internal Server Error
```

Some values are reserved and cannot be sent by applications. Browser `close(code, reason)` only permits valid application-facing ranges. The close reason is limited by the control-frame payload size; because the status code consumes two bytes, the UTF-8 reason must stay within 123 bytes.

Do not put secrets or detailed internal exception information in close reasons.

## 9. Cancellation and cleanup

`HttpContext.RequestAborted` can be passed to the connection loop, but cleanup often needs a separate short timeout or `CancellationToken.None`; the request token may already be cancelled when the close response must be sent.

A connection coordinator should:

```text
1. stop accepting new outbound messages;
2. complete/cancel the outgoing channel;
3. finish or cancel the send loop;
4. stop the receive loop;
5. attempt a bounded graceful close;
6. abort only if graceful completion is impossible;
7. dispose buffers and connection-scoped resources.
```

---

# R02 — API properties, concurrency, subprotocols and frame-level behavior

Coverage: **S-105–S-156**.

## 10. One send and one receive rule

The safe concurrency model for a single `WebSocket` instance is:

```text
one active SendAsync
one active ReceiveAsync
send and receive may run concurrently
multiple overlapping sends are unsafe
multiple overlapping receives are unsafe
```

If many parts of the application can produce outbound messages, do not let every producer call `SendAsync`. Serialize sends through a queue.

## 11. Channel-based send serialization

Connection object:

```csharp
sealed class WebSocketConnection
{
    private readonly WebSocket _socket;
    private readonly Channel<OutgoingMessage> _outgoing =
        Channel.CreateUnbounded<OutgoingMessage>(
            new UnboundedChannelOptions { SingleReader = true });

    public ValueTask QueueAsync(
        OutgoingMessage message,
        CancellationToken cancellationToken = default) =>
        _outgoing.Writer.WriteAsync(message, cancellationToken);

    public async Task RunSendLoopAsync(CancellationToken cancellationToken)
    {
        await foreach (var message in
            _outgoing.Reader.ReadAllAsync(cancellationToken))
        {
            await _socket.SendAsync(
                message.Payload,
                message.MessageType,
                endOfMessage: true,
                cancellationToken);
        }
    }
}
```

`SingleReader = true` documents that one send loop owns the socket's send side. Multiple producers remain safe because they write to the channel, not directly to the socket.

For bounded memory, prefer a bounded channel and choose an explicit full-mode policy:

```text
Wait       — apply producer backpressure
DropOldest — useful for replaceable state updates
DropNewest — preserve earlier queued work
DropWrite  — reject the new message
```

The policy depends on whether messages are commands, telemetry, snapshots or disposable UI updates.

## 12. `ClientWebSocket`

Typical client flow:

```csharp
using var client = new ClientWebSocket();

client.Options.AddSubProtocol("chat.v1");
client.Options.SetRequestHeader("X-Correlation-Id", correlationId);
client.Options.KeepAliveInterval = TimeSpan.FromSeconds(20);

await client.ConnectAsync(uri, cancellationToken);

var sendTask = RunSendLoopAsync(client, cancellationToken);
var receiveTask = RunReceiveLoopAsync(client, cancellationToken);

await Task.WhenAll(sendTask, receiveTask);
```

Useful option categories shown in the recovered screenshots include:

- requested subprotocols;
- cookies and credentials;
- proxy configuration;
- custom handshake headers for non-browser clients;
- client certificates;
- keep-alive behavior;
- HTTP version/version policy for the upgrade request;
- response-detail collection where supported;
- TLS certificate validation hooks.

A custom certificate-validation callback should not blindly return `true` in production. That disables server identity validation and makes man-in-the-middle attacks possible.

## 13. Browser and .NET properties

Common .NET properties:

```text
State
SubProtocol
CloseStatus
CloseStatusDescription
```

Browser properties:

```text
readyState
protocol
extensions
binaryType
bufferedAmount
url
```

`readyState` values are connection-state indicators; they do not guarantee that the application-level peer is healthy. A server heartbeat or application ping/ack may still be required.

## 14. Subprotocol negotiation

The WebSocket protocol is the transport. A subprotocol defines how the application interprets messages.

Browser:

```javascript
const socket = new WebSocket(
  "wss://api.example.com/ws",
  ["chat.v2", "chat.v1"]
);
```

Server:

```csharp
var requested = context.WebSockets.WebSocketRequestedProtocols;

var selected = requested.Contains("chat.v2")
    ? "chat.v2"
    : requested.Contains("chat.v1")
        ? "chat.v1"
        : null;

if (selected is null)
{
    context.Response.StatusCode = StatusCodes.Status400BadRequest;
    return;
}

using var socket =
    await context.WebSockets.AcceptWebSocketAsync(selected);
```

The server selects at most one subprotocol from those requested. After connection:

```text
browser: socket.protocol
.NET:    socket.SubProtocol
```

A missing or unexpected negotiated protocol should be treated as a protocol mismatch rather than silently guessing the payload format.

## 15. HTTP headers and the upgrade

Handshake headers exist only during the upgrade. They may include:

```text
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key
Sec-WebSocket-Version
Sec-WebSocket-Protocol
Origin
Cookie
```

Non-browser clients can often add custom request headers. Native browser `WebSocket` does not provide a general API for arbitrary headers or an `Authorization` header.

The application should not expect headers to accompany later WebSocket messages. Put later metadata inside the application envelope.

## 16. Compression

Per-message compression can reduce bandwidth but introduces trade-offs:

- CPU cost;
- memory/state per connection;
- compression context behavior;
- side-channel risk when secrets and attacker-controlled input are compressed together;
- more complex debugging and interoperability.

Enable compression deliberately and avoid mixing secrets with reflected attacker-controlled data in the same compression context.

---

# R03 — Backpressure, authentication, Origin and production behavior

Coverage: **S-157–S-207**.

## 17. Browser `bufferedAmount`

`bufferedAmount` is the number of bytes queued by the browser for transmission. It does not mean those bytes were delivered or processed.

```javascript
if (socket.bufferedAmount > HIGH_WATER_MARK) {
  pauseNonEssentialUpdates();
}
```

Ignoring a growing send buffer can cause:

```text
memory growth
increasing latency
stale UI updates
large bursts after network recovery
tab slowdown
connection instability
```

A single threshold is not enough. Production code usually uses high/low watermarks:

```text
above high watermark -> stop or coalesce producers
below low watermark  -> resume
```

## 18. Application acknowledgements

Transport success and business processing are different events.

```text
socket.send() returned
    bytes were accepted into the local send queue

bufferedAmount became smaller
    the browser transmitted more bytes

server sent an ack with the same message ID
    application-level processing reached the chosen acknowledgement point
```

Use message IDs and acknowledgements for operations where the UI needs confirmation.

Example:

```json
{ "type": "command", "id": "c-123", "payload": { } }
{ "type": "ack",     "id": "c-123", "status": "processed" }
```

Define whether the ack means received, validated, persisted or fully processed.

## 19. Server-side outbound backpressure

A bounded `Channel<T>` prevents unbounded server memory use. The connection manager should decide what happens when a slow client cannot keep up:

```text
wait for capacity
drop obsolete snapshots
disconnect the slow client
coalesce repeated updates
preserve commands but discard telemetry
```

Pretending every message can be queued forever only hides the failure until memory is exhausted.

## 20. Authentication during the upgrade

ASP.NET Core authentication runs before `AcceptWebSocketAsync`. The resulting `HttpContext.User` remains available to connection code.

Cookie-authenticated browser flow:

```text
1. browser signs in through normal HTTPS endpoints;
2. matching cookies are sent with the WebSocket upgrade;
3. ASP.NET Core authenticates the upgrade request;
4. endpoint checks User and authorization policy;
5. endpoint accepts the WebSocket.
```

Cookies still follow `Domain`, `Path`, `Secure` and `SameSite` rules.

## 21. JWT for browser WebSockets

Native browser WebSocket cannot attach an arbitrary `Authorization` header. A common pattern is a short-lived connection token in the query string:

```javascript
const socket = new WebSocket(
  `wss://api.example.com/ws?access_token=${encodeURIComponent(token)}`
);
```

JWT bearer configuration can read the token only for the WebSocket path:

```csharp
options.Events = new JwtBearerEvents
{
    OnMessageReceived = context =>
    {
        var token = context.Request.Query["access_token"];

        if (!StringValues.IsNullOrEmpty(token) &&
            context.HttpContext.Request.Path.StartsWithSegments("/ws"))
        {
            context.Token = token;
        }

        return Task.CompletedTask;
    }
};
```

Security rules:

- always use `wss://`;
- make connection tokens short lived;
- redact query strings from logs;
- do not put long-lived refresh tokens in the URL;
- scope extraction to the WebSocket endpoint;
- still perform normal signature, issuer, audience and lifetime validation;
- prefer a dedicated one-time connection token when possible.

## 22. `Origin` validation and CORS

Browser WebSocket upgrades do not use ordinary CORS preflight. Enabling CORS middleware is not a WebSocket CSRF defense.

A browser-controlled cross-site page can attempt a WebSocket connection, especially when cookies are involved. Validate the `Origin` header or use allowed-origin configuration before accepting.

```csharp
var origin = context.Request.Headers.Origin.ToString();

if (!AllowedOrigins.Contains(origin))
{
    context.Response.StatusCode = StatusCodes.Status403Forbidden;
    return;
}
```

Important distinction:

```text
Authentication answers: who is this user/client?
Origin validation answers: which browser site initiated this connection?
```

A non-browser client can forge `Origin`, so Origin is not authentication. It is primarily protection against unwanted cross-site browser initiation.

## 23. End-to-end protected endpoint

Representative shape:

```csharp
app.UseAuthentication();
app.UseAuthorization();
app.UseWebSockets();

app.Map("/ws", async context =>
{
    if (context.User.Identity?.IsAuthenticated != true)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return;
    }

    if (!IsAllowedOrigin(context.Request.Headers.Origin))
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return;
    }

    if (!context.WebSockets.IsWebSocketRequest)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        return;
    }

    using var socket =
        await context.WebSockets.AcceptWebSocketAsync("chat.v1");

    await RunConnectionAsync(
        socket,
        context.User,
        context.RequestAborted);
})
.RequireAuthorization();
```

Middleware order matters: authentication and authorization must run before endpoint logic that depends on `HttpContext.User`.

## 24. Connection instability and reconnect strategy

A reconnect loop should use:

```text
exponential backoff
jitter
maximum delay
cancellation on logout/unmount
one active reconnect attempt
state reset after a stable connection
```

Not every close should reconnect:

```text
normal application logout -> no reconnect
policy/auth failure        -> refresh credentials or stop
temporary network loss     -> retry
protocol mismatch          -> stop and surface an error
server restart             -> retry with backoff
```

Avoid replaying non-idempotent commands automatically after reconnect unless the application protocol has message IDs and deduplication.

## 25. Debugging and observability

Useful diagnostics:

```text
connection ID and authenticated user ID
selected subprotocol
close code/reason
receive/send loop termination cause
message ID and application type
queue depth and dropped-message count
browser bufferedAmount
reconnect attempt and delay
origin validation result
```

Do not log access tokens, cookies, full query strings or confidential payloads.

Browser DevTools can inspect the upgrade request and WebSocket frames. Server logs should distinguish:

```text
transport disconnect
graceful close
authentication failure
origin rejection
protocol violation
message-too-large rejection
application handler failure
slow-client eviction
```

## 26. Production checklist

```text
[ ] call UseWebSockets before mapping/handling WebSocket endpoints
[ ] authenticate and authorize before AcceptWebSocketAsync
[ ] validate browser Origin independently of authentication
[ ] negotiate a supported subprotocol explicitly
[ ] collect ReceiveAsync fragments until EndOfMessage
[ ] enforce maximum logical message size
[ ] distinguish Text, Binary and Close
[ ] serialize sends through one send loop
[ ] allow one send and one receive concurrently
[ ] use bounded queues or explicit slow-client policy
[ ] treat bufferedAmount as local queue pressure, not delivery confirmation
[ ] use application message IDs and acknowledgements when processing matters
[ ] coordinate cancellation and the close handshake
[ ] keep query-string connection tokens short-lived and out of logs
[ ] add reconnect backoff, jitter and cancellation
[ ] record close causes and queue pressure without logging secrets
```

---

## 27. Corrected coverage

```text
R01: S-001–S-104 = 104 image uses + 27 labels
R02: S-105–S-156 = 52 image uses + 16 labels
R03: S-157–S-207 = 51 image uses + 10 labels

Total corrected source:
207 image uses
53 canvas labels
260 reviewed source items

Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```

Machine-readable evidence:

```text
data/image-review-ledger-v003.json
data/image-review-ledger-v003.csv
data/final-coverage-audit-v003.json
data/final-coverage-audit-v003.csv
```
