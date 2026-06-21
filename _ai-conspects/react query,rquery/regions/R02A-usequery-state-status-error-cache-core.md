# R02A - useQuery state / status / error / cache core

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4q / verified region transcript v002 - boundary correction**  
Generated: 2026-06-01 23:28:46 UTC

This file supersedes R02A v001. R02A v002 adds `S-013`, which local R02B review showed belongs to the status/fetchStatus mental-model block.

---

## Direction check

Goal:
Correct R02A and keep R02B semantically clean.

Done:
R02A v001 existed, but `S-013` was still reserved for R02B.

Now:
R02A v002 includes `S-013` as a status/isPending/isFetching mental-model card.

Why:
`S-013` is not about enabled/disabled queries; it explains first load, settled data, and background refetch states.

Next:
R02B processes only enabled/disabled/conditional UI.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- core QueryClient setup and QueryClientProvider
- what useQuery does: cache lookup, queryFn execution, subscription, rerendering
- query cache fundamentals and queryKey identity
- status vs fetchStatus, isPending/isLoading/isFetching
- safe rendering when data may be undefined
- custom query hooks and queryFn Promise/error behavior
- do not swallow errors inside queryFn
```

Key ideas:

- Create QueryClient outside render scope so the cache stays stable.
- QueryClientProvider injects the client into the React tree via context.
- useQuery looks up cache by queryKey, runs queryFn when needed, subscribes to changes, and rerenders on relevant changes.
- queryKey must uniquely identify the resource; queryFn must return a Promise.
- status describes result/data availability: pending, success, error.
- fetchStatus describes whether a request is currently running: fetching, idle, paused.
- isPending means no successful result yet; isFetching means a request is running.
- isLoading is isPending && isFetching; pending does not always mean actively loading.
- Background refetch can have isPending false and isFetching true.
- A query can have data, be stale, and be fetching at the same time.
- Never assume data exists on first render; guard with pending/error states.
- Throwing in async query functions is good; swallowing errors hides failures.

Reading quality:
```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after correction moving S-013 into R02A.
Limitations: S-022/S-030 have cropped top continuation.; S-036 has top continuation and bottom UI overlay.; R02C remains pending; S-062 reserved for R04.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-008, S-011, S-012, S-013, S-016, S-017, S-018, S-020, S-021, S-022, S-023, S-024, S-025, S-030, S-034, S-036
```

Reserved for later R02C:
```text
S-039, S-040, S-043, S-045, S-048, S-050, S-051, S-052, S-054, S-057, S-061
```

Reserved for R04:
```text
S-062
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R02A-S001 | S-008 | IU-008 | `77eaf12c68` | `r02a-status-fetchstatus-core` | `verified-from-extracted-svg-image` | no | status vs fetchStatus core distinction |
| R02A-S002 | S-011 | IU-011 | `1d512b6a91` | `r02a-queryclient-core-setup` | `verified-from-extracted-svg-image` | no | Create one QueryClient outside render scope |
| R02A-S003 | S-012 | IU-012 | `6114875a76` | `r02a-isloading-specificity` | `verified-from-extracted-svg-image` | bottom-ui-dot-no-text-loss | isLoading is more specific than pending |
| R02A-S004 | S-013 | IU-013 | `768ded59fc` | `r02a-status-mental-model-correction` | `verified-from-extracted-svg-image` | no | Example mental model for isPending and isFetching |
| R02A-S005 | S-016 | IU-016 | `114f1fa612` | `r02a-queryclientprovider` | `verified-from-extracted-svg-image` | no | QueryClientProvider gives the client to the component tree |
| R02A-S006 | S-017 | IU-017 | `d913b80242` | `r02a-query-cache-fundamentals` | `verified-from-extracted-svg-image` | right-edge-cropped-no-text-loss | Query cache identified by key |
| R02A-S007 | S-018 | IU-018 | `a3d61eaf9c` | `r02a-isfetching-and-pending-vs-loading` | `verified-from-extracted-svg-image` | no | isFetching and isPending vs isLoading mental model |
| R02A-S008 | S-020 | IU-020 | `bbc587153e` | `r02a-what-usequery-does` | `verified-from-extracted-svg-image` | no | What useQuery does |
| R02A-S009 | S-021 | IU-021 | `61ff65ee41` | `r02a-two-query-rules` | `verified-from-extracted-svg-image` | no | Two core rules: queryKey identifies, queryFn returns Promise |
| R02A-S010 | S-022 | IU-022 | `2899e0756c` | `r02a-isloading-formula` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-cropped | isLoading formula in modern TanStack Query |
| R02A-S011 | S-023 | IU-023 | `03697f7b6d` | `r02a-isstale-isfetching-rich-ui` | `verified-from-extracted-svg-image` | no | isStale and isFetching for richer UI |
| R02A-S012 | S-024 | IU-024 | `fe5b1db522` | `r02a-safe-rendering-correct` | `verified-from-extracted-svg-image` | left-edge-rounded-card-crop-no-text-loss | Safe rendering pattern with isPending/isError before data.map |
| R02A-S013 | S-025 | IU-025 | `c8b43511a0` | `r02a-safe-rendering-wrong` | `verified-from-extracted-svg-image` | no | Unsafe rendering when assuming data exists on first render |
| R02A-S014 | S-030 | IU-030 | `39e62ae511` | `r02a-query-data-stale-fetching-same-time` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-cropped | A query can have data, be stale, and be fetching at the same time |
| R02A-S015 | S-034 | IU-034 | `14368dd8ca` | `r02a-custom-hooks-for-queries` | `verified-from-extracted-svg-image` | no | Custom hooks for queries and throwing errors |
| R02A-S016 | S-036 | IU-036 | `4d72a0bb65` | `r02a-do-not-swallow-errors` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-and-bottom-ui-overlay | Do not swallow errors in queryFn |

