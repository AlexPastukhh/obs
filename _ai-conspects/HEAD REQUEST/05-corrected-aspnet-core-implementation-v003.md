# HEAD REQUEST — corrected ASP.NET Core implementation v003

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

public sealed record ItemMetadata(
    int Id,
    long Version,
    string ContentType,
    long? ExactContentLength);

private static EntityTagHeaderValue CreateETag(
    long version)
    => EntityTagHeaderValue.Parse(
        $"\"v{version}\"");

private static bool IfNoneMatchMatches(
    HttpRequest request,
    EntityTagHeaderValue current)
{
    var candidates =
        request.GetTypedHeaders().IfNoneMatch;

    return candidates?.Any(candidate =>
        candidate == EntityTagHeaderValue.Any
        || candidate.Compare(
            current,
            useStrongComparison: false))
        == true;
}

[ApiController]
[Route("api/items")]
public sealed class ItemsController
    : ControllerBase
{
    [HttpHead("{id:int}")]
    public IActionResult Head(int id)
    {
        ItemMetadata? metadata =
            repository.GetMetadata(id);

        if (metadata is null)
            return NotFound();

        EntityTagHeaderValue etag =
            CreateETag(metadata.Version);

        Response.GetTypedHeaders().ETag =
            etag;

        Response.ContentType =
            metadata.ContentType;

        if (
            metadata.ExactContentLength
            is long exactLength)
        {
            Response.ContentLength =
                exactLength;
        }

        if (
            IfNoneMatchMatches(
                Request,
                etag))
        {
            return StatusCode(
                StatusCodes.Status304NotModified);
        }

        return Ok();
    }
}
```

## Rules

```text
Never send EstimatedContentLength as Content-Length.
Never compare raw If-None-Match strings.
Do not assume [HttpGet] also maps HEAD.
Use the same validator algorithm for GET and HEAD.
Prefer conditional GET for normal cache revalidation.
Use explicit HEAD when a cheaper metadata query is valuable.
```
