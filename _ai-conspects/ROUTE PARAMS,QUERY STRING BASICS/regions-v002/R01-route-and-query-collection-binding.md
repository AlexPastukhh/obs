# Route/query collection binding

Generated: 2026-07-03

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
