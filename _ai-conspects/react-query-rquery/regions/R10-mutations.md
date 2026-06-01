# R10 — Mutations

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **3c / consolidated per-region update**  
Generated: 2026-05-31 23:53:36 UTC

This file is the main region file for `R10 — Mutations`.

It follows the new archive granularity rule: **do not create one archive per 10 screenshots**. User-facing archives should be per-region draft/consolidation/correction archives.

---

## 0. You are here

Conspect: `react query,rquery`  
Current region: `R10 — Mutations`  
Canvas position: middle-lower part of the full React Query sheet.

Previous nearby regions:

- QueryClient methods / filters / cache control
- offline / network mode / validation
- cancel options / getQueryCache / getMutationCache

Next nearby regions:

- Retry / pagination / infinite query
- websockets / suspense
- persistence / hydration
- cancellation / error handling

---

## 1. Original Excalidraw labels

```text
MUTATIONS
CANCELQUERIES IN OPTIMISTIC UPDATES PATTERN
STRUCTURE, CALLBACKS INVALIDATION IN ONSETTLED
SETQUERYDATA RETURN FULL OBJECT LIKE PUT
CALLBACKS AND ARGS
INVALIDATION ONSETTLED
SO UPDATING STATE NO MATTER WHAT AND GETTING THE FINAL RESULT AS THE TRUE SERVER STATE NO MATTER WHAT
AND NEED TO REMEMBER THAT YOU ARE MANUALLY SETTING CACHE IN BOTH SUCCESS AND ERROR OUTCOMES SO ITS LOGICALLY CORRECT TO GET THE FINAL STATE FROM THE SERVER
MUTATE VS MUTATEASYNC
KEEPING MUTATION IN PENDING STATE UNTIL REVALIDATION + REFETCH
```

---

## 2. Consolidation status

```text
Verified in this consolidated file: MUT-S001–MUT-S018
Not verified yet: MUT-S019–MUT-S036
No per-10 screenshot overlay files are created in this archive.
```

The next user-facing archive for this region should be another **per-region consolidation/correction archive**, not a small screenshot-batch archive.

---

## 3. Source inventory

| Source ID | Image | File | Status | Cut off | Confidence | Theme |
|---|---:|---|---|---|---|---|
| MUT-S001 | 130 | `488e3dbdf9.png` | `verified` | no | high | mutation variable flow and optimistic update overview |
| MUT-S002 | 005 | `55a51e51f4.png` | `verified` | no | high | optimistic update code example |
| MUT-S003 | 003 | `5bec075fe3.png` | `verified` | no | high | cancelQueries / optimistic update race |
| MUT-S004 | 150 | `73b5e8fd66.png` | `verified` | no | high | mutate vs mutateAsync / mutate |
| MUT-S005 | 004 | `f128bccab6.png` | `verified-visible-partial` | yes | high-for-visible-text | standard optimistic update flow |
| MUT-S006 | 149 | `7de4e030ee.png` | `verified` | no | high | mutate UI example |
| MUT-S007 | 151 | `a7ac382dd0.png` | `verified` | no | high | mutateAsync |
| MUT-S008 | 148 | `8641ca8bc2.png` | `verified` | no | high | immutable updates only |
| MUT-S009 | 005 | `55a51e51f4.png` | `verified-duplicate-of-MUT-S002` | no | high | optimistic update code example |
| MUT-S010 | 152 | `e7fe1b2b60.png` | `verified` | no | high | when to use mutate |
| MUT-S011 | 153 | `7ec1a778b8.png` | `verified` | no | high | when to use mutateAsync |
| MUT-S012 | 131 | `69bab5a10b.png` | `verified` | no | high | best mental model for lifecycle callbacks |
| MUT-S013 | 147 | `c11c8e7392.png` | `verified` | no | high | manual updates get hard |
| MUT-S014 | 006 | `850109ec0c.png` | `verified` | no | high | useQuery v5 callbacks removed / mutation callbacks remain |
| MUT-S015 | 154 | `4b9ba54f93.png` | `verified` | no | high | mutate vs mutateAsync example |
| MUT-S016 | 145 | `9373bdbda3.png` | `verified` | no | high | what onMutate returns |
| MUT-S017 | 007 | `37ac0e6a45.png` | `verified` | no | high | cancellation handling in mutation callbacks |
| MUT-S018 | 144 | `6759acc16a.png` | `verified` | no | high | onMutate signature |
| MUT-S019 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S020 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S021 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S022 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S023 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S024 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S025 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S026 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S027 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S028 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S029 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S030 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S031 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S032 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S033 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S034 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S035 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |
| MUT-S036 |  | `` | `not-verified-yet` | unknown | not-assessed | pending visual verification |

---

## 4. Verified source transcript

