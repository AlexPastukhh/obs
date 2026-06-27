# Final semantic transcript — .NET Reflection

Authoritative source: `source/REFLECTION.svg`  
Coverage: **95 unique screenshots / 95 placements + 89 native SVG labels**

---

# R01 — `Type`, `Assembly`, `BindingFlags`, fields, properties and attributes

## Reflection model

Reflection inspects metadata about types and members at runtime.

Start with a `Type`:

```csharp
Type fromCompileTime = typeof(MyClass);
Type fromInstance = instance.GetType();
```

`typeof(T)` is based on a known type expression. `obj.GetType()` returns the actual runtime type of a non-null object.

An assembly contains types:

```csharp
Assembly assembly = typeof(MyClass).Assembly;
Type[] types = assembly.GetTypes();
```

Assemblies can also be loaded through explicit assembly APIs when plugin or discovery scenarios require it.

## `Type` as the central metadata object

Useful `Type` members include:

```text
Name
FullName
Namespace
Assembly
AssemblyQualifiedName
BaseType
IsClass
IsValueType
IsInterface
IsEnum
IsAbstract
IsSealed
IsGenericType
IsGenericTypeDefinition
IsNested
```

Enumerate member categories:

```csharp
type.GetMembers();
type.GetFields();
type.GetProperties();
type.GetMethods();
type.GetConstructors();
type.GetEvents();
type.GetInterfaces();
type.GetNestedTypes();
```

The singular APIs such as `GetMethod`, `GetProperty` and `GetField` require enough information to select one result. Overloads and hidden members can make name-only lookup ambiguous.

## `MemberInfo`

`MemberInfo` is the common base for reflected members.

```csharp
MemberInfo[] members = type.GetMembers();

foreach (MemberInfo member in members)
{
    Console.WriteLine(
        $"{member.MemberType}: {member.Name}");
}
```

Shared metadata includes:

```text
Name
MemberType
DeclaringType
ReflectedType
GetCustomAttributes(...)
IsDefined(...)
```

Specialized types include:

```text
FieldInfo
PropertyInfo
MethodInfo
ConstructorInfo
EventInfo
Type, for nested types
```

## `BindingFlags`

Default reflection lookups usually expose public members and include inherited members according to the selected API.

To control the search, combine flags:

```csharp
BindingFlags flags =
    BindingFlags.Public |
    BindingFlags.NonPublic |
    BindingFlags.Instance |
    BindingFlags.Static;
```

Common flags:

```text
Public
NonPublic
Instance
Static
DeclaredOnly
FlattenHierarchy
IgnoreCase
```

Example:

```csharp
FieldInfo[] fields = type.GetFields(
    BindingFlags.Instance |
    BindingFlags.Public |
    BindingFlags.NonPublic);
```

A common reason private members appear to be missing is forgetting `NonPublic` or forgetting to include `Instance`/`Static`.

### `DeclaredOnly`

`DeclaredOnly` restricts results to members declared on the inspected type rather than inherited members.

```csharp
type.GetMethods(
    BindingFlags.Public |
    BindingFlags.Instance |
    BindingFlags.DeclaredOnly);
```

### `FlattenHierarchy`

`FlattenHierarchy` affects inherited public/protected static members. It does not simply mean “include every private member from every base class.”

## Fields

```csharp
FieldInfo[] fields = type.GetFields(flags);
FieldInfo? field = type.GetField("_name", flags);
```

Useful metadata:

```text
Name
FieldType
IsPublic
IsPrivate
IsStatic
IsInitOnly      // readonly
IsLiteral       // const
DeclaringType
```

Read and write values:

```csharp
object? value = field.GetValue(target);
field.SetValue(target, newValue);
```

Static fields use a null target:

```csharp
field.GetValue(null);
```

Respect readonly, literal and runtime-access constraints. Reflection can bypass ordinary encapsulation expectations and should be used deliberately.

## Properties

```csharp
PropertyInfo[] properties =
    type.GetProperties(flags);

PropertyInfo? property =
    type.GetProperty("Name", flags);
```

Useful metadata:

```text
Name
PropertyType
CanRead
CanWrite
GetMethod
SetMethod
DeclaringType
ReflectedType
GetIndexParameters()
```

Read and write:

```csharp
object? value =
    property.GetValue(target);

property.SetValue(target, newValue);
```

