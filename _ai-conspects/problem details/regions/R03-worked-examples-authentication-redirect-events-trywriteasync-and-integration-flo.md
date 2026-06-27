# R03 — Worked examples, authentication redirect events, TryWriteAsync and integration flow

Generated: 2026-06-27 UTC

```text
Image uses: 24
SVG text nodes: 62
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region contains the worked integration paths.

- Cookie authentication normally redirects unauthenticated/forbidden browser requests. For API paths, redirect events are overridden to return `401` or `403` problem details instead.
- The example checks the request path, preserves normal redirects for non-API pages, sets the status code for API requests, resolves `ProblemDetailsFactory` and `IProblemDetailsService`, creates the model, then writes it through the service.
- `returnUrl`/redirect semantics remain separate from the API error response; an API client should receive a status document rather than HTML navigation.
- `TryWriteAsync` is used where content negotiation may reject all writers. Its boolean result must be checked. A false result is not a successful write and requires an explicit fallback.
- `ProblemDetailsContext` carries `HttpContext`, the problem model, and pipeline-specific metadata. A custom writer can inspect the context, including exception data when the exception pipeline supplied it.
- Examples show why directly serializing a model is different from using the service: direct serialization bypasses configured customization, writer ordering, and negotiation.
- XML support requires an actual compatible writer. Merely requesting XML or adding an MVC formatter does not guarantee that `IProblemDetailsService` can produce XML.
- The integration rule is consistent: choose status and semantic error first, create/enrich the model second, then ask the service to negotiate and write it.

## Covered image uses

S-006, S-007, S-014, S-018, S-025, S-028, S-029, S-030, S-032, S-037, S-038, S-042, S-045, S-046, S-050, S-051, S-052, S-053, S-057, S-059, S-061, S-062, S-064, S-065

## Covered SVG text nodes

T-001, T-002, T-003, T-010, T-014, T-042, T-043, T-044, T-045, T-046, T-047, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057, T-058, T-059, T-060, T-061, T-062, T-063, T-064, T-065, T-066, T-067, T-068, T-069, T-070, T-072, T-073, T-076, T-078, T-079, T-081, T-082, T-083, T-084, T-085, T-087, T-088, T-089, T-090, T-091, T-092, T-093, T-094, T-095, T-096, T-097, T-098, T-099, T-101, T-102, T-103, T-104, T-105, T-106, T-108

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
