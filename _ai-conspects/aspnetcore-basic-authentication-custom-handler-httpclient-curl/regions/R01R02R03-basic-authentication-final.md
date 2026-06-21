# ASP.NET Core Basic authentication / custom handler / HttpClient / curl — R01/R02/R03 final transcript v001

Generated: 2026-06-22 00:00:00 UTC

## Direction check

Goal: convert the source SVG and screenshots into source-preserving AI-readable text without losing image or canvas-label coverage.

This pass closes all 24 image uses and 6 grouped text blocks.

## 0.1 Area overview / reading quality

Covers HTTP Basic authentication from wire format through client examples and an ASP.NET Core custom authentication handler, including scheme registration, credential validation, claims creation, challenge behavior and automatic versus manual client headers.

Key ideas:

- Never use Basic authentication without HTTPS because credentials are replayable and trivially recoverable from Base64.

- Parse the credential payload carefully: decode, split only at the intended separator and reject malformed input.

- Validate credentials through a dedicated service/store rather than hard-coding them inside the handler.

- Create only the claims required by the application and avoid logging raw Authorization headers or passwords.

- Return a standards-compatible 401 challenge for missing/invalid authentication; authorization failures after authentication are a separate 403 concern.

- Credential caching/preauthentication behavior is client-specific; manual headers are explicit while handler-based credentials may manage challenge/retry behavior.


Reading quality: High readability for theory and handler flow. Exact code punctuation is retained in source PNGs; transcript focuses on reliable semantics and API relationships.

## Verified semantic transcript

### R01 — Basic authentication theory and clients

Basic authentication sends an Authorization header containing the Basic scheme and Base64-encoded username:password credentials. Base64 is encoding, not encryption; TLS is mandatory. It is useful for scripts, internal tools, simple machine clients and controlled integrations, but generally weaker than token-based or federated approaches for modern public applications.

Coverage: 8 image uses, 5 grouped text blocks. Sources: S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008.

### R02 — ASP.NET Core custom handler and challenge

A custom AuthenticationHandler reads Authorization, checks the Basic scheme, decodes credentials, validates them, creates claims and a ClaimsPrincipal, then returns AuthenticateResult.Success. Missing credentials can return NoResult; malformed or invalid credentials return Fail. Challenge behavior returns 401 and should include WWW-Authenticate: Basic with an optional realm.

Coverage: 10 image uses, 0 grouped text blocks. Sources: S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018.

### R03 — Automatic vs manual HttpClient usage and protected endpoints

Clients can set Authorization manually with AuthenticationHeaderValue("Basic", base64) or use handler credential support where appropriate. Curl and PowerShell provide convenience switches. Protected endpoints use authentication scheme registration plus authorization metadata such as RequireAuthorization or Authorize attributes.

Coverage: 6 image uses, 1 grouped text blocks. Sources: S-019, S-020, S-021, S-022, S-023, S-024.

## Operational and security conclusions

- Never use Basic authentication without HTTPS because credentials are replayable and trivially recoverable from Base64.

- Parse the credential payload carefully: decode, split only at the intended separator and reject malformed input.

- Validate credentials through a dedicated service/store rather than hard-coding them inside the handler.

- Create only the claims required by the application and avoid logging raw Authorization headers or passwords.

- Return a standards-compatible 401 challenge for missing/invalid authentication; authorization failures after authentication are a separate 403 concern.

- Credential caching/preauthentication behavior is client-specific; manual headers are explicit while handler-based credentials may manage challenge/retry behavior.

## Evidence map

- `data/R01R02R03-sources-stage1-v001.*` — every screenshot placement.

- `data/R01R02R03-text-labels-stage1-v001.*` — every grouped canvas-text block.

- `audit-assets/R01R02R03-source-images/` — source images renamed by source id.

- `data/final-coverage-audit-stage1-v001.*` — zero-remaining coverage audit.

## Final status

```text
total image uses: 24
total grouped text blocks: 6
remaining unclosed image uses: 0
remaining unclosed text blocks: 0
```
