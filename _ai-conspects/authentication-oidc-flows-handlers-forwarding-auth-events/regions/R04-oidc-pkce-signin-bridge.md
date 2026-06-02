# R04 - OIDC / PKCE / external challenge / local sign-in bridge

Generated: 2026-06-02 01:53:55 UTC

## 0.1 Area overview / key ideas / reading quality

This region explains the **OpenID Connect web sign-in flow** as a bridge between an external identity provider and the app’s local authentication session. The OIDC handler performs an external challenge, redirects to the identity provider, handles the callback, validates state/nonce/correlation, exchanges authorization code with PKCE, builds a principal, and signs the user into the local cookie scheme.

Key ideas:

```text
- OIDC web login usually starts as a Challenge, not Authenticate.
- The browser is redirected to the identity provider with client_id, redirect_uri, response_type, scope, state, nonce, and PKCE parameters.
- Callback handling validates state/correlation/nonce before trusting the response.
- Authorization code flow exchanges code for tokens.
- The app usually creates a local session by signing into the cookie scheme after successful OIDC validation.
- OIDC is external login + local cookie bridge, not just bearer token validation.
```

Reading quality:

```text
Good for flow, main parameters, callback logic, and the relationship between OIDC and cookie sign-in. Some screenshots are dense protocol/code examples, so the transcript focuses on verified semantic flow and named concepts.
```

## 0.2 Coverage / boundary review

Included in R04 v001:

```text
S-077, S-078, S-079, S-080, S-081, S-082, S-083, S-084, S-085, S-086, S-087, S-091, S-311, S-312, S-313, S-314, S-315,
S-316, S-317, S-318, S-319, S-320, S-321, S-322, S-323, S-324, S-325
```

Boundary decision:

```text
S-077-S087/S-091 were checked during R01 as not base-auth ownership and are now processed here as OIDC sign-in/sign-out/challenge bridge material.
R04 owns OIDC/PKCE flow and external-to-local sign-in bridge.
R03B owns JWT challenge/forbid outcome tail.
```

## 1. Why OIDC appears after sign-in/sign-out basics

Earlier R01 explained that handlers can implement sign-in/sign-out/challenge operations. OIDC uses those operation concepts but in a different way:

```text
Challenge -> redirect browser to external identity provider.
Callback -> validate external response.
SignIn -> create local app session, commonly cookie auth.
```

So OIDC depends on the base auth operation model but is a separate flow.

## 2. Challenge starts external login

The OIDC handler challenge builds an authorization request.

Common fields:

```text
client_id
redirect_uri
response_type=code
scope
state
nonce
code_challenge
code_challenge_method
```

The browser leaves the app, goes to the identity provider, and returns later to the callback URL.

## 3. PKCE and confidential/public client concern

The notes distinguish the authorization code flow and PKCE concerns. PKCE adds a code verifier/challenge pair so the callback code exchange can prove it belongs to the original client flow.

Mental model:

```text
initial challenge stores verifier/correlation state
authorization request sends code_challenge
callback receives code
back-channel token request sends code_verifier
```

## 4. Callback and state validation

The callback is not trusted just because it contains a code. The handler must validate state/correlation/nonce and handle errors.

Important checks:

```text
state/correlation cookie
nonce
error/error_description from provider
authorization code presence
redirect URI / callback route
```

If validation fails, the OIDC flow becomes an authentication failure.

## 5. Code exchange and token validation

After a valid callback, the handler exchanges the authorization code for tokens over the back channel.

Then it validates ID token/user info according to configured options and creates a principal.

## 6. Local sign-in bridge

The final app session is usually not the OIDC remote handler itself. The handler signs in to the configured sign-in scheme, often cookies:

```text
external provider success -> ClaimsPrincipal -> SignInAsync(cookie scheme) -> local auth cookie
```

This is the important bridge between external identity and local session.

## 7. OIDC failure/challenge outcomes

The OIDC flow has its own failure points:

```text
provider error on callback
missing/invalid state
correlation failed
nonce failed
code exchange failed
token validation failed
remote failure event
```

Successful OIDC login ends with a local principal/session. Failed OIDC login usually returns to failure handling rather than creating a session.
