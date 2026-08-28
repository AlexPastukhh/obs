# Knowledge Registry

Source workspace: `_ai-conspects/server browser threads,memory, webworkers , runtime vs compiler , es/`

Authoritative processed source: `regions/R01-browser-main-thread-web-workers-messaging-errors-and-lifecycle.md` through `regions/R05-runtime-versus-compiler-and-sdk-toolchain-responsibilities.md`

Original SVG: `source/server browser threads,memory, webworkers , runtime vs compiler , es.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 main-thread blocking, worker isolation, messaging, structured clone/transfer, errors, lifecycle, costs and CPU-heavy use | `javascript.web-workers-messaging-and-module-loading` | `javascript` | `../_knowledge/javascript/web-workers-messaging-and-module-loading.md` | MAPPED |
| R02 thread-pool work, async I/O completion, CPU consumption, fire-and-forget hazards, hosted ownership and host failure policy | `dotnet.server-threadpool-async-io-and-background-work` | `dotnet` | `../_knowledge/dotnet/server-threadpool-async-io-and-background-work.md` | MAPPED |
| R03 stack/heap model, browser/server isolation, allocation and GC pressure, shared memory, pauses and termination | `architecture.execution-memory-and-failure-boundaries` | `architecture` | `../_knowledge/architecture/execution-memory-and-failure-boundaries.md` | MAPPED |
| R04 `import.meta.url`, module-worker construction, bundler-safe asset resolution and import lifecycle distinctions | `javascript.web-workers-messaging-and-module-loading` | `javascript` | `../_knowledge/javascript/web-workers-messaging-and-module-loading.md` | MAPPED |
| R05 runtime/compiler/SDK responsibilities, error timing and artifact/runtime/toolchain compatibility | `architecture.runtime-compiler-and-sdk-responsibilities` | `architecture` | `../_knowledge/architecture/runtime-compiler-and-sdk-responsibilities.md` | MAPPED |
| Coverage counts, image/text ledgers and reconciliation mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- R01 and R04 form one worker unit because construction and module-relative loading are part of the worker lifecycle.
- Server concurrency remains under .NET while the cross-environment memory/failure comparison is routed to architecture.
- Runtime/compiler/toolchain responsibility is independently recallable from concurrency and memory behavior.

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
