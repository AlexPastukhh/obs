# Problem Details — repetition guide v002

## Core model

1. `ProblemDetailsFactory` constructs MVC-convention models.
2. `IProblemDetailsService` orchestrates customization and writer selection.
3. `IProblemDetailsWriter` owns a concrete output representation.
4. `ProblemDetailsContext` carries HttpContext, model, optional exception, and additional metadata.
5. `TryWriteAsync` can return `false`; fallback behavior is the caller's responsibility.
6. `Response.HasStarted` must be checked by the calling middleware or event handler.
7. `CustomizeProblemDetails` is shared normalization, not status-code selection.
8. API authentication paths should normally return 401/403 documents rather than cookie redirects.
9. Public ProblemDetails must be safe: stable type/code/trace ID, no secrets or stack traces.
10. Empty bodies can still be valid where clients rely on status and headers.

## Comparison questions

1. Compare `ProblemDetailsFactory`, `IProblemDetailsService`, and `IProblemDetailsWriter`.
2. Compare `WriteAsync` with `TryWriteAsync`.
3. Compare a framework/MVC implicit problem response with an explicit middleware write.
4. Compare 401 and 403 authentication event handling.
5. Compare `type`, `title`, `detail`, `instance`, and `extensions`.
6. Compare a custom writer with `CustomizeProblemDetails`.
7. Compare a negotiated writer failure with a response that has already started.
8. Compare direct `WriteAsJsonAsync` fallback with the normal service/writer path.
9. Explain when 406 differs from 415.
10. Explain why exception context can exist in middleware but not in an ordinary controller result.

## Scenario questions

1. A client sends `Accept: text/plain`, but only the JSON problem writer is registered. What can TryWriteAsync return, and what must the caller do?
2. Cookie authentication redirects `/api/orders` to login. How should the API path be changed?
3. A response body has already started when an exception occurs. Why can't middleware safely replace it?
4. An endpoint needs a specialized problem representation only when marked with metadata. Design `CanWrite`.
5. A production exception contains a connection string. What public fields should be returned instead?
6. A 405 response has no body. Which header remains important, and when is that acceptable?
7. A custom writer is registered before the built-in writer and accepts every context. What behavior changes?
8. A fallback calls `WriteAsJsonAsync` after TryWriteAsync returns false. Which normal pipeline features may be bypassed?

## Coding prompts

1. Complete `WriteProblemWithFactoryAsync` with HasStarted, Clear, TryWriteAsync, and a safe fallback.
2. Implement API-specific cookie login/access-denied events.
3. Implement a metadata-selected custom writer.
4. Add trace ID and a stable error code through CustomizeProblemDetails.
5. Write integration tests for `Accept: application/problem+json`, unsupported Accept, browser redirects, and response-started behavior.

## Current limitation

This guide uses the exact recovered screenshots and all 118 SVG labels, but final source-by-source certification remains pending for 50 unique screenshot contents.
