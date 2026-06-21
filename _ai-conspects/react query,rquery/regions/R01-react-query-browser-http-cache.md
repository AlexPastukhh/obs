# R01 - React Query + browser/HTTP cache

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4e / verified region transcript v002 - expanded boundary**  
Generated: 2026-06-01 21:36:06 UTC

This file supersedes R01 v001. R01 v001 covered only the top fragment; v002 expands R01 to the full two-column browser/cache road.

---

## Direction check

Goal:
Convert `react-query,rquery` into source-preserving region text without losing images.

Now:
Old Stage2 was deprecated; R01 v001 was identified as partial.

This step:
Create R01 v002 with full boundary review, 20 included sources, and one explicitly excluded distant safety candidate.

Why:
The region is a long two-column browser/cache road, not a 3-image block.

Next:
1. review R01 v002 diff; 2. commit; 3. audit R05/R06/R07/R10 under the same boundary-review rules.

---

## 0. You are here

Current region: `R01 - React Query + browser/HTTP cache`  
Status: `verified transcript from extracted SVG images`  
Source count: `20 included + 1 checked/excluded candidate`  
Known limitations: minor visual crops/overlays only; no known content loss.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
This region explains how browser HTTP cache and React Query cache should work together:
- browser cache handles transport/network efficiency;
- React Query handles UI/data lifecycle and freshness decisions;
- ETag/If-None-Match can make repeated GETs cheap;
- If-Match for write concurrency is app logic and must be sent manually;
- React Query does not derive staleTime from browser cache headers;
- backend Cache-Control patterns should match API data type;
- React Query staleTime should match UI/data behavior;
- avoid accidentally disabling browser cache with fetch cache: no-store.
```

Key ideas:

- Browser cache and React Query cache are different layers.
- Browser cache optimizes transport/network; React Query optimizes UI/data lifecycle.
- ETag can support cache revalidation with If-None-Match, but optimistic write concurrency uses If-Match and must be app-managed.
- React Query can refetch whenever it wants; the browser may still make the request cheap through cache/revalidation.
- For frequently changing API data, ETag + Cache-Control: no-cache is a good revalidation pattern.
- Short max-age can be useful for semi-fresh public/read-heavy endpoints.
- Long immutable cache is for versioned static assets, not normal dynamic JSON APIs.
- React Query staleTime should match data behavior, while browser cache handles network efficiency.
- Plain fetch lets browser caching work normally; forcing cache: no-store disables normal browser response caching benefits.

How well I perceived the area:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high for visible code blocks.
Spatial/layout understanding: high after v002 boundary review; R01 is a two-column vertical road.
```

Reading limitations:

```text
S-009 has a slightly cropped top title area, but visible content is readable.
S-053 and S-064 show bottom UI arrow overlays but no obvious text loss.
Source chips and UI copy buttons are omitted unless content-bearing.
```

Confidence:

```text
High for all included visible text/code.
High for the corrected R01 boundary.
S-008 was checked as a distant same-band safety candidate and excluded from R01.
```

---

## 0.2 Coverage / boundary review

Boundary shape:

```text
R01 is a two-column vertical road under the browser/cache topic.
It is not a small 3-image block.
```

Included source IDs:

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-009, S-010, S-014, S-015, S-019, S-028, S-031, S-038, S-044, S-049, S-053, S-060, S-064
```

Column structure:

```text
Left column:
S-002, S-004, S-007, S-010, S-014

