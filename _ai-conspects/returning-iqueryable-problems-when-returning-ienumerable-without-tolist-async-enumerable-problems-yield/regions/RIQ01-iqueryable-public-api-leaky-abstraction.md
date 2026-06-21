# RIQ01 - IQueryable as public API / leaky abstraction / repository boundary

Conspect: `returning-iqueryable-problems-when-returning-ienumerable-without-tolist-async-enumerable-problems-yield`<br>
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 16:25:17 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- IQueryable lets the caller compose provider-translated expressions, so it can leak EF Core implementation details.
- The public API should not expose IQueryable for medium/large systems; keep it internal to repositories.
- Expression<Func<T,bool>> parameters can also leak expression-tree/provider details.
- A safer repository API passes plain filter values and keeps query composition inside the repository.

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
S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031
```

Boundary decision:
```text
RIQ01 covers IQueryable public API/repository boundary and leaky abstraction concerns.
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
| RIQ01A-S001 | S-021 | IU-021 | `0595fc31bb` | RIQ01A | `verified-from-source-image` | no | IQueryable vs IEnumerable LINQ execution location |
| RIQ01A-S002 | S-022 | IU-022 | `060e510549` | RIQ01A | `verified-from-source-image` | no | Title: IQueryable is a leaky abstraction |
| RIQ01A-S003 | S-023 | IU-023 | `97b0d19420` | RIQ01A | `verified-from-source-image` | no | Repository exposes IQueryable and leaks EF translation details |
| RIQ01A-S004 | S-024 | IU-024 | `cfce55e3c2` | RIQ01A | `verified-from-source-image` | no | IQueryable interface is too broad |
| RIQ01A-S005 | S-025 | IU-025 | `557cd8ade7` | RIQ01A | `verified-from-source-image` | no | Expression parameters leak abstractions too |
| RIQ01A-S006 | S-026 | IU-026 | `99cf810381` | RIQ01A | `verified-from-source-image` | no | Do not expose IQueryable as public API |
| RIQ01A-S007 | S-027 | IU-027 | `0f9cd73595` | RIQ01A | `verified-from-source-image` | no | Alternative to IQueryable: IEnumerable interface |
| RIQ01B-S001 | S-028 | IU-028 | `6d3de20cec` | RIQ01B | `verified-from-source-image` | no | Return IEnumerable but pass filters as plain arguments |
| RIQ01B-S002 | S-029 | IU-029 | `857afb5991` | RIQ01B | `verified-from-source-image` | no | IEnumerable can also be leaky |
| RIQ01B-S003 | S-030 | IU-030 | `fc87e7496a` | RIQ01B | `verified-from-source-image` | no | Returning IQueryable from repository: risks and project size note |
| RIQ01B-S004 | S-031 | IU-031 | `94f651210d` | RIQ01B | `verified-from-source-image` | no | Design by Contract / LSP comment about LINQ query objects |

---

## 2. Verified source transcript

## 2.1 RIQ01A

### RIQ01A-S001 / S-021 - `0595fc31bb`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IQueryable vs IEnumerable LINQ execution location

#### Visible text

```text
IQueryable and LINQ.

The slide contrasts:
- IQueryable<Student>.Where(...) runs on the database.
- IEnumerable<Student>.Where(...) runs in memory.

Key notes:
- EF Core translates LINQ into SQL when the source is IQueryable and the expression is translatable.
- IQueryable abstracts away the data source, but that abstraction can hide EF/Core provider limitations.
```

#### Visible code

```csharp
IQueryable<Student> students = /*...*/;
students.Where(x => x.Id == id); // runs on the database

IEnumerable<Student> students = /*...*/;
students.Where(x => x.Id == id); // runs in memory
```

---

### RIQ01A-S002 / S-022 - `060e510549`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Title: IQueryable is a leaky abstraction

#### Visible text

```text
The IQueryable interface is a leaky abstraction.
```

---

### RIQ01A-S003 / S-023 - `97b0d19420`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Repository exposes IQueryable and leaks EF translation details

#### Visible text

```text
The slide shows why IQueryable leaks implementation details.

A controller composes repository output with:
- Where(x => x.Email.EndsWith(".edu")) — can be translated into SQL.
- ToList() — materializes results.
- Select(MapToDto) — cannot be translated into SQL in this example.

The caller must know which part EF Core can translate. That means the repository/API abstraction leaked EF Core provider details.
```

#### Visible code

```csharp
// Student controller
public IEnumerable<StudentDto> GetAll()
{
    return _repository.GetAll()
        .Where(x => x.Email.EndsWith(".edu")) // can be translated into SQL
        .ToList()
        .Select(MapToDto);                    // cannot be translated into SQL
}
```

