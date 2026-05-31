# Fragment Clarity / Processing Confidence Review

Status: AP-2 review layer.

Purpose: keep unclear screenshot/code fragments visible instead of hiding them inside topic-note guesses.

Scale:

```text
Clarity:
- High = source label/topic is clear enough to route now.
- Medium = likely meaning is clear, but exact screenshot/code should be checked.
- Low = label is ambiguous or the fragment may be about syntax/details not obvious from text.

Processing depth:
- Deep = connected to a specific mechanism, edge case, or repeat workflow.
- Deep sparse = day had only a sparse label, but still received a focused question pass.
```

Important rule:

```text
If a fragment is Low or Medium clarity, keep it as a repeat item with explicit uncertainty.
Do not delete it and do not pretend it is fully understood.
```

## Per-day fragment clarity table

| Day | Inserted / literal fragments identified | Clarity | Processing depth | Confidence that meaning was understood | Unclear moments / next source check |
|---|---|---:|---:|---:|---|
| 01 | `StringReader sheet`; `System.Text.Json ser`; SSE buffering; custom route constraint; Polly/compression notes | Medium | Deep | Medium | Exact screenshot/code still needed for `StringReader sheet`, `System.Text.Json ser`, and SSE buffering layer. |
| 02 | Retry-after with Polly; string/char operations; request decompression/response compression; ProblemDetails from ModelState; pagination/sorting; JSON writing outside MVC | Medium | Deep | Medium | Retry-after exact API path and string/char syntax need source check. |
| 03 | Polly custom pipelines; cache comparison; memory/distributed/hybrid cache; options | High | Deep | High | Exact HybridCache/invalidation code still source-check-worthy if promoted. |
| 04 | Request/response buffering caveats; static files middleware | Medium | Deep | Medium | Need exact code for which buffering case was shown. |
| 05 | Multiple cache keys; cache stampede with `SemaphoreSlim`; Razor/views/tag helpers/view components; hidden input/AJAX; return URL/localization/auth | Medium | Deep | Medium | Hidden input/AJAX remains ambiguous. |
| 06 | EF primitive collection tracking; `ValueConverter`/`ValueComparer`; validation attributes / `IValidatableObject`; explicit interface; lazy loading; request stream rereading; jQuery validation | Medium | Deep | Medium | Stream rereading exact type and primitive collection code need source check. |
| 07 | Exception filter vs middleware; Produces; FluentValidation; ProblemDetails; primitive list querying; Polly nesting/conditional pipeline; partial updates; antiforgery; cookie/JWT auth; authorization | Medium | Deep | Medium | Produces/ProblemDetails/StatusCodePages exact interaction remains subtle. |
| 08 | Async enumerable JSON deserialization; `HeadersRead`; Content-Disposition; EF configuration; hashing/Base64Url; account activation/password recovery/Data Protection | Medium | Deep | Medium | Exact streaming/deserialization shape and source screenshots should be checked. |
| 09 | Polly exceptions/timeouts; CORS vs antiforgery; authorization `context.Fail`; reCAPTCHA | Medium | Deep | Medium | Security conclusion depends on auth model. |
| 10 | HttpClientFactory; typed client; DelegatingHandler; SocketsHttpHandler; streaming with HttpClient; Polly pipeline; OutputCache/ResponseCache; OptionsMonitor; MFA | High | Deep | High | Exact streaming retry code path still source-check-worthy. |
| 11 | Hashing theory | High | Deep sparse | Medium | Sparse day; exact hashing subtopic unknown. |
| 12 | Windows auth; Identity; account lockout; RateLimiter; Redis multiplexer/lock; static fields multiple instances; reCAPTCHA flow | Medium | Deep | Medium | Redis lock/rate-limit distinction and static-state problem need source check. |
| 13 | Custom FluentValidation; manual middleware response; StatusCodePages; StreamReader/body reading; Polly `ShouldHandle`; bulkhead/concurrency limiter; token storage; RouteData; Razor partial; EventSource; memory read; TOTP/Base32; typed HttpClient with DB; custom Polly pipeline cheat sheet | Medium | Deep | Medium | Typed HttpClient With DB Context and TOTP/Base32 exact syntax still need source check. |
| 14 | StreamReader vs ReadAsString; ActionDescriptor/Endpoint metadata; conditional pipelines; Polly timeout/circuit breaker; EF owned types; lockout/rate limiter lease/global limiter; Redis limiter; Identity schema; JWT claims; cookie auth; options with DI; WebSockets; OIDC tickets/handlers | Medium | Deep | Medium | RateLimiter lease / Retry-After extraction and OIDC auth ticket flow need exact source check. |
| 15 | HttpClient pool cleanup/DNS; shared Polly pipelines; ConfigureAwait; async state machine; endpoint produces/vary; StringReader allocations; password hasher; Content-Disposition; Blob download/show; cookies vs JWT in cookies | Medium | Deep | Medium | Connection pool cleanup and async state-machine details need source check. |
| 16 | Cookie auth; ActionDescriptor vs ControllerActionDescriptor; DataProtection purpose chains; CORS for normal POSTs; authorization scope claims; Polly args/outcome/result/exceptions; RetryAfter; rate limiter strategy; OIDC IDP settings/client config/token storage; fixed-size buffer writing | Medium | Deep | Medium | CORS/CSRF conclusion remains security-sensitive. |
| 17 | Polly usage; retryable request recreation; Produces/endpoint distinction; Base64Url; options configuration; ProblemDetails writer order; ETag If-Match | High | Deep | High | ProblemDetails writer order and retryable request recreation exact API need source check. |
| 19 | OIDC custom identity resources/client claims/scopes/events; `ReadAsStreamAsync` buffering; WebSockets properties; processing data as stream | Medium | Deep | Medium | OIDC provider/client setup and `ReadAsStreamAsync` buffering exact behavior need source check. |
| 20 | Custom authorization policy | High | Deep sparse | Medium | Sparse day; exact policy/requirement/handler syntax unknown. |
| 21 | Endpoint `MethodInfo` metadata; RandomNumberGenerator; options with DI limits; Polly nesting; ClientWebSocket; complex types; field vs object validation | Medium | Deep | Medium | Complex types and endpoint metadata API need source check. |
| 22 | UTF8 chunk processing; EF ChangeTracker; returning IEnumerable without ToList; ETag aggregate; LINQ-to-SQL; parallel account creation; nullable relationships; constructors/materialization; partial initialization; identity map/AutoInclude; AsSplitQuery; transactions/isolation; abstraction/encapsulation; DbContext encapsulation; Base16/bytes memory decoding | Medium | Deep | Medium | Dense EF/architecture cluster; exact syntax and source screenshots should be checked. |
| 23 | Route params for IDs; REST bulk methods; IQueryable translation; protector services; WebSockets one send/one receive; Channels; async enumerable; HashCode/equality/records; SemaphoreSlim vs Channel; `ref in out`; lock/Monitor; EF state with non-default ID | Medium | Deep | Medium | REST design conclusions and WebSocket concurrency rules need source check. |
| 24 | If-Match update flow; DbContext sheet; exception filters; ViewResult from filter; API content negotiation; exception bubbling; JwtSecurityTokenHandler; UTF8 decoder chunks; File System Access API; HttpMessageHandler options; antiforgery; EF navigation/collection/reference; LINQ-to-SQL translation; interceptors; LINQ query syntax | Medium | Deep | Medium | Filters/content negotiation/interceptors exact code still need source check. |
| 25 | POST request; cache theory; string equality/hash codes; struct passing; DbContext command concurrency; record struct/class; FixedTimeEquals; PBKDF; raw SQL/ExecuteUpdate/Delete; transactions strategies; DTO mapping; IQueryable extension; no reverse translation; DTO translation; Span/Memory/stackalloc/MemoryPool | Medium | Deep | Medium | Raw SQL API distinctions and Span/Memory syntax/performance need source check. |
| 30 | DbCommand/SaveChanges suppression; DelegatingHandler streaming retry fix; request/response buffering caveats; browser storage / antiforgery mismatch; offline-aware UI; EF LINQ translation limitations; GroupBy translation; content negotiation; WebSockets protocol/subprotocol/state/client options; header parsing; HATEOAS; REST collection/link relation rules | Medium | Deep | Medium-High | DelegatingHandler fix, content negotiation matcher and REST/HATEOAS conclusions need exact source check. |

