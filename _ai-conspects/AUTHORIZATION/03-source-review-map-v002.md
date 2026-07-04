# AUTHORIZATION source review map v002

All 112 unique screenshots were visually reviewed. Repeated canvas placements
remain separate in the placement ledger.

## R01 — Core authorization model, policies, claims and resource-based authorization

| Source | Placements | Review title | Nearest canvas text | Transcript |
|---|---:|---|---|---|
| `S-001` | 1 | Policy success requires every requirement; pending requirement means failure | its requirements, not handlers if there was no handler tthat ve called success on requirement requirement is failed and policy is failed / requirements vs pending requirements | pending near-literal block |
| `S-002` | 1 | Requirements versus PendingRequirements in a multi-requirement policy | requirements vs pending requirements / its requirements, not handlers if there was no handler tthat ve called success on requirement requirement is failed and policy is failed | pending near-literal block |
| `S-003` | 1 | Policy example: authenticated user, Admin role, and permission requirement | requirements vs pending requirements / its requirements, not handlers if there was no handler tthat ve called success on requirement requirement is failed and policy is failed | pending near-literal block |
| `S-004` | 1 | AuthorizationHandlerContext.User and reading ClaimsPrincipal | user / resource | pending near-literal block |
| `S-005` | 1 | PendingRequirements contains requirements not yet succeeded | IAuthoriazationHandler multiple requirements (usually of one type, like scope requirement) / requirements vs pending requirements | pending near-literal block |
| `S-006` | 1 | Parameterized MinimumAgeRequirement and handler registration | CUSTOM POLICIES WITH AUTHORIZATION HANDLERS WITH REQUIREMENTS / RESOURCE BASED AUTHORIZATION | pending near-literal block |
| `S-007` | 1 | AuthorizationHandlerContext.Requirements versus typed handler parameter | requirements / Pendingrequirements | pending near-literal block |
| `S-008` | 1 | Resource-based authorization and a requirement tied to a domain object | RESOURCE BASED AUTHORIZATION / BASIC, GLOBAL AUTHORIZATION | pending near-literal block |
| `S-009` | 1 | AddAuthorization named policies with claims, roles, and authenticated user | BASIC POLICIES IN ADDAUTHORIZATION / BASIC, GLOBAL AUTHORIZATION | pending near-literal block |
| `S-010` | 1 | AuthorizationHandlerContext.Resource with a Document example | resource / user | pending near-literal block |
| `S-011` | 1 | Manual IAuthorizationService.AuthorizeAsync with user, resource, and policy | but with min apis context.resource is usually either httpcontext or endpoint so dont give a fuck about it unless you are using non generic handler then you need to check wnat is the type of resource / requirements | pending near-literal block |
| `S-012` | 1 | Authentication versus authorization; challenge/401 versus forbid/403 | BASIC, GLOBAL AUTHORIZATION / BASIC POLICIES IN ADDAUTHORIZATION | pending near-literal block |
| `S-013` | 1 | Initial Requirements and PendingRequirements before handlers run | IAuthoriazationHandler multiple requirements (usually of one type, like scope requirement) / requirements vs pending requirements | pending near-literal block |
| `S-014` | 1 | MinimumAgeHandler using a date-of-birth claim | CUSTOM POLICIES WITH AUTHORIZATION HANDLERS WITH REQUIREMENTS / RESOURCE BASED AUTHORIZATION | pending near-literal block |
| `S-015` | 1 | Claim issuer meaning and why issuer may matter | BASIC POLICIES IN ADDAUTHORIZATION / IAuthorizationRequirementData | pending near-literal block |
| `S-016` | 1 | Typed resource handler AuthorizationHandler<TRequirement,TResource> | RESOURCE BASED AUTHORIZATION / BASIC, GLOBAL AUTHORIZATION | pending near-literal block |
| `S-017` | 1 | Document-owner authorization handler | resource / but with min apis context.resource is usually either httpcontext or endpoint so dont give a fuck about it unless you are using non generic handler then you need to check wnat is the type of resource | pending near-literal block |
| `S-018` | 1 | RequireClaim: claim type and optional allowed values | BASIC POLICIES IN ADDAUTHORIZATION / IAuthorizationRequirementData | pending near-literal block |
| `S-019` | 1 | Authorize and AllowAnonymous attributes | BASIC, GLOBAL AUTHORIZATION / BASIC POLICIES IN ADDAUTHORIZATION | pending near-literal block |
| `S-020` | 1 | Built-in requirements: RequireClaim and RequireRole | BASIC POLICIES IN ADDAUTHORIZATION / BASIC, GLOBAL AUTHORIZATION | pending near-literal block |

