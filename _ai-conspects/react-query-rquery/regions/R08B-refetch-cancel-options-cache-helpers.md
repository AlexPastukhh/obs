# R08B - Refetch / cancel options / cache helpers

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4l / verified region transcript v001**  
Generated: 2026-06-01 22:36:10 UTC

This file covers the second R08 sub-pass: refetch/cancel/options/cache helpers. It does not complete all R08; R08C remains pending.

---

## Direction check

Goal:
Continue R08 in safe sub-passes without losing images.

Done:
R08A v001 completed QueryClient / QueryFilters / core methods.

Now:
Create R08B transcript for fetch/prefetch/ensure, getQueriesData/setQueriesData, invalidate/refetch/cancel/remove/reset, optimistic cancellation helpers, low-level cache helpers, and resumePausedMutations.

Why:
These sources continue QueryClient methods but form a distinct refetch/cancel/cache-helper road; R08C stays separate.

Next:
1. review R08B diff; 2. commit; 3. process R08C QueryClient outside React / shape discipline.

---

## 0. You are here

Current region: `R08B - Refetch / cancel options / cache helpers`  
Status: `verified transcript from extracted SVG images`  
Included source count: `23`  
Known limitations: minor bottom crops only; no known content loss for core ideas.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- imperative fetch/prefetch/ensure methods on QueryClient
- reading and writing multiple cached queries
- invalidating, refetching, canceling, removing, resetting, and clearing queries
- refetchType versus QueryFilters type
- cancelQueries and CancelOptions in optimistic updates
- status helper counters and default/config methods
- low-level cache helpers getQueryCache/getMutationCache and resumePausedMutations
```

Key ideas:

- fetchQuery returns data or throws; prefetchQuery warms cache and returns void.
- ensureQueryData returns cached data if present, otherwise fetches it.
- getQueriesData returns [queryKey, data] tuples for matching queries.
- setQueriesData updates existing matching queries but does not create missing cache entries.
- invalidateQueries selects matching queries with filters, then refetchType decides which matched queries refetch immediately.
- cancelQueries is important before optimistic writes so old in-flight refetches do not overwrite optimistic cache data.
- CancelOptions silent controls noise; revert controls whether state rolls back to the pre-fetch state.
- refetchQueries actively reruns matching queries now; invalidation only marks stale and may refetch depending on refetchType.
- removeQueries removes matching cache entries; resetQueries resets to initial state; clear clears connected caches.
- isFetching/isMutating return counts for current query/mutation activity.
- QueryClient default/config methods can set defaults globally or per query/mutation key.
- getQueryCache/getMutationCache expose low-level connected caches.
- resumePausedMutations is for offline/persisted mutation workflows.

Reading quality:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after local R08B review.
Limitations: S-169 only shows the start of an Example section; S-198's example is cropped but S-207 contains the full visible code example.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-129, S-134, S-143, S-147, S-153, S-167, S-169, S-175, S-178, S-182, S-190, S-191, S-193, S-194, S-197, S-198, S-200, S-204, S-207, S-212, S-216, S-219, S-221
```

Already completed R08A context:
```text
S-123, S-124, S-125, S-138, S-139, S-144, S-151, S-154, S-158, S-161, S-164, S-168, S-173, S-177, S-183, S-185, S-206
```

Reserved for later R08C:
```text
S-127, S-133, S-135, S-141, S-149, S-155, S-160, S-170, S-179, S-187
```

Checked/excluded overlap:
```text
S-184, S-186 -> already processed in R07 v004; not R08B.
```

Boundary delta from Stage4j:
```text
S-194 and S-221 were previously kept as R08D/or-neighbor candidates.
Local R08B semantic review moved them into R08B:
- S-194 is direct cancel/refetch QueryClient method content.
- S-221 continues low-level QueryClient helper methods via resumePausedMutations.
```

Boundary decision:
```text
R08B is complete for the reviewed refetch/cancel/options/cache-helper sub-block.
R08C remains pending and must be processed with its own local boundary review.
```

---

## 1. Original Excalidraw labels / topic anchors

