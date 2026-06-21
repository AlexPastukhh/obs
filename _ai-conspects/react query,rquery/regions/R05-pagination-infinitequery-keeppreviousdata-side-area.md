# R05 - Pagination / InfiniteQuery / keepPreviousData side area

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4h / verified region transcript v002 - boundary correction**  
Generated: 2026-06-01 21:50:29 UTC

This file supersedes R05 v001. R05 v001 covered the main pagination/infinite-query area but missed the infinite-query continuation `S-114/S-115/S-116`.

---

## Direction check

Goal:
Convert `react-query,rquery` into source-preserving region text without losing images.

Now:
R01 v002 is corrected; old transcripts audit found R05 missing `S-114/S-115/S-116`.

This step:
Create R05 v002 by adding the missed infinite-query continuation and boundary-review section.

Why:
R05 infinite-query road continues after `S-111/S-112` into `data.pages`, Load more UI, and flattening pages before rendering.

Next:
1. review R05 v002 diff; 2. commit; 3. create R06 v002 correction.

---

## 0. You are here

Current region: `R05 - Pagination / InfiniteQuery / keepPreviousData side area`  
Status: `verified transcript from extracted SVG images`  
Source count: `13`  
Known limitations: `S-080` and `S-115` have cropped continuations; `S-094` and `S-112` slightly crop after source chips.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- normal pagination with page/cursor in queryKey
- placeholderData: keepPreviousData as lagged pagination behavior
- useTransition as React scheduling behavior
- isPlaceholderData versus isPending
- useInfiniteQuery for load-more/infinite-scroll/cursor lists
- data.pages/data.pageParams and getNextPageParam mental model
- flattening infinite-query pages before rendering UI lists
```

Key ideas:

- Classic pagination puts page/cursor in queryKey and fetches that page in queryFn.
- Changing page changes query key, so UI may bounce while next page loads.
- placeholderData: keepPreviousData keeps previous page data visible for the new key.
- useTransition is about non-blocking rendering/update priority, not query data semantics.
- isPlaceholderData answers whether shown data belongs to the previous query result.
- useInfiniteQuery is the dedicated API for load-more/infinite-scroll/cursor lists.
- Infinite queries collect pages in data.pages and params in data.pageParams.
- useInfiniteQuery does not return one flat array; UI often flattens data.pages before rendering.
- fetchNextPage/hasNextPage/isFetchingNextPage support a Load more style UI.

Reading quality:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high for visible code blocks.
Spatial/layout understanding: high after R05 v002 boundary audit.
Limitations: S-080 and S-115 are cropped; S-094/S-112 slightly crop after source chips.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-080, S-083, S-085, S-093, S-094, S-101, S-106, S-108, S-111, S-112, S-114, S-115, S-116
```

Added in v002:

```text
S-114 -> useInfiniteQuery data shape: pages/pageParams
S-115 -> 19.2 Load more button
S-116 -> flatten data.pages before rendering
```

Boundary decision:

```text
R05 v001 was not wrong for included sources, but it was boundary-incomplete.
R05 v002 extends the same infinite-query road after S-111/S-112.
No separate neighbor column is forced into R05 in this correction.
```

Open issues:

```text
S-115 bottom is cropped after the visible `items` line; only visible code is transcribed.
Future neighboring-region audits can still create a correction if another pagination/infinite-query continuation appears.
```

---

## 1. Original Excalidraw labels

