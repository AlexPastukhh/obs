# Full combined final transcript — OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties

Generated: 2026-06-27 01:00:00 UTC

## Source basis and coverage

This transcript integrates the complete recovered source:

```text
meaningful SVG text elements: 227 / 227
unique embedded screenshots: 263 / 263
screenshot uses on canvas: 269 / 269
duplicate screenshot placements retained: 6
remaining text elements: 0
remaining screenshot uses: 0
```

The old `01-final-transcript.md` is a legacy text-only summary and is not the
authoritative final transcript.

## 1. OAuth 2.0 and OpenID Connect responsibilities

OAuth 2.0 delegates access to protected resources. OpenID Connect adds an
authentication layer, allowing a client to learn who the user is and to create
a local authenticated session.

The main actors are:

- the user and user agent;
- the client application;
- the authorization server / identity provider;
- the protected API or resource server.

The ID token describes the authentication event and the user identity for the
client. The access token is presented to an API. A refresh token allows an
authorized client to obtain a new access token without repeating interactive
login, subject to lifetime, rotation and revocation rules.

## 2. Authorization-code flow with PKCE

The interactive client redirects the browser to the authorization endpoint
with a redirect URI, requested scopes, state, nonce and PKCE code challenge.
The identity provider authenticates the user, obtains consent where necessary
and returns a short-lived authorization code.

The client sends the code to the token endpoint together with the original
PKCE verifier. A confidential client also authenticates itself using its
configured client credential. The token endpoint validates the redirect URI,
code, verifier, client and grant, then returns the appropriate tokens.

PKCE binds the authorization request to code redemption and mitigates
authorization-code interception. It does not replace client authentication for
confidential clients and does not by itself protect tokens from browser XSS.

## 3. Public clients, confidential clients and BFF

Public clients such as browser or mobile applications cannot reliably protect
a static secret distributed with their code. They use authorization code with
PKCE without pretending that a bundled secret is confidential.

Server-side MVC applications and Backend-for-Frontend services are confidential
clients because server credentials and refresh tokens can remain on the server.
A BFF gives the browser a protected, HTTP-only, secure same-origin cookie while
the server stores and uses OAuth tokens. This reduces token exposure in browser
storage and centralizes refresh, revocation and API calling.

## 4. ASP.NET Core authentication schemes and handlers

A typical web client uses the cookie handler for its local session and the
OpenID Connect handler for challenges and remote sign-in/sign-out. An API uses
the JWT bearer handler.

Important operations:

- `AuthenticateAsync` asks a handler to read and validate the current local
  authentication state.
- `ChallengeAsync` starts the configured authentication challenge, often an
  OIDC redirect.
- `SignInAsync` creates the protected local authentication ticket.
- `SignOutAsync` removes the local ticket and may initiate identity-provider
  logout.

An authentication ticket contains the principal, authentication properties and
scheme. Cookie middleware protects this ticket with ASP.NET Core Data
Protection. Production systems must persist and protect Data Protection keys
so deployments and restarts do not invalidate every session unexpectedly.

## 5. Cookie and token storage choices

`SaveTokens` can place tokens into `AuthenticationProperties`, which means they
become part of the protected cookie ticket. This is convenient but increases
cookie size and sends the protected token material with requests.

A stronger BFF/server design stores tokens in a server-side store keyed by a
session identifier. The browser cookie then carries only the protected session
reference. A distributed store such as Redis supports multiple application
instances, but token updates must be atomic and expiration must track the
authentication session.

Logout should remove both the local cookie and the corresponding server-side
token record.

## 6. Calling APIs and refreshing tokens

An API-caller abstraction obtains the current access token, checks whether it
is close to expiration and refreshes it when appropriate. Refresh should be
serialized per session to avoid concurrent use of a single-use refresh token.

With refresh-token rotation, each successful refresh invalidates the previous
refresh token and returns a replacement. The store must atomically replace the
old token set. Invalid, revoked or expired refresh tokens require clearing the
local server-side token state and starting a new authentication challenge.

An API call may retry once after a 401 when a refresh is possible. Infinite
retry loops must be avoided.

## 7. IdentityServer resources, scopes and claims

Identity resources define identity information that a client may request, such
as standard OpenID/profile data or custom identity scopes. API scopes describe
permissions granted for protected APIs. API resources model the protected API
and the user claims that may be included for it.

These concepts answer different questions:

- identity resources: what identity data may the client receive;
- API scopes: what API permission was granted;
- API resource user claims: what subject information may be emitted for the API.

The client must be allowed to request a scope, and the relevant resource must be
configured to emit the required claims.

## 8. Profile service and UserInfo

A custom `IProfileService` is the central place for selecting and issuing user
claims based on requested claim types, client, subject and authorization
context. Registering a custom scope alone does not guarantee that every desired
claim appears automatically.

Claims may be placed in the ID token, access token or returned by the UserInfo
endpoint depending on configuration. Keeping the ID token compact and
retrieving additional permitted profile claims through UserInfo can be useful.

## 9. Client registrations and grant types

A client registration controls redirect URIs, post-logout redirect URIs,
allowed grant types, PKCE requirements, client-secret requirements, allowed
scopes, consent behavior and token lifetimes.

Typical patterns:

- browser/mobile public client: authorization code + PKCE, no client secret;
- server MVC/BFF client: authorization code + PKCE plus client authentication;
- background service: client credentials, representing the service rather than
  an interactive user.

Client credentials are not a user-login flow. Grant types and allowed scopes
should be restricted to the minimum needed by each client.

## 10. Token validation and claim mapping

