# Exhaustiveness checks — repetition guide v002

## Decision table

| Goal | Pattern | Main trade-off |
|---|---|---|
| notice newly added named enum members | explicit enum arms, no discard | unnamed numeric values can still arrive; runtime can fail |
| controlled error for any unknown enum value | throwing `_` arm | future named-member omissions are hidden by catch-all |
| cases with different payloads | base record + derived records + type patterns | ordinary hierarchy is open unless controlled |
| explicit finite union API | union library/analyzer/generated union | dependency/tooling and project conventions |
| compile-time dispatch over known visitors | visitor pattern | more boilerplate |

## Core questions

1. What does “exhaustive” mean for a switch expression?
2. Why are “all named enum members” and “all runtime enum values” different?
3. What happens when no switch-expression arm matches?
4. Why does `_` prevent a missing-Triangle warning at that switch?
5. Why is a throwing discard not identical to TypeScript `assertNever`?
6. Why is a public abstract base type not a closed union?
7. What does each derived record contribute to the model?
8. When is `OneOf` or another union abstraction useful?
9. What must tests verify when a catch-all arm is required?
10. How do compiler warnings and analyzers differ operationally?

## Coding prompts

1. Add `Triangle(double B, double H)` and update the record-pattern switch.
2. Write an enum switch without `_` and inspect diagnostics after adding a member.
3. Add a throwing `_` arm and observe how the diagnostic changes.
4. Validate an externally parsed enum before switching.
5. Model a payment result with derived records and pattern matching.
6. Implement the same finite cases with a visitor.
7. Write tests that enumerate all declared enum members.
8. Design a marker/analyzer convention for a project-owned closed hierarchy.

## Review checklist

```text
[ ] project C# version is recorded
[ ] warnings are treated with the intended severity
[ ] external enum values are validated
[ ] catch-all trade-off is intentional
[ ] hierarchy extensibility is documented
[ ] every payload-bearing case has focused data
[ ] runtime failure behavior is tested
[ ] no default silently returns an unrelated value
```
