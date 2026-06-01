# R03 - Streaming objects / async iteration / REST API concerns

Conspect: `streaming`  
File type: **source-preserving region transcript**  
Stage: **stage-3 / verified region transcript v001**  
Generated: 2026-06-01 22:55:38 UTC

---

## Direction check

Goal:
Convert the streaming Excalidraw conspect into source-preserving region text without losing images.

Now:
R01 and R02 are done. R03 processes object streaming, async iteration, and REST API design concerns.

This step:
Create R03 transcript from 36 sources, after local boundary review.

Why:
R03 explains how byte streaming becomes object streaming via `IAsyncEnumerable<T>`, `await foreach`, ASP.NET Core JSON streaming, EF Core async rows, and REST-friendly endpoint design.

Next:
R04 `IAsyncEnumerable` / NDJSON / `FlushAsync` implementation road.

---

## 0. You are here

Current region: `R03 - Streaming objects / async iteration / REST API concerns`  
Status: `verified transcript from extracted SVG images`  
Source count: `36`  
Known limitations: small code screenshots and diagram-only slides are marked.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- streaming as continuous network flow
- synchronous vs asynchronous iteration
- IAsyncEnumerable<T> and await foreach
- single query/result stream, not parallel DB calls
- ASP.NET Core + EF Core object streaming
- REST API concerns for streaming endpoints: filtering, sorting, pagination, HATEOAS, content negotiation, caching, resilience
```

Key ideas:

- Streaming sends/receives data progressively instead of buffering the whole payload first.
- Async iteration frees threads during I/O wait and only needs a thread while executing code for each item.
- IAsyncEnumerable<T> can let ASP.NET Core/System.Text.Json stream objects to the consumer.
- Object streaming is usually one query and sequential async row reads, not one DB query per element.
- For EF Core, avoid ToListAsync if you want streaming; keep DbContext alive and support cancellation.
- REST-friendly streaming endpoints still need filters/sorting at the data source, stable order, cursor pagination, content negotiation, and careful caching/resilience choices.

Reading quality:
```text
overall_conceptual_understanding: high
main_source_readability: mostly high
code_readability: medium-high to high; some dark/code screenshots are small
spatial_layout_understanding: high after local R03 boundary review
limitations:
- S-007/S-008/S-009 are diagram-only and exact tiny spacing is not important.
- S-014 dark/code screenshot is small; code is transcribed to visible intent.
- S-087/S-091 dark Q&A screenshots contain some browser/UI noise; main answer text is readable.
- S-028 bottom of non-streaming timeline is slightly cropped after visible portion.
confidence_summary: High for concepts and boundary; medium-high for exact punctuation in small code screenshots.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-004, S-005, S-006, S-007, S-029, S-008, S-030, S-028, S-009, S-010, S-091, S-001, S-002, S-090, S-003, S-087, S-011, S-088, S-012, S-089, S-092, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024, S-025, S-026, S-027
```

Pulled into R03 after semantic review:
```text
S-024, S-025, S-026, S-027 -> initially UNSPLIT, but they continue the REST-friendly streaming endpoint design tail: caching, observability/resilience, and endpoint contract.
```

Duplicate-use note:
```text
S-090 and S-015 use the same visible code snippet image in two canvas placements; both image uses are recorded.
```

Checked but not included:
```text
S-084 -> R04 candidate; starts NDJSON streaming controller action implementation, not R03 high-level REST concerns.
```

---

## 1. Original Excalidraw labels
```text
streaming objects
sync vs async iteration
IAsyncEnumerable<T>
REST API concerns
filtering / sorting / pagination / HATEOAS / content negotiation / caching
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| R03-S001 | S-004 | IU-004 | `a5138159cf` | `verified-from-extracted-svg-image` | no | Streaming definition |
| R03-S002 | S-005 | IU-005 | `57dda1cff1` | `verified-from-extracted-svg-image` | no | A few words on streaming |
| R03-S003 | S-006 | IU-006 | `82efdf3d5e` | `verified-from-extracted-svg-image` | no | Synchronous vs asynchronous iteration intro |
| R03-S004 | S-007 | IU-007 | `0519fd4e15` | `verified-from-extracted-svg-image` | diagram-labels-only | Sync vs async iteration diagram 1 |
| R03-S005 | S-029 | IU-029 | `6278843a55` | `verified-from-extracted-svg-image` | slightly-small-text | Not parallel DB calls; faster time-to-first-result |
| R03-S006 | S-008 | IU-008 | `e9154019a5` | `verified-from-extracted-svg-image` | diagram-labels-only | Sync vs async iteration diagram 2 |
| R03-S007 | S-030 | IU-030 | `2fb3f1b5ed` | `verified-from-extracted-svg-image` | no | Streaming pipeline key point |
| R03-S008 | S-028 | IU-028 | `1d5323c246` | `verified-from-extracted-svg-image` | bottom-cropped-after-visible-non-streaming-start | Concrete timeline: streaming vs ToListAsync |
| R03-S009 | S-009 | IU-009 | `d865a2c85a` | `verified-from-extracted-svg-image` | diagram-labels-only | Sync vs async iteration diagram 3 |
| R03-S010 | S-010 | IU-010 | `3336c0c8cc` | `verified-from-extracted-svg-image` | no | IAsyncEnumerable supports streaming |
| R03-S011 | S-091 | IU-091 | `f408caaa47` | `verified-from-extracted-svg-image` | browser-top-noise | Async iteration thread mental model |
| R03-S012 | S-001 | IU-001 | `0b47610612` | `verified-from-extracted-svg-image` | no | What streaming means for APIs |
| R03-S013 | S-002 | IU-002 | `fd9db43c2e` | `verified-from-extracted-svg-image` | no | Synchronous iteration |
| R03-S014 | S-090 | IU-090 | `398f8379bc` | `verified-from-extracted-svg-image` | no | StreamBooks DTO mapping code duplicate A |
| R03-S015 | S-003 | IU-003 | `79d472135b` | `verified-from-extracted-svg-image` | no | Asynchronous iteration |
| R03-S016 | S-087 | IU-087 | `9cde088447` | `verified-from-extracted-svg-image` | top-context-cropped | Same query result stream, not one DB call per item |
| R03-S017 | S-011 | IU-011 | `12fed4d3eb` | `verified-from-extracted-svg-image` | no | Practical ASP.NET Core + EF Core notes: JSON format |
| R03-S018 | S-088 | IU-088 | `0455744f18` | `verified-from-extracted-svg-image` | dark-code-slightly-small | ADO.NET analogy |
| R03-S019 | S-012 | IU-012 | `17a6484951` | `verified-from-extracted-svg-image` | no | EF Core caveats and cancellation |
| R03-S020 | S-089 | IU-089 | `740ae5b4da` | `verified-from-extracted-svg-image` | no | One query / sequential async row reads |
| R03-S021 | S-092 | IU-092 | `6ac838ac6e` | `verified-from-extracted-svg-image` | no | Small vs large results mental model |
| R03-S022 | S-013 | IU-013 | `5aaeff58eb` | `verified-from-extracted-svg-image` | no | Repository returns AsAsyncEnumerable |
| R03-S023 | S-014 | IU-014 | `93247c1563` | `verified-from-extracted-svg-image` | code-small | Controller returns IAsyncEnumerable<Book> |
| R03-S024 | S-015 | IU-015 | `398f8379bc` | `duplicate-visible-image-use-recorded` | no | StreamBooks DTO mapping code duplicate B |
| R03-S025 | S-016 | IU-016 | `ca95401a18` | `verified-from-extracted-svg-image` | no | Filtering at data source |
| R03-S026 | S-017 | IU-017 | `18261a0b09` | `verified-from-extracted-svg-image` | no | Pattern: IQueryable then AsAsyncEnumerable |
| R03-S027 | S-018 | IU-018 | `cf58b25382` | `verified-from-extracted-svg-image` | no | Sorting explicit and stable |
| R03-S028 | S-019 | IU-019 | `7158dc3314` | `verified-from-extracted-svg-image` | no | Data shaping |
| R03-S029 | S-020 | IU-020 | `bc5833ad87` | `verified-from-extracted-svg-image` | no | Streaming-friendly pagination |
| R03-S030 | S-021 | IU-021 | `0155dedbc5` | `verified-from-extracted-svg-image` | no | HATEOAS with streaming arrays |
| R03-S031 | S-022 | IU-022 | `a21b9dff25` | `verified-from-extracted-svg-image` | no | Content negotiation |
| R03-S032 | S-023 | IU-023 | `38b9c6ef01` | `verified-from-extracted-svg-image` | no | Why NDJSON is great |
| R03-S033 | S-024 | IU-024 | `f02d8ace77` | `verified-from-extracted-svg-image` | no | Caching usually limited for streaming endpoints |
| R03-S034 | S-025 | IU-025 | `86ba3c4445` | `verified-from-extracted-svg-image` | no | Better caching strategy |
| R03-S035 | S-026 | IU-026 | `0767c76762` | `verified-from-extracted-svg-image` | no | Observability and resilience |
| R03-S036 | S-027 | IU-027 | `18fac0309a` | `verified-from-extracted-svg-image` | no | REST-friendly streaming endpoint contract |

