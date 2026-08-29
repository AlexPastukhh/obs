# Knowledge Registry

Source workspace: `_ai-conspects/AUTHORIZATION/`

Authoritative processed source: `10-full-combined-final-transcript.md`

Original SVG: `source/AUTHORIZATION.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Core policy model: require all requirements, pending requirements lead to failure | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| `Requirements` vs `PendingRequirements`, `Succeed(requirement)` removes a specific requirement, `.ToList()` snapshot while iterating | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| Policy AND semantics across requirements, OR semantics across alternative handlers for the same requirement | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| Resource-based authorization: `context.Resource`, product/resource ownership, and requirement marker pattern | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| `AddAuthorization`, named policies, role/claim requirements, `RequireAuthenticatedUser`, and secure-by-default fallback policy | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| `[Authorize]`, `[AllowAnonymous]`, fallback policy, and login/public-endpoint escape hatch | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| `IAuthorizationRequirementData` endpoint metadata and `AuthorizationMiddleware` combining metadata into policy | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| Non-generic handler advantage: inspect/load resource once and satisfy multiple related requirements in one pass | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MAPPED |
| Source review, metadata, layout inventory, and duplicate-canvas correction records | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 8 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

## Boundary decisions

- The full authorization conspect is treated as one coherent knowledge unit because the core model is the same across policy registration, requirement lifecycle, fallback policy, and endpoint metadata.
- The separate authorization-flow / PolicyEvaluator / result-handler canvas remains in its own workspace and is not folded into this unit.
- Source review, coverage bookkeeping, and source-correction notes are kept as NON_LEARNING evidence, not as learner-facing knowledge.
