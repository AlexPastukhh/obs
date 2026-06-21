# Stage 0 — Source Check / Materialization

Generated: 2026-06-20 08:40:16 UTC

## Repository precheck

No matching `CURRENT_SOURCE_OF_TRUTH.md` was found on
`ai-processed-conspects-text` under the plausible slugs checked for this source:

- `routing-route-params-tech-info-custom-constraints-router-matching`
- `aspnetcore-routing-route-params-tech-info-custom-constraints-router-matching`
- `aspnetcore-routing-route-parameters-custom-constraints-route-matching`
- `aspnetcore-routing-route-parameters-custom-constraints-matching`

The similarly named existing LINQ query-syntax conspect is a different source
and does not cover this Join / GroupJoin / GroupBy / SelectMany canvas.

## Source summary

```text
Original source: routing,route params tech info, custom constraints,router matching.svg
ViewBox: 0 0 2079.1899838561826 9284.760974871868
Image definitions: 18
Image uses: 18
Text labels: 23
Duplicate image-use groups: 0
```

## Text preview

```text
T-001: ROUTING
T-002: // custom constraint
T-003: public class EvenNumberConstraint : IRouteConstraint
T-004: {
T-005: public bool Match(HttpContext httpContext, IRouter route, string routeKey,
T-006: RouteValueDictionary values, RouteDirection routeDirection)
T-007: {
T-008: if (!values.TryGetValue(routeKey, out var val) || val == null) return false;
T-009: return int.TryParse(Convert.ToString(val), out var i) && i % 2 == 0;
T-010: }
T-011: }
T-012: // register in Startup / Program.cs
T-013: services.Configure<RouteOptions>(opts =>
T-014: {
T-015: opts.ConstraintMap.Add("even", typeof(EvenNumberConstraint));
T-016: });
T-017: // now usable:
T-018: app.MapGet("/nums/{id:even}", (int id) => $"even {id}");
T-019: Order
T-020: actually no
T-021: precedence rules
T-022: apply specific endpoint
T-023: first
```

## Provisional regions

- `RTR01` — Routing matching, precedence and endpoint order (**provisional only; Stage1 must verify visually**)
- `RTR02` — Route parameters and constraint behavior (**provisional only; Stage1 must verify visually**)
- `RTR03` — Custom IRouteConstraint implementation and registration (**provisional only; Stage1 must verify visually**)

## Current status

```text
Stage0 source materialization: completed
Stage1 visual boundary review: not started
Transcript: not started
Processed source images: 0/18
```

## Next

Stage1 boundary review must visually inspect every source image, verify or
change the provisional regions, create the image-review ledger and assign all
source/text items before transcript work.