---

## 3. Source transcript

### R03-S001 / S-004 - `a5138159cf`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Streaming definition

#### Verified visible text
```text
Streaming

A method of transmitting or receiving data over a network as a steady, continuous flow instead of all at once.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S002 / S-005 - `57dda1cff1`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: A few words on streaming

#### Verified visible text
```text
A Few Words on Streaming

Often used for video/audio, but also useful when working with large sets of data.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S003 / S-006 - `82efdf3d5e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Synchronous vs asynchronous iteration intro

#### Verified visible text
```text
Synchronous Vs. Asynchronous Iteration

Iteration over collections is enabled by System.Collections.IEnumerable.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S004 / S-007 - `0519fd4e15`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `diagram-labels-only`
- confidence: `medium-high`
- theme: Sync vs async iteration diagram 1

#### Verified visible text
```text
Synchronous Vs. Asynchronous Iteration

Diagram labels:
- iteration
- operation
- iteration
- operation
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S005 / S-029 - `6278843a55`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `slightly-small-text`
- confidence: `medium-high`
- theme: Not parallel DB calls; faster time-to-first-result

#### Verified visible text
```text
so it is faster than just getting one by one without async enumerable because the db calls start almost at the same time?

Not because DB calls "start at the same time". With streaming you typically still have one query and one forward-only reader. It's faster mainly in time-to-first-result, not necessarily in total time.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S006 / S-008 - `e9154019a5`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `diagram-labels-only`
- confidence: `medium-high`
- theme: Sync vs async iteration diagram 2

