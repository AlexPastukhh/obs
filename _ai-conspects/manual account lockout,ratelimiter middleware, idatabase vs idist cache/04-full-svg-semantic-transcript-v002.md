# Full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

## Source policy

The complete corrected SVG and its embedded screenshots are the primary source. Candidate regions, canvas proximity, and nearest SVG labels were used only as navigation hints. Final boundaries and transcript content were determined by visual and semantic review of every screenshot.

The three screenshots and prior transcript from the incomplete source are preserved. The new transcript supersedes the old transcript as the current source because it incorporates all restored material.

## R01 — Retry-After, HTTP status codes, and RateLimitLease metadata

`Retry-After` is a response hint that tells a well-behaved client how long to wait; it does not enforce throttling on the server. For request throttling, `429 Too Many Requests` is the normal status. A lock response can use another status such as 423, but 429 is usually clearer for temporary retry behavior. ASP.NET Core exposes the limiter decision as a `RateLimitLease`: `IsAcquired` is always meaningful, while fields such as `RetryAfter`, remaining permits, configured limit, reset time, or a reason are optional metadata supplied by the limiter implementation. Use `TryGetMetadata` and provide a deliberate fallback rather than assuming every limiter can calculate a retry delay. `OnRejected` can copy the metadata to the header and customize the body, but the callback does not create enforcement by itself.

**Reviewed image uses:** RS-002, RS-028, RS-034, RS-035, RS-037, RS-045, RS-052, RS-055, RS-060, RS-062, RS-067, RS-068, RS-072, RS-075, RS-080

**Assigned SVG text nodes:** FT-001, FT-004, FT-005, FT-020, FT-025, FT-032

### Image-level evidence

- **RS-002:** Explains Retry-After as an advisory client wait hint rather than enforcement by itself.
- **RS-028:** Program.cs setup with OnRejected and Retry-After forwarding.
- **RS-034:** RateLimitLease acquired/rejected decision model.
- **RS-035:** OnRejected code reading optional RetryAfter metadata.
- **RS-037:** Lease metadata retrieval with TryGetMetadata.
- **RS-045:** Lease ownership and optional metadata supplied by limiter implementations.
- **RS-052:** Limiter-specific lease metadata differences.
- **RS-055:** 429 Retry-After convention and possible 423 lock semantics.
- **RS-060:** Concurrency limiter may not provide meaningful Retry-After metadata.
- **RS-062:** Fallback Retry-After behavior when metadata is absent.
- **RS-067:** Lease always reports acquired/rejected; extra metadata remains optional.
- **RS-068:** Custom metadata generally requires a custom limiter or response-side fallback logic.
- **RS-072:** Possible lease metadata fields and their optional nature.
- **RS-075:** What ASP.NET Core exposes through RateLimitLease metadata.
- **RS-080:** Practical lease-metadata discovery.

## R02 — Limiter algorithms and policy composition

A fixed-window limiter permits a fixed count during a time bucket and is cheap and predictable, but requests can burst across the window boundary. A token bucket refills permits continuously and therefore supports controlled bursts while preserving a long-term rate. A concurrency limiter counts in-flight operations, not requests per minute; it protects slow or expensive endpoints but does not prevent a client from submitting a large queued volume. Use different policies for different endpoints, combine a global limiter with endpoint-specific policies, or chain limiters when every component must grant a lease.

**Reviewed image uses:** RS-007, RS-009, RS-014, RS-018, RS-021, RS-046, RS-053, RS-056, RS-070, RS-071, RS-074, RS-078, RS-081

**Assigned SVG text nodes:** FT-008, FT-029, FT-030

### Image-level evidence

- **RS-007:** Fixed-window behavior, benefits, and boundary-burst drawback.
- **RS-009:** Token-bucket burst semantics.
- **RS-014:** Token-bucket mechanics, pros, and tradeoffs.
- **RS-018:** Why token bucket fits controlled real-world bursts.
- **RS-021:** ConcurrencyLimiter semantics for in-flight work.
- **RS-046:** Token-bucket configuration example.
- **RS-053:** ConcurrencyLimiter configuration example.
- **RS-056:** Fixed-window configuration example.
- **RS-070:** Global limiter plus endpoint-specific policies.
- **RS-071:** Global partitioned limiter code.
- **RS-074:** Chaining multiple limiters so all must succeed.
- **RS-078:** Code that composes fixed-window and concurrency limiters.
- **RS-081:** Different endpoints using different limiter policies.

