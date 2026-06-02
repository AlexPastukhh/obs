# R17 v002 - useTransition step-by-step comparison

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **6c / transcript v001**  
Generated: 2026-06-02 13:00:55 UTC

---

## Direction check

Goal:
Process the next transcript batch after Stage6b.

Done:
Stage6b processed the upper technical block and left R20/R22/R21/R23 candidates.

Now:
This file processes `7` sources for `R17`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage6c review/commit, process Stage6d R21 + R23.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Step-by-step comparison of pagination with Suspense without and with useTransition.
```

Key ideas:

- The so-called Stage6a R22 group is actually a continuation of R17 useTransition.
- Without `useTransition`, a page change can make `useSuspenseQuery` suspend immediately and show the Suspense fallback.
- That means old page content can disappear abruptly before new page data is ready.
- With `useTransition`, the page update is wrapped in `startTransition`, so React can keep the old UI visible while preparing the next page.
- `isPending` can show subtle updating state during the transition.

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
S-458, S-465, S-471, S-472, S-475, S-479, S-482
```

Stage6c local boundary correction:
```text
S-458: Stage6a R22 -> Stage6c R17
S-465: Stage6a R22 -> Stage6c R17
S-471: Stage6a R22 -> Stage6c R17
S-472: Stage6a R22 -> Stage6c R17
S-475: Stage6a R22 -> Stage6c R17
S-479: Stage6a R22 -> Stage6c R17
S-482: Stage6a R22 -> Stage6c R17
```

Boundary decision:
```text
Included in R17 after Stage6c local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-458 | IU-458 | `6417d8eeec` | `R22` | `verified-visible-ocr-assisted` | 4. Step by step: without useTransition |
| S-465 | IU-465 | `5500f63476` | `R22` | `verified-visible-ocr-assisted` | And: |
| S-471 | IU-471 | `db04f35502` | `R22` | `verified-visible-ocr-assisted` | What happens step by step without transition |
| S-472 | IU-472 | `6dfbaf8577` | `R22` | `verified-visible-ocr-assisted` | Step 3 |
| S-475 | IU-475 | `6f877c2651` | `R22` | `verified-visible-ocr-assisted` | User-visible behavior without transition |
| S-479 | IU-479 | `8e9a7a7ae4` | `R22` | `verified-visible-ocr-assisted` | 5. Step by step: with useTransition |
| S-482 | IU-482 | `f6e6efb55f` | `R22` | `verified-visible-ocr-assisted` | return ( |

---

## 2. Source transcript

### S-458 - 4. Step by step: without useTransition

Metadata:
```text
source_id: S-458
image_use_id: IU-458
fileId_short: 6417d8eeec
image_file: S-458__6417d8eeec.png
stage6a_group: R22
stage6c_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
4. Step by step: without useTransition
Let’s use a common example: pagination with Suspense.
Example without transition
</> TypeScript
function ProductsPage() {
const [page, setPage] = React.useState(1)
return (
<>
<button onClick={() => setPage((p) => p + 1)}>Next</button>
<React.Suspense fallback={<div>Loading. ..</div>}>
<ProductsList page={page} />
</React.Suspense>
</>
)
}
And: NY
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-465 - And:

Metadata:
```text
source_id: S-465
image_use_id: IU-465
fileId_short: 5500f63476
image_file: S-465__5500f63476.png
stage6a_group: R22
stage6c_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
And:
> TypeScript
function ProductsList({ page }: { page: number }) {
const { data } = useSuspenseQuery({
queryKey: [‘products', page],
queryFn: () => fetchProducts(page),
})
return (
<ul>
{data.items.map((item: any) => (
<li key={item.id}>{item.name}</1i>
))}
</ul>
)
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-471 - What happens step by step without transition

Metadata:
```text
source_id: S-471
image_use_id: IU-471
fileId_short: db04f35502
image_file: S-471__db04f35502.png
stage6a_group: R22
stage6c_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
What happens step by step without transition
User clicks Next.
Step 1
React receives:
<> TypeScript
setPage(2)
Step 2
React starts rendering with page = 2.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-472 - Step 3

Metadata:
```text
source_id: S-472
image_use_id: IU-472
fileId_short: 6dfbaf8577
image_file: S-472__6dfbaf8577.png
stage6a_group: R22
stage6c_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Step 3
ProductsList now asks for query [‘products", 2].
Step 4
That data is not ready yet, so useSuspenseQuery suspends.
Step 5
React immediately shows the Suspense fallback:
</> TypeScript
<div>Loading. ..</div>
Step 6
Old page content disappears.
Step 7
When new data finishes loading, React renders page 2.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-475 - User-visible behavior without transition

Metadata:
```text
source_id: S-475
image_use_id: IU-475
fileId_short: 6f877c2651
image_file: S-475__6f877c2651.png
stage6a_group: R22
stage6c_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
User-visible behavior without transition
The user sees:
1. page 1 content
2. click Next
3. page 1 disappears immediately
4. loading fallback appears
5. page 2 appears
That can feel abrupt.
Especially if:
e data is slightly slow
e fallback flashes often
e user is navigating quickly
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-479 - 5. Step by step: with useTransition

Metadata:
```text
source_id: S-479
image_use_id: IU-479
fileId_short: 8e9a7a7ae4
image_file: S-479__8e9a7a7ae4.png
stage6a_group: R22
stage6c_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
5. Step by step: with useTransition
Now same example with transition.
</> TypeScript
function ProductsPage() {
const [page, setPage] = React.useState(1)
const [isPending, startTransition] = React.useTransition()
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-482 - return (

Metadata:
```text
source_id: S-482
image_use_id: IU-482
fileId_short: f6e6efb55f
image_file: S-482__f6e6efb55f.png
stage6a_group: R22
stage6c_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
return (
<>
<button
onClick={() => {
startTransition(() => {
setPage((p) => p + 1)
})
tt
>
Next
</button>
{isPending && <small>Updating. ..</small>}
<React.Suspense fallback={<div>Loading. ..</div>}>
<ProductsList page={page} />
</React.Suspense>
</>
)
}
NY
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- The so-called Stage6a R22 group is actually a continuation of R17 useTransition.
- Without `useTransition`, a page change can make `useSuspenseQuery` suspend immediately and show the Suspense fallback.
- That means old page content can disappear abruptly before new page data is ready.
- With `useTransition`, the page update is wrapped in `startTransition`, so React can keep the old UI visible while preparing the next page.
- `isPending` can show subtle updating state during the transition.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Without transition, clicking Next changes page state directly and the Suspense query for page 2 can suspend. | S-458, S-465, S-471, S-472 | high |
| The user-visible result without transition is abrupt fallback flashing. | S-475 | high |
| With transition, page update is wrapped in startTransition and isPending can show updating state. | S-479, S-482 | high |

---

## 5. Open review issues

- This file is valid for Stage6c because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage6a groups are not closed by this file: R21/R23.
- Stage6 closure audit must run after Stage6d is complete.
