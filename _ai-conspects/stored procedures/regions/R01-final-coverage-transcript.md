# stored procedures — final coverage transcript v001

Source SVG: `stored procedures.svg`  
Conspect folder: `stored procedures`  
Stage: combined ten-conspect final coverage

## R01 — stored procedures with ADO.NET and EF Core

A stored procedure is a named database program that can accept parameters, execute SQL statements and return one or more of the following:

```text
- result sets from SELECT;
- output parameters;
- a scalar return value;
- affected-row information;
- errors raised by the database.
```

Typical reasons to use one are an existing database API, centralized database-side logic, carefully controlled permissions, a complex multi-statement operation, or integration with legacy systems. It is not automatically faster than parameterized SQL; correctness, maintainability and the actual execution plan still matter.

### SQL Server shape

```sql
CREATE PROCEDURE dbo.CreateDocument
    @Title nvarchar(max),
    @NewId int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Documents(Title)
    VALUES (@Title);

    SET @NewId = CONVERT(int, SCOPE_IDENTITY());
END
```

`SCOPE_IDENTITY()` returns the last identity created in the same scope. An `OUTPUT INSERTED...` clause is often a clearer alternative when returning inserted values.

Output parameters must be declared with `OUTPUT` in the procedure and in the calling parameter definition. They can be assigned with `SET`, `SELECT`, or through a statement such as `OUTPUT ... INTO` followed by a result query.

`SET NOCOUNT ON` suppresses “N rows affected” informational messages. `@@ROWCOUNT` remains available, but it must be captured immediately after the relevant statement because later statements overwrite it.

### ADO.NET execution

ADO.NET gives direct control over command type, parameter direction and result processing:

```csharp
await using var command = connection.CreateCommand();
command.CommandType = CommandType.StoredProcedure;
command.CommandText = "dbo.CreateDocument";

command.Parameters.Add(new SqlParameter("@Title", title));
var id = new SqlParameter("@NewId", SqlDbType.Int)
{
    Direction = ParameterDirection.Output
};
command.Parameters.Add(id);

await command.ExecuteNonQueryAsync();
var newId = (int)id.Value;
```

Use `ExecuteReader` for result sets, `ExecuteScalar` for a single first-cell value, and `ExecuteNonQuery` for commands where the main contract is parameters/affected rows. Multiple result sets can be advanced with `NextResult()`.

Output parameter values may not be final until execution or reader consumption has completed.

### EF Core query APIs

Common categories:

```text
FromSql / FromSqlInterpolated — entity or keyless query result;
Database.SqlQuery<T>          — scalar or unmapped result type where supported;
ExecuteSql / ExecuteSqlInterpolated — command with no mapped result set.
```

A result mapped to a normal entity can be tracked. A keyless type/DTO is appropriate for a read-only shape that is not an entity.

SQL Server does not allow arbitrary composition over a stored-procedure invocation. Appending LINQ that EF tries to translate on top of `EXEC ...` can fail. Materialize the result, or intentionally cross to `AsEnumerable()` and then process in memory. That boundary starts/finishes the database call; later filtering is no longer SQL filtering.

`FromSql` is primarily for a result set. If the contract centers on output parameters or multiple result sets, ADO.NET is often simpler and more explicit.

### EF Core CUD stored-procedure mapping

EF Core can map insert/update/delete operations used by `SaveChanges()` to stored procedures. Important mapping concepts include:

```text
HasParameter(...)                  current input value
HasOriginalValueParameter(...)     original key/concurrency value
HasResultColumn(...)                generated value returned in a row
IsOutput()                          input/output parameter mapping
HasRowsAffectedParameter(...)       affected-row signal in an output parameter
HasRowsAffectedReturnValue()        affected-row signal in the procedure return value
HasRowsAffectedResultColumn()       affected-row signal in a result column
```

Example update intent:

```csharp
modelBuilder.Entity<Document>()
    .UpdateUsingStoredProcedure("Documents_Update", sp =>
    {
        sp.HasOriginalValueParameter(d => d.Id);
        sp.HasOriginalValueParameter(d => d.RowVersion);
        sp.HasParameter(d => d.Title);
        sp.HasParameter(d => d.RowVersion, p => p.IsOutput());
        sp.HasRowsAffectedResultColumn();
    });
```

### Optimistic concurrency

A concurrency-aware procedure receives the original concurrency token and uses it in the `WHERE` clause:

```sql
UPDATE dbo.Documents
SET Title = @Title
OUTPUT INSERTED.RowVersion INTO @Updated
WHERE Id = @Id
  AND RowVersion = @RowVersion_Original;
```

The procedure must communicate whether a row was actually updated. EF needs an explicitly mapped rows-affected signal or a result contract designed so that a conflict returns no success result. Returning a generated/result column even when no row was updated can make the operation look successful unless the mapping and procedure are designed correctly.

Output parameters are not automatically treated as a concurrency-success signal merely because they exist; they must be mapped for the intended role.

### Result/parameter design rules

```text
- Do not mix several ambiguous “success” channels without a clear contract.
- Capture @@ROWCOUNT immediately if using it.
- Return generated values only for a successful operation.
- Use original values for concurrency checks and current values for updates.
- Parameterize inputs; do not concatenate user input into SQL.
- Decide explicitly whether the API returns a row set, output parameters, a return value, or a combination.
```

## Coverage

```text
R01 processed image uses: 3
R01 processed text labels: 108
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
