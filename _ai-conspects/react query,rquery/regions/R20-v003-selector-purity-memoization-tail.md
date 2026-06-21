# R20 v003 - Selector purity / memoization / observers tail

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
This file processes `9` sources for `R20`.

Why:
R21/R23 were rough dense candidates; Stage6d locally reassigns them by visible meaning before marking processed.

Next:
After Stage6d review/commit, run Stage6 closure audit for S-384..S-537.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
select continuation: pure selectors, stable selector references, inline selector recomputation, access to data argument, and observer mental model.
```

Key ideas:

- Selectors should be pure: no mutation, no side effects, no unstable results for the same input.
- Stable selector references avoid unnecessary select recomputation when components rerender.
- Inline arrow selectors are new function references on each render.
- `select` receives the query data argument, so a standalone selector function can access data.
- Observers connect query cache changes to component subscriptions and are part of the performance mental model.

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
S-477, S-478, S-481, S-483, S-487, S-491, S-494, S-508, S-531
```

Stage6d local boundary correction:
```text
from Stage6a groups: R21, R23
final Stage6d region: R20
```

Boundary decision:
```text
Included in R20 after Stage6d local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-477 | IU-477 | `fa55186e8d` | `R21` | `verified-visible-ocr-assisted` | 14. Very important caveat: selectors should be pure |
| S-478 | IU-478 | `4ffdc9f2a6` | `R21` | `verified-visible-ocr-assisted` | Stable selector |
| S-481 | IU-481 | `206b5fe9bc` | `R21` | `verified-visible-ocr-assisted` | Bad: |
| S-483 | IU-483 | `b4fb47dabb` | `R21` | `verified-visible-ocr-assisted` | What “nothing happened” really means |
| S-487 | IU-487 | `22b0387b6b` | `R21` | `verified-visible-ocr-assisted` | Yes — when you pass an inline arrow function, that is usually a new function reference on every render. |
| S-491 | IU-491 | `d39fb9c20b` | `R21` | `verified-visible-ocr-assisted` | 1. Can \| access data if \| pass just a function? |
| S-494 | IU-494 | `9b8b4fe78d` | `R21` | `verified-visible-ocr-assisted` | works exactly like this: |
| S-508 | IU-508 | `a8033950fd` | `R23` | `verified-visible-ocr-assisted` | 41. Selector purity |
| S-531 | IU-531 | `7952ebff78` | `R23` | `verified-visible-ocr-assisted` | 38. Observers |

---

## 2. Source transcript

### S-477 - 14. Very important caveat: selectors should be pure

Metadata:
```text
source_id: S-477
image_use_id: IU-477
fileId_short: fa55186e8d
image_file: S-477__fa55186e8d.png
stage6a_group: R21
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
14. Very important caveat: selectors should be pure

Aselector should:

* not mutate data

* not cause side effects

© just derive a value from input data

Good:
> TypeScript oO
select: (user) => user.name

Good:
«> TypeScript ia’)
select: (todos) => todos.filter((t) => !t.done)

Dod
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-478 - Stable selector

Metadata:
```text
source_id: S-478
image_use_id: IU-478
fileId_short: 4ffdc9f2a6
image_file: S-478__4ffdc9f2a6.png
stage6a_group: R21
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Stable selector
«> ‘TypeScript ia’)
const selectUserName = (user: User) => user.name
function UserName() {
const { data } = useQuery({
queryKey: ['user'],
queryFn: fetchUser,
select: selectUserName,
vn
return <div>{data}</div>
+
Now the selector reference stays the same, so if the cached data is also the same, React Query has less
reason to recompute selection just because of component rerender.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-481 - Bad:

Metadata:
```text
source_id: S-481
image_use_id: IU-481
fileId_short: 206b5fe9bc
image_file: S-481__206b5fe9bc.png
stage6a_group: R21
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Bad:
«> TypeScript oO
select: (todos) => {
todos-push({ id: 'x', text: "bad" })
return todos
t
Bad:
> ‘TypeScript oO
select: (data) => {
console. log(‘sending analytics’) // side effect
return data
t
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-483 - What “nothing happened” really means

Metadata:
```text
source_id: S-483
image_use_id: IU-483
fileId_short: b4fb47dabb
image_file: S-483__b4fb47dabb.png
stage6a_group: R21
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
What “nothing happened” really means
This part matters:
If by “nothing happened” you mean:
* no new fetch
* no cache update
* no query status change
* only parent rerender or some other unrelated local rerender
then yes, an inline (select) can still be rerun because React Query sees a new select function reference.
So the recomputation is not because data changed.
It is because the selection definition changed by reference.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-487 - Yes — when you pass an inline arrow function, that is usually a new function reference on every render.

Metadata:
```text
source_id: S-487
image_use_id: IU-487
fileId_short: 22b0387b6b
image_file: S-487__22b0387b6b.png
stage6a_group: R21
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Yes — when you pass an inline arrow function, that is usually a new function reference on every render.

So these two are different in practice:

Inline arrow
«> TypeScript ia’)
select: (data) => expensive(data)

This creates a new selector function each render.

Stable function reference
> TypeScript ia’)
select: expensive

