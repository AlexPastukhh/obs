# Regional transcript — R03: Custom asynchronous existence assertion helper

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

A helper can reduce repetitive query code, but it should preserve Testing Library's useful error messages and accept semantic query parameters.

## Helper shape

- Accept a role and optional accessible name.
- Use `findByRole` internally.
- Return the element so the caller can make additional assertions.
- Keep timeout configuration optional rather than globally excessive.

## Alternative

- Often a direct `expect(await screen.findByRole(...)).toBeInTheDocument()` is clearer.
- Create a helper only when the project repeats a meaningful domain-level assertion.

## Typing

- Use Testing Library's role/name option types when possible.
- Do not accept arbitrary CSS selectors under an accessibility-focused helper name.

## Representative pattern

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

## Caveats

- A wrapper can make failure locations less obvious if it hides too much context.
- Keep domain-specific helpers close to the test utilities that own them.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-004
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
