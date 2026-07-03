# Exhaustiveness checks in C# — source-preserving transcript v002

Generated: 2026-07-02

## Source verification

```text
source/exaustiveness check with sicr union for enums,classes with inher.svg
Git blob SHA: 79ded734f21b93774e394d4945af4374d2bdb336
unique embedded screenshots: 6
image uses: 6
native SVG labels: 0
duplicate placements: 0
broken images: 0
```

## Coverage

```text
source-specific transcript blocks: 6 / 6
visible code examples preserved: 6 / 6
technical boundary/correction notes: 5
recall-question sets: 6 / 6
uncovered image uses: 0
```

## Important correction policy

The screenshot wording is preserved in the near-literal sections. Separate technical-boundary sections correct two over-broad implications:

1. an ordinary base-record hierarchy is not automatically a compiler-known closed union;
2. a throwing discard arm provides runtime failure but hides future named enum-member omissions from switch exhaustiveness diagnostics.

The existing v001 semantic summary remains a useful overview, but this v002 transcript is the authoritative code/source layer.

---

# R01 — Enum switch expressions and the catch-all trade-off

Generated: 2026-07-02

## S-004 — Enum plus switch expression without a default

### Near-literal normalized transcript

**1) Enum plus switch expression**

```csharp
enum ShapeKind
{
    Circle,
    Square
}
```

```csharp
static double Area(
    ShapeKind kind,
    double r,
    double s) =>
    kind switch
    {
        ShapeKind.Circle =>
            Math.PI * r * r,

        ShapeKind.Square =>
            s * s,

        // no default
    };
```

If `Triangle` is later added, it becomes an uncovered named case. Depending on project settings and analyzers, the omission can be reported. If an unmatched value reaches the expression at runtime, evaluation fails.

### Study meaning

Leaving out a discard arm keeps missing-case diagnostics visible. This is useful when the development priority is to notice that a newly added enum member has not been handled.

The method parameters are simplified for the teaching example; a richer domain model would normally avoid passing unrelated dimensions for every shape.

### Technical correction / boundary

A C# enum can hold unnamed numeric values, so listing every declared member does not cover every possible runtime enum value. Compiler diagnostics also depend on compiler/language/analyzer configuration. The transcript therefore distinguishes “all currently named members” from “all possible underlying numeric values.”

### Recall questions

1. Why is there no default arm?
2. What change makes Triangle an uncovered case?
3. What is awkward about passing both r and s?
4. How could records model shape-specific data better?


---

## S-005 — Compiler warning and runtime exception

### Near-literal normalized transcript

**What C# does with a non-exhaustive switch expression**

- Without a default/discard arm, the compiler can warn—and analyzers can enforce—that not all inputs are covered.
- If an unhandled value occurs at runtime, a switch expression throws `SwitchExpressionException`.

The source says this has the same intent as TypeScript's:

```ts
assertNever(...)
```

because a forgotten case becomes visible instead of silently choosing an unrelated default.

### Study meaning

The compile-time diagnostic and runtime behavior solve related but different problems:

- diagnostics help during development;
- the runtime exception prevents silent incorrect output when an unmatched value still arrives.

### Technical correction / boundary

Microsoft's current C# reference states that a non-exhaustive switch expression normally produces a compiler warning and throws `SwitchExpressionException` at runtime when no arm matches. It also notes exceptions such as list patterns, so the exact diagnostic should be confirmed for the pattern kind and project configuration.

### Recall questions

1. Which exception is associated with an unmatched switch expression?
2. Why are analyzers still useful?
3. What problem does runtime failure prevent?
4. How is this only similar—not identical—to assertNever?


---

## S-003 — Explicit fail-loudly discard arm

### Near-literal normalized transcript

For explicit fail-loudly behavior:

```csharp
static double Area(
    ShapeKind kind,
    double r,
    double s) =>
    kind switch
    {
        ShapeKind.Circle =>
            Math.PI * r * r,

        ShapeKind.Square =>
            s * s,

        _ => throw new
            ArgumentOutOfRangeException(
                nameof(kind),
                kind,
                "Unhandled ShapeKind")
    };
```

The source compares this to TypeScript's `assertNever`, while noting that C# uses a discard arm plus an exception.

### Study meaning

The discard arm makes unexpected runtime values fail immediately with a deliberate exception and useful argument information.

This is valuable at trust boundaries where an enum may contain a numeric value not represented by a named member.

### Technical correction / boundary

This pattern is fail-loudly at runtime, but it is not the same compile-time guarantee as TypeScript's `never`. Because `_` accepts every value, the switch is already exhaustive from the compiler's perspective.

