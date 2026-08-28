# Incremental text decoding across arbitrary byte chunks

Knowledge ID: `dotnet.incremental-text-decoding`

Topic: `dotnet`

Byte-stream chunk boundaries are not character boundaries. A multi-byte UTF-8 character can start in one read and finish in the next, so calling `Encoding.UTF8.GetString` independently for each chunk can corrupt or replace the split character.

Create one stateful `Decoder` for the logical stream and reuse it across reads:

```csharp
Decoder decoder = Encoding.UTF8.GetDecoder();

decoder.Convert(
    bytes,
    chars,
    flush: false,
    out int bytesUsed,
    out int charsUsed,
    out bool completed);

Process(chars[..charsUsed]);
```

`Convert` reports bytes used, characters produced, and whether the conversion completed. The decoder retains an incomplete character between calls; the source example uses `flush: false` for an intermediate chunk.

## What should be recallable

- Why independent per-chunk `GetString` calls can break UTF-8.
- What state a `Decoder` preserves across `Convert` calls.
- What `bytesUsed`, `charsUsed`, and `completed` report for each `Convert` call.

## Sources

- Workspace: `_ai-conspects/processing-data-as-stream-in-dif-situations-httpclient-endpoint-browser-websockets/`
- Authoritative processed source: `regions/PDS02-browser-fetch-websocket-utf8-decoding.md`, PDS02D
- Source preservation: regional evidence and materialized source images recorded by the workspace coverage audit
