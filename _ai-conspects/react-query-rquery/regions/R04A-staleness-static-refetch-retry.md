# R04A - staleness / static staleTime / refetch triggers / retry

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4u / verified region transcript v001**  
Generated: 2026-06-02 00:13:59 UTC

This file covers the first R04 sub-pass: freshness/staleness, static staleTime, refetch triggers, and retry behavior. R04B remains pending.

---

## Direction check

Goal:
Process the first large R04 sub-block while trying a larger combined archive.

Done:
R03/R04 boundary review identified R04A and R04B. S-062 was brought in from R02 as R04A.

Now:
Create R04A transcript for staleTime, invalidation, static, refetch triggers, retry, retryDelay, and retryOnMount.

Why:
This closes the staleness/refetch/retry road but leaves observer/cache/gcTime/refetchInterval mechanics for R04B.

Next:
Commit this archive; then process R04B.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- freshness versus retention
- staleTime, Infinity, and static staleTime
- manual invalidation and how it interacts with staleTime
- automatic refetch triggers for stale queries
- what can still fetch with staleTime: 'static'
- query and mutation retry options, retryDelay, and retryOnMount
- QueryErrorResetBoundary with retryOnMount false
```

Key ideas:

- staleTime controls how long data is considered fresh; default staleTime is 0.
- Stale data remains in cache and can be shown immediately.
- Invalidation marks matching queries stale and overrides finite/Infinity staleTime.
- staleTime: Infinity prevents time-based staleness but manual invalidation can still mark stale.
- staleTime: 'static' prevents normal automatic stale-driven refetching even after invalidation.
- static does not mean no API can ever fetch; explicit fetch/refetch APIs and refetchInterval can still fetch.
- Stale queries may refetch when key changes, observer mounts, focus returns, or reconnect occurs, unless configured otherwise.
- Queries retry by default on the client; mutations default to no automatic retry.
- retry controls whether/how many attempts; retryDelay controls delay between attempts.
- retryOnMount controls whether an errored query automatically retries when mounted again.

Reading quality:
```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after local R04A check.
Limitations: S-063/S-068 are continuation pair around retry example.; S-103 bottom tiny example is cropped, but visible rule of thumb is readable.; S-104 has UI overlays, but core retryDelay examples are readable.; S-069 moved out to R04B after local review.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-062, S-063, S-067, S-068, S-070, S-071, S-073, S-074, S-075, S-076, S-077, S-079, S-082, S-084, S-087, S-088, S-090, S-091, S-095, S-097, S-098, S-099, S-103, S-104
```

R03 processed in same archive:
```text
S-029, S-035, S-041, S-046, S-055, S-058, S-059
```

Moved to / reserved for R04B:
```text
S-069, S-072, S-078, S-081, S-086, S-089, S-092, S-096, S-100, S-102, S-105, S-107
```

Already processed R05 neighbors:
```text
S-080, S-083, S-085, S-093, S-094, S-101, S-106, S-108, S-111, S-112
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R04A-S001 | S-062 | IU-062 | `976499b4dc` | `r04a-static-stale-word-meaning` | `verified-from-extracted-svg-image` | no | staleTime static: not stale by time but can be invalidated |
| R04A-S002 | S-063 | IU-063 | `603893e98b` | `r04a-query-retry-options` | `verified-visible-partial-from-extracted-svg-image` | bottom-example-start-cropped | Query retry options and defaults |
| R04A-S003 | S-067 | IU-067 | `ecd69b961a` | `r04a-time-based-staleness-vs-static` | `verified-from-extracted-svg-image` | no | Time-based staleness versus static |
| R04A-S004 | S-068 | IU-068 | `3d947e5f86` | `r04a-query-retry-example` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-cropped | retry: 3 example |
| R04A-S005 | S-070 | IU-070 | `8d3fd0a7f7` | `r04a-manual-invalidation-static` | `verified-from-extracted-svg-image` | no | Manual invalidation with static |
| R04A-S006 | S-071 | IU-071 | `9eb932564a` | `r04a-retry-delay-default-and-retryonmount` | `verified-from-extracted-svg-image` | no | retryDelay default and retryOnMount |
| R04A-S007 | S-073 | IU-073 | `bba33258c2` | `r04a-refetch-triggers-stale-queries` | `verified-from-extracted-svg-image` | bottom-ui-overlay-no-obvious-text-loss | Refetch triggers for stale queries |
| R04A-S008 | S-074 | IU-074 | `577412eb23` | `r04a-static-mental-model` | `verified-from-extracted-svg-image` | no | Static disables automatic refetch logic even after invalidation |
| R04A-S009 | S-075 | IU-075 | `62d845b921` | `r04a-query-error-reset-boundary-retryonmount-false` | `verified-from-extracted-svg-image` | no | QueryErrorResetBoundary with retryOnMount false |
| R04A-S010 | S-076 | IU-076 | `4e4df28c03` | `r04a-mutation-retry-default` | `verified-from-extracted-svg-image` | no | Mutation retry exists but defaults to 0 |
| R04A-S011 | S-077 | IU-077 | `2e326e9966` | `r04a-become-stale-after-staletime` | `verified-from-extracted-svg-image` | no | A query becomes stale after staleTime expires |
| R04A-S012 | S-079 | IU-079 | `ac6478b204` | `r04a-freshness-vs-retention-staletime` | `verified-from-extracted-svg-image` | no | Freshness vs retention, staleTime default |
| R04A-S013 | S-082 | IU-082 | `a75c02ceb1` | `r04a-invalidate-overrides-staletime-infinity` | `verified-from-extracted-svg-image` | no | Invalidation marks stale and overrides staleTime |
| R04A-S014 | S-084 | IU-084 | `68a664c2d5` | `r04a-throwonerror-retryonmount-false-flow` | `verified-from-extracted-svg-image` | no | throwOnError + retryOnMount false boundary flow |
| R04A-S015 | S-087 | IU-087 | `6674e4d2e9` | `r04a-staletime-example-infinity` | `verified-from-extracted-svg-image` | no | staleTime example and Infinity |
| R04A-S016 | S-088 | IU-088 | `e48ab34495` | `r04a-retrydelay-option` | `verified-from-extracted-svg-image` | no | retryDelay option can be number or function |
| R04A-S017 | S-090 | IU-090 | `ba574a8024` | `r04a-static-never-considered-stale` | `verified-from-extracted-svg-image` | no | static prevents being considered stale |
| R04A-S018 | S-091 | IU-091 | `1c6a61c9e4` | `r04a-static-refetch-paths-shut-off` | `verified-from-extracted-svg-image` | no | static shuts off normal automatic refetch paths |
| R04A-S019 | S-095 | IU-095 | `ff5a3dac41` | `r04a-staletime-variants` | `verified-from-extracted-svg-image` | no | Differences between 0, finite, Infinity, and static |
| R04A-S020 | S-097 | IU-097 | `4e38da6f7c` | `r04a-what-happens-when-stale` | `verified-from-extracted-svg-image` | no | What happens when a query becomes stale |
| R04A-S021 | S-098 | IU-098 | `27679ed8ee` | `r04a-static-manual-fetch-and-refetchinterval` | `verified-from-extracted-svg-image` | no | What can still fetch with static |
| R04A-S022 | S-099 | IU-099 | `1314fac193` | `r04a-retrydelay-function-linear-backoff` | `verified-from-extracted-svg-image` | no | retryDelay function linear backoff |
| R04A-S023 | S-103 | IU-103 | `4e59a80541` | `r04a-how-to-think-about-static` | `verified-visible-partial-from-extracted-svg-image` | bottom-tiny-example-cropped | When to use static and rule of thumb |
| R04A-S024 | S-104 | IU-104 | `50eadf70df` | `r04a-retrydelay-exponential-and-mutations` | `verified-visible-partial-from-extracted-svg-image` | top-and-bottom-ui-overlay | retryDelay exponential backoff example and mutation retryDelay |

