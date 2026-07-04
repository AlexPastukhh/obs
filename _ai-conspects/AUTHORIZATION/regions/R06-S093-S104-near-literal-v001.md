# R06 — Near-literal source transcript: FallbackPolicy, AllowAnonymous, policy AND and handler OR semantics

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-093` through `S-104`  
Mode: near-literal normalized source transcript. Obvious OCR glyph errors are corrected; exact punctuation and provider-specific formatting remain authoritative in the preserved images.

---

## S-093 — Secure-by-default authorization and why AllowAnonymous matters

```text
source_id: S-093
image hash: e275ce3b3e5d
image: source/images/S-093__e275ce3b3e5d.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
3) Default authorization and why [AllowAnonymous] matters
By default in ASP.NET Core, endpoints are anonymous unless you require authorization.
There are two common ways to require authorization:
A) Attribute-based
- Put [Authorize] on controllers/actions you want protected
* Put [AllowAnonymous] on specific actions that must be public
B) Secure-by-default (recommended): FallbackPolicy
You configure the app so everything requires auth, unless explicitly marked public.
```

### Key point

Secure-by-default authorization and why AllowAnonymous matters.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: Secure-by-default authorization and why AllowAnonymous matters.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-094 — Switch over pending document requirements

```text
source_id: S-094
image hash: 1c3aff5862e8
image: source/images/S-094__1c3aff5862e8.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
foreach (var requirement in context.PendingRequirements.ToList())
{
    switch (requirement)
    {
        case MustOwnDocumentRequirement:
            if (document.OwnerId == context.User.FindFirst("sub")?.Value)
            {
                context.Succeed(requirement);
            }
            break;

        case SameTenantRequirement:
            if (document.TenantId == context.User.FindFirst("tenant")?.Value)
            {
                context.Succeed(requirement);
            }
            break;

        // Additional cases continue in later sources.
    }
}
```

### Key point

Switch over pending document requirements.

Nearby canvas notes:

- different requirement types / one logical domain
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: Switch over pending document requirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-095 — Succeed every granted permission requirement after one batch lookup

```text
source_id: S-095
image hash: fda2f4c38289
image: source/images/S-095__fda2f4c38289.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
foreach (var requirement in permissionRequirements)
{
    if (granted.Contains(requirement.Permission))
    {
        context.Succeed(requirement);
    }
}
```

### Key point

Succeed every granted permission requirement after one batch lookup.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- !!!!

### Repetition questions

1. Explain and reconstruct the rule or example: Succeed every granted permission requirement after one batch lookup.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-096 — Three requirements become one permission-service call

```text
source_id: S-096
image hash: ed7d40e607c1
image: source/images/S-096__ed7d40e607c1.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
This can turn:

3 requirements > 3 permission checks
into:

3 requirements > 1 permission check
That is one of the strongest practical reasons for non-generic, even when an interface exists.
```

### Key point

Three requirements become one permission-service call.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- !!!!

### Repetition questions

1. Explain and reconstruct the rule or example: Three requirements become one permission-service call.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-097 — Claim can come from an external identity even when app cookie lacks it

```text
source_id: S-097
image hash: 40395a24e3fd
image: source/images/S-097__40395a24e3fd.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Real scenario

