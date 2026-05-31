# Day 01 — Deep fragment processing

Status: deeper pass from Day 01 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| `StringReader sheet` | Likely a cheat-sheet / syntax fragment about reading text line-by-line from an in-memory string. | [[ASP/StringReader]], [[CSharp/StringReader]] | Medium |
| `System.Text.Json ser` | Serialization fragment: serialize object to string/stream/response; likely with options. | [[ASP/System.Text.Json Serialization]] | Medium-High |
| `what is accel buffering with sse` | SSE buffering issue, likely `X-Accel-Buffering` / proxy buffering / response buffering. | [[ASP/SSE And Buffering]] | Medium |
| `custom route constraint` | Route matching rule that constrains parameter format before action/model validation. | [[ASP/Custom Route Constraints]] | High |
| Polly basics | Basic resilience strategies: retry/timeout/circuit breaker/fallback. | [[ASP/Polly Basics]] | Medium |
| Compression | Response/request compression or decompression behavior. | [[ASP/Compression]] | Medium |

## Day 01 — Deep repeat questions

### StringReader
- What is `StringReader` used for?
- Why use `StringReader` instead of manually splitting a string by `\n`?
- What does `ReadLine()` return at the end of input?
- Does `StringReader` read from a file, stream, or existing string?
- When is `StringReader` useful for parsing generated/exported text?

### System.Text.Json serialization
- What is the difference between serializing to string and serializing to stream?
- When should `JsonSerializer.Serialize` be used?
- When should `JsonSerializer.SerializeAsync` be used?
- How do serializer options affect naming, nulls, converters and formatting?
- Why might serialization to a stream require resetting stream position before reuse?

### SSE buffering
- Why can buffering break Server-Sent Events?
- What layer can buffer SSE: ASP.NET middleware, reverse proxy, nginx, browser, compression, or hosting layer?
- What does `X-Accel-Buffering: no` usually try to prevent?
- Why should SSE responses usually flush periodically?
- Why can response compression be dangerous for streaming responses?

### Custom route constraints
- What problem does a custom route constraint solve?
- What is the difference between route matching and model validation?
- When should invalid input fail route matching instead of reaching action logic?
- How does a route constraint affect endpoint selection?
- Why should constraints stay simple and not become business validation?

---

# Day 02 — Deep fragment processing

Status: deeper pass from Day 02 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Polly `Retry-After` | Retry delay derived from response headers, exception data, or resilience context. | [[ASP/Polly Retry After]] | Medium |
| String/char operations | Syntax/allocation fragment about string manipulation, char insertion or substring avoidance. | [[CSharp/String And Char APIs]] | Medium |
| Request decompression / response compression | Difference between decompressing incoming request body and compressing outgoing response. | [[ASP/Request Decompression And Response Compression]] | High |
| ProblemDetails from ModelState | Validation errors converted into ProblemDetails / validation problem response. | [[ASP/ProblemDetails From ModelState]] | High |
| Pagination / sorting | Query parameters and stable ordering for paged API results. | [[ASP/Pagination Sorting]] | Medium |
| Writing JSON outside MVC | Manually writing JSON to response outside controller helpers. | [[ASP/Writing JSON Outside MVC]] | Medium-High |

## Day 02 — Deep repeat questions

### Polly Retry-After
- What is `Retry-After` used for?
- Can `Retry-After` be a date or a duration?
- Where can retry delay be read from: HTTP response, exception, or resilience context?
- Why should retry delay not be hardcoded when server gives retry metadata?
- What should happen if `Retry-After` is invalid or too large?
- Why is exact source/API path still a source-check item here?

### String / char operations
- When does string manipulation allocate a new string?
- Why are strings immutable in C#?
- When is `StringBuilder` better than repeated concatenation?
- When can char-based operations be simpler than substring operations?
- What exact syntax was likely shown in the fragment and needs source check?

### Request decompression / response compression
- What is request decompression?
- What is response compression?
- Why are they opposite directions?
- Which headers usually describe compressed content?
- Why can compression interact badly with streaming?
- Why should APIs be careful with compressed request body limits?

