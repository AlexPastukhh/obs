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
