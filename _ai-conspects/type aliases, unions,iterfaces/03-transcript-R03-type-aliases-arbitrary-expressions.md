# R03 — Type aliases can name arbitrary type expressions

Source coverage: `S-003`  
Transcript mode: near-literal normalized text.

## Source transcript

### What the code is showing

`type` aliases can name any type expression:

```ts
type StringOrNumber = string | number;
type StringOrNumberArray = (string | number)[];
type UserId = StringOrNumber;
```

Those are not object shapes. They are:

- a union: `string | number`;
- an array of a union;
- an alias of an alias.

An `interface` cannot represent those directly.

## Meaning

A type alias assigns a reusable name to the expression on the right-hand side.

### Union

```ts
type StringOrNumber = string | number;
```

The value may be a string or a number.

### Array whose elements are a union

```ts
type StringOrNumberArray = (string | number)[];
```

Each item in the array may independently be a string or a number.

The parentheses matter:

```ts
type A = (string | number)[];
type B = string | number[];
```

`A` means an array containing strings and/or numbers.

`B` means either:

- one string; or
- an array of numbers.

### Alias of another alias

```ts
type UserId = StringOrNumber;
```

This creates another name for the same structural type. It does not create a distinct nominal type.

## Questions for repetition

1. What type expression does `StringOrNumber` name?
2. What may each element of `StringOrNumberArray` contain?
3. Why are parentheses required in `(string | number)[]`?
4. How does `string | number[]` differ from `(string | number)[]`?
5. Does `type UserId = StringOrNumber` create a nominally distinct type?
6. Why can an interface not directly represent these three aliases?
