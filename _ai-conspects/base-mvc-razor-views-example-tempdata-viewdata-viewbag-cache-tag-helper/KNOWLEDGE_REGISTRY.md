# Knowledge Registry

Source workspace: `_ai-conspects/base-mvc-razor-views-example-tempdata-viewdata-viewbag-cache-tag-helper/`

Authoritative processed sources:
- `10-full-source-preserving-transcript-v002.md`
- `11-technical-corrections-v002.md`
- `12-repetition-question-bank-v002.md`
- `13-final-near-literal-coverage-audit-v002.md`
- `CURRENT_SOURCE_OF_TRUTH.md` (source ledger and boundary summary only)

Original SVG: `source/base-mvc-razor-views-example-tempdata-viewdata-viewbag-cache-tag-helper.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| View structure, layout, `_ViewStart`, `_ViewImports`, strongly typed views, and view-model separation | `aspnet-core.razor-layouts-viewdata-tempdata-tag-helpers-and-fragments` | `aspnet-core` | `../_knowledge/aspnet-core/razor-layouts-viewdata-tempdata-tag-helpers-and-fragments.md` | MAPPED |
| `ViewData`, `ViewBag`, `TempData`, current-request UI values, and PRG flash-message flow | `aspnet-core.razor-layouts-viewdata-tempdata-tag-helpers-and-fragments` | `aspnet-core` | `../_knowledge/aspnet-core/razor-layouts-viewdata-tempdata-tag-helpers-and-fragments.md` | MAPPED |
| Validation flow, `ModelState`, validation display, and tag-helper rendering for form errors | `aspnet-core.razor-layouts-viewdata-tempdata-tag-helpers-and-fragments` | `aspnet-core` | `../_knowledge/aspnet-core/razor-layouts-viewdata-tempdata-tag-helpers-and-fragments.md` | MAPPED |
| Built-in Tag Helpers, route generation, `asp-for`, validation/summaries, selects, and associated infrastructure | `aspnet-core.razor-layouts-viewdata-tempdata-tag-helpers-and-fragments` | `aspnet-core` | `../_knowledge/aspnet-core/razor-layouts-viewdata-tempdata-tag-helpers-and-fragments.md` | MAPPED |
| Cache Tag Helper, varying cached fragments, view components, display templates, and component vs partial boundaries | `aspnet-core.razor-layouts-viewdata-tempdata-tag-helpers-and-fragments` | `aspnet-core` | `../_knowledge/aspnet-core/razor-layouts-viewdata-tempdata-tag-helpers-and-fragments.md` | MAPPED |
| Source ledger, technical-correction records, coverage counts, and transcript quality bookkeeping | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

## Boundary decisions

- This workspace is treated as one coherent ASP.NET Core Razor view and UI-state unit because its core model is the shared MVC view layer: structure, state, validation, form metadata, and reusable view fragments.
- Existing smaller units such as `razor-tag-helpers-and-partials`, `razor-view-discovery-conventions`, and `view-components-server-rendered-widgets` already cover narrower subtopics, but this source area remains a coherent learning flow that is best preserved as a single unit without losing the interaction between layout, model state, and tag-helper rendering.
- The audit, image-coverage, and correction records remain `NON_LEARNING` evidence and are kept out of the learner-facing unit.
