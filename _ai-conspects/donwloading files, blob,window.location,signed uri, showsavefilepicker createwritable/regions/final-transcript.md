# Final semantic transcript — downloading files, Blob, navigation, signed URLs and File System Access

Authoritative source: `source/donwloading files, blob,window.location,signed uri, showsavefilepicker createwritable.svg`

---

# R01 — browser-native downloads

## Navigation to a file endpoint

The simplest download flow is ordinary navigation:

```html
<a href="/reports/42">
  Download report
</a>
```

or:

```ts
window.location.href =
  "/reports/42";
```

The browser performs a normal navigation request. The server decides whether the response is displayed inline or downloaded through response headers.

Typical download response:

```http
Content-Type: application/pdf
Content-Disposition:
  attachment; filename="report.pdf"
```

`Content-Disposition: attachment` asks the browser to treat the response as a download and provides a suggested filename.

Inline display:

```http
Content-Disposition: inline
```

allows the browser to display a supported representation, such as PDF or an image.

The final behavior still depends on browser capabilities and user settings.

## `window.location`, `window.open` and anchors

```ts
window.location.href =
  "/reports/42";
```

uses the current tab.

```ts
window.open(
  "/reports/42",
  "_blank",
  "noopener",
);
```

opens a new browsing context when permitted.

A normal anchor is often the clearest option:

```html
<a
  href="/reports/42"
  target="_blank"
  rel="noopener"
>
  Open report
</a>
```

`window.location` has no `target` option. To select a new tab/window, use `window.open` or an anchor with `target`.

## Anchor `download`

```html
<a
  href="/files/report.pdf"
  download="report.pdf"
>
  Download
</a>
```

The `download` attribute suggests saving instead of navigating and may suggest a filename.

Important limitations:

```text
it is a browser hint, not an absolute guarantee
cross-origin URLs may not honor it
response headers still matter for normal HTTP navigation
blob: and data: URLs are commonly supported
```

## ASP.NET Core file response

```csharp
[HttpGet("{id}")]
public IActionResult Download(int id)
{
    byte[] bytes =
        reportService.Create(id);

    return File(
        bytes,
        "application/pdf",
        "report.pdf"
    );
}
```

The framework sets the content type and attachment filename.

## Best use cases for native navigation

```text
simple GET endpoint
cookie/session authentication
large files
browser should stream and manage the download
no custom request body or Authorization header required
```

---

# R02 — Blob URLs and showing versus downloading

## Fetching a Blob

```ts
const response =
  await fetch("/api/report");

const blob =
  await response.blob();
```

Axios:

```ts
const response =
  await api.get("/api/report", {
    responseType: "blob",
  });

const blob =
  response.data as Blob;
```

Reading `response.blob()` or using Axios `responseType: "blob"` normally buffers the response body into a browser-managed Blob before the application can act on it. For very large files, browser-native navigation or direct streaming to disk may be preferable.

## Object URL

```ts
const url =
  URL.createObjectURL(blob);
```

The object URL points to browser-managed bytes:

```text
blob:https://app.example/...
```

Release it when finished:

```ts
URL.revokeObjectURL(url);
```

Revoking immediately before the click/navigation is processed may break the action. Revoke after the browser has started using the URL:

```ts
setTimeout(
  () => URL.revokeObjectURL(url),
  0,
);
```

## Show the Blob

```ts
const url =
  URL.createObjectURL(blob);

window.open(
  url,
  "_blank",
  "noopener",
);
```

or:

```ts
const link =
  document.createElement("a");

link.href = url;
link.target = "_blank";
link.rel = "noopener";

link.click();
```

Whether the browser displays the file depends largely on the Blob MIME type:

```ts
console.log(blob.type);
```

Examples:

```text
application/pdf
    usually opens a PDF viewer

image/png
    usually displays the image

text/plain
    usually displays text

unknown binary type
    may download or show a save dialog
```

## Force download from a Blob URL

```ts
const link =
  document.createElement("a");

link.href = url;
link.download = "report.pdf";

document.body.appendChild(link);
link.click();
link.remove();

setTimeout(
  () => URL.revokeObjectURL(url),
  0,
);
```

Once the application downloads bytes and creates a new Blob URL, the browser is no longer navigating to the original HTTP response. Therefore the original `Content-Disposition` does not directly control the Blob URL behavior.

The application controls:

```text
Blob MIME type
download attribute
open in a tab versus trigger download
suggested filename
```

## `Content-Disposition` after fetch

It remains useful as metadata:

```ts
const disposition =
  response.headers.get(
    "Content-Disposition"
  );
```

The application can parse its filename and apply it to `link.download`.

For cross-origin requests, expose the header:

```csharp
policy.WithExposedHeaders(
    "Content-Disposition"
);
```

Without CORS exposure, browser JavaScript cannot read that response header even when the network response contains it.

---

# R03 — production Blob flow, authentication and signed URLs

## Blob download flow

