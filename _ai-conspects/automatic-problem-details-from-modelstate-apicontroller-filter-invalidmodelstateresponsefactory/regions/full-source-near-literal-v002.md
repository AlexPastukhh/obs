# Automatic ProblemDetails from ModelState — source-preserving transcript

Source: complete SVG, 24 screenshots and 19 SVG text nodes.  
Method: near-literal visual transcription with normalized formatting.

## Canvas notes

Important canvas labels:

```text
WHEN YOU HAVE RULES THAT CAN MAKE MODELSTATE INVALID
AND YOU DID NOT REMOVE THE AUTOMATIC INVALID-MODELSTATE RESPONSE,
InvalidModelStateResponseFactory builds and returns IActionResult.

You can obtain that configured callback and execute it with the current ActionContext
to perform manual validation while keeping the current response configuration.

TRYVALIDATEMODEL
HELPER FOR MANUAL VALIDATION
CREATE PROBLEMDETAILS FROM MODELSTATE

Patch side road:
- check whether JsonPatchDocument is valid first;
- System.Text.Json patch may require manually writing patch errors into ModelState;
- with upsert: create if id/resource is missing, otherwise update as a normal patch.
```

## Source transcript

### S-001 — Reusing configured invalid-model response

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Options;

[ApiController]
public abstract class ApiControllerBase : ControllerBase
{
    public override ActionResult ValidationProblem(
        [ActionResultObjectValue]
        ModelStateDictionary modelStateDictionary)
    {
        var apiBehavior = HttpContext.RequestServices
            .GetRequiredService<IOptions<ApiBehaviorOptions>>();

        return (ActionResult)apiBehavior.Value
            .InvalidModelStateResponseFactory(ControllerContext);
    }
}
```

The override reuses the globally configured `InvalidModelStateResponseFactory` instead of hardcoding a different validation response.

### S-002 — Configuring the factory

```csharp
builder.Services.AddProblemDetails();

builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var factory = context.HttpContext.RequestServices
                .GetRequiredService<ProblemDetailsFactory>();

            var problem = factory.CreateValidationProblemDetails(
                context.HttpContext,
                context.ModelState);
```

### S-003 — Custom response defaults

```csharp
            problem.Status =
                StatusCodes.Status422UnprocessableEntity;
            problem.Title = "Validation failed";
            problem.Detail =
                "See the errors property for details.";
            problem.Instance =
                context.HttpContext.Request.Path;

            return new UnprocessableEntityObjectResult(problem);
        };
    });

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseMiddleware<ValidateBodyContentTypeMiddleware>();
```

The configured invalid-model response is therefore a 422 validation problem response rather than the default 400.

### S-004 — Automatic short-circuit

With `[ApiController]` on a controller:

1. ASP.NET Core performs model binding and validation.
2. If `ModelState` is invalid, the framework automatically short-circuits.
3. It calls `ApiBehaviorOptions.InvalidModelStateResponseFactory`.
4. The callback creates the `IActionResult` that is returned.

The delegate is invoked for actions annotated by `[ApiController]` to convert invalid `ModelState` into an `IActionResult`.

### S-005 — Automatic validation mental model

```text
Request arrives
    ↓
MVC binds body/query/route values to action parameters
    ↓
validation attributes run: [Required], [StringLength], etc.
    ↓
binding and formatting errors also populate ModelState
    ↓
if ModelState.IsValid == false:
    framework skips the action body
    framework calls InvalidModelStateResponseFactory(context)
    result is returned
```

The default behavior uses `ProblemDetailsFactory` to create `ValidationProblemDetails`.

### S-006 — Manual validation flow, common in PATCH

Inside the action, a PATCH flow may:

```text
load entity
map entity to DTO
patch.ApplyTo(dto, ModelState)
TryValidateModel(dto)
if invalid:
    return ValidationProblem(ModelState)
