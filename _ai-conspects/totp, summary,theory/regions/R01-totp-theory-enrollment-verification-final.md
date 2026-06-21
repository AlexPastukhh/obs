# R01 — TOTP theory and secure enrollment flow final coverage transcript v001

Conspect: `totp, summary,theory`  
Source: `totp, summary,theory.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

TOTP derives short-lived codes from a shared secret and a time counter. Enrollment must protect the pending secret, verify one code, and only then activate the factor.

Reading quality: verified. The whole sheet is a single coherent region; all 8 image uses and 12 SVG text labels were reviewed against preserved source evidence.

## 1. TOTP in one model

TOTP is HOTP where the moving counter comes from time rather than an incrementing event counter. With current Unix time `T`, start time `T0`, and step `X` (commonly 30 seconds):

```text
C = floor((T - T0) / X)
```

The server and authenticator app share a random secret `K`. Both compute an HMAC over `C`, apply dynamic truncation, convert the result to a positive integer, and take a decimal modulus (often six digits). The same secret and the same time window therefore produce the same code.

## 2. Enrollment flow

A safe enrollment flow is two-phase:

1. generate a high-entropy secret;
2. build an `otpauth://` URI containing issuer, account name, algorithm/digits/period, and the Base32 secret;
3. render the URI as a QR code and optionally show the manual key once;
4. store a **pending enrollment**, not an active factor;
5. protect/encrypt the secret before persisting it;
6. set a short expiration and upsert the pending record for the user;
7. ask the user for a generated code;
8. load and unprotect the pending secret;
9. verify the submitted code;
10. after success, activate the factor and delete/consume the pending enrollment.

The source uses ASP.NET Core Data Protection to protect the pending secret at rest. Protection is not a substitute for database access control, key-ring protection, audit logging, and secret-rotation/recovery planning.

## 3. Verification and clock drift

Real clocks are not perfectly synchronized. Libraries commonly permit a small verification window such as previous/current/next step (`-1, 0, +1`). A wider window improves tolerance but also accepts a code for longer, so keep it narrow and monitor server time synchronization.

Verification should be rate-limited and tied to the correct user/pending enrollment. Do not accept unlimited guesses, and expire abandoned pending records.

## 4. Code-flow notes from the sheet

The enrollment action:

- gets the current user;
- finds or creates a pending record;
- protects and stores the secret with `CreatedUtc`/`ExpiresUtc` and a concurrency token;
- builds the authenticator URI;
- returns issuer, account name, QR URI, and the manual key for the enrollment page.

The confirmation action:

- rejects a missing or expired pending record;
- unprotects the secret;
- converts Base32 to bytes;
- verifies the trimmed code with a small time window;
- finalizes the user's MFA state only after successful verification.

Avoid posting the raw secret back from the browser. The server should recover it from the protected pending record.

## 6. Coverage

```text
R01 processed image uses: 8
R01 processed text labels: 12
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
