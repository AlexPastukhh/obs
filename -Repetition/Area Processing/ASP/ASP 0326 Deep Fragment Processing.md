# ASP 0326 Deep Fragment Processing

Status: draft / extracted deep-processing layer.

Source:
- `qs asp 0326.svg`

Related files:
- [[ASP 0326 Area Source Conversion]]
- [[ASP 0326 Processing Notes]]

Purpose:
- Keep base area-day conversion separate from deeper screenshot/code-fragment processing.
- Use this file for detailed fragment interpretation, clarity review and deeper question generation.

---

# Day 10 — Deep fragment processing

Status: deeper pass from Day 10 screenshots.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| `MoviesAPIClient(HttpClient client)` + `AddHttpClient<MoviesAPIClient>` | Typed HttpClient: factory creates `HttpClient` and injects it into typed client constructor. | [[ASP/Typed HttpClient]], [[ASP/HttpClientFactory]] | High |
| Constructor sample with `IHttpClientFactory`, `JsonSerializerOptionsWrapper`, `MoviesAPIClient` | Comparison between direct factory usage and typed client injected as dependency. | [[ASP/HttpClientFactory]], [[ASP/Typed HttpClient]] | Medium |
| `BearerTokenHandler : DelegatingHandler` | DelegatingHandler obtains token and mutates request headers before `base.SendAsync`. | [[ASP/DelegatingHandler]], [[ASP/Authentication Token Storage]] | High |
| `AddTransient<CorrelationHandler>()`, `AddHttpMessageHandler<...>()`, `ConfigurePrimaryHttpMessageHandler` | HTTP handler chain: custom delegating handlers plus primary `SocketsHttpHandler`. | [[ASP/HttpMessageHandler Options]], [[ASP/DelegatingHandler]] | High |
| `SocketsHttpHandler` settings | Redirect, decompression, max connections, pooled lifetime / DNS refresh. | [[ASP/SocketsHttpHandler Configuration]], [[ASP/HttpClient DNS]] | High |
| Serialize object into `MemoryStream`, reset `Position = 0`, use `StreamContent` | Streamed request body must be positioned/readable before sending. | [[ASP/Streaming With HttpClient]], [[ASP/Request Response Buffering Caveats]] | High |
| Route `/orders/{orderId:guid}/events` and EventSource React hook | SSE endpoint plus browser client reconnect with `Last-Event-ID`. | [[ASP/SSE And Buffering]], [[Browser/EventSource]] | High |
| `CatchUpAsync(orderId, lastId)` polling repository repeatedly | SSE without broker: long-running loop polls DB for new events after last id. | [[ASP/SSE And Buffering]], [[Streams/Processing Data As Stream]] | Medium |
| `Response.Headers.CacheControl = no-cache`, `X-Accel-Buffering = no` | Prevent proxy/server buffering for SSE-like streaming response. | [[ASP/SSE And Buffering]], [[ASP/Request Response Buffering Caveats]] | High |
| `AddResilienceHandler(... context, request)` + `context.Properties.Set(...)` | Polly resilience handler can attach request info into resilience context. | [[ASP/Polly Resilience Pipelines]], [[ASP/Retryable Request Recreation]] | Medium |
| “we can’t set request in AddResilienceHandler callback on each request” | Config callback is not the right per-request mutation place; request-specific data should be passed through context/handler. | [[ASP/Polly Resilience Pipelines]] | Medium |
| “Then why use DelegatingHandler at all?” screenshot | Polly chooses retry/timeout/etc.; DelegatingHandler mutates/logs/enriches request/response. | [[ASP/DelegatingHandler]], [[ASP/Polly Resilience Pipelines]] | High |
| “What changed?” StreamContent -> ByteArrayContent | Fix one-shot stream problem by making request content replayable before retry. | [[ASP/DelegatingHandler Streaming Retry Fix]] | High |
| Pipeline `.ExecuteAsync(...)` | Manual execution of resilience pipeline around a custom operation. | [[ASP/Polly Usage]] | High |
| Hedging screenshots | Polly starts another attempt after `HedgingDelay` if current attempt is still running. | [[ASP/Polly Hedging]], [[ASP/Polly Resilience Pipelines]] | High |
| `OptionsMonitor.OnChange returns IDisposable` | Subscription should be disposed to avoid keeping callback alive. | [[ASP/OptionsMonitor]] | Medium |

## Day 10 — Deep repeat questions

### Typed HttpClient / factory

- What exactly does `AddHttpClient<MoviesAPIClient>()` register?
- Why can `MoviesAPIClient` accept `HttpClient` in its constructor without manually creating it?
- What is the difference between injecting `IHttpClientFactory` and injecting a typed client?
- What does the factory pool: `HttpClient` instances or handlers?
- Where should `BaseAddress` and `Timeout` be configured for a typed client?

### DelegatingHandler

- Why is `DelegatingHandler` similar to middleware/interceptor?
- What should go into `DelegatingHandler`, and what should go into Polly pipeline?
- Why is adding an auth header a handler responsibility rather than a retry-strategy responsibility?
- Why must handler call `base.SendAsync(request, cancellationToken)`?
- What happens if multiple handlers are registered with `AddHttpMessageHandler`?

### SocketsHttpHandler / DNS / decompression

- Why does `PooledConnectionLifetime` help with DNS changes?
- What is the difference between handler lifetime and connection lifetime?
- Why can `AutomaticDecompression` be configured on the primary handler?
- What does `MaxConnectionsPerServer` limit?
- Why can redirect/decompression/DNS belong to the primary handler rather than a custom delegating handler?

### Streaming request / retry

- Why is streamed `HttpContent` often one-shot?
- Why does serializing into `MemoryStream` require `Position = 0` before sending?
- Why can `ByteArrayContent` be replayed more safely than `StreamContent`?
- What exactly must be recreated on retry: request, content stream, headers, or all of them?
- Why is retrying a POST with streamed content unsafe unless the request is explicitly made replayable?

### Polly pipeline vs HttpClient handler

- What does `ResiliencePipeline.ExecuteAsync` do?
- Why does manual pipeline execution differ from adding resilience to `HttpClient` via handler?
- Why can a pipeline decide retry/timeout/circuit breaker but should not mutate request body?
- How can request-specific data be passed into resilience context?
- Why might a plain client without resilience handler be used inside a manual pipeline?

### Hedging

- What is hedging conceptually?
- When does Polly start attempt #2?
- What does `HedgingDelay` mean?
- Why is “slow” defined as “still not completed after delay”, not necessarily server slow?
- Why can hedging be dangerous for non-idempotent operations?

### SSE / EventSource

- Why does SSE need `text/event-stream`?
- Why does `X-Accel-Buffering: no` matter?
- Why does the browser send `Last-Event-ID` on reconnect?
- What is the server supposed to do with `lastId`?
- Why is polling DB in a loop acceptable for a simple demo but not ideal production design?
- What would replace polling in production: channel, Redis pub/sub, Kafka/RabbitMQ, or Postgres LISTEN/NOTIFY?

---

# Day 13 — Deep fragment processing

