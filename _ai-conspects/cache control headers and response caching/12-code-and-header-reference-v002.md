# Cache-Control / Response Caching — code and header reference v002

## Correct endpoint policy

```csharp
[HttpGet("{id:int}")]
[Produces("application/json", "application/xml")]
[ResponseCache(
    Duration = 60,
    Location = ResponseCacheLocation.Any,
    VaryByHeader = "Accept")]
public IActionResult<ProductDto> Get(int id)
{
    return Ok(new ProductDto
    {
        Id = id,
        Name = "Phone"
    });
}
```

## Named profile

```csharp
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add(
        "Public5Min",
        new CacheProfile
        {
            Duration = 300,
            Location = ResponseCacheLocation.Any,
            VaryByHeader = "Accept"
        });
});
```

```csharp
[ResponseCache(CacheProfileName = "Public5Min")]
public IActionResult GetCatalog() => Ok(...);
```

## Safe global default

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ResponseCacheAttribute
    {
        NoStore = true,
        Location = ResponseCacheLocation.None
    });
});
```

## Response Caching middleware

```csharp
builder.Services.AddResponseCaching();

var app = builder.Build();
app.UseResponseCaching();
app.MapControllers();
```

## Conditional authenticated-response protection

```csharp
app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode is >= 200 and < 300 &&
        context.User.Identity?.IsAuthenticated == true &&
        !context.Response.Headers.ContainsKey("Cache-Control"))
    {
        context.Response.Headers.CacheControl = "no-store";
    }
});
```

## Manual Vary

```csharp
Response.Headers.Vary = "Accept";
return Ok(product);
```

## Conditional ETag sketch

```csharp
var etag = $"\"{resource.Version}\"";

if (Request.Headers.IfNoneMatch == etag)
{
    return StatusCode(StatusCodes.Status304NotModified);
}

Response.Headers.ETag = etag;
return Ok(resource);
```

Production validators must be derived from the representation/version contract and must account for authorization and content-negotiated variants.

## Integration checks

```text
[ ] exactly one ResponseCacheAttribute per class/method
[ ] Cache-Control header matches intended storage/freshness
[ ] no-store used for sensitive retention prohibition
[ ] Vary present for every representation-changing request header
[ ] Authorization/Cookie behavior tested
[ ] repeated GET proves whether middleware actually serves a cached response
[ ] ETag 304 path tested
[ ] max-age expiry tested
[ ] cache profile override behavior tested
[ ] no user data crosses cache keys
```
