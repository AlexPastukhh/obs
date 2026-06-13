# R01/R02/R03/R04 - .NET allocations / GC pressure / low-allocation patterns / diagnostics final transcript v001

Conspect: `dotnet-allocations-memory-gc-span-arraypool-performance`  
File type: **source-preserving final combined region transcript**  
Stage: **stage-1 / verified final coverage transcript v001**  
Generated: 2026-06-13 07:30:00 UTC

---

## Direction check

Goal:
Convert the allocations SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

Now:
Stage0 source/boundary review is done. This pass processes all candidate regions together because the sheet has 41 image uses and only 3 canvas labels.

This step:
Process R01/R02/R03/R04 together: allocation basics, GC pressure, ASP.NET Core latency effects, shared heap/thread-pool interaction, low-allocation patterns, churn, `StringBuilder`, pools, and diagnostics.

Why:
The canvas is one continuous performance road. The upper half explains what allocates and why allocations matter; the lower half explains what happens under ASP.NET Core load and how to measure/reduce allocation pressure.

Next:
Review/apply archive, commit, then this conspect is complete by image/text-label coverage.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- R01: allocation basics, heap/stack, value/reference examples, async/iterator/generic allocation cases.
- R02: when heap pressure matters, Gen 0/1/2, ASP.NET Core GC pauses and server-GC behavior.
- R03: request-latency spikes, shared heap synchronization, Gen 2 promotion, ThreadPool + GC collapse loop, avoiding promotions.
- R04: heap churn, repeated string concatenation, StringBuilder/reuse/pooling, and measuring allocations with profilers/counters.
```

Key ideas:

- A heap allocation is not only the cost of constructing an object; it creates future GC tracking and cleanup work.
- Frequent short-lived allocations usually hit Gen 0 first, but repeated request allocations can still create visible latency through pauses and CPU time spent collecting.
- Gen 2 collections are the expensive danger zone because they are slower, scan more memory, and can pause many or all request threads.
- ASP.NET Core workloads share one managed heap; many concurrent requests allocating heavily can amplify GC pressure and ThreadPool starvation.
- Allocation optimization is workload-sensitive: startup/configuration/one-time scripts usually do not justify premature optimization, but hot paths and high-throughput servers do.
- Low-allocation patterns include pre-sizing collections, avoiding unnecessary LINQ/closures/boxing, using `Span<T>`/stack allocation carefully, pooling buffers, and reducing long-lived object retention.
- Diagnostics matter: profile allocations before rewriting code; optimize hot allocation paths, not every line.

Reading quality:

```text
overall: high for conceptual content and most code examples
code punctuation: medium-high; preserved PNGs remain source of truth for exact code correction
coverage: final pass closes 41 image uses + 3 text labels; remaining unclosed = 0
```

---

## 1. Boundary / ownership

Included in this pass:

```text
R01 sources: 9
R02 sources: 12
R03 sources: 14
R04 sources: 6
Canvas text labels: 3
Total image uses: 41
```

Duplicate image-use handling:

```text
No duplicate image uses were detected in stage0 for this conspect.
```

Canvas text labels:

```text
- "explain allocations here" belongs to the whole sheet / R01 entry point.
- Two "!!!" labels mark emphasis around allocation pressure / diagnostics roads and are closed in this pass.
```

---

## 2. Verified source-preserving transcript

### 2.1 R01 - allocation basics and what allocates

The upper road starts with a summary table of common .NET constructs and whether they allocate on the heap. It highlights that classes, arrays and strings allocate; structs usually live on the stack unless boxed or stored in heap objects; delegates, closures, async/await state machines and iterator/yield state machines can allocate; and `Span<T>` itself is a stack-only ref struct and is marked as not heap-allocated.

Representative sources:

```text
S-001, S-002, S-003, S-004
```

The async/iterator examples show why innocent-looking control flow can allocate. `async Task Foo()` may create a state machine and continuation objects depending on completion/optimization. `yield return` creates an iterator object on the heap. Generic examples are usage-dependent: a `List<int>` object is allocated on the heap, but whether `T` itself is value/reference controls whether list elements contain values or references.

### 2.2 R01 - why heap allocation matters

The next R01 screenshots explain the cost model. Every heap allocation must be tracked and eventually cleaned by the GC. A loop creating many strings creates high GC pressure, CPU time spent collecting instead of doing useful work, and possible latency spikes/frame drops.

Heap memory is global/shared, managed by GC and requires synchronization; stack memory is thread-local, extremely fast and effectively zero GC cost. This is why stack/contiguous memory has better locality and iteration characteristics, and why arrays can outperform linked lists in tight loops.

Representative sources:

```text
S-006, S-007, S-008, S-005, S-009
```

The value-vs-reference example uses a `Point` as a struct vs class. A struct local can stay stack-like/value-based, while a `new Point()` class object is heap allocated and GC tracked. The point is not that structs are always faster, but that memory shape changes runtime cost.

### 2.3 R02 - when allocations do and do not matter

R02 starts by making the performance tradeoff explicit. More allocations mean more GC; more GC means more pauses; more pauses lower throughput and raise latency. This is why bugs sometimes appear only under load.

The sheet also prevents over-optimization. Heap allocations are not evil; they are just costly. Allocation cost matters less in startup code, configuration loading, one-time setup, low-frequency operations and non-interactive scripts. The rule is to avoid premature optimization and focus on hot paths.

Representative sources:

```text
S-010, S-015, S-011, S-012, S-013, S-014
```

The mental model states: CPU is fast, memory allocation is not, and GC is slower. Heap allocations are compared to taking a loan: small now, paid later, with interest. Professionals obsess over allocations because they are a hidden performance killer, Gen 2 is difficult to optimize away after the fact, and allocation patterns shape scalability.

### 2.4 R02 - GC pauses in ASP.NET Core

The ASP.NET Core road explains that GC pauses can suspend application/request-processing threads so the collector can safely examine and move objects. Under light load this may not matter; under heavy request load it can become visible.

The generational table describes common .NET GC generations:

```text
Gen 0: short-lived objects, most allocations
Gen 1: survivors of Gen 0
Gen 2: long-lived objects
```

Most ASP.NET Core allocations go to Gen 0 first. Under a typical request path, allocating strings, DTOs, collections and async state machines on every request creates constant Gen 0 pressure. If objects survive, they get promoted to Gen 1/Gen 2. Gen 2 pressure can cause real latency spikes, request timeouts and load-balancer trouble.

Representative sources:

```text
S-016, S-017, S-018, S-019, S-020, S-021
```

Server GC is noted as ASP.NET Core's default. It uses multiple GC heaps and is optimized for throughput, but pauses may be more noticeable. The allocation rate matters even when CPU is not maxed out.

### 2.5 R03 - request-latency spikes and shared heap under load

R03 deepens the ASP.NET Core model. An example timeline shows a request that starts, GC pause starts, GC ends, and the request finishes. The request can appear to take much longer even though the user code itself was fast: memory/GC caused the delay.

ASP.NET Core requests share the same managed heap. Each request has its own thread/context, but the heap is global, shared and GC-managed. Allocation requires synchronization and coordination across threads. One allocation-heavy endpoint can therefore slow other endpoints because the GC pause and shared heap effects are process-wide.

Representative sources:

```text
S-022, S-023, S-024, S-025
```

The notes call cross-request object retention dangerous. Static caches or retained request data can keep objects alive beyond the request lifetime. This promotes objects into Gen 2 and raises the cost of every later GC. The rule is that static caches must be bounded and memory leaks hurt everyone.

Representative source:

```text
S-026
```

### 2.6 R03 - ThreadPool + GC interaction collapse loop

The ThreadPool/GC road explains a common ASP.NET Core collapse pattern. During GC, ThreadPool threads may be paused. After GC, the ThreadPool may inject extra threads because it observes request backlog. If allocation remains high, more threads process more requests, which can allocate more objects and trigger more GC. This can become a feedback loop:

```text
high allocation -> GC -> thread starvation -> thread injection -> CPU spike -> more GC
```

Representative sources:

```text
S-027, S-030, S-031, S-032
```

The transcript preserves this as a system-level pattern: allocation pressure can become latency, latency becomes backlog, backlog becomes ThreadPool growth, and ThreadPool growth can amplify CPU/GC pressure.

### 2.7 R03 - avoiding Gen 2 promotion and reducing long-lived allocations

The lower optimization checklist explains that the best fix is to reduce allocation rate first, then reduce object lifetime. It recommends reusing buffers, pre-sizing lists/collections to avoid repeated internal array growth, avoiding per-request allocation in hot paths, avoiding LINQ allocations/closures when it matters, avoiding boxing of value types, and using object pools carefully for reusable objects.

The “how to avoid promotions” source emphasizes short lifetimes: keep per-request data ephemeral, do not store request objects in static/long-lived containers, use pooling only where it actually helps, and measure with tools such as `dotnet-counters`, `dotnet-trace`, `dotnet-gcdump` or PerfView.

Representative sources:

```text
S-028, S-029, S-033, S-034, S-035
```

The final checklist says to measure allocations first, eliminate obvious hot-path allocations, introduce pooling only for frequent large objects, use `ValueTask` where tasks are often completed synchronously, avoid retaining per-request data in static/long-lived structures, test under realistic load, and use `ThreadPool.MinThreads` conservatively when needed.

### 2.8 R04 - heap churn and repeated string allocation

R04 defines heap churn as rapid creation and destruction of heap objects that do not do much useful long-term work. A lot of data is allocated, used briefly, thrown away and then collected. Allocation itself is not always evil, but cleaning it up costs CPU time and causes pauses.

Representative sources:

```text
S-040, S-041
```

The example request handler creates strings from `Guid.NewGuid()`, `DateTime.UtcNow.ToString()` and `new List<int>()`. Each request allocates several objects, they live only for milliseconds, and GC must repeatedly reclaim them. Under high request rates this becomes heavy churn.

### 2.9 R04 - StringBuilder, reuse and pooling

The string road explains why repeated string concatenation allocates: strings in .NET are immutable, so every `s1 + s2` style operation creates a new string and copies contents. In loops, per-request formatting/logging or CSV/JSON building, many short-lived strings are allocated.

`StringBuilder` helps because it uses a resizable internal buffer and appends into it. It reduces the number of heap allocations from many strings to one initial buffer plus occasional growth buffers. This is useful for lots of incremental appends, large loops and hot paths serving many requests per second. It is not necessary for simple small concatenations where interpolation/concat is fine.

Representative sources:

```text
S-036, S-037, S-039
```

The reuse/pooling road warns that allocating a `StringBuilder` per request still costs a small buffer allocation. Reusing or pooling can avoid those allocations, but naive static reuse is unsafe or non-thread-safe. Safer options include `ArrayPool<char>`, `StringBuilderCache`, object pools, or ASP.NET Core-friendly pooling patterns such as `Microsoft.Extensions.ObjectPool.StringBuilderPooledObjectPolicy`.

Representative source:

```text
S-038
```

### 2.10 Final practical conclusion

The final message of the conspect is not “never allocate.” It is:

```text
- know what allocates
- know when allocation rate matters
- keep hot-path allocations and object lifetimes low
- avoid accidental Gen 2 retention
- use Span/buffers/pools only where they simplify or measurably improve the hot path
- measure with real load before and after changes
```

---

## 3. Evidence / source map

Detailed source rows are preserved in:

```text
data/R01R02R03R04-sources-stage1-v001.csv
data/R01R02R03R04-sources-stage1-v001.json
```

Canvas text labels are preserved in:

```text
data/R01R02R03R04-text-labels-stage1-v001.csv
data/R01R02R03R04-text-labels-stage1-v001.json
```

Audit images are preserved in:

```text
audit-assets/R01R02R03R04-source-images/*.png
audit-assets/contact-sheet-R01R02R03R04-final-coverage-v001.png
```

Final coverage audit:

```text
data/final-coverage-audit-stage1-v001.csv
data/final-coverage-audit-stage1-v001.json
```

---

## 4. Final status

```text
total image uses: 41
total text labels: 3
R01 processed: 9 images
R02 processed: 12 images
R03 processed: 14 images
R04 processed: 6 images
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
