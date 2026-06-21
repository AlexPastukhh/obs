# EF05C - Optional value objects / complex types

Conspect: `ef-core-general`  
File type: **source-preserving region transcript**  
Stage: **13 / verified transcript v001**  
Generated: 2026-06-02 01:12:54 UTC

---

## Done

- EF05A and EF05B are processed.
- This file completes EF05C transcript.
- EF05 is now closed as EF05A + EF05B + EF05C.

## Now

- Review this archive diff.
- Commit if transcript and boundary decisions look correct.

## Next

- EF06A transcript.
- Meaning: optimistic concurrency / check-then-add race.
- Sources: `S-047, S-048`.

## Later

- EF06B: transactions / isolation levels.
- EF06C: DB exceptions / retry exhausted / catch order.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- nullable value objects stored inside aggregates
- exposing nullable fields to the domain as Maybe<T>
- optional owned value-object mapping
- optional child entities versus references to other aggregates
- why not map Maybe<T> directly through EF value converters
- optional complex type mapping for multi-column value objects such as Money
- table shape and materialization behavior for optional complex/value objects

Key ideas:
- The domain can store a nullable field such as `FullName? _fullName` but expose it as `Maybe<FullName>`.
- EF should map the underlying nullable value object or nullable complex type, not the Maybe wrapper directly.
- For optional owned values, nullable columns and optional navigation configuration tell EF how to represent all-null columns.
- If an object has its own identity, decide whether that identity is only meaningful inside the aggregate or globally meaningful.
- Identity meaningful only inside the aggregate usually points to a child entity; globally meaningful identity usually points to another aggregate reference/id.
- EF value converters are not a good fit for `Maybe<Money>` when the value object maps to multiple columns.
- A practical pattern is: EF deals with `Money?`, the domain exposes `Maybe<Money>`.
- For flattened optional complex types, at least one required property may be needed so EF can distinguish null complex object from empty object.

Reading quality:

```text
Overall: high.
Limitations: S-016 continues into S-017; S-022 bottom continues after visible Discount exists row.
Confidence: high for source transcript and boundary decision.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-014, S-015, S-016, S-017, S-018, S-020, S-021, S-022, S-023
```

Pending:
```text
EF06A -> S-047, S-048
EF06B -> S-049, S-050, S-051, S-052
EF06C -> S-062, S-063, S-064, S-065, S-061
```

Boundary decision:
```text
EF05C covers optional value objects, child entities, aggregate references, and optional complex type mapping.
It closes parent EF05 together with EF05A and EF05B.
It does not process EF06 transactions/concurrency/exception sources.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| EF05C-S001 | S-014 | IU-014 | `9f752fd7b7` | `verified-from-source-image` | no | nullable value object inside aggregate: FullName? field exposed as Maybe<FullName> |
| EF05C-S002 | S-015 | IU-015 | `9be28189df` | `verified-from-source-image` | no | EF owned mapping for nullable FullName value object |
| EF05C-S003 | S-016 | IU-016 | `dfe76f5f7c` | `verified-visible-partial-from-source-image` | bottom-continues-into-S-017 | optional child entity inside aggregate: domain shape |
| EF05C-S004 | S-017 | IU-017 | `8d6946160e` | `verified-from-source-image` | no | optional child entity mapping and optional reference to another aggregate |
| EF05C-S005 | S-018 | IU-018 | `deb7e62c3f` | `verified-from-source-image` | no | DDD advice: identity meaningful inside aggregate vs globally meaningful |
| EF05C-S006 | S-020 | IU-020 | `685f8e9fda` | `verified-from-source-image` | no | why not map Maybe<Money> directly |
| EF05C-S007 | S-021 | IU-021 | `548433edd7` | `verified-from-source-image` | bottom-slightly-close-but-visible | EF deals with Money? while domain exposes Maybe<Money> |
| EF05C-S008 | S-022 | IU-022 | `064840baae` | `verified-visible-partial-from-source-image` | bottom-continues-after-discount-exists-row | table shape: nullable columns represent optional complex/value object |
| EF05C-S009 | S-023 | IU-023 | `2e1caff84a` | `verified-from-source-image` | no | EF Core 10 optional complex type mapping caveat: at least one required property |

---

## 2. Verified source transcript

### EF05C-S001 / S-014 - `9f752fd7b7`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05c-nullable-value-object-inside-aggregate-domain`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: nullable value object inside aggregate: FullName? field exposed as Maybe<FullName>

#### Visible text

