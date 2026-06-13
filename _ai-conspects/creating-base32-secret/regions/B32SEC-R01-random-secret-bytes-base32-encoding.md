# Creating Base32 Secret - random bytes / Base32 secret encoding

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
This file processes `17` sources for `B32SEC-R01`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, run closure audit for the three-small-conspects batch.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.
```

Key ideas:

- Generate secret material from a cryptographic RNG, not Random or predictable input.
- For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
- Base32 maps binary bytes to an A-Z/2-7 style text alphabet suitable for manual entry/QR provisioning.
- Keep raw bytes and Base32 text conversion clearly separated.
- Normalize/copy/store the Base32 secret consistently and avoid leaking it in logs.
- Modulo-based character selection can introduce bias; byte-to-Base32 encoding is preferable for real secrets.

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
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-018
```

Boundary decision:
```text
Included in B32SEC-R01 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Visible theme anchor |
|---|---|---|---|---|---|
| S-001 | IU-001 | `e372e25659` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | using System.Security.Cryptography; |
| S-002 | IU-002 | `af235edcff` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | using System.Security.Cryptography; |
| S-003 | IU-003 | `6a38860e29` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | using System.Security.Cryptography; |
| S-004 | IU-004 | `63646802a6` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | using System.Security.Cryptography; |
| S-005 | IU-005 | `3e32384479` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | creating base32 secret |
| S-006 | IU-006 | `d143beb145` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | } |
| S-007 | IU-007 | `2deb847856` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | } |
| S-008 | IU-008 | `2a85d9c8eb` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | creating base32 secret |
| S-009 | IU-009 | `bb7d428777` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | using System.Security.Cryptography; |
| S-010 | IU-010 | `e72b9df5c9` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | creating base32 secret |
| S-011 | IU-011 | `c0f0d81876` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | entropy, bitconverter unsigned int |
| S-012 | IU-012 | `fca73d7345` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | entropy, bitconverter unsigned int |
| S-013 | IU-013 | `d5a1cc3f1a` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | } |
| S-014 | IU-014 | `0930efc45e` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | entropy, bitconverter unsigned int |
| S-015 | IU-015 | `28ea1c0d03` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | why 5 bits for one base 32 |
| S-016 | IU-016 | `8abb3ea9b6` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | } |
| S-018 | IU-018 | `445c351263` | `B32SEC-R01-random-secret-bytes-base32-encoding` | `verified-visible-semantic-transcript` | entropy, bitconverter unsigned int |

---

## 2. Source-level transcript

### S-001 - using System.Security.Cryptography;

Metadata:
```text
source_id: S-001
image_use_id: IU-001
fileId_short: e372e25659
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
using System.Security.Cryptography;

Visible source anchors:
- using System.Security.Cryptography;
- using OtpNet;
- public static class TotpSecretBytes
- {
- public static byte[] CreateSecretBytes(int byteLength = 20)
- => RandomNumberGenerator.GetBytes(byteLength);
- explaining bits, bytes in base32
- public static string ToBase32(byte[] secretBytes)
- => Base32Encoding.ToString(secretBytes);
- }

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-002 - using System.Security.Cryptography;

Metadata:
```text
source_id: S-002
image_use_id: IU-002
fileId_short: af235edcff
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
using System.Security.Cryptography;

Visible source anchors:
- using System.Security.Cryptography;
- using OtpNet;
- public static class TotpSecret
- {
- // 20 bytes = 160 bits (common standard; plenty for TOTP)
- public static string CreateBase32Secret(int byteLength = 20)
- byte[] secretBytes = RandomNumberGenerator.GetBytes(byteLength);
- return Base32Encoding.ToString(secretBytes); // Base32 text for QR/manual entry
- }

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-003 - using System.Security.Cryptography;

Metadata:
```text
source_id: S-003
image_use_id: IU-003
fileId_short: 6a38860e29
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
using System.Security.Cryptography;

Visible source anchors:
- using System.Security.Cryptography;
- using OtpNet;
- public static class TotpSecretBytes
- {
- public static byte[] CreateSecretBytes(int byteLength = 20)
- => RandomNumberGenerator.GetBytes(byteLength);
- public static string ToBase32(byte[] secretBytes)
- => Base32Encoding.ToString(secretBytes);
- }
- explaining bits, bytes in base32

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-004 - using System.Security.Cryptography;

