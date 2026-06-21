# RIQ03 - Multiple enumeration hazards for IEnumerable

Conspect: `returning-iqueryable-problems-when-returning-ienumerable-without-tolist-async-enumerable-problems-yield`<br>
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 16:25:17 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- Any, First, Count, ToArray, ToList and foreach are enumeration operations.
- Multiple enumeration can duplicate DB queries, expensive work, side effects, or produce different results.
- Partial enumeration can change behavior because a later enumeration often starts from the beginning.
- Materialize once when the same result set must be reused.

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
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011
```

Boundary decision:
```text
RIQ03 covers multiple enumeration hazards: repeated queries, side effects, partial enumeration, and inconsistent results.
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
| RIQ03B-S001 | S-001 | IU-001 | `02307d2224` | RIQ03B | `verified-from-source-image` | no | Repeated side effects during enumeration |
| RIQ03B-S002 | S-002 | IU-002 | `efe1175e62` | RIQ03B | `verified-from-source-image` | no | Partial enumeration then full enumeration starts over |
| RIQ03B-S003 | S-003 | IU-003 | `07ccbc5f6c` | RIQ03B | `verified-from-source-image` | no | Partial enumeration changes behavior |
| RIQ03B-S004 | S-004 | IU-004 | `c29fe45e34` | RIQ03B | `verified-from-source-image` | no | Hidden database query outside repository boundary |
| RIQ03B-S005 | S-005 | IU-005 | `b87c0d3981` | RIQ03B | `verified-from-source-image` | no | Materialize while DbContext is alive |
| RIQ03A-S001 | S-006 | IU-006 | `3d2e1aae93` | RIQ03A | `verified-from-source-image` | no | Disposed resource due to using block and deferred return |
| RIQ03A-S002 | S-007 | IU-007 | `c687e670b4` | RIQ03A | `verified-from-source-image` | no | Different results on each enumeration |
| RIQ03A-S003 | S-008 | IU-008 | `27f7cb860c` | RIQ03A | `verified-from-source-image` | no | First then ToList repeats expensive enumeration |
| RIQ03A-S004 | S-009 | IU-009 | `ce1689bd76` | RIQ03A | `verified-from-source-image` | no | Expensive work repeated |
| RIQ03A-S005 | S-010 | IU-010 | `569c17e142` | RIQ03A | `verified-from-source-image` | no | Any plus foreach can trigger duplicate DB work |
| RIQ03A-S006 | S-011 | IU-011 | `ba9826e440` | RIQ03A | `verified-from-source-image` | no | Common problem: query runs multiple times |

---

## 2. Verified source transcript

## 2.1 RIQ03A

### RIQ03A-S001 / S-006 - `3d2e1aae93`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Disposed resource due to using block and deferred return

#### Visible text

```text
Problem D: disposed resource.

A method creates a DbContext in a using block and returns a deferred query. The using block ends before the returned sequence is enumerated. When the caller later calls ToList(), enumeration happens after disposal.
```

#### Visible code

```csharp
public IEnumerable<User> GetUsers()
{
    using var db = new AppDbContext();
    return db.Users.Where(u => u.IsActive);
}

var users = repo.GetUsers();
var list = users.ToList();
```

---

### RIQ03A-S002 / S-007 - `c687e670b4`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Different results on each enumeration

#### Visible text

```text
Problem C: different results on each enumeration.

The sequence returns DateTime.Now via deferred Select. Two ToList() calls can produce different values because each enumeration re-runs the logic.
```

#### Visible code

```csharp
public IEnumerable<DateTime> GetTimes()
{
    return Enumerable.Range(0, 3).Select(_ => DateTime.Now);
}

var times = GetTimes();

var a = times.ToList();
var b = times.ToList();
```

---

### RIQ03A-S003 / S-008 - `27f7cb860c`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: First then ToList repeats expensive enumeration

#### Visible text

```text
First() enumerates once, then ToList() enumerates again. If the enumeration is expensive, the work is repeated.
```

---

### RIQ03A-S004 / S-009 - `ce1689bd76`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Expensive work repeated

#### Visible text

```text
Problem B: expensive work repeated.

The example processes numbers inside Select and logs “Processing x”. Calling First() and then ToList() can repeat part of the processing because both operations enumerate the deferred sequence.
```

#### Visible code

```csharp
public IEnumerable<int> GetProcessedNumbers()
{
    return Enumerable.Range(1, 5).Select(x =>
    {
        Console.WriteLine($"Processing {x}");
        return x * 2;
    });
}

var nums = GetProcessedNumbers();

var first = nums.First();
var all = nums.ToList();
```

---

