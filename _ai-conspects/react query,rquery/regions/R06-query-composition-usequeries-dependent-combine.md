# R06 - Query composition: useQueries / dependent / combine

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4c / verified region transcript v001**  
Generated: 2026-06-01 18:45:29 UTC

This file covers the R06 area about dependent queries, parallel queries, `useQueries`, and `combine`.

---

## Direction check

Goal:
Convert `react-query,rquery` into source-preserving region text for AI repetition.

Now:
R10 and R07 are completed/ready for review; R06 is the next compact adjacent region.

This step:
Create the first real R06 transcript from 10 embedded SVG images.

Why:
R06 explains how to compose multiple queries, which connects to R07's cache/prefetch material and R10's cache/client behavior.

Next:
1. review R06 diff; 2. correct transcript errors if any; 3. continue to the next region.

---

## 0. You are here

Current region: `R06 - Query composition: useQueries / dependent / combine`  
Status: `verified transcript from embedded SVG images`  
Source count: `10`  
Known limitations: several screenshots are split or cropped; each limitation is marked per source.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
This region explains how to compose multiple React Query queries:
- dependent queries, where one query needs data from another;
- parallel queries, where independent resources are fetched separately;
- multiple `useQuery` calls;
- `useQueries` for multiple or dynamic query configs;
- `combine` for deriving one aggregate result from multiple query states;
- component readability when a custom hook returns exactly the combined shape the component needs.
```

Key ideas:

```text
1. Dependent queries are correct when query B depends on query A.
2. Dependent queries create serial loading.
3. If resources are independent, fetch them in parallel.
4. Multiple `useQuery` calls keep separate cache/lifecycle/error/retry state.
5. `useQueries` gives separate caches and parallel execution with easier aggregation.
6. `combine` can turn many query results into one result object.
7. A combined custom hook can make the component easier to read.
```

How well I perceived the area:

```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high for visible code blocks.
Spatial/layout understanding: medium-high; examples are clustered but several are split/cropped.
```

Reading limitations:

```text
S-126 and S-140 are two parts of one component example.
S-145 has top context cropped.
S-159 has top context cropped.
S-165 has top context cropped.
```

Confidence:

```text
High for the main ideas: dependent queries, parallel queries, useQueries, combine.
High for visible code transcription.
Medium for missing surrounding context in cropped sources.
```

---

## 1. Original Excalidraw labels

```text
use queries dependant queries
COMBINE
NOT PARALLEL
SERIAL EXECUTION, GETTING DATA FOR ONE QUERY THEN FOR ANOTHER
PROMISE.ALL, SHARE LIFECTCLE FETCHING , REFETCHING AND ERRORING
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Status | Cut off | Theme |
|---|---|---|---|---|---|---|
| R06-S001 | S-126 | IU-126 | `68f33d5ec1` | `verified-visible-partial-from-embedded-svg-image` | yes-bottom-continuation-in-S-140 | component example without combine |
| R06-S002 | S-140 | IU-140 | `52ce7625ac` | `verified-visible-continuation-from-embedded-svg-image` | yes-top-continuation-from-S-126 | component example without combine continuation |
| R06-S003 | S-128 | IU-128 | `664984d1b2` | `verified-from-embedded-svg-image` | no | useQueries and dynamic useQueries |
| R06-S004 | S-130 | IU-130 | `d4b221fae1` | `verified-from-embedded-svg-image` | no | dependent queries |
| R06-S005 | S-145 | IU-145 | `bfef41b217` | `verified-visible-partial-from-embedded-svg-image` | top-context-cropped | dependent query serial loading caveat |
| R06-S006 | S-142 | IU-142 | `6c191bae1e` | `verified-from-embedded-svg-image` | no | combine option for useQueries |
| R06-S007 | S-150 | IU-150 | `3071e8a02c` | `verified-from-embedded-svg-image` | no | combine returns object-shaped result |
| R06-S008 | S-159 | IU-159 | `36f2dd3bd7` | `verified-visible-partial-from-embedded-svg-image` | top-context-cropped | component consuming combined result |
| R06-S009 | S-157 | IU-157 | `7897e4ffa9` | `verified-from-embedded-svg-image` | no | parallel queries with multiple useQuery calls |
| R06-S010 | S-165 | IU-165 | `58affaa7df` | `verified-visible-partial-from-embedded-svg-image` | top-context-cropped | independent query lifecycle |