A property is implemented through accessor methods. A read-only property has a getter and no setter.

```csharp
MethodInfo? getter = property.GetMethod;
MethodInfo? setter = property.SetMethod;
```

Non-public accessors may require an overload that requests non-public methods, depending on the API used.

### Indexers

An indexer is a property with parameters.

```csharp
ParameterInfo[] indexParameters =
    property.GetIndexParameters();

bool isIndexer =
    indexParameters.Length > 0;
```

Example:

```csharp
public string this[int index]
{
    get => items[index];
    set => items[index] = value;
}
```

The index parameter values are supplied separately when reading or writing through reflection.

## Custom attributes

Attributes can be attached to:

```text
types
methods
properties
fields
parameters
assemblies
modules
```

Common APIs:

```csharp
member.GetCustomAttributes();
member.GetCustomAttributes<T>();
member.GetCustomAttribute<T>();
member.IsDefined(typeof(MyAttribute));
```

Example:

```csharp
MyAttribute? attribute =
    property.GetCustomAttribute<MyAttribute>();
```

Missing attributes normally produce `null` from generic single-attribute helpers. Code that immediately dereferences `.Name` without null handling is unsafe.

When multiple attributes are allowed or possible, use:

```csharp
IEnumerable<MyAttribute> attributes =
    property.GetCustomAttributes<MyAttribute>();
```

A single-result API can throw an ambiguity exception when multiple matching attributes exist.

`IsDefined` is a cheap existence question when the attribute instance is not needed:

```csharp
bool obsolete = type.IsDefined(
    typeof(ObsoleteAttribute),
    inherit: true);
```

## Attribute inheritance

The meaning of `inherit` depends on the reflected target and API.

A practical mental model:

```text
inherit: false
    inspect only the current member/type

inherit: true
    allow supported inheritance-chain lookup
```

Attribute inheritance is not uniform across all member kinds. Methods and types commonly support inheritance-chain lookup. Properties and events have special behavior because metadata inheritance is represented through accessor methods and related APIs. Verify the exact API when inheritance semantics matter.

---

# R02 — methods, constructors, parameters, events, interfaces and nested types

## Methods

```csharp
MethodInfo[] methods =
    type.GetMethods(flags);

MethodInfo? method =
    type.GetMethod(
        "Combine",
        flags,
        binder: null,
        types: new[]
        {
            typeof(int),
            typeof(DateTime),
        },
        modifiers: null);
```

Specifying parameter types disambiguates overloads.

Useful `MethodInfo` metadata:

```text
Name
ReturnType
IsPublic
IsPrivate
IsStatic
IsAbstract
IsVirtual
IsGenericMethod
IsGenericMethodDefinition
GetParameters()
GetGenericArguments()
DeclaringType
```

Invoke:

```csharp
object? result = method.Invoke(
    targetInstance,
    new object?[]
    {
        123,
        DateTime.UtcNow,
    });
```

Use a null target for static methods.

Reflection wraps exceptions from the invoked method in reflection-specific invocation exceptions, so inspect the inner exception when diagnosing failures.

## Constructors and `Activator`

Constructors are represented by `ConstructorInfo`.

```csharp
ConstructorInfo[] constructors =
    type.GetConstructors(flags);

ConstructorInfo? constructor =
    type.GetConstructor(new[]
    {
        typeof(string),
    });
```

Invoke directly:

```csharp
object instance = constructor.Invoke(
    new object?[]
    {
        "hello",
    });
```

Or use `Activator`:

```csharp
object? instance =
    Activator.CreateInstance(type);

object? withArguments =
    Activator.CreateInstance(
        type,
        new object?[]
        {
            "hello",
        });
```

`Activator.CreateInstance` is concise for ordinary construction. `ConstructorInfo` gives explicit control over which constructor is selected and exposes its metadata.

## `ParameterInfo`

Method and constructor parameters are represented by `ParameterInfo`.

```csharp
ParameterInfo[] parameters =
    method.GetParameters();
```

Useful metadata:

```text
Name
Position
ParameterType
HasDefaultValue
DefaultValue
IsOptional
IsIn
IsOut
Attributes
GetRequiredCustomModifiers()
GetOptionalCustomModifiers()
```

`ParameterType` may itself be by-ref:

```csharp
bool byRef =
    parameter.ParameterType.IsByRef;
```

