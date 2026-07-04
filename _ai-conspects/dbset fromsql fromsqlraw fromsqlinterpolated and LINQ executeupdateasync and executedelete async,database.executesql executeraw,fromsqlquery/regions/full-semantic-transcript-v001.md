# EF Core FromSql, SqlQuery, ExecuteSql, ExecuteUpdate, and ExecuteDelete

## Purpose

This transcript preserves the complete meaning of the source: which APIs are queries, which execute
immediately, which results are tracked, how parameterization works, when raw SQL is necessary, and how
set-based updates interact with the change tracker and domain logic.

## Source coverage

```text
Source SVG SHA-256: 6cd7d851e1faf6da4ebadbdd509713f7a552b5b52769d44c084ccc10da70ab8d
Repository source Git blob: 38a2d5583e5fda228cfcb9e511297aaf0c86a989
Image uses covered: 52 / 52
Unique embedded images: 51
Duplicate placement: 1
SVG text nodes reviewed: 19 / 19
```

Coverage map:

```text
S-001..S-014   query APIs, command APIs, set-based DML, immediate execution
S-015..S-026   entity results, non-entity results, tracking and SaveChanges
S-027..S-043   interpolated values, raw SQL structure, safe dynamic SQL
S-044..S-052   final taxonomy, ExecuteUpdate/Delete, SetProperty, domain rules
```

## 1. The four execution models

The APIs in this conspect belong to four different execution models.

### Query APIs

- `DbSet<TEntity>.FromSql(...)`
- `FromSqlInterpolated(...)`
- `FromSqlRaw(...)`
- `Database.SqlQuery<T>(...)`
- raw variants for non-entity SQL queries

They create queryable results and execute when enumerated or materialized with operations such as
`ToListAsync`, `SingleAsync`, or `FirstAsync`.

### Immediate SQL command APIs

- `Database.ExecuteSql(...)`
- `ExecuteSqlInterpolatedAsync(...)`
- `ExecuteSqlRawAsync(...)`

They execute immediately and return the number of affected rows. They are not queued for a later
`SaveChanges`.

### Immediate set-based DML

- `ExecuteUpdateAsync`
- `ExecuteDeleteAsync`

They translate a LINQ filter and update/delete description into an immediate SQL statement. They do not load
entities and do not wait for `SaveChanges`.

### Change-tracker workflow

A normal entity query loads and tracks entities. Application code modifies in-memory objects, and
`SaveChanges` later produces SQL for those tracked changes.

Keeping these four models separate prevents most confusion in this area.

## 2. FromSql is a query API, not a mutation API

`FromSql`, `FromSqlInterpolated`, and `FromSqlRaw` are designed to return rows. They are part of a LINQ
query pipeline:

```csharp
var users = await db.Users
    .FromSql($"SELECT * FROM Users WHERE IsActive = {true}")
    .ToListAsync();
```

The SQL executes when the query is materialized. It is not registered for execution by `SaveChanges`.

A database can technically expose stored procedures or statements that both change data and return rows, but
using `FromSql` as a hidden mutation mechanism is outside its normal design and makes application behavior
hard to reason about. Use an explicit command API or tracked entities for writes.

## 3. FromSql entity results and tracking

`DbSet<TEntity>.FromSql(...)` starts from a mapped entity set. The returned query is entity-shaped and follows
normal EF query tracking rules.

By default, entity results are tracked. Therefore changes to a returned entity can be persisted:

```csharp
var user = await db.Users
    .FromSql($"SELECT * FROM Users WHERE Id = {id}")
    .SingleAsync();

user.Name = "New name";
await db.SaveChangesAsync();
```

This works because `FromSql` loaded a tracked `User`; the later update is ordinary change-tracker behavior.
`FromSql` itself still performed only the read.

Changes are not automatically saved when:

- `AsNoTracking()` was used;
- the result is not an entity from the model;
- the entity is detached or belongs to another context;
- the SQL result cannot be materialized as a normal tracked entity shape.

Keyless entity types can also be queried through model-based SQL APIs, but their tracking/update behavior
depends on their model role and keylessness.

## 4. Database.SqlQuery<T> for scalar and non-entity results

`Database.SqlQuery<T>` is intended for SQL results that are not normal tracked entities. Common result types
include:

- `int`, `string`, `DateTime`, and other scalars;
- DTOs;
- report rows;
- read-model classes, records, or structs.

Scalar example:

```csharp
List<int> ids = await db.Database
    .SqlQuery<int>($"SELECT Id AS Value FROM Users WHERE IsActive = {true}")
    .ToListAsync();
```

