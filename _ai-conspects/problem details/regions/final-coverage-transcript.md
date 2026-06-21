# Problem Details — final coverage transcript v001

## 0.1 Area understanding

This conspect explains ASP.NET Core Problem Details from configuration to emission. It separates MVC/controller behavior from lower-level middleware or non-MVC code, shows where `ProblemDetailsFactory` and `IProblemDetailsService` fit, and finishes with writer selection and content negotiation.

Reading quality: high for concepts and flow; exact code punctuation remains preserved in the source PNGs.

## R01 — configuration and customization

- `AddProblemDetails` registers the Problem Details infrastructure.
- `ProblemDetailsOptions.CustomizeProblemDetails` is the final customization callback before a framework-produced response is written.
- The callback can enrich responses with API-specific metadata such as a trace identifier, links/type URIs and consistent extension fields.
- Central configuration affects responses produced through the framework pipeline, including controller-generated Problem Details and `IProblemDetailsService` calls.
- Keep `title`, `detail`, `type`, `status` and extensions consistent with the API contract rather than treating them as arbitrary text.

## R02 — factory vs service and when to use each

- `ProblemDetailsFactory` creates `ProblemDetails`/`ValidationProblemDetails` instances and is closely associated with MVC conventions.
- `IProblemDetailsService` is the general writing abstraction for middleware and other non-MVC pipeline code.
- In controllers, framework helpers already create standardized responses; in middleware or custom authentication/authorization handlers, the service is useful because there is no controller helper.
- A common API-specific use case is replacing cookie-auth redirects with a 401/403 Problem Details payload for `/api` paths while preserving redirects for browser pages.
- The service does not make every response automatic: the caller still decides when failure occurred, sets status/context, and asks the service to write.

## R03 — TryWriteAsync and integration

- `TryWriteAsync` attempts to select an appropriate registered writer and serialize a Problem Details response.
- The context carries the HTTP context and the Problem Details instance; status should be established before writing.
- In middleware, first avoid writing after the response has started; then construct or customize the problem and call the service.
- A successful write terminates the custom error path. If no writer can handle the response, code needs a fallback strategy rather than assuming output was produced.
- Worked examples demonstrate controller, middleware and authentication-event integration paths.

## R04 — writers chain and content negotiation

- `IProblemDetailsWriter` implementations form a chain. A writer advertises whether it can handle the current context and then writes the payload.
- The default writer handles the normal JSON Problem Details representation.
- Custom writers can target special media types or response shapes, but their registration/order and `CanWrite` conditions matter.
- Content negotiation determines whether a writer is suitable for the request's accepted media types.
- Customization and writing are separate concerns: customization enriches the model; a writer chooses the representation and emits it.

## Final practical model

```text
controller/MVC helper -> factory/conventions -> customization -> writer
middleware/non-MVC -> IProblemDetailsService.TryWriteAsync -> writer chain
```

Coverage: 25 image uses + 118 labels processed; 0 unclosed.
