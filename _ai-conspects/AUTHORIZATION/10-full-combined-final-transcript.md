# Full combined final transcript — AUTHORIZATION

Generated: 2026-07-04 UTC  
Authoritative source: `source/AUTHORIZATION.svg`  
Coverage: **112 unique screenshots / 119 placements + 110 native SVG text lines**

Transcript level: **near-literal normalized**. The wording and code visible in every screenshot are represented in the regional source blocks. Obvious OCR glyph substitutions are normalized, but preserved images remain authoritative for exact punctuation, line wrapping and version-sensitive spellings.

## Integrated mental model

```text
authentication establishes the principal
→ a policy contributes requirements
→ all requirements begin pending
→ applicable handlers run
→ Succeed(requirement) closes one exact requirement
→ doing nothing leaves another handler a chance to satisfy it
→ any remaining requirement means normal authorization failure
→ Fail() records an explicit veto that later success cannot reverse
```

Composition:

```text
policy with several requirements = AND
one requirement with several handlers = alternative/OR-style satisfaction
several allowed values in one claim requirement = OR inside that requirement
separate claim/role/permission requirements = AND
```

Source families:

- policies, claims, roles, default/fallback authorization;
- custom requirements and typed handlers;
- `Requirements`, `PendingRequirements`, `Succeed` and `Fail`;
- resource-based authorization;
- OAuth-style scopes and issuer-aware claim rules;
- generic and non-generic handlers;
- batching, cross-requirement decisions and domain authorization engines;
- `IAuthorizationRequirementData` endpoint metadata.

---

# R01 — Near-literal source transcript: core authorization model

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-001` through `S-020`  
Mode: near-literal normalized transcript; screenshots remain authoritative for exact typography.

---

## S-001 — Authorization succeeds only when every requirement succeeds

```text
source_id: S-001
image hash: a06913576756
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

**5. Important rule about success**

Authorization succeeds only when all requirements are satisfied.

Example:

```text
Policy requirements:
- A
- B
- C
```

If only A and B succeed:

```text
PendingRequirements:
- C
```

Result:

```text
authorization failed
```

You do not need to call `context.Fail()` for this. Leaving a requirement pending is enough.

### Meaning

A policy does not succeed merely because some requirements succeeded. After all handlers have run, every requirement must have been marked successful. An unsatisfied requirement remains in `PendingRequirements` and causes the final authorization result to fail without an explicit call to `Fail()`.

### Questions

1. What happens when one requirement remains pending?
2. Is `context.Fail()` required for a normal unsatisfied requirement?
3. What condition must be true before the policy succeeds?

---

## S-002 — Requirements versus pending requirements

```text
source_id: S-002
image hash: 0a92c3d4014f
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

**1. Requirements vs pending requirements**

**Basic idea**

Imagine a policy like this:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanDeleteOrder", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireRole("Admin");
        policy.AddRequirements(
            new PermissionRequirement("Orders.Delete"));
    });
});
```

### Meaning

The policy contributes three different requirements:

1. authenticated user;
2. Admin role;
3. `Orders.Delete` permission.

They are cumulative. A handler must eventually succeed each requirement.

### Questions

1. How many requirements are contributed by the example policy?
2. Are those requirements combined with AND or OR semantics?
3. What object carries the custom `Orders.Delete` rule?

---

## S-003 — All policy requirements are available through `context.Requirements`

```text
source_id: S-003
image hash: e5465384da8e
region: R01
readability: high
crop: top continuation from S-002
confidence: high
```

### Near-literal visible text

Conceptually, this policy has multiple requirements:

```text
Requirement 1: user must be authenticated
Requirement 2: user must be in Admin role
Requirement 3: user must have Orders.Delete permission
```

Inside the authorization process:

```csharp
context.Requirements
```

contains all of them.

### Meaning

`AuthorizationHandlerContext.Requirements` is the full requirement set for the current authorization evaluation. It is not limited to the requirement type handled by one typed handler.

### Questions

1. What is stored in `context.Requirements`?
2. Does it contain only pending requirements?
3. Why may a low-level handler inspect the complete set?

---

## S-004 — Inspecting the current principal with `context.User`

