# R02 — ProblemDetailsFactory, IProblemDetailsService and implicit versus explicit pipeline

Generated: 2026-06-27 UTC

```text
Image uses: 12
SVG text nodes: 9
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region separates model creation from response writing.

- `ProblemDetailsFactory` creates `ProblemDetails` or `ValidationProblemDetails` instances using MVC conventions and current HTTP context.
- `IProblemDetailsService` owns the write path. It receives a `ProblemDetailsContext`, chooses an `IProblemDetailsWriter`, performs configured customization, and writes the response.
- In controllers, helpers such as `Problem`, `ValidationProblem`, automatic model-state responses, and MVC result executors already participate in MVC's problem-details pipeline.
- Outside MVC—middleware, authentication events, exception handlers, endpoint filters, or custom infrastructure—use `IProblemDetailsService` explicitly when a standards-shaped response is required.
- `WriteAsync` expects a writable result; `TryWriteAsync` reports whether any registered writer can satisfy the request, especially the client's `Accept` header.
- If no writer can handle the response, the caller must decide on a fallback such as plain text, an empty status response, or another representation.
- The screenshots warn against blindly invoking the service after the response has started or in a path already owned by MVC, because that can duplicate or conflict with the implicit pipeline.
- The factory and service are complementary: the factory is about constructing the model; the service is about customization, writer selection, content negotiation, and emitting bytes.

## Covered image uses

S-002, S-005, S-008, S-009, S-015, S-019, S-071, S-074, S-078, S-080, S-082, S-084

## Covered SVG text nodes

T-005, T-008, T-009, T-015, T-017, T-024, T-026, T-110, T-111

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
