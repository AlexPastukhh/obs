# ApiBehaviorOptions — code reference v002

## Common configuration

```csharp
builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressModelStateInvalidFilter = false;

        options.InvalidModelStateResponseFactory = context =>
        {
            var problem = new ValidationProblemDetails(
                context.ModelState)
            {
                Title = "Validation failed.",
                Status = StatusCodes.Status400BadRequest,
                Type = "https://docs.example.com/errors/validation",
                Instance = context.HttpContext.Request.Path
            };

            problem.Extensions["traceId"] =
                context.HttpContext.TraceIdentifier;

            return new BadRequestObjectResult(problem)
            {
                ContentTypes = { "application/problem+json" }
            };
        };

        options.SuppressInferBindingSourcesForParameters = false;
        options.DisableImplicitFromServicesParameters = true;
        options.SuppressConsumesConstraintForFormFileParameters = false;
        options.SuppressMapClientErrors = false;

        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://docs.example.com/errors/not-found";

        options.ClientErrorMapping[StatusCodes.Status400BadRequest].Link =
            "https://docs.example.com/errors/bad-request";
    });
```

## Explicit binding style

```csharp
public IActionResult Search(
    [FromQuery] string q,
    [FromHeader(Name = "X-Tenant")] string tenant,
    [FromBody] SearchBody body)
{
    return Ok();
}
```

## Explicit service parameter

```csharp
[HttpGet]
public IActionResult Get(
    [FromServices] IProductService products)
{
    return Ok();
}
```

## File upload with explicit consumes

```csharp
[HttpPost("upload")]
[Consumes("multipart/form-data")]
public IActionResult Upload(IFormFile file)
{
    return Ok();
}
```

## Client error mapping test shape

```csharp
[HttpGet("empty-404")]
public IActionResult Empty404()
{
    return NotFound();
}

[HttpGet("body-404")]
public IActionResult Body404()
{
    return NotFound(new
    {
        message = "Product not found"
    });
}
```

Expectation:

```text
NotFound()      -> candidate for MVC client-error ProblemDetails mapping
NotFound(body)  -> explicit body; usually not replaced
```
