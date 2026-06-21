# CTXDB01 - DatabaseFacade methods / connectivity / ensure-created-deleted / migrations

Conspect: `ef-core-context-database-transaction-object-savechanges-dbconnection-dbtransaction`<br>
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 09:21:18 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- DbContext.Database is a DatabaseFacade, EF's API surface for database-level operations.
- CanConnect is a reachability probe; it does not validate migrations, table existence, or schema correctness.
- EnsureCreated/EnsureDeleted are useful for throwaway scenarios, tests, prototypes, or non-migrations workflows.
- EnsureCreated does not use migrations and should not be used for databases that will later be evolved by migrations.
- Migrate/MigrateAsync applies pending migrations and may create the database.
- GetPendingMigrations/GetAppliedMigrations/GetMigrations are inspection methods and do not mutate the database.
- HasPendingModelChanges detects model changes not represented by a migration.

Reading quality:
```text
Overall: high.
Visible continuation fragments are explicitly marked in source metadata when present.
Confidence: high for concepts and boundary; medium-high for continuation fragments.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-001, S-003, S-005, S-010, S-014, S-016, S-019, S-024, S-034, S-038, S-044, S-046, S-048, S-049, S-051, S-058, S-059
```

Boundary decision:
```text
CTXDB01 covers DatabaseFacade connectivity, EnsureCreated/Deleted, migrations, migration inspection, and model-change detection.
It does not cover transaction behavior except where DatabaseFacade API surface is named.
```

Pending after this region:
```text
CTXDB03, CTXDB04, CTXDB05, CTXDB06, CTXDB07
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CTXDB01-S001 | S-001 | IU-001 | `86922be1d4` | CTXDB01A | `verified-from-source-image` | no | CanConnect usage overview |
| CTXDB01-S002 | S-003 | IU-003 | `5a3a2852a4` | CTXDB01A | `verified-from-source-image` | no | CanConnect meaning / use / not use |
| CTXDB01-S003 | S-005 | IU-005 | `6228547cf6` | CTXDB01A | `verified-from-source-image` | no | CanConnect app startup health check |
| CTXDB01-S004 | S-010 | IU-010 | `6ab5135f8f` | CTXDB01A | `verified-from-source-image` | no | CanConnect readiness endpoint |
| CTXDB01-S005 | S-014 | IU-014 | `a25597376b` | CTXDB01A | `verified-from-source-image` | no | EnsureCreated meaning and behavior |
| CTXDB01-S006 | S-016 | IU-016 | `86a6d029f3` | CTXDB01B | `verified-from-source-image` | no | CanConnect troubleshooting config issues |
| CTXDB01-S007 | S-019 | IU-019 | `d8a7a3ccc7` | CTXDB01A | `verified-from-source-image` | no | EnsureCreated warning and fit |
| CTXDB01-S008 | S-024 | IU-024 | `a1be321ab2` | CTXDB01A | `verified-from-source-image` | no | EnsureDeleted meaning and use |
| CTXDB01-S009 | S-034 | IU-034 | `70a5cc9c2c` | CTXDB01B | `verified-from-source-image` | no | Migrate / MigrateAsync |
| CTXDB01-S010 | S-038 | IU-038 | `b8b98b6e6f` | CTXDB01B | `verified-from-source-image` | no | MigrateAsync example and caution |
| CTXDB01-S011 | S-044 | IU-044 | `17ce5a037a` | CTXDB01B | `verified-from-source-image` | no | Migration inspection methods |
| CTXDB01-S012 | S-046 | IU-046 | `788d0427bb` | CTXDB01B | `verified-from-source-image` | no | Migration main properties |
| CTXDB01-S013 | S-048 | IU-048 | `8471c9a942` | CTXDB01B | `verified-from-source-image` | no | List all/applied/pending migrations |
| CTXDB01-S014 | S-049 | IU-049 | `8e2e641f7b` | CTXDB01B | `verified-from-source-image` | no | Migration main methods |
| CTXDB01-S015 | S-051 | IU-051 | `ade182d12b` | CTXDB01B | `verified-from-source-image` | no | Migration class example |
| CTXDB01-S016 | S-058 | IU-058 | `17dd1db68a` | CTXDB01B | `verified-from-source-image` | no | HasPendingModelChanges |
| CTXDB01-S017 | S-059 | IU-059 | `dd5b9542d6` | CTXDB01B | `verified-from-source-image` | no | How to think about migrations |

---

## 2. Verified source transcript

### CTXDB01-S001 / S-001 - `86922be1d4`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CanConnect usage overview

#### Visible text

```text
2) Examples of when CanConnect() is useful

