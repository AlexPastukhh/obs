# R04B - observer / cache lifecycle / gcTime / refetchInterval

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4v / verified region transcript v001**  
Generated: 2026-06-02 01:13:31 UTC

This file covers the second R04 sub-pass: observer/rerender mechanics, structural sharing, active/inactive cache lifecycle, `gcTime`, richer UI state, and `refetchInterval` polling.

---

## Direction check

Goal:
Finish the planned R04 transcript split after R03 + R04A.

Done:
R03 v001 completed notify/select/structural sharing. R04A v001 completed staleness/static/refetch/retry.

Now:
Create R04B transcript for observer/rerender mechanics, structural sharing, gcTime, and refetchInterval.

Why:
This closes the R04 cache-lifecycle road and prepares for R03/R04 closure audit.

Next:
1. review R04B diff; 2. commit; 3. run R03/R04 closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- active versus inactive queries and observer count
- how query state changes become observer result changes and component rerenders
- tracked result properties and notifyOnChangeProps boundaries
- structural sharing and reference reuse for unchanged data
- gcTime as inactive-cache retention, distinct from staleTime freshness
- isStale/isFetching for richer UI
- polling with refetchInterval
```

Key ideas:

- A query is active when it has at least one mounted observer; inactive when it has no observers.
- Inactive queries are eligible for garbage collection after gcTime.
- A cache/query state change makes the observer recompute the hook result.
- React rerenders only when a tracked or allowed result property changed.
- Changes to isFetching can rerender components that read isFetching even if data did not meaningfully change.
- If a component reads only data, isFetching changes usually do not rerender it.
- Structural sharing reuses references from previous data for unchanged parts.
- Structural sharing helps avoid unnecessary rerenders and makes memoization/child props comparisons behave better.
- staleTime means freshness; gcTime means how long inactive cache is retained.
- Fresh data can still be garbage-collected if it is inactive long enough.
- isStale and isFetching are useful for showing richer UI like background-update labels and refresh buttons.
- refetchInterval is polling; it keeps cache updated when data changes often, and normal refetches can reset the timer.

Reading quality:
```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after R04B local review.
Limitations: S-081 and S-092 are continuation cards for one structural-sharing example.; S-096 has top continuation cropped, but the visible tracked-props point is readable.; S-102 duplicates a previously seen code card but is kept because it belongs to the local R04B richer-UI/state road.; S-065/S-066 remain unreviewed neighbors outside the R03/R04 split.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-069, S-072, S-078, S-081, S-086, S-089, S-092, S-096, S-100, S-102, S-105, S-107
```

Already completed R03:
```text
S-029, S-035, S-041, S-046, S-055, S-058, S-059
```

Already completed R04A:
```text
S-062, S-063, S-067, S-068, S-070, S-071, S-073, S-074, S-075, S-076, S-077, S-079, S-082, S-084, S-087, S-088, S-090, S-091, S-095, S-097, S-098, S-099, S-103, S-104
```

Already processed R05 neighbors:
```text
S-080, S-083, S-085, S-093, S-094, S-101, S-106, S-108, S-111, S-112
```

Still unreviewed neighbors outside R03/R04 split:
```text
S-065, S-066
```

Boundary decision:
```text
R04B is complete for the reviewed observer/cache lifecycle/gcTime/refetchInterval sub-block.
R03/R04 planned split is ready for closure audit.
S-065/S-066 remain future-boundary-review neighbors and are not silently closed here.
```

---

## 1. Original Excalidraw labels / topic anchors
```text
rereders
if after some manipulations the data that is used by some component from query has changed - then observer notifies react that rerender is needed
structural sharing, use from query only the data that will cause rerender on change acts just like a store
removing cache that is not being used not active queries gctime
refetch interval
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R04B-S001 | S-069 | IU-069 | `33b49582ee` | `r04b-active-inactive-gctime` | `verified-from-extracted-svg-image` | no | Active vs inactive queries and gcTime eligibility |
| R04B-S002 | S-072 | IU-072 | `852ba9b003` | `r04b-observer-result-flow` | `verified-from-extracted-svg-image` | no | Query state change -> observer result -> rerender if tracked/allowed prop changed |
| R04B-S003 | S-078 | IU-078 | `6185671034` | `r04b-not-every-cache-update-rerenders` | `verified-from-extracted-svg-image` | no | Not every cache update causes every subscriber to rerender |
| R04B-S004 | S-081 | IU-081 | `508013e6b9` | `r04b-structural-sharing-old-data` | `verified-visible-partial-from-extracted-svg-image` | bottom-continuation-cropped | Structural sharing reuses references from previous data |
| R04B-S005 | S-086 | IU-086 | `3f38cd3ee4` | `r04b-observer-notification-example` | `verified-from-extracted-svg-image` | no | Observer notices state change and schedules notification for changed tracked prop |
| R04B-S006 | S-089 | IU-089 | `ee98c678db` | `r04b-gctime` | `verified-from-extracted-svg-image` | top-border-crop-no-text-loss | gcTime controls how long inactive queries stay in cache |
| R04B-S007 | S-092 | IU-092 | `db432e0178` | `r04b-structural-sharing-new-data` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-cropped | New server response example for structural sharing |
| R04B-S008 | S-096 | IU-096 | `d076db1a35` | `r04b-only-data-read-no-isfetching-rerender` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-cropped | If component only reads data, isFetching changes usually do not rerender it |
| R04B-S009 | S-100 | IU-100 | `873cf4d11f` | `r04b-structural-sharing-result` | `verified-from-extracted-svg-image` | no | Structural sharing result keeps unchanged references |
| R04B-S010 | S-102 | IU-102 | `03697f7b6d` | `r04b-isstale-isfetching-ui` | `verified-from-extracted-svg-image` | no | isStale and isFetching for richer UI |
| R04B-S011 | S-105 | IU-105 | `dc0361e533` | `r04b-why-structural-sharing-useful` | `verified-from-extracted-svg-image` | no | Why structural sharing is useful |
| R04B-S012 | S-107 | IU-107 | `180be1e245` | `r04b-refetchinterval-polling` | `verified-from-extracted-svg-image` | no | Polling with refetchInterval |

