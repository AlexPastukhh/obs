# EF01A - Tracking / identity map / no tracking / identity resolution

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **2 / verified transcript v001**  
Generated: 2026-06-01 22:43:34 UTC

---

## Done

- EF01 boundary review split the first left-band area into EF01A and EF01B.
- This file completes EF01A transcript.
- EF01B loading-collections sources remain pending.

## Now

- Review this transcript diff.
- Commit if the text/candidate coverage looks right.

## Next

- EF01B transcript.
- Meaning: loading collections, Include, Find, Load, AutoInclude.
- Sources pending for EF01B: `S-006, S-029, S-030, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-059, S-060`.

## Later

- Continue to the next EF Core area by boundary review first.
- Do not start a transcript without candidate review/contact-sheet check.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

- EF Core tracking and change tracker cost
- identity map inside one DbContext
- when query results become tracked
- Find behavior with already tracked entities
- no-tracking reads and DTO projection
- AsNoTrackingWithIdentityResolution and when to use it
- avoiding big Include graphs in read paths

Key ideas:

- Use no tracking by default for read-only queries to avoid CPU/memory cost.
- Tracking queries attach entities to the current DbContext change tracker.
- Identity map means one tracked object instance per primary key inside one DbContext.
- Find only skips the database query if the entity is already tracked.
- If you already have the tracked entity instance, usually do not call Find again.
- Project to DTO/anonymous types to avoid materializing unnecessary entities/navigations.
- AsNoTrackingWithIdentityResolution is a middle ground: no long-lived tracking, but temporary identity resolution during result materialization.
- Do not default to identity resolution always because it costs more than plain AsNoTracking.
- Prefer projection over big Include graphs; if multiple collections must be included, consider AsSplitQuery.

Reading quality:

```text
Overall: high.
Limitations: S-009/S-033/S-058 have cropped context; S-054/S-055 are continuation cards.
Confidence: high for visible source transcript and concept relationships.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-010, S-031, S-009, S-032, S-008, S-033, S-034, S-007, S-035, S-036, S-053, S-054, S-055, S-056, S-057, S-058
```

Pending / not included in EF01A:

```text
EF01B loading collections / Include / Find / Load / AutoInclude:
S-006, S-029, S-030, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-059, S-060
```

Boundary decision:

```text
EF01A covers tracking, identity map, no-tracking read paths, projection, Find behavior, and identity resolution.
EF01B is kept separate because it is about loading related data/collections.
S-007 mentions Include/AsSplitQuery, but it is included here as read optimization/projection guidance; deeper loading APIs stay EF01B.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF01A-S001 | S-010 | IU-010 | `e64cf87310` | `verified-from-source-image` | no | make reads no-tracking by default |
| EF01A-S002 | S-031 | IU-031 | `af19e8920a` | `verified-from-source-image` | no | identity map meaning and why it matters |
| EF01A-S003 | S-009 | IU-009 | `1256f47477` | `verified-visible-partial-from-source-image` | top-context-cropped | AsNoTrackingWithIdentityResolution usage |
| EF01A-S004 | S-032 | IU-032 | `27e0fafb7d` | `verified-from-source-image` | no | when an entity becomes tracked |
| EF01A-S005 | S-008 | IU-008 | `5f5db5c14f` | `verified-from-source-image` | no | project only what you need |
| EF01A-S006 | S-033 | IU-033 | `31d62e0a78` | `verified-visible-partial-from-source-image` | top-context-cropped | Attach/Add also make entity tracked |
| EF01A-S007 | S-034 | IU-034 | `07d0c9bb3c` | `verified-from-source-image` | no | Find skips query only if entity is already tracked |
| EF01A-S008 | S-007 | IU-007 | `a67f713ace` | `verified-from-source-image` | no | avoid big Include graphs |
| EF01A-S009 | S-035 | IU-035 | `f5a69d20bc` | `verified-from-source-image` | no | do not call Find again if tracked entity instance is already in hand |
| EF01A-S010 | S-036 | IU-036 | `0e5b2c9aff` | `verified-from-source-image` | bottom-slightly-close-but-text-visible | when Find is useful |
| EF01A-S011 | S-053 | IU-053 | `05e414e028` | `verified-from-source-image` | no | what AsNoTrackingWithIdentityResolution is |
| EF01A-S012 | S-054 | IU-054 | `be97b0c8b5` | `verified-from-source-image` | bottom-continues-in-next-source | compare tracking and no tracking |
| EF01A-S013 | S-055 | IU-055 | `75c8a8c2fe` | `verified-visible-partial-from-source-image` | bottom-continues-after-visible-area | no tracking plus identity resolution |
| EF01A-S014 | S-056 | IU-056 | `2252a4c4af` | `verified-from-source-image` | no | why identity resolution matters |
| EF01A-S015 | S-057 | IU-057 | `eb072cdd8b` | `verified-from-source-image` | no | not default; rule for choosing tracking/no-tracking/identity-resolution |
| EF01A-S016 | S-058 | IU-058 | `16669395cb` | `verified-visible-partial-from-source-image` | top-context-cropped | practical default: AsNoTracking then switch to identity resolution when needed |

---

## 2. Verified source transcript

### EF01A-S001 / S-010 - `e64cf87310`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-tracking-read-performance`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: make reads no-tracking by default

