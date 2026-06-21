# ENC-R02 - Decoder / chunk processing / incomplete UTF-8

Conspect: `encoding-utf8-chunk-processing`  
File type: **source-level semantic transcript**  
Stage: **2 / transcript v001**  
Generated: 2026-06-13 06:12:13 UTC

---

## Direction check

Goal:
Close the remaining Encoding UTF8 Chunk transcript candidates after Stage1.

Done:
Stage1 processed ENC-R01/ENC-R03 and left 30 candidates.

Now:
This file processes `30` sources for `ENC-R02`.

Why:
This is the decoder/chunk-processing transcript pass, not only an audit summary.

Next:
After Stage2 review/commit, run Encoding UTF8 Chunk closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
UTF-8 chunk processing with Decoder: incomplete multibyte sequences, Encoding.UTF8.GetDecoder, Decoder.GetChars vs Decoder.Convert, flush/end-of-message handling, and typical convert loops.
```

Key ideas:

- A UTF-8 character can be split across byte chunks; decoding each chunk independently can corrupt or replace characters.
- Encoding.UTF8.GetDecoder() returns a stateful Decoder that remembers incomplete byte sequences between calls.
- Decoder.GetChars decodes bytes into chars while preserving decoder state, but it does not report bytesUsed/charsUsed/completed as conveniently as Convert.
- Decoder.Convert is the safer streaming-loop API when either input bytes or output chars may be partial.
- flush: false means more bytes can arrive later, so an incomplete trailing sequence should be held in decoder state.
- flush: true means no more bytes are coming; any incomplete final sequence must be resolved by fallback or exception.
- A typical Convert loop advances byte index by bytesUsed and char/write position by charsUsed until completed.
- Small char buffers are valid with Convert; it can process only part of the available input and tell you what it consumed.
- Fallback settings decide whether invalid/incomplete final UTF-8 becomes replacement characters or throws DecoderFallbackException.

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
S-002, S-006, S-007, S-011, S-020, S-023, S-024, S-027, S-029, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-043, S-045, S-046, S-048, S-049, S-050, S-051, S-053, S-054, S-055
```

Boundary decision:
```text
Included in ENC-R02 after Stage2 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-002 | IU-002 | `84bfcf913e` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Chunk processing with Encoding.UTF8.GetDecoder. |
| S-006 | IU-006 | `ae7d474ccc` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Decoder methods overview. |
| S-007 | IU-007 | `9e500fe22d` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Can we decode each chunk directly? |
| S-011 | IU-011 | `f9d49d026d` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Decoder.GetChars vs Decoder.Convert. |
| S-020 | IU-020 | `83cb602b2c` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Bytes can be incomplete. |
| S-023 | IU-023 | `208e6e442c` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Why decoder state matters. |
| S-024 | IU-024 | `e4546610f9` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Flush does not mean clearing normal memory. |
| S-027 | IU-027 | `2b6cb0ef59` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Decoder.Convert vs Decoder.GetChars. |
| S-029 | IU-029 | `17de7f5e9c` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Incomplete final character. |
| S-031 | IU-031 | `bf0e239170` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Important point / final chunk marker. |
| S-032 | IU-032 | `078e92ad0c` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Decoder method family. |
| S-033 | IU-033 | `7d05b04294` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Convert is better for partial buffers. |
| S-034 | IU-034 | `ac9dc0a1a1` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Flush and end-of-message. |
| S-035 | IU-035 | `467f8a6865` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Decoder methods and incomplete bytes. |
| S-036 | IU-036 | `01614338c1` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Flush near writer/buffer sizing area. |
| S-037 | IU-037 | `956d8d12a8` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Decoder stateful processing. |
| S-038 | IU-038 | `521eca4c3b` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Why simple GetString is not enough for chunks. |
| S-039 | IU-039 | `c2dcef1282` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | GetChars can throw / fallback behavior. |
| S-040 | IU-040 | `e93f9db279` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Why do-while / final chunk loop exists. |
| S-041 | IU-041 | `21ce4dd176` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Decoder method summary. |
| S-043 | IU-043 | `c29746986a` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Typical Convert loop. |
| S-045 | IU-045 | `7d0dd953da` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Convert handles small output buffers. |
| S-046 | IU-046 | `db6d3eacbe` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | GetChars vs Convert when output buffer is small. |
| S-048 | IU-048 | `4ea5c087a3` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Typical Convert loop with final chunk. |
| S-049 | IU-049 | `29afc1ab74` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Loop condition and completed flag. |
| S-050 | IU-050 | `83cb602b2c` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Index/count math for chunk slices. |
| S-051 | IU-051 | `18236e79ae` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Convert can process limited char buffer. |
| S-053 | IU-053 | `07b2281f15` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | When GetChars can throw. |
| S-054 | IU-054 | `b96532b858` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Array count/index reminder. |
| S-055 | IU-055 | `3704158d5f` | `ENC-R02-decoder-chunk-processing-incomplete-utf8` | `verified-visible-semantic-transcript` | Count formula in array overloads. |

---

## 2. Source-level transcript

### S-002 - Chunk processing with Encoding.UTF8.GetDecoder.

Metadata:
```text
source_id: S-002
image_use_id: IU-002
fileId_short: 84bfcf913e
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Chunk processing with Encoding.UTF8.GetDecoder.

