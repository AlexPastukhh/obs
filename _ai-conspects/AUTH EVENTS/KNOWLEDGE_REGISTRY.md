# Knowledge Registry

Source workspace: `_ai-conspects/AUTH EVENTS/`

Authoritative processed source: `02-corrected-semantic-transcript-v002.md`

Original SVG: `source/AUTH EVENTS.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 inline cookie callbacks versus scoped `EventsType` with dependency injection and testability | `aspnet-core.cookie-authentication-event-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-event-lifecycle.md` | MAPPED |
| R01 `OnSigningIn` versus `OnSignedIn`, ticket-affecting principal/properties changes and post-login side effects | `aspnet-core.cookie-authentication-event-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-event-lifecycle.md` | MAPPED |
| R01 incoming-cookie `OnValidatePrincipal`, rejection/sign-out, principal replacement and `ShouldRenew` persistence | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MERGED |
| R01 idempotent `OnSigningOut` cleanup and `OnCheckSlidingExpiration` renewal boundary | `aspnet-core.cookie-authentication-event-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-event-lifecycle.md` | MAPPED |
| R01 page redirect events, API `401`/`403` Problem Details conversion and single response-owner rule | `aspnet-core.cookie-auth-api-challenge-responses` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-auth-api-challenge-responses.md` | MERGED |
| R02 path-scoped SignalR query-token extraction in `OnMessageReceived` and business-state checks in `OnTokenValidated` | `aspnet-core.jwt-bearer-event-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/jwt-bearer-event-lifecycle.md` | MAPPED |
| R02 `OnAuthenticationFailed`, `OnChallenge` plus `HandleResponse`, `OnForbidden`, safe diagnostics and precise 401/403 distinctions | `aspnet-core.jwt-bearer-event-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/jwt-bearer-event-lifecycle.md` | MAPPED |
| R03 event-context access to `HttpContext`, request/response, scheme/options and stage-dependent principal/properties | `aspnet-core.cookie-authentication-event-lifecycle`; `aspnet-core.jwt-bearer-event-lifecycle` | `aspnet-core`; `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-event-lifecycle.md`; `../_knowledge/aspnet-core/jwt-bearer-event-lifecycle.md` | MAPPED |
| R03 `IApiEndpointMetadata`, endpoint examples, framework/endpoint-style differences and explicit response-shape classification | `aspnet-core.endpoint-metadata-and-mvc-action-descriptors` | `aspnet-core` | `../_knowledge/aspnet-core/endpoint-metadata-and-mvc-action-descriptors.md` | MERGED |
| R03 shared Problem Details writing, status-before-body, no-double-write and authentication-versus-authorization ownership | `aspnet-core.cookie-auth-api-challenge-responses` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-auth-api-challenge-responses.md` | MERGED |
| Corrected screenshot recovery, duplicate placement, coverage counts and processing history | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Cookie issuance/sign-out/sliding callbacks form one lifecycle; incoming-ticket revocation and persisted principal renewal remain in the existing ticket lifecycle unit.
- Bearer token discovery, successful validation, processing failure, challenge and forbid are retained together because their value depends on remembering their relative pipeline stages.
- API endpoint classification and Problem Details ownership merge into existing cross-handler units rather than being duplicated as auth-event-only rules.

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 4 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
