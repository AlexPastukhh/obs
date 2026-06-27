# Final semantic transcript — last modified header, implementation, expirational model

Authoritative source: `source/last modified header, implementation, expirational model.svg`

# R01 — persisting `LastModified`

`Last-Modified` is an HTTP validator that tells the client when the selected representation last changed.

Store a UTC timestamp whose meaning is stable for the resource. With EF Core it can be a normal property or a shadow property:

```csharp
modelBuilder.Entity<Author>()
    .Property<DateTimeOffset>("LastModified");
```

Before saving, set it for added or modified entities:

```csharp
public override async Task<int> SaveChangesAsync(
    CancellationToken cancellationToken = default)
{
    var now = DateTimeOffset.UtcNow;

    foreach (var entry in ChangeTracker.Entries<Author>())
    {
        if (entry.State is EntityState.Added
            or EntityState.Modified)
        {
            entry.Property<DateTimeOffset>("LastModified")
                .CurrentValue = now;
        }
    }

    return await base.SaveChangesAsync(cancellationToken);
}
```

A `SaveChangesInterceptor` can centralize this convention across several entity types.

The timestamp must change whenever the protected representation changes. If the representation aggregates child entities, changing a child may also need to update the root's timestamp.

# R02 — `If-Modified-Since`

Client revalidation:

```http
GET /api/authors/{id}
If-Modified-Since: Sat, 27 Jun 2026 09:30:00 GMT
```

Read the resource and its persisted timestamp:

```csharp
var data = await db.Authors
    .AsNoTracking()
    .Where(author => author.Id == id)
    .Select(author => new
    {
        author.Id,
        author.Name,
        LastModified = EF.Property<DateTimeOffset>(
            author,
            "LastModified")
    })
    .SingleOrDefaultAsync(cancellationToken);
```

Parse the request using typed headers or an HTTP-date parser. Normalize to UTC.

HTTP dates have whole-second precision, while database timestamps may contain fractions. Compare values after truncating the resource timestamp to whole seconds:

```csharp
static DateTimeOffset TruncateToSecond(
    DateTimeOffset value)
{
    var utc = value.ToUniversalTime();

    return new DateTimeOffset(
        utc.Year,
        utc.Month,
        utc.Day,
        utc.Hour,
        utc.Minute,
        utc.Second,
        TimeSpan.Zero);
}
```

Conditional rule:

```text
if resource LastModified <= If-Modified-Since
    return 304 Not Modified
else
    return 200 with the current representation
```

Do not return `304` for unsafe methods based on this GET-oriented cache-validation flow.

When both `If-None-Match` and `If-Modified-Since` are supplied, ETag validation takes precedence.

# R03 — response headers and HTTP-date format

Set the header on the normal response:

```csharp
var lastModified = TruncateToSecond(data.LastModified);

Response.GetTypedHeaders().LastModified = lastModified;
Response.Headers.CacheControl = "private, no-cache";
```

Then evaluate the condition:

```csharp
var ifModifiedSince =
    Request.GetTypedHeaders().IfModifiedSince;

if (ifModifiedSince.HasValue &&
    lastModified <=
        TruncateToSecond(ifModifiedSince.Value))
{
    return StatusCode(
        StatusCodes.Status304NotModified);
}

return Ok(new AuthorDto(data.Id, data.Name));
```

Wire format uses HTTP-date/RFC 1123 syntax:

```http
Last-Modified: Sat, 27 Jun 2026 09:30:00 GMT
```

Use framework header types when possible instead of formatting dates manually.

A `304` has no normal representation body, but should include relevant validators and cache metadata so caches can update stored response metadata.

# R04 — freshness and expiration model

Validators and freshness are separate concepts:

```text
Last-Modified / ETag
    identify whether the stored representation is still current

Cache-Control max-age / Expires
    define how long a stored response is fresh without contacting the server
```

Example:

```http
Cache-Control: private, max-age=60
Last-Modified: Sat, 27 Jun 2026 09:30:00 GMT
```

For 60 seconds, a cache may reuse the response without revalidation. After it becomes stale, it can send `If-Modified-Since`.

With:

```http
Cache-Control: private, no-cache
```

the response may be stored, but must be revalidated before each reuse.

With:

```http
Cache-Control: no-store
```

the response must not be stored.

Typical lifecycle:

```text
1. server returns 200 + body + Last-Modified
2. client/cache stores body and validator
3. freshness lifetime expires or no-cache requires validation
4. client sends If-Modified-Since
5. server returns 304 if unchanged, otherwise 200 + new body
```

`Last-Modified` is weaker than a precise ETag when multiple changes can occur in the same second or when a representation cannot be mapped reliably to one modification time.

# Checklist

```text
[ ] persist modification time in UTC
[ ] update it for every representation-changing mutation
[ ] compare using whole-second HTTP precision
[ ] emit Last-Modified on 200 and relevant 304 responses
[ ] prefer typed headers
[ ] distinguish no-cache from no-store
[ ] choose max-age/Expires independently from validators
[ ] prefer ETag when timestamp precision is insufficient
```


# Coverage

```text
unique embedded screenshots: 31
image uses: 33
native SVG labels: 51
duplicate extra placements: 2

processed image uses: 33
processed text labels: 51
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