Right column:
S-001, S-003, S-005, S-006, S-009, S-015, S-019, S-028, S-031, S-038, S-044, S-049, S-053, S-060, S-064
```

Checked/excluded candidates:

```text
S-008 -> excluded from R01 / reassign candidate for R02.
Reason: distant right-side statuses/fetchStatus/isLoading/isFetching block; visually separate cluster with different heading/topic. This is not a nearby R01 screenshot.
Candidate type: distant same-band safety check, not nearby.
```

Nearby definition used:

```text
Nearby means local visual proximity in the same cluster/road/column or adjacent parallel column.
Nearby does not mean merely same y-band, close source order, or same rough canvas height.
```

Candidate-review rule:

```text
Candidate review is useful for large conspects, but each candidate must be labeled by type:
same-column continuation, parallel-column continuation, visually-close local neighbor, distant same-band safety check, semantic cross-check.
Only visual/semantic boundary review can close a region.
```

---

## 1. Original Excalidraw labels

```text
react query + browser cache
using react query + http cache with headers from server
you need to do calls with if-match yourself browser does nothing with it you are handlinkg concurrency
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R01-S001 | S-001 | IU-001 | `d6b1d01150` | `right-column-seed` | `verified-from-extracted-svg-image` | no | practical SPA recommendation: ETag + Cache-Control no-cache + React Query staleTime |
| R01-S002 | S-002 | IU-002 | `33ee5bc86f` | `left-column-seed` | `verified-from-extracted-svg-image` | no | browser does not automatically manage ETag for API calls |
| R01-S003 | S-003 | IU-003 | `3ba9d991a7` | `right-column-seed` | `verified-from-extracted-svg-image` | no | React Query does not understand browser cache headers |
| R01-S004 | S-004 | IU-004 | `6368f8adce` | `left-column-continuation` | `verified-from-extracted-svg-image` | no | sending ETag back later with If-None-Match / If-Match |
| R01-S005 | S-005 | IU-005 | `cf6c2e813c` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | main idea: browser cache and React Query cache are different layers |
| R01-S006 | S-006 | IU-006 | `335ef6b606` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | browser cache layer |
| R01-S007 | S-007 | IU-007 | `a9a9655e93` | `left-column-continuation` | `verified-from-extracted-svg-image` | no | HTTP cache and revalidation |
| R01-S008 | S-009 | IU-009 | `a7f13d6d3d` | `right-column-continuation` | `verified-visible-partial-from-extracted-svg-image` | top-title-slightly-cropped | React Query cache layer |
| R01-S009 | S-010 | IU-010 | `b62d140856` | `left-column-continuation` | `verified-from-extracted-svg-image` | no | why many API requests are treated as not using cache |
| R01-S010 | S-014 | IU-014 | `95f917ba2d` | `left-column-continuation` | `verified-from-extracted-svg-image` | no | why HTTP cache revalidation does not solve API concurrency |
| R01-S011 | S-015 | IU-015 | `ad441bf8f8` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | practice and default mental model |
| R01-S012 | S-019 | IU-019 | `ac0d680857` | `right-column-continuation` | `verified-from-extracted-svg-image` | right-edge-slightly-cropped-no-text-loss | backend pattern A: revalidation cache |
| R01-S013 | S-028 | IU-028 | `46476e445e` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | revalidation cache implications |
| R01-S014 | S-031 | IU-031 | `859a4e5afc` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | backend pattern B: short-lived freshness |
| R01-S015 | S-038 | IU-038 | `c764d1651a` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | backend pattern C: long cache for versioned static assets |
| R01-S016 | S-044 | IU-044 | `b00992d67d` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | React Query settings for frequently changing data |
| R01-S017 | S-049 | IU-049 | `3442b4b77e` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | React Query settings for rarely changing data |
| R01-S018 | S-053 | IU-053 | `a1969014c7` | `right-column-continuation` | `verified-visible-partial-from-extracted-svg-image` | bottom-ui-arrow-visible-no-text-loss | server-push / realtime apps and React Query cache settings |
| R01-S019 | S-060 | IU-060 | `74e165828c` | `right-column-continuation` | `verified-from-extracted-svg-image` | no | do not fight browser cache accidentally: plain fetch |
| R01-S020 | S-064 | IU-064 | `662677caa9` | `right-column-continuation` | `verified-visible-partial-from-extracted-svg-image` | bottom-ui-arrow-visible-no-text-loss | be careful with fetch cache no-store |

---

## 3. Source transcript

