# Final semantic transcript — TypeScript assertions, `keyof`, index signatures and `Record`

Authoritative source: `source/index sign, keyof, type assertions, records to solve index sign issues.svg`  
Coverage: **26 unique screenshots / 26 placements + 4 native SVG labels**

---

# R01 — type assertions and DOM narrowing

A type assertion tells TypeScript how to treat a value at compile time:

```ts
const value =
  expression as SomeType;
```

It does not:

```text
convert the runtime value
validate the value
add missing properties
prevent null or undefined
```

Example:

```ts
const value: unknown = "hello";
const length =
  (value as string).length;
```

The assertion is safe only because the runtime value is actually a string.

## Double assertion

```ts
const value =
  expression as unknown as TargetType;
```

This bypasses compatibility checks by first erasing information to `unknown`. It should be treated as an explicit escape hatch, not normal modeling.

A wrong assertion can compile and still fail at runtime.

## DOM example

DOM APIs return broad or nullable types:

```ts
const element =
  document.querySelector("img");
// Element | null
```

Best approach: narrow at runtime:

```ts
const element =
  document.querySelector("img");

if (element instanceof HTMLImageElement) {
  element.src = "/photo.png";
}
```

An assertion is shorter but trusts the selector and nullability:

```ts
const image =
  document.querySelector("img")
  as HTMLImageElement | null;

if (image) {
  image.src = "/photo.png";
}
```

Use assertions only where an external invariant is genuinely known.

---

# R02 — `keyof` and known-key access

Given:

```ts
interface Transactions {
  Pizza: number;
  Books: number;
  Job: number;
}
```

This is safe:

```ts
const key: keyof Transactions =
  "Pizza";

transactions[key];
```

`keyof Transactions` is the union:

```text
"Pizza" | "Books" | "Job"
```

A plain `string` is wider and could contain any value:

```ts
const key: string = "whatever";
transactions[key];
// error without a string index signature
```

TypeScript refuses because the object promises only specific properties.

## Generic helper

```ts
function getValue<
  T,
  K extends keyof T,
>(
  object: T,
  key: K,
): T[K] {
  return object[key];
}
```

The key must belong to the object, and the return type depends on the selected property.

## Functions whose return type depends on an input literal

Avoid forcing an inaccurate result with:

```ts
result as string
```

Prefer a generic mapping or overloads.

Example with overloads:

```ts
function addOrConcat(
  a: number,
  b: number,
  mode: "add",
): number;

function addOrConcat(
  a: number,
  b: number,
  mode: "concat",
): string;

function addOrConcat(
  a: number,
  b: number,
  mode: "add" | "concat",
): number | string {
  return mode === "add"
    ? a + b
    : `${a}${b}`;
}
```

The call-site result now reflects the literal mode without a manual assertion.

---

# R03 — index signatures, missing keys and iteration

## String index signature

```ts
type Dictionary = {
  [key: string]:
    number | undefined;
};
```

This means any string key is allowed. Because JavaScript returns `undefined` for a missing property, including `undefined` accurately models unknown-key lookup.

```ts
const dictionary: Dictionary = {
  salary: 100,
};

const value =
  dictionary["missing"];
// number | undefined
```

If the type were:

```ts
{
  [key: string]: number;
}
```

TypeScript would claim every string key returns a number even though a missing runtime property can still be `undefined`.

Compiler option `noUncheckedIndexedAccess` adds `undefined` to unchecked indexed reads and helps expose this risk.

## Known properties must satisfy the signature

```ts
interface Values {
  [key: string]: number;

  salary: number;
  label: string;
  // error: string does not satisfy number
}
```

Every explicitly declared string-keyed property must be compatible with the string index signature.

Widen the value type only if the dictionary genuinely allows several value kinds:

```ts
interface Values {
  [key: string]:
    number | string;
}
```

## `Record` for a finite key set

```ts
type Stream =
  "salary"
  | "bonus"
  | "sideshustle";

type Income =
  Record<Stream, number>;
```

Now:

```ts
income.salary;
// allowed

income.random;
// error
```

Use `Record<Union, T>` or a mapped type when keys are known in advance.

Use an index signature when arbitrary dictionary keys are valid.

## `for...in` and `Object.keys`

`for...in` produces string keys:

```ts
for (const key in income) {
  income[key];
  // key is string, often too wide
}
```

A constrained key can be introduced carefully:

```ts
for (
  const key of Object.keys(income)
  as Array<keyof typeof income>
) {
  console.log(income[key]);
}
```

The cast is justified only when the object is not expected to contain extra enumerable keys outside its declared type.

Generic helper:

```ts
function typedKeys<T extends object>(
  object: T,
): Array<keyof T> {
  return Object.keys(object)
    as Array<keyof T>;
}
```

Remember that structural TypeScript types do not guarantee exact runtime object keys.

---

# R04 — finite literals are not index-signature parameter types

An index signature models a broad key domain:

```ts
interface Values {
  [key: string]: number;
}
```

Its parameter type is not the place for a finite literal union:

```ts
interface Invalid {
  [key: "salary" | "bonus"]: number;
  // not a valid finite-key model
}
```

Use a mapped type:

```ts
type Stream =
  "salary" | "bonus";

type Values = {
  [K in Stream]: number;
};
```

or `Record`:

```ts
type Values =
  Record<Stream, number>;
```

Differences:

```text
Record<"salary" | "bonus", number>
    only those declared keys
    good for a known closed key set

{ [key: string]: number | undefined }
    arbitrary string keys
    missing keys are possible
    good for dictionary-like data
```

## Accessing possibly missing keys

A broad dictionary requires a check:

```ts
const value =
  dictionary[randomKey];

if (value !== undefined) {
  console.log(value.toFixed(2));
}
```

Adding `undefined` does not prevent missing keys. It makes the type system describe that runtime possibility.

## Choosing the model

```text
known fields
    interface or object type

known finite set of keys
    Record<Union, Value>
    mapped type

arbitrary keys
    index signature

dynamic safe access to a known object
    K extends keyof T

untrusted or broad runtime value
    unknown + runtime narrowing

last-resort compile-time override
    type assertion
```

---

# Coverage

```text
unique embedded screenshots: 26
image uses: 26
native SVG labels: 4
duplicate extra placements: 0

processed image uses: 26
processed text labels: 4
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
