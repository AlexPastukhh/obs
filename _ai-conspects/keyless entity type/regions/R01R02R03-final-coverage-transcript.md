# keyless entity type — final coverage transcript v001

Source SVG: `keyless entity type.svg`  
Conspect folder: `keyless entity type`  
Stage: combined final coverage transcript

## 0.1 Area overview / understanding / reading quality

This conspect explains EF Core keyless entity types and compares a model-registered, reusable read model with direct raw-SQL materialization such as `Database.SqlQuery<T>`/raw variants.

The main distinction is not “hard versus easy” in absolute terms. It is **reusable EF model query type** versus **local ad-hoc query result type**.

## R01 — What a keyless entity type is

A keyless entity type is an EF Core model type with no primary key:

```csharp
modelBuilder.Entity<GenreName>().HasNoKey();
```

It is intended mainly for read-only query shapes such as:

```text
- database views
- reporting projections
- fixed SQL query results
- legacy tables/views without a suitable key
- reusable read models
```

Because no key exists, EF cannot manage the type as a normal tracked entity identity. Keyless results are not used for ordinary insert/update/delete tracking. They are query-oriented.

Keyless does not automatically make the CLR class immutable. If immutability is desired, use records, `init` accessors, constructors, or private setters. “Read-only to EF” and “immutable object” are different concepts.

## R02 — Model-mapped query type, ToSqlQuery, and direct SQL

### Registered keyless model

The model-oriented approach defines a CLR type and registers it:

```csharp
public sealed class GenreName
{
    public required string Name { get; init; }
}

modelBuilder.Entity<GenreName>()
    .HasNoKey()
    .ToSqlQuery("SELECT Name FROM dbo.Genres");
```

`ToSqlQuery(...)` associates the keyless model type with a defining SQL query. Querying the type through `Set<GenreName>()` or an optional `DbSet<GenreName>` uses that SQL and materializes the result shape.

A `DbSet` property is mostly a convenient query entry point:

```csharp
public DbSet<GenreName> GenreNames => Set<GenreName>();
```

It is the model registration (`HasNoKey`, mapping configuration), not the property itself, that makes the type part of the EF model.

Advantages:

```text
- reusable query shape
- centralized property/column conversions and mapping
- natural composition through EF query APIs where supported
- good for views and stable reporting projections
```

Costs:

```text
- extra model configuration
- the read shape becomes part of the DbContext model
- unnecessary ceremony for a one-off DTO query
```

### Direct Database.SqlQuery<T> / raw SQL result

For a local, simple result shape, direct SQL materialization can be lighter:

```csharp
var names = await context.Database
    .SqlQuery<GenreName>($"SELECT Name FROM dbo.Genres")
    .ToListAsync();
```

Depending on the EF Core version/API, a raw-string variant is used when interpolation/parameterization behavior differs. Parameters should never be concatenated unsafely.

This approach avoids adding the result type to the EF model and avoids a `DbSet`. It is useful for one-off DTO-like reads, repository-local SQL, reports, or result shapes used in only one place.

## R03 — Model type versus query result type

A registered keyless type is part of the EF model:

```text
- configured in OnModelCreating
- can be exposed through DbSet or queried with Set<T>()
- intended for reusable, stable read shapes
- can carry EF mapping configuration
```

A direct SQL query result is local to the query:

```text
- no model registration for that result shape
- no DbSet required
- lighter for ad-hoc reads
- clearer when the type is merely a DTO/result contract
```

Choose a keyless model when:

```text
- the read model is reused
- it maps to a view or stable fixed query
- centralized mapping/configuration is valuable
- consumers benefit from an EF-style query surface
```

Choose direct `Database.SqlQuery<T>`/raw materialization when:

```text
- the shape is simple and local
- only raw SQL results are needed
- model configuration would add no value
- the result is essentially a DTO
```

Important limitations and design notes:

```text
- keyless types are not normal aggregate/domain entities merely because they are classes
- they are not tracked by key identity for normal CUD operations
- relationships/navigation capabilities are more restricted than for regular entity types
- SQL column names and CLR property shapes must line up or be mapped
- raw SQL must be parameterized
- query composability depends on the SQL/API being used
```

The preference against keyless types in simple cases is therefore not criticism of the feature. It is criticism of putting one-off read DTOs into the model when direct query materialization is simpler.

## Coverage

```text
R01: 2 image uses
R02: 8 image uses
R03: 6 image uses
Text labels: 11
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
