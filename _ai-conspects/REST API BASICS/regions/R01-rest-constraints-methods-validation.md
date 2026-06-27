# R01 — REST constraints, resource contracts, HTTP methods and validation

## Coverage

```text
image uses reviewed: 54
physical SVG text nodes reviewed: 19
remaining image uses: 0
remaining text nodes: 0
```

## Area understanding

This region establishes the outer-facing REST contract before implementation details. The screenshots combine the six REST constraints, resource-oriented URI design, HTTP method semantics, response codes, validation and the Richardson maturity model.

## Verified transcript

### REST constraints and stateless requests

A RESTful system is described through:

- **Uniform interface** — resources are addressed through URIs, manipulated through standard HTTP methods and represented through negotiated media types.
- **Client–server separation** — client and server evolve independently behind the shared contract.
- **Statelessness** — all state needed to process a request is carried by that request, including headers and body.
- **Layered system** — a client does not need to know whether it is connected directly to the origin server or through an intermediary.
- **Cacheability** — each response must make its cacheability explicit.
- **Code on demand** — optional server-supplied executable code can extend a client, but it is primarily a web-application concern rather than a common API requirement.

### Resource-oriented outer contract

The contract is built from:

1. a resource identifier;
2. an HTTP method;
3. a request or response representation.

Resource names should use meaningful nouns and preserve hierarchy:

```text
/api/authors
/api/authors/{authorId}
/api/authors/{authorId}/courses
/api/authors/{authorId}/courses/{courseId}
```

Filtering and sorting instructions are query options, not independent resources. RPC-style operations that do not map cleanly to a noun may be exposed as subordinate action-like resources, but this is a deliberate exception rather than the default design.

The API should expose DTOs or public resource models rather than database entities. The public contract can include calculated or friendly fields while hiding internal storage fields.

### Method safety and idempotency

- **Safe** methods do not change the resource representation.
- **Idempotent** methods can be repeated with the same intended result.

The reviewed method table treats `GET`, `HEAD` and `OPTIONS` as safe and idempotent; `PUT` and `DELETE` as idempotent but not safe; `POST` as neither; and `PATCH` as not inherently idempotent.

### Reading and deleting resources

- `GET /api/authors` returns a collection, often paged.
- `GET /api/authors/{authorId}` returns one resource or `404`.
- `DELETE /api/authors/{authorId}` typically returns `204 No Content`, or `404` if absent.
- Deleting an entire collection is intentionally uncommon because its semantics and safety expectations are ambiguous.

### Creating resources

Two creation models are distinguished:

- **Server chooses the identifier:** `POST` to a collection. The normal success response is `201 Created`, commonly with a `Location` header and a representation of the created resource.
- **Client chooses the identifier:** `PUT` to the final resource URI. Creation or replacement semantics must be documented clearly.

Collection creation, bulk creation and creation of a nested resource should use explicit endpoint semantics rather than accidental routing behavior.

### Full and partial updates

- `PUT` means replacement of the full representation.
- `PATCH` means partial change, commonly through JSON Patch or Merge Patch.
- A missing target normally yields `404` unless an explicit upsert rule is part of the contract.
- “Create on PATCH” is possible only when the required fields, defaults, identity and conflict behavior are precisely defined.

Bulk update endpoints require an explicit policy for all-or-nothing versus best-effort behavior, per-item errors, concurrency (`ETag`/`If-Match`) and transaction boundaries.

### Validation

For controller actions using `[ApiController]`, model validation can automatically produce a `400` response. The screenshots also show a custom `InvalidModelStateResponseFactory` and an overridden `ValidationProblem(...)` path to return a consistent RFC Problem Details shape, optionally with `422 Unprocessable Entity`.

PATCH validation is two-stage:

1. validate the patch document itself;
2. apply it to an update DTO and validate the resulting object.

This distinction prevents a syntactically valid patch from producing an invalid final resource.

### Richardson maturity model

- **Level 0:** HTTP is only a transport for RPC-style operations.
- **Level 1:** resources have distinct URIs.
- **Level 2:** correct HTTP methods and status codes are used.
- **Level 3:** responses contain hypermedia controls that drive application state.

The screenshots treat Level 3 as the strongest RESTful form while noting that many useful APIs stop short of strict REST purity.

## Practical conclusion

Design the public resource model first, keep URIs noun-oriented, choose method semantics deliberately and make validation/error behavior consistent across automatic model binding and manually applied PATCH operations.
