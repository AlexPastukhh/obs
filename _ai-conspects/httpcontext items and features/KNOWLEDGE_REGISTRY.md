# Knowledge Registry

Source conspect: `_ai-conspects/httpcontext items and features/`

Authoritative processed source: `FINAL_TRANSCRIPT.md`

Original SVG: `source/httpcontext items and features.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| S-001–S-003 — Items key identity, safe key pattern, and correlation-ID flow | `aspnet-core.httpcontext-items` | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-items]] | MAPPED |
| S-008–S-009 — object identity and controller consumption | `aspnet-core.httpcontext-items` | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-items]] | MAPPED |
| S-014, S-019, S-022, S-024, S-027 — tenant, timing, and profile examples | `aspnet-core.httpcontext-items` | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-items]] | MAPPED |
| S-005–S-006, S-011–S-012 — feature collection and custom typed contracts | `aspnet-core.httpcontext-features` | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-features]] | MAPPED |
| S-017, S-020–S-021 — routing, endpoint, server, and transport features | `aspnet-core.httpcontext-features` | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-features]] | MAPPED |
| S-023, S-025–S-026 — request-audit feature lifecycle | `aspnet-core.httpcontext-features` | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-features]] | MAPPED |
| S-004, S-010, S-013, S-015, S-018 — exception-handler feature contracts | `aspnet-core.exception-handler-features` | `aspnet-core` | [[../_knowledge/aspnet-core/exception-handler-features]] | MAPPED |
| S-007 and S-016 — Items versus Features decision boundary | `aspnet-core.httpcontext-items`; `aspnet-core.httpcontext-features` | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-items]]; [[../_knowledge/aspnet-core/httpcontext-features]] | MAPPED |
| `QUESTIONS.md` — recall prompts derived from the mapped transcript | all three units above | `aspnet-core` | [[../_knowledge/aspnet-core/httpcontext-items]]; [[../_knowledge/aspnet-core/httpcontext-features]]; [[../_knowledge/aspnet-core/exception-handler-features]] | MAPPED |
| Coverage counts, source blob identity, screenshot/native-label inventory, and audit metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- Items and Features are separate units because each has an independent central model and future review scope.
- The comparison is not a third duplicate unit; its decision rule is carried by both related units.
- Exception-handler features form a narrower unit because the source provides a complete publish/consume contract, distinct types, and original-path semantics that can be recalled independently.
- Routing and low-level transport features remain examples inside the general Features unit; the source does not develop them enough for separate units.

## Explicit disposition notes

- All 27 screenshot sections and all seven native canvas labels are represented by the mapped areas above.
- The question bank supplies prompts, not additional accepted answers; no source claim was silently omitted because it appeared disputed or incorrect.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 9 | All learning areas and the derived question bank are traceable to three units. |
| MERGED | 0 | No existing semantic duplicate was available to extend. |
| NON_LEARNING | 1 | Source identity, inventory, and processing/audit metadata remain in the workspace. |
| UNRESOLVED | 0 | No meaningful source claim remains unclassified. |