```text
PAGINATION
usetransition vs placeholderdata:keeppreviousdata
INFINITESCROLL OPTIONS WHAT DOES USEINFINITEQUERY RETURNS HOW GETNEXTPAGEPARAM WORKS HOW DOES IT COMPUTES HASNEXTPAGE
INFINITEQUERY
!!!
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R05-S001 | S-080 | IU-080 | `0871bd898b` | `stage4d-included-source` | `verified-visible-partial-from-extracted-svg-image` | yes-bottom-cropped | normal pagination with useQuery intro |
| R05-S002 | S-083 | IU-083 | `e3c0a532d3` | `stage4d-included-source` | `verified-from-extracted-svg-image` | no | docs pattern for paginated useQuery |
| R05-S003 | S-085 | IU-085 | `bc3e0aa237` | `stage4d-included-source` | `verified-from-extracted-svg-image` | no | placeholderData keepPreviousData vs useTransition |
| R05-S004 | S-093 | IU-093 | `c8cc88b3af` | `stage4d-included-source` | `verified-from-extracted-svg-image` | no | biggest difference between useTransition and keepPreviousData |
| R05-S005 | S-094 | IU-094 | `975b593423` | `stage4d-included-source` | `verified-from-extracted-svg-image` | bottom-slightly-cropped-after-source-chip | built-in fix with placeholderData keepPreviousData |
| R05-S006 | S-101 | IU-101 | `4c44fb1d2a` | `stage4d-included-source` | `verified-from-extracted-svg-image` | no | why use both keepPreviousData and useTransition |
| R05-S007 | S-106 | IU-106 | `fc61dcb8e6` | `stage4d-included-source` | `verified-from-extracted-svg-image` | no | infinite pagination with useInfiniteQuery |
| R05-S008 | S-108 | IU-108 | `728900c573` | `stage4d-included-source` | `verified-from-extracted-svg-image` | no | isPlaceholderData vs manual isPending |
| R05-S009 | S-111 | IU-111 | `b643ae1bee` | `stage4d-included-source` | `verified-from-extracted-svg-image` | no | infinite query mental model |
| R05-S010 | S-112 | IU-112 | `41cc77d4c3` | `stage4d-included-source` | `verified-from-extracted-svg-image` | bottom-slightly-cropped-after-source-chip | useInfiniteQuery example shape |
| R05-S011 | S-114 | IU-114 | `38adfee555` | `same-road-continuation` | `verified-from-extracted-svg-image` | no | useInfiniteQuery data shape: pages and pageParams |
| R05-S012 | S-115 | IU-115 | `1f0e98522e` | `same-road-continuation` | `verified-visible-partial-from-extracted-svg-image` | bottom-cropped-code-continues | 19.2 Load more button |
| R05-S013 | S-116 | IU-116 | `69bfa97f82` | `same-road-continuation` | `verified-from-extracted-svg-image` | no | flatten data.pages before rendering |

---

## 3. Source transcript

### R05-S001 / S-080 - `0871bd898b`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `yes-bottom-cropped`
- confidence: `high-for-visible-text`
- theme: normal pagination with useQuery intro

#### Verified visible text

```text
1) Normal pagination with `useQuery`

For classic pagination like "page 1 / page 2 / page 3", the built-in pattern is:

- put the page number or cursor into the `queryKey`
- fetch that page in `queryFn`
```

#### Notes

Bottom continuation is cropped. Visible text is transcribed.

---

### R05-S002 / S-083 - `e3c0a532d3`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: docs pattern for paginated useQuery

#### Verified visible text

```text
Example from the docs pattern:

TanStack says paginated data "just works" by including the page info in the query key. Each page is treated as its own cached query entry.

Why this can feel awkward

If you do only that, moving from page 1 to page 2 means React Query sees a new query key, so the UI can bounce between success and pending states while the next page loads. The pagination guide calls this out directly.
```

#### Verified visible code

```ts
const { data } = useQuery({
  queryKey: ['projects', page],
  queryFn: () => fetchProjects(page),
})
```

#### Notes

Source chips omitted from transcript body.

---

### R05-S003 / S-085 - `bc3e0aa237`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: placeholderData keepPreviousData vs useTransition

#### Verified visible text

```text
Yes - you can still get re-renders with `placeholderData: keepPreviousData`. The key difference is:

- `placeholderData: keepPreviousData` is a TanStack Query data behavior: when the query key changes, React Query immediately gives the new query observer the previous result as placeholder data, so the UI keeps showing the old page while the new page fetches in the background. TanStack Query marks this state with `isPlaceholderData`. In v5, this is the replacement for the old `keepPreviousData` option.

- `useTransition` is a React scheduling behavior: it marks an update as non-blocking, lets React keep the current UI visible while preparing the next render, and gives you `isPending` for pending UI like a spinner.

So they solve related but different problems.
```

#### Notes

Verified from extracted SVG image.

---

### R05-S004 / S-093 - `c8cc88b3af`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: biggest difference between useTransition and keepPreviousData

#### Verified visible text

```text
The biggest difference

With `useTransition`, React is preserving the previous rendered tree while a transition is pending.
With `placeholderData: keepPreviousData`, TanStack Query is providing previous query data to the new query instance.

That means `useTransition` is more about:

- update priority
- keeping typing/clicking responsive
- avoiding janky synchronous renders
- showing a pending indicator with `isPending`

While `keepPreviousData` is more about:

- pagination/data fetching semantics
- avoiding "empty/loading/new data" flicker on query-key changes
- telling you explicitly that the shown data is stale placeholder data via `isPlaceholderData`
```

#### Notes

Verified from extracted SVG image.

---

### R05-S005 / S-094 - `975b593423`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `bottom-slightly-cropped-after-source-chip`
- confidence: `high-for-visible-text-and-code`
- theme: built-in fix with placeholderData keepPreviousData

#### Verified visible text

```text
Built-in fix for that