This section contains only visually verified or explicitly duplicate-verified sources. Unverified screenshots are listed later as pending.

### MUT-S001 — image 130 — `488e3dbdf9.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: mutation variable flow and optimistic update overview

#### Verified visible text

```text
`mutate(variables)` and `mutateAsync(variables)` both pass those variables into `onMutate`, `mutationFn`, `onSuccess`, `onError`, and `onSettled`. `onMutate` runs before the mutation function, which is why it’s the right place to do the optimistic cache update and return rollback info for later callbacks.

So the flow you described is right:

1. call `mutate(...)` or `mutateAsync(...)`
2. `onMutate` gets the same variables
3. optimistically write to cache before server responds
4. return previous state or rollback context
5. if server mutation fails, `onError` uses that returned value to restore state
6. `onSettled` usually invalidates to resync with server truth.
```

#### Notes

Source chips like `TanStack +1` are visible but omitted from transcript body.

---

### MUT-S002 — image 005 — `55a51e51f4.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: optimistic update code example

#### Verified visible text

```text
Example:

That exact pattern is straight from the docs.
```

#### Verified visible code

```ts
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo, context) => {
    await context.client.cancelQueries({ queryKey: ['todos'] })

    const previousTodos = context.client.getQueryData(['todos'])

    context.client.setQueryData(['todos'], (old) => [...old, newTodo])

    return { previousTodos }
  },
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(['todos'], onMutateResult.previousTodos)
  },
  onSettled: (_data, _error, _vars, _result, context) => {
    context.client.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

#### Notes

This image appears twice in the mutation region; also used by MUT-S009.

---

### MUT-S003 — image 003 — `5bec075fe3.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: cancelQueries / optimistic update race

#### Verified visible text

```text
2) Why `cancelQueries` matters in optimistic updates

TanStack’s optimistic update guide literally says to cancel outgoing refetches so they don’t overwrite your optimistic update.

The problem without cancellation

Imagine this timeline:

1. `['todos']` query is on screen
2. a refetch is already in flight
3. user edits/adds a todo
4. you optimistically call `setQueryData` and show the new todo immediately
5. the older in-flight refetch finishes with stale server data
6. that old response writes into cache and wipes out your optimistic change

That is the race you are preventing.

So the idea is:

cancel old fetches first, then write optimistic data, then later sync with the server result.
```

#### Notes

Visually checked against original PNG.

---

### MUT-S004 — image 150 — `73b5e8fd66.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: mutate vs mutateAsync / mutate

#### Verified visible text

```text
`mutate` vs `mutateAsync`

`mutate`

Use when you want the callback-style flow and do not need to `await` the mutation result directly.

You usually rely on:

- `onSuccess`
- `onError`
- `onSettled`

for follow-up behavior. The docs describe `mutate` as returning `void`.
```

#### Verified visible code

```ts
mutation.mutate(newTodo)
```

#### Notes

Visually checked against original PNG.

---

### MUT-S005 — image 004 — `f128bccab6.png`

Metadata:

- status: `verified-visible-partial`
- readability: `high`
- cut off: `yes`
- confidence: `high-for-visible-text`
- theme: standard optimistic update flow

#### Verified visible text

```text
3) Standard optimistic update flow with `cancelQueries`

TanStack’s documented flow is:

1. `onMutate`
2. cancel outgoing refetches
3. snapshot previous cache value
4. write optimistic value with `setQueryData`
5. if mutation fails, roll back using the snapshot
6. on settled, invalidate/refetch to sync with server.

Example:
```

#### Notes

The screenshot is cut off below `Example:`. Do not infer the missing example from this screenshot; the example is visible in MUT-S002/MUT-S009.

---

### MUT-S006 — image 149 — `7de4e030ee.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: mutate UI example

#### Verified visible code

```ts
function RenameButton() {
  const mutation = useMutation({
    mutationFn: updateUser,
  })

  return (
    <button
      onClick={() => mutation.mutate({ id: '1', newName: 'Alice' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Saving...' : 'Rename'}
    </button>
  )
}
```

#### Notes

Code-only screenshot. Visually checked against original PNG.

---

### MUT-S007 — image 151 — `a7ac382dd0.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: mutateAsync

#### Verified visible text

```text
`mutateAsync`

Use when you want a Promise and prefer `await` / `try-catch`.

The docs say `mutateAsync` is similar to `mutate` but returns a Promise that resolves on success or throws on error.
```

#### Verified visible code

```ts
try {
  const result = await mutation.mutateAsync(newTodo)
} catch (err) {
  // handle error
}
```

#### Notes

Visually checked against original PNG.

---

### MUT-S008 — image 148 — `8641ca8bc2.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: immutable updates only

#### Verified visible text

