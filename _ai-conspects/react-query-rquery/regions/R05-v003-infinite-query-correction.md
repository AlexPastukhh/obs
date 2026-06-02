# R05 v003 - infinite query correction

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **4x rebuild A / transcript v001**  
Generated: 2026-06-02 08:43:05 UTC

---

## Direction check

Goal:
Rebuild Batch A after invalidating the bad Stage4x OCR archive.

Done:
Stage4x-fixed preflight returned the corrected scope to pending.

Now:
This file processes `13` images for `R05`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Batch A commit, process Batch B or run precision corrections if diff review finds issues.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
missing infinite-query / infinite-scroll / getNextPageParam / hasNextPage continuation cards
```

Key ideas:

- `useInfiniteQuery` does not require a special API response shape.
- `lastPage` is exactly what the query function returned for the last fetched page.
- `getNextPageParam` decides both the next `pageParam` and whether a next page exists.
- `fetchNextPage()` calls `getNextPageParam`, then reruns the query function with the returned page param.
- Infinite-scroll UI can trigger `fetchNextPage()` from an `IntersectionObserver`.

Reading quality:
```text
Readable from Stage4w2 contact sheets/source images.
No OCR-timeout, image-missing, or empty visible-text placeholder is used.
Some continuation cards are partial at card edges; those are marked in source notes.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-118, S-119, S-121, S-122, S-136, S-137, S-148, S-156, S-166, S-174, S-181, S-188, S-192
```

Boundary decision:
```text
Included in R05 after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-118 | IU-118 | `5230e3ed40` | `verified-visible-from-contact-sheet` | fetchNextPage button and flattened pages render |
| S-119 | IU-119 | `2ced60a702` | `verified-visible-from-contact-sheet` | useInfiniteQuery does not require special API response shape |
| S-121 | IU-121 | `70259fd00d` | `verified-visible-from-contact-sheet` | infinite scroll with IntersectionObserver |
| S-122 | IU-122 | `c74a0b5ca9` | `verified-visible-from-contact-sheet` | API response shape is arbitrary; lastPage is raw returned page |
| S-136 | IU-136 | `90f673f1e8` | `verified-visible-from-contact-sheet` | lastPage raw shape and choosing next page param |
| S-137 | IU-137 | `cf6de009a3` | `verified-visible-from-contact-sheet` | IntersectionObserver cleanup and flattened items render |
| S-148 | IU-148 | `ade73b8922` | `verified-visible-from-contact-sheet` | getNextPageParam signature in v5 |
| S-156 | IU-156 | `8f1063ec18` | `verified-visible-from-contact-sheet` | getNextPageParam arguments and return values |
| S-166 | IU-166 | `9b8c6d0493` | `verified-visible-from-contact-sheet` | null nextCursor means no next page |
| S-174 | IU-174 | `cc89bc8d71` | `verified-visible-partial-from-contact-sheet` | how fetchNextPage uses current last page and getNextPageParam |
| S-181 | IU-181 | `37105501d1` | `verified-visible-from-contact-sheet` | typical useInfiniteQuery function |
| S-188 | IU-188 | `a0d3c07634` | `verified-visible-from-contact-sheet` | hasNextPage source |
| S-192 | IU-192 | `fc6e30d164` | `verified-visible-from-contact-sheet` | hasNextPage true if getNextPageParam returns non-nullish |

---

## 2. Source transcript

### S-118 - fetchNextPage button and flattened pages render

Metadata:
```text
source_id: S-118
image_use_id: IU-118
fileId_short: 5230e3ed40
image_file: S-118__5230e3ed40.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Visible code continues an infinite-query component render:

- render a list from `data.map((post) => ...)`;
- render a button;
- `onClick={() => fetchNextPage()}`;
- `disabled={!hasNextPage || isFetchingNextPage}`;
- button text uses `isFetchingNextPage ? 'Loading...' : 'More'`.

The core point is that the UI triggers `fetchNextPage()` and disables the button when there is no next page or a next page is already being fetched.
```

