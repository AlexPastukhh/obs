# EFC-R03 - OnModelCreating / relationships / keys / model config

Conspect: `ef-core-general`  
File type: **source-level semantic transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-13 05:33:27 UTC

---

## Direction check

Goal:
Process EF Core General Stage1 sources after Stage0 boundary review.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `18` sources for `EFC-R03`.

Why:
This is the first real transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, process Stage2 R04 + R05.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Model configuration: OnModelCreating, owned/complex types, alternate/composite keys, unique indexes, required relationships, nullable references, delete behavior, check constraints, computed/indexable columns, and aggregate identity choices.
```

Key ideas:

- OnModelCreating is where EF shape constraints become database/model rules.
- Unique indexes and alternate keys are different tools: one enforces uniqueness, the other can also act as relationship target identity.
- Owned/complex types can keep value objects inside an aggregate while still mapping columns.
- Required relationships need consistent CLR nullability, FK/nullability, and database constraints.
- Check constraints and indexes can enforce DB-level invariants that domain code alone cannot protect.
- Composite or alternate keys should only be used when identity is meaningfully inside or outside the aggregate.
- Computed/persisted columns can be introduced when a derived value needs to be queryable/indexable.

Reading quality:
```text
Stage1 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-003, S-006, S-007, S-008, S-010, S-015, S-017, S-026, S-039, S-041, S-045, S-046, S-048, S-050, S-053, S-055, S-057, S-059
```

Boundary decision:
```text
Included in EFC-R03 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-003 | IU-003 | `62853cad31` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Unique email / availability check race. |
| S-006 | IU-006 | `7e221f7688` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Navigation / redirect / browser cache note. |
| S-007 | IU-007 | `55ea344509` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Question about infrastructure-generated fields. |
| S-008 | IU-008 | `0f7c82eb0b` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Email uniqueness / duplicate insert failure. |
| S-010 | IU-010 | `1e229933ef` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | OnModelCreating example with HasIndex / HasConstraintName. |
| S-015 | IU-015 | `3dc7a29628` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Owned value object mapping / unique email. |
| S-017 | IU-017 | `5152f87def` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | OwnsOne full name / split columns. |
| S-026 | IU-026 | `3945d0f1d7` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Explicitly control nullable/required behavior. |
| S-039 | IU-039 | `9f752fd7b7` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Nullable value object inside aggregate. |
| S-041 | IU-041 | `9be28189df` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Required false too / nullable relationship. |
| S-045 | IU-045 | `3945d0f1d7` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Explicitly controlling behavior / optional address. |
| S-046 | IU-046 | `dfe76f5f7c` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Model identity cleanly in code. |
| S-048 | IU-048 | `8d6946160e` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Owned/complex type mapping variants. |
| S-050 | IU-050 | `deb7e62c3f` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Important DDD advice: identity inside the aggregate. |
| S-053 | IU-053 | `2e1caff84a` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | EF Core mapping for complex/owned types. |
| S-055 | IU-055 | `064840baae` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Materialized column / computed value table example. |
| S-057 | IU-057 | `548433edd7` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Nullable/optional owned columns and materialization. |
| S-059 | IU-059 | `685f8e9fda` | `EFC-R03-model-configuration-relationships-keys` | `verified-visible-semantic-transcript` | Why not map Money directly as a primitive. |

---

## 2. Source-level transcript

### S-003 - Unique email / availability check race.

Metadata:
```text
source_id: S-003
image_use_id: IU-003
fileId_short: 62853cad31
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Unique email / availability check race.

Visible flow:
1. User checks IsEmailAvailable.
2. Server checks database: email is free.
3. Later user sends INSERT.
4. Another insert can happen between check and insert.

Meaning:
Application pre-check is not enough. Database unique constraint / unique index is the real invariant for email uniqueness.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-006 - Navigation / redirect / browser cache note.

Metadata:
```text
source_id: S-006
image_use_id: IU-006
fileId_short: 7e221f7688
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Navigation / redirect / browser cache note.

Visible card is mostly about browser/proxy cache redirects and Location header behavior. In EF grouping it is a candidate boundary artifact near model/navigation notes.

Stage1 interpretation:
This is not a core EF model mapping source. It is kept in R03 because it sat in the OnModelCreating/navigation area, but it should be rechecked in a later precision pass if exact source ownership matters.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-007 - Question about infrastructure-generated fields.

Metadata:
```text
source_id: S-007
image_use_id: IU-007
fileId_short: 55ea344509
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Question about infrastructure-generated fields.

Visible note:
Is there a way to ensure that properties should exist or not exist together so a case like firstName exists while lastname does not?

Meaning:
This points to a model invariant: related columns/properties should be configured so partial invalid states are impossible or explicitly handled.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-008 - Email uniqueness / duplicate insert failure.

Metadata:
```text
source_id: S-008
image_use_id: IU-008
fileId_short: 0f7c82eb0b
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Email uniqueness / duplicate insert failure.

Visible Russian/English mixed note:
- DB unique constraint or unique index is the safe protection.
- Concurrent requests can both see an email as available.
- Only database insert/update can finally reject a duplicate.
- Typical DB exception is unique violation.

Meaning:
Put the invariant in the database, not only in pre-check code.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-010 - OnModelCreating example with HasIndex / HasConstraintName.

Metadata:
```text
source_id: S-010
image_use_id: IU-010
fileId_short: 1e229933ef
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
OnModelCreating example with HasIndex / HasConstraintName.

Visible code configures indexes and constraints, including one with HasDatabaseName / HasFilter style. The source belongs to model configuration: index naming, filtered/unique indexes, and mapping database-level rules from Fluent API.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-015 - Owned value object mapping / unique email.

Metadata:
```text
source_id: S-015
image_use_id: IU-015
fileId_short: 3dc7a29628
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Owned value object mapping / unique email.

