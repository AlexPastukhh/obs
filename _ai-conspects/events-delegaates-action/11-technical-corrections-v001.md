# Technical corrections — Events / delegates / Action

1. Raising an event should normally copy the delegate/reference or use null-conditional invocation to avoid race conditions.
2. The common pattern is `protected virtual void OnXxx(TEventArgs e)` so derived classes can override the raising behavior.
3. `EventHandler<TEventArgs>` conventionally uses `(object? sender, TEventArgs e)`.
4. Delegates are type-safe function references; events restrict outside code so consumers can subscribe/unsubscribe but not raise the event.
5. `Action` and `Func` are delegate types, but events usually use the `EventHandler` pattern for API consistency.
6. Async event handlers are risky because `async void` exceptions are hard to observe; prefer explicit async callback abstractions when the publisher must await subscribers.
