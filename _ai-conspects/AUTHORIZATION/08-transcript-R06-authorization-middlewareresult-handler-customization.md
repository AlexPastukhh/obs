# Regional transcript — R06: AuthorizationMiddlewareResultHandler customization

Conspect: `AUTHORIZATION`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R06
image uses processed: 11 / 11
unique screenshots represented: 11
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

The middleware result handler is the final policy-response boundary. It can delegate to the default behavior or replace selected challenge/forbid responses.

## Default behavior

- Success calls the next middleware component.
- Challenge invokes `ChallengeAsync` for every authentication scheme in the policy, or the default challenge scheme when none are listed.
- Forbid invokes `ForbidAsync` similarly.
- Scheme handlers own redirects, status codes and their challenge/forbid events.

## Custom handler pattern

- Implement `IAuthorizationMiddlewareResultHandler` and register it as a service.
- Inspect `PolicyAuthorizationResult`, the effective policy and `HttpContext`.
- Handle only the specific requirement or endpoint case that needs a custom response.
- Delegate all other results to the framework's default handler.

## Writing a custom response

- A custom handler can return a JSON problem response, custom status code or header for selected failures.
- Once it writes and completes the response instead of calling `ChallengeAsync`/`ForbidAsync`, the authentication scheme's normal events do not run for that case.
- Do not expose sensitive authorization details to an untrusted client.

## Caveats

- The result handler should not duplicate requirement evaluation; it consumes the result.
- Response customization must account for browsers, APIs and authentication-scheme redirect behavior.

## Nearby source labels

- InvokeHanldersAfterFailure
- why to have
- has failed
- default implementation behavior
- !!!
- for what
- interface
- !!!WW
- parameters
- Looping over policy schemes
- custom handler example

## Covered screenshot uses

```text
IU-073, IU-074, IU-075, IU-084, IU-085, IU-086, IU-087, IU-088, IU-089, IU-090, IU-091
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
