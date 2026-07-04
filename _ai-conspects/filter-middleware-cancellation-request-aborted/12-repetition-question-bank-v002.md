# Repetition question bank

1. Где middleware берёт cancellation token?
2. Где action filter берёт cancellation token?
3. Что означает `RequestAborted`?
4. Как передать token в HTTP/DB async call?
5. Почему cancellation cooperative?
6. Что делает `ThrowIfCancellationRequested()`?
7. Когда ловить `OperationCanceledException`?
8. Почему нельзя писать response после client disconnect?
9. Как middleware short-circuit pipeline?
10. Как filter short-circuit action execution?
11. Нужен ли async filter для async work?
12. Что делает `await next()` в filter?
13. Что делает `_next(context)` в middleware?
14. Почему loop должен проверять token?
15. Как отличить request cancellation от другой cancellation?
