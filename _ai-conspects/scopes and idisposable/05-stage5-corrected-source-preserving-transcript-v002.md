# Scopes and IDisposable — corrected source-preserving transcript v002

Generated: 2026-06-30

## Coverage

```text
SVG placements: 22
unique screenshots: 21
duplicate placements: 1
native SVG labels: 11
unique near-literal transcripts: 21 / 21
duplicate records: 1 / 1
uncovered placements: 0
```

The old v001 transcript was closed by source-ID coverage even though region classifications and source text were wrong. This v002 file is the authoritative replacement.

# R01 — ownership, DI scopes, and deterministic disposal

Generated: 2026-06-30

## Policy

Unique screenshots receive source-preserving blocks. S-017 is recorded as a duplicate placement instead of being assigned a false topic.

## S-001 — Ownership determines disposal and finalizer needs

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Rule of thumb:

- If a class only holds managed `IDisposable` objects such as `FileStream`, `SqlConnection`, `Stream`, or DI-resolved services, it normally does not need a finalizer. Dispose owned members from `Dispose()`.
- If the class directly allocates unmanaged resources — native memory, a raw `IntPtr`, or a handle returned from P/Invoke — it is responsible for releasing them. Implement deterministic cleanup and usually a finalizer fallback unless the handle is wrapped by `SafeHandle`.
- If a managed wrapper already owns and protects the native handle, dispose the wrapper; do not add a second finalizer merely “just in case”.

### Study meaning

Ownership, not the presence of an IDisposable field, determines responsibility. Borrowed/container-owned objects must not be disposed casually.

### Recall questions

1. When does a class with only managed IDisposable members need a finalizer?
2. What establishes direct unmanaged ownership?
3. Why does SafeHandle usually eliminate a custom finalizer?
4. What is the difference between owned and borrowed resources?

## S-002 — Why DI scopes exist

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Scopes let the DI container manage scoped lifetimes and dispose resources cleanly.

- Scoped services often hold request state or disposable resources such as DbContext.
- The ASP.NET Core request pipeline creates one scope per request; its provider is available through `HttpContext.RequestServices`.
- Controllers, Razor pages, and factory-based middleware receive scoped services from that scope.
- Outside the request lifecycle, or when a separate lifetime is needed, create a scope with `IServiceScopeFactory` and dispose it.

### Study meaning

A DI scope is both a resolution boundary and a disposal boundary.

### Recall questions

1. What two responsibilities does a DI scope provide?
2. Where is the request service provider exposed?
3. When should IServiceScopeFactory be used?
4. What happens to scoped IDisposable services at scope end?

## S-003 — IDisposable and DI ownership

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

`IDisposable` is a contract for deterministic cleanup of unmanaged or expensive resources.

The ownership rule is: the code or container that creates/owns a resource should dispose it, or transfer ownership explicitly.

A manually created DI scope is disposable. Disposing it causes the container to dispose the disposable scoped services it created.

### Study meaning

Consumers normally do not manually dispose container-owned scoped services; they dispose the scope that owns them.

### Recall questions

1. Who should dispose a resource?
2. What does disposing a scope trigger?
3. Should a controller normally dispose an injected scoped DbContext?

## S-004 — What IDisposable is

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

```csharp
public interface IDisposable
{
    void Dispose();
}
```

It signals that an object holds resources that should be released promptly instead of waiting for non-deterministic GC/finalization behavior.

Typical resources include:

- files and streams;
- database connections or DbContext;
- sockets;
- timers;
- unmanaged memory;
- other owned IDisposable objects.

### Study meaning

Dispose releases external/expensive resources. It does not directly reclaim the object's managed memory.

### Recall questions

1. What method does IDisposable define?
2. Does Dispose collect managed memory immediately?
3. Name four typical disposable resources.
4. Why can delayed cleanup exhaust resources?

## S-005 — Deterministic versus non-deterministic cleanup

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Deterministic cleanup:

```csharp
using var resource = ...;
await using var asyncResource = ...;
resource.Dispose();
```

Cleanup runs at a known lifetime boundary.

Non-deterministic cleanup uses a finalizer such as `~Type()`. The runtime decides when it runs. Finalizers are costly and should be reserved for directly owned unmanaged resources when no safer wrapper is available.

### Study meaning

