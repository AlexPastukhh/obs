# EF Core raw SQL, FromSql, SqlQuery, ExecuteUpdate, and ExecuteDelete — source-preserving near-literal transcript

## Source identity

```text
uploaded source snapshot: dbset fromsql fromsqlraw fromsqlinterpolated and LINQ executeupdateasync and executedelete async,database.executesql executeraw,fromsqlquery(3).svg
SHA-256: 6cd7d851e1faf6da4ebadbdd509713f7a552b5b52769d44c084ccc10da70ab8d
Git blob verified in repository: 38a2d5583e5fda228cfcb9e511297aaf0c86a989
embedded image definitions: 51
image uses: 52
SVG text nodes: 19
```

## Transcription method and boundary

- One `S-XXX` block is retained for every embedded image use, in SVG use order.
- Text is transcribed at a near-literal level; spelling, whitespace, and punctuation are lightly normalized.
- Screenshot UI chrome, copy icons, language badges, and source-site footers are omitted.
- Prose blocks marked `high` were cleanly readable. Code/symbol-heavy blocks are marked `medium` and remain traceable to the exact embedded image hash.
- Interpretation is not substituted for visible source text.

## SVG canvas text nodes

- `T-001`: database.sqlquery for projections
- `T-002`: scalars and other nontracking nonentity
- `T-003`: results
- `T-004`: fromsql is for tracked entity
- `T-005`: result
- `T-006`: the real danger of not parameterised values included from
- `T-007`: user input into  sql
- `T-008`: sql injection
- `T-009`: raw vs interpolated
- `T-010`: dynamic sql parts + parameterised values
- `T-011`: type param is the
- `T-012`: type of item in a collection
- `T-013`: in a iqueryable
- `T-014`: executeupdate/
- `T-015`: executedelete
- `T-016`: bypassing chagetr
- `T-017`: simple poco muation
- `T-018`: setproperty
- `T-019`: cant call methods

## Source transcript

### S-001 — Can FromSqlInterpolated mutate anything?

Source image SHA-256: `edf4313f5bb1c8071c33e5af154852a27c66ec96072244f26ad620c959964146`
Dimensions: `708 × 91`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
1) Can FromSqlInterpolated mutate anything?
Not in the normal intended sense.
```

### S-002 — FromSqlInterpolated is a query API. It is for SQL that returns rows, and EF treats it as part of…

Source image SHA-256: `6cb3de333017b3c4da69a9f5752b67840256923d5318d74b7220a53149db75c1`
Dimensions: `834 × 591`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
FromSqlInterpolated is a query API. It is for SQL that returns rows, and EF treats it as part of a LINQ query
pipeline. The SQL is sent when you enumerate/materialize the query, such as with ToListAsync,
FirstAsync, or SingleAsync.It is not part of SaveChanges().
Example:
var users = await dbContext.Users
.FromSqlInterpolated($"SELECT * FROM Users WHERE IsActive = {true}")
.ToListAsync();
That is a read query.
Could you technically write SQL with side effects, like a stored procedure that updates something and also
returns rows? Sometimes a provider/database may allow that, but that is not what | FromSqlInterpolated is
for, and it is not a good design pattern for normal EF usage. For mutations, use:
- tracked entities + SaveChanges()
- Database.ExecuteSql...
.ExecuteUpdateAsync
.ExecuteDeleteAsync | wisosotam -2
So the practical answer is: treat FromSqlInterpolated as read-only query API.
```

### S-003 — Differences between ExecuteSql, ExecuteSqlRaw, ExecuteSqlInterpolated

Source image SHA-256: `c19bf28b65b3aeec19088b3d359760970b92141cd2372114f2f41f853ad52749`
Dimensions: `916 × 421`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
2) Differences between ExecuteSql, ExecuteSqlRaw, ExecuteSqlInterpolated
This is the newer convenience API. It executes SQL immediately and returns affected row count. It accepts a
SQL string with placeholders plus parameters. The docs list it alongside the raw/interpolated variants.

Conceptually:

var rows = await dbContext.Database.ExecuteSqlAsync(

$"UPDATE Users SET IsActive = {false} WHERE LastLogin < {cutoff}");

Depending on EF Core version, you'll mostly see people use ExecuteSqlInterpolated or ExecuteSqlRaw.
ExecuteSql is the modern simplified form shown in current docs/api listings.
```

### S-004 — Use this when you want to write an interpolated string and let EF turn interpolated values into …

Source image SHA-256: `23ecca28b6ebbc78f6064203d8b406722a1bdd1e6683eac73142cf112eae6ba7`
Dimensions: `810 × 351`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Use this when you want to write an interpolated string and let EF turn interpolated values into SQL
parameters safely.

var rows = await dbContext.Database..ExecuteSqlInterpolatedAsync(

$"UPDATE Users SET IsActive = {false} WHERE LastLogin < {cutoff}");
Here:
{false} and {cutoff} become parameters,
EF parameterizes them,
- safer against SQL injection. Microsoft tam -
```

