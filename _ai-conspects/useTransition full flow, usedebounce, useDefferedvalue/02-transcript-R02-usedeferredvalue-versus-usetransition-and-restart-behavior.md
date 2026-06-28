# Regional transcript — R02: useDeferredValue versus useTransition and restart behavior

Conspect: `useTransition full flow, usedebounce, useDefferedvalue`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Both APIs mark work as non-urgent, but they operate at different ownership boundaries. `useTransition` wraps a state update you control; `useDeferredValue` defers consumption of a value received or already updated.

## Ownership distinction

- Use `startTransition` when the component owns the setter that starts expensive work.
- Use `useDeferredValue` when a downstream consumer receives a rapidly changing value.
- A deferred value is especially useful for props that cannot be changed at their source.
- Both keep urgent interactions responsive.

## Interruptible rendering

- Transition/deferred renders can be interrupted by newer urgent updates.
- React can abandon obsolete background work.
- If the source changes again, background rendering restarts with the newest value.
- Only the relevant latest result should commit.

## Choosing

- Controlled input text remains urgent.
- The expensive derived state may be updated inside `startTransition`.
- Alternatively, defer the value passed to the expensive child.
- Do not combine both without a clear reason; double deferral can add unnecessary lag.

## Representative pattern

```tsx
const [query, setQuery] = useState("");
const [filter, setFilter] = useState("");
const [isPending, startTransition] = useTransition();

function onChange(value: string) {
  setQuery(value); // urgent
  startTransition(() => setFilter(value)); // non-urgent
}
```

## Caveats

- Neither API is a timer.
- Older work may begin, be interrupted and never commit.

## Source labels

- `useDefferedVal vs useTransition`
- `downstream consumer, one value changes constantly`
- `restarting`

## Covered text elements

```text
T-008, T-009, T-010
```

## Covered screenshot uses

```text
IU-027, IU-028, IU-030, IU-031, IU-032
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
