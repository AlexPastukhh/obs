# Repetition questions — Channel<T>

## Fundamentals

1. What problem does `Channel<T>` solve?
2. What is the difference between `ChannelWriter<T>` and `ChannelReader<T>`?
3. Who normally receives the writer and who receives the reader?
4. Why is a channel more than `Queue<T>` plus a lock?
5. How does a channel avoid busy waiting?

## Capacity and backpressure

6. What is the risk of an unbounded channel?
7. What does bounded capacity provide?
8. Explain `Wait`, `DropWrite`, `DropNewest`, and `DropOldest`.
9. Which full mode is usually the safest default when loss is unacceptable?
10. What happens to the third write when capacity is two and full mode is `Wait`?
11. How does bounded capacity protect memory?

## Writer and reader APIs

12. Compare `WriteAsync` and `TryWrite`.
13. Compare `ReadAsync` and `TryRead`.
14. When can `WriteAsync` wait?
15. When can `ReadAsync` wait?
16. Why do these APIs often return `ValueTask`?
17. What does `ReadAllAsync` return?
18. When does `await foreach` over `ReadAllAsync` stop?

## Completion

19. Why must a producer complete the writer?
20. Are buffered items lost immediately after completion?
21. What is the difference between `TryComplete` and a stricter completion API?
22. What does `TryComplete` return when already completed?
23. How is an error propagated through completion?
24. Why is `TryComplete` useful in idempotent shutdown?

## Wait/Try patterns

25. Explain the `WaitToReadAsync` plus inner `TryRead` pattern.
26. Why can that pattern process batches of currently available items?
27. What does `WaitToReadAsync` returning `false` mean?
28. When would you use `WaitToWriteAsync`?
29. Why might `TryWrite` still fail after `WaitToWriteAsync` in a multi-writer scenario?
30. When is simple `WriteAsync` preferable?

## Options and concurrency

31. Are `SingleReader` and `SingleWriter` exact numeric limits?
32. What does `SingleReader = true` promise?
33. What does `SingleWriter = false` mean?
34. Why can correct hints improve internal performance?
35. What bug can result from declaring a single writer when multiple writers actually exist?

## Comparisons

36. Compare `Channel<T>` with `SemaphoreSlim`.
37. Compare `Channel<T>` with `BlockingCollection<T>`.
38. When is a semaphore enough?
39. When is a channel the better abstraction?
40. Why is a channel useful in a hosted background processor?

## WebSockets

41. Why are multiple concurrent WebSocket sends dangerous?
42. How does an outgoing channel serialize sends by architecture?
43. Can a send loop and receive loop run at the same time?
44. Why should the send loop not be immediately awaited before starting the receive loop?
45. What components may act as producers of outgoing messages?
46. Why might the receive loop enqueue an echo/pong instead of calling `SendAsync` directly?
47. What should happen to the outgoing writer during connection shutdown?
48. How should cancellation be propagated through both loops?
49. What state belongs in a per-connection object?
50. Design a connection manager that exposes a queueing method without exposing the raw writer.

## Code tasks

51. Create a bounded channel with capacity 100, one reader, multiple writers, and `Wait`.
52. Write a producer method that enqueues a work item.
53. Write a `ReadAllAsync` consumer loop.
54. Write a drain-current-batch loop using `WaitToReadAsync` and `TryRead`.
55. Write shutdown code using `TryComplete`.
56. Write a WebSocket send loop backed by a channel.
57. Explain how to await send and receive tasks without deadlocking startup.
58. Explain what happens if producers never complete the channel.
59. Explain what happens when a bounded channel uses `DropOldest`.
60. Choose between Channel, SemaphoreSlim, and a normal collection for three real scenarios.