This passes the same function reference, as long as (expensive) itself is stable.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-491 - 1. Can | access data if | pass just a function?

Metadata:
```text
source_id: S-491
image_use_id: IU-491
fileId_short: d39fb9c20b
image_file: S-491__d39fb9c20b.png
stage6a_group: R21
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
1. Can | access data if | pass just a function?
Yes.
Because (Select) expects a function that React Query will call with the query data.
So this:
«> ‘TypeScript
function selectUserName(user: User) {
return user.name
}
useQuery({
queryKey: ['user'],
queryFn: fetchUser,
select: selectUserName,
»
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-494 - works exactly like this:

Metadata:
```text
source_id: S-494
image_use_id: IU-494
fileId_short: 9b8b4fe78d
image_file: S-494__9b8b4fe78d.png
stage6a_group: R21
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
works exactly like this:
«> ‘TypeScript
useQuery({
queryKey: [user],
queryFn: fetchUser,
select: (user) => username,
vn
React Query does the call for you.
So:
* you do not call it yourself
* React Query calls it with the fetched data
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-508 - 41. Selector purity

Metadata:
```text
source_id: S-508
image_use_id: IU-508
fileId_short: a8033950fd
image_file: S-508__a8033950fd.png
stage6a_group: R23
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
41. Selector purity
* pure transforms only
* no mutation
* no side effects
* same input — same output
* deterministic derived data
42. Selector stability
* inline selector = new function reference per render
* stable external selector
* memoized selector with |useCallback
* function identity vs result memoization
43. Result memoization vs selector memoization
© (useCallback memoizes function reference
© (useMemo memoizes derived result
* expensive selector work vs stable selector identity
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-531 - 38. Observers

Metadata:
```text
source_id: S-531
image_use_id: IU-531
fileId_short: 7952ebff78
image_file: S-531__7952ebff78.png
stage6a_group: R23
stage6d_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6d visible read from source image; OCR-assisted
```

#### Verified visible text
```text
38. Observers
* glue between query cache and React components
* outside component tree
* determine update propagation
39. select
* subscribe to smaller slice of data
* transform query data before component receives it
* reduce rerenders from unrelated data changes
* pure selectors only
stable selector references
* external selector functions
* useCallback for selectors depending on props/state
40. Tracked properties
* React Query tracks which result fields were read
* rerender only when used fields change
* avoid rest destructuring
«  destructure only what you need
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Selectors should be pure: no mutation, no side effects, no unstable results for the same input.
- Stable selector references avoid unnecessary select recomputation when components rerender.
- Inline arrow selectors are new function references on each render.
- `select` receives the query data argument, so a standalone selector function can access data.
- Observers connect query cache changes to component subscriptions and are part of the performance mental model.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Selectors should be pure: no mutation, no side effects, no unstable results for the same input. | S-477, S-478, S-481, S-483, S-487, S-491, S-494, S-508, S-531 | medium-high |
| Stable selector references avoid unnecessary select recomputation when components rerender. | S-477, S-478, S-481, S-483, S-487, S-491, S-494, S-508, S-531 | medium-high |
| Inline arrow selectors are new function references on each render. | S-477, S-478, S-481, S-483, S-487, S-491, S-494, S-508, S-531 | medium-high |
| `select` receives the query data argument, so a standalone selector function can access data. | S-477, S-478, S-481, S-483, S-487, S-491, S-494, S-508, S-531 | medium-high |
| Observers connect query cache changes to component subscriptions and are part of the performance mental model. | S-477, S-478, S-481, S-483, S-487, S-491, S-494, S-508, S-531 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6d because every included source has visible text and no OCR-placeholder processed source.
- Stage6d closes the remaining Stage6a transcript work; run Stage6 closure audit next.
- OCR-assisted raw text contains small artifacts; patch individual sources later if needed.
