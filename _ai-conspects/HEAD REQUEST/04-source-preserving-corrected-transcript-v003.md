# HEAD REQUEST — source-preserving corrected transcript v003

Generated: 2026-07-03

## Source verification

```text
source/HEAD REQUEST.svg
Git blob SHA: 37d4eafff1d79f51e4b268ea6ca9b8a7cad87892
SHA-256: 749d37b62536c7ae088075dabbf1fa2f8d6f363b024e315fec3f00829a495893
viewBox: 0 0 1604.0000000000002 3814.124039853139
unique screenshots: 9
image uses: 9
SVG labels: 0
duplicates: 0
broken images: 0
```

## Coverage

```text
source-specific blocks: 9 / 9
correction sections: 9 / 9
recall-question sets: 9 / 9
uncovered source uses: 0
```

## Corrected model

```text
HEAD:
  explicit verb mapping in current ASP.NET Core
  no response content
  status and representation metadata should correspond to GET

Conditional requests:
  parse If-None-Match as entity tags
  support wildcard
  use weak comparison
  prefer conditional GET for ordinary cache revalidation

Content-Length:
  exact GET byte length only
  never an estimate
```

---

# R01 — Protocol semantics and validators

Generated: 2026-07-03

## S-009 — Plain-language HEAD semantics

### Near-literal normalized source

The source says that HEAD is like GET without a response body, returns corresponding status/headers, and can be implemented explicitly for expensive GET operations.

### Study meaning

The protocol overview is broadly correct: HEAD selects the same representation and returns metadata without content.

### Correction / boundary

More precisely: the server must not send content; it should send the same headers as GET; it may omit fields whose values are known only while generating content. The automatic GET fallback claim is removed.

### Recall questions

1. What HEAD rule is mandatory?
2. Which header behavior is a SHOULD?
3. Which fields may be omitted?
4. What ASP.NET Core claim is removed?


---

## S-001 — HEAD, ETag, and metadata-only flow

### Near-literal normalized source

Typical source flow:

1. Client sends:

```http
HEAD /documents/5
If-None-Match: "<etag>"
```

2. Server queries only version metadata, computes ETag, and returns:

- `304 Not Modified` when the validator matches;
- otherwise `200 OK` for HEAD with ETag and no body.

3. Client decides whether to issue GET.

### Study meaning

A metadata-only HEAD endpoint can avoid loading and serializing a large representation.

### Correction / boundary

Conditional HEAD is valid, but conditional GET is usually better for cache revalidation because a changed resource can be returned immediately instead of requiring HEAD followed by GET.

### Recall questions

1. What does HEAD omit?
2. Which metadata is needed to compute the ETag?
3. When is 304 returned?
4. Why is conditional GET usually better for revalidation?


---

## S-002 — Content-Length and representation size

### Near-literal normalized source

The source explains that exact JSON length is usually unknown without serializing the complete response.

Computing the exact size can defeat the metadata-only optimization. Therefore omitting Content-Length is acceptable when exact GET length is not cheaply known.

### Study meaning

HEAD may include Content-Length only as metadata about the actual GET representation.

### Correction / boundary

An estimate is invalid. The value must equal the exact number of octets that GET would have sent.

### Recall questions

1. Why is an estimate invalid?
2. When may Content-Length be included?
3. Why can exact calculation defeat the optimization?
4. What should HEAD do when exact length is unavailable?


---

## S-003 — Cheap metadata projection

### Near-literal normalized source

Candidate metadata:

- SQL Server rowversion;
- UpdatedAt;
- ID plus version;
- Content-Type;
- exact Content-Length when available.

A metadata query can return only:

```text
Id, RowVersion
```

and still support 404, ETag creation, and conditional evaluation.

### Study meaning

The repository query should project only the values needed to reproduce GET validators and relevant metadata.

### Correction / boundary

UpdatedAt can have precision or rapid-update issues. The validator must change whenever the selected representation changes.

### Recall questions

1. Why is rowversion useful?
2. What weakness can UpdatedAt have?
3. Which metadata is enough for 404 and ETag?
4. What must make the validator change?


