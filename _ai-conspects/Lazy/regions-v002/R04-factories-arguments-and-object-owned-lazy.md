# Factories, arguments, and object-owned Lazy fields

Generated: 2026-07-01

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible C# is preserved.
- Thread-safety and exception semantics are kept source-specific.
- Every source includes recall questions.

## S-022 — Constructor-based Lazy<T> example

**Known limits:** none

### Near-literal normalized transcript

Constructor-based lazy creation is mainly useful when `T` has a public parameterless constructor and does not need dependency-injection arguments.

### Simple in-memory object

```csharp
public class ExpensiveLookup
{
    public Dictionary<int, string> Data { get; }

    public ExpensiveLookup()
    {
        Console.WriteLine("Building lookup...");
        Data = Enumerable.Range(1, 100000)
            .ToDictionary(x => x, x => $"Item-{x}");
    }
}

var lazyLookup = new Lazy<ExpensiveLookup>();
```

### Study meaning

The default Lazy constructor delays a normal parameterless constructor. It works well for self-contained objects but cannot directly pass constructor arguments.

### Recall questions

1. What constructor must ExpensiveLookup expose?
2. What data structure is built?
3. How many entries are generated?
4. When does the constructor run?


---

## S-025 — How default Lazy<T> creates the value

**Known limits:** none

### Near-literal normalized transcript

## How the value is created

### Without a factory

```csharp
var lazy = new Lazy<MyType>();
```

- uses `new MyType()`;
- `MyType` must have a public parameterless constructor;
- dependencies or arguments cannot be passed directly.

### Study meaning

The constructor-based form delegates creation to reflection/runtime construction of `T`.

### Recall questions

1. What expression creates the value?
2. What constructor is required?
3. Why can this form not directly receive dependencies?


---

## S-026 — How a value factory creates the value

**Known limits:** none

### Near-literal normalized transcript

### With a factory

```csharp
var lazy = new Lazy<MyType>(
    () => new MyType(dep1, dep2));
```

The factory uses custom `Func<T>` logic.

It can:

- pass constructor arguments;
- resolve dependencies;
- run setup code;
- choose implementations dynamically.

This is the main reason ASP.NET Core code normally uses a factory.

### Study meaning

A lambda closes over dependencies and defines exactly how the one cached value should be created.

### Recall questions

1. What delegate shape does Lazy<T> use?
2. Name four capabilities of the factory form.
3. Why is it common in dependency-injected applications?


---

## S-028 — Lazy<T> and arguments

**Known limits:** none

### Near-literal normalized transcript

## `Lazy<T>` with arguments

`Lazy<T>` does not accept arguments at `.Value` time.

Why:

- it is designed to compute one value once;
- `.Value` has no parameters;
- its factory is `Func<T>`, not `Func<TArg, T>`.

Common argument patterns:

- capture a fixed argument in a closure;
- return a separate `Lazy<T>` per argument;
- use a keyed cache such as `ConcurrentDictionary<TKey, Lazy<TValue>>`.

### Study meaning

Arguments must be bound when constructing a Lazy instance or represented by selecting a separate Lazy instance.

### Recall questions

1. Why can Value not accept an argument?
2. What delegate type is the factory?
3. Name the three argument patterns.


---

## S-029 — Pattern A: capture a fixed argument

**Known limits:** none

### Near-literal normalized transcript

## Pattern A: capture an argument in a closure

When the argument is known while creating the Lazy instance:

```csharp
string path = "config.json";

var lazyText =
    new Lazy<string>(
        () => File.ReadAllText(path));
```

`path` is captured by the lambda.

This works when the argument is fixed for that Lazy instance.

### Study meaning

The closure permanently associates this Lazy value with one path. Changing caller arguments later does not turn the same Lazy into a per-argument cache.

### Recall questions

1. What path is captured?
2. When is the file read?
3. How many path values can one Lazy instance represent?
4. What object stores the captured variable?


---

## S-030 — Pattern B: a method returning Lazy<T>

**Known limits:** none

### Near-literal normalized transcript

## Pattern B: return a `Lazy<T>` per argument

When different lazy values are needed for different arguments:

```csharp
Lazy<string> CreateLazyFile(string path)
{
    return new Lazy<string>(
        () => File.ReadAllText(path));
}
```

Each `Lazy<string>` is tied to one `path`.

### Study meaning

The method creates independent Lazy objects. Sharing or caching those Lazy objects is the caller's responsibility.

### Recall questions

1. What does the method return?
2. How is path bound to the result?
3. Are two calls with the same path automatically shared?
4. Who owns the returned Lazy instance?


---

## S-032 — Object-owned lazy field example

**Known limits:** none

### Near-literal normalized transcript

## Object field example

A class instance has a file path and loads content lazily:

```csharp
public sealed class TemplateFile
{
    private readonly Lazy<string> _content;

    public TemplateFile(string path)
    {
        _content = new Lazy<string>(
            () => File.ReadAllText(path));
    }

    public string Content => _content.Value;
}
```

Each `TemplateFile` has its own lazy state. This is Pattern B/object design.

### Study meaning

The constructor binds one path to one object's private Lazy field. There is no shared application-wide cache unless callers store and reuse the TemplateFile itself.

### Recall questions

1. What field stores the lazy state?
2. When is the file read?
3. Does another TemplateFile instance share the cached value?
4. What public member triggers initialization?


---

## S-035 — Pattern B characteristics

**Known limits:** none

### Near-literal normalized transcript

## Pattern B

- creates a lazy value on demand;
- ties it to one argument;
- the caller owns the Lazy instance;
- no sharing or caching occurs unless the caller stores it.

### Study meaning

Pattern B creates a Lazy object but does not itself define a shared cache.

### Recall questions

1. Who owns the Lazy instance?
2. How many arguments is it tied to?
3. What is required for reuse across calls?


---

## S-038 — Pattern B is object design

**Known limits:** none

### Near-literal normalized transcript

## Pattern B is about object design

> This object has a lazily created field.

### Study meaning

The lazy lifetime follows one object instance rather than a shared keyed cache.

### Recall questions

1. What owns the lazy field?
2. What determines its lifetime?
3. How does this differ from Pattern C?
