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


## Source closure

- Verified image uses: 14
- Verified non-empty SVG text nodes: 18
- Missing: 0
- Unreviewed: 0
