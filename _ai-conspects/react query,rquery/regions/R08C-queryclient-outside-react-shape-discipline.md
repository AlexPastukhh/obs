# R08C - QueryClient outside React / setQueriesData shape discipline

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4m / verified region transcript v001**  
Generated: 2026-06-01 22:41:48 UTC

This file covers the third R08 sub-pass: using QueryClient outside React and keeping `setQueriesData` safe by respecting query data shapes.

---

## Direction check

Goal:
Finish the planned R08 sub-passes without losing images.

Done:
R08A completed QueryClient / QueryFilters / core methods. R08B completed refetch / cancel options / cache helpers.

Now:
Create R08C transcript for QueryClient outside React and `setQueriesData` data-shape discipline.

Why:
This closes the right-column R08 road about shared QueryClient instances, oldData shape, key factories, and avoiding mixed cache shapes.

Next:
1. review R08C diff; 2. commit; 3. run R08 closure audit against the full R08 boundary checklist.

---

## 0. You are here

Current region: `R08C - QueryClient outside React / setQueriesData shape discipline`  
Status: `verified transcript from extracted SVG images`  
Included source count: `10`  
Known limitations: minor continuation crops only; no known content loss for core ideas.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- creating one shared QueryClient instance and using it both inside and outside React
- why external code must use the same QueryClient instance as the React app
- setQueriesData updater semantics: oldData is per matching cache entry
- why oldData shape comes from query design, not automatic runtime inference
- risks of bulk-updating mixed-shaped query keys
- query-key discipline, key factories, and safer invalidation when shapes differ
```

Key ideas:

- Create one shared QueryClient file and pass that instance to QueryClientProvider.
- Outside React, import and use the same QueryClient instance; do not create a second client accidentally.
- setQueriesData runs the updater once per matching cached query entry.
- For each matching query, oldData is that one entry's cached data.
- TanStack Query does not validate runtime data shape from query keys.
- Generic typing helps TypeScript model the shape, but runtime still trusts the app.
- setQueriesData is safe only when all matching queries share a compatible data shape.
- Mixed shapes under the same prefix can cause wrong type assumptions, runtime errors, or corrupted cache data.
- Use clearer keys and key factories to separate list data from count/stats/summary data.
- Use getQueriesData to inspect matches before bulk updates when unsure.
- Prefer setQueryData for exact known entries and invalidateQueries for the rest when shapes differ.

Reading quality:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after local R08C review.
Limitations: S-127 continues into S-141; S-133 bottom continuation is cropped; S-170/S-179/S-187 have minor top/bottom continuation crops.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-127, S-133, S-135, S-141, S-149, S-155, S-160, S-170, S-179, S-187
```

Already completed R08A:
```text
S-123, S-124, S-125, S-138, S-139, S-144, S-151, S-154, S-158, S-161, S-164, S-168, S-173, S-177, S-183, S-185, S-206
```

Already completed R08B:
```text
S-129, S-134, S-143, S-147, S-153, S-167, S-169, S-175, S-178, S-182, S-190, S-191, S-193, S-194, S-197, S-198, S-200, S-204, S-207, S-212, S-216, S-219, S-221
```

Checked/excluded overlap:
```text
S-184, S-186 -> already processed in R07 v004; not R08C.
```

Boundary decision:
```text
R08C is complete for the reviewed QueryClient outside React / shape-discipline sub-block.
R08A/R08B/R08C now cover the planned R08 split.
Next required step is R08 closure audit, not another R08 transcript immediately.
```

---

## 1. Original Excalidraw labels / topic anchors

