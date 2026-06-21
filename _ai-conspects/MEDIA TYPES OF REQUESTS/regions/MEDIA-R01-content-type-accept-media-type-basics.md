# MEDIA-R01 - Content-Type / Accept / media-type basics

Conspect: `media-types-of-requests`  
File type: **source-level semantic transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-13 07:58:28 UTC

---

## Direction check

Goal:
Start real Media Types Of Requests transcription after Stage0 boundary review.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `12` sources for `MEDIA-R01`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, process Stage2 MEDIA-R03/MEDIA-R04.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
HTTP request media-type basics: Content-Type, request-body shape, multipart/form-data, x-www-form-urlencoded, application/octet-stream, raw streams, and when framework binding/input formatters are involved.
```

Key ideas:

- Content-Type tells the server how to interpret the request body.
- multipart/form-data is for file plus metadata, multiple files, and mixed content.
- application/x-www-form-urlencoded is the classic HTML form encoding for simple key/value forms without files.
- application/octet-stream is for raw bytes, often for upload/download endpoints.
- Framework model binding and input formatters matter: if you bypass them and read Request.Body manually, some automatic 415 behavior no longer applies.
- If you expect Stream/raw bytes, [FromBody] Stream or manual Request.Body reading is often clearer than pretending it is JSON/form.
- Multipart boundary is part of how multipart bodies are separated; the client usually sets it.

Reading quality:
```text
Stage1 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012
```

Boundary decision:
```text
Included in MEDIA-R01 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-001 | IU-001 | `94f3a08439` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | What is multipart/form-data? |
| S-002 | IU-002 | `3b62b63f81` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | FormUrlEncodedContent vs multipart/form-data. |
| S-003 | IU-003 | `b846184eba` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | application/octet-stream for raw bytes. |
| S-004 | IU-004 | `a70ade89d2` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Multipart/form-data vs application/octet-stream. |
| S-005 | IU-005 | `0ba7d7e20a` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Download/stream response with octet-stream. |
| S-006 | IU-006 | `8354ff0204` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Multipart use cases. |
| S-007 | IU-007 | `d68a50adce` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Receive raw bytes from client. |
| S-008 | IU-008 | `4efeefd343` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Classic HTML form default. |
| S-009 | IU-009 | `1bb2d97723` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Do you need to add media types to input formatters? |
| S-010 | IU-010 | `34e917fb4b` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Read raw body in controller. |
| S-011 | IU-011 | `dc39ba02a4` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Server action examples for form and login. |
| S-012 | IU-012 | `cddeeb0072` | `MEDIA-R01-content-type-accept-media-type-basics` | `verified-visible-semantic-transcript` | Mixed content types inside multipart. |

---

## 2. Source-level transcript

### S-001 - What is multipart/form-data?

Metadata:
```text
source_id: S-001
image_use_id: IU-001
fileId_short: 94f3a08439
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
What is multipart/form-data?

Visible:
- multipart/form-data is an HTTP request body format.
- The body is split into multiple parts.
- Each part has its own headers and content.
- Typical use: text fields plus one or more files in one POST/PUT request.

Meaning:
Use multipart/form-data when the client must send files plus metadata in one request body.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-002 - FormUrlEncodedContent vs multipart/form-data.

Metadata:
```text
source_id: S-002
image_use_id: IU-002
fileId_short: 3b62b63f81
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
FormUrlEncodedContent vs multipart/form-data.

Visible:
- FormUrlEncodedContent is classic HTML form submission.
- Browser default form without file upload is usually application/x-www-form-urlencoded.
- With enctype="multipart/form-data", browser sends multipart.
- ASP.NET Core usually binds x-www-form-urlencoded and multipart through form binding, not JSON input formatters.

Meaning:
Use x-www-form-urlencoded for simple key/value form data. Use multipart/form-data when files or mixed parts are involved.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-003 - application/octet-stream for raw bytes.

Metadata:
```text
source_id: S-003
image_use_id: IU-003
fileId_short: b846184eba
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
application/octet-stream for raw bytes.

Visible:
- application/octet-stream means raw binary bytes.
- It is a request or response body that should be treated as uninterpreted bytes.
- Common cases: streaming files, raw uploads, custom binary protocols.

Meaning:
If the request body is just bytes, application/octet-stream is more appropriate than JSON or form media types.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-004 - Multipart/form-data vs application/octet-stream.

Metadata:
```text
source_id: S-004
image_use_id: IU-004
fileId_short: a70ade89d2
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Multipart/form-data vs application/octet-stream.

