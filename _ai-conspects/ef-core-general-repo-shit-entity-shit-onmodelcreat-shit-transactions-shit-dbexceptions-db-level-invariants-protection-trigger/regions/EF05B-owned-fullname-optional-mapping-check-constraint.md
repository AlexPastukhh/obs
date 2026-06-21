# EF05B - Owned FullName / optional mapping / CHECK constraint

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **12 / verified transcript v001**  
Generated: 2026-06-02 00:12:16 UTC

---

## Done

- EF05A was processed.
- This file completes EF05B transcript.
- `S-004/S-005/S-002/S-003/S-019` are processed as owned FullName optional mapping and grouped-nullability constraint.

## Now

- Review this archive diff.
- Commit if transcript and boundary decisions look correct.

## Next

- EF05C transcript.
- Meaning: optional value objects / complex types.
- Sources: `S-014, S-015, S-016, S-017, S-018, S-020, S-021, S-022, S-023`.

## Later

- EF06A/EF06B/EF06C: concurrency, transactions, exceptions/retry.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- mapping an owned FullName value object into nullable columns
- controlling whether EF materializes the owned navigation as null when all columns are null
- configuring owned navigation optionality with Navigation(...).IsRequired(false)
- using a database CHECK constraint to enforce grouped nullability
- preventing inconsistent rows where FirstName is null but LastName is not, or vice versa

Key ideas:
- When a value object is optional, its columns may be nullable.
- If the owned value is optional, EF can be configured to set the navigation/field to null when all owned columns are NULL.
- Column-level `IsRequired(false)` makes the individual columns nullable.
- Navigation-level `.Navigation("_fullName").IsRequired(false)` controls the optional owned navigation behavior.
- A CHECK constraint can enforce an all-or-none rule for important grouped columns such as FirstName and LastName.
- S-003 and S-019 are duplicate image uses and must be tracked as two uses but one transcript body.

Reading quality:

```text
Overall: high.
Limitations: S-005 right-edge code crop; S-002 slight left-edge crop; S-003/S-019 long lines are horizontally scroll-cropped but key calls are readable.
Confidence: high for concepts and boundary; medium-high for exact S-005 character-level code.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-004, S-005, S-002, S-003, S-019
```

Duplicate-use handling:
```text
S-003 and S-019 use the same image definition/fileId 3945d0f1d7.
S-019 is recorded as duplicate-use evidence, not ignored and not transcribed twice in full.
```

Pending:
```text
EF05C -> S-014, S-015, S-016, S-017, S-018, S-020, S-021, S-022, S-023
EF06A -> S-047, S-048
EF06B -> S-049, S-050, S-051, S-052
EF06C -> S-062, S-063, S-064, S-065, S-061
```

Boundary decision:
```text
EF05B covers owned FullName optional mapping and grouped-nullability constraints.
It does not process EF05C optional value object / complex type sources.
It does not process EF06 transactions/concurrency/exception sources.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF05B-S001 | S-004 | IU-004 | `55ea344509` | `verified-from-source-image` | no | need grouped existence/nullability for FirstName and LastName |
| EF05B-S002 | S-005 | IU-005 | `1e229933ef` | `verified-visible-partial-from-source-image` | right-edge-cropped-code-lines | CHECK constraint: FirstName and LastName both null or both not null |
| EF05B-S003 | S-002 | IU-002 | `5152f87def` | `verified-visible-partial-from-source-image` | left-edge-slightly-cropped | owned FullName mapping with nullable name columns |
| EF05B-S004 | S-003 | IU-003 | `3945d0f1d7` | `verified-from-source-image` | right-edge-of-long-lines-cropped-by-code-scroll | make owned navigation optional so _fullName becomes null when all columns are NULL |
| EF05B-S005 | S-019 | IU-019 | `3945d0f1d7` | `verified-duplicate-use-of-S-003` | same-as-S-003 | duplicate use of same explicit optional owned navigation source |

---

## 2. Verified source transcript

### EF05B-S001 / S-004 - `55ea344509`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05b-problem-statement-grouped-nullability`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: need grouped existence/nullability for FirstName and LastName

#### Visible text

```text
is there a way to ensure that props should exist or not exist
together so there cant be the case when firstname isnull and
lastname is not
```

#### Notes

Full source image visually checked. Text has original informal wording preserved.

---

### EF05B-S002 / S-005 - `1e229933ef`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef05b-check-constraint-for-grouped-nullability`
- readability: `medium-high`
- cut off: `right-edge-cropped-code-lines`
- confidence: `high-for-main-intent-medium-for-exact-code`
- theme: CHECK constraint: FirstName and LastName both null or both not null

#### Visible text

```text
CHECK: either both FirstName and LastName are NULL, or both are NOT NULL
```

#### Visible code

```csharp
modelBuilder.Entity<Person>(eb =>
{
    eb.OwnsOne(p => p.FullName, fn =>
    {
        fn.Property(f => f.FirstName).HasColumnName("FirstName").HasMaxLength(100).IsRequired(...);
        fn.Property(f => f.MiddleName).HasColumnName("MiddleName").HasMaxLength(100).IsRequired(...);
        fn.Property(f => f.LastName).HasColumnName("LastName").HasMaxLength(100).IsRequired(...);
    });

    // CHECK: either both FirstName and LastName are NULL, or both are NOT NULL
    eb.HasCheckConstraint(
        "CK_Person_FullName_FirstAndLastBothNullOrBothNotNull",
        "([FirstName] IS NULL AND [LastName] IS NULL) OR ([FirstName] IS NOT NULL AND [LastName] IS NOT NULL)"
    );
});
```

