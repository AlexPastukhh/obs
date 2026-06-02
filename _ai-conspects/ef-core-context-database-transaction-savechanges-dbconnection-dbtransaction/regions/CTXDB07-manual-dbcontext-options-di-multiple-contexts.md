# CTXDB07 - Manual DbContext creation / options / DI / multiple contexts

Conspect: `ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction`  
File type: **source-preserving large region transcript**  
Stage: **5 / NEXT04 verified transcript v001**  
Generated: 2026-06-02 11:35:23 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- UseTransaction works only when the context uses the same connection that owns the transaction.
- Same DbContext instance only needs BeginTransaction, but multiple DbContext instances must share connection and transaction.
- Different databases cannot share one local DbTransaction.
- DbContext classes should accept DbContextOptions<TContext> to allow externally built options.
- Default DI AddDbContext is fine for normal use but does not automatically make two contexts share one connection/transaction.
- For multiple contexts in one local transaction, manually build options around one shared DbConnection, start one transaction, and attach the other contexts with UseTransaction.

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
S-186, S-187, S-188, S-190, S-192, S-193, S-194, S-195, S-196, S-197, S-198
```

Boundary decision:
```text
CTXDB07 covers manual DbContext construction/options/DI and multiple context instances/classes sharing one connection and one transaction.
It closes the last transcript region from Stage1.
```

Pending after this region:
```text
none in this conspect; next step is final closure/audit
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CTXDB07A-S001 | S-186 | IU-186 | `58660c904f` | CTXDB07A | `verified-from-source-image` | no | What happens in shared connection / UseTransaction setup |
| CTXDB07B-S001 | S-187 | IU-187 | `84e8af0629` | CTXDB07B | `verified-visible-partial-from-source-image` | top continuation | UseTransaction existing ADO.NET transaction continuation |
| CTXDB07A-S002 | S-188 | IU-188 | `7cd52f3a1a` | CTXDB07A | `verified-from-source-image` | no | Different connection with UseTransaction is invalid |
| CTXDB07B-S002 | S-190 | IU-190 | `7eb73976ad` | CTXDB07B | `verified-from-source-image` | no | What is shared in one connection/transaction setup |
| CTXDB07A-S003 | S-192 | IU-192 | `c396e2a6d4` | CTXDB07A | `verified-visible-partial-from-source-image` | bottom crop | Summary of shared transaction mental model |
| CTXDB07B-S003 | S-193 | IU-193 | `00d43687f0` | CTXDB07B | `verified-from-source-image` | no | Normal dependency injection setup |
| CTXDB07B-S004 | S-194 | IU-194 | `0c9d2bb402` | CTXDB07B | `verified-from-source-image` | no | DbContext lifetime and options constructor |
| CTXDB07A-S004 | S-195 | IU-195 | `f4d4168e3f` | CTXDB07A | `verified-visible-partial-from-source-image` | bottom continues | Multiple context types with shared connection and transaction |
| CTXDB07B-S005 | S-196 | IU-196 | `9c09af292e` | CTXDB07B | `verified-from-source-image` | no | DI contexts may not share same connection |
| CTXDB07A-S005 | S-197 | IU-197 | `fb3512089c` | CTXDB07A | `verified-visible-partial-from-source-image` | top continuation | Multiple context types transaction continuation |
| CTXDB07B-S006 | S-198 | IU-198 | `dd6709ae56` | CTXDB07B | `verified-from-source-image` | no | Use same connection object in options |

---

## 2. Verified source transcript

## 2.1 CTXDB07A - Connection lifecycle / core API

### CTXDB07A-S001 / S-186 - `58660c904f`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: What happens in shared connection / UseTransaction setup

#### Visible text

```text
What is happening?

- context1 starts a transaction on conn.
- context2 uses the same connection object.
- UseTransaction(tx.GetDbTransaction()) makes context2 participate in the same transaction. EF Core docs explicitly describe “share connection and transaction” this way.

Important caution:
If context2 uses a different connection, this pattern is wrong, because the DbTransaction is associated with the original connection.
```

---

## 2.2 CTXDB07B - Special helpers / manual context patterns

### CTXDB07B-S001 / S-187 - `84e8af0629`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-code`
- theme: UseTransaction existing ADO.NET transaction continuation

#### Visible text

```text
Continuation of an existing ADO.NET transaction example: sharing starts for EF when context.Database.UseTransactionAsync(tx) is called; then EF inserts and saves inside the existing ADO.NET transaction; commit or rollback is done on the original transaction.
```

#### Visible code

```csharp
// Sharing starts here for EF:
await context.Database.UseTransactionAsync(tx);

context.Posts.Add(new Post { Title = "Inserted inside existing ADO.NET tx" });
await context.SaveChangesAsync();

await tx.CommitAsync();
}
catch
{
    await tx.RollbackAsync();
    throw;
}
```

---

## 2.1 CTXDB07A - Connection lifecycle / core API

### CTXDB07A-S002 / S-188 - `7cd52f3a1a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Different connection with UseTransaction is invalid

#### Visible text

```text
What happens if you still try it?

You should expect UseTransaction to fail when the context is using a different connection than the transaction belongs to. EF Core's official guidance requires the same connection for sharing, and EF6 docs explicitly note that UseTransaction() throws in invalid states.

I would phrase it like this:

Transaction from another connection + UseTransaction on this context = invalid combination, expect an exception.

Avoid promising the exact exception type/message unless you test your exact provider/version.
```

