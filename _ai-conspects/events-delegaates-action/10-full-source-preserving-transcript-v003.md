# Full source-preserving transcript v002 — Events, delegates, Action

Generated: 2026-07-04 UTC

```text
authoritative SVG: source/events,delegaates,action.svg
SHA-256: 58fe05fdd4d608c36102140c4a25a6f8975bc5d914825d20ebc1aea90364778e
Git blob SHA: cfd4c2bd0e189a5df4c5044c8f1f92c426aa3c66
viewBox: 0 0 11869.821610637824 7026.789949796054
unique embedded screenshots: 51 / 51
image uses: 51 / 51
duplicate extra placements: 0
native SVG text lines: 47 / 47
source blocks: 51 / 51
```

## Topic boundary

C# events, delegates, EventHandler, Action/Func and publisher–subscriber patterns.

## Transcript policy

Visible wording and code are preserved source-by-source with conservative OCR normalization.
Obvious glyph substitutions, broken member-access spacing and editor artifacts are corrected.
Exact screenshot typography remains authoritative.

---

## S-001 — Recommended pattern: protected virtual raiser method

```text
source_id: S-001
image_hash: c469f841150e
placements: 1
image_file: source/images-near-literal-v001/S-001__c469f841150e.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Recommended pattern: protected virtual raiser method
This is a common C# style:
public class OrderService
{
public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
public void PlaceOrder(int orderId, decimal total)
{
OnOrderPlaced(new OrderPlacedEventArgs(orderId, total));
}
protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
{
OrderPlaced?.Invoke(this, e);
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Recommended pattern: protected virtual raiser method»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-002 — Common event declaration styles

```text
source_id: S-002
image_hash: 97f07900e026
placements: 1
image_file: source/images-near-literal-v001/S-002__97f07900e026.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Common event declaration styles
Non-generic event

public event EventHandler? SomethingHappened;
Raise:

SomethingHappened?.Invoke(this, EventArgs.Empty);
Use when there is no custom data.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Common event declaration styles»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-003 — Event naming conventions

