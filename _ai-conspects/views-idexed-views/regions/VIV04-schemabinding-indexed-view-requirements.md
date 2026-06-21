# VIV04 - SCHEMABINDING and indexed-view requirements/rules

Conspect: `views-idexed-views`<br>
File type: **source-preserving region transcript**  
Stage: **4 / NEXT03 verified transcript v001**  
Generated: 2026-06-13 07:53:32 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- SCHEMABINDING binds a view to the underlying table schema and blocks incompatible schema changes.
- Indexed views require schemabinding because SQL Server physically stores and maintains the view result.
- Schema-bound views must use explicit schema-qualified object names and avoid unstable dependencies such as SELECT *.
- Grouped indexed views often require COUNT_BIG(*).
- An indexed-view-compatible definition usually combines WITH SCHEMABINDING, explicit two-part names, deterministic expressions and COUNT_BIG(*) for grouped results.

Reading quality:
```text
Overall: high.
S-052 is a large SQL screenshot; core clauses are readable.
Confidence: high.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050, S-051, S-052, S-053
```

Boundary decision:
```text
VIV04 covers SCHEMABINDING, schema-protection behavior, indexed-view eligibility rules, two-part names, SELECT * restrictions, COUNT_BIG(*) and the final indexed-view-compatible definition.
No boundary correction was required for this region in NEXT03.
```

Pending after this region:
```text
none; final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| VIV04B-S001 | S-042 | IU-042 | `dc11e1331f` | VIV04B | `verified-from-source-image` | no | WITH SCHEMABINDING meaning |
| VIV04B-S002 | S-043 | IU-043 | `f9727378fb` | VIV04B | `verified-from-source-image` | no | Examples of schema changes that would fail |
| VIV04B-S003 | S-044 | IU-044 | `092bc59027` | VIV04B | `verified-from-source-image` | no | Why SQL Server blocks those changes |
| VIV04B-S004 | S-045 | IU-045 | `aa12d5f1bc` | VIV04B | `verified-from-source-image` | no | Why indexed views require SCHEMABINDING |
| VIV04B-S005 | S-046 | IU-046 | `07aa25ea49` | VIV04B | `verified-from-source-image` | no | SQL Server requires schemabinding before indexed view index |
| VIV04C-S001 | S-047 | IU-047 | `3387890789` | VIV04C | `verified-from-source-image` | no | SCHEMABINDING rule: two-part table names |
| VIV04C-S002 | S-048 | IU-048 | `543997ecf4` | VIV04C | `verified-from-source-image` | no | SCHEMABINDING rule: avoid SELECT star |
| VIV04D-S001 | S-049 | IU-049 | `2346bf9345` | VIV04D | `verified-from-source-image` | no | COUNT_BIG versus COUNT |
| VIV04D-S002 | S-050 | IU-050 | `0fa205f407` | VIV04D | `verified-from-source-image` | no | Why indexed grouped views need COUNT_BIG |
| VIV04A-S001 | S-051 | IU-051 | `80fefbece1` | VIV04A | `verified-from-source-image` | no | Make the view eligible for indexing |
| VIV04A-S002 | S-052 | IU-052 | `3cf6471b45` | VIV04A | `verified-from-source-image` | no | Recreate the view with schemabinding and COUNT_BIG |
| VIV04A-S003 | S-053 | IU-053 | `4e4fff1773` | VIV04A | `verified-from-source-image` | no | Important parts of indexed-view-compatible definition |

---

## 2. Verified source transcript

## 2.1 VIV04A

### VIV04A-S001 / S-051 - `80fefbece1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Make the view eligible for indexing

#### Visible text

```text
Step 3: make the view eligible for indexing.

For SQL Server indexed views, you usually need:
- WITH SCHEMABINDING;
- base table names must be two-part names like dbo.OrderLines.

Meaning:
- before creating the indexed view index, the view definition must follow SQL Server's indexed-view rules.
```

#### Visible code

```sql
WITH SCHEMABINDING

dbo.OrderLines
```

