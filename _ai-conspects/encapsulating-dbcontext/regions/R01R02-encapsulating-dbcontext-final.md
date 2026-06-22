# R01/R02 - EF Core encapsulating DbContext configuration/API surface final transcript v001

Generated: 2026-06-02 17:00:00 UTC

Source policy: preserved PNGs remain the source of truth for exact C# punctuation, terminal output and slide text. This transcript is a source-preserving semantic pass over all image uses.

## Boundary decision

The whole sheet is closed in one pass because it has 13 image uses and one continuous conceptual flow:

```text
R01: DbContext configuration details leak into Program.cs; move environment-dependent parameters into a smaller DbContext constructor surface.
R02: Reduce DbContext API surface; keep DI lifetime equivalent while hiding EF Core option-builder complexity behind a factory/constructor wrapper.
```

No duplicate image uses were detected in stage0.

## R01 - configuration leakage and moving EF details into DbContext

The opening slide applies encapsulation outside the usual domain-model example. The point is that encapsulation is also useful for infrastructure code: protect integrity and reduce the class/API surface area instead of letting every client assemble the internal details directly.

The initial code example shows `Program.cs` / startup code registering `SchoolContext` with `AddDbContext` and exposing a full options-builder chain:

```csharp
builder.Services.AddDbContext<SchoolContext>(
    options => options
        .UseSqlServer(builder.Configuration["ConnectionString"])
        .UseLoggerFactory(CreateLoggerFactory())
        .EnableSensitiveDataLogging());
```

This works, but it means the application startup code knows too many internal EF Core configuration details: SQL provider choice, connection string lookup, logger factory creation and sensitive-data logging. The nearby label explains why this is risky: sensitive-data logging can put SQL query parameters into logs.

The conspect then narrows the rule: the outside client should pass only values that actually vary by environment. In this example those values are the connection string and a boolean-like choice about console logging/sensitive logging. The rest of the EF Core setup is part of the DbContext implementation detail.

The improved `SchoolContext` shape stores a smaller constructor surface:

```csharp
public sealed class SchoolContext : DbContext
{
    private readonly string _connectionString;
    private readonly bool _useConsoleLogger;

    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }

    public SchoolContext(string connectionString, bool useConsoleLogger)
    {
        _connectionString = connectionString;
        _useConsoleLogger = useConsoleLogger;
    }
}
```

Then `OnConfiguring` becomes the place where EF Core provider/logging details are composed:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer(_connectionString);

    if (_useConsoleLogger)
    {
        optionsBuilder
            .UseLoggerFactory(CreateLoggerFactory())
            .EnableSensitiveDataLogging();
    }
    else
    {
        optionsBuilder
            .UseLoggerFactory(CreateEmptyLoggerFactory());
    }
}
```

Meaning: `Program.cs` becomes less coupled to EF internals. It only supplies the environment-specific inputs, while the DbContext owns how those inputs translate into `UseSqlServer`, logging and sensitive-data logging behavior.

## R02 - reducing API surface while preserving DI lifetime

The right-side recap explains the design tradeoff. If the configuration is simple, an ordinary `AddDbContext<SchoolContext>(options => options.UseSqlServer(...))` registration can stay as-is. But when setup grows into multiple chained calls, logger factories, sensitive logging flags and other EF options, it is better to encapsulate.

The minimal factory registration shown on the sheet looks like:

```csharp
builder.Services.AddScoped(_ =>
    new SchoolContext(builder.Configuration["ConnectionString"], true));
```

This does not mean "stop using scoped lifetime." The recap explicitly says the two versions are identical in terms of DbContext lifetime: `AddDbContext` registers the context as scoped, and the manual `AddScoped` factory also registers it as scoped.

The important difference is API shape. The conventional approach exposes the entire options-builder chain to the registration site. The encapsulated approach exposes only the constructor arguments the outside world is allowed to choose. In the recap this is described as:

```text
- reduced the possible configuration options to a minimum;
- abstracted away configuration complexity;
- encapsulated the DbContext.
```

The final summary says that encapsulated DbContext usage bundles dependencies and operations together and moves configuration logic to the DbContext. The broader takeaway is not limited to EF Core: look for places where client code has too much access to configuration details or object internals, then reduce the public surface to the minimum meaningful parameters.

## Source-by-source notes

| Source | Region | What it closes |
|---|---|---|
| S-001 | R01 | Encapsulation protects data integrity and reduces API surface; applies beyond domain models. |
| S-002 | R01 | `AddDbContext` with `UseSqlServer`, `UseLoggerFactory`, `EnableSensitiveDataLogging` in startup. |
| S-003 | R01 | Logger factory filters EF Core database command logs and writes to console. |
| S-004 | R01 | Console SQL logs include parameters; supports sensitive-data logging warning. |
| S-005 | R01 | Rule: pass only parameters that change by environment. |
| S-006 | R01 | `SchoolContext` constructor accepts connection string and logger flag. |
| S-007 | R01 | `OnConfiguring` hides provider/logging composition inside DbContext. |
| S-008 | R02 | `AddScoped` factory registration exposes only minimal constructor inputs. |
| S-009 | R02 | Conventional approach leaves too much room for inconsistencies, like public setters. |
| S-010 | R02 | Simple config can stay; complex option chains are best encapsulated. |
| S-011 | R02 | Constructor/API surface reduced to minimum, EF complexity abstracted away. |
| S-012 | R02 | `AddScoped` factory and `AddDbContext` version are equivalent for scoped lifetime. |
| S-013 | R02 | Final summary: bundle dependencies/operations, move config logic to DbContext. |

## Coverage

```text
total image uses: 13
R01 processed: 7
R02 processed: 6
remaining unclosed: 0
```

## Limitations

Exact C# punctuation, terminal output and slide UI text should be corrected from preserved PNGs if needed. This pass closes image-use coverage and captures conceptual structure; it is not a guarantee that every character from every screenshot was copied verbatim.