## Events

```csharp
EventInfo[] events =
    type.GetEvents(flags);

EventInfo? eventInfo =
    type.GetEvent("Changed", flags);
```

Useful metadata:

```text
Name
EventHandlerType
AddMethod
RemoveMethod
RaiseMethod
DeclaringType
ReflectedType
```

Reflection can add or remove handlers:

```csharp
eventInfo.AddEventHandler(
    target,
    handler);

eventInfo.RemoveEventHandler(
    target,
    handler);
```

## Interfaces

```csharp
Type[] interfaces =
    type.GetInterfaces();

Type? disposable =
    type.GetInterface("IDisposable");
```

Check assignability more safely with the actual interface type:

```csharp
bool implements =
    typeof(IDisposable)
        .IsAssignableFrom(type);
```

`GetInterfaces()` includes interfaces inherited through base types and other interfaces.

## Nested types

```csharp
Type[] nestedTypes =
    type.GetNestedTypes(
        BindingFlags.Public |
        BindingFlags.NonPublic);
```

Useful nested-type metadata:

```text
Name
IsNested
IsNestedPublic
IsNestedPrivate
DeclaringType
```

A nested type is a first-class `Type`, not merely a member name.

## `DeclaringType` versus `ReflectedType`

`DeclaringType` is where the member was originally declared.

`ReflectedType` is the type through which the member was obtained.

Example:

```csharp
class Base
{
    public void Hello() { }
}

class Derived : Base
{
}
```

When `Hello` is obtained through `typeof(Derived)`, its declaring type can be `Base` while its reflected type is `Derived`.

Mental model:

```text
DeclaringType -> origin
ReflectedType -> lookup/discovery type
```

---

# R03 — generics, invocation and type checks

## Generic types

Important properties:

```csharp
type.IsGenericType
type.IsGenericTypeDefinition
type.GetGenericArguments()
type.GetGenericTypeDefinition()
```

Examples:

```csharp
typeof(List<int>).IsGenericType
// true

typeof(List<int>).IsGenericTypeDefinition
// false

typeof(List<>).IsGenericTypeDefinition
// true
```

Mental model:

```text
List<>       open generic type definition
List<int>    constructed/closed generic type
```

Get the open definition:

```csharp
Type definition =
    typeof(List<int>)
        .GetGenericTypeDefinition();
```

Construct a closed type:

```csharp
Type closed =
    typeof(List<>)
        .MakeGenericType(typeof(string));

object? instance =
    Activator.CreateInstance(closed);
```

Inspect arguments:

```csharp
Type[] arguments =
    typeof(Dictionary<string, int>)
        .GetGenericArguments();
```

## Generic methods

```csharp
MethodInfo definition =
    typeof(Demo).GetMethod("Echo")!;

bool isDefinition =
    definition.IsGenericMethodDefinition;
```

Construct:

```csharp
MethodInfo closedMethod =
    definition.MakeGenericMethod(
        typeof(int));
```

Invoke:

```csharp
object? result =
    closedMethod.Invoke(
        target,
        new object?[]
        {
            42,
        });
```

Before invoking a generic method, its generic parameters must be closed with valid type arguments satisfying constraints.

## Type equality and runtime checks

Exact type equality:

```csharp
obj.GetType() == typeof(string)
```

This matches only the exact runtime type and does not match derived types.

Language-level instance check:

```csharp
if (obj is IDisposable disposable)
{
    disposable.Dispose();
}
```

Reflection equivalent when only `Type` is available:

```csharp
bool match =
    typeof(IDisposable)
        .IsInstanceOfType(obj);
```

## `IsAssignableFrom`

Direction is easy to reverse.

```csharp
bool assignable =
    targetType.IsAssignableFrom(
        sourceType);
```

Read it as:

> Can a value of `sourceType` be assigned to a variable of `targetType`?

Example:

```csharp
typeof(Stream)
    .IsAssignableFrom(
        typeof(MemoryStream));
// true
```

Use cases:

```text
plugin discovery
interface implementation checks
base/derived compatibility
serializer/handler selection
```

## Nullable value types

```csharp
Type? underlying =
    Nullable.GetUnderlyingType(
        typeof(int?));
// typeof(int)

Nullable.GetUnderlyingType(
    typeof(int));
// null
```

This is the standard way to detect and unwrap `Nullable<T>`.

