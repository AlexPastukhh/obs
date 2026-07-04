# Cancellation / async — repetition questions

## Fundamentals

1. What is owned by `CancellationTokenSource`?
2. What is passed into consumer methods?
3. Does a cancellation token forcibly terminate arbitrary code?
4. Why does cancellation improve I/O scalability?
5. Why does cancellation matter for CPU-bound work?
6. What exception does `ThrowIfCancellationRequested` throw?
7. How is `TaskCanceledException` related to `OperationCanceledException`?
8. Why should a `CancellationTokenSource` be disposed?

## Linked tokens

9. What does `CreateLinkedTokenSource` return?
10. When does the linked token become canceled?
11. Why link a request token with an internal CTS?
12. Why is the linked token alone insufficient to identify the reason for cancellation?
13. How do you determine whether cancellation came from request abort or timeout?
14. Why should the same linked token be passed to `GetAsync` and `ReadAsStringAsync`?
15. Is a manual `ThrowIfCancellationRequested` always required before an API that already accepts a token?
16. What extra work can a loop-top cancellation check avoid?

## ASP.NET Core request abort

17. How does an action receive `HttpContext.RequestAborted`?
18. What happens when a disconnected client cancels the action token?
19. Why is returning a JSON error body usually pointless after disconnect?
20. What does “let cancellation bubble” mean?
21. When is catching request cancellation justified?
22. Why should expected request cancellation not be logged as a server error?
23. Why should a filtered catch usually rethrow?

## CPU work

24. Compare `IsCancellationRequested` plus `break` with `ThrowIfCancellationRequested`.
25. Which pattern produces a canceled task rather than a normal partial result?
26. How frequently should a CPU loop check the token?
27. Why is checking every trivial instruction unnecessary?

## Async exceptions

28. Why does `try/catch` around an unawaited `Task.Run` not catch later task failures?
29. How does `await` change where exceptions surface?
30. What did blocking multi-task patterns often wrap in `AggregateException`?
31. What is the difference between asynchronous concurrency and CPU parallelism?
32. What do `Task.WhenAll` and `Task.WhenAny` provide?
33. Where can ordinary application exceptions be handled in ASP.NET Core?

## Code tasks

34. Write a controller that accepts and propagates a cancellation token.
35. Write a linked source combining request cancellation and a timeout.
36. Write a CPU loop using `ThrowIfCancellationRequested`.
37. Write a filtered cancellation catch that records a metric and rethrows.
38. Write logic that distinguishes request abort from timeout after a linked token fires.
39. Write an HTTP request and response-content read that both use the linked token.

## Scenarios

40. The client disconnected, but the service continues doing CPU work. What is missing?
41. A linked token was canceled and code reports “timeout” without checking the original tokens. Why is that unsafe?
42. An internal timeout fires while the client is still connected. How can handling differ from request-abort cancellation?
43. A loop uses `break` on cancellation and returns partial data as success. Which pattern would better represent cancellation?
44. A CTS with a timer is created per request and never disposed. What resource-management problem exists?
