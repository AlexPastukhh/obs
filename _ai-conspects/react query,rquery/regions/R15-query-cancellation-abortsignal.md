# R15 - Query cancellation / AbortSignal

Conspect: `react query,rquery`  
File type: **verified region transcript**  
Stage: **5b / transcript v001**  
Generated: 2026-06-02 11:29:24 UTC

---

## Direction check

Goal:
Process the first transcript pass after Stage5a boundary review.

Done:
Stage5a split S-261..S-383 into candidate groups.

Now:
This file processes `5` sources for `R15`.

Why:
The images are readable and do not need OCR-placeholder handling.

Next:
After Stage5b review/commit, process Stage5c R14 persistence/hydration/pruning.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
AbortSignal request cancellation, cancelQueries, and cancellation limitations with Suspense hooks
```

Key ideas:

- Query functions can receive an `AbortSignal` and pass it to fetch.
- React Query can cancel obsolete requests when query keys change or work is no longer needed.
- `cancelQueries` can explicitly cancel older in-flight requests before page transitions.
- Cancellation does not work with Suspense hooks, so cancellation examples use normal `useQuery`.

Reading quality:
```text
Visible text read from Stage5a source images/contact sheets.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
Continuation and duplicate cards are explicitly marked in source notes.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-376, S-378, S-379, S-381, S-383
```

Boundary decision:
```text
Included in R15 after Stage5b local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-376 | IU-376 | `2e53933f4d` | `verified-visible` | Suspense hooks and cancellation limitation |
| S-378 | IU-378 | `ff1f13ba3a` | `verified-visible` | fetch with AbortSignal and useQuery receives signal |
| S-379 | IU-379 | `3183b42852` | `verified-visible` | query functions can receive AbortSignal |
| S-381 | IU-381 | `a0ea9f6a34` | `verified-visible` | explicitly cancel older product-page requests before navigation |
| S-383 | IU-383 | `a0ea9f6a34` | `verified-visible-duplicate` | duplicate source: explicit cancelQueries page navigation |

---

## 2. Source transcript

### S-376 - Suspense hooks and cancellation limitation

Metadata:
```text
source_id: S-376
image_use_id: IU-376
fileId_short: 2e53933f4d
image_file: S-376__2e53933f4d.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
This does not work with `useSuspenseQuery`; TanStack Query documents that cancellation does not work for Suspense hooks.

Full example begins with imports, `QueryClient`, `QueryClientProvider`, `useQuery`, and `useQueryClient`; then defines a `Product` type.
```

#### Verified visible code
```tsx
import * as React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

type Product = {
  id: number
  name: string
}
```

#### Notes

Top of full cancellation example; continuation in S-378 and S-381/S-383.

---

### S-378 - fetch with AbortSignal and useQuery receives signal

Metadata:
```text
source_id: S-378
image_use_id: IU-378
fileId_short: ff1f13ba3a
image_file: S-378__ff1f13ba3a.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
Continuation of the full request-cancellation example. The API function accepts `AbortSignal`, passes it to `fetch`, and `useQuery` passes the query `signal` into that function.
```

#### Verified visible code
```tsx
type ProductsResponse = {
  page: number
  items: Product[]
  hasMore: boolean
}

// Simulated API call using fetch + AbortSignal
async function fetchProducts(page: number, signal?: AbortSignal): Promise<ProductsResponse> {
  const res = await fetch(`/api/products?page=${page}`, { signal })

  if (!res.ok) {
    throw new Error(`Failed to fetch page ${page}`)
  }

  return res.json()
}

function ProductsPage() {
  const [page, setPage] = React.useState(1)
  const [isPending, startTransition] = React.useTransition()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['products', page],
    queryFn: ({ signal }) => fetchProducts(page, signal),
    staleTime: 0,
  })
}
```

#### Notes

Readable top/central part; later page handlers continue in S-381/S-383.

---

### S-379 - query functions can receive AbortSignal

Metadata:
```text
source_id: S-379
image_use_id: IU-379
fileId_short: 3183b42852
image_file: S-379__3183b42852.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
27. Request cancellation

Query functions can receive an `AbortSignal`.

If the query becomes obsolete, React Query can cancel the request.

Useful for:

- fast-changing search input
- navigation away
- outdated request replacement
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['todos', search],
  queryFn: ({ signal }) =>
    fetch(`/api/todos?q=${search}`, { signal }).then((r) => r.json()),
})
```

#### Notes

Readable.

---

### S-381 - explicitly cancel older product-page requests before navigation

Metadata:
```text
source_id: S-381
image_use_id: IU-381
fileId_short: a0ea9f6a34
image_file: S-381__a0ea9f6a34.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
The example explicitly cancels older product-page requests before moving to the next or previous page. This is useful when users click quickly and older pages are no longer interesting.
```

#### Verified visible code
```tsx
const goToNextPage = () => {
  const nextPage = page + 1

  // Optional: explicitly cancel older product-page requests.
  // This is useful when user clicks quickly and you know
  // older pages are no longer interesting.
  queryClient.cancelQueries({
    queryKey: ['products'],
  })

  startTransition(() => {
    setPage(nextPage)
  })
}

const goToPrevPage = () => {
  if (page === 1) return

  const prevPage = page - 1

  queryClient.cancelQueries({
    queryKey: ['products'],
  })

  startTransition(() => {
    setPage(prevPage)
  })
}
```

#### Notes

Readable; duplicated by S-383.

---

### S-383 - duplicate source: explicit cancelQueries page navigation

Metadata:
```text
source_id: S-383
image_use_id: IU-383
fileId_short: a0ea9f6a34
image_file: S-383__a0ea9f6a34.png
status: verified-visible-duplicate
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
Duplicate visual source of S-381: explicit `queryClient.cancelQueries({ queryKey: ['products'] })` before page transitions.
```

#### Verified visible code
```tsx
queryClient.cancelQueries({
  queryKey: ['products'],
})

startTransition(() => {
  setPage(nextPage)
})
```

#### Notes

S-383 has the same image/fileId as S-381; kept as duplicate-source evidence so the source is not lost.

---

## 3. Cleaned source notes

- Query functions can receive an `AbortSignal` and pass it to fetch.
- React Query can cancel obsolete requests when query keys change or work is no longer needed.
- `cancelQueries` can explicitly cancel older in-flight requests before page transitions.
- Cancellation does not work with Suspense hooks, so cancellation examples use normal `useQuery`.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| AbortSignal can be passed to fetch from queryFn context | S-378, S-379 | high |
| Cancellation does not work with Suspense hooks | S-376 | high |
| Explicit cancelQueries can cancel older product-page requests | S-381, S-383 | high |

---

## 5. Open review issues

- This file is valid for Stage5b because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage5a groups are not closed by this file: R14, R11B, R09D.
- Stage5 closure audit must run after Stage5b/Stage5c/Stage5d are complete.
