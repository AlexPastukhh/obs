# PUT and PATCH — semantic transcript v001

Generated: 2026-06-27 UTC

## Source policy

This is a new conspect created from the uploaded complete SVG. Embedded screenshots are the primary source. Canvas placement, nearby labels, and vector paths were treated only as navigation hints. Every screenshot placement was visually reviewed.

## R01 — PUT versus PATCH semantics, idempotency, status codes, upsert, and conditional requests

PUT normally replaces the complete representation at a known resource URI; omitted fields are overwritten or reset according to the server model. PATCH applies a partial change document. PUT is idempotent when repeating the same request converges on the same representation. PATCH is not inherently idempotent: `replace` or setting a value can be idempotent, while increment-like operations are not. Successful updates commonly return 200 with a representation or 204 without one. Creation through PUT or PATCH is an explicit upsert policy, most natural when the client owns the identifier. A server-generated identifier flow normally uses POST. `If-Match` protects updates from lost writes, while `If-None-Match: *` expresses create-only semantics for a known URI.

**Reviewed image uses:** S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-015, S-017, S-019, S-021, S-066, S-083

**Assigned SVG text nodes:** T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-108, T-109, T-110


## R02 — PATCH representations: JSON Patch, JSON Merge Patch, and format selection

PATCH has several representations rather than one universal body shape. JSON Patch (RFC 6902, `application/json-patch+json`) sends an ordered array of operations targeting JSON Pointer paths and supports `add`, `remove`, `replace`, `move`, `copy`, and `test`. JSON Merge Patch (RFC 7396, `application/merge-patch+json`) sends a partial object: absent properties remain unchanged and present properties replace the target value, with `null` generally meaning removal or nulling. JSON Patch is more precise and supports optimistic preconditions through `test`; Merge Patch is simpler for ordinary field updates. A manual DTO-style PATCH is also common when business validation and a stable application/json contract matter more than RFC-level operations.

**Reviewed image uses:** S-014, S-016, S-018, S-020, S-022, S-023, S-024, S-025

**Assigned SVG text nodes:** T-018, T-019, T-021, T-022, T-023, T-024


## R03 — Manual PATCH DTOs and Optional<T> tri-state field semantics

A manual PATCH DTO updates only fields supplied by the client. Nullable properties alone cannot distinguish an omitted property from an explicit JSON null. An `Optional<T>` wrapper adds an `IsSet` flag and a value, allowing three states: absent, present with a non-null value, and present with null. A `System.Text.Json` converter factory can create converters for `Optional<T>`; the converter is invoked only when the JSON property exists, so a missing field leaves `IsSet=false`. This approach preserves strong typing and domain validation while allowing explicit clearing of nullable fields.

**Reviewed image uses:** S-026, S-028, S-029, S-030, S-031, S-033, S-034, S-035, S-038, S-043, S-046, S-050

**Assigned SVG text nodes:** T-020, T-025, T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-040, T-041, T-042, T-043, T-044, T-045, T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057, T-058, T-059, T-060, T-061, T-062, T-063, T-064, T-065, T-066, T-067, T-068, T-069, T-070, T-071, T-072, T-073, T-074, T-075, T-076


## R04 — JSON Patch operations and limits with strongly typed objects

JSON Patch operates on paths that must already make sense for the target document. `replace` works for existing scalar properties; `add` can append or insert into an existing collection and can set an existing nullable/reference property. It cannot invent a new CLR property that is absent from a strongly typed DTO. `remove` resets or removes the target according to the model, and arrays have index-sensitive behavior. `copy`, `move`, and `test` are available in the RFC format. These rules make JSON Patch powerful but more complex to validate and reason about than a manual partial-update DTO.

**Reviewed image uses:** S-027, S-032, S-036, S-037, S-039, S-040, S-042, S-045, S-048

**Assigned SVG text nodes:** T-038, T-039


## R05 — ASP.NET Core JSON Patch packages, serializers, formatters, and content negotiation

ASP.NET Core JSON Patch support depends on the selected package and serializer stack. The established implementation uses `Microsoft.AspNetCore.JsonPatch` with Newtonsoft.Json and the `application/json-patch+json` formatter. Newer prerelease support can use `Microsoft.AspNetCore.JsonPatch.SystemTextJson`. Mixing Newtonsoft input formatters, XML formatters, and System.Text.Json can change the default output selected by content negotiation; returning an object without an explicit Accept preference may therefore produce XML. Register only the required formatters, retain the normal JSON output formatter, and verify the order and supported types.

**Reviewed image uses:** S-041, S-044, S-047, S-049, S-051, S-052, S-053, S-055

**Assigned SVG text nodes:** T-077, T-078, T-079, T-080, T-081, T-082, T-083, T-084, T-085, T-086, T-087, T-088, T-089, T-090, T-091


## R06 — Controller implementation: load, patch, validate, map, persist, and optional upsert

A controller PATCH flow is a two-step update. Load the current entity, map it to a mutable update DTO, apply the patch document, validate the resulting DTO, map accepted changes back to the entity, save, and return 204 or a representation. JSON Patch targets the DTO rather than the persistence entity so the external contract does not expose the storage model. For upsert, a missing resource can follow a separate create branch, apply the patch to a new DTO, validate it, create the entity, and return 201; ordinary update-only PATCH returns 404 when the resource does not exist.

**Reviewed image uses:** S-054, S-056, S-057, S-058, S-059, S-060, S-061, S-076, S-079

**Assigned SVG text nodes:** T-092, T-093, T-094, T-095, T-096, T-097, T-098, T-099, T-100


## R07 — Validation architecture: ModelState, ValidationProblem, ActionContext, and InvalidModelStateResponseFactory

`ApplyTo(dto, ModelState)` records invalid patch operations in ModelState. That is only the first validation boundary: after applying the operations, validate the final DTO because valid operations can still create an invalid object. With `[ApiController]`, normal binding validation can short-circuit automatically through `ApiBehaviorOptions.InvalidModelStateResponseFactory`. Manual PATCH logic inside an action should call `ValidationProblem(ModelState)` or deliberately invoke the configured factory for consistent ProblemDetails. The factory receives an ActionContext and returns an IActionResult; ControllerContext is valid because it derives from ActionContext. Overriding `ValidationProblem` can reuse the same global response formatting for manually detected patch errors.

**Reviewed image uses:** S-062, S-063, S-064, S-065, S-067, S-068, S-069, S-070, S-071, S-072, S-073, S-074, S-075, S-077, S-078, S-080, S-081, S-082, S-084, S-085

**Assigned SVG text nodes:** T-101, T-102, T-103, T-104, T-105, T-106, T-107



## Practical synthesis

Use PUT when the client sends the complete desired representation for a known URI and replacement semantics are appropriate. Use PATCH when the client sends a partial modification. Choose the PATCH document model deliberately: a business-focused DTO for simple validated updates, JSON Merge Patch for concise object-shaped changes, or JSON Patch for ordered path operations and `test` preconditions. Whatever representation is chosen, validate both the patch operations and the final object, protect concurrent updates with conditional headers where required, and keep serializer/content-negotiation configuration explicit.

## Closure

```text
embedded assets: 85
total image uses: 85
processed image uses: 85
restored image uses: 85
duplicate placements: 0
SVG text nodes: 110
vector paths: 37
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