```ts
const response =
  await api.get("/report", {
    responseType: "blob",
  });

const blob =
  response.data as Blob;

const disposition =
  response.headers[
    "content-disposition"
  ] as string | undefined;

const fileName =
  getFileName(disposition)
  ?? "report.pdf";

const url =
  URL.createObjectURL(blob);

const link =
  document.createElement("a");

link.href = url;
link.download = fileName;

document.body.appendChild(link);
link.click();
link.remove();

setTimeout(
  () => URL.revokeObjectURL(url),
  0,
);
```

Filename parsing should support:

```text
filename="report.pdf"
filename=report.pdf
filename*=UTF-8''encoded-name.pdf
```

Production code should avoid a fragile one-line regex when robust parsing is important.

## When Blob is appropriate

```text
Authorization: Bearer header is required
POST body generates the file
frontend needs to inspect an error response
custom progress/UI is required
filename or content must be transformed client-side
```

A normal navigation cannot attach arbitrary custom headers such as:

```http
Authorization: Bearer ...
```

That is a major reason to use fetch/Axios.

## Cookie authentication

Navigation works well when authentication is represented by cookies that the browser is allowed to send.

Cross-site cookie flows require correct:

```text
SameSite
Secure
domain/path
CORS credential policy for fetch
```

Normal navigation and fetch have different CORS mechanics, but cookie rules still determine whether the cookie accompanies the request.

## Signed URL pattern

For large downloads with bearer-token APIs:

```text
1. frontend calls protected API with Authorization header
2. backend validates permission
3. backend returns a short-lived signed download URL
4. browser navigates to the signed URL
5. storage/server streams the file directly
```

Example:

```ts
const {
  url,
} = await api.post(
  "/reports/42/prepare-download"
);

window.location.href = url;
```

The signed URL should be:

```text
short lived
scoped to one resource/action
unpredictable
HTTPS-only
safe against replay according to the threat model
excluded from unnecessary logs where possible
```

This combines API authorization with browser-native streaming and avoids buffering the full file in JavaScript.

## Decision guide

```text
Cookie/session + simple GET
    normal link or window.location

Bearer token or POST body
    fetch/Axios Blob flow

Bearer token + very large file
    prepare signed URL, then navigate

Need exact local target and streaming
    File System Access API when supported
```

---

# R04 — File System Access API

## Save-file picker

```ts
const handle =
  await window.showSaveFilePicker({
    suggestedName: "report.csv",

    startIn: "downloads",

    id: "exports",

    types: [
      {
        description: "CSV files",
        accept: {
          "text/csv": [
            ".csv",
          ],
        },
      },
    ],

    excludeAcceptAllOption: false,
  });
```

Options:

```text
suggestedName
    initial filename in the dialog

startIn
    preferred starting directory or handle

id
    separates remembered picker locations by purpose

types
    MIME/extensions offered in the picker

excludeAcceptAllOption
    hides or shows the generic All Files option
```

The browser may remember different directories for different picker IDs.

## `createWritable`

```ts
const writable =
  await handle.createWritable();

await writable.write(data);
await writable.close();
```

Closing commits the temporary write to the selected file.

Stream a response directly:

```ts
const response =
  await fetch("/api/files/report");

if (!response.body) {
  throw new Error(
    "Streaming body unavailable"
  );
}

const handle =
  await window.showSaveFilePicker({
    suggestedName: "report.pdf",
  });

const writable =
  await handle.createWritable();

await response.body.pipeTo(
  writable
);
```

This avoids building one giant Blob before writing to disk.

## `keepExistingData`

```ts
const writable =
  await handle.createWritable({
    keepExistingData: true,
  });
```

With `true`, the temporary writable starts from a copy of the existing file. This is useful for seeking and editing selected portions.

Without it, writing begins from an empty temporary file.

Example:

```ts
const writable =
  await handle.createWritable({
    keepExistingData: true,
  });

await writable.seek(6);
await writable.write("CHANGED");
await writable.close();
```

## Writer mode

```ts
await handle.createWritable({
  mode: "exclusive",
});
```

An exclusive writer prevents another writer from opening the same file concurrently.

```ts
await handle.createWritable({
  mode: "siloed",
});
```

Siloed writers can use separate temporary backing files; whichever valid writer closes last may determine the final file contents, according to browser/API behavior.

Use one active writer per logical save unless concurrent editing is deliberately designed.

## Browser support and permissions

The File System Access API is not universally available and normally requires:

```text
secure context
user activation
supported browser
permission to the selected file
```

Provide a fallback such as Blob + anchor download.

# Practical checklist

```text
[ ] prefer native navigation for simple large downloads
[ ] use Content-Disposition on server-driven responses
[ ] use Blob flow when custom headers or POST bodies are required
[ ] expose Content-Disposition through CORS when JS reads it
[ ] revoke object URLs after use
[ ] preserve the correct MIME type for inline display
[ ] prefer short-lived signed URLs for large bearer-auth downloads
[ ] stream to createWritable when supported
[ ] close FileSystemWritableFileStream to commit the file
[ ] provide a fallback for unsupported browsers
```

# Coverage

```text
unique embedded screenshots: 57
image uses: 57
native SVG labels: 40
duplicate extra placements: 0

processed image uses: 57
processed text labels: 40
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
