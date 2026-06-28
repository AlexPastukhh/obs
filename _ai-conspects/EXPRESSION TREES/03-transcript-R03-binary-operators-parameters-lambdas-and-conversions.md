# Regional transcript — R03: Binary operators, parameters, lambdas and conversions

Conspect: `EXPRESSION TREES`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

BinaryExpression nodes combine left and right operands. ParameterExpression objects define placeholders, and the lambda parameter order determines which arguments bind to those placeholders at invocation.

## Parameter identity

- Two parameters can share the same name but still be different nodes.
- The body must reference the exact ParameterExpression objects listed by the lambda.
- Lambda parameter order defines delegate argument order.
- Renaming a parameter does not change semantics; reordering it does.

## Binary construction

- Use helpers such as `Expression.Add`, `Subtract`, `Equal`, `AndAlso` and `GreaterThan`.
- Operand CLR types must be compatible.
- User-defined operators can be represented with associated MethodInfo.
- The BinaryExpression exposes Left, Right, Method and conversion information.

## Convert nodes

- Expression trees represent casts and boxing with UnaryExpression nodes whose NodeType is Convert.
- A selector typed as `Expression<Func<T, object>>` often boxes value-type properties.
- Strip supported Convert/ConvertChecked nodes before looking for the underlying member.

## Lambda construction

- Build the body first from reusable parameter nodes.
- Create `Expression.Lambda<TDelegate>(body, parameters...)`.
- Call `Compile()` only when local execution is intended.

## Representative pattern

```csharp
var x = Expression.Parameter(typeof(int), "x");
var y = Expression.Parameter(typeof(int), "y");
var subtract = Expression.Subtract(x, y);

var lambda = Expression.Lambda<Func<int, int, int>>(
    subtract,
    x,
    y);

var result = lambda.Compile()(10, 3); // 7
```

## Caveats

- Compiling executes locally; passing the tree to IQueryable lets a provider translate it.
- Implicit numeric conversions may need explicit Convert nodes.

## Source labels

- `you are still substracting y from x`
- `but when you are building lambda - you are`
- `setting up what param will be x and what will be y`
- `when you call function`
- `expression convert(unary)`
- `operator -> binary expressoin mapping`
- `parameters and lambda`

## Covered text elements

```text
T-001, T-002, T-003, T-004, T-005, T-009, T-011
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