---

## 3. Source transcript

### R04A-S001 / S-062 - `976499b4dc`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-static-stale-word-meaning`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: staleTime static: not stale by time but can be invalidated

#### Verified visible text
```text
Yeah, this is one of the more confusing parts of TanStack Query's API — the word “stale” is doing two slightly different jobs here.

Key idea

With `staleTime: 'static'`:

- it never becomes stale due to time
- but it can still be marked stale manually (via invalidation)
```

#### Notes
Inbound from R02 reserved overlap; verified as R04A.

---

### R04A-S002 / S-063 - `603893e98b`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r04a-query-retry-options`
- readability: `high`
- cut_off: `bottom-example-start-cropped`
- confidence: `high-for-visible-text`
- theme: Query retry options and defaults

#### Verified visible text
```text
There are separate retry settings for queries and mutations, and their defaults are different. For queries, `retry` defaults to 3 on the client and 0 on the server. For mutations, `retry` defaults to 0.

Queries

For `useQuery`, the `retry` option can be:

- `false` → never retry
- `true` → retry infinitely
- a number like `3` → retry until that many retries have been attempted
- a function `((failureCount, error) => boolean)` → decide dynamically whether to retry.

Example:
```

#### Notes
Bottom starts an Example section; code is continued by S-068.

---

