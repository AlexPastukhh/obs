# SQL Server MARS — corrected source-by-source transcript v002

> Source-preserving correction transcript. Wording is normalized, but visible claims and code are retained.

## S-001 — What MARS practically allows

### Near-literal visible content

- Multiple Active Result Sets allows one SQL Server connection to have more than one active command/result set.
- A second query/reader may be opened before the first reader is fully consumed.
- A third reader may also be opened.
- The application/provider can read some rows from one result set, switch to another, and later continue the first result set.
- This is interleaving on one connection, not unrestricted parallel execution.

### Study takeaway

- This is interleaving on one connection, not unrestricted parallel execution.

## S-002 — Without MARS — visual flow

### Near-literal visible content

- Without MARS, one open reader blocks the next command on the same connection.
- EF or application code therefore often buffers an intermediate result set before issuing the next query.
- Conceptual flow: execute roots query, fully read roots into memory, close Reader 1, then execute later split queries.

### Visible code

```csharp
// One DB connection
// Step 1: execute query 1 (Blogs)
// Reader 1 is open
// Buffer roots: [Blog1, Blog2, Blog3]
// Reader 1 is closed before the next command
```

### Study takeaway

- Conceptual flow: execute roots query, fully read roots into memory, close Reader 1, then execute later split queries.

## S-003 — Buffered split-query continuation

### Near-literal visible content

- After roots are buffered, query 2 reads Posts and attaches them to the already buffered root entities.
- Query 3 reads Contributors and attaches them to those same roots.
- The database returns several result sets; EF correlates them into one object graph in memory.

### Visible code

```csharp
// Step 2: execute Posts query
// Reader 2 open
// map Post -> Blog by key

// Step 3: execute Contributors query
// Reader 3 open
// map Contributor -> Blog by key
```

### Study takeaway

- The database returns several result sets; EF correlates them into one object graph in memory.

## S-004 — Memory picture without MARS

### Near-literal visible content

- Client memory first contains a roots buffer: Blog1, Blog2, Blog3.
- While reading the Posts result, Blog1.Posts, Blog2.Posts, and Blog3.Posts are populated.
- Then the Contributors result is read and attached.
- Without MARS, EF commonly needs this staging/buffering step so it can issue the next split-query command.

### Study takeaway

- Without MARS, EF commonly needs this staging/buffering step so it can issue the next split-query command.

## S-005 — With MARS — visual flow

### Near-literal visible content

- With MARS, the same connection may keep Reader 1 for roots, Reader 2 for posts, and Reader 3 for contributors active/open.
- Reading is interleaved across the result sets.
- MARS removes some intermediate-buffering pressure, but does not turn one connection into three parallel connections.

### Study takeaway

- MARS removes some intermediate-buffering pressure, but does not turn one connection into three parallel connections.

## S-006 — One connection with three active readers

### Near-literal visible content

- Visual model: one DB connection with an active Blogs reader, active Posts reader, and active Contributors reader.
- The important word is active, not necessarily executing in parallel.

### Study takeaway

- The important word is active, not necessarily executing in parallel.

## S-007 — Possible interleaved reading order

### Near-literal visible content

- A conceptual order may read Blog1, then some posts for Blog1, then Blog2, then posts for Blog2, then contributors, and later continue earlier readers.
- This describes interleaved progress over multiple active result sets.
- SQL Server still controls where switching between statements is allowed.

### Study takeaway

- SQL Server still controls where switching between statements is allowed.

## S-008 — Memory picture with MARS

### Near-literal visible content

- Instead of fully buffering one result set before starting the next, EF can keep multiple result sets active and build the object graph while reading them.
- The final in-memory graph is still produced by matching keys and attaching children to roots.

### Study takeaway

- The final in-memory graph is still produced by matching keys and attaching children to roots.

## S-009 — How the object graph is built

### Near-literal visible content

- EF is not constructing one SQL row from pieces of three queries.
- It is constructing one object graph.
- Example final result: Blog entities contain Posts and Contributors collections.