```text
source_id: S-004
image hash: fcdcba7f11bf
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

**2. `context.User`**

Use this to inspect the current user.

```csharp
var user = context.User;
```

Common examples:

```csharp
var userId = context.User.FindFirst("sub")?.Value;
var email = context.User.FindFirst(ClaimTypes.Email)?.Value;
var role = context.User.FindFirst(ClaimTypes.Role)?.Value;
```

Check authentication:

```csharp
if (context.User.Identity?.IsAuthenticated != true)
{
    return Task.CompletedTask;
}
```

### Meaning

`context.User` is a `ClaimsPrincipal`. Handlers read user identifiers, email, roles and other claims from it. Returning without calling `Succeed` leaves the requirement unsatisfied but does not explicitly fail the entire authorization evaluation.

### Questions

1. What type of object is `context.User`?
2. How can a handler read the subject identifier?
3. What does returning `Task.CompletedTask` without `Succeed` mean?

---

## S-005 — `PendingRequirements`

```text
source_id: S-005
image hash: 4e32e1ce50a3
region: R01
readability: high
crop: continuation fragment
confidence: high
```

### Near-literal visible text

```csharp
context.PendingRequirements
```

contains the ones that have not succeeded yet.

### Meaning

At the start, pending requirements normally mirror the full requirement set. Each call to `context.Succeed(requirement)` removes that specific requirement from the pending set.

### Questions

1. What is the difference between `Requirements` and `PendingRequirements`?
2. What operation removes an item from `PendingRequirements`?

---

## S-006 — A parameterized custom requirement

```text
source_id: S-006
image hash: 6c1f61979aa5
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

**Custom requirements + handlers with DI**

Handlers can use services via DI (DB lookup, feature flags, etc.).

**Requirement with parameters**

```csharp
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int Age { get; }

    public MinimumAgeRequirement(int age) => Age = age;
}
```

### Meaning

The requirement stores the rule's data. The handler contains evaluation logic and can use injected services. Keeping the age inside the requirement lets different policies instantiate the same rule with different thresholds.

### Questions

1. What responsibility belongs to the requirement?
2. What responsibility belongs to the handler?
3. Why is `Age` constructor-supplied instead of hard-coded in the handler?

---

## S-007 — When to inspect `context.Requirements`

```text
source_id: S-007
image hash: 917b8dbf4cc7
region: R01
readability: high
crop: lower continuation marker
confidence: high
```

### Near-literal visible text

**8. `context.Requirements`**

Contains all requirements being checked.

```csharp
foreach (var requirement in context.Requirements)
{
    // inspect requirements
}
```

Usually you do not need this in a typed handler:

```csharp
AuthorizationHandler<MyRequirement>
```

because ASP.NET Core already gives the typed requirement to the handler as a parameter:

```csharp
HandleRequirementAsync(context, requirement)
```

Use `context.Requirements` mostly in lower-level/custom handlers.

### Meaning

A typed handler already receives the matching requirement. Enumerating the entire requirement collection is useful mainly for non-generic handlers, batch evaluation, diagnostics or cross-requirement logic.

### Questions

1. Why does a typed handler usually not enumerate `context.Requirements`?
2. When is enumerating the complete requirement set useful?
3. Which method receives the typed requirement directly?

---

## S-008 — Resource-based authorization

```text
source_id: S-008
image hash: 37d31569241c
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

**Resource-based authorization (important)**

Use when permission depends on *the specific thing being accessed*, for example, “can edit THIS product”.

**Example**

- Admin can edit any product.
- Normal user can edit only products they created.

**Requirement**

```csharp
using Microsoft.AspNetCore.Authorization;

public class CanEditProductRequirement
    : IAuthorizationRequirement
{
}
```

### Meaning

The requirement itself can be a marker. The handler combines the current user with the concrete resource to decide whether the requirement succeeds.

### Questions

1. When is endpoint-only policy metadata insufficient?
2. What extra value is supplied during resource-based authorization?
3. Does a marker requirement need to contain fields?

---

## S-009 — Registering named policies

```text
source_id: S-009
image hash: 8d5a0c8efcf5
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

**Add authorization in `Program.cs`**

