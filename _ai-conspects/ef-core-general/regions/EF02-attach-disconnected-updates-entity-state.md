# EF02 - Attach / disconnected updates / entity state

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **5 / verified transcript v001**  
Generated: 2026-06-01 23:23:47 UTC

---

## Done

- EF02 boundary review was created in Stage4.
- This file completes EF02 transcript.
- `S-029/S-030/S-028` are processed as Attach / disconnected updates / entity state.

## Now

- Review this archive diff.
- Commit if transcript and boundary decisions look correct.

## Next

- Choose next EF Core area with boundary review first.
- Most likely next candidates: `S-006` shadow property / query filter or `S-024/S-025/S-026/S-027` constructors/materialization.

## Later

- Model constraints / owned and complex types.
- Transactions / concurrency / db exceptions.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- using Attach for an entity that already exists
- tracking a detached object as Unchanged instead of Added
- explicitly marking specific properties as modified
- disconnected update patterns
- entity state issues when assigning detached nested entities to an attached entity
- avoiding accidental updates of referenced/nested entities
- where to put EntityState handling without leaking EF Core concerns into controllers/domain

Key ideas:
- Attach is useful when the entity already exists and should not be inserted.
- After Attach, the entity is tracked as Unchanged until properties are changed or marked modified.
- You can mark a single property as modified with Entry(entity).Property(...).IsModified = true.
- This pattern can update only selected columns for detached input.
- Assigning a detached related entity to an attached entity can make EF treat the related entity as modified.
- Manually setting related entity state to Unchanged in controllers works technically but can violate separation of concerns.
- Better strategies may include model-level save behavior or centralized SaveChanges handling, depending on the model and invariants.

Reading quality:

```text
Overall: high for S-029/S-030; medium-high for S-028.
S-028 is a large composite screenshot. Main visible ideas are clear, but some code text is too small/right-cropped for exact character-level certainty.
Confidence: high for concept and boundary; medium-high for exact S-028 code.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-029, S-030, S-028
```

Checked but not EF02:

```text
S-006 -> shadow property / query filter
S-024/S-025/S-026/S-027 -> constructors / materialization
```

Boundary decision:

```text
EF02 covers Attach/disconnected update/entity state.
It does not cover shadow properties/query filters.
It does not cover constructors/materialization.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF02-S001 | S-029 | IU-029 | `5e335b4ef1` | `verified-from-source-image` | no | Attach existing detached entity and mark a single property modified |
| EF02-S002 | S-030 | IU-030 | `1b74640858` | `verified-from-source-image` | no | How Attach helps |
| EF02-S003 | S-028 | IU-028 | `354939e8d7` | `verified-visible-partial-from-source-image` | right-edge-cropped-some-code-comments-hard-to-read | Editing attached entity with detached nested entity; avoid accidental update of nested detached entity |

---

## 2. Verified source transcript

### EF02-S001 / S-029 - `5e335b4ef1`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef02-attach-explicit-property-modified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Attach existing detached entity and mark a single property modified

#### Visible text

```text
Example:
```

#### Visible code

```csharp
var blog = new Blog { Id = 5, Name = "New name" };

context.Attach(blog);
// State = Unchanged

context.Entry(blog).Property(x => x.Name).IsModified = true;
// Now only Name will be updated

await context.SaveChangesAsync();
```

#### Notes

Full source image visually checked.

---

### EF02-S002 / S-030 - `1b74640858`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef02-attach-mental-model`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: How Attach helps

#### Visible text

```text
5) How Attach helps

Attach is useful when you know:

- the entity already exists
- you do not want EF to insert it
- you want it tracked as Unchanged
- then you will either:
  - modify some properties and let change tracking detect them, or
  - explicitly mark certain properties as modified
```

#### Notes

Full source image visually checked.

---

### EF02-S003 / S-028 - `354939e8d7`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef02-attached-entity-with-detached-nested-entity`
- readability: `medium-high`
- cut off: `right-edge-cropped-some-code-comments-hard-to-read`
- confidence: `high-for-main-visible-text-and-intent`
- theme: Editing attached entity with detached nested entity; avoid accidental update of nested detached entity

#### Visible text

```text
EDITING ATTACHED ENTITY WITH DETACHED ENTITY

When assigning detached entity to attached ef core marks detached entity as modifies

Can manually mark entity as unchanged into controller but it leads to violation of separation of concerns,

Can do:
1 mark detached entity's props as unchanged by default
???
If there was more props, should mark them all
But entity will be marked as modified still, even if ef core doesn't do anything
2 Override SaveChangesAsync and mark Course to be unchanged before every transaction commit
```