Metadata:
```text
source_id: S-004
image_use_id: IU-004
fileId_short: 63646802a6
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
using System.Security.Cryptography;

Visible source anchors:
- using System.Security.Cryptography;
- using OtpNet;
- public static class TotpSecretBytes
- {
- public static byte[] CreateSecretBytes(int byteLength = 20)
- => RandomNumberGenerator.GetBytes(byteLength);
- public static string ToBase32(byte[] secretBytes)
- => Base32Encoding.ToString(secretBytes);
- }
- public static class TotpSecret

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-005 - creating base32 secret

Metadata:
```text
source_id: S-005
image_use_id: IU-005
fileId_short: 3e32384479
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
creating base32 secret

Visible source anchors:
- creating base32 secret
- explaining bits, bytes in base32
- using OtpNet;
- public static class TotpSecretBytes
- using System.Security.Cryptography;
- {
- public static byte[] CreateSecretBytes(int byteLength = 20)
- => RandomNumberGenerator.GetBytes(byteLength);
- public static string ToBase32(byte[] secretBytes)
- => Base32Encoding.ToString(secretBytes);

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-006 - }

Metadata:
```text
source_id: S-006
image_use_id: IU-006
fileId_short: d143beb145
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return Base32Encoding.ToString(secretBytes); // Base32 text for QR/manual entry
- byte[] secretBytes = RandomNumberGenerator.GetBytes(byteLength);
- {
- public static string CreateBase32Secret(int byteLength = 20)
- // 20 bytes = 160 bits (common standard; plenty for TOTP)
- public static class TotpSecret
- using OtpNet;
- using System.Security.Cryptography;
- entropy, bitconverter unsigned int

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-007 - }

Metadata:
```text
source_id: S-007
image_use_id: IU-007
fileId_short: 2deb847856
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- => Base32Encoding.ToString(secretBytes);
- using System.Security.Cryptography;
- public static string ToBase32(byte[] secretBytes)
- using System.Text;
- => RandomNumberGenerator.GetBytes(byteLength);
- public static class TotpSecretCourseStyle
- public static byte[] CreateSecretBytes(int byteLength = 20)
- {
- // Base32 alphabet (classic): A-Z and 2-7

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-008 - creating base32 secret

Metadata:
```text
source_id: S-008
image_use_id: IU-008
fileId_short: 2a85d9c8eb
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
creating base32 secret

Visible source anchors:
- creating base32 secret
- }
- => Base32Encoding.ToString(secretBytes);
- public static string ToBase32(byte[] secretBytes)
- explaining bits, bytes in base32
- => RandomNumberGenerator.GetBytes(byteLength);
- public static byte[] CreateSecretBytes(int byteLength = 20)
- {
- public static class TotpSecretBytes
- using OtpNet;

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-009 - using System.Security.Cryptography;

Metadata:
```text
source_id: S-009
image_use_id: IU-009
fileId_short: bb7d428777
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
using System.Security.Cryptography;

Visible source anchors:
- using System.Security.Cryptography;
- using System.Text;
- public static class TotpSecretCourseStyle
- {
- // Base32 alphabet (classic): A-Z and 2-7
- private static readonly char[] Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".ToCharArray();
- public static string CreateSecret(int length = 16)
- // Generate plenty of random bytes so every character pick is random
- byte[] random = RandomNumberGenerator.GetBytes(length * 4);
- var sb = new StringBuilder(length);

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-010 - creating base32 secret

Metadata:
```text
source_id: S-010
image_use_id: IU-010
fileId_short: e72b9df5c9
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
creating base32 secret

Visible source anchors:
- creating base32 secret
- why 5 bits for one base 32
- }
- => Base32Encoding.ToString(secretBytes);
- public static string ToBase32(byte[] secretBytes)
- explaining bits, bytes in base32
- => RandomNumberGenerator.GetBytes(byteLength);
- public static byte[] CreateSecretBytes(int byteLength = 20)
- {
- public static class TotpSecretBytes

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-011 - entropy, bitconverter unsigned int

Metadata:
```text
source_id: S-011
image_use_id: IU-011
fileId_short: c0f0d81876
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
entropy, bitconverter unsigned int

Visible source anchors:
- entropy, bitconverter unsigned int
- }
- using System.Security.Cryptography;
- using System.Text;
- return Base32Encoding.ToString(secretBytes); // Base32 text for QR/manual entry
- byte[] secretBytes = RandomNumberGenerator.GetBytes(byteLength);
- public static class TotpSecretCourseStyle
- {
- public static string CreateBase32Secret(int byteLength = 20)
- // Base32 alphabet (classic): A-Z and 2-7

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-012 - entropy, bitconverter unsigned int

Metadata:
```text
source_id: S-012
image_use_id: IU-012
fileId_short: fca73d7345
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
entropy, bitconverter unsigned int

Visible source anchors:
- entropy, bitconverter unsigned int
- uint val = BitConverter.ToUInt32(random, i * 4);
- // Read 4 bytes as an unsigned int (0..2^32-1)
- // Convert to an index inside Alphabet
- {
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);
- for (int i = 0; i < length; i++)
- }
- var sb = new StringBuilder(length);
- return sb.ToString();

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-013 - }

Metadata:
```text
source_id: S-013
image_use_id: IU-013
fileId_short: d5a1cc3f1a
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);
- // Convert to an index inside Alphabet
- uint val = BitConverter.ToUInt32(random, i * 4);
- // Read 4 bytes as an unsigned int (0..2^32-1)
- {
- for (int i = 0; i < length; i++)
- var sb = new StringBuilder(length);
- byte[] random = RandomNumberGenerator.GetBytes(length * 4);

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-014 - entropy, bitconverter unsigned int

Metadata:
```text
source_id: S-014
image_use_id: IU-014
fileId_short: 0930efc45e
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
entropy, bitconverter unsigned int

Visible source anchors:
- entropy, bitconverter unsigned int
- }
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);
- // Convert to an index inside Alphabet
- uint val = BitConverter.ToUInt32(random, i * 4);
- // Read 4 bytes as an unsigned int (0..2^32-1)
- {
- for (int i = 0; i < length; i++)
- var sb = new StringBuilder(length);

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-015 - why 5 bits for one base 32

Metadata:
```text
source_id: S-015
image_use_id: IU-015
fileId_short: 28ea1c0d03
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
why 5 bits for one base 32

Visible source anchors:
- why 5 bits for one base 32
- }
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);
- // Convert to an index inside Alphabet
- uint val = BitConverter.ToUInt32(random, i * 4);
- // Read 4 bytes as an unsigned int (0..2^32-1)
- {
- for (int i = 0; i < length; i++)
- using System.Net;

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-016 - }

