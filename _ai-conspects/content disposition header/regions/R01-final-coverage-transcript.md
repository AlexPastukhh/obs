# content disposition header — final coverage transcript v001

Source SVG: `content disposition header(1).svg`  
Conspect folder: `content disposition header`  
Stage: combined ten-conspect final coverage

## R01 — response download/inline behavior and filenames

`Content-Disposition` tells a user agent how to present a response body and which filename to suggest.

```http
Content-Disposition: attachment; filename="report.pdf"
Content-Disposition: inline; filename="report.pdf"
```

`attachment` normally prompts a download. `inline` allows in-browser display when the browser supports the media type. The actual rendering also depends on `Content-Type` and browser policy.

For non-ASCII filenames, use the RFC-compatible extended parameter:

```http
Content-Disposition: attachment; filename="report.pdf";
 filename*=UTF-8''r%C3%A9sum%C3%A9.pdf
```

Providing both a safe ASCII fallback and `filename*` improves compatibility.

ASP.NET Core file results normally create an attachment header when a download filename is supplied:

```csharp
return File(bytes, "application/pdf", "report.pdf");
```

For a preview endpoint, set an appropriate content type and an inline disposition when needed. The framework has several file-result overloads, so inspect the resulting header rather than assuming a filename is purely cosmetic.

Security rules:

```text
- never copy raw CR/LF or arbitrary user text into a header;
- strip path components and expose only a safe filename;
- set a correct Content-Type;
- do not rely on Content-Disposition as an authorization control;
- use an attachment endpoint for downloads and an inline endpoint only for intentionally previewable content.
```

A JavaScript `fetch()` client can read the header only when CORS exposes it for a cross-origin request; the browser’s native navigation/download behavior is separate.

## Coverage

```text
R01 processed image uses: 2
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
