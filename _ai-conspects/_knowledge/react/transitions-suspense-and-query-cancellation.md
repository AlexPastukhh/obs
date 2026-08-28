# Transitions, Suspense, and query cancellation

Knowledge ID: `react.transitions-suspense-and-query-cancellation`

Topic: `react`

`startTransition` marks state work as non-urgent. React keeps the last committed UI visible while rendering the next tree, and `isPending` describes pending transition work. A newer transition may interrupt or supersede an intermediate render, but interruption does not cancel network I/O by itself.

Keep controlled-input updates urgent, then transition the expensive derived update:

```tsx
const [isPending, startTransition] = useTransition();

function onChange(event: React.ChangeEvent<HTMLInputElement>) {
  const next = event.target.value;
  setInput(next);
  startTransition(() => setFilter(next));
}
```

Transitions are scheduling, not a fixed delay, debounce, loading/error model, or request-cancellation mechanism. React may restart non-urgent renders and commit only the latest state, so expensive children still benefit from memoization, virtualization, and profiling. Work after an `await` may need another transition boundary depending on the React version/API semantics. Do not let transition UI hide confirmation required for a destructive action.

Suspense can keep the previous completed boundary visible while the next result is unavailable:

```text
page 1 committed → page 2 transition suspends → page 1 remains visible
```

One shared boundary coordinates the subtree as a unit; nested or separate boundaries can reveal independently completed parts. Multiple overlapping transitions share pending coordination rather than exposing a durable identity for each `startTransition` call, so workflows that require per-request ownership need explicit IDs/state and stale-result protection.

TanStack Query cancellation is a separate contract. An ordinary query can consume the supplied `AbortSignal`:

```tsx
useQuery({
  queryKey: ["users", filter],
  queryFn: ({ signal }) => fetch(`/api/users?q=${filter}`, { signal })
    .then(r => r.json()),
});
```

`queryClient.cancelQueries(...)` requests cancellation, but the underlying fetch stops only when the query function forwards the signal. Suspense-oriented query hooks have cancellation limitations, so do not infer transport cancellation from an interrupted render. Coordinate parent/child work with query keys, explicit cancellation, or request IDs rather than transition call order.

## Sources
- Workspace: `_ai-conspects/useTransition full flow, usedebounce, useDefferedvalue/`
- Authoritative processed source: `07-full-combined-final-transcript.md`, R02-R04
- Original SVG: `source/useTransition full flow, usedebounce, useDefferedvalue.svg`

- Workspace: `_ai-conspects/usetransition,cancelling queries of rquery,cant cancel suspence query, batching transitions/`
- Processed source: `01-final-transcript.md`, complete transcript
