# R03 — Near-literal source transcript: Handler outcomes, claims, scopes and non-generic handler motivation

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-041` through `S-060`  
Mode: near-literal normalized source transcript. Obvious OCR glyph errors are corrected; exact punctuation and provider-specific formatting remain authoritative in the preserved images.

---

## S-041 — PermissionRequirement carrying a permission name

```text
source_id: S-041
image hash: 4b4872b88aa5
image: source/images/S-041__4b4872b88aa5.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
4. Another PendingRequirements example
Suppose you have several permission requirements:
public sealed class PermissionRequirement : IAuthorizationRequirement
public string Name { get; }
public PermissionRequirement(string name)
Name = name;
t
```

### Key point

PermissionRequirement carrying a permission name.

Nearby canvas notes:

- IAuthoriazationHandler / multiple requirements (usually of one type, / like scope requirement)
- Pendingrequirements

### Repetition questions

1. Explain and reconstruct the rule or example: PermissionRequirement carrying a permission name.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-042 — Inspecting claim issuer

```text
source_id: S-042
image hash: 100267b21ad0
image: source/images/S-042__100267b21ad0.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
How issuer is used in checks
At runtime
You can inspect:
" Ct
foreach (var claim in User.Claims)
// claim.Type, claim.Value, claim.Issuer
```

### Key point

Inspecting claim issuer.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: Inspecting claim issuer.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-043 — Claims and roles basics

```text
source_id: S-043
image hash: 50dd27627c25
image: source/images/S-043__50dd27627c25.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Claims, roles, and what they are
Claims
Key-value statements about the user, e.g.:
- sub=123
- email=alice@example.com
- permission=products.edit
In code:
" Ct
User.HasClaim("permission", "products.edit");
```

### Key point

Claims and roles basics.

Nearby canvas notes:

- BASIC, / GLOBAL AUTHORIZATION
- BASIC POLICIES IN ADDAUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: Claims and roles basics.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-044 — Succeed removes one specific requirement from PendingRequirements

```text
source_id: S-044
image hash: 03d12685fe2e
image: source/images/S-044__03d12685fe2e.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
5. context.Succeed(requirement)

Use this when the requirement passes.

" CH

if (allowed)

context.Succeed(requirement);

This removes the requirement from pending requirements

Mental model:

Before:

PendingRequirements contains requirement

After context.Succeed(requirement) :

PendingRequirements no longer contains requirement
```

### Key point

Succeed removes one specific requirement from PendingRequirements.

Nearby canvas notes:

- succeed(req)
- fail

### Repetition questions

1. Explain and reconstruct the rule or example: Succeed removes one specific requirement from PendingRequirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-045 — Handler outcomes: succeed, do nothing, or fail

```text
source_id: S-045
image hash: 02286505fe9f
image: source/images/S-045__02286505fe9f.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
How handlers decide
A handler can:
- context.Succeed(requirement) — satisfied
* do nothing — not satisfied
* (rare) context.Fail() — force fail even if others succeed
Rule: policy succeeds only if all requirements succeed and none explicitly fail.
```

### Key point

Handler outcomes: succeed, do nothing, or fail.

Nearby canvas notes:

- why to not use context.fail everywhere, multiple handlers registered / for one requirement
- CUSTOM POLICIES WITH AUTHORIZATION / HANDLERS WITH REQUIREMENTS

### Repetition questions

1. Explain and reconstruct the rule or example: Handler outcomes: succeed, do nothing, or fail.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-046 — One RequireClaim with several values is OR; separate calls are AND

```text
source_id: S-046
image hash: 4176eefdb469
image: source/images/S-046__4176eefdb469.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Small nuance: AND vs OR
- = RequireClaim("department", "Sales", "Marketing") means Sales OR Marketing
* If you write two calls:
" CH
policy.RequireClaim("department", "Sales");
policy.RequireClaim("department", "Marketing");
that becomes Sales AND Marketing (must have both claims)
```

### Key point

One RequireClaim with several values is OR; separate calls are AND.

Nearby canvas notes:

- IAuthorizationRequirementData
- example

### Repetition questions

1. Explain and reconstruct the rule or example: One RequireClaim with several values is OR; separate calls are AND.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-047 — Scope APIs, fallback secure default, and quick AuthorizeAsync reference

```text
source_id: S-047
image hash: b0ab22b9993e
image: source/images/S-047__b0ab22b9993e.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
"Scope" for APIs (OAuth-style)