### R04A-S003 / S-067 - `ecd69b961a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-time-based-staleness-vs-static`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Time-based staleness versus static

#### Verified visible text
```text
So what actually happens?

Think of it like two separate mechanisms:

1. Time-based staleness

Normally:

→ after 60s → query becomes stale automatically

With:

→ this never happens
→ it stays “fresh forever” from a time perspective
```

#### Verified visible code
```tsx
staleTime: 60_000

staleTime: 'static'
```

#### Notes
Verified from R04A source image.

---

### R04A-S004 / S-068 - `3d947e5f86`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r04a-query-retry-example`
- readability: `high`
- cut_off: `top-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: retry: 3 example

#### Verified visible text
```text
Example:

That means:

- first request fails
- React Query retries up to 3 times
- so you can get the initial attempt plus up to 3 retries.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  retry: 3,
})
```

#### Notes
Continuation from S-063; top tail is cropped.

---

### R04A-S005 / S-070 - `8d3fd0a7f7`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-manual-invalidation-static`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Manual invalidation with static

#### Verified visible text
```text
2. Manual invalidation

This does two things internally:

- marks the query as invalidated
- sets `isStale = true`

So yes — it does become stale.

But...

“stale” here does NOT trigger refetch when `staleTime: 'static'`.
```

#### Verified visible code
```tsx
queryClient.invalidateQueries(['todos'])
```

#### Notes
Verified from R04A source image.

---

### R04A-S006 / S-071 - `9eb932564a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-retry-delay-default-and-retryonmount`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: retryDelay default and retryOnMount

#### Verified visible text
```text
Query retry delay default

Retries do not happen instantly. By default, TanStack Query uses exponential backoff: it starts at 1000 ms, doubles with each retry attempt, and caps at 30 seconds.

So roughly:

- retry 1 → about 1s
- retry 2 → about 2s
- retry 3 → about 4s
- and so on, capped at 30s.

`retryOnMount`

Queries also have `retryOnMount`, which defaults to `true`. If a query is in an error state and the component mounts again, it can retry on mount unless you turn that off.
```

#### Notes
Verified from R04A source image.

---

### R04A-S007 / S-073 - `bba33258c2`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-refetch-triggers-stale-queries`
- readability: `high`
- cut_off: `bottom-ui-overlay-no-obvious-text-loss`
- confidence: `high`
- theme: Refetch triggers for stale queries

#### Verified visible text
```text
9.3 Refetch triggers for stale queries

Stale queries may refetch when:

- the key changes
- a new observer mounts
- the window regains focus
- the device reconnects

Options:
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['repos', { sort }],
  queryFn: () => fetchRepos(sort),
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
})
```

#### Notes
Bottom UI overlay visible; no obvious content loss.

---

### R04A-S008 / S-074 - `577412eb23`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-static-mental-model`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Static disables automatic refetch logic even after invalidation

#### Verified visible text
```text
Why this feels contradictory

Because normally:

stale → eligible for refetch

But with `'static'`, TanStack Query changes the rule to:

stale → still do nothing automatically

So you end up with a query that is:

- stale
- invalidated
- but won't refetch unless you explicitly tell it to

Mental model that actually works

Treat `'static'` like:

“Disable all automatic refetch logic — even after invalidation”
```

#### Notes
Verified from R04A source image.

---

### R04A-S009 / S-075 - `62d845b921`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-query-error-reset-boundary-retryonmount-false`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: QueryErrorResetBoundary with retryOnMount false

#### Verified visible text
```text
Yes — no automatic retry on mount.

If `retryOnMount` is `false`, then after `QueryErrorResetBoundary` resets the boundary state and the component renders/mounts again, the query is allowed to be rendered again, but it will not automatically start a new fetch just because it mounted while in error state. That is exactly what `retryOnMount` controls.

So:

- `QueryErrorResetBoundary` = “stop immediately re-throwing the old query error; let me try again from the boundary flow.”
- `retryOnMount: false` = “but do not auto-retry this errored query on mount.”
```