Status: deeper pass from Day 13 SVG text layer and fragment labels.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| “Better to use it for explicitness, especially with foreach not needing not-null check” | Likely about making validation/rules explicit rather than relying on implicit/null-sensitive iteration behavior. May be about FluentValidation or collection enumeration. | [[ASP/Custom FluentValidation Rules]], [[CSharp/Explicitness And Null Checks]] | Medium-Low |
| Custom FluentValidation rules that accept field names | Better error mapping: create reusable validation helpers that accept target property/field names so validation errors attach to the correct field. | [[ASP/Custom FluentValidation Rules]], [[ASP/Validation Error Mapping]] | High |
| Manual response writing in middleware after previous layers | Response may already have headers/body/status from earlier middleware; later middleware must check response state before writing. | [[ASP/Manual Middleware Response Writing]], [[ASP/Response HasStarted]] | High |
| `UseStatusCodePages` runs when body is empty | StatusCodePages can produce body for status responses only when no body has already been written. | [[ASP/StatusCodePages]], [[ASP/ProblemDetails StatusCodePages]] | High |
| Add status-code-specific info: `406 Accept`, `415 Content-Type`, initial path | ProblemDetails/status pages can include actionable metadata depending on status code and request context. | [[ASP/ProblemDetails StatusCodePages]], [[ASP/API Content Negotiation]] | Medium-High |
| `StreamReader`; line-by-line reading; cannot `ReadAsString` on server endpoint | Server request body is a stream; use `StreamReader`/buffering rather than assuming a ready string. | [[ASP/StreamReader]], [[ASP/Request Body Reading]] | High |
| Polly `ShouldHandle` args; attach request to context | `ShouldHandle` receives strategy args/outcome/context; request-specific data may need to be attached to resilience context. | [[ASP/Polly ShouldHandle Args]], [[ASP/Polly Resilience Pipelines]] | Medium-High |
| Polly bulkhead / concurrency limiter | Concurrency limiter/bulkhead controls parallel work; newer Polly may use rate limiter strategy/concurrency limiter. | [[ASP/Polly Bulkhead And Concurrency Limiter]], [[ASP/Polly RateLimiter Strategy]] | High |
| `SetAndStoreTokens`; “2 tokens antiforgery” | Likely ASP auth/token storage plus antiforgery cookie/request-token pair; exact context needs check. | [[ASP/Authentication Token Storage]], [[ASP/Antiforgery]] | Medium |
| All route data | RouteData collection: route values available from endpoint routing/action context. | [[ASP/RouteData]] | Medium-High |
| `Partial for` vs `model` | Razor partial rendering distinction: passing model explicitly vs using current view model/context. | [[ASP/Razor Partial For vs Model]] | Medium |
| EventSource browser | Browser-side SSE API and reconnection semantics. | [[Browser/EventSource]], [[ASP/SSE And Buffering]] | Medium-High |
| Memory `ReadExactly`, `AtLeast`, etc. | Low-level memory/stream reading API semantics: exact byte count vs minimum available bytes. | [[CSharp/Memory ReadExactly]], [[Streams/Processing Data As Stream]] | Medium |
| TOTP summary/theory; bits/bytes in Base32 | TOTP secret encoding and how binary secret material maps to Base32 text. | [[Security/TOTP]], [[Base32/Bits Bytes]] | Medium-High |
| Typed HttpClient with DB info; static method/cache/request delegate | Avoid putting per-request DB access directly into typed client configuration; use per-request delegate/service/cache boundary. | [[ASP/Typed HttpClient With DB Context]], [[ASP/HttpClientFactory]] | Medium |
| “of course we can read this, buffering and ByteArrayContent” | Retry/re-read fix: buffering a request/content body then replacing it with replayable `ByteArrayContent`. | [[ASP/DelegatingHandler Streaming Retry Fix]], [[ASP/Request Response Buffering Caveats]] | High |
| Custom Polly pipeline cheat sheet | Summary fragment for constructing/customizing Polly pipelines. | [[ASP/Custom Polly Pipeline Cheat Sheet]], [[ASP/Polly Resilience Pipelines]] | Medium |

## Day 13 — Deep repeat questions

### FluentValidation / explicit mapping

- Why might a reusable FluentValidation helper need to accept a field/property name?
- What happens if validation error is produced but not attached to the correct field?
- When is explicit field mapping better than relying on implicit object-level validation?
- What does “explicitness” buy when validating collections or nested objects?
- What is still unclear in this fragment: was the `foreach not null check` about validation, nullable collections, or another C# feature?

### Middleware response writing / status pages

- Before writing a response in middleware, what response state should be checked?
- Why can `Response.HasStarted` prevent changing headers/status code?
- Why does `UseStatusCodePages` only help when the body is still empty?
- Why is manually writing a response after previous middleware risky?
- How should `406 Not Acceptable` and `415 Unsupported Media Type` ProblemDetails differ?
- Why can initial path/request metadata help the client understand a status error?

### StreamReader / request body reading

- Why is server endpoint body usually a stream, not a reusable string?
- Why can reading request body once make it unavailable later?
- When should buffering/rewinding be enabled?
- When is `StreamReader` useful compared with `ReadAsString`-style helpers?
- What should be preserved when reading line by line: encoding, position, cancellation, body ownership?

### Polly args / context / limiter

- What does `ShouldHandle` receive: exception, result, outcome, context, cancellation token?
- Why attach request-specific data to resilience context?
- Why should retry predicate not depend on hidden global state when request context is available?
- What is the conceptual difference between bulkhead and concurrency limiter?
- What should happen when a concurrency limiter rejects a request?

### Auth / tokens / antiforgery

- What are the two antiforgery pieces: cookie token and request token?
- What can `SetAndStoreTokens` produce/store?
- Why does token storage need a clear boundary between server cookie, hidden form field, header and client JS state?
- Why should token questions be tied to exact flow rather than “just store token somewhere”?

### Typed HttpClient + DB context

- Why is DB-dependent request data suspicious inside typed client configuration?
- What should be configured once for a typed client, and what should be resolved per request?
- When could a static helper/cache on typed client be acceptable?
- Why might a request delegate/service be better than injecting DbContext into a handler/client setup?
- What lifecycle problem appears if a singleton/handler tries to use scoped DB context?

---

# Day 14 — Deep fragment processing

Status: deeper pass from Day 14 SVG text layer and fragment labels.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| GC note: multiple heaps per core, synchronized/shared, stops code execution but I/O can continue | .NET GC/server GC mental model: managed execution may pause, OS/network I/O may still complete outside managed code. | [[DotNet/GC Server GC]], [[CSharp/Runtime And I/O]] | Medium |
| “array of bools to know if we met this number; could use HashSet” | Algorithm/data-structure choice: boolean array vs HashSet for membership tracking. | [[CSharp/HashSet vs Boolean Array]] | Medium |
| StreamReader vs ReadAsString | Difference between streaming/line-by-line reading and loading whole content into string. | [[ASP/StreamReader vs ReadAsString]] | High |
| ActionDescriptor / ControllerActionDescriptor / endpoint metadata | How MVC action metadata and endpoint metadata expose action/controller/method info. | [[ASP/ActionDescriptor ControllerActionDescriptor Endpoint Metadata]] | High |
| Choosing pipelines based on something | Conditional pipeline selection: different Polly/resilience pipeline depending on request/key/context. | [[ASP/Conditional Pipelines]], [[ASP/Polly Resilience Pipelines]] | Medium |
| Timeout inside circuit breaker | Strategy ordering: timeout inside/outside circuit breaker changes what failure breaker observes. | [[ASP/Polly Timeout Circuit Breaker]] | High |
| EF owned types `With` / value object table mapping | Owned type/table mapping: `OwnsOne/OwnsMany` and `WithOwner`/value object relationship configuration. | [[EF Core/Owned Types With]] | Medium |
| Manual lockout fields in user: attempts, first attempt time, refresh after span, reset on success | Hand-rolled account lockout algorithm. | [[ASP/Identity Lockout]], [[ASP/Account Lockout]] | High |
| Identity lockout | Built-in ASP.NET Identity lockout behavior as alternative to manual fields. | [[ASP/Identity Lockout]] | High |
| Global limiter / multiple limiters for policy / attributes | ASP.NET RateLimiter can combine global and endpoint/policy limiters, applied by attributes. | [[ASP/Global Limiter]], [[ASP/RateLimiter Lease]] | High |
| Accessing Redis in rate limiter | Distributed rate-limiting state stored in Redis. | [[Redis/RateLimiter Storage]], [[Redis/Multiplexer]] | Medium-High |
| `context.Lease`; retry-after by limiter type; discover lease metadata | RateLimiter returns a lease that can carry metadata such as retry-after; exact metadata depends on limiter. | [[ASP/RateLimiter Lease]] | High |
| Pattern 2: global limiter + cache based service to score failed attempts | Use a global limiter and external service/cache to track failed attempts and block keys. | [[ASP/RateLimiter]], [[Redis/RateLimiter Storage]] | Medium |
| Redis block key with expiration; key may exist without expiration | Safer Redis blocking logic: set expiry, check TTL/existence, avoid indefinite accidental block. | [[Redis/Set And Delete]], [[Redis/RateLimiter Storage]] | High |
| Identity schema | ASP.NET Identity tables/relations overview. | [[ASP/Identity Schema]] | Medium |
| JWT claims + token creator service from user/role claims | Token creation service combines user claims and role-derived claims. | [[ASP/JWT Claims Token Creator]] | High |
| Cookies general theory | Auth cookie stores protected auth ticket, not raw visible claims in plain form. | [[ASP/Cookie Auth Theory]] | Medium-High |
| Options pattern with DI / post-configure | Built-in options can be configured and post-configured; DI access may require `IConfigureOptions`/`IPostConfigureOptions`. | [[ASP/Options Pattern With DI]] | High |
| WebSockets `UseWebSockets` in Program.cs | WebSocket middleware must be added before accepting WebSocket requests. | [[ASP/WebSockets]] | High |
| OIDC auth tickets and auth handler methods | OIDC handler creates auth ticket; event/handler methods participate in challenge/callback/sign-in flow. | [[ASP/OIDC AuthTickets And AuthHandlers]], [[ASP/OIDC]] | Medium |
| “Protected when HTTPS or how? I thought non-HTTPS cookie values can be stolen?” | Distinction between Data Protection encryption/signing and transport security. Protected cookie is still stealable over insecure transport if not HTTPS/Secure. | [[ASP/Cookie Auth Theory]], [[ASP/DataProtection Purpose Chains]] | High |