```text
Case A: nullable value object inside the aggregate

This is exactly what your `FullName? _fullName` example is doing.

Domain:
```

#### Visible code

```csharp
public class IndividualClient
{
    private FullName? _fullName;

    public Maybe<FullName> FullName => Maybe.From(_fullName);

    public void SetFullName(FullName fullName) => _fullName = fullName;
    public void ClearFullName() => _fullName = null;
}
```

#### Notes

Full source image visually checked.

---

### EF05C-S002 / S-015 - `9be28189df`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05c-nullable-value-object-owned-mapping`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF owned mapping for nullable FullName value object

#### Visible text

```text
EF:
```

#### Visible code

```csharp
builder.OwnsOne<FullName>("_fullName", b =>
{
    b.Property(x => x.FirstName).HasColumnName("FirstName").IsRequired(false);
    b.Property(x => x.MiddleName).HasColumnName("MiddleName").IsRequired(false);
    b.Property(x => x.LastName).HasColumnName("LastName").IsRequired(false);
});
```

#### Additional visible/source note

```text
This is fine when the object is a value object.
```

#### Notes

Full source image visually checked.

---

### EF05C-S003 / S-016 - `dfe76f5f7c`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef05c-optional-child-entity-domain`
- readability: `high`
- cut off: `bottom-continues-into-S-017`
- confidence: `high-for-visible-text`
- theme: optional child entity inside aggregate: domain shape

#### Visible text

```text
How to model it cleanly in code

A good pattern is:

Optional child entity inside aggregate
```

#### Visible code

```csharp
private ChildEntity? _child;
public Maybe<ChildEntity> Child => Maybe.From(_child);
```

#### Additional visible/source note

```text
and EF:
```

#### Notes

Bottom continues into S-017.

---

### EF05C-S004 / S-017 - `8d6946160e`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05c-optional-child-entity-and-aggregate-reference`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: optional child entity mapping and optional reference to another aggregate

#### Visible text

```text
and EF:

Optional reference to another aggregate

and EF maps the id column.
```

#### Visible code

```csharp
b.HasOne<ChildEntity>("_child")
 .WithOne()
 .HasForeignKey<ChildEntity>("ParentId")
 .IsRequired(false);

private AggregateId? _otherId;
public Maybe<AggregateId> OtherId => Maybe.From(_otherId);
```

#### Notes

Full source image visually checked. Two source code blocks are combined here; first is EF mapping, second is domain reference id.

---

### EF05C-S005 / S-018 - `deb7e62c3f`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05c-ddd-identity-scope-advice`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DDD advice: identity meaningful inside aggregate vs globally meaningful

#### Visible text

```text
Important DDD advice

If it has its own identity, ask one more question:

Is that identity only meaningful inside the aggregate, or globally meaningful?

Identity only inside the aggregate

Example: OrderLine, SpecialApproval, ContactPerson within one root.

Then model it as a child entity with optional relationship.

Globally meaningful identity

Example: User, Course, Company, Warehouse.

Then it is usually another aggregate/entity reference; store its id.
```

#### Notes

Full source image visually checked.

---

### EF05C-S006 / S-020 - `685f8e9fda`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05c-why-not-map-maybe-directly`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: why not map Maybe<Money> directly

#### Visible text

```text
Why not map `Maybe<Money>` directly?

Because EF's value-conversion pipeline is not a great fit here:

- by default, a null database value is not passed through a normal converter
- one property still is not the right fit for a multi-column value-object mapping like Money(Amount, Currency)
```

#### Notes

Full source image visually checked.

---

### EF05C-S007 / S-021 - `548433edd7`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05c-ef-materializes-nullable-money-domain-exposes-maybe`
- readability: `high`
- cut off: `bottom-slightly-close-but-visible`
- confidence: `high`
- theme: EF deals with Money? while domain exposes Maybe<Money>

#### Visible text

```text
EF materializes:

so:

That behavior is the reason this pattern works well: EF deals with Money?, while your domain exposes Maybe<Money>.
```

#### Visible code

```csharp
_discount = new Money(10.00m, "USD")

invoice.Discount.HasValue == true
invoice.Discount.Value.Amount == 10.00m
```

#### Notes

Full source image visually checked.

---

### EF05C-S008 / S-022 - `064840baae`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef05c-table-shape-for-optional-money`
- readability: `high`
- cut off: `bottom-continues-after-discount-exists-row`
- confidence: `high-for-visible-text`
- theme: table shape: nullable columns represent optional complex/value object

