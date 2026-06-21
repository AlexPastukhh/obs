# CTXDB06 - DbConnection / OpenConnection / SetDbConnection / timeout / provider helpers

Conspect: `ef-core-context-database-transaction-object-savechanges-dbconnection-dbtransaction`<br>
File type: **source-preserving large region transcript**  
Stage: **5 / NEXT04 verified transcript v001**  
Generated: 2026-06-02 11:35:23 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- GetDbConnection returns the underlying ADO.NET connection object; it does not guarantee that the connection is open.
- OpenConnection/OpenConnectionAsync make the open scope explicit for manual ADO.NET plus EF work.
- If EF created the connection from a connection string, do not dispose it yourself; if you supplied the connection, you own disposal.
- Connection strings should be changed before database work starts and treated as sensitive configuration.
- Sharing one local transaction requires the same connection and same DbTransaction.
- Command timeout should be raised only for operations that truly need it.
- System.Transactions enlistment is for ambient transaction scenarios; normal EF code usually uses BeginTransaction.
- Provider helpers are useful for provider-specific branches but should not be overused.
- GenerateCreateScript generates schema SQL for inspection/export; it does not apply the schema.

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
S-074, S-082, S-091, S-092, S-093, S-100, S-101, S-104, S-106, S-110, S-113, S-114, S-116, S-126, S-140, S-144, S-148, S-151, S-152, S-154, S-155, S-157, S-159, S-160, S-163, S-169, S-176, S-178, S-182, S-185, S-189, S-191
```

Boundary decision:
```text
CTXDB06 covers DatabaseFacade connection access/lifetime APIs, connection strings, SetDbConnection, timeouts, ambient transaction enlistment, provider helpers, and GenerateCreateScript.
It does not cover the manual multiple-DbContext options patterns; those are CTXDB07.
```

Pending after this region:
```text
none in this conspect; next step is final closure/audit
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CTXDB06A-S001 | S-074 | IU-074 | `bc88d8c442` | CTXDB06A | `verified-visible-partial-from-source-image` | bottom crop | EnsureCreated / EnsureDeleted quick schema APIs |
| CTXDB06A-S002 | S-082 | IU-082 | `d2e78b86e5` | CTXDB06A | `verified-from-source-image` | no | EnsureCreated caution versus migrations |
| CTXDB06A-S003 | S-091 | IU-091 | `c3f8ff9082` | CTXDB06A | `verified-visible-partial-from-source-image` | bottom crop | GetDbConnection returns underlying DbConnection |
| CTXDB06A-S004 | S-092 | IU-092 | `e8ae905fc4` | CTXDB06A | `verified-from-source-image` | no | OpenConnection paired with GetDbConnection |
| CTXDB06A-S005 | S-093 | IU-093 | `90eb2b991f` | CTXDB06A | `verified-from-source-image` | no | Closed connection object while context is alive |
| CTXDB06A-S006 | S-100 | IU-100 | `b157b21508` | CTXDB06A | `verified-visible-partial-from-source-image` | bottom continues | Valid object but closed state later |
| CTXDB06A-S007 | S-101 | IU-101 | `146aec379d` | CTXDB06A | `verified-from-source-image` | no | Connection disposal ownership |
| CTXDB06A-S008 | S-104 | IU-104 | `6a4b0521e9` | CTXDB06A | `verified-visible-partial-from-source-image` | bottom visible | Safer pattern with GetDbConnection and OpenConnection |
| CTXDB06A-S009 | S-106 | IU-106 | `f049355306` | CTXDB06A | `verified-visible-partial-from-source-image` | top/bottom continuation | Manual ADO.NET after EF operation may need explicit open |
| CTXDB06A-S010 | S-110 | IU-110 | `ffd943be33` | CTXDB06A | `verified-from-source-image` | no | OpenConnection / OpenConnectionAsync |
| CTXDB06A-S011 | S-113 | IU-113 | `6c59a8dfba` | CTXDB06A | `verified-visible-partial-from-source-image` | top continuation | GetDbConnection takeaway |
| CTXDB06A-S012 | S-114 | IU-114 | `333fb735a6` | CTXDB06A | `verified-visible-partial-from-source-image` | top continuation | CloseConnection safer pattern |
| CTXDB06A-S013 | S-116 | IU-116 | `3f576096f7` | CTXDB06A | `verified-visible-partial-from-source-image` | bottom crop | Manual open connection example |
| CTXDB06A-S014 | S-126 | IU-126 | `1b3829f041` | CTXDB06A | `verified-visible-partial-from-source-image` | top continuation | Manual open/close caution |
| CTXDB06A-S015 | S-140 | IU-140 | `b501185d7e` | CTXDB06A | `verified-visible-partial-from-source-image` | bottom crop | GetConnectionString / SetConnectionString |
| CTXDB06A-S016 | S-144 | IU-144 | `9f449a4c24` | CTXDB06A | `verified-visible-partial-from-source-image` | top continuation | SetConnectionString before database work |
| CTXDB06A-S017 | S-148 | IU-148 | `a98a4b08dc` | CTXDB06A | `verified-from-source-image` | no | Why use one connection for multiple operations |
| CTXDB06A-S018 | S-151 | IU-151 | `086a4b5542` | CTXDB06A | `verified-from-source-image` | no | Same transaction is subset of one connection |
| CTXDB06A-S019 | S-152 | IU-152 | `dbc42432e5` | CTXDB06A | `verified-from-source-image` | no | Same transaction between EF and manual ADO.NET |
| CTXDB06A-S020 | S-154 | IU-154 | `2590739a98` | CTXDB06A | `verified-from-source-image` | no | Explicit SqlConnection and contextOwnsConnection false |
| CTXDB06A-S021 | S-155 | IU-155 | `2faed444c0` | CTXDB06A | `verified-visible-partial-from-source-image` | bottom crop | SetDbConnection |
| CTXDB06A-S022 | S-157 | IU-157 | `29dfa26ee9` | CTXDB06A | `verified-from-source-image` | no | Connection/session-level state sharing |
| CTXDB06A-S023 | S-159 | IU-159 | `83581480f8` | CTXDB06A | `verified-from-source-image` | no | Avoid open/close churn |
| CTXDB06A-S024 | S-160 | IU-160 | `25af95ba7d` | CTXDB06A | `verified-visible-partial-from-source-image` | top continuation | Own connection lifetime when supplying connection object |
| CTXDB06B-S001 | S-163 | IU-163 | `5291502f68` | CTXDB06B | `verified-visible-partial-from-source-image` | bottom crop | GetCommandTimeout / SetCommandTimeout |
| CTXDB06B-S002 | S-169 | IU-169 | `27bc1442bd` | CTXDB06B | `verified-from-source-image` | no | Command timeout caution |
| CTXDB06B-S003 | S-176 | IU-176 | `8e2d0524db` | CTXDB06B | `verified-visible-partial-from-source-image` | bottom crop | EnlistTransaction / GetEnlistedTransaction |
| CTXDB06B-S004 | S-178 | IU-178 | `1e971378bc` | CTXDB06B | `verified-from-source-image` | no | System.Transactions caution |
| CTXDB06B-S005 | S-182 | IU-182 | `e42350e029` | CTXDB06B | `verified-visible-partial-from-source-image` | bottom crop | Provider check helpers |
| CTXDB06B-S006 | S-185 | IU-185 | `0ed0c9eeca` | CTXDB06B | `verified-visible-partial-from-source-image` | top continuation | Provider helper caution |
| CTXDB06B-S007 | S-189 | IU-189 | `3e2b73547a` | CTXDB06B | `verified-from-source-image` | no | GenerateCreateScript |
| CTXDB06B-S008 | S-191 | IU-191 | `f66773d49e` | CTXDB06B | `verified-from-source-image` | no | GenerateCreateScript usage |

