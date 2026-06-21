# R08A - QueryClient / QueryFilters / core methods

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4k / verified region transcript v001**  
Generated: 2026-06-01 22:21:09 UTC

This file covers the first R08 sub-pass: QueryClient, QueryFilters, and core methods. It does not complete all R08; R08B/R08C/R08D remain pending.

---

## Direction check

Goal:
Process R08 without losing images by splitting the large QueryClient/methods area into smaller boundary-reviewed passes.

Now:
R08 boundary review found 51 coordinate candidates and split them into R08A/R08B/R08C/R08D.

This step:
Create R08A transcript for QueryClient / QueryFilters / core methods from 17 included sources.

Why:
R08A is coherent and contains the QueryClient/methods column reserved during R07 audit. R08B/R08C are separate enough to keep pending.

Next:
1. review R08A diff; 2. commit; 3. process R08B or R08C with a fresh local boundary review.

---

## 0. You are here

Current region: `R08A - QueryClient / QueryFilters / core methods`  
Status: `verified transcript from extracted SVG images`  
Included source count: `17`  
Known limitations: minor crop/overlay only; no known content loss in included sources.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- useQueryClient and QueryClient imperative cache access
- QueryClient methods such as invalidateQueries, setQueryData, getQueryData, prefetchQuery, removeQueries, resetQueries
- QueryFilters as reusable match criteria across QueryClient methods
- queryKey prefix/exact matching, active/inactive/all type filtering, stale and fetchStatus filters, and predicate final filtering
```

Key ideas:

- useQueryClient returns the current QueryClient from the nearest QueryClientProvider.
- QueryClient is used when code needs imperative cache/query operations.
- QueryFilters decide which queries match; the method decides what action to perform.
- queryKey matching is prefix-based unless exact: true is set.
- type filters active/inactive/all queries based on observer/subscriber state.
- stale and fetchStatus narrow matches by staleness/fetch state.
- predicate is the final flexible filter.
- invalidateQueries marks matches stale and usually refetches active matches.
- setQueryData updates cache synchronously and immutably.
- getQueryData/getQueriesData/getQueryState read cached data synchronously.
- prefetchQuery loads data before render/navigation without returning data to the caller.
- removeQueries/resetQueries clear or reset matching cached queries.

Reading quality:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after R08 boundary review and local R08A check.
Limitations: S-124 has cropped continuation, continued by S-138; S-151 slight top crop; S-173/S-183/S-185 bottom overlays without obvious text loss.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-123, S-124, S-125, S-138, S-139, S-144, S-151, S-154, S-158, S-161, S-164, S-168, S-173, S-177, S-183, S-185, S-206
```

Reserved for later R08B:

```text
S-129, S-134, S-143, S-147, S-153, S-167, S-169, S-175, S-178, S-182, S-190, S-191, S-193, S-197, S-198, S-200, S-204, S-207, S-212, S-216, S-219
```

Reserved for later R08C:

```text
S-127, S-133, S-135, S-141, S-149, S-155, S-160, S-170, S-179, S-187
```

Reserved for R08D or neighboring later review:

```text
S-194, S-221
```

Checked/excluded overlap:

```text
S-184, S-186 -> already processed in R07 v004; not R08A.
```

Boundary decision:

```text
R08A is one coherent sub-block inside a 51-candidate R08 area.
This transcript does not claim all R08 is complete.
R08B/R08C/R08D remain pending and must be processed with their own local boundary checks.
```

---

## 1. Original Excalidraw labels / topic anchors