## Day 14 — Deep repeat questions

### StreamReader / metadata / pipelines

- When should content be processed with `StreamReader` instead of reading a whole string?
- What is `ActionDescriptor`, and when do we need `ControllerActionDescriptor` specifically?
- What is endpoint metadata, and how is it different from MVC action descriptor data?
- How can a request choose between several resilience pipelines?
- Why should conditional pipeline selection use explicit request/context data?

### Polly timeout + circuit breaker

- What changes if timeout is inside the circuit breaker vs outside it?
- Which failure does the circuit breaker observe when timeout wraps the operation?
- Why does strategy order matter in resilience pipelines?
- How should timeout/retry/circuit breaker be ordered for non-idempotent operations?

### EF owned types

- What does EF owned type mapping create by default?
- What is the role of `OwnsOne` / `OwnsMany` / `WithOwner`?
- When does an owned type share owner table vs get a separate table?
- Why can value-object mapping need explicit property/column definitions?
- What exactly needs source check: the fragment mentions “with” and key/value/value object columns, so verify the exact EF API shown.

### Lockout / RateLimiter / Redis

- What fields are needed for manual lockout: failed attempts, first attempt time, block-until, reset conditions?
- When should built-in Identity lockout be used instead of manual lockout?
- What can a `RateLimitLease` include?
- How do we get `Retry-After` from limiter metadata?
- Why can different limiter types expose retry-after differently?
- What is the difference between global limiter and endpoint/policy limiter?
- How can Redis hold distributed block state?
- Why must Redis block key have an expiration?
- Why should code check TTL/existence before treating a key as blocked?

### JWT / cookie auth / OIDC

- How does a token creator combine user claims and role claims?
- What is stored in an auth cookie: raw identity data, protected ticket, or server-side session id?
- What does Data Protection protect in an auth cookie?
- Why does cookie protection not replace HTTPS?
- What can an attacker steal if cookie is sent over non-HTTPS?
- Which OIDC handler events participate in challenge/callback/token validation/sign-in?
- What is an auth ticket in the OIDC/cookie-auth flow?

### Options with DI

- Why is configuring built-in options harder when configuration depends on DI services?
- When should `IConfigureOptions<T>` be used?
- When should `IPostConfigureOptions<T>` be used?
- What is the difference between configuring your own options and modifying framework options?

---

# Day 16 — Deep fragment processing

Status: deeper pass from Day 16 SVG text layer and fragment labels.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Cookie auth general theory | Auth cookie lifecycle and protected ticket model. | [[ASP/Cookie Auth Theory]] | Medium |
| ActionDescriptor vs ControllerActionDescriptor | Difference between general action descriptor and MVC controller/action-specific descriptor. | [[ASP/ActionDescriptor vs ControllerActionDescriptor]] | High |
| Named protectors chain with purpose chains | DataProtection purpose strings compose isolation boundaries. | [[ASP/DataProtection Purpose Chains]] | High |
| “For normal posts CORS is enough to protect from CSRF… malicious site can use image tag GETs/simple form post because CORS handles fetch/xhr” | Security boundary: CORS mainly protects JS-readable cross-origin fetch/XHR, not all browser-initiated requests; simple form posts and image GETs may still be sent. | [[ASP/CORS For Normal POSTs]], [[ASP/Antiforgery]] | Medium-High |
| Scope claims with `RequireAssertion`; formats `scope`, `scopes`, `scp`; better encapsulate into requirement + handler | Normalize authorization scopes across providers in custom requirement/handler. | [[ASP/Authorization Scope Claims]], [[ASP/Custom Authorization Policy]] | High |
| Polly args/outcome/result/exceptions | Polly outcome model: result or exception wrapped in strategy args. | [[ASP/Polly Args Outcome Result Exceptions]] | High |
| RetryAfter from exception or response put in context | Retry delay can come from response header, exception metadata, or context. | [[ASP/Polly RetryAfter]], [[ASP/Polly Resilience Pipelines]] | Medium-High |
| Rate limiter in Polly: concurrency vs AddRateLimiter strategy/options/shared OnRejected/global rate limiter | Polly rate limiter strategy and ASP.NET rate limiter are separate but conceptually related. | [[ASP/Polly RateLimiter Strategy]], [[ASP/RateLimiter]] | Medium |
| IDP settings | OpenID Provider / identity provider settings. | [[ASP/OIDC IDP Settings]] | Medium |
| Not storing access tokens in browser cookie auth properties | Avoid persisting access tokens in auth properties/browser cookies unless necessary and protected; token storage has security/lifetime risks. | [[ASP/Browser Token Storage]], [[ASP/OIDC Token Store Wrapper]] | High |
| Clients config | OIDC client configuration: client id, secret, redirect URIs, scopes, grant type. | [[ASP/OIDC Clients Config]] | Medium |
| Fixed-size buffer writing | Write into buffer with fixed size, likely to avoid allocation/handle partial writes. | [[CSharp/Fixed Size Buffer Writing]], [[Streams/Processing Data As Stream]] | Medium |
| Accessing tokens from token store wrapper OIDC | Encapsulate token access/refresh behind a token-store wrapper. | [[ASP/OIDC Token Store Wrapper]], [[ASP/Browser Token Storage]] | Medium-High |

## Day 16 — Deep repeat questions

### CORS / CSRF / antiforgery

- What does CORS actually restrict: browser sending the request, or JS reading the response?
- Why can simple form posts still be sent cross-origin?
- Why can image/script tags still trigger GET-like requests?
- When is CORS alone not enough for cookie-auth CSRF protection?
- Why does antiforgery token prove user had access to the original page/form?
- What auth model makes “CORS may be enough” more plausible: bearer token in JS header or cookie auth?
- Why is this fragment security-sensitive and needs exact source check?

### Scope claims / authorization

- Why do providers use different scope claim names like `scope`, `scp`, or `scopes`?
- Why is `RequireAssertion` useful for quick normalization?
- Why is a custom requirement + handler better for reusable scope checks?
- How should space-separated scope strings be handled?
- What should happen if scopes are split across multiple claims?

### Polly outcome / RetryAfter / rate limiter

- What is Polly `Outcome<T>`?
- How does an outcome represent result vs exception?
- Why does `ShouldHandle` need to inspect both result and exception?
- From where can `Retry-After` be derived?
- Why might response headers need to be copied into resilience context?
- What is the difference between ASP.NET `AddRateLimiter` middleware and Polly rate limiter strategy?
- What does `OnRejected` do?
- Why should rejected/limited requests return useful retry metadata?

### OIDC / token storage