---

## 2. Verified source transcript

## 2.1 CTXDB06A - Connection lifecycle / core API

### CTXDB06A-S001 / S-074 - `bc88d8c442`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-part`
- theme: EnsureCreated / EnsureDeleted quick schema APIs

#### Visible text

```text
EnsureCreated() / EnsureDeleted()

What they do:
- EnsureCreated() creates the database and schema directly from the current model.
- EnsureDeleted() deletes the database.

These are schema-creation APIs surfaced from DatabaseFacade.

When to use them:
Use EnsureCreated for quick prototypes, tests, temporary databases, or providers/scenarios where migrations are not your strategy.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

// test setup
await db.Database.EnsureDeletedAsync();
await db.Database.EnsureCreatedAsync();
```

---

### CTXDB06A-S002 / S-082 - `d2e78b86e5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EnsureCreated caution versus migrations

#### Visible text

```text
Usage guide / caution

Do not use EnsureCreated as the normal path for a database you also want to evolve with migrations later. Migrate and migrations are the normal versioned schema strategy. EnsureCreated bypasses that workflow. Migrate is specifically the API that applies migrations.

A good simple rule:
- real app schema evolution -> migrations + Migrate
- throwaway/test db -> EnsureCreated / EnsureDeleted
```

---

### CTXDB06A-S003 / S-091 - `c3f8ff9082`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-part`
- theme: GetDbConnection returns underlying DbConnection

