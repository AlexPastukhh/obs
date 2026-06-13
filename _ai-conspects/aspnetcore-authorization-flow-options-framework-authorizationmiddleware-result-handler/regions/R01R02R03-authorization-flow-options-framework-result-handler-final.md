# R01/R02/R03 - ASP.NET Core authorization flow / options / framework / result handler final transcript v001

Generated: 2026-06-13 06:20:00 UTC

Source policy: preserved PNGs and original SVG remain the source of truth for exact code punctuation, framework-version details and UI text. This file is a source-preserving semantic transcript over all image uses and canvas text labels.

---

## Boundary decision

The whole sheet is closed in one final pass because the image count is below the current batch size and the regions form one continuous authorization pipeline:

```text
R01: policy metadata/options and AuthorizationMiddleware policy build/cache/combine road
R02: AuthorizationMiddleware execution, PolicyEvaluator, IAuthorizationService and handler/evaluator flow
R03: AuthorizationMiddlewareResultHandler, PolicyAuthorizationResult and custom challenge/forbid responses
```

Coverage:

```text
R01 image uses: 19
R02 image uses: 36
R03 image uses: 0  # text-heavy lower region; Stage0 assigned no screenshot image uses here
R01 text labels: 18
R02 text labels: 15
R03 text labels: 31
total image uses: 55
total text labels: 64
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```

Duplicate-image-use note:

```text
S-010 and S-014 are duplicate embedded-image uses of the same IAuthorizationRequirementData screenshot.
Both placements were intentionally closed because duplicate placements can have separate canvas context.
```

---

## 0.1 Area overview / key ideas / reading quality

What this conspect is about:

```text
- how ASP.NET Core attaches authorization metadata to endpoints;
- how AuthorizationMiddleware builds/retrieves AuthorizationPolicy from ordered endpoint metadata;
- default policy vs fallback policy;
- policy authentication and multi-scheme principal merge;
- AllowAnonymous behavior;
- choosing authorization resource;
- PolicyEvaluator.Authorize and IAuthorizationService flow;
- handlers, context factory, handler provider and evaluator;
- result handling with PolicyAuthorizationResult;
- challenge/forbid/succeeded behavior and custom AuthorizationMiddlewareResultHandler.
```

Key ideas:

- Authentication and authorization are separate. Authentication builds or updates `HttpContext.User`; authorization decides whether the authenticated/anonymous user can access a protected endpoint.
- Endpoint authorization starts from endpoint metadata: attributes, `RequireAuthorization`, `IAuthorizeData`, concrete `AuthorizationPolicy`, and requirement-producing metadata.
- `DefaultPolicy` is used when authorization is explicitly required but no named/specific policy is supplied. `FallbackPolicy` is used only when there is no authorization metadata on the endpoint.
- `AuthorizationMiddleware` first retrieves endpoint metadata and builds or fetches a combined policy. If absolutely no policy exists, it calls `next` and does not authorize.
- Policy authentication may authenticate one or more schemes and merge principals. Even when `AllowAnonymous` later skips authorization, authentication can still populate `HttpContext.User`.
- `PolicyEvaluator.AuthorizeAsync` bridges middleware and `IAuthorizationService`. The result maps to success, challenge, or forbid depending on authorization and authentication result.
- Authorization handlers and evaluators separate “run requirements/handlers” from “decide whether the context succeeded.” `InvokeHandlersAfterFailure` controls whether later handlers continue after failure.
- `AuthorizationMiddlewareResultHandler` is the final customization point for what happens after authorization: call next, challenge schemes, forbid schemes, return custom response, or preserve/bypass scheme events intentionally.

Reading quality:

```text
overall: medium-high
screenshots: mostly readable; exact code should be corrected from PNGs when needed
canvas text labels: important, especially R03; typos normalized in prose
coverage: final pass closes all 55 image uses and all 64 text labels
```

---

## 1. R01 - authorization metadata, options and policy construction

### 1.1 Authorization flow overview