- What belongs in OIDC IDP settings vs client config?
- Why should access tokens not casually be stored in browser cookies/auth properties?
- What security properties do auth cookies have, and what risks remain?
- Why is a token store wrapper safer than reading tokens everywhere?
- How can token refresh/access be centralized?
- What should be stored client-side vs server-side in an OIDC-based app?

### DataProtection / fixed-size buffers

- What does a DataProtection purpose chain isolate?
- Why use different purposes for different token/cookie/link types?
- What can go wrong if the same protector purpose is reused too broadly?
- Why write into a fixed-size buffer?
- What should code do when the data is larger than the fixed buffer?

---

# Day 17 — Deep fragment processing

Status: deeper pass from Day 17 SVG text layer and fragment labels.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Base64Url-safe for bytes that must go into URL; WebUtility for plain string | Encoding choice: binary data in URL should use Base64Url; ordinary strings may need URL encoding/HTML encoding. | [[Security/Base64Url]], [[Text/Url Encoding]] | High |
| Can use Polly | General Polly usage marker. | [[ASP/Polly Usage]] | Low-Medium |
| “Not all requests can be recreated maybe?” | Retryability depends on whether request/content can be safely recreated and operation is idempotent/replayable. | [[ASP/Retryable Request Recreation]], [[ASP/DelegatingHandler Streaming Retry Fix]] | High |
| Endpoint distinction with `Produces`, need to vary | If endpoint response varies by produced content type/metadata, caching/response variation may need `Vary` or output-cache distinction. | [[ASP/Produces And Endpoint Distinction]], [[ASP/Endpoint Produces Vary]] | Medium-High |
| “We can configure any options like that” | Generic options configuration pattern, likely `IOptions`/`Configure<TOptions>`/named options. | [[ASP/Options Configuration]], [[ASP/Options Pattern]] | Medium |
| Execution order of ProblemDetails writer and CustomizeProblemDetails | Ordering between custom ProblemDetails writer and customization callback affects final response shape. | [[ASP/ProblemDetails Writer Order]], [[ASP/ProblemDetails ExceptionHandler]] | Medium-High |
| ETag If-Match at client | Client sends `If-Match` with known ETag for optimistic concurrency update. | [[HTTP/ETag If-Match]], [[HTTP/If-Match Update Flow]] | High |

## Day 17 — Deep repeat questions

### Base64Url / URL-safe data

- When should bytes be encoded with Base64Url?
- Why is normal Base64 problematic in URLs?
- What characters are changed/removed in Base64Url compared with Base64?
- When should ordinary text use URL encoding instead of Base64Url?
- Why is encoding choice different for binary token vs human-readable query value?

### Retryable request recreation

- Why are not all HTTP requests recreatable?
- What parts of a request may be one-shot: body stream, content object, headers, cancellation, side effects?
- Why is retrying non-idempotent POST dangerous?
- How can buffering or `ByteArrayContent` make content replayable?
- Why can recreating request still be wrong if server may have processed the first attempt?
- What should a retry policy know before retrying a request with body?

### Produces / endpoint variation

- What does endpoint `Produces` metadata describe?
- Why can two endpoints/actions with different produced content need cache variation?
- What does `Vary` tell caches?
- When should output cache distinguish by `Accept` header or endpoint metadata?
- How can content negotiation interact with endpoint `Produces`?

### Options configuration

- What are the common ways to configure options in ASP.NET Core?
- What is the difference between `Configure<TOptions>`, `PostConfigure<TOptions>` and named options?
- When do options need DI-aware configuration classes?
- Why does “we can configure any options like that” need source check for exact API shown?

### ProblemDetails writer order

- What is `CustomizeProblemDetails` responsible for?
- What is a custom ProblemDetails writer responsible for?
- Which one runs first in the shown flow?
- What happens if a writer handles the response before customization adds required metadata?
- Why does ordering matter for consistent API error response shape?

### ETag / If-Match

- What does the client store after reading a resource: ETag, version, timestamp, or hash?
- Why does client send `If-Match` on update/delete?
- What should server do when ETag does not match?
- Why is `If-Match` useful for optimistic concurrency?
- How is aggregate/resource-level ETag different from row version of one table row?

---

# Day 22 — Deep fragment processing

Status: deeper pass from Day 22 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| UTF8 chunk processing | Reading UTF-8 across chunks requires decoder state; byte boundary may split multi-byte character. | [[Text/Encoding UTF8 Chunk Processing]], [[Encoding/Bytes Memory Decoding]] | High |
| EF ChangeTracker | ChangeTracker tracks entity instances, states, original/current values, navigation changes. | [[EF Core/ChangeTracker]] | High |
| Returning `IEnumerable` without `ToList` | Returning unmaterialized query can leak deferred execution and DbContext lifetime problems. | [[ASP/Returning IEnumerable Without ToList]], [[EF Core/IQueryable Translation]] | High |
| ETag for aggregate | ETag can represent aggregate/resource version, not only a single row version. | [[HTTP/ETag For Aggregate]], [[HTTP/If-Match Update Flow]] | Medium-High |
| EF LINQ-to-SQL | Query expression is translated to SQL only for supported expression shapes. | [[EF Core/LINQ To SQL]] | High |
| Parallel account creation | Concurrent requests can pass uniqueness checks and create duplicate accounts unless DB constraint/transaction handles it. | [[Concurrency/Parallel Account Creation]], [[EF Core/Transactions And Isolation]] | High |
| Nullable relationships | EF relationship optionality depends on nullable FK/reference navigation and configuration. | [[EF Core/Nullable Relationships]] | Medium-High |
| Entity constructors and materialization | EF can materialize entities through constructors/backing fields depending on mapping. | [[EF Core/Entity Constructors And Materialization]] | Medium |
| Partial initialization antipattern | Returning partially initialized entities/DTOs can create invalid state and hidden coupling. | [[EF Core/Partial Initialization Antipattern]], [[Architecture/Abstraction Encapsulation]] | High |
| Identity map and AutoInclude | DbContext identity map reuses tracked instances; AutoInclude can load navigations automatically. | [[EF Core/Identity Map And AutoInclude]] | Medium-High |
| AsSplitQuery | Split query avoids cartesian explosion for multiple includes but uses multiple SQL queries. | [[EF Core/AsSplitQuery]] | High |
| Transactions and isolation | Isolation level defines what concurrent operations can observe and whether uniqueness/consistency is guaranteed. | [[EF Core/Transactions And Isolation]] | High |
| Returning specific, passing generic | API/architecture principle: accept broad abstractions but return specific results/contracts when possible. | [[Architecture/Returning Specific Passing Generic]] | Medium |
| Abstraction / encapsulation | Encapsulation should hide mutation/query details, not hide important constraints. | [[Architecture/Abstraction Encapsulation]] | Medium |
| Encapsulating DbContext | DbContext can be hidden behind repository/service, but hiding IQueryable/transactions incorrectly can reduce correctness. | [[EF Core/Encapsulating DbContext]] | Medium |
| Hex / Base16 | Binary data can be represented as hex; every byte becomes two hex characters. | [[Encoding/Hex Base16]] | High |
| Bytes / memory decoding | Byte sequences need correct encoding/decoder when converted to text; chunk boundaries matter. | [[Encoding/Bytes Memory Decoding]] | High |

## Day 22 — Deep repeat questions

### UTF8 / bytes / chunk processing

- Why can a UTF-8 character be split across two byte chunks?
- Why is `Encoding.UTF8.GetString(chunk)` unsafe if chunks may split characters?
- What does a stateful `Decoder` preserve between chunks?
- When should we use `Decoder.Convert` or incremental decoding?
- Why is byte count not the same as char count?
- How does Base16/hex represent bytes?
- Why does every byte become exactly two hex characters?
- When is hex easier than Base64/Base64Url?

### EF ChangeTracker / materialization

- What does EF ChangeTracker track for an entity?
- What are common entity states: Added, Modified, Deleted, Unchanged, Detached?
- How does EF know what changed before `SaveChanges`?
- What does identity map mean inside one DbContext?
- Why can querying the same row twice return the same tracked instance?
- How can AutoInclude change what is loaded without explicit `Include`?
- When can AutoInclude be useful, and when can it hide performance cost?

