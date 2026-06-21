# R12 v003 - Suspense parallel / dependent tail

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
This file processes `5` sources for `R12`.

Why:
R21/R23 were rough dense candidates; Stage6d locally reassigns them by visible meaning before marking processed.

Next:
After Stage6d review/commit, run Stage6 closure audit for S-384..S-537.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Suspense tail: parallel Suspense queries, separate boundaries, dependent queries, and continued rendering after data is ready.
```

Key ideas:

- Suspense queries in one component can become serial because the first suspension stops rendering.
- To make Suspense queries parallel, split them into separate components under the same boundary or separate boundaries.
- Separate boundaries can let different areas load independently.
- Dependent Suspense queries make the dependency visible: the second query cannot start until the first data exists.

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
S-386, S-389, S-393, S-396, S-401
```

Stage6d local boundary correction:
```text
from Stage6a groups: R21
final Stage6d region: R12
```

Boundary decision:
```text
Included in R12 after Stage6d local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-386 | IU-386 | `6ff5da2ed3` | `R21` | `verified-visible-ocr-assisted` | 9. How to make Suspense queries parallel |
| S-389 | IU-389 | `b6379df317` | `R21` | `verified-visible-ocr-assisted` | export default function Dashboard() { |
| S-393 | IU-393 | `e91d3c5a46` | `R21` | `verified-visible-ocr-assisted` | Even better with separate boundaries |
| S-396 | IU-396 | `ab518b8fb7` | `R21` | `verified-visible-ocr-assisted` | 10. Suspense with dependent queries |
| S-401 | IU-401 | `ed1ff3c24e` | `R21` | `verified-visible-ocr-assisted` | return ( |

---

## 2. Source transcript

### S-386 - 9. How to make Suspense queries parallel

Metadata:
```text
source_id: S-386
image_use_id: IU-386
fileId_short: 6ff5da2ed3
image_file: S-386__6ff5da2ed3.png
stage6a_group: R21
stage6d_region: R12
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
9. How to make Suspense queries parallel
You usually split them into separate components under the same boundary.
Better pattern
«” TypeScript oO
function UserSection() {
const { data } = useSuspenseQuery({
querykey: ['user'],
queryFn: fetchUser,
D>)
return <h1>{data.name}</h1>
}
function RepoSection() {
const { data } = useSuspenseQuery({
querykey: [‘repos'],
queryFn: fetchRepos,
D>)
return <div>{data. length} repos</div>
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-389 - export default function Dashboard() {

Metadata:
```text
source_id: S-389
image_use_id: IU-389
fileId_short: b6379df317
image_file: S-389__b6379df317.png
stage6a_group: R21
stage6d_region: R12
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
export default function Dashboard() {
return (
<Suspense fallback={<div>Loading dashboard. ..</div>}>
<UserSection />
<RepoSection />
</Suspense>
)
+
This is often a better structure because sibling components can participate more naturally in concurrent
rendering behavior.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-393 - Even better with separate boundaries

Metadata:
```text
source_id: S-393
image_use_id: IU-393
fileId_short: e91d3c5a46
image_file: S-393__e91d3c5a46.png
stage6a_group: R21
stage6d_region: R12
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Even better with separate boundaries
«” TypeScript
export default function Dashboard() {
return (
°
<Suspense fallback={<div>Loading user... .</div>}>
<UserSection />
</Suspense>
<Suspense fallback={<div>Loading repos. ..</div>}>
<RepoSection />
</Suspense>
<P
)
+
Now each section can resolve independently.
This often feels much nicer in the UI.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-396 - 10. Suspense with dependent queries

Metadata:
```text
source_id: S-396
image_use_id: IU-396
fileId_short: ab518b8fb7
image_file: S-396__ab518b8fb7.png
stage6a_group: R21
stage6d_region: R12
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
10. Suspense with dependent queries
Suspense makes dependent queries more obvious.
Example
«> TypeScript
function MovieAndDirector({ title }: { title: string }) {
const { data: movie } = useSuspenseQuery({
queryKey: ['movie', title],
queryFn: () => fetchMovie(title),
>)
const { data: director } = useSuspenseQuery({
queryKey: [‘director', movie.directorId],
queryFn: () => fetchDirector(movie.directorId),
>)
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-401 - return (

Metadata:
```text
source_id: S-401
image_use_id: IU-401
fileId_short: ed1ff3c24e
image_file: S-401__ed1ff3c24e.png
stage6a_group: R21
stage6d_region: R12
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
return (
<div>
<h1>{movie.title}</h1>
<p>{director.name}</p>
</div>
)
}
This is truly serial by nature because query 2 needs result of query 1.
That is fine. This is a real dependency.
The important thing is not to accidentally create serial behavior for queries that are actually independent.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Suspense queries in one component can become serial because the first suspension stops rendering.
- To make Suspense queries parallel, split them into separate components under the same boundary or separate boundaries.
- Separate boundaries can let different areas load independently.
- Dependent Suspense queries make the dependency visible: the second query cannot start until the first data exists.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Suspense queries in one component can become serial because the first suspension stops rendering. | S-386, S-389, S-393, S-396, S-401 | medium-high |
| To make Suspense queries parallel, split them into separate components under the same boundary or separate boundaries. | S-386, S-389, S-393, S-396, S-401 | medium-high |
| Separate boundaries can let different areas load independently. | S-386, S-389, S-393, S-396, S-401 | medium-high |
| Dependent Suspense queries make the dependency visible: the second query cannot start until the first data exists. | S-386, S-389, S-393, S-396, S-401 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6d because every included source has visible text and no OCR-placeholder processed source.
- Stage6d closes the remaining Stage6a transcript work; run Stage6 closure audit next.
- OCR-assisted raw text contains small artifacts; patch individual sources later if needed.
