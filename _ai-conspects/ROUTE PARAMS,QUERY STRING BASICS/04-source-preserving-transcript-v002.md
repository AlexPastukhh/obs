# Route parameters, query strings, array keys, and composite keys — source-preserving transcript v002

Generated: 2026-07-03

## Source verification

```text
source/ROUTE PARAMS,QUERY STRING BASICS.svg
viewBox: 0 0 1491.4472556522107 3357.374541349484
Git blob SHA: cdfa6901289e473fda7053d1ae42a250bd6ae04f
unique screenshots: 8
image uses: 8
native non-empty SVG labels: 7
broken/external/dangling: 0
```

## Coverage

```text
source-specific blocks: 8 / 8
visible code/examples represented: 8 / 8
source-specific question sets: 8 / 8
native labels preserved: 7 / 7
remaining sources: 0
```

## Correction policy

The source's “one resource / not idiomatic REST” wording is retained as design advice, but corrected so it is not mistaken for a protocol or framework prohibition. The binding fact and the URI-design recommendation are kept separate.

---

## S-001 — Single route value and a CSV route segment

**Known limits:** none

### Near-literal normalized transcript

**1. Route parameters**

Route parameters are typically a single value.

```csharp
[HttpGet("users/{id}")]
public IActionResult GetUser(int id)
{
    // ...
}
```

Technically, a CSV value can be placed in one route segment:

```http
GET /users/1,2,3
```

### Study meaning

Routing sees `1,2,3` as one route value. The application must define how that single string maps to one scalar, a value object, a collection key, or a batch-selection contract.

### Technical boundary / correction

“Route parameters identify one resource” is a design guideline, not a framework or REST prohibition. A path may identify a collection/batch resource if the API defines that identity. The precise framework fact is that one CSV segment is supplied as one value and is not automatically expanded into an arbitrary array.

### Recall questions

1. How many route segments does `/users/1,2,3` contain after `users`?
2. What type does the ordinary `{id}` example bind?
3. Does the route template itself split comma-separated values?
4. What endpoint semantics must be documented for a list-shaped segment?


---

## S-002 — Manual CSV parsing from a route segment

**Known limits:** none

### Near-literal normalized transcript

```csharp
[HttpGet("users/{ids}")]
public IActionResult GetUsers(string ids)
{
    var idList = ids
        .Split(',')
        .Select(int.Parse)
        .ToArray();

    return Ok(idList);
}
```

The source notes:

- this route shape is often less idiomatic than query-based collection filtering;
- a route parameter is commonly used for resource identity;
- reusable CSV route parsing needs a custom model binder or reusable parsable type.

### Study meaning

Binding to `string` makes the real input explicit. Production code should avoid `int.Parse` over untrusted data without controlled error handling, count limits, duplicate policy, and empty-item handling.

### Technical boundary / correction

The source calls this “not idiomatic REST.” Treat that as a recommendation based on discoverability, URL size, cache keys, and endpoint meaning—not as a universal REST rule.

### Recall questions

1. Why is `string ids` bound successfully?
2. What exception can `int.Parse` throw?
3. How should invalid elements become an HTTP 400?
4. When is a reusable binder preferable to inline parsing?
5. Which limits should protect a list in a URL?


---

## S-003 — Repeated query keys bind naturally to an array

**Known limits:** none

### Near-literal normalized transcript

**2. Query parameters**

Query parameters are key-value pairs after `?`.

ASP.NET Core can bind repeated query keys to arrays/lists:

```http
GET /users?ids=1&ids=2&ids=3
```

```csharp
[HttpGet("users")]
public IActionResult GetUsers(
    [FromQuery] int[] ids)
{
    return Ok(ids); // [1, 2, 3]
}
```

A CSV query value is also syntactically possible:

```http
GET /users?ids=1,2,3
```

### Study meaning

Repeated keys are a built-in collection-binding shape for query data. They preserve value boundaries without inventing comma escaping rules.

### Recall questions

1. What is repeated in the successful query example?
2. Which attribute selects the query source?
3. What array is expected?
4. Why are repeated keys easier to validate than a custom CSV grammar?