Visible main idea:
- When bytes arrive in chunks, one UTF-8 character can be split across chunk boundaries.
- If you call `Encoding.UTF8.GetString(chunk)` independently for every chunk, a split multi-byte sequence can be decoded incorrectly.
- Use `Encoding.UTF8.GetDecoder()` so the decoder can remember leftover bytes from the previous chunk.

Meaning:
For streaming/chunked UTF-8 input, a stateful Decoder is the correct primitive, not repeated independent GetString calls.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-006 - Decoder methods overview.

Metadata:
```text
source_id: S-006
image_use_id: IU-006
fileId_short: ae7d474ccc
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Decoder methods overview.

Visible area compares:
- `decoder.GetChars(...)`
- `decoder.Convert(...)`

Both use decoder state, but `Convert` is more explicit about streaming progress.

Meaning:
Use `GetChars` for simpler stateful decoding when you can provide enough output buffer. Use `Convert` when input/output buffers can be partial and you need bytesUsed/charsUsed/completed.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-007 - Can we decode each chunk directly?

Metadata:
```text
source_id: S-007
image_use_id: IU-007
fileId_short: 9e500fe22d
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Can we decode each chunk directly?

Visible question:
Can we decode like this when processing chunks?

Answer:
Only if every chunk boundary is guaranteed to align with UTF-8 character boundaries. Usually you do not have that guarantee.

Meaning:
If chunks come from network/file/pipe, assume a multibyte UTF-8 character can be split and use a Decoder.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-011 - Decoder.GetChars vs Decoder.Convert.

Metadata:
```text
source_id: S-011
image_use_id: IU-011
fileId_short: f9d49d026d
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Decoder.GetChars vs Decoder.Convert.

Visible note:
- `GetChars` decodes and writes chars.
- `Convert` decodes and reports how much input and output was used.
- `Convert` is better when buffers may be too small or when you need to loop.

Meaning:
`Convert` is the streaming-control API; `GetChars` is simpler but less informative.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-020 - Bytes can be incomplete.

Metadata:
```text
source_id: S-020
image_use_id: IU-020
fileId_short: 83cb602b2c
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Bytes can be incomplete.

Visible note:
- UTF-8 byte sequence can be incomplete at the end of a chunk.
- Decoder can hold partial bytes.
- Direct `GetString` on that chunk may produce fallback replacement or fail depending on settings.

Meaning:
Incomplete trailing bytes are normal in chunk processing and should not be treated as a full malformed character until final flush.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-023 - Why decoder state matters.

Metadata:
```text
source_id: S-023
image_use_id: IU-023
fileId_short: 208e6e442c
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why decoder state matters.

Visible note:
If a chunk ends with the beginning of a UTF-8 character, we cannot produce the final char yet.

Meaning:
The decoder keeps those trailing bytes internally. When the next chunk arrives, it combines them with new bytes and then emits the correct character.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-024 - Flush does not mean clearing normal memory.

Metadata:
```text
source_id: S-024
image_use_id: IU-024
fileId_short: e4546610f9
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Flush does not mean clearing normal memory.

Visible idea:
Flush is a signal to the decoder:
- `flush: false`: more input may arrive; keep incomplete state.
- `flush: true`: no more input is coming; finish the sequence or apply fallback/throw.

Meaning:
Flush is about end-of-input semantics, not about freeing a buffer.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-027 - Decoder.Convert vs Decoder.GetChars.

Metadata:
```text
source_id: S-027
image_use_id: IU-027
fileId_short: 2b6cb0ef59
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Decoder.Convert vs Decoder.GetChars.

Visible heading:
- decoder methods
- convert vs getchars
- decoder.convert vs decoder.getchars

Meaning:
`GetChars` is direct decode into chars. `Convert` is designed for loops where both byte chunks and char buffers can be partial.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-029 - Incomplete final character.

Metadata:
```text
source_id: S-029
image_use_id: IU-029
fileId_short: 17de7f5e9c
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Incomplete final character.

Visible note:
"we can't produce the last char" until the decoder knows if more bytes are coming.

Meaning:
For `flush: false`, decoder waits. For `flush: true`, decoder must decide final output: replacement character or exception, depending on fallback settings.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-031 - Important point / final chunk marker.

