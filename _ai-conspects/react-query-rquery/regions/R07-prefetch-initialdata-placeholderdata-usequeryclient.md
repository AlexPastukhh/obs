# R07 - Prefetch / initialData / placeholderData / useQueryClient

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4b / verified region transcript v003 - cleanup**  
Generated: 2026-06-01 17:44:15 UTC

This file replaces the previous R07 scaffold with a verified transcript from the embedded SVG images available in the current source material.

---

## Direction check

Goal:
Convert `react-query,rquery` into source-preserving region text for AI repetition.

Now:
R10 is completed; R07 has verified source text for 11 mapped sources.

This step:
Create the first real R07 transcript.

Why:
R07 explains prefetching, initialData, placeholderData, and useQueryClient, which support cache behavior used in R10 mutations.

Next:
1. review R07 diff; 2. correct any transcript errors; 3. move to next region.

---

## 0. You are here

Current region: `R07 - Prefetch / initialData / placeholderData / useQueryClient`  
Status: `verified transcript from embedded SVG images`  
Source count: `11`  
Known limitations: several screenshots are split or partially cropped; each limitation is marked per source.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
This region explains how React Query can prepare or display query data before/while the real fetch happens:
- prefetching data into cache before navigation;
- `useQueryClient()` as the way to access `queryClient`;
- `prefetchQuery` and its `staleTime`;
- the difference between cached data and fresh data;
- `initialData` as real starting cache data;
- `placeholderData` as temporary visual fallback;
- why prefetched or initial data can still refetch on mount.
```

Key ideas:

```text
1. Prefetching puts data into cache early, often on link hover.
2. Prefetch `staleTime` decides whether a prefetch call should fetch again or reuse cached data.
3. Mounted `useQuery` has its own freshness logic; prefetched data can still be stale for the observer.
4. If you want the mounted query to treat prefetched data as fresh, set staleTime for `useQuery` too.
5. `initialData` is real cache data, but with default `staleTime: 0` it can refetch immediately.
6. `initialData` does not overwrite existing cached data for the same query key.
7. `placeholderData` is not real cache seed; it is temporary UI continuity while real data loads.
```

How well I perceived the area:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high for all visible code blocks.
Spatial/layout understanding: medium-high; the region is a compact cluster, but several screenshots are split/cropped.
```

Reading limitations:

```text
S-117 and S-120 are two parts of one prefetch link-hover example.
S-171 has top context cropped.
S-180 is slightly cropped after the code block.
S-163 contains mixed Russian/English source text; the intended Russian text is preserved as UTF-8.
Source chips such as `TanStack +1` were omitted unless content-bearing.
```

Confidence:

```text
High for the main ideas: prefetching, staleTime split, initialData, placeholderData.
High for visible code transcription.
Medium for missing surrounding context in cropped sources.
```

---

## 1. Original Excalidraw labels

