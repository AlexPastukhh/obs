# R02 — Near-literal source transcript: Pending-requirement lifecycle, policy construction and resource authorization flow

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-021` through `S-040`  
Mode: near-literal normalized source transcript. Obvious OCR glyph errors are corrected; exact punctuation and provider-specific formatting remain authoritative in the preserved images.

---

## S-021 — PendingRequirements lifecycle as handlers call Succeed

```text
source_id: S-021
image hash: cb0e5c4c52b3
image: source/images/S-021__cb0e5c4c52b3.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
9. context.PendingRequirements

Contains requirements that have not yet succeeded.

Example:
var pending = context.PendingRequirements.ToList();
```

### Key point

PendingRequirements lifecycle as handlers call Succeed.

Nearby canvas notes:

- Pendingrequirements
- requirements

### Repetition questions

1. Explain and reconstruct the rule or example: PendingRequirements lifecycle as handlers call Succeed.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-022 — Policy succeeds only when PendingRequirements becomes empty

```text
source_id: S-022
image hash: 3dc9924ba952
image: source/images/S-022__3dc9924ba952.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
After the authenticated-user handler succeeds:

PendingRequirements:

- RolesAuthorizationRequirement (Admin)

- PermissionRequirement (Orders.Delete)

After the role handler succeeds:

PendingRequirements:

- PermissionRequirement (Orders.Delete)

After your permission handler succeeds:

PendingRequirements:

empty

Then authorization succeeds.
```

### Key point

Policy succeeds only when PendingRequirements becomes empty.

Nearby canvas notes:

- IAuthoriazationHandler / multiple requirements (usually of one type, / like scope requirement)
- requirements vs / pending requirements

### Repetition questions

1. Explain and reconstruct the rule or example: Policy succeeds only when PendingRequirements becomes empty.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-023 — Non-generic SuperAdmin handler processes all pending requirements

```text
source_id: S-023
image hash: a4f06df799ef
image: source/images/S-023__a4f06df799ef.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
3. When PendingRequirements is useful

PendingRequirements is useful when one handler wants to satisfy multiple requirement types.

Example:

public sealed class SuperAdminHandler : IAuthorizationHandler
{
    public Task HandleAsync(AuthorizationHandlerContext context)
    {
        if (!context.User.IsInRole("SuperAdmin"))
            return Task.CompletedTask;

        foreach (var requirement in context.PendingRequirements.ToList())
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

### Key point

Non-generic SuperAdmin handler processes all pending requirements.

Nearby canvas notes:

- IAuthoriazationHandler / multiple requirements (usually of one type, / like scope requirement)
- Pendingrequirements

### Repetition questions

1. Explain and reconstruct the rule or example: Non-generic SuperAdmin handler processes all pending requirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-024 — Snapshot PendingRequirements with ToList because Succeed mutates it

```text
source_id: S-024
image hash: 35f5407c0188
image: source/images/S-024__35f5407c0188.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
You may use this if one handler handles multiple requirement types.

" CH

foreach (var requirement in context.PendingRequirements.ToList())

if (requirement is PermissionRequirement permission &&

context.User.HasClaim("Permission", permission.Name))

context.Succeed(requirement);

Use .ToList() because Succeed() modifies the pending collection.
```

### Key point

Snapshot PendingRequirements with ToList because Succeed mutates it.

Nearby canvas notes:

- Pendingrequirements
- requirements

### Repetition questions

1. Explain and reconstruct the rule or example: Snapshot PendingRequirements with ToList because Succeed mutates it.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-025 — Register handler and configure AtLeast18 policy

```text
source_id: S-025
image hash: bf6c594ffc14
image: source/images/S-025__bf6c594ffc14.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Register + policy

builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AtLeast18", policy =>
        policy.AddRequirements(new MinimumAgeRequirement(18)));
});

Use:

[Authorize(Policy = "AtLeast18")]
public IActionResult Adults() => View();
```

### Key point

Register handler and configure AtLeast18 policy.

Nearby canvas notes:

- CUSTOM POLICIES WITH AUTHORIZATION / HANDLERS WITH REQUIREMENTS
- RESOURCE BASED AUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: Register handler and configure AtLeast18 policy.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-026 — RequireClaim allowed values are OR inside one requirement

```text
source_id: S-026
image hash: d15243009307
image: source/images/S-026__d15243009307.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
What this means:
" Ct
policy.RequireClaim("department", "Sales", "Marketing");
It means:
- The user must have at least one claim where:
- Type == "department"
- and Value is either "Sales" or "Marketing"
So it's an OR across the allowed values.
```

### Key point

RequireClaim allowed values are OR inside one requirement.

Nearby canvas notes:

- BASIC POLICIES IN ADDAUTHORIZATION
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: RequireClaim allowed values are OR inside one requirement.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-027 — Role and policy authorization attributes

```text
source_id: S-027
image hash: 04bd6e4af1cf
image: source/images/S-027__04bd6e4af1cf.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Require a role
" cH (a)
[Authorize(Roles = "Admin")]
public IActionResult AdminOnly() => View();

Multiple roles (OR):
[Authorize(Roles = "Admin,Manager")]

Require a policy
[Authorize(Policy = "CanEditProducts")]
public IActionResult Edit(int id) => View();
```

### Key point

Role and policy authorization attributes.

Nearby canvas notes:

- BASIC, / GLOBAL AUTHORIZATION
- BASIC POLICIES IN ADDAUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: Role and policy authorization attributes.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-028 — RequireAuthenticatedUser and RequireAssertion

```text
source_id: S-028
image hash: 578b715430cb
image: source/images/S-028__578b715430cb.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Require an authenticated user
" CH (a)
policy.RequireAuthenticatedUser();
Require an assertion (custom inline logic)
" Ct (a)
policy.RequireAssertion(ctx =>
ctx.User.HasClaim("permission", "products.edit") &&
ctx.User.Identity?.IsAuthenticated == true);
```

### Key point

RequireAuthenticatedUser and RequireAssertion.

Nearby canvas notes:

- BASIC POLICIES IN ADDAUTHORIZATION
- BASIC, / GLOBAL AUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: RequireAuthenticatedUser and RequireAssertion.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-029 — Resource-based owner-edit code continuation

```text
source_id: S-029
image hash: 95c2aee6e001
image: source/images/S-029__95c2aee6e001.png
placements: 1
boundary: continuation fragment; only visible content is transcribed
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
// Owner can edit
var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

if (userId != null && resource.OwnerUserId == userId)
{
    context.Succeed(requirement);
}

return Task.CompletedTask;
```

### Key point

Resource-based owner-edit code continuation.

Nearby canvas notes:

- RESOURCE BASED AUTHORIZATION
- BASIC, / GLOBAL AUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: Resource-based owner-edit code continuation.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-030 — Constructing claims and default issuer LOCAL AUTHORITY

```text
source_id: S-030
image hash: 80cf7dd51367
image: source/images/S-030__80cf7dd51367.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
In C#:
var ¢ = new Claim("department", "Sales", ClaimValueTypes.String, issuer: "my-company");

If you don't set it, it defaults to a constant like "LOCAL AUTHORITY" (depends on how the identity is built).
```

### Key point

Constructing claims and default issuer LOCAL AUTHORITY.

Nearby canvas notes:

- IAuthorizationRequirementData
- example

### Repetition questions

1. Explain and reconstruct the rule or example: Constructing claims and default issuer LOCAL AUTHORITY.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-031 — Generic resource handler signature and typed resource access

```text
source_id: S-031
image hash: 86a439b9108d
image: source/images/S-031__86a439b9108d.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
But the cleaner way is to use the generic resource handler:

public sealed class DocumentOwnerHandler
    : AuthorizationHandler<SameOwnerRequirement, Document>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        SameOwnerRequirement requirement,
        Document resource)
    {
        var userId = context.User.FindFirst("sub")?.Value;

        if (userId == resource.OwnerId)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

### Key point

Generic resource handler signature and typed resource access.

Nearby canvas notes:

- succeed(req)
- resource

### Repetition questions

1. Explain and reconstruct the rule or example: Generic resource handler signature and typed resource access.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-032 — Why PendingRequirements.ToList is required during iteration

```text
source_id: S-032
image hash: 86f8496e2860
image: source/images/S-032__86f8496e2860.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Meaning:

If user is SuperAdmin, mark every remaining requirement as passed.

Notice the .ToList() :

" CH

oO

context.PendingRequirements.ToList()

That matters because context.Succeed(requirement) changes the pending collection. Without .ToList(),

you may modify the collection while iterating.
```

### Key point

Why PendingRequirements.ToList is required during iteration.

Nearby canvas notes:

- IAuthoriazationHandler / multiple requirements (usually of one type, / like scope requirement)
- Pendingrequirements

### Repetition questions

1. Why PendingRequirements.ToList is required during iteration?
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-033 — Claim issuer as a trust boundary with multiple schemes

```text
source_id: S-033
image hash: 6748221317fe
image: source/images/S-033__6748221317fe.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Why would you care?

1) Trust boundary: same claim type/value from different sources

You might get a "role=Admin" claim from:

.

an external provider (untrusted for your app''s authorization)

.

your own app after you map/validate the user (trusted)

Checking issuer lets you say:

"Only accept Admin role if it came from my issuer."

2) Multiple authentication schemes

If you support cookies + bearer + external login, claims can come from different identities/issuers. Issuer

