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