---

### RIQ01A-S004 / S-024 - `cfce55e3c2`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IQueryable interface is too broad

#### Visible text

```text
IQueryable in EF Core is too broad.

The diagram shows:
- a large set of all LINQ expressions,
- a smaller subset of usable/translatable LINQ,
- examples such as Select(MapToDto) and Where(...EndsWith(".edu")).

Meaning: IQueryable allows callers to pass arbitrary LINQ, but only part of it is supported by the provider.
```

---

### RIQ01A-S005 / S-025 - `557cd8ade7`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Expression parameters leak abstractions too

#### Visible text

```text
Passing an Expression<Func<Student,bool>> into repository API still leaks abstraction. Even if the repository accepts a filter expression instead of returning raw IQueryable, the caller is still aware that the repository understands expression trees and can compose EF-translatable predicates.
```

#### Visible code

```csharp
public IQueryable<Student> GetAll(
    Expression<Func<Student, bool>> expression)
{
    return _context.Set<Student>().Where(expression);
}

// Expressions are also leaking abstractions.
```

---

### RIQ01A-S006 / S-026 - `99cf810381`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Do not expose IQueryable as public API

#### Visible text

```text
Suggested solution:
- Do not use IQueryable as part of the public API.
- It can still be used internally in the repository.
- Knowledge about EF/query translation should not leak outside the repository boundary.
```

---

### RIQ01A-S007 / S-027 - `0f9cd73595`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Alternative to IQueryable: IEnumerable interface

#### Visible text

```text
Alternative to exposing IQueryable:
- expose IEnumerable as the API shape where appropriate,
- LINQ extension methods on IEnumerable do not get converted into SQL.

This makes the repository boundary more explicit: caller-side LINQ is in-memory LINQ, not database query composition.
```

---

## 2.2 RIQ01B

### RIQ01B-S001 / S-028 - `6d3de20cec`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Return IEnumerable but pass filters as plain arguments

#### Visible text

```text
Returning IEnumerable from a repository can still keep filtering inside the repository if filters are passed as plain arguments.

The example accepts emailDomain as string, builds an internal IQueryable, applies Where internally if the filter is present, and returns AsEnumerable().

Important design idea:
- the filter should be passed as an argument,
- represent the filter as a plain value,
- keep provider-specific query composition inside the repository.
```

#### Visible code

```csharp
public IEnumerable<Student> GetAll(string emailDomain)
{
    IQueryable<Student> queryable = _context.Set<Student>();

    if (string.IsNullOrWhiteSpace(emailDomain) == false)
    {
        queryable = queryable.Where(x => x.Email.EndsWith(emailDomain));
    }

    return queryable.AsEnumerable();
}
```

---

### RIQ01B-S002 / S-029 - `857afb5991`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IEnumerable can also be leaky

#### Visible text

```text
The IEnumerable interface is also a leaky abstraction.

This slide transitions from “do not expose IQueryable” to the next issue: returning IEnumerable does not automatically mean the query is materialized or safe. It can still hide deferred execution.
```

---

### RIQ01B-S003 / S-030 - `fc87e7496a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Returning IQueryable from repository: risks and project size note

#### Visible text

```text
Returning IQueryable from a repository:
- allows arbitrary expressions, including unsupported ones,
- can cause runtime exceptions,
- could be fine for small projects,
- is not suitable for medium and large projects according to the slide.
```

---

### RIQ01B-S004 / S-031 - `94f651210d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Design by Contract / LSP comment about LINQ query objects

#### Visible text

```text
Screenshot of a discussion about LINQ query objects and LSP/design-by-contract.

Paraphrase:
- A LINQ query object implements IEnumerable, so the caller sees only MoveNext, Current, and Reset.
- The interface does not expose a way to verify whether the underlying DB connection is still open.
- If a LINQ query requires the caller to know that the DB connection must still be alive, that strengthens the preconditions of IEnumerable.
- That is why the screenshot frames this as an LSP/design-by-contract problem.
```

#### Notes

Long screenshot is paraphrased rather than quoted verbatim.

---

## 3. Cleaned source notes

- Do not expose IQueryable from public APIs in medium/large codebases.
- Keep provider/query composition details inside the repository.
- Pass plain filter values across boundaries instead of arbitrary expression trees.
- Returning IEnumerable is not automatically safe; it just changes the abstraction boundary.

---

## 4. Question hooks

- Why is IQueryable a leaky abstraction?
- What EF Core details does IQueryable expose to callers?
- Why can Expression<Func<T,bool>> also leak implementation details?
- What is a safer repository API shape?
