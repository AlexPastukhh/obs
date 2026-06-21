# CTXDB05 - IDbContextTransaction / GetDbTransaction / UseTransaction / ADO.NET shared transaction

Conspect: `ef-core-context-database-transaction-object-savechanges-dbconnection-dbtransaction`<br>
File type: **source-preserving large region transcript**  
Stage: **4 / NEXT03 verified transcript v001**  
Generated: 2026-06-02 11:25:47 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- IDbContextTransaction is EF's transaction control wrapper for commit, rollback, savepoints, and transaction metadata.
- Automatic savepoints can add overhead in large chunked transactions; disable them only with a deliberate savepoint/failure policy.
- GetDbTransaction exposes the underlying ADO.NET DbTransaction for raw commands, stored procedures, bulk APIs, or another context.
- Use IDbContextTransaction to manage EF transactions; use DbTransaction when another API needs the raw ADO.NET transaction.
- Without an outer transaction, separate SaveChanges calls normally commit independently.
- To share one local transaction, participants must share the same connection and the same transaction.
- UseTransaction does not merge two existing transactions; it tells EF to use one existing DbTransaction.
- A single local connection should not be designed to host two separate active local transactions for different participants.

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
S-056, S-060, S-063, S-065, S-069, S-070, S-075, S-080, S-083, S-090, S-097, S-099, S-102, S-105, S-108, S-112, S-115, S-123, S-124, S-133, S-135, S-142, S-158, S-161, S-162, S-164, S-165, S-166, S-167, S-168, S-170, S-171, S-172, S-173, S-174, S-175, S-177, S-179, S-180, S-181, S-183, S-184
```

Boundary decision:
```text
CTXDB05 covers IDbContextTransaction, savepoints, GetDbTransaction, UseTransaction, raw ADO.NET, and shared local transaction patterns.
It does not cover DbConnection lifecycle/SetDbConnection/command timeout; those remain CTXDB06.
```

Pending after this region:
```text
CTXDB06, CTXDB07
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CTXDB05A-S001 | S-056 | IU-056 | `e938e48b8e` | CTXDB05A | `verified-visible-partial-from-source-image` | bottom continuation | Transaction object returned by BeginTransactionAsync |
| CTXDB05A-S002 | S-060 | IU-060 | `b1b470b566` | CTXDB05A | `verified-from-source-image` | no | Savepoint overhead in large batch |
| CTXDB05A-S003 | S-063 | IU-063 | `577bc74db1` | CTXDB05A | `verified-from-source-image` | no | Commit / CommitAsync |
| CTXDB05A-S004 | S-065 | IU-065 | `7d2efaceaa` | CTXDB05A | `verified-from-source-image` | no | Practical answer on savepoint cost |
| CTXDB05A-S005 | S-069 | IU-069 | `032d7df171` | CTXDB05A | `verified-visible-partial-from-source-image` | top continuation | Rollback / RollbackAsync |
| CTXDB05A-S006 | S-070 | IU-070 | `ffeb97c5e0` | CTXDB05A | `verified-visible-partial-from-source-image` | bottom continues | Safe summary for savepoint overhead |
| CTXDB05A-S007 | S-075 | IU-075 | `73d58b17f5` | CTXDB05A | `verified-from-source-image` | no | CreateSavepoint |
| CTXDB05A-S008 | S-080 | IU-080 | `8336f9e525` | CTXDB05A | `verified-from-source-image` | no | RollbackToSavepoint |
| CTXDB05A-S009 | S-083 | IU-083 | `f975e8c97d` | CTXDB05A | `verified-from-source-image` | no | ReleaseSavepoint |
| CTXDB05A-S010 | S-090 | IU-090 | `cff84cf97d` | CTXDB05A | `verified-from-source-image` | no | SupportsSavepoints |
| CTXDB05A-S011 | S-097 | IU-097 | `51d31e7291` | CTXDB05A | `verified-from-source-image` | no | TransactionId for correlation |
| CTXDB05A-S012 | S-099 | IU-099 | `4165daffb9` | CTXDB05A | `verified-from-source-image` | no | Raw DbTransaction and clean control rule |
| CTXDB05A-S013 | S-102 | IU-102 | `9bed71cc5e` | CTXDB05A | `verified-from-source-image` | no | Why getting DbTransaction is useful |
| CTXDB05A-S014 | S-105 | IU-105 | `02d4df4fbd` | CTXDB05A | `verified-from-source-image` | no | GetDbTransaction |
| CTXDB05A-S015 | S-108 | IU-108 | `c82aaf7ffd` | CTXDB05A | `verified-visible-partial-from-source-image` | top continuation | Raw ADO.NET command inside EF transaction |
| CTXDB05A-S016 | S-112 | IU-112 | `cc80b1375b` | CTXDB05A | `verified-from-source-image` | no | DbTransaction type and provider-specific runtime classes |
| CTXDB05A-S017 | S-115 | IU-115 | `06c7a0e20a` | CTXDB05A | `verified-visible-partial-from-source-image` | bottom continuation | Why sharing raw transaction is helpful |
| CTXDB05A-S018 | S-123 | IU-123 | `aa6e04d7c1` | CTXDB05A | `verified-visible-partial-from-source-image` | top continuation | Share same transaction with another DbContext |
| CTXDB05A-S019 | S-124 | IU-124 | `e39801aa4d` | CTXDB05A | `verified-visible-partial-from-source-image` | bottom continuation | You do not need provider-specific cast for base transaction API |
| CTXDB05A-S020 | S-133 | IU-133 | `4951060a03` | CTXDB05A | `verified-from-source-image` | no | Provider-specific cast only when needed |
| CTXDB05A-S021 | S-135 | IU-135 | `339392b7c2` | CTXDB05A | `verified-from-source-image` | no | Interoperate with ADO.NET-based libraries |
| CTXDB05A-S022 | S-142 | IU-142 | `c8b6600ab0` | CTXDB05A | `verified-from-source-image` | no | Use provider-specific features |
| CTXDB05B-S001 | S-158 | IU-158 | `98ed383ecd` | CTXDB05B | `verified-from-source-image` | no | No outer transaction means each SaveChanges normally gets its own transaction |
| CTXDB05B-S002 | S-161 | IU-161 | `f863692ee8` | CTXDB05B | `verified-visible-partial-from-source-image` | top continuation | Separate SaveChanges without outer transaction commit independently |
| CTXDB05B-S003 | S-162 | IU-162 | `9a6d3e9e7f` | CTXDB05B | `verified-from-source-image` | no | Where savepoints fit |
| CTXDB05B-S004 | S-164 | IU-164 | `506795edd6` | CTXDB05B | `verified-from-source-image` | no | Same connection, one participant uses a transaction and another does not |
| CTXDB05B-S005 | S-165 | IU-165 | `112fc8a86d` | CTXDB05B | `verified-from-source-image` | no | Requirements to share one local transaction |
| CTXDB05B-S006 | S-166 | IU-166 | `75c84d25a3` | CTXDB05B | `verified-from-source-image` | no | UseTransaction cannot merge two EF transactions |
| CTXDB05B-S007 | S-167 | IU-167 | `19b5875c0f` | CTXDB05B | `verified-visible-partial-from-source-image` | top continuation | Savepoint final result and EF automatic savepoint concept |
| CTXDB05B-S008 | S-168 | IU-168 | `62ae25435a` | CTXDB05B | `verified-visible-partial-from-source-image` | top continuation | Same connection is not enough; same transaction must be attached |
| CTXDB05B-S009 | S-170 | IU-170 | `3d293ea582` | CTXDB05B | `verified-from-source-image` | no | What UseTransaction does not do |
| CTXDB05B-S010 | S-171 | IU-171 | `7791077b16` | CTXDB05B | `verified-from-source-image` | no | ADO.NET command joins shared transaction |
| CTXDB05B-S011 | S-172 | IU-172 | `c0b37c5af1` | CTXDB05B | `verified-from-source-image` | no | Same connection cannot have two separate local transactions for different participants |
| CTXDB05B-S012 | S-173 | IU-173 | `70feb20ef7` | CTXDB05B | `verified-from-source-image` | no | Correct pattern for same unit of work |
| CTXDB05B-S013 | S-174 | IU-174 | `f20a9fac6e` | CTXDB05B | `verified-from-source-image` | no | Another EF context joins shared transaction |
| CTXDB05B-S014 | S-175 | IU-175 | `2c66216e55` | CTXDB05B | `verified-from-source-image` | no | Design: one connection, one DbTransaction, many participants |
| CTXDB05B-S015 | S-177 | IU-177 | `e57e40183a` | CTXDB05B | `verified-from-source-image` | no | Practical rule against multiple local transactions on one connection |
| CTXDB05B-S016 | S-179 | IU-179 | `e652c97551` | CTXDB05B | `verified-from-source-image` | no | UseTransaction EF context + ADO.NET sharing start |
| CTXDB05B-S017 | S-180 | IU-180 | `cade5d0708` | CTXDB05B | `verified-visible-partial-from-source-image` | bottom continues into S-183 | UseTransaction EF context + another EF context example start |
| CTXDB05B-S018 | S-181 | IU-181 | `395e02e536` | CTXDB05B | `verified-visible-partial-from-source-image` | bottom continues into S-184 | UseTransaction EF context + ADO.NET example start |
| CTXDB05B-S019 | S-183 | IU-183 | `7897ee189d` | CTXDB05B | `verified-visible-partial-from-source-image` | top continues from S-180 | UseTransaction two EF contexts continuation |
| CTXDB05B-S020 | S-184 | IU-184 | `658019a4c0` | CTXDB05B | `verified-visible-partial-from-source-image` | bottom continues beyond visible crop | UseTransaction EF context + ADO.NET continuation |

