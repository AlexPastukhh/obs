# Full combined final transcript — ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer

Generated: 2026-06-29 05:30:13 UTC

## Final coverage

```text
non-empty SVG text elements: 475 / 475
embedded image definitions: 405 / 405
unique image-content hashes: 405 / 405
screenshot uses: 426 / 426
repeated placements retained: 21
regions: 13 / 13
remaining text elements: 0
remaining screenshot uses: 0
```

## Reading method

The transcript was written from the complete canvas preview, 32 regional contact sheets, 475 SVG labels, 405 extracted screenshot definitions and 426 screenshot placements. The text below records concrete API contracts, memory/lifetime consequences and failure modes; it does not reduce each area to generic advice.

# R01 — HttpClient content types and ASP.NET Core binding quick map

## Area understanding and reading quality

This area is the decision map for request content on the `HttpClient` side and the matching ASP.NET Core binding path on the server. The source is unusually explicit: it compares each concrete `HttpContent` type with the in-memory shape the caller already has, the resulting media type, the server API that reads it, and the cost of converting between strings, bytes and streams.

Reading confidence is high. The screenshots provide complete examples for `JsonContent`, `StringContent`, `ByteArrayContent`, `StreamContent`, `FormUrlEncodedContent`, `MultipartFormDataContent`, and legacy `ObjectContent`. The exact source screenshots remain authoritative for individual constructor overloads and punctuation.

## `HttpContent` is the body, not the whole request

`HttpRequestMessage.Content` represents the entity body and its **content headers**. Headers such as `Content-Type`, `Content-Length`, `Content-Encoding`, and multipart boundaries belong to the content object. Request-level headers such as `Authorization`, `Accept`, and custom correlation headers belong to `HttpRequestMessage.Headers`.

This distinction matters because setting `Content-Type` on the wrong header collection either fails or produces a malformed request. A typical explicit request is:

```csharp
using var request = new HttpRequestMessage(HttpMethod.Post, uri);
request.Headers.Authorization =
    new AuthenticationHeaderValue("Bearer", token);

request.Content = new StringContent(
    json,
    Encoding.UTF8,
    "application/json");

using HttpResponseMessage response =
    await client.SendAsync(request, cancellationToken);
```

## `JsonContent`: typed object to JSON

Use `JsonContent.Create(value)` when the program already has a DTO or other CLR object and wants JSON. It accepts serializer options and media-type customization, and it avoids manually creating an intermediate JSON string.

```csharp
var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = false
};

using JsonContent content = JsonContent.Create(
    value: command,
    inputType: command.GetType(),
    mediaType: new MediaTypeHeaderValue("application/json"),
    options: options);
```

Important details:

- The DTO still exists in memory. `JsonContent` does not make the object graph disappear.
- It is intended for serialization when the HTTP stack copies content to the outgoing transport.
- The final byte length may not be known before serialization. That affects `Content-Length` and is handled in R02.
- Server-side `[FromBody] MyDto dto` delegates JSON parsing to ASP.NET Core input formatters. The framework reads the request body as a stream internally; it does not first require the entire body as a managed `string`.

## `StringContent`: an exact text payload already exists

Use `StringContent` when the application already owns the exact text to transmit:

```csharp
using var content = new StringContent(
    text,
    Encoding.UTF8,
    "text/plain");
```

For JSON, the media type must be JSON:

```csharp
using var content = new StringContent(
    json,
    Encoding.UTF8,
    "application/json");
```

Memory behavior is concrete:

1. The .NET `string` already occupies UTF-16 storage.
2. `StringContent` encodes that string to bytes, normally UTF-8.
3. The HTTP transport sends the encoded bytes.

Therefore `StringContent` is a clear choice for a small or medium prebuilt string, but it is not an allocation-free path for a giant JSON document. If the JSON did not already exist as a string, creating the string only to encode it again introduces an avoidable representation.

Server handling depends on media type and endpoint contract:

- `application/json` → JSON input formatter and `[FromBody]`.
- `text/plain` → bind to a string where supported or read `Request.Body`/`StreamReader` explicitly.
- custom text protocol → read and parse the body according to that protocol.

## `ByteArrayContent`: bytes are already materialized

Use `ByteArrayContent` when a complete `byte[]` already exists:

```csharp
using var content = new ByteArrayContent(bytes);
content.Headers.ContentType =
    new MediaTypeHeaderValue("application/pdf");
```

The content type is not inferred from the bytes. Set it deliberately: `application/octet-stream`, `application/pdf`, `image/png`, or a protocol-specific media type.

This path does not stream from the original source; the complete payload already occupies memory. It is appropriate for small/medium binary payloads, cryptographic output, generated files, or data obtained from an API that returned a byte array.

On the server, consume `Request.Body` or `Request.BodyReader`. Binding a raw body directly to `byte[]` is only appropriate when the framework and endpoint metadata explicitly support that contract.

## `StreamContent`: transmit from a stream

Use `StreamContent` when the source is a `Stream` such as `FileStream`, `MemoryStream`, or a producer stream:

```csharp
await using FileStream file =
    File.OpenRead(filePath);

using var content = new StreamContent(file);
content.Headers.ContentType =
    new MediaTypeHeaderValue("video/mp4");
```

This is the normal raw-body path for large files because the file does not need to become one giant `byte[]`.

Ownership is important: disposing `StreamContent` disposes its underlying stream. Keep the request/content alive until `SendAsync` has finished consuming the body, and do not reuse a non-seekable stream after it has been consumed.

A `MemoryStream` is still memory-backed. Wrapping it in `StreamContent` changes the API shape but does not make the payload source-streaming.

## `FormUrlEncodedContent`: classic scalar form fields

`FormUrlEncodedContent` sends name/value pairs as `application/x-www-form-urlencoded`:

```csharp
var values = new Dictionary<string, string>
{
    ["username"] = "alice",
    ["password"] = "secret"
};

using var content = new FormUrlEncodedContent(values);
```

The data is percent-encoded, and no file parts exist. This matches ordinary HTML forms without file uploads and many OAuth/token endpoints.

ASP.NET Core normally reads this with `[FromForm]`:

```csharp
public sealed class LoginForm
{
    public string Username { get; init; } = "";
    public string Password { get; init; } = "";
}

[HttpPost]
[Consumes("application/x-www-form-urlencoded")]
public IActionResult Login([FromForm] LoginForm form) => Ok();
```

Do not use it for nested JSON semantics or file upload.

## `MultipartFormDataContent`: files plus form fields

Multipart content is a collection of `HttpContent` parts separated by a generated boundary:

```csharp
await using FileStream file = File.OpenRead(path);

using var multipart = new MultipartFormDataContent();
using var fileContent = new StreamContent(file);

fileContent.Headers.ContentType =
    new MediaTypeHeaderValue("image/jpeg");

multipart.Add(fileContent, "file", "photo.jpg");
multipart.Add(new StringContent("John"), "displayName");
```

The `name` argument must match the server form field. The filename is transmitted through `Content-Disposition`.

Server-side:

```csharp
public sealed class UploadRequest
{
    public IFormFile File { get; init; } = default!;
    public string DisplayName { get; init; } = "";
}

[HttpPost]
[Consumes("multipart/form-data")]
public async Task<IActionResult> Upload(
    [FromForm] UploadRequest request,
    CancellationToken cancellationToken)
{
    await using Stream destination =
        System.IO.File.Create(request.File.FileName);

    await request.File.CopyToAsync(destination, cancellationToken);
    return Ok();
}
```

