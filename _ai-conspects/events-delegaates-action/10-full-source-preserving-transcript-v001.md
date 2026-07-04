# Full source-preserving transcript v001 — Events, delegates, Action

    Generated: 2026-07-04 UTC

    ```text
    source SVG: source/events,delegaates,action.svg
    SHA-256: 58fe05fdd4d608c36102140c4a25a6f8975bc5d914825d20ebc1aea90364778e
    Git blob SHA: cfd4c2bd0e189a5df4c5044c8f1f92c426aa3c66
    viewBox: 0 0 11869.821610637824 7026.789949796054
    unique embedded screenshots: 51 / 51
    image uses: 51 / 51
    duplicate extra placements: 0
    native SVG text lines: 47 / 47
    source blocks: 51 / 51
    ```

    This transcript is near-literal normalized and OCR-assisted. Obvious OCR noise is corrected where clear; exact punctuation, indentation and version-specific API spelling remain authoritative in the preserved screenshots.

    ## Integrated map

    Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

    ## Source-by-source transcript

## S-001 — Recommended pattern: protected virtual raiser method

        ```text
        source_id: S-001
        image_hash: c469f841150e
        placements: 1
        image_file: source/images-near-literal-v001/S-001__c469f841150e.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Recommended pattern: protected virtual raiser method
This is a common C# style:
```csharp Cc
public class OrderService
{
public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
public void PlaceOrder(int orderId, decimal total)
{
OnOrderPlaced(new OrderPlacedEventArgs(orderId, total));
}
protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
{
OrderPlaced? .Invoke(this, e);
}
t
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-002 — Common event declaration styles

        ```text
        source_id: S-002
        image_hash: 97f07900e026
        placements: 1
        image_file: source/images-near-literal-v001/S-002__97f07900e026.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Common event declaration styles
Non-generic event

```csharp

public event EventHandler? SomethingHappened;
Raise:

```csharp

SomethingHappened? . Invoke(this, EventArgs.Empty) ;
Us- when ther- is no custom data.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-003 — Event naming conventions

        ```text
        source_id: S-003
        image_hash: 311f2e32ebf0
        placements: 1
        image_file: source/images-near-literal-v001/S-003__311f2e32ebf0.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Event naming conventions
Event name:
```csharp
public event EventHandler? Saved;
public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-004 — Event with custom data

        ```text
        source_id: S-004
        image_hash: ff11f4e24eaa
        placements: 1
        image_file: source/images-near-literal-v001/S-004__ff11f4e24eaa.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Event with custom data
Creat- custom event args:
```csharp
public sealed class OrderPlacedEventArgs : EventArgs
{
public OrderPlacedEventArgs(int orderId, decimal total)
{
OrderId = orderId;
Total = total;
}
public int OrderId { get; }
public decimal Total { get; }
}
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-005 — What is an event?

        ```text
        source_id: S-005
        image_hash: 6ff390f124e8
        placements: 1
        image_file: source/images-near-literal-v001/S-005__6ff390f124e8.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        What is an event?

An event is a way for on- object to notify other objects that something happened.
Publisher raises event. QO
Subscribers handl- event.

Example:
OrderServic- says: "OrderPlaced happened.” QO
EmailServic- reacts: "Send email.”
AnalyticsServic- reacts: “Track event."
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-006 — Raiser method:

        ```text
        source_id: S-006
        image_hash: 9346a03ae05d
        placements: 1
        image_file: source/images-near-literal-v001/S-006__9346a03ae05d.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Raiser method:

```csharp

protected virtual void OnSaved({EventArgs e)

protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
Event args:

```csharp

public sealed class OrderPlacedEventArgs : EventArgs
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-007 — It lets derived classes overrid- th- event-raising behavior.

        ```text
        source_id: S-007
        image_hash: 634f3bec0182
        placements: 1
        image_file: source/images-near-literal-v001/S-007__634f3bec0182.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Why?
It lets derived classes overrid- th- event-raising behavior.
“ C# OQ
public class SpecialOrderServic- : OrderService
{
protected overrid- void OnOrderPlaced(OrderPlacedEventArgs e)
{
Console.WriteLine("Befor- event.");
base.OnOrderPlaced(e);
Console.WriteLine("After event."); LU
}
}
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-008 — Basic event pattern

        ```text
        source_id: S-008
        image_hash: eb17aa139cc1
        placements: 1
        image_file: source/images-near-literal-v001/S-008__eb17aa139cc1.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Basic event pattern
```csharp oO
public class OrderService
{
public event EventHandler? OrderPlaced;
public void PlaceOrder()
{
Console.WriteLine("Order placed.");
OrderPlaced? .Invoke(this, EventArgs.Empty) ;
} L
}
Ca ehcrmhn:
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-009 — Generic event

        ```text
        source_id: S-009
        image_hash: 77304ee34dce
        placements: 1
        image_file: source/images-near-literal-v001/S-009__77304ee34dce.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Generic event

```csharp

public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
Raise:

```csharp

OrderPlaced? .Invoke(this, new OrderPlacedEventArgs(orderId, total));
Us- when you need to send data.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-010 — Publisher:

        ```text
        source_id: S-010
        image_hash: df2835c50d36
        placements: 1
        image_file: source/images-near-literal-v001/S-010__df2835c50d36.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Publisher:
```csharp oO
public class OrderService
{
public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
public void PlaceOrder(int orderId, decimal total)
{
Console.WriteLine($"Order {orderId} placed.");
OrderPlaced? . Invoke(
this,
new OrderPlacedEventArgs(orderId, total));
}
}
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-011 — Common names:

        ```text
        source_id: S-011
        image_hash: 16223e910f3e
        placements: 1
        image_file: source/images-near-literal-v001/S-011__16223e910f3e.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Common names:
SomethingHappened
SomethingChanged
SomethingCompleted
SomethingFailed
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-012 — Subscribe:

        ```text
        source_id: S-012
        image_hash: 83592e117e95
        placements: 1
        image_file: source/images-near-literal-v001/S-012__83592e117e95.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Subscribe:
```csharp oO
var servic- = new OrderService();
service.OrderPlaced += (sender, args) =>
{
Console.WriteLine("“OrderPlaced event received.");
35
servic- .PlaceOrder();
Output
Order placed. NY Oo
OrderPlaced event received.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-013 — Custom delegat- event

        ```text
        source_id: S-013
        image_hash: ea7ddc8135a8
        placements: 1
        image_file: source/images-near-literal-v001/S-013__ea7ddc8135a8.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Custom delegat- event
Less common:
```csharp
public delegat- void OrderPlacedHandler(int orderId);
public class OrderService
{
public event OrderPlacedHandler? OrderPlaced;
public void PlaceOrder(int orderId)
{
OrderPlaced? . Invoke(orderId) ;
}
}
Modern C# usually prefers EventHandler<TEventArgs> .
NV
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-014 — Subscriber.

        ```text
        source_id: S-014
        image_hash: 41cdcb66a669
        placements: 1
        image_file: source/images-near-literal-v001/S-014__41cdcb66a669.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Subscriber.
```csharp oO
var servic- = new OrderService();
service.OrderPlaced += HandleOrderPlaced;
servic- .PlaceOrder(10@1, 49.99m);
static void HandleOrderPlaced(object? sender, OrderPlacedEventArgs e)
{
Console.WriteLine($"Order ID: {e.OrderId}");
Consol- .WriteLine($"Total: {e.Total}");
}
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-015 — 3. Then why does ASP.NET Cor- AuthenticationHandler us- “events’

        ```text
        source_id: S-015
        image_hash: 329c01e41c46
        placements: 1
        image_file: source/images-near-literal-v001/S-015__329c01e41c46.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        3. Then why does ASP.NET Cor- AuthenticationHandler us- “events’
ASP.NET Cor- authentication “events” ar- usually async callback hooks.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-016 — Cancellabl- event

        ```text
        source_id: S-016
        image_hash: 6e2d4739cb00
        placements: 1
        image_file: source/images-near-literal-v001/S-016__6e2d4739cb00.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Cancellabl- event
```csharp
public sealed class BeforeDeleteEventArgs : EventArgs
{
public bool Cancel { get; set; }
}
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-017 — 2. If | just need to run outside-provided cod- insid- a method, should

        ```text
        source_id: S-017
        image_hash: f4992715cd21
        placements: 1
        image_file: source/images-near-literal-v001/S-017__f4992715cd21.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        2. If | just need to run outside-provided cod- insid- a method, should
| us- delegates?

Yes.

If you hav- on- method and you want outsid- cod- to customiz- specific parts of that method, delegates
ar- often better than events.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-018 — Th- problem with async handlers

        ```text
        source_id: S-018
        image_hash: 9dbdf13e0d86
        placements: 1
        image_file: source/images-near-literal-v001/S-018__9dbdf13e0d86.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Th- problem with async handlers
Suppos- you write:
“CH @
service.OrderPlaced += async (sender, e) =>
{
await SendEmailAsync(e.OrderId) ;
35
This compiles becaus- EventHandler<T> returns void .
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-019 — Subscrib- and unsubscribe

        ```text
        source_id: S-019
        image_hash: 90c1082db169
        placements: 1
        image_file: source/images-near-literal-v001/S-019__90c1082db169.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Subscrib- and unsubscribe
```csharp a
var servic- = new OrderService();
service.OrderPlaced += HandleOrderPlaced;
service.OrderPlaced -= HandleOrderPlaced;
Handler.
```csharp a
static void HandleOrderPlaced(object? sender, OrderPlacedEventArgs e)
{
Consol- .WriteLine(e.OrderId) ;
}
al?
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-020 — Example:

        ```text
        source_id: S-020
        image_hash: 6481c2b0e512
        placements: 1
        image_file: source/images-near-literal-v001/S-020__6481c2b0e512.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Example:
```csharp QO
service.OrderPlaced += async (sender, e) =>
{
await Task.Delay(100);
throw new Exception("Email failed");
35
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-021 — Event exception behavior

        ```text
        source_id: S-021
        image_hash: b3ecfc787444
        placements: 1
        image_file: source/images-near-literal-v001/S-021__b3ecfc787444.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Event exception behavior
If on- event handler throws, later handlers may not run.
Example:
```csharp oO
service.OrderPlaced += (sender, e) =>
{
throw new Exception("Handler failed.”);
35
service.OrderPlaced += (sender, e) =>
{ v
Console.WriteLine("This may not run.");
35
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-022 — Events vs mediator/domain events in ASP.NET Core

        ```text
        source_id: S-022
        image_hash: 01c648e0e28e
        placements: 1
        image_file: source/images-near-literal-v001/S-022__01c648e0e28e.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Events vs mediator/domain events in ASP.NET Core
C# events ar- in-memory, same-process notifications.
They ar- okay for simpl- object-level notifications.
But in ASP.NET Cor- business systems, b- careful.
C# events do not automatically provide:
databas- transaction integration OQ
retry
persistence
distributed messaging
cross-servic- communication
background delivery V
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-023 — options.Events = new JwtBearerEvents

        ```text
        source_id: S-023
        image_hash: 5df337fb6318
        placements: 1
        image_file: source/images-near-literal-v001/S-023__5df337fb6318.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        {
options.Events = new JwtBearerEvents
{
OnMessageReceived = async context =>
{
// custom token extraction
await Task.CompletedTask;
3
OnTokenValidated = async context =>
{
// custom validation after token is valid
await Task.CompletedTask;
3
OnAuthenticationFailed = async context =>
{
// custom failur- handling
await Task.CompletedTask;
}
35
}); Vv
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-024 — If you need every handler to b- attempted, manually iterate:

        ```text
        source_id: S-024
        image_hash: c510114ebe1d
        placements: 1
        image_file: source/images-near-literal-v001/S-024__c510114ebe1d.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        If you need every handler to b- attempted, manually iterate:
```csharp
protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
{
var handlers = OrderPlaced? .GetInvocationList();
if (handlers is null)
{
return;
}
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-025 — Memory leak warning

        ```text
        source_id: S-025
        image_hash: 452b025c14bb
        placements: 1
        image_file: source/images-near-literal-v001/S-025__452b025c14bb.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Memory leak warning

Events can keep subscribers alive.

Example:
```csharp OQ
publisher .SomeEvent += subscriber .Handle;

Now th- publisher has a referenc- to th- subscriber through th- event delegate.

If th- publisher lives much longer than th- subscriber, th- subscriber may not b- garbag- collected.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-026 — Publisher:

        ```text
        source_id: S-026
        image_hash: cc02d22d6715
        placements: 1
        image_file: source/images-near-literal-v001/S-026__cc02d22d6715.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Publisher:
```csharp
public event EventHandler<BeforeDeleteEventArgs>? BeforeDelete;
public void Delete()
{
var args = new BeforeDeleteEventArgs();
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-027 — Example:

        ```text
        source_id: S-027
        image_hash: 7cbc606d7231
        placements: 1
        image_file: source/images-near-literal-v001/S-027__7cbc606d7231.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Example:
“ C# Oo
public async Task ProcessOrderAsync(
Order order,
Func<Order, Task>? beforeSav- = null,
Func<Order, Task>? afterSav- = null)
{
Validate(order) ;
if (beforeSav- is not null)
{
await beforeSave(order) ;
}
await SaveOrderAsync(order) ;
if (afterSav- is not null)
{
await afterSave(order) ;
}
1 Ny
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-028 — 1. Event is invoked. OQ

        ```text
        source_id: S-028
        image_hash: 12cb01513d43
        placements: 1
        image_file: source/images-near-literal-v001/S-028__12cb01513d43.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Flow:
1. Event is invoked. OQ
2. Handler starts.
3. Handler reaches await Task.Delay.
4. Handler returns control to caller.
5. Event invocation finishes.
6. Later, after await, exception is thrown.
7. Publisher's try/catch is already gone.
That is why classic C# events ar- not great for async workflows.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-029 — So th- async lambda becomes effectively:

        ```text
        source_id: S-029
        image_hash: 7ded500ed67c
        placements: 1
        image_file: source/images-near-literal-v001/S-029__7ded500ed67c.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        So th- async lambda becomes effectively:
```csharp oO
async void

That is th- dangerous part.

async void means:
Th- caller cannot await it. OQ
Th- caller cannot reliably catch its exceptions.
Th- caller does not know when it finishes. Vv
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-030 — foreach (EventHandler<OrderPlacedEventArgs> handler in handlers)

        ```text
        source_id: S-030
        image_hash: bae5a328193b
        placements: 1
        image_file: source/images-near-literal-v001/S-030__bae5a328193b.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        foreach (EventHandler<OrderPlacedEventArgs> handler in handlers)
{
try
{
handler(this, e);
}
catch (Exception ex)
{
Console.WriteLine(ex.Message) ;
}
}
}
NV
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-031 — For domain events, peopl- often use:

        ```text
        source_id: S-031
        image_hash: 36d3749db8e2
        placements: 1
        image_file: source/images-near-literal-v001/S-031__36d3749db8e2.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        For domain events, peopl- often use:
MediatR Oo
messag- queues
outbox pattern
integration events
Example:
OrderPlaced C# event: Oo
good for in-memory notification
OrderPlaced integration event:
better for notifying another service
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-032 — BeforeDelete?.Invoke(this, args);

        ```text
        source_id: S-032
        image_hash: 8a5c4409c615
        placements: 1
        image_file: source/images-near-literal-v001/S-032__8a5c4409c615.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        BeforeDelete?.Invoke(this, args);
if (args.Cancel)
{
return;
}
// delete
}
Subscriber.
```csharp oO
service.BeforeDelet- += (sender, e) =>
{ NV
e.Cancel = true;
35
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-033 — publisher .SomeEvent -= subscriber .Handle;

        ```text
        source_id: S-033
        image_hash: 685607d65a3d
        placements: 1
        image_file: source/images-near-literal-v001/S-033__685607d65a3d.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Fix:

```csharp

publisher .SomeEvent -= subscriber .Handle;
Especially important for:

static events

singleton services

long-lived publishers

UI apps

background services

NV
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-034 — Thes- ar- called “events,” but they ar- not like:

        ```text
        source_id: S-034
        image_hash: 4b2665965a77
        placements: 1
        image_file: source/images-near-literal-v001/S-034__4b2665965a77.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Thes- ar- called “events,” but they ar- not like:
```csharp oO
public event EventHandler SomethingHappened;
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-035 — Anonymous lambda subscription:

        ```text
        source_id: S-035
        image_hash: 6d5388c323f2
        placements: 1
        image_file: source/images-near-literal-v001/S-035__6d5388c323f2.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Anonymous lambda subscription:
```csharp
service.OrderPlaced += (sender, e) =>
{
Consol- .WriteLine(e.OrderId) ;
35
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-036 — So this code:

        ```text
        source_id: S-036
        image_hash: e4bd98e85db9
        placements: 1
        image_file: source/images-near-literal-v001/S-036__e4bd98e85db9.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        So this code:
```csharp
try
{
OrderPlaced? .Invoke(this, args);
}
catch (Exception ex)
{
Console.WriteLine( "Caught" );
}
may not catch exceptions thrown after an await insid- th- handler.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-037 — They ar- properties whos- typ- is usually like:

        ```text
        source_id: S-037
        image_hash: a90bcf2e1847
        placements: 1
        image_file: source/images-near-literal-v001/S-037__a90bcf2e1847.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        They ar- properties whos- typ- is usually like:
“ C# Oo
Func<SomeContext, Task>

For example, conceptually:
“CH Oo
public Func<TokenValidatedContext, Task> OnTokenValidated { get; set; }
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-038 — await ProcessOrderAsync(

        ```text
        source_id: S-038
        image_hash: 733395144cd8
        placements: 1
        image_file: source/images-near-literal-v001/S-038__733395144cd8.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Usage:
“CH Oo
await ProcessOrderAsync(
order,
beforeSave: async order =>
{
await auditService.WriteAsync("Befor- save");
}
afterSave: async order =>
{
await emailService.SendAsync (order -. Id);
ys
This is not really an “event system.” This is a method accepting callbacks.
That is useful when:
Th- caller provides behavior. Oo
Th- method controls exactly wher- that behavior runs.
Th- method wants to await th- behavior. Vy
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-039 — Events vs delegates

        ```text
        source_id: S-039
        image_hash: 0b76099d18d5
        placements: 1
        image_file: source/images-near-literal-v001/S-039__0b76099d18d5.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Events vs delegates
A delegat- is a typ- that points to a method.
```csharp
public delegat- void Notify(string message) ;
An event is a restricted delegate-lik- member.
With an event, outsid- cod- can:
```csharp
service.OrderPlaced += Handler;
service.OrderPlaced -= Handler;
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-040 — B- careful: anonymous lambdas ar- harder to unsubscrib- from unless you stor- them.

        ```text
        source_id: S-040
        image_hash: c672ae1e6bd7
        placements: 1
        image_file: source/images-near-literal-v001/S-040__c672ae1e6bd7.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        B- careful: anonymous lambdas ar- harder to unsubscrib- from unless you stor- them.
```csharp oO
EventHandler<OrderPlacedEventArgs> handler = (sender, e) =>
{
Consol- .WriteLine(e.OrderId) ;
35
service.OrderPlaced += handler;
service.OrderPlaced -= handler;
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-041 — So th- authentication handler can do this:

        ```text
        source_id: S-041
        image_hash: c21945886f9a
        placements: 1
        image_file: source/images-near-literal-v001/S-041__c21945886f9a.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        So th- authentication handler can do this:

```csharp

await Events. TokenValidated(context) ;
or conceptually:

```csharp

await options -.Events.OnTokenValidated(context) ;
That means ASP.NET Cor- can await your custom code.
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-042 — For async callbacks, use:

        ```text
        source_id: S-042
        image_hash: 937068273f83
        placements: 1
        image_file: source/images-near-literal-v001/S-042__937068273f83.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        For async callbacks, use:
“ C# Oo
Func<Task>
Func<T, Task>
Func<TContext, Task>
not Action .
Becaus- Action returns void, so it cannot b- await Vv
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-043 — So this is okay:

        ```text
        source_id: S-043
        image_hash: a7aa6bc83623
        placements: 1
        image_file: source/images-near-literal-v001/S-043__a7aa6bc83623.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        So this is okay:
“ C# OQ
OnTokenValidated = async context =>
{
var db = context.HttpContext .RequestServices .GetRequiredService<AppDbContext>() ;
var userId = context.Principal! .FindFirst("sub")! .Value;
var userExists = await db.Users.AnyAsync(u => u.Id == userId);
if (!userExists)
{
context .Fail("User no longer exists.");
}
}
Th- authentication pipelin- waits for that code.
NV
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-044 — 2. Action with parameters

        ```text
        source_id: S-044
        image_hash: 8716be78f6d3
        placements: 1
        image_file: source/images-near-literal-v001/S-044__8716be78f6d3.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        2. Action with parameters
Action has generic versions:

```csharp

Action<T>

Action<T1, T2>

Action<T1, 12, T3>
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-045 — Yes. Action is a delegat- type.

        ```text
        source_id: S-045
        image_hash: b1e8481a15b4
        placements: 1
        image_file: source/images-near-literal-v001/S-045__b1e8481a15b4.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Yes. Action is a delegat- type.
Mor- specifically:
Action = built-in generic delegat- for methods that return void (
So instead of creating your own delegat- lik- this:
“> CH (
public delegat- void Notify();
you can often use:
```csharp (
Action Vv
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-046 — 3. Action<int, string> example

        ```text
        source_id: S-046
        image_hash: fb5b95857036
        placements: 1
        image_file: source/images-near-literal-v001/S-046__fb5b95857036.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        3. Action<int, string> example
```csharp oO
Action<int, string> logUser = (userId, name) =>
{
Consol- .WriteLine($"User {userId}: {name}");
35
logUser(42, “Bob");
Th- delegat- shap- is:
takes int QO
takes string
returns void
Equivalent custom delegate:
```csharp
Vv 0
public delegat- void LogUserDelegate(int userId, string name);
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-047 — Example:

        ```text
        source_id: S-047
        image_hash: e162dfe62eba
        placements: 1
        image_file: source/images-near-literal-v001/S-047__e162dfe62eba.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Example:
“ C# OQ
Action<string> printMessag- = messag- =>
{
Console.WriteLine(message) ;
35
printMessage("“Hello”);
This means:
A delegat- pointing to a method that takes string and returns void QO
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-048 — So common built-in delegates are:

        ```text
        source_id: S-048
        image_hash: ef04b2680f95
        placements: 1
        image_file: source/images-near-literal-v001/S-048__ef04b2680f95.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        So common built-in delegates are:

Delegat- Meaning

Action no parameters, returns | void
Action<T> takes T, returns | void
Func<TResult> no parameters, returns |TResult
Func<T, TResult> takes T, returms | TResult
Predicate<T> takes T, returns | bool
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-049 — Equivalent custom delegate:

        ```text
        source_id: S-049
        image_hash: a745c65f52c5
        placements: 1
        image_file: source/images-near-literal-v001/S-049__a745c65f52c5.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Equivalent custom delegate:
```csharp oO
public delegat- void MessageHandler(string message) ;

So this:
```csharp oO
Action<string> handler;

is similar to this:
```csharp oO
MessageHandler handler;

1
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-050 — 5. Action vs Predicate

        ```text
        source_id: S-050
        image_hash: b98772adaa9d
        placements: 1
        image_file: source/images-near-literal-v001/S-050__b98772adaa9d.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        5. Action vs Predicate

Predicate<T> is also a delegate.
“ C# Oo
Predicate<int> isEven = number => number % 2 == 0;

It means:
takes T Oo
returns bool

Equivalent:
```csharp Oo
Func<int, bool> isEven = number => number % 2 Ny 9;
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?


---

## S-051 — 4. Action vs Func

        ```text
        source_id: S-051
        image_hash: 2ff9019278ba
        placements: 1
        image_file: source/images-near-literal-v001/S-051__2ff9019278ba.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        4. Action vs Func
Us- Action when th- method returns | void .
“ C# oO
Action<string> print = text =>
{
Console.WriteLine(text) ;
35
Us- Func when th- method returns a value.
“ C# oO
Func<int, int, int> add = (a, b) =>
{
return a + b;
3s JY
int result = add(2, 3);
        ```

        ### Смысл

        Конспект собирает модель C# events: событие как notification mechanism, publisher/subscriber,
non-generic `EventHandler`, generic `EventHandler<TEventArgs>`, custom `EventArgs`,
recommended protected virtual raiser method, naming conventions, delegates and callback forms.

        ### Вопросы
1. Что публикует publisher, и что делает subscriber?
2. Когда использовать `EventHandler<TEventArgs>` вместо `EventHandler`?
3. Зачем нужен `protected virtual On...` raiser method?

