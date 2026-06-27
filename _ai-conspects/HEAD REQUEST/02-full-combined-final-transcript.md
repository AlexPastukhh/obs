# Full combined final transcript — HEAD REQUEST

Generated: 2026-06-27 14:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 0 / 0
unique embedded screenshots: 9 / 9
screenshot uses on canvas: 9 / 9
repeated screenshot placements retained: 0
logical regions: 1 / 1
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — HEAD semantics, metadata and conditional requests

HEAD requests ask for the same response metadata as GET without transferring the representation body. They are useful for existence checks, validators and deciding whether a later GET is necessary.

### Protocol semantics

- A successful HEAD response should use the same status and relevant headers that the corresponding GET would produce.
- The response body is omitted.
- ASP.NET Core routing can use a GET endpoint for HEAD when no explicit HEAD endpoint is selected, but the GET action may still perform full query and serialization work.
- Test host/framework behavior rather than assuming an implicit fallback is computationally cheap.

### Explicit HEAD endpoint

- Use `[HttpHead]` when a metadata-only query can avoid loading the complete resource.
- Return 404 when the resource metadata does not exist.
- Set ETag, content type and other representation metadata that can be computed correctly.
- Return an empty result/body after the headers are established.

### Cheap metadata queries

- Query only an identifier and concurrency/version value such as `rowversion`, update timestamp or an immutable version field.
- Compute an ETag from stable version metadata.
- Do not load or serialize a large document only to discard its body.
- A metadata-only query saves database transfer and application work.

### Content-Length

- Set exact Content-Length only when the GET representation length is known without defeating the optimization.
- An estimated or guessed length is incorrect.
- It is acceptable to omit Content-Length for HEAD and let the framework/server handle the response headers it can determine.

### Conditional flow

- The client sends `HEAD /documents/5` with `If-None-Match`.
- The server reads only version metadata and computes the current ETag.
- A match returns 304 with no body.
- A non-match returns 200 HEAD with the new ETag; the client decides whether to issue GET.
- The same validator logic should be shared with the corresponding GET endpoint.

### Caveats

- HEAD is safe and idempotent; it must not mutate server state.
- A 304 response is only appropriate for a conditional request whose validator matches.

## Coverage map

### R01

- text elements: `0`
- screenshot uses: `9`
- unique screenshots: `9`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `01-transcript-R01-head-semantics-metadata-and-conditional-requests.md`

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots under `source/` remain authoritative for exact source
punctuation, code spelling and framework-version details.