---

## 3. Source transcript

### R02A-S001 / S-008 - `77eaf12c68`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-status-fetchstatus-core`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: status vs fetchStatus core distinction

#### Verified visible text
```text
5.2 `status`, `fetchStatus`, `isLoading`, `isFetching`

These are easy to mix up.

`status`

Represents data availability/result state:

- `'pending'`
- `'success'`
- `'error'`

`fetchStatus`

Represents whether a request is executing right now:

- `'fetching'`
- `'idle'`
- `'paused'`
```

#### Notes
Previously checked as not R01; now included in R02A statuses block.

---

### R02A-S002 / S-011 - `1d512b6a91`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-queryclient-core-setup`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Create one QueryClient outside render scope

#### Verified visible text
```text
2. Core setup

2.1 Create one `QueryClient`

The `QueryClient` must be created outside render scope, so the cache stays stable.

Correct:
```

#### Verified visible code
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  )
}
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S003 / S-012 - `6114875a76`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-isloading-specificity`
- readability: `high`
- cut off: `bottom-ui-dot-no-text-loss`
- confidence: `high`
- theme: isLoading is more specific than pending

#### Verified visible text
```text
`isLoading`

This is more specific than “pending”.

It means:

So this is possible:

That often happens with disabled queries.
```

#### Verified visible code
```tsx
status === 'pending' && fetchStatus === 'fetching'

status === 'pending'
fetchStatus === 'idle'
isLoading === false
```

#### Notes
Bottom UI dot is visible; text is readable.

---

### R02A-S004 / S-013 - `768ded59fc`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-status-mental-model-correction`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Example mental model for isPending and isFetching

#### Verified visible text
```text
Example mental model:

- First page load:
  - `isPending: true`
  - `isFetching: true`

- Data loaded and sitting on screen:
  - `isPending: false`
  - `isFetching: false`

- Background refetch after window focus / invalidation:
  - `isPending: false`
  - `isFetching: true`
```

#### Notes
Moved from R02B to R02A after local R02B review because it is a status/fetchStatus mental-model card, not enabled/disabled semantics.

---

### R02A-S005 / S-016 - `114f1fa612`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-queryclientprovider`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: QueryClientProvider gives the client to the component tree

#### Verified visible text
```text
2.2 `QueryClientProvider`

This provider makes the query client available to the component tree.

All components that should share the same cache must be wrapped by the same provider.

React Query uses context mainly for dependency injection of the client.
```

