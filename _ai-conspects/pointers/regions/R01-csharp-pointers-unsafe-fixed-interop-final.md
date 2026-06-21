# R01 — C# pointers, unsafe code, pinning, and safer alternatives final coverage transcript v001

Conspect: `pointers`  
Source: `pointers.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

A compact overview of raw pointers in C#, the unsafe boundary, pinning managed memory, and when pointer-like alternatives are preferable.

Reading quality: verified. The whole sheet is a single coherent region; all 9 image uses and 0 SVG text labels were reviewed against preserved source evidence.

## 1. Pointer syntax and the unsafe boundary

C# permits raw pointer syntax only in an `unsafe` context. A basic example is:

```csharp
unsafe
{
    int x = 10;
    int* p = &x;
    Console.WriteLine(*p);
}
```

Here `int*` means “pointer to `int`”, `&x` obtains the address, and `*p` dereferences the address. This is genuine pointer behavior rather than a normal managed reference.

The project must allow unsafe code, and the method, type, or block must be marked `unsafe`. The restriction exists because invalid addresses, out-of-bounds pointer arithmetic, lifetime mistakes, memory corruption, crashes, and security defects are outside normal CLR safety guarantees.

## 2. Common operations

Inside unsafe code the language permits:

- declaration such as `int* p`;
- address-of with `&value`;
- dereference with `*p`;
- pointer arithmetic such as `p + 1`;
- indexing such as `p[0]`;
- comparison with `null` and other compatible pointers.

Pointer arithmetic advances in units of the pointed-to type, not raw bytes. It is the programmer's responsibility to stay within the valid memory range.

## 3. Managed objects, the GC, and `fixed`

The garbage collector may move managed objects. A pointer into a managed array or object would become invalid if the object moved, so the object must be pinned for the duration of pointer access:

```csharp
unsafe
{
    int[] values = { 10, 20, 30 };

    fixed (int* p = values)
    {
        Console.WriteLine(p[0]);
        Console.WriteLine(p[1]);
    }
}
```

`fixed` prevents relocation only within its scope. Pinning should remain short-lived because long-lived pinned objects can fragment the managed heap.

`stackalloc` can allocate an unmanaged-style buffer on the current stack. Modern C# commonly consumes it through `Span<T>` rather than exposing a raw pointer.

## 4. Where raw pointers are appropriate

Typical cases are:

- native interop and P/Invoke;
- high-performance low-level memory processing;
- custom serializers or binary parsers;
- unmanaged buffers and device/native APIs;
- implementation of runtime or systems libraries.

Most application, web, and business code does not need raw pointers.

## 5. Safer pointer-like alternatives

- `Span<T>` and `ReadOnlySpan<T>` provide bounds-checked access to contiguous memory without heap allocation in many scenarios.
- `Memory<T>` supports longer-lived/asynchronous memory ownership patterns.
- `ref`, `in`, and `ref readonly` expose managed references rather than arbitrary addresses.
- `IntPtr`, `UIntPtr`, `nint`, and `nuint` store native-sized values commonly used at interop boundaries, but they are not automatically typed C-style pointers.

Prefer these managed abstractions unless direct pointer operations are required by the API or measured performance work.

## 6. Coverage

```text
R01 processed image uses: 9
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