---

## 2.2 CTXDB07B - Special helpers / manual context patterns

### CTXDB07B-S002 / S-190 - `7eb73976ad`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: What is shared in one connection/transaction setup

#### Visible text

```text
What is shared here?
- same connection: conn
- same transaction: tx

What is not happening?
No second connection is involved, and no “transaction across many connections” is being created here. tx belongs to conn.
```

---

## 2.1 CTXDB07A - Connection lifecycle / core API

### CTXDB07A-S003 / S-192 - `c396e2a6d4`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-text`
- theme: Summary of shared transaction mental model

#### Visible text

```text
Summary

Your mental model should be:

Same DbContext instance:
  BeginTransaction is enough.

Multiple DbContext instances:
  They must share the same DbConnection.
  One starts the transaction.
  Others call UseTransaction.

Multiple different DbContext classes:
  Same rule.
  They must use the same DbConnection and same DbTransaction.

Different databases:
  You cannot use a single local DbTransaction.
  Use TransactionScope/distributed transaction, or redesign with outbox/saga/eventual consistency.
```

---

## 2.2 CTXDB07B - Special helpers / manual context patterns

### CTXDB07B-S003 / S-193 - `00d43687f0`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Normal dependency injection setup

#### Visible text

```text
What about dependency injection?

In normal ASP.NET Core apps, you usually register contexts with AddDbContext using a connection string. That is fine for normal use.
```

#### Visible code

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});
```

---

### CTXDB07B-S004 / S-194 - `0c9d2bb402`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DbContext lifetime and options constructor

#### Visible text

```text
Important: DbContext lifetime and connection ownership

For transaction sharing to work cleanly, your contexts need to accept externally built options.

That lets you pass the shared connection through DbContextOptions. This is exactly the approach EF Core recommends for allowing the connection to be externally provided.
```

#### Visible code

```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
```

---

## 2.1 CTXDB07A - Connection lifecycle / core API

### CTXDB07A-S004 / S-195 - `f4d4168e3f`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continues`
- confidence: `high-for-visible-code`
- theme: Multiple context types with shared connection and transaction

#### Visible text

```text
With error handling: create one SqlConnection, open it, build DbContextOptions for ContextA and ContextB using the same connection, start a transaction from contextA, and then have contextB use the same transaction.
```

#### Visible code

```csharp
await using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();

var optionsA = new DbContextOptionsBuilder<ContextA>()
    .UseSqlServer(connection)
    .Options;

var optionsB = new DbContextOptionsBuilder<ContextB>()
    .UseSqlServer(connection)
    .Options;

await using var contextA = new ContextA(optionsA);

await using var transaction = await contextA.Database.BeginTransactionAsync();
```

---

## 2.2 CTXDB07B - Special helpers / manual context patterns

### CTXDB07B-S005 / S-196 - `9c09af292e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DI contexts may not share same connection

#### Visible text

```text
But if you need one transaction across multiple context instances, you usually should not just resolve two contexts from DI and expect them to share a transaction.

This example resolves context1 and context2 from DI. It does not guarantee they share the same connection object.
```

#### Visible code

```csharp
var context1 = scope.ServiceProvider.GetRequiredService<AppDbContext>();
var context2 = scope.ServiceProvider.GetRequiredService<AppDbContext>();
```

---

## 2.1 CTXDB07A - Connection lifecycle / core API

### CTXDB07A-S005 / S-197 - `fb3512089c`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-code`
- theme: Multiple context types transaction continuation

#### Visible text

```text
Continuation of the multiple-context example: create contextB, attach it with UseTransactionAsync(transaction.GetDbTransaction()), save work in contextA and contextB, commit; on failure roll back.
```

#### Visible code

```csharp
try
{
    await using var contextB = new ContextB(optionsB);

    await contextB.Database.UseTransactionAsync(transaction.GetDbTransaction());

    contextA.EntitiesA.Add(new EntityA());
    await contextA.SaveChangesAsync();

    contextB.EntitiesB.Add(new EntityB());
    await contextB.SaveChangesAsync();

    await transaction.CommitAsync();
}
catch
{
    await transaction.RollbackAsync();
    throw;
}
```

---

## 2.2 CTXDB07B - Special helpers / manual context patterns

### CTXDB07B-S006 / S-198 - `dd6709ae56`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Use same connection object in options

#### Visible text

```text
You need this instead: build both contexts/options using the same SqlConnection object.

Same connection object.
```

#### Visible code

```csharp
var connection = new SqlConnection(connectionString);

var options1 = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlServer(connection)
    .Options;

var options2 = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlServer(connection)
    .Options;
```

---

## 3. Cleaned source notes

- Default DI-created contexts are fine for normal app use but do not automatically share a connection/transaction.
- To share a local transaction across contexts, build options around the same DbConnection.
- Each context class should accept DbContextOptions<TContext> so an external connection/options object can be provided.
- One context starts the transaction; other contexts call UseTransaction on the underlying DbTransaction.
- Using a transaction from another connection is an invalid combination.
- A single local transaction cannot cover different databases; use distributed transactions or redesign.

---

## 4. Question hooks

- Why do two DI-resolved contexts not automatically share a transaction?
- What must multiple contexts share to participate in one local transaction?
- Why must contexts accept externally built options?
- What does UseTransaction attach?
- Why is a transaction from another connection invalid?
- What is the correct pattern for multiple DbContext classes in one local transaction?