Multipart avoids Base64 expansion, supports true file parts, and is the standard choice when metadata and files travel together.

## Legacy `ObjectContent`

`ObjectContent` belongs to older ASP.NET Web API formatter stacks. Modern `HttpClient` code normally uses:

- `JsonContent` for object → JSON.
- `StringContent` for an existing text representation.
- `StreamContent`/`ByteArrayContent` for binary bodies.

Do not introduce `ObjectContent` into a modern application merely because older examples use it.

## Decision table

| Existing application value | Content type | Typical server path |
|---|---|---|
| DTO/object | `JsonContent` | `[FromBody] MyDto` |
| prebuilt JSON/text string | `StringContent` | formatter or explicit text read |
| complete `byte[]` | `ByteArrayContent` | raw body |
| `Stream`/large file | `StreamContent` | raw body stream |
| scalar form fields | `FormUrlEncodedContent` | `[FromForm]` |
| files plus fields | `MultipartFormDataContent` | `[FromForm]` + `IFormFile` |

The choice should follow the payload that already exists and the protocol the server expects, not a blanket rule that streams are always faster.

# R02 — JSON request content, Content-Length, chunked transfer and compression

## Area understanding and reading quality

This area explains the wire-level consequences of JSON serialization choices. The source distinguishes three questions that are often incorrectly merged:

1. Is the payload prebuffered by application code?
2. Does the HTTP stack know the final byte count?
3. Is the transfer compressed?

Reading confidence is high. The screenshots include explicit HTTP/1.1 chunk framing, `Content-Length`, CRLF, `JsonContent`, `MemoryStream`, and compression comparisons.

## Three JSON construction paths

### JSON string → `StringContent`

```csharp
string json = JsonSerializer.Serialize(value);
using var content = new StringContent(
    json,
    Encoding.UTF8,
    "application/json");
```

Memory includes:

- the source object graph;
- a UTF-16 JSON string;
- encoded UTF-8 bytes used by the content/transport.

This is simple, but it creates a large intermediate string for a large document.

### `SerializeAsync` → `MemoryStream` → `StreamContent`

```csharp
var buffer = new MemoryStream();

await JsonSerializer.SerializeAsync(
    buffer,
    value,
    options,
    cancellationToken);

buffer.Position = 0;

using var content = new StreamContent(buffer);
content.Headers.ContentType =
    new MediaTypeHeaderValue("application/json");
```

This avoids the giant UTF-16 JSON string and writes UTF-8 directly. It does **not** avoid whole-payload buffering because `MemoryStream` contains every serialized byte.

The practical benefit is representation and allocation shape:

- no complete UTF-16 JSON copy;
- the payload is already bytes;
- the exact byte length is available through `MemoryStream.Length`.

### `JsonContent.Create`

```csharp
using JsonContent content =
    JsonContent.Create(value, options: options);
```

`JsonContent` keeps the object and serializes while the HTTP stack copies the content. Application code normally does not prebuild a full `MemoryStream`. This is often the cleanest default when an object should be sent as JSON.

It does not imply that no buffering exists anywhere. Socket buffers, handler buffers, serializer buffers, TLS buffers, and transport-specific buffering still exist. The important difference is that application code did not first create a complete string or memory stream.

## Why `Content-Length` may be unavailable

`Content-Length` is the exact number of bytes on the wire **before transfer/content codings** according to the relevant HTTP semantics. To emit it up front, the sender must know the serialized byte count.

For JSON that requires knowing:

- the exact serialized representation;
- UTF-8 byte count;
- escaping decisions;
- serializer options and converters;
- formatting/indentation.

`HttpContent` has internal length-computation behavior. Content backed by a known byte array or `MemoryStream` can normally provide a length. `JsonContent` may not pre-serialize only to compute that count, because doing so would defeat its streaming-oriented design.

Do not set an estimated `Content-Length`. A wrong count corrupts framing and can make the peer wait for bytes that will never arrive or treat trailing bytes as another message.

## HTTP/1.1 chunked transfer

When the final length is unknown and HTTP/1.1 is used, the body can be framed with `Transfer-Encoding: chunked`.

Each chunk has:

1. hexadecimal byte count;
2. CRLF;
3. that many data bytes;
4. CRLF.

The body ends with a zero-sized chunk:

```text
A\r\n
0123456789\r\n
0\r\n
\r\n
```

`A` means ten bytes. Chunk boundaries are transport framing, not JSON boundaries. A JSON token or UTF-8 character may be split across reads. Server application code sees a continuous body stream after the server removes HTTP framing.

Important protocol nuance: HTTP/2 and HTTP/3 use their own frame layers and do not use the HTTP/1.1 `Transfer-Encoding: chunked` header in the same way. Application code should not depend on chunk boundaries.

## `Content-Length` flow

With a prebuilt `MemoryStream` or `byte[]`, the sender knows the exact size:

```csharp
content.Headers.ContentLength = buffer.Length;
```

Usually the content type computes this itself; explicitly setting it is only sensible when the value is exact and remains exact.

A known length can help servers enforce size limits early and can simplify progress calculation. It does not automatically make the request faster, and an unknown length does not automatically mean the entire body is buffered.

## Compression is a separate dimension

Compression describes the representation of the content, for example:

```text
Content-Encoding: gzip
```

Transfer framing describes how the message body is delimited during transport, for example:

```text
Content-Length: 1234
```

or HTTP/1.1 chunked framing.

Possible combinations include:

- fixed-length, uncompressed;
- fixed-length, compressed after precomputing compressed bytes;
- streamed compression with unknown final length;
- compressed content transported with HTTP/1.1 chunked framing.

Compression can make payload bytes smaller, but it does not require the application to prebuffer the full body. A streaming compression content can compress as it writes. Conversely, precompressing to a memory stream provides a known final compressed size but deliberately buffers the complete result.

## What changes on the server

After HTTP framing and content decoding are handled by the server stack, ASP.NET Core exposes a request body stream/pipe. Typical endpoint code does not manually parse chunk-size lines.

The application-level body consumption remains:

```csharp
await JsonSerializer.DeserializeAsync<MyDto>(
    Request.Body,
    options,
    cancellationToken);
```

or framework model binding. Differences can still appear in:

- whether `Content-Length` is present;
- request-size validation performed before reading;
- progress reporting;
- proxies that reject or buffer unknown-length bodies;
- timeout behavior;
- compression middleware and server limits.

The payload semantics and JSON parsing are not changed merely because transport framing used chunks.

# R03 — Response reading, file download, deserialization and disposal

## Area understanding and reading quality

This region follows the lifetime of an `HttpResponseMessage` from headers through body consumption. It compares full buffering, stream-based JSON deserialization, incremental JSON arrays, and direct file copying. The source repeatedly emphasizes that avoiding a large intermediate response buffer does not prevent the final DTO graph from occupying memory.

Reading confidence is high. Examples show `ResponseHeadersRead`, `ReadAsStringAsync`, `ReadFromJsonAsync`, `ReadAsStreamAsync`, `JsonSerializer.DeserializeAsync`, `DeserializeAsyncEnumerable`, `CopyToAsync`, and response disposal.

## Default completion mode

The ordinary overload:

```csharp
using HttpResponseMessage response =
    await client.GetAsync(uri, cancellationToken);
```

uses `HttpCompletionOption.ResponseContentRead`. The returned task completes after the response content has been read into the buffering policy used by `HttpClient`.

That means later code such as:

```csharp
string json = await response.Content.ReadAsStringAsync(cancellationToken);
```

is generally reading from content that has already been received, not holding the network open while the whole body arrives.

