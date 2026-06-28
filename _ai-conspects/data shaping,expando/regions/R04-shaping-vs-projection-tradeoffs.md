# R04 — Why data shaping differs from database projection

## Different layers

Data shaping answers: **which properties are included in the HTTP representation?** Database projection answers: **which columns or expressions are fetched and computed by the query?** They can be combined, but they are not identical.

The conspect's default approach is representation-layer shaping:

1. repository selects rows and performs filtering/searching/sorting/paging;
2. entity is mapped to the public DTO;
3. the controller/helper removes unrequested DTO properties in memory.

This keeps the public-field whitelist at the API boundary and behaves consistently for collection and single-resource endpoints, computed DTO properties, paging links and later HATEOAS additions.

## Why dynamic database projection is harder

A runtime `fields` string requires a runtime `Select` expression, dynamic LINQ or a custom expression builder. Resource fields may be renamed, nested or computed from multiple entity columns; some may not exist in the database at all. Selection mapping therefore maps public fields to **expressions that construct DTO values**, not merely to entity property names.

An existing sorting `PropertyMappingService` can inspire the whitelist and mapping design, but it cannot normally be reused unchanged. Sorting builds `OrderBy` property paths; projection builds a `Select` expression and must construct the public representation.

## Choosing an approach

Shape after mapping when the payload is moderate, DTOs contain computed/flattened fields, consistency and maintainability matter, and dynamic field selection is mainly a response concern.

Project in the database when result sets or columns are large, network/database cost is significant, latency targets are strict and DTO fields map mostly one-to-one to database expressions. Practical alternatives include a small set of predefined representations (list/detail DTOs) or an advanced separate field-selection mapping service.

Reducing response payload is often the main client-side win; fetching a few extra database columns is not automatically the dominant bottleneck compared with row count, joins, N+1 queries, indexes and network latency.

## Coverage

- image uses: **15**
- physical SVG text nodes: **7**
- non-empty text nodes: **6**
- empty text nodes explicitly recorded: **1**
