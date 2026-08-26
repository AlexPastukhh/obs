# Knowledge Registry

Source: `09-full-combined-final-transcript.md`; SVG: `source/async processing of multiple calls,parallelism.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Sections 02–03: concurrency/parallelism, I/O/CPU distinction, hot tasks, deferred LINQ, immediate and sequential starts | `dotnet.async-concurrency-and-task-start` | `dotnet` | `../_knowledge/dotnet/async-concurrency-and-task-start.md` | MAPPED |
| Sections 04–05: semaphore gate/release/cancellation/results/tasks-per-input and `Parallel.ForEachAsync` workers/aggregation | `dotnet.bounded-async-concurrency` | `dotnet` | `../_knowledge/dotnet/bounded-async-concurrency.md` | MAPPED |
| Sections 08–09: allocation shape, channels/backpressure, downstream limits, EF Core context isolation | `dotnet.bounded-async-concurrency` | `dotnet` | `../_knowledge/dotnet/bounded-async-concurrency.md` | MAPPED |
| Sections 12–13: API selection and bounded end-to-end HTTP mechanics | `dotnet.bounded-async-concurrency` | `dotnet` | `../_knowledge/dotnet/bounded-async-concurrency.md` | MAPPED |
| Sections 06–07: async-void/sync-over-async mistakes, blocking waits, starvation, server safeguards | `dotnet.async-failure-ordering-and-server-safety` | `dotnet` | `../_knowledge/dotnet/async-failure-ordering-and-server-safety.md` | MAPPED |
| Sections 10–11: best-effort/fail-fast behavior, cooperative cancellation, loop failure, four order concepts | `dotnet.async-failure-ordering-and-server-safety` | `dotnet` | `../_knowledge/dotnet/async-failure-ordering-and-server-safety.md` | MAPPED |
| Source inventory, regional coverage map, exactness note | — | — | — | NON_LEARNING |

The eight source regions were regrouped around task-start semantics, bounded execution, and production failure/ordering behavior. Section 13's representative end-to-end HTTP example is retained because its combined client, semaphore, response, deserialization, release, aggregation, and filtering mechanics are not replaceable by prose alone. No learning claim was intentionally excluded.

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
