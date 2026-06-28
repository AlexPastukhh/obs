# Full combined final transcript — viTst existance assert test

Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
meaningful text elements: 0 / 0
unique embedded screenshots: 4 / 4
screenshot uses: 4 / 4
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — getByRole findByRole and queryByRole

Testing Library query families encode both timing and absence behavior. Choosing the right query usually removes the need for a custom existence assertion.

### getBy

- `getByRole` searches synchronously.
- It returns the element when exactly one match exists.
- It throws immediately when no match or multiple matches exist.
- Use it for elements that should already be present.

### queryBy

- `queryByRole` searches synchronously and returns null when no match exists.
- It still throws for multiple matches.
- Use it primarily to assert absence.

### findBy

- `findByRole` returns a Promise and retries until the query succeeds or times out.
- It is the preferred query for elements that appear after asynchronous work.

### Representative pattern

```ts
expect(screen.getByRole("heading", { name: /profile/i }))
  .toBeInTheDocument();

expect(screen.queryByRole("alert")).not.toBeInTheDocument();

expect(await screen.findByRole("status"))
  .toBeInTheDocument();
```

### Caveats

- Prefer accessible role/name queries over implementation selectors.
- Use plural query variants when multiple elements are expected.

## R02 — waitFor mechanics and recommended patterns

`waitFor` repeatedly invokes a callback until it stops throwing. It is useful for asynchronous assertions that cannot be expressed as one `findBy` query.

### Retry rule

- Returning false does not trigger another retry.
- An assertion inside the callback should throw while the condition is unmet.
- The callback runs immediately and then at intervals until timeout.

### Recommended use

- Use `findByRole` for waiting on one element.
- Use `waitFor` for state such as a mock call, attribute change, or several related assertions.
- Keep the callback small and deterministic.

### Avoid side effects

- Do not perform clicks or other repeated side effects inside `waitFor`.
- Trigger the action before waiting.
- Prefer `userEvent` APIs and await them.

### Representative pattern

```ts
await waitFor(() => {
  expect(api.save).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("status"))
    .toHaveTextContent("Saved");
});
```

### Caveats

- An async callback changes retry behavior because `waitFor` waits for the returned Promise.
- Long timeouts can hide a missing event or incorrect test setup.

## R03 — Custom asynchronous existence assertion helper

A helper can reduce repetitive query code, but it should preserve Testing Library's useful error messages and accept semantic query parameters.

### Helper shape

- Accept a role and optional accessible name.
- Use `findByRole` internally.
- Return the element so the caller can make additional assertions.
- Keep timeout configuration optional rather than globally excessive.

### Alternative

- Often a direct `expect(await screen.findByRole(...)).toBeInTheDocument()` is clearer.
- Create a helper only when the project repeats a meaningful domain-level assertion.

### Typing

- Use Testing Library's role/name option types when possible.
- Do not accept arbitrary CSS selectors under an accessibility-focused helper name.

### Representative pattern

```ts
async function expectRoleToExist(
  role: ByRoleMatcher,
  options?: ByRoleOptions
): Promise<HTMLElement> {
  const element = await screen.findByRole(role, options);
  expect(element).toBeInTheDocument();
  return element;
}
```

### Caveats

- A wrapper can make failure locations less obvious if it hides too much context.
- Keep domain-specific helpers close to the test utilities that own them.

## Regional source map

### R01

- transcript: `01-transcript-R01-getbyrole-findbyrole-and-querybyrole.md`
- text elements: `0`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-waitfor-mechanics-and-recommended-patterns.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-custom-asynchronous-existence-assertion-helper.md`
- text elements: `0`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
runtime/library/database-version details and original examples.