```text
QUERYCLIENT
QUERY FILTERS
METHODS OF QC
get queries
refetch type VS filters type of invalidate queries
CANCELOPTIONS
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R08A-S001 | S-123 | IU-123 | `89aca4f37a` | `r08a-queryfilters-core` | `verified-from-extracted-svg-image` | no | Main QueryFilters fields: queryKey prefix matching |
| R08A-S002 | S-124 | IU-124 | `4f1b873c49` | `r08a-queryclient-intro` | `verified-from-extracted-svg-image` | right-bottom-continuation-cropped | useQueryClient gives current QueryClient instance |
| R08A-S003 | S-125 | IU-125 | `730d9b1236` | `r08a-queryclient-methods-heading` | `verified-from-extracted-svg-image` | no | QueryClient methods: what they take and do |
| R08A-S004 | S-138 | IU-138 | `01111ee2eb` | `r08a-queryclient-intro-continuation` | `verified-from-extracted-svg-image` | no | useQueryClient import and call |
| R08A-S005 | S-139 | IU-139 | `c3f45a9f79` | `r08a-queryfilters-exact` | `verified-from-extracted-svg-image` | no | QueryFilters exact matching |
| R08A-S006 | S-144 | IU-144 | `a6832a1bc1` | `r08a-usequeryclient-when-needed` | `verified-from-extracted-svg-image` | no | When useQueryClient may be needed |
| R08A-S007 | S-151 | IU-151 | `3b50c6200c` | `r08a-queryfilters-type` | `verified-from-extracted-svg-image` | slight-top-crop-title-visible | QueryFilters type: active/inactive/all |
| R08A-S008 | S-154 | IU-154 | `32c48060b8` | `r08a-queryclient-method-invalidate` | `verified-from-extracted-svg-image` | no | invalidateQueries |
| R08A-S009 | S-158 | IU-158 | `d4dd4f4a1e` | `r08a-queryclient-read-cache-summary` | `verified-from-extracted-svg-image` | no | Read cache synchronously: getQueryData/getQueriesData/getQueryState |
| R08A-S010 | S-161 | IU-161 | `53f93b6919` | `r08a-queryfilters-stale` | `verified-from-extracted-svg-image` | no | QueryFilters stale |
| R08A-S011 | S-164 | IU-164 | `f514209027` | `r08a-queryclient-method-setquerydata` | `verified-from-extracted-svg-image` | no | setQueryData update cache directly |
| R08A-S012 | S-168 | IU-168 | `2702832cda` | `r08a-queryfilters-fetchstatus` | `verified-from-extracted-svg-image` | no | QueryFilters fetchStatus |
| R08A-S013 | S-173 | IU-173 | `8840240941` | `r08a-queryclient-read-prefetch` | `verified-visible-partial-from-extracted-svg-image` | bottom-overlay-no-obvious-text-loss | getQueryData and prefetchQuery |
| R08A-S014 | S-177 | IU-177 | `3c56741074` | `r08a-queryfilters-predicate` | `verified-from-extracted-svg-image` | no | QueryFilters predicate |
| R08A-S015 | S-183 | IU-183 | `27e50ec60e` | `r08a-queryfilters-important-idea` | `verified-from-extracted-svg-image` | bottom-overlay-no-text-loss | Important idea: filters match queries, methods choose action |
| R08A-S016 | S-185 | IU-185 | `625ee2c8c4` | `r08a-queryfilters-pattern-reuse` | `verified-visible-partial-from-extracted-svg-image` | bottom-overlay-no-obvious-text-loss | Same filter object pattern reused across methods |
| R08A-S017 | S-206 | IU-206 | `8ef8d853c6` | `r08a-queryclient-remove-reset` | `verified-from-extracted-svg-image` | no | removeQueries and resetQueries |

---

## 3. Source transcript

### R08A-S001 / S-123 - `89aca4f37a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-core`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Main QueryFilters fields: queryKey prefix matching

#### Verified visible text

```text
Main QueryFilters fields

queryKey

Match queries by key prefix, unless `exact: true` is also set.

This matches:

- `['todos']`
- `['todos', 1]`
- `['todos', { page: 1 }]`

unless you require exact matching.
```

#### Verified visible code

```ts
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S002 / S-124 - `4f1b873c49`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-intro`
- readability: `high`
- cut_off: `right-bottom-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: useQueryClient gives current QueryClient instance

