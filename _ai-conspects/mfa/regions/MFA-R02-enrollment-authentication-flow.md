# MFA-R02 - Enrollment and authentication flow

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
This file processes `13` sources for `MFA-R02`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage1 review/commit, process MFA Stage2 R05 + R06 + R07.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
MFA enrollment/login flow: server-generated pending secret, QR scan, confirmation code, permanent protected secret, MFA challenge, trusted device, and recovery/reset.
```

Key ideas:

- Enrollment starts from an authenticated user and creates a server-side pending secret.
- The browser gets a QR/otpauth URI but must not be trusted to return the secret.
- The authenticator app scans the QR, stores the secret, and generates codes.
- The server verifies the submitted TOTP code against the pending secret before saving it permanently.
- Login flow checks username/password first, then requires MFA before issuing the final auth cookie.
- Trusted device/remember-machine can skip MFA later on that device.
- Recovery/reset flows are required because users lose phones.

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
S-002, S-006, S-008, S-009, S-011, S-013, S-015, S-017, S-019, S-020, S-023, S-025, S-026
```

Boundary decision:
```text
Included in MFA-R02 after Stage1 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-002 | IU-002 | `a95d6719c0` | `MFA-R02` | `verified-visible-ocr-assisted` | Complete “story” in one timeline |
| S-006 | IU-006 | `e6d3a7cced` | `MFA-R02` | `verified-visible-ocr-assisted` | 5) Important security controls in the full flow |
| S-008 | IU-008 | `29ad9707bc` | `MFA-R02` | `verified-visible-ocr-assisted` | 6) Multiple-device support (why UserSecret table is useful) |
| S-009 | IU-009 | `708db6e44f` | `MFA-R02` | `verified-visible-ocr-assisted` | 1) Enrollment flow (link authenticator app) |
| S-011 | IU-011 | `bf2ac35bcf` | `MFA-R02` | `verified-visible-ocr-assisted` | otpauth: //totp/{issuer}: {account }?secret={secret }&issuer={issuer} |
| S-013 | IU-013 | `0fe6755d8e` | `MFA-R02` | `verified-visible-ocr-assisted` | Step 2 — User scans QR in Authenticator app |
| S-015 | IU-015 | `0dd1f86013` | `MFA-R02` | `verified-visible-ocr-assisted` | Server does |
| S-017 | IU-017 | `2d4e253db5` | `MFA-R02` | `verified-visible-ocr-assisted` | 2) Login flow with MFA (password + code) |
| S-019 | IU-019 | `eccec5902a` | `MFA-R02` | `verified-visible-ocr-assisted` | If MFA required |
| S-020 | IU-020 | `67fcfdd331` | `MFA-R02` | `verified-visible-ocr-assisted` | Step 2 — Show MFA challenge screen |
| S-023 | IU-023 | `21e8f8ff95` | `MFA-R02` | `verified-visible-ocr-assisted` | Server does |
| S-025 | IU-025 | `e145f76eac` | `MFA-R02` | `verified-visible-ocr-assisted` | 3) Trusted device (“Remember this machine”) flow (optional) |
| S-026 | IU-026 | `8fa8b125a9` | `MFA-R02` | `verified-visible-ocr-assisted` | 4) Recovery and reset flows (recommended) |

---

## 2. Source transcript

### S-002 - Complete “story” in one timeline

Metadata:
```text
source_id: S-002
image_use_id: IU-002
fileId_short: a95d6719c0
image_file: S-002__a95d6719c0.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Complete “story” in one timeline
1. User logs in > wants to enable MFA.
2. Server generates secret — stores pending secret — returns QR.
3. User scans QR — app generates codes.
4. User types code — server verifies using pending secret — stores protected secret in DB.
5. Next login:
* password check passes — server sees UserSecrets exists > requires MFA.
6. User types TOTP code — server verifies against stored secrets — signs in.
7. Optional: server remembers device — skips MFA next time on that machine.
8. If phone lost — user uses recovery code or resets MFA and re-enrolls.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-006 - 5) Important security controls in the full flow

