# R02C - query keys / manual refetch / declarative dependencies

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4r / verified region transcript v001**  
Generated: 2026-06-01 23:39:24 UTC

This file covers the third R02 sub-pass: query keys, manual refetch, and declarative dependencies. It completes the planned R02 transcript split, but a closure audit is still required.

---

## Direction check

Goal:
Finish the planned R02 transcript split without losing images.

Done:
R02A v002 completed core `useQuery` state/status/error/cache. R02B v001 completed enabled/disabled/conditional UI.

Now:
Create R02C transcript for query keys, manual refetch, and declarative key dependencies.

Why:
R02C closes the key/dependency road: values used by `queryFn` must be in the key, and key changes drive fetching declaratively.

Next:
1. review R02C diff; 2. commit; 3. run R02 closure audit against the full R02 boundary checklist.

---

## 0. You are here

Current region: `R02C - query keys / manual refetch / declarative dependencies`  
Status: `verified transcript from extracted SVG images`  
Included source count: `11`  
Known limitations: minor crop/context loss only; no known content loss for core ideas.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- query keys as the identity and dependency model for queries
- include every value used by queryFn in the queryKey
- manual refetch versus declarative key-driven refetching
- React state changes rerender components, then useQuery sees the new key
- keys can contain arrays and objects and are hashed deterministically
- ESLint plugin support for missing query-key dependencies
```

Key ideas:

- If queryFn depends on a value, that value belongs in queryKey.
- Leaving bookId out of ['book'] wrongly reuses one cache entry for many books.
- Including bookId in ['book', bookId] creates distinct cache entries.
- Avoid manual refetch when a changing variable should be part of the key.
- setSort does not instantly fetch; it triggers a rerender, then useQuery runs with the new key.
- Changing a key means TanStack Query looks up that key and decides whether to use cache, refetch, or fetch.
- Keys can contain arrays and objects; TanStack Query hashes them deterministically.
- Key arrays/objects do not need React dependency-array style referential stability.
- Declarative fetching means saying what data depends on, not imperatively saying 'refetch now'.
- The TanStack ESLint plugin can help catch missing query-key dependencies.

Reading quality:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after R02 boundary review and local R02C check.
Limitations: S-040 top continuation cropped; S-043 surrounding context cropped; S-062 reserved for R04.
```

---

## 0.2 Coverage / boundary review

Included source IDs:

```text
S-039, S-040, S-043, S-045, S-048, S-050, S-051, S-052, S-054, S-057, S-061
```

Already completed R02A:
```text
S-008, S-011, S-012, S-013, S-016, S-017, S-018, S-020, S-021, S-022, S-023, S-024, S-025, S-030, S-034, S-036
```

Already completed R02B:
```text
S-026, S-027, S-032, S-033, S-037, S-042, S-047, S-056
```

Reserved for R04:
```text
S-062 -> static staleTime / manual invalidation frontier, not R02C.
```

Side checks not in formal R02:
```text
S-029/S-035/S-041/S-046/S-055/S-058/S-059 -> R03 notifyOnChangeProps/select side area, not R02C.
S-063/S-067 -> R04 staleTime/static frontier, not R02C.
```

Boundary decision:
```text
R02C is complete for the reviewed query keys/manual refetch/declarative dependencies sub-block.
R02A/R02B/R02C now cover the planned R02 split.
Next required step is R02 closure audit, not another R02 transcript immediately.
```

---

## 1. Original Excalidraw labels / topic anchors

```text
keys
manual refetch and using state to make new queries on that state change
with static it can be stale but it wont be refetched automatically on s
so when returning usequey we get like a query but dor our specific resource
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R02C-S001 | S-039 | IU-039 | `913cfdb055` | `r02c-query-key-missing-dependency-bad` | `verified-from-extracted-svg-image` | no | Query keys must include every value used by queryFn |
| R02C-S002 | S-040 | IU-040 | `5b76d4c5fc` | `r02c-usebook-usage` | `verified-visible-partial-from-extracted-svg-image` | top-continuation-cropped | useBook usage with pending/error guards |
| R02C-S003 | S-043 | IU-043 | `7c40b916d5` | `r02c-better-queryfn-error` | `verified-visible-partial-from-extracted-svg-image` | surrounding-context-cropped | Better queryFn throws on failed fetch |
| R02C-S004 | S-045 | IU-045 | `7aca1a90bf` | `r02c-query-key-good` | `verified-from-extracted-svg-image` | no | Good query key includes bookId |
| R02C-S005 | S-048 | IU-048 | `bafb8949f1` | `r02c-eslint-plugin` | `verified-from-extracted-svg-image` | no | ESLint plugin catches missing key dependencies |
| R02C-S006 | S-050 | IU-050 | `33f7c75961` | `r02c-manual-refetch-imperative-bad` | `verified-from-extracted-svg-image` | no | Avoid manual refetch when changing variable belongs in key |
| R02C-S007 | S-051 | IU-051 | `0e0d2b0487` | `r02c-sort-state-flow` | `verified-from-extracted-svg-image` | no | Sort state causes rerender and new queryKey on next render |
| R02C-S008 | S-052 | IU-052 | `26863f1800` | `r02c-query-key-arrays-objects` | `verified-from-extracted-svg-image` | no | Keys can contain arrays and objects |
| R02C-S009 | S-054 | IU-054 | `2cdf7b8634` | `r02c-declarative-approach-good` | `verified-from-extracted-svg-image` | no | Better declarative key includes sort |
| R02C-S010 | S-057 | IU-057 | `2fc52e535e` | `r02c-new-key-cache-nuance` | `verified-from-extracted-svg-image` | no | New key may use cache, refetch, or fetch |
| R02C-S011 | S-061 | IU-061 | `3ec1269c3e` | `r02c-why-declarative` | `verified-from-extracted-svg-image` | no | Why query keys make fetching declarative |

---

## 3. Source transcript

### R02C-S001 / S-039 - `913cfdb055`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-query-key-missing-dependency-bad`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Query keys must include every value used by queryFn