---

## 3. Source transcript

### R04B-S001 / S-069 - `33b49582ee`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-active-inactive-gctime`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Active vs inactive queries and gcTime eligibility

#### Verified visible text
```text
10. Active vs inactive queries

A query with at least one mounted observer is active.

A query with no observers is inactive.

When components mount/unmount, observer count changes.

Inactive queries are eligible for garbage collection after `gcTime`.
```

#### Notes
Moved from R04A to R04B during local R04A review because it is active/inactive query + gcTime lifecycle.

---

### R04B-S002 / S-072 - `852ba9b003`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-observer-result-flow`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Query state change -> observer result -> rerender if tracked/allowed prop changed

#### Verified visible text
```text
So the flow is basically:

`cache/query state changes -> observer recomputes result -> TanStack Query checks tracked/allowed props -> React rerenders if one of those changed`

That state change can come from:

- `setQueryData`
- a successful refetch
- fetch status changing (`isFetching` false -> true -> false)
- error/status changes
- staleness changes, if your component uses `isStale`
```

#### Notes
Verified from R04B source image.

---

### R04B-S003 / S-078 - `6185671034`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-not-every-cache-update-rerenders`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Not every cache update causes every subscriber to rerender

#### Verified visible text
```text
A couple of important nuances:

- Not every cache update causes every subscriber to rerender. TanStack Query tracks which properties were actually used via a Proxy, and “will only trigger a re-render if one of the properties returned from useQuery is actually used.”
- Data changes can also be optimized away. With structural sharing, unchanged parts keep their references, and if nothing effectively changed, `data` can stay referentially stable.
- You can override the default tracking behavior with `notifyOnChangeProps`; if set, the component rerenders only when one of those listed properties changes.

So your sentence:

“observer notifies react that rerender is needed?”
```

#### Notes
Verified from R04B source image.

---

### R04B-S004 / S-081 - `508013e6b9`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r04b-structural-sharing-old-data`
- readability: `high`
- cut_off: `bottom-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: Structural sharing reuses references from previous data

#### Verified visible text
```text
Structural sharing means:

when TanStack Query gets new query data, it tries to reuse references from the previous data for every part that did not actually change, instead of replacing the whole object tree with brand-new references.

Simple example