## String path: the heaviest common JSON shape

```csharp
using HttpResponseMessage response =
    await client.GetAsync(uri, cancellationToken);

response.EnsureSuccessStatusCode();

string json =
    await response.Content.ReadAsStringAsync(cancellationToken);

MyDto? dto =
    JsonSerializer.Deserialize<MyDto>(json, options);
```

During the operation, memory may contain overlapping representations:

- buffered response bytes;
- a UTF-16 `string`;
- the final object graph;
- serializer temporary state.

It is readable and acceptable for ordinary payloads, but it is the wrong default for very large responses when memory pressure matters.

## `ReadFromJsonAsync` after default `GetAsync`

```csharp
using HttpResponseMessage response =
    await client.GetAsync(uri, cancellationToken);

MyDto? dto =
    await response.Content.ReadFromJsonAsync<MyDto>(
        options,
        cancellationToken);
```

This avoids explicitly creating a large JSON string. However, default `GetAsync` already waited for and buffered the body. The improvement is avoiding the string representation, not changing the earlier completion/buffering behavior.

`GetFromJsonAsync<T>` is a convenience composition of request, success handling and JSON deserialization. It is appropriate when callers do not need detailed response headers or custom error-body handling.

## Streaming completion plus stream deserialization

```csharp
using HttpResponseMessage response =
    await client.GetAsync(
        uri,
        HttpCompletionOption.ResponseHeadersRead,
        cancellationToken);

response.EnsureSuccessStatusCode();

await using Stream body =
    await response.Content.ReadAsStreamAsync(cancellationToken);

MyDto? dto =
    await JsonSerializer.DeserializeAsync<MyDto>(
        body,
        options,
        cancellationToken);
```

Concrete gains:

- `GetAsync` completes once headers are available.
- The entire raw body is not first required as one `byte[]` or `string`.
- The JSON parser consumes bytes incrementally.
- Cancellation can interrupt body reading/deserialization.

Concrete non-gain: for a single JSON object, the final `MyDto` graph still must exist in memory when deserialization completes. Streaming removes the giant raw representation, not the logical result.

## Incremental JSON arrays

When the server sends one JSON array containing many elements, `DeserializeAsyncEnumerable<T>` can yield items without first building a `List<T>`:

```csharp
await foreach (
    MyDto? item in JsonSerializer.DeserializeAsyncEnumerable<MyDto>(
        body,
        options,
        cancellationToken))
{
    if (item is null)
        continue;

    await ProcessAsync(item, cancellationToken);
}
```

Advantages:

- no giant array/list allocation;
- faster time to first item;
- items can become collectible after processing if not retained.

It is not bandwidth compression. The same logical JSON bytes still cross the network. It can also cost more CPU or application overhead if each item is handled individually.

## File download: pipe bytes to disk

```csharp
using HttpResponseMessage response =
    await client.GetAsync(
        uri,
        HttpCompletionOption.ResponseHeadersRead,
        cancellationToken);

response.EnsureSuccessStatusCode();

await using Stream network =
    await response.Content.ReadAsStreamAsync(cancellationToken);

await using FileStream destination = new(
    filePath,
    FileMode.Create,
    FileAccess.Write,
    FileShare.None,
    bufferSize: 81920,
    useAsync: true);

await network.CopyToAsync(destination, cancellationToken);
```

This keeps a bounded copy buffer rather than materializing the file in memory.

## Disposal and connection reuse

Dispose the `HttpResponseMessage` after the body is fully consumed or intentionally abandoned. Disposing the response disposes its content and associated response stream.

With `ResponseHeadersRead`, the connection remains occupied while application code consumes the body. Slow consumers, abandoned bodies, or forgotten responses can reduce connection-pool availability.

A safe structure is:

```csharp
using HttpResponseMessage response = await client.SendAsync(
    request,
    HttpCompletionOption.ResponseHeadersRead,
    cancellationToken);

response.EnsureSuccessStatusCode();

await using Stream body =
    await response.Content.ReadAsStreamAsync(cancellationToken);

// Consume body here before leaving the scope.
```

## Server-side comparison

ASP.NET Core's normal JSON model binding already reads the request body through an input formatter and stream/pipe infrastructure:

```csharp
app.MapPost("/items", (CreateItem command) =>
{
    return Results.Ok(command);
});
```

Manually calling `JsonSerializer.DeserializeAsync(Request.Body)` provides control but does not automatically reduce memory compared with normal binding. It is useful when the endpoint needs custom options, a nonstandard contract, incremental records, or explicit parsing/error behavior.

# R04 — ResponseHeadersRead, buffering, retry pipelines and decompression

## Area understanding and reading quality

This is the most important buffering region. It distinguishes response-body buffering, string materialization, serializer buffering, stream-reader buffering, server request buffering, and retry replayability. It also connects `HttpCompletionOption.ResponseHeadersRead` with connection lifetime and resilience pipelines.

Reading confidence is high. The screenshots contain both conceptual comparisons and complete code for conditional buffering, `EnableBuffering`, a replay-safe upload retry, and manual Polly pipeline execution.

## What `ResponseHeadersRead` actually changes

```csharp
using HttpResponseMessage response =
    await client.SendAsync(
        request,
        HttpCompletionOption.ResponseHeadersRead,
        cancellationToken);
```

This option changes the completion criterion of `SendAsync`/`GetAsync`: the task can complete after headers are read instead of after the entire response content is buffered.

It does **not** force every later content API to remain streaming.

APIs that deliberately materialize the full content still do so:

- `ReadAsStringAsync`;
- `ReadAsByteArrayAsync`;
- `LoadIntoBufferAsync`;
- convenience methods whose contract returns the entire string/byte array.

Therefore this pattern still buffers the body as a string:

```csharp
using HttpResponseMessage response = await client.GetAsync(
    uri,
    HttpCompletionOption.ResponseHeadersRead,
    cancellationToken);

string text =
    await response.Content.ReadAsStringAsync(cancellationToken);
```

The benefit of headers-read mode appears only when the caller then consumes the content progressively or conditionally.

## Stream deserialization is incremental, result materialization is not

```csharp
await using Stream body =
    await response.Content.ReadAsStreamAsync(cancellationToken);

MyDto? dto = await JsonSerializer.DeserializeAsync<MyDto>(
    body,
    options,
    cancellationToken);
```

The JSON parser uses bounded internal buffers and can cross network-read boundaries. It does not require a full intermediate string. But a single final `MyDto` still appears only when enough JSON has been parsed to create the completed object graph.

The relevant memory comparison is:

```text
ReadAsStringAsync + Deserialize:
buffered bytes + UTF-16 string + object graph

ReadAsStreamAsync + DeserializeAsync:
small read/parser buffers + object graph
```

Neither path promises zero buffering.

## Convenience methods and completion mode

`GetStringAsync`, `GetByteArrayAsync`, and ordinary `GetAsync` are convenience APIs optimized for fully materialized results. They are not wrong; they encode a different ownership contract.

A useful conditional pattern is:

```csharp
using HttpResponseMessage response = await client.GetAsync(
    uri,
    HttpCompletionOption.ResponseHeadersRead,
    cancellationToken);

response.EnsureSuccessStatusCode();

if (needRawDiagnostics)
{
    string raw =
        await response.Content.ReadAsStringAsync(cancellationToken);

    LogBody(raw);
    return JsonSerializer.Deserialize<MyDto>(raw, options);
}

await using Stream stream =
    await response.Content.ReadAsStreamAsync(cancellationToken);

return await JsonSerializer.DeserializeAsync<MyDto>(
    stream,
    options,
    cancellationToken);
```