### Returning `IEnumerable` without `ToList`

- Why can returning `IEnumerable` from an EF query accidentally defer execution?
- What happens if the DbContext is disposed before enumeration?
- Why can deferred execution make errors appear outside the repository/service method?
- What is the difference between returning `IQueryable`, `IEnumerable`, and materialized `List`?
- When is returning `IQueryable` intentionally useful?
- Why should API/service boundaries often materialize before returning?

### LINQ-to-SQL translation

- What makes a LINQ expression translatable to SQL?
- Why can EF translate simple comparisons but not arbitrary C# methods?
- Why can some operations be done only after materialization?
- What is the difference between server evaluation and client evaluation?
- Why should large queries avoid pulling data into memory too early?
- What should be done when EF cannot translate a method: rewrite query, map DB function, compute after materialization, or store computed column?

### Parallel account creation / transactions

- How can two parallel requests both pass “email does not exist” check?
- Why is application-level pre-check not enough for uniqueness?
- Why should database unique constraint be the final protection?
- What should happen when unique constraint violation occurs?
- Which transaction/isolation behavior is needed to make account creation atomic?
- When would serializable isolation be overkill?
- How can retry strategy interact with unique constraint failures?

### Nullable relationships / constructors / partial initialization

- How does nullable FK affect optional vs required relationship?
- How does nullable reference navigation affect EF model expectations?
- When do we need explicit relationship configuration?
- Does EF always call the public constructor when materializing an entity?
- What is constructor binding in EF?
- Why can private/protected constructors be useful for EF entities?
- Why is partial initialization dangerous?
- How can partially initialized entity violate invariants?
- When should DTO projection be used instead of partially initialized entity?

### AsSplitQuery / includes

- What problem does `AsSplitQuery` solve?
- What is cartesian explosion with multiple collection includes?
- Why can split query reduce duplication but increase round trips?
- When is single query better?
- When is split query better?
- How should query shape be checked before optimizing?

### DbContext encapsulation / architecture

- What are the pros of hiding DbContext behind service/repository?
- What are the risks of hiding IQueryable completely?
- Why can repository abstraction make transactions harder?
- What does “return specific, pass generic” mean?
- Why should public APIs return stable/specific contracts instead of leaking EF internals?
- When is leaking `IQueryable` acceptable inside an internal query-building layer?

---

# Day 24 — Deep fragment processing

Status: deeper pass from Day 24 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| If-Match update flow | Optimistic concurrency: client sends ETag in `If-Match`; server updates only if version matches. | [[HTTP/If-Match Update Flow]], [[HTTP/ETag If-Match]] | High |
| DbContext sheet | General DbContext lifecycle / tracking / SaveChanges reference sheet. | [[EF Core/DbContext Sheet]] | Medium |
| Exception filters | MVC exception filter can handle exceptions inside MVC pipeline, not everything in middleware pipeline. | [[ASP/Exception Filters]], [[ASP/Exception Filters vs Middleware]] | High |
| ViewResult from filter | A filter can return a result, including ViewResult, to short-circuit normal action flow. | [[ASP/ViewResult From Filter]] | High |
| API content negotiation | ASP.NET chooses formatter/media type based on `Accept`, content types, supported formatters. | [[ASP/API Content Negotiation]] | High |
| Exception bubbling | Exceptions bubble through MVC filters and middleware depending on where they are thrown. | [[ASP/Exception Bubbling]], [[ASP/Exception Filters vs Middleware]] | Medium-High |
| JwtSecurityTokenHandler | API for creating/validating/parsing JWT tokens. | [[JWT/JwtSecurityTokenHandler]] | High |
| UTF8 decoder chunk processing | Stateful decoder prevents broken characters across byte chunks. | [[Text/UTF8 Decoder Chunk Processing]] | High |
| File System Access API | Browser API for reading/writing local files with user permission. | [[Browser/File System Access API]] | Medium |
| HttpMessageHandler options | Primary handler options for HttpClient pipeline: decompression, proxy, cookies, redirects, connection lifetime. | [[ASP/HttpMessageHandler Options]] | High |
| Antiforgery | Token pair flow: cookie token + request token via hidden input/header. | [[ASP/Antiforgery]] | High |
| Entry navigation / collection / reference properties | EF APIs for inspecting/loading navigation entries. | [[EF Core/Entry Navigation Collection Reference Properties]] | High |
| LINQ-to-SQL translation | Translating query expression tree to SQL; unsupported methods fail or require client evaluation. | [[EF Core/LINQ To SQL Translation]] | High |
| DbCommand / SaveChanges interceptors | Interceptors observe/suppress commands or SaveChanges at specific pipeline points. | [[EF Core/DbCommand SaveChanges Interceptors]] | High |
| LINQ query syntax | Query comprehension syntax maps to method syntax and expression tree operations. | [[LINQ/Query Syntax]] | Medium-High |

## Day 24 — Deep repeat questions

### If-Match / ETag update flow

- What does the client receive when reading the resource?
- What does the client send in `If-Match` when updating?
- Why should server compare current ETag with `If-Match`?
- What status should be returned when ETag does not match?
- Why is this optimistic concurrency?
- How is an aggregate-level ETag different from a single row version?
- When should a collection/aggregate ETag change?

### Exception filters / middleware

- Where do MVC exception filters run?
- Why can an exception filter handle action/controller exceptions but not all middleware exceptions?
- What happens if an exception is thrown before MVC selects an action?
- Why can middleware be a broader exception handling layer?
- When is exception filter better than exception middleware?
- Why can filter scope matter: global, controller, action?

### ViewResult from filter

- How can a filter short-circuit an action?
- What does setting `context.Result` do?
- When might a filter return `ViewResult`?
- Why is returning `ViewResult` from filter more MVC-specific than returning ProblemDetails?
- What is the difference between authorization/resource/action/result/exception filters?

### API content negotiation

- What does content negotiation match: request `Accept`, supported output formatters, endpoint metadata, or all?
- What is the difference between `Accept` and `Content-Type`?
- When does `406 Not Acceptable` make sense?
- When does `415 Unsupported Media Type` make sense?
- Why can wildcard media types complicate selection?
- How do q-values influence media type choice?
- Why should supported formatter order sometimes matter?

### Exception bubbling

- What does “exception bubbles up” mean in ASP.NET pipeline?
- Which layer sees the exception first?
- How can exception be handled and converted into response?
- What happens if response has already started?
- Why can late exception handling fail to produce a clean ProblemDetails response?

### JwtSecurityTokenHandler

- What does `JwtSecurityTokenHandler` create?
- What does it validate?
- What is the difference between reading a JWT and validating it?
- Why is token validation more than decoding Base64Url parts?
- What should be validated: issuer, audience, lifetime, signature, signing key?
- When should we use higher-level auth middleware instead of manual handler calls?

### UTF8 decoder chunk processing

- Why does chunk decoding need a decoder?
- What happens if one UTF-8 character is split between chunks?
- What does the decoder store between calls?
- How does this differ from simply calling `Encoding.UTF8.GetString` on each chunk?
- When is chunked decoding needed in HTTP/stream processing?

### HttpMessageHandler options

- Which settings belong to primary handler rather than delegating handler?
- What does automatic decompression do?
- What does redirect handling do?
- Why can cookie handling in HttpClient be dangerous or surprising?
- What does connection lifetime affect?
- How do handler options relate to DNS refresh?

### Antiforgery

- What are the two antiforgery tokens?
- Where is the request token placed for form submit?
- Where can token be placed for AJAX/fetch?
- Why is cookie token alone not enough?
- Why can stale hidden input cause mismatch?
- Why should antiforgery be tied to cookie-auth/browser form model?

### EF navigation entries

- What is `Entry(entity)` used for?
- What is the difference between reference navigation and collection navigation?
- How can you explicitly load a navigation?
- How can navigation entry show whether it is loaded?
- When is explicit loading preferable to eager loading?
- How can navigation fix-up make relationships appear loaded or connected?