```text
METHODS OF QC
get queries
refetch type VS filters type of invalidate queries
CANCELOPTIONS
CANCELQUERIES IN OPTIMISTIC UPDATES PATTERN
JUST SET SILENT ABD REVERT TRUE ALWAYS
REMOVEQUERIES RESETQUERIES
OFFLINE FIRST CAN TRY TO GET DATA UNTIL IT NEED RETRIES RETRIES WILL BE QUEUED CAN TRY TO GET DATA FROM CACHE
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R08B-S001 | S-129 | IU-129 | `fc2d174df6` | `r08b-getqueriesdata-example` | `verified-from-extracted-svg-image` | no | getQueriesData example: read all matching todos queries |
| R08B-S002 | S-134 | IU-134 | `30bdec4695` | `r08b-fetch-prefetch` | `verified-from-extracted-svg-image` | no | fetchQuery options and behavior |
| R08B-S003 | S-143 | IU-143 | `81cc0883ba` | `r08b-getqueriesdata-output` | `verified-from-extracted-svg-image` | no | getQueriesData returns tuples |
| R08B-S004 | S-147 | IU-147 | `8578a757ff` | `r08b-fetch-prefetch-ensure-family` | `verified-from-extracted-svg-image` | no | fetchInfiniteQuery, prefetchQuery, ensureQueryData family |
| R08B-S005 | S-153 | IU-153 | `b9490025be` | `r08b-setqueriesdata-example` | `verified-from-extracted-svg-image` | no | setQueriesData example: update all existing todos lists |
| R08B-S006 | S-167 | IU-167 | `4fc2178dca` | `r08b-write-cache-synchronously` | `verified-from-extracted-svg-image` | no | setQueryData and setQueriesData write cache synchronously |
| R08B-S007 | S-169 | IU-169 | `4a083521f3` | `r08b-invalidate-refetchtype` | `verified-visible-partial-from-extracted-svg-image` | bottom-start-of-example-cropped | refetchType in invalidateQueries |
| R08B-S008 | S-175 | IU-175 | `71e000a8c4` | `r08b-invalidatequeries-signature` | `verified-from-extracted-svg-image` | no | invalidateQueries filters and refetchType |
| R08B-S009 | S-178 | IU-178 | `511b7bdef1` | `r08b-type-vs-refetchtype` | `verified-from-extracted-svg-image` | no | type filter versus refetchType |
| R08B-S010 | S-182 | IU-182 | `1b495c7744` | `r08b-refetchqueries-options` | `verified-from-extracted-svg-image` | no | refetchQueries options and notes |
| R08B-S011 | S-190 | IU-190 | `11e2c7d93f` | `r08b-cancel-remove-reset-clear` | `verified-from-extracted-svg-image` | no | cancelQueries, removeQueries, resetQueries, clear |
| R08B-S012 | S-191 | IU-191 | `5bec075fe3` | `r08b-cancelqueries-optimistic-why` | `verified-from-extracted-svg-image` | no | why cancelQueries matters in optimistic updates |
| R08B-S013 | S-193 | IU-193 | `9625ff3c1f` | `r08b-canceloptions` | `verified-from-extracted-svg-image` | no | CancelOptions silent/revert |
| R08B-S014 | S-194 | IU-194 | `6401d2ad9e` | `r08b-cancel-refetch-basic-methods` | `verified-from-extracted-svg-image` | no | cancelQueries and refetchQueries basic examples |
| R08B-S015 | S-197 | IU-197 | `75a0c9e06f` | `r08b-status-helpers` | `verified-from-extracted-svg-image` | no | isFetching and isMutating status helpers |
| R08B-S016 | S-198 | IU-198 | `f128bccab6` | `r08b-optimistic-flow` | `verified-visible-partial-from-extracted-svg-image` | bottom-example-cropped | standard optimistic update flow with cancelQueries |
| R08B-S017 | S-200 | IU-200 | `6ce7aeccdc` | `r08b-cancel-revert-true` | `verified-from-extracted-svg-image` | no | revert true behavior and why preferred |
| R08B-S018 | S-204 | IU-204 | `a00c2c49ff` | `r08b-defaults-config` | `verified-from-extracted-svg-image` | no | QueryClient defaults/config methods |
| R08B-S019 | S-207 | IU-207 | `55a51e51f4` | `r08b-optimistic-update-code-example` | `verified-from-extracted-svg-image` | no | optimistic update code example with cancelQueries |
| R08B-S020 | S-212 | IU-212 | `13b08c1aea` | `r08b-low-level-cache-access-summary` | `verified-from-extracted-svg-image` | no | low-level cache access and resumePausedMutations summary |
| R08B-S021 | S-216 | IU-216 | `97e37315a6` | `r08b-getquerycache-details` | `verified-from-extracted-svg-image` | no | getQueryCache low-level store details |
| R08B-S022 | S-219 | IU-219 | `850109ec0c` | `r08b-v5-optimistic-update-callback-placement` | `verified-from-extracted-svg-image` | no | v5 removed useQuery callbacks; cancellation handled in mutation flow |
| R08B-S023 | S-221 | IU-221 | `e79f52ad22` | `r08b-resumepausedmutations-details` | `verified-from-extracted-svg-image` | no | resumePausedMutations offline workflow |

---

## 3. Source transcript

### R08B-S001 / S-129 - `fc2d174df6`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-getqueriesdata-example`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: getQueriesData example: read all matching todos queries

