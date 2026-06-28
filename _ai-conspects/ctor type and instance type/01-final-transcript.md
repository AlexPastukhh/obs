# Final semantic transcript — constructor type and instance type

Authoritative source: `source/ctor type and instance type.svg`

---

# R01 — constructor side versus instance side

```ts
class UserService {
  static version = "1.0";

  constructor(
    public baseUrl: string,
  ) {}

  getUser(id: string) {
    return `${this.baseUrl}/users/${id}`;
  }
}
```

Instance type:

```ts
type UserServiceInstance =
  UserService;

const service:
  UserService =
    new UserService("/api");
```

The instance type contains:

```text
instance fields
instance methods
the object shape after new
```

It does not contain static members.

Constructor type:

```ts
type UserServiceConstructor =
  typeof UserService;

const Ctor:
  typeof UserService =
    UserService;
```

The constructor side contains:

```text
new signature
static fields
static methods
the runtime class value
```

Key distinction:

```text
UserService
    instance type

typeof UserService
    constructor/static type
```

---

# R02 — generic factories

## TypeScript factory

```ts
type Constructor<
  T,
  Args extends unknown[],
> = new (...args: Args) => T;

function make<
  T,
  Args extends unknown[],
>(
  Ctor: Constructor<T, Args>,
  ...args: Args
): T {
  return new Ctor(...args);
}

const service =
  make(
    UserService,
    "/api",
  );
```

A constructor is passed as a runtime value, while generics preserve the resulting instance and argument types.

Using built-in helpers:

```ts
function make<C extends
  new (...args: any[]) => any>(
  Ctor: C,
  ...args:
    ConstructorParameters<C>
): InstanceType<C> {
  return new Ctor(...args);
}
```

Here `C` is the constructor type. The created object is `InstanceType<C>`, not `C`.

## C# parameterless construction

```csharp
public static T Make<T>()
    where T : new()
{
    return new T();
}
```

The generic type parameter represents the instance type. The constructor capability is expressed through `where T : new()`.

## C# constructor arguments

C# generic constraints cannot express arbitrary constructor parameter lists directly.

Common choices:

```text
factory delegate
    most type-safe

dependency-injection container
    resolves registered services

reflection / Activator.CreateInstance
    dynamic, less compile-time safe
```

Factory delegate:

```csharp
public static T Make<T>(
    Func<string, T> factory,
    string argument)
{
    return factory(argument);
}

var service = Make(
    baseUrl =>
        new UserService(baseUrl),
    "/api"
);
```

Reflection:

```csharp
public static T Make<T>(
    params object?[] args)
{
    return (T)Activator.CreateInstance(
        typeof(T),
        args
    )!;
}
```

Reflection moves constructor checking to runtime.

---

# R03 — utility types and mental model

## `ConstructorParameters`

```ts
type Args =
  ConstructorParameters<
    typeof UserService
  >;
// [baseUrl: string]
```

## `InstanceType`

```ts
type Service =
  InstanceType<
    typeof UserService
  >;
// UserService
```

Use `InstanceType<C>` when a generic parameter is a constructor type and the code needs the object produced by `new C(...)`.

You do not need `InstanceType` when the generic is already the instance type:

```ts
function make<T>(
  Ctor:
    new (...args: any[]) => T,
  ...args: any[]
): T {
  return new Ctor(...args);
}
```

## Cross-language summary

```text
TypeScript
    class name in type position
        instance type

    typeof ClassName
        constructor/static type

    InstanceType<C>
        object produced by constructor C

    ConstructorParameters<C>
        constructor argument tuple

C#
    generic T usually denotes instance type

    where T : new()
        permits parameterless new T()

    arbitrary constructor arguments
        usually factory delegate, DI or reflection
```

## Checklist

```text
[ ] distinguish runtime class value from instance type
[ ] use typeof Class for constructor/static typing in TypeScript
[ ] return InstanceType<C> when C itself is a constructor type
[ ] use ConstructorParameters<C> to preserve argument tuples
[ ] use C# factory delegates for typed parameterized construction
[ ] reserve reflection for genuinely dynamic scenarios
```

# Coverage

```text
unique embedded screenshots: 15
image uses: 15
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 15
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
