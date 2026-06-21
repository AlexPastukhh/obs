# ENC-R01 - Encoding basics / GetString / GetBytes / GetChars / counts

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
This file processes `21` sources for `ENC-R01`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, process Stage2 ENC-R02 Decoder chunk processing.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Encoding API basics: GetString, GetBytes, GetChars, span overloads, allocation behavior, GetCharCount/GetMaxCharCount, buffer sizing, and partial byte-array decoding.
```

Key ideas:

- Encoding converts between bytes and chars/strings; UTF-8 is the usual default for modern text.
- GetString creates a new string from bytes; GetBytes writes bytes from string/chars; GetChars decodes into a char buffer.
- Span-based overloads avoid unnecessary array slicing and can write into caller-provided buffers.
- If source count is not specified, overloads normally process the whole source span/array/string.
- Use GetCharCount/GetByteCount for an exact output size when the full source is available.
- Use GetMaxCharCount/GetMaxByteCount when you need a safe upper bound, but it can over-allocate.
- For partial byte arrays, pass index/count or use spans/slices so only the intended byte range is decoded.

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
S-001, S-003, S-004, S-005, S-008, S-009, S-010, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-021, S-022, S-025, S-026, S-028, S-030
```

Boundary decision:
```text
Included in ENC-R01 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-001 | IU-001 | `2d8ac9d83e` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | Basics: GetString / GetBytes overloads. |
| S-003 | IU-003 | `ea1f5a1316` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | Why counts usually do not need to be specified. |
| S-004 | IU-004 | `3d6f0dd1d6` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 1. String -> bytes. |
| S-005 | IU-005 | `6992f787ac` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | "Can I use Memory?" |
| S-008 | IU-008 | `78c10d1ebd` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 2. Decode UTF-8 bytes to text. |
| S-009 | IU-009 | `4ed9508b45` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 1. Encode text to UTF-8 bytes. |
| S-010 | IU-010 | `b9e22eab17` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 2. Bytes -> string. |
| S-012 | IU-012 | `b12ae2226f` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | B. Old array + indexes API. |
| S-013 | IU-013 | `794d3a440f` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | B. Old array + indexes API for decoded chars. |
| S-014 | IU-014 | `a50e63ebcf` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 3. Most common encoding. |
| S-015 | IU-015 | `91bb466903` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | C. New span API. |
| S-016 | IU-016 | `48e980e6ca` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 4. Other encodings also exist. |
| S-017 | IU-017 | `809ebac342` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | C. New span API for decoded chars. |
| S-018 | IU-018 | `0c70d45b4f` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 5. Example with non-ASCII. |
| S-019 | IU-019 | `9437f2e2d7` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 6. If you only want part of the byte array. |
| S-021 | IU-021 | `5787d89720` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 7. Span-based APIs in newer .NET. |
| S-022 | IU-022 | `41361cc29f` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | The practical difference. |
| S-025 | IU-025 | `e600d57a46` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | Example: incomplete/partial byte sequences can affect counts. |
| S-026 | IU-026 | `e9b4e4b776` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 8. Encoder / Decoder objects also exist. |
| S-028 | IU-028 | `3f76d6f6be` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | Performance tradeoff. |
| S-030 | IU-030 | `3146da568f` | `ENC-R01-basics-getstring-getbytes-getchars-counts` | `verified-visible-semantic-transcript` | 9. Practical rule. |

---

## 2. Source-level transcript

### S-001 - Basics: GetString / GetBytes overloads.

Metadata:
```text
source_id: S-001
image_use_id: IU-001
fileId_short: 2d8ac9d83e
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Basics: GetString / GetBytes overloads.

Visible main thing:
- `Encoding.UTF8.GetString(bytes)` decodes bytes into a string.
- `Encoding.UTF8.GetBytes(text)` encodes a string into bytes.
- In .NET / C#, the API defaults to using the full passed source when no offset/count or span slice is specified.

Meaning:
This is the entry point mental model: `GetString` is bytes -> string, `GetBytes` is string/chars -> bytes.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-003 - Why counts usually do not need to be specified.

Metadata:
```text
source_id: S-003
image_use_id: IU-003
fileId_short: ea1f5a1316
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why counts usually do not need to be specified.

Visible note:
- Most overloads have simpler forms that use the whole source.
- Advanced overloads take offset/count or spans.
- For `Encoding.UTF8.GetString(...)`, if you pass a complete byte array/span, it decodes the whole thing.

Meaning:
Use the simple overload for whole-source conversions. Use span/index/count overloads only when you intentionally want a segment or caller-provided buffer.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-004 - 1. String -> bytes.

Metadata:
```text
source_id: S-004
image_use_id: IU-004
fileId_short: 3d6f0dd1d6
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
1. String -> bytes.

Visible code:
- `byte[] bytes = Encoding.UTF8.GetBytes("Hello");`
- span overload example writes to a provided byte buffer.

