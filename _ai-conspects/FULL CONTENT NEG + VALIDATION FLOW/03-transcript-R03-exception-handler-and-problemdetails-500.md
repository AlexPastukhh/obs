# Regional transcript — R03: Exception handling middleware and ProblemDetails for 500

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 45 / 45
image uses processed: 8 / 8
unique screenshots represented: 8
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Unhandled exceptions need a high pipeline boundary that can create a stable 500
response when the response has not already started.

### Environment behavior

- Development may use `UseDeveloperExceptionPage`.
- Production should use `UseExceptionHandler` or an `IExceptionHandler`.
- `IExceptionHandlerFeature` exposes the unhandled exception to the handler.
- The exception must be logged before the sanitized response is returned.

### ProblemDetails creation

- Resolve `ProblemDetailsFactory` from request services.
- Use status 500, a stable public title/type and the request path as `instance`.
- Add `TraceIdentifier` as a correlation extension.
- Include exception details only in a controlled development environment.
- Call `Response.Clear()` only when `Response.HasStarted` is false.

### Mapping

Known exceptions can map to 400, 404, 409 or another documented status before
the catch-all 500 rule. Exception middleware is the last-resort boundary; normal
validation and domain outcomes should not be implemented by throwing
unexpected exceptions.

## Representative source labels

- add exception handler middleware so youll return problemdetails with 500 status code on exception
- from anywhere(where they werent handled)
- ausing Microsoft.AspNetCore.Diagnostics;
- using Microsoft.AspNetCore.Mvc;
- using Microsoft.AspNetCore.WebUtilities;
- if (app.Environment.IsDevelopment())
- {
- app.UseDeveloperExceptionPage();
- }
- else
- app.UseExceptionHandler(errorApp =>
- errorApp.Run(async context =>
- // If the response already started, we can't write our problem details
- if (context.Response.HasStarted)
- return;
- var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
- var ex = exceptionHandlerFeature?.Error;
- // Resolve ProblemDetailsFactory from DI
- var problemDetailsFactory = context.RequestServices.GetRequiredService<ProblemDetailsFactory>();
- // You can map exception types to status codes if you want
- var statusCode = StatusCodes.Status500InternalServerError;
- // Create ProblemDetails using the factory (consistent defaults)
- var problem = problemDetailsFactory.CreateProblemDetails(
- context,
- statusCode: statusCode,
- title: "An unexpected error occurred.",
- type: "https://httpstatuses.com/500",
- detail: app.Environment.IsDevelopment() ? ex?.ToString() : null,
- instance: context.Request.Path
- );

## Covered text elements

```text
T-006, T-007, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023, T-024, T-025, T-026, T-027
T-028, T-029, T-030, T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-042
T-043, T-044, T-045, T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-277
```

## Covered screenshot uses

```text
IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-027
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
