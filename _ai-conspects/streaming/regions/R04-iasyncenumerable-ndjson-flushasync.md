# R04 - IAsyncEnumerable / NDJSON / FlushAsync implementation road

Conspect: `streaming`  
File type: **source-preserving region transcript**  
Stage: **stage-4 / verified region transcript v003 - overlap coverage correction**  
Generated: 2026-06-01 23:26:17 UTC

---

## Direction check

Goal:
Convert the streaming Excalidraw conspect into source-preserving region text without losing images.

Now:
R01/R02/R03 are done. R04 processes concrete implementation of `IAsyncEnumerable`, NDJSON, client streaming reads, and `FlushAsync`.

This step:
Create R04 transcript from 39 included sources after local boundary review; v003 additionally records an R04-owned manual-writing/FlushAsync tail found during R05 boundary precheck.

Why:
R04 bridges high-level object streaming from R03 to practical server/client code: response format, progressive parsing, partial results, and flush behavior.

Next:
R05 SSE / EventSource / writer / heartbeat / reconnect.

---

## 0. You are here

Current region: `R04 - IAsyncEnumerable / NDJSON / FlushAsync implementation road`  
Status: `verified transcript from extracted SVG images`  
Source count: `41 unique transcript sources + 11 duplicate image-use records`  
Known limitations: several code screenshots are small; code blocks preserve visible intent and key lines.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- server-side IAsyncEnumerable<T> object streaming
- wire-format consequences: JSON array vs NDJSON vs SSE
- client-side streaming read with ResponseHeadersRead and DeserializeAsyncEnumerable
- manual NDJSON response writing with WriteAsync and FlushAsync
- why FlushAsync matters and what response started/headers committed means
- partial results, disconnects, truncation, and resume semantics
```
Key ideas:
- IAsyncEnumerable<T> can let server produce objects gradually, but wire format determines whether clients can consume progressively.
- Default HttpClient ResponseContentRead usually waits until full content is received; ResponseHeadersRead enables true streaming consumption.
- Normal JSON arrays are fragile for long-lived partial streams because early disconnect can leave invalid JSON.
- NDJSON makes each line a complete JSON object, so clients can process line-by-line and keep partial results.
- Manual NDJSON streaming writes each serialized JSON object plus newline and flushes after each item.
- FlushAsync pushes buffered response bytes sooner, but proxies/client buffering may still affect visible delivery.
- Once response headers are committed/started, status code/content type/headers should be considered locked.
- For long-running JSON array streams, resumable afterId/pageToken semantics can reduce damage from disconnects.

Reading quality:
```text
overall_conceptual_understanding: high
main_source_readability: mostly high
code_readability: medium-high; exact punctuation may need source image for tiny code
spatial_layout_understanding: high after R04 boundary review
confidence_summary: High for concepts/boundary; medium-high for exact code punctuation in small screenshots.
```

---
## 0.2 Coverage / boundary review

Included source IDs:
```text
S-084, S-085, S-086, S-186, S-187, S-188, S-189, S-190, S-191, S-192, S-193, S-194, S-093, S-094, S-095, S-096, S-097, S-098, S-099, S-100, S-101, S-150, S-151, S-148, S-147, S-146, S-157, S-155, S-164, S-154, S-149, S-153, S-152, S-159, S-158, S-161, S-160, S-162, S-156
```
Checked but not included:
```text
S-110, S-111, S-112, S-113, S-126, S-127, S-128, S-129 -> R05 SSE/EventSource/reconnect road, not R04 NDJSON/FlushAsync implementation road
```
Boundary decision:
```text
R04 includes the NDJSON / JSON array / client streaming / ResponseHeadersRead / FlushAsync implementation material.
R04 explicitly excludes the SSE/EventSource/reconnect/order-tracking material that appeared in the initial R04 coordinate band.
```

---
## 0.3 Stage5/R04 v003 overlap correction

During the R05 boundary precheck, a visually separate tail in the R05 coordinate band was reclassified as R04 material.

Why this is R04, not R05:
```text
The tail explains manual WriteAsync + FlushAsync, NDJSON vs JSON-array streaming, response-start/header-commit behavior, and when manual writing is preferable to IAsyncEnumerable<T>.
That is R04 implementation/flush semantics, not SSE/EventSource reconnect semantics.
```

Unique sources added to R04 v003:
```text
S-163 -> why use FlushAsync + manual writing instead of just returning IAsyncEnumerable<T>
S-165 -> when IAsyncEnumerable<T> is enough vs when WriteAsync + FlushAsync is better
```

Already included but confirmed during the R05 precheck:
```text
S-164 -> manual WriteAsync + FlushAsync low-level streaming
```

Duplicate image uses recorded for coverage only:
```text
S-166 -> duplicate of S-158
S-167 -> duplicate of S-159
S-168 -> duplicate of S-160
S-169 -> duplicate of S-161
S-170 -> duplicate of S-162
S-171 -> duplicate of S-152
S-172 -> duplicate of S-153
S-173 -> duplicate of S-154
S-174 -> duplicate of S-155
S-175 -> duplicate of S-156
S-176 -> duplicate of S-157
```

### R04-S040 / S-163 - `59bf477f6a`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-unique-overlap-found-during-r05-boundary-review`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: why use FlushAsync + manual writing instead of just returning IAsyncEnumerable<T>

