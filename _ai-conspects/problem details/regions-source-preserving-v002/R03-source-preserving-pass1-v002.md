# R03 — worked middleware/authentication flows and TryWriteAsync — source-preserving pass 1

Generated: 2026-06-30

This pass includes only source images whose decoded bytes were recovered exactly.
Pending IDs remain listed in the coverage ledger and are not reconstructed from memory.

## S-006 — IProblemDetailsService does not guard Response.HasStarted

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Question: does `IProblemDetailsService` check `HttpContext.Response.HasStarted`?

No. The service itself does not perform that guard. Its write flow:

- validates the supplied context;
- runs configured ProblemDetails customization;
- iterates registered `IProblemDetailsWriter` implementations;
- calls capability selection such as `CanWrite(...)`;
- invokes `WriteAsync(...)` on the first suitable writer.

Therefore the calling middleware or handler must check:

```csharp
if (context.Response.HasStarted)
{
    return;
}
```

before clearing headers or attempting to replace the response body.

### Study meaning

Response lifecycle safety belongs to the caller. Writer selection cannot make an already-started response writable again.

### Recall questions

1. Who must check Response.HasStarted?
2. What does IProblemDetailsService do instead?
3. Why can no writer safely replace a response after it has started?

## S-007 — Middleware helper: lifecycle guard and response reset

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** first part of a continued code example

### Near-literal normalized transcript

The helper begins:

```csharp
private static async Task WriteProblemWithFactoryAsync(
    HttpContext context,
    IProblemDetailsService problemDetailsService,
    ProblemDetailsFactory problemDetailsFactory,
    int statusCode,
    string title,
    string detail)
{
    if (context.Response.HasStarted)
    {
        return;
    }

    context.Response.Clear();
    context.Response.StatusCode = statusCode;
```

The remaining model creation, service write, and fallback continue in S-018 and S-025.

### Study meaning

A replacement error payload should first establish that writing is still legal, then clear stale response state and set the intended status.

### Recall questions

1. Why does the method return when HasStarted is true?
2. What does Response.Clear remove?
3. Why must StatusCode be set before writing?

## S-014 — Why middleware calls Response.Clear

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Middleware may run after another component already touched the response status, headers, or body.

Calling:

```csharp
context.Response.Clear();
```

before writing a replacement error can avoid:

- stale headers;
- an incorrect old `Content-Type`;
- partially configured output.

The rule is strict: only clear before the response has started.

```csharp
if (context.Response.HasStarted)
{
    return;
}
```

After headers or body bytes have started, changing or clearing the response is too late.

### Study meaning

Clear is not a recovery mechanism for a committed response. It is preparation for a replacement response while the response remains mutable.

### Recall questions

1. What stale state can Response.Clear remove?
2. When is Clear legal?
3. What should code do after HasStarted becomes true?

## S-018 — Create ProblemDetails and call TryWriteAsync

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Continuation of the helper:

```csharp
var problem = problemDetailsFactory.CreateProblemDetails(
    httpContext: context,
    statusCode: statusCode,
    title: title,
    detail: detail,
    instance: context.Request.Path);

var pdContext = new ProblemDetailsContext
{
    HttpContext = context,
    ProblemDetails = problem
};

var written = await problemDetailsService.TryWriteAsync(
    pdContext);
```

### Study meaning

The factory creates a model using MVC conventions; the service then customizes, selects a writer, negotiates representation, and attempts to emit it.

### Recall questions

1. What responsibilities belong to ProblemDetailsFactory?
2. What is carried in ProblemDetailsContext?
3. Why use TryWriteAsync instead of assuming a writer exists?

## S-025 — Plain-text fallback when no writer handled the response

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Continuation after `TryWriteAsync`:

```csharp
if (!written)
{
    context.Response.ContentType = "text/plain";

    await context.Response.WriteAsync(
        $"{statusCode} {title}: {detail}");
}
```

The fallback is explicit because `TryWriteAsync` returning `false` means no registered writer produced the response.

### Study meaning

A false result must not be treated as success. The caller owns the fallback representation and should keep it simple and safe.

### Recall questions

1. What does written == false mean?
2. Who owns fallback behavior?
3. Why is a plain-text fallback useful?

## S-028 — Contents of ProblemDetailsContext

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

`TryWriteAsync` receives a `ProblemDetailsContext`.

The context includes:

- `HttpContext`;
- `ProblemDetails`;
- `Exception`, when the surrounding pipeline supplies one;
- `AdditionalMetadata`.

Custom writers can therefore inspect more than the body model alone.

### Study meaning

ProblemDetailsContext is the shared envelope through customization and writer execution. Exception and endpoint metadata are pipeline-dependent additions.

### Recall questions

