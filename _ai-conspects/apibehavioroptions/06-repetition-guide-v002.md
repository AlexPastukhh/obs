# ApiBehaviorOptions — repetition guide v002

## One-minute model

```text
InvalidModelStateResponseFactory -> invalid ModelState response shape
SuppressModelStateInvalidFilter -> disables automatic invalid-model-state 400
SuppressInferBindingSourcesForParameters -> disables source inference
DisableImplicitFromServicesParameters -> disables implicit DI parameter inference
SuppressConsumesConstraintForFormFileParameters -> disables automatic multipart consumes constraint for IFormFile
SuppressMapClientErrors -> disables MVC client-error ProblemDetails mapping
ClientErrorMapping -> per-status title/link metadata for client errors
```

## Compare

1. invalid model-state response vs client-error mapping.
2. `NotFound()` vs `NotFound(object)`.
3. binding-source inference vs explicit `[From...]` attributes.
4. action service parameter vs constructor injection.
5. `[Consumes]` convention vs explicit `[Consumes]`.
6. ValidationProblemDetails vs anonymous validation envelope.
7. ProblemDetailsFactory vs IProblemDetailsService vs InvalidModelStateResponseFactory.
8. suppressing a convention vs customizing the convention.

## Checklist

```text
[ ] property names are exact
[ ] validation response keeps field errors
[ ] invalid model state behavior tested
[ ] explicit body client errors tested
[ ] empty 4xx client errors tested
[ ] binding source conventions documented
[ ] file upload content type behavior tested
[ ] ProblemDetails type/title links are stable
[ ] no raw internal errors exposed
```
