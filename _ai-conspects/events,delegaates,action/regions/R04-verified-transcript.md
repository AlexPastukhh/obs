# R04 — Async handler hazards and awaited callback hooks

## Boundary

This region covers asynchronous lambdas attached to classic events, delegate-based lifecycle callbacks, and ASP.NET Core authentication callback objects named “Events.”

## Verified transcript

Classic `EventHandler<T>` returns `void`. An asynchronous lambda attached to such an event therefore becomes `async void`. The publisher cannot await it, cannot know when it completes, and cannot reliably catch exceptions thrown after an `await`. A `try/catch` around `SomeEvent?.Invoke(...)` only covers the synchronous portion before the handler yields.

For asynchronous workflows, prefer an explicitly awaitable callback shape such as:

```csharp
Func<Task>
Func<T, Task>
Func<TContext, Task>
```

A method can accept optional callbacks such as `beforeSave` and `afterSave`, invoke them at precise points, and await them. This is not a C# event system; it is controlled callback injection. It is appropriate when outside code customizes selected steps of one operation and the operation must retain sequencing and exception control.

ASP.NET Core authentication components often expose a property called `Events`, but its members are callback properties such as `Func<TokenValidatedContext,Task>`, not members declared with the C# `event` keyword. The handler invokes and awaits these callbacks. Therefore code in `OnTokenValidated`, `OnMessageReceived`, or `OnAuthenticationFailed` may safely perform awaited work, and failures participate in the authentication pipeline.

The screenshots show a token-validation callback resolving a database context, checking the user, and failing the authentication context when the user no longer exists. The essential distinction is: classic events are multicast `void` notifications; ASP.NET Core “Events” objects commonly hold awaitable pipeline hooks.


## Source closure

- Verified image uses: 15
- Verified non-empty SVG text nodes: 6
- Missing: 0
- Unreviewed: 0