1. Which two properties are always central?
2. When can Exception be available?
3. What can AdditionalMetadata contain?

## S-030 — Exception middleware context, metadata, TryWrite, and fallback

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

An exception-handling path can build:

```csharp
var pdContext = new ProblemDetailsContext
{
    HttpContext = httpContext,
    Exception = exception,
    ProblemDetails = new ProblemDetails
    {
        Status = StatusCodes.Status500InternalServerError,
        Title = "Unhandled server error",
        Detail = "An unexpected error occurred.",
        Instance = httpContext.Request.Path
    },
    AdditionalMetadata =
        httpContext.GetEndpoint()?.Metadata
};

var written = await _pds.TryWriteAsync(pdContext);

if (!written)
{
    httpContext.Response.ContentType = "text/plain";
    await httpContext.Response.WriteAsync(
        "An unexpected error occurred.");
}
```

### Study meaning

Exception middleware has access to exception and endpoint context that a controller-created result may not have. Public detail remains sanitized.

### Recall questions

1. Which status and title are used?
2. Why is the exception supplied separately from public detail?
3. What is passed as AdditionalMetadata?
4. What happens when no writer accepts?

## S-032 — What custom writers can inspect

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Examples of richer writer context:

- exception-handler middleware can attach the exception;
- endpoint metadata can be passed through;
- custom writers can inspect more than the ProblemDetails body and `HttpContext`.

### Study meaning

Writer selection and formatting can be endpoint-aware and pipeline-aware, but this power should not leak unsafe internal data.

### Recall questions

1. Which pipeline can attach an Exception?
2. How can endpoint metadata influence a writer?
3. Why must internal information be filtered before serialization?

## S-037 — Cookie OnRedirectToLogin: browser redirect versus API 401

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
options.Events.OnRedirectToLogin = async ctx =>
{
    if (!ctx.Request.Path.StartsWithSegments("/api"))
    {
        ctx.Response.Redirect(ctx.RedirectUri);
        return;
    }

    ctx.Response.StatusCode =
        StatusCodes.Status401Unauthorized;

    var http = ctx.HttpContext;
    var factory = http.RequestServices
        .GetRequiredService<ProblemDetailsFactory>();
    var pds = http.RequestServices
        .GetRequiredService<IProblemDetailsService>();

    var pd = factory.CreateProblemDetails(
        httpContext: http,
        statusCode: StatusCodes.Status401Unauthorized,
        title: "Unauthorized",
        type: "https://httpstatuses.com/401",
        detail: "Authentication is required to access this resource.",
        instance: http.Request.Path);

    await pds.WriteAsync(
        new ProblemDetailsContext
        {
            HttpContext = http,
            ProblemDetails = pd
        });
};
```

### Study meaning

Cookie authentication is page-oriented by default. API paths should return a 401 problem response instead of HTML navigation.

### Recall questions

1. Why are non-API requests redirected?
2. Which status is returned for API requests?
3. Which two services are resolved?
4. How does this differ from forbid?

## S-038 — Purpose of the custom metadata writer

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

The custom writer example:

- handles only endpoints marked with a custom endpoint attribute;
- adds exception type as a demonstration of internal context access;
- adds endpoint metadata information into ProblemDetails extensions.

The source cautions that exception type may need to be removed from production responses.

### Study meaning

A specialized writer can own one endpoint policy without capturing every problem response globally.

### Recall questions

1. How does the writer restrict its scope?
2. Which two extra data sources does it use?
3. Why may exception type be unsafe in production?

## S-045 — Meaning of the TryWriteAsync boolean

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

`TryWriteAsync(...)` returns a `bool` through `ValueTask<bool>`.

Writer processing completes when:

- one writer successfully handles the response; or
- no registered writer can handle it.

Therefore:

```text
written == true
    a writer handled the response

written == false
    no writer could write it
```

A common false case is an `Accept` header that does not match supported problem media types. The built-in default is JSON-oriented, so explicit fallback logic is useful.

### Study meaning

The boolean is a representation-selection result, not merely an indication that no exception was thrown.

### Recall questions

1. What does true guarantee?
2. What does false require from the caller?
3. How can Accept cause false?

## S-046 — Custom writer CanWrite using endpoint metadata

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
public sealed class CustomMetadataProblemDetailsWriter
    : IProblemDetailsWriter
{
    public bool CanWrite(ProblemDetailsContext context)
    {
        // Example: only handle endpoints tagged with a custom marker
        var hasMarker = context.AdditionalMetadata?
            .OfType<UseCustomProblemWriterAttribute>()
            .Any() == true;

        return hasMarker;
    }
```

### Study meaning

CanWrite should be narrow enough that a custom writer does not intercept unrelated problem responses.

### Recall questions