```csharp
builder.Services.AddAuthorization(options =>
{
    // Simple "claim-based" policy
    options.AddPolicy("CanEditProducts", policy =>
        policy.RequireClaim("permission", "products.edit"));

    // Role-based policy
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));

    // Require authenticated user explicitly (usually implied)
    options.AddPolicy("LoggedIn", policy =>
        policy.RequireAuthenticatedUser());
});
```

### Meaning

`AddAuthorization` configures `AuthorizationOptions`. Each named policy can contain built-in requirements such as a required claim, role or authenticated identity.

### Questions

1. Which policy requires `permission=products.edit`?
2. Which policy requires the Admin role?
3. What does `RequireAuthenticatedUser` add?

---

## S-010 — `context.Resource`

```text
source_id: S-010
image hash: 0bc7ca7a1b04
region: R01
readability: high
crop: lower continuation marker
confidence: high
```

### Near-literal visible text

**3. `context.Resource`**

Use this when authorization depends on the actual thing being accessed.

Example resource:

```csharp
public class Document
{
    public string OwnerId { get; set; } = null!;
}
```

### Meaning

`context.Resource` carries the application object or framework context supplied to authorization. A handler must verify its runtime type before using it unless it derives from `AuthorizationHandler<TRequirement,TResource>`.

### Questions

1. What does `context.Resource` represent?
2. Why does an owner check need the resource?
3. How can a handler avoid manual casting?

---

## S-011 — Passing a resource manually

```text
source_id: S-011
image hash: 10d25105b7f5
region: R01
readability: high
crop: continuation fragment
confidence: high
```

### Near-literal visible text

- You can pass the resource manually:

```csharp
await authorizationService.AuthorizeAsync(
    User,
    order,
    "CanEditOrder");
```

### Meaning

Application code can load the domain object and call `IAuthorizationService` explicitly. The call supplies the principal, the concrete resource and a policy name.

### Questions

1. What are the three arguments in this `AuthorizeAsync` call?
2. Why is the `order` passed separately?
3. What should application code do with an unsuccessful result?

---

## S-012 — Authentication versus authorization

```text
source_id: S-012
image hash: ba4b8bcd14b1
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

**Mental model**

**Authentication vs Authorization**

- **Authentication (AuthN):** builds `HttpContext.User` — who you are.
- **Authorization (AuthZ):** decides whether `User` may do X.

**Outcomes**

- Not authenticated → 401
- Authenticated but not allowed → 403

### Meaning

Authentication and authorization are separate stages. Challenge and forbid behavior can vary by authentication scheme, but the basic distinction is missing acceptable authentication versus authenticated identity lacking permission.

### Questions

1. Which stage builds `HttpContext.User`?
2. Which stage checks permission?
3. What conceptual difference separates 401 from 403?

---

## S-013 — Initial `Requirements` and `PendingRequirements`

```text
source_id: S-013
image hash: 2307c5de3315
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

At the start:

```text
Requirements:
- AuthenticatedUserRequirement
- RolesAuthorizationRequirement(Admin)
- PermissionRequirement(Orders.Delete)

PendingRequirements:
- AuthenticatedUserRequirement
- RolesAuthorizationRequirement(Admin)
- PermissionRequirement(Orders.Delete)
```

### Meaning

Before handlers establish success, every policy requirement is pending. The full `Requirements` collection stays conceptually stable, while `PendingRequirements` shrinks as exact requirements succeed.

### Questions

1. Why are the two collections initially identical?
2. Which collection changes after `Succeed`?
3. Does succeeding one requirement automatically succeed the others?

---

## S-014 — `MinimumAgeHandler`

```text
source_id: S-014
image hash: f6d50d1202a0
region: R01
readability: high
crop: method signature clipped at right edge; obvious continuation normalized
confidence: high
```

### Near-literal visible code

**Handler using DI**

