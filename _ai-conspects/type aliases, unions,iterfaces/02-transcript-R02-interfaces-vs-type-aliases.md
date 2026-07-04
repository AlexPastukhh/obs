# R02 — Why arbitrary type aliases cannot always be interfaces

Source coverage: `S-002`  
Transcript mode: near-literal normalized text.

## Source transcript

### Why you “can’t do type aliases with interfaces”

An `interface` only describes the shape of an object, including callable and construct signatures.

It cannot itself be:

- a union: `string | number`;
- a primitive alias: `type Id = string`;
- a tuple, union, conditional type, or mapped-type composition in the same direct way.

So these declarations are invalid:

```ts
interface StringOrNumber = string | number; // not allowed
interface UserId = string;                  // not allowed
```

## Meaning

An interface declaration has a member body. It describes properties, methods, index signatures, call signatures, or construct signatures.

It is not a general alias syntax for any arbitrary type expression.

The following concepts need a type alias rather than an interface:

```ts
type StringOrNumber = string | number;
type UserId = string;
type Coordinates = [number, number];
```

## Important nuance

Interfaces can still reference these types:

```ts
type UserId = string;

interface User {
  id: UserId;
}
```

The object shape is represented by `interface User`; the primitive alias is represented by `type UserId`.

## Questions for repetition

1. What category of structure is an interface primarily designed to describe?
2. Can an interface directly equal `string | number`?
3. Can an interface directly alias the primitive `string`?
4. Why is `interface UserId = string` syntactically invalid?
5. Name three type expressions that naturally require a type alias.
6. Can an interface property reference a type alias?
