# OPT02 - Options pattern basics / conventional options class / binding

Conspect: `options-pattern`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 12:46:38 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- Options classes provide strongly typed access to configuration.
- Section-name constants avoid string duplication.
- AddOptions<T>().Bind(section) maps configuration into an options class.
- Named options register multiple instances of the same options type for different config sections.
- IOptionsSnapshot<T>.Get(name) retrieves named options in a scoped/request context.

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
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011
```

Boundary decision:
```text
OPT02 covers the options-pattern basics: strongly typed classes, AddOptions/Bind, named FeatureOptions sections, and endpoint retrieval by name.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| OPT02A-S001 | S-001 | IU-001 | `23cfbe2caa` | OPT02A | `verified-from-source-image` | no | Title |
| OPT02A-S002 | S-002 | IU-002 | `8de67f5eb5` | OPT02A | `verified-from-source-image` | no | LoggingOptions conventional options class |
| OPT02A-S003 | S-003 | IU-003 | `27b6851421` | OPT02A | `verified-from-source-image` | no | LogLevelOptions dictionary options class |
| OPT02A-S004 | S-004 | IU-004 | `d4dadd8997` | OPT02A | `verified-visible-partial-from-source-image` | bottom-cropped | Register LoggingOptions from configuration section |
| OPT02A-S005 | S-005 | IU-005 | `33bae259ea` | OPT02A | `verified-visible-partial-from-source-image` | top/bottom-continuation | FeatureOptions class first half |
| OPT02A-S006 | S-006 | IU-006 | `cf540507ac` | OPT02A | `verified-visible-partial-from-source-image` | top-continuation | FeatureOptions class second half |
| OPT02B-S001 | S-007 | IU-007 | `566b6f6062` | OPT02B | `verified-visible-partial-from-source-image` | collapsed-code | Named configuration options collapsed call |
| OPT02B-S002 | S-008 | IU-008 | `6b34df0752` | OPT02B | `verified-from-source-image` | no | Named AddOptions registrations |
| OPT02B-S003 | S-009 | IU-009 | `f24871ada4` | OPT02B | `verified-from-source-image` | no | Appsettings features skeleton |
| OPT02B-S004 | S-010 | IU-010 | `4ab8b33fa9` | OPT02B | `verified-from-source-image` | no | TodoApi appsettings example |
| OPT02B-S005 | S-011 | IU-011 | `1b93b2b883` | OPT02B | `verified-from-source-image` | no | Endpoint reads named options with IOptionsSnapshot |

---

## 2. Verified source transcript

## 2.1 OPT02A

### OPT02A-S001 / S-001 - `23cfbe2caa`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Title

#### Visible text

```text
The “Options” Pattern.
```

---

### OPT02A-S002 / S-002 - `8de67f5eb5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: LoggingOptions conventional options class

#### Visible text

```text
LoggingOptions represents a “Logging” options object. It contains log-level configuration values mapped from configuration namespaces.

Visible class shape:
- public sealed class LoggingOptions
- public const string LoggingConfigurationSectionName = "Logging"
- public LogLevelOptions? LogLevel { get; set; }

The section-name constant is exposed by convention so consumers can bind the configuration section without hardcoding the string at call sites.
```

#### Visible code

```csharp
public sealed class LoggingOptions
{
    public const string LoggingConfigurationSectionName = "Logging";

    public LogLevelOptions? LogLevel { get; set; }
}
```

#### Notes

Screenshot is partly obscured in the lower-right, but the class name, section-name constant and LogLevel property are readable.

---

### OPT02A-S003 / S-003 - `27b6851421`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: LogLevelOptions dictionary options class

#### Visible text

```text
LogLevelOptions is a dictionary-like options type:
- public sealed class LogLevelOptions : Dictionary<string, LogLevel>
- constructor calls base(StringComparer.OrdinalIgnoreCase)

This makes log-level keys case-insensitive.
```

#### Visible code

```csharp
public sealed class LogLevelOptions : Dictionary<string, LogLevel>
{
    public LogLevelOptions()
        : base(StringComparer.OrdinalIgnoreCase)
    {
    }
}
```

---

### OPT02A-S004 / S-004 - `d4dadd8997`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom-cropped`
- confidence: `high-for-visible-code`
- theme: Register LoggingOptions from configuration section

#### Visible text

```text
Register LoggingOptions by binding it to the Logging configuration section.
```

#### Visible code

```csharp
builder.Services.AddOptions<LoggingOptions>()
    .Bind(builder.Configuration.GetSection(
        LoggingOptions.LoggingConfigurationSectionName));
```

---

### OPT02A-S005 / S-005 - `33bae259ea`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top/bottom-continuation`
- confidence: `high-for-visible-part`
- theme: FeatureOptions class first half

#### Visible text