#### Additional visible/source note

```text
The exact right edge of several source lines is cropped. The preserved source intent is the grouped-nullability CHECK constraint.
```

#### Notes

Right edge is cropped in the screenshot. The CHECK expression is reconstructed from the visible text plus the clearly visible constraint name/comment; marked as not character-perfect source code.

---

### EF05B-S003 / S-002 - `5152f87def`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef05b-owned-fullname-required-false-properties`
- readability: `high`
- cut off: `left-edge-slightly-cropped`
- confidence: `high-for-visible-code`
- theme: owned FullName mapping with nullable name columns

#### Visible code

```csharp
ib.OwnsOne<FullName>("_fullName", b =>
{
    b.Property(fn => fn.FirstName)
        .HasColumnName("FirstName")
        .HasMaxLength(100)
        .IsRequired(false);
    b.Property(fn => fn.MiddleName)
        .HasColumnName("MiddleName")
        .HasMaxLength(100)
        .IsRequired(false);
    b.Property(fn => fn.LastName)
        .HasColumnName("LastName")
        .HasMaxLength(100)
        .IsRequired(false);
});
```

#### Additional visible/source note

```text
Left edge seems slightly cropped; first identifier may have lost a leading character. Visible content clearly maps `_fullName` owned FullName columns as optional.
```

#### Notes

Full visible code checked; first token is preserved as visible (`ib`) because the left edge may be cropped.

---

### EF05B-S004 / S-003 - `3945d0f1d7`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05b-explicit-optional-owned-navigation`
- readability: `high`
- cut off: `right-edge-of-long-lines-cropped-by-code-scroll`
- confidence: `high`
- theme: make owned navigation optional so _fullName becomes null when all columns are NULL

#### Visible text

```text
How to explicitly control the behavior

If you want EF to set _fullName to null when all columns are NULL (recommended for an optional value
object), configure the owned navigation as optional:
```

#### Visible code

```csharp
ib.OwnsOne<FullName>("_fullName", b =>
{
    b.Property(fn => fn.FirstName).HasColumnName("FirstName").HasMaxLength(100).IsRequired(false);
    b.Property(fn => fn.MiddleName).HasColumnName("MiddleName").HasMaxLength(100).IsRequired(false);
    b.Property(fn => fn.LastName).HasColumnName("LastName").HasMaxLength(100).IsRequired(false);
})
// Make the navigation optional (EF Core 7+)
.Navigation("_fullName")
.IsRequired(false);
```

#### Notes

Full source image visually checked. Long code lines extend to horizontal scroll, but main code and intent are readable.

---

### EF05B-S005 / S-019 - `3945d0f1d7`

Metadata:
- status: `verified-duplicate-use-of-S-003`
- candidate_type: `ef05b-explicit-optional-owned-navigation-duplicate-use`
- readability: `high`
- cut off: `same-as-S-003`
- confidence: `high`
- theme: duplicate use of same explicit optional owned navigation source

#### Visible text

```text
Duplicate use of S-003.

The visible source content is the same image definition:
How to explicitly control the behavior; configure `_fullName` as optional with `.Navigation("_fullName").IsRequired(false)`.
```

#### Additional visible/source note

```text
This is intentionally recorded so the image use is not lost. Transcript is not duplicated in full.
```

#### Notes

S-019 uses the same image definition/fileId as S-003 (`3945d0f1d7`) in a different coordinate location.

---

## 3. Cleaned source notes

- The problem is grouped nullability: FirstName and LastName should exist together or not exist together.
- Individual owned columns can be configured nullable with `.IsRequired(false)`.
- For an optional owned FullName stored in `_fullName`, configure the owned navigation optional with `.Navigation("_fullName").IsRequired(false)` so EF can represent all-null owned columns as a null owned value.
- A database CHECK constraint can enforce that FirstName and LastName are either both NULL or both NOT NULL.
- MiddleName can remain optional independently if the invariant only requires FirstName and LastName to be grouped.
- S-003 and S-019 are the same image used twice in the canvas; both image uses are recorded for coverage, but the transcript is de-duplicated.

---

## 4. Minimal interpretation

EF05B is about making an optional owned FullName value object consistent at both EF mapping and database levels. EF mapping makes individual columns nullable and marks the owned navigation optional so all-null columns can materialize as a null value object. The database CHECK constraint protects the invariant that required parts of the name appear together rather than allowing inconsistent partial rows.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| The core problem is preventing FirstName and LastName from existing inconsistently | EF05B-S001 | high |
| A CHECK constraint can require FirstName and LastName to be both NULL or both NOT NULL | EF05B-S002 | high for intent |
| FullName owned columns can be configured with `.IsRequired(false)` | EF05B-S003, EF05B-S004 | high |
| The owned navigation `_fullName` can be made optional with `.Navigation("_fullName").IsRequired(false)` | EF05B-S004 | high |
| S-019 is a duplicate-use of S-003 and should be tracked without duplicating content | EF05B-S005 | high |

---

## 6. Question hooks

- Why can column-level nullable settings be insufficient for a value object invariant?
- What does grouped nullability mean for FirstName and LastName?
- How does `.Navigation("_fullName").IsRequired(false)` affect optional owned navigation behavior?
- Why can a database CHECK constraint be useful for an owned FullName?
- Which part of FullName may stay independently optional?
- How should duplicate image uses like S-003/S-019 be handled in coverage?

---

## 7. Open review issues

- S-005 code is not character-perfect due to right-edge crop; the CHECK intent is clear.
- EF05C remains pending and should handle broader optional value object / complex type behavior.
- EF06 remains pending and should not be mixed into EF05B.
