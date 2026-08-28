# R05 - SSE / EventSource / writer / heartbeat / reconnect

Conspect: `streaming`
File type: **source-preserving region transcript**
Stage: **stage-6 / restored verified region transcript v001**
Generated: 2026-07-23

---

## 0. Direction check

This region fills the missing R05 transcript gap in the `streaming` conspect.

Goal:
Preserve the part of the SVG/source images about Server-Sent Events, browser `EventSource`, manual SSE writing, heartbeats, reconnect and React client mapping.

Why this matters:
R04 explains object streaming, NDJSON and `FlushAsync`. R05 is the next practical shape: long-lived server-to-browser event delivery over HTTP where the browser consumes `text/event-stream`.

Source basis:
The transcript was restored from local extracted source images/contact sheet, not from old completion status.

Included source IDs:
```text
S-102, S-103, S-104, S-105, S-106, S-107, S-108, S-109,
S-114, S-115, S-116, S-117, S-118, S-120, S-121, S-122,
S-123, S-124, S-125, S-130, S-131, S-132, S-133, S-134,
S-135, S-136, S-137, S-138, S-139, S-140, S-141, S-142,
S-143, S-144, S-145, S-177, S-178, S-179, S-180, S-181,
S-182, S-183, S-184, S-185
```

Reading quality:
```text
overall_conceptual_understanding: high
code_readability: high for main controller/helper/React snippets
spatial_layout_understanding: high from R05 contact sheet and source images
known limitation: source images S-102/S-103 are small context fragments, but their meaning is covered by adjacent images
```

---

## 1. SSE: what it is

SSE means **Server-Sent Events**.

It is a server-to-client streaming protocol over HTTP:
- the server keeps the HTTP response open;
- the content type is `text/event-stream`;
- the response body is sent as a sequence of event frames;
- each event is text;
- the browser can consume it with `EventSource`;
- the server pushes events continuously or periodically.

It is useful for:
- notifications;
- progress updates;
- live feeds such as prices, status changes and monitoring;
- long-lived server-to-browser streams where the client does not need to send messages on the same channel.

SSE is not bidirectional:
- it is not WebSockets;
- it does not carry client-to-server streaming data;
- it is simpler than WebSockets when the server only needs to push events to the client.

Comparison with NDJSON / JSON arrays:
- JSON array streaming is still one JSON document and can be invalid until the final `]`.
- NDJSON sends one JSON object per line.
- SSE sends framed text events with optional event name, event id and retry hint.
- SSE gives browser-level reconnect behavior and event dispatching by event name.

---

## 2. SSE wire format

The response content type is:

```text
text/event-stream
```

An SSE event frame is plain text. Typical fields:

```text
event: order-status
id: 42
data: {"orderId":"111...","status":"Paid"}

```

Important rules:
- `event:` is the event name. Browser listeners registered with `addEventListener("order-status", handler)` receive that event.
- `id:` is the event id. The browser remembers it and can send it back on reconnect in the `Last-Event-ID` header.
- `data:` is the payload. It is often JSON text, but SSE itself only sees text.
- A blank line ends one event frame.
- Without `event:`, the browser treats it as the default `"message"` event and `es.onmessage` or `addEventListener("message", ...)` handles it.

Example normal domain event:

```csharp
await SseWriter.WriteEventAsync(
    Response,
    eventName: "order-status",
    dataJson: """{"orderId":"111...","status":"Paid"}""",
    id: "42",
    ct);
```

Body chunk:

```text
id: 42
event: order-status
data: {"orderId":"111...","status":"Paid"}

```

Example heartbeat/comment event:

```csharp
await SseWriter.WriteCommentAsync(Response, "ping", ct);
```

Body chunk:

```text
: ping

```

Lines beginning with `:` are SSE comments:
- browsers ignore them as events;
- they are useful to keep the connection alive through proxies;
- they are useful as heartbeat messages.

---

## 3. Minimal controller example

Controller action:

```csharp
[ApiController]
[Route("movies")]
public sealed class MoviesSseController : ControllerBase
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    [HttpGet("sse")]
    public async Task GetMoviesSse(CancellationToken ct)
    {
        Response.StatusCode = StatusCodes.Status200OK;
        Response.ContentType = "text/event-stream; charset=utf-8";

        // Helpful for some clients/proxies, but not universal.
        Response.Headers.CacheControl = "no-cache";

        var i = 0;

        while (!ct.IsCancellationRequested)
        {
            i++;

            var json = JsonSerializer.Serialize(
                new { id = Guid.NewGuid(), title = $"Movie {i}" },
                JsonOptions);

            // SSE frame: optional event name + data + blank line.
            await Response.WriteAsync("event: movie\n", ct);
            await Response.WriteAsync($"data: {json}\n\n", ct);

            await Response.Body.FlushAsync(ct);

            // Simulate pushing events periodically.
            await Task.Delay(1000, ct);
        }
    }
}
```

