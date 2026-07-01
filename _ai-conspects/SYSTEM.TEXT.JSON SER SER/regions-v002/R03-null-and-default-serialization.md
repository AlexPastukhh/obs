# Null/default serialization behavior

## S-004 — WhenWritingNull notes and WhenWritingDefault distinction

**Known limits:** the screenshot is a cropped section of a longer explanation; all three visible bullets are preserved

### Near-literal normalized transcript

Useful notes:

- `WhenWritingNull` applies to reference-type nulls and nullable values that are `null`.
- It is different from `WhenWritingDefault`, which also omits default values such as `0`, `false`, and default structs.
- The old `IgnoreNullValues` option is obsolete.
- The recommended replacement is:

```csharp
DefaultIgnoreCondition =
    JsonIgnoreCondition.WhenWritingNull;
```

### Study meaning

`WhenWritingNull` is narrowly about null values. `WhenWritingDefault` has broader output-shaping behavior and can remove meaningful-looking value-type defaults.

### Recall questions

1. Which values are omitted by `WhenWritingNull`?
2. Which additional values can `WhenWritingDefault` omit?
3. Which old option is obsolete?
4. What is the recommended replacement?


---

## S-005 — JSON output before and after null omission

**Known limits:** none

### Near-literal normalized transcript

With null omission enabled, the object would serialize as:

```json
{
  "id": 1,
  "name": "Sam"
}
```

instead of:

```json
{
  "id": 1,
  "name": "Sam",
  "email": null
}
```

This affects serialization/output. It does not remove nulls from the C# object; it only changes what goes into the JSON response.

### Study meaning

The object graph remains unchanged. The serializer chooses not to write the null-valued property into the JSON document.

### Recall questions

1. Which property disappears from the first JSON document?
2. Does the C# object's `Email` value change?
3. At what stage is the property omitted?
4. How does this affect API response shape?


---

## S-006 — Concrete WhenWritingNull object example

**Known limits:** none

### Near-literal normalized transcript

It tells `System.Text.Json` to skip properties whose value is `null` when writing JSON.

Configuration:

```csharp
o.JsonSerializerOptions.DefaultIgnoreCondition =
    JsonIgnoreCondition.WhenWritingNull;
```

Object:

```csharp
new UserDto
{
    Id = 1,
    Name = "Sam",
    Email = null
}
```

The resulting JSON omits `email`, as shown in S-005.

### Study meaning

The example links the option, an actual nullable property, and the resulting serialized payload.

### Recall questions

1. What is the value of `Email` before serialization?
2. Which property is omitted from JSON?
3. Which two properties remain?
4. What would change if the ignore condition were removed?