#### Verified visible text
```text
1) Why use FlushAsync + manual writing instead of just returning IAsyncEnumerable<T>?

Returning IAsyncEnumerable<T> (high-level streaming)

When you return IAsyncEnumerable<T> from a controller:
- you stream objects
- ASP.NET Core + JSON formatter decide how to serialize/write
- you usually do not control exactly when bytes are flushed
- you usually do not control chunk boundaries

So it's a nice "stream these items" signal, but lower control.
```

### R04-S041 / S-165 - `1480b4187e`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-unique-overlap-found-during-r05-boundary-review`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: when IAsyncEnumerable<T> is enough vs manual WriteAsync + FlushAsync

#### Verified visible text
```text
So which is "better"?

Not universally better — just better when you need control.

Use IAsyncEnumerable<T> when:
- normal JSON API streaming is enough
- you don't care about exact flush timing
- you want simpler code

Use WriteAsync + FlushAsync when:
- you need NDJSON
- you need SSE
- you need precise push behavior
- you need custom formatting
```

### Cleaned correction notes

- Returning `IAsyncEnumerable<T>` is a high-level "stream these items" signal; ASP.NET Core and the JSON formatter still decide serialization/write details.
- Manual `WriteAsync` + `FlushAsync` gives lower-level control over output format, chunk boundaries, and push behavior.
- Manual writing is especially relevant for NDJSON, SSE, custom formatting, and precise low-latency push behavior.
- Several screenshots in the R05 coordinate band duplicate R04 material; v003 records those duplicate image uses so they are not left unreviewed.

---
## 1. Original Excalidraw labels
```text
IAsyncEnumerable<T>
NDJSON
FlushAsync
ResponseHeadersRead
client-side streaming
```

