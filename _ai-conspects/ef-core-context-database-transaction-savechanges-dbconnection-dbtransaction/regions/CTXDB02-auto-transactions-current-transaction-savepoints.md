# CTXDB02 - Automatic transactions / CurrentTransaction / AutoSavepointsEnabled

Conspect: `ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 09:21:18 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- SaveChanges remains a single atomic save unit on providers that support transactions.
- AutoTransactionBehavior controls when EF creates its own explicit transaction when no user transaction exists.
- WhenNeeded is the normal default and avoids unnecessary explicit transaction round trips for trivial single-statement saves.
- Always creates explicit transaction boundaries for every save but can add overhead.
- Never prevents automatic transaction creation and is risky except in very specialized contexts.
- CurrentTransaction lets code detect whether it should own a transaction or join an existing caller transaction.
- AutoSavepointsEnabled controls per-SaveChanges savepoints inside a manually started transaction.
- Explicit savepoints can be better when business phase boundaries do not match every SaveChanges call.

Reading quality:
```text
Overall: high.
Visible continuation fragments are explicitly marked in source metadata when present.
Confidence: high for concepts and boundary; medium-high for continuation fragments.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-002, S-004, S-006, S-007, S-008, S-009, S-011, S-012, S-013, S-015, S-017, S-018, S-020, S-021, S-022, S-023, S-025, S-026, S-027, S-028, S-029, S-030, S-033, S-035, S-039, S-041, S-043, S-047, S-052
```

Boundary decision:
```text
CTXDB02 covers transaction-related DatabaseFacade properties/methods, AutoTransactionBehavior, CurrentTransaction, AutoSavepointsEnabled, and savepoint examples.
It does not cover the later IDbContextTransaction/GetDbTransaction/UseTransaction region; those remain CTXDB05.
```

Pending after this region:
```text
CTXDB03, CTXDB04, CTXDB05, CTXDB06, CTXDB07
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CTXDB02-S001 | S-002 | IU-002 | `bbfbad7969` | CTXDB02B | `verified-from-source-image` | no | DbContext.Database is DatabaseFacade |
| CTXDB02-S002 | S-004 | IU-004 | `b81cd6d651` | CTXDB02A | `verified-from-source-image` | no | SaveChanges atomicity vs explicit transaction creation |
| CTXDB02-S003 | S-006 | IU-006 | `8212a18859` | CTXDB02B | `verified-from-source-image` | no | DbContext.Database main properties |
| CTXDB02-S004 | S-007 | IU-007 | `e8162450a1` | CTXDB02B | `verified-from-source-image` | no | Why use CurrentTransaction |
| CTXDB02-S005 | S-008 | IU-008 | `488c169097` | CTXDB02B | `verified-from-source-image` | no | AutoSavepointsEnabled true/false |
| CTXDB02-S006 | S-009 | IU-009 | `364f261c50` | CTXDB02B | `verified-from-source-image` | no | DatabaseFacade main instance methods |
| CTXDB02-S007 | S-011 | IU-011 | `d60e67434a` | CTXDB02B | `verified-from-source-image` | no | AutoSavepoints practical split |
| CTXDB02-S008 | S-012 | IU-012 | `f8490d6b85` | CTXDB02A | `verified-from-source-image` | no | WhenNeeded default |
| CTXDB02-S009 | S-013 | IU-013 | `6cbd79dabe` | CTXDB02B | `verified-visible-partial-from-source-image` | bottom-continues | CurrentTransaction ownership example start |
| CTXDB02-S010 | S-015 | IU-015 | `52e76fdb20` | CTXDB02A | `verified-visible-partial-from-source-image` | bottom-continues | WhenNeeded single statement example |
| CTXDB02-S011 | S-017 | IU-017 | `f349958410` | CTXDB02B | `verified-from-source-image` | no | AutoSavepoints true normal choice |
| CTXDB02-S012 | S-018 | IU-018 | `f1b6b3ec43` | CTXDB02B | `verified-visible-partial-from-source-image` | top-continues-from-S013 | CurrentTransaction guarded transaction code |
| CTXDB02-S013 | S-020 | IU-020 | `1d557a6bdb` | CTXDB02B | `verified-from-source-image` | no | Manual transaction with two SaveChanges |
| CTXDB02-S014 | S-021 | IU-021 | `9630c78d6c` | CTXDB02B | `verified-visible-partial-from-source-image` | bottom-continues | WhenNeeded multiple statements example |
| CTXDB02-S015 | S-022 | IU-022 | `bbfabb5d20` | CTXDB02B | `verified-from-source-image` | no | CurrentTransaction flow standalone vs outer transaction |
| CTXDB02-S016 | S-023 | IU-023 | `e27cd4bbd8` | CTXDB02B | `verified-from-source-image` | no | AutoSavepoints true flow |
| CTXDB02-S017 | S-025 | IU-025 | `8c016512b6` | CTXDB02A | `verified-from-source-image` | no | WhenNeeded with multiple statements flow |
| CTXDB02-S018 | S-026 | IU-026 | `ae6e5fab1f` | CTXDB02B | `verified-from-source-image` | no | CurrentTransaction with raw ADO.NET / Dapper |
| CTXDB02-S019 | S-027 | IU-027 | `515cefc600` | CTXDB02B | `verified-from-source-image` | no | AutoSavepoints false large batch import |
| CTXDB02-S020 | S-028 | IU-028 | `5c580fc158` | CTXDB02A | `verified-from-source-image` | no | AutoTransactionBehavior Always |
| CTXDB02-S021 | S-029 | IU-029 | `9d59cacc4a` | CTXDB02B | `verified-from-source-image` | no | AutoSavepoints false intended flow and caution |
| CTXDB02-S022 | S-030 | IU-030 | `be34ea62c8` | CTXDB02A | `verified-from-source-image` | no | Always flow and use case |
| CTXDB02-S023 | S-033 | IU-033 | `43d314f73d` | CTXDB02A | `verified-from-source-image` | no | AutoTransactionBehavior Never warning |
| CTXDB02-S024 | S-035 | IU-035 | `c6542a3688` | CTXDB02A | `verified-from-source-image` | no | Never example |
| CTXDB02-S025 | S-039 | IU-039 | `02b511c630` | CTXDB02B | `verified-from-source-image` | no | Refined summary: disabling automatic savepoints |
| CTXDB02-S026 | S-041 | IU-041 | `6baa058c54` | CTXDB02A | `verified-from-source-image` | no | When Never can make practical sense |
| CTXDB02-S027 | S-043 | IU-043 | `b9ee766727` | CTXDB02B | `verified-visible-partial-from-source-image` | bottom-continues-into-S047 | Explicit savepoint business phase pattern start |
| CTXDB02-S028 | S-047 | IU-047 | `463b614f06` | CTXDB02B | `verified-visible-partial-from-source-image` | continues-into-S052 | Explicit business phase savepoint pattern middle |
| CTXDB02-S029 | S-052 | IU-052 | `0ced7794a9` | CTXDB02B | `verified-visible-partial-from-source-image` | top-continues-from-S047 | Explicit business phase savepoint pattern end |

