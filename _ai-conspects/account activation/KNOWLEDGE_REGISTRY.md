# Knowledge Registry

Source workspace: `_ai-conspects/account activation/`

Authoritative processed sources:
- `04-source-preserving-transcript-v002.md`
- `05-corrected-domain-code-reference-v002.md`
- `06-repetition-guide-v002.md`
- `08-technical-risk-corrections-v002.md`
- `09-native-svg-text-nodes-v002.md`
- `CURRENT_SOURCE_OF_TRUTH.md`

Original SVG: `source/Account activation.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Legacy registration stores activation code directly on `User`; it uses RNG and expiration date | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| Later domain model moves activation to separate `Activation` aggregate with history, expiry, attempt, and user ownership | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| Activation validation logic: wrong code, expired code, and success behavior are owned by the entity | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| Token generation uses cryptographic randomness; code size must fit DB and security requirements; raw code should not be stored long-term | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| EF mapping for activation table, `Maybe` conversion, `UserId`, row version, and cascade ownership semantics | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| Activation email link generation, `LinkGenerator`, request-scope dependency, and post-registration check-email behavior | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| Activation endpoint and GET route safety: safe email link semantics, repeated-click/idempotent behavior, and mutation risk | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| Corrected production details: persist after success, log without raw code, avoid `HttpContext` dependency for background email, prefer safer GET/POST design | `aspnet-core.account-activation-email-confirmation-flow` | `aspnet-core` | `../_knowledge/aspnet-core/account-activation-email-confirmation-flow.md` | MAPPED |
| Source ledger, placement metadata, stage/provenance bookkeeping, and image tracking are workflow material, not learning content | — | — | — | NON_LEARNING |

## Boundary decisions

- The workspace is mapped to a single durable ASP.NET Core unit because the main claim is one coherent pattern: token generation, validation, persistence, and email-confirmation flow.
- The Data Protection reset-token unit remains the generic primitive; this workspace adds the full account-activation domain flow and the email-/link-specific operational rules.
- TOTP/MFA is semantically related but a different model and remains separate under `aspnet-core.totp-enrollment-and-verification`.
- Source-specific metadata and image ledger rows are intentionally excluded from learning coverage and recorded as `NON_LEARNING`.

| Status | Count |
|---|---:|
| MAPPED | 8 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
