# R01 — Interface describes an object shape

Source coverage: `S-001`  
Transcript mode: near-literal normalized text.

## Source transcript

You **can** do this with an interface when the value is an object shape:

```ts
interface Guitarist {
  name?: string;
  active: boolean;
  albums: (string | number)[];
}
```

But the union alias itself must be a `type`.

## Meaning

`interface Guitarist` describes the members of an object:

- `name` is an optional string;
- `active` is a boolean;
- `albums` is an array;
- each array element may be either a string or a number.

An interface property is allowed to use a union type. The restriction is not “interfaces cannot contain unions.” The restriction is that an interface declaration itself cannot directly be a union expression.

## Key distinction

Valid:

```ts
interface Guitarist {
  albums: (string | number)[];
}
```

The interface is still an object shape. Only one of its properties uses a union.

Use a type alias when the value being named is the union itself:

```ts
type StringOrNumber = string | number;
```

## Questions for repetition

1. What does `interface Guitarist` describe?
2. Why is `(string | number)[]` valid as an interface property type?
3. Does the presence of a union inside one property turn the interface itself into a union?
4. How should the union `string | number` be named?
5. What is the type of `albums` in the example?
