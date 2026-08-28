# LINQ grouping, lookup, and joins

Knowledge ID: `dotnet.linq-grouping-lookup-and-joins`

Topic: `dotnet`

`GroupBy` is deferred and creates groups as the result is enumerated. Each group exposes a `Key` and an enumerable of matches. Element-selector overloads project values while grouping; result-selector overloads shape the final group result. `ToLookup` executes immediately and builds a reusable one-to-many index. Both allow several values per key; `ToDictionary` requires one value per key and throws on duplicates unless the input is resolved first.

`Join` produces matching outer/inner pairs; its result selector combines one outer element with each matching inner element. Duplicate keys multiply results. `GroupJoin` associates every outer element with a sequence of its matches and is the basis of the usual left-join pattern:

```csharp
var left = outer
    .GroupJoin(inner, o => o.Id, i => i.ParentId,
        (o, matches) => new { o, matches })
    .SelectMany(
        x => x.matches.DefaultIfEmpty(),
        (x, i) => new { Outer = x.o, Inner = i });
```

Choose by result shape: grouping partitions one sequence, joining correlates two sequences, and a lookup supports repeated key-based retrieval. Hash-based lookup/join work is normally linear on average but still consumes memory and depends on a matching equality comparer. The query provider may translate relational joins but not an in-memory comparer or a nested grouping shape.

## Sources

- Workspace: `_ai-conspects/-all/`
- Authoritative processed source: `07-full-combined-final-transcript.md`, R02
- Original SVG: `source/-all.svg`
