# Problem Details — repetition-readiness plan v001

## Regions to certify

### R01 — configuration and standard fields

Must preserve:

- `AddProblemDetails`;
- standard `ProblemDetails` fields;
- status/title/type/detail/instance;
- client-error mapping;
- trace/correlation extensions;
- `CustomizeProblemDetails`;
- environment/security boundaries.

### R02 — factory and service pipeline

Must compare:

- `ProblemDetailsFactory`;
- `IProblemDetailsService`;
- `ProblemDetailsContext`;
- implicit framework flow versus explicit calls;
- why `TryWriteAsync` can return false.

### R03 — worked integration flows

Must preserve:

- complete code examples;
- authentication challenge/forbid redirect events;
- API versus browser behavior;
- `Response.HasStarted`;
- fallback behavior;
- request path and exception information;
- middleware/controller/filter responsibilities.

### R04 — writer chain and negotiation

Must preserve:

- `IProblemDetailsWriter`;
- writer ordering and `CanWrite`;
- default JSON writer;
- `Accept` and `application/problem+json`;
- custom writer selection;
- what happens when no writer accepts.

## Provisional high-value questions

1. Compare ProblemDetailsFactory, IProblemDetailsService, and IProblemDetailsWriter.
2. What does ProblemDetailsContext carry?
3. Why can TryWriteAsync return false?
4. What response-lifecycle rule makes HasStarted important?
5. When is CustomizeProblemDetails applied or bypassed?
6. How should authentication redirect events behave for APIs?
7. What distinguishes 400, 401, 403, 404, 406, 415, and 500 problem responses?
8. How does Accept influence writer selection?
9. What belongs in `detail` in development versus production?
10. How do generic StatusCodePages differ from endpoint-specific ProblemDetails?

These questions are a planning layer, not proof that every screenshot has been faithfully transcribed.
