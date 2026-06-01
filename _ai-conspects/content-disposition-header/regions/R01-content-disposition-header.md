# R01 - Content-Disposition Header

File type: **source-preserving AI-readable transcript**  
Source: uploaded SVG `content disposition header.svg`  
Status: `completed from visually read embedded screenshots`

## Direction check

Goal:
Convert the uploaded Excalidraw SVG into source-preserving text.

Now:
The SVG was parsed and its two embedded screenshots were visually read.

This step:
Provide verified visible screenshot transcript, cleaned source notes, evidence table, question hooks, and reading-quality notes.

Why:
The SVG contains no standalone text labels; the screenshots are the primary knowledge source.

Next:
1. Review the transcript against the source SVG.
2. Correct any wording if a screenshot was read differently.
3. Use the question hooks for repetition.

---

## 0.1 Area overview / key ideas / reading quality

What the area is about overall:
This small conspect explains the HTTP `Content-Disposition` response header and how it relates to download vs inline browser display, suggested filenames, non-ASCII filenames, and ASP.NET Core file responses.

Key ideas:
- `Content-Disposition` tells the browser how to handle the response body.
- `attachment` is used for a download prompt.
- `inline` is used for browser display if supported.
- `filename` suggests a file name.
- `filename*` is shown as an encoding-safe form for non-ASCII names.
- For file download endpoints, setting the header on the server is usually the standard approach.
- In ASP.NET Core, returning `File(...)` with a download name usually sets an attachment-style `Content-Disposition`.
- For preview-in-browser behavior, the conspect points to `inline` plus correct `Content-Type`.

How well the AI perceived/understood the ideas:
High. The conspect is small, has two large screenshots, and the visible text/code is readable.

How well the source was read:
High for `CDH-S001`. High for visible text in `CDH-S002`.

Known reading limitations:
- The uploaded SVG has no standalone SVG text labels; all meaningful text is inside embedded screenshots.
- `CDH-S002` is close to the bottom edge. The final visible bullet was transcribed, but any content beyond the screenshot boundary would not be visible.
- No extra general HTTP knowledge was inserted into the source transcript.

Confidence summary:
- Layout confidence: high.
- Visible screenshot transcript confidence: high.
- Completeness confidence: medium-high because one screenshot has a tight bottom edge.

---

## 1. Source layout

SVG canvas:

```text
viewBox="0 0 911.936059397163 1008.9339944345047"
```

Standalone Excalidraw text elements:

```text
None detected in the SVG.
```

Embedded screenshots:

| Source ID | Location | Size | Topic | Reading status |
|---|---|---:|---|---|
| CDH-S001 | top area, x=10, y=10 | 892x482 | what `Content-Disposition` is | visually verified |
| CDH-S002 | lower area, x=38, y=517 | 797x482 | server-side use / ASP.NET Core `File(...)` | visually verified for visible text |

The conspect is essentially a vertical two-screenshot note.

---

## 2. Source transcript

### CDH-S001 - What is `Content-Disposition`?

Metadata:

```text
status: visually-verified-from-uploaded-svg-embedded-png
readability: high
cut_off: no
confidence: high
```

#### Verified visible text

```text
1) What is Content-Disposition?

Content-Disposition is an HTTP response header that tells the browser how to handle the response body
(show inline vs download) and what filename to suggest.

Common values:

- Download prompt

Content-Disposition: attachment; filename="report.pdf"

- Show in browser (if supported)

Content-Disposition: inline; filename="report.pdf"

There's also an encoding-safe form for non-ASCII filenames:

Content-Disposition: attachment; filename*=UTF-8''r%C3%A9port.pdf
```

---

### CDH-S002 - Should you set `Content-Disposition` on the server?

Metadata:

```text
status: visually-verified-from-uploaded-svg-embedded-png
readability: high
cut_off: bottom-edge-tight / possible continuation not visible
confidence: high-for-visible-text
```

