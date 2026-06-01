# R05 - Pagination / InfiniteQuery / keepPreviousData side area

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4d / verified region transcript v001**  
Generated: 2026-06-01 20:32:46 UTC

This file covers the R05 area about normal pagination, `placeholderData: keepPreviousData`, `useTransition`, and `useInfiniteQuery`.

---

## Direction check

Goal:
Convert `react-query,rquery` into source-preserving region text for AI repetition.

Now:
R10/R07/R06 have been processed or prepared; R05 is the next compact region extracted from the same full SVG.

This step:
Create the first real R05 transcript from 10 extracted SVG images.

Why:
R05 explains pagination and infinite query behavior, which complements R07's placeholderData/prefetch notes.

Next:
1. review R05 diff; 2. correct transcript errors if any; 3. continue to the next region.

---

## 0. You are here

Current region: `R05 - Pagination / InfiniteQuery / keepPreviousData side area`  
Status: `verified transcript from extracted SVG images`  
Source count: `10`  
Known limitations: `S-080` is bottom-cropped; `S-094` and `S-112` have slight bottom cropping after source chips.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
This region explains React Query pagination patterns:
- normal page/cursor pagination with `useQuery`;
- why changing query keys can cause jumpy loading UI;
- `placeholderData: keepPreviousData` as lagged pagination behavior;
- how that differs from React `useTransition`;
- why `isPlaceholderData` can be more specific than a manual `isPending`;
- `useInfiniteQuery` for load-more, infinite scroll, and cursor-based lists;
- the mental model of `data.pages`, `data.pageParams`, and `getNextPageParam`.
```

Key ideas:

```text
1. Normal pagination uses page/cursor as part of the `queryKey`.
2. A new page means a new query key and can bounce the UI between states.
3. `placeholderData: keepPreviousData` keeps previous data visible while the next page loads.
4. `useTransition` is about React scheduling; it does not mean the data itself is placeholder query data.
5. `isPlaceholderData` is query-specific and can guide pagination controls.
6. `useInfiniteQuery` is the built-in API for endless/cursor pagination.
7. Infinite queries collect pages in `data.pages` and params in `data.pageParams`.
```

How well I perceived the area:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high for visible code blocks.
Spatial/layout understanding: medium-high; the region is split into left/right topic columns.
```

Reading limitations:

```text
S-080 is bottom-cropped.
S-094 and S-112 are slightly cropped after source chips, but the main text/code is readable.
Source chips and UI copy buttons were omitted unless content-bearing.
```

Confidence:

```text
High for pagination / keepPreviousData / useTransition distinction.
High for useInfiniteQuery mental model and visible code.
Medium for the missing bottom continuation in S-080.
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

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| R05-S001 | S-080 | IU-080 | `0871bd898b` | `verified-visible-partial-from-extracted-svg-image` | yes-bottom-cropped | normal pagination with useQuery intro |
| R05-S002 | S-083 | IU-083 | `e3c0a532d3` | `verified-from-extracted-svg-image` | no | docs pattern for paginated useQuery |
| R05-S003 | S-085 | IU-085 | `bc3e0aa237` | `verified-from-extracted-svg-image` | no | placeholderData keepPreviousData vs useTransition |
| R05-S004 | S-093 | IU-093 | `c8cc88b3af` | `verified-from-extracted-svg-image` | no | biggest difference between useTransition and keepPreviousData |
| R05-S005 | S-094 | IU-094 | `975b593423` | `verified-from-extracted-svg-image` | bottom-slightly-cropped-after-source-chip | built-in fix with placeholderData keepPreviousData |
| R05-S006 | S-101 | IU-101 | `4c44fb1d2a` | `verified-from-extracted-svg-image` | no | why use both keepPreviousData and useTransition |
| R05-S007 | S-106 | IU-106 | `fc61dcb8e6` | `verified-from-extracted-svg-image` | no | infinite pagination with useInfiniteQuery |
| R05-S008 | S-108 | IU-108 | `728900c573` | `verified-from-extracted-svg-image` | no | isPlaceholderData vs manual isPending |
| R05-S009 | S-111 | IU-111 | `b643ae1bee` | `verified-from-extracted-svg-image` | no | infinite query mental model |
| R05-S010 | S-112 | IU-112 | `41cc77d4c3` | `verified-from-extracted-svg-image` | bottom-slightly-cropped-after-source-chip | useInfiniteQuery example shape |

---

## 3. Source transcript

### R05-S001 / S-080 - `0871bd898b`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
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

## 4. Cleaned source notes

These notes are cleaned from the verified transcript above; they do not add external React Query material.

- Normal pagination uses a page/cursor in the query key and fetches that page in the query function.
- Each page is treated as its own cached query entry.
- Changing from page 1 to page 2 creates a new query key, so UI can bounce while the next page loads.
- `placeholderData: keepPreviousData` keeps the previous page visible while the new page fetches.
- In v5, this is the replacement for the old `keepPreviousData` option.
- `useTransition` keeps rendering responsive by making updates non-blocking; it is not query data semantics.
- `isPlaceholderData` specifically means the visible data belongs to the previous query result for the current key transition.
- `useInfiniteQuery` is used for load-more, infinite scroll, and cursor-based endless lists.
- `useInfiniteQuery` provides `data.pages`, `data.pageParams`, `fetchNextPage`, `fetchPreviousPage`, `hasNextPage`, and `hasPreviousPage`.
- `getNextPageParam` decides whether another page exists and what parameter should be used.

---

## 5. Minimal interpretation

R05 is about handling paginated data without janky UI. Normal `useQuery` pagination works by changing query keys, but this can produce visible loading flicker. `placeholderData: keepPreviousData` keeps old page data visible while the new key fetches. `useTransition` can also help UI responsiveness, but it solves a different React scheduling problem. For endless/cursor lists, `useInfiniteQuery` manages page arrays, page params, and next/previous page helpers.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Normal pagination puts page/cursor in `queryKey` and fetches that page in `queryFn` | R05-S001, R05-S002 | extracted SVG image transcript/code | high for visible text |
| Each page is treated as its own cached query entry | R05-S002 | extracted SVG image transcript | high |
| Moving to another page can bounce UI between success and pending | R05-S002 | extracted SVG image transcript | high |
| `placeholderData: keepPreviousData` keeps previous page data visible while new page fetches | R05-S003, R05-S005 | extracted SVG image transcript/code | high |
| `useTransition` is React scheduling behavior, not TanStack Query data behavior | R05-S003, R05-S004 | extracted SVG image transcript | high |
| `isPlaceholderData` is more specific than `isPending` for pagination data state | R05-S008 | extracted SVG image transcript | high |
| `useInfiniteQuery` is for load-more/infinite-scroll/cursor endless lists | R05-S007 | extracted SVG image transcript | high |
| Infinite queries provide `data.pages`, `data.pageParams`, page fetching helpers, and page existence flags | R05-S007, R05-S009, R05-S010 | extracted SVG image transcript/code | high |
| `getNextPageParam` decides the next cursor/page and whether `hasNextPage` is true | R05-S009, R05-S010 | extracted SVG image transcript/code | high |

---

## 7. Question hooks

- How does normal pagination with `useQuery` encode the current page?
- Why is each page treated as its own cached query entry?
- Why can changing pages cause jumpy loading UI?
- What does `placeholderData: keepPreviousData` do for paginated queries?
- In v5, what replaces the old `keepPreviousData` option?
- How is `useTransition` different from `placeholderData: keepPreviousData`?
- Why can `isPlaceholderData` be more useful than a manual `isPending` for pagination?
- When should `useInfiniteQuery` be used instead of normal `useQuery` pagination?
- What are `data.pages` and `data.pageParams`?
- What does `getNextPageParam` decide?

---

## 8. Open review issues

- `S-080` is bottom-cropped, so only visible text is transcribed.
- `S-094` and `S-112` are slightly cropped after the source chips; main text/code is readable.
- Source chips and copy-button UI are omitted unless content-bearing.
