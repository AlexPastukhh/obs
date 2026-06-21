# CUSTOM ROUTE CONSTRAINT — final coverage transcript v001

Source SVG: `CUSTOM ROUTE CONSTRAINT.svg`  
Conspect folder: `CUSTOM ROUTE CONSTRAINT`  
Stage: combined ten-conspect final coverage

## R01 — implementing and registering a route constraint

A route constraint participates in endpoint matching. It answers whether a route value satisfies a rule. Built-in examples include `int`, `guid`, `alpha` and `datetime`; a custom constraint supports a domain-specific rule such as `{id:even}`.

Example:

```csharp
public sealed class EvenIntRouteConstraint : IRouteConstraint
{
    public bool Match(
        HttpContext? httpContext,
        IRouter? route,
        string routeKey,
        RouteValueDictionary values,
        RouteDirection routeDirection)
    {
        if (!values.TryGetValue(routeKey, out var raw) || raw is null)
            return false;

        if (raw is int number)
            return number % 2 == 0;

        return int.TryParse(raw.ToString(), out var parsed)
            && parsed % 2 == 0;
    }
}
```

Register the symbolic name:

```csharp
builder.Services.Configure<RouteOptions>(options =>
{
    options.ConstraintMap["even"] = typeof(EvenIntRouteConstraint);
});
```

Use it in a route:

```csharp
app.MapGet("/numbers/{n:even}", (int n) => $"Even: {n}");
```

`/numbers/24` matches. `/numbers/25` does not match this endpoint; routing continues looking for another endpoint and otherwise returns 404.

A route constraint is not input validation. Returning false means “this endpoint is not a match”, not “the client supplied a matched endpoint with invalid data”. When a value belongs to the endpoint but is invalid for business rules, match the route and return a validation response instead.

Constraints should be deterministic, cheap and free of database calls or side effects. Use built-in constraints when possible. They also are not authorization mechanisms.

## Coverage

```text
R01 processed image uses: 3
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