#### Verified visible code
```tsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S006 / S-017 - `d913b80242`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-query-cache-fundamentals`
- readability: `high`
- cut off: `right-edge-cropped-no-text-loss`
- confidence: `high`
- theme: Query cache identified by key

#### Verified visible text
```text
4. Query cache fundamentals

A query is identified by its key.

This means:

- `['pokemon', 1]` and `['pokemon', 2]` are different cache entries
- key design controls cache correctness
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['pokemon', id],
  queryFn: () => fetchPokemon(id),
})
```

#### Notes
Right edge is cropped, but no visible text appears lost.

---

### R02A-S007 / S-018 - `a3d61eaf9c`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-isfetching-and-pending-vs-loading`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: isFetching and isPending vs isLoading mental model

#### Verified visible text
```text
`isFetching`

Means a request is currently happening.

You can have data and still be fetching.

5.3 `isPending` vs `isLoading`

A useful mental model:

- `isPending`: no successful result yet for this query
- `isLoading`: first fetch is actively running
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S008 / S-020 - `bbc587153e`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-what-usequery-does`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: What useQuery does

#### Verified visible text
```text
3.2 What `useQuery` does

It:

- looks up data in the cache using `queryKey`
- runs `queryFn` if needed
- subscribes the component to changes
- rerenders when relevant query state/data changes
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S009 / S-021 - `61ff65ee41`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-two-query-rules`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Two core rules: queryKey identifies, queryFn returns Promise

#### Verified visible text
```text
4.1 Two rules you must remember

Rule 1 — `queryKey` must uniquely identify the resource

Rule 2 — `queryFn` must return a Promise
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S010 / S-022 - `2899e0756c`

Metadata:
- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r02a-isloading-formula`
- readability: `high`
- cut off: `top-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: isLoading formula in modern TanStack Query

#### Verified visible text
```text
`isLoading` in modern TanStack Query means:
```

#### Verified visible code
```tsx
isLoading = isPending && isFetching
```

#### Notes
Top continuation is cropped; visible formula is readable.

---

### R02A-S011 / S-023 - `03697f7b6d`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-isstale-isfetching-rich-ui`
- readability: `high`
- cut off: `no`
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
Verified from extracted SVG image.

---

### R02A-S012 / S-024 - `fe5b1db522`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-safe-rendering-correct`
- readability: `high`
- cut off: `left-edge-rounded-card-crop-no-text-loss`
- confidence: `high`
- theme: Safe rendering pattern with isPending/isError before data.map

#### Verified visible text
```text
Correct safe rendering pattern for media devices: check pending and error state before rendering `data.map(...)`.
```

#### Verified visible code
```tsx
function MediaDevices() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['mediaDevices'],
    queryFn: () => navigator.mediaDevices.enumerateDevices(),
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Unable to access devices</div>

  return (
    <ul>
      {data.map((device) => (
        <li key={device.deviceId}>{device.label}</li>
      ))}
    </ul>
  )
}
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S013 / S-025 - `c8b43511a0`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-safe-rendering-wrong`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Unsafe rendering when assuming data exists on first render

#### Verified visible text
```text
5.1 Safe rendering pattern

Never assume `data` exists on first render.

Wrong:

This can fail because `data` is initially `undefined`.
```

#### Verified visible code
```tsx
function MediaDevices() {
  const { data } = useQuery({
    queryKey: ['mediaDevices'],
    queryFn: () => navigator.mediaDevices.enumerateDevices(),
  })

  return (
    <ul>
      {data.map((device) => (
        <li key={device.deviceId}>{device.label}</li>
      ))}
    </ul>
  )
}
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S014 / S-030 - `39e62ae511`

Metadata:
- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r02a-query-data-stale-fetching-same-time`
- readability: `high`
- cut off: `top-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: A query can have data, be stale, and be fetching at the same time

#### Verified visible text
```text
A query can:

- have data
- be stale
- be fetching

all at the same time.
```

#### Notes
Top continuation is cropped; visible statement is complete.

---

### R02A-S015 / S-034 - `14368dd8ca`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02a-custom-hooks-for-queries`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Custom hooks for queries and throwing errors

