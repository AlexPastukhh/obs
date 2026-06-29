# Scopes and IDisposable — repetition guide v002

## Mental model

1. Dispose resources you own.
2. IDisposable is deterministic cleanup, not garbage collection.
3. A DI scope owns and disposes the scoped instances it creates.
4. A custom finalizer is only for directly owned unmanaged state without a safer wrapper.
5. `Dispose(bool)` shares the deterministic and fallback cleanup paths.
6. Managed objects are touched only in the deterministic path.
7. `GC.SuppressFinalize` removes an already-cleaned object from finalization.
8. SafeHandle localizes raw-handle ownership.
9. Disposal and reachability are independent.

## Questions

1. Compare owned, borrowed, and container-owned IDisposable objects.
2. Compare Dispose with finalization by caller, timing, purpose, and cost.
3. Why does a class containing FileStream normally not need a finalizer?
4. Trace an unreachable finalizable object through the GC.
5. Explain `Dispose(true)` versus `Dispose(false)`.
6. Why is S-017 not a separate knowledge source?
7. Explain what `base(true)` means in a SafeHandle subclass.
8. Why does calling Dispose not make an object unreachable?
9. When should code create an IServiceScope manually?
10. What breaks when a finalizer throws or contains business logic?

## Coding prompts

1. Implement an idempotent IDisposable class that owns only a Stream.
2. Implement a correct finalizable native-memory owner.
3. Repair the compact source example by adding `GC.SuppressFinalize`.
4. Implement a SafeHandle subclass for a raw OS handle.
5. Create and dispose a scope for one background-work item.