## R02 — PendingRequirements lifecycle, policy composition, registration and resource handlers

| Source | Placements | Review title | Nearest canvas text | Transcript |
|---|---:|---|---|---|
| `S-021` | 1 | PendingRequirements lifecycle as handlers call Succeed | Pendingrequirements / requirements | pending near-literal block |
| `S-022` | 1 | Policy succeeds only when PendingRequirements becomes empty | IAuthoriazationHandler multiple requirements (usually of one type, like scope requirement) / requirements vs pending requirements | pending near-literal block |
| `S-023` | 1 | Non-generic SuperAdmin handler processes all pending requirements | IAuthoriazationHandler multiple requirements (usually of one type, like scope requirement) / Pendingrequirements | pending near-literal block |
| `S-024` | 1 | Snapshot PendingRequirements with ToList because Succeed mutates it | Pendingrequirements / requirements | pending near-literal block |
| `S-025` | 1 | Register handler and configure AtLeast18 policy | CUSTOM POLICIES WITH AUTHORIZATION HANDLERS WITH REQUIREMENTS / RESOURCE BASED AUTHORIZATION | pending near-literal block |
| `S-026` | 1 | RequireClaim allowed values are OR inside one requirement | BASIC POLICIES IN ADDAUTHORIZATION / IAuthorizationRequirementData | pending near-literal block |
| `S-027` | 1 | Role and policy authorization attributes | BASIC, GLOBAL AUTHORIZATION / BASIC POLICIES IN ADDAUTHORIZATION | pending near-literal block |
| `S-028` | 1 | RequireAuthenticatedUser and RequireAssertion | BASIC POLICIES IN ADDAUTHORIZATION / BASIC, GLOBAL AUTHORIZATION | pending near-literal block |
| `S-029` | 1 | Resource-based owner-edit code continuation | RESOURCE BASED AUTHORIZATION / BASIC, GLOBAL AUTHORIZATION | pending near-literal block |
| `S-030` | 1 | Constructing claims and default issuer LOCAL AUTHORITY | IAuthorizationRequirementData / example | pending near-literal block |
| `S-031` | 1 | Generic resource handler signature and typed resource access | succeed(req) / resource | pending near-literal block |
| `S-032` | 1 | Why PendingRequirements.ToList is required during iteration | IAuthoriazationHandler multiple requirements (usually of one type, like scope requirement) / Pendingrequirements | pending near-literal block |
| `S-033` | 1 | Claim issuer as a trust boundary with multiple schemes | IAuthorizationRequirementData / example | pending near-literal block |
| `S-034` | 1 | Custom requirement, handler, DI registration, and policy registration | RESOURCE BASED AUTHORIZATION / BASIC, GLOBAL AUTHORIZATION | pending near-literal block |
| `S-035` | 1 | Multiple requirements in one policy use AND semantics | why to not use context.fail everywhere, multiple handlers registered for one requirement / CUSTOM POLICIES WITH AUTHORIZATION HANDLERS WITH REQUIREMENTS | pending near-literal block |
| `S-036` | 1 | Manual OR logic versus multiple requirement calls | IAuthorizationRequirementData / example | pending near-literal block |
| `S-037` | 1 | Policy-specific authentication schemes | BASIC POLICIES IN ADDAUTHORIZATION / IAuthorizationRequirementData | pending near-literal block |
| `S-038` | 1 | Minimal API RequireAuthorization | BASIC, GLOBAL AUTHORIZATION / BASIC POLICIES IN ADDAUTHORIZATION | pending near-literal block |
| `S-039` | 1 | RequireClaim without allowed values accepts any value for that claim type | IAuthorizationRequirementData / example | pending near-literal block |
| `S-040` | 1 | Controller flow for resource-based authorization | RESOURCE BASED AUTHORIZATION / when policy might succeed when one handler didnt call success | pending near-literal block |