### DbCommand / SaveChanges interceptors

- What can command interceptor observe?
- What can command interceptor suppress?
- What can SaveChanges interceptor observe?
- At which stage can SaveChanges be suppressed?
- Why can post-save interceptor not undo already committed changes?
- What is the difference between logging, mutation, suppression, and validation in interceptors?
- When can interceptors hide too much behavior?

### LINQ query syntax

- How does query syntax translate to method syntax?
- What is the difference between `from/where/select` and `.Where().Select()`?
- Why does EF care about expression tree shape?
- Why can query syntax be clearer for joins/grouping?
- What operators are easier to misunderstand in query syntax?

---

# Day 25 — Deep fragment processing

Status: deeper pass from Day 25 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| POST request | HTTP POST semantics: create/process action, body payload, non-idempotent by default. | [[HTTP/Post Request]] | Medium-High |
| Cache theory | General cache concepts: freshness, invalidation, keying, stampede, consistency. | [[Caching/Cache Theory]] | Medium |
| String equality operators | Equality operator must align with comparer/hash behavior. | [[CSharp/Equality String Operators]] | High |
| GetHashCode case-insensitive equality | Case-insensitive equality requires case-insensitive hash code too. | [[CSharp/GetHashCode Case Insensitive Equality]] | High |
| Struct passing | Structs are copied by value unless passed by `ref`, `in`, or `out`; copy cost and mutation semantics matter. | [[CSharp/Struct Passing]] | High |
| DbContext command concurrency | DbContext is not thread-safe and cannot run multiple operations concurrently. | [[EF Core/DbContext Command Concurrency]] | High |
| Record struct vs record class | Value vs reference semantics, equality, copying, mutation/default value differences. | [[CSharp/Record Struct vs Record Class]] | High |
| FixedTimeEquals | Constant-time comparison prevents timing leaks for secrets. | [[Security/FixedTimeEquals]] | High |
| PBKDF | Password-based key derivation: salt + iterations/work factor, not plain hash. | [[Security/PBKDF]] | High |
| Raw SQL / ExecuteUpdate / ExecuteDelete | EF APIs for raw SQL queries, raw commands, bulk update/delete without loading entities. | [[EF Core/Raw SQL ExecuteUpdate ExecuteDelete]] | High |
| Transaction strategies | Explicit transaction, execution strategy, retry behavior, isolation boundaries. | [[EF Core/Transactions Strategies]] | Medium-High |
| DTO mapping | Mapping between entities and DTOs; avoid leaking EF entities to API. | [[Mapping/DTO Mapping]], [[DTO/Translate DTOs]] | High |
| IQueryable extension | Extension methods can compose query expressions if they remain translatable. | [[LINQ/IQueryable Extension]] | High |
| No reverse translation | Some LINQ operators like `Reverse` may not translate or have unclear SQL equivalent without ordering. | [[LINQ/No Reverse Translation]] | High |
| DTO translation | Projection to DTO can be translated if expression is SQL-compatible. | [[DTO/Translate DTOs]], [[EF Core/LINQ To SQL Translation]] | High |
| Span / Memory / stackalloc / MemoryPool | Low-allocation memory APIs: stack memory, pooled memory, span views. | [[CSharp/Span Memory Stackalloc MemoryPool]] | Medium-High |

## Day 25 — Deep repeat questions

### POST / cache theory

- What is POST usually used for?
- Is POST idempotent by default?
- Can POST responses be cached?
- What makes cache key correct or incorrect?
- What is cache invalidation?
- What is cache stampede?
- Why can stale cache be worse than no cache for security/authorization data?

### String equality / hash code

- What rule must `Equals` and `GetHashCode` satisfy?
- Why must equal objects have equal hash codes?
- For case-insensitive equality, why must hash code also be case-insensitive?
- What happens if equality ignores case but hash code does not?
- Why can dictionary/hashset lookup break if equality/hash code disagree?
- What is the difference between ordinal, ordinal-ignore-case, culture-sensitive comparisons?

### Struct passing / record struct vs record class

- What happens when a struct is passed into a method normally?
- What changes with `ref`?
- What changes with `in`?
- What changes with `out`?
- Why can large struct copying be expensive?
- Why can mutable structs be dangerous?
- What equality does record struct generate?
- What is the difference between record class reference identity and value-like generated equality?
- Why does default value matter more for structs?

### DbContext command concurrency

- Why is DbContext not thread-safe?
- What happens if two async queries run on the same DbContext at the same time?
- Why should each concurrent operation use its own DbContext?
- How does DbContext lifetime relate to web request scope?
- Why is sharing DbContext across background tasks dangerous?
- What error often appears when second operation starts before previous completes?

### FixedTimeEquals / PBKDF

- Why should secret comparisons use fixed-time comparison?
- What timing information can leak from normal equality comparison?
- What inputs should be compared with `FixedTimeEquals`?
- Why is PBKDF different from plain hash?
- What are salt and iterations for?
- Why should password hash be slow?
- Why should password hashing use library algorithms rather than custom SHA hashing?

### EF raw SQL / ExecuteUpdate / ExecuteDelete

- What is the difference between `FromSql`, `FromSqlRaw`, and `FromSqlInterpolated`?
- Which APIs are safe against SQL injection when used correctly?
- What is `ExecuteSqlRaw` for?
- What does `ExecuteUpdateAsync` do?
- What does `ExecuteDeleteAsync` do?
- Why do bulk update/delete bypass normal tracked entity updates?
- What happens to already tracked entities after bulk update/delete?
- When should raw SQL be avoided?
- When is raw SQL the cleanest option?

### Transactions / execution strategies

- When do we need explicit transaction?
- What does EF execution strategy retry?
- Why can manual transaction conflict with retrying execution strategy if not wrapped correctly?
- What does isolation level control?
- What is the difference between atomicity and isolation?
- What should happen if part of multi-step operation fails?
- Why should retryable transaction block be idempotent or carefully designed?

### DTO mapping / IQueryable projection

- Why project to DTO in query instead of loading entity then mapping?
- When can DTO projection be translated to SQL?
- Why can arbitrary mapping method break translation?
- How can expression-based mapping help?
- Why should API not expose EF entities directly?
- What belongs in DTO vs entity?
- What is the difference between translating DTO projection and doing mapping after materialization?

### IQueryable extensions / no reverse translation

- How can an extension method preserve `IQueryable` translation?
- Why should IQueryable extension return `IQueryable<T>` rather than `IEnumerable<T>`?
- What happens if extension calls `ToList` too early?
- Why is `Reverse()` hard to translate without explicit ordering?
- Why are `Last()` / `ElementAt()` problematic without order?
- Why can `Aggregate()` be hard to translate?
- How can query be rewritten into supported SQL shape?

### Span / Memory / stackalloc / MemoryPool

- What is `Span<T>`?
- Why can `Span<T>` not be stored on heap?
- When is `stackalloc` useful?
- Why should stackalloc size be small and bounded?
- What is `Memory<T>` for compared with `Span<T>`?
- When should `MemoryPool<T>` be used?
- Why must pooled memory be returned/disposed?
- What bugs appear if pooled memory is used after return?

---

# Day 30 — Deep fragment processing