#### Verified visible text

```text
`getQueriesData` example

Imagine you have these queries in cache:

You can read all cached `todos` queries like this:
```

#### Verified visible code

```ts
['todos']
['todos', { status: 'done' }]
['todos', { status: 'open' }]
['users']

const entries = queryClient.getQueriesData({ queryKey: ['todos'] })

console.log(entries)
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S002 / S-134 - `30bdec4695`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-fetch-prefetch`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: fetchQuery options and behavior

#### Verified visible text

```text
Fetch / prefetch

`fetchQuery(options)`

Imperatively fetches and caches one query; resolves with data or throws on error. If cache data is still fresh enough for the passed `staleTime`, it returns cached data instead of fetching. Its options are the same as `useQuery` options except options that are observer-only, such as `enabled`, refetch-on-focus/mount/reconnect, `refetchInterval`, `notifyOnChangeProps`, `select`, `placeholderData`, `suspense`, and `throwOnError`.

Typical args:

- `queryKey`
- `queryFn`
- optional fetch/query options like `staleTime`, `gcTime`, `retry`, `networkMode`, `meta` etc. via query options support.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S003 / S-143 - `81cc0883ba`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-getqueriesdata-output`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: getQueriesData returns tuples

#### Verified visible text

```text
You get an array of tuples:

That is exactly what the docs describe: an array of `[queryKey, data]` tuples for all matching queries, or `[]` if none match.
```

#### Verified visible code

```ts
[
  [['todos'], allTodos],
  [['todos', { status: 'done' }], doneTodos],
  [['todos', { status: 'open' }], openTodos],
]
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S004 / S-147 - `8578a757ff`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-fetch-prefetch-ensure-family`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: fetchInfiniteQuery, prefetchQuery, ensureQueryData family

#### Verified visible text

```text
`fetchInfiniteQuery(options)`

Same idea for infinite queries; returns `InfiniteData`. Same options shape as `fetchQuery`.

`prefetchQuery(options)`

Same options as `fetchQuery`, but returns `Promise<void>`, does not return data, and does not throw. Good for hover/router preloading.

`prefetchInfiniteQuery(options)`

Infinite-query version of `prefetchQuery`. For prefetching more than one page, the prefetch guide shows `pages` plus `getNextPageParam`.

`ensureQueryData(options & { revalidateIfStale?: boolean })`

Returns cached data if present; otherwise fetches it. `revalidateIfStale: true` means return stale cached data immediately and refetch in background.

`ensureInfiniteQueryData(options & { revalidateIfStale?: boolean })`

Same idea for infinite queries.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S005 / S-153 - `b9490025be`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-setqueriesdata-example`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: setQueriesData example: update all existing todos lists

#### Verified visible text

```text
`setQueriesData` example

Say a todo was edited, and you want to update every cached todos list that already exists:

This will update all existing queries whose key matches `['todos']`, such as:

- `['todos']`
- `['todos', { status: 'done' }]`
- `['todos', { status: 'open' }]`

but it will not create any missing queries in cache. The docs explicitly call out that `setQueriesData` only updates existing matching queries and calls `setQueryData` under the hood for each one.
```

#### Verified visible code

```ts
const updatedTodo = { id: 5, title: 'New title', completed: true }

queryClient.setQueriesData(
  { queryKey: ['todos'] },
  (oldData: { id: number; title: string; completed: boolean }[] | undefined) =>
    oldData?.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    )
)
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S006 / S-167 - `4fc2178dca`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-write-cache-synchronously`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: setQueryData and setQueriesData write cache synchronously

#### Verified visible text