#### Verified visible text

```text
3) Should you set Content-Disposition on the server?

Usually yes, for file download endpoints. It's the standard way to:

- force "download" behavior (attachment)
- provide the filename consistently
- support Pattern A and let Pattern B pick up the same filename

ASP.NET Core: returning a File(...) result usually sets it for you if you pass a download name:

return File(bytes, "application/pdf", "report.pdf");

That produces a Content-Disposition: attachment; filename="report.pdf"-style header.

If you want the browser to open it instead of download, you'd typically use inline (ASP.NET Core doesn't
have a single flag on File() for inline; you can set the header yourself when you need that behavior).

So:

- download endpoint -> set Content-Disposition: attachment; filename=...
- preview-in-browser endpoint -> inline (optional) + correct Content-Type
```

#### Verified visible code

```csharp
return File(bytes, "application/pdf", "report.pdf");
```

---

## 3. Cleaned source notes

- `Content-Disposition` is presented as an HTTP response header controlling how the browser handles a response body.
- The conspect contrasts two common values:
  - `attachment` for prompting download.
  - `inline` for showing in the browser when supported.
- The header can include a suggested filename.
- The conspect shows `filename*` as an encoding-safe form for non-ASCII filenames.
- For file download endpoints, the conspect says server-side `Content-Disposition` is usually appropriate.
- In ASP.NET Core, passing a download name to `File(...)` usually creates an attachment-style header.
- For preview-in-browser behavior, the conspect points to using `inline` and the correct `Content-Type`.

---

## 4. Minimal interpretation

The conspect teaches when and why to set `Content-Disposition` for file responses. The main distinction is:

```text
download endpoint -> attachment + filename
preview endpoint  -> inline + correct Content-Type
```

It also connects this to ASP.NET Core's `File(...)` result: when a download filename is passed, the framework usually produces an attachment-style `Content-Disposition` header.

This interpretation is based on the visible screenshots only.

---

## 5. Evidence table

| Claim | Evidence source | Source type | Confidence |
|---|---|---|---|
| `Content-Disposition` tells the browser how to handle the response body | CDH-S001 | screenshot text | high |
| `attachment` is used for download prompt | CDH-S001 | screenshot text/code | high |
| `inline` is used for showing in browser if supported | CDH-S001 | screenshot text/code | high |
| `filename` suggests a file name | CDH-S001 | screenshot text/code | high |
| `filename*` is shown as encoding-safe for non-ASCII filenames | CDH-S001 | screenshot text/code | high |
| Server-side `Content-Disposition` is usually yes for file download endpoints | CDH-S002 | screenshot text | high |
| ASP.NET Core `File(bytes, "application/pdf", "report.pdf")` usually sets an attachment-style header | CDH-S002 | screenshot text/code | high |
| Browser preview behavior uses `inline` and correct `Content-Type` | CDH-S002 | screenshot text | high-for-visible-text |
| The conspect has only embedded screenshots and no standalone SVG labels | SVG structure | layout/source metadata | high |

---

## 6. Question hooks

- What does the `Content-Disposition` response header tell the browser?
- What is the difference between `attachment` and `inline`?
- What does the `filename` parameter suggest?
- Why does the conspect show `filename*` for non-ASCII filenames?
- For a file download endpoint, why is server-side `Content-Disposition` usually appropriate?
- What header style does `File(bytes, "application/pdf", "report.pdf")` usually produce in ASP.NET Core?
- When would a preview-in-browser endpoint use `inline`?
- Why does the preview-in-browser endpoint also need the correct `Content-Type`?

---

## 7. Open issues / limitations

- The SVG contains screenshots numbered `1)` and `3)`. A `2)` section is not visible in this uploaded SVG.
- `CDH-S002` is close to the bottom edge. If the original screenshot had additional content below the visible area, it is not included here.
- This transcript does not add unsupported general HTTP knowledge beyond the visible source content.
