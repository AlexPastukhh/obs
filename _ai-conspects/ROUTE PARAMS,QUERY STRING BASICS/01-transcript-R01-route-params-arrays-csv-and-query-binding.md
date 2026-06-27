# Regional transcript — R01: Route parameters, arrays, CSV and query-string binding

Conspect: `ROUTE PARAMS,QUERY STRING BASICS`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 8 / 8
unique screenshots represented: 8
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Route values primarily identify one resource or one path segment, while query strings are the conventional place for optional collection filters and arrays.

## Single route values

- A route such as `/users/{id}` binds one segment to one action argument.
- Composite routes can use several explicit segments, for example `/orders/{orderId}/lines/{lineId}`.
- Route templates should communicate resource identity rather than encode arbitrary lists.

## CSV in a route

- `GET /users/1,2,3` supplies one string segment, not an automatically expanded integer array.
- Bind the segment to `string ids`, split it, parse each item and validate failures, or create a reusable custom model binder.
- CSV route lists are possible but usually less idiomatic than a query parameter or batch-resource endpoint.
- A template attempting to bind `IEnumerable<Guid>` directly from one CSV segment should not be assumed to work automatically.

## Repeated query keys

- ASP.NET Core naturally binds repeated query keys to arrays/lists.
- Example: `GET /users?ids=1&ids=2&ids=3` with `[FromQuery] int[] ids`.
- Repeated keys preserve each value and avoid inventing CSV escaping rules.
- This is the simplest conventional shape for a list of scalar filters.

## CSV query values

- `GET /users?ids=1,2,3` is a single query-string value.
- Default binding behavior depends on the target type and configured binders; do not rely on automatic CSV splitting.
- Bind to a string and parse, or register a custom binder/value provider for a reusable convention.
- Return a clear 400 response for invalid elements rather than silently dropping them.

## Choosing the shape

- Use path parameters for identity and required hierarchy.
- Use query parameters for filtering, searching, paging, sorting and optional lists.
- For a complex bulk operation, consider a POST command/resource with a structured request body instead of an oversized URL.

## Caveats

- Apply count and URL-length limits to user-provided lists.
- Validate duplicates, ordering requirements and empty values according to the endpoint contract.

## Covered text elements

```text
T-001, T-002, T-003, T-004, T-005, T-006, T-007
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