---

## 3. Source transcript

### R06-S001 / S-126 - `68f33d5ec1`

Metadata:

- status: `verified-visible-partial-from-embedded-svg-image`
- readability: `high`
- cut off: `yes-bottom-continuation-in-S-140`
- confidence: `high-for-visible-text`
- theme: component example without combine

#### Verified visible text

```text
7. Example in a component

Without `combine`:
```

#### Verified visible code

```ts
function BookPage({ bookId }: { bookId: string }) {
  const [bookQuery, reviewsQuery] = useQueries({
    queries: [
      { queryKey: ['book', bookId], queryFn: () => getBook(bookId) },
      { queryKey: ['reviews', bookId], queryFn: () => getReviews(bookId) },
    ],
  })

  if (bookQuery.status === 'pending' || reviewsQuery.status === 'pending') {
    return <div>Loading...</div>
  }
```

#### Notes

Visible bottom is cut off. The component continues in S-140.

---

### R06-S002 / S-140 - `52ce7625ac`

Metadata:

- status: `verified-visible-continuation-from-embedded-svg-image`
- readability: `high`
- cut off: `yes-top-continuation-from-S-126`
- confidence: `high-for-visible-text`
- theme: component example without combine continuation

#### Verified visible code

```ts
if (bookQuery.status === 'error' || reviewsQuery.status === 'error') {
    return <div>Something went wrong</div>
  }

  return (
    <div>
      <h1>{bookQuery.data.title}</h1>
      <div>{reviewsQuery.data.length} reviews</div>
    </div>
  )
}
```

#### Notes

Continuation of S-126.

---

### R06-S003 / S-128 - `664984d1b2`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: useQueries and dynamic useQueries

#### Verified visible text

```text
15.3 `useQueries`

Best of both worlds: separate caches, parallel execution, easy aggregation.

Dynamic `useQueries`
```

#### Verified visible code

```ts
const results = useQueries({
  queries: [
    { queryKey: ['repos'], queryFn: fetchRepos },
    { queryKey: ['members'], queryFn: fetchMembers },
  ],
})

function useRepoIssues(repoNames: string[]) {
  return useQueries({
    queries: repoNames.map((repo) => ({
      queryKey: ['issues', repo],
      queryFn: () => fetchIssues(repo),
    })),
  })
}
```

#### Notes

Verified from embedded SVG image.

---

### R06-S004 / S-130 - `d4b221fae1`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: dependent queries

#### Verified visible text

```text
14. Dependent queries

Sometimes query B needs data from query A.
```

#### Verified visible code

```ts
function useMovie(title: string) {
  return useQuery({
    queryKey: ['movie', title],
    queryFn: () => getMovie(title),
  })
}

function useDirector(id?: string) {
  return useQuery({
    queryKey: ['director', id],
    queryFn: () => getDirector(id!),
    enabled: id !== undefined,
  })
}
```

#### Notes

Verified from embedded SVG image.

---

### R06-S005 / S-145 - `bfef41b217`

Metadata:

- status: `verified-visible-partial-from-embedded-svg-image`
- readability: `high`
- cut off: `top-context-cropped`
- confidence: `high-for-visible-text`
- theme: dependent query serial loading caveat

#### Verified visible text

```text
Dependent queries are correct, but they create serial loading.

If resources are independent, fetch them in parallel instead.
```

#### Verified visible code