helps you differentiate.
```

### Key point

Claim issuer as a trust boundary with multiple schemes.

Nearby canvas notes:

- IAuthorizationRequirementData
- example

### Repetition questions

1. Explain and reconstruct the rule or example: Claim issuer as a trust boundary with multiple schemes.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-034 — Custom requirement, handler, DI registration, and policy registration

```text
source_id: S-034
image hash: 2ec2a6ee24c7
image: source/images/S-034__2ec2a6ee24c7.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Registration

builder.Services.AddSingleton<IAuthorizationHandler, CanEditProductHandler>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanEditProduct", policy =>
        policy.AddRequirements(new CanEditProductRequirement()));
});
```

### Key point

Custom requirement, handler, DI registration, and policy registration.

Nearby canvas notes:

- RESOURCE BASED AUTHORIZATION
- BASIC, / GLOBAL AUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: Custom requirement, handler, DI registration, and policy registration.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-035 — Multiple requirements in one policy use AND semantics

```text
source_id: S-035
image hash: cac23e96cd0d
image: source/images/S-035__cac23e96cd0d.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Multiple requirements in one policy

All requirements must succeed (AND):

options.AddPolicy("EditorsInSales", policy =>
{
    policy.RequireRole("Editor");
    policy.RequireClaim("department", "Sales");
    policy.RequireClaim("permission", "products.edit");
});
```

### Key point

Multiple requirements in one policy use AND semantics.

Nearby canvas notes:

- why to not use context.fail everywhere, multiple handlers registered / for one requirement
- CUSTOM POLICIES WITH AUTHORIZATION / HANDLERS WITH REQUIREMENTS

### Repetition questions

1. Explain and reconstruct the rule or example: Multiple requirements in one policy use AND semantics.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-036 — Manual OR logic versus multiple requirement calls

```text
source_id: S-036
image hash: 8f6b3f5c4979
image: source/images/S-036__8f6b3f5c4979.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Equivalent "manual check"
User.HasClaim("department", "Sales") || User.HasClaim("department", "Marketing")
```

### Key point

Manual OR logic versus multiple requirement calls.

Nearby canvas notes:

- IAuthorizationRequirementData
- example

### Repetition questions

1. Compare the two sides of: Manual OR logic versus multiple requirement calls.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-037 — Policy-specific authentication schemes

```text
source_id: S-037
image hash: 62f3d35cb6a4
image: source/images/S-037__62f3d35cb6a4.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Require a specific authentication scheme

Useful when you have multiple schemes, such as Cookies + Bearer.

options.AddPolicy("ApiOnly", policy =>
{
    policy.AddAuthenticationSchemes("Bearer");
    policy.RequireAuthenticatedUser();
});
```

### Key point

Policy-specific authentication schemes.

Nearby canvas notes:

- BASIC POLICIES IN ADDAUTHORIZATION
- IAuthorizationRequirementData

### Repetition questions

1. Explain and reconstruct the rule or example: Policy-specific authentication schemes.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-038 — Minimal API RequireAuthorization

```text
source_id: S-038
image hash: 95f772551bc8
image: source/images/S-038__95f772551bc8.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Endpoint-routing style

app.MapGet("/secret", () => "hi")
   .RequireAuthorization("CanEditProducts");
```

### Key point

Minimal API RequireAuthorization.

Nearby canvas notes:

- BASIC, / GLOBAL AUTHORIZATION
- BASIC POLICIES IN ADDAUTHORIZATION

### Repetition questions

1. Explain and reconstruct the rule or example: Minimal API RequireAuthorization.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-039 — RequireClaim without allowed values accepts any value for that claim type

```text
source_id: S-039
image hash: 9847653a571c
image: source/images/S-039__9847653a571c.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
What if you don't provide allowed values?
om CH
policy.RequireClaim("department");
This means:
* user must have a claim of type "department" (any value)
```

### Key point

RequireClaim without allowed values accepts any value for that claim type.

Nearby canvas notes:

- IAuthorizationRequirementData
- example

### Repetition questions

1. Explain and reconstruct the rule or example: RequireClaim without allowed values accepts any value for that claim type.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-040 — Controller flow for resource-based authorization

```text
source_id: S-040
image hash: 6e4115c897c8
image: source/images/S-040__6e4115c897c8.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Use in a controller

You need the actual resource, so you typically authorize inside the action.

using Microsoft.AspNetCore.Authorization;

public class ProductsController : Controller
{
    private readonly IAuthorizationService _auth;
    private readonly IProductRepo _repo;

    public ProductsController(
        IAuthorizationService auth,
        IProductRepo repo)
    {
        _auth = auth;
        _repo = repo;
    }

    // The action continuation is shown in a later source.
}
```

### Key point

Controller flow for resource-based authorization.

Nearby canvas notes:

- RESOURCE BASED AUTHORIZATION
- when policy might succeed when / one handler didnt call success

### Repetition questions

1. Explain and reconstruct the rule or example: Controller flow for resource-based authorization.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

# R02 closure

```text
unique source blocks: 20 / 20
remaining in region: 0
whole-conspect remaining after this region: 72
```
