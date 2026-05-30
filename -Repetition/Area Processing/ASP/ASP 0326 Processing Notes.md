# ASP 0326 Processing Notes

Status: draft / processing status notes.

Source:
- `qs asp 0326.svg`

Related files:
- [[ASP 0326 Area Source Conversion]]
- [[ASP 0326 Deep Fragment Processing]]

## Purpose

Track the processing history and next actions for the ASP 0326 area note.

This file does not own the conversion content or the deep questions themselves. It owns status, batch history, promotion decisions and unresolved checks.

## Included batches

| Batch | Included in repo files | Target file |
|---|---|---|
| Base area-source conversion | yes | [[ASP 0326 Area Source Conversion]] |
| Day 10 deep processing | yes | [[ASP 0326 Deep Fragment Processing]] |
| Day 30 deep processing | yes | [[ASP 0326 Deep Fragment Processing]] |
| Day 13/14/16/17 deep processing | yes | [[ASP 0326 Deep Fragment Processing]] |
| Day 22/24/25 deep processing | yes | [[ASP 0326 Deep Fragment Processing]] |
| AP-2 remaining-days deep processing: Days 01-09, 11-12, 15, 19-21, 23 | yes | [[ASP 0326 Deep Fragment Processing]] |

## Source days currently represented

```text
01-17
19-25
30
```

No explicit day labels were found for:

```text
18
26-29
```

## Current interpretation

The source is an old visual/source ASP area note.

It contains:
- topic-note candidates;
- sections of possible topic notes;
- literal screenshot/code fragments;
- syntax/feature fragments;
- unclear shorthand labels;
- repeat questions;
- deep-processing questions for all represented source days.

## Important boundaries

```text
Do not create repeat units from every source day automatically.
Do not write to chains/schedules from this file.
Do not treat topic-note candidates as final canonical topic notes until promoted.
Do not hide unclear fragments; keep source-check markers visible.
```

## Deep-processing status

| Days | Status | Notes |
|---|---|---|
| Days 01-09 | deep processed | StringReader, System.Text.Json, SSE buffering, route constraints, Retry-After, compression, ProblemDetails, caching, Razor, EF comparer, auth/security basics. |
| Day 10 | deep processed | HttpClientFactory, DelegatingHandler, streaming retry, Polly, SSE/EventSource, hedging, OptionsMonitor. |
| Days 11-12 | deep processed / sparse where source is sparse | Hashing theory, Identity, lockout, RateLimiter, Redis, static state, reCAPTCHA. |
| Days 13/14/16/17 | deep processed | FluentValidation, middleware response writing, request body reading, Polly, RateLimiter, OIDC, token storage, ProblemDetails, ETag. |
| Day 15 | deep processed | HttpClient pool/DNS, shared Polly pipelines, ConfigureAwait, async state machine, Produces/Vary, password hasher, Content-Disposition. |
| Days 19-21 | deep processed / sparse where source is sparse | OIDC resources/events, ReadAsStreamAsync buffering, WebSockets, custom authorization policy, endpoint metadata, RandomNumberGenerator, options with DI. |
| Days 22/24/25 | deep processed | EF/LINQ, transactions, interceptors, DTOs, Span/Memory, UTF8 chunks, content negotiation, exception filters. |
| Day 23 | deep processed | REST IDs/bulk methods, IQueryable, protector services, WebSockets one-send-one-receive, Channels, async enumerable, C# ref/in/out, locks, EF state. |
| Day 30 | deep processed | browser storage, antiforgery mismatch, EF translation, interceptors, content negotiation, WebSockets, REST/HATEOAS. |
| Days 18, 26-29 | no explicit source labels | Nothing to process unless source is reviewed visually and labels are found. |

## Priority promotion candidates

```text
1. HttpClientFactory / DelegatingHandler / streaming retry / request recreation.
2. Cookie/JWT/OIDC/token storage/auth ticket flow.
3. EF Core LINQ translation / DbContext concurrency / transactions / interceptors.
4. ProblemDetails / exception filters / middleware response writing.
5. Antiforgery / CORS / CSRF boundary.
6. WebSockets protocol/state/send-receive/subprotocol handling.
7. Streams / UTF8 decoder / StreamReader / ReadAsString / buffering caveats.
8. Cache invalidation / stampede / distributed/hybrid cache.
9. Identity lockout / RateLimiter / Redis distributed state.
10. C# memory/struct/equality/Span/async-state-machine fragments.
```

## Unresolved source checks

```text
- Day 01: `what is accel buffering with sse`.
- Day 02: Polly `Retry-After` exact API path.
- Day 05: hidden input / AJAX.
- Day 06: request/network stream rereading.
- Day 07: `Produces` / ProblemDetails / StatusCodePages interaction.
- Day 10: exact streaming retry code path.
- Day 13: typed HttpClient with DB context.
- Day 14: RateLimiter lease / Retry-After extraction.
- Day 16: CORS for normal posts security conclusion.
- Day 17: ProblemDetails writer order.
- Day 21: `Complex types` exact meaning.
- Day 22: EF materialization / partial initialization / identity map cluster.
- Day 24: filters / content negotiation / interceptors cluster.
- Day 30: DelegatingHandler streaming retry fix, content negotiation matcher and REST/HATEOAS conclusions.
```

## Next actions

```text
1. Source-check unresolved fragments against the original SVG/screenshots.
2. Promote stable clusters into repeat material/question notes.
3. Add locator entries only after source location and meaning are stable.
4. Use further-study branches for topics that need separate deep learning.
```
