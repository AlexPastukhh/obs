# Route/query collection binding — code reference v002

## 1. Preferred query collection with repeated keys

Request:

```http
GET /api/users?ids=1&ids=2&ids=3
```

Controller:

```csharp
[ApiController]
[Route("api/users")]
public sealed class UsersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers(
        [FromQuery] int[] ids)
    {
        if (ids.Length == 0)
        {
            return BadRequest(
                "At least one id is required.");
        }

        if (ids.Length > 100)
        {
            return BadRequest(
                "At most 100 ids are allowed.");
        }

        return Ok(ids.Distinct().ToArray());
    }
}
```

## 2. Manual CSV route parsing with safe errors

```csharp
[HttpGet("batch/{ids}")]
public IActionResult GetUsersByCsvRoute(
    [FromRoute] string ids)
{
    var tokens = ids.Split(
        ',',
        StringSplitOptions.RemoveEmptyEntries |
        StringSplitOptions.TrimEntries);

    if (tokens.Length is 0 or > 100)
    {
        return BadRequest(
            "Provide between 1 and 100 ids.");
    }

    var result = new int[tokens.Length];

    for (var index = 0;
         index < tokens.Length;
         index++)
    {
        if (!int.TryParse(
                tokens[index],
                out result[index]))
        {
            return BadRequest(
                $"Invalid id: '{tokens[index]}'.");
        }
    }

    return Ok(result.Distinct().ToArray());
}
```

## 3. Strong value object using `IParsable<T>`

```csharp
public sealed record GuidList(
    IReadOnlyList<Guid> Values)
    : IParsable<GuidList>
{
    public static GuidList Parse(
        string text,
        IFormatProvider? provider)
    {
        if (!TryParse(
                text,
                provider,
                out var result))
        {
            throw new FormatException(
                "Invalid GUID list.");
        }

        return result;
    }

    public static bool TryParse(
        string? text,
        IFormatProvider? provider,
        out GuidList result)
    {
        result = new GuidList(
            Array.Empty<Guid>());

        if (string.IsNullOrWhiteSpace(text))
        {
            return false;
        }

        var tokens = text.Split(
            ',',
            StringSplitOptions.RemoveEmptyEntries |
            StringSplitOptions.TrimEntries);

        if (tokens.Length is 0 or > 100)
        {
            return false;
        }

        var values = new Guid[tokens.Length];

        for (var index = 0;
             index < tokens.Length;
             index++)
        {
            if (!Guid.TryParse(
                    tokens[index],
                    out values[index]))
            {
                return false;
            }
        }

        result = new GuidList(
            values.Distinct().ToArray());
        return true;
    }
}
```

Action:

```csharp
[HttpGet("batch/{authorIds}")]
public IActionResult GetAuthors(
    [FromRoute] GuidList authorIds)
{
    return Ok(authorIds.Values);
}
```

Confirm the binding contract against the ASP.NET Core version used by the project and cover it with an integration test.

## 4. Explicit composite identity

```csharp
[HttpGet(
    "authors/{authorId:guid}/" +
    "courses/{courseId:guid}")]
public IActionResult GetCourse(
    Guid authorId,
    Guid courseId)
{
    // Parent-scoped lookup.
    return Ok();
}
```

This is clearer than packing:

```text
key1=value1,key2=value2
```

into one segment when both components are stable route identities.

## 5. Structured batch request

For large/complex lists:

```csharp
public sealed record UserBatchRequest(
    IReadOnlyList<int> Ids);

[HttpPost("batch-query")]
public IActionResult GetBatch(
    [FromBody] UserBatchRequest request)
{
    if (request.Ids.Count is 0 or > 1000)
    {
        return BadRequest();
    }

    return Ok(...);
}
```

The method and URI should describe the operation honestly; a POST command/query resource is preferable when URL limits or structured input make GET impractical.