## Unclear / needs-source-check fragments to keep visible

```text
- Day 01: `what is accel buffering with sse`.
- Day 02: Polly `Retry-After` exact API path.
- Day 05: hidden input / AJAX.
- Day 06: request/network stream rereading.
- Day 07: `Produces` / ProblemDetails / StatusCodePages interaction.
- Day 10: streaming retry with HttpClient exact code path.
- Day 13: typed HttpClient with DB context.
- Day 14: RateLimiter lease / Retry-After extraction.
- Day 16: CORS for normal posts security conclusion.
- Day 17: ProblemDetails writer order.
- Day 21: `Complex types` exact meaning.
- Day 22: EF materialization / partial initialization / identity map cluster.
- Day 24: filters / content negotiation / interceptors cluster.
- Day 30: DelegatingHandler streaming retry fix, content negotiation matcher and REST/HATEOAS conclusions.
```

## Priority fragments for promotion into real repeat material

```text
1. HttpClientFactory / DelegatingHandler / streaming retry / request recreation.
2. Cookie/JWT/OIDC/token storage/auth ticket flow.
3. EF Core LINQ translation / DbContext concurrency / transactions / interceptors.
4. ProblemDetails / exception filters / middleware response writing.
5. Antiforgery / CORS / CSRF boundary.
6. WebSockets protocol/state/send-receive/subprotocol handling.
7. Streams / UTF8 decoder / StreamReader / ReadAsString / buffering caveats.
8. Cache invalidation / stampede / hybrid/distributed cache.
9. ASP.NET Identity lockout / RateLimiter / Redis distributed state.
10. C# memory/struct/equality/Span/async-state-machine fragments.
```