#### Verified visible code
```tsx
return (
  <div>
    {items.map((post) => (
      <div key={post.id}>{post.title}</div>
    ))}

    <button
      onClick={() => fetchNextPage()}
      disabled={!hasNextPage || isFetchingNextPage}
    >
      {isFetchingNextPage ? 'Loading...' : 'More'}
    </button>
  </div>
)
```

#### Notes

Continuation card; lower part visible enough for button/fetchNextPage logic.

---

### S-119 - useInfiniteQuery does not require special API response shape

Metadata:
```text
source_id: S-119
image_use_id: IU-119
fileId_short: 2ced60a702
image_file: S-119__2ced60a702.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
2) Does `useInfiniteQuery` expect a special API response shape?

No — not really.
```

#### Notes

Small card; fully readable.

---

### S-121 - infinite scroll with IntersectionObserver

Metadata:
```text
source_id: S-121
image_use_id: IU-121
fileId_short: 70259fd00d
image_file: S-121__70259fd00d.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
19.3 Infinite scroll with intersection observer
```

#### Verified visible code
```tsx
function InfinitePosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts()

  const loadMoreRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })
```

#### Notes

Top/central code readable; continuation is S-137.

---

### S-122 - API response shape is arbitrary; lastPage is raw returned page

Metadata:
```text
source_id: S-122
image_use_id: IU-122
fileId_short: c74a0b5ca9
image_file: S-122__c74a0b5ca9.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
React Query does not require your API to return fields with special names like `nextCursor`, `items`, `data`, etc.

`lastPage` is just whatever your query function returned for that page.

So this is valid:

If `fetchUsers` returns:

then in `getNextPageParam`, `lastPage` will be:
```

#### Verified visible code
```tsx
queryFn: async ({ pageParam }) => {
  return fetchUsers(pageParam)
}

// if fetchUsers returns:
{
  results: [...],
  next: 42
}
```

#### Notes

Bottom continuation goes into S-136.

---

### S-136 - lastPage raw shape and choosing next page param

Metadata:
```text
source_id: S-136
image_use_id: IU-136
fileId_short: 90f673f1e8
image_file: S-136__90f673f1e8.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
then in `getNextPageParam`, `lastPage` will be:

You choose how to read it.

So yes:

- `lastPage` = raw page data from your API
- you decide how to compute the next page param from it
- then `fetchNextPage()` uses that computed next param for the next query call
```

#### Verified visible code
```tsx
{
  results: [...],
  next: 42
}
```

#### Notes

Continuation from S-122.

---

### S-137 - IntersectionObserver cleanup and flattened items render

Metadata:
```text
source_id: S-137
image_use_id: IU-137
fileId_short: cf6de009a3
image_file: S-137__cf6de009a3.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Continuation of the intersection-observer infinite-scroll example.
```

#### Verified visible code
```tsx
observer.observe(el)
return () => observer.disconnect()
}, [fetchNextPage, hasNextPage, isFetchingNextPage])

const items = data?.pages.flatMap((page) => page.items) ?? []

return (
  <>
    {items.map((post) => (
      <div key={post.id}>{post.title}</div>
    ))}
    <div ref={loadMoreRef} />
  </>
)
```

#### Notes

Continuation from S-121; visible enough for cleanup and render.

---

### S-148 - getNextPageParam signature in v5

Metadata:
```text
source_id: S-148
image_use_id: IU-148
fileId_short: ade73b8922
image_file: S-148__ade73b8922.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
3) How `getNextPageParam` works

In v5, its signature is:
```

#### Verified visible code
```tsx
getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
  pageParam | undefined | null
```

#### Notes

Card readable.

---

### S-156 - getNextPageParam arguments and return values

Metadata:
```text
source_id: S-156
image_use_id: IU-156
fileId_short: 8f1063ec18
image_file: S-156__8f1063ec18.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Arguments:

- `lastPage` = the most recently fetched page data
- `allPages` = array of all fetched page data
- `lastPageParam` = the page param used for that last page
- `allPageParams` = array of all page params used so far

You return:

- the next page param to use
- or `undefined` / `null` if there is no next page

Example:

If your API returns:

then the next fetch will use `pageParam = 30`.
```

