# R11B - Mutation callbacks tail

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **5c / large remaining transcript v001**  
Generated: 2026-06-02 12:10:41 UTC

---

## Direction check

Goal:
Close the remaining Stage5a candidates in one larger pass.

Done:
Stage5b closed R12/R13/R15.

Now:
This file processes `13` sources for `R11B`.

Why:
The user asked to take more; Stage5c processes all remaining Stage5a sources in separate region files.

Next:
After Stage5c review/commit, run closure audit for S-261..S-383.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Mutation callback signatures, onSuccess/onError/onSettled/onMutateResult/context, and awaited async callbacks.
```

Key ideas:

- Mutation callback signatures pass `data`, `error`, `variables`, `onMutateResult`, and `context` depending on callback type.
- `mutationFn` performs the server write; `onMutate` prepares optimistic state and rollback/context.
- `onSuccess` can replace optimistic data with server-confirmed data.
- `onError` can roll back optimistic cache state.
- `onSettled` runs at the end and is often used for invalidation/refetch synchronization.
- Async mutation callbacks are awaited; returning the invalidation Promise keeps lifecycle state aligned.

Reading quality:
```text
Visible text was read from Stage5a source images with OCR assistance and manual fixes for the OCR-timeout cards.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is marked processed.
Because this is a large 86-image pass, any later wording issue should be fixed with a precision patch, not by reverting the whole batch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-261, S-262, S-263, S-264, S-265, S-266, S-267, S-268, S-269, S-270, S-271, S-272, S-273
```

Boundary decision:
```text
Included in R11B after Stage5c local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-261 | IU-261 | `35935e7b35` | `verified-visible-ocr-assisted` | Returning the Promise |
| S-262 | IU-262 | `c8aefd2cea` | `verified-visible-ocr-assisted` | or shorter: |
| S-263 | IU-263 | `5f990bee01` | `verified-visible-ocr-assisted` | mutationFn |
| S-264 | IU-264 | `ed4ef609cc` | `verified-visible-ocr-assisted` | onSuccess |
| S-265 | IU-265 | `9d4d2d9cfa` | `verified-visible-ocr-assisted` | Why this matters |
| S-266 | IU-266 | `57a7aa95ed` | `verified-visible-ocr-assisted` | Example: |
| S-267 | IU-267 | `27b93b199a` | `verified-visible-ocr-assisted` | variables |
| S-268 | IU-268 | `c35292d43d` | `verified-visible-ocr-assisted` | context |
| S-269 | IU-269 | `56c5c8888e` | `verified-visible-ocr-assisted` | onError |
| S-270 | IU-270 | `82af270795` | `verified-visible-ocr-assisted` | context |
| S-271 | IU-271 | `c7dccde3bc` | `verified-visible-ocr-assisted` | onSettled |
| S-272 | IU-272 | `1cb0706b7f` | `verified-visible-ocr-assisted` | onMutateResult |
| S-273 | IU-273 | `af1044b3cf` | `verified-visible-ocr-assisted` | 8. One subtle detail: async callbacks are awaited |

---

## 2. Source transcript

### S-261 - Returning the Promise

