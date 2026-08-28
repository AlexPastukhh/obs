# HttpClient response buffering and progressive streaming

Knowledge ID: `dotnet.httpclient-response-streaming`

Topic: `dotnet`

## Core model

`HttpCompletionOption` controls when an `HttpClient` response operation completes; it does not select between different `HttpContent` overrides.

```text
ResponseContentRead
  -> HttpClient loads the response content before returning;

ResponseHeadersRead
  -> HttpClient returns after the headers without first forcing full body buffering.
```

Default `GetAsync` uses `ResponseContentRead`. Calling `ReadAsStreamAsync()` afterward can return a stream over content that has already been buffered. A stream-shaped API alone does not prove live network consumption.

## Progressive response consumption

```csharp
using var response = await client.GetAsync(
    url,
    HttpCompletionOption.ResponseHeadersRead);

response.EnsureSuccessStatusCode();

await using var stream =
    await response.Content.ReadAsStreamAsync();

byte[] buffer = new byte[8192];
int read;

while ((read = await stream.ReadAsync(
    buffer, 0, buffer.Length)) > 0)
{
    // process buffer[0..read]
}
```

For normal handler response content, the read loop now drives body consumption. Small internal socket, stream, and parser buffers still exist; progressive streaming means avoiding full-content materialization before application processing, not eliminating every buffer.

Calling `LoadIntoBufferAsync()` explicitly after `ResponseHeadersRead` changes the later stream into a stream over fully buffered content.

When the bytes only need to be forwarded unchanged, `CopyToAsync` is simpler than a manual inspection loop. When the application needs to inspect chunks, `ReadAsStreamAsync` plus repeated reads preserves that control. In either form, a read count of `0` is the end-of-stream marker.

## Failure boundary

Acquiring an `HttpClient` response normally reports request or protocol failure as `HttpRequestException`. After a response has been returned and application code is consuming its content stream, ordinary stream failures such as `IOException` can surface directly. Put handling around the operation whose contract owns the failure instead of assuming every later body-read error is still an `HttpRequestException`.

## Buffered state and content cooperation

With `ResponseContentRead`, `HttpClient` buffers the same response-content object before returning. With `ResponseHeadersRead`, it leaves that content unbuffered. A later `ReadAsStreamAsync()` path therefore depends on both the buffered state and the content implementation.

The normal `SocketsHttpHandler` response content can expose its underlying response-body stream. This becomes progressive only when `HttpClient` has not already forced buffering.

## What should be recallable

- What completion guarantee differs between `ResponseContentRead` and `ResponseHeadersRead`?
- Why does receiving a `Stream` not prove live network streaming?
- Which option does ordinary `GetAsync` use by default?
- What drives response-body consumption under `ResponseHeadersRead`?
- What happens if `LoadIntoBufferAsync()` is called before `ReadAsStreamAsync()`?
- When is `CopyToAsync` preferable to inspecting chunks manually?
- Why can content consumption throw `IOException` after response acquisition succeeded?

## Related knowledge

- `dotnet.httpcontent-read-stream-buffering` — how a content implementation supplies or buffers its readable stream.

## Sources

- Workspace: `_ai-conspects/httpcontent,custom one, readasstream buffering, compression directly to network/`
- Processed source: `FINAL_TRANSCRIPT.md`, S-002–S-005, S-007–S-009, S-012, and S-016–S-020
- Original SVG: `source/httpcontent,custom one, readasstream buffering, compression directly to network.svg`
- Workspace: `_ai-conspects/processing data as stream in dif situations, httpclient,endpoint,browser,websockets/`
- Authoritative processed source: `regions/full-svg-reconciliation-v002.md`, R02–R03
- Original SVG: `source/source-complete-v002.svg`
- Workspace: `_ai-conspects/processing-data-as-stream-in-dif-situations-httpclient-endpoint-browser-websockets/`
- Authoritative processed source: `regions/PDS03-httpclient-streaming-response.md`
- Source preservation: regional evidence and materialized source images recorded by the workspace coverage audit