```text
QC OUTSIDE REACT
setqueriesdata olddatashape
may try to design some abstractions that will ensure that some keys have some specific form
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R08C-S001 | S-127 | IU-127 | `78a5bec30e` | `r08c-shared-queryclient-file` | `verified-visible-partial-from-extracted-svg-image` | bottom-continuation-visible-in-s141 | Create one shared QueryClient file |
| R08C-S002 | S-133 | IU-133 | `0a41cac8a5` | `r08c-setqueriesdata-per-entry-old` | `verified-visible-partial-from-extracted-svg-image` | bottom-continuation-cropped | setQueriesData updater runs once per matching cache entry |
| R08C-S003 | S-135 | IU-135 | `471c964d3b` | `r08c-olddata-shape-source` | `verified-from-extracted-svg-image` | no | How oldData shape is known |
| R08C-S004 | S-141 | IU-141 | `d913087434` | `r08c-shared-client-react-and-outside` | `verified-visible-partial-from-extracted-svg-image` | bottom-ui-overlay-no-obvious-text-loss | Use the same QueryClient instance in React and outside React |
| R08C-S005 | S-149 | IU-149 | `8c5f325354` | `r08c-mixed-shape-danger` | `verified-visible-partial-from-extracted-svg-image` | bottom-ui-overlay-no-obvious-text-loss | Problem when one matching query stores another shape |
| R08C-S006 | S-155 | IU-155 | `7580b14f8c` | `r08c-outside-react-use-cases-caveat` | `verified-from-extracted-svg-image` | no | When QueryClient outside React is useful and same-instance caveat |
| R08C-S007 | S-160 | IU-160 | `57e5d6a530` | `r08c-setqueriesdata-compatible-shape-rule` | `verified-from-extracted-svg-image` | no | Rule of thumb for setQueriesData compatible shapes |
| R08C-S008 | S-170 | IU-170 | `eb754a7f2d` | `r08c-avoid-mixed-shapes-clearer-keys` | `verified-from-extracted-svg-image` | top-continuation-from-s160-visible-at-edge | Avoid mixed shapes with clearer keys |
| R08C-S009 | S-179 | IU-179 | `d8da9f8d84` | `r08c-centralize-query-keys` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-from-s170-visible-at-edge | Centralize query keys with key factories |
| R08C-S010 | S-187 | IU-187 | `5e6930a90d` | `r08c-inspect-and-prefer-invalidation` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-cropped | Use getQueriesData first and prefer invalidation when shapes differ |

---

## 3. Source transcript

### R08C-S001 / S-127 - `78a5bec30e`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08c-shared-queryclient-file`
- readability: `high`
- cut_off: `bottom-continuation-visible-in-s141`
- confidence: `high-for-visible-text`
- theme: Create one shared QueryClient file

#### Verified visible text

```text
Common pattern

Create one shared file:

Use that same instance in React:
```

#### Verified visible code

```ts
// queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
    },
  },
})
```

#### Notes

The bottom says to use the same instance in React; S-141 continues the React/outside-React usage.

---

### R08C-S002 / S-133 - `0a41cac8a5`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08c-setqueriesdata-per-entry-old`
- readability: `high`
- cut_off: `bottom-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: setQueriesData updater runs once per matching cache entry

#### Verified visible text

```text
Yes.

With `setQueriesData`, the updater runs once per matching cache entry. For each matching query, `old` is the cached data of that one entry.

So if you do:

TanStack Query finds every cached query whose key matches `['todos']`, and for each one:

- reads that entry's current cached value
- passes that value as `old`
- stores whatever your updater returns back into that same entry
```

#### Verified visible code

```ts
queryClient.setQueriesData(
  { queryKey: ['todos'] },
  (old) => { ... }
)
```

#### Notes

Bottom continuation is cropped; the core per-entry `old` behavior is visible.

---

### R08C-S003 / S-135 - `471c964d3b`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08c-olddata-shape-source`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: How oldData shape is known

#### Verified visible text

```text
How do we know the shape of `oldData`?

You only know it from your own query design.

TanStack Query does not magically infer runtime shape from the key alone. The cache stores "whatever data that query has". The docs emphasize type inference and type safety via query options helpers and generic typing, but that is a TypeScript aid, not runtime validation.

So the real answer is:

- the shape comes from the `queryFn` and how you use that key in your app
- TypeScript can help you model that shape
- at runtime, TanStack Query trusts you

Example:

Here you are declaring: "all matching `['todos', ...]` queries contain `Todo[]`."
```

#### Verified visible code

```ts
type Todo = { id: number; title: string; completed: boolean }

queryClient.setQueriesData<Todo[]>(
  { queryKey: ['todos'] },
  (old) => old?.map(t => t.id === updated.id ? { ...t, ...updated } : t)
)
```

#### Notes

Verified from extracted SVG image.

---

### R08C-S004 / S-141 - `d913087434`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08c-shared-client-react-and-outside`
- readability: `high`
- cut_off: `bottom-ui-overlay-no-obvious-text-loss`
- confidence: `high-for-visible-text`
- theme: Use the same QueryClient instance in React and outside React

#### Verified visible text

```text
And outside React:

That works because these are instance methods on `QueryClient`, not hook-only APIs.
```

#### Verified visible code

