# Knowledge Registry

Source workspace: `_ai-conspects/PUT,PATCH/`

Authoritative processed source: `regions/R01R07-put-patch-full-coverage-v001.md`

Original SVG: `source/source-complete-v001.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 PUT replacement/omission, operation-dependent PATCH idempotency, 200/204, client-ID upsert versus POST and `If-Match`/`If-None-Match: *` | `http.put-patch-and-update-preconditions` | `http` | `../_knowledge/http/put-patch-and-update-preconditions.md` | MAPPED |
| R02 JSON Patch operation/Pointer model, Merge Patch absent/present/null semantics and manual DTO format choice | `http.put-patch-and-update-preconditions` | `http` | `../_knowledge/http/put-patch-and-update-preconditions.md` | MAPPED |
| R03 manual DTO supplied-field behavior, nullable ambiguity, `Optional<T>` tri-state and converter-only-on-presence mechanic | `aspnet-core.patch-models-application-and-validation` | `aspnet-core` | `../_knowledge/aspnet-core/patch-models-application-and-validation.md` | MAPPED |
| R04 existing-target/collection mechanics for add/replace/remove/copy/move/test, array sensitivity and strongly typed limits | `aspnet-core.patch-models-application-and-validation` | `aspnet-core` | `../_knowledge/aspnet-core/patch-models-application-and-validation.md` | MAPPED |
| R05 Newtonsoft and System.Text.Json package paths, JSON Patch media type, formatter mixing and output content-negotiation risk | `aspnet-core.json-patch-formatters-and-content-negotiation` | `aspnet-core` | `../_knowledge/aspnet-core/json-patch-formatters-and-content-negotiation.md` | MAPPED |
| R06 load/map/apply/validate/map/save flow, DTO boundary, update-only 404 and explicit create/201 upsert branch | `aspnet-core.patch-models-application-and-validation` | `aspnet-core` | `../_knowledge/aspnet-core/patch-models-application-and-validation.md` | MAPPED |
| R07 operation versus final-object validation, ApiController short-circuit, `ValidationProblem`, configured factory and ActionContext/ControllerContext relationship | `aspnet-core.patch-models-application-and-validation` | `aspnet-core` | `../_knowledge/aspnet-core/patch-models-application-and-validation.md` | MAPPED |
| Coverage counts, reviewed-image/text-node assignments and reconciliation mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- HTTP method and representation semantics are independent of the ASP.NET Core implementation.
- DTO presence, operation application, controller mapping and validation form one application lifecycle.
- Serializer/package/formatter negotiation is separately recallable configuration with failure modes outside patch-domain validation.

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
