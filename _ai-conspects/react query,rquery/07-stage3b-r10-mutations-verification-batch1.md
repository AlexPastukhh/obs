# Stage 3b — R10 Mutations Verification Batch 1

Conspect: `react query,rquery`  
Region: `R10 — Mutations`  
Stage: **3b / visual verification batch 1**  
Generated: 2026-05-31 23:30:15 UTC

This pass visually checks the first batch of mutation screenshots against the original PNG files.

## Scope

- Verified screenshots: `MUT-S001` through `MUT-S008`.
- Duplicate image note: `MUT-S002` and `MUT-S009` are the same underlying image `55a51e51f4.png`; only `MUT-S002` is listed in this batch, but the verified transcript applies to both image uses.
- This pass does not verify the rest of R10 yet.

## Rules followed

- No new general React Query knowledge added.
- Exact/visible text and code are separated.
- Cut-off content is marked instead of inferred.
- Cleaned source text preserves source meaning.
- Verification status is explicit per screenshot.

## Verification summary

| Source ID | Image | Status | Cut off | Confidence | Theme |
|---|---:|---|---|---|---|
| MUT-S001 | 130 | visually-verified-from-original-png | no | high | mutation variable flow and optimistic update overview |
| MUT-S002 | 005 | visually-verified-from-original-png | no | high | optimistic update code example |
| MUT-S003 | 003 | visually-verified-from-original-png | no | high | cancelQueries / optimistic update race |
| MUT-S004 | 150 | visually-verified-from-original-png | no | high | mutate vs mutateAsync / mutate |
| MUT-S005 | 004 | visually-verified-from-original-png | yes | high-for-visible-text | standard optimistic update flow |
| MUT-S006 | 149 | visually-verified-from-original-png | no | high | mutate UI example |
| MUT-S007 | 151 | visually-verified-from-original-png | no | high | mutateAsync |
| MUT-S008 | 148 | visually-verified-from-original-png | no | high | immutable updates only |

## Verified source transcript

### MUT-S001 — image 130 — `488e3dbdf9.png`

Metadata:

- status: `visually-verified-from-original-png`
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

Source chips like `TanStack +1` are visible but not essential content; they are omitted from the cleaned transcript.

---

### MUT-S002 — image 005 — `55a51e51f4.png`

Metadata:

- status: `visually-verified-from-original-png`
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

This image appears twice in the mutation region; the transcript applies to both uses.

---

### MUT-S003 — image 003 — `5bec075fe3.png`

Metadata:

- status: `visually-verified-from-original-png`
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

- status: `visually-verified-from-original-png`
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

- status: `visually-verified-from-original-png`
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

The screenshot is cut off below `Example:` in the visible image. Do not infer the missing example from this screenshot; the example is visible in MUT-S002/MUT-S009.

---

### MUT-S006 — image 149 — `7de4e030ee.png`

Metadata:

- status: `visually-verified-from-original-png`
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

- status: `visually-verified-from-original-png`
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

- status: `visually-verified-from-original-png`
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

The original screenshot has separate Good and Bad TypeScript blocks; the verified transcript keeps them together for compactness while preserving source content.

---

## Open verification work

Remaining R10 screenshots still need visual verification:


```text
MUT-S009, MUT-S010, MUT-S011, MUT-S012, MUT-S013, MUT-S014, MUT-S015, MUT-S016, MUT-S017, MUT-S018, MUT-S019, MUT-S020, MUT-S021, MUT-S022, MUT-S023, MUT-S024, MUT-S025, MUT-S026, MUT-S027, MUT-S028, MUT-S029, MUT-S030, MUT-S031, MUT-S032, MUT-S033, MUT-S034, MUT-S035, MUT-S036
```

Recommended next batch: `MUT-S009`–`MUT-S018`.