Metadata:
```text
source_id: S-261
image_use_id: IU-261
fileId_short: 35935e7b35
image_file: S-261__35935e7b35.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Returning the Promise
“) TypeScript (
onSettled: () = {
return queryClient.invalidateQueries({ queryKey: [‘todos'] })
t
|.
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-262 - or shorter:

Metadata:
```text
source_id: S-262
image_use_id: IU-262
fileId_short: c8aefd2cea
image_file: S-262__c8aefd2cea.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
or shorter:
“) TypeScript O
onSettled: () => queryClient.invalidateQueries({ queryKey: [‘todos'] })
Now what happens:
1. mutation request finishes
2. onSettled runs
3. invalidateQueries starts the refetch and returns a Promise
4. React Query waits for that Promise
5. mutation stays pending until that Promise resolves, meaning until the refetch work is done. — tanstack -:
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-263 - mutationFn

Metadata:
```text
source_id: S-263
image_use_id: IU-263
fileId_short: 5f990bee01
image_file: S-263__5f990bee01.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
mutationFn
This is the actual async function that performs the server write.
Example:
“) TypeScript O
mutationFn: (newlodo) => api.updateTodo(newTodo)
It receives the same variables you passed to mutate . Mutations are used to create/update/delete data or
cause side-effects. tanstac ~1
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-264 - onSuccess

Metadata:
```text
source_id: S-264
image_use_id: IU-264
fileId_short: ed4ef609cc
image_file: S-264__ed4ef609cc.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
onSuccess

Signature in v5:
“) TypeScript O
onSuccess: (data, variables, onMutateResult, context) => Promise<unknown> | unknown

It runs when the mutation succeeds. _ tanstack

Arguments

data

The resolved result of mutationFn .
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-265 - Why this matters

Metadata:
```text
source_id: S-265
image_use_id: IU-265
fileId_short: 9d4d2d9cfa
image_file: S-265__9d4d2d9cfa.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Why this matters

Suppose you are showing an optimistic todo row while:
“) TypeScript O
mutation. isPending

te train
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-266 - Example:

Metadata:
```text
source_id: S-266
image_use_id: IU-266
fileId_short: 57a7aa95ed
image_file: S-266__57a7aa95ed.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Example:
«> TypeScript oO
mutationFn: (todo) => api.updateTodo(todo)

If server returns:
“) TypeScript O
{ id: 5, title: ‘Saved', updatedAt: *..." }

then data is that returned payload.
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-267 - variables

Metadata:
```text
source_id: S-267
image_use_id: IU-267
fileId_short: 27b93b199a
image_file: S-267__27b93b199a.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
variables
The original variables passed to mutate(...) .
onMutateResult
Whatever onMutate returned.
Example:
«> TypeScript oO
return { previousTodos }
then in onSuccess :
«> TypeScript 0
onSuccess: (data, variables, onMutateResult, context) => {
// onMutateResult.previousTodos is available
3
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-268 - context

Metadata:
```text
source_id: S-268
image_use_id: IU-268
fileId_short: c35292d43d
image_file: S-268__c35292d43d.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
context
Again, mutation function context, including client . tnstac
Typical onSuccess usage:

¢ replace optimistic item with server-confirmed item

¢ invalidate related queries

¢ do success side effects
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-269 - onError

Metadata:
```text
source_id: S-269
image_use_id: IU-269
fileId_short: 56c5c8888e
image_file: S-269__56c5c8888e.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
onError
Signature in v5:
«> TypeScript 0
onError: (err, variables, onMutateResult, context) => Promise<unknown> | unknown
It runs if the mutation errors. —tanstace
Arguments
err
The mutation error thrown/rejected by mutationFn .
variables
The original mutation variables.
onMutateResult
The value returned from onMutate .
This is why rollback data is returned from onMutate .
1
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-270 - context

Metadata:
```text
source_id: S-270
image_use_id: IU-270
fileId_short: 82af270795
image_file: S-270__82af270795.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
context
Mutation context, including client. tnstac
Typical onError usage:
e rollback optimistic cache
e show error toast
¢ log failure
Example:
“) TypeScript a)
onError: (err, newlodo, onMutateResult, context) => {
context .client.setQueryData([‘todos'], onMutateResult.previousTodos)
t
That is the classic rollback path. — tanstack ~:
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-271 - onSettled

Metadata:
```text
source_id: S-271
image_use_id: IU-271
fileId_short: c7dccde3bc
image_file: S-271__c7dccde3bc.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
onSettled
Signature in v5:
«> TypeScript ay)
onSettled: (data, error, variables, onMutateResult, context) => Promise<unknown> | unknown
It runs whether the mutation succeeded or failed. _tnsace
Arguments
data
Mutation result if successful, otherwise typically undefined.
error
Mutation error if failed, otherwise typically null/undefined depending on typing/runtime shape.
variables
Original mutation variables. Vv
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-272 - onMutateResult

Metadata:
```text
source_id: S-272
image_use_id: IU-272
fileId_short: 1cb0706b7f
image_file: S-272__1cb0706b7f.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
onMutateResult
The value returned from onMutate .
context
Mutation context, including client. tnstc
Typical onSettled usage:
* invalidate related queries
do “always cleanup” logic
© resync with server after optimistic update
Example:
«> TypeScript oO
onSettled: (_data, _error, _vars, _onMutateResult, context) => {
return context.client.invalidateQueries({ queryKey: ["todos'] })
3
The optimistic updates guide uses [onSettled for inv {tation so the cache is synchronized with the true
server state after the mutation is done. tenstax -
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-273 - 8. One subtle detail: async callbacks are awaited

Metadata:
```text
source_id: S-273
image_use_id: IU-273
fileId_short: af1044b3cf
image_file: S-273__af1044b3cf.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
8. One subtle detail: async callbacks are awaited
The docs say if onMutate , onSuccess, onError , Of onSettled return a promise, it is awaited before
proceeding. tsace
That means:
«> TypeScript ia)
onMutate: async (...) => {
await context .client.cancelQueries(...)
3
is not just stylistic. TanStack Query will wait for it.
That is useful because in optimistic updates you usually want:
* cancel old refetches first
«then write optimistic cache
in that exact order. tnsact -
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

## 3. Cleaned source notes

- Mutation callback signatures pass `data`, `error`, `variables`, `onMutateResult`, and `context` depending on callback type.
- `mutationFn` performs the server write; `onMutate` prepares optimistic state and rollback/context.
- `onSuccess` can replace optimistic data with server-confirmed data.
- `onError` can roll back optimistic cache state.
- `onSettled` runs at the end and is often used for invalidation/refetch synchronization.
- Async mutation callbacks are awaited; returning the invalidation Promise keeps lifecycle state aligned.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Mutation callback signatures and callback arguments are documented in the tail | S-263, S-264, S-267, S-269, S-271 | medium-high |
| onSettled / awaited callbacks / invalidation Promise behavior continue R11 | S-261, S-262, S-271, S-273 | medium-high |
| onSuccess/onError use onMutateResult/context to confirm or roll back optimistic state | S-266, S-268, S-270, S-272 | medium-high |

---

## 5. Open review issues

- This is intentionally a larger 86-image pass. Run closure audit next.
- Sources are processed only because visible text exists; OCR-timeout cards were manually read instead of left as placeholders.
- If a later review finds an OCR artifact in wording, create a precision patch for that source.