### R01-S001 / S-001 - `d6b1d01150`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-seed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: practical SPA recommendation: ETag + Cache-Control no-cache + React Query staleTime

#### Verified visible text

```text
7. A very practical recommendation

For most SPA APIs:

Good baseline

Backend:

- send ETag
- send Cache-Control: no-cache

Frontend:

- use normal fetch
- configure React Query staleTime based on UI needs

Why this works well:

- React Query controls UI freshness
- browser avoids full payload downloads when data is unchanged
- you get correctness + efficiency
```

#### Notes

Verified from extracted SVG image.

---

### R01-S002 / S-002 - `33ee5bc86f`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `left-column-seed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: browser does not automatically manage ETag for API calls

#### Verified visible text

```text
Right — browsers don't automatically "manage" your ETag for API calls in the way you might hope.

Whether you must send it manually depends on how you're making the request and which header (If-None-Match vs If-Match) you're talking about.

1) If you're calling your API with fetch / axios

ETag response header

- The browser will receive the ETag header.
- Your JS code must read it and store it (memory/localStorage/state/etc.) if you want to use it later.
```

#### Verified visible code

```js
const res = await fetch("/products/1");
const etag = res.headers.get("ETag"); // you store it yourself
```

#### Notes

Verified from extracted SVG image.

---

### R01-S003 / S-003 - `3ba9d991a7`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-seed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: React Query does not understand browser cache headers

#### Verified visible text

```text
8. What React Query does not know

React Query does not directly understand browser cache headers as freshness rules for your UI.

It does not automatically say:

- "browser says max-age 60, so I will set staleTime 60s"

These are separate systems.

So you still choose staleTime yourself.

That means you can have:

- React Query says data is stale
- browser still returns cached/revalidated response cheaply

That is normal and often desirable.
```

#### Notes

Verified from extracted SVG image.

---

### R01-S004 / S-004 - `6368f8adce`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `left-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: sending ETag back later with If-None-Match / If-Match

#### Verified visible text

```text
Sending it back later

You must manually include it on subsequent requests:

- For caching / "only give me if changed":
  - send If-None-Match: "<etag>"
- For optimistic concurrency / "only update if unchanged":
  - send If-Match: "<etag>"

So for SPA/API usage: yes, manual for both If-None-Match and If-Match.
```

#### Verified visible code

```js
await fetch("/products/1", {
  method: "PATCH",
  headers: { "If-Match": etag, "Content-Type": "application/json" },
  body: JSON.stringify(patch)
});
```

#### Notes

Verified from extracted SVG image.

---

### R01-S005 / S-005 - `cf6c2e813c`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: main idea: browser cache and React Query cache are different layers

#### Verified visible text

```text
For an SPA with React Query, the main idea is:

browser cache and React Query cache are different layers, and you should usually use both deliberately, not let them fight each other.
```

#### Notes

Verified from extracted SVG image.

---

### R01-S006 / S-006 - `335ef6b606`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: browser cache layer

#### Verified visible text

```text
1. The two caches

Browser cache

Controlled by HTTP headers like:

- Cache-Control
- ETag
- Last-Modified

It lives below your app, at the network/browser level.

It can:

- avoid downloading data again
- return cached responses
- revalidate with server
- make reload/navigation faster
```

#### Notes

Verified from extracted SVG image.

---

### R01-S007 / S-007 - `a9a9655e93`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `left-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: HTTP cache and revalidation

#### Verified visible text

```text
HTTP cache is the browser's built-in system for reusing GET/HEAD responses so it doesn't have to hit the network every time. It's driven by cache headers from the server and (sometimes) heuristics.

What the browser HTTP cache does

When you GET /products/1:

1. First request: browser downloads the response and may store it in its cache.
2. Later request for the same URL:
   - If the cached entry is still fresh, browser may serve it directly from cache (no network).
   - If it's stale, browser may revalidate: it asks the server "is my cached copy still valid?" instead of downloading the whole body again.

How revalidation works (ETag / If-None-Match)

If the server previously returned:

- ETag: "abc123"

Then for revalidation the browser can send:

- If-None-Match: "abc123"

Server replies:

- 304 Not Modified (no body) -> browser keeps using cached response
- or 200 OK with new body + new ETag -> browser updates cache

That's what I meant by "browser can automatically do conditional GETs with If-None-Match for cache revalidation."
```

