# Knowledge Registry

Source workspace: `_ai-conspects/routing-route-params-tech-info-custom-constraints-router-matching/`

Authoritative processed sources: `regions/RTR01-route-parameters-and-built-in-constraints-v001.md`, `regions/RTR02-custom-irouteconstraint-v001.md`, `regions/RTR03-matching-precedence-order-and-overlaps-v001.md`, and `02-technical-corrections-routing-order-and-fallback-v001.md`; closure certified by `03-final-coverage-audit-v001.md` and `data/final-coverage-audit-v001.json`.

Original SVG: `assets/raw/full.svg` (received as `routing,route params tech info, custom constraints,router matching.svg`; SHA-256 `ff42eda1c222260754fb8b0dceab59f3464458683626d4df14e2239e04ab5b18`; Git blob `817b5f15682925438fc9078ae4b309b37c07d579`).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Required `{id}`, optional `{page?}`, and catch-all `{*slug}` segment behavior; empty and multi-segment captures; chained inline constraint syntax; `{id:int:min(1)}` candidate filtering (RTR01 S-001 through S-004) | `aspnet-core.route-parameters-catch-all-and-inline-constraints` | `aspnet-core` | `../_knowledge/aspnet-core/route-parameters-catch-all-and-inline-constraints.md` | MAPPED |
| Custom `IRouteConstraint.Match` value lookup/parity check, `RouteOptions.ConstraintMap` registration, and `{id:even}` use (RTR02 S-005 and T-002 through T-018) | `aspnet-core.custom-route-constraints` | `aspnet-core` | `../_knowledge/aspnet-core/custom-route-constraints.md` | MERGED |
| Candidate matching/filtering lifecycle; constraints and 404 boundary; `Order` and route-template precedence; literal-versus-parameter example; declaration/registration-order limits; semantic-route and constraint alternatives (RTR03 S-006 through S-014; corrections C-001 and C-002) | `aspnet-core.endpoint-matching-phases-and-route-precedence` | `aspnet-core` | `../_knowledge/aspnet-core/endpoint-matching-phases-and-route-precedence.md` | MAPPED |
| Identical-template legacy migration and framework override; feature-handler and authorization examples; corrected non-fallback boundary after endpoint selection (RTR03 S-015 through S-018; corrections C-003 through C-005) | `aspnet-core.explicit-route-order-overrides-and-non-fallback-boundary` | `aspnet-core` | `../_knowledge/aspnet-core/explicit-route-order-overrides-and-non-fallback-boundary.md` | MAPPED |
| Source materialization, image/text inventories, boundary ledgers, contact sheet, visual-verification bookkeeping, and closure audit metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- Parameter forms/inline constraints, custom matcher implementation, general endpoint-selection precedence, and exceptional explicit-order overlaps are distinct recall models.
- The custom constraint mechanics already exist in `aspnet-core.custom-route-constraints`; the new workspace adds exact provenance but does not justify a duplicate unit.
- S-007 and S-009 are qualified rather than silently rewritten. S-016 and S-017 remain visible in the source transcript but their runtime-fallback claims are replaced in knowledge by the authoritative correction layer.
- The correction resolves those claims, so no meaningful learning claim remains `UNRESOLVED`.
- Final source coverage is 18/18 PNGs and 23/23 native labels with no missing or duplicate assignments.

| Status | Count |
|---|---:|
| MAPPED | 3 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
