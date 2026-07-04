# Technical corrections — RequestAborted cancellation

1. `HttpContext.RequestAborted` is a `CancellationToken` signaled when the client disconnects or the server aborts the request.
2. Cancellation is cooperative. You pass the token into async APIs or explicitly check/throw in loops.
3. Middleware can short-circuit by returning without calling `_next(context)`.
4. MVC filters can short-circuit by setting `context.Result` and not calling `next()`.
5. Do not write a normal success response after cancellation/disconnect.
6. Catch `OperationCanceledException` only when it is caused by the request token; do not swallow unrelated cancellation accidentally.
7. `Task.Run` is not a cancellation solution for server request work; use real async APIs or move long CPU work outside the request path.
