# VIV03 - Indexed views fundamentals, materialization, clustered index and write cost

Conspect: `views-idexed-views`<br>
File type: **source-preserving region transcript**  
Stage: **3 / NEXT02 verified transcript v001**  
Generated: 2026-06-13 07:51:03 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- An indexed view starts as a normal view but becomes physically stored when a unique clustered index is created.
- The unique clustered index is the required first index and creates the physical foundation for indexed view rows.
- SQL Server automatically maintains indexed view storage when base table rows change.
- Nonclustered indexes can be created on the indexed view after the unique clustered index exists.
- Indexed views can speed reads but can make writes heavier due to aggregation, joins, filters and derived-row maintenance.

Reading quality:
```text
Overall: high.
S-032 is slightly cropped at the right edge; enough table/code is visible to verify the flow.
S-037 is conversational; the core nonclustered-index/foundation point is clear.
Confidence: high.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041
```

Boundary decision:
```text
VIV03 covers indexed-view materialization, unique clustered index as the first index, automatic maintenance after base-table writes, optional nonclustered indexes, and write-cost tradeoffs.
No boundary correction was required for this region in NEXT02.
```

Pending after this region:
```text
VIV04 remains for NEXT03.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| VIV03A-S001 | S-028 | IU-028 | `a199a76dad` | VIV03A | `verified-from-source-image` | no | Normal view versus indexed view |
| VIV03A-S002 | S-029 | IU-029 | `f72170b4d6` | VIV03A | `verified-from-source-image` | no | Indexed view stores result physically with unique clustered index |
| VIV03B-S001 | S-030 | IU-030 | `456797c8ff` | VIV03B | `verified-from-source-image` | no | Create the unique clustered index first |
| VIV03B-S002 | S-031 | IU-031 | `7c4af6bb2b` | VIV03B | `verified-from-source-image` | no | New physical structures after indexed view creation |
| VIV03C-S001 | S-032 | IU-032 | `5ec4cab651` | VIV03C | `verified-from-source-image` | yes | Indexed view maintenance flow after insert |
| VIV03C-S002 | S-033 | IU-033 | `e882127848` | VIV03C | `verified-from-source-image` | no | Base row change must maintain base table and indexed view |
| VIV03C-S003 | S-034 | IU-034 | `419a4b0a04` | VIV03C | `verified-from-source-image` | no | View result stays synchronized automatically |
| VIV03D-S001 | S-035 | IU-035 | `b79c4215a7` | VIV03D | `verified-from-source-image` | no | Nonclustered indexes on an indexed view |
| VIV03D-S002 | S-036 | IU-036 | `3eb716fc8b` | VIV03D | `verified-from-source-image` | no | Why the first index must be unique clustered |
| VIV03D-S003 | S-037 | IU-037 | `086ca24b99` | VIV03D | `verified-from-source-image` | no | Nonclustered indexes need physical rows to point to |
| VIV03D-S004 | S-038 | IU-038 | `834564d5b2` | VIV03D | `verified-from-source-image` | no | Why indexed view costs feel heavier than table indexes |
| VIV03D-S005 | S-039 | IU-039 | `f0a7504502` | VIV03D | `verified-from-source-image` | no | A single write can cause more complicated maintenance |
| VIV03D-S006 | S-040 | IU-040 | `2eac56af31` | VIV03D | `verified-from-source-image` | no | Detailed write cost for indexed views |
| VIV03B-S003 | S-041 | IU-041 | `66861de839` | VIV03B | `verified-from-source-image` | no | Indexed view = definition plus stored result set plus indexes |

---

## 2. Verified source transcript

## 2.1 VIV03A

### VIV03A-S001 / S-028 - `a199a76dad`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Normal view versus indexed view

#### Visible text

```text
An indexed view is different from a normal view.

A normal view is basically a saved query.

Visible example:
- CREATE VIEW dbo.ActiveBookings AS ...
- SELECT RoomId, BookingNight, Status
- FROM dbo.Bookings
- WHERE Status = 'Active'

A normal view does not store data by itself. SQL Server expands it into the original query when you use it.

