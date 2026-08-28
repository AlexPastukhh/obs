# Knowledge Registry

Source workspace: `_ai-conspects/authenticaiton ticket, properties, context.User (claimsprincipal)/`

Authoritative processed source: `regions/full-source-near-literal-v003.md` (S-001 through S-043)

Original SVG: `source/source-complete-v002.svg`

Evidence and coverage: `data/independent-full-svg-audit-v002.json`; 43 of 43 image uses and 31 of 31 SVG text nodes are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| S-001–S-002 `Parameters` as transient operation input, handler-specific keys and OIDC challenge example | `aspnet-core` | `aspnet-core.authentication-properties-operation-and-session-state` | `../_knowledge/aspnet-core/authentication-properties-operation-and-session-state.md` | MAPPED |
| S-003–S-007 stored-token helpers, token representation, `SaveToken` retention and successful-validation boundary | `aspnet-core` | `aspnet-core.authentication-properties-operation-and-session-state` | `../_knowledge/aspnet-core/authentication-properties-operation-and-session-state.md` | MAPPED |
| S-008–S-009 `Items` persistence, cookie-ticket restoration and bearer current-result boundary | `aspnet-core` | `aspnet-core.authentication-properties-operation-and-session-state` | `../_knowledge/aspnet-core/authentication-properties-operation-and-session-state.md` | MAPPED |
| S-010–S-011 redirect-capable handler flow and `RedirectUri` challenge example | `aspnet-core` | `aspnet-core.authentication-properties-operation-and-session-state` | `../_knowledge/aspnet-core/authentication-properties-operation-and-session-state.md` | MAPPED |
| S-012–S-021 `AllowRefresh`, persistence, issued/expiry lifetime and cookie-versus-JWT semantics | `aspnet-core` | `aspnet-core.authentication-properties-operation-and-session-state` | `../_knowledge/aspnet-core/authentication-properties-operation-and-session-state.md` | MAPPED |
| S-022 AuthenticationProperties property/token-helper model | `aspnet-core` | `aspnet-core.authentication-properties-operation-and-session-state` | `../_knowledge/aspnet-core/authentication-properties-operation-and-session-state.md` | MAPPED |
| S-023–S-030 manual authentication, cookie/bearer ticket production, scheme identity, ticket members and constructor | `aspnet-core` | `aspnet-core.authentication-ticket-principal-and-request-user` | `../_knowledge/aspnet-core/authentication-ticket-principal-and-request-user.md` | MAPPED |
| S-031–S-035 bearer challenge, no automatic refresh and explicit custom-parameter event consumption | `aspnet-core` | `aspnet-core.authentication-properties-operation-and-session-state` | `../_knowledge/aspnet-core/authentication-properties-operation-and-session-state.md` | MAPPED |
| S-036–S-041 ticket structure, `HttpContext.User`, principal/identity members, authentication type and aggregate claims | `aspnet-core` | `aspnet-core.authentication-ticket-principal-and-request-user` | `../_knowledge/aspnet-core/authentication-ticket-principal-and-request-user.md` | MAPPED |
| S-042–S-043 multiple identities and JWT ticket as a per-request framework result | `aspnet-core` | `aspnet-core.authentication-ticket-principal-and-request-user` | `../_knowledge/aspnet-core/authentication-ticket-principal-and-request-user.md` | MAPPED |
| Canvas layout, audit metadata and coverage bookkeeping | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Authentication properties are organized by state lifetime and handler semantics rather than one unit per property.
- Ticket structure, authentication-result production and the request principal stay together because they explain how a successful handler result becomes request identity.
- Cookie and bearer flows are both retained where their contrast defines the meaning of the shared framework objects; the focused existing cookie and OIDC units remain related knowledge rather than substitutes for this object model.

| Status | Count |
|---|---:|
| MAPPED | 10 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
