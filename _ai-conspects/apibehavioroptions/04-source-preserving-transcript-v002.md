# ApiBehaviorOptions — source-preserving/code transcript v002

Generated: 2026-07-04

## Source verification

```text
source/apibehavioroptions.svg
viewBox: 0 0 3621.398364727314 11510.399022081021
Git blob SHA: f1f96c69fe80e965c4ca7a5b71ef974b33898314
unique screenshots: 26
image uses: 26
native non-empty SVG labels: 13
broken/external/dangling: 0
```

## Coverage

```text
source-specific blocks: 26 / 26
visible code/examples represented: 26 / 26
source-specific question sets: 26 / 26
native labels preserved: 13 / 13
technical corrections: 2 property-name corrections + client-error boundary
remaining sources: 0
```

---

## S-001 — Full common configuration example

**Known limits:** none

### Near-literal normalized transcript

```csharp
builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        // 1. Keep automatic validation,
        //    but customize response.
        options.SuppressModelStateInvalidFilter = false;

        options.InvalidModelStateResponseFactory = context =>
        {
            var problemDetails = new ValidationProblemDetails(
                context.ModelState)
            {
                Title = "Validation failed.",
                Status = StatusCodes.Status400BadRequest,
                Type = "https://docs.example.com/errors/validation",
                Instance = context.HttpContext.Request.Path
            };

            problemDetails.Extensions["traceId"] =
                context.HttpContext.TraceIdentifier;

            return new BadRequestObjectResult(problemDetails)
            {
                ContentTypes = { "application/problem+json" }
            };
        };
```

### Study meaning

This screenshot establishes the central pattern: keep `[ApiController]` automatic 400 behavior, but control the validation response shape through `InvalidModelStateResponseFactory`.

### Recall questions

1. Which option keeps automatic validation enabled?
2. What object contains field-level errors?
3. Why add `traceId`?
4. Which content type is explicitly selected?


---

## S-002 — Continuing common configuration flags

**Known limits:** none

### Near-literal normalized transcript

```csharp
// 2. Keep binding inference enabled.
options.SuppressInferBindingSourcesForParameters = false;

// 3. Require explicit [FromServices] if desired.
options.DisableImplicitFromServicesParameters = true;

// 4. Let file upload constraints be explicit if you prefer.
options.SuppressConsumesConstraintForFormFileParameters = false;
```

### Study meaning

The options tune `[ApiController]` conventions rather than normal business logic. They decide whether MVC infers binding sources, infers service parameters, and auto-adds multipart/form-data constraints for file uploads.

### Technical correction / boundary

Correct property names are `SuppressInferBindingSourcesForParameters` and `SuppressConsumesConstraintForFormFileParameters`. The canvas labels contain shortened/typo variants; the archive uses the real API names.

### Recall questions

1. What does binding-source inference affect?
2. Why would a strict API disable implicit services inference?
3. Which option is related to `IFormFile`?
4. Why keep these policies consistent across a project?


---

## S-003 — Client error mapping in common config

**Known limits:** none

### Near-literal normalized transcript

```csharp
// 5. Keep client error mapping enabled,
//    but customize docs links.
options.SuppressMapClientErrors = false;

options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
    "https://docs.example.com/errors/not-found";

options.ClientErrorMapping[StatusCodes.Status400BadRequest].Link =
    "https://docs.example.com/errors/bad-request";
```

### Study meaning

Client error mapping customizes default metadata for MVC-generated client error ProblemDetails, especially title/type-link documentation for known status codes.

### Recall questions

1. Which option keeps mapping enabled?
2. What is customized for 404?
3. What is customized for 400?
4. Does this customize validation error fields?


---

## S-004 — InvalidModelStateResponseFactory purpose

**Known limits:** none

### Near-literal normalized transcript

`InvalidModelStateResponseFactory`

This controls the response generated when:

```text
[ApiController] action receives invalid model
↓
ModelState.IsValid == false
↓
automatic model-state filter returns response before action runs
```

By default, `[ApiController]` returns a 400 Bad Request for invalid model state. The customization point is `InvalidModelStateResponseFactory`.

### Study meaning

The factory is a callback for the automatic invalid-model-state path. It is not general exception handling and not the same as client-error mapping.

### Recall questions

1. When is the factory invoked?
2. Does the controller action run?
3. What default status is involved?
4. How is this different from exception middleware?


---

## S-005 — Custom validation error shape

**Known limits:** none

### Near-literal normalized transcript

```csharp
builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value!.Errors
                        .Select(e => e.ErrorMessage)
                        .ToArray());

            return new BadRequestObjectResult(new
            {
                error = "validation_failed",
                errors
            });
        };
    });
```

### Study meaning

This example replaces the default ValidationProblemDetails body with a compact custom envelope while preserving field-level messages.

### Recall questions

1. What data is read from ModelState?
2. What shape does the response return?
3. What does the custom `error` code say?
4. What risk exists if you drop field keys?


---

## S-006 — Invalid-model-state flow

**Known limits:** none

### Near-literal normalized transcript

Flow:

```text
Request body fails validation
↓
ModelState contains errors
↓
ApiController model-state filter runs
↓
InvalidModelStateResponseFactory is called
↓
your custom BadRequestObjectResult is returned
↓
controller action is not executed
```

### Study meaning

The automatic filter short-circuits before action execution. This is useful for consistent validation responses and prevents action code from starting when input is invalid.

### Recall questions

1. What component short-circuits?
2. Where are validation errors stored?
3. What result is returned?
4. Why is action code skipped?


---

## S-007 — SuppressModelStateInvalidFilter

**Known limits:** none