The normal path is Dispose/using. Finalization is only a last-resort fallback.

### Recall questions

1. Which C# constructs guarantee deterministic cleanup?
2. Why is finalizer timing unpredictable?
3. When is a custom finalizer justified?


---

# R02 — canonical Dispose pattern

Generated: 2026-06-30

## Policy

Unique screenshots receive source-preserving blocks. S-017 is recorded as a duplicate placement instead of being assigned a false topic.

## S-006 — Dispose pattern continuation

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The visible continuation is:

```csharp
public void Dispose() => Dispose(true);

protected virtual void Dispose(bool disposing)
{
    if (_disposed)
        return;

    if (disposing)
    {
        _stream?.Dispose();
    }

    // free unmanaged resources here

    _disposed = true;
}

~MyResource() => Dispose(false);
```

`Dispose(bool)` lets the finalizer path avoid touching managed objects.

**Correction:** if the class declares a finalizer, the public `Dispose()` should also call:

```csharp
GC.SuppressFinalize(this);
```

### Study meaning

Managed cleanup belongs only to the deterministic path. Unmanaged cleanup must be safe from both paths and idempotent.

### Recall questions

1. Why does the finalizer call Dispose(false)?
2. Why is the _disposed guard needed?
3. Which call is missing from the compact public Dispose example?
4. Which resources may be touched only when disposing is true?

## S-007 — Dispose pattern class setup

**Placement status:** `unique-source`  
**Known limits:** first half of a continued code example

### Near-literal normalized transcript

The first half of the class is:

```csharp
public class MyResource : IDisposable
{
    private bool _disposed;
    private readonly Stream _stream;

    public MyResource(Stream stream)
        => _stream = stream;

    public void Dispose()
        => Dispose(true);
```

The shared `Dispose(bool)` implementation continues in S-006.

### Study meaning

Constructor injection does not automatically prove ownership. A real API must document whether the class owns and disposes the supplied stream.

### Recall questions

1. What purpose does _disposed serve?
2. What member is shown?
3. Why must constructor-parameter ownership be documented?


---

# R03 — finalizer mechanics, mistakes, and costs

Generated: 2026-06-30

## Policy

Unique screenshots receive source-preserving blocks. S-017 is recorded as a duplicate placement instead of being assigned a false topic.

## S-008 — What a finalizer is

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

A finalizer is a special method that allows an object to release unmanaged resources before managed memory is finally reclaimed when deterministic disposal did not happen.

```csharp
class MyClass
{
    ~MyClass()
    {
        // unmanaged cleanup fallback
    }
}
```

C# finalizer syntax represents an override of the runtime finalization mechanism.

### Study meaning

A finalizer is scheduled by the runtime. It is not a normal method that application code should call.

### Recall questions

1. What cleanup problem is a finalizer intended to solve?
2. Who invokes it?
3. Is it the primary cleanup path?

## S-009 — Problem solved by a finalizer

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The GC manages managed memory, but it does not automatically release every external resource.

Examples:

- OS file/window/registry handles;
- native memory allocated by `malloc` or `Marshal.AllocHGlobal`;
- native pointers or library objects requiring `Free`, `Close`, or `Release`;
- device/GPU/native buffers.

If the developer forgets `Dispose()`, a finalizer can eventually release directly owned unmanaged resources.

Key idea: finalizer = backup cleanup, not primary cleanup.

### Study meaning

Delayed finalization may prevent a permanent native leak, but it still creates an unnecessarily long resource lifetime.

### Recall questions

1. What does the GC manage automatically?
2. Name three unmanaged resources.
3. Why is a finalizer only a safety net?

## S-010 — Finalization lifecycle

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

1. The object becomes unreachable.
2. The GC sees that it has a finalizer.
3. It is not reclaimed immediately; it is queued for finalization.
4. The finalizer thread eventually executes `~MyClass()`.
5. The object becomes eligible for collection again.
6. A later GC reclaims its managed memory.

Consequences:

- execution is delayed;
- ordering is undefined;
- abrupt process termination may prevent execution;
- finalizable objects survive an additional collection cycle.

### Study meaning

Finalization adds a second-stage lifetime and delays memory reclamation.

### Recall questions

1. Why is memory not reclaimed on the first relevant GC?
2. Which thread executes finalizers?
3. Why must finalizer ordering not be relied upon?
4. What happens after the finalizer finishes?

