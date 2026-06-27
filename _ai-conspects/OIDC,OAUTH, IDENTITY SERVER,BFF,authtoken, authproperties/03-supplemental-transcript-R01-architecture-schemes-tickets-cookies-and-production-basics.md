# Supplemental screenshot transcript — R01: Architecture, schemes, tickets, cookies and production basics

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R01
image uses reviewed: 44
unique screenshots represented: 44
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

High-level OAuth 2.0/OIDC mental model: browser client, identity provider and API; authorization-code + PKCE; ID, access and refresh tokens; API validation; scopes, roles and claims; endpoint responsibilities; logout; ASP.NET Core cookie/OIDC/bearer schemes; authentication tickets and AuthenticationProperties; production signing-key and data-protection concerns.

## Key points recovered from the screenshots

- OIDC authenticates the user, OAuth authorizes API access; the authorization-code flow with PKCE is the baseline interactive flow.
- The web client keeps a local cookie session while the identity provider maintains a separate SSO session.
- AuthenticateAsync reads the local authentication ticket; ChallengeAsync starts login; SignInAsync creates the local ticket; SignOutAsync clears local state and may trigger IdP logout.
- APIs validate bearer tokens for signature, issuer, audience, expiry and authorization claims.
- Scopes describe granted API permissions; roles and user claims describe the subject and support authorization policies.
- Production requires stable signing keys, persisted Data Protection keys, HTTPS, strict issuer/audience validation and careful refresh-token handling.

## Nearby SVG labels used for orientation

- edpoint names + min flow
- what endpoint who should have
- code and tokens
- not storing access tokens in browsers cookie auth properties
- def challenge scheme how works
- what to do for prod
- how api gets key fro idp endpoint, what is automatic
- jwt api/idp asymmetric keys
- sign out
- default schemes values that are possible
- !!!
- identity model package
- auth ticket, authhandlers methods
- authenticateasync
- so authenticateasync its the auth handlers method that
- wrapper with autorefresh accessing tokens from ticket
- implementation of apicaller service
- that is has set and encrypted on signinasync call
- claimsprincipal, auth properties and scheme name
- auth it returns auth result with decrypted authticket values

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-014, IU-057, IU-058, IU-059, IU-060, IU-061, IU-062, IU-063, IU-064, IU-065, IU-088, IU-089, IU-090, IU-091, IU-092, IU-093, IU-094, IU-095, IU-096, IU-097, IU-098, IU-099, IU-108, IU-109, IU-110, IU-111, IU-112, IU-113, IU-114, IU-115, IU-121
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