Database.CanConnect() is a reachability check: “Can I successfully connect to the configured database right now?” It catches connection exceptions and returns false instead of throwing. Microsoft notes that a successful connection does not mean the schema is current or valid.

Typical uses:
```

---

### CTXDB01-S002 / S-003 - `5a3a2852a4`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CanConnect meaning / use / not use

#### Visible text

```text
CanConnect()

What it means:
- “Can I open a connection to this database right now?”

It returns true if the database is available and false otherwise. Exceptions during connection attempt are caught and not thrown to your app from this method. Microsoft also notes that being able to connect does not mean the schema is correct or up to date.

Use it for:
- health checks
- startup readiness checks
- “is the DB reachable?” checks

Not for:
- “is my migration applied?”
- “does this table exist?”
- “is the schema correct?”
```

---

### CTXDB01-S003 / S-005 - `6228547cf6`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CanConnect app startup health check

#### Visible text

```text
Typical uses:

App startup health check

This is useful when your app should not start serving traffic if the DB is down. It checks availability, not migrations.
```

#### Visible code

```csharp
if (!await context.Database.CanConnectAsync())
{
    // fail startup or mark app unhealthy
}
```

---

### CTXDB01-S004 / S-010 - `6ab5135f8f`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CanConnect readiness endpoint

#### Visible text

```text
Readiness endpoint

Good for Kubernetes or load balancers that need to know whether the app can talk to the DB. Again, this says nothing about whether tables/migrations are correct.
```

#### Visible code

```csharp
app.MapGet("/health/db", async (AppDbContext db) =>
{
    return await db.Database.CanConnectAsync() ? Results.Ok() : Results.Problem();
});
```

---

### CTXDB01-S005 / S-014 - `a25597376b`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EnsureCreated meaning and behavior

#### Visible text

```text
EnsureCreated()

What it means:
- create the database and schema from the current EF model if needed

Important behavior:
- if the database exists and has any tables, EF does nothing
- if the DB exists but has no tables, EF creates the schema
- if the DB does not exist, EF creates the DB and schema
```

---

### CTXDB01-S006 / S-016 - `86a6d029f3`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: CanConnect troubleshooting config issues

#### Visible text

```text
Troubleshooting config issues

If your connection string, DNS, firewall, or SQL Server availability might be wrong, CanConnect() is a quick yes/no probe. It uses the normal configured connection string and honors configured options such as timeouts.

What it is not for:
- “Did I apply migrations?”
- “Does table X exist?”
- “Is this the right schema version?”

It only answers “can I connect?”
```

---

### CTXDB01-S007 / S-019 - `d8a7a3ccc7`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EnsureCreated warning and fit

#### Visible text

```text
Big warning:
- it does not use migrations
- a database created this way is not meant to later be evolved with migrations
- Microsoft recommends using migrations instead if you plan to use migrations at all

Good for:
- prototypes
- tests
- local caches
- transient databases
- some non-relational providers that do not support migrations well
```

---

### CTXDB01-S008 / S-024 - `a1be321ab2`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01A`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EnsureDeleted meaning and use

#### Visible text

```text
EnsureDeleted()

What it means:
- delete the entire database if it exists

EF and Microsoft warn that this deletes the whole database, not just objects for your context. It is common in testing to call EnsureDeleted() and then EnsureCreated() to start from a clean DB.

Good for:
- integration tests
- throwaway environments
- quick reset during prototyping

Not good for:
- production cleanup
- selective schema management
```

---

### CTXDB01-S009 / S-034 - `70a5cc9c2c`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Migrate / MigrateAsync

#### Visible text

```text
2. Migrations and schema methods

Migrate() / MigrateAsync()

What it does

Applies all pending migrations to the database, and creates the database if it does not already exist.

When to use it

Use it when your app uses EF Core migrations as the schema management strategy.
```

---

### CTXDB01-S010 / S-038 - `b8b98b6e6f`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: MigrateAsync example and caution

#### Visible text

```text
Example

Usage guide / caution

This is fine for local/dev and some controlled deployment setups, but for production many teams prefer reviewed SQL migration scripts instead of letting the app apply schema changes automatically. Microsoft recommends scripts as an important deployment strategy for production.
```

