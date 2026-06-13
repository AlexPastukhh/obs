# CH05 - WebSockets/application examples and connection manager channel pattern

Conspect: `channel`  
File type: **source-preserving region transcript**  
Stage: **4 / NEXT03 verified transcript v001**  
Generated: 2026-06-13 06:13:23 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- For WebSockets, channels are useful for serializing outgoing messages.
- Many producers can enqueue outgoing messages while one send loop performs actual SendAsync calls.
- Send loop and receive loop run concurrently over the same connection state.
- Receive loop may enqueue responses such as echo/pong instead of directly sending.
- Other components such as timers, event handlers or background services can also enqueue messages.

Reading quality:
```text
Overall: high.
S-053 is mostly a title/transition screenshot.
S-054 and S-057 are partial code screenshots completed by following sources.
Confidence: high.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-012, S-013, S-021, S-048, S-049, S-050, S-051, S-052, S-053, S-054, S-055, S-056, S-057, S-058, S-059, S-060, S-061
```

Boundary decision:
```text
CH05 covers the application/WebSocket pattern: outgoing channel, send loop, receive loop, controller lifecycle, notify producers and ping/pong flow.
No boundary correction was required for this region in NEXT03.
```

Pending after this region:
```text
none; final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CH05A-S001 | S-012 | IU-012 | `a5267d76ae` | CH05A | `verified-from-source-image` | no | WebSocket channel terms |
| CH05A-S002 | S-013 | IU-013 | `0c073a9b2d` | CH05A | `verified-from-source-image` | no | Producer / consumer WebSocket architecture |
| CH05A-S003 | S-021 | IU-021 | `cdbfdbd4a8` | CH05A | `verified-from-source-image` | no | Common channel pattern in apps |
| CH05B-S001 | S-048 | IU-048 | `e678295334` | CH05B | `verified-from-source-image` | no | Usual WebSocket send/receive loop pattern |
| CH05B-S002 | S-049 | IU-049 | `d7437357fc` | CH05B | `verified-from-source-image` | no | Basic idea of incoming connection and receive loop |
| CH05B-S003 | S-050 | IU-050 | `570ae45a1d` | CH05B | `verified-from-source-image` | no | Why not just await send loop immediately? |
| CH05B-S004 | S-051 | IU-051 | `5731fe231a` | CH05B | `verified-from-source-image` | no | Typical shape: connection object and loops |
| CH05C-S001 | S-052 | IU-052 | `74f1931b64` | CH05C | `verified-from-source-image` | no | OutgoingMessage and SocketConnection classes |
| CH05C-S002 | S-053 | IU-053 | `f8aaedfb4c` | CH05C | `verified-from-source-image` | no | Controller action example header |
| CH05C-S003 | S-054 | IU-054 | `cf8f5e4ddf` | CH05C | `verified-from-source-image` | yes | Controller action accepts WebSocket and starts send loop |
| CH05C-S004 | S-055 | IU-055 | `df5a898bfd` | CH05C | `verified-from-source-image` | no | Controller action finally completes outgoing channel and closes socket |
| CH05C-S005 | S-056 | IU-056 | `84a8dbed34` | CH05C | `verified-from-source-image` | no | SendLoopAsync drains outgoing channel and sends |
| CH05C-S006 | S-057 | IU-057 | `d082a755d1` | CH05C | `verified-from-source-image` | yes | ReceiveLoopAsync reads socket and handles close |
| CH05C-S007 | S-058 | IU-058 | `366666af82` | CH05C | `verified-from-source-image` | no | Receive loop enqueues echo and pong responses |
| CH05C-S008 | S-059 | IU-059 | `80a95f74d5` | CH05C | `verified-from-source-image` | no | More realistic version: other producers can write to outgoing channel |
| CH05C-S009 | S-060 | IU-060 | `12001449c3` | CH05C | `verified-from-source-image` | no | Ping/pong flow example |
| CH05C-S010 | S-061 | IU-061 | `b553a5bc46` | CH05C | `verified-from-source-image` | no | Outgoing channel can be written by other code too |

---

## 2. Verified source transcript

## 2.1 CH05A

### CH05A-S001 / S-012 - `a5267d76ae`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: WebSocket channel terms

#### Visible text

```text
In WebSocket terms, the channel is a queue for outgoing messages.

The slide says:
- many parts of the app want to send messages;
- direct concurrent SendAsync is dangerous;
- only one response/message can be sent at a time;
- one dedicated send loop reads from the channel and sends each item one by one.

Example field:
private readonly Channel<string> _outbound = Channel.CreateUnbounded<string>();
```

#### Visible code

```csharp
private readonly Channel<string> _outbound = Channel.CreateUnbounded<string>();
```

---

### CH05A-S002 / S-013 - `0c073a9b2d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Producer / consumer WebSocket architecture