An API validates token signature, issuer, audience, lifetime and authorization
requirements. Discovery metadata and JWKS allow APIs to obtain the identity
provider's current public signing keys.

Name and role claim mapping must be configured deliberately. Automatic inbound
claim transformations can rename claims and cause authorization policies to
look at the wrong claim type. Scope, role and custom-claim policies should be
tested using tokens produced by the real authority.

## 11. Production signing keys and deployment

Developer signing credentials are not a production strategy. Production
requires stable, protected signing keys or certificates, planned rotation and
correct publication through discovery/JWKS.

Reverse proxies must forward scheme and host information correctly so the
identity provider produces valid issuer values, redirect URIs and HTTPS links.
Public origin and issuer configuration must match the externally visible
deployment.

Client, resource, persisted-grant and operational data commonly move from
in-memory configuration to durable stores. HTTPS, secure cookies, strict
redirect URI matching and secret rotation are baseline requirements.

## 12. OIDC event pipeline

The OpenID Connect handler exposes events for observing and customizing the
protocol lifecycle:

- redirect to the identity provider;
- redirect for sign-out;
- inbound message receipt;
- authorization-code receipt;
- token-endpoint response;
- token validation;
- UserInfo response;
- final ticket creation;
- remote failures.

The authorization-code event can take over code redemption. Token-validation
and ticket events can normalize or add claims and reject sign-in. Remote-failure
handling should distinguish provider errors, correlation/state failures, token
endpoint failures and token validation failures without leaking secrets.

## 13. Step-up scopes and consent

A client should request only baseline scopes during normal login. When a
sensitive operation needs an additional permission, the application can inspect
the currently granted scopes and initiate a new challenge requesting the extra
scope and consent.

This minimizes standing privilege. The resulting access token and API policy
must both reflect the added permission.

## 14. Practical implementation model

A production-oriented design from this conspect is:

1. Use authorization code with PKCE.
2. Prefer a confidential MVC/BFF boundary for browser applications that call
   sensitive APIs.
3. Keep the local browser session in a secure cookie.
4. Keep OAuth tokens in a server-side store when cookie size and exposure
   matter.
5. Refresh shortly before expiry, serialize refresh per session and persist the
   rotated refresh token atomically.
6. Validate tokens strictly in APIs.
7. Model identity resources, API scopes and API claims separately.
8. Emit claims through an explicit profile-service policy.
9. Persist signing, Data Protection and operational keys/stores.
10. Treat logout, revocation and refresh failure as token-store cleanup events.

## Regional source map

### R01 — Architecture, schemes, tickets, cookies and production basics

OAuth 2.0 and OpenID Connect roles, authorization-code with PKCE, ID/access/refresh tokens, API validation, ASP.NET Core authentication schemes, authentication tickets, cookies, logout and production key handling.

Coverage: `44` screenshot uses, `44` unique screenshots, `0` duplicate placements, `0` remaining.

### R02 — Authorization code, PKCE, MVC/API integration, refresh and server-side token storage

The complete browser-to-IdP authorization-code flow, MVC client and API configuration, token redemption, SaveTokens trade-offs, refresh services, retry-after-401 and distributed server-side token storage.

Coverage: `91` screenshot uses, `91` unique screenshots, `0` duplicate placements, `0` remaining.

### R03 — Identity resources, profile service, UserInfo, claims and refresh rotation

Identity resources and custom identity scopes, IProfileService, claim emission into ID/access tokens, UserInfo, API user claims and single-use refresh-token rotation.

Coverage: `39` screenshot uses, `34` unique screenshots, `5` duplicate placements, `0` remaining.

### R04 — IdentityServer resources, clients, lifetimes, production configuration and OIDC options

IdentityServer resources and clients, token lifetimes, offline access, persistent stores, production signing certificates, reverse-proxy settings, OIDC options and event hooks.

Coverage: `34` screenshot uses, `34` unique screenshots, `0` duplicate placements, `0` remaining.

### R05 — Client types, grant types, secrets and claim mapping

Public and confidential clients, AllowedGrantTypes, client secrets, client-credentials flow and explicit JWT name/role claim mapping.

Coverage: `13` screenshot uses, `13` unique screenshots, `1` duplicate placements, `0` remaining.

### R06 — BFF, public/confidential clients and the SPA threat model

Why browser code cannot protect a client secret and how a Backend-for-Frontend keeps access and refresh tokens on the server behind a same-origin cookie session.

Coverage: `3` screenshot uses, `3` unique screenshots, `0` duplicate placements, `0` remaining.

### R07 — API resource UserClaims, scopes, PKCE and client validation

The distinction between identity resources, API scopes and API-resource UserClaims, plus PKCE mechanics, client scope validation and API policies.

Coverage: `17` screenshot uses, `17` unique screenshots, `0` duplicate placements, `0` remaining.

### R08 — Confidential-client PKCE, client secrets and step-up scopes

Using PKCE and client authentication together, code redemption by a confidential client and requesting extra scopes only when a privileged operation needs them.

Coverage: `12` screenshot uses, `12` unique screenshots, `0` duplicate placements, `0` remaining.

### R09 — OIDC events and handler contexts

ASP.NET Core OpenID Connect event order and context data for redirects, message receipt, authorization-code receipt, token response, token validation, UserInfo, ticket creation and remote failures.

Coverage: `16` screenshot uses, `16` unique screenshots, `0` duplicate placements, `0` remaining.

## Exactness note

This transcript provides the integrated semantic model. Exact code punctuation,
configuration values and version-sensitive API spellings remain governed by
the complete recovered SVG and the extracted screenshots under `source/`.