```text
FeatureOptions is a strongly typed options class. Visible properties:
- Enabled: whether the feature is enabled
- Name: the name of the feature
- Version: the version of the feature
```

#### Visible code

```csharp
public sealed class FeatureOptions
{
    public bool Enabled { get; set; }

    public string? Name { get; set; }

    public Version? Version { get; set; }
}
```

---

### OPT02A-S006 / S-006 - `cf540507ac`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top-continuation`
- confidence: `high-for-visible-code`
- theme: FeatureOptions class second half

#### Visible text

```text
Continuation of FeatureOptions. Visible properties:
- Endpoint: Uri? endpoint of the feature
- ApiKey: string? API key of the feature
- Tags: string[] tags for the feature, initialized to empty array
```

#### Visible code

```csharp
public Uri? Endpoint { get; set; }

public string? ApiKey { get; set; }

public string[] Tags { get; set; } = string[];
```

---

## 2.2 OPT02B

### OPT02B-S001 / S-007 - `566b6f6062`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `collapsed-code`
- confidence: `medium-high`
- theme: Named configuration options collapsed call

#### Visible text

```text
Named configuration options are added for the same FeatureOptions type and bound to different sections:
- Features:TodoApi
- Features:WeatherStation

The screenshot shows a collapsed form of AddOptions<FeatureOptions>(...).Bind(...).
```

#### Visible code

```csharp
builder.Services.AddOptions<FeatureOptions>(...)
    .Bind(builder.Configuration.GetSection("Features:TodoApi"));

builder.Services.AddOptions<FeatureOptions>(...)
    .Bind(builder.Configuration.GetSection("Features:WeatherStation"));
```

---

### OPT02B-S002 / S-008 - `6b34df0752`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Named AddOptions registrations

#### Visible text

```text
Expanded named AddOptions registrations.

Two named FeatureOptions instances are registered:
- name: TodoApi, bound from Features:TodoApi
- name: WeatherStation, bound from Features:WeatherStation
```

#### Visible code

```csharp
builder.Services.AddOptions<FeatureOptions>(
        name: "TodoApi")
    .Bind(builder.Configuration.GetSection(
        "Features:TodoApi"));

builder.Services.AddOptions<FeatureOptions>(
        name: "WeatherStation")
    .Bind(builder.Configuration.GetSection(
        "Features:WeatherStation"));
```

---

### OPT02B-S003 / S-009 - `f24871ada4`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Appsettings features skeleton

#### Visible text

```text
Appsettings skeleton contains a Features object with two named sections:
- TodoApi
- WeatherStation
```

#### Visible code

```csharp
{
  "Features": {
    "TodoApi": { ... },
    "WeatherStation": { ... }
  }
}
```

---

### OPT02B-S004 / S-010 - `4ab8b33fa9`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: TodoApi appsettings example

#### Visible text

```text
TodoApi configuration example under Features. It includes Enabled, Name, Version, Endpoint, ApiKey, and Tags. WeatherStation appears as a second sibling section below.
```

#### Visible code

```csharp
{
  "Features": {
    "TodoApi": {
      "Enabled": true,
      "Name": "TODOS API",
      "Version": "0.4.20",
      "Endpoint": "https://jsonplaceholder.typicode.com/todos",
      "ApiKey": "RGF2aWQgUGluZSB3YXMgaGVyZSDwn6STIQ==",
      "Tags": [
        "self-improvement",
        "organization"
      ]
    },
    "WeatherStation": { ... }
  }
}
```

---

### OPT02B-S005 / S-011 - `1b93b2b883`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint reads named options with IOptionsSnapshot

#### Visible text

```text
Minimal API endpoint /features reads named options from IOptionsSnapshot<FeatureOptions>.

It gets:
- options.Get("TodoApi")
- options.Get("WeatherStation")

Then returns both objects as JSON. The endpoint is named GetFeatureOptions and has OpenAPI enabled.
```

#### Visible code

```csharp
app.MapGet(
    pattern: "/features",
    handler: static (IOptionsSnapshot<FeatureOptions> options) =>
    {
        var todo = options.Get("TodoApi");
        var weatherStation = options.Get("WeatherStation");

        return Results.Json(new
        {
            TodoApi = todo,
            WeatherStation = weatherStation
        });
    })
    .WithName("GetFeatureOptions")
    .WithOpenApi();

app.Run();
```

#### Notes

Lower-right of screenshot is partly obscured, but endpoint structure and option names are readable.

---

## 3. Cleaned source notes

- Options pattern maps config sections into strongly typed classes.
- Named options let one options class represent multiple config sections.
- Section-name constants make Bind calls less stringly typed.
- IOptionsSnapshot.Get(name) retrieves named options per request/scope.

---

## 4. Question hooks

- What makes a class an options class?
- Why use AddOptions<T>().Bind(section)?
- Why use named options?
- How do you retrieve TodoApi and WeatherStation separately?