#### Visible text

```text
Make reads "no tracking" by default

Tracking is a big CPU/memory cost on large result sets.

- Per query:
```

#### Visible code

```csharp
var users = await db.Users
    .AsNoTracking()
    .Where(u => u.IsActive)
    .ToListAsync();
```

#### Additional visible text

```text
- If you never need tracking in a whole codepath:
```

#### Additional visible code

```csharp
db.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
```

#### Notes

Full source image visually checked.

---

### EF01A-S002 / S-031 - `af19e8920a`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-identity-map`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: identity map meaning and why it matters

#### Visible text

```text
Identity map means:

inside one DbContext, EF Core keeps one tracked object instance per primary key.

So if the context is already tracking Student { Id = 10 }, and you query that same student again, EF will not track a second Student object with the same key. It reuses the tracked one.

Why this matters

Without identity map, one context could end up with:

- two different Student objects with Id = 10
- conflicting changes
- confusing relationship graphs

With identity map, EF says: one row/key -> one in-memory tracked entity instance.
```

#### Notes

Full source image visually checked.

---

### EF01A-S003 / S-009 - `1256f47477`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01a-identity-resolution-code-fragment`
- readability: `high`
- cut off: `top-context-cropped`
- confidence: `high-for-visible-text`
- theme: AsNoTrackingWithIdentityResolution usage

#### Visible text

```text
- If you need identity resolution (avoid duplicate instances) but still no tracking:
```

#### Visible code

```csharp
.AsNoTrackingWithIdentityResolution()
```

#### Additional visible text

```text
use only when you need it; it costs more than plain AsNoTracking()
```

#### Notes

Top context is cropped; visible text/code is clear.

---

### EF01A-S004 / S-032 - `27e0fafb7d`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-when-entity-becomes-tracked`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: when an entity becomes tracked

#### Visible text

```text
When does an entity become tracked?

Usually when you:
```

#### Visible code

```csharp
var student = context.Students.Single(x => x.Id == 10);
```

#### Additional visible text

```text
or
```

#### Additional visible code

```csharp
var student = context.Students.Find(10);
```

#### Notes

Full source image visually checked.

---

### EF01A-S005 / S-008 - `5f5db5c14f`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-projection-avoid-materialization`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: project only what you need

#### Visible text

```text
Project only what you need (avoid entity materialization)

Materializing entities + navigations is expensive. Project to DTO/anonymous types.
```

#### Visible code