#### Visible text

```text
3. Connection access methods

GetDbConnection()

What it does:
Returns the underlying ADO.NET DbConnection.

Example prints the connection string and current connection state.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

var conn = db.Database.GetDbConnection();
Console.WriteLine(conn.ConnectionString);
Console.WriteLine(conn.State);
```

---

### CTXDB06A-S004 / S-092 - `e8ae905fc4`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: OpenConnection paired with GetDbConnection

#### Visible text

```text
Why OpenConnection() is often paired with it

If you only call GetDbConnection() and do not explicitly open it, then connection state depends on current usage flow. EF normally opens/closes connections around operations as needed; manually opening is how you make the scope explicit and stable for a sequence of manual + EF operations. The existing-connection docs say if the connection is open, EF will not open/close it; if it is closed, EF will open/close it as needed.

Good mental model:
- GetDbConnection() = “give me the actual connection object”
- OpenConnection() = “keep that connection open for this scope”
```

---

### CTXDB06A-S005 / S-093 - `90eb2b991f`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Closed connection object while context is alive

#### Visible text

```text
Can I end up with a closed connection object later in the same method even if the context is still alive?

Yes.

That is a real possibility when EF owns the connection or when you passed a closed connection and let EF manage open/close as needed. Microsoft explicitly says for an existing DbConnection:
- if it is open, EF will not open/close it
- if it is closed, EF will open/close it as needed

So this can happen in one method.
```

---

### CTXDB06A-S006 / S-100 - `b157b21508`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continues`
- confidence: `high-for-visible-code`
- theme: Valid object but closed state later

#### Visible text

```text
Example: valid object, closed state later.

You can get the connection object from the context, but after an EF operation finishes, the same connection object may be closed again because EF may open/close it around operations.
```

#### Visible code

```csharp
await using var context = new AppDbContext(options);

// Get the connection object
var conn = context.Database.GetDbConnection();

// At this moment it may be Closed
Console.WriteLine(conn.State); // likely Closed
```

---

### CTXDB06A-S007 / S-101 - `146aec379d`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Connection disposal ownership

#### Visible text

```text
Usage guide / caution

Microsoft explicitly warns:
- if EF created the connection from a connection string, do not dispose it yourself
- if you passed your own DbConnection into EF, you are responsible for disposing it

So this is correct: use the connection object, but do not dispose it when EF created it.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

var conn = db.Database.GetDbConnection();
// use it, but do not dispose if EF created it
```

---

### CTXDB06A-S008 / S-104 - `6a4b0521e9`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom visible`
- confidence: `high-for-visible-code`
- theme: Safer pattern with GetDbConnection and OpenConnection

#### Visible text

```text
Safer pattern with GetDbConnection()

If you want a manual-work guide, the safer pattern is: manually open the context connection, get the connection object, run ADO.NET work and EF work on the same open connection, then close it in finally.
```

#### Visible code

```csharp
await using var context = new AppDbContext(options);

await context.Database.OpenConnectionAsync();
try
{
    var conn = context.Database.GetDbConnection();

    // connection stays open for this scope
    await using var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT COUNT(*) FROM Posts";
    var count = await cmd.ExecuteScalarAsync();

    // EF work on the same open connection
    var posts = await context.Posts.ToListAsync();
}
finally
{
    await context.Database.CloseConnectionAsync();
}
```

---

