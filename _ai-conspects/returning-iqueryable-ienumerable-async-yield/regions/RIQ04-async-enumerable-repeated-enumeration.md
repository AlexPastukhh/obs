# RIQ04 - Async enumerable repeated enumeration / caching / single-use streams

Conspect: `returning-iqueryable-ienumerable-async-yield`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 16:25:17 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- IAsyncEnumerable<T> is also usually a deferred recipe, not stored results.
- await foreach and ToListAsync enumerate the async sequence.
- Repeated async enumeration can repeat DB/HTTP/delay/file/streaming work.
- Some async enumerables are effectively single-use; materialize once when reuse is required.

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
S-035, S-036, S-037, S-038, S-039, S-040
```

Boundary decision:
```text
RIQ04 covers sync/async deferred enumeration, ToList/ToListAsync caching, repeated async work, and single-use streams.
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
| RIQ04A-S001 | S-035 | IU-035 | `a85a680041` | RIQ04A | `verified-from-source-image` | no | Deferred IEnumerable logic reruns on each enumeration |
| RIQ04A-S002 | S-036 | IU-036 | `ab7ec4847f` | RIQ04A | `verified-from-source-image` | no | ToList caches once but original seq still reruns |
| RIQ04B-S001 | S-037 | IU-037 | `438cdbae16` | RIQ04B | `verified-from-source-image` | no | IAsyncEnumerable is usually a recipe too |
| RIQ04B-S002 | S-038 | IU-038 | `66959a94bb` | RIQ04B | `verified-from-source-image` | no | await foreach and ToListAsync enumerate async sequence |
| RIQ04B-S003 | S-039 | IU-039 | `dc66c2e091` | RIQ04B | `verified-from-source-image` | no | Async repeated enumeration can be more expensive |
| RIQ04B-S004 | S-040 | IU-040 | `30a0ae790d` | RIQ04B | `verified-from-source-image` | no | Some async enumerables are single-use |

---

## 2. Verified source transcript

## 2.1 RIQ04A

### RIQ04A-S001 / S-035 - `a85a680041`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Deferred IEnumerable logic reruns on each enumeration

#### Visible text

```text
If a method returns a deferred IEnumerable<T> such as yield return / Select / Where, every enumeration runs the logic again.

The example iterator prints “start”, yields 1, prints “middle”, yields 2. Those statements are inside the iterator body, so they run when the sequence is enumerated.
```

#### Visible code

```csharp
IEnumerable<int> GetNumbers()
{
    Console.WriteLine("start");
    yield return 1;
    Console.WriteLine("middle");
    yield return 2;
}
```

---

### RIQ04A-S002 / S-036 - `ab7ec4847f`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ToList caches once but original seq still reruns

#### Visible text

```text
The code shows:
- var seq = GetNumbers(); // no logic runs yet
- var list = seq.ToList(); // first enumeration: logic runs here
- foreach (var x in seq) // second enumeration: logic runs again

Important distinction: enumerating list again would not rerun the original logic, but enumerating seq again does.
```

#### Visible code

```csharp
var seq = GetNumbers();    // no logic runs yet

var list = seq.ToList(); // first enumeration: logic runs here

foreach (var x in seq)   // second enumeration: logic runs again
{
    Console.WriteLine(x);
}
```

---

## 2.2 RIQ04B

### RIQ04B-S001 / S-037 - `438cdbae16`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IAsyncEnumerable is usually a recipe too

#### Visible text

```text
IAsyncEnumerable<T> has the same idea. If the async sequence is deferred, each async enumeration runs the async logic again.

The example async iterator writes “start”, awaits delay, yields 1, writes “middle”, awaits delay, yields 2. Calling ToListAsync twice runs the iterator twice.
```

#### Visible code

```csharp
async IAsyncEnumerable<int> GetNumbers()
{
    Console.WriteLine("start");
    await Task.Delay(100);
    yield return 1;

    Console.WriteLine("middle");
    await Task.Delay(100);
    yield return 2;
}

var seq = GetNumbers(); // no async iteration yet

var list1 = await seq.ToListAsync(); // first async enumeration
var list2 = await seq.ToListAsync(); // second async enumeration, logic runs again
```

---

### RIQ04B-S002 / S-038 - `66959a94bb`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: await foreach and ToListAsync enumerate async sequence

#### Visible text

```text
Key points:
- await foreach enumerates the async sequence.
- ToListAsync() also enumerates it.
- every new enumeration usually starts from the beginning.
- the original async iterator body runs again on each enumeration.

The example materializes once with ToListAsync(), then await foreach over the original seq runs query/logic again.
```

#### Visible code

```csharp
var seq = GetUsersAsync();

var list = await seq.ToListAsync(); // runs query/logic once

await foreach (var user in seq)     // runs query/logic again
{
    Console.WriteLine(user.Name);
}
```

---

### RIQ04B-S003 / S-039 - `dc66c2e091`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Async repeated enumeration can be more expensive

#### Visible text

```text
Same rule as sync:
- using seq again reruns.
- using list again does not rerun original async logic.

Practical difference: async sequence reruns may repeat database calls, HTTP calls, delays, file reads, or streaming work. So repeated async enumeration can be even more expensive or dangerous.
```

---

### RIQ04B-S004 / S-040 - `30a0ae790d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Some async enumerables are single-use

#### Visible text

```text
Some async enumerables are effectively single-use in practice, especially if they wrap a stream or external resource.

A second enumeration may:
- rerun,
- fail,
- return different data,
- or not be supported well.

Safe pattern when reuse is needed: materialize once with ToListAsync() and reuse the list.
```

#### Visible code

```csharp
var items = await GetUsersAsync().ToListAsync();

// Then reuse items.
```

---

## 3. Cleaned source notes

- IAsyncEnumerable<T> has the same replay behavior as deferred IEnumerable<T>.
- await foreach and ToListAsync both enumerate.
- Repeated async enumeration can repeat expensive I/O.
- Use ToListAsync once and reuse the list when stable data is needed.

---

## 4. Question hooks

- Why is IAsyncEnumerable<T> also a recipe?
- What does ToListAsync() cache?
- Why can repeated async enumeration be more dangerous than sync?
- When should async streams be treated as single-use?
