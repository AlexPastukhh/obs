# Regional transcript — R02: Property-access expressions

Conspect: `EXPRESSION TREES`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A property access is represented by a MemberExpression whose `Expression` is the target object and whose `Member` identifies the property or field.

## Construction

- Create a ParameterExpression for the object.
- Use `Expression.Property(parameter, propertyName)` or a PropertyInfo.
- The resulting MemberExpression has the property's CLR type.
- Wrap it in a lambda with the same parameter instance.

## Nested paths

- Build one MemberExpression per path segment.
- The next property uses the previous member access as its target.
- Null-safe behavior is not automatic.
- Providers may translate supported member chains into columns/joins.

## Extraction

- Strip an outer Convert node when a value-type property was boxed to object.
- Confirm the remaining body is a MemberExpression.
- Walk its target chain to reconstruct a property path.

## Representative pattern

```csharp
var person = Expression.Parameter(typeof(Person), "person");
var name = Expression.Property(person, nameof(Person.Name));
var lambda = Expression.Lambda<Func<Person, string>>(name, person);
```

## Caveats

- String-based property names fail at runtime when misspelled.
- Prefer PropertyInfo or strongly typed source expressions for reusable infrastructure.

## Source labels

- `property`

## Covered text elements

```text
T-007
```

## Covered screenshot uses

```text
IU-014, IU-015, IU-016, IU-017
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
