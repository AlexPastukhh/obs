# R02 — Problem Details and public error contracts

## Coverage

```text
image uses reviewed: 10
physical SVG text nodes reviewed: 11
remaining image uses: 0
remaining text nodes: 0
```

## Area understanding

This region defines the public error representation and the boundary between useful diagnostic context and implementation details that must remain private.

## Verified transcript

### Standard shape

`application/problem+json` provides a standard error document with fields such as:

- `type` — a stable URI identifying the problem category, often linking to API documentation;
- `title` — short human-readable summary;
- `status` — HTTP status code;
- `detail` — occurrence-specific explanation;
- `instance` — request or occurrence identifier;
- extensions such as `traceId` and a stable application error `code`.

Titles, details and documentation references belong to the API's own contract, not merely generic explanations of status codes.

### Why use Problem Details

The screenshots emphasize four benefits:

1. one consistent error shape across web, mobile and service clients;
2. easier support and debugging through a trace identifier without exposing secrets;
3. alignment with ASP.NET Core `[ApiController]` validation behavior;
4. self-describing errors through stable types and client-actionable information.

Problem Details is especially valuable for validation and other client mistakes, unexpected `5xx` failures, APIs used by multiple clients and public contracts that must remain stable.

### When a body matters less

A detailed body may be lower-value when:

- the project is an internal prototype;
- the only client is a first-party application and the error contract is intentionally minimal;
- the response has already started;
- the client will not inspect the body, as with some redirects, `HEAD` requests or browser-driven authentication challenges.

An empty body can still carry meaningful status and headers, so this is a contract decision rather than a universal rule.

### Security boundary

Do not place the following in a public Problem Details response:

- production stack traces;
- connection strings or secrets;
- raw SQL and internal file paths;
- raw exception messages that may reveal sensitive information.

Prefer a generic public title/detail, a stable error code, a trace identifier for support and a documentation URI in `type`.

## Practical conclusion

Treat Problem Details as a versioned public error contract. Keep client-actionable information stable while moving internal diagnostics into logs correlated by `traceId`.
