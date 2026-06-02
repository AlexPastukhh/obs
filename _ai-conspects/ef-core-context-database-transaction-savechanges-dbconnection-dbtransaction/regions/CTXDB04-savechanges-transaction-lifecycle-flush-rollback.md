# CTXDB04 - SaveChanges transaction lifecycle / flush / rollback scope

Conspect: `ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction`  
File type: **source-preserving large region transcript**  
Stage: **4 / NEXT03 verified transcript v001**  
Generated: 2026-06-02 11:25:47 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- Add/AddRange only changes EF's in-memory ChangeTracker.
- SaveChanges is an EF flush operation; it can send many SQL commands and multiple batches.
- The transaction state lives in the database engine on a specific connection/session; EF holds a transaction handle.
- Inside an outer transaction, SaveChanges sends real database commands, but the changes are uncommitted until commit.
- Rollback can undo changes already flushed by SaveChanges because they are inside the uncommitted transaction.

Reading quality:
```text
Overall: high.
Continuation/cropped snippets are marked as visible partial in source metadata.
Confidence: high for concepts and boundary; medium-high for exact code in visible continuation fragments.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-118, S-120, S-121, S-122, S-132, S-134, S-136, S-137, S-143, S-149
```

Boundary decision:
```text
CTXDB04 covers SaveChanges flush/lifecycle, command batching, outer transaction visibility, and rollback scope.
It does not cover raw transaction interop; that is CTXDB05.
```

Pending after this region:
```text
CTXDB06, CTXDB07
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CTXDB04A-S001 | S-118 | IU-118 | `47acb56970` | CTXDB04A | `verified-from-source-image` | no | Flush means moving tracked changes from memory toward DB commands |
| CTXDB04A-S002 | S-120 | IU-120 | `d06a83a760` | CTXDB04A | `verified-from-source-image` | no | One SaveChanges is one flush, not one SQL query |
| CTXDB04A-S003 | S-122 | IU-122 | `d89c0f6504` | CTXDB04A | `verified-from-source-image` | no | Transaction state lives in the database engine, EF holds a handle |
| CTXDB04A-S004 | S-132 | IU-132 | `88eb4730a5` | CTXDB04A | `verified-from-source-image` | no | SaveChanges batches multiple statements but is one EF flush operation |
| CTXDB04A-S005 | S-134 | IU-134 | `60f8848931` | CTXDB04A | `verified-from-source-image` | no | Commands participate until CommitAsync or RollbackAsync |
| CTXDB04A-S006 | S-136 | IU-136 | `e82cbae5ca` | CTXDB04A | `verified-from-source-image` | no | SaveChanges flush pipeline |
| CTXDB04B-S001 | S-121 | IU-121 | `a392d44b53` | CTXDB04B | `verified-from-source-image` | no | Rows are written before commit inside an outer transaction |
| CTXDB04B-S002 | S-137 | IU-137 | `422cb847c0` | CTXDB04B | `verified-from-source-image` | no | SaveChanges inside outer transaction can later be rolled back |
| CTXDB04B-S003 | S-143 | IU-143 | `8eea8882c1` | CTXDB04B | `verified-from-source-image` | no | Each SaveChanges sends SQL but changes remain uncommitted |
| CTXDB04B-S004 | S-149 | IU-149 | `0236c82fbe` | CTXDB04B | `verified-from-source-image` | no | Add vs SaveChanges vs Commit vs Rollback distinction |

---

## 2. Verified source transcript

## 2.1 CTXDB04A - Core API / primary lifecycle

### CTXDB04A-S001 / S-118 - `47acb56970`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Flush means moving tracked changes from memory toward DB commands

#### Visible text

```text
What “flush” means in EF Core

DbContext has an in-memory change tracker.

When you do this, nothing has been inserted into the database yet.

EF is only tracking this in memory:
product1 -> Added
product2 -> Added
product3 -> Added
```

#### Visible code

```csharp
context.Products.Add(product1);
context.Products.Add(product2);
context.Products.Add(product3);
```

---

### CTXDB04A-S002 / S-120 - `d06a83a760`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: One SaveChanges is one flush, not one SQL query

#### Visible text

```text
Does one SaveChanges() mean one SQL query?

Not necessarily.

One SaveChanges() means one flush, but that flush may contain many SQL commands. If products has 1,000 items, EF may send many INSERT statements, often batched together.
```

#### Visible code

```csharp
context.Products.AddRange(products);
await context.SaveChangesAsync();
```

---

### CTXDB04A-S003 / S-122 - `d89c0f6504`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Transaction state lives in the database engine, EF holds a handle

#### Visible text

```text
The transaction lives in the database engine, attached to a specific database connection/session. EF Core does not “store” the transaction in memory. EF only holds a handle to it.

So when you begin a transaction, EF tells the database to begin the transaction.
```

#### Visible code

```csharp
DbContext
  -> DbConnection
      -> DbTransaction handle
          -> real transaction state inside the database

await using var tx = await context.Database.BeginTransactionAsync();

