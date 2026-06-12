# RIQ02 - Returning IEnumerable without ToList / materialization boundary

Conspect: `returning-iqueryable-ienumerable-async-yield`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 16:25:17 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- IEnumerable<T> does not guarantee materialized results; it can still be a deferred recipe.
- ToList materializes once and later enumeration of the list does not rerun the source query.
- Caller-added LINQ after return can still be deferred and repeated in memory.
- Deferred sequences escaping a disposed DbContext/resource boundary can fail later.

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
S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-032, S-033, S-034
```

Boundary decision:
```text
RIQ02 covers returning IEnumerable, ToList/materialization, lazy evaluation, and disposed DbContext risk.
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
| RIQ02A-S001 | S-012 | IU-012 | `ae60863d25` | RIQ02A | `verified-from-source-image` | no | When returning IEnumerable<T> is okay |
| RIQ02A-S002 | S-013 | IU-013 | `e9c9e77a7b` | RIQ02A | `verified-from-source-image` | no | ToList inside repository materializes immediately |
| RIQ02A-S003 | S-014 | IU-014 | `df44059ae3` | RIQ02A | `verified-from-source-image` | no | LINQ before ToList does not replay later |
| RIQ02A-S004 | S-015 | IU-015 | `0cc04e7eb4` | RIQ02A | `verified-from-source-image` | no | Caller-added LINQ after return can replay |
| RIQ02A-S005 | S-016 | IU-016 | `2970a712a5` | RIQ02A | `verified-from-source-image` | no | Type alone does not tell materialization state |
| RIQ02A-S006 | S-017 | IU-017 | `384776d4d6` | RIQ02A | `verified-from-source-image` | no | Without ToList you often have a recipe, not stored results |
| RIQ02A-S007 | S-018 | IU-018 | `81bd1ea6ee` | RIQ02A | `verified-from-source-image` | no | Any then foreach starts enumeration twice |
| RIQ02A-S008 | S-019 | IU-019 | `9d4e1bc771` | RIQ02A | `verified-from-source-image` | no | IEnumerable produces a new enumerator |
| RIQ02A-S009 | S-020 | IU-020 | `d045b88124` | RIQ02A | `verified-from-source-image` | no | Why ToList changes the replay behavior |
| RIQ02B-S001 | S-032 | IU-032 | `f91d34b55c` | RIQ02B | `verified-from-source-image` | no | IEnumerable and lazy evaluation slide |
| RIQ02B-S002 | S-033 | IU-033 | `0dbcd1e572` | RIQ02B | `verified-from-source-image` | no | Disposed DbContext hidden behind IEnumerable |
| RIQ02B-S003 | S-034 | IU-034 | `b8acf08d71` | RIQ02B | `verified-from-source-image` | no | IEnumerable is preferable to IQueryable when DbContext presence is assumed |

---

## 2. Verified source transcript

## 2.1 RIQ02A

### RIQ02A-S001 / S-012 - `ae60863d25`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: When returning IEnumerable<T> is okay

#### Visible text

```text
Returning IEnumerable<T> is not always bad.

It can be fine when:
- deferred/lazy behavior is intentional,
- the source is safe to enumerate later,
- there is no disposed resource issue,
- multiple enumeration is acceptable,
- method documentation/contract makes semantics clear,
- caller benefits from streaming.

The biggest problems appear when external resources or expensive operations are involved.
```

#### Visible code

```csharp
public IEnumerable<int> GetNumbers()
{
    return Enumerable.Range(1, 100).Where(x => x % 2 == 0);
}
```

---

### RIQ02A-S002 / S-013 - `e9c9e77a7b`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ToList inside repository materializes immediately

#### Visible text

```text
If the repository calls ToList() inside the method, the query is materialized immediately. Returning that List<User> typed as IEnumerable<User> does not make it deferred again.

What happens:
1. DB query runs inside the method.
2. Results are loaded into List<User>.
3. The method returns that list through an IEnumerable<User> reference.
```

#### Visible code

```csharp
public IEnumerable<User> GetUsers()
{
    return _db.Users.Where(u => u.IsActive).ToList();
}
```

---

### RIQ02A-S003 / S-014 - `df44059ae3`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: LINQ before ToList does not replay later

#### Visible text

```text
If the LINQ logic is before ToList(), that part runs once when ToList() executes.

In the example:
- Where(u => u.IsActive) runs when ToList() is called.
- Results become List<User>.
- Later enumerations iterate the list only.
- Database LINQ / pre-ToList LINQ does not replay.
```

#### Visible code

```csharp
public IEnumerable<User> GetUsers()
{
    return _db.Users.Where(u => u.IsActive).ToList();
}
```

---

### RIQ02A-S004 / S-015 - `0cc04e7eb4`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Caller-added LINQ after return can replay

#### Visible text

```text
If the caller adds more LINQ after the method returns, that caller-side LINQ can replay.

Example:
- repo.GetUsers() has already materialized the repository part to a list.
- caller's Where(...) is a new deferred LINQ pipeline over that list.
- each enumeration of users repeats the caller-side in-memory Where logic.
- the DB query does not replay, but the in-memory filtering does.
```