Visible:
- multipart/form-data when the request has multiple parts, metadata plus files, or several files.
- application/octet-stream when the request body is one raw byte stream.
- Examples: poster with title + file => multipart; raw image bytes only => octet-stream.

Meaning:
Choose multipart for structured multi-part body; choose octet-stream for a single raw payload.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-005 - Download/stream response with octet-stream.

Metadata:
```text
source_id: S-005
image_use_id: IU-005
fileId_short: 0ba7d7e20a
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Download/stream response with octet-stream.

Visible code:
- Controller action returns a file/stream.
- `File(stream, "application/octet-stream", fileDownloadName: filename)` pattern.

Meaning:
For returning raw bytes/file content from ASP.NET, application/octet-stream is a common response Content-Type when the exact file type is not otherwise specified.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-006 - Multipart use cases.

Metadata:
```text
source_id: S-006
image_use_id: IU-006
fileId_short: 8354ff0204
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Multipart use cases.

Visible:
Use multipart/form-data when sending:
1. file plus metadata in one request.
2. multiple files in one request.
3. mixed pieces like profile photo, ID scan, proof of address.

Meaning:
Multipart is not just “file upload”; it is a container for several body parts with potentially different content.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-007 - Receive raw bytes from client.

Metadata:
```text
source_id: S-007
image_use_id: IU-007
fileId_short: d68a50adce
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Receive raw bytes from client.

Visible:
- application/octet-stream upload case.
- Receive raw bytes from client.

Meaning:
For one raw upload body, avoid form binding and read the body stream or use a raw-body action shape. The client should send Content-Type: application/octet-stream.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-008 - Classic HTML form default.

Metadata:
```text
source_id: S-008
image_use_id: IU-008
fileId_short: 4efeefd343
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Classic HTML form default.

Visible:
- HTML form with method post.
- Without enctype multipart, browser sends application/x-www-form-urlencoded.
- Fields become key/value pairs.

Meaning:
If a classic form posts simple inputs and no files, x-www-form-urlencoded is the normal media type.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-009 - Do you need to add media types to input formatters?

Metadata:
```text
source_id: S-009
image_use_id: IU-009
fileId_short: 1bb2d97723
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Do you need to add media types to input formatters?

Visible:
- application/json is handled by JSON input formatter.
- multipart/form-data is handled by form parsing/model binding, not JSON input formatter.
- application/octet-stream is not handled by JSON formatters by default.
- If you expect raw bytes/stream, read Request.Body directly or implement a custom input formatter.

Meaning:
Do not expect MVC JSON input formatters to handle arbitrary media types automatically. Raw bytes often need explicit endpoint logic.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-010 - Read raw body in controller.

Metadata:
```text
source_id: S-010
image_use_id: IU-010
fileId_short: 34e917fb4b
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Read raw body in controller.

Visible code:
- Controller route for upload.
- Reads `Request.Body` with stream/file logic.
- Does not rely on model binding to parse JSON/form.

Meaning:
For octet-stream uploads, direct Request.Body reading is a clear path. You own validation, buffering, streaming, and error handling.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-011 - Server action examples for form and login.

Metadata:
```text
source_id: S-011
image_use_id: IU-011
fileId_short: dc39ba02a4
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Server action examples for form and login.

Visible code:
- `[HttpPost("account/login")]`
- `[Consumes("application/x-www-form-urlencoded")]`
- action with `[FromForm] LoginForm form`
- form fields like Username.

Meaning:
For form-urlencoded or multipart form posts, use [FromForm] binding and optionally [Consumes] to document/restrict the media type.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-012 - Mixed content types inside multipart.

Metadata:
```text
source_id: S-012
image_use_id: IU-012
fileId_short: cddeeb0072
stage0_group: MEDIA-R01-content-type-accept-media-type-basics
stage1_region: MEDIA-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Mixed content types inside multipart.

Visible:
- multipart can include an application/json part and one or more files.
- Parts can have different Content-Type values.

Meaning:
Multipart is the way to send mixed body data such as JSON metadata plus file bytes in a single request.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- Content-Type tells the server how to interpret the request body.
- multipart/form-data is for file plus metadata, multiple files, and mixed content.
- application/x-www-form-urlencoded is the classic HTML form encoding for simple key/value forms without files.
- application/octet-stream is for raw bytes, often for upload/download endpoints.
- Framework model binding and input formatters matter: if you bypass them and read Request.Body manually, some automatic 415 behavior no longer applies.
- If you expect Stream/raw bytes, [FromBody] Stream or manual Request.Body reading is often clearer than pretending it is JSON/form.
- Multipart boundary is part of how multipart bodies are separated; the client usually sets it.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- Stage2 MEDIA-R03/MEDIA-R04 is still pending.