Notes:
- SSE is specifically designed for a long-lived server-to-client stream.
- Client must parse SSE frames. In browsers, `EventSource` does this automatically.
- `WriteAsync` writes the event text into the response body.
- `FlushAsync` pushes buffered bytes toward the network so the client can receive events sooner.

---

## 4. What "response started" means

After the server starts writing/flushing response bytes, headers are effectively committed.

So these become locked:
- `StatusCode`;
- headers;
- `ContentType`;
- cache/control headers.

This is important because an infinite or long-lived SSE endpoint cannot later decide to return a normal JSON error response after the response has already started. Errors and status changes should be represented as events, comments, disconnects or logs after that point.

---

## 5. Realistic order events endpoint with resume

Endpoint:

```csharp
[ApiController]
[Route("orders/{orderId:guid}/events")]
public sealed class OrderEventsController : ControllerBase
{
    private readonly IOrderEventRepository _repo;

    public OrderEventsController(IOrderEventRepository repo) => _repo = repo;

    [HttpGet]
    public async Task Get(Guid orderId, CancellationToken ct)
    {
        Response.StatusCode = StatusCodes.Status200OK;
        Response.ContentType = "text/event-stream; charset=utf-8";
        Response.Headers.CacheControl = "no-cache";

        // Optional: some proxies buffer; sometimes this helps (nginx specific).
        Response.Headers["X-Accel-Buffering"] = "no";

        // Parse last id sent by client. EventSource will send it if server provided id.
        var lastEventIdHeader = Request.Headers["Last-Event-ID"].ToString();
        var lastId = long.TryParse(lastEventIdHeader, out var parsed) ? parsed : 0L;

        // Send an initial connected event so the client can update UI quickly.
        await SseWriter.WriteEventAsync(
            Response,
            eventName: "connected",
            dataJson: $$"""{"orderId":"{{orderId}}","lastEventId":{{lastId}}}""",
            id: null,
            ct);

        // 1) Catch up: send everything after lastId.
        lastId = await CatchUpAsync(orderId, lastId, ct);

        // 2) Live loop: poll DB for new events indefinitely.
        while (!ct.IsCancellationRequested)
        {
            var events = await _repo.GetAfterIdAsync(orderId, lastId, take: 100, ct);

            if (events.Count == 0)
            {
                // Keep connection alive and allow cancellation checks.
                // You can also send SSE comments ": ping\n\n" instead.
                await Task.Delay(1000, ct);
                continue;
            }

            foreach (var ev in events)
            {
                await SseWriter.WriteEventAsync(
                    Response,
                    eventName: ev.Type,
                    dataJson: ev.DataJson,
                    id: ev.Id.ToString(),
                    ct);

                lastId = ev.Id;
            }
        }
    }

    private async Task<long> CatchUpAsync(Guid orderId, long lastId, CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            var batch = await _repo.GetAfterIdAsync(orderId, lastId, take: 200, ct);
            if (batch.Count == 0) break;

            foreach (var ev in batch)
            {
                await SseWriter.WriteEventAsync(
                    Response,
                    eventName: ev.Type,
                    dataJson: ev.DataJson,
                    id: ev.Id.ToString(),
                    ct);

                lastId = ev.Id;
            }
        }

        return lastId;
    }
}
```

What `CatchUpAsync` does:
- it sends missed events first;
- it exists because the client may reconnect and say "last event I received was id 123" via `Last-Event-ID`;
- before starting the endless live loop, the server needs to send everything after that id.

Why batching:
- there may be a lot of missed events;
- loading everything at once could be huge;
- the code fetches a page, for example `take: 200`;
- sends that page;
- asks for the next page;
- stops when there are no more rows.

Repository shape:

```csharp
var batch = await _repo.GetAfterIdAsync(orderId, lastId, take: 200, ct);
if (batch.Count == 0) break;

foreach (var ev in batch)
{
    // write event
}
```

This is not async streaming from the database. It is async DB calls returning a list batch, not an async stream enumeration.

Production variants:
- use a channel or background publisher;
- Redis pub/sub;
- Kafka/RabbitMQ;
- Postgres `LISTEN/NOTIFY`.

The external behavior to the React client stays the same: the server emits SSE events.