map DTO back to entity
save
```

This is manual invalid-state handling. The framework does not auto-return at that point because execution is already inside the action. Overriding `ValidationProblem(...)` allows this manual path to reuse the same configured `InvalidModelStateResponseFactory`.

### S-007 — What the factory is

`InvalidModelStateResponseFactory` is a delegate on `ApiBehaviorOptions`.

```text
input:  ActionContext
output: IActionResult
```

It is the application hook for customizing invalid-model responses: status, body, logging, metadata, and related policy. By default it uses `ProblemDetailsFactory` to produce `ValidationProblemDetails`.

### S-008 — `ActionResultObjectValue`

`ActionResultObjectValue` is primarily metadata for MVC analyzers and tooling. It marks which constructor/helper parameter or property is the result’s object value.

```csharp
public override ActionResult ValidationProblem(
    [ActionResultObjectValue]
    ModelStateDictionary modelStateDictionary)
```

The attribute does not change validation runtime behavior.

### S-009 — Analyzer meaning

The attribute helps analyzers/API metadata understand:

```text
“this parameter is the response object-value-like parameter”
```

ASP.NET Core applies the attribute to multiple `ControllerBase` result helpers such as `Created`, `Accepted`, and `StatusCode`.

### S-010 — What the overridden method returns

```csharp
return (ActionResult)apiBehavior.Value
    .InvalidModelStateResponseFactory(ControllerContext);
```

This returns whatever the global factory returns, for example:

- `BadRequestObjectResult` — 400;
- `UnprocessableEntityObjectResult` — 422;
- a custom `ObjectResult` with a custom payload.

The pattern means: when manual code calls `ValidationProblem(ModelState)`, use the same response shape/status as automatic `[ApiController]` invalid-model responses.

### S-011 — PATCH action, first half

```csharp
[HttpPatch("{courseId:guid}")]
public async Task<IActionResult> PatchCourse(
    Guid authorId,
    Guid courseId,
    JsonPatchDocument<CourseForUpdateDto> patchDocument)
{
    if (patchDocument is null)
        return BadRequest();

    // 1) Load entity
    var entity =
        await _repo.GetCourseAsync(authorId, courseId);

    if (entity is null)
        return NotFound();
```

### S-012 — PATCH action, second half

```csharp
    // 2) Map entity -> DTO (patch target)
    var dto = new CourseForUpdateDto
    {
        Title = entity.Title,
        Description = entity.Description
    };

    // 3) Apply patch; invalid patch operations enter ModelState
    patchDocument.ApplyTo(dto, ModelState);

    // 4) Validate resulting DTO
    if (!TryValidateModel(dto))
        return ValidationProblem(ModelState);

    // 5) Map DTO -> entity and save
    entity.Title = dto.Title;
    entity.Description = dto.Description;

    await _repo.SaveChangesAsync();
    return NoContent();
}
```

### S-013 — Upsert/create branch

If the entity does not exist, the action can create a DTO, apply the patch, validate it, then create a new entity.

```csharp
if (entity is null)
{
    var dto = new CourseForUpdateDto();

    patchDocument.ApplyTo(dto, ModelState);

    if (!TryValidateModel(dto))
        return ValidationProblem(ModelState);

    var newEntity = new Course
    {
        Id = courseId,
        AuthorId = authorId,
        Title = dto.Title,
        Description = dto.Description
    };

    _repo.AddCourse(newEntity);
    await _repo.SaveChangesAsync();

    return CreatedAtAction(
        nameof(PatchCourse),
        new { authorId, courseId },
        null);
}
```

### S-014 — Newtonsoft JSON Patch overload

```csharp
// Newtonsoft MVC extension overload:
// patch errors -> ModelState
patchDocument.ApplyTo(dto, ModelState);

// First check patch-operation errors
if (!ModelState.IsValid)
{
    return ValidationProblem(ModelState);
}

// Then validate final DTO state
if (!TryValidateModel(dto))
{
    return ValidationProblem(ModelState);
}
```

### S-015 — System.Text.Json JSON Patch callback

```csharp
// System.Text.Json JsonPatch:
// use callback to move patch errors into ModelState
patchDocument.ApplyTo(dto, jsonPatchError =>
{
    var key =
        jsonPatchError.AffectedObject?.GetType().Name
        ?? nameof(CourseForUpdateDto);

    ModelState.AddModelError(
        key,
        jsonPatchError.ErrorMessage);
});