One body can normally be consumed once. Do not read a non-seekable response stream and then expect a second parser to start from the beginning unless the content has been buffered intentionally.

## `StreamReader` is another buffer and decoder

`StreamReader` adds:

- byte buffering;
- character decoding;
- a character buffer;
- line/text-oriented APIs.

It is useful for line-based protocols, logs, CSV, SSE, NDJSON text framing, or controlled text inspection. It does not make a full `ReadToEndAsync()` streaming in the application sense; that method still returns the complete string.

```csharp
await using Stream body =
    await response.Content.ReadAsStreamAsync(cancellationToken);

using var reader = new StreamReader(
    body,
    Encoding.UTF8,
    detectEncodingFromByteOrderMarks: true,
    bufferSize: 4096,
    leaveOpen: false);

while (await reader.ReadLineAsync(cancellationToken) is { } line)
{
    ProcessLine(line);
}
```

## Connection and error timing

With default full buffering, many network errors appear before `GetAsync` returns. With headers-read mode, errors can appear later during:

- `ReadAsync`;
- `CopyToAsync`;
- deserialization;
- decompression;
- line parsing.

Timeout/cancellation must cover the body-consumption stage, not just the initial request.

The connection stays in use until the body is drained or the response is disposed. Streaming a 5 GB body through a consumer that processes 1 KB per second intentionally keeps that connection active for a long time.

## Server-side `EnableBuffering`

ASP.NET Core request bodies are normally forward-only from application code's point of view. Middleware that reads the body before MVC/minimal API processing must either be the sole consumer or explicitly enable replay buffering:

```csharp
app.Use(async (context, next) =>
{
    context.Request.EnableBuffering();

    using var reader = new StreamReader(
        context.Request.Body,
        Encoding.UTF8,
        detectEncodingFromByteOrderMarks: true,
        leaveOpen: true);

    string body = await reader.ReadToEndAsync();
    context.Request.Body.Position = 0;

    await next();
});
```

`EnableBuffering` is not free. It buffers in memory up to configured thresholds and can spill to disk. Use it for diagnostics, signatures, or auditing when rereading is a real requirement, not as a default for every request.

## Retries and one-shot request bodies

A stream-backed `HttpContent` may be non-seekable or already consumed. A `DelegatingHandler` cannot make an arbitrary content stream replayable by resetting magic state.

Two correct strategies are:

### Recreate the request and source for each attempt

```csharp
HttpResponseMessage response =
    await pipeline.ExecuteAsync(async cancellationToken =>
    {
        await using FileStream file =
            File.OpenRead(filePath);

        using var request =
            new HttpRequestMessage(HttpMethod.Post, uri);

        request.Content = new StreamContent(file);
        request.Content.Headers.ContentType =
            new MediaTypeHeaderValue("application/octet-stream");

        return await client.SendAsync(
            request,
            HttpCompletionOption.ResponseHeadersRead,
            cancellationToken);
    }, cancellationToken);
```

Every attempt receives a fresh request, fresh content and fresh stream.

### Buffer once to replayable bytes

```csharp
byte[] bytes =
    await File.ReadAllBytesAsync(filePath, cancellationToken);

await pipeline.ExecuteAsync(async cancellationToken =>
{
    using var request =
        new HttpRequestMessage(HttpMethod.Post, uri);

    request.Content = new ByteArrayContent(bytes);
    return await client.SendAsync(request, cancellationToken);
}, cancellationToken);
```

This is replayable but intentionally pays the memory cost.

A handler remains appropriate for orthogonal request/response mutation: correlation headers, logging/redaction, decompression configuration, authorization, or idempotency metadata. Manual resilience execution belongs around the operation that knows how to recreate its request body.

## Automatic decompression

Automatic decompression is configured on the HTTP handler. The response content stream exposed to the application may already be decompressed. This changes the number of bytes consumed by application code and means `Content-Length` may describe the encoded representation rather than the final decompressed byte count.

Treat decompression, transport buffering, JSON parsing, and final object materialization as separate layers.

# R05 — Additional request media types and Base64 payloads

## Area understanding and reading quality

This compact region compares JSON-embedded Base64 with multipart file upload. The source includes both `[FromBody] byte[]`/DTO examples and `[FromForm] IFormFile` examples.

Reading confidence is high.

## Base64 inside JSON

JSON cannot contain arbitrary raw bytes. A `byte[]` property is represented as a Base64 string by the standard JSON serializer:

```csharp
public sealed class UploadRequest
{
    public string FileName { get; init; } = "";
    public string ContentType { get; init; } = "";
    public byte[] FileBytes { get; init; } = [];
}
```

Wire shape:

```json
{
  "fileName": "report.pdf",
  "contentType": "application/pdf",
  "fileBytes": "AQIDBAU="
}
```

ASP.NET Core JSON model binding decodes the Base64 text into `byte[]`:

```csharp
[HttpPost]
[Consumes("application/json")]
public IActionResult Upload([FromBody] UploadRequest request)
{
    return Ok(new { request.FileBytes.Length });
}
```

A bare JSON body can also bind to `byte[]` when the body itself is a JSON string containing Base64, not raw binary octets.

## Cost model

Base64 maps every three input bytes to four text characters, plus padding where necessary. The payload is roughly 33% larger before additional JSON/TLS/HTTP overhead.

Memory can include:

- original bytes;
- Base64 text;
- JSON text/bytes;
- decoded destination bytes.

It is useful for small payloads where a single JSON contract is operationally simpler. It is a poor choice for a large file.

## Client example

```csharp
byte[] bytes =
    await File.ReadAllBytesAsync(path, cancellationToken);

var request = new UploadRequest
{
    FileName = Path.GetFileName(path),
    ContentType = "application/pdf",
    FileBytes = bytes
};

using JsonContent content = JsonContent.Create(request);
using HttpResponseMessage response =
    await client.PostAsync(uri, content, cancellationToken);

response.EnsureSuccessStatusCode();
```

This intentionally loads the entire file before sending.

## Multipart is the normal file-upload choice

```csharp
await using FileStream file = File.OpenRead(path);

using var multipart = new MultipartFormDataContent();
multipart.Add(new StreamContent(file), "file", Path.GetFileName(path));
multipart.Add(new StringContent("document"), "category");
```

Server DTO:

```csharp
public sealed class UploadForm
{
    public IFormFile File { get; init; } = default!;
    public string Category { get; init; } = "";
}

[HttpPost]
[Consumes("multipart/form-data")]
public async Task<IActionResult> Upload(
    [FromForm] UploadForm form,
    CancellationToken cancellationToken)
{
    await using Stream destination =
        System.IO.File.Create(form.File.FileName);

    await form.File.CopyToAsync(destination, cancellationToken);
    return Ok();
}
```

Multipart avoids Base64 inflation and preserves file metadata through part headers.

## Quick rule

- Small binary value tightly coupled to JSON metadata → Base64 property can be acceptable.
- Normal or large file upload → multipart file part.
- File-only raw endpoint → `StreamContent` with an explicit binary media type.

# R06 — ASP.NET Core response writing, raw downloads, plain text, NDJSON and SSE

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

# R07 — ASP.NET Core request-body reading, model binding and PipeReader entry points

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

# R08 — StreamReader concepts, encodings, constructors and read APIs

## Area understanding and reading quality

