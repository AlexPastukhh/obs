# R04 — Near-literal source transcript: Scope policies, endpoint requirement metadata, explicit deny and alternative handlers

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-061` through `S-076`  
Mode: near-literal normalized source transcript. Obvious OCR glyph errors are corrected; exact punctuation and provider-specific formatting remain authoritative in the preserved images.

---

## S-061 — Register ScopeRequirementHandler and ProductsRead/ProductsWrite policies

```text
source_id: S-061
image hash: f3ec0ebfd96d
image: source/images/S-061__f3ec0ebfd96d.png
placements: 2
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
3. Register handler + policies

builder.Services.AddSingleton<IAuthorizationHandler, ScopeRequirementHandler>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ProductsRead", policy =>
        policy.AddRequirements(new ScopeRequirement("products:read")));

    options.AddPolicy("ProductsWrite", policy =>
        policy.AddRequirements(new ScopeRequirement("products:write")));
});
```

### Key point

Register ScopeRequirementHandler and ProductsRead/ProductsWrite policies.

Nearby canvas notes:

- using Microsoft.AspNetCore.Authorization; / using System.Security.Claims; / public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> / { / protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) / { / if (HasScope(context.User, requirement.Scope)) / context.Succeed(requirement); / return Task.CompletedTask; // do nothing => not satisfied / } / private static bool HasScope(ClaimsPrincipal user, string needed) / { / // gather all possible scope strings / var values = user.FindAll("scope").Select(c => c.Value) / .Concat(user.FindAll("scp").Select(c => c.Value)); / foreach (var v in values) / { / // handle both "a b c" and single-value / var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); / if (scopes.Contains(needed, StringComparer.Ordinal)) / return true; / } / return false; / } / }
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: Register ScopeRequirementHandler and ProductsRead/ProductsWrite policies.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-062 — IAuthorizationRequirementData produces requirements from endpoint metadata

```text
source_id: S-062
image hash: 53992f53f0e5
image: source/images/S-062__53992f53f0e5.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
2) What is IAuthorizationRequirementData / requirement metadata?
IAuthorizationRequirementData is endpoint metadata that can produce authorization requirements.
Microsoft describes it directly as an interface that can produce authorization requirements. wicesot iam
```

### Key point

IAuthorizationRequirementData produces requirements from endpoint metadata.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: IAuthorizationRequirementData produces requirements from endpoint metadata.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-063 — Middleware code combines IAuthorizationRequirementData into effective policy

```text
source_id: S-063
image hash: add7639454fb
image: source/images/S-063__add7639454fb.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
The framework source-code path shown in the screenshot is conceptually:

var requirementData = endpoint?.Metadata
    .GetOrderedMetadata<IAuthorizationRequirementData>()
    ?? Array.Empty<IAuthorizationRequirementData>();

if (requirementData.Count > 0)
{
    var requirementsPolicy = new AuthorizationPolicyBuilder();

    foreach (var metadata in requirementData)
    {
        foreach (var requirement in metadata.GetRequirements())
        {
            requirementsPolicy.AddRequirements(requirement);
        }
    }

    policy = policy is null
        ? requirementsPolicy.Build()
        : AuthorizationPolicy.Combine(
            policy,
            requirementsPolicy.Build());
}
```

### Key point

Middleware code combines IAuthorizationRequirementData into effective policy.

Nearby canvas notes:

- case in authoriz / middleware
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: Middleware code combines IAuthorizationRequirementData into effective policy.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-064 — Why a policy can still succeed when one handler does nothing

```text
source_id: S-064
image hash: 33f8b19af7d1
image: source/images/S-064__33f8b19af7d1.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Why a policy might still succeed even if a handler "does nothing"

Two key rules:

1. A policy succeeds only if every requirement in the policy is satisfied, and none explicitly |Fail() -

2. A requirement can be handled by multiple handlers. If one handler does nothing, another handler may

still call Succeed(requirement), so that requirement becomes satisfied.

So "do nothing" only means this handler didn't satisfy it — not that it can't be satisfied by someone else.
```

### Key point

Why a policy can still succeed when one handler does nothing.

Nearby canvas notes:

- when policy might succeed when / one handler didnt call success
- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)

### Repetition questions

1. Why a policy can still succeed when one handler does nothing?
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-065 — Succeed, do nothing, and Fail semantics in authorization handlers

```text
source_id: S-065
image hash: d4e2dff67ec6
image: source/images/S-065__d4e2dff67ec6.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
1) context.Succeed, "do nothing", and context.Fail() in authorization handlers

In an AuthorizationHandler, you typically evaluate a requirement and then either:

.

context.Succeed(requirement) — this requirement is satisfied

.

do nothing ~ this requirement is not satisfied (policy may still succeed if another handler succeeds for

the same requirement type, or if there are other requirements)

.

context.Fail() — hard fail: authorization fails even if other requirements/handlers would otherwise

succeed

When would you use context.Fail() ?