#### Verified visible text
```text
Synchronous Vs. Asynchronous Iteration

Diagram labels:
- iteration
- operation
- iteration
- operation
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S007 / S-030 - `2fb3f1b5ed`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Streaming pipeline key point

#### Verified visible text
```text
Key point

Streaming = overlap of:
- DB reading (producer)
- JSON serialization + network sending (consumer)

Not parallel queries — just a pipeline where work is overlapped and the client gets early results.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S008 / S-028 - `1d5323c246`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `bottom-cropped-after-visible-non-streaming-start`
- confidence: `high`
- theme: Concrete timeline: streaming vs ToListAsync

#### Verified visible text
```text
Concrete timeline (single query, single stream)

Imagine each book row becomes available from DB every ~5 ms, and serializing+sending a row takes ~3 ms (numbers just to illustrate).

Streaming (IAsyncEnumerable)
- t=0: send SQL
- t=10: DB yields Book #1
- t=10-13: server serializes+sends Book #1
- t=15: DB yields Book #2 (DB kept going; it didn't wait for the whole response to finish)
- t=15-18: serialize+send Book #2

The key is: you don't wait for "entire list materialized" before sending anything. Work is done as a pipeline.

Non-streaming (ToListAsync)
- t=0: send SQL
- t=10: Book #1 exists at DB, but you don't return it yet
- t=10-50000: EF reads all rows, builds list
- t=50000-52000: serialize entire list
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S009 / S-009 - `d865a2c85a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `diagram-labels-only`
- confidence: `medium-high`
- theme: Sync vs async iteration diagram 3