JWT might include scope like "products:read products:write" .

Then you implement a requirement that parses the scope string.

Secure-by-default app

Use FallbackPolicy to require auth everywhere, add [AllowAnonymous] only where needed.

Testing authorization quickly

In a controller/action:

var ok = await _auth.AuthorizeAsync(User, "CanEditProducts");

if (!ok.Succeeded) return Forbid();
```

### Key point

Scope APIs, fallback secure default, and quick AuthorizeAsync reference.

Nearby canvas notes:

- why to not use context.fail everywhere, multiple handlers registered / for one requirement
- CUSTOM POLICIES WITH AUTHORIZATION / HANDLERS WITH REQUIREMENTS

### Technical clarification

- The screenshot uses a shortened policy authorization call. In application code, use an overload available in the target framework; the common policy-name form also supplies a resource, which may be `null` when the check is not resource-based.

### Repetition questions

1. Explain and reconstruct the rule or example: Scope APIs, fallback secure default, and quick AuthorizeAsync reference.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-048 — RequireClaim does not validate issuer; custom assertion example

```text
source_id: S-048
image hash: 950135defd92
image: source/images/S-048__950135defd92.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
In authorization policies

RequireClaim does not check issuer. It checks type and value.

If you want issuer filtering, use an assertion or a custom requirement:

options.AddPolicy("SalesFromTrustedIssuer", policy =>
{
    policy.RequireAssertion(context =>
        context.User.Claims.Any(claim =>
            claim.Type == "department" &&
            claim.Value == "Sales" &&
            claim.Issuer == "my-company"));
});
```

### Key point

RequireClaim does not validate issuer; custom assertion example.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: RequireClaim does not validate issuer; custom assertion example.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-049 — Controller resource-based edit flow and forbid result

```text
source_id: S-049
image hash: 511bad35c0ba
image: source/images/S-049__511bad35c0ba.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
public async Task<IActionResult> Edit(int id)
{
    var product = await _repo.GetAsync(id);
    if (product is null)
        return NotFound();

    var result = await _auth.AuthorizeAsync(
        User,
        product,
        "CanEditProduct");

    if (!result.Succeeded)
        return Forbid();

    return View(product);
}

Use resource-based authorization whenever the decision depends on data loaded from the resource, not only on claims or roles.
```

### Key point

Controller resource-based edit flow and forbid result.

Nearby canvas notes:

- when policy might succeed when / one handler didnt call success
- RESOURCE BASED AUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: Controller resource-based edit flow and forbid result.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-050 — Policy containing multiple PermissionRequirement instances

```text
source_id: S-050
image hash: 83102e372542
image: source/images/S-050__83102e372542.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Policy:

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanManageOrders", policy =>
    {
        policy.AddRequirements(new PermissionRequirement("Orders.Read"));
        policy.AddRequirements(new PermissionRequirement("Orders.Update"));
        policy.AddRequirements(new PermissionRequirement("Orders.Delete"));
    });
});
```

### Key point

Policy containing multiple PermissionRequirement instances.

Nearby canvas notes:

- NON Generic AuthorizationHandler
- IAuthoriazationHandler / multiple requirements (usually of one type, / like scope requirement)

### Repetition questions

1. Explain and reconstruct the rule or example: Policy containing multiple PermissionRequirement instances.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-051 — Roles are commonly represented as claims

```text
source_id: S-051
image hash: 77bb64bdf221
image: source/images/S-051__77bb64bdf221.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Roles
Roles are usually just claims with a "role claim type" (often ClaimTypes-Role).
```

### Key point

Roles are commonly represented as claims.

Nearby canvas notes:

- when policy might succeed when / one handler didnt call success
- case in authoriz / middleware

### Repetition questions

1. Explain and reconstruct the rule or example: Roles are commonly represented as claims.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-052 — Fail is stronger than leaving a requirement unsatisfied

```text
source_id: S-052
image hash: ca3340ce0142
image: source/images/S-052__ca3340ce0142.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
6. context.Fail()
Use this when you want to force failure.
if (userIsBanned)
context.Fail();
Important distinction:
No Succeed = this requirement did not pass.
Fail = the whole authorization should fail. J,
```

### Key point

Fail is stronger than leaving a requirement unsatisfied.

Nearby canvas notes:

- fail
- succeed(req)

### Technical clarification

- `Fail()` guarantees a failed final result. Other handlers may still execute depending on authorization options; their later `Succeed` calls do not reverse the explicit failure.

### Repetition questions

1. Explain and reconstruct the rule or example: Fail is stronger than leaving a requirement unsatisfied.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-053 — Authorization pitfalls and practical checklist

```text
source_id: S-053
image hash: ba2327778ece
image: source/images/S-053__ba2327778ece.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Pitfalls (big ones)