### ModelState → ProblemDetails
- What is `ModelState`?
- How do validation errors become response payload?
- What is the difference between `ProblemDetails` and `ValidationProblemDetails`?
- Who owns validation response shape: MVC default behavior, custom factory, middleware, or filter?
- Why is consistent validation error shape important for clients?

---

# Day 03 — Deep fragment processing

Status: deeper pass from Day 03 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Polly custom pipelines | Building named/custom resilience pipelines with composed strategies. | [[ASP/Polly Custom Pipelines]] | High |
| OutputCache vs ResponseCache | Server-side output caching vs HTTP response caching headers/client/proxy cache. | [[ASP/OutputCache vs ResponseCache]] | High |
| IMemoryCache | In-process cache for one app instance. | [[ASP/IMemoryCache]] | High |
| IDistributedCache | Shared cache abstraction across instances, often Redis/SQL. | [[ASP/IDistributedCache]] | High |
| HybridCache | Higher-level cache combining local + distributed behavior. | [[ASP/HybridCache]] | Medium |
| Options pattern | Binding/configuring typed settings from configuration/DI. | [[ASP/Options Pattern]] | High |

## Day 03 — Deep repeat questions

### Polly custom pipelines
- What is a resilience pipeline?
- Which strategies can be composed in one pipeline?
- Why does strategy order matter?
- When should we use a named pipeline?
- What should pipeline own: retry decisions, timeout, circuit breaker, fallback, or request mutation?

### OutputCache vs ResponseCache
- What does `OutputCache` do on the server?
- What does response caching do through HTTP headers?
- Why can `ResponseCache` be mostly metadata/header-oriented?
- When can user-specific content be cached safely?
- Why must cache vary by relevant headers/query/auth state?

### Memory / distributed / hybrid cache
- What breaks if `IMemoryCache` is used in a multi-instance app?
- When is distributed cache needed?
- What consistency issue exists when local cache and distributed cache are both used?
- What is cache invalidation?
- What is cache stampede?
- What should be checked in original source for exact HybridCache details?

### Options pattern
- What is `IOptions<T>`?
- What is `IOptionsSnapshot<T>`?
- What is `IOptionsMonitor<T>`?
- When do options update at runtime?
- When do named options help?

---

# Day 04 — Deep fragment processing

Status: deeper pass from Day 04 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Request/response buffering caveats | Reading request/response streams more than once; buffering/rewinding tradeoffs. | [[ASP/Request Response Buffering Caveats]] | Medium |
| Static files middleware | `UseStaticFiles` serves files and may short-circuit pipeline. | [[ASP/Static Files Middleware]] | High |

## Day 04 — Deep repeat questions

### Buffering caveats
- Why can request body usually be read only once?
- What does enabling buffering allow?
- Why should request body position be reset after reading?
- Why can buffering large bodies be expensive?
- What is the difference between buffering request body and buffering response body?
- When should streaming be preserved instead of buffering?

### Static files middleware
- What does `UseStaticFiles` do?
- Where should static files middleware be placed in pipeline?
- Why can it short-circuit the request?
- Does static file middleware require MVC endpoints?
- How do caching headers for static files differ from dynamic API responses?

---

# Day 05 — Deep fragment processing

Status: deeper pass from Day 05 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Multiple cache keys | Related cache entries need coordinated invalidation. | [[ASP/Cache Invalidation]] | Medium-High |
| Stampede protection with `SemaphoreSlim` | Prevent many concurrent requests from recomputing same cache value. | [[ASP/Cache Stampede Protection]] | High |
| Razor views / tag helpers / view components | MVC/Razor rendering primitives and reusable UI pieces. | [[ASP/Razor Views Basics]], [[ASP/Tag Helpers]], [[ASP/View Components]] | Medium |
| View discovery / templates | How Razor finds views, editor/display templates. | [[ASP/View Discovery]], [[ASP/Editor Display Templates]] | Medium |
| Hidden input / AJAX | Likely form hidden fields, antiforgery token, model binding, or manual AJAX submit. | [[ASP/AJAX Manual Form Sending]], [[ASP/Antiforgery]] | Medium-Low |
| Return URL / localization / auth | Auth redirect and localized UI/message flow. | [[ASP/Return URL]], [[ASP/Localization]], [[ASP/Cookie Authentication]], [[ASP/JWT Authentication]] | Medium |