Meaning:
`GetBytes` is the usual direct conversion from `string`/chars to UTF-8 bytes. If you provide a destination span, you control allocation and can avoid creating a new array.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-005 - "Can I use Memory?"

Metadata:
```text
source_id: S-005
image_use_id: IU-005
fileId_short: 6992f787ac
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
"Can I use Memory?"

Visible idea:
- `Memory<T>` / `ReadOnlyMemory<T>` can be used by taking `.Span`.
- Example: `readOnlyMemory.Span`
- Use span-based overloads with `GetBytes` / `GetChars`.

Meaning:
Encoding APIs are mostly span-oriented for high-performance overloads. If your data is in Memory, pass its Span/ReadOnlySpan to the encoding method.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-008 - 2. Decode UTF-8 bytes to text.

Metadata:
```text
source_id: S-008
image_use_id: IU-008
fileId_short: 78c10d1ebd
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
2. Decode UTF-8 bytes to text.

Visible options:
A. Allocate a new string:
- `string s = Encoding.UTF8.GetString(bytes);`
- or decode a byte segment with index/count.
B. Important: GetString does not fill an existing char array.

Meaning:
Use `GetString` when the output should be a new string. If you want to decode into an existing char buffer, use `GetChars` instead.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-009 - 1. Encode text to UTF-8 bytes.

Metadata:
```text
source_id: S-009
image_use_id: IU-009
fileId_short: 4ed9508b45
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
1. Encode text to UTF-8 bytes.

Visible:
- Allocate a new `byte[]`.
- Example uses `Encoding.UTF8.GetBytes("Hello")`.
- The note says this calls `GetByteCount(...)` and `GetBytes(...)` internally/under the hood conceptually.

Meaning:
The simple array-returning overload is convenient and allocates for you. For performance or fixed buffers, use count + caller-provided span overloads.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-010 - 2. Bytes -> string.

Metadata:
```text
source_id: S-010
image_use_id: IU-010
fileId_short: b9e22eab17
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
2. Bytes -> string.

Visible code:
- `string text = Encoding.UTF8.GetString(bytes);`
- Example byte array for UTF-8 bytes.
- Output is `"Hello"`.

Meaning:
If the byte sequence is complete and valid UTF-8, `GetString` decodes it into normal .NET UTF-16 string characters.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-012 - B. Old array + indexes API.

Metadata:
```text
source_id: S-012
image_use_id: IU-012
fileId_short: b12ae2226f
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
B. Old array + indexes API.

Visible code shows:
- `charCount = Encoding.UTF8.GetCharCount(bytes, index, count);`
- allocate `char[]`
- `GetChars(bytes, index, count, chars, charIndex)`

Meaning:
The older overloads let you decode only a segment of a byte array and write into a char array. Good for legacy APIs or array-based pipelines.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-013 - B. Old array + indexes API for decoded chars.

Metadata:
```text
source_id: S-013
image_use_id: IU-013
fileId_short: 794d3a440f
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
B. Old array + indexes API for decoded chars.

Visible flow:
1. Call `GetCharCount` for a byte segment.
2. Allocate `char[]` of that exact size.
3. Call `GetChars` to fill it.
4. Then build a string if needed.

Meaning:
This is the exact-size array workflow when you know the byte range and want a char array rather than directly creating a string.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-014 - 3. Most common encoding.

Metadata:
```text
source_id: S-014
image_use_id: IU-014
fileId_short: a50e63ebcf
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
3. Most common encoding.

Visible:
- `Encoding.UTF8`
- Because UTF-8 is the normal default choice for APIs, JSON, HTTP, HTML, web data, and most text interchange.

Meaning:
Default to UTF-8 unless you have a concrete reason to use another encoding.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-015 - C. New span API.

Metadata:
```text
source_id: S-015
image_use_id: IU-015
fileId_short: 91bb466903
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
C. New span API.

Visible:
- Works on spans.
- Can call `GetCharCount` over a byte span.
- Allocate char buffer/span.
- Decode bytes into chars.
- Similar idea to array overloads, but span-based.

Meaning:
The span API is the modern version for slicing/working with memory without allocating intermediate arrays.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-016 - 4. Other encodings also exist.

Metadata:
```text
source_id: S-016
image_use_id: IU-016
fileId_short: 48e980e6ca
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
4. Other encodings also exist.

Visible examples:
- Encoding.ASCII
- Encoding.Unicode
- Encoding.UTF32
- Encoding.Latin1

But note:
- In most modern code, UTF-8 is what you want.

Meaning:
The `Encoding` class supports many encodings, but UTF-8 should be the default mental model unless interoperating with a legacy format/protocol.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-017 - C. New span API for decoded chars.

Metadata:
```text
source_id: S-017
image_use_id: IU-017
fileId_short: 809ebac342
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
C. New span API for decoded chars.

