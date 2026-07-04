# ApiBehaviorOptions — R03-form-file-consumes-and-client-errors

Generated: 2026-07-04

## S-015 — SuppressConsumesConstraintForFormFileParameters

**Known limits:** none

### Near-literal normalized transcript

`SuppressConsumesConstraintForFormFileParameters`

With `[ApiController]`, if an action has `IFormFile`, ASP.NET Core can automatically apply a `multipart/form-data` consumes constraint.

Example:

```csharp
[HttpPost("upload")]
public IActionResult Upload(IFormFile file)
{
    return Ok();
}
```

The API behavior can infer that this endpoint consumes multipart form data.

### Study meaning

The option controls whether file-upload conventions add a consumes constraint automatically. This affects endpoint selection and content-type expectations.

### Technical correction / boundary

Correct property name is `SuppressConsumesConstraintForFormFileParameters`. The canvas label contains casing/wording drift.

### Recall questions

1. Which parameter type is involved?
2. Which media type is inferred?
3. What does a consumes constraint affect?
4. Why should upload endpoints be explicit?


---

## S-016 — Explicit Consumes for file uploads

**Known limits:** none

### Near-literal normalized transcript

Usually leave the automatic behavior alone.

Use suppression if:

```text
you manually configure [Consumes]
you have custom form/file binding behavior
the automatic multipart constraint conflicts with your endpoint design
```

Explicit version:

```csharp
[HttpPost("upload")]
[Consumes("multipart/form-data")]
public IActionResult Upload(IFormFile file)
{
    return Ok();
}
```

### Study meaning

If the API requires a special file-upload contract, explicit `[Consumes]` documents it and avoids relying on convention.

### Recall questions

1. When is suppression useful?
2. Which explicit attribute is shown?
3. What media type is used?
4. Why usually leave the convention alone?


---

## S-017 — SuppressMapClientErrors

**Known limits:** none

### Near-literal normalized transcript

```csharp
options.SuppressMapClientErrors = true;
```

This disables automatic mapping of client error responses to `ProblemDetails`.

Client errors are 4xx responses such as:

```text
400
401
403
404
409
415
422
```

With automatic mapping, MVC can convert certain client error results into ProblemDetails-style responses using `ClientErrorMapping`.

### Study meaning

This option is about MVC-generated client error result mapping. It is not the validation error factory and not global exception handling.

### Recall questions

1. What status range is affected?
2. What response style is disabled?
3. Which mapping table is involved?
4. How is this different from invalid model state?


---

## S-018 — When to suppress client-error mapping

**Known limits:** none

### Near-literal normalized transcript

Use suppression if:

```text
you have your own global exception/error middleware
you want empty 4xx bodies
you use a custom error envelope everywhere
you do not want MVC-generated ProblemDetails
```

### Study meaning

Suppression is appropriate when another component owns the entire error contract. Otherwise, MVC default ProblemDetails can provide useful consistency.

### Recall questions

1. Name two reasons to suppress mapping.
2. Why might empty 4xx bodies be intentional?
3. What owns errors after suppression?
4. When should mapping remain enabled?


---

## S-019 — ClientErrorMapping heading

**Known limits:** none

### Near-literal normalized transcript

`ClientErrorMapping`

This is the API behavior configuration area for client-error metadata.

### Study meaning

The screenshot marks the start of `ClientErrorMapping`: the status-code-to-metadata map used by MVC client error handling.

### Recall questions

1. What option family starts here?
2. Which status range is relevant?
3. What metadata is mapped?


---

## S-020 — ClientErrorMapping example

**Known limits:** none

### Near-literal normalized transcript

`ClientErrorMapping` lets you customize metadata used when 4xx responses are mapped to ProblemDetails.

Example:

```csharp
builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://docs.example.com/errors/not-found";

        options.ClientErrorMapping[StatusCodes.Status400BadRequest].Link =
            "https://docs.example.com/errors/bad-request";
    });
```

### Study meaning