#### Verified visible text
```text
Synchronous Vs. Asynchronous Iteration

Diagram labels:
- iteration
- operation
- iteration
- operation
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S010 / S-010 - `3336c0c8cc`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: IAsyncEnumerable supports streaming

#### Verified visible text
```text
IAsyncEnumerable<T>

Supporting Streaming with IAsyncEnumerable<T>

IAsyncEnumerable<T> provides the ability to iterate over a set of values asynchronously.

Since ASP.NET Core 6 System.Text.Json supports streaming, which, combined with IAsyncEnumerable<T>, can result in objects being streamed to the consumer.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S011 / S-091 - `f408caaa47`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `browser-top-noise`
- confidence: `medium-high`
- theme: Async iteration thread mental model

#### Verified visible text
```text
when we do async iteration, we do need a thread on each element arrived?

Yes — to execute your code for that element, a thread is needed.

But only briefly, when there's actual work to do.

The right mental model

For async iteration (await foreach), each item typically has two phases:

1) Waiting for the next item (I/O wait)
- No thread needed (that's the async benefit)

2) Processing the item in your code
- A thread is needed to run your code
- then if you await again, the thread is released again
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S012 / S-001 - `0b47610612`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: What streaming means for APIs

#### Verified visible text
```text
1) What "streaming" means (image 14)

Streaming = sending/receiving data over the network as a continuous flow instead of building the entire payload first and sending it "all at once".

Why it's useful (especially for APIs):
- Large datasets: you don't want to load everything into memory before responding.
- Faster first byte / first item: client starts getting results earlier.
- Backpressure-ish behavior: you naturally produce items as the consumer reads (not perfect backpressure in HTTP/1.1, but still helps).
- Common in video/audio, but also great for "send me 1M rows" style problems.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S013 / S-002 - `fd9db43c2e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Synchronous iteration

#### Verified visible text
```text
2) Synchronous vs asynchronous iteration (image 14)

The slide is contrasting:

Synchronous iteration: IEnumerable<T>
- You iterate items with foreach.
- The "operation" that produces the next element is blocking.
- If getting the next item requires I/O (DB, network), the thread is stuck waiting.

Conceptually:
- iteration asks for next item — operation blocks — item returned — repeat
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S014 / S-090 - `398f8379bc`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: StreamBooks DTO mapping code duplicate A

#### Verified visible text
```text
[HttpGet("booksstream")]
public async IAsyncEnumerable<BookDto> StreamBooks()
{
    await foreach (var bookFromRepository in _booksRepository.GetBooksAsAsyncEnumerable())
    {
        // add a delay to visually see the effect
        await Task.Delay(500);
        yield return _mapper.Map<BookDto>(bookFromRepository);
    }
}
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S015 / S-003 - `79d472135b`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Asynchronous iteration

#### Verified visible text
```text
Asynchronous iteration: IAsyncEnumerable<T>
- You iterate with await foreach.
- The "operation" that produces the next element is awaitable (non-blocking).
- Great when each item requires I/O, because threads are not held hostage.

Conceptually:
- iteration asks for next item — operation awaits I/O — thread is freed — item returned — repeat

That's why the slide says "async iterator approach leads to threads being freed up earlier".
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S016 / S-087 - `9cde088447`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `top-context-cropped`
- confidence: `medium-high`
- theme: Same query result stream, not one DB call per item

#### Verified visible text
```text
but that separate wait for each element is not from separate db call, its the db call that gets elements sequentially?

Yes — exactly.

The separate await for each element is usually not a separate DB query.

It's usually:
- one DB query (one command)
- one open data reader / result stream
- many async "read next row" operations on that same stream

So each wait is typically:
"wait for the next row from the existing query result stream"

not:
"send a brand new query to the database
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S017 / S-011 - `12fed4d3eb`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Practical ASP.NET Core + EF Core notes: JSON format

#### Verified visible text
```text
What I'd add (practical ASP.NET Core + EF Core notes)

A) Streaming JSON format

Most "streamed JSON" responses are still a single JSON array like:

[ { ... }, { ... }, { ... } ]

but items can be written progressively as the array is being built.

If you want true event-by-event streaming semantics, you might consider:
- Server-Sent Events (SSE) (text/event-stream)
- gRPC streaming
- WebSockets

