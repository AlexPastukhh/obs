# Repetition questions — type aliases, unions, interfaces

## Short recall

1. What is the primary purpose of an interface?
2. Can an interface property use a union type?
3. Can an interface itself be declared as a union?
4. Can a type alias name a primitive?
5. Can a type alias name an object shape?
6. What does `(string | number)[]` mean?
7. What does `string | number[]` mean?
8. Does an alias of an alias create a nominal type?

## Explain the difference

9. Explain the difference between an object shape and an arbitrary type expression.
10. Explain why `interface Guitarist` is valid even though `albums` uses a union.
11. Explain why `interface UserId = string` is invalid.
12. Compare the practical roles of `interface` and `type`.
13. Explain why the rule “interfaces cannot contain unions” is incorrect.

## Correct the code

14. Correct:

```ts
interface StringOrNumber = string | number;
```

15. Correct:

```ts
interface UserId = string;
```

16. Correct the meaning if the goal is an array containing both strings and numbers:

```ts
type Values = string | number[];
```

## Write code

17. Create an interface `User` with `id`, `name`, and optional `email`.
18. Create a type alias for `"idle" | "loading" | "success" | "error"`.
19. Create a tuple representing coordinates.
20. Create an array whose items may be strings or numbers.
21. Create a primitive alias `UserId`.
22. Use `UserId` inside an interface.
23. Create a function type alias.
24. Create an intersection type from two object types.

## Apply the rule

25. Choose `type` or `interface` for an extendable service contract.
26. Choose `type` or `interface` for a union of HTTP methods.
27. Choose `type` or `interface` for a tuple.
28. Choose `type` or `interface` for an ordinary component props object.
29. Choose `type` or `interface` for a conditional utility type.
30. Choose `type` or `interface` for a primitive identifier alias.
