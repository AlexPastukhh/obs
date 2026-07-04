# R05 — Near-literal source transcript: OAuth scopes, generic/non-generic handlers, batching and cross-requirement decisions

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-077` through `S-092`  
Mode: near-literal normalized source transcript. Obvious OCR glyph errors are corrected; exact punctuation and provider-specific formatting remain authoritative in the preserved images.

---

## S-077 — AdminCanEditHandler role-based alternative

```text
source_id: S-077
image hash: a5e708f3becb
image: source/images/S-077__a5e708f3becb.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Handler A (role-based)

using Microsoft.AspNetCore.Authorization;

public sealed class AdminCanEditHandler
    : AuthorizationHandler<CanEditProductRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        CanEditProductRequirement requirement)
    {
        if (context.User.IsInRole("Admin"))
            context.Succeed(requirement);

        // otherwise do nothing
        return Task.CompletedTask;
    }
}
```

### Key point

AdminCanEditHandler role-based alternative.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- when policy might succeed when / one handler didnt call success

### Repetition questions

1. Explain and reconstruct the rule or example: AdminCanEditHandler role-based alternative.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-078 — OAuth scopes: meaning, claim formats, least privilege, and roles comparison

```text
source_id: S-078
image hash: 6c9ff652a3d2
image: source/images/S-078__6c9ff652a3d2.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
2) What "scopes" are (OAuth-style)
A scope is a string that represents a permission the client/application is requesting (and the user/admin is
granting).
Examples:
- products:read
*  products:write
- orders:refund
- admin
In JWTs, scopes commonly appear as:
* asingle string claim: "scope": "products:read products:write" (space-separated), or
* anarray claim: "scp": ["products:read", "products:write"], OF
* multiple claims: scope=products:read repeated
Why scopes exist
Scopes are mainly for API authorization:
They're more granular than roles
- They work well with OAuth/OIDC where a client requests specific access
* They let you do "least privilege" tokens (read-ont token vs write token)
```

### Key point

OAuth scopes: meaning, claim formats, least privilege, and roles comparison.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- scope claims

### Repetition questions

1. Explain and reconstruct the rule or example: OAuth scopes: meaning, claim formats, least privilege, and roles comparison.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-079 — Non-generic handler for unrelated requirement types in one domain

```text
source_id: S-079
image hash: 141bd552a656
image: source/images/S-079__141bd552a656.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
3) Your best non-generic case: unrelated requirement types, one
logical domain
This is probably the clearest use case.
Example:
public sealed class MustOwnDocumentRequirement : IAuthorizationRequirement
public sealed class SameTenantRequirement : IAuthorizationRequirement
public sealed class DocumentNotLockedRequirement : IAuthorizationRequirement
public sealed class CanOverrideLockRequirement : IAuthorizationRequirement
}
```

### Key point

Non-generic handler for unrelated requirement types in one domain.

Nearby canvas notes:

- different requirement types / one logical domain
- batching, when we can / check all permissions in / one call to api/method

### Repetition questions

1. Explain and reconstruct the rule or example: Non-generic handler for unrelated requirement types in one domain.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-080 — Batching is a strong reason for a non-generic handler

```text
source_id: S-080
image hash: 4c0e5676fdb9
image: source/images/S-080__4c0e5676fdb9.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
5) But here is one real case where non-generic still wins: batching

The generic interface handler processes one requirement at a time:
o oO
AuthorizationHandler<IPermissionRequirement>