```text
21.2 Immutable updates only

Always return a new object/array.

Good

Bad

If you return the same reference after mutating it, observers may not update correctly.
```

#### Verified visible code

```ts
// Good
queryClient.setQueryData(['user', id], (prev: any) =>
  prev ? { ...prev, name: newName } : prev
)

// Bad
queryClient.setQueryData(['user', id], (prev: any) => {
  prev.name = newName
  return prev
})
```

#### Notes

Original screenshot has separate Good/Bad TypeScript blocks; transcript keeps them together while preserving content.

---

### MUT-S009 — image 005 — `55a51e51f4.png`

Metadata:

- status: `verified-duplicate-of-MUT-S002`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: optimistic update code example

#### Verified visible text

```text
Example:

That exact pattern is straight from the docs.
```

#### Verified visible code

```ts
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo, context) => {
    await context.client.cancelQueries({ queryKey: ['todos'] })

    const previousTodos = context.client.getQueryData(['todos'])

    context.client.setQueryData(['todos'], (old) => [...old, newTodo])

    return { previousTodos }
  },
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(['todos'], onMutateResult.previousTodos)
  },
  onSettled: (_data, _error, _vars, _result, context) => {
    context.client.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

#### Notes

Same underlying PNG as MUT-S002.

---

### MUT-S010 — image 152 — `e7fe1b2b60.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: when to use mutate

#### Verified visible text

```text
When to use which

Use `mutate` when:

- you are happy with mutation callbacks
- you trigger the mutation from UI events
- you do not need the result inline in surrounding code
```

#### Notes

Visually checked against original PNG.

---

### MUT-S011 — image 153 — `7ec1a778b8.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: when to use mutateAsync

#### Verified visible text

```text
Example:

Use `mutateAsync` when:

- you want to `await` the result
- you need sequential async logic
- you want `try/catch/finally` style code
```

#### Verified visible code

```ts
const saveTodo = () => {
  mutation.mutate({ id: 1, title: 'New' })
}
```

#### Notes

Visually checked against original PNG.

---

### MUT-S012 — image 131 — `69bab5a10b.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: best mental model for lifecycle callbacks

#### Verified visible text

```text
9. Best mental model

- `onMutate` = prepare optimistic state before server call
- `mutationFn` = do the actual write
- `onSuccess` = handle confirmed success
- `onError` = rollback failure
- `onSettled` = always-run final synchronization/cleanup
```

#### Notes

Visible source chip `TanStack +1` omitted from transcript body.

---

### MUT-S013 — image 147 — `c11c8e7392.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: manual updates get hard

#### Verified visible text

```text
21.3 When manual updates get hard

Manual updates become painful when the same entity appears in:

- sorted lists
- filtered lists
- detail page
- summary cards
- dashboard data

If an update changes sort order or filter membership, you may need to update many caches.

That is a sign to prefer invalidation.
```

#### Notes

Visually checked against original PNG.

---

### MUT-S014 — image 006 — `850109ec0c.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: useQuery v5 callbacks removed / mutation callbacks remain

#### Verified visible text

```text
In v5, `useQuery` does not have `onError`, `onSuccess`, or `onSettled`. Those query callbacks were removed in v5; they still exist for mutations, not queries.

So for optimistic updates, you usually do not “handle cancellation in `useQuery onError`”, because there is no such callback in v5. Instead, you handle it by:

- canceling the relevant queries before your optimistic write,
- optionally making that cancellation silent,
- snapshotting previous cache data,
- writing optimistic data,
- rolling back in the mutation `onError`,
- invalidating/refetching in `onSettled`.
```

#### Notes

Visible source chips `tanstack.com +1` and `tanstack.com +2` omitted from transcript body.

---

### MUT-S015 — image 154 — `4b9ba54f93.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: mutate vs mutateAsync example

#### Verified visible text

```text
Example:

That’s the cleanest difference:

- `mutate` = fire and let callbacks handle lifecycle
- `mutateAsync` = await the mutation like a normal Promise.
```

#### Verified visible code

```ts
const saveTodo = async () => {
  try {
    const saved = await mutation.mutateAsync({ id: 1, title: 'New' })
    console.log(saved)
  } catch (err) {
    console.error(err)
  }
}
```

#### Notes

Visually checked against original PNG. Source chip `TanStack +1` omitted from transcript body.

---

### MUT-S016 — image 145 — `9373bdbda3.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: what onMutate returns

#### Verified visible text

```text
4. What do we return from `onMutate`, and why?

You return rollback or context data that later callbacks may need.

In v5 docs, the value returned from `onMutate` is passed to:

- `onSuccess`
- `onError`
- `onSettled`

as the `onMutateResult` argument.

Typical returned values:

- previous cached data
- temporary optimistic IDs
- metadata needed for rollback
- anything you want later callbacks to know
```