Status: deeper pass from Day 30 screenshots.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| `sessionStorage` new tab / refresh / duplicate behavior | Browser storage lifecycle: refresh keeps, close clears, new tab is empty, duplicate tab copies initial state. | [[Browser/sessionStorage vs localStorage]] | High |
| localStorage + antiforgery mismatch screenshots | `localStorage` can keep JS token/state synced, but hidden HTML input can still contain old antiforgery token. | [[ASP/Antiforgery Token Refresh]], [[Browser/localStorage State Sync]] | High |
| “localStorage only helps in one specific design” | `localStorage` helps only if all requests read token/state from JS immediately before sending. | [[Browser/localStorage State Sync]] | High |
| localStorage problems | XSS exposure, logout/tab consistency, multi-user browser, token persistence. | [[Browser Token Storage]], [[ASP/Browser Token Storage]] | High |
| offline-aware UI | React Query-like state: passed / fetching / pending states and offline indicator. | [[Browser/Offline Aware UI]] | Medium |
| EF `FormatDisplay(...)` in projection | Custom C# method cannot translate to SQL unless after materialization/final projection. | [[EF Core/LINQ To SQL Translation]] | High |
| arbitrary object construction before final projection | Non-SQL-shaped work in query pipeline breaks translation. | [[EF Core/LINQ To SQL Translation]] | High |
| unmapped computed property in predicate | EF cannot translate CLR-only property like `Calculated` unless mapped/computed in DB. | [[EF Core/Computed Properties Translation]] | High |
| unsupported operator examples | `Reverse`, `Last`, `ElementAt`, `Aggregate` are listed as unsupported/problematic operators. | [[LINQ/No Reverse Translation]] | High |
| aggregate-based `GroupBy` | `GroupBy(...).Select(g => new { Count, MaxRating })` translates to SQL `GROUP BY`. | [[EF Core/GroupBy Translation]] | High |
| `GroupBy` shapes without aggregation | Plain `GroupBy` / nested grouped collection may not map to relational result shape. | [[EF Core/GroupBy Translation]] | High |
| SaveChanges / DbCommand interceptor suppression | Suppression is possible before operation executes; after SaveChanges completed you cannot “unsave”. | [[EF Core/DbCommand SaveChanges Suppression]] | High |
| content negotiation supported media type matching | Match `Accept` header against supported media types with quality/specificity/preference. | [[ASP/API Content Negotiation]] | Medium |
| WebSocket protocol/subprotocol/current state | Browser asks protocol, server accepts subprotocol, both can check current state. | [[WebSockets/Browser Protocol]], [[WebSockets/Accepted Subprotocol]], [[WebSockets/State Checking]] | High |
| header parsing | Parse headers safely rather than relying on raw string assumptions. | [[HTTP/Header Parsing]] | Medium |
| ClientWebSocket options | Client options for WebSocket connection configuration. | [[WebSockets/ClientOptions]] | Medium |

## Day 30 — Deep repeat questions

### sessionStorage / localStorage / antiforgery

- What is created for a new top-level browsing session: new `sessionStorage` or shared one?
- What happens to `sessionStorage` on refresh?
- What happens when a tab is duplicated?
- Why can duplicate tab initially copy sessionStorage but later diverge?
- Why does `localStorage` not automatically fix stale hidden form fields?
- In an antiforgery mismatch, what can be stale: hidden input token, cookie token, local JS state, or all of them?
- Why does `localStorage` help only if all requests read the current value just before sending?
- Why is `localStorage` risky for tokens?
- Why can logout/login in another tab make token state confusing?
- What is the difference between “state used by JS” and “state baked into rendered HTML”?

### Offline-aware UI

- What states are shown by offline-aware UI: pending, fetching, failed, passed?
- Why should UI distinguish “offline” from “request failed”?
- What should happen when network returns?
- What can be retried automatically, and what needs user confirmation?

### EF LINQ translation

- Why can EF translate `Where(p => p.Rating > 3)` but not arbitrary C# method calls?
- Why can final projection contain client-side formatting after data is fetched?
- Why is object construction/business logic before final projection risky?
- Why does EF fail on unmapped computed property in a predicate?
- What is the difference between CLR property and mapped SQL expression?
- Why are operators like `Reverse`, `Last`, `ElementAt`, `Aggregate` often problematic?
- Which `GroupBy` shape translates well?
- Why does `GroupBy(...).Select(g => new { Count = g.Count(), Max = g.Max(...) })` map to SQL?
- Why is plain `GroupBy` without aggregation not the same as SQL `GROUP BY`?

### SaveChanges / DbCommand interceptors

- What does it mean to suppress a command?
- Why must suppression happen before operation executes?
- Why can `SavingChanges` / `SavingChangesAsync` suppress SaveChanges before DB write?
- Why can `SavedChanges` not “unsave” already completed database changes?
- What is the difference between `InterceptionResult<T>` and post-action notification?
- When would suppression be valid, and when would it hide a bug?

### Content negotiation

- How does server match `Accept` header against supported media types?
- What is media type specificity?
- What does `q` value mean?
- How do wildcards like `*/*` or `application/*` rank?
- Why might supported preference order matter?
- What should happen if no supported media type matches?

### WebSockets

- How does browser request a WebSocket subprotocol?
- How does server choose and expose accepted subprotocol?
- What is the difference between requested protocol and accepted protocol?
- Why should both client and server check current WebSocket state before send/receive/close?
- What states matter most: `Open`, `CloseSent`, `CloseReceived`, `Closed`, `Aborted`?
- Why can only certain concurrent operations be safe?
- Which options belong in `ClientWebSocketOptions`?
- What headers should be parsed carefully during handshake?

---

# Fragment Clarity / Processing Confidence Review

Status: draft review layer.

Purpose: keep unclear screenshot/code fragments visible instead of hiding them inside topic-note guesses.

Scale:

```text
Clarity:
- High = source label/topic is clear enough to route now.
- Medium = likely meaning is clear, but exact screenshot/code should be checked.
- Low = label is ambiguous or the fragment may be about syntax/details not obvious from text.

Processing depth:
- Light = only routed to likely topic and broad question.
- Medium = interpreted as a concrete concept/feature and questions added.
- Deep = connected to a specific mechanism, edge case, or repeat workflow.
```

Important rule:

```text
If a fragment is Low or Medium clarity, keep it as a repeat item with explicit uncertainty.
Do not delete it and do not pretend it is fully understood.
```

## Per-day fragment clarity table