---
## 2. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| R04-S001 | S-084 | IU-084 | `97b0b6e8db` | `verified-from-extracted-svg-image` | no | NDJSON streaming controller action title |
| R04-S002 | S-085 | IU-085 | `8054028073` | `verified-from-extracted-svg-image` | no | IAsyncEnumerable streaming encoding nuance |
| R04-S003 | S-086 | IU-086 | `f1b6a1ce00` | `verified-from-extracted-svg-image` | no | Client consuming IAsyncEnumerable<T> from JSON |
| R04-S004 | S-186 | IU-186 | `ac722269e4` | `verified-from-extracted-svg-image` | no | Mostly yes: IAsyncEnumerable endpoint and memory use |
| R04-S005 | S-187 | IU-187 | `269dd8bffb` | `verified-from-extracted-svg-image` | no | Deserializing async enumerable memory benefit |
| R04-S006 | S-188 | IU-188 | `a8f6be5584` | `verified-from-extracted-svg-image` | no | ResponseContentRead nuance |
| R04-S007 | S-189 | IU-189 | `8ebea1a074` | `verified-from-extracted-svg-image` | no | Without ResponseHeadersRead you usually wait |
| R04-S008 | S-190 | IU-190 | `5da2603961` | `verified-from-extracted-svg-image` | no | Programming view without ResponseHeadersRead |
| R04-S009 | S-191 | IU-191 | `5e686c81da` | `verified-from-extracted-svg-image` | no | Flow without ResponseHeadersRead code |
| R04-S010 | S-192 | IU-192 | `a8946230a1` | `verified-from-extracted-svg-image` | no | Programming view with ResponseHeadersRead |
| R04-S011 | S-193 | IU-193 | `02c3d7f372` | `verified-from-extracted-svg-image` | no | Flow with ResponseHeadersRead code |
| R04-S012 | S-194 | IU-194 | `e3c87ff97f` | `verified-from-extracted-svg-image` | no | ResponseHeadersRead full client code with partial result handling |
| R04-S013 | S-093 | IU-093 | `b4798a97c0` | `verified-from-extracted-svg-image` | no | Why NDJSON over normal JSON array |
| R04-S014 | S-094 | IU-094 | `b7c267a310` | `verified-from-extracted-svg-image` | no | NDJSON solves JSON array streaming problem |
| R04-S015 | S-095 | IU-095 | `2f9e8a88fe` | `verified-from-extracted-svg-image` | no | Normal JSON array mid-stream truncation |
| R04-S016 | S-096 | IU-096 | `9b6607dda6` | `verified-from-extracted-svg-image` | no | Can client do something to avoid invalid JSON problems |
| R04-S017 | S-097 | IU-097 | `e4054216af` | `verified-from-extracted-svg-image` | no | DeserializeAsyncEnumerable items before cut |
| R04-S018 | S-098 | IU-098 | `e3c87ff97f` | `verified-from-extracted-svg-image` | no | Client code processing items incrementally and keeping partial results |
| R04-S019 | S-099 | IU-099 | `5ff04b2d78` | `verified-from-extracted-svg-image` | no | Normal JSON array is still useful for typical APIs |
| R04-S020 | S-100 | IU-100 | `f1a2378c71` | `verified-from-extracted-svg-image` | no | When JSON array streaming is bad fit |
| R04-S021 | S-101 | IU-101 | `bfaeda5fa4` | `verified-from-extracted-svg-image` | no | How to make JSON array streaming practical |
| R04-S022 | S-150 | IU-150 | `803b64f76d` | `verified-from-extracted-svg-image` | no | NDJSON streaming controller action title duplicate |
| R04-S023 | S-151 | IU-151 | `e53fba018c` | `verified-from-extracted-svg-image` | no | NDJSON streaming controller code |
| R04-S024 | S-148 | IU-148 | `46e87250a2` | `verified-from-extracted-svg-image` | no | FlushAsync definition and why used |
| R04-S025 | S-147 | IU-147 | `098e89f232` | `verified-from-extracted-svg-image` | no | FlushAsync relationship to IAsyncEnumerable return |
| R04-S026 | S-146 | IU-146 | `c6f8ccf11d` | `verified-from-extracted-svg-image` | no | Difference between FlushAsync and returning IAsyncEnumerable |
| R04-S027 | S-157 | IU-157 | `90cf4f68ea` | `verified-from-extracted-svg-image` | no | NDJSON vs JSON array body looks |
| R04-S028 | S-155 | IU-155 | `c30e8e2c29` | `verified-from-extracted-svg-image` | no | NDJSON newline-delimited JSON |
| R04-S029 | S-164 | IU-164 | `d458216206` | `verified-from-extracted-svg-image` | no | Notes on JSON array format |
| R04-S030 | S-154 | IU-154 | `f86a58f3fa` | `verified-from-extracted-svg-image` | no | NDJSON content type |
| R04-S031 | S-149 | IU-149 | `52862a66ef` | `verified-from-extracted-svg-image` | no | NDJSON notes |
| R04-S032 | S-153 | IU-153 | `cf7a57a0e4` | `verified-from-extracted-svg-image` | no | Why NDJSON is great |
| R04-S033 | S-152 | IU-152 | `3bc66bedb8` | `verified-from-extracted-svg-image` | no | Why FlushAsync matters for NDJSON |
| R04-S034 | S-159 | IU-159 | `136c580575` | `verified-from-extracted-svg-image` | no | FlushAsync still matters despite write async |
| R04-S035 | S-158 | IU-158 | `97787eea8b` | `verified-from-extracted-svg-image` | no | What started means in practice |
| R04-S036 | S-161 | IU-161 | `b241e2a1e8` | `verified-from-extracted-svg-image` | no | Headers committed once response starts |
| R04-S037 | S-160 | IU-160 | `7a4a612966` | `verified-from-extracted-svg-image` | no | Bytes may still be behind buffering layers |
| R04-S038 | S-162 | IU-162 | `26e960f193` | `verified-from-extracted-svg-image` | no | WriteAsync commits headers and begins response |
| R04-S039 | S-156 | IU-156 | `1453af6df0` | `verified-from-extracted-svg-image` | no | NDJSON body looks like multiple objects |