Metadata:
```text
source_id: S-016
image_use_id: IU-016
fileId_short: 8abb3ea9b6
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
}

Visible source anchors:
- }
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);
- // Convert to an index inside Alphabet
- uint val = BitConverter.ToUInt32(random, i * 4);
- // Read 4 bytes as an unsigned int (0..2^32-1)
- {
- for (int i = 0; i < length; i++)
- var sb = new StringBuilder(length);
- using System.Net;

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-018 - entropy, bitconverter unsigned int

Metadata:
```text
source_id: S-018
image_use_id: IU-018
fileId_short: 445c351263
stage0_group: B32SEC-R01-random-secret-bytes-base32-encoding
stage1_region: B32SEC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
entropy, bitconverter unsigned int

Visible source anchors:
- entropy, bitconverter unsigned int
- }
- return sb.ToString();
- sb.Append(Alphabet[val % (uint)Alphabet.Length]);
- // Convert to an index inside Alphabet
- using System.Net;
- uint val = BitConverter.ToUInt32(random, i * 4);
- // Read 4 bytes as an unsigned int (0..2^32-1)
- public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- {

Semantic transcript:
This source belongs to `B32SEC-R01` / random bytes / Base32 secret encoding. It is part of the `Creating Base32 Secret` conspect and supports this region meaning:

Creating a Base32 secret: cryptographically random bytes, Base32 encoding alphabet, no padding/normalization, storage, and display/copy rules.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Generate secret material from a cryptographic RNG, not Random or predictable input.
For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

## 3. Cleaned source notes

- Generate secret material from a cryptographic RNG, not Random or predictable input.
- For TOTP a common secret length is 20 bytes / 160 bits, then encoded as Base32.
- Base32 maps binary bytes to an A-Z/2-7 style text alphabet suitable for manual entry/QR provisioning.
- Keep raw bytes and Base32 text conversion clearly separated.
- Normalize/copy/store the Base32 secret consistently and avoid leaking it in logs.
- Modulo-based character selection can introduce bias; byte-to-Base32 encoding is preferable for real secrets.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit for this 3-conspect batch.
