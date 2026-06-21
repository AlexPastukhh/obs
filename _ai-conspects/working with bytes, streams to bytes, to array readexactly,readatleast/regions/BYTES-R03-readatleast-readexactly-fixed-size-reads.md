# BYTES-R03 - ReadAtLeast / ReadExactly / fixed-size reads

Conspect: `working-with-bytes-streams`  
File type: **source-level semantic transcript**  
Stage: **2 / transcript v001**  
Generated: 2026-06-13 07:33:25 UTC

---

## Direction check

Goal:
Close remaining Working With Bytes Streams transcript candidates after Stage1.

Done:
Stage1 processed BYTES-R01/BYTES-R02 and left 14 candidates.

Now:
This file processes `14` sources for `BYTES-R03`.

Why:
This is the ReadAtLeast/ReadExactly fixed-size-read transcript pass, not only an audit summary.

Next:
After Stage2 review/commit, run Working With Bytes Streams closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Fixed-size stream reads: ReadExactly, ReadAtLeast, Stream.Read partial-read behavior, EOF handling, count guarantees, exceptions, protocol headers/frames, and when exact/minimum reads are appropriate.
```

Key ideas:

- Stream.Read/ReadAsync can return fewer bytes than requested; this is normal and does not always mean EOF.
- ReadExactly is for fixed-size required reads: it fills the buffer or throws when the stream ends early.
- ReadAtLeast is for minimum-size reads: it reads at least N bytes and returns how many bytes were actually read.
- ReadAtLeast can use throwOnEndOfStream behavior depending on overload/settings.
- These helpers package the loop and EOF behavior; they do not remove the need to reason about expected sizes.
- Use ReadExactly for binary protocol headers, fixed frame prefixes, and file-format fields.
- Use ReadAtLeast when a parser can make progress after a minimum number of bytes but may accept more.
- Do not use these APIs as a replacement for streaming large payloads or for unbounded read-all behavior.
- Always keep buffer size and requested byte count tied to protocol/content limits.

Reading quality:
```text
Stage2 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038
```

Boundary decision:
```text
Included in BYTES-R03 after Stage2 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-025 | IU-025 | `7fca9d5d4f` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | ReadExactly area intro. |
| S-026 | IU-026 | `a2ddc4fcde` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | Why ReadAsync is not enough. |
| S-027 | IU-027 | `2f51507f51` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | ReadExactly mental model. |
| S-028 | IU-028 | `5786c00c51` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | ReadExactly use cases. |
| S-029 | IU-029 | `e0a1064f58` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | ReadAtLeast mental model. |
| S-030 | IU-030 | `2889d39afb` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | ReadAtLeast vs ReadExactly. |
| S-031 | IU-031 | `8f2c1e0fcd` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | EOF behavior. |
| S-032 | IU-032 | `e840872a80` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | throwOnEndOfStream option. |
| S-033 | IU-033 | `e26265df6e` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | What count means. |
| S-034 | IU-034 | `f4daf233e1` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | Loop hidden inside helper. |
| S-035 | IU-035 | `f115a1fc2f` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | Fixed-size read with buffer slice. |
| S-036 | IU-036 | `a26d9ea469` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | Protocol parser pattern. |
| S-037 | IU-037 | `a27eb58b49` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | Do not use exact read for unknown whole stream. |
| S-038 | IU-038 | `d877046c28` | `BYTES-R03-readatleast-readexactly-fixed-size-reads` | `verified-visible-semantic-transcript` | Final rule summary. |

---

## 2. Source-level transcript

### S-025 - ReadExactly area intro.

Metadata:
```text
source_id: S-025
image_use_id: IU-025
fileId_short: 7fca9d5d4f
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
ReadExactly area intro.

Visible topic:
- `ReadExactly`
- `ReadAtLeast`
- fixed-size reads
- not the same as reading a whole stream

Meaning:
This region is about guaranteeing a required number of bytes from a stream. It is not about convenient full-body buffering.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-026 - Why ReadAsync is not enough.

Metadata:
```text
source_id: S-026
image_use_id: IU-026
fileId_short: a2ddc4fcde
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why ReadAsync is not enough.

Visible idea:
`ReadAsync(buffer)` may return fewer bytes than the buffer size.

Meaning:
If you requested 100 bytes, getting 20 bytes does not automatically mean the stream is finished. It can mean only 20 bytes were available now. For exact-size reads, you need a loop or a helper.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-027 - ReadExactly mental model.

Metadata:
```text
source_id: S-027
image_use_id: IU-027
fileId_short: 2f51507f51
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
ReadExactly mental model.

Visible:
Read exactly N bytes into a buffer.

Meaning:
`ReadExactly` keeps reading until the destination buffer is full. If the stream ends before that, it fails. This is useful when the format/protocol requires exactly that many bytes.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-028 - ReadExactly use cases.

Metadata:
```text
source_id: S-028
image_use_id: IU-028
fileId_short: 5786c00c51
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
ReadExactly use cases.

Visible examples:
- fixed binary header
- message prefix
- known-size protocol field
- file format structure