Suppose old cached data is:
```

#### Verified visible code
```tsx
oldData = {
  user: { id: 1, name: "Ann" },
  todos: [
    { id: 1, text: "A" },
    { id: 2, text: "B" }
  ]
}
```

#### Notes
Bottom continuation is cropped; next structural-sharing examples continue in S-092 and S-100.

---

### R04B-S005 / S-086 - `3f38cd3ee4`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-observer-notification-example`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Observer notices state change and schedules notification for changed tracked prop

#### Verified visible text
```text
More precisely:

- the observer notices query state changed
- it computes a new result for that hook
- if a tracked result property changed, it schedules notification
- then React rerenders that component

Example:

Then:

- `setQueryData` with new `data` -> rerender
- background refetch starts, `isFetching: false -> true` -> rerender
- refetch finishes, `isFetching: true -> false` -> rerender
- if fetched data is identical after structural sharing, you may still rerender because `isFetching` changed, even if `data` did not meaningfully change
```

#### Verified visible code
```tsx
const { data, isFetching } = useQuery(...)
```

#### Notes
Verified from R04B source image.

---

### R04B-S006 / S-089 - `ee98c678db`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-gctime`
- readability: `high`
- cut_off: `top-border-crop-no-text-loss`
- confidence: `high`
- theme: gcTime controls how long inactive queries stay in cache

#### Verified visible text
```text
9.4 `gcTime` (garbage collection time)

Controls how long inactive queries stay in cache before being removed.

An inactive query = query with 0 observers.

Example:

Key difference:

- `staleTime` = freshness
- `gcTime` = how long inactive cache is retained

Fresh data can still be removed if it becomes inactive long enough.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['issues', search],
  queryFn: () => fetchIssues(search),
  gcTime: 3000,
})
```

#### Notes
Verified from R04B source image.

---

### R04B-S007 / S-092 - `db432e0178`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r04b-structural-sharing-new-data`
- readability: `high`
- cut_off: `top-continuation-cropped`
- confidence: `high-for-visible-code`
- theme: New server response example for structural sharing

#### Verified visible text
```text
New server response is logically:
```

#### Verified visible code
```tsx
newData = {
  user: { id: 1, name: "Ann" },
  todos: [
    { id: 1, text: "A" },
    { id: 2, text: "B updated" }
  ]
}
```

#### Notes
Continuation of S-081 structural sharing example.

---

### R04B-S008 / S-096 - `d076db1a35`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r04b-only-data-read-no-isfetching-rerender`
- readability: `high`
- cut_off: `top-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: If component only reads data, isFetching changes usually do not rerender it

#### Verified visible text
```text
But if your component only reads:

then a change only to `isFetching` usually won't rerender that component, because `isFetching` was not used.
```

#### Verified visible code
```tsx
const { data } = useQuery(...)
```

#### Notes
Continuation of observer tracked-props example.

---

### R04B-S009 / S-100 - `873cf4d11f`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-structural-sharing-result`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Structural sharing result keeps unchanged references

#### Verified visible text
```text
With structural sharing, TanStack Query will try to produce something like:

So:

- unchanged parts keep the same identity
- changed parts get new references
```

#### Verified visible code
```tsx
result = {
  user: oldData.user,                 // same reference reused
  todos: [
    oldData.todos[0],                 // same reference reused
    { id: 2, text: "B updated" }      // new reference only for changed part
  ]
}
```

#### Notes
Verified from R04B source image.

---

### R04B-S010 / S-102 - `03697f7b6d`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-isstale-isfetching-ui`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: isStale and isFetching for richer UI

#### Verified visible text
```text
11. `isStale` and `isFetching`

These are useful for richer UI.
```

#### Verified visible code
```tsx
function Book({ bookId }: { bookId: string }) {
  const { data, isStale, isFetching, refetch } = useBook(bookId)

  return (
    <div>
      <h1>{data?.title}</h1>

      {isFetching && <small>Updating in background...</small>}
      {isStale && <button onClick={() => refetch()}>Refresh</button>}
    </div>
  )
}
```

#### Notes
This source image duplicates a code card already seen near R02A/R02C, but in R04B it supports observer/richer UI state usage.

---

### R04B-S011 / S-105 - `dc0361e533`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-why-structural-sharing-useful`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why structural sharing is useful