```csharp
var list = await db.Orders
    .AsNoTracking()
    .Where(o => o.Status == Status.Open)
    .Select(o => new OrderRowDto
    {
        Id = o.Id,
        Number = o.Number,
        Total = o.Total,
        CustomerName = o.Customer.Name
    })
    .ToListAsync();
```

#### Additional visible text

```text
This often beats any other optimization.
```

#### Notes

Full source image visually checked.

---

### EF01A-S006 / S-033 - `31d62e0a78`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01a-attach-add-tracking`
- readability: `high`
- cut off: `top-context-cropped`
- confidence: `high-for-visible-text`
- theme: Attach/Add also make entity tracked

#### Visible text

```text
or

or

As long as it is a tracking query and the same DbContext is still alive, EF keeps that entity in its change tracker.
```

#### Visible code

```csharp
context.Attach(student);
```

#### Additional visible code

```csharp
context.Add(student);
```

#### Notes

Top context is cropped; visible text/code is clear.

---

### EF01A-S007 / S-034 - `07d0c9bb3c`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-find-identity-map`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Find skips query only if entity is already tracked

#### Visible text

```text
So yes: Find skips the query only if it was already loaded/tracked

Example:

Why no query on the second line?

Because after the first line, Student(10) is already tracked by this DbContext.

So Find(10) checks the change tracker, sees it there, and returns that same instance.
```

#### Visible code

```csharp
var s1 = context.Students.Single(x => x.Id == 10); // DB query
var s2 = context.Students.Find(10);              // no DB query
```

#### Notes

Full source image visually checked.

---

### EF01A-S008 / S-007 - `a67f713ace`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-avoid-big-include-graphs`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: avoid big Include graphs

#### Visible text

```text
Avoid big Include() graphs

Include() loads full entities and can explode row counts.

- Prefer projection (above).
- If you must include multiple collections, consider split queries:
```

#### Visible code

```csharp
var data = await db.Customers
    .AsNoTracking()
    .Include(c => c.Orders)
    .Include(c => c.Addresses)
    .AsSplitQuery()
    .ToListAsync();
```

#### Additional visible text

```text
AsSplitQuery() reduces cartesian explosion memory/CPU (at the cost of more round-trips). For many graphs, it's a win.
```

#### Notes

Full source image visually checked. This connects to EF01A read optimization, while deeper loading details remain EF01B.

---

### EF01A-S009 / S-035 - `f5a69d20bc`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-find-not-needed-if-entity-in-hand`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: do not call Find again if tracked entity instance is already in hand

#### Visible text

```text
Yes — your intuition is basically right.

If you already have the tracked entity instance in your hand, then there is usually no reason to call Find for it again.

Example:

That is enough. No need for:

because student already is the tracked instance.
```

#### Visible code

```csharp
var student = context.Students.Single(x => x.Id == id);

// later
context.Entry(student).Collection(x => x.Enrollments).Load();
```

#### Additional visible code

```csharp
var student2 = context.Students.Find(id);
```

#### Notes

Full source image visually checked.

---

### EF01A-S010 / S-036 - `0e5b2c9aff`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-when-find-useful`
- readability: `high`
- cut off: `bottom-slightly-close-but-text-visible`
- confidence: `high`
- theme: when Find is useful

#### Visible text

```text
So when is Find useful?

Find is useful when you have the key, but you do not know whether the entity is already tracked in the current DbContext.

Typical situation:

Why this can be useful:

- maybe earlier in the same unit of work the student was already loaded
- maybe not
- Find handles both cases:
  - tracked already -> no root query
  - not tracked -> query by PK

So Find is not for "I already have the entity object."
It is for "I have the id and want the tracked instance if it already exists."
```

#### Visible code

```csharp
public void EnrollStudent(long studentId, long courseId)
{
    var student = context.Students.Find(studentId);
    context.Entry(student).Collection(x => x.Enrollments).Load();
}
```

#### Notes

Full source image visually checked.

---