---

## 2. Verified source transcript

## 2.1 CTXDB05A - Core API / primary lifecycle

### CTXDB05A-S001 / S-056 - `e938e48b8e`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continuation`
- confidence: `high-for-visible-part`
- theme: Transaction object returned by BeginTransactionAsync

#### Visible text

```text
1) The transaction object itself

When you call BeginTransactionAsync(), EF gives you a transaction object/handle. You use that object to commit, roll back, and access transaction-specific APIs.
```

#### Visible code

```csharp
await using var tx = await db.Database.BeginTransactionAsync();
```

---

### CTXDB05A-S002 / S-060 - `b1b470b566`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Savepoint overhead in large batch

#### Visible text

```text
Is there overhead when savepoints are created in a large batch?

Yes, usually some overhead.

A savepoint is a real transaction checkpoint. EF exposes CreateSavepoint, RollbackToSavepoint, and ReleaseSavepoint. Releasing a savepoint allows the system to reclaim resources before the transaction ends. That implies savepoints are not free objects; they consume transaction-related resources until released or until the transaction ends.
```

---

### CTXDB05A-S003 / S-063 - `577bc74db1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Commit / CommitAsync

#### Visible text

```text
What the transaction object gives you

Commit / CommitAsync

This makes the whole transaction permanent. Use it when all steps succeeded and you want the database to keep the changes.
```