## Day 05 — Deep repeat questions

### Cache invalidation / stampede
- Why can one logical object have several cache keys?
- What happens if only one related cache key is invalidated?
- When is grouped/tag-based invalidation better than manual key deletion?
- What is cache stampede?
- How does `SemaphoreSlim` prevent local stampede?
- Why does local `SemaphoreSlim` not solve distributed stampede across app instances?
- What would distributed stampede protection need?

### Razor / views / tag helpers / view components
- What is a Razor view?
- What problem do tag helpers solve?
- How are view components different from partial views?
- When should reusable UI be a view component?
- What is view discovery?
- Where does Razor look for views by default?
- What are editor/display templates for?

### Hidden input / AJAX
- What can hidden inputs store?
- Why can hidden input become stale after JS state changes?
- How does antiforgery token usually appear in form HTML?
- What must manual AJAX/fetch submit include that normal form post includes automatically?
- Why does this fragment need source check: hidden input could mean model id, antiforgery token, return url, or validation state?

### Auth / return URL / localization
- Why does login flow often include return URL?
- What validation is needed before redirecting to return URL?
- How do cookie auth and JWT auth differ in browser apps?
- What part of auth UI can be localized?
- Why can localized validation/auth messages complicate API response consistency?

---

# Day 06 — Deep fragment processing

Status: deeper pass from Day 06 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| EF primitive collections tracking | EF tracks changes to primitive collections / converted values only with correct comparison. | [[EF Core/Primitive Collections Tracking]] | Medium-High |
| ValueConverter / ValueComparer | Conversion changes storage shape; comparer tells EF how to detect changes. | [[EF Core/ValueConverter And ValueComparer]] | High |
| Validation attributes / `IValidatableObject` | Property-level vs object-level validation. | [[ASP/Validation Attributes And IValidatableObject]] | High |
| Explicit interface implementation | Interface member implemented only through interface reference. | [[CSharp/Explicit Interface Implementation]] | High |
| Lazy loading | Navigation loaded on access; can create hidden queries/N+1. | [[EF Core/Lazy Loading]] | High |
| Request stream rereading | Need buffering/replacement to read body/stream more than once. | [[ASP/Request Stream Rereading]] | Medium |
| jQuery validation / tag helper formatting | Client-side validation generated from server metadata / formatting attributes. | [[ASP/jQuery Validation]], [[ASP/Tag Helpers Formatting]] | Medium |

## Day 06 — Deep repeat questions

### EF primitive collections / comparer
- Why can EF need a `ValueComparer`?
- What does `ValueConverter` do?
- Why is conversion alone not always enough for change tracking?
- How does EF compare old and new values?
- What can go wrong if collection equality uses reference equality?
- When should collection values be copied/snapshotted?

### Validation
- What validation belongs in data annotations?
- What validation belongs in `IValidatableObject`?
- How is object-level validation different from property-level validation?
- When should FluentValidation/custom validator be used instead?
- How do validation errors map to fields?

### Explicit interface implementation
- What is explicit interface implementation?
- Why would a class hide an interface member from public API?
- How do you call explicitly implemented member?
- When is it useful for avoiding naming conflict?
- Why can it improve API surface explicitness?

### Lazy loading
- What is lazy loading?
- Why can lazy loading create N+1 queries?
- How does lazy loading interact with disposed DbContext?
- When should explicit/eager loading be preferred?
- Why can lazy loading hide performance costs?

### Stream rereading
- Why can network/request streams be one-shot?
- How can buffering allow rereading?
- What must be reset after reading?
- Why might replacing content with `ByteArrayContent` help for retry?
- Which exact stream type needs source check here: request body, response stream, network stream, or custom stream?

---

# Day 07 — Deep fragment processing

