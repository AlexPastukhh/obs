# Integrated semantic study draft — AUTHORIZATION

> This document is useful for orientation, but it is **not** the final
> source-preserving transcript. Exact screenshot wording and code must be added
> in the next transcript pass.

## 1. Core model

Authentication establishes identity. Authorization decides whether the current
`ClaimsPrincipal` may perform an operation.

An `AuthorizationPolicy` contains one or more requirements and may also specify
authentication schemes. Multiple requirements in one policy normally use AND
semantics: every requirement must be satisfied.

A requirement may have multiple handlers. Those handlers provide alternative
ways to satisfy that same requirement. This gives OR-style behavior across
handlers for one requirement.

```text
policy = AND across requirements
one requirement = may be satisfied by any applicable handler
```

## 2. Named, default and fallback policies

`AddAuthorization` configures policies:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ProductsRead", policy =>
        policy.AddRequirements(
            new ScopeRequirement("products:read")));

    options.FallbackPolicy =
        new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
});
```

- A named policy is selected explicitly by an attribute, endpoint convention or
  an `IAuthorizationService` call.
- The default policy is used when authorization is requested without a policy
  name.
- The fallback policy is used when an endpoint has no authorization metadata.
  It is the secure-by-default option; truly public endpoints use
  `[AllowAnonymous]`.

## 3. Built-in policy requirements

Common builder methods include:

```text
RequireAuthenticatedUser
RequireRole
RequireClaim
RequireAssertion
AddRequirements
```

Several allowed values in one `RequireClaim` call are alternatives inside that
requirement. Separate requirement calls are cumulative.

```csharp
policy.RequireClaim("department", "sales", "marketing");
// sales OR marketing

policy.RequireClaim("department", "sales");
policy.RequireClaim("permission", "products.edit");
// department AND permission
```

`RequireClaim` checks claim type/value across the whole principal. If several
identities are attached to one principal, a claim may be supplied by any of
them. Issuer validation is a separate trust concern and is not automatically
enforced merely by calling `RequireClaim`.

## 4. Custom requirements and handlers

A requirement is a rule description:

```csharp
public sealed class MinimumAgeRequirement(int age)
    : IAuthorizationRequirement
{
    public int Age { get; } = age;
}
```

A typed handler evaluates it:

```csharp
public sealed class MinimumAgeHandler
    : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        // read claims, evaluate the rule
        // context.Succeed(requirement) when satisfied
        return Task.CompletedTask;
    }
}
```

Handlers are registered as `IAuthorizationHandler`.

## 5. AuthorizationHandlerContext

Important members:

```text
User                 current ClaimsPrincipal
Resource             object being authorized
Requirements         all requirements in the evaluation
PendingRequirements  requirements not yet succeeded
```

Calling:

```csharp
context.Succeed(requirement);
```

marks that specific requirement as satisfied and removes it from
`PendingRequirements`.

Doing nothing means only that this handler did not establish success. Another
handler may still satisfy the requirement.

Calling:

```csharp
context.Fail();
```

is an explicit global failure. It should be reserved for authoritative deny
conditions such as a blocked account, revoked session, tenant-boundary
violation, mandatory MFA failure, malformed security-critical claims or an
archived resource that must never be accessed.

When iterating pending requirements and calling `Succeed`, iterate a snapshot:

```csharp
foreach (var requirement in context.PendingRequirements.ToList())
{
    // evaluate
    context.Succeed(requirement);
}
```

## 6. Resource-based authorization

When the decision depends on the actual domain object, load the object and pass
it as the resource:

```csharp
var result = await authorizationService.AuthorizeAsync(
    User,
    document,
    "CanEditDocument");
```

A strongly typed resource handler avoids casts:

```csharp
AuthorizationHandler<TRequirement, TResource>
```

Typical checks include ownership, tenant match, document state, requested
operation and administrator overrides. UI visibility checks do not replace
authorization at the command or data boundary.

## 7. Roles, claims and scopes

Roles commonly describe group membership. OAuth/OIDC scopes describe what a
client/token is allowed to do.

```text
role: who the user is within the application
scope: what this token/client may do
```

Scopes may be stored as:

- one space-separated `scope` claim;
- an `scp` claim;
- several repeated claims;
- provider-specific array material after token mapping.

A scope handler should normalize the supported shapes and call `Succeed` only
when the required scope is present.

## 8. Multiple handlers for one requirement

One marker requirement may be satisfiable in several ways:

```text
CanEditProductRequirement
  handler A: Admin role
  handler B: products:write scope
```

If the user is not an administrator, handler A does nothing. Handler B may still
succeed the same requirement. This is why a missing permission in one
alternative handler should usually not call `Fail()`.

## 9. Non-generic handlers

A typed generic handler is the default choice when one handler owns one
requirement type.

A non-generic `IAuthorizationHandler` is useful when:

- one permission-service call can answer several pending requirements;
- unrelated requirement types belong to one domain decision;
- the whole pending set must be considered together;
- one fact can succeed several requirements;
- one authoritative condition must fail the whole evaluation;
- metadata requirements are dispatched to a domain authorization engine.

Batching can change:

```text
3 requirements -> 3 remote permission checks
```

into:

```text
3 requirements -> 1 remote permission check
```

The benefit is shared I/O and one coherent domain decision, not merely fewer
object allocations.

## 10. Requirement-producing endpoint metadata

A custom attribute can implement `IAuthorizationRequirementData`:

```csharp
public sealed class MinimumAgeAttribute(int age)
    : Attribute, IAuthorizationRequirementData
{
    public IEnumerable<IAuthorizationRequirement>
        GetRequirements()
    {
        yield return new MinimumAgeRequirement(age);
    }
}
```

Authorization middleware reads ordered endpoint metadata, obtains the produced
requirements, and combines them into the effective policy.

## 11. Design rules

Prefer:

- small requirement objects;
- testable typed handlers;
- explicit resource types;
- fallback authorization for secure-by-default applications;
- no-op when one handler merely cannot grant access;
- explicit `Fail()` only for true veto conditions;
- batched checks when shared I/O or domain consistency justifies them.

Avoid:

- trusting client-side authorization;
- parsing access tokens inside authorization handlers;
- calling `Fail()` for every missing role/scope;
- hidden database calls scattered through many handlers;
- giant unbounded rule-dispatch switches;
- mixing this policy/handler canvas with the separate middleware-result-handler
  conspect.
