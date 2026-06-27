# cancellation,async — full SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

## Source boundary

This transcript is based on the complete corrected SVG and the recovered embedded screenshots. Candidate regions and nearest labels were used only as hints. Final region boundaries were determined by visual and semantic review of the screenshots themselves.

The earlier label-only transcript is preserved at `regions/R01R02R03-final-coverage.md`, but it is superseded as the current source transcript because the old SVG inventory contained no screenshots.

## R01 — Cancellation fundamentals and why cancellation matters

The recovered screenshots establish the basic producer/consumer model that the old label-only transcript could only infer. `CancellationTokenSource` owns and triggers cancellation; `CancellationToken` is the lightweight value passed to consumers. Cancellation matters for both I/O-bound work (releasing occupied resources and improving scalability) and CPU-bound work (preventing abandoned computation). A token never forcibly stops arbitrary code: the callee must observe it.

**Processed restored image uses:** RS-003, RS-010, RS-014, RS-018

**Assigned SVG text nodes:** none; region is established by recovered screenshots

### Image-by-image evidence

- **RS-003:** Why cancellation matters: releases I/O resources, improves scalability, and avoids wasting CPU on abandoned work.
- **RS-010:** CancellationTokenSource is the controller/producer that owns cancellation and notifies token listeners.
- **RS-014:** CancellationToken is a lightweight value passed to consumers/listeners, usually as a method parameter.
- **RS-018:** Comparison of CancellationToken and CancellationTokenSource, including caller, timeout, and linked-cancellation patterns.

## R02 — Linked CancellationTokenSource and multi-reason cancellation

A linked source combines caller/request cancellation with an internal reason such as timeout, downstream failure, or explicit batch abort. `CreateLinkedTokenSource` returns a new disposable CTS; its token becomes canceled when any linked token is canceled. The recovered code shows the linked token being passed consistently to `GetAsync` and content-reading APIs, and an internal CTS being canceled when a failed response should stop the whole batch. Manual checks before async calls are primarily fail-fast guards and also cover work that does not accept a token. When a linked token fires, inspect the original source tokens to determine the likely cause; the linked token alone does not identify it. Dispose owned and linked sources with `using`.

**Processed restored image uses:** RS-001, RS-004, RS-005, RS-006, RS-007, RS-008, RS-009, RS-012, RS-013, RS-016, RS-017, RS-020

**Assigned SVG text nodes:** T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-034, T-035, T-036, T-037

### Image-by-image evidence

- **RS-001:** Catch linked-token cancellation, inspect original request-abort and timeout tokens to identify likely cause, then rethrow.
- **RS-004:** CreateLinkedTokenSource(requestCt) creates a new CTS whose token cancels when any linked token cancels.
- **RS-005:** BookCoversClient example creates an internal CTS and links it with the external request token.
- **RS-006:** Demo boundary: one operation listens to multiple cancellation tokens.
- **RS-007:** Manual ThrowIfCancellationRequested before an async call is mainly for prompt fail-fast behavior and clarity.
- **RS-008:** Loop uses the linked token for HTTP and content reads; internal CTS can abort the batch on a downstream failure.
- **RS-009:** Why not pass requestCt directly: the operation has both caller cancellation and an internal abort condition.
- **RS-012:** Code creates a local CancellationTokenSource and prepares multiple book-cover URLs.
- **RS-013:** Manual checks are not always required, but avoid extra work and cover steps that do not accept a token.
- **RS-016:** CancellationTokenSource is IDisposable and should be disposed, commonly with using.
- **RS-017:** Code nests a local CTS and a linked CTS; CreateLinkedTokenSource can accept one or multiple tokens.
- **RS-020:** Linked token is passed consistently to GetAsync and ReadAsStringAsync.

## R03 — Cooperative cancellation for CPU-bound work

CPU-bound cancellation is cooperative. A loop can test `IsCancellationRequested` and return/break, but `ThrowIfCancellationRequested` is usually preferable when the operation should complete as canceled rather than as a normal partial result. Check at meaningful work boundaries—before each expensive iteration or chunk—not on every trivial instruction. The recovered screenshots explicitly compare both patterns and show that throwing remains consistent with other cancellable .NET APIs.

**Processed restored image uses:** RS-026, RS-029, RS-031, RS-034, RS-035

**Assigned SVG text nodes:** T-001, T-002, T-003, T-020, T-021, T-022

### Image-by-image evidence

