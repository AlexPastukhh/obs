# R03 — Filtering, searching, pagination and sorting

## Coverage

```text
image uses reviewed: 26
physical SVG text nodes reviewed: 10
remaining image uses: 0
remaining text nodes: 0
```

## Area understanding

This region separates four collection concerns that are often mixed together: exact filtering, broad search, paging and sorting. The reviewed examples keep these instructions in the query string while preserving the resource representation as a separate public contract.

## Verified transcript

### Filtering versus searching

- **Filtering** narrows a collection using explicit predicates, for example:
  `?mainCategory=Singing`.
- **Searching** applies broader matching rules when the caller does not know exactly which field contains the desired value, for example:
  `?searchQuery=pirate`.

A combined request may use both. Query options are endpoint instructions and are not fields stored on the resource entity.

### Resource-parameter object

Instead of expanding an action signature with many individual parameters, group collection options into a resource-parameter object such as:

```text
AuthorsResourceParameters
- MainCategory
- SearchQuery
- PageNumber
- PageSize
- OrderBy
```

The repository/query layer begins with `IQueryable`, conditionally adds predicates and finally executes the query asynchronously.

### Whitelisting

Only stable public resource fields should be filterable or sortable. Do not expose internal database columns, navigation properties or arbitrary property names supplied by the caller. Whitelisting:

- prevents leaking internal structure;
- avoids accidentally expensive queries;
- keeps the API contract stable;
- provides a controlled mapping from public DTO fields to entity expressions.

### Pagination

Collection endpoints should:

- page by default;
- enforce a maximum page size;
- push `Skip`/`Take` or equivalent paging to the underlying data store;
- return enough navigation information to move to adjacent pages.

Metadata such as total count, page size, current page and total pages can be useful for UI display. Placing metadata inside a body advertised as the resource representation changes that representation. A common alternative is a custom `X-Pagination` response header, while HATEOAS links can carry navigation controls.

### Sorting

Sorting is expressed against the public model, for example:

```text
?orderBy=age
?orderBy=age desc
?orderBy=age desc,name
```

The implementation must map public fields such as `Age` to entity expressions such as `DateOfBirth`. Direction and multi-field ordering are parsed explicitly. The screenshots present two implementation styles:

- a simple manual whitelist/switch;
- dynamic LINQ plus a public-property mapping layer.

## Practical conclusion

Keep query options separate from the resource model, group them into a parameter object, execute filtering/paging in the database and expose only explicitly supported public fields.
