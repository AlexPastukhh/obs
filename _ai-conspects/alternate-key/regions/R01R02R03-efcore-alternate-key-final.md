# R01/R02/R03 - EF Core alternate key / principal key final transcript v001

Conspect: `alternate-key`
File type: **source-preserving final combined region transcript**  
Stage: **stage-1 / verified final coverage transcript v001**  
Generated: 2026-06-13 08:55:00 UTC

---

## Direction check

Goal: convert the EF Core alternate key SVG conspect into AI-readable text while preserving screenshots and text labels.

This pass closes the full sheet: alternate key concept -> relationship foreign key targeting non-primary key -> `HasPrincipalKey` configuration examples.

Coverage:

```text
R01: 8 image uses / 7 text labels
R02: 8 image uses / 1 text labels
R03: 8 image uses / 0 text labels
Total: 24 image uses / 8 text labels
Remaining unclosed: 0
```

---

## 0.1 Area overview / key ideas / reading quality

This sheet explains EF Core alternate keys and principal keys in relationships. The central point is that a foreign key normally targets the principal entity primary key, but EF Core can configure a relationship to target another unique property/key on the principal side.

Key ideas:

- Primary key is the entity's normal identity key.
- Alternate key is another unique key that can also identify a row and can be used as the target of a relationship.
- Alternate keys are typically created by relationship configuration or `HasAlternateKey`.
- In EF Core, alternate keys are read-only from the model perspective and have uniqueness constraints in the database.
- `HasPrincipalKey` tells EF Core which principal-side property the dependent foreign key should reference when it is not the primary key.
- `HasForeignKey` configures the dependent-side FK property; `HasPrincipalKey` configures the principal-side target key.

Reading quality:

```text
overall: high for relationship configuration semantics
exact code punctuation: medium-high; preserved screenshots remain source of truth
coverage: full combined pass; remaining unclosed = 0
```

---

## 1. R01 - alternate key vs primary key / readonly key notes

Sources: `S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008`

R01 introduces the title concept: “alternate key”. The canvas labels mention `hasprincipal key`, “target for foreign key”, “readonly alternate key”, and “readonly primary key”. This region frames alternate key as another unique key that can serve as a principal key in a relationship.

Canvas labels closed in R01:

```text
T-001: alternate key
T-002: hasprincipal key
T-003: when you configure relationships
T-004: on something that is not
T-006: target for foreign key
T-007: readonly alternate key
T-008: readonly primary key
```

Primary key vs alternate key:

```text
Primary key:
- default identity of entity
- most relationships target it by default
- configured with HasKey or conventions

Alternate key:
- additional unique key on principal entity
- can be a target for a foreign key
- configured explicitly or inferred from relationship target configuration
- backed by a unique constraint/index-like database object
```

The “readonly” label is important: EF Core treats keys as identity/relationship anchors. Changing key values after tracking can be problematic because identity resolution and relationships depend on keys. The sheet preserves this as a warning: configure keys deliberately and do not treat alternate keys as mutable business fields unless you understand the consequences.

---

## 2. R02 - foreign key target on non-primary key

Sources: `S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016`

R02 explains the relationship side. Normally the dependent entity has a foreign key that points to the principal entity primary key. Here the sheet focuses on configuring a foreign key to target something that is not the principal primary key.

Canvas labels closed in R02:

```text
T-005: primary key
```

The mental model:

```text
Dependent.ForeignKeyProperty  -->  Principal.AlternateKeyProperty
```

This is not just a unique index. A unique index can enforce uniqueness, but an alternate key is part of EF Core's key model and can be used as a principal key target for relationships.

Example shape:

```csharp
modelBuilder.Entity<Order>()
    .HasOne(o => o.Customer)
    .WithMany(c => c.Orders)
    .HasForeignKey(o => o.CustomerCode)
    .HasPrincipalKey(c => c.Code);
```

Meaning:

```text
Order.CustomerCode is the dependent FK.
Customer.Code is the principal key target.
Customer.Code must be unique because it is used as a principal key.
```

The preserved label “primary key” in R02 marks the contrast: by default the target would be the primary key, but this configuration intentionally changes the relationship target.

---

## 3. R03 - HasPrincipalKey configuration examples / constraints and caveats

Sources: `S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024`

R03 closes the configuration examples. It shows how `HasPrincipalKey` fits with `HasForeignKey` and relationship API calls.

No separate canvas text labels were assigned to R03, but screenshots S-017..S-024 are closed by this pass.

Configuration rules preserved:

```text
- Use HasForeignKey for dependent-side FK property/properties.
- Use HasPrincipalKey for principal-side key property/properties if the target is not the principal primary key.
- The principal key must be unique.
- Composite alternate keys require matching property order between foreign key and principal key.
- Relationship navigation and key configuration should be kept consistent with the domain model.
```

Common confusion resolved:

```text
HasAlternateKey(c => c.Code)
    declares Code as an alternate key.

HasPrincipalKey(c => c.Code)
    says this relationship targets Code on the principal side.

HasForeignKey(o => o.CustomerCode)
    says CustomerCode on the dependent side stores the reference value.
```

You can configure the alternate key directly with `HasAlternateKey`, or it can be introduced through `HasPrincipalKey` when EF Core needs a key target for the relationship.

Caveats:

```text
- Do not use alternate keys just because a column is unique; use a unique index if no relationship needs to target it.
- Keep alternate key values stable because relationships may depend on them.
- Check generated migrations: alternate keys normally create unique constraints, and foreign keys reference those constraints.
- When using natural/business keys, be explicit about case sensitivity, normalization, database collation and value stability.
```

Final mental model:

```text
Primary key = default principal target.
Alternate key = extra unique principal key.
HasForeignKey = dependent side.
HasPrincipalKey = principal side target when not PK.
```

---

## 4. Evidence / source map

Detailed source rows are preserved in:

```text
data/R01R02R03-sources-stage1-v001.csv
data/R01R02R03-sources-stage1-v001.json
```

Canvas text labels are preserved in:

```text
data/R01R02R03-text-labels-stage1-v001.csv
data/R01R02R03-text-labels-stage1-v001.json
```

Audit images are preserved in:

```text
audit-assets/R01R02R03-source-images/*.png
audit-assets/contact-sheet-R01R02R03-final-coverage-v001.png
```

Final status:

```text
image uses processed: 24
text labels processed: 8
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