---

## 2. Verified source transcript

### CTXDB02-S001 / S-002 - `bbfbad7969`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DbContext.Database is DatabaseFacade

#### Visible text

```text
dbContext.Database is the DatabaseFacade for that context. It is EF Core’s API surface for database-level operations like transactions, connectivity checks, migrations, raw SQL, and connection access. It is not the database itself.
```

---

### CTXDB02-S002 / S-004 - `b81cd6d651`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SaveChanges atomicity vs explicit transaction creation

#### Visible text

```text
2) “I thought SaveChanges() always runs in a transaction”

The right way to think about it is:
- Yes, by default, if the provider supports transactions, all changes in one SaveChanges() call are applied transactionally. EF says that if any change fails, the transaction is rolled back and none of the changes are applied.
- But that does not always mean EF starts an explicit transaction itself. With AutoTransactionBehavior.WhenNeeded, EF may skip creating an explicit transaction if the work is already safely atomic as a single SQL statement, because most single SQL statements are implicitly executed within a transaction by the database.

So the reconciliation is:
- SaveChanges() still gives you the atomicity guarantee for one save unit, on providers that support transactions.
- AutoTransactionBehavior controls whether EF must create its own explicit transaction when there is no user transaction.

Also, AutoTransactionBehavior only matters when you have not already started or provided a transaction with BeginTransaction() or UseTransaction().
```

---

