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
