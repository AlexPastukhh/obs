# Full combined final transcript — EXPRESSION TREES

Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
meaningful text elements: 11 / 11
unique embedded screenshots: 32 / 32
screenshot uses: 32 / 32
repeated placements retained: 0
regions: 5 / 5
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Expression deconstruction and node inspection

An expression tree stores code as data. Deconstruction begins at the lambda and inspects its body, parameters and concrete node subclasses.

### Tree structure

- An `Expression<TDelegate>` wraps a `LambdaExpression`.
- The lambda has a `Body` and a parameter collection.
- The body exposes `NodeType`, `Type` and a concrete node class such as BinaryExpression.
- Child properties recursively form the tree.

### Safe inspection

- Check `NodeType` or use pattern matching before casting.
- A visually simple C# expression can contain implicit `Convert` nodes.
- Parameter nodes are objects with identity, not only matching names.
- Use an `ExpressionVisitor` for recursive transformations.

### Typical use

- LINQ providers inspect trees to translate operations.
- Validation and mapping libraries extract member paths.
- Dynamic query builders compose new nodes.
- Compiled trees execute as delegates when provider translation is not needed.

### Representative pattern

```csharp
Expression<Func<int, int, bool>> expression = (x, y) => x > y;

var lambda = expression;
var body = (BinaryExpression)lambda.Body;

Console.WriteLine(body.NodeType); // GreaterThan
Console.WriteLine(body.Left);     // x
Console.WriteLine(body.Right);    // y
```

### Caveats

- Not every expression node is supported by every LINQ provider.
- Inspect the actual tree rather than assuming it mirrors source syntax exactly.

## R02 — Property-access expressions

A property access is represented by a MemberExpression whose `Expression` is the target object and whose `Member` identifies the property or field.

### Construction

- Create a ParameterExpression for the object.
- Use `Expression.Property(parameter, propertyName)` or a PropertyInfo.
- The resulting MemberExpression has the property's CLR type.
- Wrap it in a lambda with the same parameter instance.

### Nested paths

- Build one MemberExpression per path segment.
- The next property uses the previous member access as its target.
- Null-safe behavior is not automatic.
- Providers may translate supported member chains into columns/joins.

### Extraction

- Strip an outer Convert node when a value-type property was boxed to object.
- Confirm the remaining body is a MemberExpression.
- Walk its target chain to reconstruct a property path.

### Representative pattern

```csharp
var person = Expression.Parameter(typeof(Person), "person");
var name = Expression.Property(person, nameof(Person.Name));
var lambda = Expression.Lambda<Func<Person, string>>(name, person);
```

### Caveats

- String-based property names fail at runtime when misspelled.
- Prefer PropertyInfo or strongly typed source expressions for reusable infrastructure.

## R03 — Binary operators, parameters, lambdas and conversions

BinaryExpression nodes combine left and right operands. ParameterExpression objects define placeholders, and the lambda parameter order determines which arguments bind to those placeholders at invocation.

### Parameter identity

- Two parameters can share the same name but still be different nodes.
- The body must reference the exact ParameterExpression objects listed by the lambda.
- Lambda parameter order defines delegate argument order.
- Renaming a parameter does not change semantics; reordering it does.

### Binary construction

- Use helpers such as `Expression.Add`, `Subtract`, `Equal`, `AndAlso` and `GreaterThan`.
- Operand CLR types must be compatible.
- User-defined operators can be represented with associated MethodInfo.
- The BinaryExpression exposes Left, Right, Method and conversion information.

### Convert nodes

- Expression trees represent casts and boxing with UnaryExpression nodes whose NodeType is Convert.
- A selector typed as `Expression<Func<T, object>>` often boxes value-type properties.
- Strip supported Convert/ConvertChecked nodes before looking for the underlying member.

### Lambda construction

- Build the body first from reusable parameter nodes.
- Create `Expression.Lambda<TDelegate>(body, parameters...)`.
- Call `Compile()` only when local execution is intended.

### Representative pattern

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

### Caveats

- Compiling executes locally; passing the tree to IQueryable lets a provider translate it.
- Implicit numeric conversions may need explicit Convert nodes.

## R04 — Expression node types

`ExpressionType` identifies the operation represented by a node, while the runtime subclass exposes operation-specific child properties.

### Common leaves

- `Constant` stores a literal or captured object reference.
- `Parameter` represents a lambda/block parameter.
- `Default` represents the default value of a type.

### Common operations

- `MemberAccess` reads a property or field.
- `Call` invokes a method.
- `Convert` represents casting or boxing.
- `New`, `MemberInit` and `NewArrayInit` construct values.
- `Conditional` represents a ternary condition.

### Binary and logical nodes

- `Add`, `Subtract`, `Multiply` and comparison node types map to BinaryExpression.
- `AndAlso` and `OrElse` preserve short-circuit semantics.
- `Coalesce` represents null-coalescing.
- `Assign` and block nodes appear in more general expression trees.

### Traversal strategy

- Use pattern matching for focused inspection.
- Use ExpressionVisitor for complete recursive traversal.
- Override only node methods that need transformation.
- Return the original node when children are unchanged to preserve sharing.

### Representative pattern

```csharp
protected override Expression VisitBinary(BinaryExpression node)
{
    Console.WriteLine(node.NodeType);
    return base.VisitBinary(node);
}
```

### Caveats

- C# syntax can lower into node combinations different from the apparent source form.
- Expression trees do not represent every modern C# language feature.

## R05 — MethodCallExpression construction and deconstruction

Method calls are represented by MethodCallExpression. Instance calls store the receiver in `Object`; static calls have `Object == null`. Arguments are ordered in the `Arguments` collection.

### Instance call

- Provide the target expression and MethodInfo.
- The target becomes `Object`.
- Arguments represent only declared method parameters, not the receiver.
- The node Type is the method return type.

### Static and extension calls

- Static methods have no Object expression.
- Extension methods are static calls; the apparent receiver is argument zero.
- LINQ methods therefore appear as static MethodCallExpression nodes.
- Generic methods use a closed generic MethodInfo.

### Deconstruction

- Inspect `Method.DeclaringType`, `Name`, generic arguments and parameters.
- Visit `Object` when present.
- Visit each argument in order.
- Distinguish overloads by MethodInfo rather than name alone.

### Construction

- Resolve the exact MethodInfo.
- Create argument expressions with compatible types.
- Use `Expression.Call(instance, method, arguments)` or the static overload.
- Wrap the call in a lambda when a reusable delegate/query fragment is needed.

### Representative pattern

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

### Caveats

- Reflection by method name alone can select the wrong overload.
- A provider may reject a valid CLR MethodCallExpression if it has no translation.

## Regional source map

### R01

- transcript: `01-transcript-R01-expression-deconstruction-and-node-inspection.md`
- text elements: `1`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-property-access-expressions.md`
- text elements: `1`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-binary-operators-parameters-lambdas-and-conversions.md`
- text elements: `7`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-expression-node-types.md`
- text elements: `1`
- screenshot uses: `6`
- unique screenshots: `6`
- repeated placements: `0`
- remaining: `0`

### R05

- transcript: `05-transcript-R05-methodcallexpression-construction-and-deconstruction.md`
- text elements: `1`
- screenshot uses: `13`
- unique screenshots: `13`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
browser/runtime/library versions and original examples.
