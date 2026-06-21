# EF03 - Constructors / materialization

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **7 / verified transcript v001**  
Generated: 2026-06-01 23:36:15 UTC

---

## Done

- EF03 boundary review was created in Stage6.
- This file completes EF03 transcript.
- `S-027/S-024/S-025/S-026` are processed as constructors / materialization.

## Now

- Review this archive diff.
- Commit if transcript and boundary decisions look correct.

## Next

- New boundary review, not blind transcript.
- Most likely next candidate: `S-006` shadow property / query filter.

## Later

- Model constraints / owned and complex types.
- Transactions / concurrency / db exceptions.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- how EF Core materializes entity instances from database rows
- whether constructors run during materialization
- constructor binding to mapped properties/services
- parameterized constructor versus parameterless constructor fallback
- safe constructor logic
- constructor logic to avoid because EF may call constructors while rehydrating persisted data

Key ideas:
- EF materialization is not the same as replaying business behavior.
- When EF loads an entity, it creates an instance, fills fields/properties, and tracks it if the query is tracking.
- Constructors may run during EF materialization.
- EF may use a parameterized constructor if it can bind it to mapped properties/services.
- EF may fall back to a parameterless constructor and then set members afterward.
- Safe constructor logic includes assigning fields/properties, simple argument validation, and preserving consistency from passed values.
- Avoid constructor side effects such as service calls, database work, publishing events, or depending on navigations being populated.
- Constructor logic should make sense both for new object creation and rehydrating persisted objects if EF can call it during materialization.

Reading quality:

```text
Overall: high.
All EF03 source images are readable.
Confidence: high for source transcript, concept grouping, and boundary decisions.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-027, S-024, S-025, S-026
```

Checked but not EF03:

```text
S-006 -> shadow property / query filter
S-028/S-029/S-030 -> already processed EF02 Attach/disconnected updates/entity state
```

Boundary decision:

```text
EF03 covers constructors and EF Core materialization.
It does not cover shadow properties/query filters.
It does not reprocess EF02 Attach/entity-state screenshots.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF03-S001 | S-027 | IU-027 | `946177ff27` | `verified-from-source-image` | no | EF materialization creates instances, fills values, starts tracking; constructors may run |
| EF03-S002 | S-024 | IU-024 | `4538d60710` | `verified-from-source-image` | no | EF does not automatically prefer parameterless constructor |
| EF03-S003 | S-025 | IU-025 | `bc91d60828` | `verified-from-source-image` | no | safe constructor logic is fine |
| EF03-S004 | S-026 | IU-026 | `e42dcdf323` | `verified-from-source-image` | no | what to avoid in constructors |

---

## 2. Verified source transcript

### EF03-S001 / S-027 - `946177ff27`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef03-materialization-constructors-may-run`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF materialization creates instances, fills values, starts tracking; constructors may run

#### Visible text

```text
Not exactly.

EF Core does materialize entities from database rows without calling your normal business methods, but it does not always skip constructors.

What EF actually does

When EF loads an entity from the database, it:

- creates an instance
- fills properties/fields from database values
- starts tracking it if the query is tracking

By default, EF often uses a constructor if it can bind mapped values to it. EF Core supports constructor binding for entities. If it cannot or should not use a parameterized constructor, it may use a parameterless constructor and then set members.

So the accurate answer is:

- constructors may run
- domain methods/setters logic may or may not run depending on mapping/access pattern
- EF is not loading objects by “replaying your business behavior”
```

#### Notes

Full source image visually checked.

---

### EF03-S002 / S-024 - `4538d60710`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef03-constructor-binding-rule`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF does not automatically prefer parameterless constructor

#### Visible text

```text
No — you do not need to remove all logic from constructors.

And no — EF will not automatically prefer a parameterless constructor just because it exists.

The actual rule is:

- if EF can bind a parameterized constructor to mapped properties/services, it may use that constructor
- otherwise it can use a parameterless constructor and then set members afterward
```

#### Notes

Full source image visually checked.

---

### EF03-S003 / S-025 - `bc91d60828`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef03-safe-constructor-logic`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: safe constructor logic is fine

#### Visible text

```text
So what should you do?

Safe constructor logic is fine

Good constructor logic is things like:

- assigning fields/properties
- simple validation of constructor arguments
- maintaining object consistency from the passed values

Example:
```

#### Visible code

```csharp
public class Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        if (amount < 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Amount = amount;
        Currency = currency;
    }
}
```

#### Additional visible text

```text
This is fine. If EF uses this constructor during materialization, that logic runs.
```

#### Notes

Full source image visually checked.

---

### EF03-S004 / S-026 - `e42dcdf323`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef03-avoid-side-effectful-constructor-logic`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: what to avoid in constructors

#### Visible text

```text
What to avoid in constructors

Avoid constructor logic that assumes “normal application creation flow” or causes side effects, such as:

- calling services
- publishing events
- touching the database
- depending on navigations being populated
- doing logic that only makes sense for new objects, not rehydrated persisted ones

Because EF may call that constructor during materialization.
```

#### Notes

Full source image visually checked.

---

## 3. Cleaned source notes

- EF Core materialization creates entity instances from database rows, fills mapped values, and tracks the instance if the query is tracking.
- Materialization does not mean EF replays normal business methods or the full application creation workflow.
- Constructors may run during materialization.
- EF can use a parameterized constructor when it can bind constructor parameters to mapped properties or services.
- If EF cannot or should not use a parameterized constructor, it can use a parameterless constructor and then set members.
- Safe constructor logic is fine: assigning fields/properties, simple validation, and preserving consistency from constructor arguments.
- Constructor logic should avoid service calls, database work, event publication, reliance on populated navigations, or assumptions that only hold for brand-new objects.
- A good constructor/materialization design is compatible with both domain creation and persisted-object rehydration where EF may call a constructor.

---

## 4. Minimal interpretation

EF03 explains that EF Core materialization is not business-object creation by replaying domain workflows. EF must create an entity instance and may use a constructor if it can bind values to it. Therefore constructors can contain simple consistency and validation logic, but they should not contain side effects or assumptions that only make sense for fresh application-level creation.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| EF creates instances, fills values, and tracks entities if the query is tracking | EF03-S001 | high |
| Constructors may run during materialization | EF03-S001 | high |
| EF may use a parameterized constructor if it can bind mapped values/services | EF03-S001, EF03-S002 | high |
| EF may use a parameterless constructor and then set members | EF03-S001, EF03-S002 | high |
| Safe constructor logic includes assignments, simple validation, and maintaining consistency | EF03-S003 | high |
| Constructor side effects or assumptions about normal creation flow should be avoided | EF03-S004 | high |

---

## 6. Question hooks

- Does EF Core always skip constructors when materializing entities?
- What does EF actually do when it loads an entity from a database row?
- When can EF use a parameterized constructor?
- When can EF use a parameterless constructor?
- What constructor logic is safe for EF materialization?
- Why should constructors avoid services, database calls, and event publishing?
- Why should constructors not depend on navigations being populated?
- How should constructor logic differ from normal business workflow methods?

---

## 7. Open review issues

- `S-006` is pending a shadow-property/query-filter boundary review.
- EF02 `S-028/S-029/S-030` are already processed and should not be duplicated here.
- If later model-configuration sources refer to constructor binding, cross-reference EF03 rather than duplicating the transcript.
