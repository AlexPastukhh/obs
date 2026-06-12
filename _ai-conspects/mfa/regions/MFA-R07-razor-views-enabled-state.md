# MFA-R07 - Razor views / QR script / enabled state

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
This file processes `9` sources for `MFA-R07`.

Why:
The cards were manually visually rechecked before marking processed.

Next:
After Stage2 review/commit, run MFA closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Razor view implementation: Enroll.cshtml, antiforgery/form fields, manual key display, QR JavaScript rendering, validation scripts, and EnrollSuccess view.
```

Key ideas:

- The Razor Enroll view renders QR setup, manual key/account details, device name, and 6-digit code fields.
- The form uses POST, antiforgery token, validation messages, and validation summary.
- Client-side QR rendering reads the hidden otpauth URI and creates a QR code in the page.
- EnrollSuccess confirms MFA is enabled and links back to the app.
- The script section belongs in the layout scripts area and should load the QR library before rendering.

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
S-081, S-083, S-085, S-086, S-087, S-088, S-089, S-090, S-091
```

Stage2 local boundary correction:
```text
S-081: Stage0 MFA-R06 -> Stage2 MFA-R07
S-083: Stage0 MFA-R06 -> Stage2 MFA-R07
```

Boundary decision:
```text
Included in MFA-R07 after Stage2 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-081 | IU-081 | `afdcc99848` | `MFA-R06` | `verified-visible-manual-read` | Razor Views section. |
| S-083 | IU-083 | `1071957d42` | `MFA-R06` | `verified-visible-manual-read` | Razor manual key / account block. |
| S-085 | IU-085 | `f4afe1cf3a` | `MFA-R07` | `verified-visible-manual-read` | Razor enroll form. |
| S-086 | IU-086 | `f4afe1cf3a` | `MFA-R07` | `verified-visible-manual-read` | Razor enroll form duplicate/continuation. |
| S-087 | IU-087 | `ba98b379a7` | `MFA-R07` | `verified-visible-manual-read` | Razor scripts section for client-side QR rendering. |
| S-088 | IU-088 | `52e0b7d435` | `MFA-R07` | `verified-visible-manual-read` | Script tag explanation: QR rendering. |
| S-089 | IU-089 | `cefa69eacb` | `MFA-R07` | `verified-visible-manual-read` | Enroll success Razor view. |
| S-090 | IU-090 | `c2132aa91d` | `MFA-R07` | `verified-visible-manual-read` | Line-by-line meaning of the Scripts section. |
| S-091 | IU-091 | `861eac0d3e` | `MFA-R07` | `verified-visible-manual-read` | QR rendering line-by-line. |

---

## 2. Source transcript

### S-081 - Razor Views section.

Metadata:
```text
source_id: S-081
image_use_id: IU-081
fileId_short: afdcc99848
image_file: S-081__afdcc99848.png
stage0_group: MFA-R06
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Razor Views section.

Views/Mfa/Enroll.cshtml starts with model and title:
@model MfaEnrollGetVm
ViewData["Title"] = "Enable MFA";

The page shows:
- Enable MFA heading;
- instruction to scan QR or enter 6-digit code;
- a QR container that will be filled by JavaScript using Model.QrCodeUri.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-083 - Razor manual key / account block.

Metadata:
```text
source_id: S-083
image_use_id: IU-083
fileId_short: 1071957d42
image_file: S-083__1071957d42.png
stage0_group: MFA-R06
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Razor manual key / account block.

Shows manual setup information:
- "Manually copy key" / "add this key into the authenticator app";
- shows @Model.ManualKey;
- shows Issuer and Account from the model;
- then continues into the form section.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-085 - Razor enroll form.

Metadata:
```text
source_id: S-085
image_use_id: IU-085
fileId_short: f4afe1cf3a
image_file: S-085__f4afe1cf3a.png
stage0_group: MFA-R07
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Razor enroll form.

<form asp-action="Enroll" method="post">
@Html.AntiForgeryToken()

Fields:
- Device name input with default "My phone";
- 6-digit code input named Code;
- validation message for Code;
- submit button "Verify & Enable";
- validation summary.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-086 - Razor enroll form duplicate/continuation.

