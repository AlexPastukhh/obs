# R01/R02/R03/R04 — ASP.NET Core authorization policies, requirements, handlers and resource-based authorization

Conspect: `AUTHORIZATION`  
Stage: **stage-1 verified final coverage transcript v001**  
Generated: 2026-06-22 UTC

---

## Direction check

Goal:
Convert the authorization policies/requirements/handlers canvas into source-preserving AI-readable text without losing screenshots, code examples or canvas notes.

Now:
Stage0 is committed. The source contains 75 image placements, 68 unique embedded images, 110 canvas labels and 7 duplicate placements by extracted content.

This step:
Process the full coherent canvas in one pass: R01 AddAuthorization/global policy configuration; R02 custom and resource-based authorization; R03 AuthorizationHandlerContext; R04 generic/non-generic handlers, multiple requirements and batching.

Why:
The four candidate regions form one continuous model: a policy contains requirements, handlers evaluate requirements through AuthorizationHandlerContext, and endpoint/resource checks consume the resulting policies.

Next:
Apply and commit this archive. Afterwards no normal transcript regions remain.

---

## 0.1 Area overview, key ideas and reading quality

This area explains the full ASP.NET Core authorization chain:

```text
policy -> requirements -> handlers -> AuthorizationHandlerContext -> success/failure -> endpoint/resource authorization result
```

Key ideas:

- Authentication establishes identity; authorization evaluates whether the current user may perform a requested operation.
- An `AuthorizationPolicy` is primarily a collection of requirements plus authentication-scheme information.
- Multiple requirements in one policy are normally combined with AND semantics: every requirement must be satisfied.
- A single requirement may have multiple handlers. One handler that cannot establish success should usually do nothing rather than force failure.
- `context.Succeed(requirement)` marks that exact requirement as satisfied and removes it from `PendingRequirements`.
- `context.Fail()` marks the whole authorization evaluation as failed and should be reserved for authoritative deny decisions.
- Resource-based authorization supplies the actual domain object/resource to the handler.
- Generic resource handlers are best when one handler targets one requirement/resource pair; non-generic handlers are useful when several requirement types must be evaluated together or one batched call supplies many permission decisions.
- Fallback policy is the safer global default when most endpoints require authorization and exceptional public endpoints are explicitly marked anonymous.

Reading quality:

```text
overall conceptual reading: high
code examples: medium-high
exact punctuation/line wrapping: preserved PNG and SVG remain authoritative
coverage: 75 image uses + 110 text labels, remaining unclosed = 0
```

---

## 1. Boundary and duplicate-placement review

Included:

```text
R01: 21 image uses / 5 labels
R02: 39 image uses / 41 labels
R03: 10 image uses / 22 labels
R04: 5 image uses / 42 labels
```

Duplicate content appears in seven extra canvas placements. Those placements are not discarded: each placement remains represented in the source map because the same screenshot may support a different nearby explanation or region.

---

## 2. R01 — AddAuthorization, basic/global policies and requirement data

### 2.1 Named policies

`AddAuthorization` configures named policies through `AuthorizationOptions`. A named policy is later referenced by `[Authorize(Policy = "...")]`, endpoint metadata or explicit `IAuthorizationService` calls.

Typical policy-builder operations in the source include:

```csharp
options.AddPolicy("DepartmentSales", policy =>
    policy.RequireClaim("department", "sales", "marketing"));
```

A policy can require:

- an authenticated user;
- a role;
- a claim type;
- a claim with one of several allowed values;
- a custom assertion;
- one or more custom `IAuthorizationRequirement` instances.

### 2.2 AND and OR semantics

The canvas distinguishes two levels of composition:

- Multiple requirement calls in the same policy are ANDed.
- Multiple allowed values passed to one role/claim requirement are alternatives inside that requirement, effectively OR.

For example, requiring `department` with values `sales` or `marketing` means either value satisfies that one requirement. Adding another separate `RequireClaim("permission", "products.edit")` means both the department requirement and permission requirement must succeed.

### 2.3 Default policy, fallback policy and global authorization

The default policy is the policy used when authorization is requested without a named policy. The fallback policy applies when an endpoint has no explicit authorization metadata.

The source recommends a fallback-policy approach when almost all endpoints should be protected:

```csharp
options.FallbackPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();
```

Public endpoints are then deliberately marked with `[AllowAnonymous]` or the corresponding endpoint metadata. This is safer than relying on every developer to remember `[Authorize]` on every new endpoint.

### 2.4 Middleware and endpoint metadata

Authorization metadata is gathered from controllers/actions or endpoint routing metadata. `UseAuthorization` must run after routing has selected the endpoint so the middleware can read its policies, and before endpoint execution.