#### Visible code

```csharp
await using var scope = app.Services.CreateAsyncScope();
await using var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

await db.Database.MigrateAsync();
```

---

### CTXDB01-S011 / S-044 - `17ce5a037a`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Migration inspection methods

#### Visible text

```text
GetPendingMigrations() / GetAppliedMigrations() / GetMigrations()

What they do:
- GetPendingMigrations() -> migrations known by the app but not yet applied
- GetAppliedMigrations() -> migrations already recorded as applied in the database
- GetMigrations() -> all migrations known in the assembly/context model. These methods are listed on DatabaseFacade.
```

---

### CTXDB01-S012 / S-046 - `788d0427bb`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Migration main properties

#### Visible text

```text
Main properties

The docs list these important properties:
- ActiveProvider — name of the current database provider
- UpOperations — operations used to migrate “up”
- DownOperations — operations used to migrate “down”
- TargetModel — the model shape after this migration is applied.
```

---

### CTXDB01-S013 / S-048 - `8471c9a942`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: List all/applied/pending migrations

#### Visible text

```text
Example

Usage guide / caution

These are inspection methods. They do not change the database. A common usage is: log pending migrations at startup, or fail startup if pending migrations exist in an environment where they should already be applied.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

var all = db.Database.GetMigrations().ToList();
var applied = db.Database.GetAppliedMigrations().ToList();
var pending = db.Database.GetPendingMigrations().ToList();

Console.WriteLine("All:");
foreach (var m in all) Console.WriteLine($"  {m}");

Console.WriteLine("Applied:");
foreach (var m in applied) Console.WriteLine($"  {m}");

Console.WriteLine("Pending:");
foreach (var m in pending) Console.WriteLine($"  {m}");
```

---

### CTXDB01-S014 / S-049 - `8e2e641f7b`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Migration main methods

#### Visible text

```text
Main methods

The docs list these methods:
- Up(MigrationBuilder) — build operations to apply the migration
- Down(MigrationBuilder) — build operations to revert the migration
- BuildTargetModel(ModelBuilder) — build the model snapshot for the target state.
```

---

### CTXDB01-S015 / S-051 - `ade182d12b`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Migration class example

#### Visible text

```text
C# migration example: AddPostsTable migration with Up and Down methods. Up creates a Posts table with Id and Title columns and a PK_Posts primary key. Down drops the Posts table.
```

#### Visible code

```csharp
using Microsoft.EntityFrameworkCore.Migrations;

public partial class AddPostsTable : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Posts",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Title = table.Column<string>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Posts", x => x.Id);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "Posts");
    }
}
```

#### Notes

Right/bottom of screenshot is close to crop, but the migration shape is readable.

---

### CTXDB01-S016 / S-058 - `17dd1db68a`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: HasPendingModelChanges

#### Visible text

```text
HasPendingModelChanges()

What it does

Checks whether the current model has changes not represented by a migration. This method is exposed on DatabaseFacade.

Example

Usage guide / caution

This is useful in tests or CI to detect “you changed entities/configuration but forgot to add a migration”.
```

#### Visible code

```csharp
await using var db = new AppDbContext(options);

if (db.Database.HasPendingModelChanges())
{
    Console.WriteLine("Model changed, but no migration has been added yet.");
}
```

---

### CTXDB01-S017 / S-059 - `dd5b9542d6`

Metadata:
- status: `verified-from-source-image`
- subregion: `CTXDB01B`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: How to think about migrations

#### Visible text

```text
How to think about it

A migration is basically:
- Up = “how to go to the newer schema”
- Down = “how to go back”
- TargetModel / BuildTargetModel = “what the model should look like after this migration”
```

---

## 3. Cleaned source notes

- Use CanConnect/CanConnectAsync as a reachability/readiness check only.
- Do not use CanConnect to validate schema, migrations, or table existence.
- EnsureCreated creates the database/schema from the current model but does not use migrations.
- EnsureDeleted deletes the entire database and fits tests/prototypes, not selective production cleanup.
- Migrate/MigrateAsync applies pending migrations and can create the database.
- Migration inspection methods are read-only and help detect pending/applied/all migrations.
- HasPendingModelChanges is useful in tests/CI to catch model changes that lack a migration.

---

## 4. Question hooks

- What does this API check or change?
- When is it safe to use this API in production?
- What does it not guarantee?
- What would be the failure mode if this is misused?
