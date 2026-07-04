# ApiBehaviorOptions — R01-invalid-model-state-factory

Generated: 2026-07-04

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