#### Verified visible text

```text
`useQueryClient()` gives you the current `QueryClient` instance from React Query context. That instance is the central object that manages the query cache and lets you interact with queries imperatively.

What it is

Usually you use declarative hooks like:

But sometimes inside a component or custom hook you need to do something manually with the cache or queries. That is when you call:
```

#### Verified visible code

```ts
const query = useQuery(...)
const mutation = useMutation(...)
```

#### Notes

Bottom continuation after 'that is when you call:' is cropped; next related image S-138 gives the call.

---

### R08A-S003 / S-125 - `730d9b1236`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-methods-heading`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: QueryClient methods: what they take and do

#### Verified visible text

```text
2) QueryClient methods: what they take and what they do

`useQueryClient()` gives you the current `QueryClient` from context. Outside React, you use the `QueryClient` instance directly.

Here's the practical map.
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S004 / S-138 - `01111ee2eb`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-intro-continuation`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: useQueryClient import and call

#### Verified visible text

```text
By default it returns the `QueryClient` from the nearest `QueryClientProvider`.
```

#### Verified visible code

```ts
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()
```

#### Notes

Continuation of S-124.

---

### R08A-S005 / S-139 - `c3f45a9f79`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-exact`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: QueryFilters exact matching

#### Verified visible text

```text
exact

Makes key matching exact instead of prefix-based.

This matches only:

- `['todos']`

and not:

- `['todos', 1]`
```

#### Verified visible code

```ts
queryClient.invalidateQueries({
  queryKey: ['todos'],
  exact: true,
})
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S006 / S-144 - `a6832a1bc1`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-usequeryclient-when-needed`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: When useQueryClient may be needed

#### Verified visible text

```text
When you may need it

You use `useQueryClient()` when you want to do something imperative, for example:

- mark some queries stale after a mutation
- manually update cached data
- read cached data synchronously
- prefetch data before navigation
- cancel an in-flight query
- remove/reset/refetch matching queries

This is why you often see it next to `useMutation`. After a successful mutation, you often invalidate or update related queries through the client. The TanStack quick start shows this exact pattern.
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S007 / S-151 - `3b50c6200c`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-type`
- readability: `high`
- cut_off: `slight-top-crop-title-visible`
- confidence: `high-for-visible-text`
- theme: QueryFilters type: active/inactive/all

#### Verified visible text

```text
type

Filters by whether a query is active or inactive.

Possible values:

- `active`
- `inactive`
- `all`

Meaning:

- active = has at least one observer/subscriber
- inactive = in cache but currently no active observers
- all = both

Example:

Only active queries will be matched.
```

#### Verified visible code

```ts
queryClient.refetchQueries({ type: 'active' })
```

#### Notes

Top is slightly cropped but title and text are readable.

---

### R08A-S008 / S-154 - `32c48060b8`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-method-invalidate`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: invalidateQueries

#### Verified visible text

```text
1. Invalidate queries

Use when the server data probably changed and you want related queries marked stale and usually refetched.

`invalidateQueries` marks matching queries stale and, by default, refetches active ones in the background.
```

#### Verified visible code

```ts
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S009 / S-158 - `d4dd4f4a1e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-read-cache-summary`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Read cache synchronously: getQueryData/getQueriesData/getQueryState

#### Verified visible text

```text
Read cache synchronously

`getQueryData(queryKey)`

Returns cached data for one query or `undefined`.

`getQueriesData(filters)`

Returns an array of tuples: `[queryKey, data]` for all matching queries. Takes `QueryFilters`.

`getQueryState(queryKey)`

Returns the full cached query state or `undefined`. Useful for `dataUpdatedAt`, status, etc.
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S010 / S-161 - `53f93b6919`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-stale`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: QueryFilters stale

#### Verified visible text

```text
stale

Filter by staleness.