#### Notes

Visually checked against original PNG.

---

### MUT-S017 — image 007 — `37ac0e6a45.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: cancellation handling in mutation callbacks

#### Verified visible text

```text
Do I need to do anything special in `useQuery` for cancellation?

Usually, no.

For optimistic updates, the recommended handling is:

- call `cancelQueries` in `onMutate`
- prefer `{ silent: true }`
- rollback in the mutation’s `onError`
- refetch/invalidate in `onSettled`
```

#### Notes

Visible source chip `tanstack.com +2` omitted from transcript body.

---

### MUT-S018 — image 144 — `6759acc16a.png`

Metadata:

- status: `verified`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: onMutate signature

#### Verified visible text

```text
5. Callback arguments, one by one

`onMutate`

Signature in v5:

The docs describe it as receiving the same variables as the mutation function and firing before `mutationFn`.
```

#### Verified visible code

```ts
onMutate: (variables, context) => Promise<TOnMutateResult | void> | TOnMutateResult | void
```

#### Notes

Visually checked against original PNG. Source chip `TanStack` omitted from transcript body.

---

## 5. Pending source transcript work

The following sources are part of the mutation region but are not verified in this consolidated file yet:

```text
MUT-S019, MUT-S020, MUT-S021, MUT-S022, MUT-S023, MUT-S024, MUT-S025, MUT-S026, MUT-S027, MUT-S028, MUT-S029, MUT-S030, MUT-S031, MUT-S032, MUT-S033, MUT-S034, MUT-S035, MUT-S036
```

They should be processed in the next **per-region consolidation/correction archive**.

---

## 6. Cleaned source notes — partial

This is a cleaned layer based only on verified sources `MUT-S001–MUT-S018`. It should not be treated as complete for all of R10 yet.

- `cancelQueries` is shown as part of the optimistic update flow, to prevent old in-flight refetches from overwriting optimistic cache writes.
- `onMutate` is shown as the before-server-call callback used for optimistic state and rollback context.
- `onError` is shown as the rollback path using data returned from `onMutate`.
- `onSettled` is shown as the final synchronization/refetch step.
- `mutate` is shown as callback-style / returns void.
- `mutateAsync` is shown as Promise-style / `await` / `try-catch`.
- Manual `setQueryData` updates should return new objects/arrays and can get hard across many caches.

---

## 7. Minimal interpretation — partial

The verified part of this region teaches the core mutation lifecycle and optimistic update pattern. This interpretation is partial because `MUT-S019–MUT-S036` are still pending visual verification.

---

## 8. Evidence table — partial

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| `cancelQueries` matters because stale in-flight refetches can overwrite optimistic cache | MUT-S003 | screenshot text | high |
| Standard optimistic flow is onMutate → cancel → snapshot → optimistic setQueryData → rollback → invalidate | MUT-S005, MUT-S002 | screenshot text/code | high for visible text |
| `onMutate` is before `mutationFn` and can return rollback context | MUT-S001, MUT-S016, MUT-S018 | screenshot text/code | high |
| `onError` rolls back using data returned from `onMutate` | MUT-S002, MUT-S016 | screenshot code/text | high |
| `onSettled` is for final sync/invalidation | MUT-S001, MUT-S002, MUT-S012 | screenshot text/code | high |
| `useQuery` v5 callbacks were removed, mutation callbacks remain | MUT-S014 | screenshot text | high |
| `mutate` is callback-style and returns void | MUT-S004, MUT-S010, MUT-S015 | screenshot text/code | high |
| `mutateAsync` returns Promise and supports await/try-catch | MUT-S007, MUT-S011, MUT-S015 | screenshot text/code | high |
| Manual updates become hard across sorted/filtered/detail/dashboard caches | MUT-S013 | screenshot text | high |
| `setQueryData` should use immutable updates | MUT-S008 | screenshot text/code | high |

---

## 9. Question hooks — partial

- Why does the optimistic update pattern cancel outgoing queries before writing optimistic cache data?
- What can happen if an old in-flight refetch finishes after an optimistic cache write?
- What does `onMutate` return, and which later callbacks receive that value?
- What is the rollback path in the optimistic mutation pattern?
- Why is `onSettled` used after both success and error?
- What is the difference between `mutate` and `mutateAsync`?
- When should `mutateAsync` be preferred over `mutate`?
- Why should `setQueryData` return a new object or array?
- When do manual cache updates become hard enough that invalidation is preferred?

---

## 10. Archive granularity note

This file replaces the small-batch overlay approach for mutation verification. Future updates should deliver either:

- a full-region transcript draft archive;
- a full-region consolidation/correction archive;
- a whole-conspect assembly archive.

Do not create a user-facing archive for every 8–10 screenshots unless the user explicitly asks.