In v5, the docs recommend `placeholderData: keepPreviousData` for paginated queries so the previous page stays visible while the next page is loading, which avoids the jumpy UI.

Typical shape:

That is the built-in "lagged pagination" experience in v5.
```

#### Verified visible code

```ts
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const { data, isPlaceholderData } = useQuery({
  queryKey: ['projects', page],
  queryFn: () => fetchProjects(page),
  placeholderData: keepPreviousData,
})
```

#### Notes

Bottom is slightly cropped after the final source chip; visible content is transcribed.

---

### R05-S006 / S-101 - `4c44fb1d2a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: why use both keepPreviousData and useTransition

#### Verified visible text

```text
Why use both?

Because sometimes you want both guarantees:

1. Keep previous data visible for the new query key
   That is Query's job.
2. Make the state update low priority so the UI stays responsive during expensive rendering
   That is React's job.

A good example is a paginated page where the next page:

- triggers a fetch
- also causes a heavy table/grid/chart subtree to render
- maybe recomputes filters/sorting/layout
- maybe suspends in some nested part

In that case:

- `keepPreviousData` keeps old rows on screen
- `useTransition` makes the page switch non-blocking and gives you `isPending` for UI polish
```

#### Notes

Verified from extracted SVG image.

---

### R05-S007 / S-106 - `fc61dcb8e6`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: infinite pagination with useInfiniteQuery

#### Verified visible text

```text
2) Infinite pagination with `useInfiniteQuery`

If you want:

- "Load more"
- infinite scroll
- cursor-based endless list

then the built-in API is `useInfiniteQuery`. It is specifically designed for this. The docs say infinite queries provide `data.pages`, `data.pageParams`, `fetchNextPage`, `fetchPreviousPage`, `hasNextPage`, and `hasPreviousPage`.
```

#### Notes

Verified from extracted SVG image.

---

### R05-S008 / S-108 - `728900c573`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: isPlaceholderData vs manual isPending

#### Verified visible text

```text
Why `isPlaceholderData` can be better than a manual `isPending`

Because it answers a more specific question:

- `isPending`: "React is currently processing a transition."
- `isPlaceholderData`: "The data currently shown belongs to the previous query result, not the final data for the current key."

That distinction matters.

For example, with pagination you may want to:

- disable "Next" while you are still showing previous data for the current page key
- dim the table only when the displayed rows are placeholder rows
- avoid double-advancing pages until real data lands

`isPlaceholderData` is tailor-made for that. `isPending` is broader and does not specifically mean "the data on screen is old query data."
```

#### Notes

Verified from extracted SVG image.

---

### R05-S009 / S-111 - `b643ae1bee`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: infinite query mental model

#### Verified visible text

```text
6) Full mental model

Think of it like this:

- `queryFn({ pageParam })` fetches one page
- returned page is pushed into `data.pages`
- used param is pushed into `data.pageParams`
- `getNextPageParam(...)` looks at the latest data and decides the next param
- if it returns a param, `hasNextPage` is true
- if it returns `undefined`/`null`, `hasNextPage` is false
```

#### Notes

Verified from extracted SVG image.

---

### R05-S010 / S-112 - `41cc77d4c3`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `stage4d-included-source`
- readability: `high`
- cut off: `bottom-slightly-cropped-after-source-chip`
- confidence: `high-for-visible-text-and-code`
- theme: useInfiniteQuery example shape

#### Verified visible text

```text
Example shape:

Important built-in pieces:

- `initialPageParam` is required in v5
- `getNextPageParam` tells React Query what the next cursor/page should be
- fetched pages are stored in `data.pages`
```

#### Verified visible code

```ts
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: ({ pageParam }) => fetchProjects(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})
```

#### Notes

Bottom is slightly cropped after source chip; visible text/code is transcribed.

---

### R05-S011 / S-114 - `38adfee555`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `same-road-continuation`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: useInfiniteQuery data shape: pages and pageParams

#### Verified visible text

```text
`useInfiniteQuery` does not return one flat array. Its `data` shape is:
```

#### Verified visible code

```ts
{
  pages: [...],
  pageParams: [...],
}
```

#### Additional visible text

```text
- `pages` = array of each page result returned by your API
- `pageParams` = array of the page params React Query used to fetch those pages
```

#### Notes

Verified from extracted SVG image. Continues the R05 infinite-query road after S-111/S-112.

---

### R05-S012 / S-115 - `1f0e98522e`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `same-road-continuation`
- readability: `high`
- cut off: `bottom-cropped-code-continues`
- confidence: `high-for-visible-code`
- theme: 19.2 Load more button

