# Knowledge Registry

Source workspace: `_ai-conspects/Lazy/`

Authoritative processed sources:
- `04-source-preserving-transcript-v002.md` - 38 screenshot source blocks, complete
- `05-repetition-guide-v002.md`
- `06-corrected-closure-audit-v002.md`
- `regions-v002/`

Original SVG: `source/Lazy.svg` (Git blob SHA: 61bcdd37d8a715fb3db9736ccf87e3bd19baafdd)

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Basic Lazy<T> behavior (S-001): deferred execution until .Value, result caching, exception caching depending on mode | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Simple deferred computation example (S-002): Lazy<int> executes lambda once on first .Value, reuses cached 42 | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Key properties .Value and .IsValueCreated (S-003): .Value triggers init; .IsValueCreated true only on success, stays false on exception | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Default parameterless vs factory constructors (S-004): new Lazy<MyType>() vs new Lazy<MyType>(() => CreateMyType()) | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Factory plus thread-safety mode constructor (S-005): passing LazyThreadSafetyMode to control concurrency behavior | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| ExecutionAndPublication semantics (S-006): 1 thread executes factory, others wait, result published/reused, exceptions cached | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| ExecutionAndPublication code example (S-007): explicit service lazy initialization with ExecutionAndPublication | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| LazyThreadSafetyMode.None (S-008): no synchronization, fastest, unsafe for concurrent access, suitable for local variables | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| PublicationOnly semantics (S-009): multiple threads run factory in parallel, first result wins, others discarded, exceptions not cached | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| PublicationOnly factory requirements (S-010): factory must be idempotent and side-effect-free | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Exception caching in ExecutionAndPublication (S-011): factory failure throws and permanently caches exception, no retry | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| PublicationOnly retry behavior (S-012): failed attempt does not poison instance, subsequent access retries factory | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Lazy<T> vs manual null checking (S-013): if (_obj == null) _obj = Create() is racy under multithreading | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Async factory rule (S-014): use Lazy<Task<T>>, never block synchronously with .Result or .GetAwaiter().GetResult() | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Lazy<Task<string>> file example (S-015): File.ReadAllTextAsync(path) creates shared Task, callers await same completion | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Definition of lock contention (S-016): waiting caused by multiple runnable threads competing for one synchronization point | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Contention in ExecutionAndPublication (S-017): first thread runs factory while others block on lock | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| PublicationOnly contention trade-off (S-018): trades duplicate work for reduced waiting/blocking | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Why PublicationOnly is bad for shared per-key caches (S-019): losing threads discard expensive work, violating compute-once goal | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Why duplicate work is costly in Pattern C (S-020): expensive DB/HTTP/file/CPU work makes duplication worse than waiting | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| When PublicationOnly makes sense (S-021): cheap, idempotent, safe to repeat, lock contention measurably hurts performance | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Constructor-based Lazy<T> example (S-022): ExpensiveLookup building 100k item dictionary | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| PublicationOnly for retriable lazy initialization (S-023): ApiClientFactory.Create() example with transient retry | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Practical mode selection checklist (S-024): permanent config/deployment failure vs temporary network/DNS failure | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| How default Lazy<T> creates value (S-025): uses new MyType(), requires public parameterless ctor, no arguments passed | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| How value factory creates value (S-026): Func<T> passes constructor args, resolves DI dependencies, runs setup code | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Constructor choice and exception caching matrix (S-027): default ctor vs factory across all 3 modes | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Lazy<T> and arguments (S-028): .Value accepts no parameters; 3 patterns: closure capture, factory method/field, keyed dictionary | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Pattern A: capture fixed argument in closure (S-029): path captured in lambda for single fixed argument | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Pattern B: method returning Lazy<T> per argument (S-030): CreateLazyFile(path) returns independent Lazy instance per call | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Pattern C: keyed shared cache via ConcurrentDictionary<TKey, Lazy<TValue>> (S-031): GetOrAdd with ExecutionAndPublication | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Object-owned lazy field example (S-032): TemplateFile with private readonly Lazy<string> _content bound to path | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Direct comparison of thread-safety modes (S-033): ExecutionAndPublication vs PublicationOnly vs None behavior | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Pattern C characteristics (S-034): keyed shared cache, application/service scope, compute once per key | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Pattern B characteristics (S-035): creates on demand, ties to 1 arg, caller owns instance, no shared cache | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Avoid None in Pattern C (S-036): concurrent application caches risk race conditions with LazyThreadSafetyMode.None | `dotnet.lazy-thread-safety-modes-and-exception-caching` | dotnet | `../_knowledge/dotnet/lazy-thread-safety-modes-and-exception-caching.md` | MAPPED |
| Pattern C is an application caching strategy (S-037): shared ownership and per-key reuse across callers | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Pattern B is object design (S-038): lazy lifetime follows single object instance rather than shared keyed cache | `dotnet.lazy-initialization-and-argument-patterns` | dotnet | `../_knowledge/dotnet/lazy-initialization-and-argument-patterns.md` | MAPPED |
| Processing/evidence metadata: source verification, quality correction audit, repetition question bank, SVG native labels | - | - | - | NON_LEARNING |

## Boundary decisions

- Core lifecycle, constructors, async `Lazy<Task<T>>`, and argument-binding patterns (A, B, C) -> `dotnet.lazy-initialization-and-argument-patterns`.
- Concurrency modes (`LazyThreadSafetyMode`), lock contention trade-offs, exception caching matrix, and retriable lazy initialization -> `dotnet.lazy-thread-safety-modes-and-exception-caching`.
- In-flight dynamic task cleanup with `IDistributedCache` belongs to the existing advanced unit `dotnet.per-key-async-single-flight`.

| Status | Count |
|---|---:|
| MAPPED | 38 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
