# Type narrowing — repetition guide v001

## Comparison table

| Guard | Removes | Important caveat |
|---|---|---|
| `value == null` | `null` and `undefined` | deliberate loose equality |
| `!value` | all falsy values | also removes `""`, `0`, `false`, `NaN` |
| `value === undefined` | only `undefined` | keeps `null` if it is in the union |
| `typeof value !== "string"` | all non-strings | runtime-type check |

## High-value questions

1. Why can an early return narrow a variable for later statements?
2. Why is `if (!name) return` not equivalent to checking only missing values?
3. Compare `== null` with `=== undefined`.
4. What happens to narrowing after the variable is reassigned?
5. How does narrowing work across `if`/`else` branches?
6. Why can a callback sometimes lose an earlier narrowing assumption?
7. What return type is inferred for the complete `demo` example?
8. How would optional chaining differ from narrowing?

## Coding prompts

1. Accept `string | null | undefined` and retain valid empty strings.
2. Write a reusable predicate whose return type is `value is string`.
3. Rewrite the early-return example with an `else` branch.
4. Demonstrate how reassignment widens the variable again.
5. Narrow a union of object variants using the `in` operator.