Meaning:
Use `ReadExactly` when a missing byte means the input is truncated or invalid, not when you simply want whatever data is available.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-029 - ReadAtLeast mental model.

Metadata:
```text
source_id: S-029
image_use_id: IU-029
fileId_short: e0a1064f58
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
ReadAtLeast mental model.

Visible:
Read at least minimum bytes.

Meaning:
`ReadAtLeast` tries to fill a buffer until at least the requested minimum count is available. It may read more than the minimum, up to the destination buffer size, and returns the actual count read.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-030 - ReadAtLeast vs ReadExactly.

Metadata:
```text
source_id: S-030
image_use_id: IU-030
fileId_short: 2889d39afb
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
ReadAtLeast vs ReadExactly.

Visible contrast:
- `ReadExactly`: destination must be filled / exact count required.
- `ReadAtLeast`: minimum count required, can return more.

Meaning:
Choose based on parser needs. If the next step needs exactly 4-byte length prefix, use ReadExactly. If it can process after at least N bytes, ReadAtLeast may fit.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-031 - EOF behavior.

Metadata:
```text
source_id: S-031
image_use_id: IU-031
fileId_short: 8f2c1e0fcd
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
EOF behavior.

Visible notes:
- If the stream ends before enough bytes arrive, exact/minimum helpers can throw.
- There is behavior around `throwOnEndOfStream`.

Meaning:
EOF is not the same as a normal partial read. If the contract says enough bytes must exist, early EOF is an error.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-032 - throwOnEndOfStream option.

Metadata:
```text
source_id: S-032
image_use_id: IU-032
fileId_short: e840872a80
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
throwOnEndOfStream option.

Visible:
ReadAtLeast overload can take `throwOnEndOfStream`.

Meaning:
When true, early EOF before the minimum count is an exception. When false, the method can return fewer bytes if the stream ended, and caller must handle that result.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-033 - What count means.

Metadata:
```text
source_id: S-033
image_use_id: IU-033
fileId_short: e26265df6e
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
What count means.

Visible reminder:
- count is a number of bytes to read.
- it is not an end index.

Meaning:
When using buffer slices or array overloads, keep length math correct: start + count describes the segment. Do not confuse count with final index.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-034 - Loop hidden inside helper.

Metadata:
```text
source_id: S-034
image_use_id: IU-034
fileId_short: f4daf233e1
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Loop hidden inside helper.

Visible:
ReadExactly/ReadAtLeast are convenience helpers around repeated reads.

Meaning:
They are not special transport primitives. They repeatedly call the underlying stream read until the required condition is satisfied or EOF/failure happens.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-035 - Fixed-size read with buffer slice.

Metadata:
```text
source_id: S-035
image_use_id: IU-035
fileId_short: f115a1fc2f
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Fixed-size read with buffer slice.

Visible code-like idea:
Use a buffer/slice with the exact size you want.

Meaning:
For exact reads, the destination size often expresses the required count. Passing a slice also prevents accidental overwrite outside the intended range.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-036 - Protocol parser pattern.

Metadata:
```text
source_id: S-036
image_use_id: IU-036
fileId_short: a26d9ea469
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Protocol parser pattern.

Visible:
Read fixed header, parse length, then read payload according to length.

Meaning:
A common parser pattern is:
1. ReadExactly header bytes.
2. Decode length/type.
3. Validate length against max.
4. ReadExactly or stream payload according to that length.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-037 - Do not use exact read for unknown whole stream.

Metadata:
```text
source_id: S-037
image_use_id: IU-037
fileId_short: a27eb58b49
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Do not use exact read for unknown whole stream.

Visible warning:
If you do not know total length, ReadExactly is not the right read-all primitive.

Meaning:
For unknown streams, either stream/process chunks or copy with bounded buffering. Exact reads require a known count.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-038 - Final rule summary.

Metadata:
```text
source_id: S-038
image_use_id: IU-038
fileId_short: d877046c28
stage0_group: BYTES-R03-readatleast-readexactly-fixed-size-reads
stage2_region: BYTES-R03
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Final rule summary.

Visible summary:
- ReadAsync = may return partial.
- ReadExactly = fill or fail.
- ReadAtLeast = minimum or optional early EOF handling.

Meaning:
The core model is count guarantee: use the weakest helper that matches the protocol requirement, and keep memory limits explicit.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- Stream.Read/ReadAsync can return fewer bytes than requested; this is normal and does not always mean EOF.
- ReadExactly is for fixed-size required reads: it fills the buffer or throws when the stream ends early.
- ReadAtLeast is for minimum-size reads: it reads at least N bytes and returns how many bytes were actually read.
- ReadAtLeast can use throwOnEndOfStream behavior depending on overload/settings.
- These helpers package the loop and EOF behavior; they do not remove the need to reason about expected sizes.
- Use ReadExactly for binary protocol headers, fixed frame prefixes, and file-format fields.
- Use ReadAtLeast when a parser can make progress after a minimum number of bytes but may accept more.
- Do not use these APIs as a replacement for streaming large payloads or for unbounded read-all behavior.
- Always keep buffer size and requested byte count tied to protocol/content limits.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage2 pass closes the remaining fixed-size-read sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit.
