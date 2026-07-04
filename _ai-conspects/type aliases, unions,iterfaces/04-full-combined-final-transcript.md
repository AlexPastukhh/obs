# Full combined final transcript — type aliases, unions, interfaces

Source: `type aliases, unions,iterfaces.svg`  
Coverage: 3 / 3 screenshots  
Transcript level: near-literal normalized text. Exact typography remains authoritative in the preserved screenshots.

## 1. Interface describes an object shape

You **can** do this with an interface when the value is an object shape:

```ts
interface Guitarist {
  name?: string;
  active: boolean;
  albums: (string | number)[];
}
```

But the union alias itself must be a `type`.

The interface describes an object with named members. A member may use a union type. Therefore, the correct rule is:

> An interface may contain properties whose types are unions, but the interface declaration itself cannot directly be a union expression.

## 2. Why arbitrary type aliases cannot always be interfaces

An `interface` only describes the shape of an object, including callable and construct signatures.

It cannot itself be:

- a union such as `string | number`;
- a primitive alias such as `type Id = string`;
- a tuple, conditional type, mapped type, or other arbitrary type expression in the same direct way.

These declarations are invalid:

```ts
interface StringOrNumber = string | number; // not allowed
interface UserId = string;                  // not allowed
```

An interface uses a member body; it is not a general alias operator.

## 3. Type aliases can name arbitrary type expressions

```ts
type StringOrNumber = string | number;
type StringOrNumberArray = (string | number)[];
type UserId = StringOrNumber;
```

These declarations name:

1. a union;
2. an array whose element type is a union;
3. another alias.

They are not object shapes, so an interface cannot represent them directly.

## 4. Both constructs can describe object shapes

A type alias can also describe an object:

```ts
type Guitarist = {
  name?: string;
  active: boolean;
  albums: (string | number)[];
};
```

Therefore:

- `interface` is specialized around object-shaped contracts and declaration merging;
- `type` is a general alias for any type expression;
- both can describe many ordinary object shapes;
- only `type` directly names unions, primitive aliases, tuples, conditional types, mapped types, and similar expressions.

## 5. Parentheses in array and union types

```ts
type MixedArray = (string | number)[];
```

means an array whose elements may be strings or numbers.

```ts
type StringOrNumberArray = string | number[];
```

means either one string or an array of numbers.

The parentheses change which expression the `[]` applies to.

## 6. Alias of an alias

```ts
type StringOrNumber = string | number;
type UserId = StringOrNumber;
```

`UserId` is another name for the same structural type. It does not create a new nominal type that is incompatible with `StringOrNumber`.

## 7. Practical decision guide

Use `interface` when:

- the primary concept is an object-shaped public contract;
- consumers may extend the contract;
- declaration merging is useful;
- you want the conventional interface syntax for properties and methods.

Use `type` when:

- naming a union;
- naming a primitive;
- naming a tuple;
- composing intersections;
- using conditional or mapped types;
- naming a function type;
- assigning a name to any other type expression.

For an ordinary object shape, either may be reasonable.

## 8. Common misconception

Incorrect:

> Interfaces cannot contain unions.

Correct:

> Interface properties may use union types. An interface declaration cannot itself be defined as a union expression.

## 9. Questions for repetition

### Direct recall

1. What does an interface primarily describe?
2. Can an interface property have type `string | number`?
3. Can an interface declaration itself equal `string | number`?
4. Which construct can name an arbitrary type expression?
5. Can a type alias describe an object shape?
6. Can an interface directly alias a primitive?
7. What does `type UserId = StringOrNumber` do?

### Comparison

8. What capability does `type` have that `interface` does not?
9. When might interface declaration merging matter?
10. Why does `interface Guitarist` remain an object shape even though `albums` uses a union?
11. Compare `(string | number)[]` with `string | number[]`.
12. When would either `type` or `interface` be acceptable?

### Code prompts

13. Correct this declaration:

```ts
interface Result = Success | Failure;
```

14. Create an interface with an `id` property that uses a primitive alias.

15. Define a tuple of two numbers.

16. Define a union representing `"idle" | "loading" | "success"`.

17. Define an array whose elements may be strings or numbers.

18. Define a type that means either a string or an array of numbers.

### Explanation prompts

19. Explain why `interface UserId = string` is invalid.
20. Explain why “interfaces cannot contain unions” is misleading.
21. Explain whether `UserId` becomes a nominal type in the example.
22. Explain why parentheses matter around a union before `[]`.
