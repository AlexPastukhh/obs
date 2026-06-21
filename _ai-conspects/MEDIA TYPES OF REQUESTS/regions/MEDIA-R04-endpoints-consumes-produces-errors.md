# MEDIA-R04 - endpoint metadata / Consumes / Produces / errors

Conspect: `media-types-of-requests`  
File type: **source-level semantic transcript**  
Stage: **2 / transcript v001**  
Generated: 2026-06-13 08:05:13 UTC

---

## Direction check

Goal:
Close remaining Media Types Of Requests transcript candidates after Stage1.

Done:
Stage1 processed MEDIA-R01/MEDIA-R02 and left 25 candidates.

Now:
This file processes `13` sources for `MEDIA-R04`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage2 review/commit, run Media Types Of Requests closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Endpoint/API behavior and debugging: [Consumes], [Produces], ProducesResponseType, request/response examples, Swagger/OpenAPI metadata, 400/406/415 errors, and practical mismatch rules.
```

Key ideas:

- [Consumes] restricts/documents which request Content-Type an action accepts.
- [Produces] documents the response media type and can affect output formatter selection.
- 415 Unsupported Media Type usually means the request Content-Type cannot be handled for the action parameter/body shape.
- 406 Not Acceptable can appear when the Accept header asks for a response type the server cannot produce and strict negotiation is enabled.
- 400 Bad Request usually comes after binding/deserialization/validation fails, not because the media type itself is unsupported.
- Swagger/OpenAPI requestBody/content should match the actual endpoint binder/formatter contract.
- Debug media-type issues by checking: client Content-Type, request body shape, action parameter attributes, [Consumes], registered formatters, and actual response negotiation.

Reading quality:
```text
Stage2 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049
```

Boundary decision:
```text
Included in MEDIA-R04 after Stage2 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-037 | IU-037 | `3496bdde45` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | [Consumes] attribute. |
| S-038 | IU-038 | `5401f93bf5` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | [Produces] attribute. |
| S-039 | IU-039 | `606f4408a0` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Consumes vs Produces. |
| S-040 | IU-040 | `2447dcc90b` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | 415 Unsupported Media Type. |
| S-041 | IU-041 | `681a4e223f` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | 406 Not Acceptable. |
| S-042 | IU-042 | `f8fc6ac3c1` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | 400 Bad Request. |
| S-043 | IU-043 | `9387845e51` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Swagger/OpenAPI requestBody. |
| S-044 | IU-044 | `cb0d7475da` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Endpoint examples. |
| S-045 | IU-045 | `3e7f46737d` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Debugging checklist. |
| S-046 | IU-046 | `c764c0a46f` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Accept header debugging. |
| S-047 | IU-047 | `3d1ab870e9` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Minimal APIs / endpoint metadata. |
| S-048 | IU-048 | `439afad388` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Practical mismatch examples. |
| S-049 | IU-049 | `b6bf00cf88` | `MEDIA-R04-endpoints-consumes-produces-errors` | `verified-visible-semantic-transcript` | Final rule summary. |

---

## 2. Source-level transcript

### S-037 - [Consumes] attribute.

Metadata:
```text
source_id: S-037
image_use_id: IU-037
fileId_short: 3496bdde45
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
[Consumes] attribute.

Visible:
- `[Consumes("application/json")]`
- `[Consumes("multipart/form-data")]`
- controls/declares what request content types the action accepts.

Meaning:
Use [Consumes] to restrict and document expected request Content-Type, especially when overloads/actions could otherwise be ambiguous.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-038 - [Produces] attribute.

Metadata:
```text
source_id: S-038
image_use_id: IU-038
fileId_short: 5401f93bf5
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
[Produces] attribute.

Visible:
- `[Produces("application/json")]`
- maybe response media type.

Meaning:
[Produces] is about response content type/documentation, not request body parsing. It belongs to output formatting/metadata.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-039 - Consumes vs Produces.

Metadata:
```text
source_id: S-039
image_use_id: IU-039
fileId_short: 606f4408a0
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Consumes vs Produces.

Visible contrast:
- Consumes = request Content-Type.
- Produces = response Content-Type / Accept negotiation/documentation.

Meaning:
Do not confuse inbound and outbound media type metadata. Content-Type describes what is sent; Accept describes what response client wants.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-040 - 415 Unsupported Media Type.

Metadata:
```text
source_id: S-040
image_use_id: IU-040
fileId_short: 2447dcc90b
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
415 Unsupported Media Type.

Visible:
- Happens when request Content-Type is not supported by endpoint/input formatter.
- Example: sending text/plain or form data to an action expecting JSON.