The first screenshots frame the runtime authorization flow. Authentication runs before authorization and usually builds `HttpContext.User`. Authorization then checks whether the user can access the selected endpoint. The high-level authorization middleware flow is:

```text
1. build or retrieve policy for the endpoint;
2. run policy authentication;
3. respect AllowAnonymous;
4. choose resource;
5. call PolicyEvaluator.Authorize / AuthorizationService;
6. pass the result to AuthorizationMiddlewareResultHandler.
```

Representative sources:

```text
S-001, S-002
```

### 1.2 Runtime pieces and options surface

The runtime pieces are split between middleware, endpoint metadata, options, policies and services:

```text
UseAuthorization / AuthorizationMiddleware
AuthorizeAttribute / IAuthorizeData
AuthorizationOptions
AuthorizationPolicy
AuthorizationPolicyBuilder
IAuthorizationRequirement / IAuthorizationRequirementData
IAuthorizationService
IAuthorizationHandler / handler provider / handler context factory / evaluator
AuthorizationMiddlewareResultHandler
```

`AuthorizationOptions` owns important global behavior: default policy, fallback policy, policy map, and the `InvokeHandlersAfterFailure` behavior. The transcript treats exact property names as source-sensitive, but the conceptual ownership is clear: policy construction and default/fallback behavior are configured before request-time authorization decisions.

Representative sources:

```text
S-002, S-003, S-004, S-005, S-006
```

### 1.3 Default policy vs fallback policy

`DefaultPolicy` applies when authorization is explicitly requested but no named/specific policy is supplied. By default it effectively requires an authenticated user.

`FallbackPolicy` applies when there is no authorization metadata on the endpoint. By default it is usually `null`, which means “no fallback authorization requirement.” If configured, it can make endpoints require authorization even without `[Authorize]` or `.RequireAuthorization()`.

The important distinction:

```text
explicit authorization with no specific policy -> DefaultPolicy
no authorization metadata at all -> FallbackPolicy
no resulting policy -> call next without authorization check
```

Representative sources:

```text
S-003, S-004, S-005, S-006, S-018
```

### 1.4 Ways to attach authorization information to an endpoint

The canvas notes show multiple ways to attach authorization metadata:

```text
[Authorize]
[Authorize(Policy = ...)]
RequireAuthorization(...)
metadata implementing IAuthorizeData
metadata containing an AuthorizationPolicy
metadata implementing IAuthorizationRequirementData
```

`IAuthorizeData` is the common attribute/metadata shape. It may provide policy name, roles and schemes. The middleware/policy provider later combines this metadata into a concrete `AuthorizationPolicy`.

`IAuthorizationRequirementData` is a more dynamic metadata shape: metadata can produce requirements directly. The same screenshot is duplicated as S-010 and S-014, and both placements are closed because they appear in separate canvas context.

Representative sources:

```text
S-007, S-009, S-010, S-014, S-016
```

### 1.5 AuthorizationMiddleware policy build/cache/combine road

The middleware begins from the selected endpoint. The canvas text notes that it sets feature/marker data so later pipeline parts can know authorization middleware has processed the endpoint. Then it tries to use a cache for cacheable policies. If nothing is cached, it reads ordered metadata from the endpoint and combines it into one policy.

The build path includes:

```text
- collect IAuthorizeData metadata;
- collect AuthorizationPolicy metadata;
- collect IAuthorizationRequirementData requirements;
- combine policies/requirements into one result policy;
- cache the result if cacheable;
- if no policy remains, call next.
```

This road explains why order and metadata shape matter: the endpoint can contain several authorization metadata sources, and the middleware turns them into one policy before running authentication/authorization.

Representative sources:

```text
S-011, S-012, S-013, S-015, S-017, S-019
```

---

## 2. R02 - AuthorizationMiddleware execution and PolicyEvaluator/AuthorizationService flow

### 2.1 Policy authentication