### RIQ03A-S005 / S-010 - `569c17e142`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Any plus foreach can trigger duplicate DB work

#### Visible text

```text
Possible issue:
- Any() enumerates once.
- foreach enumerates again.

If the sequence is backed by EF/database/remote query, this may execute twice. That can mean duplicate DB queries, performance problems, and inconsistent data if data changes between enumerations.

Materialize once with ToList() when reuse is needed.
```

#### Visible code

```csharp
var users = repo.GetActiveUsers().ToList();
```

---

### RIQ03A-S006 / S-011 - `ba9826e440`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Common problem: query runs multiple times

#### Visible text

```text
Common problems: query runs multiple times.

The example:
- repository returns _db.Users.Where(u => u.IsActive) as IEnumerable<User>,
- caller stores users,
- users.Any() enumerates once,
- foreach enumerates again.

This is the canonical multiple-enumeration problem.
```

#### Visible code

```csharp
public IEnumerable<User> GetActiveUsers()
{
    return _db.Users.Where(u => u.IsActive);
}

var users = repo.GetActiveUsers();

if (users.Any())
{
    foreach (var user in users)
    {
        Console.WriteLine(user.Name);
    }
}
```

---

## 2.2 RIQ03B

### RIQ03B-S001 / S-001 - `02307d2224`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Repeated side effects during enumeration

#### Visible text

```text
Problem I: repeated side effects.

If enumeration itself performs side effects, those side effects may happen every time the sequence is enumerated. The example reads lines and writes “Reading line” inside Select. Count() and ToArray() both enumerate, so the side effect happens during both enumerations.
```

#### Visible code

```csharp
public IEnumerable<string> GetLines()
{
    return File.ReadLines("data.txt").Select(line =>
    {
        Console.WriteLine("Reading line");
        return line;
    });
}

var lines = GetLines();

var count = lines.Count();
var arr = lines.ToArray();
```

---

### RIQ03B-S002 / S-002 - `efe1175e62`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Partial enumeration then full enumeration starts over

#### Visible text

```text
Continuation of partial enumeration behavior.

After only part of the sequence runs, a later foreach starts enumeration again from the beginning. This can surprise people who think nums is stored results; it is often just a replayable generator.
```

#### Visible code

```csharp
foreach (var n in nums)
{
    Console.WriteLine(n);
}
```

---

### RIQ03B-S003 / S-003 - `07ccbc5f6c`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Partial enumeration changes behavior

#### Visible text

```text
Problem F: partial enumeration changes behavior.

The example sequence has side effects inside an iterator. Calling First() consumes only the first item, so only part of the sequence runs. A later enumeration can start from the beginning again and replay side effects.
```

#### Visible code

```csharp
public IEnumerable<int> GetNumbers()
{
    foreach (var x in Enumerable.Range(1, 3))
    {
        Console.WriteLine($"Yielding {x}");
        yield return x;
    }
}

var nums = GetNumbers();
var first = nums.First();
```

---

### RIQ03B-S004 / S-004 - `c29fe45e34`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Hidden database query outside repository boundary

#### Visible text

```text
Problem E: hidden database query outside repository boundary.

The repository returns IEnumerable<User>, but the actual DB query can execute later in service/controller/UI code. That blurs where execution happens.

Consequences shown:
- DB work happens outside repository boundary,
- exceptions happen later than expected,
- performance is harder to reason about,
- logging/timing/retry behavior gets weird.
```

#### Visible code

```csharp
public IEnumerable<User> GetUsers()
{
    return _db.Users.Where(u => u.IsActive);
}
```

---

### RIQ03B-S005 / S-005 - `b87c0d3981`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Materialize while DbContext is alive

#### Visible text

```text
Continuation of disposed-resource problem.

If enumeration happens after db has already been disposed, the code can throw disposed-context / closed-connection / ObjectDisposedException-style failures.

Safe pattern: return materialized data from inside the resource lifetime so the query runs while db is still alive.
```

#### Visible code

```csharp
public List<User> GetUsers()
{
    using var db = new AppDbContext();
    return db.Users.Where(u => u.IsActive).ToList();
}
```

---

## 3. Cleaned source notes

- Multiple enumeration can cause duplicate work, duplicate queries, side effects, and different data.
- Any/First/Count/ToList/ToArray/foreach all enumerate.
- Materialize once when the result is reused.
- Make method contracts clear when deferred/streaming behavior is intentional.

---

## 4. Question hooks

- Which LINQ methods enumerate a sequence?
- How can Any() plus foreach execute a query twice?
- Why can deferred sequences produce different results on each enumeration?
- When should the caller materialize with ToList?
