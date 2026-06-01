# EF01B - Loading collections / Include / Find / Load / AutoInclude

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **3 / verified transcript v001 + EF01A correction**  
Generated: 2026-06-01 22:51:28 UTC

---

## Done

- EF01A v001 existed, but EF01B review found a boundary correction.
- S-059/S-060 are moved to EF01A v002 correction because they are identity-resolution examples.
- This file completes EF01B loading collections transcript.

## Now

- Review this archive diff.
- Commit if EF01B coverage and EF01A correction look right.

## Next

- Next EF Core area boundary review.
- Do not continue by old pending list; use contact sheets/inventory + visual boundary review again.

## Later

- Future likely areas: shadow properties / Attach-disconnected updates / entities constructors / model constraints, depending on boundary review.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- loading related collections in EF Core
- explicit loading with Entry(...).Collection(...).Load/LoadAsync
- eager loading with Include
- roundtrip and cartesian explosion tradeoffs
- Find + Load versus Include
- why AutoInclude does not replace explicit collection loading after Find
- hybrid pattern: use tracked root if available, otherwise Include

Key ideas:
- Each explicit Load() call is usually a separate database query.
- Include can load related data in one query/roundtrip, but multiple collection Includes can create heavy joined results.
- Use Include when you know the full related-data shape up front and are loading a fresh entity.
- Use Find + Load when the entity may already be tracked and you want explicit/conditional loading.
- Find is a primary-key lookup that checks the change tracker; it is not the same as a general Include query pipeline.
- AutoInclude applies to queries and should not be expected to replace Find + Load for collections.
- A hybrid pattern can check the change tracker first, use explicit Load if warm, and Include if cold.
- Do not use the hybrid pattern by default unless the optimization matters.

Reading quality:

```text
Overall: high.
Limitations: S-037/S-038/S-042 have slight bottom crop/UI overlay; S-044 has UI overlay after code.
Confidence: high for visible transcript and boundary decisions.
```

---

## 0.2 Coverage / boundary review

Included EF01B source IDs:

```text
S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046
```

Moved to EF01A correction:

```text
S-059, S-060 -> identity-resolution examples, not loading collections
```

Checked but not EF01B:

```text
S-006 -> shadow property filter
S-029 -> Attach + explicit modified property
S-030 -> Attach helps / entity exists unchanged
```

Boundary decision:

```text
EF01B covers related-data loading patterns: Include, explicit Collection(...).Load/LoadAsync, Find + Load, AutoInclude caveat, and hybrid change-tracker check.
It does not cover identity-resolution examples S-059/S-060; those are corrected into EF01A.
It does not cover shadow-property or Attach/disconnected-update examples S-006/S-029/S-030; those require later boundary review.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF01B-S001 | S-037 | IU-037 | `691ce63670` | `verified-visible-partial-from-source-image` | bottom-slightly-cropped-after-visible-text | explicit loading collections; each Load is its own database call |
| EF01B-S002 | S-038 | IU-038 | `ac404adaa8` | `verified-visible-partial-from-source-image` | bottom-slightly-cropped-after-visible-text | multiple collections in one roundtrip with Include; cartesian explosion risk |
| EF01B-S003 | S-039 | IU-039 | `7f7dafd9fe` | `verified-from-source-image` | no | when to use Include |
| EF01B-S004 | S-040 | IU-040 | `e3704b53e4` | `verified-from-source-image` | no | when to use Find + Load |
| EF01B-S005 | S-041 | IU-041 | `2175a4a601` | `verified-from-source-image` | no | practical tradeoff Include vs Find + Load |
| EF01B-S006 | S-042 | IU-042 | `810b517d3a` | `verified-visible-partial-from-source-image` | bottom-slightly-cropped-after-visible-text | Find + AutoInclude does not replace Find + Load |
| EF01B-S007 | S-043 | IU-043 | `4f85a4e72b` | `verified-from-source-image` | no | options when enrollments are needed |
| EF01B-S008 | S-044 | IU-044 | `3edaef3497` | `verified-visible-partial-from-source-image` | bottom-ui-overlay-after-code | hybrid pattern: check change tracker, otherwise Include |
| EF01B-S009 | S-045 | IU-045 | `1607e83e8f` | `verified-from-source-image` | no | why hybrid check is valid |
| EF01B-S010 | S-046 | IU-046 | `b074625c29` | `verified-from-source-image` | no | when hybrid optimization makes sense |

---

## 2. Verified source transcript

### EF01B-S001 / S-037 - `691ce63670`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01b-explicit-loading-collections`
- readability: `high`
- cut off: `bottom-slightly-cropped-after-visible-text`
- confidence: `high-for-visible-text`
- theme: explicit loading collections; each Load is its own database call

#### Visible text

```text
About loading collections

Yes:
```

#### Visible code

```csharp
context.Entry(student).Collection(x => x.Enrollments).Load();
```

#### Additional visible text

```text
is a database call if that collection is not already loaded.

And yes, if you do:
```

#### Additional visible code

