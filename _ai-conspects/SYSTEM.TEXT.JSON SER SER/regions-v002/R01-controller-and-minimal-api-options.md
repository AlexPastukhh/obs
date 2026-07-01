# Controller and Minimal API JSON options

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
