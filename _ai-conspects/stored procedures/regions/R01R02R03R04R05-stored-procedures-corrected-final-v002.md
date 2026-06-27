# Final corrected semantic transcript — stored procedures v002

Authoritative source: `source/stored procedures.svg`  
Corrected coverage: **154 screenshot uses + 108 native canvas labels**

The original transcript was based on only three screenshots. This version incorporates the repaired SVG and covers the complete stored-procedure, ADO.NET and EF Core material.

---

# 1. What stored procedures provide

A stored procedure is a named database program stored and executed on the server. It can provide:

- a stable database-side API;
- permission boundaries where an application may execute a procedure without direct table access;
- multi-step database logic close to the data;
- fewer client/server round trips for operations that would otherwise require several commands;
- a shared contract for legacy systems, operations teams and multiple applications.

Stored procedures are not automatically faster. A parameterized query and a procedure may receive similar execution plans. Performance depends more on indexes, query shape, data volume, parameter behavior, locking and plan quality than on the fact that SQL is wrapped in a procedure.

Costs include database-specific code, deployment/versioning overhead, harder composition, extra testing and the possibility of splitting business logic between application and database layers.

---

# 2. Basic T-SQL form and ADO.NET usage

Representative procedure:

```sql
CREATE OR ALTER PROCEDURE dbo.GetUserById
    @Id int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, Name, Email
    FROM dbo.Users
    WHERE Id = @Id;
END
```

ADO.NET calls a procedure by setting `CommandType.StoredProcedure` and using the procedure name as `CommandText`:

```csharp
await using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();

await using var command = new SqlCommand("dbo.GetUserById", connection)
{
    CommandType = CommandType.StoredProcedure
};

command.Parameters.AddWithValue("@Id", 123);

await using var reader = await command.ExecuteReaderAsync();
while (await reader.ReadAsync())
{
    var id = reader.GetInt32(0);
    var name = reader.GetString(1);
    var email = reader.GetString(2);
}
```

With plain ADO.NET and `CommandType.Text`, calling `EXEC dbo.MyProcedure` also works, but the caller is then writing raw SQL text.

Choose the execution API according to the procedure contract:

```text
ExecuteReader / ExecuteReaderAsync
    reads row sets produced by SELECT

ExecuteScalar / ExecuteScalarAsync
    reads the first column of the first row

ExecuteNonQuery / ExecuteNonQueryAsync
    runs a command and returns the affected-row count when available
```

---

# 3. Output parameters, result sets and RETURN codes

SQL Server exposes three distinct return mechanisms.

## Result set

```sql
SELECT Id, Name, Email
FROM dbo.Users
WHERE Id = @Id;
```

Read with a data reader, EF Core raw SQL query, Dapper query or another row-materialization API.

## Output parameter

```sql
CREATE OR ALTER PROCEDURE dbo.CreateUser
    @Name nvarchar(100),
    @Email nvarchar(200),
    @NewId int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Users(Name, Email)
    VALUES (@Name, @Email);

    SET @NewId = CONVERT(int, SCOPE_IDENTITY());
END
```

ADO.NET:

```csharp
var idParameter = command.Parameters.Add("@NewId", SqlDbType.Int);
idParameter.Direction = ParameterDirection.Output;

await command.ExecuteNonQueryAsync();

var newId = (int)idParameter.Value;
```

Output values are reliably available after the reader/command has completed and, when a reader was used, after it has been closed or disposed.

## Procedure RETURN code

```sql
RETURN 0;
```

`RETURN` is an integer status code. It is not a row set and not the same as an output parameter.

A procedure may use result sets, output parameters and a return code together, but each should have a clear purpose.

---

# 4. `SCOPE_IDENTITY()` and generated values

`SCOPE_IDENTITY()` returns the last identity value inserted in the current scope. It is safer than `@@IDENTITY` when triggers may insert rows in another table or scope.

```sql
INSERT INTO dbo.Users(Name, Email)
VALUES (@Name, @Email);

SET @NewId = CONVERT(int, SCOPE_IDENTITY());
```

A generated value may also be returned as a result column:

```sql
SELECT Id, RowVersion
FROM dbo.Documents
WHERE Id = SCOPE_IDENTITY();
```

EF Core stored-procedure mapping distinguishes:

- normal input parameters;
- original-value input parameters;
- output parameters;
- result columns returned by `SELECT`;
- rows-affected signals.

The mapping must match the actual SQL contract.

---

# 5. `SET NOCOUNT ON`

Without `SET NOCOUNT ON`, SQL Server sends additional “N rows affected” messages after statements. These messages can complicate multi-statement procedure behavior and some client expectations.

