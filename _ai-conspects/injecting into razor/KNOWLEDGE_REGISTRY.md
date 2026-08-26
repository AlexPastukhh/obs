# Knowledge Registry

Source conspect: `_ai-conspects/injecting into razor/`

Authoritative processed source: `FINAL_TRANSCRIPT.md`

Original SVG: `source/injecting into razor.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| S-001 — `@inject`, suitable services, and data-access boundary | `aspnet-core.razor-service-injection` | `aspnet-core` | [[../_knowledge/aspnet-core/razor-service-injection]] | MAPPED |
| S-002 — request and principal access through `Context` and `User` | `aspnet-core.razor-service-injection` | `aspnet-core` | [[../_knowledge/aspnet-core/razor-service-injection]] | MAPPED |
| S-003 — acceptable display logic versus authorization/business enforcement | `aspnet-core.razor-presentation-security-boundary` | `aspnet-core` | [[../_knowledge/aspnet-core/razor-presentation-security-boundary]] | MAPPED |
| `QUESTIONS.md` — recall prompts derived from the transcript | both units above | `aspnet-core` | [[../_knowledge/aspnet-core/razor-service-injection]]; [[../_knowledge/aspnet-core/razor-presentation-security-boundary]] | MAPPED |
| Source-update history, screenshot counts, audit state, and archive instructions | — | — | — | NON_LEARNING |

## Boundary decisions

- Injection and built-in request context form one view-dependency unit.
- Presentation versus security enforcement is separate because it is an independent architectural rule.
- The database-query warning supports both boundaries but is retained with service injection and prepared view data.

## Explicit disposition notes

- All three updated-source screenshots are mapped; no native SVG text exists.
- The question bank contains prompts, not additional accepted answers; unsupported answers were not invented.
- No substantial transcript claim was excluded.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 4 | All screenshot areas and recall prompts are traceable. |
| MERGED | 0 | No semantic duplicate existed. |
| NON_LEARNING | 1 | Source-update and audit mechanics stay in the workspace. |
| UNRESOLVED | 0 | No meaningful claim remains unclassified. |
