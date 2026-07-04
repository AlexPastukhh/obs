# HttpContent, ReadAsStream buffering, and direct compression — source-preserving transcript v002

Source Git blob: `b60a03cb5e636a78781bc8c44538fcb77e35d58f`

```text
screenshots: 26 / 26
native canvas text nodes: 19 / 19
```

## S-001 — On-the-fly compression does not require full buffering

A custom `HttpContent` can compress while writing. Inside `SerializeToStreamAsync`, wrap the outgoing stream in `GZipStream` and call `JsonSerializer.SerializeAsync` into that wrapper.

Benefits:

- no giant UTF-16 string;
- no full uncompressed `MemoryStream`;
- compression happens on the fly;
- often no precomputed `Content-Length`, so HTTP/1.1 normally uses chunked transfer.

The trade-off is not “memory or compression.” You can have low memory and compression, with more CPU and no precomputed length.

## S-002 — Response completion option does not select HttpContent overrides

`HttpCompletionOption` does not cast the content to a different type or choose between two content overrides.

After the handler returns `HttpResponseMessage`, `HttpClient` decides whether it should buffer the response. For `ResponseContentRead` on non-HEAD requests, it calls `response.Content.LoadIntoBufferAsync(...)`. Otherwise it returns after headers without first forcing full buffering.

## S-003 — General ReadAsStream rule

In general, `HttpContent.ReadAsStreamAsync()` may buffer unless `CreateContentReadStreamAsync()` supplies a stream directly.

For HttpClient responses, the major switch is:

```text
ResponseContentRead
ResponseHeadersRead
```

Use `ResponseHeadersRead` when progressive response consumption is required.

## S-004 — Clean buffered versus streaming answer

```text
ResponseContentRead + ReadAsStreamAsync
    -> response content is effectively fully buffered before application processing

ResponseHeadersRead + ReadAsStreamAsync
    -> progressive streaming with small working buffers
```

The public guarantee is about when the HTTP operation completes, not a guarantee that one single memory block exactly equals the response size.

## S-005 — How HttpClient and HttpContent cooperate

With `ResponseContentRead`, HttpClient buffers the same response-content object before returning.

With `ResponseHeadersRead`, HttpClient returns without forcing that buffer first.

Later, `ReadAsStreamAsync()` checks whether content is already buffered. If buffered, it can return a memory-backed stream. If not, it uses the content implementation's stream-producing path.

## S-006 — GzipJsonContent constructor

```csharp
sealed class GzipJsonContent<T> : HttpContent
{
    private readonly T _value;
    private readonly JsonSerializerOptions? _options;

    public GzipJsonContent(
        T value,
        JsonSerializerOptions? options = null)
    {
        _value = value;
        _options = options;

        Headers.ContentType =
            new MediaTypeHeaderValue("application/json");

        Headers.ContentEncoding.Add("gzip");
    }
}
```

## S-007 — No override-selection rule

There is no rule such as:

```text
ResponseHeadersRead chooses override A
ResponseContentRead chooses override B
```

Instead:

- `ResponseContentRead` makes `IsBuffered` true by loading content first;
- `ResponseHeadersRead` leaves it unbuffered;
- the later `ReadAsStreamAsync` path depends on that buffered state and the content implementation.

## S-008 — Three different meanings of buffering/streaming

1. **Full-content buffering:** the complete content is materialized before application consumption.

2. **Stream/chunk buffering:** normal small buffers used internally by streams, sockets, and parsers while bytes still arrive progressively.

3. **API returns a Stream:** this alone does not prove live network streaming. A stream may wrap already-buffered bytes or pull bytes progressively.

## S-009 — SocketsHttpHandler response content

The normal SocketsHttpHandler response path uses an internal response content type that stores the response-body stream. Its stream-producing methods return the underlying stream rather than creating an extra full buffer.

`ResponseHeadersRead` makes this useful because HttpClient has not already forced `LoadIntoBufferAsync`.

## S-010 — SerializeToStreamAsync and unknown length

```csharp
protected override async Task SerializeToStreamAsync(
    Stream stream,
    TransportContext? context)
{
    await using var gzip = new GZipStream(
        stream,
        CompressionLevel.Fastest,
        leaveOpen: true);

    await JsonSerializer.SerializeAsync(
        gzip,
        _value,
        _options);
}

protected override bool TryComputeLength(out long length)
{
    length = 0;
    return false;
}
```

Returning `false` means the compressed length is not known in advance.

## S-011 — What CreateContentReadStreamAsync is

`CreateContentReadStreamAsync` lets a content implementation return a readable stream for its content directly instead of forcing the base `ReadAsStreamAsync` path to serialize/buffer first.

Conceptual rule:

```text
without an override:
base implementation may serialize into a memory buffer, then return a stream

with an override:
content can supply an appropriate stream directly
```

## S-012 — ResponseHeadersRead practical effect

```csharp
using var response = await client.SendAsync(
    request,
    HttpCompletionOption.ResponseHeadersRead);

await using var stream =
    await response.Content.ReadAsStreamAsync();
```

For normal handler response content, this stream is the live response stream. With `ResponseContentRead`, HttpClient has already loaded the content into a buffer before returning.

## S-013 — Using the custom streaming request content

```csharp
request.Content =
    new GzipJsonContent<MyType>(payload);
```