```sql
BEGIN
    SET NOCOUNT ON;
    ...
END
```

It is commonly enabled in stored procedures, especially when the procedure returns explicit result sets, output parameters or its own rows-affected signal.

`SET NOCOUNT ON` does not replace a deliberate concurrency signal. The procedure still needs to expose whether the intended row matched and was modified when EF Core relies on that fact.

---

# 6. EF Core raw SQL query APIs

For entity-shaped query results:

```csharp
var users = await context.Users
    .FromSqlInterpolated($"EXEC dbo.GetUsersByRole {role}")
    .ToListAsync();
```

For scalar or unmapped results, newer EF Core versions provide `Database.SqlQuery<T>` / `SqlQueryRaw<T>`:

```csharp
var count = await context.Database
    .SqlQuery<int>($"EXEC dbo.GetUserCount")
    .SingleAsync();
```

For commands that do not return materialized rows:

```csharp
var affected = await context.Database
    .ExecuteSqlInterpolatedAsync(
        $"EXEC dbo.UpdateUserEmail {id}, {email}");
```

Important distinction:

```text
FromSql / SqlQuery
    query APIs for row/scalar result materialization

ExecuteSql
    command API, normally used for affected rows rather than SELECT result sets
```

---

# 7. SQL Server stored-procedure composability

A SQL Server stored-procedure call is generally not composable as a subquery. Applying additional LINQ operators after `FromSql` may cause EF Core to try to append SQL around the `EXEC`, which SQL Server cannot treat like a normal derived table.

Problematic shape:

```csharp
context.People
    .FromSql($"EXEC dbo.People_GetByCity {city}")
    .Where(person => person.Name.StartsWith("A"));
```

Options:

- put the filtering inside the procedure;
- materialize first, then filter in memory;
- use a table-valued function or composable SQL when server-side LINQ composition is required.

`AsEnumerable()` changes the remaining operators to client-side LINQ, so it may transfer more rows than needed.

---

# 8. EF Core CUD stored-procedure mapping

EF Core can map `SaveChanges` insert, update and delete operations to stored procedures:

```csharp
modelBuilder.Entity<Document>()
    .InsertUsingStoredProcedure("Documents_Insert", builder =>
    {
        builder.HasParameter(document => document.Title);
        builder.HasResultColumn(document => document.Id);
        builder.HasResultColumn(document => document.RowVersion);
    });
```

Update:

```csharp
modelBuilder.Entity<Document>()
    .UpdateUsingStoredProcedure("Documents_Update", builder =>
    {
        builder.HasOriginalValueParameter(document => document.Id);
        builder.HasParameter(document => document.Title);
        builder.HasOriginalValueParameter(document => document.RowVersion);
        builder.HasResultColumn(document => document.RowVersion);
        builder.HasRowsAffectedResultColumn();
    });
```

Delete:

```csharp
modelBuilder.Entity<Document>()
    .DeleteUsingStoredProcedure("Documents_Delete", builder =>
    {
        builder.HasOriginalValueParameter(document => document.Id);
        builder.HasOriginalValueParameter(document => document.RowVersion);
        builder.HasRowsAffectedResultColumn();
    });
```

The mapping configures how EF sends values and how it reads database-generated values or concurrency outcomes. It does not automatically generate the stored-procedure body.

---

# 9. Parameter mapping methods

## `HasParameter`

Binds the entity property’s current value to a normal input parameter:

```csharp
builder.HasParameter(document => document.Title);
```

## `HasOriginalValueParameter`

Sends the original tracked value. It is especially important for:

- keys used to locate the original row;
- optimistic-concurrency tokens such as `RowVersion`;
- update/delete predicates that must compare the previously read value.

```csharp
builder.HasOriginalValueParameter(document => document.RowVersion);
```

## Input/output parameter

A property can be sent as input and then updated from an output parameter:

```csharp
builder.HasParameter(
    document => document.RowVersion,
    parameter => parameter.IsOutput());
```

Exact overloads differ by EF Core version, so the mapping must match the version in use and the documented provider API.

## Same property as current and original value

For updates, the same conceptual property may need two SQL parameters:

```text
@Title
    new value to write

@Title_Original
    old value used for matching/concurrency
```

This is valid because the parameters represent different roles.

---

# 10. Result columns and output parameters

A stored procedure can return database-generated properties through a result set:

```sql
SELECT Id, RowVersion
FROM dbo.Documents
WHERE Id = @Id;
```

Mapped with:

```csharp
builder.HasResultColumn(document => document.Id);
builder.HasResultColumn(document => document.RowVersion);
```