After the policy is built, middleware runs policy authentication through `PolicyEvaluator.AuthenticateAsync`. If the policy specifies authentication schemes, those schemes are authenticated. Their principals can be merged into a new `ClaimsPrincipal`, and the ticket can contain a concatenation/list of authenticated schemes.

If the policy does not specify schemes, the evaluator can use existing `HttpContext.User` and existing authenticate result/feature state from earlier authentication middleware. The canvas specifically notes that this stage checks the authentication result, not just a generic authorization result.

Representative sources:

```text
S-020, S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034
```

### 2.2 Multi-scheme behavior and already-authenticated users

For multiple schemes, the evaluator can run each scheme and merge successful principals. This matters when a policy accepts several authentication schemes, or when an endpoint overrides the default scheme set.

The notes also mark a subtle case: the request may already have an authenticated user from the authentication middleware default scheme. Policy authentication still has to respect the policy’s scheme list. If the policy chooses schemes explicitly, it may re-authenticate or select the policy scheme results instead of blindly using the existing user.

Representative sources:

```text
S-024, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033
```

### 2.3 AllowAnonymous still allows authentication to populate user

`AllowAnonymous` is respected after policy authentication. The key note is: anonymous access can skip the authorization decision, but policy/authentication work may already have populated `HttpContext.User`. This matters for endpoints that are anonymous but still want to know whether a user is present.

The flow becomes:

```text
authenticate according to policy/schemes
if endpoint has AllowAnonymous -> call next without failing authorization
otherwise continue to resource + authorize step
```

Representative sources:

```text
S-035, S-036, S-037, S-038, S-039
```

### 2.4 Choosing resource for authorization handlers

Authorization handlers receive a resource object. The notes show the choice between using `HttpContext` and using the endpoint/resource object. The choice matters because different requirements need different context:

```text
handler needs request/services/user/http details -> HttpContext can be useful
handler needs endpoint metadata -> Endpoint/resource can be useful
```

There is a framework switch/option road around whether authorization uses `HttpContext` as the resource or endpoint-oriented resource. The transcript keeps the exact switch/API detail as source-sensitive, but the conceptual point is that handlers must know what type of `resource` to expect.

Representative sources:

```text
S-040, S-041, S-042
```

### 2.5 PolicyEvaluator.Authorize and mapping to challenge/forbid

`PolicyEvaluator.AuthorizeAsync` calls `IAuthorizationService.AuthorizeAsync`. The evaluator then maps the result into one of the result shapes used by middleware:

```text
authorization succeeds -> success
authorization fails but authentication succeeded -> forbid
authorization fails and authentication did not succeed -> challenge
```

This is why authentication result matters. “Not authorized” is not always the same response: unauthenticated callers are usually challenged, authenticated callers without sufficient permission are usually forbidden.

Representative sources:

```text
S-045, S-046, S-048, S-049, S-050, S-052, S-053
```

### 2.6 IAuthorizationService and handlers/evaluator internals

The default `IAuthorizationService` flow includes these internal pieces:

```text
AuthorizationHandlerContextFactory
IAuthorizationHandlerProvider / DefaultAuthorizationHandlerProvider
IAuthorizationHandler instances
AuthorizationEvaluator / DefaultAuthorizationEvaluator
```

The service creates a handler context from user, resource and requirements/policy. The handler provider returns handlers. The service invokes handlers, then the evaluator decides whether the context is authorized.

The canvas marks an important implementation detail: handlers can be scoped and provider results may be cached/held for the current operation. The exact lifetime/cache mechanics are source-sensitive, but the intent is clear: framework separates handler discovery, handler invocation and final evaluation.

Representative sources:

```text
S-043, S-044, S-047, S-051, S-055
```

### 2.7 InvokeHandlersAfterFailure

`InvokeHandlersAfterFailure` controls whether authorization keeps invoking remaining handlers after a failure is recorded. Keeping it enabled can collect more failure information and let independent handlers run. Disabling it can avoid expensive work after a known failure.

