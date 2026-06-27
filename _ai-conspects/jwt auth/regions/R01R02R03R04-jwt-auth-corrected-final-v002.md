# Final corrected transcript — jwt auth v002

Authoritative source: `source/jwt auth.svg`  
Corrected source coverage: **170 unique screenshots / 171 screenshot uses + 112 canvas text labels**

The earlier transcript described the canvas text but had no screenshot evidence because the first SVG export contained zero embedded images. This corrected transcript incorporates the restored code examples, architectural notes and security guidance.

---

# R01 — React Query token cache and authenticated fetch

## Singleton QueryClient

The access token can be stored in a singleton React Query `QueryClient`, provided every reader and writer imports the same instance.

```ts
export const queryClient = new QueryClient();
export const TOKEN_KEY = ["auth", "token"] as const;
```

The same `queryClient` must be passed to `QueryClientProvider`. Accidentally constructing a second client produces two unrelated caches: the API layer may update one while the UI reads the other.

## Reading and writing outside React hooks

Hooks are unnecessary for imperative API helpers:

```ts
export function getAccessToken(): string | null {
  return queryClient.getQueryData<string | null>(TOKEN_KEY) ?? null;
}

export function setAccessToken(token: string | null) {
  queryClient.setQueryData(TOKEN_KEY, token);
}
```

This permits fetch wrappers, refresh logic, login and logout code to access the token outside React components.

Components that use `useQuery` or another subscription to the same key re-render when `setQueryData` changes the token.

## Refresh endpoint

The browser keeps the access token in memory and sends the refresh token as an HttpOnly cookie:

```ts
export async function refreshAccessToken(): Promise<string> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Refresh failed");

  const result = await response.json() as { accessToken: string };
  setAccessToken(result.accessToken);
  return result.accessToken;
}
```

JavaScript does not read the refresh token. `credentials: "include"` allows the browser to attach the cookie.

## Single-flight refresh

Several API requests may receive `401` simultaneously. A shared promise prevents every request from starting its own refresh:

```ts
let refreshPromise: Promise<string> | null = null;

function refreshOnce(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken()
      .finally(() => { refreshPromise = null; });
  }

  return refreshPromise;
}
```

Each failed request awaits the same refresh result, updates its `Authorization` header and retries once. Retrying indefinitely would hide authorization failures and could create loops.

## Authenticated fetch

```ts
export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {},
) {
  const headers = new Headers(init.headers);
  const token = getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const send = () =>
    fetch(input, { ...init, headers, credentials: "include" });

  let response = await send();
  if (response.status !== 401) return response;

  try {
    const freshToken = await refreshOnce();
    headers.set("Authorization", `Bearer ${freshToken}`);
    return await send();
  } catch {
    setAccessToken(null);
    return response;
  }
}
```

Login stores the returned access token. Logout clears it and may clear cached server data. All modules must use the same QueryClient instance.

---

# R02 — Refresh-token families, rotation, replay detection and Redis

## Database as source of truth

Refresh-token state requires durable server-side facts:

```text
user/session/device identity
token-family identity
token hash
creation and expiration
revocation status
replacement link
reuse-detection timestamp
last-used timestamp
```

A database is the durable source of truth. Redis is useful for fast checks and coordination, but a cache-only design loses revocation history and can behave dangerously after eviction, restart or failover.

A separate refresh-token/session table is usually better than one token field directly on the user row because one user may have several browsers, devices and concurrent sessions.

## Token family model

A token family groups every rotated refresh token for one session:

```text
R1 -> R2 -> R3 -> R4
```

Each row can record:

```text
FamilyId
ParentTokenId
TokenHash
ReplacedByTokenId
RevokedAtUtc
ReuseDetectedAtUtc
DeviceId / device name
CreatedAtUtc
ExpiresAtUtc
```

Store only a hash of the refresh token, not the raw token.

## Rotation transaction

Normal refresh:

```text
1. receive current refresh token;
2. hash it and locate its row;
3. verify that it is active, unexpired and not already replaced;
4. mark it consumed/revoked;
5. create a new token in the same family;
6. link old token to new token;
7. commit atomically;
8. return new access token and new refresh cookie.
```

The update must be transactional or protected by concurrency controls. Two nearly simultaneous refresh requests must not both successfully rotate the same old token.

## Reuse detection

If an old token appears after rotation, the server learns that token material was copied or replayed.

Reuse does not prove that an attacker possesses only that old token. The attacker may also have:

```text
the newest token
current cookies
browser storage
the client device
later tokens from the same family
```

Therefore the safest response is normally to revoke the whole family and require a new login.

## Why an attacker may possess only an older token

Examples include:

```text
XSS or unsafe frontend storage captured one token at one moment
reverse-proxy/APM/debug logs exposed one request
memory snapshots or malware captured stale process state
network leakage occurred during a limited interval
a copied device profile or backup contains an old cookie
```

The key security signal is not “old token invalid”; it is “a one-time rotating credential reappeared after replacement.”

## Redis responsibilities

Redis can accelerate, but not replace, durable token state.

Useful keys:

```text
refresh:family:{familyId}:revoked = true
refresh:token:{tokenHash} = active|revoked
refresh:user:{userId}:families = [...]
refresh:attempts:{ip|userId|familyId}
lock:refresh:{familyId}
```

Benefits:

```text
fast rejection of revoked families
lower database read load
shared revocation signal across app instances
rate limiting
short-lived rotation locks
```

## SETNX-style lock

A short-lived distributed lock can serialize refresh attempts:

```csharp
var acquired = await db.StringSetAsync(
    $"lock:refresh:{familyId}",
    requestId,
    expiry: TimeSpan.FromSeconds(5),
    when: When.NotExists);
```

The lock must have an expiry, and production unlock logic should verify ownership before deleting the key. The database still enforces the final atomic state transition.

Redis helps with race conditions, but correctness must not depend on a cache entry surviving forever.

---

# R03 — End-to-end ASP.NET Core + React access/refresh flow

## Recommended browser model

```text
access token:
    short-lived
    returned in JSON
    stored only in memory

refresh token:
    long-lived relative to access token
    random opaque value
    stored in Secure HttpOnly cookie
    rotated server-side
```

Main endpoints:

```text
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET/POST protected APIs with Authorization: Bearer ...
```

Cookie flags typically include:

```text
HttpOnly
Secure
SameSite=Strict or Lax for same-site applications
```

Cross-site SPA/API deployments require deliberate `SameSite=None; Secure` and credentialed CORS configuration.

## JWT bearer validation

ASP.NET Core validation should explicitly check issuer, audience, lifetime and signing key:

```csharp
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = issuer,
            ValidateAudience = true,
            ValidAudience = audience,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = signingKey,
            ClockSkew = TimeSpan.FromSeconds(30),
        };
    });
```

Authentication and authorization middleware must run before protected endpoints.

## Token issuance

`SecurityTokenDescriptor` centralizes issuer, audience, subject claims, time window and signing credentials:

```csharp
var descriptor = new SecurityTokenDescriptor
{
    Issuer = issuer,
    Audience = audience,
    Subject = new ClaimsIdentity(claims),
    NotBefore = DateTime.UtcNow,
    Expires = DateTime.UtcNow.AddMinutes(15),
    SigningCredentials = signingCredentials,
};

var handler = new JwtSecurityTokenHandler();
var accessToken = handler.CreateEncodedJwt(descriptor);
```

Login validates credentials, creates an access token, creates a random refresh token, stores only its hash/state server-side and sets the raw refresh token as a cookie.

Refresh validates and rotates the cookie token, returns a new access token and replaces the refresh cookie.

Logout revokes the session/family and deletes the cookie.

## Boot authentication

After a page reload, the in-memory access token is empty. A boot-auth query calls `/api/auth/refresh` once:

```text
valid refresh cookie -> receive access token -> store in memory -> render app
missing/invalid cookie -> render login screen
```

This lets the refresh cookie restore a session without exposing it to JavaScript.

## React Query versus auth state

React Query is primarily server-state infrastructure. It can store a token, but auth state has unusual requirements:

```text
imperative access outside components
synchronous reads for the API wrapper
clear separation from cached business data
careful handling during queryClient.clear()
```

A small independent token store can therefore be easier to reason about.

## useSyncExternalStore token store

A module-level external store exposes:

```ts
get()
set(token)
clear()
subscribe(listener)
```

`useSyncExternalStore` bridges it into React:

```ts
export function useIsAuthed() {
  return useSyncExternalStore(
    tokenStore.subscribe,
    () => Boolean(tokenStore.get()),
  );
}
```

The subscribe function must register the listener and return an unsubscribe function. When the token changes, the store calls listeners; React reads a new snapshot and re-renders only subscribed components.

This allows:

```text
Root to switch Login/App
Navbar to update login/logout controls
ProtectedRoute to redirect immediately
profile/user components to refresh auth-dependent UI
```

Without a subscription, the network layer can know the current token while the UI remains stale.

## End-to-end timeline

```text
app starts
    -> boot refresh
    -> store access token if session exists

login
    -> server sets refresh cookie
    -> client stores access token

normal API call
    -> attach Bearer access token

access token expires
    -> first 401 starts refresh
    -> concurrent 401s await same promise
    -> cookie rotates
    -> new access token stored
    -> each request retries once

logout
    -> server revokes session/family
    -> cookie deleted
    -> access token and cached protected data cleared
```

---

# R04 — JWT keys, KID, JWKS, descriptors and handlers

## JWT structure

A compact JWT has three Base64URL-encoded parts:

```text
header.payload.signature
```

The header describes cryptographic metadata such as:

```json
{
  "alg": "HS256",
  "typ": "JWT",
  "kid": "2026-01"
}
```

The payload contains claims such as issuer, subject, audience, expiration and application claims. The payload is encoded, not encrypted, unless JWE is used.

The signature protects integrity and authenticity. It does not hide the claims.

## Symmetric and asymmetric signing

Symmetric signing:

```text
HS256 / HS512
same secret signs and validates
simple and fast
every validator must possess the secret
secret distribution becomes harder across services
```

Asymmetric signing:

```text
RS256 / ES256
private key signs
public key validates
validators cannot mint tokens
well suited to multiple services and external clients
public keys can be published through JWKS
```

For HMAC, cryptographic APIs require bytes:

```csharp
var keyBytes = Encoding.UTF8.GetBytes(secret);
var key = new SymmetricSecurityKey(keyBytes);
```

Production secrets should come from configuration or a secret manager, not source code.

## KID and rotation

`kid` identifies which verification key was used. A verifier reads the untrusted header only to select a candidate key, then performs full signature and claim validation.

Safe asymmetric rotation:

```text
1. publish the new public key in JWKS;
2. continue signing with the old key briefly;
3. begin signing new tokens with the new key/kid;
4. keep the old public key through maximum token lifetime + clock skew;
5. remove the old key after the grace period.
```

For symmetric keys, `kid` can select from a local secret ring, but distributing each new secret to every validator is operationally harder.

Do not trust arbitrary algorithms or keys from the header. Restrict trusted issuers, allowed algorithms and trusted key sources.

## SecurityTokenDescriptor

`SecurityTokenDescriptor` represents:

```text
Issuer
Audience
Subject / claims
NotBefore
Expires
IssuedAt
SigningCredentials
EncryptingCredentials
AdditionalHeaderClaims
```

It is preferable to manual `JwtSecurityToken` construction when token creation becomes dynamic, when encryption/JWE is needed or when several handlers/token types share a descriptor-based flow.

Custom header fields such as `kid` may be added through `AdditionalHeaderClaims` where appropriate.

## JwtSecurityTokenHandler

Important distinctions:

```text
ReadJwtToken
    parses a compact token
    does not establish trust

ValidateToken
    validates signature, issuer, audience and lifetime
    returns ClaimsPrincipal

ValidateTokenAsync
    asynchronous validation API with structured result

CreateJwtSecurityToken / CreateToken
    creates token objects

CreateEncodedJwt
    creates the final compact string

WriteToken
    serializes a token object to compact form
```

Reading `Header`, `Payload`, `Claims`, `Issuer`, `Audiences`, `ValidFrom`, `ValidTo` or raw encoded parts does not mean the token is valid. Only successful validation under trusted `TokenValidationParameters` establishes an authenticated principal.

## Claims and validation

Validation parameters should define:

```text
trusted issuer
expected audience
trusted signing key resolver/key set
allowed algorithms
lifetime rules
clock skew
```

After validation:

```csharp
ClaimsPrincipal principal = handler.ValidateToken(
    token,
    validationParameters,
    out SecurityToken validatedToken);
```

Application authorization should rely on the validated principal, not on values obtained by parsing an untrusted token.

---

# Final corrected coverage

```text
unique embedded screenshots: 170
screenshot uses on canvas: 171
canvas text labels: 112
duplicate screenshot placements: 1

processed screenshot uses: 171
processed text labels: 112
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```

Machine-readable evidence:

```text
data/image-uses-final-v002.json
data/text-elements-final-v002.json
data/duplicate-image-uses-final-v002.json
data/final-coverage-audit-v002.json
```
