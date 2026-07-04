# ApiBehaviorOptions — R02-binding-source-and-service-inference

Generated: 2026-07-04

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