### CTXDB06A-S009 / S-106 - `f049355306`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top/bottom continuation`
- confidence: `high-for-visible-code`
- theme: Manual ADO.NET after EF operation may need explicit open

#### Visible text

```text
Continuation of a closed-state example.

After EF does one operation, the same connection object reference may be closed again because EF may have closed it after finishing the operation. Manual ADO.NET now may fail unless you open the connection yourself.
```

#### Visible code

```csharp
// EF does one operation; if conn is closed, EF opens/closes it as needed
var count = await context.Posts.CountAsync();

// Same object reference, but it may be closed again here,
// because EF may have closed it after finishing the operation.
Console.WriteLine(conn.State); // may be Closed

// Manual ADO.NET now may fail unless you open it yourself
await conn.OpenAsync();
try
{
    await using var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT COUNT(*) FROM Posts";
    var result = await cmd.ExecuteScalarAsync();
}
```

---

### CTXDB06A-S010 / S-110 - `ffd943be33`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: OpenConnection / OpenConnectionAsync

#### Visible text

```text
OpenConnection() / OpenConnectionAsync()

What they do:
Open the underlying database connection manually. These methods are listed on DatabaseFacade.

When to use them:
Use them when you need the connection to stay open across several operations, or when you want to do low-level ADO.NET work on the same connection.
```

---

### CTXDB06A-S011 / S-113 - `6c59a8dfba`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-text`
- theme: GetDbConnection takeaway

#### Visible text

```text
Continuation of manual ADO.NET example: after the manual work, the connection is closed in finally.

Practical takeaway:
GetDbConnection() gives you the object, not a guarantee that it will stay open.
```

#### Visible code

```csharp
finally
{
    await conn.CloseAsync();
}
```

---

### CTXDB06A-S012 / S-114 - `333fb735a6`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-text`
- theme: CloseConnection safer pattern

#### Visible text

```text
Continuation of safer OpenConnection pattern: CloseConnectionAsync is called in finally.

Why this is safer:
- you control the open/close scope explicitly
- you do not depend on EF's “open/close as needed” behavior for that scope
```

#### Visible code

```csharp
finally
{
    await context.Database.CloseConnectionAsync();
}
```

---

### CTXDB06A-S013 / S-116 - `3f576096f7`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-code`
- theme: Manual open connection example

#### Visible text

```text
Example: manually open the connection, get the DbConnection, create a command, execute SELECT 1, then close the connection in finally.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

await db.Database.OpenConnectionAsync();
try
{
    var conn = db.Database.GetDbConnection();
    await using var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT 1";

    var result = await cmd.ExecuteScalarAsync();
    Console.WriteLine(result);
}
finally
{
    await db.Database.CloseConnectionAsync();
}
```

---

### CTXDB06A-S014 / S-126 - `1b3829f041`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-text`
- theme: Manual open/close caution

#### Visible text

```text
Usage guide / caution

This is exactly the kind of place where your caution matters:
- if you manually open the connection, then close it when done
- the safest pattern is try/finally around OpenConnectionAsync()

Without manual open, EF normally opens/closes connections as needed around operations.
```

---

### CTXDB06A-S015 / S-140 - `b501185d7e`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-part`
- theme: GetConnectionString / SetConnectionString

#### Visible text

```text
GetConnectionString() / SetConnectionString()

What they do:
Read or change the currently configured connection string. They are listed on DatabaseFacade.

Example begins by reading and printing the old connection string.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

var oldCs = db.Database.GetConnectionString();
Console.WriteLine(oldCs);
```

---

### CTXDB06A-S016 / S-144 - `9f449a4c24`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-part`
- theme: SetConnectionString before database work

#### Visible text

```text
Usage guide / caution

Change the connection string before you start doing database operations. Treat connection strings as sensitive configuration. Microsoft connection string docs explicitly note that connection strings can contain sensitive information.
```

#### Visible code

```csharp
// switch before doing any DB work
db.Database.SetConnectionString(
    "Server=.;Database=AppDb_Test;Trusted_Connection=True;TrustServerCertificate=True");
```

---

### CTXDB06A-S017 / S-148 - `a98a4b08dc`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why use one connection for multiple operations

#### Visible text

