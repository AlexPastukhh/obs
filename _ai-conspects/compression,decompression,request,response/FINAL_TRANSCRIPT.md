# Compression, decompression, request, response — final study transcript v002

## Mental model

HTTP content coding is directional:

```text
response compression:
client sends Accept-Encoding
server may return Content-Encoding
client decodes response

request compression:
client compresses request body
client sends Content-Encoding
server must decode request
```

Response-compression support does not automatically imply request-decompression support.

## Response compression

ASP.NET Core response-compression middleware selects an enabled provider when the request advertises support. Cacheable variants must differ by `Accept-Encoding`, normally through:

```http
Vary: Accept-Encoding
```

`SocketsHttpHandler.AutomaticDecompression` performs the opposite operation on the HttpClient side: the application still reads a stream, but it contains decoded bytes.

## Request compression

For controlled client/server scenarios, serialize JSON into a compression stream and send it with:

```http
Content-Type: application/json
Content-Encoding: gzip
```

Dispose the compression wrapper before sending so its trailer and buffered bytes are finalized. With a `MemoryStream`, use `leaveOpen: true`, then rewind the stream.

## Request decompression middleware

The server reads `Content-Encoding`, creates wrapper streams, assigns the outermost stream to `Request.Body`, invokes downstream middleware, restores the original body, and disposes only wrappers it created.

Ownership rule:

```text
framework owns Request.Body
middleware owns its decompression wrappers
```

Therefore:

```text
leaveOpen: true
dispose wrapper
restore Request.Body
```

## Multiple encodings

Example:

```http
Content-Encoding: gzip, br
```

The sender applied gzip and then Brotli. The receiver removes them in reverse:

```text
br -> gzip -> original JSON
```

A registry maps coding names to `IRequestBodyDecompressor` implementations. Unsupported codings should produce `415 Unsupported Media Type`.

## DI and middleware

Conventional middleware supports:

```text
constructor injection:
resolved when middleware instance is created

Invoke/InvokeAsync parameter injection:
resolved per request
```

Method injection is particularly useful for scoped services. `IMiddleware` is another option when middleware itself should be activated through DI per request.

## Compression decision

Compress when payloads are sufficiently large and text-based, especially over slow/high-latency networks.

Usually avoid recompressing already-compressed media/archive formats. Balance network savings against CPU and latency. Provider options are needed only when defaults must change.