#### Verified visible text

```text
8. Query keys

8.1 Include every value used by the query function

If the query function depends on something, that value belongs in the key.

Bad:

This wrongly reuses one cache entry for many books.
```

#### Verified visible code

```tsx
function useBook(bookId: string) {
  return useQuery({
    queryKey: ['book'],
    queryFn: () => getBook(bookId),
  })
}
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S002 / S-040 - `5b76d4c5fc`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r02c-usebook-usage`
- readability: `high`
- cut_off: `top-continuation-cropped`
- confidence: `high-for-visible-code`
- theme: useBook usage with pending/error guards

#### Verified visible text

```text
Usage:
```

#### Verified visible code

```tsx
function Book() {
  const { data, isPending, isError } = useBook()

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return <h1>{data.title}</h1>
}
```

#### Notes

Top continuation is cropped; visible usage code is readable.

---

### R02C-S003 / S-043 - `7c40b916d5`

Metadata:

- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r02c-better-queryfn-error`
- readability: `high`
- cut_off: `surrounding-context-cropped`
- confidence: `high-for-visible-code`
- theme: Better queryFn throws on failed fetch

#### Verified visible text

```text
Better
```

#### Verified visible code

```tsx
async function getData() {
  const res = await fetch('/api/data')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}
```

#### Notes

This is a visible nearby code card reinforcing queryFn error behavior; included in R02C because it is in the formal R02C row and local review kept it as queryFn/key-adjacent support.

---

### R02C-S004 / S-045 - `7aca1a90bf`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-query-key-good`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Good query key includes bookId

#### Verified visible text

```text
Good
```

#### Verified visible code

```tsx
function useBook(bookId: string) {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBook(bookId),
  })
}
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S005 / S-048 - `bafb8949f1`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-eslint-plugin`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: ESLint plugin catches missing key dependencies

#### Verified visible text

```text
8.4 ESLint plugin

The TanStack ESLint plugin helps catch missing key dependencies.
```

#### Verified visible code

```bash
npm i @tanstack/eslint-plugin-query
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S006 / S-050 - `33f7c75961`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-manual-refetch-imperative-bad`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Avoid manual refetch when changing variable belongs in key

#### Verified visible text

```text
8.2 Declarative refetching

Avoid manual `refetch()` when a changing variable should already be part of the key.

Imperative approach
```

#### Verified visible code

```tsx
const { refetch } = useRepos(sort)

function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
  setSort(e.target.value)
  refetch()
}
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S007 / S-051 - `0e0d2b0487`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-sort-state-flow`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Sort state causes rerender and new queryKey on next render

#### Verified visible text

```text
Yes — in that example, `sort` is typically a React state value in the component that calls `useRepos(sort)`.

So the flow is:

When `setSort(...)` runs:

1. React updates state
2. component re-renders
3. `useRepos(sort)` runs again with the new `sort`
4. `queryKey` becomes `['repos', newSort]`
5. TanStack Query treats that as a different query

So your understanding is right: it does not instantly fetch at the moment `setSort` is called. It fetches on the next render, when the hook sees the new key.
```

#### Verified visible code

```tsx
const [sort, setSort] = useState('stars')
const reposQuery = useRepos(sort)
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S008 / S-052 - `26863f1800`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-query-key-arrays-objects`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Keys can contain arrays and objects

#### Verified visible text

```text
8.3 Keys can contain arrays and objects

React Query hashes keys deterministically.

They do not need referential stability like React dependency arrays often do.
```

#### Verified visible code

