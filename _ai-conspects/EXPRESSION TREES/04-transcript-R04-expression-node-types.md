# Regional transcript — R04: Expression node types

Conspect: `EXPRESSION TREES`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`ExpressionType` identifies the operation represented by a node, while the runtime subclass exposes operation-specific child properties.

## Common leaves

- `Constant` stores a literal or captured object reference.
- `Parameter` represents a lambda/block parameter.
- `Default` represents the default value of a type.

## Common operations

- `MemberAccess` reads a property or field.
- `Call` invokes a method.
- `Convert` represents casting or boxing.
- `New`, `MemberInit` and `NewArrayInit` construct values.
- `Conditional` represents a ternary condition.

## Binary and logical nodes

- `Add`, `Subtract`, `Multiply` and comparison node types map to BinaryExpression.
- `AndAlso` and `OrElse` preserve short-circuit semantics.
- `Coalesce` represents null-coalescing.
- `Assign` and block nodes appear in more general expression trees.

## Traversal strategy

- Use pattern matching for focused inspection.
- Use ExpressionVisitor for complete recursive traversal.
- Override only node methods that need transformation.
- Return the original node when children are unchanged to preserve sharing.

## Representative pattern

```csharp
protected override Expression VisitBinary(BinaryExpression node)
{
    Console.WriteLine(node.NodeType);
    return base.VisitBinary(node);
}
```

## Caveats

- C# syntax can lower into node combinations different from the apparent source form.
- Expression trees do not represent every modern C# language feature.

## Source labels

- `expression types`

## Covered text elements

```text
T-010
```

## Covered screenshot uses

```text
IU-027, IU-028, IU-029, IU-030, IU-031, IU-032
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