1. Where is the custom marker read from?
2. What happens when the marker is absent?
3. Why does writer ordering still matter?

## S-050 — Cookie OnRedirectToAccessDenied: browser redirect versus API 403

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
options.Events.OnRedirectToAccessDenied = async ctx =>
{
    if (!ctx.Request.Path.StartsWithSegments("/api"))
    {
        ctx.Response.Redirect(ctx.RedirectUri);
        return;
    }

    ctx.Response.StatusCode =
        StatusCodes.Status403Forbidden;

    var http = ctx.HttpContext;
    var factory = http.RequestServices
        .GetRequiredService<ProblemDetailsFactory>();
    var pds = http.RequestServices
        .GetRequiredService<IProblemDetailsService>();

    var pd = factory.CreateProblemDetails(
        httpContext: http,
        statusCode: StatusCodes.Status403Forbidden,
        title: "Forbidden",
        type: "https://httpstatuses.com/403",
        detail: "You do not have permission to access this resource.",
        instance: http.Request.Path);

    await pds.WriteAsync(
        new ProblemDetailsContext
        {
            HttpContext = http,
            ProblemDetails = pd
        });
};
```

### Study meaning

Forbid means an acceptable authenticated principal exists but lacks permission. It should not be mislabeled as authentication failure.

### Recall questions

1. Which status represents access denied?
2. How does 403 differ from 401?
3. Why preserve redirects for browser pages?

## S-052 — Custom writer WriteAsync: exception and endpoint extensions

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** first half of a continued writer implementation

### Near-literal normalized transcript

```csharp
public ValueTask WriteAsync(
    ProblemDetailsContext context)
{
    var http = context.HttpContext;
    var pd = context.ProblemDetails;

    if (context.Exception is not null)
    {
        pd.Extensions["exceptionType"] =
            context.Exception.GetType().Name;
    }

    var endpointName =
        context.AdditionalMetadata?
            .OfType<EndpointNameMetadata>()
            .FirstOrDefault()?
            .EndpointName;
```

The remaining extension and JSON write continue in S-064.

### Study meaning

The writer mutates the final model using context supplied by the surrounding pipeline. Exception-type disclosure is a demonstration, not a universal production recommendation.

### Recall questions

1. Where is exceptionType stored?
2. How is endpointName discovered?
3. Which context property supplies metadata?

## S-053 — IProblemDetailsWriter chain and built-in JSON writer

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

`IProblemDetailsService.TryWriteAsync(...)` does not directly serialize JSON. It delegates to registered `IProblemDetailsWriter` services in order until one accepts.

The built-in writer is the default JSON problem-details writer.

Its responsibilities include:

- checking `Accept` compatibility with supported JSON/problem JSON media types;
- validating the context;
- applying defaults;
- adding trace information;
- running `CustomizeProblemDetails`;
- writing JSON as `application/problem+json`.

Writers form the pluggable formatting/output layer.

### Study meaning

ProblemDetails service orchestration and writer serialization are separate abstractions. Registration order and capability checks determine the actual representation.

### Recall questions

1. Does IProblemDetailsService serialize directly?
2. What does the default writer produce?
3. When does CustomizeProblemDetails run?
4. Why is writer order significant?

## S-059 — JSON fallback after TryWriteAsync

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
var written = await pds.TryWriteAsync(
    new ProblemDetailsContext
    {
        HttpContext = http,
        ProblemDetails = pd
    });

if (!written)
{
    // fallback if no ProblemDetails writer is available
    http.Response.ContentType =
        "application/problem+json";

    await http.Response.WriteAsJsonAsync(pd);
}
```

### Study meaning

This fallback keeps a structured JSON body even when the registered writer chain declines. Direct serialization bypasses writer customization/selection at this point, so use it deliberately.

### Recall questions

1. When does the fallback execute?
2. Which content type is assigned?
3. What pipeline behavior is bypassed by direct WriteAsJsonAsync?

## S-064 — Custom writer completion and endpoint marker attribute

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Continuation of the custom writer:

```csharp
if (!string.IsNullOrWhiteSpace(endpointName))
{
    pd.Extensions["endpoint"] = endpointName;
}

http.Response.ContentType =
    "application/problem+json";

return new ValueTask(
    http.Response.WriteAsJsonAsync(pd));
```

Marker attribute:

```csharp
[AttributeUsage(
    AttributeTargets.Method |
    AttributeTargets.Class)]
public sealed class UseCustomProblemWriterAttribute
    : Attribute
{
}
```

### Study meaning

The marker makes writer selection explicit at endpoint/class level, while the writer adds endpoint information and owns the JSON output.

### Recall questions

1. Where is the endpoint name stored?
2. Which targets can carry the marker?
3. What content type does the writer set?
