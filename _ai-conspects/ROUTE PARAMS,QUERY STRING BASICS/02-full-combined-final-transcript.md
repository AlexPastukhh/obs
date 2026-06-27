# Full combined final transcript — ROUTE PARAMS,QUERY STRING BASICS

Generated: 2026-06-27 14:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 7 / 7
unique embedded screenshots: 8 / 8
screenshot uses on canvas: 8 / 8
repeated screenshot placements retained: 0
logical regions: 1 / 1
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Route parameters, arrays, CSV and query-string binding

Route values primarily identify one resource or one path segment, while query strings are the conventional place for optional collection filters and arrays.

### Single route values

- A route such as `/users/{id}` binds one segment to one action argument.
- Composite routes can use several explicit segments, for example `/orders/{orderId}/lines/{lineId}`.
- Route templates should communicate resource identity rather than encode arbitrary lists.

### CSV in a route

- `GET /users/1,2,3` supplies one string segment, not an automatically expanded integer array.
- Bind the segment to `string ids`, split it, parse each item and validate failures, or create a reusable custom model binder.
- CSV route lists are possible but usually less idiomatic than a query parameter or batch-resource endpoint.
- A template attempting to bind `IEnumerable<Guid>` directly from one CSV segment should not be assumed to work automatically.

### Repeated query keys

- ASP.NET Core naturally binds repeated query keys to arrays/lists.
- Example: `GET /users?ids=1&ids=2&ids=3` with `[FromQuery] int[] ids`.
- Repeated keys preserve each value and avoid inventing CSV escaping rules.
- This is the simplest conventional shape for a list of scalar filters.

### CSV query values

- `GET /users?ids=1,2,3` is a single query-string value.
- Default binding behavior depends on the target type and configured binders; do not rely on automatic CSV splitting.
- Bind to a string and parse, or register a custom binder/value provider for a reusable convention.
- Return a clear 400 response for invalid elements rather than silently dropping them.

### Choosing the shape

- Use path parameters for identity and required hierarchy.
- Use query parameters for filtering, searching, paging, sorting and optional lists.
- For a complex bulk operation, consider a POST command/resource with a structured request body instead of an oversized URL.

### Caveats

- Apply count and URL-length limits to user-provided lists.
- Validate duplicates, ordering requirements and empty values according to the endpoint contract.

## Coverage map

### R01

- text elements: `7`
- screenshot uses: `8`
- unique screenshots: `8`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `01-transcript-R01-route-params-arrays-csv-and-query-binding.md`

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots under `source/` remain authoritative for exact source
punctuation, code spelling and framework-version details.
