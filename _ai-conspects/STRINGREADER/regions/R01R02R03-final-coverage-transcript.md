# STRINGREADER — final coverage transcript v001

Source SVG: `STRINGREADER.svg`  
Conspect folder: `STRINGREADER`  
Stage: combined final coverage transcript

## 0.1 Area overview / understanding / reading quality

This conspect explains what `StringReader` actually changes when processing a large string line by line, why it can have lower peak live memory than `string.Split`, and why that does **not** mean “zero allocations.” The screenshots are clear enough to recover the complete semantic road. Code punctuation should still be checked against the preserved source images before copying verbatim.

## R01 — Why StringReader and ReadLine basics

`StringReader` is a `TextReader` over an already existing `string`. It keeps a cursor/index into that string and exposes sequential methods such as `Read()`, `ReadLine()`, and `ReadToEnd()`.

Typical use:

```csharp
using var reader = new StringReader(data);

string? line;
while ((line = reader.ReadLine()) is not null)
{
    ProcessLine(line);
}
```

The important behavior is incremental consumption: the caller requests one line, processes it, then requests the next. `StringReader` does not first construct an array containing every line.

It is still allocation-producing. Every successful `ReadLine()` returns a new `string`, because strings are immutable. The gain is mainly that only the current line needs to remain reachable if the application does not retain previous lines.

`StringReader` also does not remove the cost of obtaining the original string. If an HTTP body is first read with `ReadAsStringAsync`, the complete body has already been buffered as a string. For genuinely streaming a large HTTP body, use `ReadAsStreamAsync()` with `StreamReader`; use `StringReader` when a string already exists and must be parsed incrementally.

## R02 — Split versus lazy allocation and GC pressure

A common eager approach is:

```csharp
var lines = data.Split('\n');
```

This normally creates:

```text
- an array containing all segments;
- one string for each segment;
- references that keep all segment strings alive while the array remains alive.
```

With `StringReader`, one line string is produced at a time and there is no line array. This often improves peak live memory, although the total number of allocated line strings can be similar.

Why the smaller live set matters:

1. **Lower peak memory.** The process keeps the original input plus the current line instead of the original input plus all lines.
2. **Less GC tracing work.** The collector has fewer reachable objects and references to scan.
3. **Fewer accidental promotions.** A complete array of lines can survive long enough to move into older generations. Short-lived current-line strings are more likely to die young.
4. **Better behavior under concurrency.** If many requests split large bodies simultaneously, each request retains its own array and all of its line strings. Incremental processing scales peak memory more gently.
5. **Lower retained-object and fragmentation pressure.** Large arrays and very large strings can worsen memory behavior, especially when they remain live for a long time.

The distinction to remember is:

```text
total allocations != allocations simultaneously alive
```

A sequential reader may allocate a line string for every line, but the old line can become unreachable immediately after processing. Lower overlap in object lifetimes is often the real benefit.

## R03 — Concrete memory example and limits

Suppose an input contains ten lines of approximately 1 MB each.

With `Split`, peak reachability can include:

```text
original string + line array + all ten line strings
```

With `StringReader`, while processing one line it can be closer to:

```text
original string + current line
```

The exact byte counts depend on encoding, string representation, line endings, runtime details, and temporary objects, but the lifetime model is the important part.

The benefit disappears if the application stores every returned line, queues them all for later work, or otherwise retains references. Extremely large individual lines can themselves become large-object allocations. Therefore the practical rule is:

```text
Read one item, finish the work, and release it before reading the next.
```

## Practical checklist

```text
1. Use Split for small inputs when clarity matters more than peak memory.
2. Use StringReader when a string already exists and lines can be processed sequentially.
3. Use StreamReader over an HTTP/file stream when the complete string need not be created.
4. Do not retain processed lines unless required.
5. Measure peak live memory and GC behavior, not only total allocated bytes.
```

## Coverage

```text
R01: 4 image uses / 3 text labels
R02: 6 image uses / 1 text label
R03: 3 image uses / 0 text labels
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