### Recall questions

1. What values does `_` match?
2. Why include nameof(kind) and the actual value?
3. How is this similar to assertNever?
4. What runtime values can reach the discard arm?


---

## S-006 — Why a discard arm hides future enum-member omissions

### Near-literal normalized transcript

The source shows:

```csharp
static double Area(
    ShapeKind kind,
    double r,
    double s) =>
    kind switch
    {
        ShapeKind.Circle =>
            Math.PI * r * r,

        ShapeKind.Square =>
            s * s,

        _ => throw new
            ArgumentOutOfRangeException(
                nameof(kind),
                kind,
                "Unhandled ShapeKind")
    };
```

and then adds:

```csharp
enum ShapeKind
{
    Circle,
    Square,
    Triangle
}
```

Because `_` already matches every remaining value, the switch is syntactically exhaustive. The compiler cannot use that switch to tell the developer that `Triangle` lacks its own named arm.

The source conclusion is:

> You lose the “tell me when I forgot to handle a new enum member” benefit.

### Study meaning

There is a genuine trade-off:

- no discard arm preserves missing-case visibility but leaves unmatched runtime values to the switch-expression failure path;
- a throwing discard arm provides a controlled exception for unknown values but hides newly added named-member omissions from exhaustiveness diagnostics at that switch.

### Recall questions

1. Why does `_` make the switch exhaustive?
2. What diagnostic benefit is lost after adding `_`?
3. What runtime benefit does the throwing arm add?
4. How can tests or analyzers compensate?
5. Which choice is better at an external-data boundary?


---

# R02 — Record hierarchies and explicit union alternatives

Generated: 2026-07-02

## S-002 — Record hierarchy and type-pattern switch

### Near-literal normalized transcript

**2) Discriminated-union style in modern C#: records plus pattern matching**

The source says that C# does not provide a TypeScript-style discriminated-union declaration in the shown C# 9 approach, but the shape can be modeled with an abstract base record and derived record types:

```csharp
abstract record Shape;

record Circle(double R) : Shape;

record Square(double S) : Shape;
```

Area is calculated with a type-pattern switch expression:

```csharp
static double Area(Shape shape) =>
    shape switch
    {
        Circle c =>
            Math.PI * c.R * c.R,

        Square s =>
            s.S * s.S,

        // no default
    };
```

The source proposes adding:

```csharp
record Triangle(
    double B,
    double H) : Shape;
```

and handling that new case in switches.

### Study meaning

Each derived record carries data specific to that case. Pattern matching simultaneously checks the runtime case and binds its payload.

This design resembles a discriminated union operationally, but ordinary inheritance remains extensible unless the construction boundary and permitted derived types are controlled.

### Technical correction / boundary

The compiler does not generally treat an ordinary user-defined base-record hierarchy as a closed set of all derived types. A switch over `Shape` can already be considered non-exhaustive because another subtype is possible. Adding `Triangle` does not necessarily create a new compiler warning that did not exist before. A dedicated analyzer, source generator, library union type, or genuinely closed construction boundary is needed for stronger “new subtype breaks every switch” enforcement.

### Recall questions

1. What is the common base type?
2. What payload does Circle carry?
3. How does the switch bind a Circle value?
4. What arm would calculate Triangle area?
5. Why is an ordinary public base hierarchy not globally closed?


---

## S-001 — OneOf option and final summary

### Near-literal normalized transcript

**3) C# 9+ “real” discriminated-union feel with `OneOf` libraries (optional)**

When a strict union type similar to TypeScript is desired, teams can use a library such as `OneOf` to represent:

```text
OneOf<A, B, C>
```

and force callers to handle the possible cases.

The source summary says:

- the same general pattern can be achieved in C#;
- use switch expressions without a default together with project analyzers to surface missed cases;
- for TypeScript-like discriminated unions, model a base record with derived records and pattern-match in a switch.

### Study meaning

`OneOf` is an external-library approach that makes the finite case list explicit in the type. It is optional and adds a dependency, but can provide a more union-oriented API than an ordinary open inheritance hierarchy.

The final summary combines three strategies:

1. enum plus switch expression;
2. base record plus derived records and type patterns;
3. an explicit union library.

### Technical correction / boundary

The screenshot is explicitly framed around C# 9-era techniques. Language and analyzer support can differ by the project's current C# version. The notes should therefore record the project version instead of making an unqualified claim about every modern C# configuration.

### Recall questions

1. What does OneOf<A, B, C> communicate?
2. Why can an explicit union library be stronger than an open base class?
3. What three strategies are summarized?
4. What trade-off does an external library introduce?