The same requirement model can also be supplied directly by endpoint metadata through `IAuthorizationRequirementData`. A custom attribute/metadata type may expose requirements that are combined into the effective policy, avoiding a separately named policy for every small parameterized rule.

### 2.5 Real-policy mental model

The sheet's final R01 mental model is:

```text
Policy = AND of requirements
Requirement = one rule that must be satisfied
Handler = code that evaluates a requirement
A requirement succeeds only after context.Succeed(requirement)
```

---

## 3. R02 — Custom requirements, handlers and resource-based authorization

### 3.1 Requirement and handler split

A custom requirement is a data/rule description implementing `IAuthorizationRequirement`. It should normally contain the parameters needed to evaluate the rule and avoid depending directly on request services.

A typed handler derives from:

```csharp
AuthorizationHandler<TRequirement>
```

and overrides `HandleRequirementAsync`. The handler inspects `context.User`, the requirement and optionally `context.Resource`. When the rule is satisfied, it calls:

```csharp
context.Succeed(requirement);
```

Doing nothing means this handler did not satisfy the requirement. After all relevant handlers run, any requirement still pending causes the policy to fail.

### 3.2 Several handlers for one requirement

ASP.NET Core may register multiple handlers for the same requirement. This is useful when different ways can satisfy the same rule, such as:

- owner of the resource;
- administrator;
- user with a special scope/permission;
- temporary operational exception.

Because another handler may still succeed, the source warns against calling `context.Fail()` everywhere. A handler that cannot prove success should usually return without calling either method. Explicit `Fail()` is for a true authoritative deny condition, such as a banned user or a policy rule that must veto all alternatives.

### 3.3 Resource-based authorization

When authorization depends on the actual object being accessed, endpoint metadata alone is not enough because the resource may need to be loaded first. The application calls `IAuthorizationService.AuthorizeAsync` with the user, resource and policy/requirements.

Conceptually:

```csharp
var result = await authorizationService.AuthorizeAsync(
    User,
    document,
    "CanEditDocument");
```

A handler can compare the current user's identifier with `document.OwnerId`, check an administrator role, inspect resource state, or evaluate an operation requirement.

### 3.4 Generic resource handlers

The cleaner typed form derives from:

```csharp
AuthorizationHandler<TRequirement, TResource>
```

The resource is supplied as a strongly typed argument, avoiding manual casts from `context.Resource`. This is preferred when the requirement is inherently tied to a concrete domain resource.

### 3.5 Non-generic resource access

A non-resource-specific handler can inspect `context.Resource` directly. In MVC this may be an authorization-filter context; with endpoint routing/minimal APIs it is often an `HttpContext` or endpoint-related object. The handler must check the runtime type before using it.

The source's practical advice is to avoid coupling authorization rules to framework context objects when a typed domain resource can be passed instead.

### 3.6 Operation requirements

Resource authorization commonly models operations such as read, create, update and delete. A reusable operation requirement allows one handler to decide whether the user may perform a specific operation on the resource.

This separates:

```text
who the user is
what operation is requested
which resource is being acted on
```

and keeps controllers/endpoints from duplicating permission logic.

---

## 4. R03 — AuthorizationHandlerContext semantics

### 4.1 `context.User`

`User` is the current `ClaimsPrincipal`. Handlers use it to inspect:

- authentication state;
- subject/user-id claims;
- roles;
- tenant, department, permission and scope claims.

The sheet shows that authorization code should read claims through the principal rather than parsing transport tokens itself.

### 4.2 `context.Resource`

`Resource` is the object supplied to authorization. It may be a domain object, an `HttpContext`, endpoint-related context or another application-defined value. Generic resource handlers avoid runtime type checks by receiving `TResource` directly.

### 4.3 `context.Requirements`

`Requirements` contains all requirements being checked for the current authorization evaluation. Typed handlers usually receive their requirement directly and do not need to enumerate the collection. Non-generic handlers may enumerate it when one check can address several requirements.

### 4.4 `context.PendingRequirements`

`PendingRequirements` contains requirements not yet satisfied. It changes when `Succeed` is called. A handler processing several pending items should iterate over a snapshot:

```csharp
foreach (var requirement in context.PendingRequirements.ToList())
{
    // evaluate and call Succeed(requirement)
}
```

This prevents modifying the collection while enumerating it.

### 4.5 `context.Succeed(requirement)`

`Succeed` marks the specific requirement as satisfied. The mental model in the canvas is:

```text
before: requirement is in PendingRequirements
after Succeed(requirement): requirement is removed from PendingRequirements
```

