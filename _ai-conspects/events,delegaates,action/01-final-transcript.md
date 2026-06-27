# Final screenshot-backed transcript — events,delegaates,action

Generated: 2026-06-27 UTC

# R01 — Event fundamentals, declaration styles, naming and raiser pattern

## Boundary

This region covers the top band of the canvas: event fundamentals, declaration styles, naming, custom event arguments, publisher/subscriber examples, and the recommended protected virtual raiser method.

## Verified transcript

A C# event is a publisher-to-subscriber notification mechanism built on delegates. The publisher exposes an event, subscribers attach handlers, and only the declaring type raises the event. The ordinary pattern uses `EventHandler` when no payload is needed and `EventHandler<TEventArgs>` when custom data is carried.

The screenshots distinguish:

- a non-generic event such as `event EventHandler? SomethingHappened`;
- a generic event such as `event EventHandler<OrderPlacedEventArgs>? OrderPlaced`;
- a less-common custom delegate event;
- a custom `EventArgs` class carrying values such as order ID and total.

Invocation uses the null-conditional form, for example `OrderPlaced?.Invoke(this, args)`. The sender is normally the publisher instance. The subscriber must have a compatible handler signature and can read values from the event arguments.

Naming follows .NET conventions: event names commonly describe something that happened, such as `Saved`, `OrderPlaced`, `SomethingChanged`, `SomethingCompleted`, or `SomethingFailed`. Raiser methods are normally named `On<EventName>`.

The recommended extensibility pattern is a protected virtual raiser method:

```csharp
protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
    => OrderPlaced?.Invoke(this, e);
```

The public operation performs its work and calls the raiser. A derived class may override the raiser, add behavior, and optionally call the base implementation. This centralizes event invocation and avoids scattering direct `Invoke` calls through the class.


# R02 — Subscription lifetime, cancellation, exceptions and domain-event boundaries

## Boundary

This region covers cancellable events, explicit subscription/unsubscription, anonymous lambdas, memory retention, exception propagation, the difference between events and delegates, and when in-process events are not enough for application/domain integration.

## Verified transcript

Subscription uses `+=` and unsubscription uses `-=`. Named handlers are straightforward to remove. An anonymous lambda is harder to unsubscribe from because a syntactically identical new lambda is a different delegate instance. Store the lambda in a variable when later removal is required.

Events create a reference path from the publisher to each subscriber through the invocation list. A long-lived publisher can therefore keep a shorter-lived subscriber alive. Unsubscribe when lifetimes differ, especially with static events, singleton services, UI objects, background services, or other long-lived publishers.

A cancellable-event pattern places mutable state such as `bool Cancel` on custom event arguments. The publisher creates the arguments, raises the event, then checks the flag before continuing. A subscriber can set `Cancel = true`. This is cooperative cancellation inside one process, not `CancellationToken`-based asynchronous cancellation.

Normal multicast event invocation is sequential. If a handler throws, later handlers may not run and the exception propagates to the code that raised the event. When every handler must be attempted, obtain `GetInvocationList()`, invoke handlers individually, and isolate failures with per-handler `try/catch`. That changes semantics deliberately and should be documented.

A delegate is a callable type. An event is a restricted delegate-like member: external code can subscribe and unsubscribe, but cannot normally invoke the event or replace its invocation list. This protects publisher ownership.

C# events are suitable for simple same-process object notifications. They do not automatically provide transaction integration, persistence, retries, distributed delivery, or cross-service communication. For business/domain workflows, the screenshots point to mediator patterns, message queues, outbox/integration events, or other explicit delivery mechanisms.


# R03 — Action, Func, Predicate and built-in delegate shapes

## Boundary

This region is the boxed lower section about built-in delegate types.

## Verified transcript

`Action` is the built-in delegate family for methods that return `void`.

- `Action` takes no parameters and returns `void`.
- `Action<T>` takes one parameter and returns `void`.
- `Action<T1,T2>` and higher arities describe additional input parameters.

For example, `Action<int,string>` is equivalent in shape to a custom delegate declared as `delegate void LogUserDelegate(int userId, string name)`. The built-in type avoids declaring a custom delegate when no domain-specific delegate name is needed.

`Func<TResult>` and `Func<T,TResult>` represent functions that return a value. The final generic argument is the result type. Use `Action` for a void-returning operation and `Func` when the caller needs a result.

`Predicate<T>` is a delegate taking `T` and returning `bool`; it is shape-compatible with `Func<T,bool>`, though the semantic name emphasizes a test. The screenshots compare these families and show lambdas assigned to each.


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


# Coverage conclusion

```text
Processed image uses: 51 / 51
Processed non-empty SVG text nodes: 47 / 47
Missing image uses: 0
Unreviewed image uses: 0
Missing text nodes: 0
Unreviewed text nodes: 0
```
