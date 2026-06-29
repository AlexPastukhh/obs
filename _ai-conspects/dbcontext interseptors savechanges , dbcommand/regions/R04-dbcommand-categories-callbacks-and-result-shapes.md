# R04 — DbCommand categories, callbacks, and result shapes

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

- `command interseptors`
- `scalar executing returns object`

## Source-by-source transcript

### S-002 — SaveChangesInterceptor versus DbCommandInterceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Database command interceptors can:

- view execution;
- change the `DbCommand`;
- suppress execution;
- modify the result returned to EF.

They see:

- SQL text;
- parameters;
- execution type;
- returned reader, scalar, or affected-row count.

This differs from `SaveChangesInterceptor`:

- `SaveChangesInterceptor` works in terms of tracked entities and the SaveChanges lifecycle;
- `DbCommandInterceptor` works in terms of raw SQL commands.

#### Study meaning

Choose the interceptor based on abstraction level: unit-of-work/entity lifecycle versus provider command execution.

#### Recall questions

1. What four capabilities are listed for command interception?
2. What data does a command interceptor observe?
3. How does its abstraction differ from SaveChanges interception?

### S-006 — Three DbCommand result categories

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A `DbCommand` typically runs in one of three ways:

- **Reader:** returns rows, such as `SELECT ...`;
- **Scalar:** returns one value, such as `SELECT COUNT(*) ...`;
- **NonQuery:** returns affected-row count, such as `UPDATE`, `DELETE`, `INSERT`.

Command interceptor callback groups:

- `ReaderExecuting` / `ReaderExecuted`;
- `ScalarExecuting` / `ScalarExecuted`;
- `NonQueryExecuting` / `NonQueryExecuted`;

plus asynchronous counterparts.

#### Study meaning

Each command shape has a distinct result type, so suppression and result replacement must use the matching callback family.

#### Recall questions

1. What does each of the three command categories return?
2. Which callback family handles rowsets?
3. Why are there separate method families?

### S-010 — Suppress a scalar command with an object result

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

For scalar commands:

```csharp
public override InterceptionResult<object> ScalarExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<object> result)
{
    return InterceptionResult<object>
        .SuppressWithResult(42);
}
```

The caller receives an `object` representing `42`, not a new wrapper type chosen by the interceptor.

The interceptor should not usually inspect the incoming result value parameter; what matters is whether `HasResult == true`, meaning an earlier interceptor already suppressed execution.

#### Study meaning

Scalar interception is object-shaped because different database scalar queries can return different CLR types.

#### Recall questions

1. What public result type does ScalarExecuting use?
2. What does `HasResult` indicate?
3. What value is returned in the example?

### S-012 — ReaderExecuting logging example

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override InterceptionResult<DbDataReader> ReaderExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<DbDataReader> result)
{
    Console.WriteLine("About to run SQL:");
    Console.WriteLine(command.CommandText);

    foreach (DbParameter p in command.Parameters)
    {
        Console.WriteLine(
            $"  {p.ParameterName} = {p.Value}");
    }

    return result;
}
```

Useful for:

- targeted SQL logging;
- correlation/tracing;
- debugging query shape and parameters.

#### Study meaning

The reader pre-execution callback can inspect SQL and parameters without changing the command.

#### Recall questions

1. What result shape is used by ReaderExecuting?
2. What command data is logged?
3. Why must the incoming result normally be returned?

### S-023 — ScalarExecuting logging interceptor

**Readability:** high  
**Known limits:** the closing lines continue just below the screenshot but the complete behavior is visible

#### Near-literal normalized transcript

```csharp
public sealed class ScalarLoggingInterceptor
    : DbCommandInterceptor
{
    public override InterceptionResult<object> ScalarExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<object> result)
    {
        Console.WriteLine("Scalar SQL:");
        Console.WriteLine(command.CommandText);

        return result;
    }
}
```

#### Study meaning

This observes scalar SQL before execution while preserving normal execution.

#### Recall questions

1. Which method is overridden?
2. What is logged?
3. Does the example suppress execution?

### S-024 — What ScalarExecuting means

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A scalar command returns one value, not a result set. Scalar interceptor methods therefore return/use `object`.

EF documents `ScalarExecuting` as returning `InterceptionResult<object>`.

Why it is useful for `EXISTS` and aggregate queries: those queries naturally return one value.

Examples:

- `SELECT COUNT(*) FROM Posts`;
- `SELECT MAX(Rating) FROM Posts`;
- `SELECT MIN(CreatedAt) FROM Posts`;
- provider-specific `EXISTS` patterns or a query translated to a single boolean-like result.

Scalar-shaped values include:

- `COUNT(*)` → integer/long;
- `MAX(...)` → one value;
- `EXISTS(...)` → usually boolean or provider-specific scalar representation.

#### Study meaning

Scalar refers to the database result shape, not to a particular CLR type.

#### Recall questions

1. Why does the callback use `object`?
2. Name three aggregate queries that produce scalar results.
3. How can EXISTS be represented?

### S-029 — ScalarExecuted result inspection

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Post-execution scalar callback:

```csharp
public override object ScalarExecuted(
    DbCommand command,
    CommandExecutedEventData eventData,
    object result)
{
    Console.WriteLine($"Scalar result: {result}");
    return result;
}
```

Great for:

- `COUNT(*)`;
- `EXISTS`;
- aggregate queries.

#### Study meaning

After execution, the interceptor sees the actual provider scalar value and normally returns it unchanged.

#### Recall questions

1. Which event data is used after execution?
2. What can be logged?
3. What should normally be returned?

### S-032 — Possible CLR values of a scalar command

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The interceptor method deals with `object` because different scalar commands can return different CLR values:

- `int`;
- `long`;
- `string`;
- `bool`;
- `DateTime`;
- `decimal`;
- `DBNull.Value` or another null-like database result, depending on provider path.

#### Study meaning

`object` is required to accommodate heterogeneous provider results.

#### Recall questions

1. Name six possible scalar CLR values.
2. How can a database null be represented?

### S-033 — Command event data types

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

In command interceptors, methods such as:

- `ReaderExecuting`;
- `ScalarExecuting`;
- `NonQueryExecuting`;

receive event data such as:

- `CommandEventData`;
- `CommandExecutedEventData`;
- `CommandErrorEventData`.

#### Study meaning

The event-data subtype reflects before-execution, successful execution, or command error.

#### Recall questions

1. Which event data is typical before execution?
2. Which type is associated with completed execution?
3. Which type carries a command error?

### S-035 — NonQueryExecuting logging interceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public sealed class NonQueryLoggingInterceptor
    : DbCommandInterceptor
{
    public override InterceptionResult<int> NonQueryExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<int> result)
    {
        Console.WriteLine("NonQuery SQL:");
        Console.WriteLine(command.CommandText);

        return result;
    }
}
```

