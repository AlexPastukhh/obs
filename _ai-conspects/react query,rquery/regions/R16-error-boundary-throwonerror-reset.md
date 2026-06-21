# R16 - Error handling / throwOnError / reset

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **6b / transcript v001**  
Generated: 2026-06-02 12:49:41 UTC

---

## Direction check

Goal:
Process the first transcript pass after Stage6a boundary review.

Done:
Stage6a split S-384..S-537 into candidate groups.

Now:
This file processes `10` sources for `R16`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage6b review/commit, process Stage6c R20 + R22.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Local error UI, throwOnError, ErrorBoundary / QueryErrorResetBoundary, retry ordering, and reset/retry flow.
```

Key ideas:

- Local error UI can render from `isError` and `error` directly inside a component.
- `throwOnError` lets query errors surface into render so an Error Boundary can catch them.
- Conditional `throwOnError` can throw only when there is no cached data and keep stale data visible on background refetch errors.
- Retries happen before a final error is thrown to an Error Boundary.
- `QueryErrorResetBoundary` integrates Error Boundary reset with query retry/refetch flow.
- Global defaults can configure `throwOnError`; non-boundary errors can go to toast, logging, notifications, or query-cache callbacks.

Reading quality:
```text
Visible text was read from Stage6a source images/contact sheets with OCR assistance.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
If a later review finds a small OCR artifact, fix that source with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-390, S-394, S-398, S-405, S-407, S-408, S-409, S-411, S-412, S-419
```

Stage6b local boundary correction:
```text
S-419: Stage6a R19 -> Stage6b R16
```

Boundary decision:
```text
Included in R16 after Stage6b local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-390 | IU-390 | `47947570b6` | `R16` | `verified-visible-ocr-assisted` | 29. Error handling |
| S-394 | IU-394 | `b3351d14fd` | `R16` | `verified-visible-ocr-assisted` | 29.2 Error boundaries with throwOnError |
| S-398 | IU-398 | `bfb1da8007` | `R16` | `verified-visible-ocr-assisted` | 29.3 Conditional throwOnError |
| S-405 | IU-405 | `913168d66e` | `R16` | `verified-visible-ocr-assisted` | 29.4 QueryErrorResetBoundary |
| S-407 | IU-407 | `750efbd479` | `R16` | `verified-visible-ocr-assisted` | Not immediately. |
| S-408 | IU-408 | `b3e6794ae9` | `R16` | `verified-visible-ocr-assisted` | FLOW 1 — First render, query starts |
| S-409 | IU-409 | `80a0e0aac1` | `R16` | `verified-visible-ocr-assisted` | Step 1 |
| S-411 | IU-411 | `e55cc5a5e6` | `R16` | `verified-visible-ocr-assisted` | Only after the query ends up in its final error state does throwOnError matter for render. |
| S-412 | IU-412 | `c1bdab56fb` | `R16` | `verified-visible-ocr-assisted` | function TodosPage() { |
| S-419 | IU-419 | `2736adf8b0` | `R19` | `verified-visible-ocr-assisted` | 29.5 Global error handling |

---

## 2. Source transcript

### S-390 - 29. Error handling

Metadata:
```text
source_id: S-390
image_use_id: IU-390
fileId_short: 47947570b6
image_file: S-390__47947570b6.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
29. Error handling
29.1 Local error Ul
‘> TypeScript
const { isError, error } = useQuery({
queryKey: ['‘repos'],
queryFn: fetchRepos,
})
if (isError) {
return <div>{(error as Error) .message}</div>
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-394 - 29.2 Error boundaries with throwOnError

Metadata:
```text
source_id: S-394
image_use_id: IU-394
fileId_short: b3351d14fd
image_file: S-394__b3351d14fd.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
29.2 Error boundaries with throwOnError

Error boundaries catch render-time errors.

To let query errors surface into render, use throwOnError .
‘> TypeScript ‘eo
function useTodos() {

return useQuery({
queryKey: [‘todos'’, ‘list'],
queryFn: fetchTodos,
throwOnError: true,
})
}
Then wrap with an error boundary.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-398 - 29.3 Conditional throwOnError

Metadata:
```text
source_id: S-398
image_use_id: IU-398
fileId_short: bfb1da8007
image_file: S-398__bfb1da8007.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
29.3 Conditional throwOnError
Often you want to throw only when there is no cached data.
‘> TypeScript oO
useQuery({
queryKey: [‘todos', ‘list'],
queryFn: fetchTodos,
throwOnError: (_error, query) => typeof query.state.data === ‘undefined’,
})
This is a great pattern:
¢ initial load failure — throw to boundary
e background refetch failure while old data exists - keep showing stale data
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-405 - 29.4 QueryErrorResetBoundary

Metadata:
```text
source_id: S-405
image_use_id: IU-405
fileId_short: 913168d66e
image_file: S-405__913168d66e.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
29.4 QueryErrorResetBoundary
Use this to integrate error boundaries with query retries.
‘> TypeScript
import { QueryErrorResetBoundary } from ‘@tanstack/react-query'
import { ErrorBoundary } from ‘react-error-boundary'
fon etinn TrandancDaanl) FF
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-407 - Not immediately.

