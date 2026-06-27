# OPT01 - Options validation

Conspect: `options-pattern`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 12:46:38 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- ValidateOnStart moves validation from first options use to host startup.
- Named options must be validated per named instance.
- DataAnnotations is simple; custom Validate predicates handle cross-field/custom rules.
- Source-generated validation is mainly for perf/trim/AOT scenarios.

Reading quality:
```text
Overall: high.
Cropped/obscured IDE screenshots are marked as partial in source metadata.
Confidence: high for concepts; medium-high for exact code where screenshot is cropped or collapsed.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-025, S-026, S-027, S-028, S-029, S-030
```

Boundary decision:
```text
OPT01 covers options validation: DataAnnotations, custom predicates, named validation, ValidateOnStart, and source-generated validators.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| OPT01B-S001 | S-025 | IU-025 | `96ec1179ba` | OPT01B | `verified-from-source-image` | no | ValidateOnStart versus validation on first use |
| OPT01A-S001 | S-026 | IU-026 | `2f6de5dee6` | OPT01A | `verified-from-source-image` | no | Named options validation |
| OPT01A-S002 | S-027 | IU-027 | `ff4463da2e` | OPT01A | `verified-from-source-image` | no | Custom validation with predicates |
| OPT01A-S003 | S-028 | IU-028 | `9a956e7a31` | OPT01A | `verified-from-source-image` | no | DataAnnotations registration and behavior |
| OPT01B-S002 | S-029 | IU-029 | `b88cfcea8c` | OPT01B | `verified-from-source-image` | no | DataAnnotations options class |
| OPT01B-S003 | S-030 | IU-030 | `0b967cc91e` | OPT01B | `verified-from-source-image` | no | Source-generated validation |

---

## 2. Verified source transcript

## 2.2 OPT01B

### OPT01B-S001 / S-025 - `96ec1179ba`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ValidateOnStart versus validation on first use

#### Visible text

```text
ValidateOnStart vs “validate on first use”.

Without ValidateOnStart(), validation happens only when something asks for the options:
- IOptions<T>.Value
- IOptionsSnapshot<T>.Value
- IOptionsMonitor<T>.CurrentValue

So the app can start successfully and crash later when the first request or service touches the invalid options.

With ValidateOnStart(), validation runs during startup / host building. If config is wrong, the app fails immediately.

Rule of thumb from the source: for important config such as DB connection, API endpoints, or auth keys, use ValidateOnStart().
```

---

## 2.1 OPT01A

### OPT01A-S001 / S-026 - `2f6de5dee6`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Named options validation

#### Visible text

```text
Named options validation.

If you use named options such as TodoApi and WeatherStation, validate each named instance. Each name gets its own binding and its own validation.
```

#### Visible code

```csharp
builder.Services.AddOptions<FeatureOptions>("WeatherStation")
    .Bind(builder.Configuration.GetSection("Features:WeatherStation"))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddOptions<FeatureOptions>("TodoApi")
    .Bind(builder.Configuration.GetSection("Features:TodoApi"))
    .Validate(o => o.Endpoint is not null, "Endpoint required")
    .ValidateOnStart();
```

---

### OPT01A-S002 / S-027 - `ff4463da2e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Custom validation with predicates

#### Visible text

```text
Custom validation gives more control than DataAnnotations. Register predicate validators when the rules do not fit attributes, such as “endpoint must be HTTPS” or “if Enabled then ApiKey is required”.
```

#### Visible code

```csharp
builder.Services.AddOptions<WeatherOptions>()
    .Bind(builder.Configuration.GetSection("Features:WeatherStation"))
    .Validate(o => o.Endpoint.Scheme == Uri.UriSchemeHttps, "Endpoint must be HTTPS")
    .Validate(o => !string.IsNullOrWhiteSpace(o.ApiKey), "ApiKey is required")
    .ValidateOnStart();
```

---

### OPT01A-S003 / S-028 - `9a956e7a31`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DataAnnotations registration and behavior

#### Visible text

```text
Registration with AddOptions + Bind + ValidateDataAnnotations + ValidateOnStart.

What happens:
- config binds into WeatherOptions
- validation checks attributes
- Endpoint must exist
- TimeoutSeconds must satisfy range 1..30
- ApiKey is required
- with ValidateOnStart, invalid config fails app startup with a clear error
- without it, invalid config fails only when options are first requested from DI
```

#### Visible code

```csharp
builder.Services.AddOptions<WeatherOptions>()
    .Bind(builder.Configuration.GetSection("Features:WeatherStation"))
    .ValidateDataAnnotations()
    .ValidateOnStart(); // important: fail app startup if invalid
```

---

## 2.2 OPT01B

### OPT01B-S002 / S-029 - `b88cfcea8c`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DataAnnotations options class

#### Visible text

```text
DataAnnotations validation on an options class.

WeatherOptions has:
- required Endpoint
- TimeoutSeconds with Range(1, 30)
- required ApiKey
```

#### Visible code

```csharp
using System.ComponentModel.DataAnnotations;

public sealed class WeatherOptions
{
    [Required]
    public Uri Endpoint { get; set; } = default!;

    [Range(1, 30)]
    public int TimeoutSeconds { get; set; } = 5;

    [Required]
    public string ApiKey { get; set; } = default!;
}
```

---

### OPT01B-S003 / S-030 - `0b967cc91e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Source-generated validation

#### Visible text

```text
Source-generated validation.

You can mark options with OptionsValidator on a partial class. That attribute triggers a source generator that creates a validator class at compile time, instead of relying on reflection-heavy runtime validation.

The source says you do not need this unless you care about performance, trimming, or AOT scenarios.
```

#### Visible code

```csharp
using Microsoft.Extensions.Options;

[OptionsValidator]
public sealed partial class WeatherOptions
{
    // properties...
}
```

---

## 3. Cleaned source notes

- ValidateOnStart fails invalid important configuration during startup instead of at first use.
- Named options validation must be registered per name.
- DataAnnotations is the simple route; predicate Validate handles custom rules.
- Source-generated validators are mainly useful for perf/trimming/AOT.

---

## 4. Question hooks

- When does validation run without ValidateOnStart?
- Why validate named options per name?
- When do custom Validate predicates beat DataAnnotations?
- When would source-generated validation be worth it?
