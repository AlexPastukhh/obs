# Regional transcript — R03: Policy authentication, multiple schemes and AllowAnonymous

Conspect: `AUTHORIZATION`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R03
image uses processed: 20 / 20
unique screenshots represented: 20
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Before evaluating authorization requirements, `PolicyEvaluator` authenticates the schemes named by the effective policy and establishes the principal used for authorization.

## Named schemes

- When a policy lists authentication schemes, each scheme is authenticated.
- Successful principals are merged into the request principal used for the policy.
- The resulting authentication ticket records the contributing identities and schemes according to framework behavior.

## No policy schemes

- When the policy has no explicit schemes, the evaluator uses the existing authentication result and `HttpContext.User` established by authentication middleware or earlier components.
- Authentication handlers can cache their result within the request so repeated authentication calls do not redo expensive validation.

## AllowAnonymous

- The middleware still performs policy authentication before the anonymous metadata check, allowing `HttpContext.User` to be populated.
- Authorization requirement evaluation is skipped for an endpoint carrying `IAllowAnonymous`.
- Anonymous access therefore means authorization is bypassed, not that authentication information must be discarded.

## Principal merging

- Multiple identities can coexist on one `ClaimsPrincipal`.
- Authorization handlers should inspect the claims and authentication type they actually require rather than assuming a single identity.

## Caveats

- Combining several schemes can expose claims from several identities; policies should be explicit about acceptable issuers and claim types.
- A policy scheme selector may forward authentication to another concrete handler.

## Nearby source labels

- Policyeval.Authenticate
- run policy authentication
- if policy has scheme/s
- resource
- but populate context.User
- respect allowanonymous
- Policy evaluator authenticate, run all
- schemes, (used handler results
- are cached)
- during authentication middleware call
- authenticated already as default scheme
- but there is the one that we ve
- the handler is scoped and here
- in ensure
- we set some prop on it, so it has cached result
- if there are some
- merge principal from multiple schemes
- if there is no attributes, then we get result from features/context.user
- policyevaluator, authorizeasync
- or
- schemes
- nested func

## Covered screenshot uses

```text
IU-010, IU-011, IU-017, IU-018, IU-019, IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-030
IU-034, IU-035, IU-042, IU-043, IU-044, IU-045, IU-056
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
