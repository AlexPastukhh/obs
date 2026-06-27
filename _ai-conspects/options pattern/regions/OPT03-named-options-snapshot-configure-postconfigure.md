# OPT03 - Named options / IOptionsSnapshot / Configure / PostConfigure

Conspect: `options-pattern`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 12:46:38 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- IOptions<T> is a singleton/static view.
- IOptionsSnapshot<T> is scoped and recalculated per scope/request.
- IOptionsMonitor<T> is singleton/live and supports CurrentValue plus OnChange.
- Binder options can fail unknown config keys and avoid binding non-public setters.
- Configure/Bind runs first; PostConfigure patches a named instance; PostConfigureAll patches all names.

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
S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024
```

Boundary decision:
```text
OPT03 covers option access models and named options: IOptions/IOptionsSnapshot/IOptionsMonitor, binder options, Configure, PostConfigure, PostConfigureAll.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| OPT03A-S001 | S-012 | IU-012 | `3978f87e45` | OPT03A | `verified-from-source-image` | no | IOptionsSnapshot scoped view |
| OPT03A-S002 | S-013 | IU-013 | `4253a1655b` | OPT03A | `verified-from-source-image` | no | IOptions singleton view |
| OPT03A-S003 | S-014 | IU-014 | `e032b6b978` | OPT03A | `verified-from-source-image` | no | IOptionsMonitor live view and OnChange |
| OPT03A-S004 | S-015 | IU-015 | `6113e4d2f4` | OPT03A | `verified-visible-partial-from-source-image` | top-continuation | When to use IOptionsMonitor |
| OPT03A-S005 | S-016 | IU-016 | `26e284e7bb` | OPT03A | `verified-from-source-image` | no | Copy monitor value to own field when needed |
| OPT03A-S006 | S-017 | IU-017 | `542650bbeb` | OPT03A | `verified-visible-partial-from-source-image` | top-continuation | Read current or cached options in work method |
| OPT03B-S001 | S-018 | IU-018 | `355b227be0` | OPT03B | `verified-from-source-image` | no | Binder options: ErrorOnUnknownConfiguration and BindNonPublicProperties |
| OPT03B-S002 | S-019 | IU-019 | `ced1fc23dc` | OPT03B | `verified-from-source-image` | no | Configure binder options |
| OPT03B-S003 | S-020 | IU-020 | `861389dd17` | OPT03B | `verified-from-source-image` | no | Why named options |
| OPT03B-S004 | S-021 | IU-021 | `6ae9f5cce7` | OPT03B | `verified-from-source-image` | no | Configure named options and retrieve by name |
| OPT03B-S005 | S-022 | IU-022 | `86f9c56ef5` | OPT03B | `verified-from-source-image` | no | Configure/PostConfigure order mental model |
| OPT03B-S006 | S-023 | IU-023 | `2cf4094ce1` | OPT03B | `verified-from-source-image` | no | PostConfigureAll |
| OPT03B-S007 | S-024 | IU-024 | `5c2abc7f48` | OPT03B | `verified-from-source-image` | no | PostConfigure named options |

---

## 2. Verified source transcript

## 2.1 OPT03A

### OPT03A-S001 / S-012 - `3978f87e45`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IOptionsSnapshot scoped view

#### Visible text

```text
IOptionsSnapshot<T> is a scoped view:
- registered as scoped
- in web apps, default scope is per HTTP request
- each request gets its own snapshot of options
- if config reloads between requests, the next request sees the new values
- within the same request, it does not change mid-request

Use when you want updated config per request, typical for web apps, and do not need push notifications.
```

#### Visible code

```csharp
public class MyController : ControllerBase
{
    public MyController(IOptionsSnapshot<LoggingOptions> opt)
    {
        var level = opt.Value.Level; // can differ between requests if config changed
    }
}
```

---

### OPT03A-S002 / S-013 - `4253a1655b`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IOptions singleton view

#### Visible text

```text
IOptions<T> is a singleton view:
- registered as singleton
- options value is created once, lazily on first use, and reused
- if configuration changes at runtime, IOptions<T>.Value does not change

Use when options are effectively static, such as startup configuration or feature flags that require restart.
```

#### Visible code

```csharp
public class MySvc
{
    public MySvc(IOptions<LoggingOptions> opt)
    {
        var level = opt.Value.Level; // stays the same for the lifetime of the app
    }
}
```

---

### OPT03A-S003 / S-014 - `e032b6b978`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: IOptionsMonitor live view and OnChange

#### Visible text

```text
IOptionsMonitor<T> is a live view with change notifications:
- registered as singleton
- CurrentValue can change when config reloads
- provides OnChange callback so code can react immediately
```

#### Visible code

```csharp
public class MySvc
{
    private LoggingOptions _current;

    public MySvc(IOptionsMonitor<LoggingOptions> monitor)
    {
        _current = monitor.CurrentValue;

        monitor.OnChange(newValue =>
        {
            _current = newValue;
            // react: rebuild caches, update log filters, etc.
        });
    }
}
```

---

### OPT03A-S004 / S-015 - `6113e4d2f4`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top-continuation`
- confidence: `high-for-visible-text`
- theme: When to use IOptionsMonitor

#### Visible text

```text
Use IOptionsMonitor when:
- background services or singletons need updated config
- you want to react to changes, rebuild something, or refresh a client
- you cannot rely on “next request will pick it up”
```

---

### OPT03A-S005 / S-016 - `26e284e7bb`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Copy monitor value to own field when needed

#### Visible text

```text
You only need to copy IOptionsMonitor.CurrentValue into your own field when you want a stable local reference or need to rebuild something.

The example stores CurrentValue and updates the field in OnChange. It is not required, but is common.
```

#### Visible code

