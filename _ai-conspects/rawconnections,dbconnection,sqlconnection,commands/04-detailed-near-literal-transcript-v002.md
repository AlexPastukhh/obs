# Detailed near-literal transcript — rawconnections,dbconnection,sqlconnection,commands

Generated: 2026-06-29 06:06:52 UTC

## Transcript policy

This is a detailed, source-faithful semantic transcript built from all 36 screenshots and all 11 SVG text labels.

It stays close to the source wording, examples, code, distinctions, and ordering. It is not a short summary and it is not a mechanically repeated OCR dump.

Only genuinely repeated explanations are consolidated. Different examples, API choices, edge cases, transaction rules, provider caveats, and EF Core integration details remain separate.

No review questions are included.

## Source coverage

```text
SVG text labels: 11 / 11
embedded screenshots: 36 / 36
image uses: 36 / 36
existing logical regions: 3 / 3
remaining source units: 0
```

## 1. Provider-specific connections and the common ADO.NET abstraction

A provider-specific connection type such as:

- `SqlConnection`;
- `NpgsqlConnection`;
- `MySqlConnection`;
- `SqliteConnection`;

inherits from `DbConnection` and exposes the common ADO.NET connection API.

That common API is sufficient for the basic workflow:

1. create or obtain a connection;
2. open the connection;
3. create a command;
4. assign SQL text or a stored-procedure name;
5. create and add parameters;
6. execute;
7. read rows, read one scalar value, or obtain the affected-row count;
8. dispose the reader, command, transaction, and connection.

The connection itself does not directly execute SQL. The normal object family is:

- `DbConnection` or the provider-specific connection — manages the connection;
- `DbCommand` or the provider-specific command — executes SQL or stored procedures;
- `DbParameter` — represents a parameter;
- `DbDataReader` — reads returned rows;
- `DbTransaction` — groups operations into a transaction.

This family of base abstractions is what makes provider-agnostic ADO.NET code possible.

## 2. Is the DbConnection API enough?

For basic CRUD and query work, it usually is.

A connection can provide:

- `OpenAsync`;
- `CreateCommand`;
- `BeginTransaction` or `BeginTransactionAsync`;
- connection-state management;
- `Close` and disposal.

A command provides the main execution shapes:

- `ExecuteReader` / `ExecuteReaderAsync` for rows;
- `ExecuteScalar` / `ExecuteScalarAsync` for one value;
- `ExecuteNonQuery` / `ExecuteNonQueryAsync` for insert, update, delete, DDL, or any command where the important result is the affected-row count.

This is enough for a large amount of direct data-access code.

## 3. What is portable and what is provider-specific?

The ADO.NET **shape** is portable, but SQL text and database behavior are not fully portable.

### Usually portable

- opening a connection;
- creating a command;
- adding parameters through the command API;
- executing a reader;
- reading columns;
- executing scalar and non-query commands;
- beginning, committing, and rolling back transactions through the common API.

### Not necessarily portable

- exact SQL syntax;
- parameter placeholder conventions;
- connection-string format;
- table and identifier quoting;
- pagination syntax;
- string concatenation;
- date/time functions;
- identity or sequence retrieval;
- upsert syntax;
- boolean literals and comparisons;
- stored-procedure invocation behavior;
- provider-specific data types;
- special provider methods and features.

A piece of code can therefore use only `DbConnection`, `DbCommand`, `DbParameter`, and `DbDataReader` while still containing SQL that is tied to SQL Server, PostgreSQL, MySQL, SQLite, or another database.

### Parameter syntax differences

Providers may expect different placeholder forms.

Examples shown by the source include:

- SQL Server commonly using `@id`;
- some providers accepting `:id`;
- positional placeholders such as `?`.

Even when `DbCommand` is used, the command text may need to change.

### SQL dialect differences

Simple SQL such as basic `SELECT ... WHERE ...` is often portable in shape, but many features differ:

- pagination;
- concatenation;
- date/time functions;
- identity retrieval;
- upsert syntax;
- identifier quoting;
- stored-procedure calls;
- boolean syntax.

### Identifier quoting

Different databases may quote the same identifier differently:

```text
[Users]
"Users"
`Users`
```

### Stored procedures and special features

Provider-neutral ADO.NET does not make stored-procedure conventions or special database features portable.

The practical rule is:

```text
the ADO.NET workflow may remain generic;
the SQL and provider-specific details may still need an adapter or a separate implementation.
```

## 4. Provider-agnostic base-class example

A generic connection can be created through a provider factory:

```csharp
using System.Data.Common;

await using DbConnection conn = providerFactory.CreateConnection()!;
conn.ConnectionString = connectionString;

await conn.OpenAsync();

await using DbCommand cmd = conn.CreateCommand();
cmd.CommandText = "SELECT Id, Name FROM Users WHERE Id = @id";

DbParameter p = cmd.CreateParameter();
p.ParameterName = "@id";
p.Value = 123;
cmd.Parameters.Add(p);

await using DbDataReader reader =
    await cmd.ExecuteReaderAsync();

while (await reader.ReadAsync())
{
    int id = reader.GetInt32(0);
    string name = reader.GetString(1);
}
```

This code uses the common ADO.NET family, but the SQL string still assumes a parameter style and SQL dialect that the selected provider must understand.

## 5. Why connection, command, reader, and transaction are disposed

All of these objects can hold resources or state.

### Connection

A connection wraps a database connection handle.

When pooling is enabled, `Close` or `Dispose` usually returns the logical connection to the provider's pool instead of necessarily destroying the physical network connection.

If the connection is not closed or disposed, it may remain checked out longer than required and eventually exhaust the pool under load.

Use:

```csharp
await using DbConnection conn = providerFactory.CreateConnection()!;
conn.ConnectionString = connectionString;
await conn.OpenAsync();
```

### Command

A command can contain or reference:

- provider-specific unmanaged or native resources;
- a parameter collection;
- internal execution state;
- connection state;
- transaction state.

It therefore also implements disposal.

### Reader

A reader is especially important to dispose because it may keep:

- the connection busy;
- the active result set open;
- network or driver resources in use.

Until the reader is completed or disposed, the connection may not yet be reusable.

### Transaction

A transaction must be committed or rolled back and then disposed. Disposal is not a replacement for explicitly choosing commit or rollback in normal application flow.

### Preferred pattern

Use `await using` when the object supports asynchronous disposal:

```csharp
await using var conn = new SqlConnection(connectionString);
await conn.OpenAsync();

await using var cmd = conn.CreateCommand();
await using var reader = await cmd.ExecuteReaderAsync();
```

The source repeatedly emphasizes the habit:

```text
open late;
close early;
keep the connection open only for the shortest practical duration.
```

## 6. Full SQL Server repository example

### Model and repository shell

```csharp
using Microsoft.Data.SqlClient;
using System.Data;

public sealed class UserRow
{
    public int Id { get; init; }
    public string Email { get; init; } = "";
    public string? DisplayName { get; init; }
}

public sealed class UserRepository
{
    private readonly string _connectionString;

    public UserRepository(string connectionString)
    {
        _connectionString = connectionString;
    }
}
```

### Fetch one user by email

```csharp
public async Task<UserRow?> GetByEmailAsync(
    string email,
    CancellationToken ct = default)
{
    await using var conn =
        new SqlConnection(_connectionString);

    await conn.OpenAsync(ct);

    await using var cmd = new SqlCommand(
        """
        SELECT TOP (1) Id, Email, DisplayName
        FROM dbo.Users
        WHERE Email = @email
        """,
        conn);

    cmd.Parameters
       .Add("@email", SqlDbType.NVarChar, 256)
       .Value = email;

    await using var reader =
        await cmd.ExecuteReaderAsync(ct);

    if (!await reader.ReadAsync(ct))
        return null;

    int idOrd = reader.GetOrdinal("Id");
    int emailOrd = reader.GetOrdinal("Email");
    int displayNameOrd =
        reader.GetOrdinal("DisplayName");

    return new UserRow
    {
        Id = reader.GetInt32(idOrd),
        Email = reader.GetString(emailOrd),
        DisplayName =
            await reader.IsDBNullAsync(displayNameOrd, ct)
                ? null
                : reader.GetString(displayNameOrd)
    };
}
```

This example demonstrates:

- one connection per operation;
- explicit asynchronous open;
- a parameterized query;
- explicit SQL type and size;
- asynchronous reader execution;
- returning `null` when no row is found;
- caching ordinals before extracting values;
- checking `DBNull` before calling a typed getter.

### Update a row and return the affected-row count

```csharp
public async Task<int> UpdateLastLoginAsync(
    int userId,
    CancellationToken ct = default)
{
    await using var conn =
        new SqlConnection(_connectionString);

    await conn.OpenAsync(ct);

    await using var cmd = new SqlCommand(
        """
        UPDATE dbo.Users
        SET LastLoginUtc = SYSUTCDATETIME()
        WHERE Id = @id
        """,
        conn);

    cmd.Parameters
       .Add("@id", SqlDbType.Int)
       .Value = userId;

    return await cmd.ExecuteNonQueryAsync(ct);
}
```