#### Visible code

```csharp
public string EditPersonalInfo(
    long studentId, string name, string email, long favoriteCourseId)
{
    Student student = _repository.GetById(studentId);
    if (student == null)
        return "Student not found";

    Course favoriteCourse = Course.FromId(favoriteCourseId);
    if (favoriteCourse == null)
        return "Course not found";

    student.Name = name;
    student.Email = email;
    student.FavoriteCourse = favoriteCourse;

    EntityState entityState1 = _context.Entry(student).State;
    EntityState entityState2 = _context.Entry(student.FavoriteCourse).State;
    EntityState entityState3 = _context.Entry(student.Enrollments[0]).State;
    EntityState entityState4 = _context.Entry(student.Enrollments[0].Course).State;

    _context.SaveChanges();
}

context.Entry(student.FavoriteCourse).State = EntityState.Unchanged;

modelBuilder.Entity<Course>(x =>
{
    x.ToTable("Course").HasKey(k => k.Id);
    x.Property(p => p.Id).HasColumnName("CourseID");
    x.Property(p => p.Name)
        .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
});

public override int SaveChanges()
{
    foreach (EntityEntry<Course> course in ChangeTracker.Entries<Course>())
    {
        course.State = EntityState.Unchanged;
    }

    return base.SaveChanges();
}
```

#### Additional visible text

```text
Visible state annotations in the screenshot show the main risk:

- student entity state is Modified
- student.FavoriteCourse entity state is Modified
- existing collection/enrollment pieces are shown as Unchanged / Modified depending on relationship state

The important source idea is that assigning a detached object to an attached aggregate can cause EF to treat that detached object as an entity to update, so the boundary needs an explicit strategy.
```

#### Notes

Large composite screenshot. Main visible text and code intent are readable; some comments/right edge text are partially cropped or too small, so the transcription is high-confidence for intent but not perfect character-level code.

---

## 3. Cleaned source notes

- `Attach` is useful for detached objects when you know the row already exists and should not be inserted.
- `Attach(entity)` starts tracking the entity as `Unchanged`.
- After attaching, either change properties normally or explicitly mark specific properties as modified.
- For partial/disconnected updates, `Entry(entity).Property(...).IsModified = true` can update only selected properties.
- When assigning a detached related object to an already tracked aggregate, EF can treat the related object as modified too.
- Setting `Entry(related).State = EntityState.Unchanged` in the controller can prevent unwanted update, but leaks persistence concerns into the application/controller layer.
- If a referenced entity should never be updated through this path, model/save behavior or centralized `SaveChanges` state normalization may be considered.
- These decisions are state-management / persistence-boundary decisions, not general loading or constructor/materialization concerns.

---

## 4. Minimal interpretation

EF02 explains how EF Core treats detached objects when reintroduced into a DbContext. `Attach` says an existing object should be tracked as `Unchanged`; then the application can mark only selected properties as modified. This is useful for disconnected update flows. The risky case is assigning detached related entities to already attached entities: EF may mark the related object as modified too. The region therefore focuses on explicit entity state handling and where that state-handling logic should live.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| `Attach` tracks an existing detached entity as `Unchanged` | EF02-S001, EF02-S002 | high |
| A specific property can be explicitly marked modified | EF02-S001, EF02-S002 | high |
| This pattern avoids inserting the entity and allows selected-property updates | EF02-S001, EF02-S002 | high |
| Assigning a detached related entity to an attached entity can cause EF to treat it as modified | EF02-S003 | high for concept |
| Manually marking the related entity unchanged in the controller is possible but violates separation of concerns | EF02-S003 | high for visible text |
| Centralized/model-level handling can avoid unwanted updates of referenced entities | EF02-S003 | medium-high |

---

## 6. Question hooks

- When is `Attach` useful for a detached entity?
- What entity state does EF use after `context.Attach(entity)`?
- How can a disconnected update mark only one property as changed?
- Why does `Attach` avoid inserting the entity?
- What can go wrong when assigning a detached related entity to an attached aggregate?
- Why is setting `Entry(related).State = Unchanged` in a controller a separation-of-concerns problem?
- When might centralized `SaveChanges` state normalization be used?

---

## 7. Open review issues

- `S-006` is pending a shadow-property/query-filter boundary review.
- `S-024/S-025/S-026/S-027` are pending a constructors/materialization boundary review.
- `S-028` should not be treated as exact compile-ready code; it is preserved as visible-source transcript plus conceptual evidence.
