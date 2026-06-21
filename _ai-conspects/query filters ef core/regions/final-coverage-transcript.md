# Query filters EF Core — final coverage transcript v001

## 0.1 Area understanding

This conspect covers EF Core global query filters and the main correctness trap: a required navigation may become an inner join, so a filter on the related entity can remove the parent row. It also covers disabling filters, multiple filters, multitenancy and pooled-context cautions.

Reading quality: high for the conceptual flow and examples; exact generic/entity names remain in the preserved screenshots.

## R01 — Include, required navigation and missing parents

- `Include` translates to SQL joins.
- A required reference navigation often permits EF Core to use an inner join; an optional navigation generally requires a left join.
- If the required related entity has a global filter, rows on that side may be removed before/while joining.
- Because an inner join requires both sides, the parent row can disappear even when the parent itself is not filtered.
- Collection navigations can show a different symptom: the parent remains but only related rows that survive the filter are materialized.
- This explains why querying parents alone and querying parents with `Include` can return different counts.

## R02 — configuring and disabling filters

- Configure a global filter with `HasQueryFilter`, commonly for soft delete or tenant isolation.
- The predicate is applied automatically whenever the entity is queried.
- `IgnoreQueryFilters()` disables configured filters for that query; use it deliberately because it can expose soft-deleted or cross-tenant data.
- In versions supporting named filters, independent filters can be configured and disabled selectively.
- Before named-filter support, multiple conditions are typically combined in one predicate with `&&`, so disabling means disabling the combined global filter.

## R03 — mitigations, multitenancy and pooling

Mitigations for the required-navigation trap include:

- make the navigation optional so SQL uses a left join where appropriate;
- apply compatible filters to both sides of the relationship;
- avoid `Include` when a separate explicit query better expresses the desired semantics;
- project only the required data and inspect generated SQL/tests for row-count changes.

For multitenancy:

- capture a tenant identifier in the context and reference it in the filter;
- ensure the tenant value is set per request and cannot leak between requests;
- with `AddDbContextPool`, context instances are reused, so request-specific state must be reset/reinitialized carefully;
- avoid injecting scoped request state into the model as if the model were rebuilt per request.

## Final practical model

```text
HasQueryFilter narrows entity rows automatically
required navigation + Include may produce INNER JOIN
filtered child missing -> parent may disappear
IgnoreQueryFilters bypasses protection and must be deliberate
```

Coverage: 15 image uses + 15 labels processed; 0 unclosed.
