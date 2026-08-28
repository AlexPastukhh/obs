# TOTP enrollment and verification

Knowledge ID: `aspnet-core.totp-enrollment-and-verification`

Topic: `aspnet-core`

TOTP is HOTP whose counter comes from time: `C = floor((T - T0) / X)`, commonly with a 30-second step. Server and authenticator share a random secret, HMAC the counter, dynamically truncate, and apply a decimal modulus to produce the short code.

Enrollment is two-phase: generate a high-entropy secret; build an `otpauth://` URI/QR with issuer, account, algorithm, digits, period, and Base32 secret; show the manual key only during enrollment; then protect the secret at rest in a pending record. Upsert that record for the user with `CreatedUtc`, `ExpiresUtc`, and a concurrency token. Confirmation loads it, trims the submitted code, unprotects and Base32-decodes the secret, verifies, activates MFA, and consumes the pending record. Never post the raw secret back from the browser.

Allow only a narrow drift window such as previous/current/next step and keep server time synchronized. Verification must be bound to the correct user/enrollment, rate-limited, attempt-limited, and expired. Data Protection for the pending secret complements rather than replaces database/key-ring access control, auditing, and recovery/rotation planning.

## Sources
- Workspace: `_ai-conspects/totp, summary,theory/`
- Processed source: `regions/R01-totp-theory-enrollment-verification-final.md`, complete transcript
