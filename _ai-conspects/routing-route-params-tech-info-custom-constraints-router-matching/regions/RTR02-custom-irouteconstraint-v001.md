# RTR02 — Custom `IRouteConstraint` implementation and registration

Generated: 2026-09-02

Sources: S-005 and native canvas labels T-002 through T-018

## 0. Transcript policy

- S-005 was inspected at original resolution.
- The native SVG text labels independently preserve the same code and are included in the workspace evidence.
- The code below is visually verified from the PNG and cross-checked against those labels.

## 0.1 Area overview / key ideas / reading quality

What this area is about: implementing a custom route constraint, registering its inline name, and using that name in a route template.

Key ideas: `Match` reads the candidate route value and returns a Boolean; `RouteOptions.ConstraintMap` binds a short name to the implementation type; the route then uses that short name inline.

How well I perceived the area: the complete implementation, registration, and route use are visible in one card and duplicated as native canvas text.

Reading limitations: none material.

Confidence: high; the image and all 17 code labels agree.

## S-005 — Custom constraint quick example

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

Custom constraints (quick example)

Implement `IRouteConstraint` and register it:

```csharp
// custom constraint
public class EvenNumberConstraint : IRouteConstraint
{
    public bool Match(HttpContext httpContext, IRouter route, string routeKey,
                      RouteValueDictionary values, RouteDirection routeDirection)
    {
        if (!values.TryGetValue(routeKey, out var val) || val == null) return false;
        return int.TryParse(Convert.ToString(val), out var i) && i % 2 == 0;
    }
}

// register in Startup / Program.cs
services.Configure<RouteOptions>(opts =>
{
    opts.ConstraintMap.Add("even", typeof(EvenNumberConstraint));
});

// now usable:
app.MapGet("/nums/{id:even}", (int id) => $"even {id}");
```

### Mechanics visible in the example

- `TryGetValue(routeKey, ...)` retrieves the route value being checked.
- Missing or `null` input returns `false`.
- The value must parse as an integer and be divisible by two.
- The symbolic name `even` is registered in `ConstraintMap`.
- `{id:even}` applies the registered constraint during route matching.

### Recall questions

1. What inputs does `Match` receive from routing?
2. Which two conditions make the example return `true`?
3. How is the `even` name registered?
4. How is the name applied in a route template?

## Native canvas text coverage

The complete code is also represented by T-002 through T-018. These labels cover the comment, class and method signatures, value lookup, parity check, `RouteOptions` registration, and `MapGet` use without gaps.

## Coverage

```text
verified source images: S-005
processed image uses: 1/1
processed native labels: T-002..T-018 = 17/17
unresolved visual readings: 0
```