#### Verified visible text

```text
19.2 Load more button
```

#### Verified visible code

```ts
function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts()

  const items = data?.pages.flatMap((page) => page.items) ?? []
```

#### Notes

Bottom is cropped after the visible `items` line; visible code is transcribed. Continues R05 infinite-query UI example.

---

### R05-S013 / S-116 - `69bfa97f82`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `same-road-continuation`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: flatten data.pages before rendering

#### Verified visible text

```text
So if your API returned 3 pages, `data.pages` might look like:

That is why the screenshot says to flatten before rendering:

Because usually your UI wants one flat list of items, while React Query stores the data grouped by page.
```

#### Verified visible code

```ts
[
  { items: [{ id: 1 }, { id: 2 }], nextCursor: 2 },
  { items: [{ id: 3 }, { id: 4 }], nextCursor: 4 },
  { items: [{ id: 5 }, { id: 6 }], nextCursor: null },
]

const items = data?.pages.flatMap((page) => page.items) ?? []
```

#### Notes

Verified from extracted SVG image.

---

## 4. Cleaned source notes

- Normal pagination uses page/cursor in the query key and fetches that page in the query function.
- Changing page creates a new query key and can cause UI to bounce while the next page loads.
- `placeholderData: keepPreviousData` keeps the previous page visible while the new key fetches.
- `useTransition` is React scheduling; `keepPreviousData` is TanStack Query data behavior.
- `isPlaceholderData` specifically means the visible data belongs to the previous query result.
- `useInfiniteQuery` is for load-more, infinite scroll, and cursor-based endless lists.
- `useInfiniteQuery` stores pages in `data.pages` and page parameters in `data.pageParams`.
- `getNextPageParam` decides the next cursor/page and whether `hasNextPage` is true.
- `useInfiniteQuery` does not return a flat array; UI usually flattens `data.pages` before rendering.
- `fetchNextPage`, `hasNextPage`, and `isFetchingNextPage` support Load more UI.

---

## 5. Minimal interpretation

R05 explains how React Query handles paginated and infinite data without janky UI. Normal pagination changes the query key. `placeholderData: keepPreviousData` keeps previous data visible, while `useTransition` handles React scheduling. Infinite queries use a different shape: multiple page results in `data.pages`, page parameters in `data.pageParams`, and helpers like `fetchNextPage`. UI usually flattens pages before rendering a single list.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Normal pagination puts page/cursor in `queryKey` and fetches that page in `queryFn` | R05-S001, R05-S002 | extracted SVG image transcript/code | high for visible text |
| Each page is treated as its own cached query entry | R05-S002 | extracted SVG image transcript | high |
| `placeholderData: keepPreviousData` keeps previous page data visible while new page fetches | R05-S003, R05-S005 | extracted SVG image transcript/code | high |
| `useTransition` is React scheduling behavior, not TanStack Query data behavior | R05-S003, R05-S004 | extracted SVG image transcript | high |
| `isPlaceholderData` is more specific than `isPending` for pagination data state | R05-S008 | extracted SVG image transcript | high |
| `useInfiniteQuery` is for load-more/infinite-scroll/cursor endless lists | R05-S007 | extracted SVG image transcript | high |
| Infinite queries provide `data.pages`, `data.pageParams`, page fetching helpers, and page existence flags | R05-S007, R05-S009, R05-S010, R05-S011 | extracted SVG image transcript/code | high |
| `getNextPageParam` decides the next cursor/page and whether `hasNextPage` is true | R05-S009, R05-S010 | extracted SVG image transcript/code | high |
| UI often flattens `data.pages` before rendering | R05-S012, R05-S013 | extracted SVG image transcript/code | high for visible code |

---

## 7. Question hooks

- How does normal pagination with `useQuery` encode the current page?
- Why can changing pages cause jumpy loading UI?
- What does `placeholderData: keepPreviousData` do?
- How is `useTransition` different from `keepPreviousData`?
- Why can `isPlaceholderData` be more precise than `isPending`?
- When should `useInfiniteQuery` be used?
- What are `data.pages` and `data.pageParams`?
- What does `getNextPageParam` decide?
- Why does `useInfiniteQuery` not return one flat array?
- Why do examples flatten `data.pages` before rendering?
- Which helpers support a Load more button?

---

## 8. Open review issues

- `S-080` is bottom-cropped, so only visible text is transcribed.
- `S-115` bottom is cropped after the visible `items` line.
- If a later neighboring-region audit finds another pagination/infinite-query continuation, create R05 v003 correction rather than forcing it into another region.
