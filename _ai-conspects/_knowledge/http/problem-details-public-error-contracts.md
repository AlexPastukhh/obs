# Problem Details as a public error contract

Knowledge ID: `http.problem-details-public-error-contracts`

Topic: `http`

`application/problem+json` gives clients one stable error representation:

```text
type      -> stable problem-category/documentation URI
title     -> short public summary
status    -> HTTP status
detail    -> safe occurrence-specific explanation
instance  -> request/occurrence identifier
extensions-> traceId, stable application code, other public metadata
```

These fields belong to the API contract, not merely generic descriptions of status codes. A consistent shape helps web, mobile, and service clients; a trace identifier connects public failure to private logs; stable types/codes make errors actionable; and ASP.NET Core validation can share the same family of response.

Problem Details is especially useful for validation/client mistakes, unexpected 5xx responses, multi-client APIs, and public versioned contracts. A detailed body can be lower-value for prototypes, intentionally minimal first-party contracts, responses whose body cannot be changed because it started, or clients that ignore it (some redirects, HEAD, and browser-driven challenges). Status and headers remain a valid contract even with no body.

Never expose production stack traces, connection strings, secrets, raw SQL, internal paths, or unsafe raw exception messages. Prefer a generic public title/detail, stable error code, `traceId`, and documentation URI; retain implementation diagnostics only in correlated logs.

## What should be recallable

- What does each standard Problem Details field communicate?
- Why are stable type/code and traceId useful to different audiences?
- When can an empty error body still be deliberate?
- Which diagnostics must never cross the public error boundary?

## Sources

- Workspace: `_ai-conspects/REST API BASICS/`
- Authoritative processed source: `regions/R02-problem-details-error-contracts.md`
- Original SVG: `source/REST API BASICS.svg`
