# R01 — Data-shaping contract, fields parameter and field validation

## Verified understanding

Data shaping lets the client choose which **public resource/DTO properties** are included in the response, for example `GET /api/authors?fields=id,name`. The public contract must be expressed in resource fields, not in database columns or hidden entity properties.

`AuthorsResourceParameters` keeps `Fields` beside filtering, searching, paging and sorting options. This makes the query contract explicit and allows pagination-link builders to preserve the same selected fields.

Before shaping, the API validates the comma-separated field list. `IPropertyCheckerService.TypeHasProperties<T>` provides a reusable boundary, and `PropertyCheckerService` implements it with case-insensitive reflection over public instance properties:

1. blank `fields` means every DTO property is allowed;
2. split by commas, remove empty entries and trim names;
3. check each requested property on `typeof(T)`;
4. return `false` as soon as a property is missing.

The controller can therefore return a deliberate `400 Bad Request`/Problem Details response for an invalid field instead of allowing reflection inside the shaping helper to fail later as a `500`.

## Important contract rule

Shape the **resource representation** after the entity has been mapped to a DTO. This prevents clients from selecting internal columns or properties that are not part of the API contract.

## Coverage

- image uses: **13**
- physical SVG text nodes: **51**
- non-empty text nodes: **41**
- empty text nodes explicitly recorded: **10**
