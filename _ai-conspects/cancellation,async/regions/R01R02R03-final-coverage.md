# cancellation,async — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — linked cancellation sources, request aborts and identifying the cause

A linked cancellation source combines several cancellation reasons into one token. A typical request operation links `HttpContext.RequestAborted` with an application timeout or another operation token, passes `linkedSource.Token` to downstream APIs, and disposes the linked source when the operation ends. The linked token is canceled when any input token is canceled.

When handling an `OperationCanceledException`, the linked token alone does not identify the cause. Inspect the original source tokens—request-aborted, timeout, shutdown, or explicit user cancellation. Multiple sources can race, so diagnostics may need to record which ones were requested at the catch point.

For a disconnected client, cancellation normally propagates upward rather than being logged as an application failure. Avoid a broad catch that converts every cancellation into a 500 response. Catch only when you need cleanup, telemetry, or a deliberate mapping, and preserve the cancellation semantics.

**Covered source labels:** `T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-019, T-023, T-024, T-025, T-034, T-035, T-036, T-037`

## R02 — cooperative cancellation for CPU and asynchronous work

Cancellation is cooperative. Long CPU-bound loops should check the token at sensible boundaries, such as the beginning of each iteration or before an expensive chunk, using `ThrowIfCancellationRequested` or `IsCancellationRequested`. Checking on every trivial instruction is unnecessary; checking too rarely makes cancellation unresponsive.

Pass the token to asynchronous APIs that accept it, including database, HTTP, stream, delay, and channel operations. A token does not forcibly stop arbitrary code: the called operation must observe it. Keep the same token flowing through the operation unless a deliberate linked or child scope is created.

**Covered source labels:** `T-001, T-002, T-003, T-020, T-021, T-022`

## R03 — exceptions in async code and cancellation exception hierarchy

Modern async code observes exceptions by awaiting the returned task. Exceptions thrown before or after an `await` are surfaced through that task when awaited; avoid fire-and-forget tasks whose failures have no observer.

`ThrowIfCancellationRequested` throws `OperationCanceledException`. A canceled `Task` is often observed as `TaskCanceledException`, which derives from `OperationCanceledException`. Catching `OperationCanceledException` covers both, but a filter should verify that the expected token was canceled so an unrelated cancellation is not swallowed.

Do not rely on exception type alone to distinguish every cause. Combine the exception’s token when available with the original source-token states and the operation context.

**Covered source labels:** `T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