---
## 3. Source transcript

### R04-S001 / S-084 - `97b0b6e8db`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON streaming controller action title

#### Verified visible text
```text
1) NDJSON streaming controller action
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S002 / S-085 - `8054028073`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: IAsyncEnumerable streaming encoding nuance

#### Verified visible text
```text
Server-side streaming with IAsyncEnumerable<T> can produce objects gradually, but wire encoding still matters. To stream items, response format usually must be JSON array written progressively, NDJSON/JSON Lines, or SSE. The format determines whether the client can parse progressively.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S003 / S-086 - `f1b6a1ce00`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Client consuming IAsyncEnumerable<T> from JSON

#### Verified visible text
```text
Client side can consume IAsyncEnumerable<T> from JSON using ReadAsStreamAsync and JsonSerializer.DeserializeAsyncEnumerable. This combines byte-stream reading with object-stream parsing; server can produce items one-by-one and client can consume items one-by-one.
```

#### Verified visible code / code intent
```csharp
await using var stream = await response.Content.ReadAsStreamAsync(ct);
await foreach (var movie in JsonSerializer.DeserializeAsyncEnumerable<Movie>(stream, options, ct))
{
    // process movie as it arrives
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S004 / S-186 - `ac722269e4`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Mostly yes: IAsyncEnumerable endpoint and memory use

#### Verified visible text
```text
Mostly yes — an IAsyncEnumerable<T> endpoint is designed so you do not have to hold the whole list in memory. The current awaited item, formatter buffers, network buffers, and repository/DB provider state may still be in memory.
```

#### Verified visible code / code intent
```csharp
public async IAsyncEnumerable<Book> StreamBooks()
{
    await foreach (var b in _bookRepository.GetBooksAsAsyncEnumerable())
        yield return b;
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S005 / S-187 - `269dd8bffb`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Deserializing async enumerable memory benefit

#### Verified visible text
```text
DeserializeAsyncEnumerable<T> reads the JSON array item by item instead of materializing the whole payload into a List<T>. Full list deserialization keeps the whole list in memory; async enumerable deserialization keeps parser buffers and current item.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S006 / S-188 - `a8f6be5584`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: ResponseContentRead nuance

#### Verified visible text
```text
Important nuance: with default ResponseContentRead, HttpClient typically does not let you start consuming until the full content is received. Internal buffering can involve memory/disk/socket buffers, but the practical point is that you generally do not start consuming until the full content is received.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S007 / S-189 - `8ebea1a074`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Without ResponseHeadersRead you usually wait

#### Verified visible text
```text
Without ResponseHeadersRead, GetAsync uses default ResponseContentRead. It typically does not finish until the entire response body has been read by HttpClient. By the time ReadAsStreamAsync and DeserializeAsyncEnumerable start, content is usually already fully buffered/available. You accepted a stream of objects but often get download-everything-then-yield behavior.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S008 / S-190 - `5da2603961`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Programming view without ResponseHeadersRead

#### Verified visible text
```text
Without ResponseHeadersRead, await GetAsync(url) does not return until HttpClient has read the entire response content. Only then is ReadAsStreamAsync called; this can still parse incrementally from buffered content, useful for incremental parsing API but not early processing or memory savings.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S009 / S-191 - `5e686c81da`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Flow without ResponseHeadersRead code

#### Verified visible text
```text
Flow without ResponseHeadersRead (default ResponseContentRead): GetAsync completes after content is buffered, then ReadAsStreamAsync is called, then DeserializeAsyncEnumerable yields from already available content.
```

#### Verified visible code / code intent
```csharp
using var response = await client.GetAsync(url, ct);
response.EnsureSuccessStatusCode();

await using var stream = await response.Content.ReadAsStreamAsync(ct);

await foreach (var item in JsonSerializer.DeserializeAsyncEnumerable<MovieDto>(stream, options, ct))
{
    // process item
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S010 / S-192 - `a8946230a1`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Programming view with ResponseHeadersRead

#### Verified visible text
```text
With ResponseHeadersRead, GetAsync returns early after headers, ReadAsStreamAsync returns a stream that produces bytes on-demand, DeserializeAsyncEnumerable reads bytes to complete the next object and yields when enough bytes are available. This is best when response is large, you want low memory, early processing, or partial results.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S011 / S-193 - `02c3d7f372`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Flow with ResponseHeadersRead code

#### Verified visible text
```text
Flow with ResponseHeadersRead: request uses HttpCompletionOption.ResponseHeadersRead, reads response stream, then awaits DeserializeAsyncEnumerable so items can be processed as soon as parsed.
```

#### Verified visible code / code intent
```csharp
using var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);
response.EnsureSuccessStatusCode();

await using var stream = await response.Content.ReadAsStreamAsync(ct);

await foreach (var item in JsonSerializer.DeserializeAsyncEnumerable<MovieDto>(stream, options, ct))
{
    // process items as soon as they can be parsed
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S012 / S-194 - `e3c87ff97f`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: ResponseHeadersRead full client code with partial result handling

#### Verified visible text
```text
Client code uses ResponseHeadersRead, reads stream, deserializes async enumerable, ignores null items, appends results incrementally, and handles OperationCanceledException, JsonException, and HttpRequestException so partial results can be kept if acceptable.
```

#### Verified visible code / code intent
```csharp
using var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);
response.EnsureSuccessStatusCode();
await using var stream = await response.Content.ReadAsStreamAsync(ct);
try
{
    await foreach (var item in JsonSerializer.DeserializeAsyncEnumerable<MovieDto>(stream, options, ct))
    {
        if (item is null) continue;
        results.Add(item); // process/store incrementally
    }
}
catch (OperationCanceledException) when (ct.IsCancellationRequested) { /* keep partial results if acceptable */ }
catch (JsonException) { /* truncated/invalid JSON due to disconnect */ }
catch (HttpRequestException) { /* network error */ }
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S013 / S-093 - `b4798a97c0`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why NDJSON over normal JSON array