---

## S-004 — Explicit HEAD optimization notes

### Near-literal normalized source

The source recommends a cheaper metadata-only database call, setting Content-Length only when efficient, and returning ETag or Last-Modified without a body.

### Study meaning

An explicit HEAD action is useful when it measurably avoids GET work.

### Correction / boundary

HEAD and GET should share validator helpers so status and metadata cannot drift.

### Recall questions

1. What work should explicit HEAD avoid?
2. When should Content-Length be omitted?
3. Which validators can be returned?
4. Why share helpers with GET?


---

# R02 — ASP.NET Core implementation and corrections

Generated: 2026-07-03

## S-005 — Broken object.Version helpers

### Near-literal normalized source

The source shows:

```csharp
private string ComputeETag(object item)
    => $""v{item.Version}"";

private string ComputeETagFromMetadata(object meta)
    => $""v{meta.Version}"";
```

### Study meaning

Both full-resource and metadata projections should generate the same quoted ETag from the same version.

### Correction / boundary

The signatures do not compile because `object` has no `Version` property. Use a concrete type/interface or pass the version value directly.

### Recall questions

1. Why does object.Version fail?
2. Why are ETags quoted?
3. Why must GET and HEAD use the same helper?
4. How could rowversion bytes be encoded?


---

## S-006 — Original explicit HEAD action

### Near-literal normalized source

The source action performs:

```csharp
[HttpHead("{id}")]
public IActionResult Head(int id)
{
    var item = repository.GetMetadata(id);
    if (item is null)
        return NotFound();

    var etag = ComputeETagFromMetadata(item);

    Response.Headers["ETag"] = etag;
    Response.Headers["Content-Type"] =
        "application/json";

    Response.Headers["Content-Length"] =
        item.EstimatedContentLength.ToString();

    if (
        Request.Headers.TryGetValue(
            "If-None-Match",
            out var inm)
        && inm.Contains(etag))
    {
        return StatusCode(
            StatusCodes.Status304NotModified);
    }

    return Ok();
}
```

### Study meaning

The intended structure is metadata query, 404, validators, conditional handling, and no representation body.

### Correction / boundary

Required fixes:

1. remove estimated Content-Length;
2. parse If-None-Match as entity tags;
3. support wildcard `*`;
4. use weak comparison for If-None-Match.

### Recall questions

1. Which lines are unsafe?
2. Why is raw Contains insufficient?
3. Which comparison strength is required?
4. How is wildcard `*` handled?


---

## S-007 — GET action and explicit HEAD motivation

### Near-literal normalized source

The source shows a GET action:

```csharp
[HttpGet("{id}", Name = "GetItem")]
public IActionResult Get(int id)
{
    var item = repository.Get(id);

    if (item is null)
        return NotFound();

    var etag = ComputeETag(item);
    Response.Headers["ETag"] = etag;

    return Ok(item);
}
```

The heading recommends explicit HEAD for expensive GET queries.

### Study meaning

GET returns the representation. HEAD can use a smaller metadata projection while preserving compatible validators.

### Correction / boundary

GET should also evaluate validators when conditional requests are supported. ETag design must account for negotiated representation variants.

### Recall questions

1. What does GET return?
2. Why can HEAD be cheaper?
3. Why should GET evaluate validators too?
4. How can content negotiation affect ETag?


---

## S-008 — Claimed implicit HEAD-to-GET routing

### Near-literal normalized source

The source says:

```text
Implicit:
let framework route HEAD to GET
```

and shows only `[HttpGet("{id}")]`.

### Study meaning

The conceptual concern is that a HEAD implementation could waste work by executing a full GET pipeline.

### Correction / boundary

For current ASP.NET Core controller/endpoint routing, `[HttpGet]` declares GET only. HEAD is a separate method match. Map `[HttpHead]` explicitly or explicitly map both verbs.

### Recall questions

1. Which method does HttpGetAttribute declare?
2. Why should HEAD be mapped explicitly?
3. What work can a full GET path waste?
4. When is a metadata projection worthwhile?