The canvas text adds a more local optimization: even when the global option is true, a specific expensive handler can inspect failure state and stop its own expensive work if the context has already failed.

Representative sources:

```text
S-054 plus related canvas labels around InvokeHandlersAfterFailure
```

---

## 3. R03 - AuthorizationMiddlewareResultHandler and custom result handling

### 3.1 Where result handling sits

After policy authentication and authorization, `AuthorizationMiddleware` delegates response behavior to `AuthorizationMiddlewareResultHandler`. This is the boundary between “authorization decision” and “what HTTP/authentication response should be emitted.”

Conceptual interface shape:

```text
HandleAsync(next, context, policy, authorizeResult)
```

The handler receives the next delegate, current `HttpContext`, the built policy and the `PolicyAuthorizationResult`.

Representative text labels:

```text
T-020, T-021, T-022, T-024, T-026, T-028
```

### 3.2 PolicyAuthorizationResult result types

The result object can represent the outcomes the middleware must map:

```text
Succeeded
Challenged
Forbidden
```

For forbidden results, it can preserve an `AuthorizationFailure`. The failure can expose failed requirements and failure reasons. This makes it possible to inspect failed requirements and produce custom responses for specific authorization failures.

Representative text labels:

```text
T-051, T-057, T-058, T-059, T-060, T-061, T-062
```

### 3.3 Default handler behavior: next, challenge, forbid

The default handler behavior is roughly:

```text
if succeeded -> await next(context)
if challenged -> challenge authentication schemes from policy, or default challenge
if forbidden -> forbid authentication schemes from policy, or default forbid
```

When a policy has multiple authentication schemes, the handler loops over policy schemes. That is why the result handler needs access to the policy, not only the raw authorization result.

Representative text labels:

```text
T-025, T-027, T-049
```

### 3.4 Custom result handler use cases

A custom `AuthorizationMiddlewareResultHandler` is useful when the application wants custom behavior for specific failures:

```text
- return 404 instead of 403 for a specific requirement;
- inspect failed requirements and produce a custom body/status;
- add metadata/headers/context values so forbid/challenge events can understand the reason;
- customize only specific cases and delegate the rest to the default handler.
```

The safest design is usually to handle only the special cases and fallback to the default implementation for normal success/challenge/forbid behavior.

Representative text labels:

```text
T-048, T-050, T-061, T-063
```

### 3.5 Scheme events and bypassing default behavior

The notes warn that bypassing normal challenge/forbid behavior can also bypass scheme handlers/events. If the application directly writes a response in a custom result handler, authentication scheme events such as forbid/challenge callbacks may not run.

If those events are needed, the custom handler can pass information through metadata, headers or `HttpContext` so the scheme event callback can still know the exact reason for forbid/challenge. If events are not needed, bypassing forbid can be acceptable for a targeted response.

Representative text labels:

```text
T-049, T-052, T-063
```

---

## 4. Evidence / source map

Detailed image rows:

```text
data/R01R02R03-sources-stage1-v001.csv
data/R01R02R03-sources-stage1-v001.json
```

Detailed canvas text rows:

```text
data/R01R02R03-text-labels-stage1-v001.csv
data/R01R02R03-text-labels-stage1-v001.json
```

Audit images:

```text
audit-assets/R01R02R03-source-images/*.png
audit-assets/contact-sheet-R01R02R03-final-coverage-v001.png
```

Final coverage audit:

```text
data/final-coverage-audit-stage1-v001.csv
data/final-coverage-audit-stage1-v001.json
```

---

## 5. Limitations

This is a source-preserving semantic transcript. It is not a verbatim OCR of every screenshot. Exact C# punctuation, framework version details, method signatures and UI text should be corrected from preserved source PNGs or original framework source when needed.

---

## 6. Final status

```text
total image uses: 55
total text labels: 64
R01 processed image uses: 19
R02 processed image uses: 36
R03 processed image uses: 0
R01 processed text labels: 18
R02 processed text labels: 15
R03 processed text labels: 31
duplicate image-use groups: 1
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