#### Notes

Verified from extracted SVG image.

---

### R01-S008 / S-009 - `a7f13d6d3d`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `top-title-slightly-cropped`
- confidence: `high-for-visible-text`
- theme: React Query cache layer

#### Verified visible text

```text
React Query cache

Controlled by your app with:

- staleTime
- gcTime
- invalidation
- setQueryData
- refetch triggers

It lives in memory in your app.

It can:

- keep data between component mounts
- show stale data instantly
- refetch in background
- coordinate UI state
```

#### Notes

Top is slightly cropped before the title; visible content is transcribed.

---

### R01-S009 / S-010 - `b62d140856`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `left-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: why many API requests are treated as not using cache

#### Verified visible text

```text
Why "many API requests are effectively treated as don't use cache"

Because lots of APIs send headers like:

- Cache-Control: no-store (common for authenticated/user-specific data)
- or Cache-Control: no-cache
- or they vary by Authorization and choose not to cache
- or the request method isn't cacheable (POST/PATCH/PUT typically not cached)

Also, your fetch call can influence caching via the cache option:

- cache: "default" -> normal HTTP caching rules
- cache: "no-store" -> bypass cache, don't store
- cache: "reload" -> bypass cache and re-download
- cache: "no-cache" -> revalidate (like "must check with server")

So depending on server headers + fetch options, the browser may not reuse cached data the way it does for images/css/navigation.
```

#### Notes

Verified from extracted SVG image.

---

### R01-S010 / S-014 - `95f917ba2d`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `left-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: why HTTP cache revalidation does not solve API concurrency

#### Verified visible text

```text
Why this doesn't solve API concurrency (If-Match)

HTTP cache revalidation (If-None-Match) is about:

"Can I reuse my cached GET response?"

Optimistic concurrency (If-Match) is about:

"Only apply this UPDATE if the resource hasn't changed."

Browsers do not automatically send If-Match for writes, because:

- it's application logic (you decide what version you're updating)
- caching is separate from write preconditions

So for an SPA:

- you might get an ETag on GET
- you must store it and send it back yourself on PATCH/PUT as If-Match
```

#### Notes

Verified from extracted SVG image.

---

### R01-S011 / S-015 - `ad441bf8f8`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: practice and default mental model

#### Verified visible text

```text
2. What to do in practice

General rule

Let:

- browser cache optimize transport/network
- React Query optimize UI/data lifecycle

Do not try to replace one with the other.

3. Best default mental model

For API data in an SPA:

- React Query decides when your app wants to ask for data
- browser cache decides whether the network request really needs full download

So if React Query refetches, that does not automatically mean a full expensive network transfer happened.

The browser may answer from cache or revalidate cheaply.
```

#### Notes

Verified from extracted SVG image.

---

### R01-S012 / S-019 - `ac0d680857`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `right-edge-slightly-cropped-no-text-loss`
- confidence: `high`
- theme: backend pattern A: revalidation cache

#### Verified visible text

```text
4. What you usually should do on the backend

For API responses, configure HTTP caching intentionally.

Common good patterns:

Pattern A — revalidation cache

Good for frequently changing API data.

Example idea:
```

#### Verified visible code

```http
Cache-Control: no-cache
ETag: "abc123"
```

#### Notes

Right edge is slightly cropped but no visible text appears lost.

---

### R01-S013 / S-028 - `46476e445e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: revalidation cache implications

#### Verified visible text

```text
This means:

- browser may store the response
- next request revalidates with server
- if unchanged, server returns 304 Not Modified
- browser reuses cached body

This is often a very good fit with React Query.

Why:

- React Query can refetch whenever it wants
- browser makes repeated requests cheaper
```