#### Verified visible text
```text
6. Custom hooks for queries

Wrapping queries in custom hooks keeps components clean.
```

#### Verified visible code
```tsx
async function getBook() {
  const response = await fetch('/api/book')
  if (!response.ok) throw new Error('Unable to fetch book')
  return response.json()
}

function useBook() {
  return useQuery({
    queryKey: ['book'],
    queryFn: getBook,
  })
}
```

#### Notes
Verified from extracted SVG image.

---

### R02A-S016 / S-036 - `4d72a0bb65`

Metadata:
- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r02a-do-not-swallow-errors`
- readability: `high`
- cut off: `top-continuation-and-bottom-ui-overlay`
- confidence: `high-for-visible-text`
- theme: Do not swallow errors in queryFn

#### Verified visible text
```text
Throwing inside `async` is good. React Query sees that as a rejected promise.

7.2 Do not swallow errors

Bad

This hides real failures from React Query.
```

#### Verified visible code
```tsx
async function getData() {
  try {
    const res = await fetch('/api/data')
    return await res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}
```

#### Notes
Top continuation and bottom UI overlay are visible; main warning and bad example are readable.

---

## 4. Cleaned source notes

- Create QueryClient outside render scope so the cache stays stable.
- QueryClientProvider injects the client into the React tree via context.
- useQuery looks up cache by queryKey, runs queryFn when needed, subscribes to changes, and rerenders on relevant changes.
- queryKey must uniquely identify the resource; queryFn must return a Promise.
- status describes result/data availability: pending, success, error.
- fetchStatus describes whether a request is currently running: fetching, idle, paused.
- isPending means no successful result yet; isFetching means a request is running.
- isLoading is isPending && isFetching; pending does not always mean actively loading.
- Background refetch can have isPending false and isFetching true.
- A query can have data, be stale, and be fetching at the same time.
- Never assume data exists on first render; guard with pending/error states.
- Throwing in async query functions is good; swallowing errors hides failures.

---

## 5. Minimal interpretation

R02A establishes the base `useQuery` mental model. It covers stable QueryClient setup, provider wiring, cache lookup by key, queryFn execution, and how query state is represented. The corrected v002 version includes the missing mental-model card that separates first load, settled data, and background refetch. The central distinction is that `status`/`isPending` describe data/result availability, while `fetchStatus`/`isFetching` describe active network work.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| QueryClient should be created outside render scope and provided through QueryClientProvider | R02A-S002, R02A-S005 | extracted SVG image transcript/code | high |
| useQuery looks up cache by queryKey, runs queryFn, subscribes, and rerenders on changes | R02A-S008 | extracted SVG image transcript | high |
| queryKey uniquely identifies a resource and queryFn must return a Promise | R02A-S006, R02A-S009 | extracted SVG image transcript/code | high |
| status and fetchStatus are different state axes | R02A-S001 | extracted SVG image transcript | high |
| isPending and isFetching have different meanings across initial load, settled data, and background refetch | R02A-S004, R02A-S007, R02A-S010, R02A-S014 | extracted SVG image transcript/code | high |
| data may be undefined on first render; guard pending/error before data.map | R02A-S012, R02A-S013 | extracted SVG image transcript/code | high |
| query functions should throw errors and not swallow them | R02A-S015, R02A-S016 | extracted SVG image transcript/code | high |

---

## 7. Question hooks

- What is the difference between status and fetchStatus?
- Why can isPending be true while isLoading is false?
- How can a background refetch have isPending false and isFetching true?
- Why should QueryClient be created outside render scope?
- What does useQuery do at a high level?
- Why must queryKey uniquely identify the resource?
- Why must queryFn return a Promise?
- Why can data be undefined on the first render?
- Why should queryFn throw instead of swallowing errors?

---

## 8. Open review issues

- R02A v002 is complete for the reviewed core useQuery state/status/error/cache sub-block.
- R02B is processed separately in this same archive.
- R02C remains pending.
- S-062 remains reserved for R04 staleTime/static/invalidation boundary review.
