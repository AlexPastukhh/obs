# Regional transcript — R05: Additional request media types and Base64 payloads

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
text elements represented: 4 / 4
screenshot uses processed: 11 / 11
unique screenshots represented: 11
repeated placements retained: 0
remaining text elements: 0
remaining screenshot uses: 0
```

Boundary review:

- Included the complete visual road assigned to this region, including same-column continuations and nearby examples.
- Cross-region references are explained where required, but their screenshot placements remain closed in their own regional ledgers.
- No source image was omitted merely because its nearby SVG label was short or informal.

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

## Covered source units

### SVG text elements

```text
T-0178, T-0179, T-0180, T-0181
```

### Screenshot placements

```text
IU-0028, IU-0029, IU-0030, IU-0031, IU-0032, IU-0033, IU-0034, IU-0035, IU-0036, IU-0037, IU-0038
```

## Exactness and limitations

The semantic transcript normalizes spelling and organizes the ideas. The preserved source SVG and extracted screenshots remain authoritative for exact code, overload signatures, version-specific behavior and visual ordering.
