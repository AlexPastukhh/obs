# Full combined final transcript — AUTHORIZATION

Generated: 2026-06-27 06:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 112 / 112
unique embedded screenshots: 119 / 119
screenshot uses on canvas: 120 / 120
repeated screenshot placements retained: 1
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 Pipeline position and endpoint metadata

Endpoint routing selects an endpoint before authorization middleware runs.
Authorization metadata can come from `[Authorize]`, endpoint
`RequireAuthorization`, `IAuthorizeData`, explicit `AuthorizationPolicy`
metadata and `IAuthorizationRequirementData`.

The usual order is:

```text
UseRouting
UseAuthentication
UseAuthorization
Map/execute endpoints
```

Authorization middleware reads ordered metadata from the selected endpoint and
builds one effective policy.

## 03 Default policy and fallback policy

The default policy is used when authorization is requested without a named
policy or explicit requirements. A bare `[Authorize]` commonly means the
default policy, which usually requires an authenticated user.

The fallback policy is considered when the endpoint has no authorization
metadata. It enables a secure-by-default application in which endpoints must
explicitly opt out with anonymous metadata.

Default and fallback are different: default answers an authorization request;
fallback covers the absence of one.

## 04 Policy construction and caching

The middleware:

1. obtains the endpoint;
2. checks a policy cache when the policy provider supports caching;
3. reads authorization metadata;
4. resolves named policies;
5. combines requirements, schemes and explicit policies;
6. applies the appropriate default or fallback semantics;
7. caches the effective endpoint policy when safe.

When no effective policy exists, it calls the next component.

The middleware also records that authorization processing occurred for the
selected endpoint, helping endpoint-routing infrastructure detect a missing
authorization middleware stage.

## 05 Policy authentication

`PolicyEvaluator.AuthenticateAsync` authenticates the schemes named by the
policy. Successful identities are merged into the principal used by
authorization.

When no schemes are named, existing request authentication state and
`HttpContext.User` are used. Handler results can be cached within the request.

`AllowAnonymous` skips authorization requirement evaluation, but policy
authentication may already have populated `HttpContext.User`. Anonymous access
therefore does not require erasing an authenticated identity.

## 06 Authorization service internals

The default authorization service coordinates:

- the policy provider;
- `IAuthorizationHandlerContextFactory`;
- `IAuthorizationHandlerProvider`;
- all applicable `IAuthorizationHandler` instances;
- `IAuthorizationEvaluator`.

The context contains requirements, user and resource. Handlers call
`Succeed(requirement)` when a condition is met and may call `Fail()` with
failure reasons. A requirement can have several handlers, and one handler can
process several requirements.

`AuthorizationOptions.InvokeHandlersAfterFailure` controls whether remaining
handlers run after explicit failure. Keeping them enabled can support auditing;
disabling them can avoid expensive work after a terminal failure. Handler
ordering should not be required for correctness.

## 07 Resource-based authorization

Authorization middleware commonly passes `HttpContext` as the resource.
Application code can call `IAuthorizationService` directly with a domain object:

```csharp
var result = await authorizationService.AuthorizeAsync(
    User,
    document,
    "CanEditDocument");
```

Handlers should intentionally support the expected resource type. UI checks do
not replace authorization at the actual data or command boundary.

## 08 Success, challenge and forbid

`PolicyEvaluator.AuthorizeAsync` combines the authorization result with policy
authentication state and produces a `PolicyAuthorizationResult`:

- success: continue to the endpoint;
- challenge: no acceptable authenticated identity for the policy;
- forbid: authentication succeeded but requirements failed.

Challenge commonly becomes 401 or a login redirect. Forbid commonly becomes
403 or an access-denied redirect. Authentication schemes own the exact response
and their events.

A forbidden result can include `AuthorizationFailure`, including failed
requirements or failure reasons for server-side inspection.

## 09 AuthorizationMiddlewareResultHandler

The default result handler:

- calls the next component on success;
- loops through policy schemes and calls `ChallengeAsync` on challenge;
- loops through policy schemes and calls `ForbidAsync` on forbid;
- uses default schemes when the policy does not name schemes.

A custom `IAuthorizationMiddlewareResultHandler` should handle only selected
cases and delegate the rest to the default implementation.

Example design:

```csharp
public async Task HandleAsync(
    RequestDelegate next,
    HttpContext context,
    AuthorizationPolicy policy,
    PolicyAuthorizationResult result)
{
    if (result.Forbidden &&
        result.AuthorizationFailure?.FailedRequirements
            .OfType<SubscriptionRequirement>()
            .Any() == true)
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        await context.Response.WriteAsJsonAsync(new
        {
            code = "subscription_required"
        });
        return;
    }

    await _defaultHandler.HandleAsync(next, context, policy, result);
}
```

If the custom handler writes the response instead of invoking
`ChallengeAsync`/`ForbidAsync`, normal scheme challenge/forbid events do not run
for that case. This is acceptable only when the custom response intentionally
replaces them.

## 10 Safe failure information

Failed requirements and failure reasons are valuable for logs and selecting a
stable public error code. Internal requirement names, claims and policy details
should not be serialized directly to untrusted clients.

A sanitized marker may be stored in request features/items or returned as a
public response code. It is response metadata, not authentication proof.

Challenge versus forbid depends on the policy authentication result, not merely
on `HttpContext.User` being non-null. A principal can contain unauthenticated
identities.

## 11 Full flow

```text
endpoint selected
→ endpoint authorization metadata read
→ effective policy combined/cached
→ policy schemes authenticated
→ AllowAnonymous checked
→ IAuthorizationService evaluates requirements
→ PolicyAuthorizationResult produced
→ result handler continues, challenges or forbids
```

## Regional source map

### R01 — Endpoint authorization metadata, default policy and fallback policy

Coverage: `20` screenshot uses, `20` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `03-transcript-R01-endpoint-metadata-default-and-fallback-policy.md`.

### R02 — AuthorizationMiddleware policy construction, caching and the no-policy path

Coverage: `7` screenshot uses, `7` unique screenshots, `1` repeated placements, `0` remaining. Detailed file: `04-transcript-R02-policy-construction-caching-and-no-policy-path.md`.

### R03 — Policy authentication, multiple schemes and AllowAnonymous

Coverage: `20` screenshot uses, `20` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `05-transcript-R03-policy-authentication-schemes-and-allowanonymous.md`.

### R04 — PolicyEvaluator authorization, resources, challenge and forbid

Coverage: `19` screenshot uses, `19` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `06-transcript-R04-policyevaluator-resource-challenge-and-forbid.md`.

### R05 — IAuthorizationService, handler provider, evaluator and handler execution

Coverage: `14` screenshot uses, `14` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `07-transcript-R05-authorizationservice-handlers-and-evaluator.md`.

### R06 — AuthorizationMiddlewareResultHandler customization

Coverage: `11` screenshot uses, `11` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `08-transcript-R06-authorization-middlewareresult-handler-customization.md`.

### R07 — Policy result, failed requirements, schemes and challenge/forbid events

Coverage: `29` screenshot uses, `29` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `09-transcript-R07-policy-result-failed-requirements-and-scheme-events.md`.

## Exactness note

This document is the authoritative integrated semantic transcript. The complete
SVG and extracted screenshot files remain authoritative for exact punctuation,
provider-specific syntax and version-sensitive API spellings.