This region is a method-by-method `StreamReader` reference plus a decision boundary between text-oriented reading and pipe-based byte parsing. The source explicitly covers constructors, encoding, buffering, `Read`, `Peek`, `ReadAsync`, `ReadBlockAsync`, `ReadLine`, `ReadToEnd`, `DiscardBufferedData`, and properties.

Reading confidence is high.

## Purpose and layering

`StreamReader` adapts a byte `Stream` into decoded characters:

```text
byte stream
→ internal byte buffer
→ Encoding decoder
→ internal char buffer
→ char/string/line APIs
```

Use it for fundamentally textual sources:

- text files;
- CSV;
- JSON/XML text when a text API is required;
- logs;
- text network protocols;
- request bodies that must be inspected as text.

Do not use it to parse arbitrary binary formats, images, archives, or exact byte-oriented protocols.

## Constructors and ownership

Simple file path:

```csharp
using var reader =
    new StreamReader("file.txt");
```

Existing stream with explicit controls:

```csharp
await using FileStream stream =
    File.OpenRead("file.txt");

using var reader = new StreamReader(
    stream,
    Encoding.UTF8,
    detectEncodingFromByteOrderMarks: true,
    bufferSize: 4096,
    leaveOpen: true);
```

Important options:

- `Encoding` defines byte-to-character decoding.
- BOM detection can override the initially supplied encoding when a supported preamble exists.
- `bufferSize` controls internal buffering strategy, not an exact promise about every OS read.
- `leaveOpen` controls whether disposing the reader disposes the underlying stream.

Using the wrong encoding can silently corrupt text. Do not assume every payload is UTF-8 merely because modern APIs often use it.

## `Read` and `Peek`

`Read()` consumes one character and returns an `int` so `-1` can represent end-of-stream:

```csharp
int value;
while ((value = reader.Read()) != -1)
{
    char character = (char)value;
}
```

`Peek()` inspects the next character without consuming it:

```csharp
int next = reader.Peek();
if (next >= 0 && (char)next == '#')
{
    // Decide whether to consume.
}
```

Character-by-character loops are suitable for small parsers but may be less efficient and harder to reason about than block/line APIs.

## `ReadAsync` versus `ReadBlockAsync`

`ReadAsync(Memory<char>, cancellationToken)` returns when some characters are available or the end is reached. It may return fewer than the requested count.

```csharp
char[] chars = new char[4096];

int read = await reader.ReadAsync(
    chars.AsMemory(),
    cancellationToken);
```

`ReadBlockAsync` attempts to fill the requested block and keeps reading until the block is full or no more data is available:

```csharp
int read = await reader.ReadBlockAsync(
    chars.AsMemory(),
    cancellationToken);
```

Choose:

- `ReadAsync` for progressive processing and lower latency.
- `ReadBlockAsync` when fixed-size character blocks are useful and waiting for a full block is acceptable.

Neither method guarantees a relationship between one call and one network packet or one original stream write.

## Lines

```csharp
while (
    await reader.ReadLineAsync(cancellationToken)
        is { } line)
{
    Process(line);
}
```

`ReadLineAsync` removes the line terminator. It recognizes standard line-ending forms. The returned string allocates one managed string per line.

For huge lines, this can create large strings. A `PipeReader` parser can retain segmented bytes, scan incrementally, and decode only after a complete frame is chosen.

## `ReadToEndAsync`

```csharp
string text =
    await reader.ReadToEndAsync(cancellationToken);
```

This intentionally materializes all remaining text in one string. Use it only when size is bounded and that final string is actually required.

## Properties

- `EndOfStream` indicates no more characters are available. A natural `while ((line = ReadLine()) != null)` loop is often clearer.
- `CurrentEncoding` reports the active encoding after BOM detection.
- `BaseStream` exposes the underlying byte stream.

Mixing direct `BaseStream` reads/seeks with the reader is dangerous because the reader may already hold bytes and decoded chars in internal buffers.

## `DiscardBufferedData`

If code manually repositions the underlying seekable stream:

```csharp
reader.BaseStream.Seek(0, SeekOrigin.Begin);
reader.DiscardBufferedData();
```

the reader must discard buffered state so its decoder/char buffer match the new stream position.

This operation is relatively expensive. Frequent seek/discard cycles suggest a different design may be cleaner.

## Text versus mixed binary/text protocols

`StreamReader` moves the abstraction into characters early. That is awkward when a protocol contains:

- binary length prefix;
- UTF-8 text payload;
- binary trailer;
- checksums or fixed-byte markers.

Use byte APIs (`Stream`, `PipeReader`, `SequenceReader<byte>`) until framing is known, then decode only the text slice.

## Boundary with `PipeReader`

`StreamReader` is the right default for ordinary newline text.

`PipeReader` becomes attractive when:

- a line/frame can be extremely large;
- delimiters cross buffer segments;
- only part of a frame must be decoded;
- byte-level protocol parsing happens before text decoding;
- avoiding temporary contiguous arrays matters;
- custom consumed/examined control is needed.

The fact that a payload contains newlines alone is not enough reason to replace `StreamReader`.

# R09 — StreamWriter concepts, buffering, flush, disposal and BaseStream

## Area understanding and reading quality

This area explains what `StreamWriter` actually buffers, when that buffering helps, and when ASP.NET Core's direct response methods are simpler. It includes `Write`, `WriteLine`, async variants, `Flush`, disposal, `BaseStream`, `AutoFlush`, buffer size, NDJSON, and SSE.

Reading confidence is high.

## Layering

`StreamWriter` adapts characters to a byte stream:

```text
chars/strings
→ internal char buffer
→ Encoding encoder
→ underlying byte Stream
```

It reduces the number of small underlying writes when application code emits many text fragments.

```csharp
await using var writer = new StreamWriter(
    output,
    new UTF8Encoding(false),
    bufferSize: 4096,
    leaveOpen: true);
```

## What buffering improves

When code writes many small pieces:

```csharp
await writer.WriteAsync("Name: ");
await writer.WriteAsync(name);
await writer.WriteAsync(", Age: ");
await writer.WriteLineAsync(age.ToString());
```

the writer can encode/batch fragments rather than issuing a separate low-level write for each call.

Benefits can include:

- fewer underlying stream writes;
- fewer system calls or network-output operations;
- better small-write composition;
- convenient text formatting and line handling.

Buffering does not automatically reduce **total** allocations. An extremely small buffer can increase flush frequency; an extremely large buffer can retain unnecessary memory without improving throughput.

## Buffer size

The constructor buffer size is a tuning input, not a guarantee that every underlying write uses exactly that count. Encoding state and implementation details affect actual writes.

Practical guidance:

- a few kilobytes is a reasonable general starting point;
- use smaller buffers only for a measured latency/memory reason;
- use larger buffers only after measurement;
- prefer reuse/batching design over arbitrary giant buffers.

## `Write` and `WriteLine`

```csharp
writer.Write("prefix:");
writer.Write(value);
writer.WriteLine();
```

`WriteLine` appends the writer's newline sequence. It is suitable for logs, CSV-like output, line protocols, and text reports.

Async forms are relevant when the underlying stream is asynchronous:

```csharp
await writer.WriteAsync(text.AsMemory(), cancellationToken);
await writer.WriteLineAsync(line.AsMemory(), cancellationToken);
```

Avoid alternating synchronous and asynchronous operations unpredictably on the same writer.

## Flush semantics

```csharp
await writer.FlushAsync(cancellationToken);
```

Flush pushes the writer's buffered characters through its encoder into the underlying stream. The underlying stream or network stack can still maintain its own buffers.

Use flush when:

