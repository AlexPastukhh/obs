# dbcontext interseptors savechanges , dbcommand — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — SaveChanges interception, success/failure and concurrency paths

EF Core SaveChanges interceptors observe and optionally alter the save pipeline. The pre-save callback can inspect the `DbContext`, tracked entries, and the current interception result. Returning the supplied result unchanged means “continue normally”. Suppression is an advanced option: the interceptor must provide the result that replaces the real save and must leave the context in a coherent state.

Post-save callbacks receive the successful affected-row count and are appropriate for auditing, diagnostics, or controlled result adjustment. Failure callbacks run when SaveChanges throws; they are useful for logging and cleanup, but they do not automatically recover the failed unit of work. Concurrency has a dedicated interception path. Suppressing a concurrency exception is only correct when the interceptor has actually resolved the conflict or intentionally replaced the expected failure semantics.

The safe default is observation, not suppression. If suppression is used, document what result is returned, how entity states are updated, and how callers learn that no ordinary database save occurred.

**Covered source labels:** `T-009, T-010, T-012, T-013, T-017, T-018`

## R02 — event data, interception results and explicit suppression markers

Interceptor event-data objects carry context about the operation: the `DbContext` when available, event metadata, command details, result/exception information, and whether execution is synchronous or asynchronous. Command-event data exposes provider command context; SaveChanges-event data exposes the save pipeline context.

`InterceptionResult<T>` represents “continue” or “suppress with this result”. Its `HasResult` state indicates that a result has already been supplied. Interceptors should normally return the incoming result so they compose with earlier interceptors. Overwriting it without a deliberate policy can undo another interceptor’s decision.

If application code must know that a save or command was suppressed, use an explicit scoped result object, operation result, or audit record. A scoped marker service can work, but it must be reset per operation and must not become hidden global state. Do not infer suppression only from a zero row count, because zero can be a legitimate database result.

**Covered source labels:** `T-001, T-003, T-004, T-005, T-006, T-011, T-015, T-016`

## R03 — DbCommandInterceptor and DbCommand execution shapes

`DbCommandInterceptor` covers reader, scalar, and non-query commands, with executing, executed, failed, and cancellation hooks in synchronous and asynchronous forms. A scalar interception callback deals with a scalar result object; a non-query callback deals with an integer affected-row count; a reader callback deals with a data reader.

The underlying `DbCommand` exposes command text, parameters, command type, transaction, and timeout. Interceptors can log or carefully modify these values, but changing SQL or parameters is provider-sensitive and can break query semantics or parameterization.

As with SaveChanges interception, return the incoming interception result unless intentionally replacing execution. Keep sync and async behavior equivalent, avoid blocking in async callbacks, and never put user input into rewritten command text without parameterization.

**Covered source labels:** `T-002, T-007, T-008, T-014`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
