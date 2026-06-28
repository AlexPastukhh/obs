# Regional transcript — R05: MethodCallExpression construction and deconstruction

Conspect: `EXPRESSION TREES`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Method calls are represented by MethodCallExpression. Instance calls store the receiver in `Object`; static calls have `Object == null`. Arguments are ordered in the `Arguments` collection.

## Instance call

- Provide the target expression and MethodInfo.
- The target becomes `Object`.
- Arguments represent only declared method parameters, not the receiver.
- The node Type is the method return type.

## Static and extension calls

- Static methods have no Object expression.
- Extension methods are static calls; the apparent receiver is argument zero.
- LINQ methods therefore appear as static MethodCallExpression nodes.
- Generic methods use a closed generic MethodInfo.

## Deconstruction

- Inspect `Method.DeclaringType`, `Name`, generic arguments and parameters.
- Visit `Object` when present.
- Visit each argument in order.
- Distinguish overloads by MethodInfo rather than name alone.

## Construction

- Resolve the exact MethodInfo.
- Create argument expressions with compatible types.
- Use `Expression.Call(instance, method, arguments)` or the static overload.
- Wrap the call in a lambda when a reusable delegate/query fragment is needed.

## Representative pattern

```csharp
var text = Expression.Parameter(typeof(string), "text");
var startsWith = typeof(string).GetMethod(
    nameof(string.StartsWith),
    new[] { typeof(string) })!;

var call = Expression.Call(
    text,
    startsWith,
    Expression.Constant("A"));

var predicate =
    Expression.Lambda<Func<string, bool>>(call, text);
```

## Caveats

- Reflection by method name alone can select the wrong overload.
- A provider may reject a valid CLR MethodCallExpression if it has no translation.

## Source labels

- `about methodcallexpression`

## Covered text elements

```text
T-006
```

## Covered screenshot uses

```text
IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-022, IU-023, IU-024, IU-025, IU-026
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