Those are often clearer for "continuous" streams than a JSON array.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S018 / S-088 - `0455744f18`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `dark-code-slightly-small`
- confidence: `medium-high`
- theme: ADO.NET analogy

#### Verified visible text
```text
ADO.NET analogy (most concrete)

await using var reader = await cmd.ExecuteReaderAsync(ct);
while (await reader.ReadAsync(ct))
{
    // one row at a time from the SAME query result
}

- ExecuteReaderAsync = starts the query
- ReadAsync = advances to next row (same result stream)

That ReadAsync per row is the async wait you're hearing about.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S019 / S-012 - `17a6484951`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: EF Core caveats and cancellation

#### Verified visible text
```text
B) EF Core caveats
- Keep the DbContext alive while enumerating (it is in a request).
- Avoid materializing early (ToListAsync) if you want streaming.
- Be careful with lazy loading / navigation properties during streaming (can cause N+1 queries).

C) Cancellation

With streaming endpoints, support client disconnect/cancellation:
- use HttpContext.RequestAborted (cancellation token)
- stop enumeration when cancelled

D) When streaming is a win
- large export endpoints
- log/event feeds
- "download all data" scenarios
- reducing time-to-first-result
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S020 / S-089 - `740ae5b4da`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: One query / sequential async row reads

#### Verified visible text
```text
- one query
- sequential async row reads
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S021 / S-092 - `6ac838ac6e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Small vs large results mental model

#### Verified visible text
```text
For small results, buffering all items is often simpler and good enough. For large or slow I/O results, async streaming is better because it avoids blocking threads and avoids buffering everything.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S022 / S-013 - `5aaeff58eb`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Repository returns AsAsyncEnumerable

#### Verified visible text
```text
public IAsyncEnumerable<Book> GetBooksAsAsyncEnumerable()
{
    return _context.Books.AsAsyncEnumerable<Book>();
}
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S023 / S-014 - `93247c1563`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `medium-high`
- cut_off: `code-small`
- confidence: `medium-high`
- theme: Controller returns IAsyncEnumerable<Book>

#### Verified visible text
```text
[HttpGet("booksstream")]
public async IAsyncEnumerable<Book> StreamBooks()
{
    await foreach (var bookFromRepository in _booksRepository.GetBooksAsAsyncEnumerable())
    {
        yield return bookFromRepository;
    }
}
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S024 / S-015 - `398f8379bc`

Metadata:

- status: `duplicate-visible-image-use-recorded`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: StreamBooks DTO mapping code duplicate B

#### Verified visible text
```text
[HttpGet("booksstream")]
public async IAsyncEnumerable<BookDto> StreamBooks()
{
    await foreach (var bookFromRepository in _booksRepository.GetBooksAsAsyncEnumerable())
    {
        // add a delay to visually see the effect
        await Task.Delay(500);
        yield return _mapper.Map<BookDto>(bookFromRepository);
    }
}
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S025 / S-016 - `ca95401a18`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Filtering at data source

#### Verified visible text
```text
1) Filtering (recommended, but do it at the data source)

What to add
Support query params such as:
- ?authorId=...
- ?q=...
- ?from=...&to=...
- ?status=...

Key rule
Apply filters as IQueryable before converting to IAsyncEnumerable:
- Good: filter in SQL — stream rows out
- Bad: stream everything then filter in memory (wastes I/O, CPU, bandwidth)
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S026 / S-017 - `18261a0b09`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Pattern: IQueryable then AsAsyncEnumerable

#### Verified visible text
```text
Pattern
- repository returns IQueryable<TEntity>
- controller applies filters/sorting
- only at the end: query.AsAsyncEnumerable()
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S027 / S-018 - `cf58b25382`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Sorting explicit and stable

#### Verified visible text
```text
2) Sorting (recommended, but be explicit and stable)

What to add
?sort=title / ?sort=-createdAt / ?sort=title,-createdAt

Key rule
Always define a stable order. For streaming, you usually want deterministic results:
- If sorting can be absent, default to something stable (e.g. Id or CreatedAt, Id)
- Otherwise you can see "random" order depending on DB plan

Note
Sorting may require DB work (indexes). But it's still compatible with streaming.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S028 / S-019 - `7158dc3314`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Data shaping

#### Verified visible text
```text
3) Data shaping (select fields) (possible, but keep it simple)

