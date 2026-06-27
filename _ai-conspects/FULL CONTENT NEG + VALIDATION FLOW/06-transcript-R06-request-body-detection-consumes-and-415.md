# Regional transcript — R06: Request-body detection, Content-Length, chunked transfer, Consumes and 415

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 18 / 18
unique screenshots represented: 18
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Request body detection cannot rely only on `Content-Length`.

### Body framing

- `Content-Length > 0` is one body signal.
- HTTP/1.1 chunked transfer can carry a body without `Content-Length`.
- HTTP/2 and HTTP/3 have body framing that also does not require that header.
- Prefer ASP.NET Core request-body detection features and endpoint metadata over
  guessing from one header.
- `Request.Body.CanRead` does not prove that a body is present.

### Content-Type

`Content-Type` describes the request representation when a body exists.

- bodyless requests can omit it;
- malformed syntax is a request-validation problem;
- a valid but unsupported type is normally 415;
- a supported type lets an input formatter deserialize.

Reading the body in middleware consumes it unless buffering and stream position
are managed.

### Consumes

`[Consumes]` is the built-in action-selection rule for request media type.

- It can split actions that share route and method but accept JSON versus XML.
- If no candidate accepts the request `Content-Type`, MVC can produce 415.
- A compatible input formatter must still be registered.
- Global middleware should not reject endpoints that intentionally have no body
  or use a different media type.

## Representative source labels

- use consumes
- OR
- IACTIONCONSTRAINT
- CONSUMES

## Covered text elements

```text
T-014, T-095, T-096, T-274
```

## Covered screenshot uses

```text
IU-013, IU-014, IU-015, IU-016, IU-017, IU-018, IU-031, IU-033, IU-039, IU-040, IU-043, IU-086, IU-087
IU-088, IU-121, IU-122, IU-124, IU-127
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