Meaning:
415 is usually a media-type/binder/formatter mismatch before your action logic runs.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-041 - 406 Not Acceptable.

Metadata:
```text
source_id: S-041
image_use_id: IU-041
fileId_short: 681a4e223f
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
406 Not Acceptable.

Visible:
- Related to Accept header and response format negotiation.
- Server cannot produce requested media type.

Meaning:
406 is about response negotiation, not request body parsing. It can be enabled by returning 406 when Accept cannot be satisfied.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-042 - 400 Bad Request.

Metadata:
```text
source_id: S-042
image_use_id: IU-042
fileId_short: f8fc6ac3c1
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
400 Bad Request.

Visible:
- Bad JSON / validation / model state errors.
- Body parses to wrong shape or fails validation.

Meaning:
400 is after the server accepted the media type but could not bind/validate the request successfully.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-043 - Swagger/OpenAPI requestBody.

Metadata:
```text
source_id: S-043
image_use_id: IU-043
fileId_short: 9387845e51
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Swagger/OpenAPI requestBody.

Visible:
- OpenAPI shows content types under requestBody/content.
- multipart/form-data schema for files.
- application/json schema for JSON DTOs.

Meaning:
Swagger metadata should reflect real endpoint behavior. If docs say JSON but endpoint expects form data, client generation/testing will be wrong.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-044 - Endpoint examples.

Metadata:
```text
source_id: S-044
image_use_id: IU-044
fileId_short: cb0d7475da
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Endpoint examples.

Visible:
- Controller/minimal API examples with attributes.
- Different endpoints for JSON vs multipart/raw.

Meaning:
Separate endpoints or explicit Consumes metadata can make API contracts clearer than one ambiguous action trying to accept everything.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-045 - Debugging checklist.

Metadata:
```text
source_id: S-045
image_use_id: IU-045
fileId_short: 3e7f46737d
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Debugging checklist.

Visible list:
- Check client Content-Type.
- Check request body shape.
- Check action attributes: FromBody/FromForm.
- Check [Consumes].
- Check formatters/model binding.

Meaning:
Most media type bugs are mismatches among body format, Content-Type header, and server binding path.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-046 - Accept header debugging.

Metadata:
```text
source_id: S-046
image_use_id: IU-046
fileId_short: c764c0a46f
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Accept header debugging.

Visible:
- Accept: application/json
- Accept: text/plain
- response output format.

Meaning:
If request reaches action but response type is unexpected, inspect Accept and output formatters rather than input formatter logic.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-047 - Minimal APIs / endpoint metadata.

Metadata:
```text
source_id: S-047
image_use_id: IU-047
fileId_short: 3d1ab870e9
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Minimal APIs / endpoint metadata.

Visible:
- Minimal API can document/consume/produce content types through metadata helpers.
- Body binding still depends on parameter shape/content type.

Meaning:
The same media-type concepts apply in minimal APIs: request body binding, metadata, and response negotiation.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-048 - Practical mismatch examples.

Metadata:
```text
source_id: S-048
image_use_id: IU-048
fileId_short: 439afad388
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Practical mismatch examples.

Visible:
- Client sends multipart but action expects [FromBody] JSON DTO.
- Client sends JSON but action expects [FromForm].
- Client sends octet-stream but action expects byte[] through unsupported formatter.

Meaning:
When you see 415/400, first compare body media type with action parameter source and registered formatters.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-049 - Final rule summary.

Metadata:
```text
source_id: S-049
image_use_id: IU-049
fileId_short: b6bf00cf88
stage0_group: MEDIA-R04-endpoints-consumes-produces-errors
stage2_region: MEDIA-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Final rule summary.

Visible summary:
- Content-Type chooses request parser.
- Accept chooses desired response.
- [FromBody] uses input formatters.
- [FromForm] uses form binding.
- [Consumes]/[Produces] document/restrict endpoint behavior.

Meaning:
The central model is: body bytes + Content-Type + action parameter source determine request binding; Accept + output formatters determine response media type.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- [Consumes] restricts/documents which request Content-Type an action accepts.
- [Produces] documents the response media type and can affect output formatter selection.
- 415 Unsupported Media Type usually means the request Content-Type cannot be handled for the action parameter/body shape.
- 406 Not Acceptable can appear when the Accept header asks for a response type the server cannot produce and strict negotiation is enabled.
- 400 Bad Request usually comes after binding/deserialization/validation fails, not because the media type itself is unsupported.
- Swagger/OpenAPI requestBody/content should match the actual endpoint binder/formatter contract.
- Debug media-type issues by checking: client Content-Type, request body shape, action parameter attributes, [Consumes], registered formatters, and actual response negotiation.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage2 pass closes these sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit.