Status: deeper pass from Day 07 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Exception filter vs middleware | MVC filter scope vs whole ASP.NET middleware pipeline. | [[ASP/Exception Filters vs Middleware]] | High |
| `Produces` attribute | Endpoint response metadata / OpenAPI / content negotiation hints. | [[ASP/Produces Attribute]] | Medium-High |
| FluentValidation integration | Replace/extend MVC validation with FluentValidation. | [[ASP/FluentValidation Integration]] | Medium |
| ProblemDetails status pages / exception handler | Consistent error payloads for status codes and exceptions. | [[ASP/ProblemDetails StatusCodePages]], [[ASP/ProblemDetails ExceptionHandler]] | High |
| EF primitive list querying | Querying/filtering by primitive collection/list values. | [[EF Core/Querying With Primitive Lists]] | Medium |
| Polly nesting / conditional pipelines | Composing strategies and selecting pipeline based on condition. | [[ASP/Polly Nesting]], [[ASP/Conditional Resilience Pipelines]] | Medium |
| Razor partial updates | Partial views, ViewComponents, AJAX/HTMX-style updates. | [[ASP/Razor Partial Updates]] | Medium |
| Antiforgery / cookie & JWT auth / authorization | Browser security + auth/authorization flow. | [[ASP/Antiforgery]], [[ASP/Cookie Auth End To End]], [[ASP/JWT Auth End To End]], [[ASP/Authorization]] | Medium-High |

## Day 07 — Deep repeat questions

### Exception filters / ProblemDetails
- Where do exception filters run?
- Why can middleware catch more exceptions than MVC exception filters?
- When is exception filter still useful?
- What is `UseExceptionHandler` responsible for?
- What is `UseStatusCodePages` responsible for?
- Why does empty response body matter for status-code pages?
- How does `AddProblemDetails` participate in consistent error responses?

### Produces / content negotiation
- What does `[Produces]` describe?
- How can `Produces` affect generated API metadata?
- Is `Produces` the same as forcing a formatter?
- How can endpoint metadata affect content negotiation?
- Why is the exact `Produces` fragment still source-check-worthy?

### FluentValidation / MVC validation
- How does FluentValidation integrate with MVC?
- What is the difference between model binding errors and validation errors?
- Where should validation errors be converted to ProblemDetails?
- Why should validation logic not be duplicated between server and client?

### Antiforgery / auth / authorization
- What exact attack does antiforgery prevent?
- Why is antiforgery mostly relevant to cookie-auth browser flows?
- How is cookie auth end-to-end different from JWT bearer auth end-to-end?
- What is authentication vs authorization?
- What does authorization policy evaluate?
- Why does CORS not replace authorization?

---

# Day 08 — Deep fragment processing

Status: deeper pass from Day 08 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Async enumerable JSON deserialization | Incrementally reading JSON arrays/streams into async sequence. | [[System.Text.Json/Async Enumerable Deserialization]] | Medium-High |
| `HeadersRead` streaming | Start reading response body as soon as headers arrive. | [[ASP/HeadersRead Streaming]] | High |
| Content-Disposition | Browser behavior for inline vs attachment and filenames. | [[HTTP/Content-Disposition]] | High |
| EF entity configuration | Fluent API/model configuration for entities. | [[EF Core/Entity Configuration]] | Medium |
| Hashing / Base64Url | Hash/token representation and URL-safe encoding. | [[Security/Hashing]], [[Security/Base64Url]] | Medium |
| Account activation / password recovery / Data Protection | Protected purpose-bound tokens/links. | [[ASP/Account Activation]], [[ASP/Password Recovery]], [[ASP/Data Protection]] | High |

## Day 08 — Deep repeat questions

### Async enumerable / streaming
- When can JSON be deserialized incrementally?
- What shape of JSON is easiest to stream: sequence/array or arbitrary object graph?
- What does `ResponseHeadersRead` change?
- Why can reading headers first reduce buffering?
- What still needs to be disposed when streaming response content?
- When can `ReadAsStreamAsync` still involve buffering depending on handler/settings?

### Content-Disposition
- What is `Content-Disposition`?
- What is the difference between `inline` and `attachment`?
- How does filename influence browser download behavior?
- Why should filename be sanitized/encoded?
- How does content type interact with content disposition?

### Data Protection / account links
- Why use Data Protection for activation/password recovery links?
- What does purpose string isolate?
- Why should activation token and reset token use different purposes?
- Why should recovery token expire?
- Why is signing/encryption not the same as authentication?
- What happens if key ring changes or is not shared across instances?

---

# Day 09 — Deep fragment processing