`ExecuteNonQueryAsync` is used because the important result is not a result set but the number of rows affected.

## 7. Mental model for direct ADO.NET work

The normal sequence is:

1. create a connection;
2. open it;
3. create a command;
4. add parameters;
5. execute one of:
   - `ExecuteReader` for rows;
   - `ExecuteScalar` for one value;
   - `ExecuteNonQuery` for insert, update, delete, DDL, or affected-row count;
6. read results when applicable;
7. commit or roll back when a transaction is used;
8. dispose everything.

This is the central model repeated throughout the source.

## 8. Opening a connection and connection pooling

```csharp
using Microsoft.Data.SqlClient;

await using var conn =
    new SqlConnection(connectionString);

await conn.OpenAsync();
```

Connection pooling is handled by the provider and ADO.NET layer.

Calling `Close` or disposing the connection generally returns it to the pool instead of necessarily destroying the underlying physical connection.

The application should still dispose promptly. Pooling is not a reason to leave logical connections open.

## 9. Reading many rows with ExecuteReader

```csharp
await using var cmd = new SqlCommand(
    "SELECT Id, Email FROM dbo.Users WHERE IsDeleted = 0",
    conn);

await using var reader =
    await cmd.ExecuteReaderAsync();

while (await reader.ReadAsync())
{
    int id = reader.GetInt32(0);
    string email = reader.GetString(1);
}
```

This is the normal pattern for reading a result set:

1. create the command;
2. execute a reader;
3. repeatedly call `ReadAsync`;
4. read each column from the current row;
5. dispose the reader.

## 10. Fetching a single value with ExecuteScalar

```csharp
await using var cmd = new SqlCommand(
    "SELECT COUNT(*) FROM dbo.Users WHERE IsDeleted = 0",
    conn);

object? result = await cmd.ExecuteScalarAsync();
int count = Convert.ToInt32(result);
```

`ExecuteScalar` is appropriate when one value is expected, for example:

- `COUNT(*)`;
- a maximum ID;
- one setting;
- one computed scalar.

It returns the first column of the first returned row.

## 11. Insert, update, and delete with ExecuteNonQuery

```csharp
await using var cmd = new SqlCommand(
    """
    UPDATE dbo.Users
    SET LastLoginUtc = SYSUTCDATETIME()
    WHERE Id = @id
    """,
    conn);

cmd.Parameters.AddWithValue("@id", userId);

int rowsAffected =
    await cmd.ExecuteNonQueryAsync();
```

`ExecuteNonQuery` is used when result rows are not the output. Its return value is normally the number of affected rows.

## 12. Parameters

Always use parameters instead of concatenating user input into SQL.

```csharp
await using var cmd = new SqlCommand(
    "SELECT Id, Name FROM dbo.Users WHERE Email = @email",
    conn);

cmd.Parameters.AddWithValue("@email", email);
```

The source then shows a more explicit form and notes that it is often preferable:

```csharp
var p = cmd.Parameters.Add(
    "@email",
    SqlDbType.NVarChar,
    256);

p.Value = email;
```

The explicit form provides clearer control over:

- database type;
- length or size;
- conversion behavior;
- query-plan stability in cases where inferred parameter metadata matters.

The source does not ban `AddWithValue`, but it presents explicit type and size as the clearer and more controlled option.

## 13. Mapping rows to objects

```csharp
public sealed class UserRow
{
    public int Id { get; init; }
    public string Name { get; init; } = "";
}

var users = new List<UserRow>();

await using var cmd = new SqlCommand(
    "SELECT Id, Name FROM dbo.Users",
    conn);

await using var reader =
    await cmd.ExecuteReaderAsync();

while (await reader.ReadAsync())
{
    users.Add(new UserRow
    {
        Id = reader.GetInt32(
            reader.GetOrdinal("Id")),

        Name = reader.GetString(
            reader.GetOrdinal("Name"))
    });
}
```

The example uses `GetOrdinal` for named-column access rather than hardcoding ordinals throughout the mapping code.

For a hot loop, it is normally better to calculate each ordinal once before the loop and reuse it.

## 14. Handling database nulls

Do not call `GetString`, `GetInt32`, or another typed getter on a database-null value.

