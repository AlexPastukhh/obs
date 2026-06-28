# Regional transcript — R02: Exhaustiveness checking and assertNever helpers

Conspect: `never type, exhaustion check with discriminated union`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 1
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

After every member of a discriminated union has been handled, the remaining variable narrows to `never`. Assigning it to `never` turns missing cases into compile-time errors.

## Switch pattern

- Switch on the discriminant property.
- Return or break from every known case.
- In the default branch, assign the value to a `never` variable.
- Adding a new union member makes that assignment fail until a case is added.

## assertNever helper

- Accept only a `never` parameter.
- Throw a descriptive runtime error.
- Return type `never` satisfies functions that must return a value in every branch.
- Reuse the helper across reducers, renderers and protocol handlers.

## satisfies pattern

- A local `const exhaustive: never = value` is the simplest compile-time check.
- Some codebases use `value satisfies never` for a no-runtime-value assertion.
- The chosen style should preserve a runtime error for untrusted input when appropriate.

## Representative pattern

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    default:
      return assertNever(shape);
  }
}
```

## Caveats

- Exhaustiveness depends on the variable being a properly discriminated union.
- A broad cast such as `as Shape` can bypass the guarantee.

## Source labels

- `why it works, nicer pattern`
- `if we have checked for all results`
- `shape will be never at compile time`
- `returning never for ts to not`
- `complain about possible undefined`
- `return value`

## Covered text elements

```text
T-002, T-003, T-004, T-005, T-006, T-007
```

## Covered screenshot uses

```text
IU-013, IU-014, IU-015, IU-016, IU-017, IU-018
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