Visible code:
cb.OwnsOne(c => c.Email, eb =>
{
    eb.Property(e => e.Value)
      .HasColumnName("Email")
      .HasMaxLength(100)
      .IsRequired();
});
cb.HasIndex("Email").IsUnique();

Meaning:
Owned value object can be flattened to a column, and a unique index can enforce email uniqueness at DB level.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-017 - OwnsOne full name / split columns.

Metadata:
```text
source_id: S-017
image_use_id: IU-017
fileId_short: 5152f87def
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
OwnsOne full name / split columns.

Visible code configures FullName as owned value object with columns:
- FirstName
- MiddleName
- LastName

Some fields are required/optional with max length. Meaning: owned type maps value object internals into columns while keeping a domain object model.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-026 - Explicitly control nullable/required behavior.

Metadata:
```text
source_id: S-026
image_use_id: IU-026
fileId_short: 3945d0f1d7
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Explicitly control nullable/required behavior.

Visible code shows making a relationship optional/required and using OnDelete behavior. Meaning: do not rely only on CLR nullability; configure FK and relationship rules explicitly when the domain needs it.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-039 - Nullable value object inside aggregate.

Metadata:
```text
source_id: S-039
image_use_id: IU-039
fileId_short: 9f752fd7b7
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Nullable value object inside aggregate.

Card describes a nullable value object such as FullName inside a client aggregate. If the owned object is null or optional, EF/model configuration must match the domain intent and column nullability.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-041 - Required false too / nullable relationship.

Metadata:
```text
source_id: S-041
image_use_id: IU-041
fileId_short: 9be28189df
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Required false too / nullable relationship.

Visible code uses HasOne / WithMany / IsRequired(false). Meaning: optional relationship is allowed; database FK can be nullable and object can be null depending on configuration.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-045 - Explicitly controlling behavior / optional address.

Metadata:
```text
source_id: S-045
image_use_id: IU-045
fileId_short: 3945d0f1d7
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Explicitly controlling behavior / optional address.

Visible code shows configuring an optional owned/complex object and its properties. Meaning: when columns may all be null, model behavior must be explicit so EF knows whether the owned object exists or is null.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-046 - Model identity cleanly in code.

Metadata:
```text
source_id: S-046
image_use_id: IU-046
fileId_short: dfe76f5f7c
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Model identity cleanly in code.

Visible DDD advice:
Use an explicit reference/value object or ID rather than relying on a primitive column when the relationship/identity has domain meaning. Optional child entity inside aggregate is shown.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-048 - Owned/complex type mapping variants.

Metadata:
```text
source_id: S-048
image_use_id: IU-048
fileId_short: 8d6946160e
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Owned/complex type mapping variants.

Visible card shows OwnsOne / owned type and optional reference to another aggregate. Meaning: value objects can be embedded in owner columns; references to other aggregates should often be stored as IDs instead.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-050 - Important DDD advice: identity inside the aggregate.

Metadata:
```text
source_id: S-050
image_use_id: IU-050
fileId_short: deb7e62c3f
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Important DDD advice: identity inside the aggregate.

Ask:
- Is this identity meaningful only inside the aggregate?
- Or globally meaningful?

If identity is only inside aggregate, model as a child entity/owned collection. If globally meaningful, store/reference by ID.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-053 - EF Core mapping for complex/owned types.

Metadata:
```text
source_id: S-053
image_use_id: IU-053
fileId_short: 2e1caff84a
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
EF Core mapping for complex/owned types.

Visible code shows ModelBuilder configuration for a value object like Money inside Order/Product. It maps amount/currency columns and stores owned/complex object fields in the owner table.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-055 - Materialized column / computed value table example.

Metadata:
```text
source_id: S-055
image_use_id: IU-055
fileId_short: 064840baae
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Materialized column / computed value table example.

Visible table shows Discount with DiscountAmount and DiscountCurrency columns. If a value object is materialized or flattened, the database columns reflect its fields. Configuration can choose whether the object exists when all columns are null.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-057 - Nullable/optional owned columns and materialization.

Metadata:
```text
source_id: S-057
image_use_id: IU-057
fileId_short: 548433edd7
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Nullable/optional owned columns and materialization.

If materialization sees all owned columns as null, EF can treat the owned object as null depending on configuration. If values are present, it materializes the owned/value object.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-059 - Why not map Money directly as a primitive.

Metadata:
```text
source_id: S-059
image_use_id: IU-059
fileId_short: 685f8e9fda
stage0_group: EFC-R03-model-configuration-relationships-keys
stage1_region: EFC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why not map Money directly as a primitive.

EF value conversions can store a value object as one scalar, but if you need separate queryable/indexable columns such as amount/currency, owned/complex mapping or explicit columns may be better.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- OnModelCreating is where EF shape constraints become database/model rules.
- Unique indexes and alternate keys are different tools: one enforces uniqueness, the other can also act as relationship target identity.
- Owned/complex types can keep value objects inside an aggregate while still mapping columns.
- Required relationships need consistent CLR nullability, FK/nullability, and database constraints.
- Check constraints and indexes can enforce DB-level invariants that domain code alone cannot protect.
- Composite or alternate keys should only be used when identity is meaningfully inside or outside the aggregate.
- Computed/persisted columns can be introduced when a derived value needs to be queryable/indexable.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes the sources semantically and keeps source-image anchors for precision patches.
- Stage2 R04/R05 is still pending.