---

## 6. `SseWriter` helper

The helper writes a correctly framed SSE event:

```csharp
using System.Text;

public static class SseWriter
{
    public static async Task WriteEventAsync(
        HttpResponse response,
        string? eventName,
        string dataJson,
        string? id,
        CancellationToken ct,
        int? retryMs = null)
    {
        // SSE requires text/event-stream.
        // Caller can set this once in endpoint; harmless if repeated.
        response.ContentType = "text/event-stream; charset=utf-8";

        // Optional event id, used by browser for Last-Event-ID on reconnect.
        if (!string.IsNullOrWhiteSpace(id))
        {
            await response.WriteAsync($"id: {id}\n", ct);
        }

        // Optional event name, maps to addEventListener("name", ...).
        if (!string.IsNullOrWhiteSpace(eventName))
        {
            await response.WriteAsync($"event: {eventName}\n", ct);
        }

        // Optional retry hint for browser reconnect delay, in milliseconds.
        if (retryMs is not null)
        {
            await response.WriteAsync($"retry: {retryMs.Value}\n", ct);
        }

        // SSE requires "data:" lines.
        // If payload has newlines, each line must be prefixed with "data: ".
        // For JSON, usually one line, but this handles multi-line safely.
        using var sr = new StringReader(dataJson);
        string? line;

        while ((line = await sr.ReadLineAsync()) is not null)
        {
            await response.WriteAsync($"data: {line}\n", ct);
        }

        // Blank line ends one SSE event.
        await response.WriteAsync("\n", ct);

        // Push event to client now; important for real-time streaming.
        await response.Body.FlushAsync(ct);
    }

    public static async Task WriteCommentAsync(
        HttpResponse response,
        string comment,
        CancellationToken ct)
    {
        // SSE comment line, useful as keep-alive / heartbeat.
        await response.WriteAsync($": {comment}\n\n", ct);
        await response.Body.FlushAsync(ct);
    }
}
```

Important details:
- Event names are just string labels carried by the SSE protocol.
- You can define your own names: `connected`, `order-status`, `order-shipped`, `ping`, etc.
- `id` is optional but important for reconnect/resume.
- `retry` is optional and gives the browser a reconnect delay hint.
- For JSON payloads, `dataJson` is usually one line.
- If payload contains newlines, every line must get its own `data:` prefix.
- The blank line after data is not decorative; it ends the event.
- `FlushAsync` is what makes the event leave server buffers sooner.

---

## 7. Browser `EventSource`

`EventSource` handles much of the SSE protocol automatically:
- opens a long-lived GET request;
- parses SSE frames;
- dispatches named events to `addEventListener`;
- reconnects after disconnection;
- remembers the latest `id` and sends it as `Last-Event-ID` on reconnect.

Browser dispatch:

```text
event: order-status
data: {"orderId":"111...","status":"Paid"}

```

Handler:

```javascript
es.addEventListener("order-status", handler);
```

If the server omits `event:`, the browser treats it as the default `"message"` event:

```javascript
es.onmessage = ...
// or
es.addEventListener("message", ...)
```

How automatic reconnect translates into user content:
- when an error happens, the browser fires `error`;
- when it opens again, the browser reconnects while already knowing latest known state;
- because the server uses `id:` and replays missed events, the UI catches up automatically;
- this is user-visible benefit.

Production notes:
- add authentication; SSE works with cookies automatically, but bearer tokens are harder because browser `EventSource` cannot set custom headers;
- careful with CORS and cache headers;
- consider heartbeat messages, for example `: ping\n\n`, every 15 seconds;
- for scale, polling DB directly is not ideal at high load; use pub/sub or a persisted event log.

---

## 8. React client hook

Client setup:

```tsx
import { useEffect, useRef, useState } from "react";

type OrderStatusEvent = {
    orderId: string;
    status: string;
    time: string;
};

type ConnectionState = "connecting" | "connected" | "reconnecting" | "closed";

export function useOrderEvents(orderId: string) {
    const [state, setState] = useState<ConnectionState>("connecting");
    const [events, setEvents] = useState<OrderStatusEvent[]>([]);
    const esRef = useRef<EventSource | null>(null);

    useEffect(() => {
        setState("connecting");

        const es = new EventSource(`/orders/${orderId}/events`);
        esRef.current = es;

        es.onopen = () => setState("connected");

        // EventSource uses onerror for transient network errors too.
        es.onerror = () => {
            // Browser will retry automatically, so show "reconnecting".
            setState((prev) => (prev === "closed" ? "closed" : "reconnecting"));
        };

        es.addEventListener("connected", (e) => {
            // Server sent a connected event; optional for UI.
            // console.log("connected", (e as MessageEvent).data);
        });

        es.addEventListener("order-status", (e) => {
            const data = JSON.parse((e as MessageEvent).data) as OrderStatusEvent;
            setEvents((prev) => [...prev, data]);
        });

        return () => {
            setState("closed");
            es.close();
            esRef.current = null;
        };
    }, [orderId]);

    return { state, events };
}
```

