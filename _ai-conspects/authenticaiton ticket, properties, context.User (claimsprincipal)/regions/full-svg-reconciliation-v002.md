# authenticaiton ticket, properties, context.User (claimsprincipal) — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

## Source policy

Screenshots are the primary source. Candidate regions, nearest labels, and vector paths were used only as navigation hints. Every embedded screenshot was visually reviewed before region assignment.

## R01 — HttpContext.User, ClaimsPrincipal, ClaimsIdentity, claims, and multiple identities

HttpContext.User is the request's ClaimsPrincipal. A principal is a container that may hold several ClaimsIdentity instances, for example cookie and bearer identities. The selected identity exposes IsAuthenticated, authentication type, name and role claim types; claims should be read from the principal when authorization may combine identities.

**Reviewed image uses:** S-001, S-004, S-006, S-008, S-009, S-012, S-015

**Assigned SVG text nodes:** T-001, T-003, T-006, T-007, T-009, T-012, T-015

## R02 — AuthenticationTicket structure, scheme, principal, and authentication flow

AuthenticationTicket packages a ClaimsPrincipal, AuthenticationProperties, and the authentication scheme. Cookie authentication serializes the ticket into the protected cookie and later reconstructs it. JWT bearer validates the incoming token and creates an in-memory ticket/result for the current request; the client must send the bearer token again on the next request.

**Reviewed image uses:** S-002, S-003, S-005, S-007, S-013, S-017, S-019, S-020

**Assigned SVG text nodes:** T-002, T-004, T-005, T-008, T-013, T-016

## R03 — AuthenticationProperties lifetime, persistence, and refresh semantics

AuthenticationProperties carries state for an authentication operation or session. IssuedUtc and ExpiresUtc define timing; IsPersistent mainly controls cookie persistence; AllowRefresh matters to handlers that implement renewal or sliding expiration. These properties can exist in a bearer result, but most cookie-oriented lifetime flags do not automatically refresh or persist a JWT.

**Reviewed image uses:** S-010, S-011, S-014, S-016, S-018, S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028

**Assigned SVG text nodes:** T-010, T-011, T-014, T-017, T-018, T-019, T-020, T-021

## R04 — RedirectUri, Items, Parameters, and handler-specific behavior

RedirectUri is meaningful to redirect-based challenge/sign-in handlers such as cookies or OIDC, while a normal JWT bearer challenge returns an HTTP authentication response rather than a redirect. Items is persistent string state that can travel with a ticket. Parameters is transient handler input and has an effect only when the selected handler or event code reads the supplied key.

**Reviewed image uses:** S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038

**Assigned SVG text nodes:** T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029

## R05 — Token storage helpers and JWT SaveToken behavior

AuthenticationProperties can store AuthenticationToken values through StoreTokens and GetTokenValue. In JWT bearer, SaveToken=true copies the validated access token into the result properties; without it, validation succeeds but the token is not retained there. Cookie handlers can persist stored tokens as part of the protected ticket, with the expected size and security tradeoffs.

**Reviewed image uses:** S-039, S-040, S-041, S-042, S-043

**Assigned SVG text nodes:** T-030, T-031


## Closure

```text
embedded assets: 43
total image uses: 43
processed image uses: 43
restored image uses: 43
duplicate placements: 0
SVG text nodes: 31
processed SVG text nodes: 31
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
