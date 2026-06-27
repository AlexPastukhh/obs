# Regional transcript — R01: Endpoint authorization metadata, default policy and fallback policy

Conspect: `AUTHORIZATION`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R01
image uses processed: 20 / 20
unique screenshots represented: 20
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Authorization middleware begins with endpoint metadata produced by attributes, endpoint conventions and explicit policy objects.

## Ways to attach authorization

- `[Authorize]`, `RequireAuthorization`, `IAuthorizeData`, explicit `AuthorizationPolicy` metadata and `IAuthorizationRequirementData` can contribute authorization information.
- Endpoint routing must select an endpoint before authorization middleware can read its metadata.
- Metadata order is preserved when policies are combined, which matters when custom metadata providers attach requirements.

## Default policy

- The default policy is used when authorization is requested without a named policy or explicit requirements.
- A typical default policy requires an authenticated user.
- Changing the default policy changes the meaning of bare `[Authorize]` throughout the application.

## Fallback policy

- The fallback policy applies when an endpoint has no authorization metadata and no explicit policy was supplied.
- It is useful for secure-by-default applications where endpoints must opt out with `AllowAnonymous`.
- Fallback policy is not the same as default policy: default serves an authorization request; fallback covers the absence of one.

## Caveats

- Middleware ordering should normally be routing, authentication, authorization and then endpoint execution.
- A fallback policy can unexpectedly protect framework or health endpoints unless anonymous access is configured deliberately.

## Nearby source labels

- defaultpolicy
- InvokeHanldersAfterFailure
- !!!
- fallbackpolicy
- getPolicy
- AuthorizationMiddleware
- build or retrieve policy, ordered metadata
- if there is absolutely no policy
- trying cache lookup
- for cacheable policies
- IAuthorizeData
- to endpoint
- attach authorization info
- AuthorizationPolicy
- IAuthorizationRequirementData
- get endpoint and set features

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-012, IU-037, IU-038, IU-039, IU-040, IU-076
IU-077, IU-078, IU-079, IU-080, IU-081, IU-082, IU-083
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