#### Visible code

```csharp
await tx.CommitAsync();
```

---

### CTXDB05A-S004 / S-065 - `7d2efaceaa`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Practical answer on savepoint cost

#### Visible text

```text
The practical answer is:
- one big transaction + many SaveChanges() calls + auto savepoints = extra savepoint operations
- that means some additional cost in transaction bookkeeping/resources
- whether it matters depends on how many chunks you have and how sensitive that path is
```

---

### CTXDB05A-S005 / S-069 - `032d7df171`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-part`
- theme: Rollback / RollbackAsync

#### Visible text

```text
Rollback / RollbackAsync

This discards the transaction. Use it when anything important failed and you want none of that transaction's work to remain.
```

#### Visible code

```csharp
await tx.RollbackAsync();
```

---

### CTXDB05A-S006 / S-070 - `ffeb97c5e0`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continues`
- confidence: `high-for-visible-text`
- theme: Safe summary for savepoint overhead

#### Visible text

```text
The safest summary is: yes, there is overhead, but it is usually transaction/safety overhead, not something you optimize away unless you have a real batching reason. The docs do not give a numeric cost, so that part is an engineering inference from the fact that savepoints are real transaction operations with reclaimable resources.
```

---

### CTXDB05A-S007 / S-075 - `73d58b17f5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CreateSavepoint

