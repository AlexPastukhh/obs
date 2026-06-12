# MFA-R06 - React enrollment UI

Conspect: `mfa`  
File type: **verified region/correction transcript**  
Stage: **2 / transcript v001**  
Generated: 2026-06-02 16:24:51 UTC

---

## Direction check

Goal:
Close the remaining MFA Stage0 candidates after Stage1.

Done:
Stage1 processed R00/R01/R02/R03/R04 and left 38 candidates.

Now:
This file processes `7` sources for `MFA-R06`.

Why:
The cards were manually visually rechecked before marking processed.

Next:
After Stage2 review/commit, run MFA closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
React implementation: enrollment fetch, QRCodeCanvas rendering, manual key/account display, device/code form, submit handler, and completed state.
```

Key ideas:

- React uses JSON endpoints while the backend keeps the pending secret server-side.
- The component fetches enrollment data, renders QRCodeCanvas from qrCodeUri, and shows account/manual key.
- The submit handler posts deviceName and code, not the secret.
- On success the UI switches to an MFA enabled/completed state.
- Cookie-auth React apps need credentials: include.

Reading quality:
```text
Visible text was manually read from Stage0 source images/contact sheets.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
If a later review finds a small wording issue, fix that source with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-056, S-073, S-076, S-078, S-080, S-082, S-084
```

Stage2 local boundary correction:
```text
S-056: Stage0 MFA-R05 -> Stage2 MFA-R06
S-073: Stage0 MFA-R05 -> Stage2 MFA-R06
```

Boundary decision:
```text
Included in MFA-R06 after Stage2 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-056 | IU-056 | `a5119b2fdc` | `MFA-R05` | `verified-visible-manual-read` | C) React implementation (API + components) |
| S-073 | IU-073 | `b486705c40` | `MFA-R05` | `verified-visible-manual-read` | React component setup. |
| S-076 | IU-076 | `c99022c3ab` | `MFA-R06` | `verified-visible-manual-read` | React Enroll component state and initial fetch. |
| S-078 | IU-078 | `49f0b859ca` | `MFA-R06` | `verified-visible-manual-read` | React submit handler. |
| S-080 | IU-080 | `017ef39b41` | `MFA-R06` | `verified-visible-manual-read` | React UI rendering. |
| S-082 | IU-082 | `2202bb683a` | `MFA-R06` | `verified-visible-manual-read` | React / JSX manual key display continuation. |
| S-084 | IU-084 | `f59bbfcd9d` | `MFA-R06` | `verified-visible-manual-read` | React form for verifying and enabling MFA. |

---

## 2. Source transcript

### S-056 - C) React implementation (API + components)

Metadata:
```text
source_id: S-056
image_use_id: IU-056
fileId_short: a5119b2fdc
image_file: S-056__a5119b2fdc.png
stage0_group: MFA-R05
stage2_region: MFA-R06
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
C) React implementation (API + components)

For React, use JSON endpoints.
Same rule: server stores pending secret in DB; client never sends secret back.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-073 - React component setup.

Metadata:
```text
source_id: S-073
image_use_id: IU-073
fileId_short: b486705c40
image_file: S-073__b486705c40.png
stage0_group: MFA-R05
stage2_region: MFA-R06
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
React component setup.

React component (Enroll).

Install QR component:
npm i qrcode.react

Imports:
import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

Type EnrollData:
issuer, accountName, qrCodeUri, manualKey?.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-076 - React Enroll component state and initial fetch.

Metadata:
```text
source_id: S-076
image_use_id: IU-076
fileId_short: c99022c3ab
image_file: S-076__c99022c3ab.png
stage0_group: MFA-R06
stage2_region: MFA-R06
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
React Enroll component state and initial fetch.

State:
data, deviceName, code, err, done.

useEffect:
- fetch /api/mfa/enroll with credentials: "include";
- if response is not ok, set error;
- otherwise set enrollment data from response JSON.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-078 - React submit handler.

Metadata:
```text
source_id: S-078
image_use_id: IU-078
fileId_short: 49f0b859ca
image_file: S-078__49f0b859ca.png
stage0_group: MFA-R06
stage2_region: MFA-R06
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
React submit handler.

On submit:
- prevent default;
- clear error;
- POST /api/mfa/enroll with JSON body { deviceName, code };
- include credentials;
- if response is not ok, show returned message or "Invalid code.";
- if ok, set done true and render success message.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-080 - React UI rendering.

Metadata:
```text
source_id: S-080
image_use_id: IU-080
fileId_short: 017ef39b41
image_file: S-080__017ef39b41.png
stage0_group: MFA-R06
stage2_region: MFA-R06
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
React UI rendering.

Render:
- h2 Enable MFA;
- show error text;
- show loading if no data;
- instruct user to scan the QR code;
- render QRCodeCanvas with data.qrCodeUri;
- display issuer and account;
- display manual key if present.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-082 - React / JSX manual key display continuation.

Metadata:
```text
source_id: S-082
image_use_id: IU-082
fileId_short: 2202bb683a
image_file: S-082__2202bb683a.png
stage0_group: MFA-R06
stage2_region: MFA-R06
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
React / JSX manual key display continuation.

Shows account and optional manual key block:
- strong Account label;
- if data.manualKey exists, show Manual key heading and preformatted manual key;
- the manual key is shown for setup only.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-084 - React form for verifying and enabling MFA.

Metadata:
```text
source_id: S-084
image_use_id: IU-084
fileId_short: f59bbfcd9d
image_file: S-084__f59bbfcd9d.png
stage0_group: MFA-R06
stage2_region: MFA-R06
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
React form for verifying and enabling MFA.

Form:
- label Device name and input bound to deviceName;
- label 6-digit code and input bound to code;
- inputMode numeric, autocomplete one-time-code, width/letter spacing styling;
- submit button "Verify & Enable".
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- React uses JSON endpoints while the backend keeps the pending secret server-side.
- The component fetches enrollment data, renders QRCodeCanvas from qrCodeUri, and shows account/manual key.
- The submit handler posts deviceName and code, not the secret.
- On success the UI switches to an MFA enabled/completed state.
- Cookie-auth React apps need credentials: include.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| React uses JSON endpoints while the backend keeps the pending secret server-side. | S-056, S-073, S-076, S-078, S-080, S-082, S-084 | medium-high |
| The component fetches enrollment data, renders QRCodeCanvas from qrCodeUri, and shows account/manual key. | S-056, S-073, S-076, S-078, S-080, S-082, S-084 | medium-high |
| The submit handler posts deviceName and code, not the secret. | S-056, S-073, S-076, S-078, S-080, S-082, S-084 | medium-high |
| On success the UI switches to an MFA enabled/completed state. | S-056, S-073, S-076, S-078, S-080, S-082, S-084 | medium-high |
| Cookie-auth React apps need credentials: include. | S-056, S-073, S-076, S-078, S-080, S-082, S-084 | medium-high |

---

## 5. Open review issues

- This file is valid for MFA Stage2 because every included source has visible text and no OCR-placeholder processed source.
- Stage2 closes the remaining transcript work; run MFA closure audit next.
- If a later review needs exact punctuation/code cleanup, patch individual sources.