```text
Write cache synchronously

`setQueryData(queryKey, updaterOrValue)`

Immediately updates one query's cached data. Creates the query if it doesn't exist. Updater can be:

- a value
- or `(oldData) => newData`

If the value/updater returns `undefined`, no update happens. Updates must be immutable.

`setQueriesData(filters, updater)`

Updates multiple existing matching queries. Takes `QueryFilters` plus the same updater style as `setQueryData`. It does not create new cache entries.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S007 / S-169 - `4a083521f3`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08b-invalidate-refetchtype`
- readability: `high`
- cut_off: `bottom-start-of-example-cropped`
- confidence: `high-for-visible-text`
- theme: refetchType in invalidateQueries

#### Verified visible text

```text
`refetchType` in `invalidateQueries` answers which matched queries should be refetched now, not which queries should be invalidated. The invalidation target is controlled by the filters you pass, like `queryKey`, `exact`, `predicate`, etc. `refetchType` only changes what happens after those queries are matched.

So think of it like this:

- filters = which queries are selected
- refetchType = among those selected queries, which ones should refetch immediately

When you call `invalidateQueries`, TanStack Query first marks the matched queries as stale. Then, depending on `refetchType`, it may refetch some or all of them. By default, matched active queries are refetched in the background.

The `refetchType` values are:

- `active`: refetch only matched queries that are currently active/rendered. This is the default.
- `inactive`: refetch only matched queries that are currently inactive.
- `all`: refetch both active and inactive matched queries.
- `none`: do not refetch immediately; just mark matched queries as stale.
```

#### Notes

Bottom shows the start of an Example section, but no example content is visible.

---

### R08B-S008 / S-175 - `71e000a8c4`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-invalidatequeries-signature`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: invalidateQueries filters and refetchType

#### Verified visible text

```text
Mark stale / refetch / cancel / clear

`invalidateQueries(filters?, options?)`

Marks matching queries stale and, by default, refetches active matching queries in the background.

Important filter arg:

- `queryKey`
- `refetchType?: 'active' | 'inactive' | 'all' | 'none'`
- plus other `QueryFilters` matching fields like `exact`, `type`, `stale`, `predicate` via Query Filters support.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S009 / S-178 - `511b7bdef1`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-type-vs-refetchtype`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: type filter versus refetchType

#### Verified visible text

```text
A common source of confusion is the `type` filter versus `refetchType`:

Here:

- `type: 'inactive'` means only inactive queries are matched
- `refetchType: 'all'` means refetch all matched queries
- but since the matched set is already only inactive queries, only those inactive ones will refetch.

So the most accurate sentence is:

`refetchType` is used to decide which of the already-matched invalidated queries should refetch immediately.
```

#### Verified visible code

```ts
queryClient.invalidateQueries({
  queryKey: ['todos'],
  type: 'inactive',
  refetchType: 'all',
})
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S010 / S-182 - `1b495c7744`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-refetchqueries-options`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: refetchQueries options and notes

#### Verified visible text

```text
Options:

- `throwOnError?: boolean`
- `cancelRefetch?: boolean` default `true`

`refetchQueries(filters?, options?)`

Explicitly refetches matching queries. Docs show filters such as:

- `stale: true`
- `queryKey`
- `type: 'active'`
- `exact: true`

Notes:

- disabled queries are not refetched
- static queries are not refetched
- can be configured to throw with `throwOnError` true.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S011 / S-190 - `11e2c7d93f`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-cancel-remove-reset-clear`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: cancelQueries, removeQueries, resetQueries, clear

#### Verified visible text

```text
`cancelQueries(filters?, cancelOptions?)`

Cancels matching in-flight queries. Useful for optimistic updates. Takes:

- `filters?: QueryFilters`
- `cancelOptions?: CancelOptions`

Docs example shows `{ silent: true }`.

`removeQueries(filters?)`

Removes matching queries from cache.

`resetQueries(filters?, options?)`

Resets matching queries to initial state; if a query has `initialData`, it resets to that. Active queries are refetched. Unlike `clear`, it notifies subscribers. Options:

- `throwOnError?: boolean`
- `cancelRefetch?: boolean` default `true`

`clear()`

Clears all connected caches.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S012 / S-191 - `5bec075fe3`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-cancelqueries-optimistic-why`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: why cancelQueries matters in optimistic updates

#### Verified visible text