#### Visible text

```text
CreateSavepoint

This creates a named checkpoint inside the transaction. A savepoint lets you undo only the work that happened after that point, instead of throwing away the whole transaction. EF documents savepoints specifically for that purpose.
```

#### Visible code

```csharp
await tx.CreateSavepointAsync("after-order");
```

---

### CTXDB05A-S008 / S-080 - `8336f9e525`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: RollbackToSavepoint

#### Visible text

```text
RollbackToSavepoint

This rewinds only to that checkpoint. It is useful when step 2 fails but step 1 was still valid and you want to keep the outer transaction open.
```

#### Visible code

```csharp
await tx.RollbackToSavepointAsync("after-order");
```

---

### CTXDB05A-S009 / S-083 - `f975e8c97d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ReleaseSavepoint

#### Visible text

```text
ReleaseSavepoint

This removes a savepoint you no longer need. EF says this destroys the savepoint and allows the system to reclaim resources before the transaction ends.
```

#### Visible code

```csharp
await tx.ReleaseSavepointAsync("after-order");
```

---

### CTXDB05A-S010 / S-090 - `cff84cf97d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SupportsSavepoints

#### Visible text

```text
SupportsSavepoints

This tells you whether the provider supports savepoints. If it is false, the savepoint methods are expected to throw NotSupportedException.
```

#### Visible code

```csharp
if (tx.SupportsSavepoints)
{
    await tx.CreateSavepointAsync("x");
}
```

---

### CTXDB05A-S011 / S-097 - `51d31e7291`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: TransactionId for correlation

#### Visible text

```text
TransactionId

This gives you an identifier for correlation. Helpful for tracing logs across service layers. EF exposes TransactionId directly on the interface.
```

#### Visible code

```csharp
_logger.LogInformation("Tx id: {Id}", tx.TransactionId);
```

---

### CTXDB05A-S012 / S-099 - `4165daffb9`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Raw DbTransaction and clean control rule

#### Visible text

```text
What you can do with a raw DbTransaction

At the ADO.NET level, the main things are still Commit() and Rollback(), and depending on provider support, savepoint-related behavior through overloads such as Rollback(string savepointName). DbTransaction is the real object the database driver uses to manage that database transaction.

Clean rule:
- use IDbContextTransaction to manage the transaction in EF code
- use DbTransaction when another API needs the raw ADO.NET transaction
```

---

### CTXDB05A-S013 / S-102 - `9bed71cc5e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why getting DbTransaction is useful

#### Visible text

```text
Why getting the DbTransaction from EF can be helpful

It becomes useful when part of your workflow uses EF Core, but another part uses raw ADO.NET or another library that works with ADO.NET objects directly.

Typical reason:
1. Run raw SQL commands inside the same EF transaction.

Suppose EF inserts an order, and then you want a manual DbCommand or stored procedure call to run in the same transaction.
```

---

### CTXDB05A-S014 / S-105 - `02d4df4fbd`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: GetDbTransaction

#### Visible text

```text
GetDbTransaction()

This gives you the underlying relational DbTransaction. That is useful when mixing EF Core with raw ADO.NET, stored procedures, or another context that needs to enlist in the same transaction.
```

#### Visible code

```csharp
var adoTx = tx.GetDbTransaction();
```

---

### CTXDB05A-S015 / S-108 - `c82aaf7ffd`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-code`
- theme: Raw ADO.NET command inside EF transaction

