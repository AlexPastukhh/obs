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