The `Link` usually becomes the default ProblemDetails `type` URI, while the mapped title can become the default `title`.

### Recall questions

1. Which status codes are customized?
2. What field is assigned?
3. What ProblemDetails field does Link usually influence?
4. Why use documentation URLs?


---

## S-021 — Per-status metadata fields

**Known limits:** none

### Near-literal normalized transcript

You can set these per status code:

```csharp
options.ClientErrorMapping[statusCode].Title
options.ClientErrorMapping[statusCode].Link
```

So mainly:

```text
Title -> default ProblemDetails.Title
Link  -> default ProblemDetails.Type
```

### Study meaning

ClientErrorMapping is for default metadata. It is not a rich envelope customizer for validation detail, instance, or extensions.

### Recall questions

1. Which two fields can be set?
2. Which ProblemDetails fields do they influence?
3. Why is Link treated as type?
4. What does this not customize?


---

## S-022 — What ClientErrorMapping does not set

**Known limits:** none

### Near-literal normalized transcript

`ClientErrorMapping` does not directly set:

```csharp
ProblemDetails.Detail
ProblemDetails.Instance
ProblemDetails.Extensions
```

It is mainly for default client-error ProblemDetails metadata: title and type/link.

For richer customization, use one of:

```text
InvalidModelStateResponseFactory
ProblemDetailsFactory
IProblemDetailsService
exception-handling middleware
```

### Study meaning

This prevents overusing the metadata map for cases that require a custom factory/service/middleware pipeline.

### Recall questions

1. Which three fields are not directly set?
2. Which tools are listed for richer customization?
3. Why is this distinction important?
4. Which one is used for validation errors?


---

## S-023 — IClientErrorActionResult affected results

**Known limits:** none

### Near-literal normalized transcript

It affects MVC results that implement `IClientErrorActionResult`, like:

```csharp
BadRequest()
NotFound()
Conflict()
Unauthorized()
Forbid()
```

It does not customize validation error structure. For invalid model state, use `InvalidModelStateResponseFactory`.

### Study meaning

Parameterless client-error results can be transformed into ObjectResult/ProblemDetails-style responses. Explicit object-body results are different.

### Recall questions

1. Name three affected results.
2. What interface is involved?
3. Does this customize validation fields?
4. Which factory handles invalid model state?


---

## S-024 — ObjectResult body question

**Known limits:** none

### Near-literal normalized transcript

Question:

```text
so if i return object result with some status code,
it won't be affected by this?
```

Quick answer:

```text
Yes — usually it will not be affected.
```

### Study meaning

If you provide your own response object body, MVC normally treats it as an explicit object result rather than an empty client error to map.

### Recall questions

1. What kind of result is being asked about?
2. Why does an explicit body change behavior?
3. What does “usually” leave room for?
4. How should this be tested?


---

## S-025 — NotFound() versus NotFound(object)

**Known limits:** none

### Near-literal normalized transcript

Important distinction:

This may be affected:

```csharp
return NotFound();
```

This usually will not be affected:

```csharp
return NotFound(new
{
    message = "Product not found"
});
```

Because `NotFound(object)` returns an `ObjectResult`-style response with your provided body.

### Study meaning

Empty status-code results are candidates for client-error mapping. Object-body results already have an application-supplied payload.

### Recall questions

1. Which NotFound form has no body?
2. Which form provides a body?
3. Why does mapping usually not replace the object body?
4. How does this affect custom error envelopes?


---

## S-026 — Summary of affected and not affected results

**Known limits:** none

### Near-literal normalized transcript

```text
NotFound()
  -> no body
  -> can become ProblemDetails using ClientErrorMapping

NotFound(myObject)
  -> already has body
  -> usually not replaced
```

### Study meaning

This is the practical rule for deciding whether ClientErrorMapping will matter for a given action result.

### Recall questions

1. When can MVC add ProblemDetails?
2. When is your object body kept?
3. Which option disables automatic mapping?
4. What integration tests prove this?
