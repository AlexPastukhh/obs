# Final semantic transcript — generic property extraction with `keyof`

Authoritative source:

```text
source/typescript generic get prop from aray of users, k extends keyof T(2).svg
```

Coverage:

```text
unique embedded screenshots: 2
image uses: 2
native SVG labels: 0
remaining unclosed: 0
```

This version replaces the prior Stage0-only state and closes both semantic
regions.

---

# R01 — generic property extraction with `K extends keyof T`

A reusable property extractor can preserve the exact value type selected by the
key:

```ts
interface HasID {
  id: number;
}

const getUsersProperty = <
  T extends HasID,
  K extends keyof T
>(
  users: readonly T[],
  key: K,
): T[K][] => users.map(user => user[key]);
```

The type parameters have different jobs:

```text
T
    the array element type

T extends HasID
    every element must contain at least the members required by HasID

K
    the selected property key

K extends keyof T
    only actual keys of T are accepted

T[K]
    indexed-access type: the value type stored at property K
```

Example:

```ts
type User = {
  id: number;
  email: string;
  active: boolean;
};

const users: User[] = [
  { id: 1, email: "a@example.com", active: true },
  { id: 2, email: "b@example.com", active: false },
];

const ids = getUsersProperty(users, "id");
// number[]

const emails = getUsersProperty(users, "email");
// string[]

const flags = getUsersProperty(users, "active");
// boolean[]
```

An invalid key is rejected:

```ts
getUsersProperty(users, "missing");
// error: "missing" is not assignable to keyof User
```

The crucial return type is `T[K][]`, not a broad union such as
`(string | number | boolean)[]`. The selected key remains correlated with its
value type.


---

# R02 — inference, IntelliSense and edge cases

When the function is called, TypeScript infers `T` from the array:

```ts
getUsersProperty(users, /* cursor here */);
```

After `T` is known, `keyof T` becomes a union of valid property names:

```ts
"id" | "email" | "active"
```

That is why IntelliSense can offer the actual keys.

The string literal passed as `key` determines `K`:

```text
key = "email"
K = "email"
T[K] = User["email"] = string
return type = string[]
```

## Optional properties

Optionality is preserved:

```ts
type User = {
  id: number;
  nickname?: string;
};

const nicknames = getUsersProperty<User, "nickname">(
  [{ id: 1 }, { id: 2, nickname: "Alex" }],
  "nickname",
);
// (string | undefined)[]
```

The function should not claim `string[]`, because some elements can lack the
property.

## No `HasID` requirement when it is unnecessary

If the extractor does not rely on `id`, the constraint can be generalized:

```ts
function getProperty<T extends object, K extends keyof T>(
  items: readonly T[],
  key: K,
): T[K][] {
  return items.map(item => item[key]);
}
```

Keep `T extends HasID` only when the surrounding domain really requires every
item to have an `id`.

## Literal widening

A variable declared as plain `string` is too broad:

```ts
let key = "email"; // string
getUsersProperty(users, key); // error
```

Preserve the literal type:

```ts
const key = "email";
// type: "email"

const key2 = "email" as const;
```

or type the variable explicitly:

```ts
const key3: keyof User = "email";
```

## Union keys

If `K` is a union, the result is a union of the corresponding value types:

```ts
const key: "id" | "email" =
  Math.random() > 0.5 ? "id" : "email";

const values = getUsersProperty(users, key);
// (number | string)[]
```

This is correct because the runtime key is not known more precisely.


---

# Type relationship

```text
array argument
    infers T
        ↓
keyof T
    produces the valid key union
        ↓
key argument
    infers K
        ↓
T[K]
    produces the exact selected property type
        ↓
result
    T[K][]
```