- protocol delivery requires current data to become observable;
- a response event must be sent now;
- data must be durable/visible at a specific boundary;
- the operation is about to hand control to another component.

Do not flush after every tiny fragment by habit. That neutralizes the writer's batching advantage.

## Disposal and `leaveOpen`

Disposing/closing the writer flushes final encoder state and, by default, closes the underlying stream.

In ASP.NET Core:

```csharp
await using var writer = new StreamWriter(
    context.Response.Body,
    Encoding.UTF8,
    bufferSize: 4096,
    leaveOpen: true);
```

`leaveOpen: true` is usually required because the framework owns `Response.Body`.

`DisposeAsync` is appropriate when final flushing may require asynchronous I/O.

## `AutoFlush`

```csharp
writer.AutoFlush = true;
```

With `AutoFlush`, data is flushed after each write. This reduces batching, increases output operations, and is often a poor throughput choice. It can be appropriate for interactive protocols where immediate visibility is more important than batching.

## `BaseStream`

`BaseStream` exposes the underlying byte stream. Avoid mixing arbitrary byte writes with the writer unless the writer is flushed and encoding/framing boundaries are deliberately controlled. Otherwise buffered characters can be reordered relative to direct byte writes.

## ASP.NET Core choices

### One string

```csharp
await context.Response.WriteAsync(
    text,
    cancellationToken);
```

This is simpler than constructing a writer.

### Many text fragments

`StreamWriter` is reasonable for report/CSV generation or complex text composition.

### Binary or exact frames

Use `Response.Body.WriteAsync` or `Response.BodyWriter`. `StreamWriter` cannot express raw length prefixes, checksums, arbitrary bytes, or exact binary layout without text encoding changing the data.

## NDJSON and SSE

For NDJSON, each JSON object must remain one logical line. `WriteLineAsync` can be used after serialization to a string, but that creates an intermediate string. Writing JSON directly to the response stream and then writing `\n` can avoid it.

For SSE, every event is terminated by a blank line and generally flushed promptly. Because frequent flush is part of the protocol's latency requirement, `Response.WriteAsync` may be just as clear as adding a `StreamWriter`.

# R10 — PipeWriter buffers, Advance, Flush, examples and tradeoffs

## Area understanding and reading quality

This region covers the exact `PipeWriter` contract: obtaining writable memory, initializing it, reporting bytes with `Advance`, flushing, handling `FlushResult`, cancelling pending flushes, completing the writer, batching, and deciding whether `PipeWriter` is appropriate at all.

Reading confidence is high. The source includes direct UTF-8 and binary-prefix examples, CSV generation, and cautions against treating frequent flushes as an optimization.

## Core write loop

```csharp
PipeWriter writer = context.Response.BodyWriter;

Span<byte> span = writer.GetSpan(sizeHint: 1024);

int written = Encoding.UTF8.GetBytes(
    "hello",
    span);

writer.Advance(written);

FlushResult result =
    await writer.FlushAsync(cancellationToken);
```

The contract has three distinct operations:

1. `GetSpan`/`GetMemory` asks for writable storage.
2. Application code initializes some prefix of that storage.
3. `Advance(count)` reports exactly how many bytes were initialized.

Advancing too far exposes uninitialized/old bytes. Advancing too little omits data.

## `GetSpan` versus `GetMemory`

- `GetSpan(int sizeHint)` is ideal for synchronous encoding/copying before the next await.
- `GetMemory(int sizeHint)` is useful when an API requires `Memory<byte>`.

The returned region is owned by the pipe. Do not store it for long-term use. Once the writer is advanced and another writer operation is made, application code must not continue reading/writing the old span as if it were independent memory.

`sizeHint` is a minimum request, not a promise of exact capacity. The returned memory can be larger.

## Direct encoding

Avoid an intermediate `byte[]`:

```csharp
PipeWriter writer = context.Response.BodyWriter;
string line = $"{id},{name},{age}\n";

Span<byte> destination =
    writer.GetSpan(
        Encoding.UTF8.GetMaxByteCount(line.Length));

int bytesWritten =
    Encoding.UTF8.GetBytes(line, destination);

writer.Advance(bytesWritten);
```

This is valuable when repeated fragments would otherwise allocate `Encoding.UTF8.GetBytes(string)` arrays.

## Exact binary framing

```csharp
ReadOnlySpan<byte> payload = source;

Span<byte> destination =
    writer.GetSpan(4 + payload.Length);

BinaryPrimitives.WriteInt32BigEndian(
    destination[..4],
    payload.Length);

payload.CopyTo(destination[4..]);

writer.Advance(4 + payload.Length);
```

The writer is appropriate because framing and payload can be written directly into the output buffer.

## `FlushAsync` and `FlushResult`

```csharp
FlushResult flush =
    await writer.FlushAsync(cancellationToken);

if (flush.IsCanceled)
{
    // A pending flush was cancelled.
}

if (flush.IsCompleted)
{
    // The reader/consumer completed; stop producing.
}
```

A flush makes written bytes available to the reader/transport according to pipeline scheduling. It does not promise one socket packet, immediate remote delivery, or durable storage.

## Batching policy

Good batching strategy:

- write several records/fragments;
- track unflushed byte count or a logical batch;
- flush at a byte threshold, item threshold, latency boundary, or protocol boundary.

Bad default:

```csharp
foreach (Item item in items)
{
    WriteOneTinyFragment(item);
    await writer.FlushAsync(cancellationToken);
}
```

Frequent flushes can increase scheduling, syscalls, TLS framing, and CPU overhead. Use them because the consumer must observe data now, not because "streaming" sounds faster.

## `WriteAsync`

High-level write helpers can accept a `ReadOnlyMemory<byte>` and combine copy/advance/flush behavior. They are useful when bytes already exist.

If the main benefit is avoiding creation of those bytes in the first place, `GetSpan`/`GetMemory` plus direct encoding is the more important API.

## Cancellation and completion

`CancelPendingFlush()` wakes/cancels a pending flush operation. It is a coordination mechanism; it does not erase already-written data.

Complete the writer when the application owns it:

```csharp
await writer.CompleteAsync();
```

In ASP.NET Core, the framework owns `Response.BodyWriter`. Endpoint code normally flushes/writes but does not independently complete the framework pipeline.

## When `PipeWriter` is valid

Strong cases:

- custom binary frames;
- length prefixes/checksums;
- high-volume text generation from many fragments;
- direct UTF-8 encoding into pipeline memory;
- protocol writers shared across stream/pipe adapters;
- measured allocation pressure from intermediate arrays.

Weak cases:

- ordinary DTO JSON;
- copying a file stream;
- one plain text string;
- logic whose only goal is "flush more often";
- code that becomes harder to verify without measured benefit.

`PipeWriter` is a low-level memory/framing tool, not a business-level streaming requirement.

# R11 — PipeReader fundamentals, ReadResult, ReadOnlySequence and AdvanceTo

## Area understanding and reading quality

This region introduces `PipeReader`, `ReadResult`, `ReadOnlySequence<byte>`, `SequencePosition`, `ReadAsync`, `TryRead`, slicing, endianness, and the two `AdvanceTo` forms. It is the contract foundation for R12/R13.

Reading confidence is high.

## `PipeReader`

ASP.NET Core exposes the request pipe through:

```csharp
PipeReader reader =
    context.Request.BodyReader;
```

A `PipeReader` does not return a fresh byte array per read. `ReadAsync` returns a view over bytes currently available in the pipeline.

```csharp
ReadResult result =
    await reader.ReadAsync(cancellationToken);

ReadOnlySequence<byte> buffer =
    result.Buffer;
```