## R03 — Requirement types, Succeed/Fail, claims, scopes and handler design

| Source | Placements | Review title | Nearest canvas text | Transcript |
|---|---:|---|---|---|
| `S-041` | 1 | PermissionRequirement carrying a permission name | IAuthoriazationHandler multiple requirements (usually of one type, like scope requirement) / Pendingrequirements | pending near-literal block |
| `S-042` | 1 | Inspecting claim issuer | example / IAuthorizationRequirementData | pending near-literal block |
| `S-043` | 1 | Claims and roles basics | BASIC, GLOBAL AUTHORIZATION / BASIC POLICIES IN ADDAUTHORIZATION | pending near-literal block |
| `S-044` | 1 | Succeed removes one specific requirement from PendingRequirements | succeed(req) / fail | pending near-literal block |
| `S-045` | 1 | Handler outcomes: succeed, do nothing, or fail | why to not use context.fail everywhere, multiple handlers registered for one requirement / CUSTOM POLICIES WITH AUTHORIZATION HANDLERS WITH REQUIREMENTS | pending near-literal block |
| `S-046` | 1 | One RequireClaim with several values is OR; separate calls are AND | IAuthorizationRequirementData / example | pending near-literal block |
| `S-047` | 1 | Scope APIs, fallback secure default, and quick AuthorizeAsync reference | why to not use context.fail everywhere, multiple handlers registered for one requirement / CUSTOM POLICIES WITH AUTHORIZATION HANDLERS WITH REQUIREMENTS | pending near-literal block |
| `S-048` | 1 | RequireClaim does not validate issuer; custom assertion example | example / IAuthorizationRequirementData | pending near-literal block |
| `S-049` | 1 | Controller resource-based edit flow and forbid result | when policy might succeed when one handler didnt call success / RESOURCE BASED AUTHORIZATION | pending near-literal block |
| `S-050` | 1 | Policy containing multiple PermissionRequirement instances | NON Generic AuthorizationHandler / IAuthoriazationHandler multiple requirements (usually of one type, like scope requirement) | pending near-literal block |
| `S-051` | 1 | Roles are commonly represented as claims | when policy might succeed when one handler didnt call success / case in authoriz middleware | pending near-literal block |
| `S-052` | 1 | Fail is stronger than leaving a requirement unsatisfied | fail / succeed(req) | pending near-literal block |
| `S-053` | 1 | Authorization pitfalls and practical checklist | why to not use context.fail everywhere, multiple handlers registered for one requirement / scope claims | pending near-literal block |
| `S-054` | 1 | JWT issuer notes and validation rules | example / IAuthorizationRequirementData | pending near-literal block |
| `S-055` | 1 | MultiPermissionHandler batches pending permission checks | NON Generic AuthorizationHandler / even if there is some inher can use generic handler | pending near-literal block |
| `S-056` | 2 | ScopeRequirement definition and required scope value | scope claims / using Microsoft.AspNetCore.Authorization; using System.Security.Claims; public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> { protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) { if (HasScope(context.User, requirement.Scope)) context.Succeed(requirement); return Task.CompletedTask; // do nothing => not satisfied } private static bool HasScope(ClaimsPrincipal user, string needed) { // gather all possible scope strings var values = user.FindAll("scope").Select(c => c.Value) .Concat(user.FindAll("scp").Select(c => c.Value)); foreach (var v in values) { // handle both "a b c" and single-value var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); if (scopes.Contains(needed, StringComparer.Ordinal)) return true; } return false; } } | pending near-literal block |
| `S-057` | 2 | ScopeRequirementHandler supports scope/scp and repeated claims | scope claims / using Microsoft.AspNetCore.Authorization; using System.Security.Claims; public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> { protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) { if (HasScope(context.User, requirement.Scope)) context.Succeed(requirement); return Task.CompletedTask; // do nothing => not satisfied } private static bool HasScope(ClaimsPrincipal user, string needed) { // gather all possible scope strings var values = user.FindAll("scope").Select(c => c.Value) .Concat(user.FindAll("scp").Select(c => c.Value)); foreach (var v in values) { // handle both "a b c" and single-value var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); if (scopes.Contains(needed, StringComparer.Ordinal)) return true; } return false; } } | pending near-literal block |
| `S-058` | 2 | HasScope helper parses space-separated scope values | using Microsoft.AspNetCore.Authorization; using System.Security.Claims; public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> { protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) { if (HasScope(context.User, requirement.Scope)) context.Succeed(requirement); return Task.CompletedTask; // do nothing => not satisfied } private static bool HasScope(ClaimsPrincipal user, string needed) { // gather all possible scope strings var values = user.FindAll("scope").Select(c => c.Value) .Concat(user.FindAll("scp").Select(c => c.Value)); foreach (var v in values) { // handle both "a b c" and single-value var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); if (scopes.Contains(needed, StringComparer.Ordinal)) return true; } return false; } } / scope claims | pending near-literal block |
| `S-059` | 1 | When a non-generic authorization handler is useful | When non generic / even if there is some inher can use generic handler | pending near-literal block |
| `S-060` | 1 | Generic handler is usually enough for one requirement type | even if there is some inher can use generic handler / NON Generic AuthorizationHandler | pending near-literal block |

## R04 — IAuthorizationRequirementData, explicit Fail cases and multiple handlers

| Source | Placements | Review title | Nearest canvas text | Transcript |
|---|---:|---|---|---|
| `S-061` | 2 | Register ScopeRequirementHandler and ProductsRead/ProductsWrite policies | using Microsoft.AspNetCore.Authorization; using System.Security.Claims; public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> { protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) { if (HasScope(context.User, requirement.Scope)) context.Succeed(requirement); return Task.CompletedTask; // do nothing => not satisfied } private static bool HasScope(ClaimsPrincipal user, string needed) { // gather all possible scope strings var values = user.FindAll("scope").Select(c => c.Value) .Concat(user.FindAll("scp").Select(c => c.Value)); foreach (var v in values) { // handle both "a b c" and single-value var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); if (scopes.Contains(needed, StringComparer.Ordinal)) return true; } return false; } } / scope claims | pending near-literal block |
| `S-062` | 1 | IAuthorizationRequirementData produces requirements from endpoint metadata | example / IAuthorizationRequirementData | pending near-literal block |
| `S-063` | 1 | Middleware code combines IAuthorizationRequirementData into effective policy | case in authoriz middleware / IAuthorizationRequirementData | pending near-literal block |
| `S-064` | 1 | Why a policy can still succeed when one handler does nothing | when policy might succeed when one handler didnt call success / can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) | pending near-literal block |
| `S-065` | 1 | Succeed, do nothing, and Fail semantics in authorization handlers | scope claims / why to not use context.fail everywhere, multiple handlers registered for one requirement | pending near-literal block |
| `S-066` | 2 | Using ProductsRead and ProductsWrite policies in controllers | using Microsoft.AspNetCore.Authorization; using System.Security.Claims; public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> { protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) { if (HasScope(context.User, requirement.Scope)) context.Succeed(requirement); return Task.CompletedTask; // do nothing => not satisfied } private static bool HasScope(ClaimsPrincipal user, string needed) { // gather all possible scope strings var values = user.FindAll("scope").Select(c => c.Value) .Concat(user.FindAll("scp").Select(c => c.Value)); foreach (var v in values) { // handle both "a b c" and single-value var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); if (scopes.Contains(needed, StringComparer.Ordinal)) return true; } return false; } } / scope claims | pending near-literal block |
| `S-067` | 1 | MinimumAge attribute as requirement metadata | example / IAuthorizationRequirementData | pending near-literal block |
| `S-068` | 1 | Shared IPermissionRequirement interface can enable a generic handler | even if there is some inher can use generic handler / batching, when we can check all permissions in one call to api/method | pending near-literal block |
| `S-069` | 1 | Endpoint metadata requirements are added to the normal policy | case in authoriz middleware / IAuthorizationRequirementData | pending near-literal block |
| `S-070` | 1 | Legitimate explicit Fail cases: blocked account, revoked token, tenant violation, MFA, malformed claims | scope claims / better to add fallbackpolicy and mark allowanonymus where you dont have it | pending near-literal block |
| `S-071` | 3 | Policy config with one CanEditProductRequirement and two alternative handlers | using Microsoft.AspNetCore.Authorization; using System.Security.Claims; public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> { protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) { if (HasScope(context.User, requirement.Scope)) context.Succeed(requirement); return Task.CompletedTask; // do nothing => not satisfied } private static bool HasScope(ClaimsPrincipal user, string needed) { // gather all possible scope strings var values = user.FindAll("scope").Select(c => c.Value) .Concat(user.FindAll("scp").Select(c => c.Value)); foreach (var v in values) { // handle both "a b c" and single-value var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); if (scopes.Contains(needed, StringComparer.Ordinal)) return true; } return false; } } / scope claims | pending near-literal block |
| `S-072` | 1 | MinimumAgeAttribute implements IAuthorizationRequirementData | example / IAuthorizationRequirementData | pending near-literal block |
| `S-073` | 1 | Same requirement with multiple handlers gives OR-style satisfaction | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / when policy might succeed when one handler didnt call success | pending near-literal block |
| `S-074` | 1 | CanEditProductRequirement marker type | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / when policy might succeed when one handler didnt call success | pending near-literal block |
| `S-075` | 1 | When not to call Fail for a missing permission | better to add fallbackpolicy and mark allowanonymus where you dont have it / scope claims | pending near-literal block |
| `S-076` | 1 | MinimumAgeRequirement class with Age | example / IAuthorizationRequirementData | pending near-literal block |

## R05 — Alternative handlers, OAuth scopes, non-generic handlers and batching

| Source | Placements | Review title | Nearest canvas text | Transcript |
|---|---:|---|---|---|
| `S-077` | 1 | AdminCanEditHandler role-based alternative | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / when policy might succeed when one handler didnt call success | pending near-literal block |
| `S-078` | 1 | OAuth scopes: meaning, claim formats, least privilege, and roles comparison | better to add fallbackpolicy and mark allowanonymus where you dont have it / scope claims | pending near-literal block |
| `S-079` | 1 | Non-generic handler for unrelated requirement types in one domain | different requirement types one logical domain / batching, when we can check all permissions in one call to api/method | pending near-literal block |
| `S-080` | 1 | Batching is a strong reason for a non-generic handler | batching, when we can check all permissions in one call to api/method / even if there is some inher can use generic handler | pending near-literal block |
| `S-081` | 1 | Requirements sometimes need to be considered together | requirements need to be considered together / !!!! | pending near-literal block |
| `S-082` | 1 | AuthorizationMiddleware reads requirement-producing endpoint metadata | example / IAuthorizationRequirementData | pending near-literal block |
| `S-083` | 1 | ScopeCanEditHandler as alternative to AdminCanEditHandler | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / when policy might succeed when one handler didnt call success | pending near-literal block |
| `S-084` | 1 | Policy with SameTenant, DocumentSensitivity, and Clearance requirements | requirements need to be considered together / !!!! | pending near-literal block |
| `S-085` | 1 | Scope versus role | better to add fallbackpolicy and mark allowanonymus where you dont have it / scope claims | pending near-literal block |
| `S-086` | 1 | Unrelated document requirements still belong to one authorization domain | different requirement types one logical domain / batching, when we can check all permissions in one call to api/method | pending near-literal block |
| `S-087` | 1 | BatchedPermissionHandler dependency and constructor | batching, when we can check all permissions in one call to api/method / !!!! | pending near-literal block |
| `S-088` | 1 | HasScope helper implementation | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / better to add fallbackpolicy and mark allowanonymus where you dont have it | pending near-literal block |
| `S-089` | 1 | DocumentAuthorizationHandler loads a document once | different requirement types one logical domain / batching, when we can check all permissions in one call to api/method | pending near-literal block |
| `S-090` | 1 | Batched permission check over all pending IPermissionRequirement items | batching, when we can check all permissions in one call to api/method / !!!! | pending near-literal block |
| `S-091` | 1 | Non-generic handler sees the full pending requirement set | !!!! / requirements need to be considered together | pending near-literal block |
| `S-092` | 1 | ClaimsPrincipal can satisfy a claim across multiple identities | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / when policy might succeed when one handler didnt call success | pending near-literal block |

## R06 — FallbackPolicy, AllowAnonymous, combined rules and the AND/OR mental model

| Source | Placements | Review title | Nearest canvas text | Transcript |
|---|---:|---|---|---|
| `S-093` | 1 | Secure-by-default authorization and why AllowAnonymous matters | better to add fallbackpolicy and mark allowanonymus where you dont have it / scope claims | pending near-literal block |
| `S-094` | 1 | Switch over pending document requirements | different requirement types one logical domain / when need to succeed all fail all based on one thing | pending near-literal block |
| `S-095` | 1 | Succeed every granted permission requirement after one batch lookup | when need to succeed all fail all based on one thing / !!!! | pending near-literal block |
| `S-096` | 1 | Three requirements become one permission-service call | when need to succeed all fail all based on one thing / !!!! | pending near-literal block |
| `S-097` | 1 | Claim can come from an external identity even when app cookie lacks it | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / better to add fallbackpolicy and mark allowanonymus where you dont have it | pending near-literal block |
| `S-098` | 1 | FallbackPolicy secure-by-default configuration | better to add fallbackpolicy and mark allowanonymus where you dont have it / scope claims | pending near-literal block |
| `S-099` | 1 | Dispatcher code for DocumentNotLocked and CanOverrideLock | when need to succeed all fail all based on one thing / different requirement types one logical domain | pending near-literal block |
| `S-100` | 1 | Policy AND across requirements; OR across handlers for one requirement | can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) / better to add fallbackpolicy and mark allowanonymus where you dont have it | pending near-literal block |
| `S-101` | 1 | Non-generic handler advantage: load document and user data once | when need to succeed all fail all based on one thing / different requirement types one logical domain | pending near-literal block |
| `S-102` | 1 | AllowAnonymous escape hatch with fallback policy | better to add fallbackpolicy and mark allowanonymus where you dont have it / scope claims | pending near-literal block |
| `S-103` | 1 | Quick mental model: policy AND, requirement OR across handlers | better to add fallbackpolicy and mark allowanonymus where you dont have it / can edit requirement admincanedithandler scopehandler (IAuthorizaitonHandler not gen) | pending near-literal block |
| `S-104` | 1 | Scopes plus handler behavior and when Fail makes sense | better to add fallbackpolicy and mark allowanonymus where you dont have it / scope claims | pending near-literal block |

## R07 — Cross-requirement success, custom failure and dynamic authorization engines

| Source | Placements | Review title | Nearest canvas text | Transcript |
|---|---:|---|---|---|
| `S-105` | 1 | One condition can succeed several different requirements | when need to succeed all fail all based on one thing / auth rule dispatcher (switch inside) | pending near-literal block |
| `S-106` | 1 | Custom failure logic based on a combination | when need to succeed all fail all based on one thing / auth rule dispatcher (switch inside) | pending near-literal block |
| `S-107` | 1 | SystemAdmin bypass succeeds all document requirements | when need to succeed all fail all based on one thing / auth rule dispatcher (switch inside) | pending near-literal block |
| `S-108` | 1 | Archived document causes explicit authorization failure | when need to succeed all fail all based on one thing / auth rule dispatcher (switch inside) | pending near-literal block |
| `S-109` | 1 | Central document authorization switch with owner and tenant checks | auth rule dispatcher (switch inside) / when need to succeed all fail all based on one thing | pending near-literal block |
| `S-110` | 1 | Dynamic dispatch from metadata using OperationRequirement | auth rule dispatcher (switch inside) / when need to succeed all fail all based on one thing | pending near-literal block |
| `S-111` | 1 | Mixed requirement marker types in a domain authorization engine | auth rule dispatcher (switch inside) / when need to succeed all fail all based on one thing | pending near-literal block |
| `S-112` | 1 | DomainAuthorizationHandler delegates heterogeneous requirements to a rule evaluator | auth rule dispatcher (switch inside) / when need to succeed all fail all based on one thing | pending near-literal block |