What to add
- ?fields=id,title,price
- or "friendly vs full" representations

How
Project to DTO early:
- Select(x => new BookDto { ... })

Trade-off
- Dynamic field selection complicates EF translation and serialization.
- If you do dynamic shaping, consider:
  - a few named shapes: ?view=summary|detail
  - or media types (content negotiation) rather than arbitrary fields.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S029 / S-020 - `bc5833ad87`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Streaming-friendly pagination

#### Verified visible text
```text
4) Pagination (streaming-friendly forms)

Classic page-based pagination (pageNumber/pageSize with totalCount) conflicts with streaming because:
- total count requires a separate query
- "pages" imply bounded sets (still possible, but less "streamy")

What to add instead
Cursor pagination (best match):
- ?after=<cursor>&limit=100
- Order by a key (e.g. CreatedAt, Id)
- Return next cursor in headers or in the response metadata

If you must do page pagination
- do two queries:
  - one COUNT(*)
  - one streaming query for the page
But then it's not "infinite streaming"; it's just "stream a page".
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S030 / S-021 - `0155dedbc5`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: HATEOAS with streaming arrays

#### Verified visible text
```text
5) HATEOAS (possible; best at "collection-level")

With streaming JSON arrays, adding per-item links is fine (each item includes links), but "collection" links like next/prev are tricky because:
- you often don't know the final state until the end
- you may want to provide next cursor after reading the last emitted item

Practical approach
- Include item-level links always: self, update, delete
- For collection navigation:
  - include next cursor as an HTTP header (e.g. Link: <...>; rel="next")
  - or return an envelope object (but envelopes reduce "pure array streaming")

Note: Classic HATEOAS formats (HAL, Siren, JSON:API) often expect an envelope with _links, which pushes you away from "simple streaming array".
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S031 / S-022 - `a21b9dff25`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Content negotiation

#### Verified visible text
```text
6) Content negotiation (very relevant)

What to add
Support different representations via Accept:
- application/json (default)
- application/x-ndjson (newline-delimited JSON) — excellent for streaming
- text/csv for exports
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S032 / S-023 - `38b9c6ef01`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-candidate-confirmed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why NDJSON is great

#### Verified visible text
```text
Why NDJSON is great

Instead of one JSON array, you send one JSON object per line:

{"id":1,...}
{"id":2,...}

This is easier for clients to parse incrementally, and avoids "unfinished JSON array" issues if connection drops.

ASP.NET Core doesn't give NDJSON out of the box as a first-class formatter in the same way for every scenario, but it's straightforward to implement by writing to the response stream manually.
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S033 / S-024 - `f02d8ace77`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `pulled-from-unsplit-after-boundary-review`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Caching usually limited for streaming endpoints

#### Verified visible text
```text
7) Caching (usually limited for streaming endpoints)

Streaming endpoints are commonly:
- large
- personalized
- parameterized (filters/sorts)
So caching is often low-value.

What you can do
- If the stream is public and stable, set Cache-Control: public, max-age=...
- You can also support validation:
  - ETag / Last-Modified

Big caveat
ETag for a stream is hard because:
- the "representation" might be huge
- it depends on filters/sorts
- computing a hash of the whole response defeats streaming
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S034 / S-025 - `86ba3c4445`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `pulled-from-unsplit-after-boundary-review`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Better caching strategy

#### Verified visible text
```text
Better caching strategy
- cache the source data or query results server-side (IMemoryCache/Redis)
- or cache at CDN for common filter combinations only
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S035 / S-026 - `0767c76762`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `pulled-from-unsplit-after-boundary-review`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Observability and resilience

#### Verified visible text
```text
8) Observability + resilience (highly recommended additions)

Not in your list, but important for streaming endpoints:
- Cancellation: stop streaming when client disconnects (HttpContext.RequestAborted)
- Rate limits: streaming can tie up connections
- Timeouts: avoid infinite streams unless intentional
- Compression: gzip/br can help a lot, but may buffer; test with your setup
- Backpressure: ensure you're not producing faster than the network can send (usually handled by awaiting writes)
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

### R03-S036 / S-027 - `18fac0309a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `pulled-from-unsplit-after-boundary-review`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: REST-friendly streaming endpoint contract

