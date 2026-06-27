# Regional transcript — R01: HEAD semantics, metadata and conditional requests

Conspect: `HEAD REQUEST`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

HEAD requests ask for the same response metadata as GET without transferring the representation body. They are useful for existence checks, validators and deciding whether a later GET is necessary.

## Protocol semantics

- A successful HEAD response should use the same status and relevant headers that the corresponding GET would produce.
- The response body is omitted.
- ASP.NET Core routing can use a GET endpoint for HEAD when no explicit HEAD endpoint is selected, but the GET action may still perform full query and serialization work.
- Test host/framework behavior rather than assuming an implicit fallback is computationally cheap.

## Explicit HEAD endpoint

- Use `[HttpHead]` when a metadata-only query can avoid loading the complete resource.
- Return 404 when the resource metadata does not exist.
- Set ETag, content type and other representation metadata that can be computed correctly.
- Return an empty result/body after the headers are established.

## Cheap metadata queries

- Query only an identifier and concurrency/version value such as `rowversion`, update timestamp or an immutable version field.
- Compute an ETag from stable version metadata.
- Do not load or serialize a large document only to discard its body.
- A metadata-only query saves database transfer and application work.

## Content-Length

- Set exact Content-Length only when the GET representation length is known without defeating the optimization.
- An estimated or guessed length is incorrect.
- It is acceptable to omit Content-Length for HEAD and let the framework/server handle the response headers it can determine.

## Conditional flow

- The client sends `HEAD /documents/5` with `If-None-Match`.
- The server reads only version metadata and computes the current ETag.
- A match returns 304 with no body.
- A non-match returns 200 HEAD with the new ETag; the client decides whether to issue GET.
- The same validator logic should be shared with the corresponding GET endpoint.

## Caveats

- HEAD is safe and idempotent; it must not mutate server state.
- A 304 response is only appropriate for a conditional request whose validator matches.

## Covered text elements

```text
(none; source region is screenshot-only)
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