#### Notes

Verified from extracted SVG image.

---

### R01-S014 / S-031 - `859a4e5afc`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: backend pattern B: short-lived freshness

#### Verified visible text

```text
Pattern B — short-lived freshness

Good for data that can be reused briefly.

Example idea:

This means:

- browser can reuse response for 30s without asking server
- then can serve stale while revalidating

Useful for semi-fresh public/read-heavy endpoints.
```

#### Verified visible code

```http
Cache-Control: max-age=30, stale-while-revalidate=120
```

#### Notes

Verified from extracted SVG image.

---

### R01-S015 / S-038 - `c764d1651a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: backend pattern C: long cache for versioned static assets

#### Verified visible text

```text
Pattern C — very long cache for versioned static assets

For JS/CSS/images, not normal dynamic API data.

Example:

Use for:

- hashed bundle files
- versioned static assets

Not for normal user-specific JSON APIs.
```

#### Verified visible code

```http
Cache-Control: public, max-age=31536000, immutable
```

#### Notes

Verified from extracted SVG image.

---

### R01-S016 / S-044 - `b00992d67d`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: React Query settings for frequently changing data

#### Verified visible text

```text
5. What to do with React Query settings

Now match React Query to the data type.

Frequently changing data

Use low/moderate staleTime.

Even if React Query refetches, browser revalidation can make it cheap.
```

#### Verified visible code

```ts
useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  staleTime: 10_000,
})
```

#### Notes

Verified from extracted SVG image.

---

### R01-S017 / S-049 - `3442b4b77e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: React Query settings for rarely changing data

#### Verified visible text

```text
Rarely changing data

Use longer staleTime.

If data barely changes, let React Query avoid unnecessary refetches.
```

#### Verified visible code

```ts
useQuery({
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: 1000 * 60 * 60,
})
```

#### Notes

Verified from extracted SVG image.

---

### R01-S018 / S-053 - `a1969014c7`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `bottom-ui-arrow-visible-no-text-loss`
- confidence: `high-for-visible-text`
- theme: server-push / realtime apps and React Query cache settings

#### Verified visible text

```text
Server-push / realtime apps

You may use:

and rely on:

- websocket events
- invalidation
- setQueryData

In that case browser cache matters less for freshness, more for reload/network efficiency.
```

#### Verified visible code

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})
```

#### Notes

Bottom UI arrow visible; no obvious text loss.

---

### R01-S019 / S-060 - `74e165828c`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: do not fight browser cache accidentally: plain fetch

#### Verified visible text

```text
6. Important thing: don't fight the browser cache accidentally

A lot depends on your fetch options.

Usually fine

Plain fetch:

This lets browser HTTP caching work normally.
```

#### Verified visible code

```ts
fetch('/api/todos')
```

#### Notes

Verified from extracted SVG image.

---

### R01-S020 / S-064 - `662677caa9`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `right-column-continuation`
- readability: `high`
- cut_off: `bottom-ui-arrow-visible-no-text-loss`
- confidence: `high-for-visible-text`
- theme: be careful with fetch cache no-store

#### Verified visible text

```text
Be careful with

This disables normal browser response caching benefits.

Use no-store only when you truly need it.

