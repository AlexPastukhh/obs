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