```text
2) Why `cancelQueries` matters in optimistic updates

TanStack's optimistic update guide literally says to cancel outgoing refetches so they don't overwrite your optimistic update.

The problem without cancellation

Imagine this timeline:

1. `['todos']` query is on screen
2. a refetch is already in flight
3. user edits/adds a todo
4. you optimistically call `setQueryData` and show the new todo immediately
5. the older in-flight refetch finishes with stale server data
6. that old response writes into cache and wipes out your optimistic change

That is the race you are preventing.

So the idea is:

cancel old fetches first, then write optimistic data, then later sync with the server result.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S013 / S-193 - `9625ff3c1f`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-canceloptions`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: CancelOptions silent/revert

#### Verified visible text

```text
2) `CancelOptions` and optimistic updates with `cancelQueries`

`cancelQueries` cancels matching outgoing queries. The docs say this is especially useful for optimistic updates so that an in-flight refetch does not overwrite your optimistic cache change when it finishes.

The `CancelOptions` are:

- `silent?: boolean` — default `false`. If `true`, it suppresses propagation of `CancelledError` to observers and related notifications, and returns the retry promise instead of rejecting.
- `revert?: boolean` — default `true`. If `true`, cancellation restores the query state from immediately before the in-flight fetch and sets `fetchStatus` back to `idle`; it only throws if there was no prior data.

So the simplest way to think about them is:

- `silent` controls how noisy the cancellation is
- `revert` controls whether query state rolls back to the pre-fetch state.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S014 / S-194 - `6401d2ad9e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-cancel-refetch-basic-methods`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: cancelQueries and refetchQueries basic examples

#### Verified visible text

```text
6. Cancel queries

Useful in optimistic updates or when you want to stop an in-flight request.

The docs describe this as canceling matching queries and reverting them to the previous state if cancellation is supported by the query function.

7. Refetch queries manually

Use when you want to actively rerun matching queries now.

This is more direct than invalidation. Invalidation says "this is stale"; refetch says "fetch now."
```

#### Verified visible code

```ts
await queryClient.cancelQueries({ queryKey: ['todos'] })

await queryClient.refetchQueries({ queryKey: ['todos'] })
```

#### Notes

Previously reserved as R08D/neighbor, but local R08B review shows it is direct cancel/refetch-method continuation, so it is included in R08B.

---

### R08B-S015 / S-197 - `75a0c9e06f`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-status-helpers`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: isFetching and isMutating status helpers

#### Verified visible text

```text
Counters / status helpers

`isFetching(filters?)`

Returns a number: how many queries are currently fetching. Takes optional `QueryFilters`.

`isMutating(filters?)`

Returns a number: how many mutations are currently running. Takes `MutationFilters`.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S016 / S-198 - `f128bccab6`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08b-optimistic-flow`
- readability: `high`
- cut_off: `bottom-example-cropped`
- confidence: `high-for-visible-text`
- theme: standard optimistic update flow with cancelQueries

#### Verified visible text

```text
3) Standard optimistic update flow with `cancelQueries`

TanStack's documented flow is:

1. `onMutate`
2. cancel outgoing refetches
3. snapshot previous cache value
4. write optimistic value with `setQueryData`
5. if mutation fails, roll back using the snapshot
6. on settled, invalidate/refetch to sync with server.

Example:
```

#### Notes

Example content begins below the crop and is not visible here; full code example is visible in S-207.

---

### R08B-S017 / S-200 - `6ce7aeccdc`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-cancel-revert-true`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: revert true behavior and why preferred

#### Verified visible text

```text
If there was already data before the canceled fetch

With `revert: false`, that old data does not get actively restored by cancellation. But it also does not necessarily disappear. The docs only define the `true` behavior explicitly: restore previous data/status. When you set it to `false`, you are disabling that restoration step.

If there was no previous data

Then there is nothing to restore anyway. In that case, after cancellation you may still have no usable data. The docs note that with `revert: true`, it only throws if there was no prior data.

Why `revert: true` is usually preferred

Because manual cancellation normally "revert[s] it back to its previous state," and optimistic updates commonly cancel outgoing refetches specifically so they do not clobber the optimistic cache write.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S018 / S-204 - `a00c2c49ff`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-defaults-config`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: QueryClient defaults/config methods

#### Verified visible text