```text
PREFETCHING/ INITIALDATA /PLACEHOLDRDATA, USEQUERYCLIENT
PREFETCH STALETIME AND REFETCHING ON MOUNT ISSUE EVEN WITH PREFETCH QUERY
init data caveats
DOES PREFETCH STALETIME BELONGS TO BOTH PREFETCH AND NORMAL QUEY?
!!! can prefetch and then fetch again because of default stale time
fetchquery ensurequerydata
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| R07-S001 | S-117 | IU-117 | `8160273b4d` | `verified-visible-partial-from-embedded-svg-image` | yes-bottom-continuation-in-S-120 | Prefetching intro and beginning of link-hover example |
| R07-S002 | S-120 | IU-120 | `77905ae043` | `verified-visible-continuation-from-embedded-svg-image` | yes-top-continuation-from-S-117 | Prefetching link-hover example continuation |
| R07-S003 | S-131 | IU-131 | `436c717cfb` | `verified-from-embedded-svg-image` | no | initialData vs placeholderData intro and initialData example |
| R07-S004 | S-132 | IU-132 | `3d2af35386` | `verified-from-embedded-svg-image` | no | prefetch staleTime and second hover behavior |
| R07-S005 | S-146 | IU-146 | `5ee5757310` | `verified-from-embedded-svg-image` | no | prefetch staleTime summary |
| R07-S006 | S-152 | IU-152 | `b67831fde6` | `verified-from-embedded-svg-image` | no | initialData cache persistence and immediate refetch |
| R07-S007 | S-162 | IU-162 | `7ad643e947` | `verified-from-embedded-svg-image` | no | prefetch staleTime vs useQuery staleTime |
| R07-S008 | S-163 | IU-163 | `df3c1dacf6` | `verified-from-embedded-svg-image` | no | initialData skipped when cache already exists |
| R07-S009 | S-171 | IU-171 | `54c1e18a5f` | `verified-from-embedded-svg-image` | top-context-cropped | useQuery after prefetch reads cache then may refetch |
| R07-S010 | S-172 | IU-172 | `4014246e26` | `verified-from-embedded-svg-image` | no | placeholderData |
| R07-S011 | S-180 | IU-180 | `8930b327c7` | `verified-from-embedded-svg-image` | bottom-slightly-cropped-after-code | prefetch staleTime vs mounted useQuery staleTime distinction |

---

## 3. Source transcript

### R07-S001 / S-117 - `8160273b4d`

Metadata:

- status: `verified-visible-partial-from-embedded-svg-image`
- readability: `high`
- cut off: `yes-bottom-continuation-in-S-120`
- confidence: `high-for-visible-text`
- theme: Prefetching intro and beginning of link-hover example

#### Verified visible text

```text
16. Prefetching

Prefetching loads data into cache before the user navigates there.

A common case is link hover.
```

#### Verified visible code

```ts
import { useQueryClient } from '@tanstack/react-query'

function PostLink({ post }: { post: { path: string; title: string } }) {
  const queryClient = useQueryClient()
```

#### Notes

This screenshot is visibly cut off after `const queryClient = useQueryClient()`. The continuation is in S-120.

---

### R07-S002 / S-120 - `77905ae043`

Metadata:

- status: `verified-visible-continuation-from-embedded-svg-image`
- readability: `high`
- cut off: `yes-top-continuation-from-S-117`
- confidence: `high-for-visible-text`
- theme: Prefetching link-hover example continuation

#### Verified visible text

```text
Prefetching helps perceived performance, but it does not guarantee zero loading UI.
```

#### Verified visible code

```ts
return (
  <a
    href={`/posts/${post.path}`}
    onMouseEnter={() => {
      queryClient.prefetchQuery({
        queryKey: ['posts', post.path],
        queryFn: () => fetchPost(post.path),
        staleTime: 5000,
      })
    }}
  >
    {post.title}
  </a>
)
}
```

#### Notes

Continuation of S-117. Together S-117 and S-120 form the prefetch link-hover example.

---

### R07-S003 / S-131 - `436c717cfb`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: initialData vs placeholderData intro and initialData example

#### Verified visible text

```text
17. initialData vs placeholderData

These are very different.

17.1 initialData

Seeds the query with real starting data.

Useful when you already have related data in cache.
```

#### Verified visible code

```ts
function usePost(path: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['posts', path],
    queryFn: () => fetchPost(path),
    initialData: () =>
      queryClient
        .getQueryData<{ path: string; title: string }[]>(['posts'])
        ?.find((post) => post.path === path),
  })
}
```

#### Notes

Verified from embedded SVG image.

---

### R07-S004 / S-132 - `3d2af35386`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: prefetch staleTime and second hover behavior

#### Verified visible text

```text
1) If user hovers, prefetch fires, does not click, then hovers again later

It depends on whether the prefetched cache entry is still considered fresh at the moment of the second hover.

In your screenshot:

that `staleTime: 5000` is used for the prefetch decision: if the cached data for that key is not invalidated and is not older than 5 seconds, `prefetchQuery` will just resolve without fetching again; otherwise it will fetch.
```

#### Verified visible code

```ts
queryClient.prefetchQuery({
  queryKey: ['posts', post.path],
  queryFn: () => fetchPost(post.path),
  staleTime: 5000,
})
```

#### Notes

Verified from embedded SVG image.

---

### R07-S005 / S-146 - `5ee5757310`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: prefetch staleTime summary

#### Verified visible text

```text
So:

- hover again within 5s -> usually no new request
- hover again after 5s -> prefetch will usually fetch again
- if the query was invalidated in between -> it can fetch again even before 5s, because invalidation marks it stale and overrides staleTime.
```

#### Notes

Visible source chip omitted from transcript body.

---

### R07-S006 / S-152 - `b67831fde6`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: initialData cache persistence and immediate refetch

#### Verified visible text

```text
Yes, `initialData` is written into that query's cache when the query is initialized - but a refetch may still happen immediately on mount, depending on freshness settings.

So the precise answer is:

- Yes: `initialData` becomes the cached data for that query key. It is persisted to the cache.
- No, not "without any refetch" by default: with the default `staleTime: 0`, that initial data is treated as stale, so the query will usually refetch immediately when it mounts.

Example:
```

#### Verified visible code

```ts
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  initialData: initialTodos,
})
```

#### Notes

Visible source chips omitted from transcript body.

---

### R07-S007 / S-162 - `7ad643e947`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: prefetch staleTime vs useQuery staleTime

#### Verified visible text

```text
Yes. By default, the data will still be stale for `useQuery` unless you also give `useQuery` (or the client defaults for that query) a nonzero `staleTime`. The React prefetching guide states this explicitly: the `staleTime` you pass to `prefetchQuery` is only used for the prefetch, and you still need to set `staleTime` for the later `useQuery` call as well.

So in your scenario:
```

#### Verified visible code

```ts
await queryClient.prefetchQuery({
  queryKey: ['post', id],
  queryFn: fetchPost,
  staleTime: 10_000,
})
```

#### Notes

Visible source chip omitted from transcript body.

---

### R07-S008 / S-163 - `df3c1dacf6`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: initialData skipped when cache already exists

#### Verified visible text

```text
so if there is data in cache for that key, then initialdata will be skipped?

Думал на протяжении 5s >

Yes. If that query key already has cached data, `initialData` is skipped for that query instance - it does not overwrite existing cached data. The `useQuery` reference says `initialData` is used "as long as the query hasn't been created or cached yet," and the SSR guide says even fresher `initialData` will not overwrite data already in the cache.
```

#### Notes

Verified from embedded SVG image. Mixed Russian/English source text is preserved.

---

### R07-S009 / S-171 - `54c1e18a5f`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `top-context-cropped`
- confidence: `high-for-visible-text`
- theme: useQuery after prefetch reads cache then may refetch

#### Verified visible text

```text
then later:

what happens is:

- `useQuery` will read the prefetched data from cache immediately
- but because `useQuery`'s own `staleTime` defaults to `0`, that data is considered stale immediately
- so on mount, the query can refetch in the background under the normal rules for stale queries.
```

#### Verified visible code

```ts
useQuery({
  queryKey: ['post', id],
  queryFn: fetchPost,
})
```

#### Notes

Top context is cropped; visible text/code is transcribed.

---

### R07-S010 / S-172 - `4014246e26`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: placeholderData

#### Verified visible text

```text
17.2 placeholderData

Temporary UI data while the real query fetches.

Classic use case: pagination transitions.

This keeps the previous page visible while the next page loads.

Mental model

- `initialData` -> real initial cache value
- `placeholderData` -> temporary visual fallback while waiting
```

#### Verified visible code

```ts
useQuery({
  queryKey: ['repos', sort, page],
  queryFn: () => fetchRepos(sort, page),
  placeholderData: (previousData) => previousData,
})
```

#### Notes

Verified from embedded SVG image.

---

### R07-S011 / S-180 - `8930b327c7`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `bottom-slightly-cropped-after-code`
- confidence: `high-for-visible-text-and-code`
- theme: prefetch staleTime vs mounted useQuery staleTime distinction

#### Verified visible text

```text
The important distinction is:

- prefetch `staleTime` answers: "When I call `prefetchQuery`, should it fetch again or reuse cached data?"
- useQuery `staleTime` answers: "When this observer mounts, should this cached data be treated as fresh or stale?"