### S-005 — Use this when you already have a raw SQL string and optionally separate parameters.

Source image SHA-256: `d6bbc4f4d70c19273d8bde158941b2e319f8636bd5444f081e206f02c61dc64b`
Dimensions: `805 × 287`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Use this when you already have a raw SQL string and optionally separate parameters.
var rows = await dbContext.Database.ExecuteSqlRawAsync(
"UPDATE Users SET IsActive = @p0 WHERE LastLogin < @p1",
false,
cutoff);
This is also safe if you pass values as separate parameters like above.
```

### S-006 — What is dangerous is building the SQL text yourself from user input

Source image SHA-256: `fcb279d2f906efd805acc989d409e3a74fa0de156023aa2dc52d784264321d79`
Dimensions: `825 × 421`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
What is dangerous is building the SQL text yourself from user input:
var sql = $"DELETE FROM Users WHERE Name = '{userInput}"";
await dbContext.Database.ExecuteSqlRawAsync(sql);
That is the classic SQL injection risk. EF docs explicitly warn that the Raw APIs can be vulnerable if used
improperly, while the interpolated APIs automatically parameterize values. Microsoft sam
- Prefer ExecuteSqlInterpolated when writing inline SQL with values.
- Use(ExecuteSqlRaw when you already have a fixed SQL string or need dynamic SQL text structure.
- Allof them execute immediately, are not part of SaveChanges(), and do not automatically start a
transaction. MicrosoftLeam ~
```

### S-007 — Differences between FromSqlInterpolated, FromSqlRaw, and Database.SqlQuery

Source image SHA-256: `00fd20f1c75f74036ff6bbde9de383e9fe7345eba490492263029583b994ba8a`
Dimensions: `813 × 577`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3) Differences between FromSqlInterpolated, FromSqlRaw, and Database.SqlQuery
Query API for entity types or mapped query results from a DbSet.Interpolated values are parameterized.
var blogs = await dbContext.Blogs
.FromSqlInterpolated($"SELECT * FROM Blogs WHERE AuthorId = {authorId}")
.ToListAsync();
EF docs say FromSql / FromSqlInterpolated are safe against SQL injection because they parameterize values.
Most lem ~
FromSqlRaw
Same idea, but raw string form.
var blogs = await dbContext.Blogs
.FromSqlRaw("SELECT * FROM Blogs WHERE AuthorId = {@}", authorId)
.ToListAsync();
Or with explicit DbParameter.
```

### S-008 — Good when

Source image SHA-256: `4b94770709b0580b1583221416057898c5af02f8a738d82d7ddca60e8ca9bc14`
Dimensions: `812 × 427`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Good when:

- you already have the SQL string,

- you need some dynamic SQL parts that cannot be parameterized as values.
But again, raw string concatenation is the risky part. Mcossttzan -

Current docs also have |FromSql, which can take interpolated placeholders and parameters and is basically
the modern unified query API form. You may see older code with FromSqlInterpolated and FromSqlRaw;
current docs show |FromSql prominently.

Database.SqlQuery
This is for scalar types or non-entity query results, instead of querying via a DbSet<TEntity>.It is a
database-level SQL query API, not tied to a tracked entity set. EF Core SQL query docs cover it for returning
types that are not normal entity queries.
```

### S-009 — Example idea

Source image SHA-256: `df9c3be68392c8389125cb4f09bae2e398f666741f3fc7fb3380fd420dc00b9a`
Dimensions: `816 × 517`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example idea:
var ids = await dbContext.Database
-SqlQuery<int>($"SELECT Id FROM Users WHERE IsActive = {true}")
.ToListAsync();
That is useful when you want:
- int
- string
- simple DTO-like unmapped result shapes supported by the provider/current EF version,
rather than full entities. The docs specifically discuss SQL queries returning scalar and non-entity results
through Database.SqlQuery<T>.Microsoft Lean
- FromSql... — starts from DbSet<TEntity>, used for entity-shaped queries.
- Database.SqlQuery<T> — query for non-entity/scalar results.
- Both are query APIs, so they run when materialized, not on SaveChanges(). wiccsottism
```

### S-010 — ExecuteUpdateAsync / ExecuteDeleteAsync

Source image SHA-256: `197fb08fabc56c56cd01e601b426f01bbe6684ca53e8b2d54c51f5815e66dd12`
Dimensions: `818 × 557`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
4) ExecuteUpdateAsync / ExecuteDeleteAsync
These are EF Core's set-based bulk update/delete APIs.
They:
- execute immediately,
- bypass the change tracker,
- do not require loading entities into memory,
- are not deferred until SaveChanges(). eosin
Example:
await dbContext.Employees
.Where(e => e.CompanyId -- companyId)
.ExecuteUpdateAsync(setters -> setters
.SetProperty(e => e-Salary, e -> e.Salary * 1.1m));
This becomes one SQL [UPDATE in the database. EF docs present this as a way to avoid loading/tracking
many entities just to update them. — Microsoft Learn ~
```