```text
Why we may decide to use one connection for multiple operations

Main reasons:

A. To keep everything in one local transaction

A local relational transaction belongs to one connection. If you want to read something, insert/update something, maybe run manual ADO.NET SQL, and then commit or roll back all of it together, then using one connection is the natural model. EF Core's transaction docs show sharing both connection and transaction across operations and even across multiple contexts.
```

---

### CTXDB06A-S018 / S-151 - `086a4b5542`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Same transaction is subset of one connection

#### Visible text

```text
So B is basically a subset of A.
```

---

### CTXDB06A-S019 / S-152 - `dbc42432e5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Same transaction between EF and manual ADO.NET

#### Visible text

```text
B. To share the same transaction between EF and manual ADO.NET

A very common case is:
- open one connection
- start one transaction
- run a manual DbCommand
- run SaveChanges
- commit once

That only works as one local transaction because the manual command and EF are using the same connection and the same DbTransaction.
```

---

### CTXDB06A-S020 / S-154 - `2590739a98`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Explicit SqlConnection and contextOwnsConnection false

#### Visible text

```text
You explicitly create a SqlConnection and build DbContextOptions from that connection. With contextOwnsConnection: false, EF uses your connection object and does not own disposal.
```

#### Visible code

```csharp
var conn = new SqlConnection(connectionString);

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlServer(conn, contextOwnsConnection: false)
    .Options;
```

---

### CTXDB06A-S021 / S-155 - `2faed444c0`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-code`
- theme: SetDbConnection

#### Visible text

```text
SetDbConnection()

What it does:
Replaces the underlying ADO.NET connection for the context. It is listed on DatabaseFacade.

Example: create a SqlConnection, build options, create a context, and set/replace the connection.
```

#### Visible code

```csharp
var sqlConnection = new Microsoft.Data.SqlClient.SqlConnection(
    "Server=.;Database=AppDb;Trusted_Connection=True;TrustServerCertificate=True");

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlServer(sqlConnection)
    .Options;

await using var db = new AppDbContext(options);
```

---

### CTXDB06A-S022 / S-157 - `29dfa26ee9`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Connection/session-level state sharing

#### Visible text

```text
C. To share connection/session-level state

Sometimes work depends on connection/session state, for example:
- one explicit transaction already started
- temp objects or connection-level settings created earlier
- wanting one continuous open connection scope for manual and EF operations

That is one reason EF exposes patterns for sharing an existing connection and transaction.
```

---

### CTXDB06A-S023 / S-159 - `83581480f8`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Avoid open/close churn

#### Visible text

```text
D. To avoid open/close churn in a controlled scope

This is usually a smaller reason, but sometimes you want one explicit open connection around a small unit of work instead of letting EF open and close it around each operation. EF6 docs state that BeginTransaction opens the connection if needed, and the same general relational pattern explains why people sometimes hold a connection open for a defined scope.
```

---

### CTXDB06A-S024 / S-160 - `25af95ba7d`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-code`
- theme: Own connection lifetime when supplying connection object

#### Visible text

```text
When you supply the connection object, you own its lifetime and should dispose it. The example opens the connection through EF and later closes it through DatabaseFacade.
```

#### Visible code

```csharp
// EF uses your connection
await db.Database.OpenConnectionAsync();
try
{
    Console.WriteLine(db.Database.GetDbConnection().State);
}
finally
{
    await db.Database.CloseConnectionAsync();
}
```

---

## 2.2 CTXDB06B - Special helpers / manual context patterns

### CTXDB06B-S001 / S-163 - `5291502f68`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-code`
- theme: GetCommandTimeout / SetCommandTimeout

#### Visible text

```text
Command timeout methods

GetCommandTimeout() / SetCommandTimeout(...)

What they do:
Get or set the timeout used for commands executed by the context. These methods are listed on DatabaseFacade.

Example sets timeout to 60 seconds, reads it back, then runs a query.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

db.Database.SetCommandTimeout(TimeSpan.FromSeconds(60));

var timeout = db.Database.GetCommandTimeout();
Console.WriteLine($"Timeout: {timeout}");

var posts = await db.Posts.ToListAsync();
```

---

### CTXDB06B-S002 / S-169 - `27bc1442bd`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Command timeout caution

#### Visible text

```text
Usage guide / caution

Set a higher timeout only for operations that truly need it. A long timeout can hide slow queries that should really be optimized.
```

