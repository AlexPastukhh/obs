# Supplemental screenshot transcript — R02: Authorization code, PKCE, MVC/API integration, refresh and server-side token storage

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R02
image uses reviewed: 91
unique screenshots represented: 91
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

End-to-end authorization-code + PKCE sequence and a concrete ASP.NET Core solution with IdentityServer, MVC client and API. Includes authentication schemes/handlers, token validation, SaveTokens behavior, refresh-token services, retry-once after 401, server-side/distributed token stores, logout cleanup and signing-key validation.

## Key points recovered from the screenshots

- The browser is redirected to /authorize; the client receives a code and redeems it at /token using the PKCE verifier and, for confidential clients, client authentication.
- The MVC client typically uses Cookies as the default scheme and OpenIdConnect as the challenge scheme; the API uses JwtBearer.
- SaveTokens stores tokens in AuthenticationProperties and therefore in the protected cookie ticket; disabling it keeps cookies small and enables a server-side token-store design.
- A production API caller fetches the access token, refreshes slightly before expiry, retries once after a 401, and challenges the user when refresh is impossible.
- Refresh-token rotation requires atomically replacing the old token and clearing server-side tokens on logout or revocation.
- Asymmetric signing keys and discovery/JWKS are the normal production model; issuer, audience, lifetime and signature validation remain strict.

## Nearby SVG labels used for orientation

- sending hashed with secret and then sending secret to
- get tokens
- needed for idp to prove that its you who initialized the flow
- jwt api/idp asymmetric keys
- iprofser
- sign out
- !!!
- code and tokens
- default schemes values that are possible
- not storing access tokens in browsers cookie auth properties
- def challenge scheme how works
- edpoint names + min flow
- should we use refresh tokens in spa
- token rotation
- JUST GOT WITH REFRESH
- IS VALID OR THAT WE
- THE ACCESS TOKEN THAT
- wrapper with autorefresh accessing tokens from ticket
- implementation of apicaller service
- identity model package

## Covered screenshot uses

```text
IU-015, IU-016, IU-017, IU-018, IU-019, IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032, IU-033, IU-034, IU-035, IU-036, IU-037, IU-038, IU-039, IU-040, IU-041, IU-042, IU-043, IU-044, IU-045, IU-046, IU-047, IU-048, IU-049, IU-050, IU-051, IU-052, IU-053, IU-054, IU-055, IU-056, IU-066, IU-067, IU-068, IU-069, IU-070, IU-071, IU-072, IU-073, IU-074, IU-075, IU-076, IU-077, IU-078, IU-079, IU-080, IU-081, IU-082, IU-083, IU-084, IU-085, IU-086, IU-087, IU-100, IU-101, IU-102, IU-103, IU-104, IU-105, IU-106, IU-107, IU-116, IU-117, IU-118, IU-119, IU-120, IU-215, IU-216, IU-217, IU-218, IU-219, IU-220, IU-221, IU-222, IU-223, IU-224, IU-225, IU-226, IU-227, IU-228
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