Metadata:
```text
source_id: S-031
image_use_id: IU-031
fileId_short: bf0e239170
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Important point / final chunk marker.

Visible note emphasizes why a final signal is needed.

Meaning:
A Decoder cannot know if the current chunk is the final chunk unless you tell it. The final call should use `flush: true`; non-final calls use `flush: false`.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-032 - Decoder method family.

Metadata:
```text
source_id: S-032
image_use_id: IU-032
fileId_short: 078e92ad0c
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Decoder method family.

Visible area summarizes:
- `Encoding.UTF8.GetDecoder()`
- `decoder.GetChars`
- `decoder.Convert`
- `flush`

Meaning:
All these APIs belong to the same streaming-decoding mental model: preserve state until the byte stream is complete.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-033 - Convert is better for partial buffers.

Metadata:
```text
source_id: S-033
image_use_id: IU-033
fileId_short: 7d05b04294
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Convert is better for partial buffers.

Visible comparison:
`Decoder.Convert` gives:
- `bytesUsed`
- `charsUsed`
- `completed`

Meaning:
When you have a byte span and a char span, Convert tells you exactly how much progress was made, so you can safely advance indices.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-034 - Flush and end-of-message.

Metadata:
```text
source_id: S-034
image_use_id: IU-034
fileId_short: ac9dc0a1a1
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Flush and end-of-message.

Visible note mentions final chunk / end-of-message.

Meaning:
When some higher-level protocol says EndOfMessage or final chunk, pass `flush: true` to the decoder. That lets the decoder finish or report malformed trailing bytes.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-035 - Decoder methods and incomplete bytes.

Metadata:
```text
source_id: S-035
image_use_id: IU-035
fileId_short: 467f8a6865
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Decoder methods and incomplete bytes.

Visible area repeats:
- chunks can be incomplete
- better to use decoder
- flush controls finalization

Meaning:
A decoder instance should live for the duration of one logical byte stream/message. Do not create a new decoder for each chunk if characters can cross boundaries.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-036 - Flush near writer/buffer sizing area.

Metadata:
```text
source_id: S-036
image_use_id: IU-036
fileId_short: 01614338c1
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Flush near writer/buffer sizing area.

Visible note connects flush with buffer loops.

Meaning:
Even if output buffer is small, you still continue Convert calls. The final call uses flush true only when there is no more input for that logical stream.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-037 - Decoder stateful processing.

Metadata:
```text
source_id: S-037
image_use_id: IU-037
fileId_short: 956d8d12a8
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Decoder stateful processing.

Visible condensed card:
- decoder methods
- convert vs getchars
- flush
- chunked processing

Meaning:
The core rule is: same Decoder instance across chunks, `flush: false` until final chunk, then `flush: true`.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-038 - Why simple GetString is not enough for chunks.

Metadata:
```text
source_id: S-038
image_use_id: IU-038
fileId_short: 521eca4c3b
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why simple GetString is not enough for chunks.

Visible area around decoder methods.

Meaning:
`Encoding.UTF8.GetString` treats the given bytes as a complete independent input. A Decoder treats calls as parts of one continuous stream.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-039 - GetChars can throw / fallback behavior.

Metadata:
```text
source_id: S-039
image_use_id: IU-039
fileId_short: c2dcef1282
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
GetChars can throw / fallback behavior.

Visible note:
- `getchars can throw`
- flush
- final chunk

Meaning:
With throwing fallback enabled, invalid UTF-8 or incomplete final sequences can throw DecoderFallbackException. With replacement fallback, invalid final data can become replacement chars.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-040 - Why do-while / final chunk loop exists.

Metadata:
```text
source_id: S-040
image_use_id: IU-040
fileId_short: e93f9db279
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why do-while / final chunk loop exists.

Visible note:
- use do/while because final chunk has result.EndOfMessage = true.

Meaning:
Even when a read result says end-of-message, you may need one final decoder call with flush true. A loop ensures the final buffered decoder state is emitted or validated.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-041 - Decoder method summary.

Metadata:
```text
source_id: S-041
image_use_id: IU-041
fileId_short: 21ce4dd176
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Decoder method summary.

Visible area groups decoder methods and flush.

Meaning:
`Decoder` is for byte-stream decoding; `Convert` is usually the robust method for chunked input/output; `flush` marks finality.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-043 - Typical Convert loop.

Metadata:
```text
source_id: S-043
image_use_id: IU-043
fileId_short: c29746986a
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Typical Convert loop.

Visible note:
- typical convert loop
- char buffer may be too little
- flush / getchars can throw

Meaning:
Loop:
1. call Convert(inputSlice, charBuffer, flush, out bytesUsed, out charsUsed, out completed)
2. write charsUsed chars
3. advance input by bytesUsed
4. repeat until completed.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-045 - Convert handles small output buffers.