## R03 — ASP.NET Core RateLimiter middleware, registration, and endpoint application

Register policies with `AddRateLimiter`, put `UseRateLimiter` after routing and before mapped endpoints, and apply named policies through endpoint conventions or attributes. `EnableRateLimiting` can target an action or controller, `DisableRateLimiting` can exempt an action, and route groups/controllers can receive policies during mapping. A configured `OnRejected` handler only formats rejections; no request is limited until a global limiter or an applied policy exists. The partition callback should stay fast and synchronous: avoid reading and buffering a JSON body merely to construct an account key on every request.

**Reviewed image uses:** RS-006, RS-008, RS-017, RS-024, RS-041, RS-049, RS-083, RS-084, RS-086, RS-089, RS-091

**Assigned SVG text nodes:** FT-009, FT-031

### Image-level evidence

- **RS-006:** ASP.NET Core rate-limiting rejection path and Retry-After handling.
- **RS-008:** Fixed-window policy code and rejection callback.
- **RS-017:** UseRateLimiter and endpoint RequireRateLimiting usage.
- **RS-024:** Correct middleware placement relative to routing and endpoints.
- **RS-041:** OnRejected customizes rejection but does not create or apply a limiter.
- **RS-049:** No limiter or policy means OnRejected is never invoked.
- **RS-083:** Overview of controller, action, and route-group policy application.
- **RS-084:** EnableRateLimiting on a single controller action.
- **RS-086:** EnableRateLimiting at controller scope.
- **RS-089:** DisableRateLimiting for a specific action.
- **RS-091:** Applying policies to mapped controllers or route groups.

## R04 — Manual account lockout and ASP.NET Core Identity lockout

Account lockout and request rate limiting solve different problems. Account lockout is per user/account and stops password guessing against one identity; a request limiter is usually per IP, partition, or endpoint and protects overall capacity. ASP.NET Core Identity already tracks failed attempts and lockout end state. Configure allowed users, maximum failures, and lockout duration, then call `CheckPasswordSignInAsync` with `lockoutOnFailure: true`; clear state on success. A manual design needs failed-count/window fields, lockout end, success reset, and concurrency protection because simultaneous login attempts can otherwise overwrite each other. A separate attempts table adds audit and richer signals but also adds write amplification; a hybrid often keeps the active counter on the user row or in Redis and records audit events asynchronously.

**Reviewed image uses:** RS-001, RS-003, RS-004, RS-005, RS-013, RS-016, RS-020, RS-026, RS-032, RS-038, RS-039, RS-040, RS-043, RS-048, RS-054

**Assigned SVG text nodes:** FT-002, FT-007

### Image-level evidence

- **RS-001:** Separates per-account lockout from aggregate request rate limiting.
- **RS-003:** Manual account-lockout algorithm with failed-count, timestamps, lockout end, and success reset.
- **RS-004:** Recommended combination: Identity lockout for failed-only account protection plus middleware for total request volume.
- **RS-005:** Identity built-in lockout fields and APIs.
- **RS-013:** Identity CheckPasswordSignInAsync with lockoutOnFailure and related APIs.
- **RS-016:** Identity lockout configuration options.
- **RS-020:** Manual login flow: lookup, lock check, credential validation, and generic errors.
- **RS-026:** Manual persisted sliding-window failure logic.
- **RS-032:** Manual account flow: threshold lockout, SaveChanges, success reset.
- **RS-038:** Identity login endpoint that increments lockout state only on credential failure.
- **RS-039:** Concurrency protection for simultaneous failed-login updates.
- **RS-040:** Why rotating IPs require account-keyed protection or Identity lockout.
- **RS-043:** Separate failed-attempt table for audit, analytics, and richer security signals.
- **RS-048:** Attempts-table write amplification and hybrid storage tradeoff.
- **RS-054:** Why a TTL block key usually need not be deleted on success.

## R05 — Redis failed-attempt counters, key design, and custom middleware