For most SPA + React Query API calls, you usually do not want to force no-store unless the data is very sensitive or must never be cached.
```

#### Verified visible code

```ts
fetch('/api/todos', { cache: 'no-store' })
```

#### Notes

Bottom UI arrow visible; no obvious text loss.

---

## 4. Cleaned source notes

- Browser HTTP cache and React Query cache are different layers.
- Browser cache is controlled by headers such as `Cache-Control`, `ETag`, and `Last-Modified`.
- React Query cache is controlled by app-level settings such as `staleTime`, `gcTime`, invalidation, `setQueryData`, and refetch triggers.
- React Query decides when the app wants to ask for data; browser cache decides whether the network request needs a full download.
- ETag/If-None-Match supports GET cache revalidation and can return `304 Not Modified` with no body.
- `If-Match` for PATCH/PUT optimistic concurrency is separate from HTTP cache revalidation and must be handled by app code.
- A good SPA baseline is backend `ETag` + `Cache-Control: no-cache`, frontend normal `fetch`, and React Query `staleTime` chosen by UI needs.
- React Query does not automatically map browser `max-age` or cache headers to `staleTime`.
- For frequently changing API data, low/moderate `staleTime` can combine with browser revalidation to make repeated requests cheap.
- For rarely changing data, longer `staleTime` lets React Query avoid unnecessary refetches.
- For server-push/realtime apps, `staleTime: Infinity` can be combined with websocket events, invalidation, and `setQueryData`.
- Plain `fetch` lets browser HTTP caching work normally; forcing `cache: 'no-store'` disables normal browser response caching benefits.

---

## 5. Minimal interpretation

R01 frames React Query and browser cache as complementary layers. React Query controls UI freshness and data lifecycle, while browser HTTP cache controls transport efficiency. ETags and cache headers can make repeated requests cheaper, but React Query still needs explicit `staleTime` decisions. `If-None-Match` cache revalidation and `If-Match` write concurrency are separate mechanisms. For most SPA API calls, use browser cache deliberately rather than fighting it with unnecessary `no-store`.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Good SPA baseline: backend ETag + Cache-Control: no-cache, frontend normal fetch + React Query staleTime | R01-S001 | extracted SVG image transcript | high |
| Browser does not automatically manage ETag for app-level API logic; JS reads/stores ETag if needed | R01-S002 | extracted SVG image transcript/code | high |
| React Query does not derive UI staleTime from browser cache headers | R01-S003 | extracted SVG image transcript | high |
| If-None-Match is used for cache revalidation; If-Match is used for optimistic write concurrency | R01-S004, R01-S007, R01-S010 | extracted SVG image transcript/code | high |
| Browser cache and React Query cache are different layers | R01-S005, R01-S006, R01-S008, R01-S011 | extracted SVG image transcript | high |
| Browser cache can make repeated React Query refetches cheaper | R01-S001, R01-S011, R01-S013, R01-S016 | extracted SVG image transcript | high |
| Backend caching patterns include revalidation, short-lived freshness, and immutable static assets | R01-S012, R01-S013, R01-S014, R01-S015 | extracted SVG image transcript/code | high |
| React Query staleTime should match data type | R01-S016, R01-S017, R01-S018 | extracted SVG image transcript/code | high |
| Avoid forcing fetch cache: no-store unless needed | R01-S019, R01-S020 | extracted SVG image transcript/code | high |

---

## 7. Question hooks

- What does browser HTTP cache optimize compared to React Query cache?
- Why are browser cache and React Query cache different layers?
- What is a good backend baseline for most SPA APIs in this region?
- Why does React Query still need its own `staleTime` even if the server sends cache headers?
- What is the difference between `If-None-Match` and `If-Match`?
- Why does browser revalidation not solve API write concurrency?
- How can React Query refetch without causing a full expensive network transfer?
- When is `Cache-Control: no-cache` + `ETag` a good API pattern?
- When is `max-age` / `stale-while-revalidate` useful?
- Why is immutable long cache for versioned static assets, not normal dynamic JSON APIs?
- How should React Query settings differ for frequently changing vs rarely changing data?
- Why might realtime apps use `staleTime: Infinity`?
- Why should you be careful with `fetch(..., { cache: 'no-store' })`?
- Why was S-008 excluded from R01 even though it appeared in the safety review?

---

## 8. Open review issues

- R01 v002 is considered complete for the currently reviewed two-column browser/cache road.
- `S-008` must be revisited when processing R02 statuses, but it is explicitly not part of R01.
- If a later audit finds another browser/cache continuation outside this reviewed road, create an R01 v003 correction rather than forcing it into a new region.