#### Verified visible text
```text
A normal JSON array response looks like [ { ... }, { ... }, { ... } ]. To stream an array you must keep JSON valid: write [, commas between items, and ] at the end. If the connection drops early the client may receive a broken array and parsing can fail.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S014 / S-094 - `b7c267a310`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON solves JSON array streaming problem

#### Verified visible text
```text
NDJSON is newline-delimited JSON: one JSON object per line, media type usually application/x-ndjson. Each line is a complete JSON document, so it can be parsed incrementally. If connection ends early, previously received lines are still valid and usable.
```

#### Verified visible code / code intent
```csharp
{"id":1,"title":"A"}
{"id":2,"title":"B"}
{"id":3,"title":"C"}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S015 / S-095 - `2f9e8a88fe`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Normal JSON array mid-stream truncation

#### Verified visible text
```text
When an API streams IAsyncEnumerable<T> as a normal JSON array (application/json), the server writes one JSON array. If the connection drops before the closing bracket, the client receives a truncated JSON document.
```

#### Verified visible code / code intent
```csharp
[ {"id":1}, {"id":2}, {"id":3}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S016 / S-096 - `9b6607dda6`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Can client do something to avoid invalid JSON problems

#### Verified visible text
```text
Invalid JSON as a complete document cannot be magically fixed. Client can still process complete elements as they arrive if using streaming parser, and treat disconnect as cancellation. Keep already processed items, stop iterating, and do not treat data as complete unless partial results are acceptable.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S017 / S-097 - `e4054216af`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: DeserializeAsyncEnumerable items before cut