Metadata:
```text
source_id: S-006
image_use_id: IU-006
fileId_short: e6d3a7cced
image_file: S-006__e6d3a7cced.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
5) Important security controls in the full flow
Enrollment security

¢ Never trust the secret from the client.

* Keep pending secret server-side.

¢ Expire pending secrets quickly (e.g., 5-10 min).

¢ Use HTTPS; never log QR URI or secrets.
Verification security

¢ Allow slight time drift (+1 step).

e Add rate limiting (per user + per IP).

¢ Consider lockout after repeated failures.

¢ Don't reveal too much (“Invalid code” is fine; don’t confirm if user exists).
Secret storage security

¢ Store secrets protected/encrypted.

¢ Restrict DB access; treat secrets like passwords.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-008 - 6) Multiple-device support (why UserSecret table is useful)

Metadata:
```text
source_id: S-008
image_use_id: IU-008
fileId_short: 29ad9707bc
image_file: S-008__29ad9707bc.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
6) Multiple-device support (why UserSecret table is useful)
e User can enroll phone + backup phone.
© Verification checks can iterate through all secrets until one matches.
¢ User can revoke a specific device by deleting its UserSecret row (or marking it disabled).
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-009 - 1) Enrollment flow (link authenticator app)

Metadata:
```text
source_id: S-009
image_use_id: IU-009
fileId_short: 708db6e44f
image_file: S-009__708db6e44f.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
1) Enrollment flow (link authenticator app)
This is the setup flow the user runs once (or when adding a new device).
Step 1— User opens enrollment page
Request: GET /mfa/enroll
Server does
1. Identify current user (must be authenticated).
2. Generate a random TOTP secret (high entropy, Base32-ish).
3. Save it server-side as a pending secret (Session / temporary DB record / cache).
¢ This is the security-critical change: the browser must not be trusted to keep/return the secret.
4. Build an otpauth:// URI:
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-011 - otpauth: //totp/{issuer}: {account }?secret={secret }&issuer={issuer}

Metadata:
```text
source_id: S-011
image_use_id: IU-011
fileId_short: bf2ac35bcf
image_file: S-011__bf2ac35bcf.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
otpauth: //totp/{issuer}: {account }?secret={secret }&issuer={issuer}
5. Send to the view:

© = QrCodeUri

e Issuer

° ~=AccountName

* (optionally show manual key, but do NOT accept it back from client)

Browser does

¢ Renders the QR code using qrcode.js (Razor) or a React QR library (SPA).
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-013 - Step 2 — User scans QR in Authenticator app

Metadata:
```text
source_id: S-013
image_use_id: IU-013
fileId_short: 0fe6755d8e
image_file: S-013__0fe6755d8e.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Step 2 — User scans QR in Authenticator app
User action

© Opens Authenticator app > “Add account” — scans QR.
Authenticator app does

¢ Parses the URI.

¢ Stores the secret locally.

¢ Immediately starts generating a 6-digit code every ~30 seconds.
Step 3 — User confirms by typing a code
Request: POST /mfa/enroll with:

© DeviceName (e.g., “My phone’)

© Code (6-digit TOTP code)
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-015 - Server does

Metadata:
```text
source_id: S-015
image_use_id: IU-015
fileId_short: 0dd1f86013
image_file: S-015__0dd1f86013.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Server does
1. Read the pending secret from server-side store (Session/DB).
* If missing — enrollment expired > user must restart.
2. Verify the submitted TOTP code:
¢ Convert secret Base32 — bytes
¢ Compute current expected code (with allowed drift)
* Typical verification window: allow previous and next time step (+1) to handle clock skew.
3. If code is invalid:
¢ return the same page with “Invalid code”.
4. If code is valid:
* Store the secret permanently in DB ( UserSecrets table).
¢ Protect the secret at rest (Data Protection encryption).
¢ Clear the pending secret (so it can’t be reused).
5. Redirect to success page.
Result
e User now has one registered authenticator device.
e User can have multiple devices by repeating enrollment, creating multiple UserSecret rows.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-017 - 2) Login flow with MFA (password + code)