#### Visible text

```text
Example: begin an EF transaction, save an order through EF, get the DbConnection and DbTransaction, create a DbCommand, attach the same transaction, run a manual SQL update, then commit the EF transaction.
```

#### Visible code

```csharp
await using var efTx = await db.Database.BeginTransactionAsync();

db.Orders.Add(order);
await db.SaveChangesAsync();

var conn = db.Database.GetDbConnection();
var adoTx = efTx.GetDbTransaction();

await using var cmd = conn.CreateCommand();
cmd.Transaction = adoTx;
cmd.CommandText = "UPDATE Inventory SET Quantity = Quantity - 1 WHERE ProductId = @p0";

var p = cmd.CreateParameter();
p.ParameterName = "@p0";
p.Value = order.ProductId;
cmd.Parameters.Add(p);

await cmd.ExecuteNonQueryAsync();

await efTx.CommitAsync();
```

---

### CTXDB05A-S016 / S-112 - `cc80b1375b`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DbTransaction type and provider-specific runtime classes

#### Visible text

```text
In practice:
dbTx is typed as System.Data.Common.DbTransaction.

At runtime it is typically something like:
- SqlTransaction for SQL Server
- NpgsqlTransaction for PostgreSQL
- SqliteTransaction for SQLite

Those provider-specific transaction classes derive from DbTransaction, which is the ADO.NET base class.
```

#### Visible code

```csharp
var dbTx = db.Database.CurrentTransaction!.GetDbTransaction();

System.Data.Common.DbTransaction
```

---

### CTXDB05A-S017 / S-115 - `06c7a0e20a`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continuation`
- confidence: `high-for-visible-text`
- theme: Why sharing raw transaction is helpful

#### Visible text

```text
Why this is helpful:
- EF work and raw SQL work now succeed or fail together
- if the command fails, you can roll back the whole unit
- you do not accidentally run raw SQL outside EF's transaction

That is the most common practical use.
```

---

### CTXDB05A-S018 / S-123 - `aa6e04d7c1`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-part`
- theme: Share same transaction with another DbContext

#### Visible text

```text
Share the same transaction with another DbContext

EF Core supports sharing a transaction across contexts for relational providers, using the same connection/transaction. The raw piece being shared underneath is the DbTransaction.

This is useful when:
- one transaction must cover work across multiple contexts
- you split read/write models or modules across contexts
- you still want one atomic commit
```

#### Visible code

```csharp
var adoTx = efTx.GetDbTransaction();
await otherContext.Database.UseTransactionAsync(adoTx);
```

---

### CTXDB05A-S019 / S-124 - `e39801aa4d`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continuation`
- confidence: `high-for-visible-text`
- theme: You do not need provider-specific cast for base transaction API

#### Visible text

```text
What that means

You do not need to cast if all you need is the common transaction API. CommitAsync and RollbackAsync work through the base DbTransaction type.
```

#### Visible code

```csharp
await dbTx.CommitAsync();
await dbTx.RollbackAsync();
```

---

### CTXDB05A-S020 / S-133 - `4951060a03`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Provider-specific cast only when needed

#### Visible text

```text
You do cast only when you specifically need provider-specific behavior or must pass the transaction to an API that expects that provider's concrete type.
```

#### Visible code

```csharp
var dbTx = db.Database.CurrentTransaction!.GetDbTransaction();

if (dbTx is SqlTransaction sqlTx)
{
    // use SQL Server-specific API or pass to an API requiring SqlTransaction
}
```

---

### CTXDB05A-S021 / S-135 - `339392b7c2`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Interoperate with ADO.NET-based libraries

#### Visible text

```text
Interoperate with libraries that understand ADO.NET but not EF

Many lower-level libraries work with DbConnection, DbTransaction, and DbCommand, not with IDbContextTransaction. So GetDbTransaction() lets EF participate in a bigger ADO.NET-based workflow.

Examples:
- custom repository code using DbCommand
- stored procedure helpers
- bulk utilities that accept a transaction
- direct ADO.NET batching code
```

