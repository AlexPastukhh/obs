# Final semantic transcript вЂ” `System.Linq.Enumerable` static methods

Authoritative source: `source/Enumerable static methods.svg`

Most LINQ extension methods are static methods declared on `Enumerable`:

```csharp
var result =
    Enumerable.Where(
        values,
        value => value > 0
    );
```

Extension syntax is equivalent:

```csharp
var result =
    values.Where(
        value => value > 0
    );
```

## Sequence-producing static methods

Some methods create sequences without an existing source.

### `Empty`

```csharp
var empty = Enumerable.Empty<string>();
```

Useful instead of allocating a new empty list when an enumerable is required.

### `Range`

```csharp
var numbers = Enumerable.Range(1, 10);
```

Produces consecutive integers.

### `Repeat`

```csharp
var blanks = Enumerable.Repeat("N/A", 5);
```

Repeats the same value.

## Deferred execution

Many enumerable methods are lazy:

```csharp
var query =
    Enumerable.Range(1, 100)
        .Where(x => x % 2 == 0);

foreach (int value in query)
{
    ...
}
```

The pipeline executes during enumeration.

Materializers such as these execute immediately:

```text
ToList
ToArray
ToDictionary
Count in many cases
First / Single / Aggregate
```

## Checklist

```text
[ ] understand extension syntax is static-method syntax sugar
[ ] use Empty/Range/Repeat to create sequences
[ ] avoid repeated enumeration of expensive sources
[ ] materialize deliberately at API/lifetime boundaries
```


# Coverage

```text
unique embedded screenshots: 1
image uses: 1
native SVG labels: 3
duplicate extra placements: 0

processed image uses: 1
processed text labels: 3
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```