#### Verified visible text
```text
DeserializeAsyncEnumerable<T> can often yield complete items before the cut because it parses sequentially. When truncation happens, an exception is thrown; you can catch it and stop.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S018 / S-098 - `e3c87ff97f`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Client code processing items incrementally and keeping partial results

#### Verified visible text
```text
Client code example: with ResponseHeadersRead and DeserializeAsyncEnumerable, process/store each item as it arrives, and keep partial results on cancellation, JSON truncation, or network error if acceptable.
```

#### Verified visible code / code intent
```csharp
await foreach (var item in JsonSerializer.DeserializeAsyncEnumerable<MovieDto>(stream, options, ct))
{
    if (item is null) continue;
    results.Add(item); // process/store incrementally
}
// catch cancellation/json/network exceptions and keep partial results if acceptable
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S019 / S-099 - `5ff04b2d78`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Normal JSON array is still useful for typical APIs

#### Verified visible text
```text
Normal JSON array is not unusable; it is usually not ideal for long-lived streaming feeds where disconnects are expected and partial delivery is common. It is still good for typical finite, short-lived APIs where clients expect all-or-nothing and retries are acceptable.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S020 / S-100 - `f1a2378c71`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: When JSON array streaming is bad fit

#### Verified visible text
```text
JSON array streaming becomes a bad fit when responses take minutes, contain thousands/millions of items, endpoint is effectively a continuous stream, or partial results are meaningful. In those cases NDJSON or SSE is better because each delivery unit is independent.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S021 / S-101 - `bfaeda5fa4`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: How to make JSON array streaming practical

#### Verified visible text
```text
If you must stream as JSON array: keep server-side and client-side patterns to handle disconnect. Client supports resume semantics with afterId/pageToken. Server orders items stably and includes cursor/token. Client handles partial success deliberately and reconnects from afterId.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S022 / S-150 - `803b64f76d`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON streaming controller action title duplicate

#### Verified visible text
```text
1) NDJSON streaming controller action
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S023 / S-151 - `e53fba018c`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: NDJSON streaming controller code

#### Verified visible text
```text
ASP.NET Core controller writes NDJSON by setting ContentType to application/x-ndjson, serializing each item to JSON, writing the line plus newline, and flushing after each item. Source enumerable yields MovieDto values with cancellation support.
```

#### Verified visible code / code intent
```csharp
[HttpGet("ndjson")]
public async Task GetMoviesNdjson(CancellationToken ct)
{
    Response.StatusCode = StatusCodes.Status200OK;
    Response.ContentType = "application/x-ndjson; charset=utf-8";

    await foreach (var movie in GetMovies(ct))
    {
        var line = JsonSerializer.Serialize(movie, JsonOptions);
        await Response.WriteAsync(line + "\n", ct);
        await Response.Body.FlushAsync(ct);
    }
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S024 / S-148 - `46e87250a2`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: FlushAsync definition and why used

#### Verified visible text
```text
FlushAsync is not a minimal API thing; it is a Stream method. It tells ASP.NET Core: push whatever you currently buffered for the response body out to the client now. Without flushing, data may sit in buffers. For NDJSON/SSE streaming, flushing after each item/event gives “live” behavior.
```

#### Verified visible code / code intent
```csharp
await Response.WriteAsync(...);
await Response.Body.FlushAsync();
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S025 / S-147 - `098e89f232`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: FlushAsync relationship to IAsyncEnumerable return