## S-011 — Finalizer versus Dispose

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

| Feature | `Dispose()` | Finalizer |
|---|---|---|
| Called by | caller / `using` | runtime finalizer thread |
| Timing | deterministic | non-deterministic |
| Normal role | primary cleanup | fallback |
| Performance | comparatively cheap | expensive |
| Error handling | controlled | dangerous |

A correct deterministic path suppresses unnecessary later finalization.

### Study meaning

Dispose is a public lifetime contract. Finalization protects unmanaged ownership only when that contract was missed.

### Recall questions

1. Who initiates each cleanup path?
2. Which one is deterministic?
3. Why are exceptions dangerous in finalizers?
4. How is later finalization suppressed?

## S-012 — Common finalizer mistakes

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Common mistakes:

- writing a finalizer “just in case”;
- putting business logic inside it;
- throwing exceptions from it;
- treating it as an application-shutdown hook;
- assuming it runs immediately after an object becomes unreachable.

### Study meaning

A finalizer must be minimal, resilient, and restricted to unmanaged fallback cleanup.

### Recall questions

1. Why should business logic not be placed in a finalizer?
2. Can it be relied on during shutdown?
3. What can happen if it throws?

## S-013 — Why finalizers are expensive

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Finalizable objects:

- are tracked specially;
- survive at least one extra GC cycle;
- delay memory reclamation;
- execute cleanup on a single finalizer thread, which can become a bottleneck.

Many finalizers increase memory pressure and reduce performance.

### Study meaning

Use SafeHandle or managed wrappers to keep finalization localized and avoid adding finalizers to ordinary application objects.

### Recall questions

1. Why do finalizable objects remain alive longer?
2. How can the finalizer thread become a bottleneck?
3. What is the preferred design alternative?


---

# R04 — unmanaged ownership, SafeHandle, and finalizer decisions

Generated: 2026-06-30

## Policy

Unique screenshots receive source-preserving blocks. S-017 is recorded as a duplicate placement instead of being assigned a false topic.

## S-014 — What counts as an unmanaged resource

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Unmanaged resources are outside the GC-managed heap and require explicit release:

- OS handles;
- native memory;
- native library objects and pointers;
- low-level sockets/device handles;
- GPU/native buffers.

Managed types such as `FileStream`, `SqlConnection`, and SafeHandle-based wrappers may encapsulate these resources and already provide the correct cleanup/finalization behavior.

### Study meaning

Consumers should dispose the managed wrapper instead of duplicating its native cleanup logic.

### Recall questions

1. What distinguishes unmanaged state from managed memory?
2. Why does a FileStream field not require another custom finalizer?
3. Name four unmanaged examples.

## S-015 — Direct unmanaged ownership

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

You directly own an unmanaged resource when your code acquired it from the OS/native library and must perform the matching release.

Examples:

- `Marshal.AllocHGlobal` → `FreeHGlobal`;
- P/Invoke returns a raw handle → matching `Close`;
- native API returns a pointer/object → matching `Free` or `Release`;
- GPU API creates a buffer → matching native destruction.

Holding a `FileStream` or `SafeHandle` means the wrapper directly owns the native handle; your class normally owns only the wrapper.

### Study meaning

Ownership follows the acquisition/release contract, not the fact that a field eventually references native state.

### Recall questions

1. What action normally establishes direct ownership?
2. What matching operation must be known?
3. Who owns the raw handle inside SafeHandle?

## S-016 — When a finalizer is needed

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Use a custom finalizer only when all of these are true:

- the object directly owns unmanaged resources;
- no suitable SafeHandle/managed wrapper is available;
- a fallback is needed if callers miss deterministic disposal.

Do not add a finalizer when:

- the class only holds managed IDisposable members;
- SafeHandle can encapsulate the native handle;
- finalization cost outweighs the limited benefit.

### Study meaning

Preferred order: existing wrapper → custom SafeHandle → finalizer on the owning object only as a last resort.

### Recall questions

1. What three conditions justify a finalizer?
2. Why does a class holding DbContext not need one?
3. What should be preferred for native handles?

## S-017 — Duplicate placement of S-001

**Placement status:** `duplicate-placement`  
**Known limits:** none

### Near-literal normalized transcript

