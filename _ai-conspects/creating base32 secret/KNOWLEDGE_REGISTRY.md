# Knowledge Registry - creating base32 secret

Source workspace: `_ai-conspects/creating base32 secret/`

Authoritative processed source: `regions/full-semantic-transcript-v001.md`

Region files:
- `regions/B32SEC-R01-random-secret-bytes-base32-encoding.md` (S-001..S-018)
- `regions/B32SEC-R02-totp-authenticator-qr-provisioning.md` (S-017..S-034)

Original SVG: SHA-256 `00b26f65fd54c455c8d09c1cad61b2023719537afad3c427ab3ddb80179fa2a6`, Git blob `d5aad6ee05f95c43d8650f1506140fa93deb8ab4`

---

## Coverage map

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| What TOTP secret is; Base32 is encoding not entropy; classic alphabet `ABCDEFGHIJKLMNOPQRSTUVWXYZ234567` | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Byte-first approach: `RandomNumberGenerator.GetBytes`, `Base32Encoding.ToString`, `OtpNet`; `CreateBase32Secret`/`CreateSecretBytes`/`ToBase32` implementations | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Entropy math: 20 bytes = 160 bits; 5 bits per Base32 char (2^5=32); 160/5 = 32 chars | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Byte-first design rationale: entropy via byte count; binary secret for libs; Base32 as presentation only; no custom algorithm to audit | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Direct alphabet selection approach: `TotpSecretCourseStyle`, `BitConverter.ToUInt32`, `length * 4` random bytes, `sb.Append(Alphabet[val % Alphabet.Length])` | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Entropy comparison: 16-char direct-selection = 80 bits vs 20-byte byte-first = 160 bits | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Byte/Base32 storage decision; whether to store bytes or Base32 string is application choice | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Byte-first vs direct selection comparison table | `dotnet.totp-secret-generation-and-base32-encoding` | dotnet | `../_knowledge/dotnet/totp-secret-generation-and-base32-encoding.md` | MAPPED |
| Direct selection with `BitConverter.ToUInt32`: 4 bytes per char, endianness does not affect security; modulo bias: 32 divides 2^32 so `% 32` is unbiased; bias rule for other alphabet sizes | `dotnet.cryptographic-randomness-and-unbiased-ranges` | dotnet | `../_knowledge/dotnet/cryptographic-randomness-and-unbiased-ranges.md` | MERGED |
| `otpauth://totp/{issuer}:{account}?secret={base32}&issuer={issuer}` URI shape and label structure | `aspnet-core.otpauth-uri-construction` | aspnet-core | `../_knowledge/aspnet-core/otpauth-uri-construction.md` | MAPPED |
| `WebUtility.UrlEncode` for issuer and account; why encoding is required; `+` vs `%20`; example inserts `base32Secret` directly | `aspnet-core.otpauth-uri-construction` | aspnet-core | `../_knowledge/aspnet-core/otpauth-uri-construction.md` | MAPPED |
| `BuildOtpAuthUri(string issuer, string account, string base32Secret)` implementation | `aspnet-core.otpauth-uri-construction` | aspnet-core | `../_knowledge/aspnet-core/otpauth-uri-construction.md` | MAPPED |
| Secret security rules: protect at rest; do not log; limit display; QR as credential; rotation on exposure | `aspnet-core.totp-enrollment-and-verification` | aspnet-core | `../_knowledge/aspnet-core/totp-enrollment-and-verification.md` | MERGED |
| In-flight dictionary cleanup: `TryRemove(new KeyValuePair<string, Lazy<Task<object>>>(key, lazy))` prevents removing newer in-flight entry; race scenario A/B/C | `dotnet.per-key-async-single-flight` | dotnet | `../_knowledge/dotnet/per-key-async-single-flight.md` | MERGED |
| S-001..S-018 source images: OCR inventory, image use records, fileId metadata, stage0/stage1 bookkeeping | - | - | - | NON_LEARNING |
| S-017..S-034 source images: OCR inventory, image use records, fileId metadata, stage0/stage1 bookkeeping | - | - | - | NON_LEARNING |
| `MANIFEST.md`, `APPLY_ARCHIVE.md`, `TRANSCRIPT_REBUILD_AUDIT.md`, `03-closure-audit.md`, `00-repo-conspects-check.md`, `01-stage0-boundary-review.md`, `02-stage1-transcript.md` processing artifacts | - | - | - | NON_LEARNING |
| `QUESTIONS.md` repetition bank | - | - | - | NON_LEARNING |
| `audit-assets/`, `data/` directories | - | - | - | NON_LEARNING |

---

## Summary

| Status | Count |
|---|---:|
| MAPPED | 11 |
| MERGED | 3 |
| NON_LEARNING | 5 |
| UNRESOLVED | 0 |
