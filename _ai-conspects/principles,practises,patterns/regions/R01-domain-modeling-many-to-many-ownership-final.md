# R01 — Domain modeling practices for many-to-many relationships and factories final coverage transcript v001

Conspect: `principles,practises,patterns`  
Source: `principles,practises,patterns.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

The sheet applies domain-modeling practices: designate an owner for relationship changes, model meaningful join rows explicitly, and prevent outer layers from constructing invalid entities.

Reading quality: verified. The whole sheet is a single coherent region; all 3 image uses and 9 SVG text labels were reviewed against preserved source evidence.

## 1. Make relationship ownership explicit

For a bidirectional many-to-many relationship, avoid letting both sides independently mutate the relationship. Choose an owning aggregate or entity and expose the public operation there.

The source makes `Instructor` the owner:

```csharp
public void AddStudent(Student student)
{
    var link = new StudentInstructor(student, this, DateTime.Now);
    _studentInstructors.Add(link);
    student.AddInstructor(link);
}
```

`Student.AddInstructor` is `internal`, so application code cannot create a one-sided relationship. The owner establishes both navigations in one operation.

## 2. Use an intermediate entity when the relationship has data

`StudentInstructor` is not merely an ORM implementation detail when it contains attributes such as `DateAdded`, status, role, ordering, provenance, or validity period. Model it as an explicit entity/value-bearing association rather than hiding it behind an automatic many-to-many collection.

Read-only projections can expose students/instructors without exposing the mutable backing collection.

## 3. Keep invariants inside the model

Public methods should guard duplicates, invalid state transitions, and required properties. Internal constructors or factory methods prevent outer layers from building entities that bypass those checks.

The note about not needing entities to “create themselves” in outer layers points toward controlled construction:

- public factory methods return a valid entity or a result containing validation errors;
- constructors may be private/internal for ORM use;
- application services orchestrate workflows but do not manually assemble invalid domain state.

## 4. Practical cautions

- The owner rule is a domain decision, not merely a navigation-property preference.
- Avoid returning a newly allocated/sorted list on every property access when a stable read-only view would suffice.
- Use a supplied clock abstraction rather than `DateTime.Now` when deterministic tests or UTC consistency matter.
- Ensure equality/key strategy for the join entity prevents duplicate links.

## 6. Coverage

```text
R01 processed image uses: 3
R01 processed text labels: 9
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