### Near-literal normalized transcript

```csharp
options.SuppressModelStateInvalidFilter = true;
```

Means:

```text
Do not automatically return 400 when ModelState is invalid.
Let the controller action run.
```

Microsoft docs describe this as suppressing the filter that returns `BadRequestObjectResult` when `ModelState` is invalid.

### Study meaning

This disables the automatic invalid-model-state short-circuit. You become responsible for checking `ModelState` or using another validation pipeline.

### Recall questions

1. What automatic behavior is suppressed?
2. Who must handle invalid input after this?
3. Why is this uncommon for normal APIs?
4. What result type is mentioned?


---

## S-008 — When to suppress automatic model-state validation

**Known limits:** none

### Near-literal normalized transcript

Use `SuppressModelStateInvalidFilter = true` when:

```text
you want custom per-action validation flow
you do partial/autosave endpoints
you want to aggregate validation with domain errors
you do not want automatic short-circuit before action
```

Usually keep it `false` for normal APIs.

### Study meaning

Suppressing automatic validation can be useful for workflows that need action logic before deciding the final response, but it removes a safe default.

### Recall questions

1. Name two cases where suppression is useful.
2. Why keep it false for normal APIs?
3. What does partial/autosave need?
4. How can domain errors be aggregated?


---

## S-009 — SuppressInferBindingSourcesForParameters

**Known limits:** none

### Near-literal normalized transcript

`SuppressInferBindingSourcesForParameters`

With `[ApiController]`, ASP.NET Core infers binding sources for action parameters.

Example:

```csharp
[HttpGet("{id}")]
public IActionResult Get(int id)
```

`id` is inferred from route.

Example:

```csharp
[HttpPost]
public IActionResult Create(CreateProductRequest request)
```

A complex object is usually inferred from body.

```csharp
options.SuppressInferBindingSourcesForParameters = true;
```

disables this inference.

### Study meaning

Binding-source inference reduces boilerplate but can hide where values come from. Disabling it makes explicit `[FromRoute]`, `[FromQuery]`, `[FromBody]`, `[FromHeader]`, and `[FromServices]` attributes more important.

### Recall questions

1. Which attribute enables these conventions?
2. Where is `id` inferred from?
3. Where is a complex request inferred from?
4. Why might explicit attributes be clearer?


---

## S-010 — When explicit binding sources are clearer

**Known limits:** none

### Near-literal normalized transcript

Use suppression if you dislike hidden inference and want every parameter explicitly marked:

```csharp
public IActionResult Search(
    [FromQuery] string q,
    [FromHeader(Name = "X-Tenant")] string tenant,
    [FromBody] SearchBody body)
```

Practical rule:

```text
Small/simple APIs:
    inference is convenient.

Large strict APIs:
    explicit binding attributes can be clearer.
```

### Study meaning

This is a project-style decision. Explicit sources reduce ambiguity, especially with tenant headers, request bodies, route values, and services.

### Recall questions

1. What three binding attributes appear?
2. Why can large APIs prefer explicitness?
3. What is convenient for small APIs?
4. How does this help review?


---

## S-011 — DisableImplicitFromServicesParameters

**Known limits:** none

### Near-literal normalized transcript

```csharp
options.DisableImplicitFromServicesParameters = true;
```

This controls whether action parameters registered in DI are inferred as `[FromServices]`.

The docs note that it applies when `SuppressInferBindingSourcesForParameters` is `false`.

### Study meaning

When implicit service inference is enabled, MVC may treat a registered service type parameter as coming from DI instead of from the request. Disabling it requires explicit `[FromServices]` for action services.

### Recall questions

1. What source does the option affect?
2. Which other option must allow inference?
3. Why can DI registration accidentally affect binding?
4. What explicit attribute should be used?


---

## S-012 — Implicit services inference example

**Known limits:** none

### Near-literal normalized transcript

Suppose you have a service:

```csharp
builder.Services.AddScoped<IProductService, ProductService>();
```

Action:

```csharp
[HttpGet]
public IActionResult Get(IProductService products)
{
    return Ok();
}
```

With implicit from-services inference enabled, MVC may treat `products` as coming from DI.

### Study meaning

This can be convenient but surprising. In strict APIs, service dependencies are often clearer as constructor dependencies or explicit `[FromServices]` parameters.

### Recall questions

1. What service is registered?
2. What parameter type is in the action?
3. Where may MVC infer the value from?
4. Why might constructor injection be preferable?


---

## S-013 — Explicit FromServices after disabling implicit services

**Known limits:** none

### Near-literal normalized transcript

If you set:

```csharp
options.DisableImplicitFromServicesParameters = true;
```

MVC will not infer `[FromServices]` automatically. You should write:

```csharp
[HttpGet]
public IActionResult Get([FromServices] IProductService products)
{
    return Ok();
}
```

### Study meaning

The parameter source becomes visible in the action signature, avoiding accidental changes if service registration changes.

### Recall questions

1. What happens after disabling implicit inference?
2. Which attribute makes service source explicit?
3. What accidental behavior does this prevent?
4. When is action-level service injection still acceptable?


---

## S-014 — When to require explicit FromServices

**Known limits:** none

### Near-literal normalized transcript

Use this when:

```text
you want explicit [FromServices]
you worry DI service matching changes binding behavior
you prefer action parameters to be clearly sourced
```

### Study meaning

This is a safety/clarity option. It is most useful in large APIs where implicit conventions can make endpoint signatures ambiguous.

### Recall questions

1. What is the main clarity benefit?
2. Which project size tends to benefit?
3. What can change binding behavior accidentally?
4. What alternative injection style avoids this?


---

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
