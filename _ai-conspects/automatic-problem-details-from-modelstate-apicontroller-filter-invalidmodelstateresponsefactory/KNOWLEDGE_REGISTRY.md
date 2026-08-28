# Knowledge Registry

Source workspace: `_ai-conspects/automatic-problem-details-from-modelstate-apicontroller-filter-invalidmodelstateresponsefactory/`

Authoritative processed source: `regions/full-source-near-literal-v002.md` (S-001–S-024; 24 of 24 screenshots)

Original SVG: `source/automatic-problem-details-from-modelstate-apicontroller-filter-invalidmodelstateresponsefactory.svg`

Evidence and closure: `CURRENT_SOURCE_OF_TRUTH.md` and `03-stage3-final-coverage-audit.md`

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| S-002–S-005 `[ApiController]` automatic invalid-ModelState short-circuit, default Problem Details path and configured 422 `InvalidModelStateResponseFactory` | `aspnet-core` | `aspnet-core.api-behavior-validation-and-client-errors` | `../_knowledge/aspnet-core/api-behavior-validation-and-client-errors.md` | MERGED |
| S-001, S-006–S-010 manual `ValidationProblem` reuse of the global factory, configurable result types and `ActionResultObjectValue` analyzer metadata | `aspnet-core` | `aspnet-core.patch-models-application-and-validation` | `../_knowledge/aspnet-core/patch-models-application-and-validation.md` | MERGED |
| S-011–S-015 PATCH/update-or-create flow, patch-operation errors, final DTO validation and Newtonsoft/System.Text.Json `ApplyTo` error paths | `aspnet-core` | `aspnet-core.patch-models-application-and-validation` | `../_knowledge/aspnet-core/patch-models-application-and-validation.md` | MERGED |
| S-016–S-019 `ActionContext`/`ControllerContext` relationship, factory input/result contract and `TryValidateModel` population of current ModelState | `aspnet-core` | `aspnet-core.modelstate-binding-validation-and-revalidation` | `../_knowledge/aspnet-core/modelstate-binding-validation-and-revalidation.md` | MERGED |
| S-020–S-023 automatic-filter suppression, plain MVC versus `[ApiController]` and empty/missing body behavior | `aspnet-core` | `aspnet-core.api-behavior-validation-and-client-errors` | `../_knowledge/aspnet-core/api-behavior-validation-and-client-errors.md` | MERGED |
| S-024 implicit non-nullable requiredness suppression versus explicit `[Required]` | `aspnet-core` | `aspnet-core.modelstate-binding-validation-and-revalidation` | `../_knowledge/aspnet-core/modelstate-binding-validation-and-revalidation.md` | MERGED |
| Source inventory, canvas navigation, audit artifacts and closure metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- The workspace strengthens established ModelState, API-behavior and PATCH units rather than creating a second validation-policy summary.
- Automatic short-circuit policy stays in the API-behavior unit; revalidation mechanics stay in the ModelState unit; the integrated manual PATCH flow stays in the PATCH unit.
- `ActionResultObjectValue` is retained with the manual response-helper claim group as analyzer/tooling metadata and is not treated as runtime validation behavior.

| Status | Count |
|---|---:|
| MAPPED | 0 |
| MERGED | 6 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
