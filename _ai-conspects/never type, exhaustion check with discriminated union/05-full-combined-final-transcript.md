# Full combined final transcript — never type, exhaustion check with discriminated union

Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
meaningful text elements: 7 / 7
unique embedded screenshots: 17 / 17
screenshot uses: 18 / 18
repeated placements retained: 1
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — never fundamentals, throw paths and missing returns

`never` is TypeScript's bottom type: it represents a value that cannot exist or a code path that never completes normally.

### Function return type

- A function that always throws can return `never`.
- A function with a provably infinite loop can return `never`.
- A normal function that returns no value uses `void`, not `never`.
- `never` is assignable to every type because it has no possible runtime value.

### Control flow

- After a call to a `never`-returning function, TypeScript knows execution cannot continue.
- This can satisfy a function's return analysis for impossible branches.
- A helper that throws is useful when runtime data violates a supposedly complete type model.

### Missing return example

- Two independent `if` statements may leave a path where neither branch returns.
- An `if/else`, `switch`, or final throwing helper makes the control flow explicit.
- Do not use `never` merely to silence a genuinely reachable missing-return bug.

### Representative pattern

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

### Caveats

- A declared `never` function that actually returns is incorrectly typed.
- Runtime inputs can violate compile-time assumptions, so throwing helpers still have value at trust boundaries.

## R02 — Exhaustiveness checking and assertNever helpers

After every member of a discriminated union has been handled, the remaining variable narrows to `never`. Assigning it to `never` turns missing cases into compile-time errors.

### Switch pattern

- Switch on the discriminant property.
- Return or break from every known case.
- In the default branch, assign the value to a `never` variable.
- Adding a new union member makes that assignment fail until a case is added.

### assertNever helper

- Accept only a `never` parameter.
- Throw a descriptive runtime error.
- Return type `never` satisfies functions that must return a value in every branch.
- Reuse the helper across reducers, renderers and protocol handlers.

### satisfies pattern

- A local `const exhaustive: never = value` is the simplest compile-time check.
- Some codebases use `value satisfies never` for a no-runtime-value assertion.
- The chosen style should preserve a runtime error for untrusted input when appropriate.

### Representative pattern

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

### Caveats

- Exhaustiveness depends on the variable being a properly discriminated union.
- A broad cast such as `as Shape` can bypass the guarantee.

## R03 — Discriminated unions and control-flow narrowing

A discriminated union gives every variant a shared literal-valued property such as `kind`, `type`, or `status`. That property lets TypeScript narrow reliably.

### Structure

- Each member has the same discriminant property name.
- Each member uses a distinct literal value.
- Variant-specific fields remain separate.
- The union is declared from the variant object types.

### Narrowing

- Checking `value.kind === 'success'` narrows to the success variant.
- A switch provides clear exhaustive branching.
- Inside a case, variant-specific fields are available without manual casts.
- The remaining value becomes `never` after all variants are handled.

### Applications

- Async request states.
- Reducer actions.
- Domain commands and events.
- API result types and parser outputs.

### Representative pattern

```ts
type Result<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function render<T>(result: Result<T>) {
  switch (result.status) {
    case "loading": return "Loading";
    case "success": return String(result.data);
    case "error": return result.error.message;
    default: return assertNever(result);
  }
}
```

### Caveats

- Use literal types rather than a broad `string` discriminant.
- Optional discriminants weaken narrowing and should usually be avoided.

## R04 — Plain unions, manual property checks and design guidance

A union without a shared discriminant can still be narrowed, but code must inspect properties or use custom type guards. This is often more fragile.

### Property checks

- The `in` operator can narrow when only some members contain a property.
- `typeof` and `instanceof` work for primitive/class distinctions.
- Custom predicates can encapsulate complex checks.
- Overlapping optional properties can make narrowing ambiguous.

### Why discriminants are better

- One stable field communicates the variant explicitly.
- Switch statements are easier to read and audit.
- Exhaustiveness checks become straightforward.
- Serialization and debugging show the state directly.

### Design guidance

- Add a discriminant when the variants represent states or commands.
- Keep variant payloads precise.
- Avoid unions of nearly identical objects with no reliable distinguishing property.
- Validate external JSON before treating it as the union.

### Representative pattern

```ts
type Cat = { meow(): void };
type Dog = { bark(): void };

function speak(animal: Cat | Dog) {
  if ("meow" in animal) animal.meow();
  else animal.bark();
}
```

### Caveats

- Property-existence checks can change meaning when models evolve.
- Compile-time unions do not validate runtime JSON.

## Regional source map

### R01

- transcript: `01-transcript-R01-never-fundamentals-throw-paths-and-missing-returns.md`
- text elements: `0`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-exhaustiveness-checking-and-assertnever-helpers.md`
- text elements: `6`
- screenshot uses: `6`
- unique screenshots: `6`
- repeated placements: `1`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-discriminated-unions-and-control-flow-narrowing.md`
- text elements: `1`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-plain-unions-manual-property-checks-and-design-guidance.md`
- text elements: `0`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
framework/language-version details and original examples.