```csharp
using Microsoft.AspNetCore.Authorization;

public class MinimumAgeHandler
    : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var dobClaim = context.User.FindFirst("dob")?.Value;
        if (dobClaim is null)
            return Task.CompletedTask;

        if (DateTime.TryParse(dobClaim, out var dob))
        {
            var age =
                (int)((DateTime.UtcNow - dob).TotalDays / 365.25);

            if (age >= requirement.Age)
                context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

### Meaning

The handler reads the date-of-birth claim, parses it, calculates an approximate age and succeeds the exact requirement when the threshold is met. Missing or invalid data results in no success rather than an explicit global failure.

The screenshot heading says “using DI”, but this particular code fragment does not yet show an injected dependency; it demonstrates the handler shape and parameterized requirement.

### Questions

1. Which claim does the handler read?
2. What happens when the claim is absent?
3. Why does the handler call `Succeed(requirement)` instead of returning `true`?
4. What limitation exists in the approximate `365.25` age calculation?

---

## S-015 — Claim issuer

```text
source_id: S-015
image hash: c2fe17547122
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

In .NET, a claim is not only `(type, value)`. It also has metadata, and one important piece is the **Issuer**.

**What is “issuer” on a claim?**

Issuer = “who says this claim is true?”

Examples of issuers:

- your own app / Identity server;
- Google / Microsoft / Okta — external identity provider;
- a specific JWT bearer token issuer;
- a custom authentication handler you wrote.

A claim in .NET has:

- **Type** — key, for example `"role"` or `"permission"`;
- **Value** — for example `"Admin"` or `"products.edit"`;
- **Issuer** — for example `"https://login.microsoftonline.com/..."` or `"myapi"`.

### Meaning

Two claims with the same type and value may come from different authorities. Whether issuer matters depends on authentication configuration and the authorization rule. A simple `RequireClaim` check does not by itself express all issuer-trust rules.

### Questions

1. What question does the issuer answer?
2. Can two identical claim values have different issuers?
3. When should authorization logic care about issuer?

---

## S-016 — Strongly typed resource handler

```text
source_id: S-016
image hash: d3db066d4dd0
region: R01
readability: high
crop: screenshot ends after the Admin branch
confidence: high for visible portion
```

### Near-literal visible code

**Handler**

```csharp
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public class CanEditProductHandler
    : AuthorizationHandler<
        CanEditProductRequirement,
        Product>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        CanEditProductRequirement requirement,
        Product resource)
    {
        // Admin can always edit
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
```

### Source-boundary note

The screenshot is a continuation fragment and ends before the normal-user/owner branch and before the closing braces. The missing continuation is **not reconstructed here**.

### Meaning

`AuthorizationHandler<TRequirement,TResource>` supplies both the typed requirement and typed resource. The visible branch grants administrators the requirement immediately.

### Questions

1. What advantage does the two-generic-parameter handler provide?
2. What happens when the user has the Admin role?
3. Why is the non-visible continuation not invented in the transcript?

---

## S-017 — Document owner handler

