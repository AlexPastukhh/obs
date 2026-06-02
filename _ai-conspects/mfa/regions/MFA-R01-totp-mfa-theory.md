# MFA-R01 - MFA / TOTP theory

Conspect: `mfa`  
File type: **verified region/correction transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-02 16:01:53 UTC

---

## Direction check

Goal:
Process the first transcript pass after MFA Stage0 boundary review.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `11` sources for `MFA-R01`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage1 review/commit, process MFA Stage2 R05 + R06 + R07.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
MFA factor theory, TOTP authenticator concept, enrollment/sign-in model, data model/security notes, and TOTP implementation building blocks.
```

Key ideas:

- MFA strengthens login by requiring different factor types.
- Authenticator-app MFA usually means TOTP: shared secret + current time window -> short code.
- TOTP enrollment provisions a secret into the authenticator app using an otpauth URI/QR code.
- Sign-in with TOTP usually checks password first, then challenges for a code before final sign-in.
- MFA secrets should be generated server-side, stored protected/encrypted, and never logged.
- Multiple-device support is easier with a separate UserSecret table.
- FIDO2/WebAuthn is stronger and phishing-resistant where supported.

Reading quality:
```text
Visible text was read from Stage0 source images/contact sheets with OCR assistance.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
If a later review finds a small OCR artifact, fix that source with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-003, S-005, S-007, S-010, S-012, S-014, S-016, S-018, S-021, S-022, S-024
```

Boundary decision:
```text
Included in MFA-R01 after Stage1 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-003 | IU-003 | `7af8538b22` | `MFA-R01` | `verified-visible-ocr-assisted` | What MFA is |
| S-005 | IU-005 | `ef967f0ae1` | `MFA-R01` | `verified-visible-ocr-assisted` | Common MFA approaches |
| S-007 | IU-007 | `38392ce371` | `MFA-R01` | `verified-visible-ocr-assisted` | 2) Authenticator app (TOTP) — most common software MFA |
| S-010 | IU-010 | `36fc8b8491` | `MFA-R01` | `verified-visible-ocr-assisted` | 3) Push MFA (approve/deny) |
| S-012 | IU-012 | `7290f2febf` | `MFA-R01` | `verified-visible-ocr-assisted` | TOTP MFA in detail (Authenticator App) |
| S-014 | IU-014 | `3053a8b107` | `MFA-R01` | `verified-visible-ocr-assisted` | ¢ issuer: your app/company name (“MyApp’”) |
| S-016 | IU-016 | `4cfae66955` | `MFA-R01` | `verified-visible-ocr-assisted` | B) Sign-in flow with TOTP MFA |
| S-018 | IU-018 | `9046a505aa` | `MFA-R01` | `verified-visible-ocr-assisted` | Data model patterns (two common designs) |
| S-021 | IU-021 | `d2414331b9` | `MFA-R01` | `verified-visible-ocr-assisted` | eee ee OE EEE |
| S-022 | IU-022 | `b99c6cbc45` | `MFA-R01` | `verified-visible-ocr-assisted` | Implementation building blocks in ASP.NET Core |
| S-024 | IU-024 | `af22e1dfcd` | `MFA-R01` | `verified-visible-ocr-assisted` | Security notes implied by the slides (and what you should do) |

---

## 2. Source transcript

### S-003 - What MFA is

Metadata:
```text
source_id: S-003
image_use_id: IU-003
fileId_short: 7af8538b22
image_file: S-003__7af8538b22.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
What MFA is

Multi-Factor Authentication (MFA) strengthens login by requiring at least two different factor types:
¢ Knowledge: something you know (password, PIN)
¢ Possession: something you have (phone/app, hardware key)
e Inherence: something you are (biometrics)

Goal: if the password is stolen, the attacker still can’t sign in.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-005 - Common MFA approaches

Metadata:
```text
source_id: S-005
image_use_id: IU-005
fileId_short: ef967f0ae1
image_file: S-005__ef967f0ae1.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Common MFA approaches
1) Email OTP (one-time password via email)
How it works
¢ After password, server sends a short code to the user's email.
¢ User enters it to complete sign-in.
Pros
e Easy to implement
© No extra apps required
Cons / security notes
© Email access isn’t strongly tied to one device (email is accessible on many devices, can be forwarded,
phished, compromised).
¢ If. an attacker compromises email, OTP is useless.
¢ Delays / deliverability issues.
Use when
¢ Low/medium security apps, or as a fallback recovery mechanism.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-007 - 2) Authenticator app (TOTP) — most common software MFA

Metadata:
```text
source_id: S-007
image_use_id: IU-007
fileId_short: 38392ce371
image_file: S-007__38392ce371.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
2) Authenticator app (TOTP) — most common software MFA
This is the classic “Google Authenticator / Microsoft Authenticator / Authy” style code.
Key idea
© Server and authenticator share a secret key.
¢ App generates a 6-digit code based on:
e the secret key
© current time window (typically 30 seconds)
That code is a TOTP (Time-based One-Time Password).
Why it’s stronger than email OTP
¢ It proves possession of a device where the secret was provisioned.
¢ No dependency on email delivery.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-010 - 3) Push MFA (approve/deny)

Metadata:
```text
source_id: S-010
image_use_id: IU-010
fileId_short: 36fc8b8491
image_file: S-010__36fc8b8491.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
3) Push MFA (approve/deny)

¢ Server sends a push notification; user taps approve.

© Convenient but requires provider/app ecosystem and robust anti-fatigue protections.
4) FIDO2 / WebAuthn (Passkeys, security keys)

¢ Strongest modern “possession” factor.

¢ Resistant to phishing (domain-bound cryptography).