Use |Fail() when you want an explicit "deny overrides allow" behavior — i.e, certain conditions must

immediately block access.
```

### Key point

Succeed, do nothing, and Fail semantics in authorization handlers.

Nearby canvas notes:

- scope claims
- why to not use context.fail everywhere, multiple handlers registered / for one requirement

### Repetition questions

1. Explain and reconstruct the rule or example: Succeed, do nothing, and Fail semantics in authorization handlers.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-066 — Using ProductsRead and ProductsWrite policies in controllers

```text
source_id: S-066
image hash: feb930e951d0
image: source/images/S-066__feb930e951d0.png
placements: 2
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
4. Use in controllers

[Authorize(Policy = "ProductsRead")]
[HttpGet("/api/products")]
public IActionResult GetProducts() => Ok();

[Authorize(Policy = "ProductsWrite")]
[HttpPost("/api/products")]
public IActionResult CreateProduct() => Ok();
```

### Key point

Using ProductsRead and ProductsWrite policies in controllers.

Nearby canvas notes:

- using Microsoft.AspNetCore.Authorization; / using System.Security.Claims; / public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> / { / protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) / { / if (HasScope(context.User, requirement.Scope)) / context.Succeed(requirement); / return Task.CompletedTask; // do nothing => not satisfied / } / private static bool HasScope(ClaimsPrincipal user, string needed) / { / // gather all possible scope strings / var values = user.FindAll("scope").Select(c => c.Value) / .Concat(user.FindAll("scp").Select(c => c.Value)); / foreach (var v in values) / { / // handle both "a b c" and single-value / var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); / if (scopes.Contains(needed, StringComparer.Ordinal)) / return true; / } / return false; / } / }
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: Using ProductsRead and ProductsWrite policies in controllers.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-067 — MinimumAge attribute as requirement metadata

```text
source_id: S-067
image hash: eb7f882e6cb1
image: source/images/S-067__eb7f882e6cb1.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
4) Example of requirement metadata
Imagine you want this:
[MinimumAge(18)]
public IActionResult BuyAlcohol()
return Ok();
```

### Key point

MinimumAge attribute as requirement metadata.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: MinimumAge attribute as requirement metadata.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-068 — Shared IPermissionRequirement interface can enable a generic handler

```text
source_id: S-068
image hash: dc5cf22cf3cb
image: source/images/S-068__dc5cf22cf3cb.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
If different requirement types share an interface:

public interface IPermissionRequirement
    : IAuthorizationRequirement
{
}

then they can often be handled with:

AuthorizationHandler<IPermissionRequirement>

In that case, a non-generic handler may not be necessary.
```

### Key point

Shared IPermissionRequirement interface can enable a generic handler.

Nearby canvas notes:

- even if there is some inher / can use generic handler
- batching, when we can / check all permissions in / one call to api/method

### Repetition questions

1. Explain and reconstruct the rule or example: Shared IPermissionRequirement interface can enable a generic handler.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-069 — Endpoint metadata requirements are added to the normal policy

```text
source_id: S-069
image hash: ea0842f7788b
image: source/images/S-069__ea0842f7788b.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Meaning:
Endpoint has metadata that can produce requirements
-> middleware asks each metadata item for requirements
-> builds a mini policy from those requirements
-> combines it with the normal policy
```

### Key point

Endpoint metadata requirements are added to the normal policy.

Nearby canvas notes:

- case in authoriz / middleware
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: Endpoint metadata requirements are added to the normal policy.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-070 — Legitimate explicit Fail cases: blocked account, revoked token, tenant violation, MFA, malformed claims

```text
source_id: S-070
image hash: 0e8228f66e5d
image: source/images/S-070__0e8228f66e5d.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Common cases:
1. Account is disabled / banned / locked
Even if the user has the right role/scope, you want to deny.
* Example: user.IsBlocked == true  -> Fail()
2. Security stamp / token revoked
You detect the token is no longer valid (revoked session, password changed, logout-all, etc).
* You might check a claim like sstamp and compare with DB.
3. Tenant boundary violation (multi-tenant apps)
User is authenticated and has permissions, but tries to access a different tenant.
* Example: route has tenantId, user claim has tenantId, mismatch -> Fail()
4. High-assurance requirement not met
You require MFA or a fresh login for sensitive actions.
- Example: missing amr=mfa claim -> Fail()
5. Suspicious / malformed claims
If the token contains a required claim but it's malformed (eg., cannot parse), you may choose to hard
fail rather than "not satisfied" (which could be accidentally satisfied by some other path).
```

### Key point

Legitimate explicit Fail cases: blocked account, revoked token, tenant violation, MFA, malformed claims.

Nearby canvas notes:

- scope claims
- better to add fallbackpolicy / and mark allowanonymus where you dont have / it

### Technical clarification

- Some examples such as revoked tokens or malformed security-critical claims may be better rejected during authentication. They are shown here as explicit-deny authorization scenarios because that is the source context.

### Repetition questions

1. Explain and reconstruct the rule or example: Legitimate explicit Fail cases: blocked account, revoked token, tenant violation, MFA, malformed claims.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-071 — Policy config with one CanEditProductRequirement and two alternative handlers

```text
source_id: S-071
image hash: 53bb0e186368
image: source/images/S-071__53bb0e186368.png
placements: 3
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Policy config:

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanEditProduct", policy =>
        policy.AddRequirements(new CanEditProductRequirement()));
});

