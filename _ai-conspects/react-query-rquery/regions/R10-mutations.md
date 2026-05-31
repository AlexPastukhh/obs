# R10 — Mutations

Stage: **3 / first region transcript draft**  

Transcript status: **source-preserving draft, not final literal verification**

> Important: this file starts the real region transcription layer. It uses extracted mutation screenshots and OCR-assisted visible text. It preserves uncertainty instead of silently fixing the source. Future passes should visually verify each screenshot and upgrade entries from `draft` to `verified`.

---

## 0. Rules reminder for this file

- Do not turn the region into a new textbook.
- Preserve original labels and source wording.
- Separate visible transcript from cleaned notes.
- Mark OCR/visibility uncertainty.
- Keep visual/spatial context.
- Link claims to screenshot/label evidence.
- Do not silently fix code; cleaned code belongs only in cleaned notes.

---

## 1. You are here

Conspect: `react query,rquery`  
Current region: `R10 — Mutations`  
Canvas position: middle-lower part of the full sheet.

Previous nearby regions:
- `R07/R08` — QueryClient, query filters, cache control, cancel options
- `R09` — Offline / network mode / validation

Next nearby regions:
- `R11` — Websockets / suspense / enabled
- `R12` — Offline persistence / hydration / pruning
- later: cancellation / error handling, testing, performance/select

Stage 2 assigned 22 image uses to the initial R10 bbox. This Stage 3 uses the **extended mutation screenshot set** extracted from the visual region: 36 canvas image uses, including lower callback-argument screenshots that extend below the initial Stage 1 R10 y-boundary. The region index should be revised later if needed.

---

## 2. Original Excalidraw labels

### L-070

- x: `8853.7`
- y: `16341.7`

```text
MUTATIONS
```
### L-071

- x: `7675.6`
- y: `16557.3`

```text
STRUCTURE, CALLBACKS
INVALIDATION IN ONSETTLED
```
### L-072

- x: `6311.3`
- y: `16660.7`

```text
CANCELQUERIES IN 
OPTIMISTIC UPDATES PATTERN
```
### L-073

- x: `10587.1`
- y: `16729.3`

```text
MUTATE VS MUTATEASYNC
```
### L-075

- x: `9048.0`
- y: `17307.3`

```text
SETQUERYDATA RETURN FULL OBJECT LIKE PUT
```
### L-076

- x: `8022.7`
- y: `17845.0`

```text
CALLBACKS AND ARGS
```
### L-077

- x: `9226.1`
- y: `18542.6`

```text
INVALIDATION ONSETTLED
```
### L-078

- x: `9171.5`
- y: `18681.5`

```text
SO UPDATING STATE NO MATTER WHAT AND GETTING THE FINAL 
RESULT AS THE TRUE SERVER STATE NO MATTER WHAT
```
### L-079

- x: `9160.6`
- y: `18806.9`

```text
AND NEED TO REMEMBER THAT YOU ARE MANUALLY SETTING CACHE IN BOTH SUCCESS 
AND ERROR OUTCOMES SO ITS LOGICALLY CORRECT TO GET THE FINAL STATE FROM THE SERVER
```
### L-080

- x: `10573.1`
- y: `19099.8`

```text
KEEPING MUTATION IN 
PENDING STATE UNTIL REVALIDATION + REFETCH
```
---

## 3. Extended mutation screenshot inventory

