# MFA-R04 - otpauth URI / QR / manual key

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
This file processes `6` sources for `MFA-R04`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage1 review/commit, process MFA Stage2 R05 + R06 + R07.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Building otpauth URI, issuer/account encoding, QR/manual setup key, why 64 bytes for 16 alphabet chars, and BitConverter details.
```

Key ideas:

- The otpauth URI is built from issuer, account, secret, and encoded label/query parameters.
- Issuer/account values need URL encoding because labels often include email/user data.
- Manual setup key and QR represent the same secret provisioning payload.
- The course-style generator uses 64 random bytes for a 16-character secret because each character consumes four bytes.
- BitConverter.ToUInt32 reads four bytes starting at an offset and converts them into an unsigned integer.

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
S-048, S-049, S-050, S-051, S-052, S-053
```

Boundary decision:
```text
Included in MFA-R04 after Stage1 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-048 | IU-048 | `1f864166f4` | `MFA-R04` | `verified-visible-ocr-assisted` | Build the otpauth URI |
| S-049 | IU-049 | `67413bcad1` | `MFA-R04` | `verified-visible-ocr-assisted` | Why 64 bytes? |
| S-050 | IU-050 | `ef3ce43858` | `MFA-R04` | `verified-visible-ocr-assisted` | 2) Loop “one character at a time” |
| S-051 | IU-051 | `ae61d75d45` | `MFA-R04` | `verified-visible-ocr-assisted` | 3) BuildotpAuthUri screenshot: what WebUtility / WebUtils is doing |
| S-052 | IU-052 | `a23deb8e93` | `MFA-R04` | `verified-visible-ocr-assisted` | 3) How do 4 bytes become a random number? |
| S-053 | IU-053 | `6a7d386cbf` | `MFA-R04` | `verified-visible-ocr-assisted` | This is important because the label part of otpauth includes: |

---

## 2. Source transcript

### S-048 - Build the otpauth URI

Metadata:
```text
source_id: S-048
image_use_id: IU-048
fileId_short: 1f864166f4
image_file: S-048__1f864166f4.png
stage0_group: MFA-R04
stage1_region: MFA-R04
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Build the otpauth URI
o cH (ay
public static string BuildOtpAuthUri(string issuer, string account, string secret)
{
// Important: URL encode issuer & label pieces
var encIssuer = WebUtility.UrlEncode(issuer);
var encAccount = WebUtilityUrlEncode(account) ;
return $"otpauth: //totp/{encIssuer}: {encAccount}?issuer={encIssuer}&secret={secret}";
+
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-049 - Why 64 bytes?

Metadata:
```text
source_id: S-049
image_use_id: IU-049
fileId_short: 67413bcad1
image_file: S-049__67413bcad1.png
stage0_group: MFA-R04
stage1_region: MFA-R04
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Why 64 bytes?
* Because you want 16 characters
* and for each character you consume 4 bytes
* 16 x 4= 64 bytes
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-050 - 2) Loop “one character at a time”

Metadata:
```text
source_id: S-050
image_use_id: IU-050
fileId_short: ef3ce43858
image_file: S-050__ef3ce43858.png
stage0_group: MFA-R04
stage1_region: MFA-R04
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
2) Loop “one character at a time”
o cH (ay
for (int i = 0; i < 16; i++)
{
uint rnd = BitConverter.ToUInt32(tokenData, i * 4);
+
This means:
* i=0-startIndex = 0
* i=1-startIndex = 4
* i=2-—startIndex = 8
* i= 15 — startindex = 60
So yes: you take 4 bytes at a time, sequentially. v
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-051 - 3) BuildotpAuthUri screenshot: what WebUtility / WebUtils is doing

Metadata:
```text
source_id: S-051
image_use_id: IU-051
fileId_short: ae61d75d45
image_file: S-051__ae61d75d45.png
stage0_group: MFA-R04
stage1_region: MFA-R04
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
3) BuildotpAuthUri screenshot: what WebUtility / WebUtils is doing
Your screenshot shows something like:
wo CH ia’)
var i = WebUtility-UrlEncode(issuer);
var a = WebUtility.UrlEncode(account) ;
return $"otpauth: //totp/{i}:{a}?secret={base32Secret }&issuer={i}"5
What Webutility.Urlencode does
It URL-encodes text so it is safe inside a URL.
Example:
* space “My App" becomes “My+App" (or %20 depending on encoder)
* @ inanemail becomes %40
* = becomes %3A, etc.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-052 - 3) How do 4 bytes become a random number?

Metadata:
```text
source_id: S-052
image_use_id: IU-052
fileId_short: a23deb8e93
image_file: S-052__a23deb8e93.png
stage0_group: MFA-R04
stage1_region: MFA-R04
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
3) How do 4 bytes become a random number?
BitConverter.ToUInt32(tokenData, startIndex) does:
* reads 4 bytes starting at startIndex
* interprets them as a 32-bit unsigned integer
Example for i = 0
Bytes used:
tokenData[@], tokenData[1], tokenData[2], tokenData[3] ia)
= Al, 3F, 00, 7C (hex)
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-053 - This is important because the label part of otpauth includes:

Metadata:
```text
source_id: S-053
image_use_id: IU-053
fileId_short: 6a7d386cbf
image_file: S-053__6a7d386cbf.png
stage0_group: MFA-R04
stage1_region: MFA-R04
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
This is important because the label part of otpauth includes:
© issuer:account
and account is often an email, which contains special characters.
So why do it here?
Because your otpauth string is essentially a URL.
If you don't encode, some values can break parsing in QR scanners / apps.
WebUtility vs WebUtils
© WebUtility is the .NET class in System.Net .
* Some projects also use WebUtility indirectly or use WebUtilities (plural) from ASP.NET Core
packages.
* Conceptually, the job is the same: encode text for use in URLs.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- The otpauth URI is built from issuer, account, secret, and encoded label/query parameters.
- Issuer/account values need URL encoding because labels often include email/user data.
- Manual setup key and QR represent the same secret provisioning payload.
- The course-style generator uses 64 random bytes for a 16-character secret because each character consumes four bytes.
- BitConverter.ToUInt32 reads four bytes starting at an offset and converts them into an unsigned integer.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| BuildOtpAuthUri helper is shown. | S-048, S-051, S-053 | high |
| 64 bytes / 16 characters / 4 bytes per character is explained. | S-049, S-050, S-052 | high |

---

## 5. Open review issues

- This file is valid for MFA Stage1 because every included source has visible text and no OCR-placeholder processed source.
- Remaining MFA Stage0 groups are not closed by this file: R05/R06/R07.
- MFA closure audit must run after Stage2 is complete.
