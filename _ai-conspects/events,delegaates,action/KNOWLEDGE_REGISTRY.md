# Knowledge Registry

Source: `01-final-transcript.md`; SVG: `source/events,delegaates,action.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: publisher/subscriber ownership, standard/custom declarations, custom arguments, sender and compatible handler | `dotnet.csharp-event-declaration-and-raising` | `dotnet` | `../_knowledge/dotnet/csharp-event-declaration-and-raising.md` | MAPPED |
| R01: naming, null-conditional invocation, protected virtual `On<EventName>`, override/base extensibility | `dotnet.csharp-event-declaration-and-raising` | `dotnet` | `../_knowledge/dotnet/csharp-event-declaration-and-raising.md` | MAPPED |
| R02: `+=`/`-=`, lambda identity, publisher retention, lifetime-sensitive unsubscription | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MAPPED |
| R02: mutable cancel arguments versus `CancellationToken` | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MAPPED |
| R02: sequential multicast exceptions, invocation-list isolation and changed semantics | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MAPPED |
| R02: event/delegate restriction and same-process versus durable/distributed delivery boundary | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MAPPED |
| R03: `Action` arities, custom-delegate equivalence, `Func` result position, `Predicate` semantic shape | `dotnet.built-in-delegate-shapes` | `dotnet` | `../_knowledge/dotnet/built-in-delegate-shapes.md` | MAPPED |
| R04: `EventHandler<T>` async-void conversion, lost awaiting/completion and post-await exception boundary | `dotnet.async-callbacks-vs-events` | `dotnet` | `../_knowledge/dotnet/async-callbacks-vs-events.md` | MAPPED |
| R04: awaitable `Func<...,Task>` hooks, sequencing/exception control, controlled callback injection | `dotnet.async-callbacks-vs-events` | `dotnet` | `../_knowledge/dotnet/async-callbacks-vs-events.md` | MAPPED |
| R04: ASP.NET Core authentication `Events` callback properties and awaited token-validation example | `dotnet.async-callbacks-vs-events` | `dotnet` | `../_knowledge/dotnet/async-callbacks-vs-events.md` | MAPPED |
| Boundary descriptions and coverage/audit counts | — | — | — | NON_LEARNING |

The four source regions happen to be four independent semantic recall scopes in this workspace. This is a source-specific boundary result, not a general `region → unit` rule. Representative examples are retained where they demonstrate delegate identity, per-handler failure policy, or async sequencing. No learning claim was intentionally excluded.

| Status | Count |
|---|---:|
| MAPPED | 10 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