```text
Defaults / config

`getDefaultOptions()`

Returns current client-level default options.

`setDefaultOptions({ queries?, mutations? })`

Sets client-level defaults dynamically, overwriting previous defaults.

`getQueryDefaults(queryKey)`

Returns defaults registered for matching query keys. Matching defaults are merged by registration order.

`setQueryDefaults(queryKey, options)`

Registers defaults for queries matching that key. Registration order matters: generic first, then specific.

`getMutationDefaults(mutationKey)`

Returns defaults for matching mutation keys.

`setMutationDefaults(mutationKey, options)`

Registers defaults for mutations with that key. Order matters here too.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S019 / S-207 - `55a51e51f4`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-optimistic-update-code-example`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: optimistic update code example with cancelQueries

#### Verified visible text

```text
Example:

That exact pattern is straight from the docs.
```

#### Verified visible code

```ts
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo, context) => {
    await context.client.cancelQueries({ queryKey: ['todos'] })

    const previousTodos = context.client.getQueryData(['todos'])

    context.client.setQueryData(['todos'], (old) => [...old, newTodo])

    return { previousTodos }
  },
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(['todos'], onMutateResult.previousTodos)
  },
  onSettled: (_data, _error, _vars, _result, context) => {
    context.client.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S020 / S-212 - `13b08c1aea`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-low-level-cache-access-summary`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: low-level cache access and resumePausedMutations summary

#### Verified visible text

```text
Low-level cache access

`getQueryCache()`

Returns the connected `QueryCache`.

`getMutationCache()`

Returns the connected `MutationCache`.

`resumePausedMutations()`

Resumes mutations paused because there was no network connection.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S021 / S-216 - `97e37315a6`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-getquerycache-details`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: getQueryCache low-level store details

#### Verified visible text

```text
`getQueryCache()`

This returns the `QueryCache` connected to the `QueryClient`.

What the query cache is

It is the low-level store that holds all query entries:

- their keys
- data
- status
- fetch state
- metadata
- observers/subscribers relationship info at the cache level.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S022 / S-219 - `850109ec0c`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-v5-optimistic-update-callback-placement`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: v5 removed useQuery callbacks; cancellation handled in mutation flow

#### Verified visible text

```text
In v5, `useQuery` does not have `onError`, `onSuccess`, or `onSettled`. Those query callbacks were removed in v5; they still exist for mutations, not queries.

So for optimistic updates, you usually do not "handle cancellation in `useQuery onError`", because there is no such callback in v5. Instead, you handle it by:

- canceling the relevant queries before your optimistic write,
- optionally making that cancellation silent,
- snapshotting previous cache data,
- writing optimistic data,
- rolling back in the mutation `onError`,
- invalidating/refetching in `onSettled`.
```

#### Notes

Verified from extracted SVG image.

---

### R08B-S023 / S-221 - `e79f52ad22`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08b-resumepausedmutations-details`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: resumePausedMutations offline workflow

#### Verified visible text

```text
`resumePausedMutations()`

This is for mutations that were paused, most commonly because the app was offline or the mutation was otherwise waiting for network conditions to allow it to continue. Calling `queryClient.resumePausedMutations()` tells TanStack Query to continue those paused mutations.

Why this exists

Imagine the user clicks "Save" while offline:

- mutation starts
- TanStack Query pauses it instead of finishing it
- later the app comes back online
- `resumePausedMutations()` can continue those paused writes.

Typical use

This is mostly useful with offline workflows or persisted clients, where you want pending writes to continue after reconnect or app restore. The `QueryClient` API exposes it specifically as a client-level method for that purpose.
```

#### Notes

Previously reserved as R08D/neighbor, but local R08B review shows it belongs with low-level QueryClient/cache helper methods, so it is included in R08B.

---

## 4. Cleaned source notes