You sign in using Azure AD (external provider) and it provides department, but your app cookie doesn't
have it yet (or you didn't copy it). If both identities are present, the claim can still be found.

Key idea: the requirement is "does the user have the claim?", not "does this specific identity have it?".
```

### Key point

Claim can come from an external identity even when app cookie lacks it.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- better to add fallbackpolicy / and mark allowanonymus where you dont have / it

### Repetition questions

1. Explain and reconstruct the rule or example: Claim can come from an external identity even when app cookie lacks it.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-098 — FallbackPolicy secure-by-default configuration

```text
source_id: S-098
image hash: 50c168b40e35
image: source/images/S-098__50c168b40e35.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
That is what makes `[AllowAnonymous]` meaningful: it becomes the escape hatch.

Example: secure-by-default setup

using Microsoft.AspNetCore.Authorization;

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

Now every endpoint requires authentication by default, and public endpoints such as login, registration or health checks are explicitly marked `[AllowAnonymous]`.
```

### Key point

FallbackPolicy secure-by-default configuration.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- scope claims

### Technical clarification

- A fallback policy applies where no authorization metadata supplies another policy. Verify middleware ordering and deliberately mark public endpoints anonymous.

### Repetition questions

1. Explain and reconstruct the rule or example: FallbackPolicy secure-by-default configuration.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-099 — Dispatcher code for DocumentNotLocked and CanOverrideLock

```text
source_id: S-099
image hash: 7978e250ab4e
image: source/images/S-099__7978e250ab4e.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
case DocumentNotLockedRequirement:
    if (!document.IsLocked)
    {
        context.Succeed(requirement);
    }
    break;

case CanOverrideLockRequirement:
    if (context.User.IsInRole("Admin"))
    {
        context.Succeed(requirement);
    }
    break;
```

### Key point

Dispatcher code for DocumentNotLocked and CanOverrideLock.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- different requirement types / one logical domain

### Repetition questions

1. Explain and reconstruct the rule or example: Dispatcher code for DocumentNotLocked and CanOverrideLock.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-100 — Policy AND across requirements; OR across handlers for one requirement

```text
source_id: S-100
image hash: 01803b7cd13f
image: source/images/S-100__01803b7cd13f.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Example 3: A policy with multiple requirements, where one requirement can be
satisfied by multiple handlers
Policies are AND across requirements
If a policy includes:

1. Require authenticated user

2. CanEditProductRequirement
Then both must be satisfied.
But a single requirement can be satisfied by ANY handler (OR across handlers)
CanEditProductRequirement might have two handlers:

- Handler 1: succeed if role is Admin

* Handler 2: succeed if scope has products:write
If the scope handler does nothing (no matching scope), the admin handler can still call 'Succeed, so that
requirement becomes satisfied anyway.
```

### Key point

Policy AND across requirements; OR across handlers for one requirement.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- better to add fallbackpolicy / and mark allowanonymus where you dont have / it

### Repetition questions

1. Explain and reconstruct the rule or example: Policy AND across requirements; OR across handlers for one requirement.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-101 — Non-generic handler advantage: load document and user data once

```text
source_id: S-101
image hash: ddf8f9ad7ec8
image: source/images/S-101__ddf8f9ad7ec8.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Here the advantage is not "less allocation."

The advantage is:
Load document once.
Extract user info once.
Apply several document-related rules in one place.

That is a real reason.
```

### Key point

Non-generic handler advantage: load document and user data once.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- different requirement types / one logical domain

### Repetition questions

1. Explain and reconstruct the rule or example: Non-generic handler advantage: load document and user data once.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-102 — AllowAnonymous escape hatch with fallback policy

```text
source_id: S-102
image hash: a312e122724a
image: source/images/S-102__a312e122724a.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Example:

[AllowAnonymous]
[HttpGet("/login")]
public IActionResult Login() => View();

[Authorize] // optional when fallback already enforces authentication
[HttpGet("/me")]
public IActionResult Me() => Ok("private");

Why this is good:
It prevents "we forgot [Authorize]" bugs. The baseline becomes deny by default.
```

### Key point

AllowAnonymous escape hatch with fallback policy.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: AllowAnonymous escape hatch with fallback policy.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-103 — Quick mental model: policy AND, requirement OR across handlers

```text
source_id: S-103
image hash: 2e8974dda879
image: source/images/S-103__2e8974dda879.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
So the policy succeeds if:
* requirement #1 (authenticated) is met, AND
* requirement #2 is satisfied by at least one handler
If neither handler succeeds requirement #2 — policy fails.
Quick mental model
* Policy = AND of requirements
(all requirements must pass)
* Requirement = OR of handlers
(any handler can satisfy the same requirement)
* "Do nothing' = "this handler didn't grant it"
(another handler might)
```

### Key point

Quick mental model: policy AND, requirement OR across handlers.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)

### Repetition questions

1. Explain and reconstruct the rule or example: Quick mental model: policy AND, requirement OR across handlers.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-104 — Scopes plus handler behavior and when Fail makes sense

```text
source_id: S-104
image hash: 736c6f4be959
image: source/images/S-104__736c6f4be959.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Putting it together: scopes + handler + when Fail() makes sense
Imagine a policy "Must have |products:write scope, and must not be banned".

* Missing scope — just don't succeed (normal failure)

* Banned user -> Fail() (explicit deny)
That's the practical rule:

* No permission — not satisfied

Explicit deny condition — Fail()
```

### Key point

Scopes plus handler behavior and when Fail makes sense.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: Scopes plus handler behavior and when Fail makes sense.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

# R06 closure

```text
unique source blocks: 12 / 12
remaining in region: 0
whole-conspect remaining after this region: 8
```