The content serializes JSON and compresses directly into the outgoing transport stream when HttpClient asks it to copy/serialize itself.

## S-014 — Base CreateContentReadStreamAsync behavior

The base `HttpContent.CreateContentReadStreamAsync` implementation normally buffers into a memory stream. Derived classes override it when they can supply a better stream representation.

## S-015 — LoadIntoBufferAsync

`LoadIntoBufferAsync` is the explicit “buffer the whole content for me” API. It serializes HTTP content to a memory buffer and completes only after all content has been serialized.

```csharp
await content.LoadIntoBufferAsync();
var stream = await content.ReadAsStreamAsync();
```

After this call, the stream reads from already-buffered content.

## S-016 — Default HttpClient buffered response

```csharp
using var client = new HttpClient();

using var response = await client.GetAsync(url);
// default completion option: ResponseContentRead

response.EnsureSuccessStatusCode();
```

## S-017 — Reading a stream after default GetAsync

```csharp
await using var stream =
    await response.Content.ReadAsStreamAsync();

byte[] buffer = new byte[8192];
int read;

while ((read = await stream.ReadAsync(
    buffer, 0, buffer.Length)) > 0)
{
    // process chunk
}
```

Although the application uses a stream API, default `GetAsync` completed after reading the entire response content. The loop is reading from buffered content, not driving live network consumption.

## S-018 — HttpClient response streaming

```csharp
using var response = await client.GetAsync(
    url,
    HttpCompletionOption.ResponseHeadersRead);

response.EnsureSuccessStatusCode();
```

This is the real progressive case: the operation completes once headers are read, not after the body is fully consumed.

## S-019 — Reading drives body consumption under ResponseHeadersRead

```csharp
await using var stream =
    await response.Content.ReadAsStreamAsync();

byte[] buffer = new byte[8192];
int read;

while ((read = await stream.ReadAsync(
    buffer, 0, buffer.Length)) > 0)
{
    // process bytes in buffer[0..read]
}
```

Now the read loop drives consumption of the response body.

## S-020 — Explicit full buffering even after ResponseHeadersRead

```csharp
using var response = await client.GetAsync(
    url,
    HttpCompletionOption.ResponseHeadersRead);

response.EnsureSuccessStatusCode();

await response.Content.LoadIntoBufferAsync();

await using var stream =
    await response.Content.ReadAsStreamAsync();
```

The explicit buffer call changes the later stream into a stream over buffered content.

## S-021 — Custom HttpContent that buffers

```csharp
public sealed class MyBufferedContent : HttpContent
{
    private readonly string _text;

    public MyBufferedContent(string text)
    {
        _text = text;
    }

    protected override Task SerializeToStreamAsync(
        Stream stream,
        TransportContext? context)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(_text);
        return stream.WriteAsync(bytes, 0, bytes.Length);
    }

    protected override bool TryComputeLength(out long length)
    {
        length = Encoding.UTF8.GetByteCount(_text);
        return true;
    }
}
```

## S-022 — Using the buffering custom content

```csharp
HttpContent content =
    new MyBufferedContent("hello world");

await using var stream =
    await content.ReadAsStreamAsync();
```

Because the class does not override `CreateContentReadStreamAsync`, the base read-as-stream path may serialize into a buffer and return a stream over that result.

## S-023 — Why the custom content may buffer

`HttpContent.ReadAsStreamAsync()` buffers unless the content implementation supplies a direct stream path such as `CreateContentReadStreamAsync`.

The source introduces a second custom content type that avoids an extra buffer by overriding that hook.

## S-024 — Custom direct-stream content

```csharp
public sealed class MyDirectStreamContent : HttpContent
{
    private readonly byte[] _bytes;

    public MyDirectStreamContent(string text)
    {
        _bytes = Encoding.UTF8.GetBytes(text);
    }

    protected override Task SerializeToStreamAsync(
        Stream stream,
        TransportContext? context)
        => stream.WriteAsync(_bytes, 0, _bytes.Length);

    protected override bool TryComputeLength(out long length)
    {
        length = _bytes.Length;
        return true;
    }

    protected override Task<Stream>
        CreateContentReadStreamAsync()
    {
        Stream stream =
            new MemoryStream(_bytes, writable: false);

        return Task.FromResult(stream);
    }
}
```

## S-025 — Using the direct-stream content

```csharp
HttpContent content =
    new MyDirectStreamContent("hello world");

await using var stream =
    await content.ReadAsStreamAsync();
```

The override supplies a stream over existing bytes, avoiding the default serialize-then-buffer step.

## S-026 — What direct stream really means

Overriding `CreateContentReadStreamAsync` does not automatically mean network streaming. It means:

> If a readable stream is requested for this content, use this stream directly rather than the default buffer-then-stream path.

For `ByteArrayContent`-like data, a read-only `MemoryStream` over existing bytes avoids an extra copy but is still memory-backed, not a live network stream.

# Native canvas text

```text
when HttpContent.ReadAsStreamAsync buffers
and how; LoadIntoBuffer; overriding methods; custom HttpContent
some example implementation where a byte array is returned with a stream API
instead of buffering it a second time
how exactly we do not buffer
special HttpContent type
set stream / response body stream
use custom content to compress into the network stream
ResponseHeadersRead applies to receiving normal content
custom HttpContent allows compression directly to the network stream
without buffering bytes to MemoryStream
```