This canvas placement references the same embedded screenshot as S-001.

```text
duplicate-of: S-001
content SHA-256:
04ef95776a998319912084e59348f31d3de86e7ed4756599bb4f0dbd64004fb8
```

Use the S-001 transcript; do not invent a second topic.

### Study meaning

Coverage counts 22 placements, but there are only 21 unique screenshot contents.

### Recall questions

1. How many placements and unique screenshots exist?
2. Which source contains the authoritative transcript?

## S-018 — SafeHandle subclass pattern

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

```csharp
using Microsoft.Win32.SafeHandles;
using System;
using System.Runtime.InteropServices;

internal sealed class MySafeHandle
    : SafeHandleZeroOrMinusOneIsInvalid
{
    private MySafeHandle()
        : base(true)
    {
    }

    protected override bool ReleaseHandle()
    {
        return CloseHandle(handle);
    }

    [DllImport("kernel32.dll")]
    private static extern bool CloseHandle(IntPtr h);
}
```

`base(true)` states that the SafeHandle owns the handle. `ReleaseHandle` performs the matching native close.

### Study meaning

SafeHandle centralizes native ownership and runtime fallback behavior, so consuming classes usually need only deterministic disposal of the wrapper.

### Recall questions

1. What does base(true) mean?
2. Which method releases the native handle?
3. Why is SafeHandle safer than repeating finalizers in consumers?


---

# R05 — Dispose lifecycle, shared cleanup, and GC roots

Generated: 2026-06-30

## Policy

Unique screenshots receive source-preserving blocks. S-017 is recorded as a duplicate placement instead of being assigned a false topic.

## S-019 — What happens with and without Dispose

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

If `Dispose()` is called, external resources are released deterministically. The managed object itself remains in memory until it becomes unreachable and the GC collects it.

If `Dispose()` is not called and there is no finalizer/owner wrapper, managed memory may still be reclaimed while directly owned unmanaged resources remain leaked until process exit or some other release path.

### Study meaning

Resource cleanup and managed-memory collection are different events.

### Recall questions

1. Does Dispose immediately remove the object from memory?
2. Can managed memory be collected while a native resource remains leaked?
3. What prevents that leak?

## S-020 — Dispose step by step

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

1. Caller or framework invokes `Dispose()`.
2. Cleanup code closes handles, streams, connections, native memory, or SafeHandle owners.
3. A full finalizable pattern calls `GC.SuppressFinalize(this)`.
4. The object may still be referenced and remain in managed memory.
5. Later, after it becomes unreachable, the GC reclaims managed memory.

Summary:

```text
Dispose = release resources now
GC = reclaim managed memory later
```

### Study meaning

A disposed object can remain reachable; its methods should enforce documented post-disposal behavior.

### Recall questions

1. What is released by Dispose?
2. Why can the object still exist afterward?
3. What does SuppressFinalize change?
4. When is managed memory reclaimed?

## S-021 — Shared cleanup between Dispose and finalizer

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

When a finalizer exists, cleanup must be reachable from both paths, but release logic should not be duplicated.

Use a shared idempotent method:

```csharp
Dispose(bool disposing)
```

- `Dispose()` calls `Dispose(true)` and then `GC.SuppressFinalize(this)`.
- The finalizer calls `Dispose(false)`.
- The deterministic path may dispose managed members.
- The finalizer path releases only unmanaged state that is safe at finalization time.

### Study meaning

One shared implementation prevents double-release inconsistencies while maintaining the managed/unmanaged boundary.

### Recall questions

1. Should cleanup be duplicated in two methods?
2. What does the boolean mean?
3. Why can the finalizer path not rely on managed collaborators?
4. How is the fallback prevented after successful disposal?

## S-022 — GC roots and reachability

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

An object is unreachable when the GC cannot find a reference path from any GC root.

Typical roots:

- locals and parameters on active stack frames;
- static fields;
- CPU registers;
- runtime/interop GC handles;
- objects referenced by live threads.

If any path from a root reaches the object, it remains reachable.

### Study meaning

Disposal does not change reachability. A disposed object can remain reachable, and an undisposed object can become unreachable.

### Recall questions

1. What precisely makes an object unreachable?
2. Name five root categories.
3. Does Dispose remove references?
4. How do disposal state and reachability differ?
