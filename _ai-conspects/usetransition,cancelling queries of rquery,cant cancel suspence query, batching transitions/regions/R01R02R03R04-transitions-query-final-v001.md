# Final semantic transcript — `useTransition`, Suspense and TanStack Query cancellation

Authoritative source: `source/usetransition,cancelling queries of rquery,cant cancel suspence query, batching transitions.svg`  
Coverage: **21 unique screenshots / 21 placements + 15 native SVG labels**

---

# R01 — what remains visible during a transition

`startTransition` marks state updates as non-urgent:

```tsx
const [isPending, startTransition] =
  useTransition();

function goToNextPage() {
  startTransition(() => {
    setPage((page) => page + 1);
  });
}
```

React begins rendering the new state in the background. Until that render can commit, the screen keeps showing the last committed tree.

Example:

```text
committed page = 1
transition requests page = 2
page 2 suspends while data loads

visible UI
    still page 1

background render
    trying page 2
```

The visible page is not a half-mutated copy. It is the previous committed render with its previous props, state and query selection.

`isPending` indicates that transition work has not finished:

```tsx
<button disabled={isPending}>
  Next
</button>
```

It can also drive a subtle pending indicator while preserving the previous content.

## Repeated clicks

Transition renders are interruptible. With rapid updates:

```tsx
startTransition(() => setPage(2));
startTransition(() => setPage(3));
startTransition(() => setPage(4));
```

React may skip committing intermediate page renders and eventually commit the latest useful state.

Important separation:

```text
React rendering
    intermediate transition renders may be abandoned

data fetching
    requests started for intermediate pages may still continue
```

Interrupting a render does not automatically cancel every external request it triggered.

---

# R02 — Suspense boundaries and suspense-query cancellation

A Suspense boundary controls which committed UI stays visible while a descendant suspends.

With one shared boundary around parent and children:

```text
the boundary may keep the previous completed subtree visible
until the new parent/child tree is ready
```

With separate or nested boundaries:

```text
one part may reveal earlier
another part may continue showing its fallback or previous content
```

A successful render does not mean every possible background request was canceled. It only means the tree that committed had the data needed for that render.

TanStack Query suspense hooks have cancellation limitations compared with ordinary query hooks. A manual:

```ts
queryClient.cancelQueries({
  queryKey: ["products", page],
});
```

should not be assumed to abort an in-flight request used by a suspense query in every supported configuration.

Practical rule:

```text
ordinary useQuery + queryFn consuming signal
    cancellation can work

suspense query hooks
    do not design correctness around manual cancellation
```

Treat the library version’s official suspense-query cancellation behavior as authoritative.

---

# R03 — cancellable TanStack Query requests

A query function should consume the signal supplied by TanStack Query:

```tsx
const query = useQuery({
  queryKey: ["products", page],

  queryFn: async ({ signal }) => {
    const response = await fetch(
      `/api/products?page=${page}`,
      { signal },
    );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`,
      );
    }

    return response.json();
  },
});
```

When the query is canceled and the transport respects the signal, the underlying fetch can be aborted.

Manual cancellation:

```tsx
await queryClient.cancelQueries({
  queryKey: ["products"],
});
```

For rapid pagination:

```tsx
async function goToNextPage() {
  await queryClient.cancelQueries({
    queryKey: ["products"],
  });

  startTransition(() => {
    setPage((page) => page + 1);
  });
}
```

A smaller pattern can start cancellation without blocking the click handler, but then request and state ordering must still be reasoned about explicitly.

Key distinction:

```text
cancelQueries
    asks TanStack Query to cancel matching work

AbortSignal consumption
    lets the actual network request stop

transition interruption
    lets React discard obsolete render work
```

These layers cooperate but are not interchangeable.

---

# R04 — batching and overlapping transitions

Multiple transition updates started close together may be treated as one overlapping transition period. React does not expose a stable public identity for each `startTransition` call.

```tsx
startTransition(() => {
  setPage(2);
});

startTransition(() => {
  setFilter("popular");
});
```

Possible outcome:

```text
page and filter updates are rendered together
isPending remains true while transition work is unresolved
obsolete intermediate renders are interrupted
the newest viable tree commits
```

Concurrent transitions from different components can overlap. A child update may be interrupted by a later parent update that changes the same rendered subtree.

Do not assume:

```text
every startTransition call produces a visible intermediate commit
transitions complete strictly in click order
each transition has independently observable pending state
```

For independently tracked operations, keep explicit application state or use operation-specific request state rather than relying on one global transition flag.

## Parent/child result coordination

A shared Suspense boundary can keep the old combined UI visible until parent and child requirements are satisfied. However:

```text
an older child result may finish after a newer parent transition
an abandoned render may still have completed network work
errors may be handled by different boundaries
```

Use query keys, cancellation and stale-result protection to make data correctness independent of render scheduling.

## Practical checklist

```text
[ ] wrap non-urgent UI state updates in startTransition
[ ] expect the last committed UI to remain visible
[ ] use isPending for transition feedback
[ ] do not equate interrupted render with canceled network request
[ ] consume TanStack Query's AbortSignal in queryFn
[ ] verify suspense-query cancellation behavior for the installed version
[ ] expect rapid transitions to skip intermediate commits
[ ] use explicit state when operations need separate identities
[ ] design parent/child data correctness independently of commit order
```

---

# Coverage

```text
unique embedded screenshots: 21
image uses: 21
native SVG labels: 15
duplicate extra placements: 0

processed image uses: 21
processed text labels: 15
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
