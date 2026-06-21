# ENC-R03 - Encoder / TryGetBytes / output buffers

Conspect: `encoding-utf8-chunk-processing`  
File type: **source-level semantic transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-13 06:08:50 UTC

---

## Direction check

Goal:
Start real Encoding UTF8 Chunk transcript after Stage0 boundary review.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `4` sources for `ENC-R03`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, process Stage2 ENC-R02 Decoder chunk processing.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Encoder side: Encoding.GetEncoder, Encoder.GetByteCount, Encoder.TryGetBytes, output buffers that may be too small, flush/fallback behavior, and chunked text-to-bytes encoding.
```

Key ideas:

- If the exact byte count is unknown but the full text is available, call GetByteCount first and allocate exactly.
- TryGetBytes writes into a destination span and reports whether the destination was large enough.
- When the destination buffer may be too small, either retry with a larger buffer or use a stateful Encoder loop.
- Encoder preserves state across calls, which matters when characters may be split across chunks.
- Fallback behavior controls whether invalid input becomes replacement output or throws.

Reading quality:
```text
Stage1 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-042, S-044, S-047, S-052
```

Boundary decision:
```text
Included in ENC-R03 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-042 | IU-042 | `31601648b5` | `ENC-R03-encoder-trygetbytes-output-buffers` | `verified-visible-semantic-transcript` | What if I do not know the exact byte count? |
| S-044 | IU-044 | `8f3d9634b1` | `ENC-R03-encoder-trygetbytes-output-buffers` | `verified-visible-semantic-transcript` | Replacement behavior vs exception behavior. |
| S-047 | IU-047 | `48c78495b2` | `ENC-R03-encoder-trygetbytes-output-buffers` | `verified-visible-semantic-transcript` | Option 2: use TryGetBytes. |
| S-052 | IU-052 | `828fda32da` | `ENC-R03-encoder-trygetbytes-output-buffers` | `verified-visible-semantic-transcript` | Option 3: use an Encoder for chunked/stateful text encoding. |

---

## 2. Source-level transcript

### S-042 - What if I do not know the exact byte count?

Metadata:
```text
source_id: S-042
image_use_id: IU-042
fileId_short: 31601648b5
stage0_group: ENC-R03-encoder-trygetbytes-output-buffers
stage1_region: ENC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
What if I do not know the exact byte count?

Visible option:
1. Call `GetByteCount` first.
2. Allocate exact byte array.
3. Use `GetBytes` to write into destination span.
4. Advance writer by the number of bytes written.

Meaning:
This is the clean exact-size workflow when the full text is already available.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-044 - Replacement behavior vs exception behavior.

Metadata:
```text
source_id: S-044
image_use_id: IU-044
fileId_short: 8f3d9634b1
stage0_group: ENC-R03-encoder-trygetbytes-output-buffers
stage1_region: ENC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Replacement behavior vs exception behavior.

Visible example:
- `new UTF8Encoding(false, false)` does not throw on invalid bytes and can use replacement output.
- `new UTF8Encoding(false, true)` throws on invalid bytes.
- With encoder/decoder, invalid/incomplete final data plus flush can produce replacement output or DecoderFallbackException depending on fallback settings.

Meaning:
UTF-8 encoding/decoding behavior depends on fallback configuration. Decide whether bad data should be replaced or should fail.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-047 - Option 2: use TryGetBytes.

Metadata:
```text
source_id: S-047
image_use_id: IU-047
fileId_short: 48c78495b2
stage0_group: ENC-R03-encoder-trygetbytes-output-buffers
stage1_region: ENC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Option 2: use TryGetBytes.

Visible:
- `Encoding.UTF8.TryGetBytes(text.AsSpan(), dest, out int written)`
- returns true/false depending on whether destination span is large enough.
- If false, ask for a bigger span or fall back to GetByteCount first.

Meaning:
TryGetBytes is useful when you have a destination buffer and want to avoid allocation, but you must handle the too-small-buffer case.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-052 - Option 3: use an Encoder for chunked/stateful text encoding.

Metadata:
```text
source_id: S-052
image_use_id: IU-052
fileId_short: 828fda32da
stage0_group: ENC-R03-encoder-trygetbytes-output-buffers
stage1_region: ENC-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Option 3: use an Encoder for chunked/stateful text encoding.

Visible note:
If text is encoded in pieces and characters may span boundaries, use `Encoding.GetEncoder()` / `GetEncoder` stateful APIs instead of treating each piece as independent.

Meaning:
Encoder distinguishes discrete `Encoding.GetBytes` conversions from `Encoder.GetBytes`, which preserves state across calls on one input stream.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- If the exact byte count is unknown but the full text is available, call GetByteCount first and allocate exactly.
- TryGetBytes writes into a destination span and reports whether the destination was large enough.
- When the destination buffer may be too small, either retry with a larger buffer or use a stateful Encoder loop.
- Encoder preserves state across calls, which matters when characters may be split across chunks.
- Fallback behavior controls whether invalid input becomes replacement output or throws.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- Stage2 ENC-R02 decoder/chunk-processing is still pending.