BEGIN TRANSACTION;
```

---

### CTXDB04A-S004 / S-132 - `88eb4730a5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SaveChanges batches multiple statements but is one EF flush operation

#### Visible text

```text
Conceptually, one SaveChanges may contain batches and many INSERT statements.

So:
One SaveChanges ≠ one INSERT
One SaveChanges ≠ always one round trip
One SaveChanges = one EF flush operation

EF Core batches multiple statements when possible, but batching has limits depending on provider, generated values, relationships, parameter limits, and configuration.
```

#### Visible code

```csharp
SaveChanges
  Batch 1:
    INSERT product 1
    INSERT product 2
    ...
  Batch 2:
    INSERT product 43
    INSERT product 44
    ...

One SaveChanges ≠ one INSERT
One SaveChanges ≠ always one round trip
One SaveChanges = one EF flush operation
```

---

### CTXDB04A-S005 / S-134 - `60f8848931`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Commands participate until CommitAsync or RollbackAsync

#### Visible text

```text
From the point a transaction begins, commands sent through that same connection participate in the database transaction until commit or rollback.
```

#### Visible code

```csharp
await tx.CommitAsync();

// or:

await tx.RollbackAsync();
```

---

### CTXDB04A-S006 / S-136 - `e82cbae5ca`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SaveChanges flush pipeline

#### Visible text

```text
When you call SaveChangesAsync(), EF “flushes” tracked changes to the database.

That means EF:
1. detects what changed
2. builds INSERT/UPDATE/DELETE commands
3. orders commands correctly
4. opens/uses a database connection
5. sends commands to the database
6. reads generated values back, such as identity IDs
7. updates entity states if save succeeded

So SaveChanges() is the moment where EF turns tracked object changes into real database commands.
```

#### Visible code

```csharp
await context.SaveChangesAsync();
```

---

## 2.2 CTXDB04B - Continuation / interop / sharing patterns

### CTXDB04B-S001 / S-121 - `a392d44b53`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Rows are written before commit inside an outer transaction

#### Visible text

```text
But if there is an outer transaction, are rows written before commit?

Yes.

After the first SaveChanges(), product A has been sent to the database. But it is not permanently committed yet. Other transactions usually cannot see it, depending on isolation level.
```

#### Visible code

```csharp
await using var tx = await context.Database.BeginTransactionAsync();

context.Products.Add(new Product { Name = "A" });
await context.SaveChangesAsync();

context.Products.Add(new Product { Name = "B" });
await context.SaveChangesAsync();

await tx.CommitAsync();
```

---

### CTXDB04B-S002 / S-137 - `422cb847c0`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SaveChanges inside outer transaction can later be rolled back

#### Visible text

```text
Example of SaveChanges inside an outer transaction followed by rollback. Product A and product B are flushed to the database transaction, but RollbackAsync undoes the transaction.
```

#### Visible code

```csharp
await using var tx = await context.Database.BeginTransactionAsync();

context.Products.Add(new Product { Name = "A" });
await context.SaveChangesAsync();

context.Products.Add(new Product { Name = "B" });
await context.SaveChangesAsync();

await tx.RollbackAsync();
```

---

### CTXDB04B-S003 / S-143 - `8eea8882c1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Each SaveChanges sends SQL but changes remain uncommitted

#### Visible text

```text
Conceptually, the database sees BEGIN TRANSACTION, INSERT A, INSERT B, then ROLLBACK.

So yes: each SaveChanges() sends SQL to the database, but those changes are still inside the uncommitted transaction. They are real database changes, but not permanent yet. The database keeps enough information to undo them if rollback happens.
```

#### Visible code

```csharp
BEGIN TRANSACTION;

INSERT INTO Products (Name) VALUES ('A');

INSERT INTO Products (Name) VALUES ('B');

ROLLBACK;
```

---

### CTXDB04B-S004 / S-149 - `0236c82fbe`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Add vs SaveChanges vs Commit vs Rollback distinction

#### Visible text

```text
The important distinction:

Add(...) is EF memory only.
SaveChanges() sends SQL to the database transaction.
Commit() makes the transaction permanent.
Rollback() tells the database to undo everything in the transaction.
```

#### Visible code

```csharp
Add(...)
    EF memory only

SaveChanges()
    sends SQL to database transaction

Commit()
    makes the transaction permanent

Rollback()
    tells database to undo everything in the transaction
```

---

## 3. Cleaned source notes

- Add/AddRange changes the ChangeTracker only; SaveChanges is the flush that sends database commands.
- One SaveChanges can execute many SQL statements and provider batches.
- Inside an outer transaction, flushed rows are real database writes but are not permanent until commit.
- Rollback can undo rows that were already sent by SaveChanges because they belong to the uncommitted transaction.
- The clean mental model is Add = memory, SaveChanges = SQL sent to transaction, Commit = permanent, Rollback = undo.

---

## 4. Question hooks

- What exists only in EF memory before SaveChanges?
- What does SaveChanges actually flush?
- What is permanent only after commit?
- What can rollback undo?