Meaning:
- normal view = query definition;
- indexed view = additional physical storage appears only after creating the required index.
```

#### Visible code

```sql
CREATE VIEW dbo.ActiveBookings AS
SELECT RoomId, BookingNight, Status
FROM dbo.Bookings
WHERE Status = 'Active';
```

---

### VIV03A-S002 / S-029 - `f72170b4d6`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Indexed view stores result physically with unique clustered index

#### Visible text

```text
An indexed view stores the result physically by creating a unique clustered index on the view.

Visible example:
- CREATE UNIQUE CLUSTERED INDEX IX_ActiveBookings
- ON dbo.ActiveBookings (RoomId, BookingNight)

The screenshot notes:
- indexed views are primarily meant for performance;
- in special cases they can also enforce uniqueness over a projection.

Meaning:
- the unique clustered index is the step that materializes the view rows.
```

#### Visible code

```sql
CREATE UNIQUE CLUSTERED INDEX IX_ActiveBookings
ON dbo.ActiveBookings (RoomId, BookingNight);
```

---

## 2.2 VIV03B

### VIV03B-S001 / S-030 - `456797c8ff`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Create the unique clustered index first

#### Visible text

```text
Step:
Create the unique clustered index on the view.

Visible SQL:
- CREATE UNIQUE CLUSTERED INDEX IX_OrderTotals_OrderId
- ON dbo.OrderTotals (OrderId);

The slide says: this is the key moment.

Meaning:
- this creates physical storage for indexed view rows;
- SQL Server now has to maintain the view result.
```

#### Visible code

```sql
CREATE UNIQUE CLUSTERED INDEX IX_OrderTotals_OrderId
ON dbo.OrderTotals (OrderId);
```

---

### VIV03B-S002 / S-031 - `7c4af6bb2b`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: New physical structures after indexed view creation

#### Visible text

```text
After creating the unique clustered index, there are now more physical structures.

Visible model:
- dbo.Orders: physical table storage + primary key/indexes.
- dbo.OrderLines: physical table storage + primary key/indexes.
- dbo.OrderTotals: view definition + physical clustered index storing the view result.

Meaning:
- indexed view is no longer just logical SQL;
- it has a stored result structure that must stay synchronized with base tables.
```

---

### VIV03B-S003 / S-041 - `66861de839`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Indexed view = definition plus stored result set plus indexes

#### Visible text

```text
When you create the unique clustered index on a view, SQL Server materializes the view result in practical terms.

The note says:
- indexed view = view definition + physically stored result set + indexes.

For normal tables/views:
- you do not directly modify indexed view data.
- SQL Server derives and maintains it from source tables.

Meaning:
- source tables remain the write source;
- SQL Server updates the indexed view storage automatically.
```

---

## 2.3 VIV03C

### VIV03C-S001 / S-032 - `5ec4cab651`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `yes`
- confidence: `high`
- theme: Indexed view maintenance flow after insert

#### Visible text

```text
Flow example.

Before insert, indexed view dbo.OrderTotals contains summarized rows such as:
- OrderId 1, LineCount 2, TotalAmount 125.00
- OrderId 2, LineCount 1, TotalAmount 100.00

Then an insert happens into dbo.OrderLines for OrderId = 1.

After that, querying the indexed view shows updated values:
- OrderId 1, LineCount 3, TotalAmount 165.00

Meaning:
- the indexed view storage is updated when base table rows change.
```

#### Visible code

```sql
INSERT INTO dbo.OrderLines
    (OrderId, ProductId, Quantity, UnitPrice)
VALUES
    (1, 102, 4, 10.00);

SELECT OrderId, LineCount, TotalAmount
FROM dbo.OrderTotals;
```

#### Notes

Right edge of some code/table text is cropped, but the before/after maintenance flow is visible.

---

### VIV03C-S002 / S-033 - `e882127848`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Base row change must maintain base table and indexed view

#### Visible text

```text
What happens when source rows change?

Example:
- insert a new line for Order 1 into dbo.OrderLines.

SQL Server must maintain both:
1. dbo.OrderLines
2. indexed view storage for dbo.OrderTotals

Meaning:
- a write to a base table may also cause writes to indexed view storage.
```

#### Visible code

```sql
INSERT INTO dbo.OrderLines (OrderId, ProductId, Quantity, UnitPrice)
VALUES (1, 102, 4, 10.00);
```

---

### VIV03C-S003 / S-034 - `419a4b0a04`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: View result stays synchronized automatically

#### Visible text

```text
After insert, dbo.OrderTotals indexed view storage is updated.

