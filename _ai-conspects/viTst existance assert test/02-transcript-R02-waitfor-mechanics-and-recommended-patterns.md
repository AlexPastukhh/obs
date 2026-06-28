# Regional transcript — R02: waitFor mechanics and recommended patterns

Conspect: `viTst existance assert test`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`waitFor` repeatedly invokes a callback until it stops throwing. It is useful for asynchronous assertions that cannot be expressed as one `findBy` query.

## Retry rule

- Returning false does not trigger another retry.
- An assertion inside the callback should throw while the condition is unmet.
- The callback runs immediately and then at intervals until timeout.

## Recommended use

- Use `findByRole` for waiting on one element.
- Use `waitFor` for state such as a mock call, attribute change, or several related assertions.
- Keep the callback small and deterministic.

## Avoid side effects

- Do not perform clicks or other repeated side effects inside `waitFor`.
- Trigger the action before waiting.
- Prefer `userEvent` APIs and await them.

## Representative pattern

```ts
await waitFor(() => {
  expect(api.save).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("status"))
    .toHaveTextContent("Saved");
});
```

## Caveats

- An async callback changes retry behavior because `waitFor` waits for the returned Promise.
- Long timeouts can hide a missing event or incorrect test setup.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-002, IU-003
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
