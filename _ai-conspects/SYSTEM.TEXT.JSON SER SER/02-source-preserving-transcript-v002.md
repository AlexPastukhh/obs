# System.Text.Json configuration in ASP.NET Core — source-preserving transcript v002

Generated: 2026-07-01

## Coverage

```text
unique screenshots: 6
image uses: 6
native SVG labels: 1
source-preserving blocks: 6
uncovered sources: 0
```

## Relationship to the existing summary

`regions/R01-final-transcript.md` remains useful as a concise semantic overview.  
This file is the detailed code-preserving layer.

## S-001 — Controller/MVC JsonSerializerOptions

**Known limits:** one explanatory comment is cropped on the right; executable code is fully readable

### Near-literal normalized transcript

### 1. Configure `System.Text.Json` settings

#### A) Controllers (MVC)

Configure JSON used by MVC input/output formatters:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

builder.Services
    .AddControllers()
    .AddJsonOptions(o =>
    {
        // Naming
        o.JsonSerializerOptions.PropertyNamingPolicy =
            JsonNamingPolicy.CamelCase;

        // Enums as strings
        o.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());

        // Ignore nulls
        o.JsonSerializerOptions.DefaultIgnoreCondition =
            JsonIgnoreCondition.WhenWritingNull;

        // Case-insensitive input
        // (the explanatory comment is cropped at the right edge)
        o.JsonSerializerOptions.PropertyNameCaseInsensitive = true;

        // Useful when you might have cycles
        // (be careful; it changes payload shape)
        // o.JsonSerializerOptions.ReferenceHandler =
        //     ReferenceHandler.IgnoreCycles;

        // Indented (usually OFF in prod)
        // o.JsonSerializerOptions.WriteIndented = true;
    });
```

### Study meaning

Controller JSON settings belong to MVC's formatter pipeline. Naming policy, converters, null handling, input matching, reference handling, and indentation all affect serialization or deserialization behavior, but not necessarily in the same direction.

### Recall questions

1. Which method configures JSON for MVC controllers?
2. What does `JsonNamingPolicy.CamelCase` change?
3. How are enums written as strings?
4. Which option omits null properties on output?
5. Why can `ReferenceHandler.IgnoreCycles` change payload shape?


---

## S-002 — Minimal API HttpJsonOptions

**Known limits:** none

### Near-literal normalized transcript

### B) Minimal APIs

Minimal APIs use `Microsoft.AspNetCore.Http.Json.JsonOptions`:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

builder.Services.ConfigureHttpJsonOptions(o =>
{
    o.SerializerOptions.PropertyNamingPolicy =
        JsonNamingPolicy.CamelCase;

    o.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter());

    o.SerializerOptions.DefaultIgnoreCondition =
        JsonIgnoreCondition.WhenWritingNull;
});
```

Source note:

> If you use both Controllers + Minimal APIs in the same app, you often configure both.

### Study meaning

MVC controllers and Minimal APIs use different option-registration paths. Configuring one does not automatically guarantee identical behavior in the other.

### Recall questions

1. Which method configures Minimal API JSON?
2. What option object is modified inside the callback?
3. Why might a mixed application configure both MVC and HTTP JSON options?
4. Which three settings are repeated from the controller example?


---

## S-003 — MVC formatters, 406 responses, and vendor media types

**Known limits:** none

### Near-literal normalized transcript

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;

builder.Services.AddControllers(options =>
{
    // Optional: return 406 if client asks for an unsupported Accept
    options.ReturnHttpNotAcceptable = true;
})
.AddMvcOptions(options =>
{
    // OUTPUT: add vendor JSON
    var jsonOutput = options.OutputFormatters
        .OfType<SystemTextJsonOutputFormatter>()
        .First();

    jsonOutput.SupportedMediaTypes.Add(
        MediaTypeHeaderValue.Parse(
            "application/vnd.myapp+json"));

    // INPUT: add vendor JSON
    var jsonInput = options.InputFormatters
        .OfType<SystemTextJsonInputFormatter>()
        .First();

    jsonInput.SupportedMediaTypes.Add(
        MediaTypeHeaderValue.Parse(
            "application/vnd.myapp+json"));
});
```

### Study meaning

Serializer options control JSON representation. MVC formatters additionally control content negotiation and which media types are accepted or produced.

### Recall questions

1. What does `ReturnHttpNotAcceptable = true` enable?
2. Which formatter handles JSON output?
3. Which formatter handles JSON input?
4. What vendor media type is registered?
5. Why is formatter configuration separate from serializer configuration?


---

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