Metadata:
```text
source_id: S-407
image_use_id: IU-407
fileId_short: 750efbd479
image_file: S-407__750efbd479.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Not immediately.

lf retries are configured, React Query usually does not throw to the Error Boundary on the first failed
attempt.

lt first uses its retry logic.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-408 - FLOW 1 — First render, query starts

Metadata:
```text
source_id: S-408
image_use_id: IU-408
fileId_short: b3e6794ae9
image_file: S-408__b3e6794ae9.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
FLOW 1 — First render, query starts
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-409 - Step 1

Metadata:
```text
source_id: S-409
image_use_id: IU-409
fileId_short: 80a0e0aac1
image_file: S-409__80a0e0aac1.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Step 1
React renders TodosPage .
Inside it, React renders:
® QueryErrorResetBoundary
e then ErrorBoundary
e then Todos
Step 2
Todos runs.
Inside Todos , useQuery(...) runs with:
‘> TypeScript
queryKey: [‘todos' ]
queryFn: fetchTodos
throwOnError: true
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-411 - Only after the query ends up in its final error state does throwOnError matter for render.

Metadata:
```text
source_id: S-411
image_use_id: IU-411
fileId_short: e55cc5a5e6
image_file: S-411__e55cc5a5e6.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Only after the query ends up in its final error state does throwOnError matter for render.
So the rough order is:
1. query runs
2. request fails
3. React Query retries if allowed
4. if aretry later succeeds — no thrown render error
5. if all retries fail and query ends in error state — then throwOnError can throw during render
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-412 - function TodosPage() {

Metadata:
```text
source_id: S-412
image_use_id: IU-412
fileId_short: c1bdab56fb
image_file: S-412__c1bdab56fb.png
stage6a_group: R16
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
function TodosPage() {
return (
<QueryErrorResetBoundary>
{({ reset }) => (
<ErrorBoundary
onReset={reset}
fallbackRender={({ error, resetErrorBoundary }) => (
<div>
<p>{error .message}</p>
<button onClick={resetErrorBoundary}>Try again</button>
</div>
)}
>
<Todos />
</ErrorBoundary>
)}
</QueryErrorResetBoundary>
)
}
Recovery flow:
1. reset boundary
2. refetch query A];
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-419 - 29.5 Global error handling

Metadata:
```text
source_id: S-419
image_use_id: IU-419
fileId_short: 2736adf8b0
image_file: S-419__2736adf8b0.png
stage6a_group: R19
stage6b_region: R16
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
29.5 Global error handling
You can configure defaults in the client.
‘> TypeScript ‘eo
const queryClient = new QueryClient({
defaultOptions: {
queries: {
throwOnError: (_error, query) => typeof query.state.data === ‘undefined’,
hs
}>
})
And surface non-boundary errors through:
e toast
¢ global notification
e logging
* query-cache callbacks
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Local error UI can render from `isError` and `error` directly inside a component.
- `throwOnError` lets query errors surface into render so an Error Boundary can catch them.
- Conditional `throwOnError` can throw only when there is no cached data and keep stale data visible on background refetch errors.
- Retries happen before a final error is thrown to an Error Boundary.
- `QueryErrorResetBoundary` integrates Error Boundary reset with query retry/refetch flow.
- Global defaults can configure `throwOnError`; non-boundary errors can go to toast, logging, notifications, or query-cache callbacks.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Local error UI can render from `isError` and `error` directly inside a component. | S-390, S-394, S-398, S-405, S-407, S-408, S-409, S-411, S-412, S-419 | medium-high |
| `throwOnError` lets query errors surface into render so an Error Boundary can catch them. | S-390, S-394, S-398, S-405, S-407, S-408, S-409, S-411, S-412, S-419 | medium-high |
| Conditional `throwOnError` can throw only when there is no cached data and keep stale data visible on background refetch errors. | S-390, S-394, S-398, S-405, S-407, S-408, S-409, S-411, S-412, S-419 | medium-high |
| Retries happen before a final error is thrown to an Error Boundary. | S-390, S-394, S-398, S-405, S-407, S-408, S-409, S-411, S-412, S-419 | medium-high |
| `QueryErrorResetBoundary` integrates Error Boundary reset with query retry/refetch flow. | S-390, S-394, S-398, S-405, S-407, S-408, S-409, S-411, S-412, S-419 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6b because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage6a groups are not closed by this file: main R20/R22 and R21/R23.
- Stage6 closure audit must run after Stage6b/Stage6c/Stage6d are complete.