## `ReadResult`

Important properties:

- `Buffer`: available bytes as `ReadOnlySequence<byte>`.
- `IsCompleted`: the producer has completed; bytes can still remain in `Buffer`.
- `IsCanceled`: the pending read was cancelled through pipe coordination.

`IsCompleted == true` does not mean `Buffer` is empty. Process remaining bytes before exiting.

## `ReadOnlySequence<byte>`

A sequence is a logical contiguous range that can be physically stored in multiple memory segments.

Useful properties/methods:

- `Start`, `End`;
- `Length`, `IsEmpty`;
- `IsSingleSegment`;
- `First`, `FirstSpan`;
- `PositionOf(value)`;
- `Slice(...)`;
- `GetPosition(offset, origin)`;
- `CopyTo`;
- `ToArray`.

`FirstSpan` is only the first physical segment. Parsing only `FirstSpan` is incorrect when a record can cross segments.

## `SequencePosition`

`SequencePosition` is an opaque cursor tied to its sequence. Do not perform integer arithmetic on it or compare internals. Use sequence APIs to move:

```csharp
SequencePosition next =
    buffer.GetPosition(offset, buffer.Start);
```

Positions are passed to `Slice` and `AdvanceTo`.

## `ReadAsync` versus `TryRead`

Normal async loop:

```csharp
ReadResult result =
    await reader.ReadAsync(cancellationToken);
```

`TryRead(out ReadResult result)` returns immediately only when data is already available. It is useful for opportunistic draining or advanced coordination, not as a general replacement for awaiting data.

## Position and slicing

Find a newline:

```csharp
SequencePosition? position =
    buffer.PositionOf((byte)'\n');

if (position is not null)
{
    ReadOnlySequence<byte> line =
        buffer.Slice(0, position.Value);
}
```

Remove the delimiter from the next unread buffer:

```csharp
SequencePosition afterDelimiter =
    buffer.GetPosition(1, position.Value);
```

Avoid `ToArray()` in hot paths because it allocates a contiguous copy of all segments. It can be acceptable at a bounded boundary where the next API requires an array.

## Endianness belongs to the protocol

Network protocols often define big-endian integers:

```csharp
if (buffer.Length >= 4)
{
    Span<byte> header = stackalloc byte[4];
    buffer.Slice(0, 4).CopyTo(header);

    int length =
        BinaryPrimitives.ReadInt32BigEndian(header);
}
```

Do not infer endianness from the machine. Read according to the protocol definition.

## `AdvanceTo(consumed)`

```csharp
reader.AdvanceTo(consumed);
```

The one-position form means all bytes before `consumed` are permanently consumed, and the same position is used as the examined boundary.

Use it when the code consumed/copied everything it examined or has no partial-frame distinction.

## `AdvanceTo(consumed, examined)`

```csharp
reader.AdvanceTo(consumed, examined);
```

- `consumed`: bytes before this position can be released.
- `examined`: bytes through this position were inspected while looking for a complete record.

Example: buffer contains one complete line plus half of the next. Consume through the complete line, but mark the current end as examined. The remaining partial line stays for the next read.

Incorrect positions cause serious behavior:

- advancing `consumed` too far drops unprocessed bytes;
- never moving `consumed` retains memory;
- reporting `examined` incorrectly can cause unnecessary wakeups or a stalled read loop.

## Completion and cancellation

`CancelPendingRead()` interrupts a pending read for coordination/shutdown. It does not throw away buffered bytes automatically.

When the application owns the reader:

```csharp
await reader.CompleteAsync();
```

ASP.NET Core owns `Request.BodyReader`; ordinary endpoint code generally must not complete it independently.

`CopyToAsync(Stream)` is useful when the operation is simply pipe-to-stream transfer. If there is no parsing or leftover management, the stream API may be clearer.

# R12 — Advanced PipeReader parsing, delimiters, slicing and copy avoidance

## Area understanding and reading quality

This region moves from API definitions to parser design: newline-delimited records, incomplete frames, consumed versus examined, multi-segment decoding, fixed-size headers, `IsSingleSegment` fast paths, avoiding `ToArray`, and deciding when a plain `Stream` is better.

Reading confidence is high.

## Canonical newline parser

```csharp
PipeReader reader =
    context.Request.BodyReader;

while (true)
{
    ReadResult result =
        await reader.ReadAsync(cancellationToken);

    ReadOnlySequence<byte> buffer =
        result.Buffer;

    while (TryReadLine(
        ref buffer,
        out ReadOnlySequence<byte> line))
    {
        ProcessLine(line);
    }

    // buffer now contains only the unprocessed suffix.
    reader.AdvanceTo(
        consumed: buffer.Start,
        examined: buffer.End);

    if (result.IsCompleted)
    {
        if (!buffer.IsEmpty)
        {
            // Decide whether an unterminated final record is valid.
            ProcessFinalPartial(buffer);
        }

        break;
    }
}
```

Line extraction:

```csharp
static bool TryReadLine(
    ref ReadOnlySequence<byte> buffer,
    out ReadOnlySequence<byte> line)
{
    SequencePosition? position =
        buffer.PositionOf((byte)'\n');

    if (position is null)
    {
        line = default;
        return false;
    }

    line = buffer.Slice(0, position.Value);

    SequencePosition next =
        buffer.GetPosition(1, position.Value);

    buffer = buffer.Slice(next);
    return true;
}
```

This keeps an incomplete line in the pipe instead of copying it into a growing application buffer.

## Consumed versus examined with a partial record

Suppose the current bytes are:

```text
hello\nwor
```

After processing `hello\n`:

- `consumed` should point after that delimiter.
- the partial `wor` remains unconsumed.
- `examined` usually reaches the current buffer end because all available bytes were checked for another delimiter.

When more bytes arrive, the next buffer can logically be:

```text
world\n
```

without the application manually concatenating arrays.

## `IsSingleSegment` fast path

```csharp
string text;

if (line.IsSingleSegment)
{
    text = Encoding.UTF8.GetString(line.FirstSpan);
}
else
{
    byte[] temporary = line.ToArray();
    text = Encoding.UTF8.GetString(temporary);
}
```

The second branch allocates. In many applications that bounded allocation is acceptable. In a hot parser, use a sequence-aware decoder, `SequenceReader<byte>`, pooled temporary storage, or process segments incrementally.

Never assume `FirstSpan` contains the entire frame unless `IsSingleSegment` is true.

## Avoiding `ToArray`

Options include:

- parse numeric/binary fields directly from spans/segments;
- use `SequenceReader<byte>`;
- copy only a small fixed header to `stackalloc`;
- use `ArrayPool<byte>` for a bounded temporary contiguous buffer;
- decode segment-by-segment with a stateful `Decoder`;
- keep data as `ReadOnlySequence<byte>` until the consumer can handle it.

Avoiding every copy is not automatically optimal. A small bounded header copy can be simpler and faster than complicated segment-aware code.

## Fixed-size headers

For a four-byte header, a plain stream can be clearer:

```csharp
byte[] header = new byte[4];
await stream.ReadExactlyAsync(
    header,
    cancellationToken);

int length =
    BinaryPrimitives.ReadInt32BigEndian(header);
```

A `PipeReader` version is worthwhile when the rest of the protocol already needs partial-frame retention, delimiter scanning, and pipelined reads. It is not meaningfully better solely because four bytes can be read from a pipe.

## `CancelPendingRead`

