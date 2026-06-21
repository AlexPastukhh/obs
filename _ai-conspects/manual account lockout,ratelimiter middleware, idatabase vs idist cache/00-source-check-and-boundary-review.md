# Stage0 - manual account lockout,ratelimiter middleware, idatabase vs idist cache source check and boundary review v001

Source SVG: `manual account lockout,ratelimiter middleware, idatabase vs idist cache.svg`  
Conspect folder: `_ai-conspects/manual account lockout,ratelimiter middleware, idatabase vs idist cache`

## Counts

```text
unique embedded images: 3
image uses on canvas: 3
text labels parsed: 48
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `how retry after works for rate limiting` at x=10.0, y=67.2
- T-002: `manual account lockout + retry after manually` at x=1366.5, y=71.4
- T-003: `rate limiting + lockout patterns` at x=7858.3, y=139.7
- T-004: `its just for client to show ui and not allow normal users to do requests` at x=391.6, y=153.9
- T-005: `you should rate limit on server to avoid problems` at x=391.6, y=178.9
- T-006: `and examples` at x=7858.3, y=266.7
- T-007: `lockout with identity` at x=10377.9, y=288.0
- T-008: `limiter types` at x=3999.5, y=315.4
- T-009: `rate limiter middleware` at x=4979.3, y=317.7
- T-010: `pattern 2, add ratelimiter for all requests and cache based service to` at x=7709.0, y=721.2
- T-011: `score failed attempts` at x=7709.0, y=772.2
- T-012: `using custom middleware (bad)` at x=6684.1, y=1528.6
- T-013: `it seems great for ip only throttles but to create ip + email` at x=6688.9, y=1577.3
- T-014: `we need to read the request which is stream and it can cause issues` at x=6688.9, y=1602.3
- T-015: `we will need some manual buffering and at hot paths better to avoid it` at x=6688.9, y=1627.3
- T-016: `with action service we can grab email from the deserialized payload easily` at x=6688.9, y=1652.3
- T-017: `combined key for rate limiting` at x=5231.1, y=1995.6
- T-018: `attacker changes ips` at x=5231.1, y=2049.5
- T-019: `locking other people's accounts` at x=5231.1, y=2103.4
- T-020: `context.lease` at x=2905.6, y=2360.3
- … 28 more labels are indexed in `data/svg-labels-stage0.json` and CSV.

## Candidate regions

### R01 - account-lockout-rate-limiter-retry-after-cache-and-redis

full small-conspect pass: manual account lockout, Retry-After, ASP.NET Core rate limiting, combined keys, distributed counters, Redis atomicity and multi-instance behavior

```text
image uses: 3
sources: S-001, S-002, S-003
text labels: 48
```

## Next

Process this full small conspect in the next combined ten-conspect final-coverage archive after stage0 is reviewed and committed.
