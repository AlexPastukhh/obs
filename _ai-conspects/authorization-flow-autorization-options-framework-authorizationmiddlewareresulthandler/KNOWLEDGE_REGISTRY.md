# Knowledge Registry

Source workspace: `_ai-conspects/authorization-flow-autorization-options-framework-authorizationmiddlewareresulthandler/`

Authoritative processed sources:
- `01-final-transcript.md`
- `CURRENT_SOURCE_OF_TRUTH.md` (status ledger and boundary summary only)

Original SVG: `source/authorization flow,autorization options, framework, authorizationmiddlewareresulthandler(2).svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Authorization pipeline position, `UseAuthorization`, `AuthorizationMiddleware`, `IAuthorizationPolicyProvider`, and `AuthorizationPolicy` runtime model | `aspnet-core.authorization-middleware-policy-evaluator-and-result-handler` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-middleware-policy-evaluator-and-result-handler.md` | MAPPED |
| `AuthorizationOptions`: `DefaultPolicy`, `FallbackPolicy`, `InvokeHandlersAfterFailure`, named policies, and `RequireAuthenticatedUser` defaults | `aspnet-core.authorization-middleware-policy-evaluator-and-result-handler` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-middleware-policy-evaluator-and-result-handler.md` | MAPPED |
| `IAuthorizeData`, direct `AuthorizationPolicy`, and `IAuthorizationRequirementData` endpoint metadata and policy composition | `aspnet-core.authorization-middleware-policy-evaluator-and-result-handler` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-middleware-policy-evaluator-and-result-handler.md` | MAPPED |
| `AuthorizationMiddleware` + `PolicyEvaluator` sequence: endpoint lookup, authentication, resource selection, auth result, and `AllowAnonymous` behavior | `aspnet-core.authorization-middleware-policy-evaluator-and-result-handler` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-middleware-policy-evaluator-and-result-handler.md` | MAPPED |
| `Fail()` and `Succeed(requirement)` basic semantics and `PendingRequirements` lifecycle | `aspnet-core.authorization-policy-requirements-and-pending-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-policy-requirements-and-pending-lifecycle.md` | MERGED |
| Default authorization service handler flow and `InvokeHandlersAfterFailure` option for handler execution control | `aspnet-core.authorization-middleware-policy-evaluator-and-result-handler` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-middleware-policy-evaluator-and-result-handler.md` | MAPPED |
| `PolicyAuthorizationResult`, challenge-vs-forbid semantics, and custom `IAuthorizationMiddlewareResultHandler` patterns | `aspnet-core.authorization-middleware-policy-evaluator-and-result-handler` | `aspnet-core` | `../_knowledge/aspnet-core/authorization-middleware-policy-evaluator-and-result-handler.md` | MAPPED |
| Final coverage audit, image counts, and source-quality bookkeeping | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

## Boundary decisions

- This workspace is treated as one coherent ASP.NET Core authorization-flow unit because the central model is the middleware -> policy -> evaluator -> result-handler pipeline.
- The policy-requirement lifecycle itself (basic `Succeed`/`Fail` semantics, `PendingRequirements`) is already represented by the existing authorization-policy unit, so those claims are routed to MERGED.
- This workspace adds the framework execution path, handler sequencing with `InvokeHandlersAfterFailure`, response-state semantics (`PolicyAuthorizationResult`), and custom result-handler patterns.
- Coverage audit, screenshot counts, and source-status bookkeeping remain `NON_LEARNING` evidence and are not repeated in the learner-facing knowledge unit.