### S-011 — Example

Source image SHA-256: `df36a67e288fe506f6407eb784c8efc0d969a78c72b284889a16b53f2689f7d0`
Dimensions: `783 × 259`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example:
await dbContext.Sessions
.Where(s => s.ExpiresAt < DateTime.UtcNow)
.ExecuteDeleteAsync();
That becomes one SQL DELETE.Again, no entities are loaded/tracked first.
```

### S-012 — Why use them instead of raw SQL?

Source image SHA-256: `b117361db5e07fbb933521448cf98b1430508bbdb211db8283b213ed660ce615`
Dimensions: `800 × 288`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Why use them instead of raw SQL?
They are often nicer because:

- strongly typed,

_provider-translated by EF,

- less string SQL,

- _refactor-friendlier.
But they still have the same important property: they bypass change tracking. So if you already have
matching entities tracked in memory, those tracked instances can become stale/out of sync. EF docs warn
about this explicitly.
```

### S-013 — Example of stale tracking problem

Source image SHA-256: `ace6f790dff468d1091429d40241af42f8a9fdc38099791c67a5595d8b013a38`
Dimensions: `817 × 467`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example of stale tracking problem:
var employee = await dbContext.Employees.FirstAsync(e => e.Id == id);
await dbContext.Employees
.Where(e => e.Id == id)
.ExecuteUpdateAsync(s => s.SetProperty(e => e.Salary, e => e.Salary + 1002);
// employee.Salary in memory is still old unless reloaded
Use ExecuteUpdateAsync / ExecuteDeleteAsync when:
- the change applies to many rows,
you do not need entity-by-entity domain logic,
- you want one database statement,
- tracked entities are unnecessary.
```

### S-014 — FromSqlInterpolated / FromSqlRaw / Database.SqlQuery<T>

Source image SHA-256: `a5dbbc78887d2ea75672e44f221fc05a4d4fc46f8864161c7235a55bda8d05e9`
Dimensions: `804 × 415`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
- FromSqlInterpolated / FromSqlRaw / Database.SqlQuery<T>
— query APIs, run when enumerated/materialized. —
- ExecuteSql...
> raw command APIs, run immediately, return affected row count. — Microsoft Learn ~
- ExecuteUpdateAsyne / ExecuteDeleteAsync
— set-based update/delete APIs, run immediately, bypass tracker.
- tracked entity changes + SaveChanges()
> change-tracker workflow, deferred until save.
Two final practical rules:
1. Prefer interpolated EF APIs over raw-string concatenation for values.
2. if you mix immediate operations with tracked changes and they must succeed together, wrap them in
an explicit transaction. ExecuteSql... does not start one automatically.
```

### S-015 — What FromSql... returns vs what Database.SqlQuery... returns

Source image SHA-256: `4beeb28c5aa48f0f9054a947de7988450851efadc323a1794030b2eb779fb002`
Dimensions: `817 × 237`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1) What FromSql... returns vs what Database.SqlQuery... returns

FromSql..-

FromSqlInterpolated / FromSqlRaw return an IQueryable<TEntity> rooted at a DbSet<TEntity>.So they
are for entity-shaped queries. You start from a mapped entity set like dbContext.Blogs or
dbcontext.Users, and EF expects rows that map to that entity type. The docs say these APIs are called
directly on a DbSet and create a LINQ query from SQL.
```

### S-016 — Example

Source image SHA-256: `e4b49760706abae5cf35abde6f76a9a7718cf5ed309d6f55f1ff4cc125980eaf`
Dimensions: `824 × 510`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example:
var users = await dbContext.Users
-FromSqlInterpolated($"SELECT * FROM Users WHERE IsActive = {true}")
.ToListAsync();
What you get back:
- before enumeration: IQueryable<user>
- after ToListAsync(): List<User>
Another example with a stored proc returning entity rows:
var blogs = await dbContext.Blogs
.FromSqlRaw("EXEC dbo.GetPopularBlogs")
.ToListAsync();
That is still a query for Blog entities. EF docs also note you can compose LINQ on top when the provider
Supports it,
```

### S-017 — Database.SqlQuery..

