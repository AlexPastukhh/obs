# EF04 - Shadow property / query filter

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **9 / verified transcript v001**  
Generated: 2026-06-01 23:42:56 UTC

---

## Done

- EF04 boundary review was created in Stage8.
- This file completes EF04 transcript.
- `S-006` is processed as shadow property / query filter.

## Now

- Review this archive diff.
- Commit if transcript and boundary decisions look correct.

## Next

- New boundary review, not blind transcript.
- Choose the next larger EF Core area from the remaining unreviewed inventory.

## Later

- Model constraints / owned and complex types.
- Transactions / concurrency / db exceptions.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- querying a property that is not exposed as a CLR property on the entity
- using EF.Property<T>(entity, propertyName) inside LINQ
- filtering active rows by a shadow property such as IsDeleted
- soft-delete style query predicates

Key ideas:
- A shadow property can exist in the EF model without a corresponding CLR property on the entity class.
- `EF.Property<T>(entity, "PropertyName")` lets LINQ refer to such a mapped property.
- The example filters `Orders` where `IsDeleted` is false.
- This is typically useful for soft-delete or model-level metadata columns.
- This region only covers the query expression; broader model configuration/global filters should be handled in a later boundary review if present.

Reading quality:

```text
Overall: high.
S-006 is a small, fully readable screenshot.
Confidence: high for source transcript and boundary decision.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-006
```

Checked but not EF04:

```text
S-028/S-029/S-030 -> already processed EF02 Attach/disconnected updates/entity state
S-024/S-025/S-026/S-027 -> already processed EF03 constructors/materialization
S-031/S-032/S-033 -> already processed EF01A tracking/identity/read path
```

Boundary decision:

```text
EF04 covers only the shadow-property query expression in S-006.
It does not reopen nearby processed EF01A/EF02/EF03 sources.
If global query filters/model configuration for shadow properties appears later, that should be a new boundary review.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF04-S001 | S-006 | IU-006 | `8a232da430` | `verified-from-source-image` | no | filter by a shadow property using EF.Property |

---

## 2. Verified source transcript

### EF04-S001 / S-006 - `8a232da430`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef04-shadow-property-query-filter`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: filter by a shadow property using EF.Property

#### Visible text

```text
1) Filter by a shadow property
```

#### Visible code

```csharp
var active = await db.Orders
    .Where(o => EF.Property<bool>(o, "IsDeleted") == false)
    .ToListAsync();
```

#### Notes

Full source image visually checked. Single-source block.

---

## 3. Cleaned source notes

- Use `EF.Property<T>(entity, "PropertyName")` when the mapped property is not exposed as a normal CLR property on the entity.
- The example filters `db.Orders` to rows where the shadow `IsDeleted` property is `false`.
- This pattern is commonly used with soft-delete metadata columns or other model-level fields.
- The source only shows the query-side usage. Model configuration/global query filter setup is not covered here unless found in a later region.

---

## 4. Minimal interpretation

EF04 shows how to reference a shadow property inside a LINQ query. Instead of using a CLR member like `o.IsDeleted`, the query calls `EF.Property<bool>(o, "IsDeleted")` so EF can translate the mapped shadow property into SQL. The concrete use case is filtering out soft-deleted rows.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| The source filters by a shadow property | EF04-S001 | high |
| The expression uses `EF.Property<bool>(o, "IsDeleted")` | EF04-S001 | high |
| The predicate keeps rows where `IsDeleted == false` | EF04-S001 | high |
| This is separate from nearby Attach/constructor/tracking regions | EF04 boundary review | high |

---

## 6. Question hooks

- What is a shadow property in EF Core?
- How can a LINQ query reference a shadow property?
- Why does the example use `EF.Property<bool>(o, "IsDeleted")`?
- What does the predicate `IsDeleted == false` represent?
- What is the difference between this query expression and configuring a global query filter?

---

## 7. Open review issues

- Search for broader shadow-property/model-configuration/global-query-filter material later; S-006 itself only shows the query expression.
- Next step should be a new boundary review over remaining unreviewed inventory, not a continuation of EF04.