---

### CTXDB05A-S022 / S-142 - `c8b6600ab0`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Use provider-specific features

#### Visible text

```text
Use provider-specific features

Because DbTransaction is a base class, sometimes you may cast it to the provider-specific type, such as SqlTransaction, if you truly need provider-specific APIs or integration points. That is an advanced case, but it is another reason the raw transaction matters.
```

---

## 2.2 CTXDB05B - Continuation / interop / sharing patterns

### CTXDB05B-S001 / S-158 - `98ed383ecd`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: No outer transaction means each SaveChanges normally gets its own transaction

#### Visible text

```text
What if there is no outer transaction?

If you add product A and call SaveChanges(), then add product B and call SaveChanges(), EF Core normally wraps each SaveChanges() in its own transaction.
```

#### Visible code

```csharp
context.Products.Add(new Product { Name = "A" });
await context.SaveChangesAsync();

context.Products.Add(new Product { Name = "B" });
await context.SaveChangesAsync();
```

---

### CTXDB05B-S002 / S-161 - `f863692ee8`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-text`
- theme: Separate SaveChanges without outer transaction commit independently

#### Visible text

```text
Conceptually:
BEGIN TRANSACTION;
INSERT INTO Products (Name) VALUES ('A');
COMMIT;

BEGIN TRANSACTION;
INSERT INTO Products (Name) VALUES ('B');
COMMIT;

So if the second save fails, the first one is already committed.
```

---

### CTXDB05B-S003 / S-162 - `9a6d3e9e7f`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Where savepoints fit

#### Visible text

```text
Where do savepoints fit?

Savepoints are smaller rollback points inside the same database transaction.
```

#### Visible code

```csharp
BEGIN TRANSACTION;

INSERT A;

SAVEPOINT BeforeB;

INSERT B;

ROLLBACK TO SAVEPOINT BeforeB;

INSERT C;

COMMIT;
```

---

### CTXDB05B-S004 / S-164 - `506795edd6`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Same connection, one participant uses a transaction and another does not

#### Visible text

```text
Case B — same connection, one uses a transaction, the other does not

This is the tricky case.

Conceptually:
Connection C
  Transaction T exists on C

Participant A -> uses T
Participant B -> does not use T
```

---

### CTXDB05B-S005 / S-165 - `112fc8a86d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Requirements to share one local transaction

#### Visible text

```text
To share one local transaction, you need:

A. Same connection
- create one SqlConnection manually and pass it to all participants
- or use one context's connection via GetDbConnection() if deliberately coordinating around that same connection object

B. Same transaction
- start one transaction
- get the underlying ADO.NET transaction when needed with transaction.GetDbTransaction() for EF-created transactions
- attach other participants to that same transaction
```

---

### CTXDB05B-S006 / S-166 - `75c84d25a3`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: UseTransaction cannot merge two EF transactions

#### Visible text

```text
Can we merge two EF transactions?

Short answer: no, not with UseTransaction.

If you already have:
Context A -> Transaction T1
Context B -> Transaction T2

those are already two separate transactions.
```

---

### CTXDB05B-S007 / S-167 - `19b5875c0f`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-text`
- theme: Savepoint final result and EF automatic savepoint concept

#### Visible text

```text
Final result:
A committed
B undone
C committed

So the transaction still lives in the database. The savepoint is also a database-side marker inside that transaction.

EF Core's automatic savepoints are basically:
Before SaveChanges #2, create a marker.
If SaveChanges #2 fails, rollback to that marker.
Keep the outer transaction alive.
```

---

### CTXDB05B-S008 / S-168 - `62ae25435a`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-text`
- theme: Same connection is not enough; same transaction must be attached

#### Visible text

```text
Effect:
- same connection: yes
- same transaction: no

For plain ADO.NET on a connection with an active local transaction, Microsoft says if you execute a command and do not assign the command's Transaction, an exception is thrown.

For manual commands on that connection, this is a bad pattern. For EF contexts, the safe mental model is still: if another context must share the transaction, explicitly attach it with UseTransaction. EF Core's transaction-sharing docs require sharing both the connection and the transaction.
```

