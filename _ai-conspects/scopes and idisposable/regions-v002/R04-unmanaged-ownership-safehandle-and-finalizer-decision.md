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