#### Verified visible text
```text
Why this is useful

This helps avoid unnecessary rerenders and makes memoization work better:

- if data didn't actually change, the top-level reference can stay the same
- if only part changed, only that part gets replaced
- `useMemo`, `useCallback`, and child props comparisons behave better because stable parts stay stable
```

#### Notes
Verified from R04B source image.

---

### R04B-S012 / S-107 - `180be1e245`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r04b-refetchinterval-polling`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Polling with refetchInterval

#### Verified visible text
```text
13. Polling with `refetchInterval`

Use polling when data changes often and you want the cache kept updated.

If another normal refetch happens before the timer fires, the timer resets.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['repos', sort],
  queryFn: () => fetchRepos(sort),
  refetchInterval: 5000,
})
```

#### Notes
Verified from R04B source image.

---

## 4. Cleaned source notes

- A query is active when it has at least one mounted observer; inactive when it has no observers.
- Inactive queries are eligible for garbage collection after gcTime.
- A cache/query state change makes the observer recompute the hook result.
- React rerenders only when a tracked or allowed result property changed.
- Changes to isFetching can rerender components that read isFetching even if data did not meaningfully change.
- If a component reads only data, isFetching changes usually do not rerender it.
- Structural sharing reuses references from previous data for unchanged parts.
- Structural sharing helps avoid unnecessary rerenders and makes memoization/child props comparisons behave better.
- staleTime means freshness; gcTime means how long inactive cache is retained.
- Fresh data can still be garbage-collected if it is inactive long enough.
- isStale and isFetching are useful for showing richer UI like background-update labels and refresh buttons.
- refetchInterval is polling; it keeps cache updated when data changes often, and normal refetches can reset the timer.

---

## 5. Minimal interpretation

R04B explains the cache-observer lifecycle behind rerenders. A query becomes active when at least one observer is mounted and inactive when no observers remain. Inactive queries can be garbage-collected after `gcTime`, which is separate from `staleTime`: freshness and retention are different dimensions. The observer receives cache/query state changes, recomputes the hook result, and React rerenders only if a tracked or allowed result field changed. Structural sharing reduces unnecessary identity changes by preserving references for unchanged data. `isStale` and `isFetching` support richer UI states, and `refetchInterval` is the polling tool for keeping frequently-changing data updated.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| A query is active with at least one mounted observer and inactive with no observers | R04B-S001 | extracted SVG image transcript | high |
| Inactive queries can be removed after gcTime | R04B-S001, R04B-S006 | extracted SVG image transcript/code | high |
| Observer recomputes result after cache/query state changes and rerenders only for changed tracked/allowed props | R04B-S002, R04B-S003, R04B-S005, R04B-S008 | extracted SVG image transcript/code | high |
| isFetching changes can rerender only components that read isFetching | R04B-S005, R04B-S008 | extracted SVG image transcript/code | high |
| Structural sharing reuses references from previous data for unchanged parts | R04B-S004, R04B-S007, R04B-S009 | extracted SVG image transcript/code | high |
| Structural sharing helps avoid unnecessary rerenders and improves memoization behavior | R04B-S011 | extracted SVG image transcript | high |
| staleTime and gcTime are different: freshness vs inactive retention | R04B-S006 | extracted SVG image transcript/code | high |
| isStale/isFetching are useful for richer UI | R04B-S010 | extracted SVG image transcript/code | high |
| refetchInterval provides polling and normal refetches can reset the timer | R04B-S012 | extracted SVG image transcript/code | high |

---

## 7. Question hooks

- What makes a query active or inactive?
- What does gcTime control?
- How is gcTime different from staleTime?
- Why can fresh data still be garbage-collected?
- What happens when cache/query state changes?
- Why does not every cache update rerender every subscriber?
- How do tracked properties affect rerenders?
- Why can isFetching cause a rerender even when data did not change?
- What does structural sharing preserve?
- Why does structural sharing help memoization?
- How can isStale and isFetching support richer UI?
- When should refetchInterval be used?

---

## 8. Open review issues

- R04B is complete for the reviewed observer/cache lifecycle/gcTime/refetchInterval sub-block.
- R03 and R04A were completed in Stage4u.
- Next step should be R03/R04 closure audit.
- S-065/S-066 remain unreviewed future-boundary-review neighbors; do not count them as closed by R03/R04.