Status: deeper pass from Day 09 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Polly exceptions and timeouts | Strategy behavior when timeout/retry/circuit breaker throws or handles exceptions. | [[ASP/Polly Exceptions And Timeouts]] | Medium-High |
| CORS vs antiforgery | Cross-origin request policy vs CSRF protection boundary. | [[ASP/CORS vs Antiforgery]] | Medium-High |
| Authorization `context.Fail` | Explicitly failing authorization vs not succeeding requirement. | [[ASP/Authorization Context.Fail]] | High |
| reCAPTCHA | Bot protection integrated into form/API flow. | [[ASP/reCAPTCHA]] | Medium |

## Day 09 — Deep repeat questions

### Polly exceptions / timeouts
- Which Polly strategies throw exceptions?
- What does timeout strategy throw when operation exceeds timeout?
- Should retry handle timeout exceptions?
- How does circuit breaker count failures?
- Why does strategy order affect which exception is observed?
- What should be logged: original exception, timeout exception, final outcome, or all?

### CORS vs antiforgery
- What does CORS prevent?
- Does CORS stop the browser from sending all cross-origin requests?
- Why can cookie-auth form posts still need antiforgery?
- When can bearer-token API rely less on antiforgery?
- What role do credentials/cookies play?
- Why should security conclusion depend on exact auth model?

### Authorization `context.Fail`
- What happens if a requirement is simply not marked as succeeded?
- What does `context.Fail()` do?
- Can another handler still succeed after explicit fail?
- When should explicit failure be used?
- Why can explicit fail be dangerous if used too early?

### reCAPTCHA
- What does reCAPTCHA try to prove?
- Where should reCAPTCHA be verified: client only or server side?
- Why is client token alone not enough?
- How does reCAPTCHA relate to rate limiting and lockout?
- What should happen when verification fails?

---

# Day 11 — Deep fragment processing

Status: sparse day; deeper pass from topic label only.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Hashing theory | General hashing / password hashing / maybe salt/PBKDF distinction. | [[Security/Hashing Theory]] | Medium |

## Day 11 — Deep repeat questions

- What is a hash function?
- What is the difference between hashing and encryption?
- Why is password hashing different from normal fast hashing?
- What is a salt?
- What is a work factor / iterations?
- Why should password hash verification use a vetted library?
- What is fixed-time comparison and why does it matter for secrets?
- What exact hashing subtopic needs source check: general hash, password hash, PBKDF, HMAC, or token hash?

---

# Day 12 — Deep fragment processing

Status: deeper pass from Day 12 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Windows Authentication | Integrated auth with Windows/domain identity. | [[ASP/Windows Authentication]] | Medium |
| ASP.NET Identity | User management system: users, roles, claims, passwords, lockout. | [[ASP/Identity]] | High |
| Account lockout / RateLimiter | Failed-login throttling and blocking strategies. | [[ASP/Account Lockout]], [[ASP/RateLimiter]] | High |
| Redis multiplexer | Shared Redis connection object / connection management. | [[Redis/Multiplexer]] | Medium-High |
| Redis distributed lock | Cross-instance lock/coordination mechanism. | [[Redis/Distributed Lock]] | Medium |
| Static fields and multiple instances | Local static state does not coordinate across app instances. | [[CSharp/Static Fields And Multiple Instances]] | High |
| reCAPTCHA flow | Bot challenge token generated client-side and verified server-side. | [[ASP/reCAPTCHA Flow]] | Medium |

## Day 12 — Deep repeat questions

### Identity / lockout / rate limiting
- What does ASP.NET Identity provide?
- How does Identity lockout work conceptually?
- What is the difference between account lockout and IP/user rate limiting?
- Why can lockout become a denial-of-service vector?
- When should failed attempts be reset?
- How should lockout communicate retry time?

### Redis / distributed state
- What is Redis multiplexer used for?
- Why should Redis connection usually be reused?
- Why does local memory/static field fail in multi-instance app?
- What problem does distributed lock solve?
- Why can distributed locks be dangerous if expiration/ownership is wrong?
- When is a Redis lock needed vs a Redis counter/key with TTL?