---

## S-004 — CSV query values need explicit parsing or customization

**Known limits:** continuation screenshot; the preceding CSV query line is visible only at the top edge

### Near-literal normalized transcript

A query such as:

```http
GET /users?ids=1,2,3
```

contains one value for the `ids` key.

The source continues:

> ASP.NET Core does not automatically parse it.

One direct approach is:

```csharp
var idList = ids
    .Split(',')
    .Select(int.Parse)
    .ToArray();
```

The reusable alternative is a custom model binder or a strongly typed value with parsing support.

### Study meaning

Default collection model-binding formats document repeated/indexed keys; comma-separated interpretation is a separate convention. A custom value type can make the grammar and validation reusable.

### Recall questions

1. How many query values does `ids=1,2,3` supply?
2. Why should CSV parsing not silently discard invalid items?
3. What reusable alternatives exist?
4. How would an empty item such as `1,,3` be handled?


---

## S-005 — Course/demo boundary: array keys and composite keys

**Known limits:** none

### Near-literal normalized transcript

Demo title:

```text
Working with array keys and composite keys
```

### Study meaning

This screenshot marks the transition from basic scalar binding to application-defined key formats. “Array key” and “composite key” require an explicit serialized grammar and parsing/binding contract.

### Recall questions

1. What two key shapes are introduced?
2. Why does each require a documented grammar?
3. Which concerns belong to parsing versus resource design?


---

## S-006 — Example serialized key shapes

**Known limits:** none

### Near-literal normalized transcript

The source shows two possible textual forms:

```text
1,2,3
key1=value1,key2=value2
```

### Study meaning

The first can represent an ordered list. The second can represent named components of a composite value. Neither syntax becomes a built-in typed route key merely by appearing in the URL.

### Technical boundary / correction

For a conventional composite resource identity, explicit segments such as `/authors/{authorId}/courses/{courseId}` are usually clearer than packing `key1=value1,key2=value2` into one segment. A packed segment is still possible when intentionally supported by a parser/binder.

### Recall questions

1. What ambiguity exists in comma-delimited values?
2. What escaping rules would values containing commas need?
3. Why are explicit route segments often clearer for composite identity?
4. How could a value object encapsulate this grammar?


---

## S-007 — Attempt to bind a route segment directly to IEnumerable<Guid>

**Known limits:** none

### Near-literal normalized transcript

```csharp
[HttpGet("({authorIds})")]
public async Task<
    ActionResult<
        IEnumerable<AuthorForCreationDto>>>
    GetAuthorCollection(
        [FromRoute]
        IEnumerable<Guid> authorIds)
{
}
```

### Study meaning

The example asks the framework to turn one route value into a collection of GUIDs. Without an application-defined binding convention, the route value has no built-in list grammar that expands it into `IEnumerable<Guid>`.

### Technical boundary / correction

GUID itself is a supported simple scalar type. The limitation is not “GUIDs cannot bind from routes”; it is that one CSV route value is not automatically split into a collection of GUID scalars.

### Recall questions

1. What route value name must match the parameter?
2. Why can each GUID be parsed but the collection still fail to bind?
3. What is missing: scalar conversion or list grammar?
4. How would a custom value type improve the signature?


---

## S-008 — Direct question: are route ID lists automatically bound?

**Known limits:** only the beginning of the answer and the statement that three options exist are visible

### Near-literal normalized transcript

Question shown in the screenshot:

> asp.net core are list of ids automatically binder to method args from route params?

Visible answer:

> Short answer: No — ASP.NET Core does not automatically bind a route segment like `"1,2,3"` into a `long[]` parameter. Route values are treated as single strings by default. You have three common options.

### Study meaning

The three practical option families are:

1. bind `string` and parse explicitly;
2. bind a strongly typed value object implementing a supported parse contract;
3. register/apply a custom model binder.

For ordinary filter lists, repeated query keys are usually simpler.

### Recall questions

1. What exact automatic behavior is absent?
2. Which three implementation strategies are available?
3. When should repeated query keys be preferred?
4. When is a POST body better than a URL list?