```ts
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>

import { queryClient } from './queryClient'

export async function warmPost(path: string) {
  await queryClient.prefetchQuery({
    queryKey: ['posts', path],
    queryFn: () => fetchPost(path),
    staleTime: 5000,
  })
}
```

#### Notes

Continuation of S-127. Bottom UI overlay visible; no obvious text loss.

---

### R08C-S005 / S-149 - `8c5f325354`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08c-mixed-shape-danger`
- readability: `high`
- cut_off: `bottom-ui-overlay-no-obvious-text-loss`
- confidence: `high-for-visible-text`
- theme: Problem when one matching query stores another shape

#### Verified visible text

```text
What if one matching query stores another shape?

Then you have a problem.

Example:

If you do:

then `['todos', 'count']` also matches the prefix, but its data is `number`, not `Todo[]`.

That can cause:

- wrong TypeScript assumptions
- runtime errors like `old.map is not a function`
- corrupted cache data

So `setQueriesData` is safe only when the matched queries really share a compatible shape.
```

#### Verified visible code

```ts
['todos'] -> Todo[]
['todos', 'count'] -> number

queryClient.setQueriesData<Todo[]>(
  { queryKey: ['todos'] },
  old => old?.map(...)
)
```

#### Notes

Bottom UI overlay visible; content is readable.

---

### R08C-S006 / S-155 - `7580b14f8c`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08c-outside-react-use-cases-caveat`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: When QueryClient outside React is useful and same-instance caveat

#### Verified visible text

```text
When this is useful outside React

- route loaders / navigation helpers
- plain TS utility modules
- SSR / hydration setup
- auth/logout handlers that clear or reset cache
- websocket/event handlers that call `setQueryData` or `invalidateQueries`
- test setup code
- startup bootstrapping / preloading code

Important caveat

Use the same client instance if you want that external code to affect the cache your React app is using. If you accidentally create a second `new QueryClient()` in some random TS file, you'll be talking to a different cache. That follows from `useQueryClient` returning the current provider's instance and `QueryClientProvider` wiring one client into context.
```

#### Notes

Verified from extracted SVG image.

---

### R08C-S007 / S-160 - `57e5d6a530`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08c-setqueriesdata-compatible-shape-rule`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Rule of thumb for setQueriesData compatible shapes

#### Verified visible text

```text
Rule of thumb

Use `setQueriesData` only when all matching queries have the same or compatible data shape.

Good:

All are `Todo[]`.

Bad:

These should not be bulk-updated with one `Todo[]` updater.
```

#### Verified visible code

```ts
['todos']
['todos', { status: 'done' }]
['todos', { status: 'open' }]

['todos'] -> Todo[]
['todos', 'count'] -> number
['todos', 'stats'] -> { total: number }
```

#### Notes

Verified from extracted SVG image.

---

### R08C-S008 / S-170 - `eb754a7f2d`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r08c-avoid-mixed-shapes-clearer-keys`
- readability: `high`
- cut_off: `top-continuation-from-s160-visible-at-edge`
- confidence: `high`
- theme: Avoid mixed shapes with clearer keys

#### Verified visible text

```text
How to avoid mixed shapes

1. Use clearer keys

Separate list data from summary data.

Good:

Then `setQueriesData({ queryKey: ['todoList'] }, ...)` is much safer.
```

#### Verified visible code

```ts
['todoList']
['todoList', { status: 'done' }]
['todoCount']
['todoStats']
```

#### Notes

The very top has continuation text from the previous source, but the R08C content is clear.

---

### R08C-S009 / S-179 - `d8da9f8d84`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08c-centralize-query-keys`
- readability: `high`
- cut_off: `top-continuation-from-s170-visible-at-edge`
- confidence: `high-for-visible-text`
- theme: Centralize query keys with key factories

#### Verified visible text

```text
2. Centralize query keys

Use key factories:

Then update only list-shaped queries:
```

#### Verified visible code

```ts
const todoKeys = {
  all: ['todos'] as const,
  lists: () => ['todos', 'list'] as const,
  list: (filter: { status?: string }) => ['todos', 'list', filter] as const,
  count: () => ['todos', 'count'] as const,
}

queryClient.setQueriesData(
  { queryKey: todoKeys.lists() },
  ...
)
```

#### Notes

Top has tail text from S-170; centralize-key content is readable.

---

### R08C-S010 / S-187 - `5e6930a90d`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r08c-inspect-and-prefer-invalidation`
- readability: `high`
- cut_off: `top-continuation-cropped`
- confidence: `high-for-visible-text`
- theme: Use getQueriesData first and prefer invalidation when shapes differ

