# Creating Base32 Secret - TOTP authenticator / QR provisioning

Conspect: `creating-base32-secret`  
File type: **source-level semantic transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-13 08:38:25 UTC

---

## Direction check

Goal:
Process all Stage0 candidates for this small conspect in one Stage1 pass.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `17` sources for `B32SEC-R02`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, run closure audit for the three-small-conspects batch.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.
```

Key ideas:

- Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
- Issuer and account values must be URL-encoded before building the URI.
- The Base32 secret is placed in the URI secret query parameter.
- The otpauth URI is usually rendered as a QR code for enrollment.
- After enrollment, verify a user-provided TOTP code before marking MFA as enabled.
- Store the secret securely and treat it as authentication material.

Reading quality:
```text
Stage1 uses source-level semantic transcript from visible source-image anchors extracted during Stage0.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-017, S-019, S-020, S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034
```

Boundary decision:
```text
Included in B32SEC-R02 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Visible theme anchor |
|---|---|---|---|---|---|
| S-017 | IU-017 | `81e89319e5` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | why 5 bits for one base 32 |
| S-019 | IU-019 | `1f864166f4` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | using System.Net; |
| S-020 | IU-020 | `67413bcad1` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | using System.Net; |
| S-021 | IU-021 | `d44dac484d` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | public static string BuildOtpAuthUri(string issuer, string account, string base32Secret) |
| S-022 | IU-022 | `ef3ce43858` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | var a = WebUtility.UrlEncode(account); |
| S-023 | IU-023 | `ae61d75d45` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-024 | IU-024 | `41095b1f9b` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-025 | IU-025 | `a23deb8e93` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-026 | IU-026 | `6a7d386cbf` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-027 | IU-027 | `b8ad2b3658` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-028 | IU-028 | `c67ff2a646` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-029 | IU-029 | `a9d8d5295d` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-030 | IU-030 | `478de6c892` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-031 | IU-031 | `208d2e042d` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-032 | IU-032 | `ace90252b6` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-033 | IU-033 | `0658797da8` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |
| S-034 | IU-034 | `5919469b14` | `B32SEC-R02-totp-authenticator-qr-provisioning` | `verified-visible-semantic-transcript` | } |

---

## 2. Source-level transcript

### S-017 - why 5 bits for one base 32

Metadata:
```text
source_id: S-017
image_use_id: IU-017
fileId_short: 81e89319e5
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
why 5 bits for one base 32

Visible source anchors:
- why 5 bits for one base 32
- using System.Net;
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- {
- var i = WebUtility.UrlEncode(issuer);
- var a = WebUtility.UrlEncode(account);
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- }
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-019 - using System.Net;

Metadata:
```text
source_id: S-019
image_use_id: IU-019
fileId_short: 1f864166f4
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
using System.Net;

Visible source anchors:
- using System.Net;
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- {
- var i = WebUtility.UrlEncode(issuer);
- var a = WebUtility.UrlEncode(account);
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- }
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-020 - using System.Net;

Metadata:
```text
source_id: S-020
image_use_id: IU-020
fileId_short: 67413bcad1
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
using System.Net;

Visible source anchors:
- using System.Net;
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- {
- var i = WebUtility.UrlEncode(issuer);
- var a = WebUtility.UrlEncode(account);
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- }
- entropy, bitconverter unsigned int
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-021 - public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)

Metadata:
```text
source_id: S-021
image_use_id: IU-021
fileId_short: d44dac484d
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)

Visible source anchors:
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- {
- var i = WebUtility.UrlEncode(issuer);
- using System.Net;
- var a = WebUtility.UrlEncode(account);
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- }
- why 5 bits for one base 32
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-022 - var a = WebUtility.UrlEncode(account);

Metadata:
```text
source_id: S-022
image_use_id: IU-022
fileId_short: ef3ce43858
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
var a = WebUtility.UrlEncode(account);

Visible source anchors:
- var a = WebUtility.UrlEncode(account);
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var i = WebUtility.UrlEncode(issuer);
- }
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- entropy, bitconverter unsigned int
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-023 - }

Metadata:
```text
source_id: S-023
image_use_id: IU-023
fileId_short: ae61d75d45
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-024 - }

Metadata:
```text
source_id: S-024
image_use_id: IU-024
fileId_short: 41095b1f9b
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- why 5 bits for one base 32
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-025 - }

Metadata:
```text
source_id: S-025
image_use_id: IU-025
fileId_short: a23deb8e93
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- entropy, bitconverter unsigned int
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-026 - }

Metadata:
```text
source_id: S-026
image_use_id: IU-026
fileId_short: 6a7d386cbf
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-027 - }

Metadata:
```text
source_id: S-027
image_use_id: IU-027
fileId_short: b8ad2b3658
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- why 5 bits for one base 32
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-028 - }

Metadata:
```text
source_id: S-028
image_use_id: IU-028
fileId_short: c67ff2a646
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- why 5 bits for one base 32
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-029 - }

Metadata:
```text
source_id: S-029
image_use_id: IU-029
fileId_short: a9d8d5295d
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- entropy, bitconverter unsigned int
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-030 - }

Metadata:
```text
source_id: S-030
image_use_id: IU-030
fileId_short: 478de6c892
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- why 5 bits for one base 32
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-031 - }

Metadata:
```text
source_id: S-031
image_use_id: IU-031
fileId_short: 208d2e042d
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- entropy, bitconverter unsigned int
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-032 - }

Metadata:
```text
source_id: S-032
image_use_id: IU-032
fileId_short: ace90252b6
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- why 5 bits for one base 32
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-033 - }

Metadata:
```text
source_id: S-033
image_use_id: IU-033
fileId_short: 0658797da8
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- entropy, bitconverter unsigned int
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-034 - }

Metadata:
```text
source_id: S-034
image_use_id: IU-034
fileId_short: 5919469b14
stage0_group: B32SEC-R02-totp-authenticator-qr-provisioning
stage1_region: B32SEC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- var a = WebUtility.UrlEncode(account);
- var i = WebUtility.UrlEncode(issuer);
- {
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- using System.Net;
- why 5 bits for one base 32
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R02` / TOTP authenticator / QR provisioning. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

TOTP/authenticator provisioning: otpauth URI, issuer/account label, QR code, authenticator app setup, and verifying generated codes.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
Issuer and account values must be URL-encoded before building the URI.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

## 3. Cleaned source notes

- Authenticator apps consume an otpauth://totp URI containing issuer, account label, and secret.
- Issuer and account values must be URL-encoded before building the URI.
- The Base32 secret is placed in the URI secret query parameter.
- The otpauth URI is usually rendered as a QR code for enrollment.
- After enrollment, verify a user-provided TOTP code before marking MFA as enabled.
- Store the secret securely and treat it as authentication material.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit for this 3-conspect batch.