```csharp
public sealed class MyService
{
    private volatile LoggingOptions _options;

    public MyService(IOptionsMonitor<LoggingOptions> monitor)
    {
        _options = monitor.CurrentValue;

        monitor.OnChange(o =>
        {
            _options = o; // not required, but common
        });
    }
}
```

---

### OPT03A-S006 / S-017 - `542650bbeb`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top-continuation`
- confidence: `high-for-visible-code`
- theme: Read current or cached options in work method

#### Visible text

```text
Continuation of the copy-to-field example. In DoWork, either read monitor.CurrentValue each time, or use the cached field for speed/consistency.
```

#### Visible code

```csharp
public void DoWork()
{
    // Either read monitor.CurrentValue each time,
    // or use the cached field for speed/consistency.
    var level = _options.Level;
}
```

---

## 2.2 OPT03B

### OPT03B-S001 / S-018 - `355b227be0`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Binder options: ErrorOnUnknownConfiguration and BindNonPublicProperties

#### Visible text

```text
Example JSON has a typo: Endpont instead of Endpoint.

Without ErrorOnUnknownConfiguration, the typo is ignored and Endpoint stays null, which can become a bug later. With it enabled, the typo is detected early.

BindNonPublicProperties = false prevents binding to non-public properties/setters. This is mainly about safety and encapsulation.
```

#### Visible code

```csharp
{
  "Features": {
    "WeatherStation": {
      "Endpont": "https://..." // typo! should be "Endpoint"
    }
  }
}
```

---

### OPT03B-S002 / S-019 - `ced1fc23dc`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Configure binder options

#### Visible text

```text
Configure<FeatureOptions>(name, config, configureBinder) controls how the binder maps JSON to the options object.

The example binds WeatherStation and sets:
- BindNonPublicProperties = false
- ErrorOnUnknownConfiguration = true

ErrorOnUnknownConfiguration makes unknown extra fields or typos fail binding instead of being silently ignored.
```

#### Visible code

```csharp
builder.Services.Configure<FeatureOptions>(
    name: "WeatherStation",
    config: builder.Configuration.GetSection("Features:WeatherStation"),
    configureBinder: o =>
    {
        o.BindNonPublicProperties = false;
        o.ErrorOnUnknownConfiguration = true;
    });
```

---

### OPT03B-S003 / S-020 - `861389dd17`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why named options

#### Visible text

```text
Why named options?

Because you might have multiple FeatureOptions in config:
- Features:TodoApi
- Features:WeatherStation

Both use the same FeatureOptions type but with different values.
```

---

### OPT03B-S004 / S-021 - `6ae9f5cce7`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Configure named options and retrieve by name

#### Visible text

```text
Configure<FeatureOptions>(name: "WeatherStation", config: section) registers a named options instance.

Meaning:
- instance type is FeatureOptions
- instance name is WeatherStation
- it is bound from Features:WeatherStation
- later you can call optionsSnapshot.Get("WeatherStation")
```

#### Visible code

```csharp
builder.Services.Configure<FeatureOptions>(
    name: "WeatherStation",
    config: builder.Configuration.GetSection("Features:WeatherStation"));

var ws = optionsSnapshot.Get("WeatherStation");
```

---

### OPT03B-S005 / S-022 - `86f9c56ef5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Configure/PostConfigure order mental model

#### Visible text

```text
Key order mental model for a given options type and name:
1. Configure<T>(...) / Bind(...) fills values from config.
2. PostConfigure<T>(...) is a final patch or override.
3. PostConfigureAll<T>(...) is a final patch for all names.

For the WeatherStation case:
- bind from Features:WeatherStation
- then PostConfigure can overwrite endpoint/version/tags
- PostConfigureAll can apply common rules to TodoApi and WeatherStation
```

---

### OPT03B-S006 / S-023 - `2cf4094ce1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: PostConfigureAll

#### Visible text

```text
PostConfigureAll<FeatureOptions> runs regardless of name. It runs for every instance of FeatureOptions:
- default unnamed instance
- TodoApi
- WeatherStation
- any other names

Typical use: enforce invariants such as never-null arrays, shared defaults, or shared cleanup.
```

#### Visible code

```csharp
builder.Services.PostConfigureAll<FeatureOptions>(options =>
{
    options.Tags ??= Array.Empty<string>();
});
```

---

### OPT03B-S007 / S-024 - `5c2abc7f48`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: PostConfigure named options

#### Visible text

```text
PostConfigure<FeatureOptions>(name: "WeatherStation", ...) runs after all Configure/Bind steps for that named options instance.

It lets you override config values or add defaults. Common reasons:
- provide defaults if config is missing
- derive one value from another
- override config in certain environments
- normalize or validate data

Example: config might define Enabled and Name, but code forces Endpoint to a known URL.
```

#### Visible code

```csharp
builder.Services.PostConfigure<FeatureOptions>(
    name: "WeatherStation",
    configureOptions: options =>
    {
        options.Version = new Version(1, 0);
        options.Endpoint = new Uri("https://freetestapi.com/api/v1/weathers");
        options.Tags = new[] { "fake-weather", "test-api" };
    });
```

---

## 3. Cleaned source notes

- IOptions is static/singleton; IOptionsSnapshot is scoped; IOptionsMonitor is live/singleton.
- IOptionsMonitor can either be read directly via CurrentValue or copied to a local field on OnChange.
- Configure/Bind fills values, PostConfigure patches one name, PostConfigureAll patches every name.
- BinderOptions can detect unknown config keys and avoid binding non-public members.

---

## 4. Question hooks

- Why does IOptions<T>.Value not change after reload?
- Why is IOptionsSnapshot scoped?
- When do you use IOptionsMonitor?
- What order do Configure/PostConfigure/PostConfigureAll run in?