### EF01A-S011 / S-053 - `05e414e028`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-asnotracking-identity-resolution-definition`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: what AsNoTrackingWithIdentityResolution is

#### Visible text

```text
1. What AsNoTrackingWithIdentityResolution() is

It means:

- EF Core does not track the entities for later updates
- but while building the result, EF still does identity resolution

Identity resolution means:

if the same entity row appears multiple times in the query result, EF can reuse the same object instance in the materialized result instead of creating duplicate objects for that same entity key
```

#### Notes

Full source image visually checked.

---

### EF01A-S012 / S-054 - `be97b0c8b5`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-compare-tracking-no-tracking`
- readability: `high`
- cut off: `bottom-continues-in-next-source`
- confidence: `high-for-visible-text`
- theme: compare tracking and no tracking

#### Visible text

```text
Compare the 3 modes

Tracking
```

#### Visible code

```csharp
query.ToListAsync()
```

#### Additional visible text

```text
- entities are tracked by the DbContext
- same entity key maps to one tracked instance in the context
- changes can be detected and saved

No tracking
```

#### Additional visible code

```csharp
query.AsNoTracking()
```

#### Notes

The no-tracking bullet list continues below the visible crop and into the next source.

---

### EF01A-S013 / S-055 - `75c8a8c2fe`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01a-compare-no-tracking-identity-resolution`
- readability: `high`
- cut off: `bottom-continues-after-visible-area`
- confidence: `high-for-visible-text`
- theme: no tracking plus identity resolution

#### Visible text

```text
No tracking + identity resolution
```

#### Visible code

```csharp
query.AsNoTrackingWithIdentityResolution()
```

#### Additional visible text

```text
- entities are still not tracked
- but EF uses temporary identity resolution while materializing the result
- same entity key in result can map to the same object instance within that query result

So it is kind of a middle ground:

- no long-lived tracking
- but no unnecessary duplicate entity instances in the materialized graph
```

#### Notes

Bottom seems to continue after visible area; visible content is clear.

---

### EF01A-S014 / S-056 - `2252a4c4af`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-why-identity-resolution-matters`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: why identity resolution matters

#### Visible text

```text
Why this matters

Suppose query shape causes the same Customer row to appear multiple times because of joins.

With plain AsNoTracking(), you might end up with multiple separate Customer objects with the same Id.

With AsNoTrackingWithIdentityResolution(), EF can reuse one Customer instance for that key in that result.

Important point

This is about materialization/result object graph, not mainly about changing the SQL shape.
```

#### Notes

Full source image visually checked.

---

### EF01A-S015 / S-057 - `eb072cdd8b`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01a-when-to-use-identity-resolution`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: not default; rule for choosing tracking/no-tracking/identity-resolution

#### Visible text

```text
Not by default.

A better rule is:

- use tracking when you plan to modify entities and save changes
- use AsNoTracking() for most read-only queries
- use AsNoTrackingWithIdentityResolution() when the query is read-only and the same entity may appear multiple times in the materialized result graph

So AsNoTrackingWithIdentityResolution() is useful, but not the default best choice for every read.
```

#### Notes

Full source image visually checked.

---

### EF01A-S016 / S-058 - `16669395cb`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01a-practical-default`
- readability: `high`
- cut off: `top-context-cropped`
- confidence: `high-for-visible-text`
- theme: practical default: AsNoTracking then switch to identity resolution when needed

#### Visible text

```text
Why not default to it always

Because it does extra work compared with plain AsNoTracking().

It still avoids full change tracking, but EF must keep a temporary identity map while materializing results so that repeated rows for the same entity key reuse the same object instance.

So compared with AsNoTracking():

- fewer duplicate entity instances in some query shapes
- but a bit more overhead

If you do not need identity resolution, plain AsNoTracking() is usually simpler and cheaper.

Practical default

A practical default is:
```

#### Visible code

```csharp
query.AsNoTracking()
```

#### Additional visible text

```text
Then switch to:
```

#### Additional visible code

