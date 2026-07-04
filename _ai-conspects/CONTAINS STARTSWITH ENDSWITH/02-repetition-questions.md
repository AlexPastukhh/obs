# Repetition questions — `Contains`, `StartsWith`, `EndsWith`

## Direct recall

1. What string is assigned to `s` in the source screenshot?
2. What does `Contains` test?
3. What does `StartsWith` test?
4. What does `EndsWith` test?
5. What type do all three methods return?
6. What is the value of `a` in the screenshot?
7. What is the value of `b`?
8. What is the value of `c`?

## Comparison behavior

9. Is `s.Contains("World")` case-sensitive?
10. Is the parameterless-comparison `Contains(string)` overload culture-sensitive or ordinal?
11. Why does `s.EndsWith("world", StringComparison.OrdinalIgnoreCase)` return `true`?
12. What does `StringComparison.Ordinal` communicate?
13. What is the difference between `Ordinal` and `OrdinalIgnoreCase`?
14. Why is an explicit `StringComparison` useful in machine-oriented code?

## Predict the result

Given:

```csharp
var s = "Hello World";
```

15. What does `s.Contains("world")` return?
16. What does `s.Contains("world", StringComparison.OrdinalIgnoreCase)` return?
17. What does `s.StartsWith("hello", StringComparison.Ordinal)` return?
18. What does `s.StartsWith("hello", StringComparison.OrdinalIgnoreCase)` return?
19. What does `s.EndsWith("World", StringComparison.Ordinal)` return?
20. What does `s.EndsWith("WORLD", StringComparison.OrdinalIgnoreCase)` return?

## Explain

21. Why is `Contains` not a replacement for whole-string equality?
22. Why is `ToLower()` usually inferior to using a `StringComparison` overload?
23. Why must the screenshot's comment about `Contains` be corrected?
24. What happens if the source string instance is `null`?
25. How can you safely produce `false` when a nullable string is `null`?

## Write code

26. Write a case-insensitive ordinal substring check for `"world"`.
27. Write an ordinal prefix check for `"Hello"`.
28. Write a case-insensitive ordinal suffix check for `"WORLD"`.
29. Write a whole-string equality check against `"Hello World"`.
30. Write a null-safe prefix check.
