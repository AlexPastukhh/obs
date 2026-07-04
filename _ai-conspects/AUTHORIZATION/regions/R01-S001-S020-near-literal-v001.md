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
