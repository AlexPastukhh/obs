# R01/R02/R03 — Claims transformation final coverage transcript v001

Conspect: `claimstransformation`  
Source: `claimstransformation.svg`  
Stage: **stage-1 verified final coverage**

## 0.1 Area overview / key ideas / reading quality

This sheet explains what ASP.NET Core `IClaimsTransformation` is for, how it is registered and implemented, when `TransformAsync` runs, and why transformations must be idempotent and treated as request/principal-scoped unless claims are explicitly persisted elsewhere.

Key ideas:

- Claims transformation enriches an authenticated `ClaimsPrincipal` with application-specific claims.
- Typical enrichment sources are an application database, tenant metadata, permission tables, role mappings, provider normalization, and legacy aliases.
- It is appropriate when claims should be available broadly across controllers, Razor Pages, policies, and authentication schemes.
- `TransformAsync` can execute more than once, so duplicate or expensive work must be guarded.
- A marker claim helps only for the same principal instance; it does not automatically persist across requests.
- For cookie authentication, expensive enriched claims can instead be persisted by replacing the principal during cookie validation and renewing the cookie.

Reading quality: high. All 19 image uses are readable; code punctuation remains source-verified by the preserved PNGs.

## 1. R01 — enrichment and normalization use cases

The first region enumerates practical reasons to transform claims after authentication:

1. **Load application roles from the application database.** The identity provider may know the user but not app-specific roles such as `SupportAgent` or `BillingAdmin`.
2. **Add permissions from application data.** A token may contain only identity claims such as `sub` and `email`, while authorization needs claims like `orders.read`, `orders.write`, or `invoices.approve`.
3. **Add tenant information.** A multi-tenant application may need `tenant_id` and `tenant_role` derived from current membership.
4. **Normalize claims from different providers.** Providers may use `sub`, `nameidentifier`, `preferred_username`, `upn`, or other claim types. A transformation can map them to stable application claim names such as `app:user_id`, `app:username`, and `app:email`.
5. **Create aliases for legacy authorization code.** New OIDC claims can be mapped once into older names such as `companyId`, `userType`, or `legacyRole` instead of rewriting every old check.

The region's design message is that transformation is most useful for cross-cutting claims needed in many endpoints, not for a single action-specific lookup.

## 2. R02 — service contract, implementation, and registration

`IClaimsTransformation` exposes:

```csharp
Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal);
```

It is used by ASP.NET Core's authentication flow after a principal has been authenticated. Conceptually, the authentication handler returns a principal, then the registered transformation service may modify or replace that principal before the application uses it.

A typical implementation:

```csharp
public sealed class MyClaimsTransformation : IClaimsTransformation
{
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        if (principal.Identity?.IsAuthenticated != true)
            return Task.FromResult(principal);

        var identity = (ClaimsIdentity)principal.Identity;

        if (!identity.HasClaim(c => c.Type == "tenant_id"))
            identity.AddClaim(new Claim("tenant_id", "abc-123"));

        return Task.FromResult(principal);
    }
}
```

Register the service in DI, commonly as transient:

```csharp
builder.Services.AddTransient<IClaimsTransformation, MyClaimsTransformation>();
```

The important implementation rule is to check authentication state and avoid adding the same claim repeatedly.

## 3. R03 — execution frequency, idempotency, and persistence

`TransformAsync` runs after successful authentication and may run more than once in a request. A later explicit `AuthenticateAsync` call, especially for another scheme or another principal instance, can invoke transformation again.

ASP.NET Core may cache transformation for the same principal instance within a request, but code should not rely on that for correctness or for expensive database/API work. Different schemes, different principal instances, and the next HTTP request can all cause the transformation to run again.

A common guard is a marker claim:

```csharp
private const string TransformedClaim = "app:claims_transformed";

public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
{
    if (principal.Identity?.IsAuthenticated != true)
        return principal;

    if (principal.HasClaim(TransformedClaim, "true"))
        return principal;

    // Load permissions or other enrichment once for this principal.
    ((ClaimsIdentity)principal.Identity)
        .AddClaim(new Claim(TransformedClaim, "true"));

    return principal;
}
```

This prevents duplicate work only while that transformed principal is reused. If a cookie or JWT is parsed into a fresh principal on the next request, added claims disappear unless they were persisted.

For cookie authentication, persistent enrichment may be performed during cookie validation:

```csharp
context.ReplacePrincipal(newPrincipal);
context.ShouldRenew = true;
```

That pattern stores the updated claims in the renewed authentication cookie. Even then, `OnValidatePrincipal` still runs according to cookie validation behavior, and large cookies should be avoided because they are sent on every request.

## 4. Practical decision guide

Use `IClaimsTransformation` when:

- claims are application-wide and broadly useful;
- provider-specific claims need normalization;
- app roles, permissions, tenant metadata, or aliases must be attached after authentication;
- the work is cheap or protected by reliable caching/guards.

Prefer another mechanism when:

- the data is needed only by one endpoint;
- the lookup is expensive and should be persisted into a cookie or cached independently;
- authorization depends on a specific resource, where a resource-based authorization handler is more appropriate.

## 5. Coverage

```text
R01: 5 image uses + 8 labels
R02: 6 image uses + 0 labels
R03: 8 image uses + 11 labels
Total: 19 image uses + 19 labels
Remaining unclosed: 0
```
