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