#### Verified visible code
```tsx
getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined

{
  items: [...],
  nextCursor: 30
}
```

#### Notes

Readable with visible example.

---

### S-166 - null nextCursor means no next page

Metadata:
```text
source_id: S-166
image_use_id: IU-166
fileId_short: 9b8c6d0493
image_file: S-166__9b8c6d0493.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
If your API returns:

then the next fetch will use `pageParam = 30`.

If later the API returns:

then `getNextPageParam` returns `undefined`, and React Query knows there is no next page.
```

#### Verified visible code
```tsx
{ items: [...], nextCursor: 30 }

{ items: [...], nextCursor: null }
```

#### Notes

Readable continuation of S-156.

---

### S-174 - how fetchNextPage uses current last page and getNextPageParam

Metadata:
```text
source_id: S-174
image_use_id: IU-174
fileId_short: cc89bc8d71
image_file: S-174__cc89bc8d71.png
status: verified-visible-partial-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
4) How `fetchNextPage()` uses it

Yes, exactly:

1. current last page is in `data.pages[data.pages.length - 1]`
2. React Query calls `getNextPageParam(...)`
3. if it gets a value back, that value becomes the next `pageParam`
4. `queryFn` runs again with that `pageParam` in its context
```

#### Notes

Lower edge is cropped, but numbered logic is readable.

---

### S-181 - typical useInfiniteQuery function

Metadata:
```text
source_id: S-181
image_use_id: IU-181
fileId_short: 37105501d1
image_file: S-181__37105501d1.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Typical query function:

Here:

- first fetch uses `initialPageParam: 0`
- next fetches use whatever `getNextPageParam` returns
```

#### Verified visible code
```tsx
const result = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: async ({ pageParam }) => {
    const res = await fetch(`/api/projects?cursor=${pageParam}`)
    return res.json()
  },
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
})
```

#### Notes

Readable code and notes.

---

### S-188 - hasNextPage source

Metadata:
```text
source_id: S-188
image_use_id: IU-188
fileId_short: a0d3c07634
image_file: S-188__a0d3c07634.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
5) How does it know whether there is a next page?

Through `getNextPageParam`.
```

#### Notes

Small card; fully readable.

---

### S-192 - hasNextPage true if getNextPageParam returns non-nullish

Metadata:
```text
source_id: S-192
image_use_id: IU-192
fileId_short: fc6e30d164
image_file: S-192__fc6e30d164.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
The docs say `hasNextPage` is true if `getNextPageParam` returns something other than `null` or `undefined`.

So:

means:

- if `lastPage.nextCursor` is `123` -> `hasNextPage === true`
- if `lastPage.nextCursor` is `undefined` or `null` -> `hasNextPage === false`

So React Query does not magically inspect your API response schema. It relies on your `getNextPageParam` return value to know both:

- what to fetch next
- whether a next page exists at all
```

#### Verified visible code
```tsx
getNextPageParam: (lastPage) => lastPage.nextCursor
```

#### Notes

Readable.

---

## 3. Cleaned source notes

- `useInfiniteQuery` does not require a special API response shape.
- `lastPage` is exactly what the query function returned for the last fetched page.
- `getNextPageParam` decides both the next `pageParam` and whether a next page exists.
- `fetchNextPage()` calls `getNextPageParam`, then reruns the query function with the returned page param.
- Infinite-scroll UI can trigger `fetchNextPage()` from an `IntersectionObserver`.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| API response shape is arbitrary; `lastPage` is raw returned page | S-119, S-122, S-136 | high |
| `getNextPageParam` drives both next page param and `hasNextPage` | S-148, S-156, S-166, S-188, S-192 | high |
| `fetchNextPage()` uses the computed next page param | S-174, S-181 | high |
| IntersectionObserver can trigger `fetchNextPage()` | S-121, S-137 | high |

---

## 5. Open review issues

- This file is valid for Batch A because it contains visible text and no OCR-placeholder processed sources.
- Remaining Stage4x-fixed queue sources are not closed by this file.
- If diff review finds a wording issue in a partial continuation card, fix with a precision patch rather than reverting the whole batch.