## Performance guidance

Reflection has lookup and invocation overhead.

```text
do not repeat metadata discovery in a hot loop
cache Type/PropertyInfo/MethodInfo results
avoid reflection as a replacement for ordinary business logic
use it for metadata-driven infrastructure
```

Typical appropriate uses:

```text
serialization
dependency injection
ORM mapping
plugin discovery
test tooling
validation frameworks
object mapping
```

---

# R04 — element types, arrays, pointers and by-ref parameters

## `GetElementType()`

`Type.GetElementType()` applies to types that wrap another element type:

```text
arrays
pointers
by-ref types
```

Examples:

```csharp
typeof(int[]).GetElementType()
// typeof(int)

typeof(int*).GetElementType()
// typeof(int), in unsafe context

typeof(int).MakeByRefType()
    .GetElementType()
// typeof(int)
```

It does not unwrap `List<int>` because `List<T>` is a constructed generic type, not an array, pointer or by-ref wrapper. Use `GetGenericArguments()` for generic collections.

## Pointer types

Unsafe pointer type:

```csharp
Type pointer =
    typeof(int*);
```

Metadata:

```csharp
pointer.IsPointer
pointer.GetElementType()
```

A pointer is different from:

```text
managed by-ref type
object reference
generic collection
IntPtr
```

## By-ref types

Create or detect a by-ref type:

```csharp
Type byRef =
    typeof(int).MakeByRefType();

bool isByRef = byRef.IsByRef;
Type? element = byRef.GetElementType();
```

Reflection represents `ref`, `out` and `in` parameters using a by-ref `ParameterType`.

```csharp
void Modify(
    ref int x,
    out string y,
    in int z)
{
    y = "";
}
```

All three parameter types are by-ref wrappers:

```text
System.Int32&
System.String&
System.Int32&
```

The element type removes the `&` wrapper:

```csharp
Type underlying =
    parameter.ParameterType.GetElementType()!;
```

## Distinguishing `ref`, `out` and `in`

Relevant `ParameterInfo` data:

```text
ParameterType.IsByRef
IsOut
IsIn
Attributes
GetRequiredCustomModifiers()
GetOptionalCustomModifiers()
```

Typical conceptual output:

```text
ref int
    IsByRef = true
    IsOut = false
    IsIn may be false

out string
    IsByRef = true
    IsOut = true

in int
    IsByRef = true
    IsIn may be true
    readonly intent may also be represented by metadata modifiers
```

Metadata can vary by compiler and runtime details. For advanced interop or exact signature inspection, check required and optional custom modifiers instead of relying on only one flag.

## By-ref type members are usually not what you want

This:

```csharp
Type byRef =
    typeof(int).MakeByRefType();

MethodInfo[] methods =
    byRef.GetMethods();
```

inspects the wrapper type metadata and is rarely useful. To inspect the underlying value type:

```csharp
Type underlying =
    byRef.GetElementType()!;

MethodInfo[] methods =
    underlying.GetMethods();
```

## Invoking by-ref methods

Reflection invocation uses an object array. The runtime updates array entries for `ref` and `out` parameters.

```csharp
MethodInfo method =
    typeof(Demo).GetMethod("Modify")!;

object?[] arguments =
{
    10,
    null,
    20,
};

method.Invoke(null, arguments);

int changedRef = (int)arguments[0]!;
string outValue = (string)arguments[1]!;
```

The exact argument positions correspond to `ParameterInfo.Position`.

## Practical reflection checklist

```text
[ ] start from Type
[ ] select public/non-public and instance/static flags deliberately
[ ] disambiguate overloaded methods by parameter types
[ ] distinguish DeclaringType from ReflectedType
[ ] use GetCustomAttributes<T> when multiple attributes are possible
[ ] handle a missing single attribute as null
[ ] close generic definitions before creating or invoking
[ ] read IsAssignableFrom in target <- source direction
[ ] use Nullable.GetUnderlyingType for Nullable<T>
[ ] use GetElementType only for array/pointer/by-ref wrappers
[ ] inspect ParameterInfo for ref/out/in details
[ ] cache reflection metadata on hot paths
```

---

# Coverage

```text
unique embedded screenshots: 95
image uses: 95
native SVG labels: 89
duplicate extra placements: 0

processed image uses: 95
processed text labels: 89
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