---

### VIV04A-S002 / S-052 - `3cf6471b45`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Recreate the view with schemabinding and COUNT_BIG

#### Visible text

```text
Example of recreating the view in indexed-view-compatible form.

Flow:
- DROP VIEW IF EXISTS dbo.OrderTotals;
- CREATE VIEW dbo.OrderTotals WITH SCHEMABINDING AS ...
- SELECT:
  - ol.OrderId,
  - COUNT_BIG(*) AS LineCount,
  - SUM(CONVERT(decimal(19,4), ol.Quantity * ol.UnitPrice, 0)) AS TotalAmount
- FROM dbo.OrderLines AS ol
- GROUP BY ol.OrderId

Meaning:
- the view uses schemabinding;
- the table name is schema-qualified;
- the grouped indexed view includes COUNT_BIG(*);
- the aggregate result is deterministic/typed for indexed-view maintenance.
```

#### Visible code

```sql
DROP VIEW IF EXISTS dbo.OrderTotals;
GO

CREATE VIEW dbo.OrderTotals
WITH SCHEMABINDING
AS
SELECT
    ol.OrderId,
    COUNT_BIG(*) AS LineCount,
    SUM(CONVERT(decimal(19,4), ol.Quantity * ol.UnitPrice, 0)) AS TotalAmount
FROM dbo.OrderLines AS ol
GROUP BY ol.OrderId;
GO
```

---

### VIV04A-S003 / S-053 - `4e4fff1773`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Important parts of indexed-view-compatible definition

#### Visible text

```text
Important parts:
- WITH SCHEMABINDING means SQL Server protects the underlying schema because the view depends on it physically.
- COUNT_BIG(*) is required for many grouped indexed views.

Meaning:
- indexed views have stricter definition requirements than normal views because SQL Server physically maintains their results.
```

#### Visible code

```sql
WITH SCHEMABINDING

COUNT_BIG(*)
```

---

## 2.2 VIV04B

### VIV04B-S001 / S-042 - `dc11e1331f`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: WITH SCHEMABINDING meaning

#### Visible text

```text
WITH SCHEMABINDING means the view is tightly bound to the schema of the underlying tables.

The slide says:
- SQL Server will not allow changes that would break the view.

Meaning:
- the view declares exact dependencies on base-table schema;
- SQL Server protects those dependencies from incompatible table changes.
```

#### Visible code

```sql
WITH SCHEMABINDING
```

---

### VIV04B-S002 / S-043 - `f9727378fb`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Examples of schema changes that would fail

#### Visible text

```text
This source shows schema changes that would fail with schema binding.

Examples:
- DROP TABLE dbo.OrderLines;
- ALTER TABLE dbo.OrderLines DROP COLUMN Quantity;

Meaning:
- if the view depends on dbo.OrderLines or the Quantity column, SQL Server blocks schema changes that would invalidate the view.
```

#### Visible code

```sql
DROP TABLE dbo.OrderLines;

ALTER TABLE dbo.OrderLines
DROP COLUMN Quantity;
```

---

### VIV04B-S003 / S-044 - `092bc59027`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why SQL Server blocks those changes

#### Visible text

```text
Why are those schema changes blocked?

Because the view depends on Quantity.

Without schema binding, someone could change the table in a way that breaks the view.
With schema binding, SQL Server blocks that change.

Meaning:
- SCHEMABINDING protects the view definition from becoming invalid because of base-table schema changes.
```

---

### VIV04B-S004 / S-045 - `aa12d5f1bc`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why indexed views require SCHEMABINDING

#### Visible text

```text
Indexed views require SCHEMABINDING because an indexed view physically stores the result of the view.

SQL Server needs a guarantee:
- the formula that produces the stored result cannot suddenly become invalid.

Example dependency:
- Quantity * UnitPrice.

If someone dropped Quantity, SQL Server could no longer maintain the indexed view.

Meaning:
- schema binding is required so SQL Server can safely maintain physical indexed-view storage.
```

