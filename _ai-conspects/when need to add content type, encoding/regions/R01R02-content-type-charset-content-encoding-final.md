# R01/R02 — Content-Type, charset, and Content-Encoding final coverage transcript v001

Conspect: `when need to add content type, encoding`  
Source: `when need to add content type, encoding.svg`  
Stage: **stage-1 verified final coverage**

## 0.1 Area overview / key ideas / reading quality

The sheet distinguishes three related but separate concerns for HTTP request content:

- **Content-Type** describes the media format of the body.
- **charset** is a parameter of a text media type and describes character encoding.
- **Content-Encoding** describes an additional representation encoding such as gzip compression.

Key ideas:

- Most request bodies need a meaningful `Content-Type` so the server knows how to parse them.
- Several .NET `HttpContent` classes set the header automatically.
- Raw byte and stream content usually require the media type to be set manually.
- Text encoding and compression are different mechanisms and use different headers.
- Modern JSON APIs normally use UTF-8; an explicit charset is often optional but can improve interoperability with strict or legacy systems.

Reading quality: high. All 17 screenshots are readable and there are no separate canvas text labels.

## 1. R01 — when Content-Type is automatic or manual

Set `Content-Type` whenever the server must know the body format. Common mappings include:

```text
JSON        -> application/json
XML         -> application/xml
plain text  -> text/plain
binary      -> application/octet-stream or a specific type such as image/png
HTML form   -> application/x-www-form-urlencoded
multipart   -> multipart/form-data
```

### Content classes that usually set it automatically

`StringContent` can set both encoding and media type through its constructor:

```csharp
request.Content = new StringContent(
    jsonText,
    Encoding.UTF8,
    "application/json");
```

After this constructor, manually setting `request.Content.Headers.ContentType` is unnecessary.

`JsonContent.Create(dto)` serializes the object and sets JSON content headers, so a separate `Content-Type` assignment is normally not needed.

`FormUrlEncodedContent` sets `application/x-www-form-urlencoded` automatically.

`MultipartFormDataContent` creates the multipart media type and boundary automatically. Manually overwriting its `Content-Type` can break the required boundary parameter.

### Content classes that usually need a manual media type

`ByteArrayContent` represents bytes without knowing their semantic format:

```csharp
request.Content = new ByteArrayContent(bytes);
request.Content.Headers.ContentType =
    new MediaTypeHeaderValue("application/pdf");
```

`StreamContent` also cannot infer what the stream contains:

```csharp
request.Content = new StreamContent(stream);
request.Content.Headers.ContentType =
    new MediaTypeHeaderValue("application/json");
```

The deciding question is not whether the body is a stream or byte array, but whether the chosen `HttpContent` implementation already knows the media type.

## 2. R02 — charset versus Content-Encoding

### Charset

Character encoding for textual bodies is usually represented as a `charset` parameter on `Content-Type`:

```text
Content-Type: application/json; charset=utf-8
```

It matters for textual formats such as JSON, XML, plain text, and CSV. It does not apply to non-text binary content such as PDF, images, or ZIP archives.

`StringContent(text, Encoding.UTF8, "application/json")` is the standard explicit way to choose both text encoding and media type.

`JsonContent.Create(...)` handles JSON serialization itself and normally produces UTF-8 JSON. It does not expose the same direct text-encoding constructor pattern. If unusual charset behavior is required, `StringContent` with explicitly serialized text is the more direct option.

`StreamContent` and `ByteArrayContent` deal with already-produced bytes. They have no text-encoding constructor because encoding happened earlier when the bytes were created. If those bytes represent text, set a media type and optionally its charset:

```csharp
var mediaType = new MediaTypeHeaderValue("application/json");
mediaType.CharSet = "utf-8";

request.Content = new StreamContent(stream);
request.Content.Headers.ContentType = mediaType;
```

For modern JSON APIs, `application/json` without a charset is commonly accepted because UTF-8 is the normal wire encoding. Add `charset=utf-8` when being explicit helps interoperability, especially with older or strict systems or with non-JSON text formats.

### Content-Encoding

`Content-Encoding` is not character encoding. It signals a transformation such as compression:

```text
Content-Encoding: gzip
```

Use it only if the body bytes were actually compressed before sending. Setting the header without compressing the body produces an invalid request from the server's perspective.

Example conceptually:

```csharp
request.Content = new ByteArrayContent(gzipCompressedBytes);
request.Content.Headers.ContentType =
    new MediaTypeHeaderValue("application/json");
request.Content.Headers.ContentEncoding.Add("gzip");
```

## 3. Practical checklist

```text
1. Choose the media format first.
2. Use an HttpContent class that matches the body representation.
3. Let StringContent/JsonContent/FormUrlEncodedContent/MultipartFormDataContent manage headers when appropriate.
4. Set Content-Type manually for raw streams and byte arrays.
5. Add charset only for textual bodies when explicit encoding matters.
6. Add Content-Encoding only when the payload was actually encoded/compressed.
7. Do not replace multipart Content-Type unless you preserve its boundary.
```

## 4. Coverage

```text
R01: 7 image uses
R02: 10 image uses
Total: 17 image uses
Remaining unclosed: 0
```
