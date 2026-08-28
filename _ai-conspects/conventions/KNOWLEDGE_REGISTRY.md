# Knowledge Registry

Source workspace: `_ai-conspects/conventions/`

Authoritative processed source: `FINAL_TRANSCRIPT.md` (S-001 through S-050)

Original SVG: `source/conventions.svg` (cleaned current source; two unrelated SqlBulkCopy screenshots were excluded by the source audit)

Evidence and coverage: `data/final-coverage-audit-stage3-v001.json`; all 50 relevant image uses and 18 grouped canvas labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| S-001 startup metadata boundary and request/user-dependent alternatives | `aspnet-core` | `aspnet-core.mvc-application-model-convention-lifecycle` | `../_knowledge/aspnet-core/mvc-application-model-convention-lifecycle.md` | MAPPED |
| S-002–S-010 route/filter/API Explorer/binding use-case-to-interface selection and Razor Pages entry points | `aspnet-core` | `aspnet-core.mvc-application-model-convention-lifecycle` | `../_knowledge/aspnet-core/mvc-application-model-convention-lifecycle.md` | MAPPED |
| S-011 `ApplicationModel` graph, filters/properties and global use cases | `aspnet-core` | `aspnet-core.mvc-application-controller-and-action-models` | `../_knowledge/aspnet-core/mvc-application-controller-and-action-models.md` | MAPPED |
| S-012–S-013 `ControllerModel` members, class-level mutations, filter example and runtime boundary | `aspnet-core` | `aspnet-core.mvc-application-controller-and-action-models` | `../_knowledge/aspnet-core/mvc-application-controller-and-action-models.md` | MAPPED |
| S-014–S-016 `ActionModel` members, antiforgery-filter example, fit and discovery boundary | `aspnet-core` | `aspnet-core.mvc-application-controller-and-action-models` | `../_knowledge/aspnet-core/mvc-application-controller-and-action-models.md` | MAPPED |
| S-017–S-019 `ParameterModel` members, route-binding example and validation boundary | `aspnet-core` | `aspnet-core.mvc-parameter-selector-route-and-api-explorer-models` | `../_knowledge/aspnet-core/mvc-parameter-selector-route-and-api-explorer-models.md` | MAPPED |
| S-020–S-021 `ParameterModelBase` common surface and `PropertyModel` ownership/alternatives | `aspnet-core` | `aspnet-core.mvc-parameter-selector-route-and-api-explorer-models` | `../_knowledge/aspnet-core/mvc-parameter-selector-route-and-api-explorer-models.md` | MAPPED |
| S-022–S-023 `SelectorModel` route, constraint, endpoint-metadata mechanics and business-logic boundary | `aspnet-core` | `aspnet-core.mvc-parameter-selector-route-and-api-explorer-models` | `../_knowledge/aspnet-core/mvc-parameter-selector-route-and-api-explorer-models.md` | MAPPED |
| S-024–S-025 `AttributeRouteModel` members, prefix combination and local-route alternative | `aspnet-core` | `aspnet-core.mvc-parameter-selector-route-and-api-explorer-models` | `../_knowledge/aspnet-core/mvc-parameter-selector-route-and-api-explorer-models.md` | MAPPED |
| S-026–S-027 API Explorer visibility/grouping, example and attribute alternative | `aspnet-core` | `aspnet-core.mvc-parameter-selector-route-and-api-explorer-models` | `../_knowledge/aspnet-core/mvc-parameter-selector-route-and-api-explorer-models.md` | MAPPED |
| S-028–S-029 `BindingInfo` members, binding-source example and binder/attribute boundaries | `aspnet-core` | `aspnet-core.mvc-parameter-selector-route-and-api-explorer-models` | `../_knowledge/aspnet-core/mvc-parameter-selector-route-and-api-explorer-models.md` | MAPPED |
| S-030–S-044 convention declarations, model-specific scopes, examples and narrow-interface selection | `aspnet-core` | `aspnet-core.mvc-application-model-convention-lifecycle` | `../_knowledge/aspnet-core/mvc-application-model-convention-lifecycle.md` | MAPPED |
| S-030–S-040 concrete application/controller/action examples and member-level mechanics | `aspnet-core` | `aspnet-core.mvc-application-controller-and-action-models` | `../_knowledge/aspnet-core/mvc-application-controller-and-action-models.md` | MAPPED |
| S-041–S-044 concrete parameter example and member-level mechanics | `aspnet-core` | `aspnet-core.mvc-parameter-selector-route-and-api-explorer-models` | `../_knowledge/aspnet-core/mvc-parameter-selector-route-and-api-explorer-models.md` | MAPPED |
| S-045 Razor Pages interface/model selection | `aspnet-core` | `aspnet-core.mvc-application-model-convention-lifecycle` | `../_knowledge/aspnet-core/mvc-application-model-convention-lifecycle.md` | MAPPED |
| S-046–S-050 registration, invocation counts, nested/outer access and global-versus-attribute application | `aspnet-core` | `aspnet-core.mvc-application-model-convention-lifecycle` | `../_knowledge/aspnet-core/mvc-application-model-convention-lifecycle.md` | MAPPED |
| Source decision, foreign-screen exclusion, canvas labels and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Convention lifecycle, interface selection, registration and invocation stay together because they answer when MVC calls a convention and which graph node it passes.
- `ApplicationModel`, `ControllerModel`, and `ActionModel` form one navigable upper graph and retain their member surfaces and representative mutations together.
- Parameter/property, selector/route, API Explorer and binding objects form the lower metadata layer used by parameter and action conventions.
- Concrete examples are retained in the object-model unit that owns the mutated model rather than mechanically following the transcript section boundary.

| Status | Count |
|---|---:|
| MAPPED | 16 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