```text
source_id: S-003
image_hash: 311f2e32ebf0
placements: 1
image_file: source/images-near-literal-v001/S-003__311f2e32ebf0.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Event naming conventions
Event name:
public event EventHandler? Saved;
public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Event naming conventions»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-004 — Event with custom data

```text
source_id: S-004
image_hash: ff11f4e24eaa
placements: 1
image_file: source/images-near-literal-v001/S-004__ff11f4e24eaa.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Event with custom data
Create custom event args:
public sealed class OrderPlacedEventArgs: EventArgs
{
public OrderPlacedEventArgs(int orderId, decimal total)
{
OrderId = orderId;
Total = total;
}
public int OrderId { get; }
public decimal Total { get; }
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Event with custom data»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-005 — What is an event?

```text
source_id: S-005
image_hash: 6ff390f124e8
placements: 1
image_file: source/images-near-literal-v001/S-005__6ff390f124e8.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
What is an event?

An event is a way for one object to notify other objects that something happened.
Publisher raises the event.
Subscribers handle event.

Example:
OrderService says: "OrderPlaced happened."
EmailService reacts: "Send email."
AnalyticsService reacts: "Track event."
~~~

### Recall

1. Какую часть event/delegate pattern показывает «What is an event?»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-006 — Raiser method:

```text
source_id: S-006
image_hash: 9346a03ae05d
placements: 1
image_file: source/images-near-literal-v001/S-006__9346a03ae05d.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Raiser method:

protected virtual void OnSaved({EventArgs e)

protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
Event args:

public sealed class OrderPlacedEventArgs: EventArgs
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Raiser method:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-007 — It lets derived classes override the event-raising behavior.

```text
source_id: S-007
image_hash: 634f3bec0182
placements: 1
image_file: source/images-near-literal-v001/S-007__634f3bec0182.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Why?
It lets derived classes override the event-raising behavior.
public class SpecialOrderService: OrderService
{
protected override void OnOrderPlaced(OrderPlacedEventArgs e)
{
Console.WriteLine("Before event.");
base.OnOrderPlaced(e);
Console.WriteLine("After event."); LU
}
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «It lets derived classes override the event-raising behavior.»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-008 — Basic event pattern

```text
source_id: S-008
image_hash: eb17aa139cc1
placements: 1
image_file: source/images-near-literal-v001/S-008__eb17aa139cc1.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Basic event pattern
public class OrderService
{
public event EventHandler? OrderPlaced;
public void PlaceOrder()
{
Console.WriteLine("Order placed.");
OrderPlaced?.Invoke(this, EventArgs.Empty);
} L
}
Ca ehcrmhn:
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Basic event pattern»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-009 — Generic event

```text
source_id: S-009
image_hash: 77304ee34dce
placements: 1
image_file: source/images-near-literal-v001/S-009__77304ee34dce.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Generic event

public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
Raise:

OrderPlaced?.Invoke(this, new OrderPlacedEventArgs(orderId, total));
Use when you need to send data.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Generic event»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-010 — Publisher:

```text
source_id: S-010
image_hash: df2835c50d36
placements: 1
image_file: source/images-near-literal-v001/S-010__df2835c50d36.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Publisher:
public class OrderService
{
public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;
public void PlaceOrder(int orderId, decimal total)
{
Console.WriteLine($"Order {orderId} placed.");
OrderPlaced?.Invoke(
this,
new OrderPlacedEventArgs(orderId, total));
}
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Publisher:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-011 — Common names:

```text
source_id: S-011
image_hash: 16223e910f3e
placements: 1
image_file: source/images-near-literal-v001/S-011__16223e910f3e.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Common names:
SomethingHappened
SomethingChanged
SomethingCompleted
SomethingFailed
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Common names:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-012 — Subscribe:

```text
source_id: S-012
image_hash: 83592e117e95
placements: 1
image_file: source/images-near-literal-v001/S-012__83592e117e95.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Subscribe:
var service = new OrderService();
service.OrderPlaced += (sender, args) =>
{
Console.WriteLine("OrderPlaced event received.");
service.PlaceOrder();
Output
Order placed. NY Oo
OrderPlaced event received.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Subscribe:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-013 — Custom delegate event

```text
source_id: S-013
image_hash: ea7ddc8135a8
placements: 1
image_file: source/images-near-literal-v001/S-013__ea7ddc8135a8.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Custom delegate event
Less common:
public delegate void OrderPlacedHandler(int orderId);
public class OrderService
{
public event OrderPlacedHandler? OrderPlaced;
public void PlaceOrder(int orderId)
{
OrderPlaced?.Invoke(orderId);
}
}
Modern C# usually prefers EventHandler<TEventArgs> .
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Custom delegate event»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-014 — Subscriber.

```text
source_id: S-014
image_hash: 41cdcb66a669
placements: 1
image_file: source/images-near-literal-v001/S-014__41cdcb66a669.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Subscriber.
var service = new OrderService();
service.OrderPlaced += HandleOrderPlaced;
service.PlaceOrder(1001, 49.99m);
static void HandleOrderPlaced(object? sender, OrderPlacedEventArgs e)
{
Console.WriteLine($"Order ID: {e.OrderId}");
Console.WriteLine($"Total: {e.Total}");
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Subscriber.»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-015 — 3. Then why does ASP.NET Core AuthenticationHandler use "events'

```text
source_id: S-015
image_hash: 329c01e41c46
placements: 1
image_file: source/images-near-literal-v001/S-015__329c01e41c46.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
3. Then why does ASP.NET Core AuthenticationHandler use "events'
ASP.NET Core authentication "events" are usually async callback hooks.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «3. Then why does ASP.NET Core AuthenticationHandler use "events'»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-016 — Cancellable event

```text
source_id: S-016
image_hash: 6e2d4739cb00
placements: 1
image_file: source/images-near-literal-v001/S-016__6e2d4739cb00.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Cancellable event
public sealed class BeforeDeleteEventArgs: EventArgs
{
public bool Cancel { get; set; }
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Cancellable event»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-017 — When a delegate is better than an event

```text
source_id: S-017
image_hash: f4992715cd21
placements: 1
image_file: source/images-near-literal-v001/S-017__f4992715cd21.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
2. If I just need to run outside-provided code inside a method, should
I use delegates?

Yes.

If you have one method and you want outside code to customize specific parts of that method, delegates
are often better than events.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «2. If I just need to run outside-provided code inside a method, should»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-018 — The problem with async handlers

```text
source_id: S-018
image_hash: 9dbdf13e0d86
placements: 1
image_file: source/images-near-literal-v001/S-018__9dbdf13e0d86.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
The problem with async handlers
Suppose you write:
"CH @
service.OrderPlaced += async (sender, e) =>
{
await SendEmailAsync(e.OrderId);
This compiles because EventHandler<T> returns void .
~~~

### Recall

1. Какую часть event/delegate pattern показывает «The problem with async handlers»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-019 — Subscribe and unsubscribe

```text
source_id: S-019
image_hash: 90c1082db169
placements: 1
image_file: source/images-near-literal-v001/S-019__90c1082db169.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Subscribe and unsubscribe
var service = new OrderService();
service.OrderPlaced += HandleOrderPlaced;
service.OrderPlaced -= HandleOrderPlaced;
Handler.
static void HandleOrderPlaced(object? sender, OrderPlacedEventArgs e)
{
Console.WriteLine(e.OrderId);
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Subscribe and unsubscribe»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-020 — Example:

```text
source_id: S-020
image_hash: 6481c2b0e512
placements: 1
image_file: source/images-near-literal-v001/S-020__6481c2b0e512.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Example:
service.OrderPlaced += async (sender, e) =>
{
await Task.Delay(100);
throw new Exception("Email failed");
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Example:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-021 — Event exception behavior

```text
source_id: S-021
image_hash: b3ecfc787444
placements: 1
image_file: source/images-near-literal-v001/S-021__b3ecfc787444.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Event exception behavior
If one event handler throws, later handlers may not run.
Example:
service.OrderPlaced += (sender, e) =>
{
throw new Exception("Handler failed.");
service.OrderPlaced += (sender, e) =>
{ v
Console.WriteLine("This may not run.");
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Event exception behavior»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-022 — Events vs mediator/domain events in ASP.NET Core

```text
source_id: S-022
image_hash: 01c648e0e28e
placements: 1
image_file: source/images-near-literal-v001/S-022__01c648e0e28e.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Events vs mediator/domain events in ASP.NET Core
C# events are in-memory, same-process notifications.
They are okay for simple object-level notifications.
But in ASP.NET Core business systems, be careful.
C# events do not automatically provide:
database transaction integration OQ
retry
persistence
distributed messaging
cross-service communication
background delivery V
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Events vs mediator/domain events in ASP.NET Core»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-023 — options.Events = new JwtBearerEvents

```text
source_id: S-023
image_hash: 5df337fb6318
placements: 1
image_file: source/images-near-literal-v001/S-023__5df337fb6318.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
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
// custom failure handling
await Task.CompletedTask;
}
}); Vv
~~~

### Recall

1. Какую часть event/delegate pattern показывает «options.Events = new JwtBearerEvents»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-024 — If you need every handler to be attempted, manually iterate:

```text
source_id: S-024
image_hash: c510114ebe1d
placements: 1
image_file: source/images-near-literal-v001/S-024__c510114ebe1d.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
If you need every handler to be attempted, manually iterate:
protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
{
var handlers = OrderPlaced?.GetInvocationList();
if (handlers is null)
{
return;
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «If you need every handler to be attempted, manually iterate:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-025 — Memory leak warning

```text
source_id: S-025
image_hash: 452b025c14bb
placements: 1
image_file: source/images-near-literal-v001/S-025__452b025c14bb.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Memory leak warning

Events can keep subscribers alive.

Example:
publisher.SomeEvent += subscriber.Handle;

Now the publisher has a reference to the subscriber through the event delegate.

If the publisher lives much longer than the subscriber, the subscriber may not be garbage collected.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Memory leak warning»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-026 — Publisher:

```text
source_id: S-026
image_hash: cc02d22d6715
placements: 1
image_file: source/images-near-literal-v001/S-026__cc02d22d6715.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Publisher:
public event EventHandler<BeforeDeleteEventArgs>? BeforeDelete;
public void Delete()
{
var args = new BeforeDeleteEventArgs();
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Publisher:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-027 — Example:

```text
source_id: S-027
image_hash: 7cbc606d7231
placements: 1
image_file: source/images-near-literal-v001/S-027__7cbc606d7231.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Example:
" C# Oo
public async Task ProcessOrderAsync(
Order order,
Func<Order, Task>? beforeSave = null,
Func<Order, Task>? afterSave = null)
{
Validate(order);
if (beforeSave is not null)
{
await beforeSave(order);
}
await SaveOrderAsync(order);
if (afterSave is not null)
{
await afterSave(order);
}
1 Ny
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Example:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-028 — 1. Event is invoked. OQ

```text
source_id: S-028
image_hash: 12cb01513d43
placements: 1
image_file: source/images-near-literal-v001/S-028__12cb01513d43.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Flow:
1. Event is invoked. OQ
2. Handler starts.
3. Handler reaches await Task.Delay.
4. Handler returns control to caller.
5. Event invocation finishes.
6. Later, after await, exception is thrown.
7. Publisher's try/catch is already gone.
That is why classic C# events are not great for async workflows.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «1. Event is invoked. OQ»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-029 — So the async lambda becomes effectively:

```text
source_id: S-029
image_hash: 7ded500ed67c
placements: 1
image_file: source/images-near-literal-v001/S-029__7ded500ed67c.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
So the async lambda becomes effectively:
async void

That is the dangerous part.

async void means:
The caller cannot await it. OQ
The caller cannot reliably catch its exceptions.
The caller does not know when it finishes. Vv
~~~

### Recall

1. Какую часть event/delegate pattern показывает «So the async lambda becomes effectively:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-030 — foreach (EventHandler<OrderPlacedEventArgs> handler in handlers)

```text
source_id: S-030
image_hash: bae5a328193b
placements: 1
image_file: source/images-near-literal-v001/S-030__bae5a328193b.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
foreach (EventHandler<OrderPlacedEventArgs> handler in handlers)
{
try
{
handler(this, e);
}
catch (Exception ex)
{
Console.WriteLine(ex.Message);
}
}
}
~~~

### Recall

1. Какую часть event/delegate pattern показывает «foreach (EventHandler<OrderPlacedEventArgs> handler in handlers)»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-031 — For domain events, people often use:

```text
source_id: S-031
image_hash: 36d3749db8e2
placements: 1
image_file: source/images-near-literal-v001/S-031__36d3749db8e2.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
For domain events, people often use:
MediatR Oo
message queues
outbox pattern
integration events
Example:
OrderPlaced C# event: Oo
good for in-memory notification
OrderPlaced integration event:
better for notifying another service
~~~

### Recall

1. Какую часть event/delegate pattern показывает «For domain events, people often use:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-032 — BeforeDelete?.Invoke(this, args);

```text
source_id: S-032
image_hash: 8a5c4409c615
placements: 1
image_file: source/images-near-literal-v001/S-032__8a5c4409c615.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
BeforeDelete?.Invoke(this, args);
if (args.Cancel)
{
return;
}
// delete
}
Subscriber.
service.BeforeDelete += (sender, e) =>
{ NV
- .Cancel = true;
~~~

### Recall

1. Какую часть event/delegate pattern показывает «BeforeDelete?.Invoke(this, args);»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-033 — publisher.SomeEvent -= subscriber.Handle;

```text
source_id: S-033
image_hash: 685607d65a3d
placements: 1
image_file: source/images-near-literal-v001/S-033__685607d65a3d.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Fix:

publisher.SomeEvent -= subscriber.Handle;
Especially important for:

static events

singleton services

long-lived publishers

UI apps

background services

~~~

### Recall

1. Какую часть event/delegate pattern показывает «publisher.SomeEvent -= subscriber.Handle;»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-034 — These are called "events," but they are not like:

```text
source_id: S-034
image_hash: 4b2665965a77
placements: 1
image_file: source/images-near-literal-v001/S-034__4b2665965a77.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
These are called "events," but they are not like:
public event EventHandler SomethingHappened;
~~~

### Recall

1. Какую часть event/delegate pattern показывает «These are called "events," but they are not like:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-035 — Anonymous lambda subscription:

```text
source_id: S-035
image_hash: 6d5388c323f2
placements: 1
image_file: source/images-near-literal-v001/S-035__6d5388c323f2.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Anonymous lambda subscription:
service.OrderPlaced += (sender, e) =>
{
Console.WriteLine(e.OrderId);
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Anonymous lambda subscription:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-036 — So this code:

```text
source_id: S-036
image_hash: e4bd98e85db9
placements: 1
image_file: source/images-near-literal-v001/S-036__e4bd98e85db9.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
So this code:
try
{
OrderPlaced?.Invoke(this, args);
}
catch (Exception ex)
{
Console.WriteLine("Caught");
}
may not catch exceptions thrown after an await inside the handler.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «So this code:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-037 — They are properties whose type is usually like:

```text
source_id: S-037
image_hash: a90bcf2e1847
placements: 1
image_file: source/images-near-literal-v001/S-037__a90bcf2e1847.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
They are properties whose type is usually like:
" C# Oo
Func<SomeContext, Task>

For example, conceptually:
"CH Oo
public Func<TokenValidatedContext, Task> OnTokenValidated { get; set; }
~~~

### Recall

1. Какую часть event/delegate pattern показывает «They are properties whose type is usually like:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-038 — Usage:

```text
source_id: S-038
image_hash: 733395144cd8
placements: 1
image_file: source/images-near-literal-v001/S-038__733395144cd8.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Usage:
"CH Oo
await ProcessOrderAsync(
order,
beforeSave: async order =>
{
await auditService.WriteAsync("Before save");
}
afterSave: async order =>
{
await emailService.SendAsync (order -. Id);
This is not really an "event system." This is a method accepting callbacks.
That is useful when:
The caller provides behavior. Oo
The method controls exactly where that behavior runs.
The method wants to await the behavior. Vy
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Usage:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-039 — Events vs delegates

```text
source_id: S-039
image_hash: 0b76099d18d5
placements: 1
image_file: source/images-near-literal-v001/S-039__0b76099d18d5.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Events vs delegates
A delegate is a type that points to a method.
public delegate void Notify(string message);
An event is a restricted delegate-like member.
With an event, outside code can:
service.OrderPlaced += Handler;
service.OrderPlaced -= Handler;
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Events vs delegates»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-040 — Be careful: anonymous lambdas are harder to unsubscribe from unless you store them.

```text
source_id: S-040
image_hash: c672ae1e6bd7
placements: 1
image_file: source/images-near-literal-v001/S-040__c672ae1e6bd7.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Be careful: anonymous lambdas are harder to unsubscribe from unless you store them.
EventHandler<OrderPlacedEventArgs> handler = (sender, e) =>
{
Console.WriteLine(e.OrderId);
service.OrderPlaced += handler;
service.OrderPlaced -= handler;
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Be careful: anonymous lambdas are harder to unsubscribe from unless you store them.»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-041 — So the authentication handler can do this:

```text
source_id: S-041
image_hash: c21945886f9a
placements: 1
image_file: source/images-near-literal-v001/S-041__c21945886f9a.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
So the authentication handler can do this:

await Events.TokenValidated(context);
or conceptually:

await options -.Events.OnTokenValidated(context);
That means ASP.NET Core can await your custom code.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «So the authentication handler can do this:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-042 — For async callbacks, use:

```text
source_id: S-042
image_hash: 937068273f83
placements: 1
image_file: source/images-near-literal-v001/S-042__937068273f83.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
For async callbacks, use:
" C# Oo
Func<Task>
Func<T, Task>
Func<TContext, Task>
not Action .
Because Action returns void, so it cannot be await Vv
~~~

### Recall

1. Какую часть event/delegate pattern показывает «For async callbacks, use:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-043 — So this is okay:

```text
source_id: S-043
image_hash: a7aa6bc83623
placements: 1
image_file: source/images-near-literal-v001/S-043__a7aa6bc83623.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
So this is okay:
OnTokenValidated = async context =>
{
var db = context.HttpContext.RequestServices.GetRequiredService<AppDbContext>();
var userId = context.Principal!.FindFirst("sub")! .Value;
var userExists = await db.Users.AnyAsync(u => u.Id == userId);
if (!userExists)
{
context.Fail("User no longer exists.");
}
}
The authentication pipeline waits for that code.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «So this is okay:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-044 — 2. Action with parameters

```text
source_id: S-044
image_hash: 8716be78f6d3
placements: 1
image_file: source/images-near-literal-v001/S-044__8716be78f6d3.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
2. Action with parameters
Action has generic versions:

Action<T>

Action<T1, T2>

Action<T1, 12, T3>
~~~

### Recall

1. Какую часть event/delegate pattern показывает «2. Action with parameters»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-045 — Yes. Action is a delegate type.

```text
source_id: S-045
image_hash: b1e8481a15b4
placements: 1
image_file: source/images-near-literal-v001/S-045__b1e8481a15b4.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Yes. Action is a delegate type.
More specifically:
Action = built-in generic delegate for methods that return void (
So instead of creating your own delegate like this:
"> CH (
public delegate void Notify();
you can often use:
Action Vv
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Yes. Action is a delegate type.»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-046 — 3. Action<int, string> example

```text
source_id: S-046
image_hash: fb5b95857036
placements: 1
image_file: source/images-near-literal-v001/S-046__fb5b95857036.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
3. Action<int, string> example
Action<int, string> logUser = (userId, name) =>
{
Console.WriteLine($"User {userId}: {name}");
logUser(42, "Bob");
The delegate shape is:
takes int
takes string
returns void
Equivalent custom delegate:
public delegate void LogUserDelegate(int userId, string name);
~~~

### Recall

1. Какую часть event/delegate pattern показывает «3. Action<int, string> example»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-047 — Example:

```text
source_id: S-047
image_hash: e162dfe62eba
placements: 1
image_file: source/images-near-literal-v001/S-047__e162dfe62eba.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Example:
Action<string> printMessage = message =>
{
Console.WriteLine(message);
printMessage(""Hello");
This means:
A delegate pointing to a method that takes a string and returns void.
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Example:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-048 — So common built-in delegates are:

```text
source_id: S-048
image_hash: ef04b2680f95
placements: 1
image_file: source/images-near-literal-v001/S-048__ef04b2680f95.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
So common built-in delegates are:

Delegate Meaning

Action no parameters, returns | void
Action<T> takes T, returns | void
Func<TResult> no parameters, returns |TResult
Func<T, TResult> takes T, returms | TResult
Predicate<T> takes T, returns | bool
~~~

### Recall

1. Какую часть event/delegate pattern показывает «So common built-in delegates are:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-049 — Equivalent custom delegate:

```text
source_id: S-049
image_hash: a745c65f52c5
placements: 1
image_file: source/images-near-literal-v001/S-049__a745c65f52c5.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Equivalent custom delegate:
public delegate void MessageHandler(string message);

So this:
Action<string> handler;

is similar to this:
MessageHandler handler;

1
~~~

### Recall

1. Какую часть event/delegate pattern показывает «Equivalent custom delegate:»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-050 — 5. Action vs Predicate

```text
source_id: S-050
image_hash: b98772adaa9d
placements: 1
image_file: source/images-near-literal-v001/S-050__b98772adaa9d.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
5. Action vs Predicate

Predicate<T> is also a delegate.
" C# Oo
Predicate<int> isEven = number => number % 2 == 0;

It means:
takes T Oo
returns bool

Equivalent:
Func<int, bool> isEven = number => number % 2 Ny 9;
~~~

### Recall

1. Какую часть event/delegate pattern показывает «5. Action vs Predicate»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?

---

## S-051 — 4. Action vs Func

```text
source_id: S-051
image_hash: 2ff9019278ba
placements: 1
image_file: source/images-near-literal-v001/S-051__2ff9019278ba.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
4. Action vs Func
Use Action when the method returns | void .
" C# oO
Action<string> print = text =>
{
Console.WriteLine(text);
Use Func when the method returns a value.
" C# oO
Func<int, int, int> add = (a, b) =>
{
return a + b;
3s JY
int result = add(2, 3);
~~~

### Recall

1. Какую часть event/delegate pattern показывает «4. Action vs Func»?
2. Какие обязанности принадлежат publisher, а какие subscriber?
3. Как воспроизвести показанный API или код без просмотра screenshot?