Visible result:
- OrderId 1 has LineCount 3 and TotalAmount 165.00.
- Other rows stay unchanged.

The slide says:
- the view result stays synchronized automatically.

Meaning:
- users do not manually update the indexed view result;
- SQL Server maintains it when base data changes.
```

---

## 2.4 VIV03D

### VIV03D-S001 / S-035 - `b79c4215a7`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Nonclustered indexes on an indexed view

#### Visible text

```text
After the unique clustered index exists, you can create nonclustered indexes on the indexed view.

Visible example:
- CREATE NONCLUSTERED INDEX IX_OrderTotals_TotalAmount
- ON dbo.OrderTotals (TotalAmount)

Meaning:
- the clustered index materializes the view;
- nonclustered indexes can be added afterward for additional access paths.
```

#### Visible code

```sql
CREATE NONCLUSTERED INDEX IX_OrderTotals_TotalAmount
ON dbo.OrderTotals (TotalAmount);
```

---

### VIV03D-S002 / S-036 - `3eb716fc8b`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why the first index must be unique clustered

#### Visible text

```text
Why must the first index be unique clustered?

A view is not normally stored. Before SQL Server can create extra nonclustered indexes on a view, it needs a real physical storage foundation for the view rows.

That foundation is the unique clustered index.

Meaning:
- nonclustered indexes need real rows to point to;
- the unique clustered index creates that physical row storage for the indexed view.
```

---

### VIV03D-S003 / S-037 - `086ca24b99`

Metadata:
- status: `verified-from-source-image`
- readability: `medium`
- cut off: `no`
- confidence: `high`
- theme: Nonclustered indexes need physical rows to point to

#### Visible text

```text
The discussion asks why SQL Server cannot create a clustered index that allows duplicates and then make nonclustered indexes with lookup loops.

Answer:
- a nonclustered index needs physical rows to point to.

Meaning:
- SQL Server requires the unique clustered index as the indexed-view foundation;
- the exact uniqueness/clustered requirement is part of SQL Server's indexed view rules.
```

#### Notes

The source is conversational; the core point is readable.

---

### VIV03D-S004 / S-038 - `834564d5b2`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why indexed view costs feel heavier than table indexes

#### Visible text

```text
Why indexed view costs feel heavier than table indexes.

Normal index on a table is usually straightforward:
- one base row changes;
- update corresponding index entries.

An indexed view can involve:
- filters,
- joins,
- aggregation,
- GROUP BY,
- computed expressions,
- multiple base rows contributing to one view row.

Meaning:
- SQL Server must maintain derived results, not just direct table index entries.
```

---

### VIV03D-S005 / S-039 - `f0a7504502`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: A single write can cause more complicated maintenance

#### Visible text

```text
Example:
- UPDATE dbo.OrderLines
- SET Quantity = 10
- WHERE Id = 1

The slide says a single write can cause more complicated maintenance.

Meaning:
- changing one base row may change an aggregate result row inside the indexed view.
```

#### Visible code

```sql
UPDATE dbo.OrderLines
SET Quantity = 10
WHERE Id = 1;
```

---

### VIV03D-S006 / S-040 - `2eac56af31`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Detailed write cost for indexed views

#### Visible text

```text
SQL Server has to:
1. update the OrderLines row;
2. recalculate the effect on OrderTotals;
3. update the indexed view row for that OrderId;
4. update nonclustered indexes on the view if affected.

With aggregation, one view row may summarize many base rows.

That makes maintenance more expensive and more restrictive than a simple table index.

Meaning:
- indexed views can speed reads but increase write cost and maintenance complexity.
```

---

## 3. Cleaned source notes

- Normal views store a query definition, while indexed views add physical storage.
- The unique clustered index is the key action that materializes the view result.
- SQL Server maintains indexed view rows automatically when base tables change.
- Nonclustered indexes can be added to the indexed view after the unique clustered index exists.
- Indexed views trade faster reads for heavier writes and more restrictions.

---

## 4. Question hooks

- What is the physical difference between a normal view and an indexed view?
- Why must the first indexed-view index be unique clustered?
- What happens to indexed view storage when a base table row changes?
- When can nonclustered indexes be added to an indexed view?
- Why can indexed views make writes more expensive?