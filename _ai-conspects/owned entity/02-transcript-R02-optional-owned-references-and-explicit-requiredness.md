# Regional transcript — R02: Optional owned references and explicit requiredness

Conspect: `owned entity`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

C# nullable annotations and EF mapping requiredness are different systems. Configure optional owned navigations explicitly when all-null columns should materialize as a null value object.

## Core semantics

- An owned type is a dependent object attached to one owner.
- It is saved and deleted with the owner and has no independent lifecycle.
- Inline owned columns are typically prefixed or explicitly named.
- Owned references can also be mapped to a separate table while remaining dependent.

## Nullability behavior

- In older EF Core behavior, an inline owned navigation could be treated as required and an instance materialized even when every column was null.
- In newer configurations, mark the owned navigation optional with `Navigation(...).IsRequired(false)` when null is meaningful.
- The nullable `FullName?` annotation alone does not completely define EF database/materialization behavior.
- Configure owned scalar properties and the navigation deliberately.

## Backing field pattern

- Map the owned navigation to a private backing field when the domain model requires encapsulation.
- Expose a read-only or nullable public value object.
- Use constructor/materialization support appropriate to the EF Core version.

## Representative pattern

```csharp
modelBuilder.Entity<User>(builder =>
{
    builder.OwnsOne(u => u.FullName, owned =>
    {
        owned.Property(p => p.FirstName)
            .HasColumnName("FirstName")
            .HasMaxLength(100)
            .IsRequired(false);

        owned.Property(p => p.LastName)
            .HasColumnName("LastName")
            .HasMaxLength(100)
            .IsRequired(false);
    });

    builder.Navigation(u => u.FullName).IsRequired(false);
});
```

## Caveats

- Required inner properties do not necessarily mean database columns can always be NOT NULL when the entire owned object is optional.
- Version-specific owned/complex-type behavior should be validated with a migration and materialization test.

## Source labels

- `efcore can materialise objecteven if all of its columns are null`
- `the fact that you have ? for  your fullname  in client can be not enough`
- `so its better to do the shit excplicitly`
- `better to set isrequired manually`
- `because we can have owned type with all nulls`
- `potentially`

## Covered text elements

```text
T-001, T-002, T-003, T-011, T-012, T-013
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
