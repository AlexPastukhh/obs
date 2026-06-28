# Final semantic transcript — utility types

Authoritative source: `source/utility types.svg`

---

# R01 — built-in TypeScript utility types

## Property modifiers

```ts
type User = {
  id: string;
  name: string;
  email: string;
};
```

`Partial<T>` makes all top-level properties optional:

```ts
type UserPatch = Partial<User>;
// {
//   id?: string;
//   name?: string;
//   email?: string;
// }
```

`Required<T>` makes all properties required:

```ts
type CompleteUser = Required<User>;
```

`Readonly<T>` makes all properties readonly:

```ts
type ImmutableUser = Readonly<User>;
```

These utilities are shallow. They do not recursively modify nested properties.

## `Pick` and `Omit`

They operate on object keys:

```ts
type PublicUser =
  Pick<User, "id" | "name">;

type UserWithoutEmail =
  Omit<User, "email">;
```

Mental model:

```text
Pick<T, K>
    keep selected keys

Omit<T, K>
    remove selected keys
```

## `Exclude`, `Extract` and `NonNullable`

They operate on union members:

```ts
type Role =
  "admin" | "user" | "guest";

type WithoutGuest =
  Exclude<Role, "guest">;
// "admin" | "user"

type Privileged =
  Extract<Role, "admin" | "guest">;
// "admin" | "guest"

type Defined =
  NonNullable<string | null | undefined>;
// string
```

Mental model:

```text
Pick/Omit
    keys of objects

Exclude/Extract
    members of unions
```

## `Record`

```ts
type Role =
  "admin" | "user";

type Flags =
  Record<Role, boolean>;
// {
//   admin: boolean;
//   user: boolean;
// }
```

`Record<K, V>` creates an object type whose keys are `K` and values are `V`.

---

# R02 — constructor types versus instance types

## `typeof` on a class

For a class:

```ts
class Box {
  static version = "1.0";

  constructor(
    public size: number,
  ) {}

  resize(next: number) {
    this.size = next;
  }
}
```

These are different:

```ts
type ConstructorSide =
  typeof Box;

type InstanceSide =
  Box;
```

The constructor side contains:

```text
new signature
static properties
static methods
```

The instance side contains:

```text
instance fields
instance methods
```

Example:

```ts
const Ctor: typeof Box = Box;
const box: Box = new Box(10);
```

`typeof Box` is not the same as `Box`.

## `InstanceType`

```ts
type BoxInstance =
  InstanceType<typeof Box>;
// Box
```

`InstanceType<C>` accepts a constructor type and returns the instance produced by that constructor.

This matters in generic factories:

```ts
type Constructor<T = object> =
  new (...args: any[]) => T;

function make<C extends Constructor>(
  Ctor: C,
  ...args: ConstructorParameters<C>
): InstanceType<C> {
  return new Ctor(...args);
}
```

The constructor value is passed at runtime; `InstanceType` recovers the corresponding instance type at compile time.

## `ConstructorParameters`

```ts
class Service {
  constructor(
    public baseUrl: string,
    public timeout: number,
  ) {}
}

type ServiceArgs =
  ConstructorParameters<typeof Service>;
// [string, number]
```

Useful for factories, registries and dependency-injection containers.

---

# R03 — function and async utility types

## `Parameters`

```ts
function send(
  id: string,
  retry: number,
): boolean {
  return true;
}

type SendArgs =
  Parameters<typeof send>;
// [string, number]
```

## `ReturnType`

```ts
type SendResult =
  ReturnType<typeof send>;
// boolean
```

For async functions, `ReturnType` is the promise type:

```ts
async function loadUser() {
  return {
    id: "1",
    name: "Ada",
  };
}

type LoadUserPromise =
  ReturnType<typeof loadUser>;
// Promise<{ id: string; name: string }>
```

## `Awaited`

`Awaited<T>` unwraps promises and nested promise-like values:

```ts
type User =
  Awaited<ReturnType<typeof loadUser>>;
// { id: string; name: string }

type NumberResult =
  Awaited<Promise<Promise<number>>>;
// number
```

It is useful for APIs that accept either immediate or promised values:

```ts
type MaybePromise<T> =
  T | Promise<T>;

async function toArray<T>(
  value: MaybePromise<T>,
): Promise<Awaited<T>[]> {
  const resolved = await value;
  return [resolved];
}
```