Multi-column example:

```csharp
public sealed class UserSummary
{
    public int Id { get; init; }
    public string Name { get; init; } = "";
}

List<UserSummary> users = await db.Database
    .SqlQuery<UserSummary>(
        $"SELECT Id, Name FROM Users WHERE IsActive = {true}")
    .ToListAsync();
```

The exact column alias requirements can depend on composition and EF version, but the semantic distinction is
stable:

- use `DbSet<TEntity>.FromSql` for entity or keyless-entity results in the EF model;
- use `Database.SqlQuery<T>` for scalar, DTO, report, and other non-entity results.

A non-entity result is a projection. Modifying it does not make `SaveChanges` update a table.

## 5. Interpolated SQL parameterizes values

Interpolated EF SQL APIs accept a `FormattableString`. Interpolated expressions become database parameters
rather than being concatenated into SQL text.

Example:

```csharp
string userInput = "Alice' OR 1=1 --";

var users = await db.Users
    .FromSql($"SELECT * FROM Users WHERE Name = {userInput}")
    .ToListAsync();
```

Conceptually the provider sends:

```sql
SELECT * FROM Users WHERE Name = @p0
```

with `@p0` containing the complete input value. The database treats it as data, not executable SQL syntax.

Benefits include:

- protection against SQL injection for values;
- provider-correct quoting and type conversion;
- `DbParameter` type information;
- often better plan reuse.

The same principle applies to interpolated command APIs:

```csharp
int rows = await db.Database.ExecuteSqlInterpolatedAsync(
    $"UPDATE Users SET IsActive = {false} WHERE LastLogin < {cutoff}");
```

## 6. Raw APIs are not automatically unsafe

Raw APIs accept SQL text. They are required when the SQL structure itself must be constructed dynamically.
They can still parameterize values safely:

```csharp
var users = await db.Users
    .FromSqlRaw(
        "SELECT * FROM Users WHERE Name = {0}",
        userInput)
    .ToListAsync();
```

or:

```csharp
int rows = await db.Database.ExecuteSqlRawAsync(
    "UPDATE Users SET IsActive = @p0 WHERE LastLogin < @p1",
    false,
    cutoff);
```

The unsafe pattern is inserting untrusted input directly into SQL text:

```csharp
string sql =
    $"DELETE FROM Users WHERE Name = '{userInput}'"; // unsafe

await db.Database.ExecuteSqlRawAsync(sql);
```

"Raw" means the application controls the SQL text. It does not mean that all data values must be inlined.

## 7. Parameters can represent values, not SQL grammar

Database parameters cannot stand for:

- table names;
- column names;
- `ASC` or `DESC`;
- operators;
- complete `WHERE` fragments;
- arbitrary clauses or expressions.

This does not work as intended:

```csharp
string columnName = "LastLogin";

db.Users.FromSql(
    $"SELECT * FROM Users ORDER BY {columnName}");
```

The expression becomes a parameter value, not an identifier.

When SQL structure must vary, construct only trusted or validated fragments and continue to pass data values
as parameters.

## 8. Safe dynamic SQL structure

### Dynamic column

Map external input to a fixed whitelist:

```csharp
string sortColumn = requestedSort switch
{
    "name" => "Name",
    "lastLogin" => "LastLogin",
    _ => throw new ArgumentException("Invalid sort column")
};

string sql =
    $"SELECT * FROM Users ORDER BY [{sortColumn}]";

var users = await db.Users.FromSqlRaw(sql).ToListAsync();
```

The SQL identifier is selected from application-controlled constants. Do not copy an arbitrary request value
into the identifier position.

### Dynamic sort direction

Choose between fixed tokens:

```csharp
string direction = descending ? "DESC" : "ASC";
```

### Dynamic table

Dynamic table selection requires equally strict validation, such as mapping a known partition identifier to a
known table name.

### Optional fragments plus parameterized values

```csharp
var sql = new StringBuilder(
    "SELECT * FROM Users WHERE 1 = 1");

var parameters = new List<object>();

if (onlyActive)
    sql.Append(" AND IsActive = 1");

if (hasEmail)
    sql.Append(" AND Email IS NOT NULL");

if (!string.IsNullOrWhiteSpace(name))
{
    sql.Append($" AND Name = {{{parameters.Count}}}");
    parameters.Add(name);
}

sql.Append(" ORDER BY CreatedUtc DESC");

var users = await db.Users
    .FromSqlRaw(sql.ToString(), parameters.ToArray())
    .ToListAsync();
```

The structure is built by trusted application logic. User data remains in separate parameters.

