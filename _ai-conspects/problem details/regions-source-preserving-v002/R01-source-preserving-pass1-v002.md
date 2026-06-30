# R01 — configuration, fields, client errors, and safe public contracts — source-preserving pass 1

Generated: 2026-06-30

This pass includes only source images whose decoded bytes were recovered exactly.
Pending IDs remain listed in the coverage ledger and are not reconstructed from memory.

## S-001 — Do 404 and 405 need ProblemDetails bodies?

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Question: “Do I need to care about empty-body status codes such as 404 and 405?”

You do not have to; it depends on the API goals.

If the API is primarily consumed by code rather than humans, an empty body can be acceptable because clients can key off:

- the status code;
- relevant headers, such as `Allow` for `405`;
- authentication headers such as `WWW-Authenticate` for `401`.

If a consistent developer experience is important, `404` and `405` are two common framework-generated errors clients encounter early. Returning a ProblemDetails document gives them the same structured error contract as other failures.

### Study meaning

ProblemDetails is a contract-quality decision, not a requirement for every status. Empty bodies can be valid, but consistency is valuable for public or multi-client APIs.

### Recall questions

1. When can an empty 404/405 body be acceptable?
2. Which header is especially relevant to 405?
3. Why might a public API still prefer ProblemDetails for these statuses?

## S-011 — ProblemDetails standard fields

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

ProblemDetails is a standard error-response shape, commonly serialized as:

```http
Content-Type: application/problem+json
```

Typical fields:

- `type` — URI identifying or documenting the error type;
- `title` — short human-readable summary;
- `status` — HTTP status code;
- `detail` — human-readable occurrence details; avoid leaking sensitive production data;
- `instance` — request path, occurrence identifier, or correlation URI;
- `extensions` — application metadata such as `traceId`.

### Study meaning

The standard fields separate stable error classification from occurrence-specific diagnostics and extensible machine-readable metadata.

### Recall questions

1. Which field should identify the stable error type?
2. Where does traceId belong?
3. Why must detail be sanitized in production?
4. What can instance represent?

## S-020 — Benefits of returning ProblemDetails

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Why return ProblemDetails?

1. **Consistent error shape for clients**  
   Mobile, web, front-end, and service clients parse failures through the same structure.

2. **Better debugging without leaking secrets**  
   Include a `traceId`, a stable error code such as `extensions["code"]`, and keep production stack traces out.

3. **Alignment with ASP.NET Core `[ApiController]`**  
   Model-validation failures already use ProblemDetails-like payloads. Using the same shape elsewhere keeps the API uniform.

4. **Self-describing errors**  
   The `type` value can link to documentation and explain what the client should do next.

### Study meaning

The main value is a stable public error contract that separates client guidance and support correlation from internal implementation details.

### Recall questions

1. Which metadata helps support correlate an occurrence?
2. Why use a stable application error code?
3. How does ProblemDetails align with ApiController behavior?
4. What makes an error self-describing?

## S-027 — The type field makes errors self-describing

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

A ProblemDetails error becomes more self-describing when:

```text
type
```

links to documentation that explains the problem and tells the client what to do next.

### Study meaning

A stable type URI is more valuable than a generic HTTP-status explanation when it documents the application's specific error semantics.

### Recall questions

1. What should the type URI document?
2. How does type differ from title?
3. Why should type remain stable?

## S-035 — High-value 4xx scenarios

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

ProblemDetails is especially useful for validation and client mistakes where the client must fix the request:

- `400` malformed `Accept` or `Content-Type`;
- `400` malformed JSON or parsing errors, if surfaced;
- `404` resource not found;
- `409` conflicts such as concurrency or duplicates;
- `415` unsupported or missing request `Content-Type` when a body exists;
- `406` no acceptable representation satisfies `Accept`;
- `422` domain validation, when the API uses it.

With custom or vendor media types, clear ProblemDetails responses help clients distinguish cases such as `415` from `406`.

### Study meaning

The most valuable problem documents explain actionable client mistakes and distinguish nearby protocol failures precisely.

### Recall questions

1. What is the difference between 406 and 415?
2. When is 409 appropriate?
3. Why are custom media-type APIs especially helped by structured errors?

## S-044 — 5xx errors and multiple-client APIs

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

For unexpected server errors, clients usually cannot repair the cause, but ProblemDetails can still provide:

- a generic safe message;
- a `traceId` for support;
- a consistent response shape.

A typical implementation uses exception handling middleware together with ProblemDetails creation/writing.

ProblemDetails also becomes more valuable when an API has multiple clients or is public, because consistency and a documented error contract matter quickly.

### Study meaning

A 5xx body should help correlation and contract stability without exposing stack traces, secrets, or raw exception messages.

### Recall questions

1. What should a production 500 response contain?
2. What should it omit?
3. Why do multiple clients increase the value of a stable error format?

## S-049 — Lower-value scenarios

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

ProblemDetails can be minimal or unnecessary in lower-value cases:

1. Internal prototypes or learning projects where client and server are controlled together and still changing.
2. UI-first applications where server errors are not maintained as a stable public contract and the single SPA handles failures ad hoc.

### Study meaning

The decision is proportional to contract stability, client diversity, and operational support needs.

### Recall questions

1. When is a simple error body often enough?
2. What changes when third-party or multiple clients appear?
3. Why should prototypes avoid premature complexity?

## S-058 — Cases where a body is low-value or impossible

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Cases where the client may not read a body:

- some redirects;
- `HEAD` requests;
- browser-driven authentication challenges.

Errors after the response has started are different: when `Response.HasStarted == true`, a reliable ProblemDetails response can no longer be sent. At that point, log the error and abort or let the failure propagate according to pipeline policy.

### Study meaning

Do not force a body where HTTP semantics, client behavior, or response lifecycle make it useless or unsafe.

### Recall questions

1. Why is a HEAD body not useful?
2. What should happen after HasStarted?
3. Which authentication flows may be browser-driven?

## S-063 — Do not obsess over ProblemDetails everywhere

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Do not over-engineer ProblemDetails when:

- the project is still an early learning prototype;
- the response has already started;
- the error is not meaningful for clients to parse in the rare application-specific case.

### Study meaning

A stable error contract is valuable, but protocol correctness and practical client value matter more than mechanically wrapping every failure.

### Recall questions

1. Which lifecycle condition makes ProblemDetails impossible?
2. When can a prototype use a simpler response?
3. What should guide whether a client-readable body is worthwhile?

## S-068 — What not to put in ProblemDetails

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Do not expose:

- production stack traces;
- connection strings, secrets, SQL, or internal file paths;
- raw exception messages that may contain sensitive information.

Prefer:

- a stable safe `title` and `detail`;
- `traceId`;
- a stable error code in `extensions["code"]`;
- a documentation URI in `type`.

### Study meaning

ProblemDetails is a public contract. Diagnostics should support correlation without turning the response into an information-disclosure channel.

### Recall questions

1. Which internal details must stay out of production responses?
2. What should replace a raw exception message?
3. Where should a stable application error code go?
4. How should support correlate the public response with logs?
