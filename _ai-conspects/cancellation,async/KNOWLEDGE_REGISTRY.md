# Knowledge Registry

Source workspace: `_ai-conspects/cancellation,async/`

Authoritative processed source: `regions/full-source-near-literal-v003.md` (S-001–S-042; 42 of 42 screenshots)

Original corrected SVG: `source/source-complete-v002.svg`

Evidence and closure: `CURRENT_SOURCE_OF_TRUTH.md` and `05-independent-full-svg-audit-v002.md`

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| S-001–S-004 and summary S-033 source/token roles, timeout pattern, resource rationale and cooperative observation contract | `dotnet` | `dotnet.cancellation-tokens-linked-sources-and-causes` | `../_knowledge/dotnet/cancellation-tokens-linked-sources-and-causes.md` | MAPPED |
| S-005–S-011, S-024–S-026 owned and linked CTS lifecycle, disposal, same-token propagation and optional fail-fast checks | `dotnet` | `dotnet.cancellation-tokens-linked-sources-and-causes` | `../_knowledge/dotnet/cancellation-tokens-linked-sources-and-causes.md` | MAPPED |
| S-015–S-019 cooperative CPU-loop checks and normal partial exit versus cancelled exception state | `dotnet` | `dotnet.cancellation-tokens-linked-sources-and-causes` | `../_knowledge/dotnet/cancellation-tokens-linked-sources-and-causes.md` | MAPPED |
| S-031, S-034, S-037, S-039–S-042 `OperationCanceledException`/`TaskCanceledException`, filtered catches and original-source cause detection | `dotnet` | `dotnet.cancellation-tokens-linked-sources-and-causes` | `../_knowledge/dotnet/cancellation-tokens-linked-sources-and-causes.md` | MAPPED |
| S-012–S-014, S-020–S-022, S-027 (propagation), S-037–S-040 ASP.NET Core `RequestAborted` propagation, disconnected-response boundary, low-severity handling and rethrow | `aspnet-core` | `aspnet-core.request-aborted-propagation` | `../_knowledge/aspnet-core/request-aborted-propagation.md` | MERGED |
| S-027 (no blocking waits), S-028–S-030 and S-035–S-036 awaited exception observation, structured `try/catch` and handling layers | `dotnet` | `dotnet.async-failure-ordering-and-server-safety` | `../_knowledge/dotnet/async-failure-ordering-and-server-safety.md` | MERGED |
| S-032 `WhenAll`/`WhenAny` coordination boundary versus CPU parallelism | `dotnet` | `dotnet.async-concurrency-and-task-start` | `../_knowledge/dotnet/async-concurrency-and-task-start.md` | MERGED |
| Source reconstruction, image/text coverage, canvas-road labels and audit metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- General cancellation ownership, linking, cooperative checks and cause identification form a reusable .NET unit independent of ASP.NET Core.
- Request-disconnect response behavior stays in the existing ASP.NET Core request-abort unit.
- General async exception observation and coordination strengthen the established async-failure/concurrency units instead of creating another broad async summary.

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 3 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