#### Verified visible text

```text
3. Use `getQueriesData` first when unsure

TanStack also provides `getQueriesData`, which returns the cached data for all matches. That is useful for inspecting what is actually in cache before bulk-updating.

4. Prefer invalidation when shapes differ

If queries are related but shaped differently, it is often better to do:

- `setQueryData` for the one or two queries you know exactly
- `invalidateQueries` for the rest

That avoids forcing one updater across incompatible cached values.
```

#### Notes

Top continuation cropped; visible text is complete for points 3 and 4.

---

## 4. Cleaned source notes

- Use one shared QueryClient instance and wire it into React via QueryClientProvider.
- Outside React, import the same QueryClient instance for route loaders, utilities, SSR/hydration, auth/logout handlers, websocket handlers, tests, startup bootstrapping, and preloading.
- Creating a second new QueryClient means talking to a different cache.
- setQueriesData runs its updater once per matching query entry.
- For each matching entry, oldData is that entry's cached data.
- oldData shape comes from your query design and queryFn usage, not from automatic runtime inference.
- TypeScript helps model the expected shape, but TanStack Query trusts the app at runtime.
- setQueriesData is safe when all matched queries have the same or compatible shape.
- Mixed shapes under the same prefix can cause bad assumptions, runtime errors, and cache corruption.
- Avoid mixed shapes with clearer keys, for example separating list data from count/stats/summary data.
- Centralize query keys with key factories so bulk operations can target only compatible shapes.
- Use getQueriesData to inspect matched cached data before bulk-updating when unsure.
- Prefer setQueryData for known exact entries and invalidateQueries for the rest when related queries have different shapes.

---

## 5. Minimal interpretation

R08C is about discipline around the imperative QueryClient. The first half explains that the same QueryClient instance can be used inside React and outside React, but external code must import the same instance as the React app. The second half explains why `setQueriesData` is powerful but dangerous: it applies one updater across every matched cached query, and each `oldData` value is just the cached data for that individual entry. Therefore broad key prefixes are safe only when all matches share a compatible shape. The practical solution is clearer query keys, key factories, inspection via `getQueriesData`, and using invalidation instead of bulk updates when shapes differ.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Use one shared QueryClient file/instance | R08C-S001, R08C-S004, R08C-S006 | extracted SVG image transcript/code | high |
| External code must use the same client instance as the React app | R08C-S004, R08C-S006 | extracted SVG image transcript/code | high |
| setQueriesData updater runs once per matching cache entry | R08C-S002 | extracted SVG image transcript/code | high |
| oldData shape comes from query design and queryFn usage, not runtime inference from key alone | R08C-S003 | extracted SVG image transcript/code | high |
| setQueriesData is safe only when matches have compatible shapes | R08C-S005, R08C-S007 | extracted SVG image transcript/code | high |
| Mixed shapes can cause runtime errors and corrupted cache data | R08C-S005 | extracted SVG image transcript/code | high |
| Clearer keys avoid mixed list/count/stats shapes | R08C-S008 | extracted SVG image transcript/code | high |
| Key factories centralize compatible query-key targeting | R08C-S009 | extracted SVG image transcript/code | high |
| getQueriesData can inspect matches before bulk update | R08C-S010 | extracted SVG image transcript | high |
| Prefer exact setQueryData plus invalidation when shapes differ | R08C-S010 | extracted SVG image transcript | high |

---

## 7. Question hooks

- Why should QueryClient be created in one shared file?
- Why must outside-React code import the same QueryClient instance?
- What happens if you create a second QueryClient in a random TS file?
- How does setQueriesData call its updater?
- What exactly is oldData inside setQueriesData?
- Where does oldData shape come from?
- Why does TypeScript not guarantee runtime cache shape?
- When is setQueriesData safe?
- What can go wrong when matching queries have mixed shapes?
- How can clearer keys avoid mixed shapes?
- Why are query-key factories useful?
- When should getQueriesData be used before setQueriesData?
- When should you prefer invalidateQueries instead of a broad setQueriesData updater?

---

## 8. Open review issues

- R08C is complete for the reviewed outside-React / shape-discipline sub-block.
- R08A/R08B/R08C now cover the planned R08 split.
- Next step should be R08 closure audit: verify the full R08 candidate checklist has no leftover reserved/unreviewed sources that belong to R08.