---

# R04 — `ValueOf` and recursive `DeepPartial`

## `ValueOf`

A common homemade utility:

```ts
type ValueOf<T> =
  T[keyof T];
```

Example:

```ts
const REQUEST_STATUS = {
  idle: "IDLE",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
} as const;

type RequestStatus =
  ValueOf<typeof REQUEST_STATUS>;
// "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
```

`keyof T` produces a union of keys, and indexing with that union produces a union of property values.

It is useful for:

```text
route names
feature flags
event names
permission codes
analytics identifiers
enum-like objects shared with runtime code
```

## Simple `DeepPartial`

```ts
type DeepPartial<T> = {
  [K in keyof T]?:
    T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};
```

This makes properties optional recursively, but `object` also includes arrays, functions and several built-in classes. A production utility should handle those categories intentionally.

## Safer recursive version

```ts
type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

type DeepPartial<T> =
  T extends Primitive
    ? T
    : T extends Date
      ? T
      : T extends (...args: any[]) => any
        ? T
        : T extends Map<infer K, infer V>
          ? Map<
              DeepPartial<K>,
              DeepPartial<V>
            >
          : T extends Set<infer U>
            ? Set<DeepPartial<U>>
            : T extends ReadonlyArray<infer U>
              ? ReadonlyArray<DeepPartial<U>>
              : T extends Array<infer U>
                ? Array<DeepPartial<U>>
                : T extends object
                  ? {
                      [K in keyof T]?:
                        DeepPartial<T[K]>
                    }
                  : T;
```

Design decisions must be explicit:

```text
Should Date stay Date?
Should functions remain callable?
Should tuples preserve tuple positions?
Should readonly arrays remain readonly?
Should Map keys become partial?
```

There is no universally correct `DeepPartial`; the utility should match the application contract.

---

# R05 — `Prettify`, `Without` and XOR

## `Prettify`

Intersection and mapped types can appear awkward in editor tooltips:

```ts
type Combined =
  { id: string } &
  { name: string };
```

A display helper:

```ts
type Prettify<T> =
  T extends object
    ? {
        [K in keyof T]:
          T[K]
      } & {}
    : T;
```

It does not change runtime behavior. It encourages TypeScript to materialize a friendlier displayed object shape.

## `Without`

```ts
type Without<T, U> = {
  [P in Exclude<
    keyof T,
    keyof U
  >]?: never;
};
```

Keys present only in `T` are made optional but impossible to provide in the opposite branch.

## XOR

```ts
type XOR<T, U> =
  T | U extends object
    ? (
        Without<T, U> & U
      ) | (
        Without<U, T> & T
      )
    : T | U;
```

Example:

```ts
type ById = {
  id: string;
};

type ByEmail = {
  email: string;
};

type Lookup =
  XOR<ById, ByEmail>;

const a: Lookup = {
  id: "123",
};

const b: Lookup = {
  email: "a@b.com",
};

// error: both are not allowed
const invalid: Lookup = {
  id: "123",
  email: "a@b.com",
};
```

A plain union:

```ts
type Lookup =
  ById | ByEmail;
```

can sometimes permit an object containing both sets of properties through structural typing and excess-property edge cases. XOR explicitly forbids the other branch's unique keys with `never`.

## Literal inference

`as const` preserves literal values:

```ts
const STATUS = {
  idle: "IDLE",
  loading: "LOADING",
} as const;
```

Without `as const`, values often widen to `string`; with it, `ValueOf<typeof STATUS>` becomes a useful literal union.

# Decision guide

```text
Modify object properties
    Partial / Required / Readonly / Pick / Omit

Filter union members
    Exclude / Extract / NonNullable

Inspect function signatures
    Parameters / ReturnType

Inspect constructors
    ConstructorParameters / InstanceType

Unwrap promises
    Awaited

Get object value union
    ValueOf

Recursive optional config
    application-specific DeepPartial

Improve tooltip display
    Prettify

Exactly one object branch
    XOR + Without
```

# Coverage

```text
unique embedded screenshots: 66
image uses: 66
native SVG labels: 37
duplicate extra placements: 0

processed image uses: 66
processed text labels: 37
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
