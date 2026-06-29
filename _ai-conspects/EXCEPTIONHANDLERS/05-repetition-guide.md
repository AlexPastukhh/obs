# Exception Handlers — repetition guide

Generated: 2026-06-29

## Mental model

1. `UseExceptionHandler` wraps only downstream middleware.
2. It captures the exception and exposes it through `IExceptionHandlerFeature`.
3. A replacement response is possible only while `Response.HasStarted == false`.
4. `ProblemDetailsFactory` creates the response model with framework defaults.
5. `IProblemDetailsService` asks registered `IProblemDetailsWriter` instances to write it.
6. `TryWriteAsync` can return `false`, so an application may need a fallback.
7. A custom writer can inspect `Exception` and endpoint `AdditionalMetadata`.
8. `AddProblemDetails().CustomizeProblemDetails` is applied only when the service/writer pipeline is actually used.

## High-value comparison questions

1. Compare `ProblemDetailsFactory`, `IProblemDetailsService`, and `IProblemDetailsWriter`.
2. Compare exception detection with the ability to replace the HTTP response.
3. Explain why `Response.Clear()` and `Response.HasStarted` must be considered together.
4. Explain when `CustomizeProblemDetails` is bypassed.
5. Compare default writer behavior with a custom endpoint-aware writer.
6. Design status-code mappings for not-found, validation, authentication, and unexpected failures.
7. Explain why exception details should differ between development and production.
8. Describe the complete flow from a thrown exception to JSON written to the client.

## Coding prompts

1. Write a production `UseExceptionHandler` callback that maps exception types, adds `traceId`, and avoids writing after response start.
2. Write a helper that uses `ProblemDetailsFactory` and `IProblemDetailsService`, including a text fallback.
3. Write an `IProblemDetailsWriter` that is selected by endpoint metadata.
4. Write tests for `Accept: application/problem+json`, unsupported `Accept`, and `HasStarted`.
