# LINQ projection, flattening, and ordering

Knowledge ID: `dotnet.linq-projection-flattening-and-ordering`

Topic: `dotnet`

`Select` maps each input to one output. `SelectMany` maps each input to a sequence and flattens those sequences. Its result-selector overload keeps both the outer item and each flattened inner item available:

```csharp
var lines = orders.SelectMany(
    order => order.Lines,
    (order, line) => new { order.Id, Line = line });
```

`OrderBy`/`OrderByDescending` start an ordering. `ThenBy`/`ThenByDescending` add tie-breakers; a second `OrderBy` starts over instead of extending the previous keys. LINQ-to-Objects ordering is stable, so equal keys retain source order. `Reverse` merely reverses the current sequence; it is not a substitute for specifying a descending key.

Ordering is deferred but buffered: the source is consumed and its elements retained before ordered results can be produced. Re-enumeration repeats that work. Comparers define ordering semantics, so text ordering should select an intentional culture/ordinal and case policy. For `IQueryable`, only provider-supported comparers and expressions translate. Never rely on database row order without explicit ordering, and give pagination a deterministic order.

## What should be recallable

- Why does `SelectMany` change cardinality while `Select` does not?
- When is the result-selector overload useful?
- Why does `ThenBy` preserve earlier keys but another `OrderBy` not?
- How can ordering be deferred and still require buffering?

## Sources

- Workspace: `_ai-conspects/-all/`
- Authoritative processed source: `07-full-combined-final-transcript.md`, R01
- Original SVG: `source/-all.svg`