#### Visible code

```sql
Quantity * UnitPrice
```

---

### VIV04B-S005 / S-046 - `07aa25ea49`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SQL Server requires schemabinding before indexed view index

#### Visible text

```text
SQL Server requires WITH SCHEMABINDING before allowing indexed-view indexing.

Visible flow:
- define view WITH SCHEMABINDING;
- only then create the unique clustered index.

Meaning:
- indexed-view materialization depends on protected schema dependencies.
```

#### Visible code

```sql
WITH SCHEMABINDING

CREATE UNIQUE CLUSTERED INDEX ...
ON dbo.OrderTotals (...);
```

---

## 2.3 VIV04C

### VIV04C-S001 / S-047 - `3387890789`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SCHEMABINDING rule: two-part table names

#### Visible text

```text
Important SCHEMABINDING rule:
when using schema binding, you usually must write table names with the schema.

Bad:
- FROM OrderLines

Good:
- FROM dbo.OrderLines

Meaning:
- schema-bound objects must reference base objects explicitly and unambiguously.
```

#### Visible code

```sql
-- Bad
FROM OrderLines

-- Good
FROM dbo.OrderLines
```

---

### VIV04C-S002 / S-048 - `543997ecf4`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SCHEMABINDING rule: avoid SELECT star

#### Visible text

```text
Also avoid SELECT *.

Bad:
- SELECT * FROM dbo.OrderLines;

Good:
- SELECT OrderId, Quantity, UnitPrice FROM dbo.OrderLines;

Why:
- SELECT * is unstable.
- If someone adds or removes columns, the meaning of the view changes.
- Schema binding wants explicit dependencies.

Meaning:
- explicitly list the exact columns the view needs.
```

#### Visible code

```sql
-- Bad
SELECT *
FROM dbo.OrderLines;

-- Good
SELECT
    OrderId,
    Quantity,
    UnitPrice
FROM dbo.OrderLines;
```

---

## 2.4 VIV04D

### VIV04D-S001 / S-049 - `2346bf9345`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: COUNT_BIG versus COUNT

#### Visible text

```text
COUNT_BIG(*) returns BIGINT.

Comparison:
- COUNT(*) / COUNT_INT returns int.
- COUNT_BIG(*) returns bigint.

Why:
- COUNT(*) can overflow when there are too many rows.
- COUNT_BIG(*) can count up to the maximum bigint value.

Meaning:
- indexed grouped views often require COUNT_BIG(*) instead of COUNT(*).
```

#### Visible code

```sql
COUNT_BIG(*)

COUNT(*)      -- returns int
COUNT_BIG(*)  -- returns bigint
```

---

### VIV04D-S002 / S-050 - `0fa205f407`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why indexed grouped views need COUNT_BIG

#### Visible text

```text
Why indexed grouped views need COUNT_BIG(*).

When an indexed view uses GROUP BY, SQL Server often requires COUNT_BIG(*).

Meaning:
- grouped indexed views need a maintained row count per group;
- COUNT_BIG(*) supplies a bigint count that SQL Server can maintain safely.
```

#### Visible code

```sql
COUNT_BIG(*)
```

---

## 3. Cleaned source notes

- SCHEMABINDING protects a view from incompatible schema changes.
- Indexed views require SCHEMABINDING because their result is physically maintained.
- Use schema-qualified names such as dbo.OrderLines.
- Avoid SELECT *; list explicit columns so dependencies are stable.
- Grouped indexed views often require COUNT_BIG(*).
- The indexed-view-compatible definition combines schemabinding, explicit dependencies, deterministic expressions and required aggregate rules.

---

## 4. Question hooks

- What does WITH SCHEMABINDING prevent?
- Why do indexed views require SCHEMABINDING?
- Why must schema-bound views use two-part table names?
- Why is SELECT * a problem for schema-bound views?
- Why does a grouped indexed view often require COUNT_BIG(*)?
- What clauses are needed to make the OrderTotals view eligible for indexing?