#### Notes
Verified from R04A source image.

---

### R04A-S010 / S-076 - `4e4df28c03`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-mutation-retry-default`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Mutation retry exists but defaults to 0

#### Verified visible text
```text
Mutations

For `useMutation`, `retry` also exists, but the default is 0, meaning failed mutations are not retried automatically unless you opt in.

That default makes sense because mutations often change server state, and blindly retrying writes can be risky depending on the endpoint and whether the operation is idempotent. That last sentence is an inference, but it matches the documented default behavior.

Example:

Now a failed mutation can be retried up to 2 times.
```

#### Verified visible code
```tsx
useMutation({
  mutationFn: updateTodo,
  retry: 2,
})
```

#### Notes
Verified from R04A source image.

---

### R04A-S011 / S-077 - `2e326e9966`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-become-stale-after-staletime`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: A query becomes stale after staleTime expires

#### Verified visible text
```text
A query can become stale in these main ways:

1. After its `staleTime` expires

This is the normal case.

- default `staleTime` is 0, so data is considered stale immediately after it is fetched unless you configure otherwise.
- if `staleTime` is 5000, it becomes stale 5 seconds after `dataUpdatedAt`.
```

#### Notes
Verified from R04A source image.

---

### R04A-S012 / S-079 - `ac6478b204`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-freshness-vs-retention-staletime`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Freshness vs retention, staleTime default

#### Verified visible text
```text
9. Freshness vs retention

This is one of the most important topics.

9.1 `staleTime`

Controls how long data is considered fresh.

Default:

That means data becomes stale immediately after being cached.
```

#### Verified visible code
```tsx
staleTime: 0
```

#### Notes
Verified from R04A source image.

---

### R04A-S013 / S-082 - `a75c02ceb1`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-invalidate-overrides-staletime-infinity`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Invalidation marks stale and overrides staleTime

#### Verified visible text
```text
2. When you invalidate it

`queryClient.invalidateQueries(...)` marks matching queries as stale, and this overrides `staleTime`. For active queries, it also refetches them in the background by default.

So yes:

- if `staleTime: Infinity`, the query is still fresh forever unless you manually invalidate it
- after invalidation, it does become stale even with `Infinity`

3. Initial data can already be stale

If you use `initialData`, it is considered stale by default unless you also set `staleTime` or provide `initialDataUpdatedAt`.
```

#### Notes
Verified from R04A source image.

---

### R04A-S014 / S-084 - `68a664c2d5`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-throwonerror-retryonmount-false-flow`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: throwOnError + retryOnMount false boundary flow

#### Verified visible text
```text
That means with:

and a proper `QueryErrorResetBoundary` setup:

1. query fails
2. normal `retry` attempts for that fetch cycle are exhausted
3. error is thrown to the React error boundary
4. user resets the boundary
5. `QueryErrorResetBoundary` clears the query-error-boundary state
6. component renders again
7. the query does not automatically retry on mount, because `retryOnMount` is `false`
```

#### Verified visible code
```tsx
throwOnError: true
retryOnMount: false
```

#### Notes
Verified from R04A source image.

---

### R04A-S015 / S-087 - `6674e4d2e9`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-staletime-example-infinity`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: staleTime example and Infinity

#### Verified visible text
```text
Example

`Infinity`

This means data never becomes stale automatically.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['repos', sort],
  queryFn: () => getRepos(sort),
  staleTime: 60 * 60 * 1000, // 1 hour
})

staleTime: Infinity
```

#### Notes
Verified from R04A source image.

---

### R04A-S016 / S-088 - `e48ab34495`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-retrydelay-option`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: retryDelay option can be number or function

#### Verified visible text
```text
Yes — there is a `retryDelay` option for both queries and mutations. For `useQuery` and `useMutation`, it can be either a number or a function `((retryAttempt, error) => number)` that returns the delay in milliseconds before the next retry.

Example for a query:

That means each retry waits 2 seconds.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  retry: 3,
  retryDelay: 2000,
})
```

#### Notes
Verified from R04A source image.

---

### R04A-S017 / S-090 - `ba574a8024`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-static-never-considered-stale`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: static prevents being considered stale