Source image SHA-256: `605e7021349652c18174c40f6d76f6dc7b9db20709735b606fa5205bc581529c`
Dimensions: `846 × 430`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Database.SqlQuery..-
Database.SqlQuery<T> is for non-entity results, especially scalar types and other unmapped result shapes.
The SQL queries docs describe it as the API for returning scalar and non-entity types, rather than going
through a [DbSet<TEntity>.icou ean
Example returning scalars:
var ids = await dbContext.Database
-SqlQuery<int>($"SELECT Id FROM Users WHERE IsActive = {true}")
.ToListAsync();
What you get:
- before enumeration: a queryable SQL query of int
- after ToListAsync(): List<int>
```

### S-018 — Can it return more than one value?

Source image SHA-256: `96e35ba26ad39cc9e83c2d956d2b3fb19ba7ed1926914e64f50abc03229b14a5`
Dimensions: `494 × 84`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Can it return more than one value?
Yes.
```

### S-019 — One column

Source image SHA-256: `1eb90bdc259b0ebbb42988ebda2245d331764ea29cd1c6ab8c6fad3e36233878`
Dimensions: `854 × 671`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
One column:
var ids = await dbContext.Database
-SqlQuery<int>($"SELECT Id FROM Users")
.ToListAsync();
This gives List<int>.
Multi-column example
Multiple columns into a type:
public sealed class UserSummary
public int Id { gets sets }
public string Name { get; set; } = "";
var users = await dbContext.Database
-SqlQuery<UserSummary>($"""
SELECT Id, Name
WHERE IsActive = {true}
.ToListAsync(); Vv
```

### S-020 — This gives List<UserSummary>.

Source image SHA-256: `a083310c33e20664b6774877ccb06198c54020947f8bd5b3ead9e7ec7eefed9f`
Dimensions: `866 × 245`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
This gives List<UserSummary>.

So yes, it can return more than one value per row; then 'T is some shape that has matching members. That
falls under EF's "non-entity types" query support.

Can it map to some type?

Yes.

That is one of its main uses: map raw SQL results to a non-entity CLR type.
```

### S-021 — Typical targets

Source image SHA-256: `91895171c972cfe2202c9ca94dbc197360e2d6d238d6b61a16472993d8464571`
Dimensions: `873 × 650`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Typical targets:
- int
- string
- DateTime
- DTO/read model classes like UserSummary
- structs/records/classes for result projection
Example:
public sealed class SalesReportRow
public int RegionId { get; set; }
public decimal Total { get; set; }
public int OrderCount { get; sets }
var rows = await dbContext.Database
-SqlQuery<SalesReportRow>($"""
SELECT RegionId, SUM(Amount) AS Total, COUNT(*) AS OrderCount
.ToListAsync();
This is exactly the kind of thing Database.Sqlduery<T> is good for: report/query shapes that are not tracked
entities.
,
```

### S-022 — Can it map to an entity?

Source image SHA-256: `dcbd43a9508ae4912e914e49b0a2623f518e3d688242b664859aee9293170963`
Dimensions: `938 × 234`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Can it map to an entity?

Technically, you can use an entity CLR type as T, but that is not what Database.SqlQuery<T> is for.

For entities, EF Core's documented path is DbSet<TEntity>.FromSql(...), because SQL queries returning
entities or keyless entity types are supposed to go through the model. FromSqll is specifically for "regular
entity types or keyless entity types that are part of your model."

So:
```

### S-023 — FromSql($"SELECT * FROM Users WHERE IsActive = {true}")

Source image SHA-256: `13d947db2b1b2d0ce0fcb34f4d8b3d5450278e3e87e0f34793df5f58d724ad3b`
Dimensions: `825 × 364`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
var users = await dbContext.Users
-FromSql($"SELECT * FROM Users WHERE IsActive = {true}")
.ToListAsync();
Better non-entity way
var users = await dbContext.Database
-SqlQuery<UserSummary>($"SELECT Id, Name FROM Users WHERE IsActive = {true}")
.ToListAsync();
```

### S-024 — Use

Source image SHA-256: `9f2da57c590594611145e0d7a8c64d1c0be398666f7d3519f963c0fccd3816ea`
Dimensions: `844 × 352`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Use:

| FromSql.... when the result is an entity or keyless entity in your EF model.

Database.Sqlduery<T> when the result is a scalar or DTO/read-model/non-entity type. MicesotLeam

FromSql results participate in normal entity materialization rules, and if the query is tracking, those entities
can be tracked by the context.

Database SqlQuery<1> is for non-entity results, so think of it as query projection, not entity tracking. The
docs distinguish these two APIs exactly on that line: |FromSql_ for entity/keyless entity types in the model,
SqlQuery<T> for scalar/non-entity types.
```

### S-025 — dbset fromsq] returns entities that i can change and when i call

Source image SHA-256: `41bcd2c5ad2949d6e908973cfa8254429a726873607d21900a0859ad5fc1f36b`
Dimensions: `873 × 640`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
dbset fromsq] returns entities that i can change and when i call
savechanges - they will be updated in db or not?
Ayman Ha npotaxkenun 7s >
Yes—usually yes.
If(DbSet.FromSql... returns entity types and the query is tracking(the default), then those entities are
tracked by the [DbContext. If you modify them and then call SaveChanges(), EF Core will persist those
changes to the database, just like with a normal LINQ query. EF's docs say FromSql / FromSqlRaw follow the
same change-tracking rules as any other LINQ query, and queries returning entity types are tracked by
default; tracked changes are persisted by SaveChanges(). Micesst xan -2
Example:
var user = await dbContext.Users
-FromSql($"SELECT * FROM Users WHERE Id = {id}")
.SingleAsync();
user.Name = "New name";
await dbContext.SaveChangesAsync();
That update will be saved, because [user is a tracked entity. Mioosot sam -
```

### S-026 — When it will not update on SaveChanges()

Source image SHA-256: `b9282c883b5ed14020d74b359d0e15b538a680b325710798f9bb46fc72ba2384`
Dimensions: `943 × 564`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
When it will not update on SaveChanges():
- if you use AsNoTracking()
- if the result isn't an entity type
- if the entity is detached / from another context
- if your SQL shape doesn't produce something EF can track as a normal entity result. wiccsottesm 1
Example with no tracking:
var user = await dbContext.Users
-FromSql($"SELECT * FROM Users WHERE Id = {id}")
-AsNoTracking()
.SingleAsync();
user.Name = "New name";
await dbContext.SaveChangesAsync(); // nothing for this object
So the rule is:
FromSql + entity + tracking — yes, changes save
- FromSql + AsNoTracking() — no, not unless you attach/update manually —
'One subtle point: Fromsql itself is still a query API, not a write API. It only loads entities. The writing
happens later through normal change tracking and SaveChanges(). Mico Lesm -1
```

### S-027 — What can Raw do that interpolated methods can't, and why you may need it

Source image SHA-256: `6fa54d4f6395efacafda2b46c54652fa9b4a8d203b100c7c1c82f3c36effbe01`
Dimensions: `807 × 412`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
2) What can Raw do that interpolated methods can't, and why you may need it
The big difference is:

- interpolated APIs parameterize values

- raw APIs let you build SQL text dynamically
That matters because database parameters can only stand in for values, not for SQL structure such as:

- table names

- column names

- sort direction

- pieces of expressions

- whole clauses
EF's SQL query docs explicitly say databases do not allow parameterizing column names or other schema
parts, and for that scenario you must use the raw APIs like FromSqlRaw / SqlQueryRaw and construct the
SQL text yourself,
```

### S-028 — This works

Source image SHA-256: `edfc159a57027e288dc5e92a9fdc158997e3661118cdc0ecd1605a89a582c3de`
Dimensions: `804 × 255`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
This works:
var user = await dbContext.Users
-FromSqLinterpolated($"SELECT * FROM Users WHERE Id = {id}")
-SingleAsync();
because {id} is a value, and EF turns it into a parameter.
```

### S-029 — a a ad,

Source image SHA-256: `d51c3b7fc3aca95bc22c235eaf49ee214091ff66212b836e4206cad4d9e40196`
Dimensions: `842 × 312`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
a a ad,
But this does not work conceptually:
var columnName = "LastLogin";
var users = await dbContext.Users
-FromSqlInterpolated($"SELECT * FROM Users ORDER BY {columnNane}")
.ToListAsync();
because({columivame} would be treated as a parameter value, and SQL parameters cannot become
identifiers like a column name. The docs call this out directly for dynamic SQL.
```

### S-030 — Clear cases where you need Raw

Source image SHA-256: `143fa1c8e0d35b26402bff710e5aff591e10ae92dae6810074dbff5e731370e5`
Dimensions: `875 × 433`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Clear cases where you need Raw
Case 1: dynamic column name
User chooses which column to sort by.
var sortColumn = "LastLogin"; // must be validated from whitelist
var users = await dbContext.Users
.FromSqlRaw($"SELECT * FROM Users ORDER BY [{sortColumn}]")
.ToListAsync();
You need Raw because the column name is part of SQL syntax, not a parameter value. EF docs say this is
exactly the kind of situation where raw SQL is required.
But you must validate |sortcolumn yourself against a whitelist, because this is now SQL text construction.
```

### S-031 — Safer pattern

Source image SHA-256: `593f6847c5bc664bb735e8d35d9b49e4476b1f0b7ba912cb772f1f341c730212`
Dimensions: `871 × 360`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Safer pattern:
var sortColumn = requestedSort switch
"name" => "Name",
"lastLogin" => "LastLogin",
_ > throw new ArgumentException("Invalid sort column")
var users = avait dbContext.Users
.FromSqlRaw($"SELECT * FROM Users ORDER BY [{sortColumn}]")
.ToListAsync();
```

### S-032 — Case 2: dynamic table name

Source image SHA-256: `ba12e0fc744ef6d13c2ec89d3a64d773e94719dbd99265a49a01bc9e8c8507dc`
Dimensions: `848 × 387`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Case 2: dynamic table name
Maybe you have partitioned tables like Logs 2024, Logs 2025.
var tableName = "Logs 2025"; // validate this carefully
var logs = await dbContext.Database
-SqlQueryRaw<string>($"SELECT Message FROM [{tableName}]")
.ToListAsync();
Again, table name is SQL structure, so interpolated parameterization cannot do that. Raw is needed. The
docs' dynamic SQL guidance is the reason.
```

### S-033 — Case 3: dynamic ORDER BY direction / clause fragments

Source image SHA-256: `f359eef14b8f5b8e946ea8e659973cec8939ab7f878e841f301a0f6859d7a94c`
Dimensions: `836 × 310`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Case 3: dynamic ORDER BY direction / clause fragments
var direction = descending ? "DESC": "ASC";
var users = await dbContext.Users
.FromSqlRaw($"SELECT * FROM Users ORDER BY LastLogin {direction}")
.ToListAsync();
ASC / DESC are not parameter values. They are part of SQL text.
```

### S-034 — Case 4: building a query with optional SQL fragments

Source image SHA-256: `077bcf9d46845a0208104c008c45124cb9e78c908c5c52d6a0e13efa905d513a`
Dimensions: `842 × 437`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Case 4: building a query with optional SQL fragments
var sql = "SELECT * FROM Users WHERE 1=1";
if(onlyActive)
sql += " AND IsActive = 1";
if(hasEmail)
sql += " AND Email IS NOT NULL";
sql += " ORDER BY CreatedUtc DESC";
var users = await dbContext.Users
.FromSqlRaw(sql)
.ToListAsync();
You could often do this better with LINQ, but if you truly need dynamic SQL text, raw APIs exist for that.
```

### S-035 — Why you may need raw methods in practice

Source image SHA-256: `90274d31d38f94fde0272350c711a1028a3bcfd59635cd91723a8297f59770b3`
Dimensions: `885 × 272`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Why you may need raw methods in practice
You may need them when:
- the SQL structure itself is dynamic
you must inject validated identifiers
- you are building admin/reporting/query-builder features
- you have provider-specific SQL syntax that is easier to assemble manually
That is why docs say...Raw allows dynamic construction of SQL queries, while interpolated methods focus
'on safe parameterization of values. _MicesotLeam
```

### S-036 — "If user input is in a value and | add it in sqlinterpolated, why is it better?"

Source image SHA-256: `8166edeb498dd632a96526a9f7a363a72821c0969cc814ca4647e89f6fcabc8e`
Dimensions: `922 × 424`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1) "If user input is in a value and | add it in sqlinterpolated, why is it better?"
Because EF sends the user input as a database parameter, not as part of the SQL text. That is the main
benefit, and it is about correctness and security first, not just performance.
FromSql / FromSqlInterpolated are safe against SQL injection and always integrate parameter data as a
separate SQL parameter; ADO.NET docs say parameter input is treated as a literal value, not executable code.
Example with user input:
var userInput = "Alice' OR 1=1 --";
var users = await dbContext-Users
-FromSql($"SELECT * FROM Users WHERE Name = {userInput}")
.ToListAsync();
```

### S-037 — EF does not send this as

Source image SHA-256: `2f4ecd3c197d56c38c2ce3c162c3e731ebcc2dfa2dfe600a11326cb1531c7225`
Dimensions: `952 × 584`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
EF does not send this as:
SELECT * FROM Users WHERE Name = 'Alice' OR 1=1 --*

It sends something conceptually like:

SELECT * FROM Users WHERE Name = @p0
with a separate parameter:

@p0 = "Alice" OR 1=1 --" aq
So the database searches for that exact string value; it does not execute OR 1=1 as SQL. That is why it is
better.
It also helps with:

correct data typing(DbParameter, not stringly SQL),
- escaping/quoting handled by the provider,
- often better plan reuse. But the big reason is still: the value stays data, not code. Micwotlean
```

### S-038 — If the SQL shape itself is dynamic, interpolation does not help with that. Parameters can repres…

Source image SHA-256: `db5d400ee603a9fd8acaed5b493f296e39361ada6a1635a22de80ba6ba860f5d`
Dimensions: `875 × 284`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
If the SQL shape itself is dynamic, interpolation does not help with that. Parameters can represent values, but
not SQL identifiers or syntax such as:

- table names

- column names

- ASC / DESC

- arbitrary WHERE fragments
That is why raw APIs still exist. EF's docs explicitly say databases do not allow parameterizing column names
or other schema elements. cess team
```

### S-039 — But with Raw, you can still parameterize safely

Source image SHA-256: `6b7b38808e7c351637bb6446caf6eecf093f65e6a0e065cadfd57f6155515309`
Dimensions: `853 × 536`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
But with Raw, you can still parameterize safely
Raw does not mean "must inline values." The raw APIs also allow placeholders plus separate arguments, and
EF will convert those arguments to [DbParameters. The docs explicitly say FromSqlRaw supports parameter
placeholders in the SQL string with values supplied separately. Mezosittean 1
Safe raw example:
var users = await dbContext.Users
.FromSqlRaw("SELECT * FROM Users WHERE Name = {0}", userInput)
.ToListAsync();
or:
var rows = await dbContext.Database.ExecuteSqlRawAsync(
"UPDATE Users SET IsActive = @p0 WHERE LastLogin < @p1",
false,
cutoff);
These are still parameterized. coset team
```

### S-040 — SELECT * FROM Users WHERE 1=1 @p0

Source image SHA-256: `5a67248e8bb59d2c7fad4fc0b5b5c66f4d287be23acb24d98ba145a08af949ec`
Dimensions: `839 × 166`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
SELECT * FROM Users WHERE 1=1 @p0
which is invalid SQL. Parameters stand for values, not SQL syntax. That is exactly the limitation described in
the docs.
```

### S-041 — Can FormattableString help here?

Source image SHA-256: `8dd654a11faaf3953ca5adb44bf6bcd24ae592f9e2318f5d110671d376e89e35`
Dimensions: `898 × 504`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Can FormattableString help here?
Sometimes, but only if the dynamic part is still just values, not SQL syntax.
For example, this is fine:
FormattableString sql =
$°SELECT * FROM Users WHERE Name = {name} AND Age >= {minAge}";
Because name and minAge are values, EF can parameterize them. FromSql / FromSqlInterpolated are
designed for this and treat interpolated values as separate SQL parameters.
But this is not what FormattableString solves:
var whereClause = onlyActive ? * AND IsActive = 1": "";
FormattableString sql = $"SELECT * FROM Users WHERE 1=1 {whereClause}";
Why? Because whereClause is not a value for SQL comparison; it is a chunk of SQL text. If EF parameterized
it. it would become something like:
```

### S-042 — That is a good pattern

Source image SHA-256: `65f637b3c1f7bf9fb03c1d63a65d8b04236d0efaa04b9490a5b76364120b1e76`
Dimensions: `790 × 184`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
That is a good pattern:

- SQL fragments are built dynamically in the string

- actual user/data values are passed separately as parameters

FromSqlRaw supports exactly this: placeholders in the SQL plus separate arguments, which EF sends as
database parameters. wizosofttsam ~
```

### S-043 — Example: dynamic fragments + parameterized values

Source image SHA-256: `e45fed0a777bdca1c8dcfbe16f908c8e7d283208b74b95e6f0fb06c3c251899c`
Dimensions: `796 × 555`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example: dynamic fragments + parameterized values
Suppose you add an optional name filter:
var sql = "SELECT * FROM Users WHERE 1=1";
var args = new List<object>();
if(onlyActive)
sql += " AND IsActive = 1";
if(hasEmail)
sql += " AND Email IS NOT NULL";
if(!string.IsNullOrWhiteSpace(name))
sql += " AND Name = {0}";
args.Add(name);
sql += " ORDER BY CreatedUtc DESC";
var users = await dbContext.Users
.FromSqlRaw(sql, args.ToArray())
.ToListAsync();
```

### S-044 — FromSqlInterpolated / FromSqlRaw / Database.SqlQuery<T>

Source image SHA-256: `a5dbbc78887d2ea75672e44f221fc05a4d4fc46f8864161c7235a55bda8d05e9`
Dimensions: `804 × 415`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
- FromSqlInterpolated / FromSqlRaw / Database.SqlQuery<T>
— query APIs, run when enumerated/materialized. —
- ExecuteSql...
> raw command APIs, run immediately, return affected row count. — Microsoft Learn ~
- ExecuteUpdateAsyne / ExecuteDeleteAsync
— set-based update/delete APIs, run immediately, bypass tracker.
- tracked entity changes + SaveChanges()
> change-tracker workflow, deferred until save.
Two final practical rules:
1. Prefer interpolated EF APIs over raw-string concatenation for values.
2. if you mix immediate operations with tracked changes and they must succeed together, wrap them in
an explicit transaction. ExecuteSql... does not start one automatically.
```

### S-045 — a a A, ae

Source image SHA-256: `f76c75ceec03497dc2d786d9e9907bc5b14464a4b05a91049905dd01627d21dc`
Dimensions: `1055 × 413`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
a a A, ae
1. Yes. ExecuteUpdateAsync / ExecuteDeleteAsync are for set-based DB operations. They avoid loading a
bunch of rows into memory, avoid tracking them, and avoid then calling SaveChangesAsync.So instead
of "query entities + modify/delete in app > save", EF sends an UPDATE or DELETE directly to the
database. be this as a single roundtrip without loading the data or using
change tracking. Merosot tem
2. Yes. They bypass the change tracker. If you already loaded/tracked entities, then call
ExecuteUpdateAsync or ExecuteDeleteAsync, the in-memory entities are not automatically updated or
detached. So your app's tracked objects can become stale compared to the DB. The docs even warn
that mixing tracked 'SaveChanges updates with Executelpdate / ExecuteDelete is usually a bad idea.
3. Yes. They execute immediately. They are not queued until SaveChangesAsync.Also, multiple
ExecuteUpdateAsync / ExecuteDeleteAsync Calls are not automatically grouped into one unit of work,
so if you need atomicity across multiple operations, use an explicit transaction. — Micesor team
```

### S-046 — Mostly yes, with nuance. They are great for simple, set-based changes like

Source image SHA-256: `154f01ccce64d6abd13699e633c77e421e5bf02dc319412c5dedb527917d676e`
Dimensions: `1122 × 237`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
4. Mostly yes, with nuance. They are great for simple, set-based changes like:
await db.Users
.Where(x => !x.IsActive)
.ExecuteUpdateAsync(s => s
.SetProperty(x => x.Status, UserStatus Disabled)
.SetProperty(x => x-UpdatedAt, DateTime.UtcNow));
```

### S-047 — But they do not call your entity methods, domain methods, validation logic, domain events, or in…

Source image SHA-256: `1b54516d3258933a58d1b6f8f607c54d7bc80d58ad86947528800e34dac6a95c`
Dimensions: `1032 × 397`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
But they do not call your entity methods, domain methods, validation logic, domain events, or invariants in
memory. You must express the update as SQL-translatable SetProperty expressions. EF also has translation
limitations, for example around navigations inside 'SetProperty.
So for rich domain models, your instinct is right:
userDisable(reason);
user.ChangeEmail(newEmail);
order.Cancel(policy, clock);
Those methods protect invariants, raise events, update multiple fields consistently, etc. ExecuteUpdateAsyne
cannot "run" those methods per entity in the database. It only sends SQL.
```

### S-048 — A good rule of thumb

Source image SHA-256: `3994c3fe50a4270de204c25b30ee7a19cf87d621fc9b0cf44f7c8697e44b1752`
Dimensions: `967 × 261`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
A good rule of thumb:

Use tracked entities + domain methods + SaveChanges when business rules/invariants matter.

Use ExecuteUpdate/Delete when the operation is simple, set-based, and you are confident the SQL
expression itself preserves the rules.

Example: "mark all expired sessions as revoked" is a good fit. "cancel all unpaid orders and run cancellation
policy, refund logic, domain events, inventory restoration" is probably not.
```

### S-049 — SetProperty is the EF Core API you use inside ExecuteUpdateAsync to describe which column should…

Source image SHA-256: `d7eb5958506e8db2e71c872b358337ed20b8700fd32d4c2fd366bdf5016cccec`
Dimensions: `936 × 568`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
SetProperty is the EF Core API you use inside ExecuteUpdateAsync to describe which column should be
updated and what value it should get.
You are not setting a normal G# object property here:
user.Name = "Bob"; // normal in-memory entity update
With ExecuteUpdateAsync, there is no user object in memory. EF is building SQL, so you write:
await db.Users
.Where(u => u.Id == userId)
.ExecuteUpdateAsync(setters => setters
.SetProperty(u => u.Name, "Bob"));
Think of it as saying:
For every User matching this query, set the Name column to "Bob".
```

### S-050 — This deletes rows directly in the database. No fetch, no tracking, no SaveChangesAsync

Source image SHA-256: `a5d54ead81441ae4e16151222315b62ebec3bcafe811a8735d8de00e7b2c64ca`
Dimensions: `1000 × 627`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
This deletes rows directly in the database. No fetch, no tracking, no SaveChangesAsync -
await db.Sessions
.Where(s => s.ExpiresAt < DateTime.UtcNow)
.ExecuteDeleteAsync();
SQL-ish:
WHERE ExpiresAt < @now;
Another example:
await db.Notifications
.Where(n => n.UserId == userId && n-IsRead)
.ExecuteDeleteAsync();
```

### S-051 — With ExecuteUpdateAsync

Source image SHA-256: `b37992b0d483e3ae3a2e6588d207026c95a6fb51f5bacce9acb40000412db406`
Dimensions: `929 × 261`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
With ExecuteUpdateAsync:
await db.Users
slhere(u => !u.IsActive)
.ExecuteUpdateAsync(setters => setters
.SetProperty(u => u.Status, UserStatus.Deactivated)
.SetProperty(u => u.DeactivatedAt, DateTime.UtcNow));
```

### S-052 — You cannot do this

Source image SHA-256: `62e83e89d879d7cd61843c7e9d378992faa36cc0ec88702662be9637eb7ca888`
Dimensions: `1016 × 278`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
You cannot do this:
await db.Users
.Where(u => !u.IsActive)
.ExecuteUpdateAsync(setters => setters
.SetProperty(u => u.Deactivate())); // not how it works
Because Deactivate() is C# domain logic. EF needs SQL-translatable expressions.
```

## Closure

```text
image uses transcribed: 52 / 52
SVG text nodes indexed: 19 / 19
semantic-only regional summary used as authoritative transcript: no
source reconstruction required: no
```