### Static fields / multiple instances
- What does static field share inside one process?
- Does static field share state across servers/containers?
- Why can static counters be wrong behind load balancer?
- Which state must be externalized to DB/Redis?
- What bugs appear if auth/rate-limit state is kept in static memory?

### reCAPTCHA
- What does browser receive from reCAPTCHA?
- Why must server verify token with provider?
- Why should reCAPTCHA be combined with rate limiting?
- What happens if token is reused or expired?

---

# Day 15 — Deep fragment processing

Status: deeper pass from Day 15 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| HttpClient connection pool cleanup | Connections returned/expired/closed by handler pool settings. | [[ASP/HttpClient Connection Pool Cleanup]] | Medium-High |
| HttpClient DNS | DNS changes and pooled connection lifetime / handler lifetime. | [[ASP/HttpClient DNS]] | High |
| Shared Polly pipelines | Reusable resilience pipeline instances/registries. | [[ASP/Shared Polly Pipelines]] | Medium |
| ConfigureAwait | Capturing synchronization context / continuation scheduling. | [[CSharp/ConfigureAwait]] | Medium-High |
| Async state machine | Variables and continuation state captured across awaits. | [[CSharp/Async State Machine]] | Medium |
| Endpoint Produces Vary | Endpoint-produced content and cache variation by Accept/content type. | [[ASP/Endpoint Produces Vary]] | Medium-High |
| StringReader allocations | Allocation tradeoffs between splitting strings and reading line-by-line. | [[ASP/StringReader Allocations]] | Medium |
| Identity Password Hasher | ASP.NET Identity password hashing format/verification. | [[Security/Identity Password Hasher]] | High |
| Content-Disposition / Blob download vs show | Download/render behavior in browser. | [[HTTP/Content-Disposition]], [[Browser/Blob Download vs Show]] | High |
| Cookies vs JWT in cookies | Token-in-cookie vs auth-ticket cookie boundary. | [[ASP/Cookies vs JWT In Cookies]] | Medium-High |

## Day 15 — Deep repeat questions

### HttpClient pool / DNS
- What is pooled: HttpClient or handler/connection?
- When is connection returned to pool?
- What is handler lifetime?
- What is pooled connection lifetime?
- Why can DNS changes be missed by long-lived connections?
- How does `PooledConnectionLifetime` help?
- Why is creating new HttpClient per request usually bad?

### Shared Polly pipelines
- Why share a resilience pipeline?
- What should be per-request vs shared in a pipeline?
- Can pipeline hold mutable request-specific state?
- How should request-specific info be passed?
- Why can shared pipeline + hidden state be dangerous?

### ConfigureAwait / async state machine
- What does `await` compile into?
- What variables are captured across await?
- What does `ConfigureAwait(false)` change?
- Why does ASP.NET Core usually not need `ConfigureAwait(false)` for deadlock prevention?
- When can `ConfigureAwait(false)` still be useful in libraries?
- What exact source fragment needs check: state machine fields, continuation, or synchronization context?

### Produces / Vary / content disposition
- Why can endpoint response vary by `Accept`?
- What does `Vary: Accept` mean?
- How does `Produces` metadata relate to content negotiation?
- What makes browser show file inline vs download?
- How does Blob URL download differ from opening/showing content?

### Password hasher / cookies vs JWT
- What does ASP.NET Identity PasswordHasher store?
- Why does password hash format include algorithm/work factor metadata?
- Why should password hasher support rehashing?
- What is an auth-ticket cookie?
- What is JWT stored in cookie?
- Why can JWT-in-cookie still have CSRF concerns?
- Why is cookie protection different from JWT signature?

---

# Day 19 — Deep fragment processing

Status: deeper pass from Day 19 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| OIDC custom identity resources | Define which user claims/scopes can be requested. | [[OIDC/Custom Identity Resources]] | Medium |
| Client claims / scopes | How client asks for scopes and receives claims. | [[OIDC/Client Claims]], [[OIDC/Scopes]] | Medium-High |
| OIDC events | Hook points during challenge, token validation, user info, sign-in. | [[OIDC/Events]] | Medium |
| `ReadAsStreamAsync` buffering | Reading response as stream may still buffer depending on completion option/handler. | [[HttpClient/ReadAsStreamAsync Buffering]] | Medium-High |
| WebSockets properties | State/subprotocol/close info/options exposed by WebSocket. | [[WebSockets/Properties]] | Medium |
| Processing data as stream | Incremental processing instead of loading whole payload. | [[Streams/Processing Data As Stream]] | High |