Matches only stale queries.
```

#### Verified visible code

```ts
queryClient.refetchQueries({ stale: true })
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S011 / S-164 - `f514209027`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-method-setquerydata`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: setQueryData update cache directly

#### Verified visible text

```text
2. Update cache directly with `setQueryData`

Use when you already know the new data and want the UI to update immediately.

or:

`setQueryData` is synchronous and should be done immutably. If the query doesn't exist, it will be created in the cache.
```

#### Verified visible code

```ts
queryClient.setQueryData(['todo', id], updatedTodo)

queryClient.setQueryData(['todos'], (old) =>
  old?.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
)
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S012 / S-168 - `2702832cda`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-fetchstatus`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: QueryFilters fetchStatus

#### Verified visible text

```text
fetchStatus

Filter by current fetch status.

Possible values are based on query fetch status:

- `fetching`
- `paused`
- `idle`

Example:

Matches only queries currently fetching.
```

#### Verified visible code

```ts
queryClient.cancelQueries({ fetchStatus: 'fetching' })
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S013 / S-173 - `8840240941`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-read-prefetch`
- readability: `high`
- cut_off: `bottom-overlay-no-obvious-text-loss`
- confidence: `high-for-visible-text`
- theme: getQueryData and prefetchQuery

#### Verified visible text

```text
3. Read cached data with `getQueryData`

Use when you want to synchronously peek at what is already in cache.

If the query isn't in cache, it returns `undefined`.

4. Prefetch data

Use when you want data loaded before a screen renders.

This fetches and caches the query ahead of time but does not return the data to you.
```

#### Verified visible code

```ts
const todo = queryClient.getQueryData(['todo', id])

await queryClient.prefetchQuery({
  queryKey: ['todo', id],
  queryFn: () => fetchTodo(id),
})
```

#### Notes

Bottom UI overlay visible, but text is readable.

---

### R08A-S014 / S-177 - `3c56741074`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-predicate`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: QueryFilters predicate

#### Verified visible text

```text
predicate

A custom function for final filtering.

This gives you the most flexibility when the built-in filters are not enough. The docs describe `predicate` as a final filter applied to each query; if no other filters are specified, it runs against all queries.
```

#### Verified visible code

```ts
queryClient.invalidateQueries({
  predicate: (query) => query.queryKey[0] === 'todos',
})
```

#### Notes

Verified from extracted SVG image.

---

### R08A-S015 / S-183 - `27e50ec60e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-important-idea`
- readability: `high`
- cut_off: `bottom-overlay-no-text-loss`
- confidence: `high`
- theme: Important idea: filters match queries, methods choose action

#### Verified visible text

```text
Important idea

These filters do not themselves say what action to take.

They only say which queries match.
```

#### Notes

Bottom UI overlay visible, no text loss.

---

### R08A-S016 / S-185 - `625ee2c8c4`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08a-queryfilters-pattern-reuse`
- readability: `high`
- cut_off: `bottom-overlay-no-obvious-text-loss`
- confidence: `high-for-visible-text`
- theme: Same filter object pattern reused across methods

#### Verified visible text

```text
For example:

means:

- first find matching queries using the filters
- then run invalidate on those matched queries

while:

means:

- find inactive `todos` queries
- then remove them

So the same filter object pattern is reused across many methods.
```

#### Verified visible code

```ts
queryClient.invalidateQueries({ queryKey: ['todos'], stale: true })

queryClient.removeQueries({ queryKey: ['todos'], type: 'inactive' })
```

#### Notes

Bottom UI overlay visible, but content is readable.

---

### R08A-S017 / S-206 - `8ef8d853c6`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08a-queryclient-remove-reset`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: removeQueries and resetQueries

#### Verified visible text

```text
8. Remove or reset queries

Useful if you want to clear cached entries or reset them.

These are also methods on `QueryClient`.
```

#### Verified visible code