A Redis failed-attempt service can use an atomic increment for a keyed counter, set expiry only on the first increment, and create a separate block key with its own TTL once the threshold is reached. Choose keys deliberately: email-only stops rotating-IP attacks but enables account-lockout griefing; IP-only protects infrastructure but can miss distributed attacks against one account; a combined IP-plus-account key balances both but should normally be paired with account-level Identity lockout. Failed-only counting is easiest in the action or authentication service because the deserialized account identifier and credential result are already available. A custom middleware can pre-check an existing block, but it cannot know that authentication failed until after the endpoint runs; reading request bodies in hot middleware requires buffering and adds complexity.

**Reviewed image uses:** RS-010, RS-011, RS-012, RS-015, RS-019, RS-022, RS-023, RS-025, RS-027, RS-029, RS-030, RS-031, RS-033, RS-036, RS-042, RS-047

**Assigned SVG text nodes:** FT-012, FT-013, FT-014, FT-015, FT-016, FT-017, FT-018, FT-019, FT-027, FT-028

### Image-level evidence

- **RS-010:** Manual cached-attempt approach: strengths, fallback concerns, and key-design cautions.
- **RS-011:** Redis failed-attempt implementation overview.
- **RS-012:** Windowed counter and user-table field model.
- **RS-015:** Redis connection and failed-login service registration.
- **RS-019:** Performance comparison between in-process RateLimiter and Redis failed counters.
- **RS-022:** FailedLoginLimiter service using IDatabase.
- **RS-023:** Combined IP and account key construction.
- **RS-025:** Why middleware can only partly implement failed-only lockout without post-endpoint knowledge.
- **RS-027:** Redis block-check and failure-registration methods.
- **RS-029:** Route-specific failed-login middleware.
- **RS-030:** Reason for combining IP and email: balance account brute force and lockout griefing.
- **RS-031:** Atomic Redis increment, first-hit TTL, block key, and cleanup.
- **RS-033:** Security tradeoffs of email-only, IP-only, and combined keys.
- **RS-036:** Custom middleware pre-check plus post-failure registration.
- **RS-042:** Middleware registration and the cost of reading request bodies for account keys.
- **RS-047:** Failed-login registration and clearing state on successful authentication.

## R06 — IConnectionMultiplexer, IDatabase, and IDistributedCache

`IConnectionMultiplexer` is the shared, long-lived, thread-safe Redis networking client and should normally be registered once. `IDatabase` is a lightweight logical command handle obtained from the multiplexer; it does not open a separate network connection and supports Redis-specific operations such as atomic increments, TTL inspection, transactions, and scripts. `IDistributedCache` is a portable byte/value cache abstraction with get/set/remove/refresh and expiration options. It is suitable for general distributed caching, but it intentionally omits Redis-specific atomic primitives and TTL-remaining operations. Use the multiplexer plus `IDatabase` for failed-login counters and other atomic Redis workflows; use `IDistributedCache` for ordinary cached values.

**Reviewed image uses:** RS-044, RS-050, RS-051, RS-057, RS-058, RS-059, RS-061, RS-063, RS-064, RS-065, RS-069, RS-073, RS-076

**Assigned SVG text nodes:** FT-023, FT-024, FT-026

### Image-level evidence

- **RS-044:** Two Redis access styles: StackExchange.Redis directly or IDistributedCache abstraction.
- **RS-050:** IConnectionMultiplexer as the shared long-lived Redis connection manager.
- **RS-051:** IDistributedCache capabilities and Redis-backed configuration.
- **RS-057:** Singleton multiplexer registration.
- **RS-058:** Connection multiplexing: many logical operations over a small connection pool.
- **RS-059:** IDistributedCache value-storage example.
- **RS-061:** IDatabase as a lightweight logical Redis command surface.
- **RS-063:** Comparison of multiplexer/IDatabase with HttpClientFactory/HttpClient.
- **RS-064:** IDatabase command examples and logical database selection.
- **RS-065:** End-to-end multiplexer and IDatabase request flow.
- **RS-069:** IDistributedCache strengths and why it is a poor fit for atomic rate counters.
- **RS-073:** Decision guide for StackExchange.Redis versus IDistributedCache.
- **RS-076:** Shared Redis mental model: multiplexer, IDatabase, and IDistributedCache.