#### Verified visible text
```text
Suggested "REST-friendly streaming endpoint" contract

If you want to keep it clean and practical:
1. Filtering + sorting in query string
2. Cursor pagination (after, limit)
3. Content negotiation: JSON array vs NDJSON vs CSV
4. Item-level HATEOAS links
5. Limited caching (mostly no-store/private unless clearly public)
```

#### Notes

Verified from extracted SVG image; exactness is high for visible text unless limitations are marked.

---

## 4. Cleaned source notes

- Streaming is continuous network transfer rather than building and sending the entire payload all at once.
- Async iteration with `IAsyncEnumerable<T>` lets producer work, serializer/network writes, and consumer reads overlap as a pipeline.
- The main win is often time-to-first-result and lower buffering, not parallel DB queries.
- EF Core/ADO.NET async streaming usually means one query/result stream and sequential async row reads.
- ASP.NET Core can stream objects from `IAsyncEnumerable<T>` through System.Text.Json, but JSON arrays still have caveats compared with SSE/gRPC/WebSockets/NDJSON.
- For streaming endpoints, apply filtering/sorting/projection before converting to `IAsyncEnumerable` so work happens at the data source.
- Cursor pagination and content negotiation fit streaming better than classic page-number pagination and envelopes.
- Caching streaming endpoints is often limited; public stable streams can use cache headers, but personalized/filter-heavy streams are low-value to cache.
- Cancellation, rate limits, timeouts, compression behavior, and backpressure are important for resilient streaming endpoints.

---

## 5. Minimal interpretation

R03 explains object-level streaming. R02 handled byte/payload streams; R03 shows how APIs can progressively produce objects with `IAsyncEnumerable<T>` and `await foreach`. The important distinction is that streaming does not mean parallel database queries. It usually means one query/result stream, sequential async row reads, and an overlapped pipeline: database reading, JSON serialization, network sending, and client consumption can start before the whole collection is materialized. The REST part then asks how to make such endpoints practical: filters, sorting, projection, cursor pagination, content negotiation, limited caching, cancellation, and resilience.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Streaming is continuous flow instead of all at once | R03-S001/R03-S002/R03-S010 | extracted SVG image transcript | high |
| Async iteration frees threads during I/O wait | R03-S011/R03-S014/R03-S016 | extracted SVG image transcript | high |
| Streaming is pipeline overlap, not parallel DB calls | R03-S005/R03-S007/R03-S008/R03-S016/R03-S017 | extracted SVG image transcript | high |
| ASP.NET Core + IAsyncEnumerable can stream objects to consumer | R03-S010/R03-S023/R03-S024/R03-S026/R03-S027 | extracted SVG image transcript/code | medium-high |
| EF Core streaming should avoid early materialization and support cancellation | R03-S018/R03-S025 | extracted SVG image transcript | high |
| REST-friendly streaming still needs filters/sorting/pagination/content negotiation/caching/resilience | R03-S026-R03-S036 | extracted SVG image transcript | high |

---

## 7. Question hooks

- What does streaming mean at the object/API level?
- How does async iteration differ from synchronous iteration?
- Why does `IAsyncEnumerable<T>` help threads be freed during I/O waits?
- Why is streaming usually one query/result stream rather than one DB call per element?
- What is the difference between time-to-first-result and total time?
- Why should filters/sorting be applied before `AsAsyncEnumerable()`?
- Why does `ToListAsync()` defeat streaming?
- When is NDJSON better than a streamed JSON array?
- Why does classic page pagination conflict with streaming?
- Why is caching often low-value for streaming endpoints?
- What resilience features should streaming endpoints support?

---

## 8. Open review issues

- `S-084` starts the implementation-focused NDJSON road and should be handled in R04.
- Exact punctuation in small/dark code screenshots should be verified if used as runnable code; concepts are clear.
- If R04 review finds that `S-023` should be repeated as bridge context, cross-reference it instead of duplicating ownership.
