# R01 — ProblemDetails configuration, standard fields, client-error mapping and CustomizeProblemDetails

Generated: 2026-06-27 UTC

```text
Image uses: 32
SVG text nodes: 35
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region establishes the ASP.NET Core `ProblemDetails` model and the global configuration path.

- `AddProblemDetails` registers the problem-details service and the default JSON writer.
- A problem document follows the RFC-style shape: `type`, `title`, `status`, `detail`, `instance`, plus an `extensions` dictionary for application metadata.
- `[ApiController]` and related MVC infrastructure can automatically map framework/client errors to problem details; the screenshots contrast automatic controller behavior with explicitly creating a `ProblemDetails` instance.
- `ProblemDetailsOptions.CustomizeProblemDetails` is a late global callback. It receives a `ProblemDetailsContext` and can normalize title/detail/type, attach trace identifiers, request path, timestamps, correlation data, or other extension members.
- The callback is useful for invariants shared by all problem responses, but it is not a substitute for choosing the correct status code or for domain-specific error construction.
- Ordering matters: customization happens before a selected writer serializes the result. A writer sees the customized model.
- The screenshots also distinguish API behavior options/client-error mappings from the problem-details service itself: one controls framework error generation and mappings; the other supplies writing/customization infrastructure.
- `traceId` and similar diagnostics belong in extensions and should be generated from the current request/activity rather than hard-coded.
- Controller-produced problem details may have less middleware exception context than problem details created in an exception-handling pipeline; the transcript records that boundary instead of assuming every path has the same context.

## Covered image uses

S-001, S-003, S-004, S-010, S-011, S-012, S-013, S-020, S-021, S-022, S-023, S-027, S-034, S-035, S-040, S-041, S-043, S-044, S-047, S-049, S-054, S-058, S-063, S-068, S-069, S-072, S-073, S-076, S-077, S-083, S-085, S-086

## Covered SVG text nodes

T-004, T-006, T-011, T-012, T-018, T-019, T-020, T-021, T-022, T-023, T-025, T-027, T-028, T-029, T-030, T-031, T-033, T-034, T-035, T-039, T-048, T-049, T-077, T-080, T-086, T-100, T-107, T-109, T-112, T-113, T-114, T-115, T-116, T-117, T-118

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