```csharp
int nameOrdinal = reader.GetOrdinal("Name");

string? name =
    await reader.IsDBNullAsync(nameOrdinal)
        ? null
        : reader.GetString(nameOrdinal);
```

ADO.NET uses `DBNull` for database nulls. It is distinct from an ordinary CLR `null` reference in the reader API.

The correct sequence is:

1. locate the column;
2. call `IsDBNull` or `IsDBNullAsync`;
3. call the typed getter only when the value is not database null.

## 15. Transactions

A transaction groups several database operations so they succeed or fail together.

```csharp
await using var conn =
    new SqlConnection(connectionString);

await conn.OpenAsync();

await using var tx =
    await conn.BeginTransactionAsync();

try
{
    await using var cmd1 = new SqlCommand(
        """
        UPDATE dbo.Accounts
        SET Balance = Balance - @amount
        WHERE Id = @id
        """,
        conn,
        (SqlTransaction)tx);

    cmd1.Parameters.AddWithValue("@amount", 100);
    cmd1.Parameters.AddWithValue("@id", fromId);

    await cmd1.ExecuteNonQueryAsync();

    await using var cmd2 = new SqlCommand(
        """
        UPDATE dbo.Accounts
        SET Balance = Balance + @amount
        WHERE Id = @id
        """,
        conn,
        (SqlTransaction)tx);

    cmd2.Parameters.AddWithValue("@amount", 100);
    cmd2.Parameters.AddWithValue("@id", toId);

    await cmd2.ExecuteNonQueryAsync();

    await tx.CommitAsync();
}
catch
{
    await tx.RollbackAsync();
    throw;
}
```

Important details:

- both commands use the same connection;
- both commands are associated with the same transaction;
- successful completion commits;
- an exception triggers rollback and is rethrown;
- the transaction is disposed after use.

The SVG label also notes that isolation level is a .NET-wide ADO.NET concept. The `System.Data.IsolationLevel` enum can be used when beginning transactions through ADO.NET and in EF Core integration paths that accept the same isolation-level abstraction.

## 16. Stored procedures

```csharp
await using var cmd =
    new SqlCommand("dbo.GetUserById", conn);

cmd.CommandType = CommandType.StoredProcedure;

cmd.Parameters.AddWithValue("@id", userId);

await using var reader =
    await cmd.ExecuteReaderAsync();
```

The important steps are:

1. use the procedure name as `CommandText`;
2. set `CommandType.StoredProcedure`;
3. add parameters;
4. execute using the result shape the procedure returns.

The earlier portability caveat still applies: stored-procedure behavior and conventions are provider-specific.

## 17. Choosing the execution method

Use:

```text
ExecuteReader   -> rows
ExecuteScalar   -> one value
ExecuteNonQuery -> affected-row count / no result set
```

### Fetch one row

```csharp
await using var cmd = new SqlCommand(
    "SELECT TOP(1) Id, Name FROM dbo.Users WHERE Id = @id",
    conn);

cmd.Parameters.AddWithValue("@id", userId);

await using var reader =
    await cmd.ExecuteReaderAsync();

if (await reader.ReadAsync())
{
    int id = reader.GetInt32(0);
    string name = reader.GetString(1);
}
```

### Fetch many rows

```csharp
var items = new List<(int Id, string Name)>();

await using var cmd = new SqlCommand(
    "SELECT Id, Name FROM dbo.Users ORDER BY Id",
    conn);

await using var reader =
    await cmd.ExecuteReaderAsync();

while (await reader.ReadAsync())
{
    items.Add((
        reader.GetInt32(0),
        reader.GetString(1)));
}
```

### Fetch an aggregate

```csharp
await using var cmd = new SqlCommand(
    "SELECT COUNT(*) FROM dbo.Users",
    conn);

int count = Convert.ToInt32(
    await cmd.ExecuteScalarAsync());
```

## 18. Good habits

The source lists these habits:

- use `await using` for connections, commands, readers, and transactions when available;
- parameterize queries;
- never construct SQL by concatenating untrusted input;
- open connections late;
- close or dispose them early;
- keep them open only for the shortest practical duration;
- prefer typed getters such as `GetInt32`, `GetString`, and `GetDateTime` instead of converting everything from `object`;
- dispose readers promptly;
- use explicit parameter metadata where it improves clarity and correctness;
- keep provider-specific SQL behind an appropriate boundary when supporting more than one database.

## 19. GetOrdinal

`GetOrdinal("ColumnName")` returns the zero-based index of a named column in the current result set.

For:

```sql
SELECT Id, Name, Email
FROM Users
```

