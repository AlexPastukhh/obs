# Final semantic transcript — struct, Span and ref struct

Authoritative source: `source/struct span.svg`

---

# R01 — `Span<T>` and stack-only views

## What `Span<T>` represents

`Span<T>` is a contiguous view over memory.

It can refer to:

```text
an array
part of an array
stackalloc memory
unmanaged memory exposed safely
other contiguous storage
```

```csharp
int[] numbers =
    { 1, 2, 3, 4, 5 };

Span<int> all =
    numbers;

Span<int> middle =
    numbers.AsSpan(
        start: 1,
        length: 3
    );
```

A span is a view. Slicing does not copy the underlying elements.

```csharp
middle[0] = 99;

Console.WriteLine(
    numbers[1]
);
// 99
```

## `ReadOnlySpan<T>`

```csharp
ReadOnlySpan<char> text =
    "12345".AsSpan();

ReadOnlySpan<char> prefix =
    text[..3];
```

It provides a read-only view. The underlying storage may still be mutable through another reference, but this view cannot write.

## Why `Span<T>` is a `ref struct`

A span may point to stack memory:

```csharp
Span<int> values =
    stackalloc int[128];
```

Stack memory stops existing when the method returns. Therefore the compiler prevents a span from escaping to the heap.

Restrictions include:

```text
cannot be boxed
cannot be stored in ordinary heap object fields
cannot be used across await
cannot be used across yield
cannot be captured by lambdas
cannot be used as a normal generic type argument
```

These rules make invalid lifetime patterns compile-time errors.

## Custom `ref struct`

```csharp
public ref struct TokenReader
{
    private ReadOnlySpan<char> _text;
    private int _position;

    public TokenReader(
        ReadOnlySpan<char> text)
    {
        _text = text;
        _position = 0;
    }
}
```

Use a custom `ref struct` when a type contains spans or other stack-only references and should share their lifetime restrictions.

---

# R02 — slicing, stack allocation and parsing

## Slicing syntax

```csharp
Span<byte> data =
    buffer.AsSpan();

Span<byte> firstFour =
    data[..4];

Span<byte> remainder =
    data[4..];
```

Slicing creates another view:

```text
no new array
no element copy
same underlying storage
different start/length
```

## `stackalloc`

```csharp
Span<byte> scratch =
    stackalloc byte[256];
```

This avoids a heap allocation for small, short-lived buffers.

Do not use large or unbounded `stackalloc` sizes. Stack space is limited.

Pattern:

```csharp
const int StackLimit = 256;

Span<byte> buffer =
    requiredLength <= StackLimit
        ? stackalloc byte[
            requiredLength
          ]
        : new byte[
            requiredLength
          ];
```

## Allocation-free parsing

```csharp
ReadOnlySpan<char> line =
    "42,2026-06-28,active";

int firstComma =
    line.IndexOf(',');

ReadOnlySpan<char> idText =
    line[..firstComma];

if (int.TryParse(
        idText,
        out int id))
{
    // parsed without substring
}
```

Instead of repeated `Substring`, use span slices and parsing APIs that accept spans.

## Copying

Copy into existing storage:

```csharp
ReadOnlySpan<byte> source =
    input;

Span<byte> destination =
    output;

source.CopyTo(destination);
```

Conditional copy:

```csharp
if (!source.TryCopyTo(
        destination))
{
    // destination too small
}
```

To create an owned array:

```csharp
byte[] copy =
    source.ToArray();
```

That intentionally allocates.

---

# R03 — `Memory<T>` and async boundaries

## Why `Memory<T>` exists

`Span<T>` is optimized for synchronous stack-confined work. `Memory<T>` is a heap-storable representation suitable for:

```text
object fields
async methods
iterators
longer-lived buffers
passing memory across API boundaries
```

```csharp
Memory<byte> memory =
    buffer.AsMemory(
        offset,
        length
    );
```

Inside synchronous code, obtain a span:

```csharp
Span<byte> span =
    memory.Span;
```

Read-only form:

```csharp
ReadOnlyMemory<byte>
```

## Async pattern

```csharp
async Task ProcessAsync(
    Memory<byte> memory,
    CancellationToken token)
{
    await ReadAsync(
        memory,
        token
    );

    Span<byte> span =
        memory.Span;

    ProcessSynchronously(
        span
    );
}
```

Do not keep a span live across an `await`. Reacquire it afterward from `Memory<T>`.

## Ownership is separate from views

A span or memory value does not by itself own the underlying storage.

Possible owners include:

```text
array
pooled buffer
MemoryPool<T> owner
native allocation
string
stack frame
```

The owner defines the actual lifetime.

When using `ArrayPool<T>`:

```csharp
byte[] rented =
    ArrayPool<byte>
        .Shared
        .Rent(size);

try
{
    Span<byte> span =
        rented.AsSpan(
            0,
            size
        );

    // use span
}
finally
{
    ArrayPool<byte>
        .Shared
        .Return(rented);
}
```

Do not use a span/memory view after returning the array to the pool.

## Performance trade-offs

Use spans when profiling shows value in avoiding:

```text
substrings
temporary arrays
repeated copies
small parsing allocations
```

Avoid forcing spans into APIs where ordinary arrays or strings are clearer and performance is irrelevant.

---

# R04 — ref safety and practical design

## Ref-like values are copied as views

```csharp
Span<int> a =
    numbers;

Span<int> b =
    a;

b[0] = 10;
```

Copying the span copies its pointer/length-like metadata, not the underlying elements. Both views reference the same storage.

## Escape rules

The compiler tracks whether a reference could outlive its storage.

Invalid patterns include returning a span over local stack memory:

```csharp
static Span<int> Invalid()
{
    Span<int> local =
        stackalloc int[10];

    return local;
}
```

A span over caller-owned memory can be returned when the lifetime is safe:

```csharp
static Span<int> FirstHalf(
    Span<int> source)
{
    return source[
        ..(source.Length / 2)
    ];
}
```

## `scoped`

Modern C# can use `scoped` to make non-escape intent explicit:

```csharp
static int Sum(
    scoped ReadOnlySpan<int> values)
{
    int total = 0;

    foreach (int value in values)
    {
        total += value;
    }

    return total;
}
```

`scoped` restricts how a reference-like parameter may escape.

## Choose the right type

```text
T[]
    owned mutable heap collection

ReadOnlySpan<T>
    synchronous read-only view

Span<T>
    synchronous mutable view

ReadOnlyMemory<T>
    storable/async read-only view

Memory<T>
    storable/async mutable view

ref struct
    custom stack-only type with ref-like fields
```

## Checklist

```text
[ ] avoid returning views over local stackalloc memory
[ ] do not keep Span<T> across await/yield
[ ] keep stackalloc bounded and small
[ ] identify who owns the underlying storage
[ ] do not use pooled buffers after Return
[ ] use ReadOnlySpan<T> when mutation is unnecessary
[ ] measure before adding span complexity
[ ] remember slicing is a view, not a copy
```

# Coverage

```text
unique embedded screenshots: 22
image uses: 22
native SVG labels: 2
duplicate extra placements: 0

processed image uses: 22
processed text labels: 2
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