Conceptually:
Handle read
Handle edit
Handle delete
```

### Key point

Batching is a strong reason for a non-generic handler.

Nearby canvas notes:

- batching, when we can / check all permissions in / one call to api/method
- even if there is some inher / can use generic handler

### Repetition questions

1. Explain and reconstruct the rule or example: Batching is a strong reason for a non-generic handler.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-081 — Requirements sometimes need to be considered together

```text
source_id: S-081
image hash: 88a5bc258634
image: source/images/S-081__88a5bc258634.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
6) Another case: requirements need to be considered together
Generic handlers are naturally requirement-by-requirement.
But sometimes authorization logic depends on the set of requirements.
```

### Key point

Requirements sometimes need to be considered together.

Nearby canvas notes:

- requirements need / to be considered / together
- !!!!

### Repetition questions

1. Explain and reconstruct the rule or example: Requirements sometimes need to be considered together.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-082 — AuthorizationMiddleware reads requirement-producing endpoint metadata

```text
source_id: S-082
image hash: b73360104c71
image: source/images/S-082__b73360104c71.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Now the endpoint metadata contains an object that says:
I can produce authorization requirements.
So AuthorizationMiddleware reads it here:
oH (ay
endpoint.Metadata. GetOrderedMetadata<IAuthorizationRequirementData>()
and adds those requirements to the final policy.
```

### Key point

AuthorizationMiddleware reads requirement-producing endpoint metadata.

Nearby canvas notes:

- example
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: AuthorizationMiddleware reads requirement-producing endpoint metadata.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-083 — ScopeCanEditHandler as alternative to AdminCanEditHandler

```text
source_id: S-083
image hash: cfa71fe6f7a4
image: source/images/S-083__cfa71fe6f7a4.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Handler B (scope-based)

using Microsoft.AspNetCore.Authorization;

public sealed class ScopeCanEditHandler
    : AuthorizationHandler<CanEditProductRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        CanEditProductRequirement requirement)
    {
        if (HasScope(context.User, "products:write"))
            context.Succeed(requirement);

        // otherwise do nothing
        return Task.CompletedTask;
    }
}
```

### Key point

ScopeCanEditHandler as alternative to AdminCanEditHandler.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- when policy might succeed when / one handler didnt call success

### Repetition questions

1. Explain and reconstruct the rule or example: ScopeCanEditHandler as alternative to AdminCanEditHandler.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-084 — Policy with SameTenant, DocumentSensitivity, and Clearance requirements

```text
source_id: S-084
image hash: 0b2dd4897d20
image: source/images/S-084__0b2dd4897d20.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Example policy:
o (ay
options.AddPolicy("EditSensitiveDocument", policy =>
policy.Requirements.Add(new SameTenantRequirement());
policy.Requirements.Add(new DocumentSensitivityRequirement("High"));
policy.Requirements.Add(new ClearanceRequirement("Manager"));
Ys
You may want logic like:
If document is not sensitive:
succeed sensitivity requirement easily.
If document is highly sensitive:
SameTenant + Clearance must be checked together.
If user is SuperAdmin:
succeed all document requirements.
```

### Key point

Policy with SameTenant, DocumentSensitivity, and Clearance requirements.

Nearby canvas notes:

- requirements need / to be considered / together
- !!!!

### Repetition questions

1. Explain and reconstruct the rule or example: Policy with SameTenant, DocumentSensitivity, and Clearance requirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-085 — Scope versus role

```text
source_id: S-085
image hash: da475ed8995f
image: source/images/S-085__da475ed8995f.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Scope vs Role

* Role: who you are (group membership), often app-internal

* Scope: what this token is allowed to do (permission granted to this client/token)
It's common to use:

* roles for Ul/admin screens

* scopes for APIs

* sometimes both together
```

### Key point

Scope versus role.

Nearby canvas notes:

- better to add fallbackpolicy / and mark allowanonymus where you dont have / it
- scope claims

### Repetition questions

1. Compare the two sides of: Scope versus role.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-086 — Unrelated document requirements still belong to one authorization domain

```text
source_id: S-086
image hash: 79ddc4a4a107
image: source/images/S-086__79ddc4a4a107.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
These are not necessarily the same "kind" of requirement.
They are not naturally all IPermissionRequirement -
But they are all part of:
Document authorization
```

### Key point

Unrelated document requirements still belong to one authorization domain.

Nearby canvas notes:

- different requirement types / one logical domain
- batching, when we can / check all permissions in / one call to api/method

### Repetition questions

1. Explain and reconstruct the rule or example: Unrelated document requirements still belong to one authorization domain.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-087 — BatchedPermissionHandler dependency and constructor

```text
source_id: S-087
image hash: 4eefadefe8e9
image: source/images/S-087__4eefadefe8e9.png
placements: 1
boundary: continuation fragment; only visible content is transcribed
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
If the permission service supports batch checking, a non-generic handler can inspect all pending requirements first:

public sealed class BatchedPermissionHandler : IAuthorizationHandler
{
    private readonly IPermissionService _permissions;

    public BatchedPermissionHandler(IPermissionService permissions)
    {
        _permissions = permissions;
    }

    // HandleAsync continues in the next source.
}
```

### Key point

BatchedPermissionHandler dependency and constructor.

Nearby canvas notes:

- batching, when we can / check all permissions in / one call to api/method
- !!!!

### Repetition questions

1. Explain and reconstruct the rule or example: BatchedPermissionHandler dependency and constructor.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-088 — HasScope helper implementation

```text
source_id: S-088
image hash: 66d9fafd0903
image: source/images/S-088__66d9fafd0903.png
placements: 1
boundary: continuation fragment; only visible content is transcribed
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
private static bool HasScope(ClaimsPrincipal user, string needed)
{
    // Common format: scope = "a b c"
    var scope = user.FindFirst("scope")?.Value ?? string.Empty;
    var scopes = scope.Split(
        ' ',
        StringSplitOptions.RemoveEmptyEntries);

    return scopes.Contains(needed, StringComparer.Ordinal);
}
```

### Key point

HasScope helper implementation.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- better to add fallbackpolicy / and mark allowanonymus where you dont have / it

### Repetition questions

1. Explain and reconstruct the rule or example: HasScope helper implementation.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-089 — DocumentAuthorizationHandler loads a document once

```text
source_id: S-089
image hash: 36072269a0f4
image: source/images/S-089__36072269a0f4.png
placements: 1
boundary: continuation fragment; only visible content is transcribed
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
One non-generic handler can load the document once:

public sealed class DocumentAuthorizationHandler : IAuthorizationHandler
{
    private readonly IDocumentRepository _documents;

    public DocumentAuthorizationHandler(IDocumentRepository documents)
    {
        _documents = documents;
    }

    public async Task HandleAsync(AuthorizationHandlerContext context)
    {
        if (context.Resource is not int documentId)
            return;

        var document = await _documents.GetByIdAsync(documentId);
        if (document is null)
            return;

        // The requirement switch continues in later sources.
    }
}
```

### Key point

DocumentAuthorizationHandler loads a document once.

Nearby canvas notes:

- different requirement types / one logical domain
- batching, when we can / check all permissions in / one call to api/method

### Repetition questions

1. Explain and reconstruct the rule or example: DocumentAuthorizationHandler loads a document once.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-090 — Batched permission check over all pending IPermissionRequirement items

```text
source_id: S-090
image hash: cf0a31a01f5c
image: source/images/S-090__cf0a31a01f5c.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
public async Task HandleAsync(AuthorizationHandlerContext context)
{
    var permissionRequirements = context.PendingRequirements
        .OfType<IPermissionRequirement>()
        .ToList();

    if (permissionRequirements.Count == 0)
        return;

    var names = permissionRequirements
        .Select(requirement => requirement.Permission)
        .Distinct()
        .ToArray();

    var granted = await _permissions.GetGrantedPermissionsAsync(
        context.User,
        names);

    // Succeed calls continue in a later source.
}
```

### Key point

Batched permission check over all pending IPermissionRequirement items.

Nearby canvas notes:

- batching, when we can / check all permissions in / one call to api/method
- !!!!

### Repetition questions

1. Explain and reconstruct the rule or example: Batched permission check over all pending IPermissionRequirement items.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-091 — Non-generic handler sees the full pending requirement set

```text
source_id: S-091
image hash: 033de3a3aff9
image: source/images/S-091__033de3a3aff9.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
A non-generic handler can look at the full pending set:
o (ay
var pending = context.PendingRequirements.ToList();
var hasSensitivityRequirement =
pending.Of Type<DocumentSensitivityRequirement>().FirstOrDefault();
var hasClearanceRequirement =
pending.Of Type<ClearanceRequirement>().FirstOrDefault();
var hasTenantRequirement =
pending.Of Type<SameTenantRequirement>() .FirstOrDefault();
This is awkward if each requirement lives in a totally separate generic handler and they do not communicate.
To be clear: you can often redesign this. But non-generic gives you that "see the whole policy" style.
```

### Key point

Non-generic handler sees the full pending requirement set.

Nearby canvas notes:

- !!!!
- requirements need / to be considered / together

### Repetition questions

1. Explain and reconstruct the rule or example: Non-generic handler sees the full pending requirement set.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-092 — ClaimsPrincipal can satisfy a claim across multiple identities

```text
source_id: S-092
image hash: 5bbc661ec82d
image: source/images/S-092__5bbc661ec82d.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Example 2: Same requirement can be satisfied by different identity/claim sources
What it's saying

RequireClaim("department", "...") is a requirement in the policy.To pass, the user must have that claim.
But a (ClaimsPrincipal can contain multiple identities (think: multiple "bags of claims'):

* Cookie auth identity (your app cookie)

* External login identity (Google/Azure AD)

« JWT identity (bearer token)

- etc
So it's possible that:

* Identity A doesn't have department

* Identity B does have department
When ASP.NET Core checks claims, it checks the whole principal, not just one identity, so the requirement
can still be satisfied because the claim exists somewhere in the principal.
```

### Key point

ClaimsPrincipal can satisfy a claim across multiple identities.

Nearby canvas notes:

- can edit requirement / admincanedithandler / scopehandler (IAuthorizaitonHandler not gen)
- when policy might succeed when / one handler didnt call success

### Repetition questions

1. Explain and reconstruct the rule or example: ClaimsPrincipal can satisfy a claim across multiple identities.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

# R05 closure

```text
unique source blocks: 16 / 16
remaining in region: 0
whole-conspect remaining after this region: 20
```