`CancelPendingRead()` is used to wake a blocked read loop during coordinated shutdown. The next `ReadAsync`/current result reports cancellation through `IsCanceled`; code should decide whether to retry, exit, or process buffered bytes.

It is not an exception-based parser reset and does not release unconsumed data by itself.

## Pipe-to-stream copies

```csharp
await context.Request.BodyReader.CopyToAsync(
    destination,
    cancellationToken);
```

This is valid, but if no parsing occurs, `Request.Body.CopyToAsync` is often the simpler expression of the same business operation.

The primary strength of `PipeReader` is not copying; it is parser state plus leftover management across segmented reads.

# R13 — SequenceReader cursor API and segmented protocol parsing

## Area understanding and reading quality

This region is a detailed `SequenceReader<byte>` reference. It covers the cursor model, stack-only lifetime, segmented sequences, delimiters including escaped/multi-byte forms, lookahead, fixed-size headers across segments, integer methods, decoding, and transferring the final cursor back to `PipeReader.AdvanceTo`.

Reading confidence is high. The source screenshots list the property/method families and several concrete parsing patterns.

## What `SequenceReader<T>` is

```csharp
ReadOnlySequence<byte> sequence = GetSequence();
var reader = new SequenceReader<byte>(sequence);
```

`SequenceReader<T>` is a mutable cursor over a `ReadOnlySequence<T>`. It is a `ref struct`:

- stack-only;
- cannot be boxed;
- cannot be stored in a normal class field;
- cannot live across `await`;
- should be created and consumed inside the synchronous parsing portion of a read loop.

The `PipeReader` owns asynchronous waiting. `SequenceReader` performs synchronous parsing of the currently available sequence.

## Key properties

- `End`: no unread items remain.
- `Remaining`: count of unread items.
- `Consumed`: count advanced from the original start.
- `Position`: current `SequencePosition`.
- `CurrentSpan`: physical segment currently being inspected.
- `CurrentSpanIndex`: cursor index inside `CurrentSpan`.
- `UnreadSpan`: remaining suffix of the current physical span.

`UnreadSpan` is not the entire remaining logical sequence when more segments follow.

## Basic cursor movement

```csharp
if (reader.TryRead(out byte value))
{
    // Advanced by one only on success.
}

if (reader.TryPeek(out byte next))
{
    // Did not advance.
}

reader.Advance(count);
reader.Rewind(count);
```

Use `Rewind` for controlled backtracking within already-consumed items. Never rewind beyond the reader's consumed count.

`AdvancePast(value)` and `AdvancePastAny(values)` skip matching values from the current position, useful for whitespace or separators.

## Fixed-size lookahead without consumption

```csharp
Span<byte> header = stackalloc byte[8];

if (!reader.TryCopyTo(header))
{
    // Need more data; reader did not advance.
    return false;
}

// Validate header first.
if (!HeaderIsValid(header))
{
    throw new InvalidDataException();
}

reader.Advance(header.Length);
```

This handles a header split across physical segments without allocating a heap array.

## Integer reading and endianness

For a byte reader, integer helper methods can read little/big-endian values across segments:

```csharp
if (!reader.TryReadBigEndian(out int payloadLength))
{
    return false;
}
```

The method advances only on success. Choose endianness from the protocol specification.

When a particular overload/type is unavailable, copy a small header with `TryCopyTo` and use `BinaryPrimitives`.

## Delimiter parsing

Single delimiter:

```csharp
if (reader.TryReadTo(
    out ReadOnlySequence<byte> field,
    (byte)',',
    advancePastDelimiter: true))
{
    Process(field);
}
```

This works even when the field crosses segments.

### Lookahead with `IsNext`

```csharp
if (reader.IsNext(
    "PING"u8,
    advancePast: false))
{
    // Prefix matched but cursor did not move.
}
```

Use `advancePast: true` only when a successful prefix match should be consumed.

### Multi-byte delimiter

For `\r\n\r\n`, use the sequence-aware overloads/patterns that search a delimiter sequence. Manual `FirstSpan` search is incorrect when the delimiter begins at the end of one segment and ends in the next.

## Escaped delimiters

A delimited text protocol may treat `\,` as a literal comma. `TryReadTo` overloads that accept delimiter and escape values can express this rule without manually retaining whether the previous physical span ended in an escape byte.

After extracting the field, unescape according to protocol rules; delimiter discovery and semantic decoding remain separate steps.

## Length-prefixed frame

```csharp
static bool TryReadFrame(
    ref SequenceReader<byte> reader,
    out ReadOnlySequence<byte> payload)
{
    SequenceReader<byte> snapshot = reader;

    if (!reader.TryReadBigEndian(out int length))
    {
        reader = snapshot;
        payload = default;
        return false;
    }

    if (length < 0 || reader.Remaining < length)
    {
        reader = snapshot;
        payload = default;
        return false;
    }

    SequencePosition start = reader.Position;
    reader.Advance(length);

    payload = reader.Sequence.Slice(start, length);
    return true;
}
```

Snapshot/restore prevents a partial header from being consumed when the payload is not yet complete. Validate length before allocation or advance to prevent memory/denial-of-service problems.

## Decoding after framing

Do not decode the entire pipe buffer merely to locate a byte delimiter. First find/extract the complete byte frame, then decode that frame.

For a single segment:

```csharp
string text =
    Encoding.UTF8.GetString(payload.FirstSpan);
```

For multiple segments, use a sequence-aware decoder or bounded copy. UTF-8 code points can cross segment boundaries, so decoding each segment independently is unsafe unless decoder state is preserved.

## Integrating with `PipeReader`

```csharp
ReadResult result =
    await pipe.ReadAsync(cancellationToken);

ReadOnlySequence<byte> buffer =
    result.Buffer;

var cursor = new SequenceReader<byte>(buffer);

while (TryReadFrame(ref cursor, out var frame))
{
    Process(frame);
}

pipe.AdvanceTo(
    consumed: cursor.Position,
    examined: buffer.End);
```

`cursor.Position` communicates what was successfully consumed. The parser should not store the `SequenceReader` across the next `await`; store protocol state separately if necessary.

## When to use it

Strong use cases:

- segmented length-prefixed protocols;
- escaped or multi-byte delimiters;
- prefix detection across segments;
- fixed headers without contiguous-array allocation;
- mixed binary/text frames;
- parsers that already receive `ReadOnlySequence<byte>`.

For a small file or ordinary newline text, `Stream`, `BinaryReader`, or `StreamReader` can remain more maintainable.

# Regional coverage map

| Region | Text elements | Screenshot uses | Unique screenshots | Repeated placements | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 175 | 20 | 19 | 1 | 0 |
| R02 | 19 | 24 | 24 | 0 | 0 |
| R03 | 10 | 11 | 10 | 2 | 0 |
| R04 | 29 | 43 | 43 | 0 | 0 |
| R05 | 4 | 11 | 11 | 0 | 0 |
| R06 | 23 | 15 | 14 | 15 | 0 |
| R07 | 16 | 22 | 22 | 1 | 0 |
| R08 | 29 | 39 | 39 | 0 | 0 |
| R09 | 21 | 29 | 29 | 0 | 0 |
| R10 | 47 | 67 | 66 | 1 | 0 |
| R11 | 24 | 38 | 38 | 0 | 0 |
| R12 | 19 | 46 | 46 | 0 | 0 |
| R13 | 59 | 61 | 60 | 1 | 0 |

# Final source-of-truth note

This Markdown document is the authoritative semantic transcript. The source SVG and extracted screenshots are authoritative for exact code, API-version details, punctuation and canvas relationships.
