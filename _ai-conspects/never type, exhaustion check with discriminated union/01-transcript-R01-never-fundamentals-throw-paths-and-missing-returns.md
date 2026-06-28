# Regional transcript — R01: never fundamentals, throw paths and missing returns

Conspect: `never type, exhaustion check with discriminated union`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`never` is TypeScript's bottom type: it represents a value that cannot exist or a code path that never completes normally.

## Function return type

- A function that always throws can return `never`.
- A function with a provably infinite loop can return `never`.
- A normal function that returns no value uses `void`, not `never`.
- `never` is assignable to every type because it has no possible runtime value.

## Control flow

- After a call to a `never`-returning function, TypeScript knows execution cannot continue.
- This can satisfy a function's return analysis for impossible branches.
- A helper that throws is useful when runtime data violates a supposedly complete type model.

## Missing return example

- Two independent `if` statements may leave a path where neither branch returns.
- An `if/else`, `switch`, or final throwing helper makes the control flow explicit.
- Do not use `never` merely to silence a genuinely reachable missing-return bug.

## Representative pattern

```ts
function fail(message: string): never {
  throw new Error(message);
}

function numberOrString(value: number | string): string {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  return fail("unreachable");
}
```

## Caveats

- A declared `never` function that actually returns is incorrectly typed.
- Runtime inputs can violate compile-time assumptions, so throwing helpers still have value at trust boundaries.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-003, IU-004, IU-005, IU-006, IU-007
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