---

### CTXDB05B-S009 / S-170 - `3d293ea582`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: What UseTransaction does not do

#### Visible text

```text
UseTransaction does not:
- combine T1 and T2
- create one bigger transaction from them
- reconcile their state

It only accepts one existing DbTransaction and tells EF to use it. If you truly already created two separate transactions, you are past the point where UseTransaction helps.
```

---

### CTXDB05B-S010 / S-171 - `7791077b16`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ADO.NET command joins shared transaction

#### Visible text

```text
ADO.NET command joins the shared transaction like this: assign cmd.Transaction to the existing transaction, or if EF created the transaction, assign cmd.Transaction to efTx.GetDbTransaction(). GetDbTransaction() returns the underlying DbTransaction from EF's IDbContextTransaction.
```

#### Visible code

```csharp
cmd.Transaction = tx;                  // if tx is already SqlTransaction/DbTransaction

// or if EF created the transaction:
cmd.Transaction = efTx.GetDbTransaction();
```

---

### CTXDB05B-S011 / S-172 - `c0b37c5af1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Same connection cannot have two separate local transactions for different participants

#### Visible text

```text
Case D — same connection, one uses transaction T1, another tries to use different transaction T2

For one connection, this is generally an invalid idea for local transactions. On one connection, a local transaction belongs to that connection, and provider rules around active transactions apply. SqlClient docs also note parallel transactions are not allowed in the MARS case, and ADO.NET transaction docs treat the local transaction as the active transaction for that connection.
```

---

### CTXDB05B-S012 / S-173 - `70feb20ef7`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Correct pattern for same unit of work

#### Visible text

```text
What you should do instead

If two contexts must participate in the same unit of work, the right pattern is:
1. create one connection
2. create one transaction
3. make both contexts use that same connection
4. call UseTransaction for the second context, or for any context that did not create the transaction itself.
```

---

### CTXDB05B-S013 / S-174 - `f20a9fac6e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Another EF context joins shared transaction

#### Visible text

```text
Another EF context joins the shared transaction like this:

UseTransaction tells that context to use an existing DbTransaction.
```

#### Visible code

```csharp
await context2.Database.UseTransactionAsync(efTx.GetDbTransaction());

// or if you already have a raw ADO.NET transaction:

await context2.Database.UseTransactionAsync(rawDbTransaction);
```

---

### CTXDB05B-S014 / S-175 - `2c66216e55`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Design: one connection, one DbTransaction, many participants

#### Visible text

```text
So the design is:
one connection
one DbTransaction
many participants

not:
two independent transactions
-> merge later
```

---

### CTXDB05B-S015 / S-177 - `e57e40183a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Practical rule against multiple local transactions on one connection

#### Visible text

```text
So the practical rule is:

on one connection, do not design for “two separate local transactions active for different participants”.

Expect failure or invalid behavior rather than anything useful.
```

---

### CTXDB05B-S016 / S-179 - `e652c97551`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: UseTransaction EF context + ADO.NET sharing start

#### Visible text

```text
UseTransaction: EF context + ADO.NET example

What starts being shared, and when?

The transaction starts being shared when:
1. you already have an existing DbConnection
2. you start a DbTransaction on it
3. you create/use an EF context on that same connection
4. you call UseTransaction(existingTransaction) on that context. EF Core docs describe exactly this pattern.
```

---

### CTXDB05B-S017 / S-180 - `cade5d0708`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continues into S-183`
- confidence: `high-for-visible-code`
- theme: UseTransaction EF context + another EF context example start

#### Visible text

```text
UseTransaction: EF context + another EF context example. The example creates a SqlConnection, opens it, builds DbContextOptions using that connection with contextOwnsConnection: false, creates context1, and begins a transaction from context1.
```

#### Visible code

