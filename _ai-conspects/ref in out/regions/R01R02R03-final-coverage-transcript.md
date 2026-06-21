# ref in out — final coverage transcript v001

Source SVG: `ref in out.svg`  
Conspect folder: `ref in out`  
Stage: combined final coverage transcript

## 0.1 Area overview / understanding / reading quality

This conspect compares normal value parameters with `ref`, `in`, and `out`, then connects them to large structs, properties, ref returns, aliases, and the `Try...` pattern.

The conceptual material was readable. Exact sample syntax remains preserved in the source screenshots.

## R01 — Passing structs and properties by reference

A normal value parameter receives a copy of the argument value. For a reference type, the copied value is the object reference; for a struct, the struct data is copied.

Passing a large struct by `in` or `ref` can avoid copying:

```csharp
void Read(in LargeStruct value) { }
void Mutate(ref LargeStruct value) { }
```

A normal property access usually returns a value, not a variable storage location, so it cannot normally be supplied to a `ref`/`out` parameter. Store it in a local first, or expose a deliberate ref-returning member:

```csharp
ref int GetSlot() => ref _items[index];
```

Ref returns and ref locals create aliases to existing storage rather than copies. Their lifetime must remain valid; the compiler prevents returning references to locals that would disappear.

For non-readonly structs, calling mutating members through an `in`/readonly reference can cause a defensive copy. Readonly structs and readonly members reduce this surprise.

## R02 — ref and in semantics

`ref` means the caller and callee share the same variable storage.

Requirements and effects:

```text
- the caller variable must already be definitely assigned
- the parameter can be read
- the parameter can be written
- writing changes the caller's variable
- the call site uses ref
```

```csharp
static void Increment(ref int value) => value++;

int number = 10;
Increment(ref number);
```

Use `ref` when mutation of the caller's variable is an explicit part of the API, or when a large value type must be passed without copying and mutation is needed.

`in` is a readonly reference. The caller supplies initialized storage, the callee reads it without intentionally replacing the value, and it is useful mainly for larger structs or APIs that need readonly by-reference semantics.

```csharp
static decimal Total(in LargePrice price)
    => price.Amount * price.Quantity;
```

Do not use `in` automatically for tiny primitive values; by-reference indirection can be unnecessary, and performance should be measured.

A ref local aliases a variable:

```csharp
ref int alias = ref array[index];
alias = 42; // updates the array element
```

Some indexers return only values and cannot be used as ref storage. Arrays support ref access to elements; collection APIs require an explicit ref-returning mechanism if they expose one.

## R03 — out and Try patterns

`out` is for a value produced by the callee.

```text
- the caller does not need to initialize the variable
- the callee must assign it on every successful return path
- the caller cannot expect the previous value to be preserved
- the call site uses out
```

```csharp
static bool TryRead(string text, out int value)
    => int.TryParse(text, out value);
```

Modern call-site forms:

```csharp
if (int.TryParse(text, out var number)) { }
if (int.TryParse(text, out _)) { }
```

The strongest use case is the `Try...` pattern: the boolean reports success and the `out` value carries the result. `out` also appears in interop and low-level APIs.

For ordinary methods that need to return several meaningful values, a tuple or result type is often clearer:

```csharp
(string Name, int Age) Parse(...)
```

Prefer `out` when the API genuinely follows a success-plus-result contract, not merely to avoid defining a return type.

## Selection guide

```text
normal parameter: pass a value/reference value without aliasing caller storage
ref: initialized caller variable, callee may read and write it
in: initialized caller variable, readonly by-reference access
out: callee must produce/assign the value
ref return/local: expose or hold an alias to existing storage
```

## Coverage

```text
R01: 4 image uses
R02: 9 image uses
R03: 5 image uses
Text labels: 2
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