Metadata:
```text
source_id: S-045
image_use_id: IU-045
fileId_short: 7d0dd953da
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Convert handles small output buffers.

Visible area:
- output char buffer may be too little
- with Convert we can process it

Meaning:
If destination char buffer is too small, Convert consumes only part of input and reports progress. You can write/output chars and continue with the same decoder.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-046 - GetChars vs Convert when output buffer is small.

Metadata:
```text
source_id: S-046
image_use_id: IU-046
fileId_short: db6d3eacbe
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
GetChars vs Convert when output buffer is small.

Visible note:
- `GetChars` can throw
- `Convert` can process partial output

Meaning:
`GetChars` expects enough destination space for decoded chars. `Convert` is safer when char buffer capacity is limited or repeatedly reused.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-048 - Typical Convert loop with final chunk.

Metadata:
```text
source_id: S-048
image_use_id: IU-048
fileId_short: 4ea5c087a3
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Typical Convert loop with final chunk.

Visible note:
- `EndOfMessage = true`
- typical convert loop
- char buffer may be too little
- with Convert we can process it

Meaning:
When the protocol says final chunk, pass flush true and keep looping until completed. This drains decoder internal state into output.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-049 - Loop condition and completed flag.

Metadata:
```text
source_id: S-049
image_use_id: IU-049
fileId_short: 29afc1ab74
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Loop condition and completed flag.

Visible area:
- final/end-of-message
- typical convert loop
- small char buffer

Meaning:
The `completed` flag means the decoder has consumed available input and flushed what it can into output. If completed is false, continue looping even if no new external chunk has arrived.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-050 - Index/count math for chunk slices.

Metadata:
```text
source_id: S-050
image_use_id: IU-050
fileId_short: 83cb602b2c
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Index/count math for chunk slices.

Visible note:
- start index inclusive
- final index inclusive or exclusive
- count = end - start or end + 1 - start depending on convention

Meaning:
When using array/index/count overloads, be precise: count is a length, not the final index. With spans, slicing often makes this clearer.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-051 - Convert can process limited char buffer.

Metadata:
```text
source_id: S-051
image_use_id: IU-051
fileId_short: 18236e79ae
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Convert can process limited char buffer.

Visible note:
- `GetChars` can throw
- with Convert and too-little buffer we can process it

Meaning:
`Decoder.Convert` is designed for partial progress. It can consume as much input as fits output and tell you exactly what happened.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-053 - When GetChars can throw.

Metadata:
```text
source_id: S-053
image_use_id: IU-053
fileId_short: 07b2281f15
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
When GetChars can throw.

Visible note:
- `getchars can throw`
- typical convert loop

Meaning:
`GetChars` may throw if the destination char array/span is too small, or if fallback is configured to throw on invalid final data. Convert gives more controlled progress handling.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-054 - Array count/index reminder.

Metadata:
```text
source_id: S-054
image_use_id: IU-054
fileId_short: b96532b858
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Array count/index reminder.

Visible:
- final index not inclusive vs inclusive
- count calculation

Meaning:
For `GetChars(bytes, byteIndex, byteCount, chars, charIndex)`, `byteCount` is number of bytes to decode. It is not the final array index. This matters when processing only part of a chunk.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-055 - Count formula in array overloads.

Metadata:
```text
source_id: S-055
image_use_id: IU-055
fileId_short: 3704158d5f
stage0_group: ENC-R02-decoder-chunk-processing-incomplete-utf8
stage2_region: ENC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Count formula in array overloads.

Visible note:
- if start is inclusive and end is exclusive, count = end - start.
- if final index is inclusive, count = finalIndex + 1 - start.

Meaning:
When moving between index/count APIs and span slicing, keep the length calculation correct to avoid missing or duplicating bytes.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- A UTF-8 character can be split across byte chunks; decoding each chunk independently can corrupt or replace characters.
- Encoding.UTF8.GetDecoder() returns a stateful Decoder that remembers incomplete byte sequences between calls.
- Decoder.GetChars decodes bytes into chars while preserving decoder state, but it does not report bytesUsed/charsUsed/completed as conveniently as Convert.
- Decoder.Convert is the safer streaming-loop API when either input bytes or output chars may be partial.
- flush: false means more bytes can arrive later, so an incomplete trailing sequence should be held in decoder state.
- flush: true means no more bytes are coming; any incomplete final sequence must be resolved by fallback or exception.
- A typical Convert loop advances byte index by bytesUsed and char/write position by charsUsed until completed.
- Small char buffers are valid with Convert; it can process only part of the available input and tell you what it consumed.
- Fallback settings decide whether invalid/incomplete final UTF-8 becomes replacement characters or throws DecoderFallbackException.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage2 pass closes the remaining decoder/chunk-processing sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit.