#### Verified visible text
```text
IAsyncEnumerable<T> can stream without directly calling FlushAsync because framework may flush as it writes. For protocols like SSE or manual NDJSON, use FlushAsync to get real-time behavior and avoid buffering. If returning IAsyncEnumerable<T> as normal JSON, direct FlushAsync usually is not needed.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S026 / S-146 - `c6f8ccf11d`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Difference between FlushAsync and returning IAsyncEnumerable

#### Verified visible text
```text
Returning IAsyncEnumerable<T> from controller lets ASP.NET Core serialize items gradually, but JSON array formatting is controlled by framework. Manual FlushAsync writes bytes yourself, useful when you need to control chunk boundaries and timing, such as NDJSON/SSE.
```

#### Verified visible code / code intent
```csharp
[HttpGet("stream")]
public async IAsyncEnumerable<BookDto> StreamBooks()
{
    await foreach (var book in _bookRepository.GetBooksAsAsyncEnumerable())
    {
        yield return Map(book);
    }
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S027 / S-157 - `90cf4f68ea`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON vs JSON array body looks

#### Verified visible text
```text
Normal JSON array streaming stays a single valid JSON array. Body looks like a JSON array with multiple objects. NDJSON is not an array; it is multiple JSON objects, one per line.
```

#### Verified visible code / code intent
```csharp
[
  {"id":1,"title":"Movie 1"},
  {"id":2,"title":"Movie 2"}
]

{"id":1,"title":"Movie 1"}
{"id":2,"title":"Movie 2"}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S028 / S-155 - `c30e8e2c29`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON newline-delimited JSON

#### Verified visible text
```text
NDJSON means newline-delimited JSON. The response is not a JSON array; it is multiple JSON objects, one per line. Each line is independent JSON data.
```

#### Verified visible code / code intent
```csharp
{"id":1,"title":"Movie 1"}
{"id":2,"title":"Movie 2"}
{"id":3,"title":"Movie 3"}
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S029 / S-164 - `d458216206`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Notes on JSON array format

#### Verified visible text
```text
JSON array response is one JSON document/array. Items may be produced progressively internally, but client usually parses as JSON array. Even if the server streams, format is still array: first [, then elements plus commas, then ].
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S030 / S-154 - `f86a58f3fa`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON content type

#### Verified visible text
```text
Each line is its own JSON object. Content-Type usually application/x-ndjson.
```

#### Verified visible code / code intent
```csharp
application/x-ndjson
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S031 / S-149 - `52862a66ef`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON notes

#### Verified visible text
```text
This returns a stream of JSON objects, each on its own line. Client should set Accept: application/x-ndjson and read line-by-line.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S032 / S-153 - `cf7a57a0e4`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why NDJSON is great

#### Verified visible text
```text
NDJSON is great because client can read line by line, each line is complete JSON, streaming consumption is easy, and there is no need to wait for closing ] of an array. This is why manual WriteAsync + FlushAsync is common for NDJSON.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S033 / S-152 - `3bc66bedb8`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why FlushAsync matters for NDJSON

#### Verified visible text
```text
If you only WriteAsync and do not flush, data may stay buffered and client may not see each line immediately. If you FlushAsync after each line, each item is pushed sooner and client gets “live” behavior. Pattern: serialize item, WriteAsync(json + "\n"), FlushAsync().
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S034 / S-159 - `136c580575`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: FlushAsync still matters despite write async

#### Verified visible text
```text
FlushAsync still matters when you want to be explicit about “push what I wrote now,” especially for NDJSON, SSE, and progressive streaming. It improves chance of low-latency delivery through the pipeline.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S035 / S-158 - `97787eea8b`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: What started means in practice

#### Verified visible text
```text
“Started” means headers are committed. StatusCode, Headers, ContentType, and similar response metadata become locked. That is the important guarantee.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S036 / S-161 - `b241e2a1e8`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Headers committed once response starts

#### Verified visible text
```text
What started means in practice: headers are committed and response metadata is locked: StatusCode, Headers, ContentType, etc.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S037 / S-160 - `7a4a612966`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Bytes may still be behind buffering layers

#### Verified visible text
```text
Starting the response does not guarantee bytes are physically on the client screen. Layers include ASP.NET/server stack, reverse proxy, TCP/network, browser/client buffering. Kestrel can send bytes, but visible output still depends on buffering/proxy/client behavior.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S038 / S-162 - `26e960f193`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: WriteAsync commits headers and begins response

#### Verified visible text
```text
WriteAsync commits headers and begins the response. That means you can no longer change status code/content type/headers after bytes start. ASP.NET Core may flush internally/mark response started; you can still use FlushAsync when you want explicit push behavior.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