// Stop on patch-operation errors first
if (!ModelState.IsValid)
{
    return ValidationProblem(ModelState);
}

// Then run DTO validation attributes
if (!TryValidateModel(dto))
{
    return ValidationProblem(ModelState);
}
```

### S-016 — `ActionContext` and `ControllerContext`

`ActionContext` is the general MVC execution context. It includes:

- `HttpContext`;
- `RouteData`;
- `ActionDescriptor`;
- `ModelState`.

`ControllerContext` derives from `ActionContext` and additionally exposes controller-specific state such as:

- `ControllerActionDescriptor`;
- `ValueProviderFactories`.

### S-017 — Why `ControllerContext` can be passed

`ControllerContext` inherits `ActionContext`, so this is valid:

```csharp
InvalidModelStateResponseFactory(ControllerContext)
```

The callback accepts an `ActionContext`; a `ControllerContext` is an `ActionContext`.

### S-018 — `TryValidateModel`

`TryValidateModel(model)` validates the object and populates the controller’s `ModelState`. It returns `true` or `false` based on whether ModelState is valid.

Correct flow:

```text
TryValidateModel(dto) runs validation
validation errors enter the current controller ModelState
ModelState can then be used to build the response
```

### S-019 — Factory argument

`InvalidModelStateResponseFactory`:

```text
accepts ActionContext
returns IActionResult
```

It receives `ActionContext`, not only `ModelStateDictionary`, because it may need:

- `HttpContext`;
- route/action context;
- `ModelState`;
- request services such as `ProblemDetailsFactory` or logging;
- request path for `ProblemDetails.Instance`.

### S-020 — Suppressing the automatic filter

To let an action execute even when ModelState is invalid:

```csharp
services.Configure<ApiBehaviorOptions>(o =>
{
    o.SuppressModelStateInvalidFilter = true;
});
```

After suppression, application code must check ModelState manually:

```csharp
if (!ModelState.IsValid)
    return BadRequest(ModelState);
```

A stronger version is to return the configured factory result rather than a different ad-hoc payload.

### S-021 — Plain MVC versus `[ApiController]`

Plain MVC, without `[ApiController]`:

- the action still runs when binding or validation fails;
- the action can inspect `ModelState.IsValid`;
- there is no built-in “stop and return 400” filter by default.

Web API with `[ApiController]`:

- a built-in model-state-invalid filter runs before the action;
- if ModelState is invalid, the framework returns 400 automatically;
- the action body does not run.

### S-022 — Common automatic-invalid cases

Empty or missing JSON body for a complex `[FromBody]` parameter:

- the DTO becomes null, or the formatter reports an error;
- ModelState receives an error such as “A non-empty request body is required”;
- the framework returns 400;
- the action is not executed.

Missing required fields or data-annotation failures:

- ModelState becomes invalid;
- the framework returns 400 before action execution.

### S-023 — Without `[ApiController]`

In classic MVC without `[ApiController]`:

- the action runs even with an empty body or invalid model;
- `ModelState.IsValid` is false;
- the parameter may be null;
- application code decides how to respond.

### S-024 — Suppressing implicit required behavior

To stop non-nullable reference properties from being treated as implicitly required:

```csharp
builder.Services.AddControllers()
    .AddMvcOptions(o =>
    {
        o.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes =
            true;
    });
```

This changes the implicit validation rule; explicit `[Required]` attributes still express requiredness.

## Integrated study summary

- `[ApiController]` normally short-circuits before the action when ModelState is invalid.
- `InvalidModelStateResponseFactory` is the central policy that converts invalid ModelState into an action result.
- Reusing the configured factory keeps automatic and manual validation responses consistent.
- `TryValidateModel` validates objects created or mutated inside the action.
- JSON Patch requires two validation layers: patch-operation errors and validation of the final DTO.
- `ControllerContext` can be passed because it derives from `ActionContext`.
- Stage0 and image coverage were already complete; the missing part was a source-preserving transcript, not source reconstruction.
