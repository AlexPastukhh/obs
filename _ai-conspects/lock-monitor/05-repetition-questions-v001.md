# Lock / Monitor — repetition questions

## Foundations

1. What object does `lock` synchronize on?
2. Why should the gate be private and readonly?
3. Why is locking on `this`, `typeof(...)`, or a string dangerous?
4. What Monitor calls roughly implement `lock`?
5. Why must `Monitor.Exit` be placed in `finally`?
6. What does monitor reentrancy mean?
7. How is the recursion count released?

## TryEnter

8. How does `Monitor.Enter` differ from `Monitor.TryEnter`?
9. When is the timeout overload useful?
10. Why is the `ref bool lockTaken` overload safer?
11. When may `Monitor.Exit` be called?

## Wait/Pulse

12. What does `Monitor.Wait` do to the held monitor?
13. Does Pulse immediately transfer the lock to a waiter?
14. Why must a waiter reacquire the monitor?
15. Why should the condition be checked with `while`, not `if`?
16. What is the difference between Pulse and PulseAll?
17. Why can PulseAll be wasteful?
18. In a queue with one new item and three consumers, which signaling method is normally appropriate?
19. Give a case where PulseAll is appropriate.

## Async and ASP.NET Core

20. Is every use of `lock` bad blocking?
21. What kind of blocking is harmful on ASP.NET Core request threads?
22. Why is `await` forbidden inside `lock`?
23. Which primitive is a common async-compatible alternative?
24. What work should never be performed while holding a synchronous lock?
25. Rewrite a synchronous lock section as a `SemaphoreSlim.WaitAsync` pattern.