### Visible code

```csharp
Blog1 {
    Posts: [PostA, PostB],
    Contributors: [ContributorA]
}

Blog2 {
    Posts: [PostC],
    Contributors: [ContributorB]
}
```

### Study takeaway

- Example final result: Blog entities contain Posts and Contributors collections.

## S-010 — Key correlation

### Near-literal visible content

- EF uses keys such as `BlogId` to connect rows from separate result sets into one in-memory graph.
- Several result sets are read, then EF correlates them into the final entity graph.

### Study takeaway

- Several result sets are read, then EF correlates them into the final entity graph.

## S-011 — How to enable MARS

### Near-literal visible content

- For SQL Server, enable MARS by adding `MultipleActiveResultSets=True` to the connection string.
- No separate EF Core package is normally required.
- It is a SQL Server provider feature used through `Microsoft.Data.SqlClient`; it is not a generic EF Core option.
- EF Core warns that savepoints are incompatible with MARS.

### Visible code

```csharp
Server=.;Database=AppDb;Trusted_Connection=True;MultipleActiveResultSets=True;
```

### Study takeaway

- EF Core warns that savepoints are incompatible with MARS.

## S-012 — Connection-string examples

### Near-literal visible content

- Windows-authentication and SQL-authentication connection strings can both include the MARS option.

### Visible code

```csharp
// Windows authentication
Server=.;Database=AppDb;Trusted_Connection=True;MultipleActiveResultSets=True;

// SQL authentication
Server=.;Database=AppDb;User Id=app;Password=secret;MultipleActiveResultSets=True;
```

### Study takeaway

- Windows-authentication and SQL-authentication connection strings can both include the MARS option.

## S-013 — SELECT

### Near-literal visible content

- `SELECT` is the normal SQL statement for returning rows from tables or views.
- It is a row-returning statement and therefore participates in MARS interleaving/yield behavior.

### Visible code

```csharp
SELECT BlogId, Name
FROM Blogs;
```

### Study takeaway

- It is a row-returning statement and therefore participates in MARS interleaving/yield behavior.

## S-014 — Why SELECT is a yield point

### Near-literal visible content

- Because SELECT returns rows to the client, SQL Server can interleave another MARS request while rows are being returned.
- Each row-returning phase is a possible point where interleaving can occur.

### Visible code

```csharp
SELECT BlogId
FROM Blogs;
```

### Study takeaway

- Each row-returning phase is a possible point where interleaving can occur.

## S-015 — FETCH

### Near-literal visible content

- `FETCH` is used with a SQL Server cursor.
- A cursor allows row-by-row traversal of a result set: declare the cursor, open it, fetch the next row, and eventually close it.
- SQL Server documentation treats FETCH as returning values from the cursor row.

### Study takeaway

- SQL Server documentation treats FETCH as returning values from the cursor row.

## S-016 — Cursor example

### Near-literal visible content

- Each `FETCH NEXT` obtains another row from the cursor result.
- That row-returning phase is an interleaving point under MARS.

### Visible code

```csharp
DECLARE c CURSOR FOR
SELECT Id, Name
FROM Person.Person;

OPEN c;

FETCH NEXT FROM c;
FETCH NEXT FROM c;
```

### Study takeaway

- That row-returning phase is an interleaving point under MARS.

## S-017 — Why FETCH is a yield point

### Near-literal visible content

- FETCH performs row-returning work incrementally rather than returning the whole query at once.
- Because it returns cursor-row data, another MARS request may be interleaved while the cursor is being consumed.

### Visible code

```csharp
FETCH NEXT FROM c INTO @id, @name;
```

### Study takeaway

- Because it returns cursor-row data, another MARS request may be interleaved while the cursor is being consumed.

## S-018 — RECEIVE

### Near-literal visible content