#### Visible text

```text
Producer:
- some component calls websocketConnection.QueueAsync(message);
- inside QueueAsync, message is written into _outbound.Writer.WriteAsync(...).

Consumer:
- RunSendLoopAsync(webSocket, cancellationToken);
- waits for messages and sends them through the socket.

The slide calls this serialization by architecture: senders produce messages into a queue, and one send loop serializes actual socket writes.
```

#### Visible code

```csharp
public ValueTask QueueAsync(string message)
{
    return _outbound.Writer.WriteAsync(message);
}

public async Task RunSendLoopAsync(WebSocket socket, CancellationToken ct)
{
    await foreach (var msg in _outbound.Reader.ReadAllAsync(ct))
    {
        var bytes = Encoding.UTF8.GetBytes(msg);
        await socket.SendAsync(bytes, WebSocketMessageType.Text, true, ct);
    }
}
```

---

### CH05A-S003 / S-021 - `cdbfdbd4a8`

Metadata:
- status: `verified-from-source-image`
- readability: `medium`
- cut off: `no`
- confidence: `high`
- theme: Common channel pattern in apps

#### Visible text

```text
Common pattern in apps:
- a singleton/background processor owns a Channel<WorkItem>;
- public code calls Enqueue to write work into the channel;
- background loop reads all queued items and processes them.

The visible note says this is often code that requires work without awaiting long synchronous/asynchronous details.
```

#### Visible code

```csharp
public sealed class BackgroundProcessor
{
    private readonly Channel<WorkItem> _channel =
        Channel.CreateUnbounded<WorkItem>();

    public ValueTask Enqueue(WorkItem item)
    {
        return _channel.Writer.WriteAsync(item);
    }

    public async Task RunAsync(CancellationToken ct)
    {
        await foreach (var work in _channel.Reader.ReadAllAsync(ct))
        {
            await work();
        }
    }
}
```

#### Notes

Contact sheet shows the main structure clearly; some lower code is small.

---

## 2.2 CH05B

### CH05B-S001 / S-048 - `e678295334`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Usual WebSocket send/receive loop pattern

#### Visible text

```text
Usual WebSocket pattern:
- start the send loop as a separate task,
- run the receive loop,
- both use the same socket/connection state,
- later await the send loop in a controlled way.

Because WebSockets allow:
- one active send,
- one active receive,
at the same time.

So this is normal:
- SendLoopAsync(...)
- ReceiveLoopAsync(...)
running concurrently.
```

#### Visible code

```csharp
SendLoopAsync(...);
ReceiveLoopAsync(...);
```

---

### CH05B-S002 / S-049 - `d7437357fc`

Metadata:
- status: `verified-from-source-image`
- readability: `medium`
- cut off: `no`
- confidence: `high`
- theme: Basic idea of incoming connection and receive loop

#### Visible text

```text
Basic idea.

Incoming connection:
- creates/accepts a WebSocket connection,
- receives a connection id,
- starts ReceiveLoopAsync(connection, ct).

Receive loop:
- receives messages,
- knows connectionId,
- calls onMessageAsync(connectionId, msg).

Meaning:
- connection setup and receive dispatch are separated,
- receive loop is responsible for reading and routing incoming messages.
```

#### Visible code

```csharp
var socket = await AcceptWebSocketConnection(...);
var connection = ReceiveLoopAsync(connectionId, ct);

await ReceiveLoopAsync(connectionId, ct);

while (true)
{
    var msg = await ReceiveMessageAsync(connectionId, ct);
    await onMessageAsync(connectionId, msg);
}
```

#### Notes

Code is partially small/cropped; transcript captures visible structure and intended flow.

---

### CH05B-S003 / S-050 - `570ae45a1d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why not just await send loop immediately?

#### Visible text

```text
Question: why not just await the send loop immediately?

Because the send loop often waits forever:
- it waits until there is something to send.

If you immediately await it before starting receive logic:
- your receive logic never starts,
- the connection sits waiting only for outgoing messages.

So you start the send loop as a background/concurrent task, then run the receive loop on the current async flow.
```

#### Visible code

```csharp
Task sendTask = SendLoopAsync(...);

await ReceiveLoopAsync(...);

await sendTask;
```

---

### CH05B-S004 / S-051 - `5731fe231a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Typical shape: connection object and loops

#### Visible text

```text
Typical shape for one socket connection:
- SocketConnection stores outgoing messages in a channel and owns the WebSocket.
- SendLoopAsync reads outgoing messages from the channel and sends them.
- ReceiveLoopAsync reads incoming WebSocket messages and may enqueue responses.
- Controller/endpoint coordinates startup and shutdown.

The slide says this simple example uses an endpoint/controller-style method and helper types.
```

---

## 2.3 CH05C