So if you want the mounted component to treat the prefetched data as fresh for 10 seconds too, do this:
```

#### Verified visible code

```ts
await queryClient.prefetchQuery({
  queryKey: ['post', id],
  queryFn: fetchPost,
  staleTime: 10_000,
})

const query = useQuery({
  queryKey: ['post', id],
  queryFn: fetchPost,
  staleTime: 10_000,
})
```

#### Notes

Bottom is slightly cropped after the code block; visible text/code is transcribed.

---

## 4. Cleaned source notes

These notes are cleaned from the verified transcript above; they do not add external React Query material.

- Prefetching loads data into cache before navigation, commonly on link hover.
- A hover-prefetch example uses `useQueryClient()` and `queryClient.prefetchQuery(...)`.
- Prefetching improves perceived performance but does not guarantee zero loading UI.
- The `staleTime` passed to `prefetchQuery` controls the prefetch decision: reuse fresh prefetched data or fetch again.
- Invalidation can override staleTime by marking cached data stale.
- `initialData` seeds a query with real starting data and writes that data into the query cache when initialized.
- By default, `initialData` is still stale because default `staleTime` is `0`, so the query can refetch immediately on mount.
- `initialData` is skipped if that query key already has cached data; it does not overwrite existing cached data.
- The `staleTime` used for `prefetchQuery` does not automatically become the mounted `useQuery` staleTime.
- To keep prefetched data fresh for the mounted observer, set staleTime in both `prefetchQuery` and `useQuery` or defaults.
- `placeholderData` is temporary visual data while the real query fetches; a common use case is pagination transitions.

---

## 5. Minimal interpretation

R07 is about the difference between having data in cache and having data considered fresh. Prefetch can put data in cache early, but mounted `useQuery` can still refetch if its own freshness settings treat that data as stale. `initialData` is real cache data, while `placeholderData` is temporary visual fallback.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Prefetching loads data before navigation | R07-S001 | embedded SVG image transcript | high |
| Link hover can call `queryClient.prefetchQuery` | R07-S001, R07-S002 | embedded SVG image transcript/code | high |
| Prefetch does not guarantee zero loading UI | R07-S002 | embedded SVG image transcript | high |
| `prefetchQuery` staleTime controls whether a later prefetch reuses cached data or fetches again | R07-S004, R07-S005 | embedded SVG image transcript/code | high |
| Invalidation can force fetch again even before staleTime expires | R07-S005 | embedded SVG image transcript | high |
| `initialData` seeds a query with real starting data from cache | R07-S003 | embedded SVG image transcript/code | high |
| `initialData` is cached but may refetch immediately with default `staleTime: 0` | R07-S006 | embedded SVG image transcript/code | high |
| `prefetchQuery` staleTime and `useQuery` staleTime are separate concerns | R07-S007, R07-S009, R07-S011 | embedded SVG image transcript/code | high |
| `initialData` is skipped if cache already exists for that key | R07-S008 | embedded SVG image transcript | high |
| `placeholderData` is temporary UI data while real query fetches | R07-S010 | embedded SVG image transcript/code | high |

---

## 7. Question hooks

- What does prefetching do before navigation?
- Why can prefetching improve perceived performance but still not guarantee zero loading UI?
- What does `queryClient.prefetchQuery` do in the link-hover example?
- What does the `staleTime` inside `prefetchQuery` control?
- Why can a second hover within staleTime avoid a new request?
- Why can invalidation force another fetch even before staleTime expires?
- What is the difference between `prefetchQuery` staleTime and `useQuery` staleTime?
- Why can prefetched data still refetch when a component mounts?
- What does `initialData` do to the query cache?
- Why can `initialData` still be followed by an immediate refetch?
- When is `initialData` skipped?
- What is `placeholderData` for?
- What is the mental model difference between `initialData` and `placeholderData`?

---

## 8. Open review issues

- `S-117` and `S-120` are two halves of one prefetching example.
- `S-171` has top context cropped.
- `S-180` is slightly cropped after the code block.
- Source chips such as `TanStack +1` were omitted from transcript body unless they were content-bearing.
