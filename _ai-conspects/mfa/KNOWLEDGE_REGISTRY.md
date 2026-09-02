# Knowledge Registry - MFA

Source workspace: `_ai-conspects/mfa/`

Authoritative processed sources: all region transcripts `MFA-R00` through `MFA-R07`, including the R03 v002 tail, as designated by `CURRENT_SOURCE_OF_TRUTH.md`; 91/91 source uses processed, zero pending.

Original source identity: `mfa.svg` (named in `01-stage0-boundary-review.md`; not physically present in the current workspace).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| MFA factor categories plus email OTP, TOTP, push, and stronger-device method tradeoffs | `security.mfa-factor-selection-trusted-devices-and-recovery` | `security` | `../_knowledge/security/mfa-factor-selection-trusted-devices-and-recovery.md` | MAPPED |
| Trusted-device credential, recovery/reset controls, one-time recovery codes, and per-device factor records | `security.mfa-factor-selection-trusted-devices-and-recovery` | `security` | `../_knowledge/security/mfa-factor-selection-trusted-devices-and-recovery.md` | MAPPED |
| TOTP time/HMAC model, narrow drift window, enrollment and staged login timelines, and verification controls | `aspnet-core.totp-enrollment-and-verification` | `aspnet-core` | `../_knowledge/aspnet-core/totp-enrollment-and-verification.md` | MERGED |
| Durable protected pending-secret upsert, multi-instance safety, active-secret persistence and pending-row removal, and client non-authority | `aspnet-core.totp-enrollment-and-verification` | `aspnet-core` | `../_knowledge/aspnet-core/totp-enrollment-and-verification.md` | MERGED |
| React QR/manual-key UI, credentialed JSON calls, device/code-only submit, success state, and cleanup boundary | `aspnet-core.totp-enrollment-and-verification` | `aspnet-core` | `../_knowledge/aspnet-core/totp-enrollment-and-verification.md` | MERGED |
| Razor antiforgery/validation form, hidden provisioning URI QR rendering, and enabled-state view | `aspnet-core.totp-enrollment-and-verification` | `aspnet-core` | `../_knowledge/aspnet-core/totp-enrollment-and-verification.md` | MERGED |
| otpauth issuer/account encoding, QR/manual equivalence, algorithm/digits/period agreement, and secret display boundary | `aspnet-core.otpauth-uri-construction` | `aspnet-core` | `../_knowledge/aspnet-core/otpauth-uri-construction.md` | MERGED |
| RNG bytes, Base32, byte-first and course-style UInt32/alphabet selection mechanics | `dotnet.totp-secret-generation-and-base32-encoding` | `dotnet` | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MERGED |
| Foreign Zod regular-union bundled errors versus discriminated-union selected-branch errors | `typescript.zod-discriminated-union-validation` | `typescript` | `../_knowledge/typescript/zod-discriminated-union-validation.md` | MERGED |
| Boundary review, ledgers, closure audit, manifests, and apply archives | - | - | - | NON_LEARNING |
| Source images/contact sheets and repetition/question scaffolding | - | - | - | NON_LEARNING |

## Boundary decisions

- The two stray Zod cards are learning content but semantically foreign to MFA, so they merge into the existing Zod destination rather than becoming NON_LEARNING.
- Server state, verification, and the two UI variants remain one enrollment state-machine model; UI syntax was not split into micro-units.
- General factor/recovery selection is broader than TOTP implementation and receives its own security unit.

| Status | Count |
|---|---:|
| MAPPED | 2 |
| MERGED | 7 |
| NON_LEARNING | 2 |
| UNRESOLVED | 0 |

Total mapping rows: 11

Distinct Knowledge IDs: 5 (1 new, 4 existing)