builder.Services.AddSingleton<IAuthorizationHandler, AdminCanEditHandler>();
builder.Services.AddSingleton<IAuthorizationHandler, ScopeCanEditHandler>();

Result:
- user is not Admin -> the Admin handler does nothing;
- user has `products:write` -> the scope handler succeeds;
- the requirement is satisfied and the policy can succeed.
```

### Key point

Policy config with one CanEditProductRequirement and two alternative handlers.

Nearby canvas notes:

- using Microsoft.AspNetCore.Authorization; / using System.Security.Claims; / public sealed class ScopeRequirementHandler : AuthorizationHandler<ScopeRequirement> / { / protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement) / { / if (HasScope(context.User, requirement.Scope)) / context.Succeed(requirement); / return Task.CompletedTask; // do nothing => not satisfied / } / private static bool HasScope(ClaimsPrincipal user, string needed) / { / // gather all possible scope strings / var values = user.FindAll("scope").Select(c => c.Value) / .Concat(user.FindAll("scp").Select(c => c.Value)); / foreach (var v in values) / { / // handle both "a b c" and single-value / var scopes = v.Split(' ', StringSplitOptions.RemoveEmptyEntries); / if (scopes.Contains(needed, StringComparer.Ordinal)) / return true; / } / return false; / } / }
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: Policy config with one CanEditProductRequirement and two alternative handlers.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-072 — MinimumAgeAttribute implements IAuthorizationRequirementData

```text
source_id: S-072
image hash: a88dbef74a0d
image: source/images/S-072__a88dbef74a0d.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
You can make the attribute itself produce requirements:

public sealed class MinimumAgeAttribute
    : Attribute, IAuthorizationRequirementData
{
    public MinimumAgeAttribute(int age)
    {
        Age = age;
    }

    public int Age { get; }

    public IEnumerable<IAuthorizationRequirement> GetRequirements()
    {
        yield return new MinimumAgeRequirement(Age);
    }
}
```

### Key point

MinimumAgeAttribute implements IAuthorizationRequirementData.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: MinimumAgeAttribute implements IAuthorizationRequirementData.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-073 — Same requirement with multiple handlers gives OR-style satisfaction

```text
source_id: S-073
image hash: 57a1c9463450
image: source/images/S-073__57a1c9463450.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Example 1: Same requirement, multiple handlers (OR-style across handlers)
Suppose you create one requirement: CanEditProductRequirement, and you register two handlers:
* Handler A: allows if user has role Admin
- Handler B: allows if user has scope (products: write
Policy contains one requirement: CanEditProductRequirement
If the user is not Admin, handler A does nothing, but handler B might succeed.
```

### Key point

Same requirement with multiple handlers gives OR-style satisfaction.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- when policy might succeed when / one handler didnt call success

### Repetition questions

1. Explain and reconstruct the rule or example: Same requirement with multiple handlers gives OR-style satisfaction.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-074 — CanEditProductRequirement marker type

```text
source_id: S-074
image hash: 04334976e0ab
image: source/images/S-074__04334976e0ab.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Requirement
public sealed class CanEditProductRequirement : IAuthorizationRequirement { }
```

### Key point

CanEditProductRequirement marker type.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- when policy might succeed when / one handler didnt call success

### Repetition questions

1. Explain and reconstruct the rule or example: CanEditProductRequirement marker type.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-075 — When not to call Fail for a missing permission

```text
source_id: S-075
image hash: a5869fcb8619
image: source/images/S-075__a5869fcb8619.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
When you should NOT use Fail()
Most "permission not present" checks should simply do nothing.

* Example: user lacks products:write scope — do nothing (policy fails naturally)
Fail() is for explicit deny conditions, not just "didn't match".
```

### Key point

When not to call Fail for a missing permission.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- scope claims

### Repetition questions

1. When not to call Fail for a missing permission?
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-076 — MinimumAgeRequirement class with Age

```text
source_id: S-076
image hash: 176e59d437a2
image: source/images/S-076__176e59d437a2.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Then:
oH (ay
public sealed class MinimumAgeRequirement : IAuthorizationRequirement
public int Age { get; }
public MinimumAgeRequirement(int age)
Age = age;
```

### Key point

MinimumAgeRequirement class with Age.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: MinimumAgeRequirement class with Age.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

# R04 closure

```text
unique source blocks: 16 / 16
remaining in region: 0
whole-conspect remaining after this region: 36
```
