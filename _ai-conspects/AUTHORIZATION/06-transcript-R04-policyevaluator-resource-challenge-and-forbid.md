# Regional transcript — R04: PolicyEvaluator authorization, resources, challenge and forbid

Conspect: `AUTHORIZATION`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R04
image uses processed: 19 / 19
unique screenshots represented: 19
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`PolicyEvaluator.AuthorizeAsync` delegates requirement evaluation to `IAuthorizationService` and converts the result plus authentication state into success, challenge or forbid.

## Resource

- Authorization middleware commonly passes `HttpContext` as the authorization resource.
- Endpoint or application code can call `IAuthorizationService` directly with a domain resource for resource-based authorization.
- Handlers should use the resource type intentionally and avoid fragile casts when the same requirement is used in several contexts.

## AuthorizeAsync

- The authorization service creates an `AuthorizationHandlerContext`, obtains handlers and invokes them for the policy requirements.
- A requirement succeeds only when its success condition is recorded and no terminal failure invalidates the context.
- Handlers may leave a requirement pending, allowing another handler to satisfy it.

## Challenge versus forbid

- A failed policy becomes a challenge when the user was not successfully authenticated for the policy.
- A failed policy becomes forbid when authentication succeeded but requirements were not met.
- This distinction lets authentication handlers initiate login for challenge and display access-denied behavior for forbid.

## PolicyAuthorizationResult

- The result carries success, challenge or forbid state.
- A forbidden result can include `AuthorizationFailure`, including failed or pending requirement information useful to a custom result handler.

## Caveats

- A 401/redirect challenge and a 403/access-denied forbid are produced by authentication schemes, not by authorization handlers writing responses directly.
- Resource-based authorization may need explicit null-resource handling.

## Nearby source labels

- resource
- PolicyEvaluator.Authorize
- but populate context.User
- IAuthorizationService
- default one
- InvokeHanldersAfterFailure
- policyevaluator, authorizeasync
- if there is no attributes, then we get result from features/context.user
- call authorizationservice.Authorize
- the handler is scoped and here
- in ensure
- we set some prop on it, so it has cached result
- not authorization
- authentication result check
- authorizaitonserviceextensions
- if no authentication failure - challenge
- if failed - forbid(authorizationfailure)
- defaultauthorizationservice
- authorizeasync
- or
- nested func
- schemes

## Covered screenshot uses

```text
IU-020, IU-021, IU-022, IU-031, IU-032, IU-033, IU-036, IU-046, IU-047, IU-048, IU-049, IU-050, IU-051
IU-052, IU-053, IU-054, IU-057, IU-058, IU-059
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
