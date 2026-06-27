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


## Source closure

- Verified image uses: 14
- Verified non-empty SVG text nodes: 20
- Missing: 0
- Unreviewed: 0
