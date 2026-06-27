# processing data as stream in dif situations, httpclient,endpoint,browser,websockets — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

## Source policy

Screenshots are the primary source. Candidate regions, nearest labels, and vector paths were used only as navigation hints. Every embedded screenshot was visually reviewed before region assignment.

## R01 — ASP.NET Core request-body streams, loops, and PipeReader

Request.Body is a Stream: repeatedly call ReadAsync until it returns 0, because a successful read may return fewer bytes than the buffer size. ReadExactly/ReadAtLeast are specialized alternatives when a fixed minimum is required. PipeReader exposes a ReadOnlySequence and requires AdvanceTo(consumed, examined); unconsumed segments remain available on the next iteration.

**Reviewed image uses:** S-001, S-002, S-003, S-005, S-006, S-007, S-009

**Assigned SVG text nodes:** T-001, T-002, T-003, T-004, T-006, T-007, T-009, T-010, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-019, T-020, T-021

## R02 — IOException, HttpRequestException, cancellation, and failure boundaries

Acquiring an HttpClient response normally reports request/protocol failures as HttpRequestException, but once code is reading the returned content stream, ordinary stream failures such as IOException may surface directly. ASP.NET Core request-body reads can also fail as stream I/O or request-abort cancellation. Keep exception handling around the operation whose contract actually owns the failure.

**Reviewed image uses:** S-004, S-008, S-010

**Assigned SVG text nodes:** T-005, T-008, T-011

## R03 — HttpClient response streaming, ResponseHeadersRead, and CopyToAsync

Use HttpCompletionOption.ResponseHeadersRead when processing an HTTP response incrementally. ReadAsStreamAsync gives direct chunk inspection; CopyToAsync is the simpler choice when bytes should be forwarded unchanged. A read count of 0 marks end-of-stream. ResponseHeadersRead avoids waiting for full content buffering before control returns.

**Reviewed image uses:** S-020, S-021, S-022, S-023

**Assigned SVG text nodes:** T-058, T-059

## R04 — ASP.NET Core response BodyWriter and PipeWriter

HttpResponse.BodyWriter is a PipeWriter for efficient response construction. Request a span, write headers and payload into it, Advance by the exact number of bytes produced, then FlushAsync. This avoids unnecessary temporary arrays and keeps ownership and written-length accounting explicit.

**Reviewed image uses:** S-011, S-012

**Assigned SVG text nodes:** T-022, T-023

## R05 — Browser Fetch ReadableStream, reader loops, and TextDecoder

Browser fetch exposes response.body as a ReadableStream. A reader loop consumes Uint8Array chunks until done. Text must be decoded with a streaming TextDecoder so multibyte UTF-8 characters split across chunks are preserved; binary protocols can process the bytes directly.

**Reviewed image uses:** S-013, S-016

**Assigned SVG text nodes:** T-024, T-025, T-026, T-027, T-028, T-029, T-030, T-031

## R06 — WebSocket message framing, server receive loops, and browser message events

A WebSocket runs over TCP but exposes messages, not an unrestricted byte stream. Server ReceiveAsync can return several chunks for one message; EndOfMessage identifies the last chunk. Browser message events normally deliver a complete text string, Blob or ArrayBuffer. Protocol-level type fields and smaller application messages are needed when the application wants chunk-like processing.

**Reviewed image uses:** S-014, S-015, S-017, S-018, S-019

**Assigned SVG text nodes:** T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-042, T-043, T-044, T-045, T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057


## Closure

```text
embedded assets: 23
total image uses: 23
processed image uses: 23
restored image uses: 23
duplicate placements: 0
SVG text nodes: 59
processed SVG text nodes: 59
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