#### Verified visible text
```text
Can a query be prevented from ever becoming stale?

Yes — in v5 there is a stronger option than `Infinity`:

With `staleTime: 'static'`, the data is never considered stale. Also, it will not refetch even if invalidated manually.
```

#### Verified visible code
```tsx
staleTime: 'static'
```

#### Notes
Verified from R04A source image.

---

### R04A-S018 / S-091 - `1c6a61c9e4`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-static-refetch-paths-shut-off`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: static shuts off normal automatic refetch paths

#### Verified visible text
```text
Yes — with `staleTime: 'static'`, the query is treated as never stale, and the usual automatic refetch paths tied to staleness are effectively shut off. The docs say `'static'` means “the data will never be considered stale,” and for `refetchOnMount`, `refetchOnWindowFocus`, and `refetchOnReconnect`, even `"always"` does not force a refetch when `'static'` is used.

So your statement is basically correct:

- if `staleTime: 'static'`
- and you did not set `refetchInterval`
- and you do not call a manual fetch API yourself
```

#### Notes
Verified from R04A source image.

---

### R04A-S019 / S-095 - `ff5a3dac41`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-staletime-variants`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Differences between 0, finite, Infinity, and static

#### Verified visible text
```text
So the differences are:

- `staleTime: 0` → stale immediately
- `staleTime: 10_000` → stale after 10 seconds
- `staleTime: Infinity` → never stale unless invalidated manually
- `staleTime: 'static'` → never stale at all, even manual invalidation does not make it refetch in the normal way

So to your question:

do we have an option that controls can a query be stale at all?

Yes:

- `Infinity` says “don't become stale by time”
- `'static'` says “never be considered stale”
```

#### Notes
Verified from R04A source image.

---

### R04A-S020 / S-097 - `4e38da6f7c`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-what-happens-when-stale`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: What happens when a query becomes stale

#### Verified visible text
```text
9.2 What happens when a query becomes stale?

Nothing dramatic.

It is still in cache.
It can still be shown immediately.

Stale data is usually better than showing nothing.

When stale data exists, React Query often shows cached data first and then refetches in the background.
```

#### Notes
Verified from R04A source image.

---

### R04A-S021 / S-098 - `27679ed8ee`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-static-manual-fetch-and-refetchinterval`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: What can still fetch with static

#### Verified visible text
```text
What can still fetch with `'static'`

`'static'` does not mean “this query can never be fetched again by any API.” It means the usual stale-driven / auto-refetch behavior is disabled. You can still fetch manually through explicit fetch/refetch-style APIs, and polling with `refetchInterval` is separate from staleness. The docs list explicit fetch methods like `fetchQuery`, `prefetchQuery`, `refetchQueries`, and note that `refetchInterval` is independent of `staleTime`.

So the practical picture is:

- `refetchInterval` → can still fetch
- explicit manual fetch/refetch calls → can still fetch
- mount/focus/reconnect/invalidate-driven refetch → effectively no, with `'static'`
```

#### Notes
Verified from R04A source image.

---

### R04A-S022 / S-099 - `1314fac193`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04a-retrydelay-function-linear-backoff`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: retryDelay function linear backoff

#### Verified visible text
```text
Or with a function:

That gives linear backoff:

- retry 1 after 1s
- retry 2 after 2s
- retry 3 after 3s.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  retry: 3,
  retryDelay: (attempt) => attempt * 1000,
})
```

#### Notes
Verified from R04A source image.

---

### R04A-S023 / S-103 - `4e59a80541`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r04a-how-to-think-about-static`
- readability: `high`
- cut_off: `bottom-tiny-example-cropped`
- confidence: `high-for-visible-text`
- theme: When to use static and rule of thumb

#### Verified visible text
```text
How to think about `'static'`

Use `'static'` when the data is effectively immutable for the lifetime of the app session, or when you want to be fully in charge of when refetching happens. Examples:

- build metadata
- app config loaded once
- constants / dictionaries / feature flags that you refresh only explicitly
- reference data you want to update only with a button or a custom flow

A good rule of thumb

- use `Infinity` when you want: “don't refetch automatically unless I invalidate”
- use `'static'` when you want: “don't even refetch on invalidation; only fetch when I explicitly choose another mechanism”

Tiny example:
```

#### Notes
Bottom starts a tiny example, continued/cropped; core text is visible.

