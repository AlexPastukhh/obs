# Knowledge Registry - Google reCAPTCHA v2/v3

Workspace: `_ai-conspects/google recapcha and recapchas/`

## Authoritative source

- Exact source: `source/source-complete-v002.svg`
- SHA-256: `f4af1c80d7062ab5bb20be22d3d6e101a0dd251dccd582861228889fd724cceb`
- Git blob: `3d1eda7d38fc449576a26536c0c1107e16dd9515`
- Authoritative processed sources: `02-source-verification-and-quality-correction-v003.md`, `03-source-preserving-transcript-v003.md`, `04-repetition-guide-v003.md`, `regions/full-svg-reconciliation-v002.md`, `regions-v003/`, and the v003 placement ledgers, as designated by `CURRENT_SOURCE_OF_TRUTH.md`

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| reCAPTCHA purpose, layered-abuse-control boundary, public site key versus private secret, untrusted short-lived token, and mandatory server verification flow | `security.recaptcha-server-verification-and-risk-policy` | `security` | `../_knowledge/security/recaptcha-server-verification-and-risk-policy.md` | MAPPED |
| ASP.NET Core verifier abstraction, typed HttpClient, form-encoded `siteverify` request, configuration failure, response DTO fields, and error-code JSON mapping | `security.recaptcha-server-verification-and-risk-policy` | `security` | `../_knowledge/security/recaptcha-server-verification-and-risk-policy.md` | MAPPED |
| v2 Razor/controller integration: `g-recaptcha-response`, server verification before registration, optional IP, generic ModelState failure, widget reset, and restored site key | `security.recaptcha-server-verification-and-risk-policy` | `security` | `../_knowledge/security/recaptcha-server-verification-and-risk-policy.md` | MAPPED |
| v3 Razor/controller integration: just-in-time execute, hidden token, stable expected action, structured result, endpoint score threshold, fresh retry, and anti-forgery coexistence | `security.recaptcha-server-verification-and-risk-policy` | `security` | `../_knowledge/security/recaptcha-server-verification-and-risk-policy.md` | MAPPED |
| Hostname/age/action/score hardening, exact allowlist semantics, risk bands, generic sensitive-form errors, secret storage, and site-key-only configuration endpoint | `security.recaptcha-server-verification-and-risk-policy` | `security` | `../_knowledge/security/recaptcha-server-verification-and-risk-policy.md` | MAPPED |
| React v2 wrapper and manual explicit-render flows: refs, widget IDs, getResponse/getValue, reset after failure, one-time script loading, and React DOM ownership | `react.recaptcha-v2-v3-widget-and-token-lifecycle` | `react` | `../_knowledge/react/recaptcha-v2-v3-widget-and-token-lifecycle.md` | MAPPED |
| React v3 custom hook and provider flows: readiness, one script, `execute`/`executeRecaptcha`, stable action, just-in-time token, guarded submit, and backend payload | `react.recaptcha-v2-v3-widget-and-token-lifecycle` | `react` | `../_knowledge/react/recaptcha-v2-v3-widget-and-token-lifecycle.md` | MAPPED |
| Reverse-proxy/CDN peer-address boundary, `X-Forwarded-For`/`X-Forwarded-Proto`, middleware ordering, and restricted KnownProxies/KnownNetworks trust | `aspnet-core.forwarded-headers-and-client-ip-trust` | `aspnet-core` | `../_knowledge/aspnet-core/forwarded-headers-and-client-ip-trust.md` | MAPPED |
| Optional reCAPTCHA `remoteip`, real-client provenance, reliable deployment cases, and omission when forwarded client IP is uncertain | `aspnet-core.forwarded-headers-and-client-ip-trust` | `aspnet-core` | `../_knowledge/aspnet-core/forwarded-headers-and-client-ip-trust.md` | MAPPED |
| Source verification, boundary review, independent audit, validation, manifests, apply archives, and coverage bookkeeping | - | - | - | NON_LEARNING |
| Repetition prompts and recall-question scaffolding that restate mapped learning claims | - | - | - | NON_LEARNING |
| Screenshot/source assets, extracted data, regional evidence partitions, and the recorded duplicate placement `S-067 -> S-015` | - | - | - | NON_LEARNING |

## Boundary decisions

### Server trust and policy

Keys, token verification, v2/v3 acceptance rules, hostname/action/score checks, ASP.NET Core service/controller integration, and Razor handoff form one security model: client token acquisition is untrusted until the server verifies it and applies endpoint policy. Framework syntax is retained inside that model rather than split into controller, DTO, and configuration micro-units.

### React lifecycle

The wrapper and manual variants share one client-side lifecycle: load an external API once, wait for readiness, obtain a fresh token, submit it with the protected operation, and reset or re-execute after failure. v2 widget ownership and v3 action execution are compared in one independently reviewable React unit.

### Forwarded client context

Trusted forwarded-header processing is broader than reCAPTCHA and has an independent deployment/security model. It receives its own ASP.NET Core unit; the optional `remoteip` claim is its concrete downstream application.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     9 |
| MERGED       |     0 |
| NON_LEARNING |     3 |
| UNRESOLVED   |     0 |

Total mapping rows: 12
Distinct Knowledge IDs: 3 (3 new)
