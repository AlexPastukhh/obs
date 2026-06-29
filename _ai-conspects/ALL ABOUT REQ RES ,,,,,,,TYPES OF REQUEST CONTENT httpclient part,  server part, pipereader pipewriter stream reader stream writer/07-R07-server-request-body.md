# Regional transcript — R07: ASP.NET Core request-body reading, model binding and PipeReader entry points

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
text elements represented: 16 / 16
screenshot uses processed: 22 / 22
unique screenshots represented: 22
repeated placements retained: 1
remaining text elements: 0
remaining screenshot uses: 0
```

Boundary review:

- Included the complete visual road assigned to this region, including same-column continuations and nearby examples.
- Cross-region references are explained where required, but their screenshot placements remain closed in their own regional ledgers.
- No source image was omitted merely because its nearby SVG label was short or informal.

## Area understanding and reading quality

This region answers a precise question: does manually replacing ASP.NET Core model binding with `Request.Body`, `Stream`, or `PipeReader` automatically improve memory? The source answer is no. Savings appear only when manual access changes the work: direct copy, progressive framing, or avoiding a fully materialized model.

Reading confidence is high.

## Normal JSON model binding is already stream-based internally

```csharp
app.MapPost("/items", (CreateItem request) =>
{
    return Results.Ok(request);
});
```

ASP.NET Core input formatters read request bytes through stream/pipe infrastructure and deserialize them. It is incorrect to imagine the framework first converting every request body to a giant string and only then parsing it.

Replacing model binding with:

```csharp
MyDto? dto =
    await JsonSerializer.DeserializeAsync<MyDto>(
        Request.Body,
        options,
        cancellationToken);
```

provides custom control, but for the same single-object result it still builds the same logical object graph.

## When `Request.Body` changes the pipeline

### Direct copy

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

This avoids `body → MemoryStream → byte[] → file` and therefore changes memory behavior materially.

### Custom progressive parser

Use raw body access when the protocol is not ordinary JSON model binding:

- NDJSON;
- length-prefixed records;
- custom delimiters;
- checksums/signatures over raw bytes;
- partial records across reads;
- large payload sections routed to different destinations.

### Selective processing

A parser can inspect a prefix/header, stream a large binary section elsewhere, and avoid creating a full DTO containing all bytes.

## `Request.Body` versus `Request.BodyReader`

`Request.Body` is the familiar `Stream`. It is a good fit for `CopyToAsync`, `JsonSerializer.DeserializeAsync`, and libraries designed around streams.

`Request.BodyReader` is a `PipeReader`. It is a better fit when parsing needs:

- partial-message retention;
- delimiters that may cross buffers;
- length-prefixed frames;
- direct work over `ReadOnlySequence<byte>`;
- explicit consumed/examined positions;
- fewer contiguous-array copies.

Do not use `PipeReader` merely to call `CopyToAsync` into a file. The stream API already expresses that operation clearly.

## Request-body ownership

The framework owns the request body. Application code should not dispose `Request.Body` or complete the framework-owned `BodyReader` indiscriminately in ordinary endpoint code.

A raw controller action can read once:

```csharp
[HttpPost]
public async Task<IActionResult> Post(
    CancellationToken cancellationToken)
{
    using var reader = new StreamReader(
        Request.Body,
        Encoding.UTF8,
        leaveOpen: true);

    string body =
        await reader.ReadToEndAsync(cancellationToken);

    return Ok(new { Length = body.Length });
}
```

The body position is now at the end.

## Middleware and multiple reads

If middleware reads the body and later MVC/minimal API code must read it too:

```csharp
app.Use(async (context, next) =>
{
    context.Request.EnableBuffering();

    using var reader = new StreamReader(
        context.Request.Body,
        Encoding.UTF8,
        leaveOpen: true);

    string body = await reader.ReadToEndAsync();

    context.Request.Body.Position = 0;
    await next();
});
```

Without `EnableBuffering`, resetting `Position` may fail because the original request stream is non-seekable.

Buffering for logging or signatures is a deliberate tradeoff. Limit logged size and redact secrets.

## Basic `BodyReader` loop

```csharp
PipeReader reader = context.Request.BodyReader;

while (true)
{
    ReadResult result =
        await reader.ReadAsync(cancellationToken);

    ReadOnlySequence<byte> buffer = result.Buffer;

    SequencePosition consumed = buffer.Start;
    SequencePosition examined = buffer.End;

    try
    {
        // Parse complete records and update consumed.
    }
    finally
    {
        reader.AdvanceTo(consumed, examined);
    }

    if (result.IsCompleted)
        break;
}
```

The details of `ReadResult`, `ReadOnlySequence`, and `AdvanceTo` are covered in R11/R12.

## Memory claims that are valid

Manual APIs can reduce memory when they:

- copy bytes directly to the final destination;
- process records incrementally;
- avoid a giant `List<T>`;
- avoid a giant string;
- preserve large bodies as segmented buffers;
- decode only fields that are actually needed.

Manual APIs do **not** reduce memory merely because the code spells `Body`, `BodyReader`, or `Stream`. If the code ultimately materializes the same full byte array and same object graph, the shape has not improved.

## Covered source units

### SVG text elements

```text
T-0229, T-0230, T-0231, T-0232, T-0233, T-0234, T-0235, T-0236, T-0237, T-0239, T-0240, T-0241, T-0242, T-0243
T-0244, T-0317
```

### Screenshot placements

```text
IU-0106, IU-0107, IU-0108, IU-0109, IU-0110, IU-0111, IU-0112, IU-0113, IU-0114, IU-0115, IU-0116, IU-0117
IU-0118, IU-0119, IU-0120, IU-0121, IU-0122, IU-0123, IU-0124, IU-0423, IU-0424, IU-0425
```

## Exactness and limitations

The semantic transcript normalizes spelling and organizes the ideas. The preserved source SVG and extracted screenshots remain authoritative for exact code, overload signatures, version-specific behavior and visual ordering.