---

### R04A-S024 / S-104 - `50eadf70df`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r04a-retrydelay-exponential-and-mutations`
- readability: `high`
- cut_off: `top-and-bottom-ui-overlay`
- confidence: `high-for-visible-text`
- theme: retryDelay exponential backoff example and mutation retryDelay

#### Verified visible text
```text
TanStack's docs also give the exponential-backoff style example:

and note that the default behavior uses exponential backoff for query retries.

Same idea exists on mutations:

So yes:

- `retry` controls whether/how many times
- `retryDelay` controls how long to wait between attempts.
```

#### Verified visible code
```tsx
retryDelay: (attempt) =>
  Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)

useMutation({
  mutationFn: updateTodo,
  retry: 2,
  retryDelay: (attempt) => attempt * 1000,
})
```

#### Notes
Top and bottom UI overlays visible; core code/text readable.

---

## 4. Cleaned source notes

- staleTime controls how long data is considered fresh; default staleTime is 0.
- Stale data remains in cache and can be shown immediately.
- Invalidation marks matching queries stale and overrides finite/Infinity staleTime.
- staleTime: Infinity prevents time-based staleness but manual invalidation can still mark stale.
- staleTime: 'static' prevents normal automatic stale-driven refetching even after invalidation.
- static does not mean no API can ever fetch; explicit fetch/refetch APIs and refetchInterval can still fetch.
- Stale queries may refetch when key changes, observer mounts, focus returns, or reconnect occurs, unless configured otherwise.
- Queries retry by default on the client; mutations default to no automatic retry.
- retry controls whether/how many attempts; retryDelay controls delay between attempts.
- retryOnMount controls whether an errored query automatically retries when mounted again.

---

## 5. Minimal interpretation

R04A establishes the freshness/refetch mental model. `staleTime` controls how long data is fresh; stale data remains cached and can still be displayed. Invalidation marks queries stale, but `staleTime: 'static'` disables the normal automatic refetch paths even after invalidation. `Infinity` means no time-based staleness unless invalidated, while `'static'` means never considered stale for normal refetch logic. The region also covers retry behavior: query retry defaults, mutation retry defaults, retryDelay, and retryOnMount/error-boundary interactions.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| staleTime controls freshness and defaults to 0 | R04A-S011, R04A-S012 | extracted SVG image transcript/code | high |
| stale data remains in cache and can be shown while background refetch happens | R04A-S020 | extracted SVG image transcript | high |
| invalidateQueries marks matching queries stale and can override staleTime | R04A-S005, R04A-S013 | extracted SVG image transcript/code | high |
| Infinity and static have different meanings | R04A-S001, R04A-S003, R04A-S017, R04A-S019 | extracted SVG image transcript/code | high |
| static disables normal stale-driven automatic refetch even after invalidation | R04A-S005, R04A-S008, R04A-S018, R04A-S021 | extracted SVG image transcript | high |
| refetchInterval and explicit fetch/refetch APIs can still fetch with static | R04A-S021 | extracted SVG image transcript | high |
| Stale queries can refetch on key change, mount, focus, or reconnect | R04A-S007 | extracted SVG image transcript/code | high |
| Queries and mutations have retry/retryDelay controls with different defaults | R04A-S002, R04A-S004, R04A-S006, R04A-S010, R04A-S016, R04A-S022, R04A-S024 | extracted SVG image transcript/code | high |
| retryOnMount controls automatic retry for errored queries on mount | R04A-S006, R04A-S009, R04A-S014 | extracted SVG image transcript/code | high |

---

## 7. Question hooks

- What does staleTime control?
- What happens when a query becomes stale?
- How is staleTime: Infinity different from staleTime: 'static'?
- Can invalidation make an Infinity query stale?
- Why can static be invalidated but still not refetch automatically?
- What can still fetch when staleTime is static?
- Which events can refetch stale queries?
- What does retry control for queries?
- How are retry defaults different for queries and mutations?
- What does retryDelay control?
- What does retryOnMount control?

---

## 8. Open review issues

- R04A is complete for the reviewed staleness/static/refetch/retry sub-block.
- S-069 moved to R04B after local review because it is active/inactive + gcTime.
- R04B remains pending: observer/rerender, structural sharing, gcTime, refetchInterval, cache lifecycle.
- R05 neighbors remain already processed and are not part of R04A.
