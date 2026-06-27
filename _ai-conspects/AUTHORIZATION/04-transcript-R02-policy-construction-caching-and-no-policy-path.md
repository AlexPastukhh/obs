# Regional transcript — R02: AuthorizationMiddleware policy construction, caching and the no-policy path

Conspect: `AUTHORIZATION`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R02
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 1
remaining image uses: 0
```

## Semantic transcript

The middleware obtains the selected endpoint, tries a cache when policies are cacheable and otherwise combines endpoint metadata into one effective policy.

## Policy retrieval

- The middleware reads `IAuthorizeData`, explicit `AuthorizationPolicy` metadata and requirement-data metadata from the endpoint.
- The policy provider resolves named policies and supplies default or fallback policies as required.
- All applicable requirements and authentication schemes are combined into one effective policy.

## Caching

- Endpoint-policy caching avoids rebuilding a stable policy on every request.
- Caching is only safe when the policy provider indicates that policies are cacheable.
- Dynamic policy providers may produce request-independent but runtime-generated policies; their cache behavior must match their contract.

## No policy

- When no effective policy exists, authorization middleware calls the next component without running policy authentication or authorization.
- The absence of endpoint metadata does not imply a fallback policy is absent; fallback evaluation occurs during policy combination.

## Endpoint feature marker

- Authorization middleware records that it processed the selected endpoint so later infrastructure can detect missing middleware execution.
- This protects endpoint-routing scenarios where authorization metadata exists but the pipeline omitted `UseAuthorization`.

## Caveats

- Custom endpoint metadata should be immutable or safely cacheable once endpoints are built.
- An incorrect middleware order can make endpoint metadata unavailable.

## Nearby source labels

- if there is absolutely no policy
- build or retrieve policy, ordered metadata
- AuthorizationMiddleware
- run policy authentication
- Policyeval.Authenticate
- then getmetadata from
- if nothing in cache
- endpoint and combine into
- result policy
- requirements into
- cache if cacheable
- (means that there is
- even no fallback policy
- just call next
- tehre is nothing on endpoint)
- that is applyed when
- IAuthorizationRequirementData
- has checked this shit
- and in the end combine

## Covered screenshot uses

```text
IU-008, IU-009, IU-013, IU-014, IU-015, IU-016, IU-041
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
