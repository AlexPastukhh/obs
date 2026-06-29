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