- `fetchQuery` imperatively fetches and caches a query; it can return fresh cached data if `staleTime` allows.
- `prefetchQuery` warms cache for hover/router preloading and returns `Promise<void>` rather than the data.
- `ensureQueryData` returns cached data if available and otherwise fetches; with `revalidateIfStale`, stale data can be returned immediately while refetching in the background.
- `getQueriesData` reads multiple matching cache entries as `[queryKey, data]` tuples.
- `setQueriesData` updates existing matching queries only; it does not create missing query entries.
- `invalidateQueries` uses filters to select queries, then `refetchType` decides which selected queries refetch immediately.
- `type` filters which queries are selected; `refetchType` decides the refetch behavior after selection.
- `refetchQueries` actively reruns matching queries now.
- `cancelQueries` cancels matching in-flight queries and is key for preventing stale refetches from overwriting optimistic updates.
- `CancelOptions.silent` controls notification/noise; `CancelOptions.revert` controls restoration to pre-fetch state.
- The optimistic-update flow is: cancel outgoing refetches, snapshot old cache, write optimistic cache, roll back on mutation error, invalidate/refetch on settled.
- `removeQueries`, `resetQueries`, and `clear` clear/reset cache state at different scopes and with different subscriber behavior.
- `isFetching` and `isMutating` return current activity counts.
- Default/config methods manage client-level and key-specific query/mutation defaults.
- `getQueryCache` and `getMutationCache` expose low-level connected caches.
- `resumePausedMutations` resumes offline/persisted paused writes after network/app restore.

---

## 5. Minimal interpretation

R08B continues the QueryClient-methods area from R08A. It focuses on imperative methods that fetch, prefetch, ensure, refetch, invalidate, cancel, remove, reset, and directly inspect cache state. The key mental model is that filters select which queries are affected, while method-specific options decide what happens next. A large part of the block explains why cancellation matters before optimistic writes: old in-flight refetches can overwrite optimistic cache data unless they are canceled first. The block also covers lower-level QueryClient helpers and offline paused mutation workflows.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| fetchQuery fetches/caches and may return fresh cached data instead of refetching | R08B-S002 | extracted SVG image transcript | high |
| prefetchQuery/prefetchInfiniteQuery are preload helpers that do not return data | R08B-S004 | extracted SVG image transcript | high |
| ensureQueryData returns cache if present or fetches otherwise | R08B-S004 | extracted SVG image transcript | high |
| getQueriesData returns [queryKey, data] tuples for matching queries | R08B-S001, R08B-S003 | extracted SVG image transcript/code | high |
| setQueriesData updates existing matching queries only | R08B-S005, R08B-S006 | extracted SVG image transcript/code | high |
| refetchType affects refetch behavior after filters select matching queries | R08B-S007, R08B-S008, R08B-S009 | extracted SVG image transcript/code | high |
| refetchQueries explicitly refetches matching queries | R08B-S010, R08B-S014 | extracted SVG image transcript/code | high |
| cancelQueries prevents in-flight refetches from overwriting optimistic updates | R08B-S011, R08B-S012, R08B-S013, R08B-S016, R08B-S019 | extracted SVG image transcript/code | high |
| CancelOptions silent/revert control cancellation noise and rollback behavior | R08B-S013, R08B-S017 | extracted SVG image transcript | high |
| isFetching/isMutating return current activity counts | R08B-S015 | extracted SVG image transcript | high |
| default/config methods manage client/query/mutation defaults | R08B-S018 | extracted SVG image transcript | high |
| getQueryCache/getMutationCache expose low-level caches; resumePausedMutations resumes offline-paused mutations | R08B-S020, R08B-S021, R08B-S023 | extracted SVG image transcript | high |
| v5 removed useQuery callbacks, so optimistic cancellation is handled in mutation callbacks | R08B-S022 | extracted SVG image transcript | high |

---

## 7. Question hooks

- What is the difference between fetchQuery, prefetchQuery, and ensureQueryData?
- Why does prefetchQuery not return data?
- What shape does getQueriesData return?
- Why does setQueriesData not create missing cache entries?
- How is refetchType different from the type filter?
- What does invalidateQueries do by default?
- When should you use refetchQueries instead of invalidateQueries?
- Why should cancelQueries be used before an optimistic cache write?
- What do CancelOptions silent and revert mean?
- What is the standard optimistic update flow with cancelQueries?
- What is the difference between removeQueries, resetQueries, and clear?
- What do isFetching and isMutating count?
- What do QueryClient default/config methods manage?
- What are getQueryCache and getMutationCache for?
- When is resumePausedMutations useful?
- Why are optimistic update callbacks handled in useMutation rather than useQuery in v5?

---

## 8. Open review issues

- R08B is complete for the reviewed refetch/cancel/options/cache-helper sub-block.
- R08C remains pending: QueryClient outside React / setQueriesData oldData shape / key-discipline abstractions.
- If R08C finds a source that belongs back in R08B, create R08B v002 rather than hiding it in R08C.