| Day | Inserted / literal fragments identified | Clarity | Processing depth | Confidence that meaning was understood | Unclear moments / next source check |
|---|---|---:|---:|---:|---|
| 01 | `StringReader sheet`; `System.Text.Json ser`; SSE buffering; custom route constraint; Polly/compression notes | Medium | Medium | Medium | Need exact screenshot/code for `StringReader sheet` and `System.Text.Json ser`; `accel buffering with sse` may refer to proxy/browser/server buffering, exact layer unclear. |
| 02 | Retry-after with Polly; string/char operations; request decompression/response compression; ProblemDetails from ModelState; pagination/sorting; JSON writing outside MVC | Medium | Medium | Medium | Retry-after logic needs source check: header parsing vs Polly delay generator vs resilience context. String/char fragment may be syntax/allocation detail. |
| 03 | Polly custom pipelines; cache comparison; memory/distributed/hybrid cache; options | High | Medium | High | Main meaning clear. Need source check only for exact HybridCache/invalidation details if screenshot has code. |
| 04 | Request/response buffering caveats; static files middleware | Medium | Medium | Medium | Need exact code for buffering caveat: request body rewind, response buffering, or no-buffer streaming could be different fragments. |
| 05 | Multiple cache keys; cache stampede with `SemaphoreSlim`; Razor/views/tag helpers/view components; hidden input/AJAX; return URL/localization/auth | Medium | Medium | Medium | Many fragments are broad. Need source check for whether cache invalidation was manual key deletion, dependency tags, or grouped keys. Hidden input/AJAX exact point unclear. |
| 06 | EF primitive collection tracking; `ValueConverter`/`ValueComparer`; validation attributes / `IValidatableObject`; explicit interface; lazy loading; request stream rereading; jQuery validation | Medium | Medium | Medium | EF `ValueComparer` meaning likely strong, but exact primitive collection code should be checked. Stream rereading may be about request body, network stream, or response stream. |
| 07 | Exception filter vs middleware; Produces; FluentValidation; ProblemDetails; primitive list querying; Polly nesting/conditional pipeline; partial updates; antiforgery; cookie/JWT auth; authorization | Medium | Medium | Medium | Very dense day. Antiforgery/auth likely important. Need source check for exact `UseStatusCodePages + AddProblemDetails` screenshot and `Produces` distinction. |
| 08 | Async enumerable JSON deserialization; `HeadersRead`; Content-Disposition; EF configuration; hashing/Base64Url; account activation/password recovery/Data Protection | Medium | Medium | Medium | `reading when headers arrive` likely `HttpCompletionOption.ResponseHeadersRead`, but exact relation to JSON async enumerable should be checked. |
| 09 | Polly exceptions/timeouts; CORS vs antiforgery; authorization `context.Fail`; reCAPTCHA | Medium | Medium | Medium | CORS vs antiforgery depends on cookie/token auth model; source check needed before making final rule. Polly timeout ordering should be verified from fragment. |
| 10 | HttpClientFactory; typed client; DelegatingHandler; SocketsHttpHandler; streaming with HttpClient; Polly pipeline; OutputCache/ResponseCache; OptionsMonitor; MFA | High | Deep | High | Strong candidate for priority repeat. Need exact screenshot/code for streaming retry: whether issue is request recreation, stream position reset, or handler/pipeline boundary. |
| 11 | Hashing theory | High | Light | Medium | Day is sparse. Need source screenshot to know whether it was password hashing, general hashing, PBKDF, salt, or fixed-time comparison. |
| 12 | Windows auth; Identity; account lockout; RateLimiter; Redis multiplexer/lock; static fields multiple instances; reCAPTCHA flow | Medium | Medium | Medium | Need source check for Redis lock/rate-limit distinction and static-field problem. Could be architecture/distributed deployment issue. |
| 13 | Custom FluentValidation; manual middleware response; StatusCodePages; StreamReader/body reading; Polly `ShouldHandle`; bulkhead/concurrency limiter; token storage; RouteData; Razor partial; EventSource; memory read; TOTP/Base32; typed HttpClient with DB; custom Polly pipeline cheat sheet | Medium | Deep | Medium | Very dense and likely contains several screenshots. `Typed HttpClient With DB Context` needs exact intent: anti-pattern, dynamic token/header loading, or per-request DB lookup. TOTP/Base32 likely syntax/math detail. |
| 14 | StreamReader vs ReadAsString; ActionDescriptor/Endpoint metadata; conditional pipelines; Polly timeout/circuit breaker; EF owned types; lockout/rate limiter lease/global limiter; Redis limiter; Identity schema; JWT claims; cookie auth; options with DI; WebSockets; OIDC tickets/handlers | Medium | Deep | Medium | Important but broad. Need exact code for RateLimiter lease metadata / Retry-After and OIDC auth ticket/handler flow. |
| 15 | HttpClient pool cleanup/DNS; shared Polly pipelines; ConfigureAwait; async state machine; endpoint produces/vary; StringReader allocations; password hasher; Content-Disposition; Blob download/show; cookies vs JWT in cookies | Medium | Medium | Medium | Need exact screenshots for connection pool cleanup and DNS/handler lifetime. Async state machine fragment may be syntax/lowering detail. |
| 16 | Cookie auth; ActionDescriptor vs ControllerActionDescriptor; DataProtection purpose chains; CORS for normal POSTs; authorization scope claims; Polly args/outcome/result/exceptions; RetryAfter; rate limiter strategy; OIDC IDP settings/client config/token storage; fixed-size buffer writing | Medium | Deep | Medium | Several fragments are subtle. `CORS For Normal POSTs` should be checked carefully because security conclusion depends on credentials/cookies. Polly `Outcome` exact API usage likely syntax detail. |
| 17 | Polly usage; retryable request recreation; Produces/endpoint distinction; Base64Url; options configuration; ProblemDetails writer order; ETag If-Match | High | Deep | High | Good high-value repeat. Need exact code for ProblemDetails writer order and retryable request recreation. |
| 19 | OIDC custom identity resources/client claims/scopes/events; `ReadAsStreamAsync` buffering; WebSockets properties; processing data as stream | Medium | Medium | Medium | Need source check for OIDC provider/client setup and `ReadAsStreamAsync` buffering behavior. |
| 20 | Custom authorization policy | High | Light | Medium | Topic is clear, but exact fragment depth unknown. Could be policy/requirement/handler/assertion syntax. |
| 21 | Endpoint `MethodInfo` metadata; RandomNumberGenerator; options with DI limits; Polly nesting; ClientWebSocket; complex types; field vs object validation | Medium | Medium | Medium | Need source check for endpoint metadata API and options-with-DI limitation. |
| 22 | UTF8 chunk processing; EF ChangeTracker; returning IEnumerable without ToList; ETag aggregate; LINQ-to-SQL; parallel account creation; nullable relationships; constructors/materialization; partial initialization; identity map/AutoInclude; AsSplitQuery; transactions/isolation; abstraction/encapsulation; DbContext encapsulation; Base16/bytes memory decoding | Medium | Deep | Medium | Dense EF/architecture day. Meaning mostly clear but individual screenshot fragments likely need exact syntax verification. High priority if EF is important now. |
| 23 | Route params for IDs; REST bulk methods; IQueryable translation; protector services; WebSockets one send/one receive; Channels; async enumerable; HashCode/equality/records; SemaphoreSlim vs Channel; `ref in out`; lock/Monitor; EF state with non-default ID | Medium | Medium | Medium | Need source check for REST design conclusions and WebSocket concurrency rules. C# fragments may be syntax/semantics details. |
| 24 | If-Match update flow; DbContext sheet; exception filters; ViewResult from filter; API content negotiation; exception bubbling; JwtSecurityTokenHandler; UTF8 decoder chunks; File System Access API; HttpMessageHandler options; antiforgery; EF navigation/collection/reference; LINQ-to-SQL translation; interceptors; LINQ query syntax | Medium | Deep | Medium | Very broad. Need exact source check for filters vs middleware and interceptors. Likely multiple separate topic-note sections, not one topic. |
| 25 | POST request; cache theory; string equality/hash codes; struct passing; DbContext command concurrency; record struct/class; FixedTimeEquals; PBKDF; raw SQL/ExecuteUpdate/Delete; transactions strategies; DTO mapping; IQueryable extension; no reverse translation; DTO translation; Span/Memory/stackalloc/MemoryPool | Medium | Deep | Medium | High-value but broad. Need source check for exact EF raw SQL API distinctions and Span/Memory syntax/performance details. |
| 30 | DbCommand/SaveChanges suppression; DelegatingHandler streaming retry fix; request/response buffering caveats; browser storage / antiforgery mismatch; offline-aware UI; EF LINQ translation limitations; GroupBy translation; content negotiation; WebSockets protocol/subprotocol/state/client options; header parsing; HATEOAS; REST collection/link relation rules | Medium | Deep | Medium-High | Important because it revisits streaming retry and WebSockets, and now also includes browser storage/antiforgery and EF translation fragments. Need exact screenshot/code for DelegatingHandler fix, content negotiation matcher, and REST/HATEOAS conclusions. |

## Unclear / needs-source-check fragments to keep visible

```text
- Day 01: `what is accel buffering with sse`.
- Day 02: Polly `Retry-After` exact API path.
- Day 05: hidden input / AJAX.
- Day 06: request/network stream rereading.
- Day 07: `Produces` / ProblemDetails / StatusCodePages interaction.
- Day 10: streaming retry with HttpClient exact failure mode.
- Day 13: typed HttpClient with DB context.
- Day 14: RateLimiter lease / Retry-After extraction.
- Day 16: CORS for normal POSTs.
- Day 17: ProblemDetails writer order.
- Day 22: EF materialization / partial initialization / identity map cluster.
- Day 24: filters / content negotiation / interceptors cluster.
- Day 30: DelegatingHandler streaming retry fix, content negotiation matcher and REST/HATEOAS conclusions.
```

## Priority fragments for deeper conversion into real repeat material

```text
1. HttpClientFactory / DelegatingHandler / streaming retry / request recreation.
2. Cookie/JWT/OIDC/token storage/auth ticket flow.
3. EF Core LINQ translation / DbContext concurrency / transactions / interceptors.
4. ProblemDetails / exception filters / middleware response writing.
5. Antiforgery / CORS / CSRF boundary.
6. WebSockets protocol/state/send-receive/subprotocol handling.
7. Streams / UTF8 decoder / StreamReader / ReadAsString / buffering caveats.
```