.

Don't authorize in the view only. Views are Ul; always enforce on server.

.

Don't trust client-sent IDs/hidden fields for ownership/permissions.

.

Don't put DB logic in views; use handlers/services.

Remember scheme selection if you have Cookies + Bearer.

401 vs 403: return Challenge() for 401, Forbid() for 403 (MVC will often handle redirects for cookies).
```

### Key point

Authorization pitfalls and practical checklist.

Nearby canvas notes:

- why to not use context.fail everywhere, multiple handlers registered / for one requirement
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: Authorization pitfalls and practical checklist.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-054 — JWT issuer notes and validation rules

```text
source_id: S-054
image hash: 356780cb4a6c
image: source/images/S-054__356780cb4a6c.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
JWT note (why you see it a lot)

When claims come from a JWT, the issuer is typically derived from the token's issuer (iss) and the

authentication handler. So issuer can help ensure claims came from the validated token you expect.

Quick rule of thumb

.

Most apps ignore claim issuer day-to-day.

.

You care about issuer when:

.

you combine claims from multiple identity providers

.

you want to trust only "internal" claims for authorization
```

### Key point

JWT issuer notes and validation rules.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Technical clarification

- Issuer is only useful after the authentication configuration has established which issuers are trusted. Reading `Claim.Issuer` is not a substitute for validating tokens or external identities.

### Repetition questions

1. Explain and reconstruct the rule or example: JWT issuer notes and validation rules.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-055 — MultiPermissionHandler batches pending permission checks

```text
source_id: S-055
image hash: 7d5c2fc15633
image: source/images/S-055__7d5c2fc15633.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
One handler can inspect all pending permission requirements:

public sealed class MultiPermissionHandler : IAuthorizationHandler
{
    public Task HandleAsync(AuthorizationHandlerContext context)
    {
        var userPermissions = context.User
            .FindAll("Permission")
            .Select(claim => claim.Value)
            .ToHashSet();

        foreach (var requirement in context.PendingRequirements.ToList())
        {
            if (requirement is PermissionRequirement permission &&
                userPermissions.Contains(permission.Name))
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}

This handler can satisfy several permission requirements in one pass.
```

### Key point

MultiPermissionHandler batches pending permission checks.

Nearby canvas notes:

- NON Generic AuthorizationHandler
- even if there is some inher / can use generic handler

### Repetition questions

1. Explain and reconstruct the rule or example: MultiPermissionHandler batches pending permission checks.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-056 — ScopeRequirement definition and required scope value

```text
source_id: S-056
image hash: 961faf90010b
image: source/images/S-056__961faf90010b.png
placements: 2
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Scope claim example (realistic, reusable)

1. Define a scope requirement:

using Microsoft.AspNetCore.Authorization;

public sealed class ScopeRequirement : IAuthorizationRequirement
{
    public ScopeRequirement(string scope) => Scope = scope;

    public string Scope { get; }
}
```

### Key point

ScopeRequirement definition and required scope value.

Nearby canvas notes:

- scope claims
- using Microsoft.AspNetCore.Authorization; / using System.Security.Claims; / public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> / { / protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) / { / if (HasScope(context.User, requirement.Scope)) / context.Succeed(requirement); / return Task.CompletedTask; // do nothing => not satisfied / } / private static bool HasScope(ClaimsPrincipal user, string needed) / { / // gather all possible scope strings / var values = user.FindAll("scope").Select(c => c.Value) / .Concat(user.FindAll("scp").Select(c => c.Value)); / foreach (var v in values) / { / // handle both "a b c" and single-value / var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); / if (scopes.Contains(needed, StringComparer.Ordinal)) / return true; / } / return false; / } / }

### Repetition questions

1. Explain and reconstruct the rule or example: ScopeRequirement definition and required scope value.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-057 — ScopeRequirementHandler supports scope/scp and repeated claims

```text
source_id: S-057
image hash: a58a93244dc4
image: source/images/S-057__a58a93244dc4.png
placements: 2
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
2. Handler that supports common claim formats

Supports:
- `scope`: `a b c` (space-separated);
- `scp`: `a b c`;
- multiple `scope` claims.

using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public sealed class ScopeRequirementHandler
    : AuthorizationHandler<ScopeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ScopeRequirement requirement)
    {
        if (HasScope(context.User, requirement.Scope))
            context.Succeed(requirement);

        return Task.CompletedTask; // do nothing => not satisfied
    }
}
```

### Key point

ScopeRequirementHandler supports scope/scp and repeated claims.

Nearby canvas notes:

- scope claims
- using Microsoft.AspNetCore.Authorization; / using System.Security.Claims; / public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> / { / protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) / { / if (HasScope(context.User, requirement.Scope)) / context.Succeed(requirement); / return Task.CompletedTask; // do nothing => not satisfied / } / private static bool HasScope(ClaimsPrincipal user, string needed) / { / // gather all possible scope strings / var values = user.FindAll("scope").Select(c => c.Value) / .Concat(user.FindAll("scp").Select(c => c.Value)); / foreach (var v in values) / { / // handle both "a b c" and single-value / var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); / if (scopes.Contains(needed, StringComparer.Ordinal)) / return true; / } / return false; / } / }

### Technical clarification

- Actual scope claim shape is provider-specific. A handler should support only the formats produced by the configured authentication system and should use an intentional comparison mode.

### Repetition questions

1. Explain and reconstruct the rule or example: ScopeRequirementHandler supports scope/scp and repeated claims.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-058 — HasScope helper parses space-separated scope values

```text
source_id: S-058
image hash: d9fa3dcf0f55
image: source/images/S-058__d9fa3dcf0f55.png
placements: 2
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
private static bool HasScope(ClaimsPrincipal user, string needed)
{
    var values = user.FindAll("scope")
        .Select(claim => claim.Value)
        .Concat(user.FindAll("scp").Select(claim => claim.Value));

    foreach (var value in values)
    {
        var scopes = value.Split(
            ' ',
            StringSplitOptions.RemoveEmptyEntries);

        if (scopes.Contains(needed, StringComparer.Ordinal))
            return true;
    }

    return false;
}
```

### Key point

HasScope helper parses space-separated scope values.

Nearby canvas notes:

- using Microsoft.AspNetCore.Authorization; / using System.Security.Claims; / public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> / { / protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) / { / if (HasScope(context.User, requirement.Scope)) / context.Succeed(requirement); / return Task.CompletedTask; // do nothing => not satisfied / } / private static bool HasScope(ClaimsPrincipal user, string needed) / { / // gather all possible scope strings / var values = user.FindAll("scope").Select(c => c.Value) / .Concat(user.FindAll("scp").Select(c => c.Value)); / foreach (var v in values) / { / // handle both "a b c" and single-value / var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); / if (scopes.Contains(needed, StringComparer.Ordinal)) / return true; / } / return false; / } / }
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: HasScope helper parses space-separated scope values.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-059 — When a non-generic authorization handler is useful

```text
source_id: S-059
image hash: b3d3860e13e1
image: source/images/S-059__b3d3860e13e1.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
The non-generic handler becomes more useful when:
1. You want to handle different unrelated requirement types in one logical place.
2. You want to inspect all pending requirements together and make a grouped decision.
3. You want to batch work, like one DB/API call for many requirement types.
4. You need to interact with the whole AuthorizationHandlerContext in a way the generic handler shape
makes awkward.
5. You want one "authorization engine" style handler that dispatches by is / switch.
```

### Key point

When a non-generic authorization handler is useful.

Nearby canvas notes:

- When non generic
- even if there is some inher / can use generic handler

### Repetition questions

1. When a non-generic authorization handler is useful?
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-060 — Generic handler is usually enough for one requirement type

```text
source_id: S-060
image hash: 2e29e7d75841
image: source/images/S-060__2e29e7d75841.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
For requirements of one concrete type, a generic handler is usually enough:
o (ay
AuthorizationHandler<PermissionRequirement>
Using non-generic IAuthorizationHandler only to avoid one extra handler class/service is usually not worth
it.
```

### Key point

Generic handler is usually enough for one requirement type.

Nearby canvas notes:

- even if there is some inher / can use generic handler
- NON Generic AuthorizationHandler

### Repetition questions

1. Explain and reconstruct the rule or example: Generic handler is usually enough for one requirement type.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

# R03 closure

```text
unique source blocks: 20 / 20
remaining in region: 0
whole-conspect remaining after this region: 52
```
