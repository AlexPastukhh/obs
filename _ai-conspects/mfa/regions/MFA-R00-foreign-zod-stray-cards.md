# MFA-R00 - Foreign / stray Zod cards

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
This file processes `2` sources for `MFA-R00`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage1 review/commit, process MFA Stage2 R05 + R06 + R07.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Non-MFA stray cards embedded in mfa.svg: Zod union/discriminated-union error examples. Accounted for so no source image is lost.
```

Key ideas:

- These two cards are visibly not MFA/TOTP content.
- They describe Zod union/discriminatedUnion error behavior.
- They are preserved as foreign/stray cards instead of being silently dropped.
- They should not be used as MFA source-of-truth.

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
S-001, S-004
```

Stage1 local boundary correction:
```text
S-001: Stage0 MFA-R02 -> Stage1 MFA-R00
S-004: Stage0 MFA-R02 -> Stage1 MFA-R00
```

Boundary decision:
```text
Included in MFA-R00 after Stage1 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-001 | IU-001 | `85d11c0ea2` | `MFA-R02` | `verified-visible-ocr-assisted` | 2) union error (tries both, then reports union failure) |
| S-004 | IU-004 | `ca9f8fd4bc` | `MFA-R02` | `verified-visible-ocr-assisted` | Again: discriminated union gives one clean error (“type invalid”), union gives a bundle of errors from each |

---

## 2. Source transcript

### S-001 - 2) union error (tries both, then reports union failure)

Metadata:
```text
source_id: S-001
image_use_id: IU-001
fileId_short: 85d11c0ea2
image_file: S-001__85d11c0ea2.png
stage0_group: MFA-R02
stage1_region: MFA-R00
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
2) union error (tries both, then reports union failure)
<“) TypeScript O
ShapeUnion. safeParse(badType) .error.issues
Typical:
«) JavaScript a.)
[
{
code: “invalid_union",
path: [],
message: “Invalid input",
unionErrors: [
// Circle branch fails because type isn't “circle”
ZodError([{ code: “invalid literal", path: ["type"], --- }]),
// Square branch fails because type isn't “square” and missing size, etc.
ZodError([{ code: “invalid_literal", path: ["type"], --- }, { ---maybe size... }]),
]
+
] v
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-004 - Again: discriminated union gives one clean error (“type invalid”), union gives a bundle of errors from each

Metadata:
```text
source_id: S-004
image_use_id: IU-004
fileId_short: ca9f8fd4bc
image_file: S-004__ca9f8fd4bc.png
stage0_group: MFA-R02
stage1_region: MFA-R00
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Again: discriminated union gives one clean error (“type invalid”), union gives a bundle of errors from each
attempt.
One-line takeaway
© discriminatedUnion errors usually point to the one correct branch (or the discriminator itself).
© union errors often bundle multiple branch failures under invalid_union , which is noisier and harder
to map to fields.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- These two cards are visibly not MFA/TOTP content.
- They describe Zod union/discriminatedUnion error behavior.
- They are preserved as foreign/stray cards instead of being silently dropped.
- They should not be used as MFA source-of-truth.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| S-001 is a Zod union error card, not MFA. | S-001 | high |
| S-004 is a discriminatedUnion vs union takeaway card, not MFA. | S-004 | high |

---

## 5. Open review issues

- This file is valid for MFA Stage1 because every included source has visible text and no OCR-placeholder processed source.
- Remaining MFA Stage0 groups are not closed by this file: R05/R06/R07.
- MFA closure audit must run after Stage2 is complete.