- **RS-026:** CPU-bound work must observe the token; one option is IsCancellationRequested.
- **RS-029:** CPU loop checks IsCancellationRequested and exits with break.
- **RS-031:** ThrowIfCancellationRequested is preferred when cancellation should be represented as an exception.
- **RS-034:** CPU loop calls ThrowIfCancellationRequested before each unit of work.
- **RS-035:** ThrowIfCancellationRequested is consistent with other cancellable APIs because it throws OperationCanceledException.

## R04 — ASP.NET Core request aborts, disconnects, and when to catch

ASP.NET Core supplies request-abort cancellation through `HttpContext.RequestAborted` or a controller action `CancellationToken`. Pass it through every cancellable layer. If the client disconnects, awaited operations throw cancellation and the exception should usually bubble: ASP.NET Core stops processing and aborts the response stream. Trying to construct a response for a disconnected client is generally pointless and can waste CPU or create misleading logs. Catch only for necessary cleanup, metrics, low-severity diagnostics, or a deliberate mapping while a client can still receive it; verify the expected token in a catch filter and normally rethrow. Do not confuse request cancellation with an internal timeout or application abort—linked tokens may require different treatment.

**Processed restored image uses:** RS-002, RS-025, RS-028, RS-030, RS-032, RS-036, RS-038, RS-039, RS-040, RS-041, RS-042

**Assigned SVG text nodes:** T-018, T-019, T-023, T-024, T-025

### Image-by-image evidence

- **RS-002:** ASP.NET Core request-cancellation guidance: normally do not catch or log as an error; pass the request token and use async/await throughout.
- **RS-025:** RequestAborted can be received as an action parameter and must be passed to every cancellable downstream operation.
- **RS-028:** Let request cancellation bubble so ASP.NET Core stops processing and aborts the response when the client is gone.
- **RS-030:** Controller receives CancellationToken and passes it into the service/client method.
- **RS-032:** After propagation ASP.NET Core knows the request is aborted, stops writing the response, and does not treat it as a client-visible 500.
- **RS-036:** Do not try to return a response to a disconnected client; treat request cancellation as normal control flow.
- **RS-038:** When a client disconnects, RequestAborted cancels and awaited operations stop early.
- **RS-039:** Minimal controller passes its CancellationToken directly into the asynchronous service.
- **RS-040:** Catch cancellation only for extra work such as metrics, cleanup, controlled logging, or rare translation while still connected.
- **RS-041:** Filtered catch verifies the expected token was canceled, records telemetry, and rethrows.
- **RS-042:** Distinguish request cancellation from internal timeout/abort cancellation; linked tokens may require different handling.

## R05 — Async exception propagation and cancellation exception hierarchy

With structured `async`/`await`, failures surface at the await point and normal `try/catch` works. The recovered material contrasts this with older patterns where exceptions from `Task.Run` or multiple tasks could be missed or wrapped. `Task.WhenAll`/`Task.WhenAny` coordinate concurrent asynchronous tasks; they do not imply CPU parallelism. Cancellation is represented primarily by `OperationCanceledException`; `TaskCanceledException` derives from it, so catching the base type covers both. General application exceptions may be handled close to the operation, through exception filters, or by exception-handler middleware, but request cancellation remains a normal control-flow condition rather than an application error.

**Processed restored image uses:** RS-011, RS-015, RS-019, RS-021, RS-022, RS-023, RS-024, RS-027, RS-033, RS-037

**Assigned SVG text nodes:** T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033

### Image-by-image evidence

- **RS-011:** Older async patterns could hide or wrap failures; try/catch around Task.Run and multiple tasks required special handling.
- **RS-015:** Using async/await all the way through makes asynchronous exception flow behave like normal structured code.
- **RS-019:** General async exception options: catch near the operation, exception filters, and exception-handler middleware.
- **RS-021:** Catch OperationCanceledException; TaskCanceledException derives from it.
- **RS-022:** Execute multiple tasks asynchronously with await/WhenAll/WhenAny rather than confusing concurrency with parallelism.
- **RS-023:** Summary: a CTS signals cancellation to tokens/listeners, including request-abort scenarios.
- **RS-024:** Summary: OperationCanceledException covers cancellation; TaskCanceledException is a derived type.
- **RS-027:** Async/await surfaces failures at the await point and allows ordinary try/catch.
- **RS-033:** Awaited HTTP failures can be caught with normal try/catch for HttpRequestException.
- **RS-037:** Cancellation is represented by OperationCanceledException/TaskCanceledException; request cancellation normally need not be caught.


## Closure

All 42 restored image uses and all 37 SVG text nodes are assigned exactly once. No image or text node remains unreviewed.