```csharp
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var connectionString =
    "Server=.;Database=AppDb;Trusted_Connection=True;TrustServerCertificate=True";

await using var conn = new SqlConnection(connectionString);
await conn.OpenAsync();

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlServer(conn, contextOwnsConnection: false)
    .Options;

await using var context1 = new AppDbContext(options);
await using var tx = await context1.Database.BeginTransactionAsync();
```

---

### CTXDB05B-S018 / S-181 - `395e02e536`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continues into S-184`
- confidence: `high-for-visible-code`
- theme: UseTransaction EF context + ADO.NET example start

#### Visible text

```text
Example starts a SqlConnection, opens it, then starts an ADO.NET DbTransaction on that connection. This transaction can later be attached to ADO.NET commands and EF contexts that use the same connection.
```

#### Visible code

```csharp
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var connectionString =
    "Server=.;Database=AppDb;Trusted_Connection=True;TrustServerCertificate=True";

await using var conn = new SqlConnection(connectionString);
await conn.OpenAsync();

await using var tx = await conn.BeginTransactionAsync();
```

---

### CTXDB05B-S019 / S-183 - `7897ee189d`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continues from S-180`
- confidence: `high-for-visible-code`
- theme: UseTransaction two EF contexts continuation

#### Visible text

```text
Continuation of the two-context example: context1 writes and saves; context2 is created with the same options/connection; sharing starts when context2 calls UseTransactionAsync(tx.GetDbTransaction()); context2 writes and saves; the original transaction commits. On failure, the transaction rolls back.
```

#### Visible code

```csharp
try
{
    context1.Posts.Add(new Post { Title = "From context1" });
    await context1.SaveChangesAsync();

    await using var context2 = new AppDbContext(options);

    // Sharing starts here for context2:
    await context2.Database.UseTransactionAsync(tx.GetDbTransaction());

    context2.Posts.Add(new Post { Title = "From context2" });
    await context2.SaveChangesAsync();

    await tx.CommitAsync();
}
catch
{
    await tx.RollbackAsync();
    throw;
}
```

---

### CTXDB05B-S020 / S-184 - `658019a4c0`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continues beyond visible crop`
- confidence: `high-for-visible-code`
- theme: UseTransaction EF context + ADO.NET continuation

#### Visible text

```text
Continuation of the EF context + ADO.NET example: an ADO.NET command explicitly uses the transaction; then EF DbContextOptions are built on the same connection with contextOwnsConnection: false, so an EF context can participate in the same transaction when UseTransaction is applied.
```

#### Visible code

```csharp
try
{
    // ADO.NET command explicitly uses the transaction
    await using (var cmd = conn.CreateCommand())
    {
        cmd.Transaction = tx; // important: same connection + same transaction
        cmd.CommandText = "UPDATE Counters SET Value = Value + 1 WHERE Name = 'Posts'";
        await cmd.ExecuteNonQueryAsync();
    }

    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseSqlServer(conn, contextOwnsConnection: false)
        .Options;

    await using var context = new AppDbContext(options);
}
```

---

## 3. Cleaned source notes

- IDbContextTransaction is EF's wrapper for managing a transaction: commit, rollback, savepoints, and metadata.
- GetDbTransaction is the bridge to raw ADO.NET DbTransaction for commands, stored procedures, bulk APIs, or another DbContext.
- Use the raw DbTransaction when another API expects ADO.NET objects; otherwise manage EF work through IDbContextTransaction.
- Without an outer transaction, two SaveChanges calls are usually two independent transactions.
- To share one local transaction, participants must share both the same connection and the same transaction.
- UseTransaction does not merge two existing transactions; it attaches EF to one existing DbTransaction.
- Do not design for two separate active local transactions on one connection.

---

## 4. Question hooks

- What does IDbContextTransaction give you?
- When should you use GetDbTransaction?
- What is the difference between IDbContextTransaction and DbTransaction?
- What does UseTransaction actually do?
- Why is same connection not enough without same transaction?
- Why can’t two EF transactions be merged later?
