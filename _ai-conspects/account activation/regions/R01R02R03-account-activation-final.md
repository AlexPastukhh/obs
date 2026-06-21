# ASP.NET Core account activation / email confirmation / Data Protection / Identity — R01/R02/R03 final transcript v001

Generated: 2026-06-22 00:00:00 UTC

## Direction check

Goal: convert the source SVG and screenshots into source-preserving AI-readable text without losing image or canvas-label coverage.

This pass closes all 22 image uses and 9 grouped text blocks.

## 0.1 Area overview / reading quality

Describes secure account activation by email using either ASP.NET Core Identity email-confirmation tokens or a custom Data Protection token, including URL-safe transport, expiration, validation, activation endpoints, React query reading and operational safeguards.

Key ideas:

- Store the account before sending the link and keep it inactive until successful validation.

- Use a stable purpose string and stable Data Protection key ring across deployments/instances so valid links remain decryptable.

- URL-safe encode Identity/Data Protection tokens before putting them in query strings.

- Activation should be idempotent: an already-confirmed account should not be corrupted by repeated clicks.

- Do not log raw tokens; if server-side token storage is required, store a hash rather than plaintext.

- Apply HTTPS, resend throttling, rate limiting, generic responses to reduce enumeration, and short practical expiration windows.

- Identity built-in confirmation is usually the recommended implementation; custom Data Protection is appropriate when Identity is not used or token semantics are custom.


Reading quality: High readability. Built-in Identity and custom Data Protection flows were both clear. One screenshot is deliberately repeated on canvas; both placements are closed while the semantic content is transcribed once.

## Verified semantic transcript

### R01 — Activation overview, security requirements and link formats

A user is created in an inactive/unconfirmed state, an activation token is generated, a link is emailed and the confirmation endpoint validates the token before enabling the account. Tokens must be tamper-proof, time-limited, bound to the intended user/purpose and handled idempotently. Links may carry userId/token query parameters or a single opaque token; frontends such as React read query parameters and call the backend confirmation endpoint.

Coverage: 5 image uses, 2 grouped text blocks. Sources: S-001, S-002, S-003, S-004, S-005.

### R02 — Custom Data Protection token flow

A custom flow creates a purpose-specific IDataProtector or TimeLimitedDataProtector, protects a payload containing the user identifier and activation context, Base64Url-encodes it and sends it in the activation link. The endpoint decodes/unprotects it, rejects tampering/expiry, loads the user and marks the account confirmed. TimeLimitedDataProtector is preferred over manually embedding/parsing expiry when available.

Coverage: 9 image uses, 3 grouped text blocks. Sources: S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014.

### R03 — ASP.NET Core Identity registration and email confirmation

Identity is configured with AddDefaultTokenProviders and optionally RequireConfirmedEmail. Registration stores the user, generates GenerateEmailConfirmationTokenAsync, Base64Url-encodes the token for transport and emails the confirmation URL. The confirmation endpoint finds the user, decodes the token and calls ConfirmEmailAsync. DataProtectionTokenProviderOptions controls token lifetime.

Coverage: 8 image uses, 4 grouped text blocks. Sources: S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022.

## Operational and security conclusions

- Store the account before sending the link and keep it inactive until successful validation.

- Use a stable purpose string and stable Data Protection key ring across deployments/instances so valid links remain decryptable.

- URL-safe encode Identity/Data Protection tokens before putting them in query strings.

- Activation should be idempotent: an already-confirmed account should not be corrupted by repeated clicks.

- Do not log raw tokens; if server-side token storage is required, store a hash rather than plaintext.

- Apply HTTPS, resend throttling, rate limiting, generic responses to reduce enumeration, and short practical expiration windows.

- Identity built-in confirmation is usually the recommended implementation; custom Data Protection is appropriate when Identity is not used or token semantics are custom.

## Evidence map

- `data/R01R02R03-sources-stage1-v001.*` — every screenshot placement.

- `data/R01R02R03-text-labels-stage1-v001.*` — every grouped canvas-text block.

- `audit-assets/R01R02R03-source-images/` — source images renamed by source id.

- `data/final-coverage-audit-stage1-v001.*` — zero-remaining coverage audit.

## Final status

```text
total image uses: 22
total grouped text blocks: 9
remaining unclosed image uses: 0
remaining unclosed text blocks: 0
```