```csharp
query.AsNoTrackingWithIdentityResolution()
```

#### Notes

Top context is cropped; visible content is clear. Bottom says to switch when repeated same entity matters.

---

## 3. Cleaned source notes

- For large read result sets, tracking has CPU/memory cost; use `AsNoTracking()` for read-only queries.
- If a whole code path never needs tracking, the DbContext tracking behavior can be set to `QueryTrackingBehavior.NoTracking`.
- A tracked query stores entity instances in the DbContext change tracker.
- The identity map means one tracked object instance per primary key inside one DbContext.
- `Find` checks the change tracker first and skips the DB query only if the entity is already tracked.
- If you already have the tracked entity instance, calling `Find` again is usually unnecessary.
- `Find` is useful when you only have the key and do not know whether the entity is already tracked.
- Projection to DTO/anonymous types avoids materializing unnecessary entities and navigations.
- Big `Include()` graphs can explode row counts; prefer projection or use `AsSplitQuery()` when multiple collections must be included.
- `AsNoTrackingWithIdentityResolution()` avoids long-lived tracking but still deduplicates repeated entity instances during result materialization.
- Identity resolution is about the result object graph/materialization, not mainly about changing SQL shape.
- Default practical rule: tracking for entities you will modify/save, `AsNoTracking()` for most read-only queries, identity resolution only when repeated entity instances matter.

---

## 4. Minimal interpretation

EF01A explains how EF Core tracking should be treated as a deliberate cost. Tracking is needed for update workflows, but read-only paths usually benefit from `AsNoTracking()` and projection. The identity map is the mechanism that keeps one tracked instance per primary key in a DbContext; `Find` uses that tracking cache only when the entity is already tracked. `AsNoTrackingWithIdentityResolution()` is a special read mode that avoids long-lived tracking while still deduplicating repeated entity instances in the materialized result graph.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Reads should often default to no tracking because tracking costs CPU/memory | EF01A-S001 | high |
| Identity map is one tracked object instance per primary key inside one DbContext | EF01A-S002 | high |
| Entities become tracked through tracking queries, Find, Attach, or Add | EF01A-S004, EF01A-S006 | high for visible text |
| Find skips the DB query only when the entity is already tracked | EF01A-S007 | high |
| If the tracked instance is already in hand, do not call Find again | EF01A-S009 | high |
| Find is useful when you have the key but do not know whether the entity is tracked | EF01A-S010 | high |
| Projection avoids expensive entity/navigations materialization | EF01A-S005 | high |
| Large Include graphs can cause row explosion; AsSplitQuery can help | EF01A-S008 | high |
| AsNoTrackingWithIdentityResolution uses temporary identity resolution without tracking entities for updates | EF01A-S011, EF01A-S013 | high |
| Identity resolution matters for repeated rows in materialized result graphs | EF01A-S014 | high |
| Plain AsNoTracking is usually the practical default unless identity resolution is needed | EF01A-S015, EF01A-S016 | high |

---

## 6. Question hooks

- Why should read-only EF Core queries often use `AsNoTracking()`?
- What does the identity map guarantee inside one DbContext?
- When does an entity become tracked?
- When does `Find` skip the database query?
- Why should you not call `Find` if you already hold the tracked entity instance?
- When is `Find` useful?
- Why is DTO projection often better than materializing entities/navigations?
- Why can big `Include()` graphs be expensive?
- What problem does `AsNoTrackingWithIdentityResolution()` solve?
- Why is identity resolution about materialization/result object graph rather than mainly SQL shape?
- What is the practical default rule among tracking, no tracking, and no tracking with identity resolution?

---

## 7. Open review issues

- EF01B loading-collections sources are pending and intentionally not included here.
- S-009, S-033, and S-058 have cropped context; only visible content is treated as verified.
- If EF01B reveals that S-007 belongs better as a bridge note, keep it in EF01A but reference it from EF01B rather than duplicating transcript.
