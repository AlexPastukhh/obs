# ADO.NET command execution, parameters, and row mapping

Knowledge ID: `dotnet.ado-net-command-execution-and-row-mapping`

Topic: `dotnet`

Choose execution by result shape:

```text
ExecuteReader   -> rows
ExecuteScalar   -> first column of the first row
ExecuteNonQuery -> affected-row count / no result set
```

For one or many rows, execute a reader and call `ReadAsync`; use one read for an optional single row and a loop for many. `ExecuteScalarAsync` fits `COUNT(*)`, a maximum ID, setting, or computed scalar. `ExecuteNonQueryAsync` fits insert/update/delete/DDL where affected rows matter.

Always parameterize untrusted input. `AddWithValue` is not forbidden, but explicit type and size give clearer control over database type, length, conversion behavior, and sometimes plan stability:

```csharp
cmd.Parameters.Add("@email", SqlDbType.NVarChar, 256).Value = email;
```

For stored procedures, set the procedure name as `CommandText`, set `CommandType.StoredProcedure`, add parameters, and choose execution by its result shape; procedure conventions remain provider-specific.

## Typed mapping and database null

Resolve column names with `GetOrdinal`, preferably once before a hot loop, then use typed getters such as `GetInt32`, `GetString`, and `GetDateTime`. `GetOrdinal` first tries case-sensitive lookup and then case-insensitive lookup.

ADO.NET database null is `DBNull`, distinct from a CLR null reference in the reader API. Check `IsDBNull`/`IsDBNullAsync` before calling a typed getter:

```csharp
int displayNameOrd = reader.GetOrdinal("DisplayName");
string? displayName =
    await reader.IsDBNullAsync(displayNameOrd, ct)
        ? null
        : reader.GetString(displayNameOrd);
```

A repository operation should create/open late, parameterize, execute asynchronously with cancellation, cache ordinals, return `null` when no optional row exists, handle `DBNull`, and promptly dispose reader/command/connection.

## What should be recallable

- How reader, scalar, and non-query execution differ and how single-row/many-row flows work.
- Why parameters are mandatory for untrusted input and when explicit metadata improves on inference.
- Stored-procedure setup, ordinal caching, typed getters, and the `DBNull` check sequence.

## Sources

- Workspace: `_ai-conspects/rawconnections,dbconnection,sqlconnection,commands/`
- Processed source: `04-detailed-near-literal-transcript-v002.md`, sections 6, 9–14, 16–19
- Original SVG: `source/rawconnections,dbconnection,sqlconnection,commands.svg`
