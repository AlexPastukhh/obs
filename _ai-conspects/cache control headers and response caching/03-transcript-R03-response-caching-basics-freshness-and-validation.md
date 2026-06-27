# Regional transcript — R03: Response-caching basics, freshness and validation

Conspect: `cache control headers and response caching`  
Generated: 2026-06-27 12:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Source heading

`basics,responsecaching,setting cache control headers`

## Semantic transcript

HTTP caching can eliminate requests while a response is fresh and can eliminate response bodies through conditional validation after it becomes stale.

## Cache locations

- A private cache belongs to one browser, mobile app or client HTTP stack.
- A shared cache is a CDN, gateway, reverse proxy or other intermediary serving multiple users.
- The response controls who may store it with directives such as `public`, `private` and `no-store`.

## Freshness model

- `Cache-Control: public, max-age=120` permits a fresh cached response to be reused for 120 seconds without contacting the origin.
- Freshness reduces latency, origin CPU/database work and network traffic.
- Freshness can serve temporarily stale business data, so the duration must match the domain tolerance.
- Without explicit freshness information, clients may recontact the API every time or apply heuristic behavior that APIs should not rely on.

## Validation model

- The server emits `ETag` or `Last-Modified`.
- The client later sends `If-None-Match` or `If-Modified-Since`.
- An unchanged resource returns `304 Not Modified` with no representation body.
- A changed resource returns a normal `200` response and the cache updates its stored representation.
- ETags are usually more reliable for application resources than timestamp-only validation.

## Combining models

- While `max-age` is unexpired, the cache reuses the response without a request.
- After expiry, validators allow a cheap conditional request.
- The combination gives fewer requests during the freshness window and smaller responses after the window.
- ASP.NET Core controllers do not automatically create application ETags merely because `[ResponseCache]` is present.

## Caveats

- Caching is correct only when invalidation/freshness rules match the underlying data.
- A 304 saves bandwidth but still reaches the origin unless validation is handled by an intermediary.

## Covered text element

`T-002`

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-014
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