### CTXDB02-S003 / S-006 - `8212a18859`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DbContext.Database main properties

#### Visible text

```text
The main properties on DbContext.Database are:
- ProviderName — current provider name, such as the provider assembly name.
- CurrentTransaction — the current EF Core transaction, or null if none is active.
- AutoTransactionBehavior — controls whether SaveChanges() automatically creates a transaction when needed.
- AutoSavepointsEnabled — controls whether SaveChanges() creates a savepoint inside a manually started transaction.
- AutoTransactionsEnabled — obsolete; replaced by AutoTransactionBehavior.
```

---

### CTXDB02-S004 / S-007 - `e8162450a1`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why use CurrentTransaction

#### Visible text

```text
1) Why would you need CurrentTransaction?

You use CurrentTransaction when your code may run in two modes:
- sometimes standalone
- sometimes inside a broader transaction started by caller code

It helps you avoid doing the wrong thing, like starting a nested transaction, committing a transaction you do not own, or skipping special handling when a transaction is already active. EF Core exposes it as “the current transaction, or null if none is active.”

Typical use case

Imagine a service method that can be called:
- directly from an API endpoint
- or as part of a larger workflow that already began a transaction
```

---

### CTXDB02-S005 / S-008 - `488c169097`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoSavepointsEnabled true/false

#### Visible text

```text
3) When AutoSavepointsEnabled = true or false

AutoSavepointsEnabled applies to SaveChanges() when it is called after you manually started a transaction with BeginTransaction(). The default is true. EF says that means SaveChanges() will create a savepoint inside that manually started transaction, assuming the provider supports savepoints. EF also warns that setting it to false should be done cautiously because the database could be left in a corrupted state if SaveChanges() fails.
```

---

### CTXDB02-S006 / S-009 - `364f261c50`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DatabaseFacade main instance methods

#### Visible text

```text
The main instance methods are:
- BeginTransaction(), BeginTransactionAsync()
- CommitTransaction(), CommitTransactionAsync()
- RollbackTransaction(), RollbackTransactionAsync()
- CanConnect(), CanConnectAsync()
- CreateExecutionStrategy()
- EnsureCreated(), EnsureCreatedAsync()
- EnsureDeleted(), EnsureDeletedAsync()
```

---

### CTXDB02-S007 / S-011 - `d60e67434a`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoSavepoints practical split

#### Visible text

```text
So the practical split is:
- true: you want safer mid-transaction recovery and retry behavior.
- false: you plan to roll back the whole transaction on any save failure anyway, or you want full manual control over savepoint placement.
```

---

### CTXDB02-S008 / S-012 - `f8490d6b85`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: WhenNeeded default

#### Visible text

```text
WhenNeeded — default

This is the default. EF says transactions are automatically created as needed, and that most single SQL statements are implicitly transactional already, so an extra explicit transaction is not required.
```

---

### CTXDB02-S009 / S-013 - `6cbd79dabe`