Visible:
- `ReadOnlySpan<byte>` input.
- `Span<char>` output.
- `Encoding.UTF8.GetChars(inputBytes, charBuffer);`

Meaning:
Use the span overload when you already have spans or want to write into a caller-provided char buffer without unnecessary allocations.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-018 - 5. Example with non-ASCII.

Metadata:
```text
source_id: S-018
image_use_id: IU-018
fileId_short: 0c70d45b4f
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
5. Example with non-ASCII.

Visible:
- `string original = "é";`
- UTF-8 bytes are multi-byte.
- `Encoding.UTF8.GetString(bytes)` restores the original string.

Meaning:
UTF-8 uses multiple bytes for many non-ASCII characters. Character count and byte count are not the same.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-019 - 6. If you only want part of the byte array.

Metadata:
```text
source_id: S-019
image_use_id: IU-019
fileId_short: 9437f2e2d7
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
6. If you only want part of the byte array.

Visible:
- There are overloads for offset/count.
- Example decodes only a slice of a byte array.

Meaning:
If a byte array has extra bytes before or after the intended text segment, do not decode the whole array. Use index/count or a sliced span.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-021 - 7. Span-based APIs in newer .NET.

Metadata:
```text
source_id: S-021
image_use_id: IU-021
fileId_short: 5787d89720
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
7. Span-based APIs in newer .NET.

Visible:
Modern .NET also has span-based APIs:
- `ReadOnlySpan<byte>`
- `Span<char>`
- `ReadOnlySpan<char>`
- `Span<byte>`

Meaning:
Span overloads are the modern way to avoid extra allocations and to integrate with pooled buffers or stackalloc buffers.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-022 - The practical difference.

Metadata:
```text
source_id: S-022
image_use_id: IU-022
fileId_short: 41361cc29f
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
The practical difference.

Visible note:
- `GetCharCount` gives exactly how many chars are required for this source.
- `GetMaxCharCount` gives an upper bound based on maximum possible expansion, often larger than needed.

Meaning:
Use exact count when possible. Use max count only when you need a safe preallocation without first scanning/decoding the exact source.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-025 - Example: incomplete/partial byte sequences can affect counts.

Metadata:
```text
source_id: S-025
image_use_id: IU-025
fileId_short: e600d57a46
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Example: incomplete/partial byte sequences can affect counts.

Visible code shows a byte array with UTF-8 bytes where a multi-byte character may be split.

Meaning:
With UTF-8, a single character can span multiple bytes. Counting/decoding must consider whether the byte sequence is complete, especially in streaming/chunk scenarios.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-026 - 8. Encoder / Decoder objects also exist.

Metadata:
```text
source_id: S-026
image_use_id: IU-026
fileId_short: e9b4e4b776
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
8. Encoder / Decoder objects also exist.

Visible:
- `Encoding.UTF8.GetEncoder()`
- `Encoding.UTF8.GetDecoder()`
- They preserve state for streaming/chunked processing.

Meaning:
Use Encoder/Decoder when a conversion happens in chunks and characters/byte sequences can cross chunk boundaries.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-028 - Performance tradeoff.

Metadata:
```text
source_id: S-028
image_use_id: IU-028
fileId_short: 3f76d6f6be
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Performance tradeoff.

Visible notes:
- `GetMaxCharCount` generally gives a safe maximum and may allocate more memory.
- `GetCharCount` computes the exact number and may scan more work first.
- Microsoft docs mark the max-count methods as giving the maximum number of characters/bytes.

Meaning:
For simple conversions, convenience overloads are fine. For hot paths, choose between exact pre-counting and safe over-allocation intentionally.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-030 - 9. Practical rule.

Metadata:
```text
source_id: S-030
image_use_id: IU-030
fileId_short: 3146da568f
stage0_group: ENC-R01-basics-getstring-getbytes-getchars-counts
stage1_region: ENC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
9. Practical rule.

Visible:
Most common:
- `Encoding.UTF8.GetString(bytes)`
- `Encoding.UTF8.GetBytes(text)`

More advanced / chunked processing:
- `Encoding.UTF8.GetDecoder()`
- `Encoding.UTF8.GetEncoder()`

Meaning:
Use the simple methods for complete data. Use stateful Encoder/Decoder for streaming/chunked data.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- Encoding converts between bytes and chars/strings; UTF-8 is the usual default for modern text.
- GetString creates a new string from bytes; GetBytes writes bytes from string/chars; GetChars decodes into a char buffer.
- Span-based overloads avoid unnecessary array slicing and can write into caller-provided buffers.
- If source count is not specified, overloads normally process the whole source span/array/string.
- Use GetCharCount/GetByteCount for an exact output size when the full source is available.
- Use GetMaxCharCount/GetMaxByteCount when you need a safe upper bound, but it can over-allocate.
- For partial byte arrays, pass index/count or use spans/slices so only the intended byte range is decoded.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- Stage2 ENC-R02 decoder/chunk-processing is still pending.
