# R18 - Query defaults / key factories / option factories

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
This file processes `7` sources for `R18`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage6b review/commit, process Stage6c R20 + R22.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Global query defaults, per-key defaults, per-query overrides, query key factories, and query option factories.
```

Key ideas:

- Query defaults can be global through `defaultOptions` or scoped to key prefixes with `setQueryDefaults`.
- Per-query options can override centralized defaults.
- Query key factories keep query keys consistent and colocated per feature.
- Factories can return full query option objects, not just keys.
- A factory output can still be spread and overridden locally.

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
S-385, S-387, S-391, S-397, S-400, S-406, S-415
```

Stage6b local boundary correction:
```text
S-406: Stage6a R19 -> Stage6b R18
S-415: Stage6a R19 -> Stage6b R18
```

Boundary decision:
```text
Included in R18 after Stage6b local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-385 | IU-385 | `5fc37cd9db` | `R18` | `verified-visible-ocr-assisted` | 24. Query defaults |
| S-387 | IU-387 | `d878621922` | `R18` | `verified-visible-ocr-assisted` | 24.1 Global defaults |
| S-391 | IU-391 | `8c70db8566` | `R18` | `verified-visible-ocr-assisted` | 24.3 Per-query override |
| S-397 | IU-397 | `155177db8b` | `R18` | `verified-visible-ocr-assisted` | 25. Query key factories |
| S-400 | IU-400 | `78143a8e93` | `R18` | `verified-visible-ocr-assisted` | Use them everywhere: |
| S-406 | IU-406 | `246e85f82c` | `R19` | `verified-visible-ocr-assisted` | 25.1 Query option factories |
| S-415 | IU-415 | `7f54e43053` | `R19` | `verified-visible-ocr-assisted` | Usage: |

---

## 2. Source transcript

### S-385 - 24. Query defaults

Metadata:
```text
source_id: S-385
image_use_id: IU-385
fileId_short: 5fc37cd9db
image_file: S-385__5fc37cd9db.png
stage6a_group: R18
stage6b_region: R18
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
24. Query defaults
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-387 - 24.1 Global defaults

Metadata:
```text
source_id: S-387
image_use_id: IU-387
fileId_short: d878621922
image_file: S-387__d878621922.png
stage6a_group: R18
stage6b_region: R18
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
24.1 Global defaults
‘> TypeScript oO
const queryClient = new QueryClient({
defaultOptions: {
queries: {
staleTime: 10 * 1000,
retry: 2,
ts
ts
})
24.2 Defaults for a subset of keys
‘> TypeScript oO
queryClient.setQueryDefaults(['todos', ‘detail'], {
staleTime: 10 * 1000,
})
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-391 - 24.3 Per-query override

Metadata:
```text
source_id: S-391
image_use_id: IU-391
fileId_short: 8c70db8566
image_file: S-391__8c70db8566.png
stage6a_group: R18
stage6b_region: R18
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
24.3 Per-query override
‘> TypeScript ‘eo
useQuery({
queryKey: [‘todos', ‘detail’, id],
queryFn: () => fetchTodo(id),
staleTime: 60 * 1000,
})
Any option except queryKey itself can effectively be centralized and reused.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-397 - 25. Query key factories

Metadata:
```text
source_id: S-397
image_use_id: IU-397
fileId_short: 155177db8b
image_file: S-397__155177db8b.png
stage6a_group: R18
stage6b_region: R18
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
25. Query key factories
This is one of the best structural patterns.
‘> TypeScript c
export const todoKeys = {
all: () => [‘todos'] as const,
allLists: () => [-..todoKeys.all(), ‘list'] as const,
list: (sort: string) => [...todoKeys.allLists(), { sort }] as const,
detail: (id: string) => [...todoKeys.all(), ‘detail’, id] as const,
; v
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-400 - Use them everywhere:

Metadata:
```text
source_id: S-400
image_use_id: IU-400
fileId_short: 78143a8e93
image_file: S-400__78143a8e93.png
stage6a_group: R18
stage6b_region: R18
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Use them everywhere:
</> TypeScript
useQuery({
queryKey: todoKeys.list(sort),
queryFn: () => fetchTodos(sort),
})
‘> TypeScript
queryClient . invalidateQueries({
queryKey: todoKeys-.allLists(),
})
Principle
Create one factory per feature.
Keep all keys in that feature under the same prefix.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-406 - 25.1 Query option factories

Metadata:
```text
source_id: S-406
image_use_id: IU-406
fileId_short: 246e85f82c
image_file: S-406__246e85f82c.png
stage6a_group: R19
stage6b_region: R18
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
25.1 Query option factories
You can go further and return full option objects.
‘> TypeScript ‘eo
const todoQueries = {
list: (sort: string) => ({
queryKey: todoKeys.list(sort),
queryFn: () => fetchTodos(sort),
staleTime: 5000,
3),
detail: (id: string) => ({
queryKey: todoKeys.detail(id),
queryFn: () => fetchTodo(id),
staleTime: 5000,
3),
}
llceana-
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-415 - Usage:

Metadata:
```text
source_id: S-415
image_use_id: IU-415
fileId_short: 7f54e43053
image_file: S-415__7f54e43053.png
stage6a_group: R19
stage6b_region: R18
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Usage:
‘> TypeScript ‘eo
useQuery(todoQueries.list('‘date'))
Or with overrides:
‘> TypeScript oO
useQuery({
...todoQueries.list('‘date'),
refetchInterval: 10 900,
})
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Query defaults can be global through `defaultOptions` or scoped to key prefixes with `setQueryDefaults`.
- Per-query options can override centralized defaults.
- Query key factories keep query keys consistent and colocated per feature.
- Factories can return full query option objects, not just keys.
- A factory output can still be spread and overridden locally.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Query defaults can be global through `defaultOptions` or scoped to key prefixes with `setQueryDefaults`. | S-385, S-387, S-391, S-397, S-400, S-406, S-415 | medium-high |
| Per-query options can override centralized defaults. | S-385, S-387, S-391, S-397, S-400, S-406, S-415 | medium-high |
| Query key factories keep query keys consistent and colocated per feature. | S-385, S-387, S-391, S-397, S-400, S-406, S-415 | medium-high |
| Factories can return full query option objects, not just keys. | S-385, S-387, S-391, S-397, S-400, S-406, S-415 | medium-high |
| A factory output can still be spread and overridden locally. | S-385, S-387, S-391, S-397, S-400, S-406, S-415 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6b because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage6a groups are not closed by this file: main R20/R22 and R21/R23.
- Stage6 closure audit must run after Stage6b/Stage6c/Stage6d are complete.
