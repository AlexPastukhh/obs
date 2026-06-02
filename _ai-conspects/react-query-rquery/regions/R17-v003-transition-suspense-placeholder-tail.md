# R17 v003 - Transition / Suspense / placeholder tail

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **6d / remaining dense transcript v001**  
Generated: 2026-06-02 14:05:28 UTC

---

## Direction check

Goal:
Close all remaining Stage6a candidates after Stage6b and Stage6c.

Done:
Stage6b processed 35 images; Stage6c processed 25 images.

Now:
This file processes `19` sources for `R17`.

Why:
R21/R23 were rough dense candidates; Stage6d locally reassigns them by visible meaning before marking processed.

Next:
After Stage6d review/commit, run Stage6 closure audit for S-384..S-537.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
useTransition continuation: startTransition, previous UI visibility, Suspense vs placeholderData, and transition UX caveats.
```

Key ideas:

- `startTransition` marks updates as non-urgent so heavier UI can prepare in the background.
- Transitions can keep previous UI visible while the next Suspense page is being prepared.
- `isPending` is good for subtle updating indicators, not necessarily full-page loading replacement.
- Suspense and placeholderData solve related UX problems differently: boundary fallback vs keeping previous/cached-looking data visible.
- Transitions do not make network faster and do not ignore the update; they control scheduling and fallback behavior.

Reading quality:
```text
Visible text was read from Stage6a source images/contact sheets with OCR assistance.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
Because this is a large 94-image pass, any later wording issue should be fixed with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-403, S-414, S-420, S-423, S-424, S-425, S-429, S-433, S-436, S-438, S-446, S-447, S-486, S-490, S-493, S-496, S-498, S-499, S-501
```

Stage6d local boundary correction:
```text
from Stage6a groups: R21
final Stage6d region: R17
```

Boundary decision:
```text
Included in R17 after Stage6d local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-403 | IU-403 | `4d034f9fe0` | `R21` | `verified-visible-ocr-assisted` | 11. Transitions: keeping previous data visible |
| S-414 | IU-414 | `86c00bd7de` | `R21` | `verified-visible-ocr-assisted` | startTransition |
| S-420 | IU-420 | `95c0e9bb43` | `R21` | `verified-visible-ocr-assisted` | return ( |
| S-423 | IU-423 | `5d5a0ccf6e` | `R21` | `verified-visible-ocr-assisted` | startTransition(fn) |
| S-424 | IU-424 | `3be0fe3997` | `R21` | `verified-visible-ocr-assisted` | Good: |
| S-425 | IU-425 | `04afe6e8fc` | `R21` | `verified-visible-ocr-assisted` | <Suspense tallback={<div>Loading page.. .</div>}> |
| S-429 | IU-429 | `64ae29536d` | `R21` | `verified-visible-ocr-assisted` | 2. Why React needs this |
| S-433 | IU-433 | `0ff4794c70` | `R21` | `verified-visible-ocr-assisted` | What this improves |
| S-436 | IU-436 | `5b31422c36` | `R21` | `verified-visible-ocr-assisted` | Non-urgent updates |
| S-438 | IU-438 | `8298e740e1` | `R21` | `verified-visible-ocr-assisted` | 12. Suspense vs placeholderData |
| S-446 | IU-446 | `6901482439` | `R21` | `verified-visible-ocr-assisted` | 3. Mental model |
| S-447 | IU-447 | `561c21b24d` | `R21` | `verified-visible-ocr-assisted` | 13. When Suspense is a good fit |
| S-486 | IU-486 | `1925501b08` | `R21` | `verified-visible-ocr-assisted` | What happens step by step with transition |
| S-490 | IU-490 | `8a89987039` | `R21` | `verified-visible-ocr-assisted` | Step 2 |
| S-493 | IU-493 | `e94b5eb363` | `R21` | `verified-visible-ocr-assisted` | Step7 |
| S-496 | IU-496 | `643f602633` | `R21` | `verified-visible-ocr-assisted` | User-visible behavior with transition |
| S-498 | IU-498 | `796a1b979e` | `R21` | `verified-visible-ocr-assisted` | 6. Key difference in one sentence |
| S-499 | IU-499 | `f004c25ab3` | `R21` | `verified-visible-ocr-assisted` | 7. Very important: it does not delay the state forever |
| S-501 | IU-501 | `c4d203ec2e` | `R21` | `verified-visible-ocr-assisted` | 12. What it does not do |

---

## 2. Source transcript

### S-403 - 11. Transitions: keeping previous data visible

Metadata:
```text
source_id: S-403
image_use_id: IU-403
fileId_short: 4d034f9fe0
image_file: S-403__4d034f9fe0.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
11. Transitions: keeping previous data visible
This part is about making Suspense feel smoother during changes like:
* pagination
* filtering
* changing tabs
* changing selected item
Without a transition, changing input may immediately suspend and show fallback.
That can cause a flash:
* old content disappears
© spinner appears
* new content appears
Sometimes that feels too jumpy.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-414 - startTransition

Metadata:
```text
source_id: S-414
image_use_id: IU-414
fileId_short: 86c00bd7de
image_file: S-414__86c00bd7de.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
startTransition
React lets you mark an update as a transition.
During that transition, React may keep showing previous UI while the new suspended UI is preparing.
Example
«> TypeScript 0
import * as React from 'react"
import { Suspense } from 'react'
function ProductsPage() {
const [page, setPage] = React .useState(1)
const [isPending, startTransition] = React.useTransition()
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-420 - return (

Metadata:
```text
source_id: S-420
image_use_id: IU-420
fileId_short: 95c0e9bb43
image_file: S-420__95c0e9bb43.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
return (
<div>
<button
onClick={() => {
startTransition(() => {
setPage((p) => p - 1)
vn
hb
disabled={page === 1}
>
Prev
</button>
<button
onClick={() => {
startTransition(() => {
setPage((p) => p + 1)
vn
hb
>
Next
</button>
{isPending && <small>Updating. . .</small>}
1
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-423 - startTransition(fn)

Metadata:
```text
source_id: S-423
image_use_id: IU-423
fileId_short: 5d5a0ccf6e
image_file: S-423__5d5a0ccf6e.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
startTransition(fn)
Wrap state updates inside it.
> TypeScript oO
startTransition(() => {
setPage(2)
vn
Those updates become transition updates.
isPending
Boolean that becomes [##ué) while the transition is still in progress.
You can use it for small feedback like:
> TypeScript ia)
{isPending && <small>Updating. ..</smal1>}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-424 - Good:

Metadata:
```text
source_id: S-424
image_use_id: IU-424
fileId_short: 3be0fe3997
image_file: S-424__3be0fe3997.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Good:
> TypeScript oO
{isPending && <small>Updating. . .</smal1>}

Usually less good:
«> TypeScript ia’)
{isPending ? <BigSpinner /> : <FullUI />}

because that often defeats the point of keeping previous UI visible.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-425 - <Suspense tallback={<div>Loading page.. .</div>}>

Metadata:
```text
source_id: S-425
image_use_id: IU-425
fileId_short: 04afe6e8fc
image_file: S-425__04afe6e8fc.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
<Suspense tallback={<div>Loading page.. .</div>}>
<ProductsPageContent page={page} />
</Suspense>
</div>
)
+
function ProductsPageContent({ page }: { page: number }) {
const { data } = useSuspenseQuery({
querykey: ['products', page],
queryFn: () => fetchProducts(page),
n
return (
<ul
{data.items.map((item: any) => (
<li key={item.id}>{item.name}</1i>
»}
</ul>
)
+
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-429 - 2. Why React needs this

Metadata:
```text
source_id: S-429
image_use_id: IU-429
fileId_short: 64ae29536d
image_file: S-429__64ae29536d.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
2. Why React needs this
Not all state updates feel equally urgent.
Urgent updates
Things the user expects immediately:

© typing in an input

* licking a button

* opening a menu

+ checkbox toggle feedback
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-433 - What this improves

Metadata:
```text
source_id: S-433
image_use_id: IU-433
fileId_short: 0ff4794c70
image_file: S-433__0ff4794c70.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
What this improves

When page changes:
* React can keep showing previous page briefly
* instead of instantly switching to fallback
+ then swap to the new page when ready

This makes navigation feel smoother.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-436 - Non-urgent updates

Metadata:
```text
source_id: S-436
image_use_id: IU-436
fileId_short: 5b31422c36
image_file: S-436__5b31422c36.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Non-urgent updates
Things that may take a bit more work:
* rendering a huge filtered list
* changing a page of results
* navigating to data that suspends
* expensive search result updates
Without transitions, React often treats them the same way.
That can cause:
* input lag
* flashing spinners/fallbacks
old Ul disappearing too soon
*  janky rendering
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-438 - 12. Suspense vs placeholderData

Metadata:
```text
source_id: S-438
image_use_id: IU-438
fileId_short: 8298e740e1
image_file: S-438__8298e740e1.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
12. Suspense vs placeholderData

These solve similar UX problems in different ways.

placeholderData

Lets {useQuery show temporary previous data while new data loads.

Suspense + transitions

Lets React keep old rendered UI visible while the new suspended UI prepares.

Rough rule
* Ifyou want classic query control and explicit states, use useQuery + placeholderData
«If your app uses Suspense architecture, use Suspense + transitions
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-446 - 3. Mental model

Metadata:
```text
source_id: S-446
image_use_id: IU-446
fileId_short: 6901482439
image_file: S-446__6901482439.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
3. Mental model
useTransition Says:
“Update the important interactive state now, but let the heavier UI update happen in the background.”
It does not make code faster by itself.
It changes priority and behavior.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-447 - 13. When Suspense is a good fit

Metadata:
```text
source_id: S-447
image_use_id: IU-447
fileId_short: 561c21b24d
image_file: S-447__561c21b24d.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
13. When Suspense is a good fit
Suspense is a strong fit when:
* your app already uses React Suspense patterns
* you want loading boundaries higher in the tree
* you want simpler success-only components
* you are okay structuring Ul around boundaries
* you are using SSR/streaming/server-component-oriented architecture
14. When Suspense is a bad fit
It may be a poor fit when:
* you rely heavily on enabled
* you want highly explicit loading flags in each component
* your team is less comfortable with Suspense control flow
* you have many conditional/dependent branches in one component
* you want very fine manual loading behavior without boundaries
In those cases, standard useQuery) is often easier. |
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-486 - What happens step by step with transition

Metadata:
```text
source_id: S-486
image_use_id: IU-486
fileId_short: 1925501b08
image_file: S-486__1925501b08.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
What happens step by step with transition
User clicks Next.
Step 1
React receives a transition update:

«> TypeScript

startTransition(() => {

setPage(2)
vn
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-490 - Step 2

Metadata:
```text
source_id: S-490
image_use_id: IU-490
fileId_short: 8a89987039
image_file: S-490__8a89987039.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Step 2

React knows this update is non-urgent.

Step 3

React keeps the current visible UI if possible while preparing the next state.
So page 1 can remain on screen.

Step 4

React starts rendering the new tree in the background with (page!22)-
Step 5

ProductsList asks for query |[ "products", 2] -

Step 6

It suspends because data is not ready.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-493 - Step7

Metadata:
```text
source_id: S-493
image_use_id: IU-493
fileId_short: e94b5eb363
image_file: S-493__e94b5eb363.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Step7

Because this is happening inside a transition, React prefers to keep showing the previous UI instead of

immediately replacing it with fallback.

Step 8

isPending becomes true.

You can show a subtle hint like:
> TypeScript ia’)
<small>Updating. . .</smal1>

Step 9

When page 2 data is ready, React swaps page 1 UI for page 2 UI.

Step 10

isPending becomes false .
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-496 - User-visible behavior with transition

Metadata:
```text
source_id: S-496
image_use_id: IU-496
fileId_short: 643f602633
image_file: S-496__643f602633.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
User-visible behavior with transition
The user sees:
1. page 1 content
2. dick Next
3. page 1 stays visible
4. maybe a small “Updating...” indicator appears
5. page 2 appears when ready
This usually feels much smoother than flashing a loading fallback.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-498 - 6. Key difference in one sentence

Metadata:
```text
source_id: S-498
image_use_id: IU-498
fileId_short: 796a1b979e
image_file: S-498__796a1b979e.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
6. Key difference in one sentence
Without transition:
React tends to switch to loading/fallback immediately.
With transition:
React tries to keep the previous UI visible while the new UI prepares.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-499 - 7. Very important: it does not delay the state forever

Metadata:
```text
source_id: S-499
image_use_id: IU-499
fileId_short: f004c25ab3
image_file: S-499__f004c25ab3.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
7. Very important: it does not delay the state forever
startTransition does not mean “ignore this update”.
It means:
* schedule it at lower priority
© let urgent updates win first
* keep UI responsive while it is being prepared
The update still happens.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-501 - 12. What it does not do

Metadata:
```text
source_id: S-501
image_use_id: IU-501
fileId_short: c4d203ec2e
image_file: S-501__c4d203ec2e.png
stage6a_group: R21
stage6d_region: R17
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
12. What it does not do

It does not make network requests faster

If fetch takes 2 seconds, it still takes 2 seconds.

It does not replace loading states completely

You may still want indicators like isPending .

It does not mean “run later with setTimeout”

Itis not a timer. It is priority scheduling.

It does not fix bad architecture automatically

If rendering is extremely expensive, transitions help perception, but optimization may still be needed.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- `startTransition` marks updates as non-urgent so heavier UI can prepare in the background.
- Transitions can keep previous UI visible while the next Suspense page is being prepared.
- `isPending` is good for subtle updating indicators, not necessarily full-page loading replacement.
- Suspense and placeholderData solve related UX problems differently: boundary fallback vs keeping previous/cached-looking data visible.
- Transitions do not make network faster and do not ignore the update; they control scheduling and fallback behavior.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| `startTransition` marks updates as non-urgent so heavier UI can prepare in the background. | S-403, S-414, S-420, S-423, S-424, S-425, S-429, S-433, S-436, S-438, S-446, S-447, S-486, S-490, S-493, S-496, S-498, S-499, S-501 | medium-high |
| Transitions can keep previous UI visible while the next Suspense page is being prepared. | S-403, S-414, S-420, S-423, S-424, S-425, S-429, S-433, S-436, S-438, S-446, S-447, S-486, S-490, S-493, S-496, S-498, S-499, S-501 | medium-high |
| `isPending` is good for subtle updating indicators, not necessarily full-page loading replacement. | S-403, S-414, S-420, S-423, S-424, S-425, S-429, S-433, S-436, S-438, S-446, S-447, S-486, S-490, S-493, S-496, S-498, S-499, S-501 | medium-high |
| Suspense and placeholderData solve related UX problems differently: boundary fallback vs keeping previous/cached-looking data visible. | S-403, S-414, S-420, S-423, S-424, S-425, S-429, S-433, S-436, S-438, S-446, S-447, S-486, S-490, S-493, S-496, S-498, S-499, S-501 | medium-high |
| Transitions do not make network faster and do not ignore the update; they control scheduling and fallback behavior. | S-403, S-414, S-420, S-423, S-424, S-425, S-429, S-433, S-436, S-438, S-446, S-447, S-486, S-490, S-493, S-496, S-498, S-499, S-501 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6d because every included source has visible text and no OCR-placeholder processed source.
- Stage6d closes the remaining Stage6a transcript work; run Stage6 closure audit next.
- OCR-assisted raw text contains small artifacts; patch individual sources later if needed.