Metadata:
```text
source_id: S-086
image_use_id: IU-086
fileId_short: f4afe1cf3a
image_file: S-086__f4afe1cf3a.png
stage0_group: MFA-R07
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Razor enroll form duplicate/continuation.

Same visible form as S-085:
- POST to Enroll;
- antiforgery token;
- DeviceName input;
- Code input with autocomplete one-time-code;
- validation message;
- submit button;
- validation summary.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-087 - Razor scripts section for client-side QR rendering.

Metadata:
```text
source_id: S-087
image_use_id: IU-087
fileId_short: ba98b379a7
image_file: S-087__ba98b379a7.png
stage0_group: MFA-R07
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Razor scripts section for client-side QR rendering.

@section Scripts includes:
- script src="~/js/qrcode.min.js";
- function that reads qrCodeUri and qrCode elements;
- clears existing content;
- creates new QRCode(el, { text: uri, width: 160, height: 160 });
- partial ValidationScriptsPartial.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-088 - Script tag explanation: QR rendering.

Metadata:
```text
source_id: S-088
image_use_id: IU-088
fileId_short: 52e0b7d435
image_file: S-088__52e0b7d435.png
stage0_group: MFA-R07
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Script tag explanation: QR rendering.

Razor view snippet:
@section Scripts {
  <script src="~/js/qrcode.min.js"></script>
  <script>
    (function () {
      const uri = document.getElementById("qrCodeUri").value;
      const el = document.getElementById("qrCode");
      el.innerHTML = "";
      new QRCode(el, { text: uri, width: 160, height: 160 });
    })();
  </script>
}
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-089 - Enroll success Razor view.

Metadata:
```text
source_id: S-089
image_use_id: IU-089
fileId_short: cefa69eacb
image_file: S-089__cefa69eacb.png
stage0_group: MFA-R07
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Enroll success Razor view.

Views/Mfa/EnrollSuccess.cshtml:

@{
    ViewData["Title"] = "MFA Enabled";
}

<h2>MFA Enabled</h2>
<p>Your authenticator device is now linked.</p>
<a asp-controller="Home" asp-action="Index">Continue</a>
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-090 - Line-by-line meaning of the Scripts section.

Metadata:
```text
source_id: S-090
image_use_id: IU-090
fileId_short: c2132aa91d
image_file: S-090__c2132aa91d.png
stage0_group: MFA-R07
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Line-by-line meaning of the Scripts section.

- @section Scripts adds view scripts to a layout-defined scripts section.
- <script src="~/js/qrcode.min.js"> loads the QR library.
- The IIFE runs immediately without polluting globals.
- document.getElementById("qrCodeUri").value reads the otpauth URI from a hidden input.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-091 - QR rendering line-by-line.

Metadata:
```text
source_id: S-091
image_use_id: IU-091
fileId_short: 861eac0d3e
image_file: S-091__861eac0d3e.png
stage0_group: MFA-R07
stage2_region: MFA-R07
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
QR rendering line-by-line.

- const el = document.getElementById("qrCode") gets the container div.
- el.innerHTML = "" clears any existing QR code.
- new QRCode(el, { text: uri, width: 160, height: 160 }) creates the QR code.
- Why render on the client:
  - easy, no server-side image generation required;
  - server outputs only the URI, browser draws the QR.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- The Razor Enroll view renders QR setup, manual key/account details, device name, and 6-digit code fields.
- The form uses POST, antiforgery token, validation messages, and validation summary.
- Client-side QR rendering reads the hidden otpauth URI and creates a QR code in the page.
- EnrollSuccess confirms MFA is enabled and links back to the app.
- The script section belongs in the layout scripts area and should load the QR library before rendering.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| The Razor Enroll view renders QR setup, manual key/account details, device name, and 6-digit code fields. | S-081, S-083, S-085, S-086, S-087, S-088, S-089, S-090, S-091 | medium-high |
| The form uses POST, antiforgery token, validation messages, and validation summary. | S-081, S-083, S-085, S-086, S-087, S-088, S-089, S-090, S-091 | medium-high |
| Client-side QR rendering reads the hidden otpauth URI and creates a QR code in the page. | S-081, S-083, S-085, S-086, S-087, S-088, S-089, S-090, S-091 | medium-high |
| EnrollSuccess confirms MFA is enabled and links back to the app. | S-081, S-083, S-085, S-086, S-087, S-088, S-089, S-090, S-091 | medium-high |
| The script section belongs in the layout scripts area and should load the QR library before rendering. | S-081, S-083, S-085, S-086, S-087, S-088, S-089, S-090, S-091 | medium-high |

---

## 5. Open review issues

- This file is valid for MFA Stage2 because every included source has visible text and no OCR-placeholder processed source.
- Stage2 closes the remaining transcript work; run MFA closure audit next.
- If a later review needs exact punctuation/code cleanup, patch individual sources.
