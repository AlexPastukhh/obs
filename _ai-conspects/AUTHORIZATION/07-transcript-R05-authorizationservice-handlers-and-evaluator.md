# Regional transcript — R05: IAuthorizationService, handler provider, evaluator and handler execution

Conspect: `AUTHORIZATION`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R05
image uses processed: 14 / 14
unique screenshots represented: 14
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

The default authorization service coordinates policy requirements, handler discovery, context creation and final evaluation.

## Core collaborators

- `IAuthorizationHandlerContextFactory` creates the context containing requirements, user and resource.
- `IAuthorizationHandlerProvider` supplies handlers for the request.
- `IAuthorizationEvaluator` converts the completed context into `AuthorizationResult`.
- The policy provider resolves named policies before the service evaluates them.

## Handler execution

- Handlers call `context.Succeed(requirement)` when their condition is met.
- `context.Fail()` records explicit failure; optional failure reasons can carry diagnostics.
- A handler can evaluate several requirements or a requirement can have several handlers.
- The framework does not use a simple first-true-wins model; all required conditions must be satisfied unless a custom assertion or composite requirement defines otherwise.

## InvokeHandlersAfterFailure

- `AuthorizationOptions.InvokeHandlersAfterFailure` controls whether remaining handlers run after explicit failure.
- Leaving it enabled permits auditing or side-effect handlers to observe the attempt.
- Disabling it can skip expensive remaining handlers after a terminal failure, but handlers should not rely on execution order for correctness.

## Direct service use

- The service has overloads for policy names and explicit requirement collections.
- Application code can use it outside middleware for UI decisions or domain-resource checks, while the database or business operation must still enforce authorization at the real boundary.

## Caveats

- Authorization handlers are dependency-injection services; lifetime and thread-safety must match their dependencies.
- Fail-fast is an optimization policy, not a replacement for correct requirement design.

## Nearby source labels

- authorizeasync
- authorizaitonserviceextensions
- defaultauthorizationservice
- default one
- defaulthandlerprovider
- IAuthorizationService
- defaultAuthorizationEvaluator
- After authorization resulot
- but we can fail fast inside one specific expensive handler with context
- AuthorizationMiddlewareResHanlder
- InvokeHanldersAfterFailure
- has failed
- why to have

## Covered screenshot uses

```text
IU-055, IU-060, IU-061, IU-062, IU-063, IU-064, IU-065, IU-066, IU-067, IU-068, IU-069, IU-070, IU-071
IU-072
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
