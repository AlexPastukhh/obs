# Exhaustiveness checks — question bank v002

## Definitions

1. What is an exhaustive switch expression?
2. What is a discard pattern?
3. What is `SwitchExpressionException`?
4. What is a type pattern?
5. What is a discriminated union conceptually?
6. What makes a hierarchy open or closed?

## Enum reasoning

7. Why can an enum contain a value with no declared member name?
8. What is gained by omitting `_`?
9. What is gained by adding a throwing `_`?
10. What is lost by adding `_`?
11. Why can project warning settings change the developer experience?
12. How can an analyzer strengthen enforcement?
13. How would you keep the smallest API surface for a value-free finite set?
14. How should externally deserialized enum values be validated?

## Record hierarchy reasoning

15. Why can Circle carry only radius while Square carries only side length?
16. Why is this better than one method taking every possible dimension?
17. Does an abstract record automatically prevent unknown future subclasses?
18. Why can another assembly deriving from a public base weaken exhaustiveness?
19. What project boundaries can make the hierarchy effectively closed?
20. What should happen after adding Triangle?

## TypeScript comparison

21. How is a throwing discard similar to `assertNever`?
22. How is it weaker as a compile-time proof?
23. What does TypeScript's `never` communicate?
24. Why should language analogies not be treated as exact equivalence?

## Design scenarios

25. An enum comes from an untrusted integer. Which guard is needed?
26. A library must let consumers add new shape types. Is global exhaustiveness possible?
27. A domain requires exactly three result cases. Which modeling options exist?
28. A catch-all logs and returns zero. Why is that dangerous?
29. A new enum member compiles without updating one switch because `_` exists. How do you detect it?
30. A record hierarchy switch already warns before adding Triangle. Why?
31. A team wants payload-bearing cases and no external dependency. What design fits?
32. A team wants a visibly finite case list in one generic type. What design fits?

## Coding exercises

33. Implement enum-based Area with no discard.
34. Implement fail-loudly Area with `ArgumentOutOfRangeException`.
35. Implement record-based Shape with Circle, Square, Triangle.
36. Add a null arm when Shape can be nullable.
37. Write tests over `Enum.GetValues<ShapeKind>()`.
38. Implement a visitor for the shape hierarchy.
39. Create a OneOf-style result API and consume all cases.
40. Demonstrate the difference between a compiler warning and runtime exception.