Metadata:
- status: `verified-visible-partial-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `bottom-continues`
- confidence: `high-for-visible-part`
- theme: CurrentTransaction ownership example start

#### Visible text

```text
Example starts a CreateOrderAsync method that detects whether it owns the transaction by checking whether db.Database.CurrentTransaction == null. If it owns the transaction, it begins one.
```

#### Visible code

```csharp
public async Task CreateOrderAsync(AppDbContext db, Order order)
{
    var ownsTransaction = db.Database.CurrentTransaction == null;

    if (ownsTransaction)
        await db.Database.BeginTransactionAsync();
```

---

### CTXDB02-S010 / S-015 - `52e76fdb20`

Metadata:
- status: `verified-visible-partial-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `bottom-continues`
- confidence: `high-for-visible-part`
- theme: WhenNeeded single statement example

#### Visible text

```text
Example A: WhenNeeded with a single statement

Practical meaning:
1. EF sees one new row.
2. SQL Server will typically execute one INSERT.
3. Because this is a single statement, EF may decide an explicit BEGIN TRANSACTION / COMMIT is unnecessary.
4. The statement is still atomic at the database level.

This is why WhenNeeded is the best default for most apps: it keeps the safety of SaveChanges() while avoiding unnecessary transaction round trips for trivial single-statement saves.
```

#### Visible code

```csharp
db.AuditEntries.Add(new AuditEntry
{
    Message = "User signed in",
    CreatedUtc = DateTime.UtcNow
});

await db.SaveChangesAsync();
```

---

### CTXDB02-S011 / S-017 - `f349958410`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoSavepoints true normal choice

#### Visible text

```text
true — the normal choice

Use true when you have a long manual transaction and you want each SaveChanges() inside it to have a recovery checkpoint.

Example:
```

---

### CTXDB02-S012 / S-018 - `f1b6b3ec43`

Metadata:
- status: `verified-visible-partial-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `top-continues-from-S013`
- confidence: `high-for-visible-part`
- theme: CurrentTransaction guarded transaction code

#### Visible text

```text
Visible continuation of CurrentTransaction ownership example. It adds an order, saves, adds an audit log, saves, commits only if the method owns the transaction, and rolls back only if it owns the transaction and CurrentTransaction is still active.
```

#### Visible code

```csharp
try
{
    db.Orders.Add(order);
    await db.SaveChangesAsync();

    db.AuditLogs.Add(new AuditLog { Message = $"Order {order.Id} created" });
    await db.SaveChangesAsync();

    if (ownsTransaction)
        await db.Database.CommitTransactionAsync();
}
catch
{
    if (ownsTransaction && db.Database.CurrentTransaction != null)
        await db.Database.RollbackTransactionAsync();

    throw;
}
```

---

### CTXDB02-S013 / S-020 - `1d557a6bdb`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Manual transaction with two SaveChanges

#### Visible text

```text
Example of an explicit transaction that wraps two SaveChanges calls: insert order, save, insert inventory reservation, save, then commit.
```

#### Visible code

```csharp
await using var tx = await db.Database.BeginTransactionAsync();

db.Orders.Add(order);
await db.SaveChangesAsync();

db.InventoryReservations.Add(new InventoryReservation
{
    OrderId = order.Id,
    ProductId = order.ProductId,
    Quantity = order.Quantity
});
await db.SaveChangesAsync();

await tx.CommitAsync();
```

---

### CTXDB02-S014 / S-021 - `9630c78d6c`

Metadata:
- status: `verified-visible-partial-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `bottom-continues`
- confidence: `high-for-visible-part`
- theme: WhenNeeded multiple statements example

#### Visible text

```text
Example B: WhenNeeded with multiple statements

The example updates an order status and adds an outbox message before SaveChanges(). This SaveChanges() is likely to generate at least an UPDATE for Orders and an INSERT for OutboxMessages.
```

#### Visible code

```csharp
var order = await db.Orders.SingleAsync(x => x.Id == orderId);
order.Status = OrderStatus.Paid;

db.OutboxMessages.Add(new OutboxMessage
{
    Type = "OrderPaid",
    AggregateId = orderId.ToString()
});

await db.SaveChangesAsync();
```

---

### CTXDB02-S015 / S-022 - `bbfabb5d20`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CurrentTransaction flow standalone vs outer transaction

#### Visible text

```text
Flow

Case A: no outer transaction
1. CurrentTransaction == null
2. method starts a transaction
3. first SaveChanges()
4. second SaveChanges()
5. method commits

Case B: outer transaction already exists
1. CurrentTransaction != null
2. method does not start a new transaction
3. both SaveChanges() calls participate in the existing transaction
4. outer caller decides commit/rollback

That is the main value: detect and join existing transactional flow safely.
```

---

### CTXDB02-S016 / S-023 - `e27cd4bbd8`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoSavepoints true flow

#### Visible text

```text
Flow with AutoSavepointsEnabled = true:
1. Manual transaction begins.
2. Before first SaveChanges(), EF creates a savepoint.
3. Order insert succeeds.
4. Before second SaveChanges(), EF creates another savepoint.
5. If the reservation save fails, EF rolls back to that savepoint.
6. The surrounding transaction remains usable instead of being completely blown away.

This is especially useful when the second or third SaveChanges() may fail due to optimistic concurrency or other database issues, and you still want the transaction to remain recoverable. EF’s transactions docs explicitly call out automatic savepoints inside an existing transaction for this kind of scenario.
```

---

### CTXDB02-S017 / S-025 - `8c016512b6`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: WhenNeeded with multiple statements flow

#### Visible text

```text
This SaveChanges() is likely to generate at least:
- one UPDATE for Orders
- one INSERT for OutboxMessages

Flow:
1. No user transaction exists.
2. EF sees that one SaveChanges() will require multiple SQL statements.
3. With WhenNeeded, EF creates an explicit transaction.
4. It runs both statements.
5. If the second fails, the first is rolled back as part of that save unit.

That is the practical meaning of “when needed”.
```

---

### CTXDB02-S018 / S-026 - `ae6e5fab1f`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CurrentTransaction with raw ADO.NET / Dapper

#### Visible text

```text
Another common use

You may need CurrentTransaction when mixing:
- EF Core operations
- raw ADO.NET / Dapper / stored procedures

If a transaction already exists, you want the raw SQL command to use the same connection + transaction, not run outside it.
```

---

### CTXDB02-S019 / S-027 - `515cefc600`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoSavepoints false large batch import

#### Visible text

```text
false — only when you truly do not want per-save checkpoints

A practical case is a large batch import where you already know that any failure means full rollback of the entire transaction.
```

#### Visible code

```csharp
db.Database.AutoSavepointsEnabled = false;

await using var tx = await db.Database.BeginTransactionAsync();

foreach (var batch in batches)
{
    db.Products.AddRange(batch);
    await db.SaveChangesAsync();
}

await tx.CommitAsync();
```

---

### CTXDB02-S020 / S-028 - `5c580fc158`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoTransactionBehavior Always

#### Visible text

```text
Always

With Always, EF always creates an explicit transaction for SaveChanges() when no user transaction exists. Microsoft notes this can add database round trips and degrade performance.

Example:
```

#### Visible code

```csharp
db.Database.AutoTransactionBehavior = AutoTransactionBehavior.Always;

db.AuditEntries.Add(new AuditEntry
{
    Message = "User signed in",
    CreatedUtc = DateTime.UtcNow
});

await db.SaveChangesAsync();
```

---

### CTXDB02-S021 / S-029 - `9d59cacc4a`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoSavepoints false intended flow and caution

#### Visible text

```text
Intended flow:
1. Start one manual transaction for the whole import.
2. Save in chunks.
3. If any SaveChanges() fails, abort the whole import with RollbackAsync().
4. Because you never plan to recover from a mid-transaction save failure, automatic savepoints before every chunk add little value.

That can make false reasonable in a carefully controlled batch process. But the crucial part is this: once you choose false, your failure policy should usually be “rollback the whole transaction immediately.” The docs’ warning exists because without the savepoint, a failed SaveChanges() can leave the transaction in a bad or uncertain state for continuing.
```

---

### CTXDB02-S022 / S-030 - `be34ea62c8`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Always flow and use case

#### Visible text

```text
Flow:
1. No user transaction exists.
2. Even though this is just one INSERT, EF explicitly begins a transaction.
3. EF executes the insert.
4. EF commits the transaction.

When can Always be helpful?

A real reason is when your team wants predictable, explicit transaction boundaries for every save, even tiny ones, for logging/interception/observability or to normalize behavior across patterns where some saves are one statement and others are several. It is usually not needed, but it can make behavior more uniform. The trade-off is overhead.
```

---

### CTXDB02-S023 / S-033 - `43d314f73d`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: AutoTransactionBehavior Never warning

#### Visible text

```text
Never

With Never, EF never creates a transaction automatically. The docs say to use this with caution because the database could be left inconsistent if a failure occurs.
```

---

### CTXDB02-S024 / S-035 - `c6542a3688`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Never example

#### Visible text

```text
Example:

Flow:
1. No user transaction exists.
2. EF will not create one.
3. The save runs without EF-managed transaction creation.
```

#### Visible code

```csharp
db.Database.AutoTransactionBehavior = AutoTransactionBehavior.Never;

db.TelemetryPings.Add(new TelemetryPing
{
    Name = "worker-heartbeat",
    CreatedUtc = DateTime.UtcNow
});

await db.SaveChangesAsync();
```

---

### CTXDB02-S025 / S-039 - `02b511c630`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Refined summary: disabling automatic savepoints

#### Visible text

```text
So your summary is valid in this refined form:
- If you have a large transaction with many SaveChanges() calls and you know that any failure means rollback the whole transaction, then disabling automatic savepoints can make sense. But EF warns to do this cautiously, because after a failed SaveChanges() the transaction may be left in a corrupted or unknown state, so the normal response is to roll back the whole transaction.
- If your business checkpoint is not “before each SaveChanges()”, then explicit savepoints can be better. For example, you may process a large import, then create one explicit savepoint after the import phase, and then run a smaller optional enrichment phase that you may want to roll back without losing the import.
```

---

### CTXDB02-S026 / S-041 - `6baa058c54`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB02A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: When Never can make practical sense

#### Visible text

```text
When can Never make practical sense?

Only in specialized contexts, for example an append-only telemetry/audit context where each save is intentionally a single-row write and you accept the risk trade-off to avoid EF transaction creation. It can also make sense if you have a very controlled architecture where all business-critical multi-step operations are wrapped in explicit transactions elsewhere, and this context is used only for simple writes. But it is a niche setting, and it is unsafe as a general default because a future change can turn a once-simple save into a multi-statement save. That is exactly why the docs warn about inconsistency risk.

My rule of thumb:
- WhenNeeded: normal application default.
- Always: rare; use only when you want every save to have explicit transaction boundaries.
- Never: very rare; use only for specialized contexts where you fully understand the risk.
```

---

### CTXDB02-S027 / S-043 - `b9ee766727`

Metadata:
- status: `verified-visible-partial-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `bottom-continues-into-S047`
- confidence: `high-for-visible-part`
- theme: Explicit savepoint business phase pattern start

#### Visible text

```text
A practical pattern begins by disabling automatic savepoints and starting a transaction.
```

#### Visible code

```csharp
db.Database.AutoSavepointsEnabled = false;

await using var tx = await db.Database.BeginTransactionAsync();
```

---

### CTXDB02-S028 / S-047 - `463b614f06`

Metadata:
- status: `verified-visible-partial-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `continues-into-S052`
- confidence: `high-for-visible-part`
- theme: Explicit business phase savepoint pattern middle

#### Visible text

```text
Continuation of practical pattern: phase 1 critical bulk import, then create one explicit savepoint after the import phase, then phase 2 optional enrichment.
```

#### Visible code

```csharp
// Phase 1: critical bulk import
foreach (var chunk in chunks)
{
    db.Products.AddRange(chunk);
    await db.SaveChangesAsync();
}

// We only want one checkpoint here, not before every chunk
await tx.CreateSavepointAsync("after-import");

try
{
    // Phase 2: optional enrichment
    db.ProductTags.AddRange(generatedTags);
    await db.SaveChangesAsync();

    await tx.CommitAsync();
```

---

### CTXDB02-S029 / S-052 - `0ced7794a9`

Metadata:
- status: `verified-visible-partial-from-source-image`
- subregion: `CTXDB02B`
- readability: `high`
- cut off: `top-continues-from-S047`
- confidence: `high-for-visible-part`
- theme: Explicit business phase savepoint pattern end

#### Visible text

```text
End of practical pattern: rollback to the business-phase savepoint, continue with import-only result or fallback records, then commit. The source concludes that explicit savepoints are more meaningful when the savepoint matches a business phase boundary, not merely a SaveChanges() boundary.
```

#### Visible code

```csharp
}
catch
{
    await tx.RollbackToSavepointAsync("after-import");

    // continue with import-only result, or write fallback records
    await tx.CommitAsync();
}
```

---

## 3. Cleaned source notes

- SaveChanges is an atomic save unit, but EF may or may not create its own explicit transaction depending on AutoTransactionBehavior.
- WhenNeeded is the normal default and avoids extra explicit transaction round trips for single-statement saves.
- Always gives predictable explicit transaction boundaries for every save at the cost of overhead.
- Never is risky and should only be used in specialized contexts where failed multi-statement saves cannot happen or are externally controlled.
- CurrentTransaction allows reusable service methods to join an existing transaction or start/commit/rollback their own.
- AutoSavepointsEnabled creates per-SaveChanges recovery points inside a manually started transaction.
- Manual savepoints are better when business phase boundaries are not the same as every SaveChanges call.

---

## 4. Question hooks

- What does this API check or change?
- When is it safe to use this API in production?
- What does it not guarantee?
- What would be the failure mode if this is misused?
- What is the difference between SaveChanges atomicity and EF starting an explicit transaction?
- When do automatic savepoints help?
- When should explicit business-phase savepoints be preferred?