### R04-S039 / S-156 - `1453af6df0`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: NDJSON body looks like multiple objects

#### Verified visible text
```text
The NDJSON body looks like multiple JSON objects separated by newlines rather than wrapped in an array.
```

#### Notes
Verified from extracted SVG image/contact sheet; code screenshots preserve key visible code and intent.
---

## 4. Cleaned source notes

- IAsyncEnumerable<T> can stream objects server-side, but the wire format determines client behavior.
- Client-side DeserializeAsyncEnumerable<T> combines byte-stream reading with object-by-object parsing.
- Use HttpCompletionOption.ResponseHeadersRead on the client when you need true streaming and early processing.
- Normal JSON array streaming can fail as a whole document if the connection drops before the closing bracket.
- NDJSON is better for long-lived or partial streams because each line is a complete JSON document.
- Manual NDJSON server pattern: serialize item, WriteAsync(json + "\n"), FlushAsync().
- FlushAsync pushes buffered response bytes sooner, but buffering/proxy/client layers can still affect what users see.
- After response starts, headers/status/content type are committed and should not be changed.
- For JSON-array streaming, use resume tokens/cursors if you need robustness after disconnect.

---
## 5. Minimal interpretation

R04 is the implementation bridge after R03. It explains that `IAsyncEnumerable<T>` can produce objects gradually, but client-visible streaming depends on response format and HTTP/client behavior. A JSON array can be streamed internally yet remain fragile as one complete JSON document. NDJSON changes the unit of delivery to one JSON object per line, making progressive parsing and partial recovery easier. On the client, `ResponseHeadersRead` is required for real early processing instead of waiting for the full response. On the server, manual `WriteAsync` plus `FlushAsync` is used when precise low-latency delivery is needed, especially for NDJSON and SSE-like protocols.

---
## 6. Evidence table
| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| IAsyncEnumerable can produce objects gradually but wire format matters | R04-S001/R04-S002/R04-S003/R04-S004 | extracted SVG image transcript | high |
| ResponseHeadersRead enables true client-side streaming before full body buffering | R04-S006-R04-S012 | extracted SVG image transcript/code | high |
| Normal JSON array streaming is fragile on disconnect because it is one complete document | R04-S013/R04-S015/R04-S016/R04-S017 | extracted SVG image transcript | high |
| NDJSON makes each line a complete JSON document and supports incremental line parsing | R04-S014/R04-S025/R04-S026/R04-S029/R04-S030 | extracted SVG image transcript/code | high |
| Manual NDJSON server pattern writes JSON line and flushes after each item | R04-S022/R04-S023/R04-S024/R04-S033 | extracted SVG image transcript/code | medium-high |
| FlushAsync pushes data sooner but response-start and buffering behavior still matters | R04-S023/R04-S024/R04-S034-R04-S038 | extracted SVG image transcript | high |
| SSE/EventSource material is not R04 despite initial coordinate overlap | R04 boundary review | boundary review | high |

---
## 7. Question hooks

- Why is `IAsyncEnumerable<T>` not enough by itself to guarantee client-visible streaming?
- What changes when using `HttpCompletionOption.ResponseHeadersRead`?
- Why can a normal JSON array become invalid if the connection drops mid-stream?
- Why is NDJSON better for long-lived or partial streaming?
- What is the server-side NDJSON pattern with `WriteAsync` and `FlushAsync`?
- What does `FlushAsync` actually guarantee, and what does it not guarantee?
- What does it mean when response headers are committed/started?
- When is normal JSON array still acceptable?
- How can resume semantics make JSON array streaming safer?
- Why were SSE/EventSource images excluded from R04?

---
## 8. Open review issues
- R04 excludes SSE/EventSource sources to R05; R05 must process them next.
- Some code screenshots are small; if exact punctuation is important, inspect `audit-assets/R04-source-images/` alongside this transcript.
- Final coverage audit should verify there are no remaining unreviewed R04-like images after R05/R06.
