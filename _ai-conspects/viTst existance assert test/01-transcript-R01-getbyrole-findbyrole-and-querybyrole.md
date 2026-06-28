# Regional transcript — R01: getByRole findByRole and queryByRole

Conspect: `viTst existance assert test`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Testing Library query families encode both timing and absence behavior. Choosing the right query usually removes the need for a custom existence assertion.

## getBy

- `getByRole` searches synchronously.
- It returns the element when exactly one match exists.
- It throws immediately when no match or multiple matches exist.
- Use it for elements that should already be present.

## queryBy

- `queryByRole` searches synchronously and returns null when no match exists.
- It still throws for multiple matches.
- Use it primarily to assert absence.

## findBy

- `findByRole` returns a Promise and retries until the query succeeds or times out.
- It is the preferred query for elements that appear after asynchronous work.

## Representative pattern

```ts
expect(screen.getByRole("heading", { name: /profile/i }))
  .toBeInTheDocument();

expect(screen.queryByRole("alert")).not.toBeInTheDocument();

expect(await screen.findByRole("status"))
  .toBeInTheDocument();
```

## Caveats

- Prefer accessible role/name queries over implementation selectors.
- Use plural query variants when multiple elements are expected.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-001
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