#### Visible text

```text
What goes into the table

This mapping produces columns like:

- Id
- DiscountAmount
- DiscountCurrency

Examples:

No discount

Id: 1
DiscountAmount: NULL
DiscountCurrency: NULL

EF materializes `_discount = null`, so:

Discount exists

Id: 2
DiscountAmount: 10.00
DiscountCurrency: USD
```

#### Visible code

```csharp
invoice.Discount.HasValue == false
```

#### Notes

Bottom continues after the visible Discount exists row; visible content is clear.

---

### EF05C-S009 / S-023 - `2e1caff84a`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef05c-efcore10-optional-complex-type-mapping`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF Core 10 optional complex type mapping caveat: at least one required property

#### Visible text

```text
EF Core mapping

For EF Core 10+, optional complex types are supported, but Microsoft notes an important caveat: when the complex type is flattened into columns, it currently needs at least one required property so EF can distinguish “null complex object” from “empty object.”
```

#### Visible code

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Invoice>(b =>
    {
        b.HasKey(x => x.Id);

        b.ComplexProperty<Money?>("_discount", money =>
        {
            money.IsRequired(false);

            // At least one required property is important for optional complex types
            // when flattened into normal columns.
            money.Property(x => x.Amount)
                .HasColumnName("DiscountAmount")
                .IsRequired();

            money.Property(x => x.Currency)
                .HasColumnName("DiscountCurrency")
                .HasMaxLength(3);
        });
    });
}
```

#### Notes

Full source image visually checked.

---

## 3. Cleaned source notes

- A nullable value object inside an aggregate can be represented by a nullable backing field while exposing `Maybe<T>` to the domain.
- EF maps the underlying nullable value object/owned object; the domain-facing `Maybe<T>` stays a wrapper/presentation of optionality.
- Optional child entities are modelled differently from optional value objects: they have identity meaningful inside the aggregate and map as optional relationships.
- Optional references to other aggregates should usually store another aggregate/entity id rather than embedding the aggregate object.
- `Maybe<Money>` is not a good direct EF converter target, especially for multi-column value objects like Money(amount, currency).
- A practical pattern is to let EF materialize `Money? _discount` and expose `Maybe<Money>` from the domain model.
- For optional complex types flattened into columns, configure the complex property optional and keep at least one required property so EF can distinguish null object from empty object.
- Table shape for optional complex/value objects uses nullable columns for no value and concrete values for present value.

---

## 4. Minimal interpretation

EF05C closes the model-mapping thread by separating domain optionality from EF persistence shape. The domain can expose `Maybe<T>`, while EF maps nullable fields, optional owned navigations, optional child relationships, or optional complex types. The key design question is whether the thing has identity, and whether that identity is local to the aggregate or globally meaningful. For multi-column value objects such as Money, mapping the underlying nullable value object/complex type is cleaner than trying to map `Maybe<T>` directly.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| A nullable FullName field can be exposed as Maybe<FullName> | EF05C-S001 | high |
| EF can map nullable FullName columns through an owned mapping | EF05C-S002 | high |
| Optional child entities use optional relationships | EF05C-S003, EF05C-S004 | high |
| Identity meaningful only inside aggregate points to child entity; globally meaningful identity points to aggregate/entity reference id | EF05C-S005 | high |
| Maybe<Money> is not a good direct mapping target for EF value converters | EF05C-S006 | high |
| EF can deal with Money? while the domain exposes Maybe<Money> | EF05C-S007 | high |
| No discount can be represented by NULL value-object columns | EF05C-S008 | high for visible table |
| EF Core optional complex type mapping can require at least one required property when flattened | EF05C-S009 | high |

---

## 6. Question hooks

- How can the domain expose `Maybe<T>` while EF maps a nullable field?
- When is an optional object a value object rather than a child entity?
- How do you decide whether identity is local to the aggregate or globally meaningful?
- Why is `Maybe<Money>` a poor direct EF mapping target?
- Why is `Money? _discount` easier for EF than `Maybe<Money>`?
- What table shape represents an absent optional Money value?
- Why does an optional complex type need at least one required property when flattened?
- How do optional owned values, optional child entities, and aggregate references differ?

---

## 7. Open review issues

- EF06 remains pending and should be handled as EF06A/EF06B/EF06C.
- S-022 may have continuation below the visible crop; visible table evidence is still clear.
- If later sources revisit optional complex type caveats, cross-reference EF05C rather than duplicating the explanation.