* Best choice today when you can support it.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-012 - TOTP MFA in detail (Authenticator App)

Metadata:
```text
source_id: S-012
image_use_id: IU-012
fileId_short: 7290f2febf
image_file: S-012__7290f2febf.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
TOTP MFA in detail (Authenticator App)
A) Enrollment / registration flow (provisioning)
This is the step where the user adds your app to their authenticator.
1. Generate a secret
e You create a random secret for the user (high entropy).
¢ Avoid formats that include awkward URL characters for manual entry / QR payloads (Base64 often
includes + / =).
e Use a restricted alphabet (commonly Base32) so it’s easy to encode and type.
2. Create an “otpauth” URI
Authenticators expect a URI shaped like:
otpauth: //totp/{issuer}: {account} ?secret={secret }&issuer={issuer} fe’)
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-014 - ¢ issuer: your app/company name (“MyApp’”)

Metadata:
```text
source_id: S-014
image_use_id: IU-014
fileId_short: 3053a8b107
image_file: S-014__3053a8b107.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
¢ issuer: your app/company name (“MyApp’”)

© account: user label (often email)

* secret: shared key (Base32)

¢ URL-encode label/issuer.

3. Show QR code

* You render the QR code containing that URI.

¢ Users scan it in the authenticator app.

© Often you also show the manual key as a backup.

4. User confirms by typing a generated code

¢ The user reads the 6-digit code from their app and submits it.

¢ Server verifies it against the secret.

¢ If valid - enrollment completed.

5. Store secret

* Store the user's secret in the database (preferably protected/encrypted).
* Optionally store metadata like device name (“My phone’) and allow multiple devices.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-016 - B) Sign-in flow with TOTP MFA

Metadata:
```text
source_id: S-016
image_use_id: IU-016
fileId_short: 4cfae66955
image_file: S-016__4cfae66955.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
B) Sign-in flow with TOTP MFA
1. User signs in with username/password.
2. If MFA is enabled for that user -> show MFA challenge page.
3. User enters 6-digit code.
4. Server verifies code; if valid + completes sign-in.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-018 - Data model patterns (two common designs)

Metadata:
```text
source_id: S-018
image_use_id: IU-018
fileId_short: 9046a505aa
image_file: S-018__9046a505aa.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Data model patterns (two common designs)
1) “Single secret per user” (simpler)
* One authenticator device per user (or same secret copied).
* Stored on the user table or a single MFA table.
2) “Multiple secrets per user” (more flexible)
Store secrets in a separate table like:
©  UserSecret :
. Id
¢  UserId
© Name (device label)
* Secret (protected value)
©  ConcurrencyStamp or version field
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-021 - eee ee OE EEE

Metadata:
```text
source_id: S-021
image_use_id: IU-021
fileId_short: d2414331b9
image_file: S-021__d2414331b9.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
eee ee OE EEE
Advantages:
* Multiple authenticators per user (phone + backup device)
* Ability to revoke one device without disabling MFA entirely
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-022 - Implementation building blocks in ASP.NET Core

Metadata:
```text
source_id: S-022
image_use_id: IU-022
fileId_short: b99c6cbc45
image_file: S-022__b99c6cbc45.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Implementation building blocks in ASP.NET Core
1) Generating a safe secret
* Use RandomNumberGenerator .
* Use Base32 or a restricted alphabet so it’s compatible with authenticator tooling and manual entry.
2) QR rendering
Two options:
* Client-side: include a JS lib like grcode.js and render QR from a model field (easy).
* Server-side: generate QR image as PNG (more control, no JS dependency).
3) Verifying the TOTP code
Use a TOTP library (typical) or implement RFC logic.
Key points:
* Allow clock drift (+1 time step is common).
+ Rate-limit attempts to prevent brute force.
* Consider replay protection (optional but useful in high-security contexts).
|
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-024 - Security notes implied by the slides (and what you should do)

Metadata:
```text
source_id: S-024
image_use_id: IU-024
fileId_short: af22e1dfcd
image_file: S-024__af22e1dfcd.png
stage0_group: MFA-R01
stage1_region: MFA-R01
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Security notes implied by the slides (and what you should do)
The slides store Secret as a string. In a real app, you should protect it:
* Encrypt the secret at rest (recommended):
* Use ASP.NET Core Data Protection ( IDataProtector ) to protect/unprotect before storing/using
*  Orstore in a secure vault (higher assurance)
* Never log secrets or QR URIs
+ Rate-limit MFA verification attempts
* Allow small clock drift (+1 time step)
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- MFA strengthens login by requiring different factor types.
- Authenticator-app MFA usually means TOTP: shared secret + current time window -> short code.
- TOTP enrollment provisions a secret into the authenticator app using an otpauth URI/QR code.
- Sign-in with TOTP usually checks password first, then challenges for a code before final sign-in.
- MFA secrets should be generated server-side, stored protected/encrypted, and never logged.
- Multiple-device support is easier with a separate UserSecret table.
- FIDO2/WebAuthn is stronger and phishing-resistant where supported.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| MFA factor model and goal are defined. | S-003 | high |
| Common MFA approaches and tradeoffs are listed. | S-005, S-010 | high |
| TOTP shared-secret/time-window model is described. | S-007, S-012 | high |
| Enrollment and sign-in flows are introduced conceptually. | S-014, S-016 | high |
| Data model/security controls are outlined. | S-018, S-021, S-022, S-024 | medium-high |

---

## 5. Open review issues

- This file is valid for MFA Stage1 because every included source has visible text and no OCR-placeholder processed source.
- Remaining MFA Stage0 groups are not closed by this file: R05/R06/R07.
- MFA closure audit must run after Stage2 is complete.