```text
source_id: S-017
image hash: ce06053a6598
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible code

**Handler:**

```csharp
public sealed class DocumentOwnerHandler
    : AuthorizationHandler<SameOwnerRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        SameOwnerRequirement requirement)
    {
        if (context.Resource is not Document document)
            return Task.CompletedTask;

        var userId =
            context.User.FindFirst("sub")?.Value;

        if (userId == document.OwnerId)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

### Meaning

This version uses the one-parameter typed handler and reads `context.Resource` manually. If the supplied resource is not a `Document`, or the user is not the owner, it does nothing and leaves the requirement available to other handlers.

### Questions

1. Why is the resource type checked before use?
2. What condition succeeds the requirement?
3. Why does owner mismatch not automatically call `Fail()`?

---

## S-018 — `RequireClaim` and repeated claim types

```text
source_id: S-018
image hash: d6ea2afe3923
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text

`RequireClaim` is an authorization-policy rule that says:

> “The current user must have a claim with this type/key, and optionally its value must be one of these allowed values.”

**Claims are “type/value”, not a dictionary**

In .NET, a claim is `Claim(Type, Value)` plus optional issuer and other metadata.

They behave like a **list**, not a key-to-single-value map.

So yes: **you can have multiple claims with the same key/type.**

Example claims list for a user:

- `(department, "Sales")`
- `(department, "Marketing")` — same key repeated
- `(permission, "products.read")`
- `(permission, "products.edit")`

### Meaning

A principal can hold repeated claim types. A policy checks whether at least one matching claim satisfies the required type and any allowed-value constraint.

### Questions

1. Why is a claims collection not equivalent to a dictionary?
2. Can one user have two `department` claims?
3. What does `RequireClaim` check when allowed values are supplied?

---

## S-019 — `[Authorize]` and `[AllowAnonymous]`

```text
source_id: S-019
image hash: f36d3a057339
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text and code

**The `[Authorize]` attribute**

**Require login**

```csharp
[Authorize]
public IActionResult Dashboard() => View();
```

**Allow anonymous for a specific endpoint**

```csharp
[AllowAnonymous]
public IActionResult Login() => View();
```

### Meaning

A bare `[Authorize]` requests authorization, normally using the default policy. `[AllowAnonymous]` marks a specific endpoint as not blocked by authorization requirements, which is especially important in a secure-by-default fallback-policy application.

### Questions

1. What policy does bare `[Authorize]` normally use?
2. Why must a login endpoint often be anonymous?
3. How does `[AllowAnonymous]` interact with a fallback policy?

---

## S-020 — Built-in policy building blocks

```text
source_id: S-020
image hash: 56d37ae8eae7
region: R01
readability: high
crop: none
confidence: high
```

### Near-literal visible text and code

**Built-in policy building blocks — most used**

**Require a claim, optionally with multiple values**

```csharp
policy.RequireClaim(
    "department",
    "Sales",
    "Marketing"); // OR between values
```

**Require a role**

```csharp
policy.RequireRole("Admin");
```

### Meaning

Several allowed values passed to one `RequireClaim` call are alternatives inside one requirement. Separate policy-builder calls create separate requirements and are normally cumulative.

### Questions

1. What does “OR between values” mean in this example?
2. Does `RequireRole("Admin")` become the same requirement as the claim rule?
3. What is the result of placing both calls in one policy?

---

# R01 integrated study model

The first twenty sources establish this flow:

```text
policy contributes requirements
→ all requirements begin pending
→ handlers inspect User and optionally Resource
→ Succeed(requirement) closes one exact requirement
→ no-op leaves it available to other handlers
→ any pending requirement after handler execution means failure
→ explicit Fail is reserved for an authoritative veto
```

Key distinctions:

```text
Requirements
    the complete requirement set

PendingRequirements
    the requirements not yet succeeded

context.User
    the ClaimsPrincipal being authorized

context.Resource
    the concrete object or framework resource being accessed
```

Policy composition:

```text
multiple requirements in one policy
    AND

several allowed values inside one RequireClaim
    OR inside that requirement

several handlers for one requirement
    alternative ways to satisfy that requirement
```

R01 status:

```text
unique screenshots transcribed: 20 / 20
source blocks: 20 / 20
generic placeholder blocks: 0
visible code preserved: yes
remaining R01 sources: 0
whole-conspect remaining sources: 92
```


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


# R07 — Near-literal source transcript: Cross-requirement success, explicit veto and domain authorization engines

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-105` through `S-112`  
Mode: near-literal normalized source transcript. Obvious OCR glyph errors are corrected; exact punctuation and provider-specific formatting remain authoritative in the preserved images.

---

## S-105 — One condition can succeed several different requirements

```text
source_id: S-105
image hash: 57e3e044a64a
image: source/images/S-105__57e3e044a64a.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
7) Another case: succeeding multiple different requirements from one
condition
Example:
If user is SystemAdmin:
satisfy all document requirements immediately.
```

### Key point

One condition can succeed several different requirements.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: One condition can succeed several different requirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-106 — Custom failure logic based on a combination

```text
source_id: S-106
image hash: 750d44b30fa9
image: source/images/S-106__750d44b30fa9.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
8) Another case: custom failure logic

Sometimes you want to inspect pending requirements and call:
context.Fail();

based on a combination.

Example:
If document is archived, fail authorization no matter what.
```

### Key point

Custom failure logic based on a combination.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: Custom failure logic based on a combination.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-107 — SystemAdmin bypass succeeds all document requirements

```text
source_id: S-107
image hash: 9a5c66cbccd5
image: source/images/S-107__9a5c66cbccd5.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Non-generic handler:

public Task HandleAsync(AuthorizationHandlerContext context)
{
    if (!context.User.IsInRole("SystemAdmin"))
        return Task.CompletedTask;

    foreach (var requirement in context.PendingRequirements.ToList())
    {
        if (requirement is MustOwnDocumentRequirement ||
            requirement is SameTenantRequirement ||
            requirement is DocumentNotLockedRequirement)
        {
            context.Succeed(requirement);
        }
    }

    return Task.CompletedTask;
}

This can also be implemented with several generic handlers, but the non-generic handler centralizes the SystemAdmin bypass.
```

### Key point

SystemAdmin bypass succeeds all document requirements.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: SystemAdmin bypass succeeds all document requirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-108 — Archived document causes explicit authorization failure

```text
source_id: S-108
image hash: 55098e98a0c8
image: source/images/S-108__55098e98a0c8.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Non-generic handler:

public async Task HandleAsync(AuthorizationHandlerContext context)
{
    if (context.Resource is not Document document)
        return;

    if (document.IsArchived)
    {
        context.Fail();
        return;
    }

    // Other checks continue after this guard.
}
```

### Key point

Archived document causes explicit authorization failure.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: Archived document causes explicit authorization failure.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-109 — Central document authorization switch with owner and tenant checks

```text
source_id: S-109
image hash: 4ee0dddd5729
image: source/images/S-109__4ee0dddd5729.png
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
                context.Succeed(requirement);
            break;

        case SameTenantRequirement:
            if (document.TenantId == context.User.FindFirst("tenant")?.Value)
                context.Succeed(requirement);
            break;
    }
}

You can also model the archived-resource guard as a separate `NotArchivedRequirement`; sometimes central domain logic is clearer.
```

### Key point

Central document authorization switch with owner and tenant checks.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: Central document authorization switch with owner and tenant checks.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-110 — Dynamic dispatch from metadata using OperationRequirement

```text
source_id: S-110
image hash: c573f91f9ea2
image: source/images/S-110__c573f91f9ea2.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
9. Another case: dynamic dispatch from metadata

Imagine requirements are marker/data objects:

public sealed class OperationRequirement : IAuthorizationRequirement
{
    public OperationRequirement(string operation)
    {
        Operation = operation;
    }

    public string Operation { get; }
}
```

### Key point

Dynamic dispatch from metadata using OperationRequirement.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: Dynamic dispatch from metadata using OperationRequirement.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-111 — Mixed requirement marker types in a domain authorization engine

```text
source_id: S-111
image hash: 1e8edf2cad3b
image: source/images/S-111__1e8edf2cad3b.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Actually this can use generic handler fine.
But if you have mixed requirements:
" CH
ResourceOperationRequirement
TenantRuleRequirement
SubscriptionRuleRequirement
FeatureFlagRequirement
```

### Key point

Mixed requirement marker types in a domain authorization engine.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: Mixed requirement marker types in a domain authorization engine.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-112 — DomainAuthorizationHandler delegates heterogeneous requirements to a rule evaluator

```text
source_id: S-112
image hash: 22c7ea3c7fe0
image: source/images/S-112__22c7ea3c7fe0.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
One domain authorization engine can evaluate heterogeneous requirements:

public sealed class DomainAuthorizationHandler : IAuthorizationHandler
{
    private readonly IRuleEvaluator _rules;

    public DomainAuthorizationHandler(IRuleEvaluator rules)
    {
        _rules = rules;
    }

    public async Task HandleAsync(AuthorizationHandlerContext context)
    {
        var pending = context.PendingRequirements.ToList();

        foreach (var requirement in pending)
        {
            if (await _rules.CanSatisfyAsync(
                context.User,
                context.Resource,
                requirement))
            {
                context.Succeed(requirement);
            }
        }
    }
}

This authorization-engine style is legitimate, but it can become a large, difficult-to-test dispatcher if it is not bounded by one domain.
```

### Key point

DomainAuthorizationHandler delegates heterogeneous requirements to a rule evaluator.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: DomainAuthorizationHandler delegates heterogeneous requirements to a rule evaluator.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

# R07 closure

```text
unique source blocks: 8 / 8
remaining in region: 0
whole-conspect remaining after this region: 0
```
