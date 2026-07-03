# FULL CONTENT NEG + VALIDATION FLOW — repetition guide v002

Generated: 2026-07-03

## One-minute decision tree

```text
Malformed request syntax?
    yes -> 400

Body present/can exist?
    no -> skip body-media-type checks
    yes -> validate Content-Type and input formatter

No route?
    -> 404

Route exists, wrong method?
    -> 405

Valid Accept, no output representation?
    -> 406

Valid Content-Type, unsupported request representation?
    -> 415

Unhandled exception?
    -> 500
```

## Core comparisons

| Pair | Difference |
|---|---|
| `Accept` vs `Content-Type` | desired response vs representation of request body |
| output formatter vs input formatter | serialize response vs deserialize request |
| malformed vs unsupported | syntax error vs valid value outside server capabilities |
| `[Produces]` vs `[Consumes]` | response metadata/format restriction vs request-body media type/action selection |
| 400 vs 406 | invalid request syntax vs no acceptable response representation |
| 400 vs 415 | malformed request/media-type syntax vs valid unsupported body representation |
| filter vs middleware | MVC action context vs global pipeline context |
| IActionConstraint vs validation | candidate selection vs explicit error contract |
| exact media type vs wildcard | concrete representation vs client matching range |

## Reconstruction exercises

1. Configure strict `406` behavior.
2. Add XML output and input formatters.
3. Add a vendor JSON media type to the correct JSON output formatter.
4. Write a filter that returns `400 ProblemDetails` for malformed `Accept`.
5. Write a selector result enum that distinguishes invalid syntax from no match.
6. Rank an Accept list by q, specificity, server preference, and header order.
7. Show why `application/*` must not become the response Content-Type.
8. Add ProblemDetails to empty 404/405/406/415 responses.
9. Build a production-safe 500 exception boundary.
10. Split two POST actions using `[Consumes]`.
11. Explain why Content-Length alone cannot prove body absence.
12. Design a small immutable IActionConstraintFactory.

## Scenario questions

1. `Accept: application/xml` is valid, but only JSON is configured. What happens with strict negotiation?
2. `Accept: text/plain;q=abc` cannot be parsed. Which boundary should return 400?
3. `Accept: application/json;q=0, */*;q=0.5`. Which concrete representation can win?
4. A selector returns `*/*` as response Content-Type. What design error caused it?
5. A request uses chunked transfer and no Content-Length. Can it have a body?
6. `[Consumes("application/xml")]` is present, but no XML input formatter exists. Is the implementation complete?
7. An IActionConstraint receives a malformed client header. Should it throw?
8. StatusCodePages sees a 415 response that already contains ProblemDetails. Should it replace it?
9. An exception occurs after response headers were sent. Can middleware safely clear and rewrite the response?
10. Two supported media types have equal q and specificity. What tie-breakers remain?

## Misconceptions to reject

- `Accept` selects the controller action in ordinary MVC negotiation.
- `[Produces]` registers a formatter.
- `[Consumes]` alone makes XML deserialization work.
- Every invalid Accept value automatically produces a detailed 400 body.
- Wildcards are valid final response Content-Type values.
- Content-Length missing means no body.
- Request.Body.CanRead means bytes are present.
- IActionConstraint is the best place for all request validation.
- StatusCodePages knows the exact internal reason for every status.
- ProblemDetails means internal exceptions may be exposed to clients.
