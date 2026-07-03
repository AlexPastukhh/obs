# Array and composite key demo

Generated: 2026-07-03

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
