# R20 v002 - Performance / select correction from Stage6b

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
This file processes `3` sources for `R20`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage6b review/commit, process Stage6c R20 + R22.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Early performance/select cards that Stage6a put near testing but visual reading shows belong to R20.
```

Key ideas:

- Structural sharing keeps unchanged parts of data by reference and can reduce unnecessary rerenders.
- Observers connect the query cache to React components and determine subscribed updates.
- `select` lets a component subscribe to a smaller slice of data.
- Expensive selectors should be memoized.
- Tracked properties mean components do not rerender just because an unused field changed.

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
S-426, S-431, S-443
```

Stage6b local boundary correction:
```text
S-426: Stage6a R19 -> Stage6b R20
S-431: Stage6a R19 -> Stage6b R20
S-443: Stage6a R19 -> Stage6b R20
```

Boundary decision:
```text
Included in R20 after Stage6b local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-426 | IU-426 | `0798cdbadb` | `R19` | `verified-visible-ocr-assisted` | 26. Performance: structural sharing, observers, select |
| S-431 | IU-431 | `c327c603e8` | `R19` | `verified-visible-ocr-assisted` | 26.2 Observers |
| S-443 | IU-443 | `0e6acb8429` | `R19` | `verified-visible-ocr-assisted` | 26.4 Memoize expensive selectors |

---

## 2. Source transcript

### S-426 - 26. Performance: structural sharing, observers, select

Metadata:
```text
source_id: S-426
image_use_id: IU-426
fileId_short: 0798cdbadb
image_file: S-426__0798cdbadb.png
stage6a_group: R19
stage6b_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
26. Performance: structural sharing, observers, select
26.1 Structural sharing
If only part of the data changes, unchanged parts can keep the same references.
Benefits:
e plays nicely with React .memo
e works better in dependency arrays
e helps prevent unnecessary rerenders
The important thing is whether the content changed, not whether every object is freshly recreated.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-431 - 26.2 Observers

Metadata:
```text
source_id: S-431
image_use_id: IU-431
fileId_short: c327c603e8
image_file: S-431__c327c603e8.png
stage6a_group: R19
stage6b_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
26.2 Observers
Observers connect the query cache to React components.
They live outside the component tree and determine when subscribed components should update.
26.3 select
Use select when a component only needs part of the data.
‘> TypeScript ‘eo
const { data } = useQuery({
queryKey: [‘user'],
queryFn: fetchUser,
select: (data) => ({ name: data-.name }),
})
This lets the component subscribe to a smaller slice.
If unrelated fields change, the component may avoid rerendering.
v
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-443 - 26.4 Memoize expensive selectors

Metadata:
```text
source_id: S-443
image_use_id: IU-443
fileId_short: 0e6acb8429
image_file: S-443__0e6acb8429.png
stage6a_group: R19
stage6b_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
26.4 Memoize expensive selectors
‘> TypeScript ‘eo
const selectName = React.useCallback((data: User) => data.name, [])
const { data: name } = useQuery({
queryKey: [‘user'],
queryFn: fetchUser,
select: selectName,
})
26.5 Tracked properties
React Query tracks which fields of the query result are actually accessed during render.
That means a component does not have to rerender just because some unused field changed.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Structural sharing keeps unchanged parts of data by reference and can reduce unnecessary rerenders.
- Observers connect the query cache to React components and determine subscribed updates.
- `select` lets a component subscribe to a smaller slice of data.
- Expensive selectors should be memoized.
- Tracked properties mean components do not rerender just because an unused field changed.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Structural sharing keeps unchanged parts of data by reference and can reduce unnecessary rerenders. | S-426, S-431, S-443 | medium-high |
| Observers connect the query cache to React components and determine subscribed updates. | S-426, S-431, S-443 | medium-high |
| `select` lets a component subscribe to a smaller slice of data. | S-426, S-431, S-443 | medium-high |
| Expensive selectors should be memoized. | S-426, S-431, S-443 | medium-high |
| Tracked properties mean components do not rerender just because an unused field changed. | S-426, S-431, S-443 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6b because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage6a groups are not closed by this file: main R20/R22 and R21/R23.
- Stage6 closure audit must run after Stage6b/Stage6c/Stage6d are complete.