the typical ordinals are:

```text
Id    -> 0
Name  -> 1
Email -> 2
```

Why use it:

- the code can refer to column names rather than scattering numeric positions;
- typed ordinal getters such as `GetInt32(ordinal)` are efficient inside row loops;
- the source recommends resolving ordinals once, outside the loop, and reusing the returned integers.

Example:

```csharp
using Microsoft.Data.SqlClient;

await using var conn =
    new SqlConnection(connectionString);

await conn.OpenAsync();

await using var cmd = new SqlCommand(
    "SELECT Id, Name FROM dbo.Users WHERE IsActive = 1",
    conn);

await using var reader =
    await cmd.ExecuteReaderAsync();

int idOrd = reader.GetOrdinal("Id");
int nameOrd = reader.GetOrdinal("Name");

while (await reader.ReadAsync())
{
    int id = reader.GetInt32(idOrd);
    string name = reader.GetString(nameOrd);
}
```

The source also notes a documentation detail: `GetOrdinal` first performs a case-sensitive lookup and then a case-insensitive lookup if required.

## 20. Raw ADO.NET commands inside an EF Core transaction

A raw `DbCommand` can participate in the same transaction as EF Core work.

The scenario shown is:

1. EF Core begins a transaction;
2. EF inserts or updates an entity and calls `SaveChangesAsync`;
3. code obtains the underlying `DbConnection`;
4. code obtains the underlying `DbTransaction`;
5. a raw command is created;
6. `cmd.Transaction` is assigned to the same transaction;
7. the raw command executes;
8. the EF transaction commits.

Example:

```csharp
await using var efTx =
    await db.Database.BeginTransactionAsync();

db.Orders.Add(order);
await db.SaveChangesAsync();

var conn = db.Database.GetDbConnection();
var adoTx = efTx.GetDbTransaction();

await using var cmd = conn.CreateCommand();

cmd.Transaction = adoTx;

cmd.CommandText =
    """
    UPDATE Inventory
    SET Quantity = Quantity - 1
    WHERE ProductId = @p0
    """;

var p = cmd.CreateParameter();
p.ParameterName = "@p0";
p.Value = order.ProductId;

cmd.Parameters.Add(p);

await cmd.ExecuteNonQueryAsync();

await efTx.CommitAsync();
```

The critical point is that simply using the same connection is not enough. The raw command must be explicitly associated with the transaction through `cmd.Transaction`.

## 21. ADO.NET and EF Core connection/state rules

Think of two separate responsibilities whenever the underlying connection is touched.

### A. Close or dispose a connection that application code opened

That returns it to the ADO.NET connection pool when pooling is enabled.

`Close()` and `Dispose()` serve the same practical purpose here.

If a manually opened connection is not closed or disposed, it remains checked out longer, and enough leaks can exhaust the pool.

This rule applies whether the connection came from:

```csharp
new SqlConnection(...)
```

or from:

```csharp
dbContext.Database.GetDbConnection()
```

The ownership details still matter: code should not dispose an externally owned object in a way that breaks its owner, but any connection state that the code explicitly opens or changes must be restored according to the API's ownership contract.

### B. Undo manually changed connection or session state

If application code changes provider or session state on the underlying connection, EF Core does not automatically reset arbitrary driver state before reuse.

That state must be restored before the context is returned, especially when `DbContext` pooling is enabled.

Examples of state to treat carefully include:

- manually opened connection state;
- transaction association;
- provider session settings;
- temporary provider-specific modes;
- mutable state stored on a reused context or connection.

### Summary from the source

```text
manual SqlConnection path:
close/dispose it and reset any state changed manually

DbContext.Database.GetDbConnection() without DbContext pooling:
same practical connection-state rule

DbContext pooling:
the same rule matters even more because the context instance itself
may be reused across requests or scopes
```

EF Core context pooling and ADO.NET connection pooling are separate mechanisms. Both make state hygiene important.

## 22. Final consolidated model

The complete direct-access workflow is:

```text
connection
  -> open
  -> command
  -> SQL or stored procedure
  -> parameters
  -> optional transaction
  -> ExecuteReader / ExecuteScalar / ExecuteNonQuery
  -> map values with typed getters and DBNull checks
  -> commit or rollback
  -> dispose reader, command, transaction, connection
```

The provider-neutral API makes the workflow reusable. It does not make all SQL, identifier quoting, parameter syntax, stored procedures, and special database features automatically portable.

The preserved SVG remains authoritative for exact original screenshots, punctuation, and visual layout.
