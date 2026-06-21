# manual account lockout,ratelimiter middleware, idatabase vs idist cache — final coverage transcript v001

Source SVG: `manual account lockout,ratelimiter middleware, idatabase vs idist cache.svg`  
Conspect folder: `manual account lockout,ratelimiter middleware, idatabase vs idist cache`  
Stage: combined ten-conspect final coverage

## R01 — lockout, rate limiting, Retry-After and Redis counters

Account lockout and request rate limiting solve related but different problems:

```text
Account lockout — limits failed authentication attempts for an account.
Rate limiting   — limits request volume for a partition such as IP, user, API key or endpoint.
```

A robust authentication flow can use both. Lockout protects password guessing against an account; rate limiting protects the service and reduces abuse even when the attacker changes account names.

### ASP.NET Core Identity lockout

Identity already stores and manages fields such as:

```text
AccessFailedCount
LockoutEnd
LockoutEnabled
```

Relevant APIs include `AccessFailedAsync`, `ResetAccessFailedCountAsync`, `IsLockedOutAsync`, and `SetLockoutEndDateAsync`. The sign-in manager can increment and enforce lockout automatically:

```csharp
var result = await signInManager.CheckPasswordSignInAsync(
    user,
    password,
    lockoutOnFailure: true);
```

Configuration example:

```csharp
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
});
```

On successful authentication, the failed count should be reset by the normal Identity flow.

### `Retry-After`

`Retry-After` tells the client when retrying may make sense. It is a response hint, not enforcement. The server must still reject requests until the limiter/lockout state allows them.

A rate-limiter rejection handler can read metadata from the rejected lease when the selected limiter exposes it, and then emit seconds or a date:

```text
429 Too Many Requests
Retry-After: 30
```

Not every limiter or rejection includes a retry value, so code must treat the metadata as optional.

### Partition strategy

Common partitions:

```text
- per IP;
- per authenticated user/account;
- per login identifier;
- per API key or tenant;
- a global limiter for overall capacity.
```

A single key is rarely sufficient for login protection. Per-email-only throttling lets an attacker intentionally lock another person’s account. Per-IP-only throttling is weakened by rotating IPs. A layered strategy often combines per-IP, per-account/login identifier and a global limit.

### Middleware versus endpoint/action logic

A generic middleware that needs an email from a JSON body must read and rewind the request stream, which adds buffering and complexity on a hot path. Endpoint/action code already has a deserialized model and can form an account key safely after model binding.

Use the rate-limiter middleware for information already available before body parsing, such as endpoint metadata, remote IP, authenticated user or API key. Use an application service/filter/action for a body-derived key when necessary.

### In-memory and multi-instance behavior

The built-in limiter state is normally local to the process unless a custom distributed design is supplied. With several application instances, each instance can enforce its own quota, making the effective cluster quota larger.

For cluster-wide enforcement use one of:

```text
- a reverse proxy, gateway or WAF limiter;
- a custom distributed limiter;
- Redis-backed counters/leases designed for atomic updates.
```

### `IDistributedCache` versus Redis `IDatabase`

`IDistributedCache` provides portable get/set/remove operations, but not a standard atomic increment. Implementing a counter as get → increment → set has a race:

```text
request A reads 5
request B reads 5
A writes 6
B writes 6
expected result was 7
```

StackExchange.Redis `IDatabase.StringIncrementAsync` performs an atomic increment. Expiry should be set only when the key is first created, and the increment-plus-expiry operation may need a Lua script/transaction if the whole sequence must be atomic.

Conceptual pattern:

```csharp
var count = await db.StringIncrementAsync(key);
if (count == 1)
    await db.KeyExpireAsync(key, window);
```

A Lua script can combine the operations and prevent a key from being left without TTL if the process fails between commands.

### Stampede and distributed locks

For cached expensive work, many concurrent misses can cause a cache stampede. A single process can use an in-process keyed lock. Multiple instances require a distributed coordination mechanism or a design that tolerates duplicate work.

Redis locks and Redlock-style approaches have trade-offs and failure assumptions. They should not be used casually as a replacement for database constraints or idempotency. Atomic Redis commands/Lua are preferable when the problem is only updating one counter.

### Secure combined pattern

```text
1. Apply a cheap global/per-IP limiter before expensive work.
2. Use Identity lockout for failed password attempts.
3. Add an account/login-identifier counter only when its denial-of-service risk is understood.
4. Do not parse request bodies in generic middleware merely to obtain the key.
5. Emit Retry-After as optional client guidance.
6. Use atomic distributed counters when several app instances must share state.
7. Keep server enforcement authoritative; UI countdowns are only presentation.
```

## Coverage

```text
R01 processed image uses: 3
R01 processed text labels: 48
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