#### Visible code

```csharp
var users = repo.GetUsers().Where(u => u.Name.StartsWith("A"));

foreach (var u in users) { }
foreach (var u in users) { }
```

---

### RIQ02A-S005 / S-016 - `2970a712a5`

Metadata:
- status: `verified-from-source-image`
- readability: `medium`
- cut off: `no`
- confidence: `high`
- theme: Type alone does not tell materialization state

#### Visible text

```text
Canvas note: even when the static return type is IEnumerable<T>, you must distinguish:
- an already-materialized collection returned as IEnumerable<T>,
- a deferred/replayable sequence returned as IEnumerable<T>.

The type alone does not prove whether enumeration will replay query logic.
```

#### Notes

Small canvas note; surrounding context makes the meaning clear.

---

### RIQ02A-S006 / S-017 - `384776d4d6`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Without ToList you often have a recipe, not stored results

#### Visible text

```text
Without ToList(), you often have a deferred sequence, not stored results.

The source contrasts:
- “there is a query / recipe / iterator that can produce users when enumerated”
with:
- “there is a finished in-memory collection of users”

It then shows an Any() check followed by foreach. Those are two separate enumerations.
```

#### Visible code

```csharp
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

### RIQ02A-S007 / S-018 - `81bd1ea6ee`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Any then foreach starts enumeration twice

#### Visible text

```text
First enumeration:
- users.Any() starts enumerating users to answer whether there is at least one item.
- it runs the sequence once.

Second enumeration:
- foreach (var user in users) starts enumeration again from the beginning.
- it runs the sequence again.

This explains why a deferred IEnumerable can execute twice.
```

---

### RIQ02A-S008 / S-019 - `9d4e1bc771`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IEnumerable produces a new enumerator

#### Visible text

```text
Think of IEnumerable<T> as “something that can produce an enumerator.”

Each time you enumerate an IEnumerable<T>, it typically gives a new enumerator and a fresh pass over the logic.

If users is backed by deferred LINQ such as _db.Users.Where(...):
- Any() triggers one pass/query,
- foreach triggers another pass/query.
```

#### Visible code

```csharp
_db.Users.Where(u => u.IsActive)
```

---

### RIQ02A-S009 / S-020 - `d045b88124`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why ToList changes the replay behavior

#### Visible text

```text
ToList() changes the behavior by materializing the sequence once.

When code calls repo.GetActiveUsers().ToList():
- it enumerates the source,
- executes the query/logic,
- copies results into List<User>.

After that, users is an in-memory list.
```

#### Visible code

```csharp
var users = repo.GetActiveUsers().ToList();
```

---

## 2.2 RIQ02B

### RIQ02B-S001 / S-032 - `f91d34b55c`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IEnumerable and lazy evaluation slide

#### Visible text

```text
IEnumerable is evaluated lazily.

In the controller example:
- _repository.GetAll(".edu") is not executed at assignment.
- students.Select(MapToDto) is not executed at assignment.
- dtos.ToList() is the method that triggers query execution.
```

#### Visible code

```csharp
[HttpGet]
public IEnumerable<StudentDto> GetAll()
{
    IEnumerable<Student> students = _repository.GetAll(".edu"); // not executed here

    IEnumerable<StudentDto> dtos = students.Select(MapToDto);   // not executed here either

    return dtos.ToList(); // triggers query execution
}
```

---

### RIQ02B-S002 / S-033 - `0dbcd1e572`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Disposed DbContext hidden behind IEnumerable

#### Visible text

```text
Returning a deferred IEnumerable from inside a using block is dangerous.

The screenshot shows a method returning _context.Set<Student>() while SchoolContext is disposed when the using block ends. Because the query is lazy, enumeration happens later after the context is gone.

Result:
- this code throws an exception,
- the caller must know whether the DbContext is still alive.
```

#### Visible code

```csharp
public IEnumerable<Student> GetAll(string emailDomain)
{
    using (SchoolContext context = new SchoolContext())
    {
        return _context.Set<Student>();
    } // DbContext is disposed here
}
```

#### Notes

The code screenshot uses both local context and _context visually; transcript preserves the visible intent: deferred query escapes the context lifetime.

---

### RIQ02B-S003 / S-034 - `b8acf08d71`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IEnumerable is preferable to IQueryable when DbContext presence is assumed

#### Visible text

```text
Slide conclusion:
- IEnumerable is greater/preferred over IQueryable in this context.
- The presence of a DbContext is a reasonable assumption.

Meaning: returning IEnumerable communicates a less powerful API than IQueryable, but only if the resource lifetime/materialization contract is clear.
```

---

## 3. Cleaned source notes

- IEnumerable<T> can mean either a finished collection or a deferred recipe.
- ToList() creates a materialization boundary.
- LINQ before ToList runs once; LINQ added after return can still be deferred and replayed.
- Never let a deferred sequence escape a disposed DbContext/resource lifetime.

---

## 4. Question hooks

- When is returning IEnumerable<T> okay?
- What does ToList() change about replay behavior?
- Why does caller-added LINQ after return still replay?
- Why is returning deferred data from a disposed DbContext dangerous?
