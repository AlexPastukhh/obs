# R01/R02 - System.Text.Json JsonConverter for Optional<T> final transcript v001

Conspect: `jsonconverter`  
File type: **source-preserving final combined transcript**  
Generated: 2026-06-22 UTC

## 0.1 Area overview / reading quality

The sheet implements PATCH-style optional-property semantics:

```text
property absent       -> leave existing value unchanged
property present null -> explicitly set null
property present value-> explicitly set that value
```

A normal nullable property cannot distinguish all three states. `Optional<T>` adds an `IsSet` flag, and a generic `JsonConverterFactory` creates a closed converter for every `Optional<T>` type.

The screenshots are readable with high conceptual confidence. Exact generic/ref syntax remains preserved in source images.

## 1. Optional<T> state model

A representative `Optional<T>` stores:

```text
bool IsSet
T? Value
```

Construction with a value sets `IsSet = true`, even when the value is null. The default struct value has `IsSet = false` and `Value = default`.

This creates the required three-state model:

```text
missing property: IsSet=false, Value=default
present null:     IsSet=true,  Value=null
present value:    IsSet=true,  Value=<deserialized value>
```

## 2. Why a JsonConverterFactory

`Optional<T>` is an open generic family. A single converter for one closed type such as `Optional<string>` is not enough. `JsonConverterFactory` can recognize any `Optional<>` type and create a matching `JsonConverter<Optional<T>>` at runtime.

`CanConvert` checks whether the target type is generic and whether its generic type definition is `Optional<>`.

`CreateConverter` extracts the inner type, constructs the closed converter type with `MakeGenericType`, creates an instance and returns it as `JsonConverter`.

## 3. Activator vs ConstructorInfo.Invoke

`Activator.CreateInstance(closedConverterType)` is concise when the converter has a simple parameterless constructor. It encapsulates constructor discovery and invocation.

`GetConstructor(...).Invoke(...)` gives more explicit control when choosing among constructors, passing services/options, validating a signature, building a custom argument list or caching a compiled constructor delegate.

For a small parameterless converter, `Activator` is usually the clearer choice. Reflection cost happens when the serializer builds/uses converter metadata, not for every property token in the normal hot loop.

## 4. Factory and converter structure

The factory pattern is:

```text
OptionalJsonConverterFactory : JsonConverterFactory
  CanConvert(Type)
  CreateConverter(Type, JsonSerializerOptions)

OptionalJsonConverter<T> : JsonConverter<Optional<T>>
  Read(ref Utf8JsonReader, Type, JsonSerializerOptions)
  Write(Utf8JsonWriter, Optional<T>, JsonSerializerOptions)
```

The converter is registered in `JsonSerializerOptions.Converters`, either globally during service configuration or on an options instance used by the relevant serializer.

## 5. Reader/token behavior

`Utf8JsonReader` is a forward-only reader over JSON tokens. When `Read` is called for the property value, the reader is positioned at that value token.

For explicit JSON null:

```text
TokenType == JsonTokenType.Null
-> return new Optional<T>(default)
-> IsSet is true
```

For non-null JSON, delegate the inner value to `JsonSerializer.Deserialize<T>(ref reader, options)` and wrap the result in `Optional<T>`.

The converter should not manually call `reader.Read()` after delegating unless its converter shape specifically owns additional tokens. For a normal value converter, the serializer controls reader advancement.

## 6. Missing property behavior

The most important rule is that a converter is not invoked for a property that does not appear in the JSON object.

Therefore, when a DTO is default-constructed and the property is missing, its `Optional<T>` remains the default struct value:

```text
IsSet = false
Value = default
```

This is exactly what PATCH semantics need. The converter only converts values that are present in the JSON stream.

A missing property is not the same thing as JSON null:

```json
{}
```

means “do not update this field,” while:

```json
{"displayName": null}
```

means “the client explicitly set this field to null.”

## 7. Writer behavior

`Write` serializes the wrapped `Value` through `JsonSerializer.Serialize(writer, value.Value, options)` when `IsSet` is true.

When `IsSet` is false, a value converter alone cannot retroactively remove a property name that the serializer already chose to write. Omitting unset properties generally requires one of:

- a type-level converter that controls the whole object;
- a custom type-info/property `ShouldSerialize` rule;
- mapping the PATCH model to a separate output shape;
- configuration/design that never serializes unset patch DTOs.

Writing JSON null for an unset optional is possible, but it loses the missing-vs-null distinction on the wire.

## 8. PATCH application logic

After deserialization, update code checks each optional explicitly:

```text
if (dto.DisplayName.IsSet)
    entity.DisplayName = dto.DisplayName.Value;
```

This prevents an omitted field from overwriting existing data, while still allowing an explicit null to clear a nullable field.

Validation must also distinguish “not supplied” from “supplied but invalid.” Run value validation only when `IsSet` is true, plus any cross-field PATCH rules required by the domain.

## 9. Practical cautions

- Keep the factory's type check strict; reject unrelated generic types.
- Reuse the same `JsonSerializerOptions` when delegating inner serialization.
- Avoid recursively invoking the same converter for the identical outer type.
- Decide whether non-nullable `T` accepts explicit JSON null; validation may reject it even though deserialization can represent `default(T)`.
- Confirm required-property and source-generated serializer behavior if using newer System.Text.Json metadata features.
- Test all three states: missing, explicit null and concrete value.

## 10. Coverage

```text
R01: 13 image uses + 3 labels
R02: 6 image uses + 0 labels
Total: 19 image uses + 3 labels
Remaining unclosed: 0
```