### CH05C-S001 / S-052 - `74f1931b64`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: OutgoingMessage and SocketConnection classes

#### Visible text

```text
Code defines OutgoingMessage:
- Buffer: ArraySegment<byte>
- MessageType: WebSocketMessageType
- EndOfMessage: bool
- static Text(string text) helper that UTF8-encodes text into an OutgoingMessage.

Code defines SocketConnection:
- constructor accepts WebSocket socket;
- creates an unbounded Channel<OutgoingMessage>;
- SingleReader = true;
- SingleWriter = false;
- exposes Socket and Outgoing.

Meaning:
- connection stores both the raw WebSocket and outgoing queue.
```

#### Visible code

```csharp
public sealed class OutgoingMessage
{
    public required ArraySegment<byte> Buffer { get; init; }
    public required WebSocketMessageType MessageType { get; init; }
    public required bool EndOfMessage { get; init; }

    public static OutgoingMessage Text(string text)
    {
        var bytes = Encoding.UTF8.GetBytes(text);
        return new OutgoingMessage
        {
            Buffer = new ArraySegment<byte>(bytes),
            MessageType = WebSocketMessageType.Text,
            EndOfMessage = true
        };
    }
}

public sealed class SocketConnection
{
    public SocketConnection(WebSocket socket)
    {
        Socket = socket;
        Outgoing = Channel.CreateUnbounded<OutgoingMessage>(
            new UnboundedChannelOptions
            {
                SingleReader = true,
                SingleWriter = false
            });
    }

    public WebSocket Socket { get; }
    public Channel<OutgoingMessage> Outgoing { get; }
}
```

---

### CH05C-S002 / S-053 - `f8aaedfb4c`

Metadata:
- status: `verified-from-source-image`
- readability: `low`
- cut off: `no`
- confidence: `high`
- theme: Controller action example header

#### Visible text

```text
Slide header: Controller action example.

This source is a title/transition screenshot for the following controller action code.
```

#### Notes

The screenshot mostly contains the title and code block header.

---

### CH05C-S003 / S-054 - `cf8f5e4ddf`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `yes`
- confidence: `high`
- theme: Controller action accepts WebSocket and starts send loop

#### Visible text

```text
Controller action example:
- WebSocketController has route "ws".
- GET action checks IsWebSocketRequest.
- If not WebSocket, it sets Status400BadRequest and returns.
- It accepts the socket.
- Creates SocketConnection.
- Starts send loop in parallel: SendLoopAsync(connection, cancellationToken).
- Then runs ReceiveLoopAsync on the current async flow inside try.

Meaning:
- send side is launched concurrently,
- receive side stays on the request path.
```

#### Visible code

```csharp
[ApiController]
[Route("ws")]
public class WebSocketController : ControllerBase
{
    [HttpGet]
    public async Task Get(CancellationToken cancellationToken)
    {
        if (!HttpContext.WebSockets.IsWebSocketRequest)
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            return;
        }

        using var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();
        var connection = new SocketConnection(socket);

        // Start send loop in parallel
        var sendTask = SendLoopAsync(connection, cancellationToken);

        try
        {
            // Run receive loop on current async flow
            await ReceiveLoopAsync(connection, cancellationToken);
        }
    }
}
```

#### Notes

Screenshot contains first half of action; finalizer is in S-055.

---

### CH05C-S004 / S-055 - `df5a898bfd`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Controller action finally completes outgoing channel and closes socket

#### Visible text

```text
Continuation of controller action:
- finally block completes the outgoing writer: connection.Outgoing.Writer.TryComplete().
- then waits for sendTask so the send loop can finish draining remaining messages.
- optional logging catches send loop errors.
- if socket is Open or CloseReceived, closes it with NormalClosure and reason "Closing".

Meaning:
- receive loop owns shutdown;
- shutdown completes outgoing messages;
- send loop drains what remains;
- then socket is closed cleanly.
```

#### Visible code

```csharp
finally
{
    // No more outgoing messages will be written
    connection.Outgoing.Writer.TryComplete();

    // Let send loop finish draining remaining messages
    try
    {
        await sendTask;
    }
    catch
    {
        // optional logging
    }

    if (socket.State == WebSocketState.Open ||
        socket.State == WebSocketState.CloseReceived)
    {
        await socket.CloseAsync(
            WebSocketCloseStatus.NormalClosure,
            "Closing",
            CancellationToken.None);
    }
}
```

---

### CH05C-S005 / S-056 - `84a8dbed34`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SendLoopAsync drains outgoing channel and sends

#### Visible text

```text
SendLoopAsync:
- await foreach over connection.Outgoing.Reader.ReadAllAsync(ct).
- for each outgoing message, call Socket.SendAsync with:
  - Buffer,
  - MessageType,
  - EndOfMessage,
  - cancellation token.

Meaning:
- the channel serializes outgoing send work;
- only the send loop talks to WebSocket.SendAsync.
```