Often a dynamic query is easier and safer to express with ordinary LINQ. Raw SQL is justified when the SQL
shape genuinely cannot be represented conveniently through the provider's LINQ translation.

## 9. FormattableString does not turn SQL fragments into grammar

`FormattableString` helps when interpolated expressions are values:

```csharp
FormattableString query =
    $"SELECT * FROM Users WHERE Name = {name} AND Age >= {minAge}";
```

It does not solve dynamic SQL fragments:

```csharp
string clause = "AND IsActive = 1";
FormattableString query =
    $"SELECT * FROM Users WHERE 1 = 1 {clause}";
```

The clause would be parameterized as a value, not inserted as SQL grammar. To build grammar, use validated
raw fragments and separate parameters for values.

## 10. Immediate command APIs and transactions

`ExecuteSql...` runs immediately and returns an affected-row count. It is not part of the change tracker and
does not automatically wait for `SaveChanges`.

Several immediate commands are not automatically one atomic unit. If multiple immediate operations and
tracked changes must succeed or fail together, create an explicit transaction.

## 11. ExecuteUpdateAsync and ExecuteDeleteAsync

These APIs perform set-based database work without materializing entities.

Update example:

```csharp
await db.Employees
    .Where(x => x.CompanyId == companyId)
    .ExecuteUpdateAsync(setters => setters
        .SetProperty(
            x => x.Salary,
            x => x.Salary * 1.10m));
```

Delete example:

```csharp
await db.Sessions
    .Where(x => x.ExpiresAt < DateTime.UtcNow)
    .ExecuteDeleteAsync();
```

Properties:

- execute immediately;
- normally produce one SQL `UPDATE` or `DELETE`;
- avoid loading rows into application memory;
- bypass the change tracker;
- do not require `SaveChanges`;
- are useful for simple changes across many rows.

## 12. SetProperty describes SQL, not an in-memory mutation

Inside `ExecuteUpdateAsync`, `SetProperty` describes the target column and a SQL-translatable value:

```csharp
await db.Users
    .Where(x => !x.IsActive)
    .ExecuteUpdateAsync(setters => setters
        .SetProperty(x => x.Status, UserStatus.Deactivated)
        .SetProperty(x => x.DeactivatedAt, DateTime.UtcNow));
```

There is no `User` instance on which arbitrary C# code is being executed. This is invalid conceptually:

```csharp
.SetProperty(x => x.Deactivate())
```

A domain method is application logic, not a column/value expression that EF can translate into SQL.

## 13. Change-tracker staleness

If an entity is already tracked and a set-based update changes its row directly, the in-memory object is not
automatically refreshed:

```csharp
var employee = await db.Employees.FindAsync(id);

await db.Employees
    .Where(x => x.Id == id)
    .ExecuteUpdateAsync(setters => setters
        .SetProperty(x => x.Salary, x => x.Salary + 100));

// employee.Salary still contains the old value
```

The application may need to reload the entity, clear tracking, or avoid mixing tracked and set-based changes
in the same workflow.

Similarly, `ExecuteDeleteAsync` does not automatically detach a matching tracked entity.

## 14. Domain rules and set-based DML

Set-based DML does not invoke:

- entity methods;
- validation implemented in entity code;
- domain invariants;
- domain events;
- per-entity policy checks;
- application-side side effects.

Use tracked entities, domain methods, and `SaveChanges` when business behavior must run for each aggregate:

```csharp
order.Cancel(policy, clock);
await db.SaveChangesAsync();
```

Use `ExecuteUpdateAsync` or `ExecuteDeleteAsync` when the change is simple, set-based, and completely
described by the translated database expression.

Good fit:

- revoke all expired sessions;
- mark old notifications as archived;
- increment a simple column across a filtered set.

Poor fit without additional design:

- cancel orders while issuing refunds, restoring inventory, raising events, and enforcing per-order rules.

## Review summary

- `FromSql` and `SqlQuery` are deferred query APIs.
- `ExecuteSql`, `ExecuteUpdateAsync`, and `ExecuteDeleteAsync` execute immediately.
- Tracked entity results from `FromSql` can later be updated by `SaveChanges`.
- `SqlQuery<T>` is primarily for scalar and non-entity projection results.
- Interpolated values are parameterized and remain data.
- Raw SQL is necessary for dynamic grammar but requires validation of identifiers and fragments.
- Raw APIs can and should still parameterize user values.
- Set-based DML bypasses tracking and domain methods.
- Use an explicit transaction when several immediate and tracked operations must form one atomic unit.
