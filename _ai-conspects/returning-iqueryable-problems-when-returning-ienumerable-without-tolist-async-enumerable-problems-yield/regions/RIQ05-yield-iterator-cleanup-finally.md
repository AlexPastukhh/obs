# RIQ05 - Yield / iterator cleanup / finally restrictions

Conspect: `returning-iqueryable-problems-when-returning-ienumerable-without-tolist-async-enumerable-problems-yield`<br>
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 16:25:17 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- yield return is not allowed inside finally in C# iterator methods.
- Early stop disposes the enumerator and runs finally cleanup.
- C# finally can clean up, but cannot emit extra values.
- Async iterators follow the same cleanup idea with async-specific caveats.

Reading quality:
```text
Overall: high.
Some dark screenshots are cropped chat/code fragments; exact code is preserved where readable.
Confidence: high for concepts; medium-high for cropped snippets.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-041, S-042, S-043, S-044
```

Boundary decision:
```text
RIQ05 covers iterator/async iterator cleanup, finally restrictions, early disposal, and yield limitations.
No boundary correction was required for this region in Stage2.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| RIQ05A-S001 | S-041 | IU-041 | `08bb48288e` | RIQ05A | `verified-from-source-image` | no | yield return not allowed inside finally |
| RIQ05A-S002 | S-042 | IU-042 | `3e6fce2b27` | RIQ05A | `verified-from-source-image` | no | Early stop disposes enumerator and runs finally cleanup |
| RIQ05B-S001 | S-043 | IU-043 | `0513bfd6a7` | RIQ05B | `verified-from-source-image` | no | Manual enumerator disposal triggers cleanup |
| RIQ05B-S002 | S-044 | IU-044 | `83480cf104` | RIQ05B | `verified-from-source-image` | no | Async iterator cleanup and finally |

---

## 2. Verified source transcript

## 2.1 RIQ05A

### RIQ05A-S001 / S-041 - `08bb48288e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: yield return not allowed inside finally

#### Visible text

```text
In C#, yield return is not allowed inside a finally block for either IEnumerable<T> or IAsyncEnumerable<T>. The JavaScript generator pattern of yielding from finally has no direct C# equivalent.

The illegal example yields 1 and 2 in try, then attempts yield return 3 in finally, which is a compile error.
```

#### Visible code

```csharp
IEnumerable<int> Gen()
{
    try
    {
        yield return 1;
        yield return 2;
    }
    finally
    {
        yield return 3; // compile error
    }
}
```

---

### RIQ05A-S002 / S-042 - `3e6fce2b27`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Early stop disposes enumerator and runs finally cleanup

#### Visible text

```text
When enumeration stops early for IEnumerable<T>:
- the enumerator is disposed,
- any finally blocks run during disposal.

You can do cleanup in finally, but you cannot emit more items from there.
```

#### Visible code

```csharp
IEnumerable<int> Gen()
{
    try
    {
        yield return 1;
        yield return 2;
    }
    finally
    {
        Console.WriteLine("cleanup");
    }
}
```

---

## 2.2 RIQ05B

### RIQ05B-S001 / S-043 - `0513bfd6a7`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Manual enumerator disposal triggers cleanup

#### Visible text

```text
Usage example:
- GetEnumerator() creates the enumerator.
- MoveNext() returns true and Current is 1.
- Dispose() prints cleanup.

This is similar to JavaScript generator cleanup, except C# finally can only clean up, not produce more values.
```

#### Visible code

```csharp
var e = Gen().GetEnumerator();
Console.WriteLine(e.MoveNext()); // true, Current = 1
e.Dispose();                     // prints "cleanup"
```

---

### RIQ05B-S002 / S-044 - `83480cf104`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Async iterator cleanup and finally

#### Visible text

```text
Same idea for async IAsyncEnumerable<T>:
- you also cannot yield return from finally.
- an async iterator can do cleanup in finally.

The example yields 1, awaits, yields 2, then in finally writes “async cleanup” and awaits a delay. The screenshot notes that await in finally can also be problematic depending on shape.
```

#### Visible code

```csharp
async IAsyncEnumerable<int> Gen()
{
    try
    {
        yield return 1;
        await Task.Delay(100);
        yield return 2;
    }
    finally
    {
        Console.WriteLine("async cleanup");
        await Task.Delay(100); // also problematic in finally depending on shape
    }
}
```

---

## 3. Cleaned source notes

- C# iterator finally blocks are cleanup-only: no yield return from finally.
- Early stop disposes the enumerator and runs finally.
- Manual enumerator Dispose demonstrates the cleanup path.
- Async iterators have similar cleanup semantics with async caveats.

---

## 4. Question hooks

- Why cannot yield return appear inside finally in C#?
- What happens when enumeration stops early?
- How does Dispose trigger iterator cleanup?
- What is different about cleanup in async iterators?
