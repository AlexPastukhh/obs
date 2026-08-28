# Knowledge Registry

Source workspace: `_ai-conspects/jwt auth/`

Authoritative processed source: `01-final-transcript.md` (identical regional copy: `regions/R01R02R03R04-jwt-auth-corrected-final-v002.md`)

Original SVG: `source/jwt auth.svg`

Evidence and coverage: `data/final-coverage-audit-v002.json`; 171 of 171 screenshot uses and 112 of 112 native SVG labels are closed, including the one duplicate screenshot placement.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 singleton `QueryClient`/token key, same-provider instance, imperative cache reads/writes and observer-driven UI updates | `react-query.cache-observers-and-auth-refresh` | `react-query` | `../_knowledge/react-query/cache-observers-and-auth-refresh.md` | MERGED |
| R01 HttpOnly-cookie refresh call, shared in-flight promise, authenticated fetch, fresh-header replacement, one retry and logout cleanup | `react-query.cache-observers-and-auth-refresh` | `react-query` | `../_knowledge/react-query/cache-observers-and-auth-refresh.md` | MERGED |
| R02 durable refresh-session facts, separate table, hashed token and parent/replacement family model | `security.refresh-token-family-rotation-and-reuse-detection` | `security` | `../_knowledge/security/refresh-token-family-rotation-and-reuse-detection.md` | MAPPED |
| R02 transactional one-time rotation, concurrency protection and atomic old-to-new state transition | `security.refresh-token-family-rotation-and-reuse-detection` | `security` | `../_knowledge/security/refresh-token-family-rotation-and-reuse-detection.md` | MAPPED |
| R02 replaced-token reuse signal, stale-token capture paths, attacker-possession uncertainty and whole-family revocation response | `security.refresh-token-family-rotation-and-reuse-detection` | `security` | `../_knowledge/security/refresh-token-family-rotation-and-reuse-detection.md` | MAPPED |
| R02 Redis revocation/status/attempt/lock responsibilities with database authority surviving cache loss | `security.refresh-token-family-rotation-and-reuse-detection` | `security` | `../_knowledge/security/refresh-token-family-rotation-and-reuse-detection.md` | MAPPED |
| R02 `SET NX`-style expiring lock, owner-checked release and best-effort coordination boundary | `redis.cache-stampede-and-token-owned-locks` | `redis` | `../_knowledge/redis/cache-stampede-and-token-owned-locks.md` | MERGED |
| R03 in-memory short-lived access token, opaque Secure HttpOnly rotating refresh cookie and endpoint/cross-site configuration model | `security.browser-access-and-refresh-token-lifecycle` | `security` | `../_knowledge/security/browser-access-and-refresh-token-lifecycle.md` | MAPPED |
| R03 issuer/audience/lifetime/signing-key bearer validation and explicit `TokenValidationParameters` example | `dotnet.jwt-descriptors-handlers-and-validation` | `dotnet` | `../_knowledge/dotnet/jwt-descriptors-handlers-and-validation.md` | MAPPED |
| R03 descriptor-based access-token issuance, refresh-token hash storage, rotation and logout revocation | `dotnet.jwt-descriptors-handlers-and-validation`; `security.browser-access-and-refresh-token-lifecycle` | `dotnet`; `security` | `../_knowledge/dotnet/jwt-descriptors-handlers-and-validation.md`; `../_knowledge/security/browser-access-and-refresh-token-lifecycle.md` | MAPPED |
| R03 boot refresh after page reload and the complete app-start/login/API-expiry/single-flight/logout timeline | `security.browser-access-and-refresh-token-lifecycle` | `security` | `../_knowledge/security/browser-access-and-refresh-token-lifecycle.md` | MAPPED |
| R03 React Query server-state tradeoff versus a dedicated token store bridged by `useSyncExternalStore` | `react.use-sync-external-store-contract` | `react` | `../_knowledge/react/use-sync-external-store-contract.md` | MERGED |
| R03 short-lived memory state versus protected-cookie renewal storage boundary | `javascript.browser-storage-lifetimes-and-security` | `javascript` | `../_knowledge/javascript/browser-storage-lifetimes-and-security.md` | MERGED |
| R03 refresh-cookie `HttpOnly`/`Secure`/`SameSite` and credentialed cross-site delivery axes | `http.browser-cookie-delivery-and-security` | `http` | `../_knowledge/http/browser-cookie-delivery-and-security.md` | MERGED |
| R04 JWT encoded structure, signature-versus-confidentiality boundary and symmetric/asymmetric signing tradeoffs | `security.jwt-signing-keys-kid-and-jwks-rotation` | `security` | `../_knowledge/security/jwt-signing-keys-kid-and-jwks-rotation.md` | MAPPED |
| R04 untrusted `kid` candidate selection, trusted algorithms/key sources and old/new JWKS overlap through token lifetime plus skew | `security.jwt-signing-keys-kid-and-jwks-rotation` | `security` | `../_knowledge/security/jwt-signing-keys-kid-and-jwks-rotation.md` | MAPPED |
| R03-R04 high-level issuer/audience/signature/lifetime validation and planned signing/JWKS deployment | `security.token-validation-signing-and-identity-deployment` | `security` | `../_knowledge/security/token-validation-signing-and-identity-deployment.md` | MERGED |
| R04 `SecurityTokenDescriptor` fields, dynamic creation/encryption/header uses and representative issuance | `dotnet.jwt-descriptors-handlers-and-validation` | `dotnet` | `../_knowledge/dotnet/jwt-descriptors-handlers-and-validation.md` | MAPPED |
| R04 `JwtSecurityTokenHandler` parse/validate/create/encode/write contracts and validated-principal authorization boundary | `dotnet.jwt-descriptors-handlers-and-validation` | `dotnet` | `../_knowledge/dotnet/jwt-descriptors-handlers-and-validation.md` | MAPPED |
| Screenshot recovery history, corrected coverage totals, duplicate placement and processing evidence | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- The already-complete React Query cache/refresh implementation is merged rather than duplicated; boot auth and the credential lifecycle form a security unit.
- Durable rotation/replay correctness is separated from browser token placement because it remains a server-side session-security model.
- Generic Redis lock ownership remains in the existing Redis unit while token-family state and database authority stay in the refresh-security unit.
- JWT cryptographic key/KID/JWKS rotation is separated from .NET descriptor and handler APIs.
- The concrete token-store application merges into the existing general `useSyncExternalStore` contract.

| Status | Count |
|---|---:|
| MAPPED | 12 |
| MERGED | 7 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