```tsx
queryKey: ['repos', { sort, page }]
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S009 / S-054 - `2cdf7b8634`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-declarative-approach-good`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Better declarative key includes sort

#### Verified visible text

```text
Better declarative approach

Now a sort change automatically means “new query”.
```

#### Verified visible code

```tsx
function useRepos(sort: string) {
  return useQuery({
    queryKey: ['repos', sort],
    queryFn: () => getRepos(sort),
  })
}
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S010 / S-057 - `2fc52e535e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-new-key-cache-nuance`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: New key may use cache, refetch, or fetch

#### Verified visible text

```text
Important nuance

It is not always “no cache => fetch”.

For the new key, TanStack Query does this:

- if cache for `['repos', newSort]` exists, it can return cached data immediately
- if that cached data is stale, it may also refetch in the background
- if no cache exists, it starts a new fetch

So more precisely:

Changing `sort` causes a re-render, which gives `useQuery` a new `queryKey`. Then TanStack Query looks up that key in cache and decides whether to use cached data, fetch, or both.
```

#### Notes

Verified from extracted SVG image.

---

### R02C-S011 / S-061 - `3ec1269c3e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r02c-why-declarative`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why query keys make fetching declarative

#### Verified visible text

```text
Why this is called declarative

Because you are not saying:

“please refetch now”

You are saying:

“my data depends on `sort`”

and the query key expresses that dependency.
```

#### Notes

Verified from extracted SVG image.

---

## 4. Cleaned source notes

- If queryFn depends on a value, that value belongs in queryKey.
- Leaving bookId out of ['book'] wrongly reuses one cache entry for many books.
- Including bookId in ['book', bookId] creates distinct cache entries.
- Avoid manual refetch when a changing variable should be part of the key.
- setSort does not instantly fetch; it triggers a rerender, then useQuery runs with the new key.
- Changing a key means TanStack Query looks up that key and decides whether to use cache, refetch, or fetch.
- Keys can contain arrays and objects; TanStack Query hashes them deterministically.
- Key arrays/objects do not need React dependency-array style referential stability.
- Declarative fetching means saying what data depends on, not imperatively saying 'refetch now'.
- The TanStack ESLint plugin can help catch missing query-key dependencies.

---

## 5. Minimal interpretation

R02C explains why query keys are the declarative dependency system for `useQuery`. If a query function reads `bookId`, `sort`, `page`, or another variable, that value must appear in the query key. Otherwise TanStack Query may reuse the wrong cache entry. Instead of calling `refetch()` manually after state changes, the better pattern is to put the state in the key. React updates state, the component rerenders, the hook receives a new key, and TanStack Query decides from the cache whether to return data, refetch in the background, or fetch new data. This is why the model is declarative: the key says what the data depends on.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Every value used by queryFn belongs in queryKey | R02C-S001, R02C-S004 | extracted SVG image transcript/code | high |
| Leaving bookId out of queryKey reuses one cache entry for many books | R02C-S001 | extracted SVG image transcript/code | high |
| Including bookId in ['book', bookId] gives each book its own cache identity | R02C-S004 | extracted SVG image transcript/code | high |
| Avoid manual refetch when changing state should be in the key | R02C-S006, R02C-S009, R02C-S011 | extracted SVG image transcript/code | high |
| setSort causes a rerender; the hook sees the new key on the next render | R02C-S007 | extracted SVG image transcript/code | high |
| A new key can use cache, refetch stale data, or fetch if no cache exists | R02C-S010 | extracted SVG image transcript | high |
| Keys can contain objects and are hashed deterministically | R02C-S008 | extracted SVG image transcript/code | high |
| ESLint plugin helps catch missing key dependencies | R02C-S005 | extracted SVG image transcript/code | high |
| queryFn should throw on failed fetch | R02C-S003 | extracted SVG image transcript/code | high for visible code |

---

## 7. Question hooks

- Why must queryKey include every value used by queryFn?
- What goes wrong if bookId is used in queryFn but not included in queryKey?
- Why is ['book', bookId] better than ['book']?
- Why should sort be part of the query key?
- Why is calling refetch after setSort usually the wrong mental model?
- When exactly does a state change cause a new query key to be seen?
- What can TanStack Query do when the new key already has cached data?
- Can query keys contain objects?
- Why do query keys not need React dependency-array referential stability?
- Why is this called declarative fetching?
- What can the TanStack ESLint plugin help catch?

---

## 8. Open review issues

- R02C is complete for the reviewed query-key/manual-refetch/declarative-dependency sub-block.
- R02A/R02B/R02C now cover the planned R02 transcript split.
- `S-062` remains reserved for R04 staleTime/static/invalidation boundary review.
- Next step should be R02 closure audit: verify all 36 formal R02 candidates are processed or correctly reassigned.
