# Knowledge Registry

Source conspect: `_ai-conspects/CUSTOM ROUTE CONSTRAINT/`

Authoritative processed source: `regions/R01-final-coverage-transcript.md`

Original SVG: `source/CUSTOM ROUTE CONSTRAINT.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| `IRouteConstraint.Match` and route-value parsing | `aspnet-core.custom-route-constraints` | `aspnet-core` | [[../_knowledge/aspnet-core/custom-route-constraints]] | MAPPED |
| `RouteOptions.ConstraintMap` registration and route-template usage | `aspnet-core.custom-route-constraints` | `aspnet-core` | [[../_knowledge/aspnet-core/custom-route-constraints]] | MAPPED |
| Non-match behavior and 404 routing outcome | `aspnet-core.custom-route-constraints` | `aspnet-core` | [[../_knowledge/aspnet-core/custom-route-constraints]] | MAPPED |
| Validation, authorization, cost, and side-effect boundaries | `aspnet-core.custom-route-constraints` | `aspnet-core` | [[../_knowledge/aspnet-core/custom-route-constraints]] | MAPPED |
| Coverage counts, delivery batch metadata, and archive instructions | — | — | — | NON_LEARNING |

## Boundary decisions

- Implementation, registration, use, and operational boundaries remain one unit because together they define one complete endpoint-matching capability.
- Validation and authorization warnings remain inside the unit rather than becoming unrelated policy files.

## Explicit disposition notes

- All three screenshot uses are represented; the source has no native text labels.
- No substantial source statement was excluded.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 4 | The complete route-constraint region maps to one unit. |
| MERGED | 0 | No semantic duplicate existed. |
| NON_LEARNING | 1 | Delivery and audit metadata remain in the workspace. |
| UNRESOLVED | 0 | No meaningful claim remains unclassified. |
