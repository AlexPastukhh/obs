# Knowledge Registry

Source workspace: `_ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events/`

Authoritative processed sources:
- `01-stage1-r01-base-auth-forwarding-transcript.md`
- `02-stage2-r02-cookie-auth-core-events-transcript.md`
- `03-stage3-p03p04-jwt-oidc-combined-transcript.md`
- `04-stage4-final-coverage-audit.md`
- `CURRENT_SOURCE_OF_TRUTH.md` (coverage/status ledger only)

Original SVG: `source/authentication,, oidc, flows , handlers , forwarding auth events.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Base auth middleware / `AuthenticationService` / forwarding basics and scheme selection | `aspnet-core.authentication-schemes-oidc-events-and-tickets` | `aspnet-core` | `../_knowledge/aspnet-core/authentication-schemes-oidc-events-and-tickets.md` | MERGED |
| Cookie auth sign-in / ticket store / principal lifecycle and `HttpContext.User` semantics | `aspnet-core.authentication-ticket-principal-and-request-user`; `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core`; `aspnet-core` | `../_knowledge/aspnet-core/authentication-ticket-principal-and-request-user.md`; `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MERGED |
| Cookie auth event lifecycle: sign-in, signed-in, sign-out, sliding expiration, redirect boundary | `aspnet-core.cookie-authentication-event-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-event-lifecycle.md` | MERGED |
| JWT bearer handler flow, token discovery, failures, challenge, forbid, and `OnMessageReceived`/`OnTokenValidated` hooks | `aspnet-core.jwt-bearer-event-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/jwt-bearer-event-lifecycle.md` | MERGED |
| OIDC / PKCE / remote challenge and callback flow, final ticket creation and failed remote flow handling | `aspnet-core.authentication-schemes-oidc-events-and-tickets` | `aspnet-core` | `../_knowledge/aspnet-core/authentication-schemes-oidc-events-and-tickets.md` | MERGED |
| API challenge response translation to Problem Details and single-body-owner rule | `aspnet-core.cookie-auth-api-challenge-responses` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-auth-api-challenge-responses.md` | MERGED |
| Final coverage audit, image counts, and transcript quality bookkeeping | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 0 |
| MERGED | 6 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

## Boundary decisions

- The source material here is already represented by existing ASP.NET Core units, so the migration preserves the same learning content by merging these claims into the already-established units rather than creating duplicate `MAPPED` entries.
- The scheme-selection and OIDC event model remains in the existing authentication unit because the learning boundary is already defined across the topic index and related registry entries.
- Cookie ticket lifecycle and event lifecycle stay separated because sign-in/sign-out callbacks and incoming ticket validation are different operational phases even when they share a cookie model.
- JWT bearer and cookie handlers remain separate because their token source, validation timing, and challenge semantics differ materially.
- Source audit, coverage counts, and transcript bookkeeping are kept as `NON_LEARNING` evidence and are not included in the learner-facing unit set.