```csharp
context.Entry(student).Collection(x => x.Enrollments).Load();
context.Entry(student).Collection(x => x.Payments).Load();
context.Entry(student).Collection(x => x.Notifications).Load();
```

#### Additional visible text 2

```text
that is normally three separate queries.

Because each explicit Load() is its own load operation.
```

#### Notes

Bottom has UI overlay/crop after visible explanation; visible content is clear.

---

### EF01B-S002 / S-038 - `ac404adaa8`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01b-include-vs-load-tradeoff`
- readability: `high`
- cut off: `bottom-slightly-cropped-after-visible-text`
- confidence: `high-for-visible-text`
- theme: multiple collections in one roundtrip with Include; cartesian explosion risk

#### Visible text

```text
Can multiple collections be loaded in one roundtrip?

Yes, but not with multiple Load() calls.

To get one roundtrip, you usually use eager loading:
```

#### Visible code

```csharp
var student = context.Students
    .Include(x => x.Enrollments)
    .Include(x => x.Payments)
    .Include(x => x.Notifications)
    .Single(x => x.Id == id);
```

#### Additional visible text

```text
That can be one SQL query, though with multiple collections it may create a very large joined result set.

There is a tradeoff:

- Include -> fewer roundtrips, but query can get heavy / duplicated rows
- explicit Load() -> clearer and more controlled, but more roundtrips

Important nuance with multiple collections

"One query" is not always better.

If you include several collections in one relational query, you can get a cartesian explosion effect.
```

#### Notes

Bottom cropped after visible cartesian explosion line; content is clear.

---

### EF01B-S003 / S-039 - `7f7dafd9fe`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01b-use-include-when`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: when to use Include

#### Visible text

```text
Use Include when

You know up front exactly what related data you need, and you are loading the entity fresh for this use case.

Example:
```

#### Visible code

```csharp
var student = await context.Students
    .Include(x => x.Enrollments)
    .SingleAsync(x => x.Id == studentId);
```

#### Additional visible text

```text
Good when:

- new/fresh context
- you want one query shape
- the graph is small enough
- readability is better as one query

Best for many normal read scenarios.
```

#### Notes

Full source image visually checked.

---

### EF01B-S004 / S-040 - `e3704b53e4`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01b-use-find-plus-load-when`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: when to use Find + Load

#### Visible text

```text
Use Find + Load when

You have the key, the entity may already be tracked, and you want explicit loading.

Example:
```

#### Visible code

```csharp
var student = await context.Students.FindAsync(studentId);
await context.Entry(student!).Collection(x => x.Enrollments).LoadAsync();
```

#### Additional visible text

```text
Good when:

- entity might already be in the current DbContext
- you want to benefit from identity map
- you prefer explicit steps
- you want to load related data conditionally

Best for command/write scenarios and unit-of-work style code.
```

#### Notes

Full source image visually checked.

---

### EF01B-S005 / S-041 - `2175a4a601`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01b-practical-tradeoff`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: practical tradeoff Include vs Find + Load

#### Visible text

```text
Practical tradeoff

Include

- usually one roundtrip
- simpler when you know the full shape
- but can get heavy with multiple collections
- less useful if entity might already be tracked

Find + Load

- can avoid re-querying the root entity
- more explicit and easier to debug
- but each Load() is usually another DB call
```

#### Notes

Full source image visually checked.

---

### EF01B-S006 / S-042 - `810b517d3a`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01b-autoinclude-does-not-replace-load`
- readability: `high`
- cut off: `bottom-slightly-cropped-after-visible-text`
- confidence: `high-for-visible-text`
- theme: Find + AutoInclude does not replace Find + Load

#### Visible text

```text
Correct: you should not expect Find + AutoInclude to replace Find + Load for collections.

AutoInclude() is documented as applying to queries. Find is a special primary-key lookup that first checks the change tracker and otherwise fetches the entity by key; it is not a general eager-loading query pipeline like Include(...).

So for this case:
```

#### Visible code

```csharp
var student = await context.Students.FindAsync(id);
```

#### Additional visible text

```text
you should think:

- if Student is already tracked in this DbContext -> 0 queries
- otherwise -> 1 query for Student
- but not "1 query for Student plus auto-included Enrollments"
```

#### Notes

Bottom cropped after final visible bullet; visible content is clear.

---

### EF01B-S007 / S-043 - `4f85a4e72b`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01b-include-or-explicit-load-options`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: options when enrollments are needed

#### Visible text

```text
If you want Enrollments too, the normal options are:
```

#### Visible code

```csharp
var student = await context.Students
    .Include(x => x.Enrollments)
    .SingleAsync(x => x.Id == id);
```

#### Additional visible text

```text
or
```

#### Additional visible code

```csharp
var student = await context.Students.FindAsync(id);
await context.Entry(student!).Collection(x => x.Enrollments).LoadAsync();
```

#### Additional visible text 2

```text
The first is eager loading in a query; the second is explicit loading after Find. EF's related-data docs distinguish these as different loading patterns.
```

#### Notes

Full source image visually checked.

---