## R07 — Atomic counters, TTL, and race conditions

A naive `IDistributedCache` counter performs get, parse, add one, and set. Two concurrent requests can read the same value and both write the same next value, producing a lost update. Redis `INCR` through `IDatabase` is atomic. Set the expiry only when the increment returns one, and inspect a block-key TTL to produce a retry delay. If several commands must be atomic as a unit, use an appropriate Redis transaction or Lua script. This distinction is why rate/attempt counters should not be built on the portable cache API without an additional locking design.

**Reviewed image uses:** RS-077, RS-079, RS-082, RS-085, RS-087

**Assigned SVG text nodes:** FT-021, FT-022, FT-033, FT-034, FT-035, FT-036, FT-037, FT-038, FT-039, FT-040, FT-041

### Image-level evidence

- **RS-077:** Atomic counter and transaction flow with IDatabase.
- **RS-079:** Atomic INCR, first-hit EXPIRE, and TTL-based block checks.
- **RS-082:** IDatabase counter code and options for atomic multi-step operations.
- **RS-085:** Lost-update race in naive IDistributedCache get/modify/set counters.
- **RS-087:** Why portable atomic counters require IDatabase rather than IDistributedCache.

## R08 — Limiter state, multiple instances, and Redis layering

The built-in ASP.NET Core limiter stores counters and token state in ordinary in-process limiter objects. Each server instance therefore enforces its own local view; a limit of 20 on four instances can act like a larger aggregate limit depending on traffic distribution. Trying to call Redis from the synchronous partition factory is unsafe and undermines the limiter's fast path. A practical layered design uses the local RateLimiter for cheap request-volume protection, Redis atomic counters for shared failed-attempt state, and Identity lockout for durable per-account protection. Not every request decision should make a Redis network hop; shared state is reserved for the protections that actually require cross-instance coordination.

**Reviewed image uses:** RS-066, RS-093, RS-094, RS-095, RS-096, RS-097, RS-098

**Assigned SVG text nodes:** FT-003, FT-006, FT-010, FT-011, FT-047, FT-048, FT-049

### Image-level evidence

- **RS-066:** Layered architecture: local RateLimiter, shared Redis failed counters, and Identity lockout.
- **RS-093:** Built-in limiter state is stored in local in-memory limiter instances.
- **RS-094:** Why synchronous partition factories are a poor place for asynchronous Redis calls.
- **RS-095:** Limiter counters/tokens are ordinary in-process object fields, not implicit global static state.
- **RS-096:** Multi-instance local limits versus shared Redis-backed global state.
- **RS-097:** Recommended split: RateLimiter for request throttling and Redis for stateful account lockout.
- **RS-098:** Why not every request decision should depend on Redis; layered protection architecture.

## R09 — Cache stampede protection and distributed locking

A cache stampede occurs when an expired or missing value causes many requests to execute the expensive factory simultaneously. Single-process protection uses a per-key single-flight task or lock so one leader computes and the other callers wait. Across multiple instances, coordination requires a shared mechanism such as a Redis lock; stronger distributed-lock guarantees and Redlock/Lua details are separate design concerns. The key invariant is that only a controlled number of factories run and all waiters observe the resulting value.

**Reviewed image uses:** RS-088, RS-090

**Assigned SVG text nodes:** FT-042, FT-043, FT-044, FT-045, FT-046

### Image-level evidence

- **RS-088:** Cache stampede definition and single-flight objective.
- **RS-090:** Per-process versus distributed stampede protection and leader/waiter behavior.

## X01 — Explicit non-semantic browser/UI fragment

One embedded image is only a cropped browser/tab-title fragment (`ASP.NET Core Google reCA...`). It contains no independent technical claim. It was visually reviewed, assigned once to this explicit boundary record, and excluded from the semantic transcript rather than being silently ignored.

**Reviewed image uses:** RS-092

**Assigned SVG text nodes:** none

### Image-level evidence

- **RS-092:** Reviewed browser/tab title fragment; no domain content beyond surrounding source context.


## Closure

```text
embedded assets: 98
total image uses: 98
processed image uses: 98
previously processed image uses preserved: 3
restored image uses: 95
duplicate placements: 0
SVG text nodes: 49
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