```ts
queryClient.removeQueries({ queryKey: ['todos'] })
queryClient.resetQueries({ queryKey: ['todos'] })
```

#### Notes

Verified from extracted SVG image.

---

## 4. Cleaned source notes

- QueryClient is the imperative API for reading and modifying query cache state.
- useQueryClient returns the QueryClient from the nearest QueryClientProvider.
- Use QueryClient when you need imperative operations: invalidate, update, read, prefetch, cancel, remove, reset, or refetch matching queries.
- QueryFilters are reusable match objects used by many QueryClient methods.
- queryKey filters match by prefix unless exact: true is supplied.
- type filters active/inactive/all based on observer/subscriber state.
- stale filters stale queries; fetchStatus filters fetching/paused/idle queries.
- predicate is a final custom filter for cases where built-in filters are not enough.
- Filters only decide which queries match; the QueryClient method decides the action.
- invalidateQueries marks matches stale and usually refetches active matches.
- setQueryData synchronously updates cache and must be done immutably.
- getQueryData/getQueriesData/getQueryState synchronously read cached data/state.
- prefetchQuery fetches and caches ahead of time without returning data to the caller.
- removeQueries/resetQueries clear or reset matching cached queries.

---

## 5. Minimal interpretation

R08A explains the QueryClient as the imperative layer for query cache operations. QueryFilters are reusable match criteria: they identify which queries match by key, type, staleness, fetch status, or predicate. The method then decides the action: invalidate, refetch, cancel, read, update, prefetch, remove, or reset. The key mental split is: filters match queries; QueryClient methods perform actions on those matched queries.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| useQueryClient gives access to the current QueryClient instance | R08A-S002, R08A-S004 | extracted SVG image transcript/code | high |
| QueryClient is used for imperative cache/query operations | R08A-S002, R08A-S006 | extracted SVG image transcript | high |
| queryKey filters are prefix-based unless exact: true is set | R08A-S001, R08A-S005 | extracted SVG image transcript/code | high |
| type filters active/inactive/all queries | R08A-S007 | extracted SVG image transcript/code | high |
| stale and fetchStatus filters narrow matching queries | R08A-S010, R08A-S012 | extracted SVG image transcript/code | high |
| predicate is a final flexible filter | R08A-S014 | extracted SVG image transcript/code | high |
| filters only say which queries match | R08A-S015, R08A-S016 | extracted SVG image transcript/code | high |
| invalidateQueries marks matches stale and refetches active ones by default | R08A-S008 | extracted SVG image transcript/code | high |
| setQueryData updates cache synchronously and immutably | R08A-S011 | extracted SVG image transcript/code | high |
| getQueryData/getQueriesData/getQueryState read cache synchronously | R08A-S009, R08A-S013 | extracted SVG image transcript/code | high |
| prefetchQuery fetches and caches ahead of time without returning data | R08A-S013 | extracted SVG image transcript/code | high |
| removeQueries/resetQueries clear or reset cached entries | R08A-S017 | extracted SVG image transcript/code | high |

---

## 7. Question hooks

- What does useQueryClient return?
- When do you need QueryClient instead of only useQuery/useMutation?
- What is the difference between QueryFilters and QueryClient methods?
- How does queryKey prefix matching work?
- What does exact: true change?
- What is the difference between active, inactive, and all query filters?
- What does stale: true match?
- What does fetchStatus: 'fetching' match?
- When would predicate be useful?
- What does invalidateQueries do by default?
- How should setQueryData be used?
- What is the difference between getQueryData, getQueriesData, and getQueryState?
- Why does prefetchQuery not return the data to you?
- What do removeQueries and resetQueries do?

---

## 8. Open review issues

- R08A is complete for the reviewed QueryClient / QueryFilters / core methods sub-block.
- R08B/R08C/R08D are not complete and must be processed separately.
- If a later R08B/R08C pass finds a source that belongs back in R08A, create R08A v002 correction instead of hiding it in the later pass.