Succeeding one requirement does not automatically succeed every other requirement in the policy.

### 4.6 `context.Fail()`

`Fail` marks the overall authorization evaluation as failed. It is stronger than simply not succeeding a requirement.

```text
no Succeed -> this requirement remains unsatisfied
Fail -> the whole authorization evaluation must fail
```

This distinction matters with multiple handlers: a handler that cannot grant access should not normally veto another handler that may grant it.

---

## 5. R04 — Scope handler, generic/non-generic handlers, multiple requirements and batching

### 5.1 Scope requirement example

The scope example defines a requirement carrying the required scope string and a typed handler that examines both common claim formats:

- `scope`;
- `scp`.

A claim may contain one scope or a space-separated list. The handler gathers all values, splits on spaces and succeeds the requirement when the requested scope is present.

Conceptually:

```csharp
if (HasScope(context.User, requirement.Scope))
    context.Succeed(requirement);
```

If the scope is absent, the handler does nothing. That means “not satisfied by this handler,” not an immediate global failure.

### 5.2 Registration and policy use

Handlers are registered in DI as `IAuthorizationHandler`. Policies add requirement instances such as `new ScopeRequirement("products:read")` and `new ScopeRequirement("products:write")`. Controllers or endpoints reference the resulting named policies.

One policy containing two scope requirements requires both scopes because the requirements are ANDed.

### 5.3 Generic handlers

Use `AuthorizationHandler<TRequirement>` when one handler evaluates one requirement type. Use `AuthorizationHandler<TRequirement,TResource>` when the decision also depends on a strongly typed resource.

Advantages:

- direct requirement parameter;
- direct typed resource parameter;
- less casting and branching;
- clearer unit tests and ownership.

### 5.4 Non-generic `IAuthorizationHandler`

A non-generic handler is useful when:

- one external/API/database call returns many permissions;
- several requirement types belong to one logical domain;
- requirements must be considered together;
- one shared rule can satisfy or authoritatively fail several pending requirements;
- the authorization system acts as a rule dispatcher over heterogeneous requirements.

The handler can inspect `PendingRequirements`, batch-fetch the user's permissions once, and call `Succeed` for every requirement supported by the returned permission set.

### 5.5 Shared deny and rule-dispatcher patterns

The lower notes describe cases where all requirements should fail based on one authoritative fact, for example a banned/disabled user or invalid tenant membership. In that case a single non-generic handler may call `Fail()` once.

A dispatcher-style handler may switch by requirement type and send each rule to domain authorization logic. This can reduce duplicated remote calls, but it should not become a giant untestable switch. Typed handlers remain preferable when checks are independent.

### 5.6 Multiple requirements and multiple handlers

Final policy-evaluation model:

```text
1. The policy contributes one or more requirement instances.
2. All registered handlers capable of evaluating them are invoked.
3. Any handler may call Succeed(requirement).
4. Every policy requirement must eventually be succeeded.
5. A remaining pending requirement means policy failure.
6. An explicit context.Fail() forces overall failure.
```

This explains why multiple handlers are often alternatives for satisfying one requirement, while multiple requirements are normally cumulative AND conditions.

---

## 6. Practical design guidance

Prefer:

- small requirement types that describe rules;
- handlers containing evaluation logic;
- typed resource handlers for domain objects;
- fallback authorization for secure-by-default applications;
- bounded, testable authorization checks;
- no side effects beyond permission lookup/evaluation;
- batched permission retrieval only when profiling or architecture justifies it.

Avoid:

- checking permissions inline in every controller;
- calling `context.Fail()` merely because one handler could not grant access;
- depending on raw JWT parsing inside handlers;
- static/unbounded permission state;
- framework-context coupling when a domain resource can be provided;
- one giant dispatcher when independent typed handlers would be clearer.

---

## 7. Evidence and final coverage

Detailed source map:

```text
data/R01R02R03R04-sources-stage1-v001.csv
data/R01R02R03R04-sources-stage1-v001.json
```

Canvas labels:

```text
data/R01R02R03R04-text-labels-stage1-v001.csv
data/R01R02R03R04-text-labels-stage1-v001.json
```

Boundary and duplicate-placement review:

```text
data/R01R02R03R04-boundary-review-stage1-v001.*
data/duplicate-placement-review-stage1-v001.*
```

Final audit:

```text
data/final-coverage-audit-stage1-v001.*
```

Final status:

```text
total image uses: 75
total text labels: 110
R01 processed: 21 images / 5 labels
R02 processed: 39 images / 41 labels
R03 processed: 10 images / 22 labels
R04 processed: 5 images / 42 labels
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