#### Visible code

```csharp
private static async Task SendLoopAsync(SocketConnection connection, CancellationToken ct)
{
    await foreach (var msg in connection.Outgoing.Reader.ReadAllAsync(ct))
    {
        await connection.Socket.SendAsync(
            msg.Buffer,
            msg.MessageType,
            msg.EndOfMessage,
            ct);
    }
}
```

---

### CH05C-S006 / S-057 - `d082a755d1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `yes`
- confidence: `high`
- theme: ReceiveLoopAsync reads socket and handles close

#### Visible text

```text
ReceiveLoopAsync:
- allocates a byte buffer.
- while socket state is Open:
  - receives into buffer with ReceiveAsync.
  - if MessageType is Close, break.

Meaning:
- receive loop reads incoming WebSocket frames/messages;
- close messages stop the receive loop.
```

#### Visible code

```csharp
private static async Task ReceiveLoopAsync(SocketConnection connection, CancellationToken ct)
{
    var buffer = new byte[4096];

    while (connection.Socket.State == WebSocketState.Open)
    {
        var result = await connection.Socket.ReceiveAsync(
            new ArraySegment<byte>(buffer),
            ct);

        if (result.MessageType == WebSocketMessageType.Close)
        {
            break;
        }
    }
}
```

#### Notes

Continuation with text/response behavior is in S-058.

---

### CH05C-S007 / S-058 - `366666af82`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Receive loop enqueues echo and pong responses

#### Visible text

```text
Continuation of ReceiveLoopAsync:
- convert received bytes to UTF8 string.
- example: echo back by writing OutgoingMessage.Text($"echo: {text}") to the outgoing channel.
- special command: if text == "ping", enqueue OutgoingMessage.Text("pong").

Meaning:
- receive loop does not call SendAsync directly;
- it enqueues outgoing messages;
- send loop eventually sends them.
```

#### Visible code

```csharp
var text = Encoding.UTF8.GetString(buffer, 0, result.Count);

// Example: echo back
await connection.Outgoing.Writer.WriteAsync(
    OutgoingMessage.Text($"echo: {text}"),
    ct);

// Example: special command
if (text == "ping")
{
    await connection.Outgoing.Writer.WriteAsync(
        OutgoingMessage.Text("pong"),
        ct);
}
```

---

### CH05C-S008 / S-059 - `80a95f74d5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: More realistic version: other producers can write to outgoing channel

#### Visible text

```text
More realistic version:
- receive loop is not the only producer.
- a background notifier can also write to the outgoing channel.

Example NotifyAsync writes OutgoingMessage.Text(text) to connection.Outgoing.Writer.

It could be called from:
- event handler,
- background service,
- another component.

Meanwhile the same send loop keeps consuming messages.

This is where channels become especially useful.
```

#### Visible code

```csharp
public async Task NotifyAsync(
    SocketConnection connection,
    string text,
    CancellationToken ct)
{
    await connection.Outgoing.Writer.WriteAsync(
        OutgoingMessage.Text(text),
        ct);
}
```

---

### CH05C-S009 / S-060 - `12001449c3`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Ping/pong flow example

#### Visible text

```text
Example from the flow:
- client sends: ping.
- receive loop gets "ping".
- receive loop writes OutgoingMessage.Text("pong") into the outgoing channel.
- send loop wakes up and sends "pong".

So the actual send is caused by what was received, but it still goes through the outgoing channel and send loop.
```

#### Visible code

```csharp
await connection.Outgoing.Writer.WriteAsync(
    OutgoingMessage.Text("pong"),
    ct);
```

---

### CH05C-S010 / S-061 - `b553a5bc46`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Outgoing channel can be written by other code too

#### Visible text

```text
The outgoing channel can be written by other code, not just the receive loop.

Examples:
- timer sending heartbeat messages,
- background service sending notifications,
- some domain event handler,
- broadcast system,
- another method on the same connection manager.

In the simple example, sends depended only on what was received.
In a real app, the send loop may send messages triggered by many sources.
```

---

## 3. Cleaned source notes

- Use a channel to serialize outgoing WebSocket sends.
- The receive loop can enqueue responses instead of sending directly.
- The send loop is the only component that calls SendAsync.
- Completing the outgoing writer lets the send loop drain and end.
- Other producers can enqueue outgoing messages: timers, background services, events, broadcasts.

---

## 4. Question hooks

- Why is direct concurrent WebSocket SendAsync dangerous?
- Why should the send loop run concurrently with the receive loop?
- What does the outgoing channel contain?
- Who is allowed to write to the outgoing channel?
- What happens in shutdown when the outgoing writer is completed?
- How does ping produce pong in this flow?