Or through output parameters:

```sql
@NewRowVersion varbinary(8) OUTPUT
```

A single property normally should not be mapped simultaneously to both an output parameter and a result column. Choose one return channel for that property.

Result columns are useful for:

- generated identity keys;
- computed columns;
- refreshed row-version/concurrency values.

---

# 11. Rows-affected mechanisms

EF Core needs a way to know whether an update or delete matched the expected row, especially for optimistic concurrency.

Available mapping patterns include:

```text
HasRowsAffectedParameter()
HasRowsAffectedResultColumn()
HasRowsAffectedReturnValue()
```

These are alternative mechanisms, not several signals to configure for the same operation.

Examples:

## Output parameter

```sql
@RowsAffected int OUTPUT
```

## Result column

```sql
SELECT @@ROWCOUNT AS RowsAffected;
```

## Procedure return value

```sql
RETURN @@ROWCOUNT;
```

The procedure must return a truthful value. If EF expects one row but receives zero, it can raise `DbUpdateConcurrencyException`.

A result set that returns generated columns can itself prove success. In that design, a separate rows-affected signal may be unnecessary if the mapped contract already makes “matched row versus no row” observable.

---

# 12. Optimistic concurrency with stored procedures

Normal EF-generated SQL compares the original concurrency token in the `WHERE` clause:

```sql
UPDATE Documents
SET Title = @Title
WHERE Id = @Id
  AND RowVersion = @OriginalRowVersion;
```

A mapped procedure must implement the same semantics:

```sql
CREATE OR ALTER PROCEDURE dbo.Documents_Update
    @Id int,
    @OriginalRowVersion varbinary(8),
    @Title nvarchar(200)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Documents
    SET Title = @Title
    WHERE Id = @Id
      AND RowVersion = @OriginalRowVersion;

    SELECT Id, RowVersion
    FROM dbo.Documents
    WHERE Id = @Id
      AND @@ROWCOUNT = 1;
END
```

The essential facts are:

- the original token participates in the match;
- zero matched rows means the row changed or disappeared;
- EF receives a result that distinguishes success from conflict;
- the refreshed concurrency token is returned after success.

EF does not inspect the procedure body. Correct concurrency behavior is the combined responsibility of the SQL procedure and the EF mapping.

---

# 13. Insert, update and delete examples

## Insert

Procedure:

```sql
CREATE OR ALTER PROCEDURE dbo.Documents_Insert
    @Title nvarchar(200)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Documents(Title)
    VALUES (@Title);

    SELECT Id, RowVersion
    FROM dbo.Documents
    WHERE Id = SCOPE_IDENTITY();
END
```

EF sends current property values and reads generated columns.

## Update

Procedure receives:

```text
original key
original concurrency token
new values
```

It returns either refreshed generated columns or a rows-affected signal.

## Delete

Procedure normally receives the original key and original concurrency token. A zero-row result indicates a stale or already deleted entity.

---

# 14. When stored-procedure CUD mapping makes sense

Useful cases include:

- an existing database already exposes stored procedures;
- direct table modifications are prohibited;
- multiple applications share a fixed database API;
- legacy integration must remain unchanged;
- one write operation updates several tables;
- database-specific auditing, side effects or custom concurrency rules are required;
- DBAs require versioned procedures and monitored execution.

It is often unnecessary for ordinary application CRUD where EF-generated SQL is already clear, correct and maintainable. Procedure mapping adds parameter/result contracts and database-specific deployment work.

---

# 15. Practical checklist

```text
[ ] distinguish SELECT result sets, output parameters and RETURN codes
[ ] use ExecuteReader/FromSql/SqlQuery for rows
[ ] use ExecuteNonQuery/ExecuteSql for command-style operations
[ ] use SET NOCOUNT ON deliberately
[ ] remember that SQL Server stored-procedure calls are not composable LINQ subqueries
[ ] map current values with HasParameter
[ ] map matching/concurrency values with HasOriginalValueParameter
[ ] choose result columns or output parameters for generated properties
[ ] configure one rows-affected mechanism per operation
[ ] implement original-token comparison inside the procedure
[ ] return an observable success/conflict signal
[ ] keep the SQL contract and EF mapping synchronized
```

---

# 16. Corrected coverage

```text
previous image uses: 3
corrected image uses: 154
recovered missing image uses: 151
native canvas labels: 108

processed image uses: 154
processed text labels: 108
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```

Evidence:

```text
data/image-uses-final-v002.json
data/text-elements-final-v002.json
data/final-coverage-audit-v002.json
audit-assets/stored-procedures-corrected-full-preview-v002.png
```
