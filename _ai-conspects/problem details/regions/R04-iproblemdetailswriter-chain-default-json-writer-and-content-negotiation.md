# R04 — IProblemDetailsWriter chain, default JSON writer and content negotiation

Generated: 2026-06-27 UTC

```text
Image uses: 18
SVG text nodes: 12
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region explains writer selection and representation negotiation.

- `IProblemDetailsWriter` implementations form an ordered chain. Each writer decides whether it can handle the current `ProblemDetailsContext`.
- The built-in writer supplied by `AddProblemDetails` writes JSON. Custom writers can be registered for alternative media types or specialized policies.
- Ordering is significant. A broad writer registered too early can capture responses intended for a more specific writer; a writer registered too late may never run if an earlier writer accepts the context.
- `CanWrite`/equivalent capability checks should consider endpoint metadata, status/problem type, and the request's accepted media types.
- `TryWriteAsync` walks the available writers and returns false if none is suitable. There is no automatic guarantee of a second representation.
- `ProblemDetailsContext` is the shared object passed through customization and writing; writers serialize its final `ProblemDetails` value and may inspect the current HTTP response/request.
- Content negotiation is therefore not just serializer selection. It is writer capability plus request headers plus registration order.
- A custom XML writer must set the correct content type and serialize the final customized model; otherwise the caller should use a defined fallback rather than silently claiming success.

## Covered image uses

S-016, S-017, S-024, S-026, S-031, S-033, S-036, S-039, S-048, S-055, S-056, S-060, S-066, S-067, S-070, S-075, S-079, S-081

## Covered SVG text nodes

T-007, T-013, T-016, T-032, T-036, T-037, T-038, T-040, T-041, T-071, T-074, T-075

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