## Day 19 — Deep repeat questions

### OIDC resources / scopes / claims
- What is an identity resource?
- How does scope request become claim availability?
- What is the difference between identity scope and API scope?
- How does client request scopes?
- When are claims put into id token vs userinfo vs access token?
- Why should custom identity resources be explicit?

### OIDC events
- Why use OIDC events?
- Which event can inspect/modify token validation?
- Which event can handle remote failure?
- Which event can add claims?
- Why can putting business logic in OIDC events become messy?

### ReadAsStreamAsync / streaming
- Does `ReadAsStreamAsync` always mean zero buffering?
- What does `ResponseHeadersRead` change?
- What happens with default completion option?
- Why should response stream be disposed?
- When is streaming response processing useful?
- What bugs appear if stream is read twice?

### WebSockets / stream processing
- What WebSocket properties matter during connection?
- What state should be checked before sending?
- What is accepted subprotocol?
- Why should large incoming messages be processed incrementally?
- How does stream-like processing reduce memory usage?

---

# Day 20 — Deep fragment processing

Status: sparse day; deeper pass from topic label only.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Custom authorization policy | Policy/requirement/handler/assertion model. | [[ASP/Custom Authorization Policy]] | High |

## Day 20 — Deep repeat questions

- What is an authorization policy?
- What is a requirement?
- What is an authorization handler?
- What is `RequireAssertion`?
- When is `RequireClaim` enough?
- When do we need a custom requirement + handler?
- What context does authorization handler receive?
- How can multiple requirements combine?
- What is the difference between authentication and authorization?
- When should authorization return forbidden vs unauthorized?

---

# Day 21 — Deep fragment processing

Status: deeper pass from Day 21 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Endpoint `MethodInfo` metadata | Accessing method/action info from endpoint metadata. | [[ASP/Endpoint MethodInfo Metadata]] | Medium-High |
| RandomNumberGenerator | Cryptographic randomness vs `Random`. | [[Security/RandomNumberGenerator]] | High |
| Options configuration with DI limits | Configuring options when values need services. | [[ASP/Options Configuration With DI Limits]] | Medium-High |
| Polly nesting | Nested/composed resilience strategies. | [[ASP/Polly Nesting]] | Medium |
| ClientWebSocket | .NET client-side WebSocket API. | [[WebSockets/ClientWebSocket]] | Medium |
| Complex types | Likely EF/model binding/value object complex types. | [[CSharp/Complex Types]] | Medium-Low |
| Field vs object validation | Field-level validation vs whole-object/cross-field validation. | [[ASP/Field vs Object Validation]] | High |

## Day 21 — Deep repeat questions

### Endpoint MethodInfo metadata
- Where can endpoint metadata be accessed?
- What metadata can expose `MethodInfo`?
- Why might middleware need action/method metadata?
- Why is endpoint metadata different from MVC filter context?
- What happens for minimal APIs vs controller actions?

### RandomNumberGenerator
- Why not use `Random` for tokens/secrets?
- What does `RandomNumberGenerator` provide?
- When should cryptographic randomness be used?
- Why can predictable random values break security?
- How should random bytes be encoded for URLs?

### Options with DI limits
- Why can simple `Configure<TOptions>` be insufficient when config needs services?
- How can `IConfigureOptions<T>` use DI?
- What is `IPostConfigureOptions<T>` for?
- Why should options setup avoid scoped service misuse?
- When are named options useful?

### Polly nesting
- What does nested strategy mean?
- Why does order of retry/timeout/circuit breaker matter?
- What exception/result does outer strategy see?
- When should strategies be separate pipelines?
- How can nesting make behavior hard to reason about?

### ClientWebSocket
- What does `ClientWebSocket` do?
- Which options can be configured before connect?
- How do you send and receive messages?
- Why must WebSocket state be checked?
- What operations can run concurrently safely?

