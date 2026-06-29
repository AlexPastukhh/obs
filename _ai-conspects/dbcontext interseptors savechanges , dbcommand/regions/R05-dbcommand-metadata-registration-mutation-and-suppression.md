# R05 — DbCommand metadata, registration, SQL mutation, and suppression

Generated: 2026-06-29

## Transcript standard

This is the active source-preserving transcript for the region.

- Each screenshot has a separate source block.
- Visible prose and code are transferred close to the source.
- Obvious spelling/OCR artifacts and punctuation are normalized.
- Cropped content is explicitly marked.
- Summary/meaning is kept separate from the near-literal layer.
- Every source has recall questions.

## Canvas labels relevant to this region

- `dbcommand`
- `command event data`

## Source-by-source transcript

### S-011 — Start of SQL logging interceptor

**Readability:** high  
**Known limits:** this source contains only the beginning of the code example

#### Near-literal normalized transcript

Example: log SQL before execution.

```csharp
using System.Data.Common;
using Microsoft.EntityFrameworkCore.Diagnostics;

public sealed class SqlLoggingInterceptor
    : DbCommandInterceptor
{
```

The method implementation continues in S-012.

#### Study meaning

The interceptor derives from `DbCommandInterceptor` and uses `DbCommand`/EF diagnostics types.

#### Recall questions

1. Which namespaces are imported?
2. Which base class is used?
3. Where does the method body continue?

### S-016 — Modify SQL text before execution

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

EF documentation includes command-interception examples where command text is changed before execution. Interceptors are specifically designed to allow this.

```csharp
public sealed class TaggingInterceptor
    : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result)
    {
        command.CommandText =
            "-- intercepted
" + command.CommandText;

        return result;
    }
}
```

#### Study meaning

A command interceptor can mutate the SQL string before it reaches the provider/database.

#### Recall questions

1. What modification is made to the SQL?
2. Which callback family is used?
3. What result is returned?

### S-020 — Legitimate and risky SQL mutation use cases

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Real uses of SQL modification:

- add database-specific hints;
- prepend comments/tags;
- enforce query-shape conventions.

Caution: changing SQL text can break provider assumptions if it is not done carefully.

#### Study meaning

Mutation is powerful but provider-sensitive; observation and tagging are safer than arbitrary rewriting.

#### Recall questions

1. Name three real uses.
2. What major risk is called out?

### S-031 — Register an interceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Register interceptors through EF Core options using `AddInterceptors(...)`. The documentation explicitly says to use `AddInterceptors(IInterceptor[])` to register application interceptors.

Example:

```csharp
builder.Services.AddDbContext<AppDbContext>((sp, options) =>
{
    options.UseSqlServer(connectionString);
    options.AddInterceptors(
        new AuditSaveChangesInterceptor());
});
```

#### Study meaning

Interceptors are attached to the DbContext options pipeline, typically during DI registration.

#### Recall questions

1. Which options method registers interceptors?
2. Where in DI setup is the example placed?
3. How could a DI-resolved interceptor be supplied instead of `new`?

### S-036 — Common command event-data properties

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Commonly useful properties on command event data:

- `Command` — the `DbCommand`;
- `Context` — the current `DbContext`;
- `CommandId`;
- `Connection`;
- `ConnectionId`;
- `CommandSource`.

Example:

```csharp
public override InterceptionResult<object> ScalarExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<object> result)
{
    Console.WriteLine(command.CommandText);
    Console.WriteLine(
        eventData.Context?.GetType().Name);
    Console.WriteLine(eventData.CommandId);

    return result;
}
```

After execution, `CommandEndEventData` also provides duration and execute-method information.

#### Study meaning

Event data supports command correlation, context correlation, connection correlation, source classification, and timing.

#### Recall questions

1. Which property identifies the current DbContext?
2. What does CommandId correlate?
3. What extra data appears after execution?

### S-038 — Meaning of command identifiers, connection, and source

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`CommandId` is a correlation ID for the specific `DbCommand` instance — “this exact command object.” It is useful for matching executing and executed logs for the same command.

`Connection` is the actual `DbConnection`, such as `SqlConnection` or `NpgsqlConnection`. It allows provider-specific inspection such as database name, data source, state, transaction association, and similar details.

`ConnectionId` is a correlation ID for the specific connection instance. Many commands may run on one connection:

- `CommandId` identifies one command;
- `ConnectionId` identifies the connection used by that command.

`CommandSource` tells why EF generated the command. It identifies the source of the DbCommand.

#### Study meaning

These properties let diagnostics correlate operations at command, connection, and EF-origin levels.

#### Recall questions

1. What does CommandId identify?
2. Why can several CommandIds share one ConnectionId?
3. What kind of information can be obtained from the provider connection?
4. What question does CommandSource answer?

### S-042 — CommandSource values

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Examples of `CommandSource` values include:

- `LinqQuery`;
- `SaveChanges`;
- `Migrations`;
- `FromSqlQuery`;
- `ExecuteSqlRaw`;
- `ValueGenerator`;
- `Scaffolding`;
- `ExecuteUpdate`;
- `ExecuteDelete`.

#### Study meaning

CommandSource classifies which EF subsystem or public API caused the command.

#### Recall questions

1. Which value indicates a normal LINQ query?
2. Which values correspond to bulk update/delete APIs?
3. Which value identifies migration SQL?

### S-046 — DbCommandInterceptor can suppress execution

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Can `DbCommandInterceptor` suppress execution?

Yes. EF command-interceptor documentation explicitly states that command execution can be viewed, changed, or suppressed, and that the result can be modified before being returned to EF.

Examples include short-circuiting a scalar or reader result in advanced scenarios. This is much less common than logging or modifying commands.

#### Study meaning

Suppression is available but requires a shape-compatible replacement value and a deliberate cache/emulation/deny policy.

#### Recall questions

1. Can command execution be suppressed?
2. What else can command interception do?
3. Why is command suppression less common than logging?

### S-047 — Use CommandSource to distinguish SaveChanges and migrations

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override InterceptionResult<int> NonQueryExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<int> result)
{
    if (eventData.CommandSource ==
        CommandSource.SaveChanges)
    {
        Console.WriteLine(
            "This SQL came from SaveChanges");
    }

    if (eventData.CommandSource ==
        CommandSource.Migrations)
    {
        Console.WriteLine(
            "This SQL came from a migration");
    }

    return result;
}
```

Intuition:

- `CommandId` — which command?
- `Connection` — which actual database connection object?
- `ConnectionId` — which connection instance, in a log-friendly ID form?
- `CommandSource` — why did EF create this command?

#### Study meaning

This enables source-aware diagnostics and policies without guessing from raw SQL.

#### Recall questions

1. How can migration SQL be distinguished from SaveChanges SQL?
2. What does each of the four metadata values answer?

### S-048 — Conceptual command-deny suppression

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Conceptually:

```csharp
public override InterceptionResult<int> NonQueryExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<int> result)
{
    if (command.CommandText.Contains("forbidden_table"))
    {
        return InterceptionResult<int>
            .SuppressWithResult(0);
    }

    return result;
}
```

Use cases:

- deny certain commands;
- emulate/cache specific commands;
- testing.

#### Study meaning

The example short-circuits a non-query and reports zero affected rows instead of executing it.

#### Recall questions

1. What condition triggers suppression?
2. What replacement result is returned?
3. Name three use cases.
4. What production risks would need review?

### S-054 — Main DbCommand properties

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Main properties:

- `CommandText` — SQL text or stored-procedure name to execute;
- `CommandTimeout` — timeout in seconds before execution fails;
- `CommandType` — how `CommandText` is interpreted, usually `Text` or `StoredProcedure`;
- `Connection` / `DbConnection` — database connection used by this command;
- `Transaction` / `DbTransaction` — transaction this command runs inside;
- `Parameters` / `DbParameterCollection` — command parameters such as `@p0`, `@id`;
- `DesignTimeVisible` — mostly design-time/UI tooling related, not important in normal EF interception;
- `UpdatedRowSource` — mostly relevant for `DbDataAdapter`, not typical EF Core usage.

#### Study meaning

These are the main low-level ADO.NET properties available through the intercepted DbCommand.

#### Recall questions

1. What does CommandType control?
2. Which property exposes the current transaction?
3. Which two properties are mostly irrelevant to normal EF Core interception?
4. What units does CommandTimeout use?

### S-058 — Five command properties usually inspected in EF Core

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Usually inspect these five:

```csharp
command.CommandText
command.CommandType
command.CommandTimeout
command.Parameters
command.Transaction
```

Sometimes also inspect:

```csharp
command.Connection
```

#### Study meaning

This is the practical shortlist for logging, diagnostics, and policy enforcement.

#### Recall questions

1. Which five properties are the usual shortlist?
2. When might Connection also be inspected?

### S-059 — Practical meaning of DbCommand properties

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Example SQL:

```sql
UPDATE Posts SET Title = @p0 WHERE Id = @p1
```

Then:

- `CommandText` — that SQL string;
- `Parameters` — `@p0`, `@p1`;
- `Connection` — current SQL Server/Postgres/etc. connection;
- `Transaction` — current transaction if one exists;
- `CommandType` — usually `Text`.

Important note: `DbCommand` is the base class. Real runtime objects are usually provider-specific subclasses such as:

- `SqlCommand`;
- `NpgsqlCommand`;
- `SqliteCommand`.

#### Study meaning

EF exposes provider-neutral base abstractions while runtime instances retain provider-specific behavior and properties.

#### Recall questions

1. Which property contains the SQL string?
2. Where are `@p0` and `@p1` found?
3. What does CommandType normally equal for generated SQL?
4. Name three provider-specific DbCommand subclasses.
