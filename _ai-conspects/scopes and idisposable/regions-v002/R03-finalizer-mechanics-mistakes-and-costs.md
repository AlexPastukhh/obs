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