#### Study meaning

Non-query callbacks are integer-shaped because INSERT/UPDATE/DELETE style commands return affected-row counts.

#### Recall questions

1. What result type does NonQueryExecuting use?
2. Which SQL command families normally use it?
3. Does the example change execution?

### S-039 — ScalarExecuting and ScalarExecuted together

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override InterceptionResult<object> ScalarExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<object> result)
{
    Console.WriteLine("Scalar SQL:");
    Console.WriteLine(command.CommandText);
    return result;
}

public override object ScalarExecuted(
    DbCommand command,
    CommandExecutedEventData eventData,
    object result)
{
    Console.WriteLine(
        $"Scalar result type: {result?.GetType().Name}");
    Console.WriteLine(
        $"Scalar result value: {result}");
    return result;
}
```

#### Study meaning

The pair logs both the SQL before execution and the type/value returned afterward.

#### Recall questions

1. What is available before execution?
2. What additional information is available afterward?
3. Why use the null-conditional operator on `result`?

### S-041 — NonQueryExecuted result

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override int NonQueryExecuted(
    DbCommand command,
    CommandExecutedEventData eventData,
    int result)
{
    Console.WriteLine(
        $"Rows affected: {result}");
    return result;
}
```

#### Study meaning

The post-execution non-query callback receives and can observe or replace the affected-row integer.

#### Recall questions

1. What does `result` represent?
2. What event-data type is used?
3. What should normally be returned?

### S-043 — Commands commonly handled as non-query

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Non-query interception is commonly relevant for:

- `UPDATE`;
- `DELETE`;
- `INSERT`.

#### Study meaning

These statements normally return affected-row count rather than a rowset or scalar data value.

#### Recall questions

1. Which three SQL statement types are listed?
2. What result shape do they usually return?

### S-045 — Reader, scalar, and non-query result-type comparison

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Examples of scalar `result`:

- `42`;
- `true`;
- `3.14m`;
- `"abc"`.

Difference from other command kinds:

- `ReaderExecuting` — commands returning rowsets; result type is `DbDataReader`;
- `ScalarExecuting` — one-value result; result type is `object`;
- `NonQueryExecuting` — INSERT/UPDATE/DELETE-style commands; result type is affected-row `int`.

#### Study meaning

The callback generic/result type is determined by the database execution shape.

#### Recall questions

1. What result type is used for rowsets?
2. Why is scalar result `object`?
3. What does non-query return?

### S-055 — Core DbCommand execution methods

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Main methods:

- `ExecuteNonQuery()` / `ExecuteNonQueryAsync()`:
  - executes commands such as INSERT, UPDATE, DELETE;
  - returns affected-row count.
- `ExecuteReader()` / `ExecuteReaderAsync()`:
  - executes a query returning rows;
  - returns a `DbDataReader`.
- `ExecuteScalar()` / `ExecuteScalarAsync()`:
  - returns the first column of the first row of the first result set;
  - everything else is ignored.
- `CreateParameter()` / `CreateDbParameter()`:
  - creates a new parameter object for the command.
- `Cancel()`:
  - attempts to cancel command execution.
- `Dispose()` / `DisposeAsync()`:
  - cleanup.

#### Study meaning

The ADO.NET command API explains why EF command interception has reader, scalar, and non-query callback families.

#### Recall questions

1. What exactly does ExecuteScalar return?
2. Which method returns `DbDataReader`?
3. Which methods are used for cleanup?