- `RECEIVE` belongs to SQL Server Service Broker.
- Service Broker is SQL Server's internal messaging/queueing system.
- Messages are stored in a queue; RECEIVE reads messages from the queue and returns them as a result set.

### Visible code

```csharp
RECEIVE TOP (1)
    conversation_handle,
    message_type_name,
    message_body
FROM dbo.MyQueue;
```

### Study takeaway

- Messages are stored in a queue; RECEIVE reads messages from the queue and returns them as a result set.

## S-019 — Why RECEIVE is a yield point

### Near-literal visible content

- RECEIVE returns rows/messages to the client.
- It therefore belongs to the same family of row/message-returning statements at which MARS may interleave another request.

### Visible code

```csharp
RECEIVE TOP (1) ...
RECEIVE NEXT ...
```

### Study takeaway

- It therefore belongs to the same family of row/message-returning statements at which MARS may interleave another request.

## S-020 — Savepoint rules with MARS

### Near-literal visible content

- EF Core does not create transaction savepoints when SQL Server MARS is enabled, even when the connection appears idle at that moment.
- MARS allows multiple active sessions/readers on one connection.
- That model does not combine safely with rollback-to-savepoint assumptions.
- MARS does not provide parallel transactions; SQL Server only interleaves eligible work on one connection.

### Study takeaway

- MARS does not provide parallel transactions; SQL Server only interleaves eligible work on one connection.

## S-021 — Why savepoints and MARS conflict

### Near-literal visible content

- A savepoint assumes a clean rollback marker inside a transaction.
- MARS allows multiple active requests and result sets on the same connection.
- If one request fails while other readers or commands are still active, it becomes unclear what rollback-to-savepoint means for all in-flight work.

### Study takeaway

- If one request fails while other readers or commands are still active, it becomes unclear what rollback-to-savepoint means for all in-flight work.

## S-022 — The messy transaction model

### Near-literal visible content

- Imagine one connection with an active transaction plus Reader A, Reader B, Reader C, and a new command.
- If something fails, `ROLLBACK TO savepoint` would have to coexist with active protocol streams and commands.
- This is why EF Core conservatively disables savepoint creation when MARS is enabled.

### Visible code

```csharp
Connection
  Transaction active
  Reader A active
  Reader B active
  Reader C active
  New command

Something fails
ROLLBACK TO X ?
```

### Study takeaway

- This is why EF Core conservatively disables savepoint creation when MARS is enabled.

## S-023 — The transaction question

### Near-literal visible content

- Which active reader owns the current logical position?
- What data has already been observed by each reader?
- Can EF safely claim that the transaction is at a known recoverable point?
- When those questions cannot be answered safely, savepoints are disabled.

### Study takeaway

- When those questions cannot be answered safely, savepoints are disabled.

## S-024 — What MARS changes—and what it does not

### Near-literal visible content

- Without MARS, the model is effectively one connection with one active request/result set at a time.
- With MARS, one connection may contain multiple active requests/result sets.
- Execution is interleaved, not truly parallel.
- Switching normally occurs around row-returning/yielding work such as SELECT, FETCH, and RECEIVE.

### Study takeaway

- Switching normally occurs around row-returning/yielding work such as SELECT, FETCH, and RECEIVE.

## S-025 — When MARS is less attractive

### Near-literal visible content

- MARS helps mainly when intermediate buffering is the problem.
- It may not improve a workload whose bottleneck is server CPU, a bad query plan, network latency, object materialization/tracking, or lock contention.
- Turning on MARS does not remove those costs.

### Study takeaway

- Turning on MARS does not remove those costs.

## S-026 — Other costs and limitations

### Near-literal visible content

- One MARS request can still block useful progress of another because interleaving is limited by statement and transaction rules.
- Do not use one MARS connection as a substitute for proper concurrent connections across threads; MARS operations are not thread-safe.
- Transaction savepoints are unavailable to EF Core while MARS is enabled.

### Study takeaway

- Transaction savepoints are unavailable to EF Core while MARS is enabled.