| Source ID | Image index | fileId short | x | y | size | Theme | Transcript status |
|---|---:|---|---:|---:|---:|---|---|
| MUT-S001 | 130 | `488e3dbdf9` | 8854 | 16878 | 919×385 | mutation variable flow and optimistic update overview | draft |
| MUT-S002 | 005 | `55a51e51f4` | 7986 | 16935 | 659×430 | optimistic update code example | draft |
| MUT-S003 | 003 | `5bec075fe3` | 6916 | 16946 | 730×430 | cancelQueries / optimistic update race | draft |
| MUT-S004 | 150 | `73b5e8fd66` | 10593 | 17012 | 895×449 | mutate vs mutateAsync / mutate | draft |
| MUT-S005 | 004 | `f128bccab6` | 6910 | 17378 | 740×308 | standard optimistic update flow | draft |
| MUT-S006 | 149 | `7de4e030ee` | 7933 | 17379 | 826×341 | mutate UI example | draft |
| MUT-S007 | 151 | `a7ac382dd0` | 10585 | 17476 | 898×354 | mutateAsync | draft |
| MUT-S008 | 148 | `8641ca8bc2` | 9089 | 17497 | 994×572 | immutable updates only | draft |
| MUT-S009 | 005 | `55a51e51f4` | 6900 | 17711 | 659×430 | optimistic update code example | draft |
| MUT-S010 | 152 | `e7fe1b2b60` | 10603 | 17839 | 617×191 | when to use mutate | draft |
| MUT-S011 | 153 | `7ec1a778b8` | 10596 | 18036 | 939×347 | when to use mutateAsync | draft |
| MUT-S012 | 131 | `69bab5a10b` | 7938 | 18092 | 737×210 | best mental model for lifecycle callbacks | draft |
| MUT-S013 | 147 | `c11c8e7392` | 9157 | 18123 | 841×375 | manual updates get hard | draft |
| MUT-S014 | 006 | `850109ec0c` | 6916 | 18256 | 940×376 | useQuery v5 callbacks removed / mutation callbacks remain | draft |
| MUT-S015 | 154 | `4b9ba54f93` | 10581 | 18401 | 942×421 | mutate vs mutateAsync example | draft |
| MUT-S016 | 145 | `9373bdbda3` | 7946 | 18422 | 843×482 | what onMutate returns | draft |
| MUT-S017 | 007 | `37ac0e6a45` | 6941 | 18650 | 790×302 | cancellation handling in mutation callbacks | draft |
| MUT-S018 | 144 | `6759acc16a` | 7936 | 18909 | 1004×336 | onMutate signature | draft |
| MUT-S019 | 146 | `a6d0648cd6` | 9133 | 18910 | 927×448 | why invalidate in onSettled | draft |
| MUT-S020 | 143 | `ae6ed651d2` | 7945 | 19276 | 928×451 | variables argument | draft |
| MUT-S021 | 155 | `db2d4aae55` | 10596 | 19288 | 930×151 | return invalidateQueries Promise keeps pending | draft |
| MUT-S022 | 156 | `e2bb07761c` | 10602 | 19465 | 772×482 | without returning invalidation Promise | draft |
| MUT-S023 | 142 | `507dbfa569` | 7953 | 19741 | 857×463 | context.client | draft |
| MUT-S024 | 157 | `35935e7b35` | 10614 | 19965 | 840×220 | returning the Promise code snippet | draft |
| MUT-S025 | 158 | `c8aefd2cea` | 10596 | 20190 | 909×403 | returning Promise behavior steps | draft |
| MUT-S026 | 141 | `5f990bee01` | 7952 | 20209 | 954×372 | mutationFn | draft |
| MUT-S027 | 140 | `ed4ef609cc` | 7950 | 20621 | 924×401 | onSuccess signature and data argument | draft |
| MUT-S028 | 159 | `9d4d2d9cfa` | 10585 | 20626 | 981×219 | why pending matters / cut off | draft |
| MUT-S029 | 139 | `57a7aa95ed` | 7980 | 21043 | 940×354 | data returned from mutationFn | draft |
| MUT-S030 | 138 | `27b93b199a` | 7983 | 21406 | 855×482 | variables / onMutateResult availability | draft |
| MUT-S031 | 137 | `c35292d43d` | 7986 | 21900 | 865×285 | onSuccess typical usage | draft |
| MUT-S032 | 136 | `56c5c8888e` | 7997 | 22236 | 685×482 | onError signature and arguments | draft |
| MUT-S033 | 135 | `82af270795` | 7951 | 22745 | 835×482 | onError rollback usage | draft |
| MUT-S034 | 134 | `c7dccde3bc` | 7941 | 23240 | 726×482 | onSettled signature and arguments | draft |
| MUT-S035 | 133 | `1cb0706b7f` | 7960 | 23737 | 692×482 | onMutateResult / context / onSettled example | draft |
| MUT-S036 | 132 | `af1044b3cf` | 7941 | 24242 | 726×482 | async callbacks are awaited | draft |

Notes:
- Image index numbers correspond to earlier `image-index.csv`/bundle mapping when known.
- `55a51e51f4` appears twice on the canvas; both uses are preserved.
- OCR-assisted transcript is not guaranteed to be exact. Future pass should visually verify each entry.

---

## 4. Source transcript — OCR-assisted draft

This section is intentionally conservative. It stores visible text as a **draft source transcript**, not as final verified literal text.

### MUT-S001 — image 130 — `488e3dbdf9.png`

Metadata:

- fileId: `488e3dbdf9a6cb4c4e1fc7b19f59f3f0f2d0d9d1`
- canvas position: `x=8854.1`, `y=16878.5`
- size: `919×385`
- theme: mutation variable flow and optimistic update overview
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
mutate(variables) and mutateAsync(variables) both pass those variables into onMutate , mutationFn ,
onSuccess, onError , and onSettled. onMutate runs before the mutation function, which is why it’s the
right place to do the optimistic cache update and return rollback info for later callbacks. nsec -
So the flow you described is right:

1. call mutate(...) or mutateAsync(...)

2. ‘ontustate gets the same variables

3. optimistically write to cache before server responds

4. return previous state or rollback context