UI mapping:

```tsx
import React from "react";
import { useOrderEvents } from "./useOrderEvents";

export function OrderTracking({ orderId }: { orderId: string }) {
    const { state, events } = useOrderEvents(orderId);

    const latest = events[events.length - 1];

    return (
        <div>
            <h2>Order {orderId}</h2>

            <div>
                Connection: <b>{state}</b>
            </div>

            <div style={{ marginTop: 12 }}>
                Current status: <b>{latest?.status ?? "Unknown"}</b>
            </div>

            <h3>Timeline</h3>
            <ul>
                {events.map((e, idx) => (
                    <li key={idx}>
                        {new Date(e.time).toLocaleString()}: {e.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

The React side should remember:
- use `EventSource` for GET endpoint;
- register named event listeners for named server events;
- parse `MessageEvent.data` as JSON if server puts JSON in `data:`;
- call `es.close()` in cleanup;
- browser handles reconnect automatically, but app state should show `connecting`, `connected`, `reconnecting` or `closed`.

---

## 9. Why heartbeat exists

Heartbeats are small periodic messages on a long-lived SSE connection.

They are needed because idle streams can be killed silently by:
- proxies;
- load balancers;
- reverse proxies;
- browser or network layers.

What heartbeats accomplish:
- keep intermediaries from timing out idle connections;
- let server flush periodically;
- make disconnects easier to detect sooner.

Usually heartbeat can be an SSE comment:

```text
: ping

```

Server helper:

```csharp
await SseWriter.WriteCommentAsync(Response, "ping", ct);
```

This keeps the connection alive without dispatching a normal domain event.

---

## 10. When to use what

Use `IAsyncEnumerable<T>` plus normal JSON array when:
- it is a finite list;
- client waits for complete JSON;
- you want the simplest controller code;
- clients are standard JSON clients.

Use NDJSON when:
- you want incremental parsing of items;
- you want robustness on partial disconnects;
- the stream may error before completion and normal JSON array would be invalid.

Use SSE when:
- you want server-to-browser named events;
- you want automatic browser reconnect;
- you want resume with `Last-Event-ID`;
- you want a long-lived live feed.

Use manual `WriteAsync` plus `FlushAsync` when:
- you need NDJSON;
- you need SSE;
- you need precise push behavior;
- you need custom formatting.

Normal `IAsyncEnumerable<T>` is enough when:
- normal JSON API streaming is enough;
- you do not care about exact flush timing;
- you want simpler code.

---

## 11. One-line answers for repetition

SSE:
```text
SSE is a long-lived HTTP response with Content-Type text/event-stream where the server sends text frames and the browser EventSource parses them.
```

`FlushAsync`:
```text
FlushAsync pushes currently buffered response bytes toward the client, which matters for real-time NDJSON/SSE visibility.
```

`Last-Event-ID`:
```text
When the server sends id fields, the browser remembers the latest id and sends it back after reconnect so the server can replay missed events.
```

Heartbeat:
```text
A heartbeat is usually an SSE comment like ": ping\n\n" sent periodically to keep idle connections alive.
```

SSE vs WebSockets:
```text
SSE is one-way server-to-client streaming over HTTP; WebSockets are bidirectional.
```

SSE vs NDJSON:
```text
NDJSON is line-delimited JSON objects; SSE is a browser-friendly event framing protocol with names, ids, retry hints and reconnect behavior.
```

---

## 12. Repetition checklist

Be able to explain:
- what `text/event-stream` means;
- how `event:`, `id:`, `retry:` and `data:` work;
- why a blank line ends an SSE event;
- what happens if `event:` is omitted;
- why `FlushAsync` is used after writing each event/comment;
- what `Last-Event-ID` gives you;
- why `CatchUpAsync` runs before the live loop;
- why batching is used for missed events;
- why heartbeat comments are useful;
- how `EventSource` maps named server events to `addEventListener`;
- why browser `EventSource` auth is easy with cookies but harder with custom bearer headers;
- when to choose JSON array streaming, NDJSON, SSE, or WebSockets.
