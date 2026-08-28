# Knowledge Registry

Source workspace: `_ai-conspects/scopes and idisposable/`

Authoritative processed sources: `05-stage5-corrected-source-preserving-transcript-v002.md`; `07-stage7-corrected-closure-audit-v002.md`

Provenance note: `CURRENT_SOURCE_OF_TRUTH.md` records `source/scopes and idisposable.svg`, Git blob SHA `8cd3795aae0bc29337018d6fc42d57281a5c8fa8`, 22 placements and 21 unique screenshots. The SVG path is not physically resolvable on the current branch. This is a provenance inconsistency, not an unresolved learning claim: the corrected source-preserving transcript closes 21/21 unique screenshots and the corrected audit reports 0 uncovered placements.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 S-001: ownership, rather than merely holding an IDisposable member, determines cleanup responsibility; managed wrappers usually do not require another finalizer; borrowed/container-owned objects must not be disposed casually | `dotnet.disposable-ownership-and-deterministic-cleanup` | `dotnet` | `../_knowledge/dotnet/disposable-ownership-and-deterministic-cleanup.md` | MAPPED |
| R01 S-002: DI scope as resolution + disposal boundary; request scope, `HttpContext.RequestServices`, and explicit `IServiceScopeFactory` scope creation outside/separate from request lifetime | `aspnet-core.di-scope-lifetime-and-disposal` | `aspnet-core` | `../_knowledge/aspnet-core/di-scope-lifetime-and-disposal.md` | MAPPED |
| R01 S-003: creator/container ownership determines disposal; disposing a manually created DI scope disposes container-created scoped IDisposable services; consumers normally do not dispose injected scoped services individually | `aspnet-core.di-scope-lifetime-and-disposal` | `aspnet-core` | `../_knowledge/aspnet-core/di-scope-lifetime-and-disposal.md` | MAPPED |
| R01 S-004/S-005: IDisposable releases resources promptly; Dispose does not collect managed memory; `using`/`await using` are deterministic cleanup while finalization is non-deterministic fallback | `dotnet.disposable-ownership-and-deterministic-cleanup` | `dotnet` | `../_knowledge/dotnet/disposable-ownership-and-deterministic-cleanup.md` | MAPPED |
| R02 S-006/S-007: shared `Dispose(bool)` pattern, `_disposed` idempotence guard, deterministic managed cleanup, finalizer-safe unmanaged cleanup, missing `GC.SuppressFinalize(this)` correction, and ownership caveat for constructor-injected Stream | `dotnet.dispose-pattern-and-suppress-finalize` | `dotnet` | `../_knowledge/dotnet/dispose-pattern-and-suppress-finalize.md` | MAPPED |
| R03 S-008/S-009: finalizer meaning, runtime invocation, directly owned unmanaged fallback role, and distinction between managed-memory collection and external-resource release | `dotnet.finalizer-lifecycle-costs-and-failure-boundaries` | `dotnet` | `../_knowledge/dotnet/finalizer-lifecycle-costs-and-failure-boundaries.md` | MAPPED |
| R03 S-010/S-011: finalization queue lifecycle, delayed second collection stage, undefined ordering/process-exit caveat, Dispose-versus-finalizer contract, and suppression after deterministic cleanup | `dotnet.finalizer-lifecycle-costs-and-failure-boundaries` | `dotnet` | `../_knowledge/dotnet/finalizer-lifecycle-costs-and-failure-boundaries.md` | MAPPED |
| R03 S-012/S-013: common finalizer mistakes, no business/shutdown logic, exception danger, extra GC-cycle cost, delayed reclamation, single finalizer-thread bottleneck, and preference for managed wrappers/SafeHandle | `dotnet.finalizer-lifecycle-costs-and-failure-boundaries` | `dotnet` | `../_knowledge/dotnet/finalizer-lifecycle-costs-and-failure-boundaries.md` | MAPPED |
| R04 S-014/S-015: unmanaged-resource examples, acquire/release ownership contract, and distinction between direct native ownership and ownership of a managed wrapper | `dotnet.unmanaged-ownership-safehandle-and-finalizer-decisions` | `dotnet` | `../_knowledge/dotnet/unmanaged-ownership-safehandle-and-finalizer-decisions.md` | MAPPED |
| R04 S-016/S-018: three-condition custom-finalizer decision, wrapper -> SafeHandle -> finalizer preference, SafeHandle subclass ownership via `base(true)`, and `ReleaseHandle` native close responsibility | `dotnet.unmanaged-ownership-safehandle-and-finalizer-decisions` | `dotnet` | `../_knowledge/dotnet/unmanaged-ownership-safehandle-and-finalizer-decisions.md` | MAPPED |
| R05 S-019/S-020: Dispose releases resources while managed object may remain alive; unmanaged leaks can outlive managed collection without the right owner/fallback; suppression and GC happen at different lifecycle stages | `dotnet.disposable-ownership-and-deterministic-cleanup` | `dotnet` | `../_knowledge/dotnet/disposable-ownership-and-deterministic-cleanup.md` | MAPPED |
| R05 S-021: Dispose and finalizer share idempotent `Dispose(bool)` logic; true path may touch managed members, false path only safe unmanaged state; public Dispose suppresses finalization | `dotnet.dispose-pattern-and-suppress-finalize` | `dotnet` | `../_knowledge/dotnet/dispose-pattern-and-suppress-finalize.md` | MAPPED |
| R05 S-022: GC roots, reachability paths, root categories, and independence of disposal state from reachability | `dotnet.gc-roots-reachability-and-disposal-state` | `dotnet` | `../_knowledge/dotnet/gc-roots-reachability-and-disposal-state.md` | MAPPED |
| R04 S-017 duplicate placement of S-001 plus placement/coverage bookkeeping and superseded v001 closure metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- No new topic is introduced. ASP.NET Core request/manual DI-scope semantics extend the existing `aspnet-core` topic; general disposal, finalization, unmanaged ownership, SafeHandle, and GC reachability belong to the existing `dotnet` topic.
- S-001/S-004/S-005/S-019/S-020 form one deterministic-cleanup ownership model: resource release is separate from managed-memory collection, and ownership controls who disposes.
- S-002/S-003 are kept together as the ASP.NET Core DI-scope model because the scope is both resolution and container-owned-disposal boundary.
- R02 and R05 S-021 form one canonical Dispose-pattern unit because `Dispose(bool)`, idempotence, managed/finalizer path separation, and `SuppressFinalize` are one algorithm.
- R03 remains one finalizer lifecycle/cost/failure-boundary unit; splitting mechanics from costs would make the reason for avoiding casual finalizers harder to recall.
- R04 S-014/S-015/S-016/S-018 form one unmanaged-ownership/SafeHandle decision model. S-017 is a duplicate placement and is not a second learning unit.
- S-022 gets a small independent unit because GC-root reachability is a durable runtime model that remains useful beyond disposal, while its relation to disposal is preserved explicitly.
- The SOT-versus-current-path SVG mismatch is retained as provenance metadata rather than converted into `UNRESOLVED`, because the authoritative corrected transcript and closure audit fully close the learning coverage.

| Status | Count |
|---|---:|
| MAPPED | 13 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