5. if server mutation fails, onError uses that returned value to restore state

6. ‘onSettled usually invalidates to resync with server truth. tas -
```

### MUT-S002 — image 005 — `55a51e51f4.png`

Metadata:

- fileId: `55a51e51f437dec3ab46facc5bf4c15fa89fb739`
- canvas position: `x=7986.6`, `y=16935.8`
- size: `659×430`
- theme: optimistic update code example
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Example:
> TypeScript a)
const mutation = useMutation({
mutationFn: updateTodo,
onMutate: async (newlodo, context) => {
await context.client.cancelQueries({ queryKey: ['todos'] })
const previousTodos = context.client. getQueryData([ "todos ])
context .client .setQueryData([‘todos'], (old) => [---old, newTodo])
return { previousTodos }
hb
onError: (err, newlodo, onMutateResult, context) => {
context .client .setQueryData(['todos'], onMutateResult . previousTodos)
Lb
onSettled: (data, _error, _vars, result, context) => {
context .client .invalidateQueries({ queryKey: [‘todos"] })
Lb
v
That exact pattern is straight from the docs. —snsacccom
```

### MUT-S003 — image 003 — `5bec075fe3.png`

Metadata:

- fileId: `5bec075fe3a00d87161356e7a274af579f00ec7d`
- canvas position: `x=6916.6`, `y=16946.7`
- size: `730×430`
- theme: cancelQueries / optimistic update race
- source type: screenshot
- read status: OCR-assisted draft
- literal status: partially visually checked; transcript still should be reviewed for exactness
- readability: medium

#### Draft visible transcript

```text
2) Why cancelQueries matters in optimistic updates
TanStack's optimistic update guide literally says to cancel outgoing refetches so they don’t overwrite your
optimistic update. trstsckcom -
The problem without cancellation
Imagine this timeline:
1. [‘todos"] query is on screen
2. arefetch is already in flight
3. user edits/adds a todo
4. you optimistically call setQueryData and show the new todo immediately
5. the older in-flight refetch finishes with stale server data
6. that old response writes into cache and wipes out your optimistic change
That is the race you are preventing.  tansackcom +
So the idea is:
cancel old fetches first, then write optimistic data, then later sync with the server result. sostctcom
```

### MUT-S004 — image 150 — `73b5e8fd66.png`

Metadata:

- fileId: `73b5e8fd6633fa9ba78bafbcccd16fe04b9bbff9`
- canvas position: `x=10593.2`, `y=17012.9`
- size: `895×449`
- theme: mutate vs mutateAsync / mutate
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
mutate VS mutateAsync
mutate
Use when you want the callback-style flow and do not need to await the mutation result directly.
> TypeScript io)
mutation.mutate(newTodo)
You usually rely on:
© onSuccess
© onError
© onSettled
for follow-up behavior. The docs describe mutate as returning void.  tnstac
```

### MUT-S005 — image 004 — `f128bccab6.png`

Metadata:

- fileId: `f128bccab609bf76456a2477f30f835e7c60be09`
- canvas position: `x=6910.1`, `y=17378.4`
- size: `740×308`
- theme: standard optimistic update flow
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
3) Standard optimistic update flow with cancelqueries
TanStack’s documented flow is:

1. onMutate

2. cancel outgoing refetches

3. snapshot previous cache value

4. write optimistic value with setQueryData

5. if mutation fails, roll back using the snapshot

6. on settled, invalidate/refetch to sync with server.  tanstackcom
a
```

### MUT-S006 — image 149 — `7de4e030ee.png`

Metadata:

- fileId: `7de4e030ee7931b275819747d155a5b5e1961264`
- canvas position: `x=7933.9`, `y=17379.5`
- size: `826×341`
- theme: mutate UI example
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
function RenameButton() {
const mutation = useMutation({
mutationFn: updateUser,
»
return (
<button
onClick={() => mutation.mutate({ id: '1', newName: ‘Alice’ })}
disabled={mutation.isPending}
>
{mutation.isPending ? ‘Saving...' : ‘Rename'}
</button>
»)
+
```

### MUT-S007 — image 151 — `a7ac382dd0.png`

Metadata:

- fileId: `a7ac382dd02a306fb445523ca92904a1b2f9e6db`
- canvas position: `x=10585.5`, `y=17476.2`
- size: `898×354`
- theme: mutateAsync
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
mutateAsync
Use when you want a Promise and prefer await / try-catch .
> TypeScript io)
try {
const result = await mutation.mutateAsync(newTodo)
} catch (err) {
// handle error
+
The docs say mutateAsync is similar to mutate but returns a Promise that resolves on success or throws on
error. —Tanstack -
```

### MUT-S008 — image 148 — `8641ca8bc2.png`

Metadata:

- fileId: `8641ca8bc2b715e8fdb5f2b7714d1d00fff5a680`
- canvas position: `x=9089.6`, `y=17498.0`
- size: `994×572`
- theme: immutable updates only
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
21.2 Immutable updates only
Always return a new object/array.
Good
> TypeScript a)
queryClient.setQueryData([‘user', id], (prev: any) =>
prev ? { ..-prev, name: newName } : prev
»)
LETe
> TypeScript a)
queryClient.setQueryData([‘user', id], (prev: any) => {
prev.name = newName
return prev
»
If you return the same reference after mutating it, observers may not update correctly.
```

### MUT-S009 — image 005 — `55a51e51f4.png`

Metadata:

- fileId: `55a51e51f437dec3ab46facc5bf4c15fa89fb739`
- canvas position: `x=6900.3`, `y=17711.7`
- size: `659×430`
- theme: optimistic update code example
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Example:
> TypeScript a)
const mutation = useMutation({
mutationFn: updateTodo,
onMutate: async (newlodo, context) => {
await context.client.cancelQueries({ queryKey: ['todos'] })
const previousTodos = context.client. getQueryData([ "todos ])
context .client .setQueryData([‘todos'], (old) => [---old, newTodo])
return { previousTodos }
hb
onError: (err, newlodo, onMutateResult, context) => {
context .client .setQueryData(['todos'], onMutateResult . previousTodos)
Lb
onSettled: (data, _error, _vars, result, context) => {
context .client .invalidateQueries({ queryKey: [‘todos"] })
Lb
v
That exact pattern is straight from the docs. —snsacccom
```

### MUT-S010 — image 152 — `e7fe1b2b60.png`

Metadata:

- fileId: `e7fe1b2b605cb9ef250315cf99077da63100fc4c`
- canvas position: `x=10603.1`, `y=17839.1`
- size: `617×191`
- theme: when to use mutate
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
When to use which
Use mutate when:
* you are happy with mutation callbacks
* you trigger the mutation from UI events
* you do not need the result inline in surrounding code
```

### MUT-S011 — image 153 — `7ec1a778b8.png`

Metadata:

- fileId: `7ec1a778b82a222a4b5a879656a7e1db95de67da`
- canvas position: `x=10596.1`, `y=18036.7`
- size: `939×347`
- theme: when to use mutateAsync
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Example:
> TypeScript a)
const saveTodo = () => {
mutation.mutate({ id: 1, title: ‘New’ })
+
Use mutateAsync when:
© you want to await the result
* you need sequential async logic
* you want try/catch/finally style code
```

### MUT-S012 — image 131 — `69bab5a10b.png`

Metadata:

- fileId: `69bab5a10b41a429c4d05912a32d719dddae5607`
- canvas position: `x=7939.0`, `y=18092.7`
- size: `737×210`
- theme: best mental model for lifecycle callbacks
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
9. Best mental model
* onMutate = prepare optimistic state before server call
© mutationFn = do the actual write
* onSuccess = handle confirmed success
© onError = rollback failure
*® onSettled = always-run final synchronization/cleanup — tenstack »
```

### MUT-S013 — image 147 — `c11c8e7392.png`

Metadata:

- fileId: `c11c8e7392a16dfe9650c4859d74978f346283fc`
- canvas position: `x=9157.0`, `y=18123.1`
- size: `841×375`
- theme: manual updates get hard
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
21.3 When manual updates get hard
Manual updates become painful when the same entity appears in:
* sorted lists
* filtered lists
* detail page
© summary cards
* dashboard data
If an update changes sort order or filter membership, you may need to update many caches.
That is a sign to prefer invalidation.
```

### MUT-S014 — image 006 — `850109ec0c.png`

Metadata:

- fileId: `850109ec0ce563f2015d94bebaa2b7b09c66fc5d`
- canvas position: `x=6916.9`, `y=18256.2`
- size: `940×376`
- theme: useQuery v5 callbacks removed / mutation callbacks remain
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
In v5, useQuery does not have onError, onSuccess , OF onSettled . Those query callbacks were removed in
v5; they still exist for mutations, not queries. tantackcom «
So for optimistic updates, you usually do not “handle cancellation in useQuery onError ”, because there is no
such callback in v5. Instead, you handle it by:

* canceling the relevant queries before your optimistic write,

* optionally making that cancellation silent,

* snapshotting previous cache data,

© writing optimistic data,

* rolling back in the mutation ‘onError ,

* invalidating/refetching in onSettled .  tarstaccom 2
```

### MUT-S015 — image 154 — `4b9ba54f93.png`

Metadata:

- fileId: `4b9ba54f9363123130b43988de90f457a8b0501a`
- canvas position: `x=10581.3`, `y=18401.2`
- size: `942×421`
- theme: mutate vs mutateAsync example
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Example:
> TypeScript a)
const saveTodo = async () => {
try {
const saved = await mutation.mutateAsync({ id: 1, title: ‘New’ })
console. 1og(saved)
} catch (err) {
console. error(err)
+
3
That's the cleanest difference:
© mutate = fire and let callbacks handle lifecycle
© (mutateAsyne = await the mutation like a normal Promise. _tenstat +
```

### MUT-S016 — image 145 — `9373bdbda3.png`

Metadata:

- fileId: `9373bdbda331e44dbf1e1dd03ab677490344bf1b`
- canvas position: `x=7946.0`, `y=18422.7`
- size: `843×482`
- theme: what onMutate returns
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
4. What do we return from onMutate , and why?
You return rollback or context data that later callbacks may need.
In v5 docs, the value returned from @niutate is passed to:

© ~~ onSuccess

*¢  onError

* ~~ onSettled
as the onMutateResult argument. —tnstac
Typical returned values:

* previous cached data

* temporary optimistic IDs

* metadata needed for rollback

* anything you want later callbacks to know
```

### MUT-S017 — image 007 — `37ac0e6a45.png`

Metadata:

- fileId: `37ac0e6a45c069165843492d622f0fb91fb5875b`
- canvas position: `x=6941.2`, `y=18650.5`
- size: `790×302`
- theme: cancellation handling in mutation callbacks
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Do I need to do anything special in useQuery for cancellation?
Usually, no.

For optimistic updates, the recommended handling is:

© call cancelqueries in onMutate

* prefer { silent: true }

* rollback in the mutation’s onError

© refetch/invalidate in onSettled — tarstacccom -2
```

### MUT-S018 — image 144 — `6759acc16a.png`

Metadata:

- fileId: `6759acc16ac9d1c9e9643f165f293b982d356572`
- canvas position: `x=7936.0`, `y=18909.0`
- size: `1004×336`
- theme: onMutate signature
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
5. Callback arguments, one by one
onMutate
Signature in v5:
> TypeScript io)
onMutate: (variables, context) => Promise<TOnMutateResult | void> | TOnMutateResult | void
The docs describe it as receiving the same variables as the mutation function and firing before mutationFn -
Tanstack
```

### MUT-S019 — image 146 — `a6d0648cd6.png`

Metadata:

- fileId: `a6d0648cd669343f1a06607df83a8407b38adfac`
- canvas position: `x=9133.5`, `y=18910.2`
- size: `927×448`
- theme: why invalidate in onSettled
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Why do we invalidate in onSettled ?

onSettled runs whether the mutation succeeds or fails. TanStack defines it as the callback that fires when
the mutation either succeeds or encounters an error. ==>
You invalidate there because the optimistic cache is only a temporary guess. After the mutation is done, you
want the real server state to become the source of truth again. TanStack’s optimistic update docs show
invalidation in onSettled , and even note that you should return that Promise if you want the mutation to
stay pending until the refetch completes. tansactcom -
So:

if mutation succeeds, invalidation refetches and confirms the final server state

if mutation fails, onError rolls back, and invalidation can still refresh to the true server state if needed

tanstackcom +
```

### MUT-S020 — image 143 — `ae6ed651d2.png`

Metadata:

- fileId: `ae6ed651d2fafd20851ddc27d65471f4b1f69294`
- canvas position: `x=7945.5`, `y=19276.3`
- size: `928×451`
- theme: variables argument
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Arguments

variables

This is the value you passed to mutate(...) -

Example:
> TypeScript io)
mutation.mutate({ id: 5, title: ‘New title’ })

Then inside onMutate, variables is:
> TypeScript io)
{ id: 5, title: 'New title’ }
```

### MUT-S021 — image 155 — `db2d4aae55.png`

Metadata:

- fileId: `db2d4aae55318da2f061cb924b2e5bf1d91a8967`
- canvas position: `x=10596.2`, `y=19288.8`
- size: `930×151`
- theme: return invalidateQueries Promise keeps pending
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
if your onSettled returns the Promise from queryClient.invalidateQueries(...) , React Query will keep
the mutation itself in the [pending state until that invalidation-triggered refetch finishes. The official
optimistic updates guide says to return that Promise “so that the mutation stays in pending state until the
refetch is finished.” —tanstack «
```

### MUT-S022 — image 156 — `e2bb07761c.png`

Metadata:

- fileId: `e2bb07761c02d9b03025b9670d1e3a4c723eb7b9`
- canvas position: `x=10602.6`, `y=19465.3`
- size: `772×482`
- theme: without returning invalidation Promise
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Without returning the Promise
> Typescript is
onSettled: () => {
queryClient.invalidateQueries({ queryKey: ['todos"] })
+
What happens:
1. mutation request finishes
2. onSettled runs
3. invalidation/refetch is started
4. but onSettled itself finishes immediately
5. mutation is no longer pending, even though the follow-up refetch may still be running. tsa
So your mutation state may become:
© isPending = false
while the query is still refetching in background.
```

### MUT-S023 — image 142 — `507dbfa569.png`

Metadata:

- fileId: `507dbfa56965f0e98942e4b42575034d21ee4d44`
- canvas position: `x=7953.6`, `y=19742.0`
- size: `857×463`
- theme: context.client
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
context
This is a mutation function context object. In the optimistic update examples/docs, it includes client , which
is the QueryClient you use for things like:
© cancelQueries
© getQueryData
*  setQueryData
© invalidateQueries — tnsac -
So in practice:
> TypeScript io)
onMutate: async (variables, context) => {
context .client . setQueryData(...)
+
```

### MUT-S024 — image 157 — `35935e7b35.png`

Metadata:

- fileId: `35935e7b35cd81bb3047e857ac816caa55558d60`
- canvas position: `x=10614.5`, `y=19965.4`
- size: `840×220`
- theme: returning the Promise code snippet
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Returning the Promise
> TypeScript (
onSettled: () => {
return queryClient.invalidateQueries({ queryKey: ["todos'] })
+
1
```

### MUT-S025 — image 158 — `c8aefd2cea.png`

Metadata:

- fileId: `c8aefd2cea781b6a36ab404248956983e8d799d7`
- canvas position: `x=10596.3`, `y=20190.9`
- size: `909×403`
- theme: returning Promise behavior steps
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
or shorter:
> TypeScript io)
onSettled: () => queryClient.invalidateQueries({ querykey: ['todos’] })
Now what happens:
1. mutation request finishes
2. onSettled runs
3. invalidateQueries starts the refetch and returns a Promise
4, React Query waits for that Promise
5. mutation stays pending until that Promise resolves, meaning until the refetch work is done. tansac -
```

### MUT-S026 — image 141 — `5f990bee01.png`

Metadata:

- fileId: `5f990bee015201e3a8e4b35463383773c26a580c`
- canvas position: `x=7953.0`, `y=20209.8`
- size: `954×372`
- theme: mutationFn
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
mutationFn
This is the actual async function that performs the server write.
Example:
> TypeScript io)
mutationFn: (newTodo) => api-updateTodo(newTodo)
It receives the same variables you passed to mutate . Mutations are used to create/update/delete data or
cause side-effects. tanstack -
```

### MUT-S027 — image 140 — `ed4ef609cc.png`

Metadata:

- fileId: `ed4ef609cc83f60820980d312bc38051e67e680a`
- canvas position: `x=7950.8`, `y=20621.9`
- size: `924×401`
- theme: onSuccess signature and data argument
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
onSuccess

Signature in v5:
> TypeScript io)
onSuccess: (data, variables, onMutateResult, context) => Promise<unknown> | unknown

It runs when the mutation succeeds. _ tanswack

Arguments

data

The resolved result of mutationFn .
```

### MUT-S028 — image 159 — `9d4d2d9cfa.png`

Metadata:

- fileId: `9d4d2d9cfa24ca8b14168654cccf289bc9e3143d`
- canvas position: `x=10585.5`, `y=20626.6`
- size: `981×219`
- theme: why pending matters / cut off
- source type: screenshot
- read status: OCR-assisted draft
- literal status: partially visually checked; transcript still should be reviewed for exactness
- readability: medium / cut off

#### Draft visible transcript

```text
Why this matters

Suppose you are showing an optimistic todo row while:
> TypeScript io)
mutation. isPending

wg
```
#### Cut-off / unclear

```text
The screenshot is visibly cut off at the bottom. The line after `mutation.isPending` appears incomplete. Do not infer missing continuation from this screenshot alone.
```

### MUT-S029 — image 139 — `57a7aa95ed.png`

Metadata:

- fileId: `57a7aa95eda70dfee4f83a61e7ba7f2cab767d88`
- canvas position: `x=7980.9`, `y=21043.5`
- size: `940×354`
- theme: data returned from mutationFn
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
Example:
«> TypeScript ia)
mutationEn: (todo) => api.updateTodo(todo)

If server returns:
> TypeScript io)
{ id: 5, title: 'Saved", updatedat: '...' }

then (data is that returned payload.
```

### MUT-S030 — image 138 — `27b93b199a.png`

Metadata:

- fileId: `27b93b199a39a29cd5245df63f4f1de7ce8b08b8`
- canvas position: `x=7983.5`, `y=21406.0`
- size: `855×482`
- theme: variables / onMutateResult availability
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
variables
The original variables passed to mutate(...)
onMutateResult
Whatever onMutate returned.
Example:
> TypeScript io)
return { previousTodos }
then in onSuccess :
«» TypeScript ia)
onSuccess: (data, variables, onMutateResult, context) => {
// onMutateResult.previousTodos is available
+
```

### MUT-S031 — image 137 — `c35292d43d.png`

Metadata:

- fileId: `c35292d43ded1e4e324197d93d3605f6464e9b06`
- canvas position: `x=7986.0`, `y=21900.9`
- size: `865×285`
- theme: onSuccess typical usage
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
context
Again, mutation function context, including client . srs
Typical onSuccess usage:

* replace optimistic item with server-confirmed item

* invalidate related queries

* do success side effects
```

### MUT-S032 — image 136 — `56c5c8888e.png`

Metadata:

- fileId: `56c5c8888e1b5ef1ef447f9143f4ebb1757dda9d`
- canvas position: `x=7997.9`, `y=22236.5`
- size: `685×482`
- theme: onError signature and arguments
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
onError
Signature in v5:
«> TypeScript ia)
onError: (err, variables, onMutateResult, context) => Promise<unknown> | unknown
It runs if the mutation errors. _tanstace
Arguments
err
The mutation error thrown/rejected by mutationFn .
variables
The original mutation variables.
onMutateResult
The value returned from onMutate .
This is why rollback data is returned from onMutate -
1
```

### MUT-S033 — image 135 — `82af270795.png`

Metadata:

- fileId: `82af270795bea0a0e46be35a8566ca9ba7e9d2b0`
- canvas position: `x=7951.7`, `y=22745.1`
- size: `835×482`
- theme: onError rollback usage
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
context

Mutation context, including client. tnstck

Typical onError usage:

* rollback optimistic cache

show error toast

© log failure

Example:
> TypeScript a)
onError: (err, newlodo, onMutateResult, context) => {

context .client. setQueryData(['todos'], onMutateResult.previousTodos)

+

That is the classic rollback path. tanstack ~
```

### MUT-S034 — image 134 — `c7dccde3bc.png`

Metadata:

- fileId: `c7dccde3bca171f94c0b3ee14c9e73b36cbf56a4`
- canvas position: `x=7941.3`, `y=23240.3`
- size: `726×482`
- theme: onSettled signature and arguments
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
onSettled
Signature in v5:
> TypeScript io)
onSettled: (data, error, variables, onMutateResult, context) => Promise<unknown> | unknown
It runs whether the mutation succeeded or failed. _tnsacx
Arguments
data
Mutation result if successful, otherwise typically undefined.
error
Mutation error if failed, otherwise typically null/undefined depending on typing/runtime shape.
variables
Original mutation variables. v
```

### MUT-S035 — image 133 — `1cb0706b7f.png`

Metadata:

- fileId: `1cb0706b7f7881f428df532769350fa83c6880d8`
- canvas position: `x=7960.4`, `y=23737.5`
- size: `692×482`
- theme: onMutateResult / context / onSettled example
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
onMutateResult
The value returned from onMutate .
context
Mutation context, including client. tnstck
Typical onSettled usage:
* invalidate related queries
do “always cleanup” logic
© resync with server after optimistic update
Example:
«» TypeScript (a)
onSettled: (_data, _error, _vars, _onMutateResult, context) => {
return context.client.invalidateQueries({ queryKey: ['todos"] })
+
The optimistic updates guide uses [onSettled) for inv {tation so the cache is synchronized with the true
server state after the mutation is done. tenstx -
```

### MUT-S036 — image 132 — `af1044b3cf.png`

Metadata:

- fileId: `af1044b3cf04b62dfed615aa0b91888dada5e06f`
- canvas position: `x=7941.5`, `y=24242.2`
- size: `726×482`
- theme: async callbacks are awaited
- source type: screenshot
- read status: OCR-assisted draft
- literal status: OCR-assisted draft; needs visual verification for exact literal transcript
- readability: medium

#### Draft visible transcript

```text
8. One subtle detail: async callbacks are awaited
The docs say if onMutate , onSuccess, onError , Of onSettled return a promise, it is awaited before
proceeding. tensece
That means:
> TypeScript a)
onMutate: async (..-) => {
await context .client.cancelQueries(...)
+
is not just stylistic. TanStack Query will wait for it.
That is useful because in optimistic updates you usually want:
* cancel old refetches first
«then write optimistic cache
in that exact order. tnsact -
```

---

## 5. Cleaned source notes

Cleaned notes below are based on the draft transcript above. They are **not** general React Query notes and should be verified against screenshots before being treated as final.

### R10-A — cancelQueries / optimistic update race

- `cancelQueries` matters because an in-flight stale refetch can finish after an optimistic cache write and overwrite it.
- Standard flow shown in screenshots: `onMutate` → cancel outgoing refetches → snapshot previous cache → write optimistic value with `setQueryData` → rollback on failure → invalidate/refetch in `onSettled`.
- In v5, `useQuery` no longer has `onError`, `onSuccess`, or `onSettled`; this cancellation/rollback logic belongs in mutation callbacks.

### R10-B — mutation lifecycle structure

- `mutate(variables)` and `mutateAsync(variables)` pass variables through `onMutate`, `mutationFn`, `onSuccess`, `onError`, and `onSettled`.
- `onMutate` runs before `mutationFn`, so it is the place for optimistic cache writes and rollback context.
- Mental model shown: `onMutate` prepares optimistic state; `mutationFn` performs the write; `onSuccess` handles confirmed success; `onError` handles rollback; `onSettled` performs final synchronization/cleanup.

### R10-C — callback arguments

- Screenshots separately explain `variables`, `data`, `context`, and `onMutateResult`.
- `context.client` is used for `cancelQueries`, `getQueryData`, `setQueryData`, and `invalidateQueries`.
- `onMutateResult` is whatever `onMutate` returned and is available in later callbacks.

### R10-D — invalidation in onSettled

- `onSettled` runs whether the mutation succeeds or fails.
- The region states that manually changed cache should eventually be synchronized with true server state.
- Returning the Promise from `invalidateQueries` keeps the mutation pending until refetch finishes.

### R10-E — setQueryData caveats

- Immutable updates only: return a new object/array.
- Manual cache updates get hard when the same entity appears in sorted lists, filtered lists, detail pages, summary cards, dashboards, etc.
- In those cases the source recommends/prefer invalidation.

### R10-F — mutate vs mutateAsync

- `mutate` is for callback-style flow and returns void.
- `mutateAsync` returns a Promise and is used with `await` / `try-catch` / sequential async logic.

### R10-G — pending until revalidation/refetch

- Without returning the Promise from `invalidateQueries`, mutation can stop being pending while refetch continues.
- Returning the Promise makes React Query wait, so mutation remains pending until the invalidation/refetch work is done.
- `MUT-S028` / image 159 is cut off and should be visually rechecked before using its exact wording.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| `cancelQueries` protects optimistic updates from stale in-flight refetches | MUT-S003 / image 003, MUT-S005 / image 004 | screenshot draft | medium-high |
| Standard optimistic update flow includes cancel, snapshot, optimistic write, rollback, invalidate/refetch | MUT-S002/MUT-S009 duplicate code example, MUT-S005 | screenshot draft | medium-high |
| React Query v5 removed query callbacks but mutation callbacks remain | MUT-S014 / image 006 | screenshot draft | medium |
| `onMutate` returns rollback/context data later available as `onMutateResult` | MUT-S016 / image 145, MUT-S030 / image 138 | screenshot draft | medium-high |
| `onError` is rollback path | MUT-S033 / image 135, MUT-S032 / image 136 | screenshot draft | medium-high |
| `onSettled` runs after success or error and is used for invalidation/final sync | MUT-S019 / image 146, MUT-S034 / image 134, labels L-077/L-078/L-079 | screenshot + label | medium-high |
| Manual `setQueryData` updates should be immutable | MUT-S008 / image 148 | screenshot draft | medium |
| Manual cache updates become hard across multiple derived/list/detail caches | MUT-S013 / image 147 | screenshot draft | medium |
| `mutate` is callback-style; `mutateAsync` is Promise/await-style | MUT-S004 / image 150, MUT-S007 / image 151, MUT-S015 / image 154 | screenshot draft | medium-high |
| Returning the `invalidateQueries` Promise keeps mutation pending until refetch finishes | MUT-S021 / image 155, MUT-S024 / image 157, MUT-S025 / image 158 | screenshot draft | medium-high |
| The `mutation.isPending` example is cut off | MUT-S028 / image 159 | screenshot visual note | medium |
---

## 7. Question hooks

- Why is `cancelQueries` used before an optimistic cache write?
- What race condition can happen if an old refetch finishes after `setQueryData`?
- What should `onMutate` do in the optimistic update pattern?
- What should `onMutate` return for rollback?
- How does `onError` use `onMutateResult`?
- Why does this region put invalidation in `onSettled`?
- What is the difference between `mutate` and `mutateAsync`?
- When should `mutateAsync` be used instead of `mutate`?
- What happens if `invalidateQueries` is called in `onSettled` but its Promise is not returned?
- Why can manual `setQueryData` updates become difficult across filtered/sorted/detail views?

---

## 8. Open verification tasks

- Visually verify every OCR-assisted draft transcript and upgrade it to exact visible text/code.
- Split exact visible text and exact visible code for each screenshot.
- Match every fileId to exact copied `images/...` path from `image-index.csv`.
- Revise Stage 1/2 R10 bounding box because callback-argument screenshots extend below initial R10 region.
- Decide whether repeated screenshot `55a51e51f4` should be duplicated in final transcript or referenced once with two canvas uses.