---

### CTXDB06B-S003 / S-176 - `8e2d0524db`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-code`
- theme: EnlistTransaction / GetEnlistedTransaction

#### Visible text

```text
EnlistTransaction(...) / GetEnlistedTransaction()

What they do:
These are for System.Transactions.Transaction integration. Microsoft documents EnlistTransaction as specifying an existing ambient/system transaction to be used for database operations, and GetEnlistedTransaction returns the currently enlisted one.
```

#### Visible code

```csharp
using var scope = new System.Transactions.TransactionScope(
    System.Transactions.TransactionScopeAsyncFlowOption.Enabled);

await using var db = new AppDbContext(options);

db.Database.EnlistTransaction(System.Transactions.Transaction.Current);

db.Posts.Add(new Post { Title = "Ambient transaction" });
await db.SaveChangesAsync();

var enlisted = db.Database.GetEnlistedTransaction();
Console.WriteLine(enlisted != null);
```

---

### CTXDB06B-S004 / S-178 - `1e971378bc`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: System.Transactions caution

#### Visible text

```text
Usage guide / caution

Use this only when you intentionally work with System.Transactions. For normal EF Core app code, BeginTransaction is usually simpler.
```

---

### CTXDB06B-S005 / S-182 - `e42350e029`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom crop`
- confidence: `high-for-visible-code`
- theme: Provider check helpers

#### Visible text

```text
IsRelational() / IsSqlServer() / IsSqlite()

What they do:
Provider-check helpers that tell you which provider family is in use. They are exposed as extension methods on DatabaseFacade.

Example branches by provider.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

if (db.Database.IsSqlServer())
{
    Console.WriteLine("Running SQL Server-specific setup.");
}
else if (db.Database.IsSqlite())
{
    Console.WriteLine("Running SQLite-specific setup.");
}
```

---

### CTXDB06B-S006 / S-185 - `0ed0c9eeca`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top continuation`
- confidence: `high-for-visible-code`
- theme: Provider helper caution

#### Visible text

```text
Usage guide / caution

These are useful when you need provider-specific SQL or configuration. Try not to overuse them; too many provider branches can make the app harder to maintain.
```

#### Visible code

```csharp
if (db.Database.IsRelational())
{
    Console.WriteLine("This is a relational provider.");
}
```

---

### CTXDB06B-S007 / S-189 - `3e2b73547a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: GenerateCreateScript

#### Visible text

```text
GenerateCreateScript()

What it does:
Generates the SQL script that would create the schema for the current model. It is listed on the relational DatabaseFacade extensions.
```

---

### CTXDB06B-S008 / S-191 - `f66773d49e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: GenerateCreateScript usage

#### Visible text

```text
Example: generate schema SQL, write it to a file, and print a message.

Usage guide / caution:
This is for inspection/export/generation. It does not itself apply the schema. Good for learning, debugging, or producing a quick schema script for review.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

var sql = db.Database.GenerateCreateScript();

await File.WriteAllTextAsync("create-schema.sql", sql);
Console.WriteLine("Schema script generated.");
```

---

## 3. Cleaned source notes

- GetDbConnection returns the connection object, not a stable-open guarantee.
- Use OpenConnection/OpenConnectionAsync when a manual ADO.NET + EF sequence needs the same open connection scope.
- Do not dispose an EF-created connection yourself; if you pass your own DbConnection, you own disposal.
- SetConnectionString should happen before database operations; connection strings are sensitive config.
- SetDbConnection/externally supplied connection patterns are useful for sharing one local transaction/session.
- SetCommandTimeout should not be used to hide slow queries.
- EnlistTransaction/GetEnlistedTransaction are for System.Transactions scenarios, not normal EF local transaction code.
- Provider helpers and GenerateCreateScript are relational helper APIs; use provider branching sparingly.

---

## 4. Question hooks

- What does GetDbConnection guarantee and not guarantee?
- When should OpenConnectionAsync be paired with GetDbConnection?
- Who disposes the connection?
- When is SetConnectionString safe?
- Why does one local transaction imply one connection?
- When should command timeout be raised?
- When are System.Transactions enlistment APIs appropriate?
- What does GenerateCreateScript do and not do?
