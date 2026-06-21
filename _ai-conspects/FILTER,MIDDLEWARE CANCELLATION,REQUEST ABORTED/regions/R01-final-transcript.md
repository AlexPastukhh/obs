# Cancellation in ASP.NET Core middleware and filters

Source conspect: `FILTER,MIDDLEWARE CANCELLATION,REQUEST ABORTED.svg`  
Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area overview / reading quality

This compact sheet contains 10 image placements and 6 canvas text labels. The main concepts and code examples were visually reviewed as one coherent area. Exact code punctuation remains preserved in `source/images/` and the original SVG.

## Verified transcript

### RequestAborted is the request cancellation token

`HttpContext.RequestAborted` is cancelled when the client disconnects or the server aborts the request. Pass this token to cancellable operations such as `HttpClient.SendAsync`, stream reads, database calls and `Task.Delay`. Cancellation is cooperative: CPU loops must explicitly check or throw when cancellation is requested.

### Middleware behavior

Middleware may stop immediately when `RequestAborted.IsCancellationRequested`, catch `OperationCanceledException` only when that token was cancelled, avoid writing a response after disconnect, and short-circuit the pipeline by returning without calling `next(context)`. `InvokeAsync` is necessary when the middleware itself awaits asynchronous work; checking a token alone does not require async.

### Filter behavior

An async action filter can read `context.HttpContext.RequestAborted`, return without calling `next()` when the request is already cancelled, or set `context.Result` to short-circuit MVC for validation/business reasons. If it awaits outbound work, pass the token and catch cancellation narrowly.

### Error handling rule

A client disconnect is normally not a server error. Do not log it as an unhandled 500 and do not attempt to write a late response. Catch cancellation only when the associated request token is actually cancelled so unrelated `OperationCanceledException` instances are not hidden.

## Evidence map

Image placements: `S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010`

Canvas labels: `T-001, T-002, T-003, T-004, T-005, T-006`

Detailed coordinates and hashes are stored in `data/image-uses.*`, `data/text-labels.*`, and the review ledgers.

## Final coverage

```text
image uses processed: 10
text labels processed: 6
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```