### Field vs object validation
- What is field-level validation?
- What is object-level validation?
- Which validation handles cross-field rules?
- How should errors map to fields if rule involves multiple properties?
- Why can object-level validation be worse for UI unless error mapping is clear?

### Complex types
- Is this fragment about EF complex/owned types, C# complex types, or model binding complex objects?
- What is the source-check needed here?
- How do nested/complex objects affect validation and binding?
- How do complex value objects affect EF mapping?

---

# Day 23 — Deep fragment processing

Status: deeper pass from Day 23 topic labels / source-derived fragments.

| Fragment | What it contains | Topic note / section | Confidence |
|---|---|---|---|
| Route params for IDs | API design: resource identifiers usually belong in route path. | [[API Design/Route Params For IDs]] | Medium-High |
| REST bulk methods | Batch operations and REST design tradeoffs. | [[REST/Bulk Methods]] | Medium |
| IQueryable translation | Deferring query construction until provider translates to SQL. | [[EF Core/IQueryable Translation]] | High |
| Protector services | Encapsulating DataProtection behind purpose-specific service. | [[Security/Protector Services]] | High |
| WebSockets one send one receive | WebSocket concurrency rule: usually one send and one receive in parallel. | [[WebSockets/One Send One Receive]] | High |
| Channels | Producer/consumer async queue pattern. | [[Channels]] | Medium-High |
| Async enumerable | Async streaming sequence. | [[CSharp/Async Enumerable]] | High |
| HashCode / equality / records | Equality contract and generated record equality/hash behavior. | [[CSharp/HashCode Equality Records]] | High |
| SemaphoreSlim vs Channel | Concurrency limiting vs work queue/message passing. | [[CSharp/SemaphoreSlim vs Channel]] | High |
| `ref in out` | Parameter passing and mutation/copy semantics. | [[CSharp/ref in out]] | High |
| lock / Monitor | Mutual exclusion primitives. | [[CSharp/lock Monitor]] | High |
| EF state with non-default ID | EF decides entity state / key set based on generated or assigned keys. | [[EF Core/Entity State With Non Default ID]] | Medium-High |

## Day 23 — Deep repeat questions

### API design / REST
- Should resource ID usually be in route, query, or body?
- Why are route params natural for resource identity?
- When can ID in body be acceptable?
- Why can duplicate ID in route and body create conflict?
- What is a bulk operation?
- Why are bulk REST operations harder to model cleanly?
- What should bulk response report: all-or-nothing, per-item status, or accepted job?

### IQueryable translation
- What is `IQueryable`?
- Why does EF use expression trees?
- What happens when query is enumerated?
- How can extension methods preserve translation?
- Why does calling `ToList()` too early stop translation composition?
- Why can returning `IQueryable` across boundaries be risky?

### Protector services
- Why wrap DataProtection in a purpose-specific service?
- Why not call `IDataProtector` everywhere directly?
- What does a protector service own: purpose, expiration, payload format, validation?
- How does this improve security and testability?
- What should happen when unprotect fails?

### WebSockets / Channels / async enumerable
- Why can WebSocket usually have one send and one receive concurrently?
- Why are multiple concurrent sends dangerous?
- How can `Channel<T>` serialize outgoing messages?
- What is a producer/consumer queue?
- How can async enumerable model incoming stream of messages?
- When should cancellation be propagated?

### SemaphoreSlim vs Channel
- What does `SemaphoreSlim` control?
- What does `Channel<T>` model?
- When is semaphore enough?
- When is channel better?
- Why is a channel useful for background processing?
- How do bounded channels provide backpressure?

### C# ref/in/out / lock / records equality
- What does `ref` mean?
- What does `in` mean?
- What does `out` mean?
- Why can `in` avoid copying large structs?
- Why can mutable structs be dangerous with `ref`?
- What does `lock` compile to conceptually?
- How is `Monitor` related to `lock`?
- What equality do records generate?
- Why must `Equals` and `GetHashCode` stay consistent?

### EF state with non-default ID
- How does EF decide whether entity is new or existing?
- What does non-default key value imply for generated keys?
- What happens with assigned keys?
- Why can attaching entity with non-default ID mark it as existing?
- How can wrong state cause update instead of insert, or insert instead of update?
- What should be explicitly set when attaching disconnected entities?