```ts
function useMovieWithDirectorDetails(title: string) {
  const movie = useMovie(title)
  const directorId = movie.data?.director
  const director = useDirector(directorId)

  return { movie, director }
}
```

#### Notes

Top context is cropped; visible code/text is transcribed.

---

### R06-S006 / S-142 - `6c191bae1e`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: combine option for useQueries

#### Verified visible text

```text
15.4 `combine`

You can derive one combined result.
```

#### Verified visible code

```ts
function useBookAndReviews(bookId: string) {
  return useQueries({
    queries: [
      { queryKey: ['book', bookId], queryFn: () => getBook(bookId) },
      { queryKey: ['reviews', bookId], queryFn: () => getReviews(bookId) },
    ],
    combine: (queries) => {
      const isPending = queries.some((q) => q.status === 'pending')
      const isError = queries.some((q) => q.status === 'error')
      const [book, reviews] = queries.map((q) => q.data)

      return { isPending, isError, book, reviews }
    },
  })
}
```

#### Notes

Verified from embedded SVG image.

---

### R06-S007 / S-150 - `3071e8a02c`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: combine returns object-shaped result

#### Verified visible text

```text
With `combine`:
```

#### Verified visible code

```ts
function useBookAndReviews(bookId: string) {
  return useQueries({
    queries: [
      { queryKey: ['book', bookId], queryFn: () => getBook(bookId) },
      { queryKey: ['reviews', bookId], queryFn: () => getReviews(bookId) },
    ],
    combine: (queries) => {
      return {
        isPending: queries.some((q) => q.status === 'pending'),
        isError: queries.some((q) => q.status === 'error'),
        book: queries[0].data,
        reviews: queries[1].data,
      }
    },
  })
}
```

#### Notes

Verified from embedded SVG image.

---

### R06-S008 / S-159 - `36f2dd3bd7`

Metadata:

- status: `verified-visible-partial-from-embedded-svg-image`
- readability: `high`
- cut off: `top-context-cropped`
- confidence: `high-for-visible-text`
- theme: component consuming combined result

#### Verified visible text

```text
This is easier to read because the component gets exactly what it needs.
```

#### Verified visible code

```ts
function BookPage({ bookId }: { bookId: string }) {
  const { isPending, isError, book, reviews } = useBookAndReviews(bookId)

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>

  return (
    <div>
      <h1>{book?.title}</h1>
      <div>{reviews?.length ?? 0} reviews</div>
    </div>
  )
}
```

#### Notes

Top context is cropped; visible code/text is transcribed. This source pairs with S-150.

---

### R06-S009 / S-157 - `7897e4ffa9`

Metadata:

- status: `verified-from-embedded-svg-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: parallel queries with multiple useQuery calls

#### Verified visible text

```text
15. Parallel queries

15.1 Multiple `useQuery` calls

Best when resources are independent.
```

#### Verified visible code

```ts
const reposQuery = useQuery({
  queryKey: ['repos'],
  queryFn: fetchRepos,
})

const membersQuery = useQuery({
  queryKey: ['members'],
  queryFn: fetchMembers,
})
```

#### Notes

Verified from embedded SVG image.

---

### R06-S010 / S-165 - `58affaa7df`

Metadata:

- status: `verified-visible-partial-from-embedded-svg-image`
- readability: `high`
- cut off: `top-context-cropped`
- confidence: `high-for-visible-text`
- theme: independent query lifecycle

#### Verified visible text

```text
Each query gets its own:

- cache entry
- loading state
- error state
- retry logic
- stale/fetch lifecycle
```

#### Notes

Top context is cropped. This appears to continue the parallel queries explanation.

---

## 4. Cleaned source notes

These notes are cleaned from the verified transcript above; they do not add external React Query material.

- Dependent queries are used when one query needs data returned by another query.
- A dependent query can use `enabled` to wait until the required value exists.
- Dependent queries are correct for true dependencies, but they create serial loading.
- If resources are independent, the sources recommend fetching them in parallel.
- Multiple `useQuery` calls are best when resources are independent.
- Each query gets its own cache entry, loading state, error state, retry logic, and stale/fetch lifecycle.
- `useQueries` allows multiple query configs and can also be built dynamically from an array.
- `combine` can derive one combined result from multiple query states.
- A combined result can expose `isPending`, `isError`, `book`, and `reviews` directly to the component.

---

## 5. Minimal interpretation

R06 is about choosing the right query composition pattern. If one request depends on another, dependent queries are appropriate, but they serialize loading. If resources are independent, parallel queries or `useQueries` are preferred. `combine` helps turn multiple query results into one component-friendly shape.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Dependent queries are for cases where query B needs data from query A | R06-S004 | embedded SVG image transcript/code | high |
| Dependent queries can create serial loading | R06-S005 | embedded SVG image transcript/code | high |
| Independent resources should be fetched in parallel | R06-S005, R06-S009 | embedded SVG image transcript | high |
| Multiple `useQuery` calls are best when resources are independent | R06-S009 | embedded SVG image transcript/code | high |
| Each query gets its own cache/lifecycle/error/retry state | R06-S010 | embedded SVG image transcript | high |
| `useQueries` gives separate caches, parallel execution, and easy aggregation | R06-S003 | embedded SVG image transcript/code | high |
| Dynamic `useQueries` can be created from an array | R06-S003 | embedded SVG image transcript/code | high |
| `combine` can derive one combined result | R06-S006, R06-S007 | embedded SVG image transcript/code | high |
| A combined hook can make the component easier to read | R06-S008 | embedded SVG image transcript/code | high |

---

## 7. Question hooks

- When should you use a dependent query?
- Why do dependent queries create serial loading?
- When should independent resources be fetched in parallel instead?
- What does `enabled` do in the dependent query example?
- What is the benefit of multiple `useQuery` calls for independent resources?
- What does each query get independently?
- What does `useQueries` provide over manually managing multiple query results?
- How can `useQueries` be built dynamically?
- What does `combine` do in `useQueries`?
- Why can a combined custom hook make a component easier to read?

---

## 8. Open review issues

- `S-126` and `S-140` are split parts of one component example.
- `S-145`, `S-159`, and `S-165` have cropped top context.
- Source chips and UI copy buttons were omitted unless content-bearing.


---

## Stage 4i correction addendum - R06 v002

Generated: 2026-06-01 22:02:02 UTC

### Direction check

Goal: finish the audited correction for R06 under the no-image-loss boundary rules.  
Now: R06 v001 contained the main `useQueries` / dependent / combine transcript, but audit found one missing continuation.  
This step: add `S-176` and explicitly document neighboring R07 sources that are not R06.  
Why: `Promise.all` inside one `queryFn` is query composition, while the adjacent prefetch/fetchQuery road belongs to R07.

### 0.2 Coverage / boundary review update

Included in R06 v002:

```text
S-126, S-128, S-130, S-140, S-142, S-145, S-150, S-157, S-159, S-165, S-176
```

Added in v002:

```text
S-176 -> 15.2 One query with Promise.all
```

Checked but excluded from R06:

```text
S-132, S-146, S-162, S-171, S-180 -> R07 prefetch / staleTime / fetchQuery / ensureQueryData road, not R06.
```

### R06-S011 / S-176 - `f7fe899443`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `same-road-continuation`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: 15.2 One query with Promise.all

#### Verified visible text

```text
15.2 One query with `Promise.all`

This is simple, but both requests now:

- fetch together
- refetch together
- error together
- share one lifecycle
```

#### Verified visible code

```ts
useQuery({
  queryKey: ['reposAndMembers'],
  queryFn: () => Promise.all([fetchRepos(), fetchMembers()]),
})
```

### R06 v002 interpretation update

`Promise.all` inside one `queryFn` is the compact alternative where several requests are treated as one query lifecycle. This belongs to R06 because it is about query composition, not prefetching.