### EF01B-S008 / S-044 - `3edaef3497`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef01b-hybrid-check-change-tracker`
- readability: `high`
- cut off: `bottom-ui-overlay-after-code`
- confidence: `high-for-visible-text`
- theme: hybrid pattern: check change tracker, otherwise Include

#### Visible text

```text
Yes, that can make sense.

Pattern:

- first check whether the root is already tracked
- if yes, use it and explicitly load what is missing
- if not, run one query with Include

Conceptually:
```

#### Visible code

```csharp
var student = context.ChangeTracker
    .Entries<Student>()
    .Where(e => e.Entity.Id == id)
    .Select(e => e.Entity)
    .SingleOrDefault();

if (student is null)
{
    student = await context.Students
        .Include(x => x.Enrollments)
        .SingleOrDefaultAsync(x => x.Id == id);
}
else
{
    await context.Entry(student)
        .Collection(x => x.Enrollments)
        .LoadAsync();
}
```

#### Notes

Bottom has UI overlay after code; visible code/text is clear.

---

### EF01B-S009 / S-045 - `1607e83e8f`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01b-hybrid-validity`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: why hybrid check is valid

#### Visible text

```text
That idea is valid because:

- if already tracked, you avoid re-querying the root
- if not tracked, you avoid Find + Load doing two roundtrips

So it is basically a hybrid:

- warm context -> tracked root + explicit collection load
- cold context -> one Include query
```

#### Notes

Full source image visually checked.

---

### EF01B-S010 / S-046 - `b074625c29`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef01b-hybrid-practicality`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: when hybrid optimization makes sense

#### Visible text

```text
Does it make sense in practice?

Sometimes yes, but I would use it only if this optimization actually matters.

Why not by default:

- it adds branching and complexity
- repository/application code becomes more EF-aware
- the gain is only useful when entities are often already tracked in the same DbContext

In many apps, each command handler uses a fresh context and loads the aggregate once. In that case, the change-tracker check usually buys little.
```

#### Notes

Full source image visually checked.

---

## 3. Cleaned source notes

- Explicit collection loading with `Entry(entity).Collection(...).Load/LoadAsync()` is a database call if the collection is not already loaded.
- Multiple explicit `Load()` calls usually mean multiple separate queries.
- `Include` can load related data in one query/roundtrip, but multiple collection Includes can cause large joined results or cartesian explosion.
- Use `Include` when the related-data shape is known up front and a fresh entity is being loaded for this use case.
- Use `Find + Load` when the entity may already be tracked and related data should be loaded conditionally/explicitly.
- `Find` is a special primary-key lookup; it checks the change tracker first and is not a general eager-loading query pipeline.
- `AutoInclude()` applies to queries and should not be expected to make `Find` load collections automatically.
- A hybrid pattern can check if the root entity is already tracked, explicitly load collection if warm, or run an `Include` query if cold.
- The hybrid pattern adds complexity and should be used only if the optimization actually matters.

---

## 4. Minimal interpretation

EF01B explains the tradeoff between eager loading and explicit loading. `Include` is best when the full shape is known and one coherent query is desirable. Explicit `Load()` is useful when the root may already be tracked or when related data should be loaded conditionally, but each load is usually another database call. `Find` can use the identity map for the root entity, but it is not equivalent to an `Include` query and `AutoInclude` should not be expected to replace explicit collection loading.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Each explicit collection Load is its own load operation and normally a separate query | EF01B-S001 | high for visible text |
| Include can load several collections in one roundtrip but can create heavy joined results | EF01B-S002 | high for visible text |
| Include is good when the related-data shape is known up front | EF01B-S003 | high |
| Find + Load is good when the entity may already be tracked and explicit loading is desired | EF01B-S004 | high |
| Include is simpler/fewer roundtrips; Find + Load is explicit but can mean more DB calls | EF01B-S005 | high |
| Find + AutoInclude should not replace Find + Load for collections | EF01B-S006 | high for visible text |
| The normal options are eager Include query or explicit loading after Find | EF01B-S007 | high |
| Hybrid change-tracker check can avoid requerying root in warm context and avoid two roundtrips in cold context | EF01B-S008, EF01B-S009 | high |
| Hybrid optimization is not default; it adds branching/complexity | EF01B-S010 | high |

---

## 6. Question hooks

- Why does each explicit `Load()` usually mean another database query?
- When is `Include` preferable to explicit `Load()`?
- Why can multiple collection Includes become heavy?
- When is `Find + Load` preferable?
- Why does `Find` not behave like a normal Include query pipeline?
- Why should `AutoInclude` not be expected to replace explicit collection loading after `Find`?
- What is the practical tradeoff between Include and Find + Load?
- When does the hybrid change-tracker check make sense?
- Why should the hybrid pattern not be the default in many apps?

---

## 7. Open review issues

- S-006 is pending a shadow-property/model-configuration boundary review.
- S-029/S-030 are pending an Attach/disconnected-update boundary review.
- S-059/S-060 are included via EF01A correction addendum, not duplicated here.
- If later EF Core areas refer back to Include/Load, cross-reference EF01B rather than duplicating transcript.
