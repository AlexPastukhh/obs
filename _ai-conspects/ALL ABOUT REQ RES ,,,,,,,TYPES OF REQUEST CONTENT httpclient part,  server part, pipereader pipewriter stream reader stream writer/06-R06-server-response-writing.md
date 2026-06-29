# Regional transcript — R06: ASP.NET Core response writing, raw downloads, plain text, NDJSON and SSE

Conspect: `ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer`  
Generated: 2026-06-29 05:30:13 UTC

## Transcript policy for repetition

This is a semantic transcript, not a character-for-character dump. Repeated
captions, duplicated screenshots and restated code lines are consolidated into
one complete explanation. Distinct API behavior, edge cases, tradeoffs and
examples are retained. Every source placement remains closed in the coverage
ledger even when its wording is not repeated in the prose.

## Coverage and boundary decision

```text
text elements represented: 23 / 23
screenshot uses processed: 15 / 15
unique screenshots represented: 14
repeated placements retained: 15
remaining text elements: 0
remaining screenshot uses: 0
```

Boundary review:

- Included the complete visual road assigned to this region, including same-column continuations and nearby examples.
- Cross-region references are explained where required, but their screenshot placements remain closed in their own regional ledgers.
- No source image was omitted merely because its nearby SVG label was short or informal.

## Area understanding and reading quality

This region maps server response shapes to the correct ASP.NET Core output API: typed JSON, raw byte copy, plain text, many text fragments, NDJSON/SSE, and custom binary framing.

Reading confidence is high. Screenshots include code for `Results.Ok`, `Response.Body`, `Response.WriteAsync`, `StreamWriter`, `PipeWriter`, `Utf8JsonWriter`, `WriteAsJsonAsync`, file copying, and a four-byte length-prefixed frame.

## Normal JSON response

For ordinary JSON, use the framework result/serializer path:

```csharp
app.MapPost("/users", (CreateUser request) =>
{
    var response = new UserDto(1, request.Name);
    return Results.Ok(response);
});
```

or:

```csharp
await context.Response.WriteAsJsonAsync(
    value,
    cancellationToken);
```

Benefits:

- content type and charset are set correctly;
- configured JSON options/converters are used;
- the framework can coordinate serialization and response lifetime;
- custom low-level buffer code is unnecessary.

Do not switch to `BodyWriter` merely to write ordinary JSON. The standard serializer already writes UTF-8 to the response pipeline.

## Raw upload and raw download

Upload directly to storage:

```csharp
app.MapPost("/upload", async (
    Stream body,
    CancellationToken cancellationToken) =>
{
    await using FileStream destination =
        File.Create("upload.bin");

    await body.CopyToAsync(destination, cancellationToken);
    return Results.Ok();
});
```

Download directly from a source stream:

```csharp
app.MapGet("/download", async (
    HttpContext context,
    CancellationToken cancellationToken) =>
{
    context.Response.ContentType = "application/octet-stream";

    await using FileStream source =
        File.OpenRead("data.bin");

    await source.CopyToAsync(
        context.Response.Body,
        cancellationToken);
});
```

`CopyToAsync` is the correct abstraction when the job is bytes-from-source to bytes-to-destination without custom framing.

## One-shot plain text

```csharp
context.Response.ContentType =
    "text/plain; charset=utf-8";

await context.Response.WriteAsync(
    "pong",
    cancellationToken);
```

This is clearer than introducing `StreamWriter` for one string.

For raw bytes:

```csharp
byte[] bytes = Encoding.UTF8.GetBytes("hello");
await context.Response.Body.WriteAsync(bytes, cancellationToken);
```

## Many text writes with `StreamWriter`

Use `StreamWriter` when text composition is naturally line/fragment oriented:

```csharp
context.Response.ContentType =
    "text/plain; charset=utf-8";

await using var writer = new StreamWriter(
    context.Response.Body,
    new UTF8Encoding(encoderShouldEmitUTF8Identifier: false),
    bufferSize: 4096,
    leaveOpen: true);

await writer.WriteLineAsync("line 1");
await writer.WriteLineAsync("line 2");
await writer.FlushAsync(cancellationToken);
```

`leaveOpen: true` prevents disposing the writer from closing the server-owned response body.

Do not flush after every tiny fragment unless protocol semantics require immediate delivery. Every flush can reduce batching and increase system-call/network overhead.

## NDJSON

Each item is serialized independently and followed by a newline:

```csharp
context.Response.ContentType =
    "application/x-ndjson; charset=utf-8";

await foreach (
    Item item in GetItems(cancellationToken)
        .WithCancellation(cancellationToken))
{
    await JsonSerializer.SerializeAsync(
        context.Response.Body,
        item,
        cancellationToken: cancellationToken);

    await context.Response.WriteAsync(
        "\n",
        cancellationToken);

    await context.Response.Body.FlushAsync(cancellationToken);
}
```

Flush frequency is a latency/batching decision. Per-record flushing minimizes delivery latency but can cost throughput. Batching several records or a target byte count can be more efficient.

## Server-Sent Events

SSE is text framing:

```text
event: item
data: {"id":1}

```

Use `text/event-stream`, terminate each event with a blank line, and flush when the client must receive the event immediately. Do not use JSON array framing for an indefinitely open SSE stream.

## `PipeWriter` for custom frames

`HttpResponse.BodyWriter` exposes the response pipe:

```csharp
PipeWriter writer = context.Response.BodyWriter;

Span<byte> span = writer.GetSpan(4 + payload.Length);

BinaryPrimitives.WriteInt32BigEndian(
    span[..4],
    payload.Length);

payload.CopyTo(span[4..]);

writer.Advance(4 + payload.Length);

FlushResult flush =
    await writer.FlushAsync(cancellationToken);
```

Use this when output requires exact binary framing, delimiter placement, or direct encoding into pipeline memory. The `Advance` count must exactly equal bytes initialized.

## `Utf8JsonWriter`

For explicit JSON token control while retaining valid JSON encoding:

```csharp
await using var json = new Utf8JsonWriter(
    context.Response.BodyWriter);

json.WriteStartObject();
json.WriteNumber("id", 1);
json.WriteString("name", "Alice");
json.WriteEndObject();

await json.FlushAsync(cancellationToken);
```

This is appropriate for unusual JSON shape or incremental token control, not ordinary DTO serialization.

## Returning `IAsyncEnumerable<T>`

An async enumerable can avoid creating a giant `List<T>` before serialization and can improve time to first item. It does not necessarily reduce total bandwidth, and client-side incremental consumption depends on JSON shape, serializer support, proxy buffering, and client API.

The server must not retain all yielded objects in another collection, or the primary memory benefit disappears.

## Covered source units

### SVG text elements

```text
T-0228, T-0238, T-0246, T-0248, T-0249, T-0251, T-0252, T-0253, T-0255, T-0257, T-0258, T-0277, T-0278, T-0279
T-0280, T-0281, T-0282, T-0286, T-0365, T-0366, T-0375, T-0376, T-0377
```

### Screenshot placements

```text
IU-0200, IU-0202, IU-0204, IU-0205, IU-0207, IU-0209, IU-0211, IU-0213, IU-0215, IU-0217, IU-0219, IU-0221
IU-0223, IU-0225, IU-0227
```

## Exactness and limitations

The semantic transcript normalizes spelling and organizes the ideas. The preserved source SVG and extracted screenshots remain authoritative for exact code, overload signatures, version-specific behavior and visual ordering.