Metadata:
```text
source_id: S-017
image_use_id: IU-017
fileId_short: 2d4e253db5
image_file: S-017__2d4e253db5.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
2) Login flow with MFA (password + code)
This runs every time the user signs in (unless you implement “remember device’).
Step 1— User submits username/password
Request: POST /account/login
Server does
1. Find user by username/email.
2. Verify password (and apply lockout rules if enabled).
3. Decide whether MFA is required:
* [fuser has no UserSecrets — sign in normally.
* [fuser has at least one UserSecret — require MFA challenge.
If MFA not required
* Issue auth cookie/session and redirect to app.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-019 - If MFA required

Metadata:
```text
source_id: S-019
image_use_id: IU-019
fileId_short: eccec5902a
image_file: S-019__eccec5902a.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
If MFA required
* Do notissue the final auth cookie yet.
* Create a short-lived MFA session state, e.g.:
* store mfa_userId and rememberMe in Session
*  orissue a temporary MFA cookie
* Redirect to MFA challenge page.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-020 - Step 2 — Show MFA challenge screen

Metadata:
```text
source_id: S-020
image_use_id: IU-020
fileId_short: 67fcfdd331
image_file: S-020__67fcfdd331.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Step 2 — Show MFA challenge screen
Request: GET /account/mfachallenge
Server returns
* A page/form to enter the 6-digit code (and optional “remember this device’).
Step 3 — User enters authenticator code
Request: POST /account/mfachallenge with:
* Code
* optionally RememberMachine
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-023 - Server does

Metadata:
```text
source_id: S-023
image_use_id: IU-023
fileId_short: 21e8f8ff95
image_file: S-023__21e8f8ff95.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Server does
1. Read MFA session state (who is trying to complete MFA).
* If missing + MFA session expired — user must login again.
2. Load stored secrets for that user:
¢ SELECT * FROM UserSecrets WHERE UserId = ...
3. For each secret:
© unprotect (decrypt) it
* verify the code with drift window (#1 step)
4. If no secret matches:
* reject with “Invalid code”
* optionally increase failure counters / rate-limit
5. Ifa secret matches:
* nowissue the real authentication cookie (Signin)
+ clear MFA session state
* optionally mark device as trusted (“remember machine”)
* redirect to app
Result
* Users fully authenticated only after passing password + MFA.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-025 - 3) Trusted device (“Remember this machine”) flow (optional)

Metadata:
```text
source_id: S-025
image_use_id: IU-025
fileId_short: e145f76eac
image_file: S-025__e145f76eac.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
3) Trusted device (“Remember this machine”) flow (optional)
Goal: user doesn't need MFA every time on the same device.
How it typically works
* After successful MFA, server issues a long-lived “trusted device” token/cookie.
+ Onlater logins:
* if password is correct and device is trusted — skip MFA challenge.
* You should allow revocation:
+ lear trusted devices on password reset
+ allow user to remove trusted devices
* expire tokens after N days
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-026 - 4) Recovery and reset flows (recommended)

Metadata:
```text
source_id: S-026
image_use_id: IU-026
fileId_short: 8fa8b125a9
image_file: S-026__8fa8b125a9.png
stage0_group: MFA-R02
stage1_region: MFA-R02
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
4) Recovery and reset flows (recommended)
People lose phones; MFA must have recovery.
Recovery codes
* Generate N one-time recovery codes at MFA setup.
* Store hashed versions in DB.
+ Ifuser can't access authenticator, they use a recovery code once.
MFA reset
* Require strong proof (password + email verification or support process).
* Delete UserSecrets rows to disable MFA.
© Reenroll.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Enrollment starts from an authenticated user and creates a server-side pending secret.
- The browser gets a QR/otpauth URI but must not be trusted to return the secret.
- The authenticator app scans the QR, stores the secret, and generates codes.
- The server verifies the submitted TOTP code against the pending secret before saving it permanently.
- Login flow checks username/password first, then requires MFA before issuing the final auth cookie.
- Trusted device/remember-machine can skip MFA later on that device.
- Recovery/reset flows are required because users lose phones.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Full story timeline is shown. | S-002 | high |
| Enrollment flow and server pending-secret behavior are described. | S-009, S-011, S-013, S-015 | high |
| Login/challenge flow is described. | S-017, S-019, S-020, S-023 | high |
| Security controls, trusted device, recovery/reset, and multiple devices are covered. | S-006, S-008, S-025, S-026 | medium-high |

---

## 5. Open review issues

- This file is valid for MFA Stage1 because every included source has visible text and no OCR-placeholder processed source.
- Remaining MFA Stage0 groups are not closed by this file: R05/R06/R07.
- MFA closure audit must run after Stage2 is complete.
